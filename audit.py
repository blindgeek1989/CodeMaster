"""
audit.py — Accessibility audit for CodeMaster

Checks HTML, CSS, and JS files for common accessibility issues and
reports findings with file path and line number.

Usage:
    python audit.py
    python audit.py --fix     (auto-fix safe issues)
    python audit.py --json    (output as JSON)
"""

import os
import re
import sys
import json
import argparse
from pathlib import Path

ROOT = Path(__file__).parent
RENDERER = ROOT / "src" / "renderer"

SEVERITY = {
    "error": 0,
    "warning": 1,
    "info": 2,
}

findings = []


def report(file, line_num, severity, rule, message, fix=None):
    findings.append({
        "file": str(file.relative_to(ROOT)),
        "line": line_num,
        "severity": severity,
        "rule": rule,
        "message": message,
        "fix": fix,
    })


# ===== HTML Checks =====

def check_html(path):
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()

    for i, line in enumerate(lines, 1):
        # Images missing alt
        if re.search(r"<img(?![^>]*alt=)", line, re.I):
            report(path, i, "error", "img-alt",
                   "Image is missing an alt attribute. All images must have alt text or alt=\"\" if decorative.")

        # Inputs missing id or label — check surrounding 5 lines for multiline elements
        if re.search(r"<input", line, re.I):
            context_window = " ".join(lines[max(0, i - 2):min(len(lines), i + 4)])
            # Also check if wrapped in a <label> tag in surrounding lines
            label_context = " ".join(lines[max(0, i - 6):min(len(lines), i + 2)])
            is_wrapped_in_label = re.search(r"<label", label_context, re.I)
            has_label_attr = re.search(r"(id=|aria-label=|aria-labelledby=)", context_window, re.I)
            if not has_label_attr and not is_wrapped_in_label:
                report(path, i, "error", "input-label",
                       "Input may be missing a label. Ensure each input has an id paired with a <label for>, or aria-label/aria-labelledby.")

        # Buttons with no text content (on single line)
        if re.search(r"<button[^>]*>\s*</button>", line, re.I):
            report(path, i, "error", "button-empty",
                   "Button is empty. Buttons must have descriptive text or an aria-label.")

        # Links with generic text
        if re.search(r"<a[^>]*>\s*(click here|here|read more|more)\s*</a>", line, re.I):
            report(path, i, "warning", "link-generic-text",
                   "Link has generic text ('click here', 'more', etc.). Use descriptive link text.")

        # Missing lang attribute on html element
        if re.search(r"<html(?![^>]*lang=)", line, re.I):
            report(path, i, "error", "html-lang",
                   "The <html> element is missing a lang attribute. Add lang=\"en\" (or appropriate language code).")

        # iframe missing title
        if re.search(r"<iframe(?![^>]*title=)", line, re.I):
            report(path, i, "error", "iframe-title",
                   "iframe is missing a title attribute. Add a descriptive title so screen readers identify it.")

        # tabindex values > 0
        match = re.search(r'tabindex=["\']?(\d+)["\']?', line, re.I)
        if match and int(match.group(1)) > 0:
            report(path, i, "warning", "tabindex-positive",
                   f"tabindex={match.group(1)} found. Positive tabindex values disrupt natural focus order. Use 0 or -1 only.")

        # outline:none without focus-visible check (simple heuristic)
        if re.search(r"outline:\s*none", line, re.I):
            report(path, i, "error", "outline-none",
                   "outline:none removes focus indicators, harming keyboard accessibility. Provide a :focus-visible replacement.")


# ===== CSS Checks =====

