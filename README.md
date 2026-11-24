# CodeMaster

**A guided coding curriculum for the modern web developer.**

CodeMaster is a desktop learning platform built with Electron. It provides structured, interactive lessons, quizzes, and coding exercises across a wide range of web development topics — from your very first line of HTML to advanced frameworks like React and Next.js.

---

## Features

- **22+ learning modules** organized by skill level (Beginner, Intermediate, Advanced)
- **Interactive exercises** with starter code, hints, and solutions
- **Quizzes** after every lesson to reinforce what you have learned
- **Code execution** for Python, SQL, and PowerShell exercises
- **Prerequisite system** that guides you through modules in a logical order
- **Full-text search** across all lessons and modules
- **Bookmarks** to save and return to lessons
- **Glossary** of coding terms
- **Adjustable text size** for comfortable reading
- **Auto-updates** so you always have the latest content
- **Fully accessible** — keyboard-operable with complete screen reader support

---

## Modules

### Beginner
| Module | Description |
|--------|-------------|
| Think Like a Programmer | Problem-solving mindset and foundations |
| HTML | Structure and markup |
| CSS | Styling and layout |
| Python | General-purpose scripting |
| SQL | Database queries |
| PowerShell | Windows scripting and automation |
| Git & Version Control | Tracking changes and branching |
| Prompt Engineering | Writing effective AI prompts |
| Intro to Scrum | Agile fundamentals |

### Intermediate
| Module | Description |
|--------|-------------|
| JavaScript | Core language and DOM |
| ARIA | Accessible Rich Internet Applications |
| GitHub | Remote repositories and collaboration |
| Async JavaScript | Promises, async/await, and fetch |
| Node.js & Express | Server-side JavaScript |
| Testing with Jest | Unit testing fundamentals |
| Regular Expressions | Pattern matching and text processing |
| Scrum Master | Facilitation and team dynamics |

### Advanced
| Module | Description |
|--------|-------------|
| TypeScript | Typed JavaScript |
| React | Component-based UI |
| Next.js | Full-stack React framework |
| Scrum Master with AI | AI-assisted agile coaching |
| Scrum Exam Prep | Certification preparation |

---

## Installation

Download the latest installer from the [Releases](https://github.com/blindgeek1989/CodeMaster/releases) page and run `CodeMaster-Setup-x.x.x.exe`.

---

## Running from source

```bash
git clone https://github.com/blindgeek1989/CodeMaster.git
cd CodeMaster
npm install
npm start
```

---

## Running tests

```bash
npm test           # Jest unit tests
npm run test:e2e   # Playwright end-to-end accessibility tests
python audit.py    # Accessibility static analysis
```

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Desktop shell | Electron |
| Renderer | Vanilla HTML, CSS, JavaScript |
| Unit tests | Jest |
| E2E tests | Playwright |
| Packaging | electron-builder |

---

## Contributing

See the [Wiki](https://github.com/blindgeek1989/CodeMaster/wiki) for a full contributor guide, including how to add new modules and lessons.

Bug reports and feature requests are welcome via [GitHub Issues](https://github.com/blindgeek1989/CodeMaster/issues).

---

## License

MIT © 2026 blindgeek1989
