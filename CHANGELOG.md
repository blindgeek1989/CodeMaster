# Changelog

All notable changes to CodeMaster are documented here.
When you publish a GitHub Release, paste the relevant section into the release notes
so users see "What's new" in the update notification.

## [1.2.0] - 2026-07-31

### Added
- HTML module expanded from 6 to 10 lessons:
  - Lesson 7: Tables (th, scope, caption, thead/tbody/tfoot)
  - Lesson 8: Audio and Video (controls, track element, captions, transcripts)
  - Lesson 9: Introduction to ARIA (aria-label, aria-labelledby, aria-describedby, aria-hidden, aria-live, role)
  - Lesson 10: Putting It All Together (complete accessible page + checklist)
- CSS module expanded from 5 to 9 lessons:
  - Lesson 6: CSS Grid (grid-template-columns, fr units, grid-column: 1/-1)
  - Lesson 7: Responsive Design and Media Queries (mobile-first, min-width breakpoints, clamp())
  - Lesson 8: CSS Custom Properties / Variables (:root, theming, dark mode)
  - Lesson 9: Transitions and Animations (transition, transform, @keyframes, prefers-reduced-motion)
- CSS for Screen Readers module expanded from 5 to 8 lessons:
  - Lesson 6: Styling Accessible Form States (aria-invalid with CSS, required/error/disabled visuals)
  - Lesson 7: Color and Contrast — The Numbers (WCAG 4.5:1 / 3:1 ratios, common mistakes)
  - Lesson 8: CSS for Interactive Component States (aria-expanded, aria-selected, aria-pressed)
- JavaScript module expanded from 5 to 9 lessons:
  - Lesson 6: Working with Forms (preventDefault, validation, accessible error messages)
  - Lesson 7: Fetch API (fetch(), async/await, try/catch, loading states)
  - Lesson 8: Local Storage (setItem/getItem, JSON.stringify/parse, saving preferences)
  - Lesson 9: Accessible JavaScript Patterns (focus management, focus trapping, aria-live announcements)

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
