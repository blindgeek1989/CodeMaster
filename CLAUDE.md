# CodeMaster — CLAUDE.md

## What this project is

CodeMaster is an Electron desktop learning platform for HTML, CSS, and JavaScript. It is built specifically for screen reader and keyboard users. Accessibility is a first-class requirement, not an afterthought.

## Stack

| Layer | Choice |
|-------|--------|
| Desktop shell | Electron |
| Renderer | Vanilla HTML, CSS, JavaScript (no framework) |
| Unit tests | Jest |
| E2E tests | Playwright + electron-playwright-helpers |
| Accessibility audit | `audit.py` (Python, no dependencies) |

## Project layout

```
codemaster/
├── CLAUDE.md              ← this file
├── audit.py               ← accessibility static analysis
├── package.json
├── playwright.config.js
├── src/
│   ├── main.js            ← Electron main process
│   ├── preload.js         ← context bridge
│   └── renderer/
│       ├── index.html     ← single shell HTML file
│       ├── styles/
│       │   └── main.css   ← all styles
│       ├── js/
│       │   └── app.js     ← all UI logic
│       └── data/          ← module content (one file per module)
│           ├── html-content.js
│           ├── css-content.js
│           ├── css-screenreader-content.js
│           └── js-content.js
└── tests/
    ├── unit/
    │   └── modules.test.js
    └── e2e/
        └── accessibility.spec.js
```

## Module system

Each module file in `src/renderer/data/` exports an object with this shape:

```js
{
  id: string,
  title: string,
  description: string,
  objectives: string[],
  goals: string[],
  lessons: [
    {
      id: string,
      title: string,
      content: string,
      quiz: [{ question, options, answer }],
      exercise: { prompt, starterCode, solution },
    }
  ]
}
```

To add a new module, create `src/renderer/data/<name>-content.js` following this shape, expose it on `window`, then register it in `src/renderer/js/app.js` in the `MODULES` object and `buildSidebar()`.

## SR Mode (Screen Reader CSS checkbox)

Checking the "Screen Reader CSS Mode" checkbox in the sidebar swaps the CSS module:
- Unchecked: loads `css-content.js` (standard CSS)
- Checked: loads `css-screenreader-content.js` (CSS through the lens of accessibility)

This is implemented in `app.js` via the `srModeCheckbox` change handler and the `state.srMode` flag.

## Accessibility requirements (non-negotiable)

- Every interactive element must be keyboard operable (Tab, Enter, Space, arrow keys)
- Never use `outline: none` without providing a `:focus-visible` replacement
- All images must have `alt` text or `alt=""` if decorative
- All form inputs must have associated `<label>` elements
- Dynamic content changes must use `aria-live` regions or `announce()` to notify screen readers
- When a new view loads, focus must move to the `<h1>` or first logical heading
- The `skip-link` must always be the first focusable element
- Reading order in HTML source must match the intended logical reading order

## Running the app

```
npm install
npm start
```

## Running tests

```
npm test          # Jest unit tests
npm run test:e2e  # Playwright end-to-end accessibility tests
python audit.py   # Accessibility static analysis
```

## Adding lessons

1. Open the relevant `src/renderer/data/<module>-content.js`
2. Add a new object to the `lessons` array following the existing shape
3. Run `npm test` — `modules.test.js` validates all lessons have the required fields

## Code style

- Vanilla JS only — no frameworks, no build step
- `const` for everything that does not change, `let` otherwise, never `var`
- DOM manipulation goes in `app.js` — module content stays in `data/` files
- No `innerHTML` with dynamic or user-supplied content — use `textContent` or `createElement`
- Every user-facing state change that is not visually obvious must call `announce()`
