'use strict';

const githubModule = {
  id: 'github',
  title: 'GitHub',
  description: 'GitHub is the world\'s largest platform for hosting and collaborating on code. This module covers the GitHub-specific features that go beyond git commands: managing repositories, tracking work with Issues and Projects, automating workflows with Actions, and contributing to open source.',
  objectives: [
    'Navigate the GitHub interface and understand its core features',
    'Create and configure repositories with READMEs, .gitignore files, and licences',
    'Use GitHub Issues to track bugs, tasks, and feature requests',
    'Manage work with GitHub Projects (kanban boards)',
    'Understand GitHub Actions for continuous integration and deployment',
    'Deploy a static site with GitHub Pages',
    'Fork repositories and contribute to open source projects',
    'Use GitHub security features to protect your code',
  ],
  goals: [
    'Create a repository on GitHub with a README and licence',
    'Open, label, and close an Issue on a repository',
    'Write a basic GitHub Actions workflow that runs on push',
    'Deploy a static HTML site using GitHub Pages',
    'Fork a repository and open a pull request to the original project',
  ],
  lessons: [
    // ─────────────────────────────────────────────────────────────────
    // LESSON 1 — GITHUB OVERVIEW
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'github-1',
      title: 'Lesson 1: GitHub Overview',
      content: `GitHub is a cloud platform built on top of Git that lets developers store code, collaborate with others, and manage projects. With over 100 million developers, it is the central hub of modern open-source and professional software development.

YOUR GITHUB PROFILE
When you create a GitHub account, you get a public profile at github.com/yourname. Your profile shows:
  - Repositories you own or have contributed to
  - Your contribution graph (the green squares showing daily activity)
  - Pinned repositories you want to highlight
  - A profile README (a special repository named after your username)

REPOSITORIES
A repository (repo) is where your project lives. Each repo contains:
  - All your files and folders
  - The full Git history of every change ever made
  - Issues, pull requests, and discussions
  - Settings for access control, branch protection, and more

STARS
Starring a repository is like bookmarking it. You can star repos you find useful so you can find them later. A repo's star count is also a rough measure of popularity.
  - Browse your starred repos: github.com/stars

FORKS
A fork is a personal copy of someone else's repository. When you fork, you get your own version that you can modify freely. Forking is the standard way to contribute to projects you do not own.

WATCHING
You can "watch" a repository to receive notifications when Issues or Pull Requests are opened, commented on, or closed. Useful for staying up to date on projects you care about without having to fork or clone them.

ORGANISATIONS
Organisations are shared GitHub accounts for teams and companies. They let multiple people collaborate with fine-grained permissions. For example: github.com/microsoft, github.com/facebook.

EXPLORE
GitHub Explore (github.com/explore) lets you discover trending repositories, topics, and collections. A great way to find open-source projects to learn from or contribute to.`,
      quiz: [
        {
          question: 'What is the difference between a Fork and a Clone?',
          options: [
            'There is no difference — they both produce a local copy',
            'A fork creates a personal copy on GitHub; a clone downloads a copy to your local computer',
            'A fork creates a local copy; a clone creates a copy on GitHub',
            'Forking is for public repos; cloning is for private repos',
          ],
          answer: 'A fork creates a personal copy on GitHub; a clone downloads a copy to your local computer',
        },
        {
          question: 'What does "starring" a repository do?',
          options: [
            'Marks the repository as the official version of a project',
            'Sends a notification to the repository owner',
            'Bookmarks the repository so you can find it later, and shows the owner appreciation',
            'Gives you write access to the repository',
          ],
          answer: 'Bookmarks the repository so you can find it later, and shows the owner appreciation',
        },
        {
          question: 'Where does a GitHub user\'s public profile live?',
          options: [
            'github.com/profile/username',
            'github.com/users/username',
            'github.com/username',
            'github.com/@username',
          ],
          answer: 'github.com/username',
        },
      ],
      exercise: {
        prompt: 'Describe what you would put on your GitHub profile to make it stand out as a developer. What should your profile README include? What repos would you pin?',
        starterCode: `// Describe your ideal GitHub profile

// Profile README should include:

// Repos I would pin:

// Why these repos represent me well:`,
        solution: `// Profile README should include:
// - A brief introduction: who you are and what you build
// - Technologies you work with (HTML, CSS, JavaScript, Python, etc.)
// - A link to your portfolio or LinkedIn
// - Any accessibility or open-source work you are proud of
// - A contact email or social link

// Repos I would pin:
// - A portfolio project that shows my best work
// - A project that solves a real problem I faced
// - A contribution to an open-source project
// - A learning project that shows growth (e.g., this CodeMaster app)

// Why these repos represent me well:
// Pinned repos are the first thing a recruiter or collaborator sees.
// Choose projects that show range: one that shows design skill,
// one that shows logic, one that shows you can work with others.`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 2 — CREATING AND MANAGING REPOSITORIES
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'github-2',
      title: 'Lesson 2: Creating and Managing Repositories',
      content: `Creating a repository on GitHub properly from the start saves time and makes your project more professional.

CREATING A REPOSITORY ON GITHUB
1. Click the + button in the top-right corner of GitHub
2. Select "New repository"
3. Fill in:
   - Repository name: use lowercase-with-hyphens (e.g., my-portfolio)
   - Description: a one-line summary of the project
   - Visibility: Public or Private
   - Initialise with README: yes (highly recommended)
   - .gitignore template: choose your language
   - Licence: choose one (see below)

THE README FILE
README.md is the first thing visitors see. A good README includes:
  - Project name and description
  - Screenshots or demo link (if applicable)
  - Installation instructions
  - Usage examples
  - Contributing guidelines
  - Licence

The .md extension means Markdown — a lightweight formatting syntax. GitHub renders it as formatted HTML.

.gitignore
A .gitignore file tells Git which files NOT to track. Common things to ignore:
  - node_modules/     — npm dependencies (huge; regenerated from package.json)
  - .env              — environment variables with secrets
  - dist/ or build/   — compiled output files
  - .DS_Store         — macOS system files
  - *.log             — log files

GitHub provides templates for most languages so you do not need to write this from scratch.

LICENCES
Choosing a licence tells others what they can do with your code:
  - MIT: very permissive — anyone can use, modify, and distribute with attribution
  - Apache 2.0: like MIT, but with explicit patent protection
  - GPL 3.0: "copyleft" — derivatives must also be open source
  - No licence: others have NO legal right to use your code

Most open-source projects use MIT. If you are unsure, MIT is a safe choice.

TOPICS AND DESCRIPTIONS
Add topics (tags) to your repository to make it discoverable:
  - Click the gear icon next to "About" on the repo homepage
  - Add topics like: html, css, javascript, accessibility, open-source
  - These appear in GitHub search and Explore

BRANCH PROTECTION
For any project where multiple people contribute, protect the main branch:
  Repository -> Settings -> Branches -> Add branch protection rule
  - Require pull request reviews before merging
  - Require status checks to pass (CI tests)
  - Prevent force pushes to main

This ensures no one accidentally breaks the main branch.`,
      quiz: [
        {
          question: 'What is the purpose of a .gitignore file?',
          options: [
            'To list files that GitHub will automatically delete after 30 days',
            'To tell Git which files and folders should NOT be tracked or committed',
            'To ignore errors when running git commands',
            'To prevent other users from viewing your repository',
          ],
          answer: 'To tell Git which files and folders should NOT be tracked or committed',
        },
        {
          question: 'You want others to freely use, modify, and distribute your code as long as they give you credit. Which licence should you choose?',
          options: [
            'GPL 3.0',
            'No licence',
            'MIT',
            'Apache 2.0',
          ],
          answer: 'MIT',
        },
        {
          question: 'Why should you NOT commit the node_modules/ folder to Git?',
          options: [
            'GitHub does not support JavaScript projects',
            'It contains your source code and would expose it publicly',
            'It is huge and can be regenerated from package.json at any time with npm install',
            'Git cannot track folders, only individual files',
          ],
          answer: 'It is huge and can be regenerated from package.json at any time with npm install',
        },
      ],
      exercise: {
        prompt: 'Write a .gitignore file for a Node.js web project. Include entries for: npm dependencies, environment variables, compiled output, and common OS files.',
        starterCode: `# .gitignore for a Node.js web project

# npm dependencies

# Environment variables

# Compiled/build output

# OS-generated files`,
        solution: `# .gitignore for a Node.js web project

# npm dependencies
node_modules/
package-lock.json

# Environment variables
.env
.env.local
.env.production

# Compiled/build output
dist/
build/
*.min.js
*.min.css

# OS-generated files
.DS_Store
Thumbs.db
*.log`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 3 — GITHUB ISSUES
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'github-3',
      title: 'Lesson 3: GitHub Issues',
      content: `GitHub Issues is a built-in bug tracker and task management system. Every repository has an Issues tab where the team logs bugs, feature requests, questions, and tasks.

CREATING AN ISSUE
To open an issue:
  1. Go to the repository's Issues tab
  2. Click "New issue"
  3. Write a title: specific and descriptive ("Login button not focusable with keyboard")
  4. Write a description: include steps to reproduce, expected behaviour, actual behaviour, environment
  5. Assign labels, assignees, and a milestone

A GOOD ISSUE DESCRIPTION
For a BUG report:
  **Steps to reproduce:**
  1. Open the app
  2. Press Tab to reach the login button
  3. Press Enter

  **Expected:** Login form submits
  **Actual:** Nothing happens — button is not keyboard operable

  **Environment:** Chrome 124, Windows 11

For a FEATURE REQUEST:
  **Problem:** Users cannot bookmark lessons for later review.
  **Proposed solution:** Add a bookmark icon on each lesson that saves to localStorage.
  **Acceptance criteria:** Bookmarks persist across sessions; there is a "My Bookmarks" panel.

LABELS
Labels categorise issues for easy filtering. Common defaults:
  - bug: something is broken
  - enhancement: a new feature request
  - documentation: docs need updating
  - good first issue: beginner-friendly — great for attracting contributors
  - help wanted: maintainer is looking for help

You can create custom labels too (e.g., accessibility, priority: high).

ASSIGNEES AND MILESTONES
  - Assignee: the person responsible for this issue
  - Milestone: a group of issues that must be done for a release (e.g., "v2.0 Launch")

CLOSING ISSUES WITH KEYWORDS
When you commit or merge a PR, you can automatically close linked issues by including keywords in your commit message or PR description:

  Closes #42
  Fixes #17
  Resolves #9

GitHub detects these keywords and closes the issue when the commit lands on the default branch.

FILTERING AND SEARCHING
Use filters to find issues quickly:
  - is:open is:issue label:bug
  - is:closed assignee:@me
  - is:issue mention:@username`,
      quiz: [
        {
          question: 'Which keyword in a pull request description automatically closes the linked issue when the PR is merged?',
          options: [
            'References #42',
            'See #42',
            'Closes #42',
            'Related to #42',
          ],
          answer: 'Closes #42',
        },
        {
          question: 'What label should you add to issues that are suitable for new contributors?',
          options: [
            'beginner',
            'good first issue',
            'help wanted',
            'starter',
          ],
          answer: 'good first issue',
        },
        {
          question: 'A milestone on GitHub is:',
          options: [
            'A badge awarded when a repository reaches 1000 stars',
            'A grouping of issues and pull requests that must be completed for a specific release or goal',
            'A required step before you can open a pull request',
            'A Git tag that marks a specific version of the code',
          ],
          answer: 'A grouping of issues and pull requests that must be completed for a specific release or goal',
        },
      ],
      exercise: {
        prompt: 'Write a well-structured bug report Issue for the following problem: On your web app, the modal dialog does not trap focus — pressing Tab moves focus outside the modal while it is open, which breaks keyboard navigation.',
        starterCode: `**Title:**

**Steps to reproduce:**
1.
2.
3.

**Expected behaviour:**

**Actual behaviour:**

**Environment:**

**Labels to add:**`,
        solution: `**Title:** Modal dialog does not trap focus — keyboard users can Tab outside the open modal

**Steps to reproduce:**
1. Open the app and navigate to a page with a modal dialog
2. Trigger the modal to open (e.g., click the "More info" button)
3. Press Tab repeatedly

**Expected behaviour:**
Focus should cycle only through interactive elements inside the modal while it is open. Pressing Tab on the last element should wrap back to the first element inside the modal.

**Actual behaviour:**
Tab moves focus to elements behind the modal (in the page underneath), making it impossible for keyboard-only users to interact with the modal content.

**Environment:**
Chrome 124, Windows 11, tested with NVDA screen reader and keyboard only.

**Labels to add:**
bug, accessibility, priority: high`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 4 — GITHUB PROJECTS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'github-4',
      title: 'Lesson 4: GitHub Projects',
      content: `GitHub Projects is a flexible planning tool built into GitHub. It lets you organise Issues and Pull Requests into a visual board so your team can see the status of work at a glance.

WHAT IS A GITHUB PROJECT?
A Project is a spreadsheet/board that contains Items. Each Item can be:
  - A GitHub Issue from any repository
  - A Pull Request
  - A draft note (plain text, not yet an Issue)

VIEWS
Projects support multiple views:
  - Board view: columns like "To Do", "In Progress", "Done" (kanban style)
  - Table view: spreadsheet with rows and columns
  - Roadmap view: timeline chart for scheduling

You can switch between views within the same project.

CREATING A PROJECT
1. Go to your profile or organisation
2. Click "Projects" -> "New project"
3. Choose a template (Team Backlog is a good starting point)
4. Add your Issues and Pull Requests to the board

CUSTOM FIELDS
You can add custom fields to Items:
  - Priority: High / Medium / Low
  - Status: Todo / In Progress / In Review / Done
  - Estimate: story points or hours
  - Sprint: which sprint this belongs to

This turns GitHub Projects into a lightweight project management tool (similar to Jira or Trello).

AUTOMATIONS
GitHub Projects can automatically move Items when certain events happen:
  - When a PR is merged -> move Issue to "Done"
  - When an Issue is reopened -> move it back to "In Progress"
  - When a PR is reviewed -> move it to "In Review"

Set up automations in the project's Settings -> Workflows.

BEST PRACTICES
  - Keep the board up to date — a stale board is worse than no board
  - Limit work in progress (WIP): no more than 2-3 items per person "In Progress" at once
  - Use "In Review" status so reviewers know what needs their attention
  - Review the board at the start of standups to focus the conversation`,
      quiz: [
        {
          question: 'What can be added to a GitHub Project board?',
          options: [
            'Only Issues, not Pull Requests',
            'Only Pull Requests, not Issues',
            'Issues, Pull Requests, and draft notes',
            'Only commits and branches',
          ],
          answer: 'Issues, Pull Requests, and draft notes',
        },
        {
          question: 'What is the benefit of a kanban-style board view in GitHub Projects?',
          options: [
            'It automatically writes code based on the Issue description',
            'It shows work status visually in columns so the team can see what is in progress, blocked, or done',
            'It replaces GitHub Issues, so you only need one tool',
            'It enforces a maximum number of commits per day',
          ],
          answer: 'It shows work status visually in columns so the team can see what is in progress, blocked, or done',
        },
        {
          question: 'A WIP (Work In Progress) limit means:',
          options: [
            'You can only have a limited number of repositories in your account',
            'Each team member works on no more than a set number of items simultaneously, to avoid spreading attention too thin',
            'Pull requests must be reviewed within a limited time before they expire',
            'Draft issues are deleted after a set number of days if not converted',
          ],
          answer: 'Each team member works on no more than a set number of items simultaneously, to avoid spreading attention too thin',
        },
      ],
      exercise: {
        prompt: 'Design a GitHub Project board for a small team building a web app. List the columns you would create, three example Issues you would add, and one automation rule.',
        starterCode: `// GitHub Project board design

// Board columns:

// Three example Issues:
// 1.
// 2.
// 3.

// One automation rule:`,
        solution: `// Board columns:
// Backlog | To Do | In Progress | In Review | Done

// Three example Issues:
// 1. "Add skip link for keyboard navigation" — label: accessibility, priority: High
// 2. "Write README with installation instructions" — label: documentation, priority: Medium
// 3. "Fix colour contrast on footer links (fails WCAG AA)" — label: bug, accessibility, priority: High

// One automation rule:
// When a Pull Request is merged and it closes an Issue, automatically
// move that Issue's card to the "Done" column.
// This keeps the board up to date without manual work after every merge.`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 5 — GITHUB ACTIONS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'github-5',
      title: 'Lesson 5: GitHub Actions — Automate Your Workflow',
      content: `GitHub Actions is a built-in automation platform. It runs custom scripts (called workflows) in response to events in your repository — like pushing code or opening a pull request.

WHAT CAN GITHUB ACTIONS DO?
  - Run your test suite every time someone pushes code (Continuous Integration)
  - Deploy your app to a server or cloud when a PR is merged (Continuous Deployment)
  - Automatically lint and format code before a PR can be merged
  - Send a Slack notification when a deployment completes
  - Publish a package to npm when you create a release

KEY CONCEPTS
  - Workflow: the automation file (YAML format, stored in .github/workflows/)
  - Event: what triggers the workflow (push, pull_request, schedule, etc.)
  - Job: a set of steps that run on the same machine
  - Step: a single command or action
  - Action: a reusable unit of automation (from the GitHub Marketplace)
  - Runner: the server where the workflow runs (GitHub provides hosted runners)

A BASIC WORKFLOW: RUN TESTS ON EVERY PUSH
File: .github/workflows/ci.yml

  name: CI

  on:
    push:
      branches: [main]
    pull_request:
      branches: [main]

  jobs:
    test:
      runs-on: ubuntu-latest

      steps:
        - name: Check out code
          uses: actions/checkout@v4

        - name: Set up Node.js
          uses: actions/setup-node@v4
          with:
            node-version: '20'

        - name: Install dependencies
          run: npm install

        - name: Run tests
          run: npm test

READING THE YAML
  - name: the workflow's display name
  - on: which events trigger it (push to main, or any pull_request targeting main)
  - jobs: a workflow can have multiple jobs that run in parallel or sequence
  - runs-on: the operating system for the runner (ubuntu-latest is most common)
  - steps: each step either runs a shell command (run:) or calls a reusable Action (uses:)
  - uses: actions/checkout@v4: clones your repo onto the runner

MARKETPLACE ACTIONS
The GitHub Marketplace has thousands of pre-built Actions:
  - actions/checkout: clone the repository
  - actions/setup-node: install a specific Node.js version
  - actions/setup-python: install Python
  - peaceiris/actions-gh-pages: deploy to GitHub Pages

You reference them with: uses: owner/repo@version

STATUS BADGES
Add a workflow status badge to your README to show if tests are passing:
  ![CI](https://github.com/username/repo/actions/workflows/ci.yml/badge.svg)`,
      quiz: [
        {
          question: 'Where are GitHub Actions workflow files stored in a repository?',
          options: [
            'In the root of the repository as .workflow files',
            'In the .github/workflows/ directory as YAML files',
            'In a special Actions tab, not in the repository files',
            'In package.json under the "scripts" key',
          ],
          answer: 'In the .github/workflows/ directory as YAML files',
        },
        {
          question: 'In a GitHub Actions workflow, what does the "on:" key specify?',
          options: [
            'The operating system the workflow runs on',
            'The events that trigger the workflow to run',
            'Whether the workflow is enabled or disabled',
            'The name of the Action to use from the Marketplace',
          ],
          answer: 'The events that trigger the workflow to run',
        },
        {
          question: 'What is Continuous Integration (CI)?',
          options: [
            'Automatically deploying your app to production on every commit',
            'Manually running tests before submitting a pull request',
            'Automatically running tests and checks on every code change to catch problems early',
            'A GitHub feature that integrates Issues with Project boards',
          ],
          answer: 'Automatically running tests and checks on every code change to catch problems early',
        },
      ],
      exercise: {
        prompt: 'Write a GitHub Actions workflow that runs on every push to main. It should: check out the code, install Python 3.11, and run "python audit.py" (an accessibility audit script).',
        starterCode: `# .github/workflows/accessibility-audit.yml

name:

on:
  push:
    branches:

jobs:
  audit:
    runs-on:

    steps:
      - name: Check out code
        uses:

      - name: Set up Python
        uses:
        with:
          python-version:

      - name: Run accessibility audit
        run:`,
        solution: `# .github/workflows/accessibility-audit.yml

name: Accessibility Audit

on:
  push:
    branches: [main]

jobs:
  audit:
    runs-on: ubuntu-latest

    steps:
      - name: Check out code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Run accessibility audit
        run: python audit.py`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 6 — GITHUB PAGES
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'github-6',
      title: 'Lesson 6: GitHub Pages — Free Static Site Hosting',
      content: `GitHub Pages lets you host a static website (HTML, CSS, JavaScript) directly from a GitHub repository — completely free. No server needed.

WHAT GITHUB PAGES HOSTS
GitHub Pages is designed for static content:
  - Portfolio sites
  - Project documentation
  - HTML/CSS/JS demos
  - Jekyll or Hugo blogs
  - Open-source project homepages

It does NOT support server-side code (Node.js, Python, PHP, databases). For dynamic apps, use a service like Render or Railway.

YOUR SITE URL
  - For a user/organisation site: github.com/username -> username.github.io
  - For a project site: github.com/username/project -> username.github.io/project

ENABLING GITHUB PAGES
Method 1 — Deploy from a branch:
  1. Go to Repository -> Settings -> Pages
  2. Under "Source", select "Deploy from a branch"
  3. Choose your branch (usually main) and folder (/ root or /docs)
  4. Click Save
  5. GitHub builds and deploys — your site is live within a minute

Method 2 — Deploy via GitHub Actions (recommended for more control):
  1. Go to Settings -> Pages
  2. Select "GitHub Actions" as the source
  3. GitHub suggests a workflow — click "Configure"
  4. Commit the generated workflow file
  5. Every push to main triggers a new deployment

CUSTOM DOMAIN
You can point a custom domain (e.g., myportfolio.com) to GitHub Pages:
  1. Buy a domain from a registrar (Namecheap, Cloudflare, etc.)
  2. Go to Repository -> Settings -> Pages -> Custom domain
  3. Enter your domain and save
  4. Configure your DNS records at your registrar to point to GitHub's servers

GitHub Pages also provides free HTTPS via Let's Encrypt.

JEKYLL
GitHub Pages natively supports Jekyll — a static site generator that converts Markdown files into HTML. If your repo contains a _config.yml, GitHub will build it with Jekyll automatically. Useful for blogs and documentation sites without writing raw HTML.`,
      quiz: [
        {
          question: 'What kind of website can GitHub Pages host?',
          options: [
            'Any website, including ones with databases and server-side code',
            'Only Jekyll blogs — no custom HTML or JavaScript',
            'Static websites (HTML, CSS, JavaScript) with no server-side processing',
            'Only websites with an open-source licence',
          ],
          answer: 'Static websites (HTML, CSS, JavaScript) with no server-side processing',
        },
        {
          question: 'If your GitHub username is "codemaster99", what is the URL of your user GitHub Pages site?',
          options: [
            'github.com/codemaster99/pages',
            'codemaster99.github.pages.io',
            'codemaster99.github.io',
            'pages.github.com/codemaster99',
          ],
          answer: 'codemaster99.github.io',
        },
        {
          question: 'Which folder setting in Repository -> Settings -> Pages means GitHub serves files from the root of the repository?',
          options: [
            '/src',
            '/public',
            '/ (root)',
            '/www',
          ],
          answer: '/ (root)',
        },
      ],
      exercise: {
        prompt: 'You have built a portfolio site with an index.html in the root of your repository. Write the step-by-step instructions for enabling GitHub Pages so the site is live at yourusername.github.io/portfolio.',
        starterCode: `// Step-by-step: Enable GitHub Pages for a portfolio repo

// Step 1:

// Step 2:

// Step 3:

// Step 4:

// Expected URL after deployment:`,
        solution: `// Step-by-step: Enable GitHub Pages for a portfolio repo

// Step 1:
// Go to the repository on GitHub (github.com/yourusername/portfolio)

// Step 2:
// Click Settings (top navigation of the repo, not your profile settings)

// Step 3:
// In the left sidebar, click "Pages"
// Under "Source", click the dropdown and select "Deploy from a branch"
// Choose branch: main
// Choose folder: / (root)
// Click Save

// Step 4:
// Wait 1-2 minutes for GitHub to build and deploy the site.
// A green banner at the top of the Pages settings will show:
// "Your site is live at https://yourusername.github.io/portfolio"

// Expected URL after deployment:
// https://yourusername.github.io/portfolio`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 7 — FORKING AND OPEN SOURCE
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'github-7',
      title: 'Lesson 7: Forking and Contributing to Open Source',
      content: `Contributing to open source is one of the best ways to improve as a developer, build a portfolio, and give back to projects you use every day. GitHub makes this possible through forking.

THE FORK -> CLONE -> PR WORKFLOW
This is the standard way to contribute to a project you do not own:

1. FORK the repository on GitHub (your personal copy lives at github.com/you/project)
2. CLONE your fork to your local machine
3. Create a BRANCH for your change
4. Make your CHANGES and commit them
5. PUSH the branch to your fork
6. Open a PULL REQUEST from your fork to the original repository

In detail:
  # Step 2: Clone your fork
  git clone https://github.com/you/project.git
  cd project

  # Step 3: Create a branch
  git switch -c fix/keyboard-navigation

  # Step 4: Make changes, commit
  git add .
  git commit -m "Fix: Tab key no longer exits modal dialog"

  # Step 5: Push to your fork
  git push -u origin fix/keyboard-navigation

  # Step 6: Go to GitHub and open a PR from your fork to the original repo

KEEPING YOUR FORK IN SYNC
The original repository (called "upstream") keeps moving. To keep your fork current:

  # Add the original repo as "upstream" (one-time setup)
  git remote add upstream https://github.com/original-owner/project.git

  # Fetch latest changes from upstream
  git fetch upstream

  # Merge them into your local main
  git switch main
  git merge upstream/main

  # Push the updated main to your fork
  git push origin main

READING CONTRIBUTING GUIDELINES
Before contributing, always read:
  - CONTRIBUTING.md: the project's rules for how to contribute
  - CODE_OF_CONDUCT.md: expected behaviour in the community
  - Issues labelled "good first issue": beginner-friendly starting points

GOOD FIRST CONTRIBUTIONS
You do not need to fix a complex bug to contribute. Great first contributions include:
  - Fixing a typo in documentation
  - Improving a README
  - Adding a missing alt text to an image
  - Writing a test for an untested function
  - Translating documentation`,
      quiz: [
        {
          question: 'When contributing to a project you do not own, why do you fork first rather than cloning the original directly?',
          options: [
            'Cloning requires the owner\'s permission; forking does not',
            'Forking gives you write access to push branches and open pull requests without needing to be a collaborator on the original repository',
            'Forks are faster to clone than the original repository',
            'You can only push to a fork, not to a clone',
          ],
          answer: 'Forking gives you write access to push branches and open pull requests without needing to be a collaborator on the original repository',
        },
        {
          question: 'What is the "upstream" remote in a forking workflow?',
          options: [
            'Your fork on GitHub',
            'The branch your feature branch was created from',
            'The original repository that you forked from',
            'The GitHub Actions workflow that runs your tests',
          ],
          answer: 'The original repository that you forked from',
        },
        {
          question: 'Before submitting a contribution to an open-source project, you should always:',
          options: [
            'Email the project owner to ask permission',
            'Star the repository first',
            'Read the CONTRIBUTING.md file to understand the project\'s contribution process and standards',
            'Fork the repository under an organisation account',
          ],
          answer: 'Read the CONTRIBUTING.md file to understand the project\'s contribution process and standards',
        },
      ],
      exercise: {
        prompt: 'Write the complete sequence of terminal commands to: (1) clone your fork of an open-source project, (2) create a fix branch, (3) add the upstream remote, (4) keep your fork in sync with upstream, (5) push your branch.',
        starterCode: `# Fork-based contribution workflow
# (Assume you have already forked the repo on GitHub)

# 1. Clone your fork:

# 2. Enter the project folder and create a fix branch:

# 3. Add the original repo as "upstream":

# 4. Keep your fork's main in sync with upstream:

# 5. Push your fix branch to your fork:`,
        solution: `# Fork-based contribution workflow

# 1. Clone your fork:
git clone https://github.com/you/project.git
cd project

# 2. Enter the project folder and create a fix branch:
git switch -c fix/improve-keyboard-nav

# 3. Add the original repo as "upstream":
git remote add upstream https://github.com/original-owner/project.git

# 4. Keep your fork's main in sync with upstream:
git fetch upstream
git switch main
git merge upstream/main
git push origin main

# 5. Push your fix branch to your fork:
git push -u origin fix/improve-keyboard-nav
# Then go to GitHub and open a Pull Request`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 8 — GITHUB SECURITY FEATURES
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'github-8',
      title: 'Lesson 8: GitHub Security Features',
      content: `GitHub provides a set of built-in security tools that help you find and fix vulnerabilities in your code and its dependencies.

DEPENDABOT
Dependabot is GitHub's automated dependency updater. It:
  - Scans your package.json, requirements.txt, etc. for outdated or vulnerable dependencies
  - Automatically opens pull requests to update them
  - Alerts you when a dependency has a known security vulnerability (CVE)

Enable it in: Repository -> Settings -> Security -> Dependabot

SECURITY ADVISORIES
If your project is a library others depend on, you can publish a Security Advisory on GitHub to officially disclose a vulnerability. This lets you:
  - Work privately with a reporter to fix the issue before it is public
  - Coordinate a public disclosure once a fix is available
  - Get a CVE (Common Vulnerabilities and Exposures) identifier

SECRET SCANNING
GitHub automatically scans your commits for accidentally committed secrets:
  - API keys
  - Passwords
  - OAuth tokens
  - AWS credentials
  - Private SSH keys

If a secret is detected, GitHub sends an alert and (for some providers) automatically revokes the token.

NEVER commit secrets to a repository. Use environment variables and .env files (in .gitignore) instead.

CODE SCANNING (CodeQL)
CodeQL is GitHub's static analysis tool. It analyses your source code for security vulnerabilities:
  - SQL injection
  - Cross-site scripting (XSS)
  - Hard-coded credentials
  - Insecure use of cryptography

You enable it via a GitHub Actions workflow. It runs on every pull request and reports findings as code review comments.

BRANCH PROTECTION AND REQUIRED REVIEWS
Part of security is preventing accidental or malicious changes to the main branch:
  - Require at least one reviewer to approve PRs before merging
  - Require status checks (CI tests) to pass
  - Prevent force pushes and deletions
  - Require signed commits (commit signing with GPG)

These rules are set in: Repository -> Settings -> Branches -> Branch protection rules

THE SECURITY POLICY (SECURITY.md)
Add a SECURITY.md file to your repository to tell users how to responsibly report vulnerabilities:
  - Who to contact (email address)
  - Which versions are supported
  - Expected response time`,
      quiz: [
        {
          question: 'What does Dependabot do?',
          options: [
            'It automatically fixes security vulnerabilities in your own source code',
            'It scans your dependencies for known vulnerabilities and opens PRs to update them',
            'It monitors your GitHub Actions workflows for suspicious activity',
            'It blocks pull requests that contain dependency changes',
          ],
          answer: 'It scans your dependencies for known vulnerabilities and opens PRs to update them',
        },
        {
          question: 'You accidentally committed an API key to a public repository. What should you do FIRST?',
          options: [
            'Delete the commit with git reset --hard and force push to erase it from history',
            'Make the repository private immediately',
            'Immediately revoke and regenerate the API key at the provider, then remove it from the code',
            'Open an Issue documenting the mistake',
          ],
          answer: 'Immediately revoke and regenerate the API key at the provider, then remove it from the code',
        },
        {
          question: 'What is the purpose of a SECURITY.md file in a repository?',
          options: [
            'It configures which GitHub security features are enabled',
            'It tells users and security researchers how to responsibly report vulnerabilities in the project',
            'It lists all known vulnerabilities that have already been fixed',
            'It is required by GitHub before you can enable Dependabot',
          ],
          answer: 'It tells users and security researchers how to responsibly report vulnerabilities in the project',
        },
      ],
      exercise: {
        prompt: 'Write a simple SECURITY.md file for your portfolio project. Include: the supported version, how to report a vulnerability, and what reporters can expect in terms of response.',
        starterCode: `# Security Policy

## Supported Versions

## Reporting a Vulnerability

## What to Expect`,
        solution: `# Security Policy

## Supported Versions

Only the latest version of this project is actively maintained and receives security updates.

| Version | Supported |
|---------|-----------|
| Latest  | Yes       |
| Older   | No        |

## Reporting a Vulnerability

If you discover a security vulnerability, please do NOT open a public GitHub Issue.

Instead, email the details to: security@yourname.dev

Please include:
- A description of the vulnerability
- Steps to reproduce it
- The potential impact
- Any suggested fixes if you have them

## What to Expect

- Acknowledgement of your report within 48 hours
- An update on progress within 7 days
- Credit in the release notes when the fix is published (unless you prefer to remain anonymous)

Thank you for helping keep this project safe.`,
      },
    },
  ],
};

window.githubModule = githubModule;
