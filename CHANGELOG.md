# Changelog

All notable changes to CodeMaster are documented here.
When you publish a GitHub Release, paste the relevant section into the release notes
so users see "What's new" in the update notification.

## [1.1.0] - 2026-07-31

### Changed
- Redesigned UX: lessons now display one at a time instead of as a long scroll
- Added Previous Lesson / Next Lesson navigation buttons
- Added module intro page with objectives, goals, and lesson list overview
- Added module completion screen with link to the next module
- Sidebar now highlights the currently active lesson
- Rewrote all lesson content from zero assumed knowledge:
  - HTML: expanded to 6 lessons, starting from "what is a website?"
  - CSS: expanded to 5 lessons, starting from "what is CSS?"
  - CSS for Screen Reader Users: 5 lessons starting from the accessibility tree
  - JavaScript: expanded to 5 lessons, starting from "what is programming?"

## [1.0.0] - 2026-07-31

### Added
- Initial release of CodeMaster
- HTML Fundamentals module — 3 lessons with quiz and coding exercises
- CSS Fundamentals module — 3 lessons with quiz and coding exercises
- CSS for Screen Reader Users module — 5 lessons covering display:none vs sr-only, focus indicators, prefers-reduced-motion, forced-colors, and DOM vs visual order
- JavaScript Fundamentals module — 3 lessons including ARIA live regions and focus management
- Screen Reader CSS Mode toggle in sidebar
- Skip link, ARIA landmarks, and sr-only announcer for full screen reader support
- Keyboard-operable code editor with Tab-to-indent
- Jest unit tests and Playwright accessibility tests
- Python accessibility audit tool (audit.py)
- Windows installer and auto-update support