def check_css(path):
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()

    for i, line in enumerate(lines, 1):
        # outline: none or outline: 0 without being inside :focus-visible
        if re.search(r"outline:\s*(none|0)\b", line, re.I):
            context = " ".join(lines[max(0, i - 5):i]).lower()
            if "focus-visible" not in context and ":focus" not in context:
                report(path, i, "error", "css-outline-removed",
                       "outline:none or outline:0 detected outside a :focus block. This removes focus indicators for keyboard users.")

        # color but no background-color (contrast check hint)
        if re.search(r"\bcolor\s*:", line, re.I) and "background" not in line.lower():
            pass  # Can't check contrast ratio without parsing color values — skip

        # animation without prefers-reduced-motion check
        if re.search(r"animation\s*:", line, re.I):
            file_text = text.lower()
            if "prefers-reduced-motion" not in file_text:
                report(path, i, "warning", "animation-no-motion-pref",
                       "CSS animation found but no @media (prefers-reduced-motion) rule detected in this file. Add a reduced-motion override.",
                       fix="Add: @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }")

        # cursor: none — can harm accessibility
        if re.search(r"cursor:\s*none", line, re.I):
            report(path, i, "warning", "cursor-none",
                   "cursor:none hides the mouse cursor, which can confuse low-vision users who rely on pointer visibility.")


# ===== JavaScript Checks =====

def check_js(path):
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()

    for i, line in enumerate(lines, 1):
        # alert() usage
        if re.search(r"\balert\s*\(", line):
            report(path, i, "warning", "js-alert",
                   "alert() is not accessible — it interrupts screen readers unexpectedly. Use an aria-live region instead.")

        # document.write
        if re.search(r"document\.write\s*\(", line):
            report(path, i, "warning", "js-document-write",
                   "document.write() can break page structure and is not screen-reader safe. Use DOM methods instead.")

        # setTimeout used to delay focus changes (heuristic)
        if re.search(r"setTimeout.*focus\s*\(", line):
            report(path, i, "info", "js-settimeout-focus",
                   "setTimeout used with .focus() — ensure focus management is intentional and not relying on arbitrary delays.")

        # innerHTML with user content (potential XSS and DOM injection risk)
        # Skip safe clears: innerHTML = '' or innerHTML = ""
        if re.search(r"innerHTML\s*=", line) and not re.search(r"innerHTML\s*=\s*['\"]['\"]", line):
            report(path, i, "warning", "js-innerHTML",
                   "innerHTML assignment detected. Prefer textContent for plain text, or sanitize HTML carefully to prevent XSS.")

        # onmousedown without keyboard equivalent (heuristic)
        if re.search(r"onmousedown", line, re.I):
            report(path, i, "warning", "mouse-only-event",
                   "onmousedown found — ensure an equivalent keyboard handler (onkeydown/onkeyup) is also provided.")


# ===== File walker =====

def audit_directory(root):
    for path in root.rglob("*.html"):
        check_html(path)
    for path in root.rglob("*.css"):
        check_css(path)
    for path in root.rglob("*.js"):
        if "node_modules" in str(path):
            continue
        check_js(path)


# ===== Report =====

def print_report(as_json=False):
    if as_json:
        print(json.dumps(findings, indent=2))
        return

    errors = [f for f in findings if f["severity"] == "error"]
    warnings = [f for f in findings if f["severity"] == "warning"]
    infos = [f for f in findings if f["severity"] == "info"]

    SEP = "-" * 70
    print(f"\n{SEP}")
    print("  CodeMaster Accessibility Audit")
    print(SEP)

    for f in sorted(findings, key=lambda x: SEVERITY[x["severity"]]):
        icon = {"error": "[x]", "warning": "[!]", "info": "[i]"}[f["severity"]]
        print(f"\n{icon}  [{f['severity'].upper()}] {f['rule']}")
        print(f"   File: {f['file']}  Line: {f['line']}")
        print(f"   {f['message']}")
        if f.get("fix"):
            print(f"   Fix: {f['fix']}")

    print(f"\n{SEP}")
    print(f"  {len(errors)} errors   {len(warnings)} warnings   {len(infos)} info")
    print(SEP + "\n")

    if errors:
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(description="CodeMaster Accessibility Audit")
    parser.add_argument("--json", action="store_true", help="Output results as JSON")
    args = parser.parse_args()

    audit_directory(ROOT / "src")
    print_report(as_json=args.json)


if __name__ == "__main__":
    main()
