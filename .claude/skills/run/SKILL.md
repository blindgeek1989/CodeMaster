---
name: run
description: Launch, drive, and screenshot the CodeMaster Electron desktop app. Use when asked to run the app, take a screenshot, verify a UI change, or interact with its interface.
---

CodeMaster is an Electron desktop app. Drive it via the Playwright REPL at `.claude/skills/run/driver.mjs`. Always run from the project root.

## Prerequisites

`playwright` is already installed in the project (`node_modules/playwright`). No extra install needed.

## Run (Windows — standard path)

```bash
cd "C:/a11y project/codemaster"
node .claude/skills/run/driver.mjs
```

For tmux-based agent use:

```bash
tmux new-session -d -s app -x 220 -y 50
tmux send-keys -t app 'cd "C:/a11y project/codemaster" && node .claude/skills/run/driver.mjs' Enter
# wait for prompt
timeout 15 bash -c 'until tmux capture-pane -t app -p | grep -q "driver>"; do sleep 0.3; done'
tmux send-keys -t app 'launch' Enter
timeout 35 bash -c 'until tmux capture-pane -t app -p | grep -q "launched"; do sleep 0.5; done'
tmux send-keys -t app 'dismiss-dialog' Enter
sleep 1
tmux send-keys -t app 'ss landing' Enter
timeout 10 bash -c 'until tmux capture-pane -t app -p | grep -q "screenshot:"; do sleep 0.3; done'
tmux capture-pane -t app -p
```

Screenshots land in `screenshots/` under the project root (override with `SCREENSHOT_DIR=<path>`).

## Commands

| command | what it does |
|---|---|
| `launch` | launch the Electron app, wait for it to load (~3 s) |
| `dismiss-dialog` | click "Start Fresh" on the resume dialog shown at startup |
| `open-module <label>` | click a sidebar module by partial label, e.g. `open-module HTML` |
| `open-lesson <text>` | click a lesson by partial title, e.g. `open-lesson Lesson 1` |
| `ss [name]` | screenshot → `screenshots/<name>.png` |
| `scroll [px]` | scroll the lesson content area (default 400 px) |
| `click <css-sel>` | click an element via DOM `.click()` |
| `click-text <text>` | click button/link containing text |
| `type <text>` | type text via keyboard |
| `press <key>` | press a key, e.g. `press Tab` or `press Escape` |
| `wait <css-sel>` | wait up to 10 s for an element to appear |
| `eval <js>` | evaluate JS in the page, print JSON result |
| `text [css-sel]` | print `innerText` of an element (or body) |
| `windows` | list all open windows |
| `quit` | close the app and exit the driver |
| `help` | list all commands |

## Gotchas

- **Resume dialog on startup** — the app always shows a "Welcome back!" dialog offering to resume the last lesson. Run `dismiss-dialog` after `launch` before interacting with anything else.
- **No xvfb needed on Windows** — the app opens a real window. On headless Linux you would need `xvfb-run -a node ...`, but this project targets Windows.
- **Electron binary path** — the driver hard-codes `node_modules/electron/dist/electron.exe`. On macOS it would be `.../Electron.app/Contents/MacOS/Electron`; adjust if ever running cross-platform.
- **stdin on Windows** — the driver opens `CONIN$` instead of `/dev/stdin` for the REPL input stream so PowerShell/cmd sessions work correctly.
- **Lesson content scroll** — the scrollable area inside a lesson is `.lesson-content`, not `document.scrollingElement`. The `scroll` command handles this automatically.

## Human path

```
npm start
```

Opens the app window directly. Ctrl-C to quit.
