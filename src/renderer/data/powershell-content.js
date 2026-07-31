const powershellModule = {
  id: 'powershell',
  title: 'Command Line with PowerShell',
  description: 'PowerShell is the command line built into Windows. Using the terminal lets you navigate your computer, manage files, run programs, and automate tasks entirely with the keyboard — no mouse required. We start from zero.',
  objectives: [
    'Understand what the command line is and why it matters for developers',
    'Navigate the file system using Get-Location, Get-ChildItem, and Set-Location',
    'Create, copy, move, and delete files and folders',
    'Read and write text files from the command line',
    'Search through files and output using Select-String',
    'Use variables and pipelines to chain commands',
    'Write simple PowerShell scripts',
    'Run development tools (git, node, python) from the terminal',
  ],
  goals: [
    'Navigate to any folder on your computer using the command line',
    'List files in a directory and filter the output',
    'Create a new file and write text into it',
    'Search a file for a pattern using Select-String',
    'Assign a value to a variable and use it in an output command',
    'Run a development tool from the terminal',
  ],
  lessons: [
    {
      id: 'ps-1',
      title: 'Lesson 1: What Is the Command Line?',
      content: `The command line (also called the terminal or console) is a text interface for your computer. Instead of clicking icons with a mouse, you type commands and press Enter. The computer reads your command, executes it, and prints the result.

WHY LEARN THE COMMAND LINE?
Most development tools (git, node, npm, python, pip) are command-line programs. They have no graphical interface — you use them by typing commands. Understanding the terminal is not optional for a working developer.

ACCESSIBILITY AND THE COMMAND LINE
The terminal is excellent for screen reader and keyboard users:
  - Everything is text — no graphical elements
  - Full keyboard control — no mouse needed
  - Screen readers read command output directly
  - It is consistent and predictable

Many blind developers prefer the terminal over graphical IDEs because it is more reliably accessible.

WHAT IS POWERSHELL?
PowerShell is Microsoft's command line, built into every Windows computer. It is more powerful than the older Command Prompt (cmd.exe). Commands in PowerShell follow a Verb-Noun naming convention: Get-ChildItem, Set-Location, New-Item.

PowerShell also supports Unix-style aliases — the short commands you may have seen:
  ls   → Get-ChildItem (list files)
  cd   → Set-Location (change directory)
  cat  → Get-Content (read a file)
  rm   → Remove-Item (delete)
  echo → Write-Output (print text)
  pwd  → Get-Location (print current directory)

OPENING POWERSHELL
Press Windows + R, type powershell, press Enter. Or search "PowerShell" in the Start menu.

THE PROMPT
The prompt is the text that appears waiting for you to type. In PowerShell it shows your current directory:
  PS C:\Users\Alice>

Everything after > is where you type your command.`,
      quiz: [
        {
          question: 'Why is the command line particularly accessible for screen reader users?',
          options: [
            'Because it has larger text than graphical interfaces',
            'Because everything is text — no graphical elements — and screen readers read it directly',
            'Because it automatically slows down for screen readers',
            'Because it only runs on accessible operating systems',
          ],
          answer: 1,
        },
        {
          question: 'What is the PowerShell alias for Get-ChildItem?',
          options: ['dir', 'list', 'ls', 'files'],
          answer: 2,
        },
      ],
      exercise: {
        steps: [
          {
            instruction: 'Step 1: Run Write-Output to print the text "Hello, terminal!" to the screen.',
            starterCode: '# Print Hello, terminal!\n',
            solution: 'Write-Output "Hello, terminal!"',
            expectedOutput: 'Hello, terminal!',
          },
          {
            instruction: 'Step 2: Use the echo alias (which maps to Write-Output) to print "The command line is accessible."',
            starterCode: '# Use echo to print the message\n',
            solution: 'echo "The command line is accessible."',
            expectedOutput: 'The command line is accessible.',
          },
          {
            instruction: 'Step 3: Print two lines of output using two separate Write-Output commands: "Line 1: PowerShell" and "Line 2: Terminal".',
            starterCode: '# Print two lines using Write-Output\n',
            solution: 'Write-Output "Line 1: PowerShell"\nWrite-Output "Line 2: Terminal"',
            expectedOutput: 'Line 1: PowerShell\nLine 2: Terminal',
          },
        ],
      },
    },
    {
      id: 'ps-2',
      title: 'Lesson 2: Navigating the File System',
      content: `The file system is the tree of folders (directories) and files on your computer. The command line always has a "current location" — a folder you are working inside. Every command runs relative to that location.

PRINT CURRENT LOCATION
  Get-Location    (alias: pwd)

This prints the full path of your current folder: PS C:\\Users\\Alice\\Documents

LIST FILES AND FOLDERS
  Get-ChildItem   (alias: ls or dir)

Lists all files and folders in the current location.

  Get-ChildItem -Name    -- shows names only (cleaner output)
  Get-ChildItem *.txt    -- shows only .txt files
  Get-ChildItem -Recurse -- includes subfolders (recursive)

CHANGE DIRECTORY (NAVIGATE)
  Set-Location path    (alias: cd)

  cd Documents         -- moves into the Documents subfolder
  cd ..                -- moves UP one level (parent folder)
  cd ~                 -- moves to your home directory
  cd "C:\\Program Files"  -- absolute path (use quotes for paths with spaces)

PATHS
  Absolute path: starts from the root drive  C:\\Users\\Alice\\Documents
  Relative path: starts from where you are   .\\subfolder  or  ..\\parent

THE DIRECTORY TREE
  C:\\
  └── Users\\
      └── Alice\\
          ├── Documents\\
          │   ├── notes.txt
          │   └── projects\\
          └── Desktop\\

If you are at C:\\Users\\Alice, then Documents is a relative path, and C:\\Users\\Alice\\Documents is the absolute path to the same folder.

TAB COMPLETION
Press Tab while typing a path — PowerShell completes the folder or file name for you. This is available to keyboard users and works just as well with a screen reader.`,
      quiz: [
        {
          question: 'What does cd .. do?',
          options: [
            'Moves to the root of the drive',
            'Moves up one level to the parent directory',
            'Lists all files in the current directory',
            'Prints the current directory path',
          ],
          answer: 1,
        },
        {
          question: 'Which command shows only files ending in .txt in the current directory?',
          options: [
            'Get-ChildItem -Type txt',
            'ls .txt',
            'Get-ChildItem *.txt',
            'cd *.txt',
          ],
          answer: 2,
        },
      ],
      exercise: {
        steps: [
          {
            instruction: 'Step 1: Run Get-Location to print your current directory path.',
            starterCode: '# Print the current directory\n',
            solution: 'Get-Location',
          },
          {
            instruction: 'Step 2: Use Get-ChildItem with -Name to list only the names of items in the current directory.',
            starterCode: '# List file and folder names only\n',
            solution: 'Get-ChildItem -Name',
          },
          {
            instruction: 'Step 3: Run Get-ChildItem with a wildcard to show only .ps1 files (PowerShell scripts) in the current directory. Even if there are none, the command should run without error.',
            starterCode: '# List only .ps1 files\n',
            solution: 'Get-ChildItem *.ps1',
          },
        ],
      },
    },
    {
      id: 'ps-3',
      title: 'Lesson 3: Working with Files and Folders',
      content: `PowerShell lets you create, copy, move, rename, and delete files and folders entirely from the keyboard.

CREATING FILES AND FOLDERS
  New-Item -ItemType File -Name "notes.txt"     -- create a new file
  New-Item -ItemType Directory -Name "projects" -- create a new folder
  mkdir projects                                -- shorthand for creating a folder

READING FILE CONTENT
  Get-Content notes.txt    (alias: cat notes.txt)

Prints the contents of the file to the screen.

WRITING TO A FILE
  "Hello" | Set-Content notes.txt      -- writes (overwrites) the file
  "Hello" | Out-File notes.txt         -- same as above
  "More text" | Add-Content notes.txt  -- appends to the file

Using > and >>:
  "Hello" > notes.txt    -- write (overwrite)
  "More" >> notes.txt    -- append

COPYING FILES
  Copy-Item notes.txt backup.txt         -- copy in same directory
  Copy-Item notes.txt C:\\Backup\\        -- copy to another directory

MOVING AND RENAMING
  Move-Item notes.txt archive\\notes.txt  -- move a file
  Move-Item old-name.txt new-name.txt    -- rename a file (move to new name)
  Rename-Item notes.txt renamed.txt      -- explicit rename

DELETING
  Remove-Item notes.txt          -- delete a file
  Remove-Item projects -Recurse  -- delete a folder and all its contents

ALWAYS BE CAREFUL WITH REMOVE-ITEM
Deleted files do not go to the Recycle Bin when removed via PowerShell. They are gone immediately. Double-check your paths before deleting.`,
      quiz: [
        {
          question: 'What is the difference between | Set-Content and | Add-Content?',
          options: [
            'They are identical — both overwrite the file',
            'Set-Content overwrites the file; Add-Content appends to the existing content',
            'Add-Content overwrites the file; Set-Content appends',
            'Set-Content creates a new file; Add-Content requires the file to already exist',
          ],
          answer: 1,
        },
        {
          question: 'Why is Remove-Item more dangerous in PowerShell than dragging to the Recycle Bin?',
          options: [
            'Remove-Item is slower',
            'Remove-Item only works on folders',
            'Files deleted with Remove-Item bypass the Recycle Bin and cannot be recovered easily',
            'Remove-Item asks for administrator permission every time',
          ],
          answer: 2,
        },
      ],
      exercise: {
        steps: [
          {
            instruction: 'Step 1: Use Write-Output and > to write the text "PowerShell is great" to a new file called demo.txt. Then read it back with Get-Content.',
            starterCode: '# Write text to demo.txt, then read it back\n',
            solution: 'Write-Output "PowerShell is great" > demo.txt\nGet-Content demo.txt',
            expectedOutput: 'PowerShell is great',
          },
          {
            instruction: 'Step 2: Append a second line "I am learning the terminal" to demo.txt using >>. Then read the whole file with Get-Content.',
            starterCode: 'Write-Output "PowerShell is great" > demo.txt\n# Append the second line, then read the file\n',
            solution: 'Write-Output "PowerShell is great" > demo.txt\nWrite-Output "I am learning the terminal" >> demo.txt\nGet-Content demo.txt',
            expectedOutput: 'PowerShell is great\nI am learning the terminal',
          },
          {
            instruction: 'Step 3: Write "Hello" to a file called source.txt. Then copy it to destination.txt. Then read destination.txt to confirm the copy worked.',
            starterCode: '# Write, copy, then read the copy\n',
            solution: '"Hello" > source.txt\nCopy-Item source.txt destination.txt\nGet-Content destination.txt',
            expectedOutput: 'Hello',
          },
        ],
      },
    },
    {
      id: 'ps-4',
      title: 'Lesson 4: Searching and Filtering',
      content: `PowerShell makes it easy to search through files and filter command output. This is essential for working with logs, large codebases, and data files.

SELECT-STRING — SEARCH INSIDE FILES
Select-String searches for text patterns inside files, similar to grep on Linux/macOS:

  Select-String -Pattern "error" -Path "app.log"

  -- case-insensitive by default
  -- shows filename, line number, and the matching line

SHORT ALIAS
  sls "error" app.log

SEARCHING WITH A WILDCARD (MULTIPLE FILES)
  Select-String -Pattern "TODO" -Path "*.js" -Recurse

Searches for "TODO" in all .js files in the current folder and subfolders.

REGULAR EXPRESSIONS
Select-String supports regex patterns:
  Select-String -Pattern "\d{4}-\d{2}-\d{2}" -Path "dates.txt"
  -- finds any line containing a date like 2024-01-15

WHERE-OBJECT — FILTER COMMAND OUTPUT
Where-Object filters the objects that come through a pipeline. $_ represents the current object:

  Get-ChildItem | Where-Object { $_.Extension -eq ".txt" }
  -- lists only .txt files

  Get-ChildItem | Where-Object { $_.Length -gt 1000 }
  -- lists only files larger than 1000 bytes

SELECT-OBJECT — PICK SPECIFIC PROPERTIES
  Get-ChildItem | Select-Object Name, Length
  -- shows only the Name and Length of each file

  Get-ChildItem | Select-Object -First 5
  -- shows only the first 5 results

COMBINING
  Get-ChildItem *.txt | Where-Object { $_.Length -gt 100 } | Select-Object Name, Length`,
      quiz: [
        {
          question: 'What does Select-String -Pattern "error" -Path "app.log" do?',
          options: [
            'Replaces the word "error" with nothing in app.log',
            'Searches for lines containing "error" in app.log and prints them with their line numbers',
            'Creates a new file called error.log',
            'Counts how many times "error" appears in app.log',
          ],
          answer: 1,
        },
        {
          question: 'In Get-ChildItem | Where-Object { $_.Extension -eq ".txt" }, what does $_ represent?',
          options: [
            'The current directory',
            'The previous command\'s exit code',
            'The current object being processed in the pipeline — each file in turn',
            'A PowerShell error variable',
          ],
          answer: 2,
        },
      ],
      exercise: {
        steps: [
          {
            instruction: 'Step 1: Create a file called log.txt with three lines using >> (append each line): "INFO: App started", "ERROR: Connection failed", "INFO: Retrying". Then use Select-String to search for "ERROR" in log.txt.',
            starterCode: '# Create log.txt with 3 lines, then search for ERROR\n',
            solution: '"INFO: App started" > log.txt\n"ERROR: Connection failed" >> log.txt\n"INFO: Retrying" >> log.txt\nSelect-String -Pattern "ERROR" -Path log.txt',
          },
          {
            instruction: 'Step 2: Use Get-ChildItem piped to Where-Object to list only files (not folders) in the current directory. Check $_.PSIsContainer -eq $false.',
            starterCode: '# List only files (not folders) using pipeline + Where-Object\n',
            solution: 'Get-ChildItem | Where-Object { $_.PSIsContainer -eq $false }',
          },
          {
            instruction: 'Step 3: Use Get-ChildItem piped to Select-Object to show only the Name and LastWriteTime properties of items in the current directory.',
            starterCode: '# Show only Name and LastWriteTime properties\n',
            solution: 'Get-ChildItem | Select-Object Name, LastWriteTime',
          },
        ],
      },
    },
    {
      id: 'ps-5',
      title: 'Lesson 5: Variables and Pipelines',
      content: `Variables let you store values for reuse. Pipelines chain commands together so the output of one becomes the input of the next — this is the foundation of PowerShell's power.

VARIABLES
Variables in PowerShell always start with $:

  $name = "Alice"
  $age = 30
  $files = Get-ChildItem

You can store any value: text, numbers, command output, objects.

USING VARIABLES
  Write-Output "Hello, $name"          -- string interpolation in double quotes
  Write-Output ('Hello, ' + $name)     -- concatenation
  Write-Output "You are $age years old"

ARITHMETIC
  $x = 10
  $y = 3
  Write-Output ($x + $y)     # 13
  Write-Output ($x * $y)     # 30
  Write-Output ($x / $y)     # 3.333...
  Write-Output ($x % $y)     # 1 (remainder)

THE PIPELINE |
The pipe | sends the output of the command on its left as input to the command on its right:

  Get-ChildItem | Sort-Object Name     -- list files sorted by name
  Get-ChildItem | Measure-Object       -- count files and get statistics

FOREACH-OBJECT — PROCESS EACH ITEM
  Get-ChildItem *.txt | ForEach-Object {
      Write-Output "File: $($_.Name)"
  }

$_ inside ForEach-Object is the current item. $($_.Name) evaluates the expression inside a string.

STORING PIPELINE RESULTS
  $txtFiles = Get-ChildItem *.txt
  Write-Output "Found $($txtFiles.Count) text files"`,
      quiz: [
        {
          question: 'What does the | (pipe) operator do in PowerShell?',
          options: [
            'It creates a new file called pipe',
            'It performs a logical OR operation',
            'It sends the output of the left command as input to the right command',
            'It runs two commands simultaneously',
          ],
          answer: 2,
        },
        {
          question: 'Given $count = 5, which command prints "There are 5 files"?',
          options: [
            'Write-Output "There are $count files"',
            'Write-Output "There are {count} files"',
            'Write-Output There are $count files',
            'Print("There are " + count + " files")',
          ],
          answer: 0,
        },
      ],
      exercise: {
        steps: [
          {
            instruction: 'Step 1: Create a variable $greeting with the value "Good morning". Then use Write-Output to print "Good morning, PowerShell!" using string interpolation.',
            starterCode: '# Create $greeting variable and print a message using it\n',
            solution: '$greeting = "Good morning"\nWrite-Output "$greeting, PowerShell!"',
            expectedOutput: 'Good morning, PowerShell!',
          },
          {
            instruction: 'Step 2: Create two numeric variables $a = 15 and $b = 4. Print the result of $a + $b, $a * $b, and $a % $b on separate lines.',
            starterCode: '# Arithmetic with variables — print sum, product, and remainder\n',
            solution: '$a = 15\n$b = 4\nWrite-Output ($a + $b)\nWrite-Output ($a * $b)\nWrite-Output ($a % $b)',
            expectedOutput: '19\n60\n3',
          },
          {
            instruction: 'Step 3: Use Get-ChildItem piped to Measure-Object to count the number of items in the current directory. Store the result in $result and print "Items: " followed by $result.Count.',
            starterCode: '# Count items in current directory and print the count\n',
            solution: '$result = Get-ChildItem | Measure-Object\nWrite-Output "Items: $($result.Count)"',
          },
        ],
      },
    },
    {
      id: 'ps-6',
      title: 'Lesson 6: Conditionals and Loops',
      content: `PowerShell supports the same programming constructs you have learned in JavaScript and Python: if/else for decisions, for and while for repetition.

IF / ELSE
  $temperature = 35

  if ($temperature -gt 30) {
      Write-Output "It is hot."
  } elseif ($temperature -gt 20) {
      Write-Output "It is warm."
  } else {
      Write-Output "It is cool."
  }

POWERSHELL COMPARISON OPERATORS
Note: PowerShell uses -gt, -lt, -eq instead of >, <, ==:
  -eq   equal to
  -ne   not equal to
  -gt   greater than
  -lt   less than
  -ge   greater than or equal
  -le   less than or equal
  -like wildcard match ("Alice" -like "Ali*")

FOR LOOP
  for ($i = 1; $i -le 5; $i++) {
      Write-Output "Count: $i"
  }

FOREACH LOOP
  $languages = @("HTML", "CSS", "JavaScript", "Python", "SQL")

  foreach ($lang in $languages) {
      Write-Output "Language: $lang"
  }

WHILE LOOP
  $n = 1
  while ($n -le 3) {
      Write-Output "Iteration $n"
      $n++
  }

ARRAYS IN POWERSHELL
Create an array with @():
  $colours = @("red", "green", "blue")
  $colours[0]          # "red"
  $colours.Count       # 3
  $colours += "yellow" # add an item`,
      quiz: [
        {
          question: 'In PowerShell, how do you check if $x equals 10?',
          options: [
            '$x == 10',
            '$x = 10',
            '$x -eq 10',
            '$x === 10',
          ],
          answer: 2,
        },
        {
          question: 'How do you create an array in PowerShell?',
          options: [
            '["a", "b", "c"]',
            '("a", "b", "c")',
            '@("a", "b", "c")',
            'Array("a", "b", "c")',
          ],
          answer: 2,
        },
      ],
      exercise: {
        steps: [
          {
            instruction: 'Step 1: Write a PowerShell if/else: given $score = 85, print "Pass" if $score -ge 60, otherwise print "Fail".',
            starterCode: '$score = 85\n# Print Pass or Fail based on score\n',
            solution: '$score = 85\nif ($score -ge 60) {\n    Write-Output "Pass"\n} else {\n    Write-Output "Fail"\n}',
            expectedOutput: 'Pass',
          },
          {
            instruction: 'Step 2: Create an array $fruits = @("apple", "banana", "cherry"). Use foreach to print each fruit with Write-Output.',
            starterCode: '$fruits = @("apple", "banana", "cherry")\n# Loop through and print each fruit\n',
            solution: '$fruits = @("apple", "banana", "cherry")\nforeach ($fruit in $fruits) {\n    Write-Output $fruit\n}',
            expectedOutput: 'apple\nbanana\ncherry',
          },
          {
            instruction: 'Step 3: Use a for loop to print the numbers 1 through 5, one per line.',
            starterCode: '# Use a for loop to print 1, 2, 3, 4, 5\n',
            solution: 'for ($i = 1; $i -le 5; $i++) {\n    Write-Output $i\n}',
            expectedOutput: '1\n2\n3\n4\n5',
          },
        ],
      },
    },
    {
      id: 'ps-7',
      title: 'Lesson 7: Functions and Scripts',
      content: `Like other languages, PowerShell lets you define reusable functions. You can also save a series of commands to a .ps1 script file and run it whenever you need.

DEFINING A FUNCTION
  function Say-Hello {
      Write-Output "Hello from a function!"
  }

  Say-Hello   # call it

WITH PARAMETERS
  function Greet-User {
      param ($Name)
      Write-Output "Hello, $Name!"
  }

  Greet-User -Name "Alice"   # Hello, Alice!

PARAMETER WITH DEFAULT VALUE
  function Greet-User {
      param ($Name = "World")
      Write-Output "Hello, $Name!"
  }

  Greet-User             # Hello, World!
  Greet-User -Name "Bob" # Hello, Bob!

RETURNING VALUES
  function Add-Numbers {
      param ($A, $B)
      return $A + $B
  }

  $sum = Add-Numbers -A 3 -B 5
  Write-Output "Sum: $sum"   # Sum: 8

PS1 SCRIPT FILES
Save commands to a .ps1 file and run it:

  # hello.ps1
  Write-Output "Hello from a script file!"

Run it:
  .\\hello.ps1

COMMON DEVELOPMENT WORKFLOW COMMANDS
Once you understand the terminal, you can run any tool:

  git status                  -- check git repository status
  git add .                   -- stage all changes
  git commit -m "message"     -- commit staged changes
  npm install                 -- install Node.js packages
  npm start                   -- start a Node.js project
  python script.py            -- run a Python script
  python -m pip install numpy -- install a Python package`,
      quiz: [
        {
          question: 'How do you call a function named Get-Report with a parameter called Path set to "C:\\logs"?',
          options: [
            'Get-Report("C:\\logs")',
            'Get-Report -Path "C:\\logs"',
            'Call Get-Report Path="C:\\logs"',
            'Get-Report $Path = "C:\\logs"',
          ],
          answer: 1,
        },
        {
          question: 'How do you run a PowerShell script file called setup.ps1 in the current directory?',
          options: [
            'run setup.ps1',
            'execute setup.ps1',
            '.\\setup.ps1',
            'ps1 setup.ps1',
          ],
          answer: 2,
        },
      ],
      exercise: {
        steps: [
          {
            instruction: 'Step 1: Define a function called Say-Hello that writes "Hello from PowerShell!" to output. Then call it.',
            starterCode: '# Define Say-Hello, then call it\n',
            solution: 'function Say-Hello {\n    Write-Output "Hello from PowerShell!"\n}\nSay-Hello',
            expectedOutput: 'Hello from PowerShell!',
          },
          {
            instruction: 'Step 2: Define a function called Get-Square that takes a parameter $Number and returns $Number * $Number. Call it with 7 and print the result.',
            starterCode: '# Define Get-Square, call it with 7, print result\n',
            solution: 'function Get-Square {\n    param ($Number)\n    return $Number * $Number\n}\n$result = Get-Square -Number 7\nWrite-Output $result',
            expectedOutput: '49',
          },
          {
            instruction: 'Step 3: Define a function called Greet-User with a $Name parameter defaulting to "World". Call it once with no argument, and once with Name = "Alice".',
            starterCode: '# Define Greet-User with default param, call it twice\n',
            solution: 'function Greet-User {\n    param ($Name = "World")\n    Write-Output "Hello, $Name!"\n}\nGreet-User\nGreet-User -Name "Alice"',
            expectedOutput: 'Hello, World!\nHello, Alice!',
          },
        ],
      },
    },
    {
      id: 'ps-8',
      title: 'Lesson 8: Using Dev Tools from the Terminal',
      content: `The terminal is where developers live. Git, Node.js, npm, Python, and many other tools have no GUI — the terminal is their primary interface. This lesson shows you how to use them.

GIT — VERSION CONTROL
Git tracks changes to your code. Core commands:

  git init              -- create a new repository
  git status            -- see what has changed
  git add filename.txt  -- stage a specific file
  git add .             -- stage all changes
  git commit -m "msg"   -- save staged changes with a message
  git log --oneline     -- view commit history (compact)
  git push              -- send commits to GitHub
  git pull              -- get latest changes from GitHub
  git branch            -- list branches
  git checkout -b new-branch -- create and switch to a new branch

NODE.JS AND NPM
  node --version        -- check Node.js version
  npm --version         -- check npm version
  npm init -y           -- create package.json
  npm install express   -- install a package
  npm start             -- run the start script from package.json
  node app.js           -- run a JavaScript file directly

PYTHON
  python --version      -- check Python version
  python script.py      -- run a Python file
  python -c "print(42)" -- run a one-liner
  pip install requests  -- install a Python package
  pip list              -- list installed packages

NAVIGATING TO YOUR PROJECT
Before running any dev tool, navigate to your project folder first:

  cd "C:\\Users\\Alice\\Documents\\my-project"
  ls                          -- verify you are in the right place
  git status                  -- check the git state
  npm start                   -- start the dev server

KEYBOARD SHORTCUTS IN THE TERMINAL
  Up arrow     -- cycle through previous commands
  Tab          -- autocomplete file and folder names
  Ctrl+C       -- stop a running process
  Ctrl+L       -- clear the screen (or use the Clear-Host command)`,
      quiz: [
        {
          question: 'Which git command shows the current state of your repository — which files have changed and which are staged?',
          options: ['git log', 'git show', 'git status', 'git diff'],
          answer: 2,
        },
        {
          question: 'What does Ctrl+C do in a terminal?',
          options: [
            'Copies selected text',
            'Clears the screen',
            'Stops the currently running process',
            'Opens a new terminal window',
          ],
          answer: 2,
        },
      ],
      exercise: {
        steps: [
          {
            instruction: 'Step 1: Check what version of Python is installed by running: python --version. The output will vary by machine.',
            starterCode: '# Check Python version\n',
            solution: 'python --version',
          },
          {
            instruction: 'Step 2: Use Write-Output to print a "developer cheatsheet" — three lines: "git status", "npm start", "python script.py". These are commands you will use every day.',
            starterCode: '# Print your three most-used dev commands\n',
            solution: 'Write-Output "git status"\nWrite-Output "npm start"\nWrite-Output "python script.py"',
            expectedOutput: 'git status\nnpm start\npython script.py',
          },
          {
            instruction: 'Step 3: Define a PowerShell function called Show-DevTools that prints three lines: "Git: version control", "Node: JavaScript runtime", "Python: scripting and data". Call it.',
            starterCode: '# Define Show-DevTools and call it\n',
            solution: 'function Show-DevTools {\n    Write-Output "Git: version control"\n    Write-Output "Node: JavaScript runtime"\n    Write-Output "Python: scripting and data"\n}\nShow-DevTools',
            expectedOutput: 'Git: version control\nNode: JavaScript runtime\nPython: scripting and data',
          },
        ],
      },
    },
  ],
};

if (typeof module !== 'undefined') module.exports = powershellModule;
if (typeof window !== 'undefined') window.powershellModule = powershellModule;
