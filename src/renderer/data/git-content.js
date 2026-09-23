'use strict';

const gitModule = {
  id: 'git',
  title: 'Git & Version Control',
  description: 'Git is the version control system used by virtually every professional software team in the world. This module teaches you Git from the ground up — from understanding why version control exists, to branching, merging, resolving conflicts, and collaborating on GitHub.',
  objectives: [
    'Understand what version control is and why it is essential',
    'Install and configure Git on your computer',
    'Use the core Git commands: init, add, commit, status, log',
    'Understand the staging area and how commits are structured',
    'Create and switch branches to work on features independently',
    'Merge branches and resolve conflicts when they occur',
    'Push and pull code to and from a remote repository on GitHub',
    'Understand pull requests and the collaborative code review workflow',
  ],
  goals: [
    'Initialise a Git repository and make your first commit',
    'Explain the difference between working directory, staging area, and repository',
    'Create a branch, make changes, and merge it back to main',
    'Resolve a merge conflict manually',
    'Clone a repository, make changes, push them, and open a pull request',
  ],
  lessons: [
    // ─────────────────────────────────────────────────────────────────
    // LESSON 1 — WHAT IS VERSION CONTROL?
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'git-1',
      title: 'Lesson 1: What Is Version Control?',
      content: `Version control is a system that records changes to files over time so you can recall specific versions later. It is one of the most important tools in professional software development.

WITHOUT VERSION CONTROL
Imagine you are writing a program. You make a change and something breaks. Without version control, you might:
  - Try to remember what you changed and undo it manually
  - Keep copies like "project_v1", "project_v2", "project_final", "project_final_REAL"
  - Lose work if your computer crashes
  - Have no idea what changed between versions

This approach fails badly when teams of multiple people work on the same code simultaneously.

WITH VERSION CONTROL
Version control solves all of this:
  - Every change is recorded with WHO made it, WHEN, and WHY
  - You can go back to any previous version instantly
  - Multiple people can work on the same project without overwriting each other's work
  - You can experiment in a separate "branch" and merge it back only when it works

WHAT IS GIT?
Git is the most widely used version control system in the world. It was created by Linus Torvalds (the creator of Linux) in 2005 when the Linux kernel team needed a better tool to manage their enormous codebase.

Git is:
  - FREE and open source
  - DISTRIBUTED: every developer has a full copy of the project history on their computer
  - FAST: most operations happen locally, not on a server
  - RELIABLE: it is nearly impossible to lose committed work

GIT VS GITHUB
These are commonly confused:

GIT is the version control tool — it runs on your computer and tracks your changes.

GITHUB is a website that hosts Git repositories online — it lets teams share code, collaborate, and review each other's work. GitHub is built ON TOP of Git.

Other Git hosting services: GitLab, Bitbucket, Azure DevOps. They all use Git underneath.

THE THREE STATES IN GIT
Git has three main states that files can be in:

1. WORKING DIRECTORY: the actual files you see and edit on your computer
2. STAGING AREA (also called the Index): a holding area where you prepare changes before saving them
3. REPOSITORY (Git database): the history of all your committed changes, stored in a hidden .git folder

The workflow:
  You edit files in the Working Directory
  -> You "stage" the changes you want to save
  -> You "commit" the staged changes to the Repository with a message

This two-step process (stage then commit) gives you precise control over exactly what goes into each saved snapshot.`,
      quiz: [
        {
          question: 'What is the primary purpose of version control?',
          options: [
            'To make code run faster on servers',
            'To record changes to files over time so you can recall specific versions later',
            'To automatically test your code for bugs',
            'To upload your code to a website so others can see it',
          ],
          answer: 'To record changes to files over time so you can recall specific versions later',
        },
        {
          question: 'What is the difference between Git and GitHub?',
          options: [
            'They are the same thing — GitHub is just the official name for Git',
            'Git is a programming language; GitHub is a code editor',
            'Git is the version control tool that runs locally; GitHub is a website for hosting Git repositories online',
            'GitHub is older than Git and is the original version control system',
          ],
          answer: 'Git is the version control tool that runs locally; GitHub is a website for hosting Git repositories online',
        },
        {
          question: 'Which of the three Git states do you edit files in?',
          options: [
            'The Staging Area',
            'The Repository',
            'The Working Directory',
            'The Commit Log',
          ],
          answer: 'The Working Directory',
        },
      ],
      exercise: {
        prompt: 'In your own words, explain to a non-programmer why version control is useful. Write 3-4 sentences using a non-technical analogy.',
        starterCode: `// Explain version control using a non-technical analogy
// Examples: writing a book, designing a building, editing a document

Version control is like...`,
        solution: `Version control is like having a detailed history of every draft of a book you are writing. Every time you save a major version, a snapshot is recorded — who made changes, when, and what they changed. If a later editor deletes a chapter by mistake, you can go back to any earlier snapshot and restore it. When multiple co-authors work on different chapters simultaneously, version control merges their changes without overwriting each other's work.`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 2 — SETTING UP GIT
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'git-2',
      title: 'Lesson 2: Installing and Configuring Git',
      content: `Before you can use Git, you need to install it and tell it who you are. Git records your name and email address with every commit so that team members know who made each change.

INSTALLING GIT

WINDOWS:
  Download Git from https://git-scm.com and run the installer.
  The installer comes with "Git Bash" — a terminal that supports Git commands.
  Accept the default options during installation.

MAC:
  Git is often pre-installed. Open Terminal and type: git --version
  If not installed, macOS will prompt you to install developer tools.
  Or install via Homebrew: brew install git

LINUX (Ubuntu/Debian):
  sudo apt-get install git

VERIFY INSTALLATION:
  Open your terminal and run:
  git --version
  You should see something like: git version 2.45.0

CONFIGURING YOUR IDENTITY
After installation, you must tell Git your name and email. This information is embedded in every commit you make — it is how teammates know who changed what.

These are global settings (apply to all your projects):

  git config --global user.name "Your Name"
  git config --global user.email "your@email.com"

To verify your settings:
  git config --list

SETTING YOUR DEFAULT EDITOR
Git sometimes opens a text editor for commit messages. By default this is Vim, which surprises many newcomers. Set it to something familiar:

  git config --global core.editor "code --wait"   (VS Code)
  git config --global core.editor "notepad"        (Windows Notepad)

SETTING THE DEFAULT BRANCH NAME
Older versions of Git name the initial branch "master". The current convention is "main". Set this globally:

  git config --global init.defaultBranch main

THE .gitconfig FILE
All global Git settings are stored in a file called .gitconfig in your home directory. You can view or edit it directly:
  Windows: C:\\Users\\YourName\\.gitconfig
  Mac/Linux: ~/.gitconfig

A typical .gitconfig looks like:
  [user]
      name = Your Name
      email = your@email.com
  [core]
      editor = code --wait
  [init]
      defaultBranch = main`,
      quiz: [
        {
          question: 'What command verifies that Git is installed correctly?',
          options: [
            'git install --check',
            'git --version',
            'git verify',
            'git status',
          ],
          answer: 'git --version',
        },
        {
          question: 'Why does Git require you to configure your name and email address?',
          options: [
            'To create a GitHub account automatically',
            'To send you notifications when teammates make changes',
            'Because your name and email are embedded in every commit so others know who made each change',
            'To verify that you have a valid software licence',
          ],
          answer: 'Because your name and email are embedded in every commit so others know who made each change',
        },
        {
          question: 'What does the --global flag do in a git config command?',
          options: [
            'Applies the setting to every file in the current folder',
            'Applies the setting to all Git repositories on your computer',
            'Uploads the setting to GitHub so all team members share it',
            'Makes the setting permanent and impossible to change later',
          ],
          answer: 'Applies the setting to all Git repositories on your computer',
        },
      ],
      exercise: {
        prompt: 'Write the three git config commands you would run to set up Git on a new computer: set your name, set your email, and set the default branch to "main".',
        starterCode: `# Set up Git on a new computer — write the three commands

# 1. Set your name:

# 2. Set your email:

# 3. Set default branch name to "main":`,
        solution: `# 1. Set your name:
git config --global user.name "Your Name"

# 2. Set your email:
git config --global user.email "your@email.com"

# 3. Set default branch name to "main":
git config --global init.defaultBranch main`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 3 — CORE COMMANDS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'git-3',
      title: 'Lesson 3: Your First Repository — init, add, commit',
      content: `This lesson covers the core Git workflow: creating a repository, staging changes, and committing them.

GIT INIT — CREATE A REPOSITORY
To start tracking a project with Git, navigate to your project folder and run:

  git init

This creates a hidden .git folder inside your project directory. This folder is the Git database — it stores the entire history of your project. You should never manually edit or delete this folder.

  $ mkdir my-project
  $ cd my-project
  $ git init
  Initialized empty Git repository in /my-project/.git/

GIT STATUS — WHAT HAS CHANGED?
git status is your most frequently used command. It shows:
  - Which files have been modified
  - Which files are staged (ready to commit)
  - Which files are untracked (not yet added to Git)

  $ git status
  On branch main
  Untracked files:
    index.html
  nothing added to commit but untracked files present

GIT ADD — STAGE YOUR CHANGES
Staging means selecting exactly which changes to include in your next commit. This lets you make multiple changes but only commit some of them.

  git add filename.html        — stage a specific file
  git add .                    — stage ALL changes in the current directory
  git add src/                 — stage all changes in the src/ folder

After staging:
  $ git add index.html
  $ git status
  Changes to be committed:
    new file: index.html

GIT COMMIT — SAVE A SNAPSHOT
A commit is a permanent snapshot of your staged changes. Every commit requires a message that describes WHAT changed and WHY.

  git commit -m "Add homepage HTML structure"

A good commit message:
  - Is written in the imperative mood: "Add", "Fix", "Update" (not "Added" or "Adds")
  - Describes the WHY, not just the what: "Fix contrast ratio for WCAG AA compliance"
  - Is short: under 72 characters for the first line

Bad commit messages: "stuff", "wip", "asdfgh", "changes"
Good commit messages: "Add skip-link for keyboard navigation", "Fix broken login redirect"

GIT LOG — VIEW HISTORY
View the history of all commits in the repository:

  git log

For a compact one-line view:
  git log --oneline

Output:
  a3f91bc Add contact form with validation
  7d24e01 Fix heading hierarchy in about page
  c1b8934 Initial commit

Each commit has a unique SHA hash (like a3f91bc) — you use this to reference specific commits.`,
      quiz: [
        {
          question: 'What does git init do?',
          options: [
            'Downloads a repository from GitHub',
            'Creates a new Git repository in the current folder by adding a .git directory',
            'Initialises a new branch called "init"',
            'Resets the repository to its initial state',
          ],
          answer: 'Creates a new Git repository in the current folder by adding a .git directory',
        },
        {
          question: 'You have edited three files but only want to commit changes to one of them. What is the correct approach?',
          options: [
            'Run git commit -m "message" — Git automatically selects which files to commit',
            'Run git add on the specific file you want, then commit',
            'You must commit all changed files at once — you cannot select individual files',
            'Run git stage filename to mark it as ready',
          ],
          answer: 'Run git add on the specific file you want, then commit',
        },
        {
          question: 'Which of the following is a well-written commit message?',
          options: [
            'stuff',
            'fixed it',
            'Add aria-label to navigation landmark for screen reader users',
            'I made some changes to the CSS file today',
          ],
          answer: 'Add aria-label to navigation landmark for screen reader users',
        },
        {
          question: 'What command shows a one-line summary of your commit history?',
          options: [
            'git history --short',
            'git log --oneline',
            'git status --log',
            'git commits',
          ],
          answer: 'git log --oneline',
        },
      ],
      exercise: {
        prompt: 'Write the sequence of Git commands to: create a new folder called "portfolio", initialise a Git repository, create a file called index.html, stage it, and commit it with a good message.',
        starterCode: `# Create a portfolio project and make the first commit

# 1. Create and enter the folder:

# 2. Initialise a Git repository:

# 3. Create index.html (hint: on Windows use "echo. > index.html" or just create the file normally):

# 4. Stage index.html:

# 5. Commit with a good message:`,
        solution: `# 1. Create and enter the folder:
mkdir portfolio
cd portfolio

# 2. Initialise a Git repository:
git init

# 3. Create index.html:
echo "<!DOCTYPE html><html><body></body></html>" > index.html

# 4. Stage index.html:
git add index.html

# 5. Commit with a good message:
git commit -m "Add initial HTML structure for portfolio homepage"`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 4 — BRANCHING
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'git-4',
      title: 'Lesson 4: Branching — Working in Parallel',
      content: `Branches are one of Git's most powerful features. They let you work on a new feature or fix a bug in complete isolation — without affecting the main codebase until you are ready.

WHAT IS A BRANCH?
Think of your commit history as a timeline. A branch is a separate timeline that splits off from the main one. You can make as many commits as you want on a branch without touching the main timeline. When you are done, you merge your branch back.

This means:
  - You can experiment safely without breaking working code
  - Multiple team members can work on different features simultaneously
  - If something goes wrong, you can simply delete the branch and start over

THE MAIN BRANCH
Every Git repository starts with one branch. The convention is to call this "main" (older repositories use "master"). The main branch typically contains the stable, production-ready version of your code.

The rule of thumb: never commit directly to main for anything beyond the very first project setup.

BRANCH COMMANDS

CREATE A BRANCH:
  git branch feature-login

LIST ALL BRANCHES:
  git branch
  (* marks the current branch)

SWITCH TO A BRANCH:
  git checkout feature-login
  — OR the modern equivalent —
  git switch feature-login

CREATE AND SWITCH IN ONE COMMAND:
  git checkout -b feature-login
  — OR —
  git switch -c feature-login

DELETE A BRANCH (after merging):
  git branch -d feature-login

A TYPICAL BRANCH WORKFLOW

1. Start from main (which is up to date):
   git switch main

2. Create a feature branch:
   git switch -c feature-navigation

3. Make your changes and commit:
   git add nav.html
   git commit -m "Add accessible navigation with skip link"

4. Make more commits as needed:
   git add styles.css
   git commit -m "Style navigation for keyboard focus indicators"

5. When done, merge back to main (covered in the next lesson)

BRANCH NAMING CONVENTIONS
Good branch names are descriptive and lowercase with hyphens:
  feature/add-search        — new functionality
  fix/broken-focus-order    — bug fix
  docs/update-readme        — documentation
  chore/upgrade-dependencies — maintenance

Bad branch names: "test", "stuff", "my-branch", "fix"`,
      quiz: [
        {
          question: 'What is the purpose of a Git branch?',
          options: [
            'To create a backup copy of the repository on a server',
            'To work on changes in isolation without affecting the main codebase',
            'To track which team member is responsible for which files',
            'To split a project into separate sub-projects',
          ],
          answer: 'To work on changes in isolation without affecting the main codebase',
        },
        {
          question: 'Which command creates a new branch AND switches to it in one step?',
          options: [
            'git branch -new feature-login',
            'git branch feature-login && git checkout feature-login',
            'git switch -c feature-login',
            'git create branch feature-login',
          ],
          answer: 'git switch -c feature-login',
        },
        {
          question: 'You are on the "feature-search" branch. You run "git branch". How do you identify which branch you are currently on?',
          options: [
            'The current branch is always listed first',
            'The current branch is highlighted in red',
            'The current branch has an asterisk (*) next to it',
            'You need to run "git status --branch" to see the current branch',
          ],
          answer: 'The current branch has an asterisk (*) next to it',
        },
      ],
      exercise: {
        prompt: 'Write the commands to: check your current branch, create and switch to a branch called "feature-skip-link", make a pretend commit, then switch back to main.',
        starterCode: `# Branch workflow exercise

# 1. Check which branch you are on:

# 2. Create and switch to "feature-skip-link":

# 3. Stage and commit a file (assume skip-link.html already exists):

# 4. Switch back to main:`,
        solution: `# 1. Check which branch you are on:
git branch

# 2. Create and switch to "feature-skip-link":
git switch -c feature-skip-link

# 3. Stage and commit a file:
git add skip-link.html
git commit -m "Add skip link for keyboard navigation accessibility"

# 4. Switch back to main:
git switch main`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 5 — MERGING
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'git-5',
      title: 'Lesson 5: Merging Branches',
      content: `Merging is how you bring changes from one branch back into another. It is the step that completes the feature branch workflow.

HOW MERGING WORKS
When you merge a branch, Git combines the commit histories. The result is a new commit on the target branch that includes all the changes from the source branch.

To merge "feature-navigation" into "main":
  1. Switch to the branch you want to merge INTO:
     git switch main

  2. Run the merge command:
     git merge feature-navigation

  3. Git creates a "merge commit" combining both histories.

FAST-FORWARD MERGE
If no new commits were made on main since you branched off, Git does a "fast-forward" merge — it simply moves the main pointer forward to the feature branch tip. No merge commit is created.

This is the simplest case: you branch off, make changes, merge back, and main has not moved.

THREE-WAY MERGE
If both branches have new commits since they diverged, Git performs a three-way merge using:
  1. The common ancestor (the commit where they diverged)
  2. The tip of the branch being merged in
  3. The tip of the target branch

Git automatically creates a merge commit combining the two sets of changes.

MERGE CONFLICTS
A conflict occurs when both branches changed the SAME lines in the SAME file. Git cannot automatically decide which version to keep — you must resolve it manually.

Git marks conflicts in the file like this:

  <<<<<<< HEAD
  color: #1a1a1a;
  =======
  color: #000000;
  >>>>>>> feature-dark-mode

  - <<<<<<< HEAD is your current branch's version
  - ======= divides the two versions
  - >>>>>>> feature-dark-mode is the incoming branch's version

TO RESOLVE:
  1. Edit the file — keep the code you want and delete all the conflict markers
  2. Stage the resolved file: git add styles.css
  3. Complete the merge: git commit

AFTER MERGING
Once a branch is merged, you can delete it (it is no longer needed):
  git branch -d feature-navigation

You can view the full merged history:
  git log --oneline --graph`,
      quiz: [
        {
          question: 'You want to merge "feature-search" into "main". What is the correct command sequence?',
          options: [
            'git merge main feature-search',
            'Switch to feature-search, then run git merge main',
            'Switch to main, then run git merge feature-search',
            'git combine feature-search main',
          ],
          answer: 'Switch to main, then run git merge feature-search',
        },
        {
          question: 'A merge conflict occurs when:',
          options: [
            'You try to merge a branch into itself',
            'Two branches changed the same lines in the same file',
            'The branch has more commits than main',
            'You forget to run git add before merging',
          ],
          answer: 'Two branches changed the same lines in the same file',
        },
        {
          question: 'After resolving a merge conflict in a file, what is the correct next step?',
          options: [
            'Run git conflict --resolve',
            'Delete the branch that caused the conflict',
            'Stage the resolved file with git add, then commit',
            'Run git merge --continue and Git handles the rest',
          ],
          answer: 'Stage the resolved file with git add, then commit',
        },
      ],
      exercise: {
        prompt: 'Write the Git commands to merge a branch called "feature-aria-labels" into main, then delete the feature branch.',
        starterCode: `# Merge workflow

# 1. Switch to main:

# 2. Merge the feature branch:

# 3. Delete the feature branch (it is no longer needed):`,
        solution: `# 1. Switch to main:
git switch main

# 2. Merge the feature branch:
git merge feature-aria-labels

# 3. Delete the feature branch:
git branch -d feature-aria-labels`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 6 — REMOTE REPOSITORIES
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'git-6',
      title: 'Lesson 6: Working with Remote Repositories',
      content: `A remote repository is a version of your project hosted on a server — most commonly on GitHub. Remotes let you back up your work, share it with others, and collaborate.

KEY REMOTE COMMANDS

GIT CLONE — COPY AN EXISTING REPOSITORY
Clone an existing remote repository to your computer:
  git clone https://github.com/username/repository-name.git

This creates a folder with all the project files AND full Git history.

GIT REMOTE — VIEW REMOTES
See which remotes are connected to your local repository:
  git remote -v

Typical output:
  origin  https://github.com/username/my-project.git (fetch)
  origin  https://github.com/username/my-project.git (push)

The remote is usually named "origin" by convention.

GIT REMOTE ADD — CONNECT TO A REMOTE
If you initialised a repo locally and want to connect it to GitHub:
  git remote add origin https://github.com/username/my-project.git

PUSHING AND PULLING

GIT PUSH — SEND LOCAL COMMITS TO THE REMOTE
  git push origin main

First push of a new branch:
  git push -u origin feature-login

The -u flag sets "upstream" — after this, you can just type git push.

GIT PULL — GET UPDATES FROM THE REMOTE
  git pull

This fetches new commits from the remote and merges them into your current branch.

GIT FETCH — DOWNLOAD WITHOUT MERGING
  git fetch origin

Downloads new commits but does NOT merge them — lets you inspect before integrating.

A TYPICAL DAILY WORKFLOW
Morning (start of day):
  git pull                    — get the latest changes from teammates

During the day:
  git switch -c feature-xyz   — create your feature branch
  ... edit files ...
  git add .
  git commit -m "Add feature xyz"

End of day:
  git push -u origin feature-xyz  — back up your work to GitHub

GITHUB AUTHENTICATION
GitHub no longer accepts passwords for git push. You need either:
  - A Personal Access Token (PAT): generate one in GitHub Settings -> Developer Settings
  - SSH keys: a more secure, password-free alternative (recommended for regular use)

To use SSH:
  1. Generate a key: ssh-keygen -t ed25519 -C "your@email.com"
  2. Add the public key to your GitHub account
  3. Use git@github.com:username/repo.git instead of https URLs`,
      quiz: [
        {
          question: 'What does git clone do?',
          options: [
            'Creates a copy of your local repository on GitHub',
            'Downloads a remote repository (with full history) to your computer',
            'Duplicates a branch within your local repository',
            'Copies files from one folder to another',
          ],
          answer: 'Downloads a remote repository (with full history) to your computer',
        },
        {
          question: 'What is the difference between git fetch and git pull?',
          options: [
            'There is no difference — they are aliases for the same command',
            'git fetch downloads changes but does not merge them; git pull downloads AND merges',
            'git fetch merges changes; git pull only downloads them',
            'git fetch works with branches; git pull only works with main',
          ],
          answer: 'git fetch downloads changes but does not merge them; git pull downloads AND merges',
        },
        {
          question: 'What does the -u flag do in git push -u origin feature-login?',
          options: [
            'Forces the push even if there are conflicts',
            'Sets the upstream tracking branch so future "git push" commands work without specifying origin and branch name',
            'Updates the remote origin URL',
            'Makes the push uninterruptible',
          ],
          answer: 'Sets the upstream tracking branch so future "git push" commands work without specifying origin and branch name',
        },
      ],
      exercise: {
        prompt: 'Write the commands to: connect a local repository to a GitHub remote called "origin", push main to that remote, then pull down any changes from teammates the next morning.',
        starterCode: `# Working with remotes

# 1. Connect the local repo to a GitHub remote:
# (Use https://github.com/yourname/my-project.git as the URL)

# 2. Push the main branch to GitHub for the first time:

# 3. Next morning — get the latest changes from teammates:`,
        solution: `# 1. Connect the local repo to a GitHub remote:
git remote add origin https://github.com/yourname/my-project.git

# 2. Push the main branch to GitHub for the first time:
git push -u origin main

# 3. Next morning — get the latest changes from teammates:
git pull`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 7 — PULL REQUESTS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'git-7',
      title: 'Lesson 7: Pull Requests and Code Review',
      content: `A Pull Request (PR) — also called a Merge Request in GitLab — is how professional teams propose and review changes before merging them into the main branch. It is one of the most important concepts in collaborative software development.

WHAT IS A PULL REQUEST?
A Pull Request is a request to merge your feature branch into another branch (usually main). It opens a conversation around your changes where:
  - Teammates can review your code line by line
  - They can leave comments, ask questions, and request changes
  - Automated tests (CI/CD) can run to verify nothing is broken
  - The changes are documented before they land on main

THE PULL REQUEST WORKFLOW

1. Create a feature branch and make your commits:
   git switch -c feature-focus-trap
   ... make changes ...
   git add .
   git commit -m "Add focus trap for modal dialogs"

2. Push your branch to GitHub:
   git push -u origin feature-focus-trap

3. Open a Pull Request on GitHub:
   - Navigate to your repository on GitHub
   - Click "Compare & pull request" (GitHub shows this automatically)
   - Write a description explaining WHAT you changed and WHY
   - Request reviewers from your team

4. Address review feedback:
   - Make additional commits on the same branch
   - The PR automatically updates as you push

5. PR is approved and merged:
   - A team member (or you, with approval) merges the PR
   - The feature branch can then be deleted

WRITING A GOOD PR DESCRIPTION
A good PR description includes:
  - WHAT changed: a summary of the changes
  - WHY: the motivation (links to a bug report or feature request)
  - HOW TO TEST: instructions for reviewers to verify the changes
  - SCREENSHOTS or recordings if UI is involved
  - ACCESSIBILITY notes: keyboard navigation tested, screen reader tested

CODE REVIEW ETIQUETTE
AS A REVIEWER:
  - Be specific: point to the exact line and explain the issue
  - Be constructive: suggest alternatives, not just problems
  - Approve promptly — blocking a PR for days is disrespectful of the author's time

AS THE AUTHOR:
  - Do not take feedback personally — code review is about the code, not you
  - Respond to every comment — either fix it or explain why you disagree
  - Keep PRs small — one focused change is easier to review than 2,000 lines of changes

DRAFT PULL REQUESTS
GitHub lets you open a "Draft" PR to share work in progress before it is ready for review. Useful for early feedback without triggering a full review.`,
      quiz: [
        {
          question: 'What is the primary purpose of a Pull Request?',
          options: [
            'To automatically merge code without human review',
            'To propose changes and open a conversation for code review before merging to main',
            'To download (pull) changes from the remote to your local machine',
            'To request that another team member writes the code for you',
          ],
          answer: 'To propose changes and open a conversation for code review before merging to main',
        },
        {
          question: 'During a PR review, a teammate says your code has a bug but does not say where. What should you do?',
          options: [
            'Accept the feedback and guess which part they mean',
            'Close the PR and start over',
            'Ask them to point to the specific line so you can understand and fix the issue',
            'Merge the PR anyway and fix the bug in a follow-up',
          ],
          answer: 'Ask them to point to the specific line so you can understand and fix the issue',
        },
        {
          question: 'You need to share a work-in-progress branch with a teammate for early feedback — but it is not ready for a full review yet. What is the BEST approach?',
          options: [
            'Push the branch to GitHub and send them a link to the branch',
            'Open a Draft Pull Request on GitHub',
            'Wait until it is fully done before sharing',
            'Email the changed files directly',
          ],
          answer: 'Open a Draft Pull Request on GitHub',
        },
      ],
      exercise: {
        prompt: 'Write a Pull Request description for a change that adds a skip-link to a web application for keyboard accessibility. Include: what changed, why, and how to test it.',
        starterCode: `## Pull Request Description

### What changed

### Why

### How to test

### Accessibility notes`,
        solution: `## Pull Request Description

### What changed
Added a visually hidden skip link as the first focusable element on every page. The link becomes visible on focus and sends keyboard users to the #main-content landmark, bypassing the repeated navigation on every page.

### Why
Keyboard-only users had to Tab through the entire navigation (12 items) on every page load to reach the main content. This is a WCAG 2.1 Success Criterion 2.4.1 (Bypass Blocks) violation.

### How to test
1. Open any page in the app
2. Press Tab once — a "Skip to main content" link should appear in the top-left corner
3. Press Enter — focus should move to the main content heading
4. Verify the link is not visible with a mouse (no visual clutter for sighted users)

### Accessibility notes
- Tested with NVDA on Chrome: skip link announced correctly as "Skip to main content, link"
- Tested with keyboard only: focus indicator clearly visible on the link
- VoiceOver (macOS) also reads the link correctly`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 8 — UNDOING THINGS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'git-8',
      title: 'Lesson 8: Undoing Changes Safely',
      content: `One of Git's greatest strengths is the ability to undo almost anything. This lesson covers the safe ways to reverse changes.

UNDOING UNSTAGED CHANGES
Discard changes in the working directory (before git add):

  git restore filename.css      — discard changes in a specific file
  git restore .                 — discard ALL unstaged changes

WARNING: This permanently discards uncommitted changes. There is no undo for this.

UNSTAGING A FILE
You staged a file but want to unstage it (without losing your edits):

  git restore --staged filename.css

This removes the file from staging but keeps your edits in the working directory.

UNDOING THE LAST COMMIT (SAFE)
Undo the last commit but keep the changes (so you can re-commit differently):

  git reset --soft HEAD~1

HEAD~1 means "one commit before the current tip". Your changes return to staging.

REVERTING A COMMIT (TEAM-SAFE)
When you have already pushed a commit to GitHub, you CANNOT use reset (it rewrites history and causes problems for teammates). Instead, use revert:

  git revert abc1234

This creates a NEW commit that undoes the changes from commit abc1234. The original commit stays in history — you just add a "reversal" on top. This is safe for shared branches.

VIEWING WHAT CHANGED
Before undoing anything, check exactly what changed:

  git diff                  — changes in working directory (unstaged)
  git diff --staged         — changes that are staged
  git show abc1234          — show what a specific commit changed

THE GOLDEN RULE
Never use commands that REWRITE HISTORY on a shared branch (main, develop):

SAFE ON ANY BRANCH:
  git restore, git revert

SAFE ON NON-SHARED BRANCHES ONLY:
  git reset

NEVER USE ON MAIN OR SHARED BRANCHES:
  git reset --hard, git push --force`,
      quiz: [
        {
          question: 'You staged a file by mistake. You want to unstage it but keep your edits. What command should you use?',
          options: [
            'git reset filename.css',
            'git restore --staged filename.css',
            'git undo --staged filename.css',
            'git remove --cache filename.css',
          ],
          answer: 'git restore --staged filename.css',
        },
        {
          question: 'You pushed a commit to the shared main branch and realise it introduced a bug. What is the SAFEST way to undo it?',
          options: [
            'git reset --hard HEAD~1, then git push --force',
            'git revert <commit-hash> — creates a new commit that undoes the bad one',
            'Delete the repository and start from the last backup',
            'git checkout HEAD~1 to go back to the previous state',
          ],
          answer: 'git revert <commit-hash> — creates a new commit that undoes the bad one',
        },
        {
          question: 'What does git diff --staged show?',
          options: [
            'All changes in the working directory',
            'The difference between the latest commit and the previous commit',
            'Changes that have been staged but not yet committed',
            'The list of files that differ between two branches',
          ],
          answer: 'Changes that have been staged but not yet committed',
        },
      ],
      exercise: {
        prompt: 'Write the commands for these three undo scenarios: (1) you edited app.css but have not staged it and want to discard the edit, (2) you staged index.html but want to unstage it without losing edits, (3) you pushed a bad commit (hash: d4e5f6a) to the shared main branch and need to safely reverse it.',
        starterCode: `# Undo scenarios

# Scenario 1: Discard unstaged edits to app.css:

# Scenario 2: Unstage index.html without losing edits:

# Scenario 3: Safely reverse a pushed commit (hash: d4e5f6a) on main:`,
        solution: `# Scenario 1: Discard unstaged edits to app.css:
git restore app.css

# Scenario 2: Unstage index.html without losing edits:
git restore --staged index.html

# Scenario 3: Safely reverse a pushed commit on main:
git revert d4e5f6a
# This creates a new commit that undoes d4e5f6a — safe for shared branches`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 9 — CAPSTONE
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'git-9',
      title: 'Lesson 9: Putting It All Together — A Full Git Workflow',
      content: `This lesson walks through a complete, realistic Git workflow from start to finish — the kind you would use on a professional team every day.

THE SCENARIO
You are working on an accessible web application. Your team uses GitHub. You have been assigned a task to add a focus trap to modal dialogs so keyboard users cannot accidentally leave them.

STEP 1: START FROM A CLEAN MAIN
  git switch main
  git pull            — ensure you have the latest changes from teammates

STEP 2: CREATE YOUR FEATURE BRANCH
  git switch -c feature/focus-trap-modal

Name it clearly so teammates know what it is about at a glance.

STEP 3: DO YOUR WORK IN SMALL COMMITS
  ... write the focus trap JavaScript ...
  git add src/js/focus-trap.js
  git commit -m "Add focus trap utility function"

  ... write tests ...
  git add tests/focus-trap.test.js
  git commit -m "Add unit tests for focus trap"

  ... add the modal HTML ...
  git add src/index.html
  git commit -m "Wire focus trap to modal dialog element"

Small commits are better than one giant commit — they make code review easier and make it simpler to pinpoint if something breaks.

STEP 4: PUSH YOUR BRANCH
  git push -u origin feature/focus-trap-modal

STEP 5: OPEN A PULL REQUEST
On GitHub:
  - Compare & pull request -> write a clear description
  - Explain what you built, why, and how to test it
  - Mention accessibility: keyboard tested, screen reader tested
  - Request a reviewer

STEP 6: RESPOND TO REVIEW FEEDBACK
Your reviewer asks you to handle the Escape key to close the modal.

  ... update focus-trap.js ...
  git add src/js/focus-trap.js
  git commit -m "Close modal on Escape key per review feedback"
  git push

The PR updates automatically.

STEP 7: MERGE AND CLEAN UP
Once approved:
  - Merge the PR on GitHub (Squash and merge or regular merge)
  - Delete the remote branch (GitHub offers this after merge)
  - Locally:
    git switch main
    git pull
    git branch -d feature/focus-trap-modal

QUICK REFERENCE — DAILY COMMANDS
  git status              — what has changed?
  git add .               — stage all changes
  git commit -m "msg"     — save a snapshot
  git log --oneline       — view history
  git switch -c branch    — create + switch branch
  git push -u origin br   — push new branch
  git pull                — get latest from remote
  git merge branch        — merge into current branch
  git revert hash         — safely undo a commit`,
      quiz: [
        {
          question: 'Before starting work on a new feature, you should always:',
          options: [
            'Create a new repository for the feature',
            'Switch to main and git pull to ensure you have the latest code',
            'Commit all existing work to avoid conflicts',
            'Delete your previous feature branch to keep things clean',
          ],
          answer: 'Switch to main and git pull to ensure you have the latest code',
        },
        {
          question: 'Why are small, focused commits better than one large commit at the end of a feature?',
          options: [
            'Small commits push faster to GitHub',
            'Git has a file size limit for commits, so large commits may fail',
            'Small commits make code review easier and help pinpoint which change caused a bug',
            'Large commits are not allowed in pull requests',
          ],
          answer: 'Small commits make code review easier and help pinpoint which change caused a bug',
        },
        {
          question: 'After your PR is merged, what should you do with your local feature branch?',
          options: [
            'Keep it indefinitely as a backup',
            'Convert it to a tag so you can reference it later',
            'Delete it — it is no longer needed',
            'Push it to a new remote for archiving',
          ],
          answer: 'Delete it — it is no longer needed',
        },
      ],
      exercise: {
        prompt: 'Without looking at the lesson, write the complete sequence of Git commands for a typical feature workflow: start from main, create a branch, make two commits, push, and clean up after the PR merges.',
        starterCode: `# Full feature workflow — write every command

# 1. Get latest from the team:

# 2. Create your feature branch:

# 3. Make first commit (assume file1.js exists):

# 4. Make second commit (assume file2.css exists):

# 5. Push the branch to GitHub:

# 6. After the PR merges — clean up locally:`,
        solution: `# 1. Get latest from the team:
git switch main
git pull

# 2. Create your feature branch:
git switch -c feature/your-feature-name

# 3. Make first commit:
git add file1.js
git commit -m "Add feature logic for X"

# 4. Make second commit:
git add file2.css
git commit -m "Style feature X for keyboard focus visibility"

# 5. Push the branch to GitHub:
git push -u origin feature/your-feature-name

# 6. After the PR merges — clean up locally:
git switch main
git pull
git branch -d feature/your-feature-name`,
      },
    },
  ],
};

window.gitModule = gitModule;
