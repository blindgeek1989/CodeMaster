const thinkProgrammerModule = {
  id: 'think',
  title: 'How to Think Like a Programmer',
  description: 'Before you write a single line of code, you need to think like a programmer. This module teaches the mental models every programmer uses every day — no syntax required. Start here if you are brand new to coding.',
  objectives: [
    'Understand what a program is and how computers follow instructions',
    'Break any problem into smaller, solvable pieces using decomposition',
    'Design step-by-step solutions called algorithms',
    'Understand variables, conditions, loops, and functions as ideas — before writing code',
    'Develop a debugging mindset for finding and fixing mistakes',
    'Read error messages and use them to solve problems',
  ],
  goals: [
    'Describe any everyday process as an algorithm',
    'Break a complex problem into smaller sub-problems',
    'Explain variables, conditions, and loops without writing a single line of code',
    'Read an error message and identify what it is telling you to fix',
  ],
  lessons: [
    {
      id: 'think-1',
      title: 'Lesson 1: What Is Programming?',
      content: `Programming is the act of writing instructions that a computer can follow. That is it. The instructions are called a program, and the languages you write them in are called programming languages.

COMPUTERS ARE VERY LITERAL
The most important thing to understand about computers is that they do exactly what you say — not what you mean. A human can understand "make me a sandwich" even if you leave out details. A computer cannot. If you do not specify what bread, what fillings, and in what order to layer them, the computer has no way to proceed.

This is why programming requires precision. Every detail matters. Every step must be stated explicitly. This sounds frustrating, but it is actually a powerful discipline — writing precise instructions forces you to understand a problem completely.

WHAT IS A PROGRAM?
A program is a list of instructions that a computer follows, one at a time, in order. Think of a program like a recipe:

Recipe for boiling water:
1. Fill the kettle with water.
2. Place the kettle on the stove.
3. Turn the stove on to high heat.
4. Wait until the water boils.
5. Turn the stove off.

A recipe is precise, ordered, and complete. A program works the same way.

WHAT IS A PROGRAMMING LANGUAGE?
Computers understand only one language natively: machine code, which is sequences of 1s and 0s. Programming languages are a human-readable middle layer. You write instructions in a language like Python, JavaScript, or HTML, and a tool called a compiler or interpreter translates it into instructions the computer can run.

Different languages are designed for different jobs:
- HTML structures web content
- CSS styles web pages
- JavaScript makes web pages interactive
- Python handles data, automation, and AI
- SQL retrieves and organizes data in databases

WHY THIS MATTERS FOR YOU
Learning to code is learning to think in a new way. The mental shift from "a vague idea of what I want" to "exact step-by-step instructions" is the real skill. Once you have that shift, you can learn any programming language — because the core thinking is always the same.

THE KEY INSIGHT: programming is a conversation with a very precise, very fast, very obedient machine. Your job is to give it the right instructions.`,
      quiz: [
        {
          question: 'Why must instructions for a computer be more precise than instructions for a human?',
          options: [
            'Because computers work slower and need more detail to keep up',
            'Because computers do exactly what you say — not what you mean — and have no ability to infer missing details',
            'Because programming languages are difficult to learn',
            'Because computers can only understand numbers, not words',
          ],
          answer: 1,
        },
        {
          question: 'What is the purpose of a programming language like Python or JavaScript?',
          options: [
            'To slow down the computer so humans can keep up',
            'To replace the need for instructions entirely',
            'To provide a human-readable way to write instructions that are then translated into something the computer can run',
            'To make websites look more attractive',
          ],
          answer: 2,
        },
        {
          question: 'A recipe is a good analogy for a program because:',
          options: [
            'Both are written in the same language',
            'Both are lists of precise, ordered steps that produce a specific result',
            'Both require a computer to execute',
            'Both are created only by professionals',
          ],
          answer: 1,
        },
      ],
      exercise: null,
    },
    {
      id: 'think-2',
      title: 'Lesson 2: Breaking Problems Down',
      content: `The most important skill in programming is not knowing syntax. It is knowing how to break a large, complex problem into smaller, manageable pieces. Programmers call this decomposition.

THE CORE CHALLENGE
When a beginner looks at a programming problem, they often feel overwhelmed because the whole thing seems too big to tackle. Experienced programmers feel the same way — but they immediately start breaking the problem apart.

The rule: never try to solve a big problem all at once. Break it into smaller problems, then solve each one separately.

AN EVERYDAY EXAMPLE
Suppose someone says: "Plan a dinner party for 10 people."

That feels enormous. But break it down:
- Decide on a menu
- Write a shopping list
- Buy the groceries
- Prepare the food
- Set the table
- Serve the food

Now break each of those down further:
"Write a shopping list" becomes:
  - Review the menu
  - List every ingredient
  - Check what is already in the kitchen
  - Remove what you already have
  - Group remaining items by store section

Each sub-task is now small enough to actually do. This is decomposition.

HOW THIS APPLIES TO CODE
Imagine you are asked to "build a sign-up form." Broken down, that becomes:
1. Create a form element in HTML
2. Add an email input field
3. Add a password input field
4. Add a submit button
5. Write code to check the email looks valid
6. Write code to check the password is long enough
7. Show an error message if something is wrong
8. Send the data to a server if everything is correct

Each of those steps is a separate, solvable task. None of them are "build a sign-up form."

TOP-DOWN THINKING
Start with the big goal and break it into major parts. Then break each major part into smaller parts. Keep going until every piece is small enough that you know exactly how to do it.

Top → Build a website
  ↓   Create the HTML structure
      ↓  Add a header
         ↓  Write the navigation
         ↓  Add the logo
      ↓  Add the main content
      ↓  Add a footer

WHEN YOU ARE STUCK
If you are stuck on a programming problem, the fix is almost always the same: you have not broken the problem down enough. Find the step that feels too big and break it into two or three smaller steps.`,
      quiz: [
        {
          question: 'What is decomposition in the context of programming?',
          options: [
            'Breaking a computer apart to fix hardware problems',
            'Breaking a complex problem into smaller, more manageable pieces',
            'Deleting parts of a program that do not work',
            'Converting a program from one language to another',
          ],
          answer: 1,
        },
        {
          question: 'An experienced programmer feels overwhelmed by a large problem. What do they do?',
          options: [
            'They give up and choose a simpler problem',
            'They write all the code at once so they can see the whole picture',
            'They immediately break the problem into smaller pieces',
            'They look for a pre-written solution and copy it',
          ],
          answer: 2,
        },
        {
          question: 'You are stuck on a programming problem. What is the most likely reason?',
          options: [
            'You do not know the right programming language',
            'The problem is simply too hard to solve',
            'You have not broken the problem down into small enough pieces',
            'You need a faster computer',
          ],
          answer: 2,
        },
      ],
      exercise: null,
    },
    {
      id: 'think-3',
      title: 'Lesson 3: Thinking in Steps — Algorithms',
      content: `An algorithm is a precise, step-by-step procedure for solving a problem. Every program you will ever write is an algorithm. Learning to think in algorithms is one of the most valuable skills you can develop.

WHAT MAKES SOMETHING AN ALGORITHM?
A good algorithm has four properties:

1. PRECISE — every step is clear and unambiguous. There is no room for interpretation.
2. ORDERED — the steps happen in a specific sequence. Changing the order changes the result.
3. FINITE — the algorithm ends. It does not run forever.
4. CORRECT — if you follow all the steps, you get the right result.

AN EVERYDAY ALGORITHM
Getting dressed in the morning is an algorithm (or at least it should be). Here is a better-than-average version:

1. Check today's weather.
2. If it is cold, select a warm outfit. If it is warm, select a light outfit.
3. Put on underwear.
4. Put on socks.
5. Put on trousers or skirt.
6. Put on shirt or top.
7. If cold, put on a jumper or jacket.
8. Put on shoes.

Notice that step 2 is a decision — the algorithm branches based on a condition. This is a key feature of algorithms.

PSEUDOCODE
Before writing real code, programmers often write pseudocode — a plain-English version of their algorithm that looks roughly like code but is not tied to any specific language. It is a thinking tool, not executable code.

Example — algorithm for a simple login:
  1. Get the username from the user.
  2. Get the password from the user.
  3. Look up the username in the database.
  4. If the username does not exist, show "Invalid username".
  5. If the username exists but the password does not match, show "Incorrect password".
  6. If both match, show the user's dashboard.

This pseudocode could be translated into Python, JavaScript, or any other language. The thinking comes first; the syntax comes second.

ALGORITHMS VS PROGRAMS
An algorithm is the idea. A program is the implementation of that idea in a specific language. The same algorithm can be written in dozens of different programming languages. This is why learning to think algorithmically is more valuable than memorizing syntax.

TESTING YOUR ALGORITHM
Before you code, run through your algorithm step by step in your head. Ask: "If a very literal robot followed these exact steps, would it get the right answer?" If the answer is no, fix the algorithm before you write a single line of code.`,
      quiz: [
        {
          question: 'Which of the following is NOT a required property of a good algorithm?',
          options: [
            'Precise — every step is clear',
            'Ordered — steps happen in sequence',
            'Written in Python — the most readable language',
            'Finite — the algorithm eventually ends',
          ],
          answer: 2,
        },
        {
          question: 'What is pseudocode?',
          options: [
            'Broken code that contains errors',
            'A secret language used by expert programmers',
            'A plain-English description of an algorithm, written before real code, to think through the steps',
            'A type of code that only works on older computers',
          ],
          answer: 2,
        },
        {
          question: 'What is the key difference between an algorithm and a program?',
          options: [
            'Algorithms are for math problems; programs are for everything else',
            'An algorithm is the step-by-step idea; a program is that idea written in a specific language',
            'Programs are always faster than algorithms',
            'There is no difference — the words mean the same thing',
          ],
          answer: 1,
        },
      ],
      exercise: null,
    },
    {
      id: 'think-4',
      title: 'Lesson 4: Variables — How Computers Remember',
      content: `A variable is a named container that holds a value. Variables let a program store information and use it later. They are one of the most fundamental concepts in all of programming.

THE LABELED BOX ANALOGY
Imagine a row of boxes. Each box has a label on it, and each box holds one item. You can:
- Put something in a box (store a value)
- Look inside a box to see what is there (read a value)
- Replace the contents of a box with something new (update a value)

In programming:
- The label is the variable name
- The contents of the box is the variable's value

Example:
  Name the box: age
  Put the value 25 in it.
  Later: look in the "age" box → you get 25.
  Change the value to 26 (it is your birthday!).
  Now the "age" box contains 26.

NAMING VARIABLES
Variable names should be descriptive. The name should tell you exactly what the variable holds.

Bad names:  x, y, a, thing1
Good names: age, username, totalPrice, isLoggedIn

Clear variable names make code readable. When you return to code six months later, good names tell you exactly what each variable means.

TYPES OF VALUES
Variables can hold different types of values. The main types you will encounter are:

TEXT (also called a string)
  The value is words, letters, or any text.
  Example: name = "Alex"

NUMBER (also called an integer or float)
  The value is a number. Integers are whole numbers; floats have a decimal point.
  Example: age = 25, price = 9.99

TRUE/FALSE (also called a boolean)
  The value is either true or false. No other options.
  Example: isLoggedIn = true, hasError = false

LIST (also called an array)
  The value is a collection of items in order.
  Example: shoppingList = ["milk", "bread", "eggs"]

VARIABLES THAT CHANGE VS VARIABLES THAT STAY THE SAME
Some variables change during a program — like a score in a game that goes up and down.
Some variables should never change — like the maximum number of attempts allowed.

Most programming languages let you declare a variable as "constant" (cannot change) or "variable" (can change). Using constants where values should not change prevents accidental bugs.

WHY VARIABLES MATTER
Without variables, a program could not remember anything. Every piece of information a program works with — the user's name, the result of a calculation, whether someone is logged in — is stored in a variable.`,
      quiz: [
        {
          question: 'What is a variable in programming?',
          options: [
            'A named container that holds a value the program can use and change',
            'A type of error that causes a program to crash',
            'A line of code that performs a calculation',
            'A command that tells the computer to repeat something',
          ],
          answer: 0,
        },
        {
          question: 'A variable called "isLoggedIn" holds the value "true". What type of value is this?',
          options: [
            'Text (string)',
            'Number (integer)',
            'Boolean (true or false)',
            'List (array)',
          ],
          answer: 2,
        },
        {
          question: 'Which is the best variable name for storing a user\'s email address?',
          options: [
            'x',
            'e',
            'emailAddress',
            'thing',
          ],
          answer: 2,
        },
      ],
      exercise: null,
    },
    {
      id: 'think-5',
      title: 'Lesson 5: Making Decisions — Conditions',
      content: `Programs need to make decisions. Depending on the situation, a program might do one thing or something completely different. This is handled using conditions.

IF / THEN / ELSE
The core of decision-making in programming is the if/then/else structure:

  IF some condition is true
    THEN do this
  ELSE
    do that instead

Everyday example — deciding what to wear:
  IF it is raining outside
    THEN bring an umbrella
  ELSE
    leave the umbrella at home

In code, this looks roughly like:
  if (isRaining) {
    bringUmbrella();
  } else {
    leaveUmbrellaHome();
  }

BOOLEAN CONDITIONS
Every condition is either true or false. A condition is a question with a yes/no answer:
- Is the user logged in? (true or false)
- Is the temperature above 20°C? (true or false)
- Does the password match? (true or false)
- Is the shopping cart empty? (true or false)

COMPARISON OPERATORS
To create conditions, you compare values:
  Equal to:           age == 18
  Not equal to:       age != 18
  Greater than:       age > 18
  Less than:          age < 18
  Greater or equal:   age >= 18
  Less or equal:      age <= 18

COMBINING CONDITIONS
You can combine conditions using AND and OR:

  AND — both conditions must be true
    IF age >= 18 AND hasValidID
      THEN allow entry

  OR — at least one condition must be true
    IF isAdmin OR isOwner
      THEN show the management panel

  NOT — reverses a condition
    IF NOT isLoggedIn
      THEN redirect to the login page

ELSE IF — multiple branches
Sometimes you need more than two paths:

  IF temperature > 30
    THEN say "It is very hot"
  ELSE IF temperature > 20
    THEN say "It is warm"
  ELSE IF temperature > 10
    THEN say "It is cool"
  ELSE
    THEN say "It is cold"

THE KEY INSIGHT: any time a program does different things depending on the situation, there is a condition (or several) controlling it.`,
      quiz: [
        {
          question: 'What does the ELSE clause do in an if/then/else structure?',
          options: [
            'It repeats the same action a second time',
            'It specifies what happens when the IF condition is false',
            'It stops the program from running',
            'It checks a second condition before continuing',
          ],
          answer: 1,
        },
        {
          question: 'A program checks: "Is the user logged in AND has the user\'s account been verified?" What must be true for both conditions to pass?',
          options: [
            'Only the first condition must be true',
            'Only one of the two conditions must be true',
            'Both conditions must be true',
            'Neither condition needs to be true',
          ],
          answer: 2,
        },
        {
          question: 'What type of value does every condition evaluate to?',
          options: [
            'A number',
            'A piece of text',
            'True or false',
            'A list of options',
          ],
          answer: 2,
        },
      ],
      exercise: null,
    },
    {
      id: 'think-6',
      title: 'Lesson 6: Doing Things Repeatedly — Loops',
      content: `Loops allow a program to repeat the same set of instructions multiple times without writing them out repeatedly. Loops are one of the most powerful ideas in programming.

WHY LOOPS EXIST
Suppose you need to send a birthday email to 10,000 users. Without loops, you would have to write "send email" 10,000 times. With a loop, you write "send email" once and tell the computer to repeat it for every user.

Loops make the impossible possible.

THE TWO MAIN TYPES OF LOOPS

TYPE 1: REPEAT A KNOWN NUMBER OF TIMES (for loop)
Use this when you know exactly how many times to repeat.

  Repeat 10 times:
    send email to next user

Or more precisely:
  FOR each user IN the list of 10,000 users:
    send email to that user

This type of loop iterates over a list — going through each item one by one.

TYPE 2: REPEAT WHILE A CONDITION IS TRUE (while loop)
Use this when you do not know how many repetitions are needed, but you know when to stop.

  WHILE the user has not guessed the correct word:
    show "Wrong, try again"
    ask for another guess

  IF the user guesses correctly:
    show "You got it!"

The loop continues as long as the condition is true. When the condition becomes false, the loop stops.

EVERYDAY LOOPS
- Counting votes: for each ballot in the pile, add one to the correct candidate's total.
- Processing a shopping cart: for each item in the cart, add its price to the total.
- Waiting for input: while the form is not complete, show a prompt to fill in missing fields.

INFINITE LOOPS — A COMMON MISTAKE
If the condition in a while loop never becomes false, the loop runs forever. This is called an infinite loop. It freezes or crashes the program.

Example of an infinite loop:
  count = 0
  WHILE count < 10:
    say "Hello"
    // Oops — we never increase count!
    // count stays at 0 forever.

The fix: always make sure something changes inside the loop so the condition can eventually become false.

NESTED LOOPS
You can put a loop inside another loop. This is called nesting. Be careful — nesting adds complexity quickly.

THE KEY INSIGHT: whenever a program needs to do the same thing multiple times — whether for a list of items or until something changes — a loop is the answer.`,
      quiz: [
        {
          question: 'Which type of loop is best when you know exactly how many times to repeat?',
          options: [
            'A while loop, because it is simpler',
            'A for loop, because it is designed for a known number of repetitions',
            'A condition, because it checks before each run',
            'A variable, because it stores the count',
          ],
          answer: 1,
        },
        {
          question: 'What is an infinite loop?',
          options: [
            'A loop that runs exactly ten times',
            'A loop that skips every other item',
            'A loop whose condition never becomes false, so it runs forever',
            'A loop that contains a condition inside it',
          ],
          answer: 2,
        },
        {
          question: 'A program needs to add up the prices of every item in a shopping basket. What programming concept handles this?',
          options: [
            'A variable that stores the total, updated using a loop for each item',
            'A condition that checks if the total is too high',
            'A function that displays the final price',
            'A constant that holds a fixed price',
          ],
          answer: 0,
        },
      ],
      exercise: null,
    },
    {
      id: 'think-7',
      title: 'Lesson 7: Functions — Packaging Your Solutions',
      content: `A function is a named, reusable block of code that does one specific job. Instead of writing the same instructions over and over in different places, you write them once inside a function and then call the function whenever you need them.

THE RECIPE ANALOGY
Think of a function like a recipe. A recipe is a set of steps for making a dish. You write it once, and then you can follow it (call it) as many times as you like. Every time you follow it, you get the same dish.

A function works the same way:
- You define it once (write the instructions).
- You call it whenever you need the result.

ANATOMY OF A FUNCTION
A function has three parts:

1. NAME — what the function is called
   A good name describes exactly what the function does.
   Examples: calculateTotal, sendWelcomeEmail, checkPassword

2. INPUT (parameters) — what information the function needs to do its job
   Not all functions need input. But many do.
   Example: a function called greetUser might need the user's name as input.

3. OUTPUT (return value) — what the function gives back when it is done
   Not all functions produce output. But many do.
   Example: a function called addTax might take a price and return the price with tax added.

In pseudocode:
  FUNCTION calculateTotal(price, taxRate):
    total = price + (price * taxRate)
    RETURN total

  calculateTotal(100, 0.2)  → returns 120
  calculateTotal(50, 0.2)   → returns 60

THE DRY PRINCIPLE
DRY stands for "Don't Repeat Yourself." If you find yourself writing the same code in two or three places, that is a signal to create a function.

WHY FUNCTIONS MATTER
Functions give you four huge benefits:

1. REUSE — write once, use many times.
2. CLARITY — a function with a good name tells you exactly what it does without reading all the code inside.
3. MAINTAINABILITY — if something needs to change, you change it in one place (the function), not in ten places across your code.
4. TESTABILITY — you can test a function in isolation to make sure it works correctly.

SMALL FUNCTIONS ARE BETTER
A function should do one thing and do it well. If a function is getting very long or doing several unrelated jobs, split it into smaller functions. A function that is 5 lines long and has a clear name is almost always better than one that is 50 lines long.`,
      quiz: [
        {
          question: 'What does the DRY principle mean in programming?',
          options: [
            'Delete Redundant Yields — remove unnecessary outputs',
            'Don\'t Repeat Yourself — if you are writing the same code in multiple places, create a function instead',
            'Do Run Yearly — schedule code to run once a year',
            'Dynamic Recursive Yield — a type of loop inside a function',
          ],
          answer: 1,
        },
        {
          question: 'A function called calculateDiscount takes a price and discount percentage as inputs and returns the discounted price. What are the inputs called?',
          options: [
            'Variables',
            'Return values',
            'Parameters',
            'Conditions',
          ],
          answer: 2,
        },
        {
          question: 'Why is it better to have many small functions instead of one very large function?',
          options: [
            'Small functions run faster because they have fewer lines',
            'Small functions with clear names are easier to understand, reuse, and fix when something goes wrong',
            'Programming languages require functions to be less than 10 lines',
            'Large functions cause the computer to overheat',
          ],
          answer: 1,
        },
      ],
      exercise: null,
    },
    {
      id: 'think-8',
      title: 'Lesson 8: When Things Go Wrong — Debugging',
      content: `Every programmer writes bugs. No exceptions. The ability to find and fix bugs — called debugging — is one of the most important skills you will develop. This lesson gives you a mindset and a method.

WHAT IS A BUG?
A bug is any mistake in a program that causes it to behave in an unintended way. The term dates to 1947, when engineers found an actual moth trapped in a relay inside a computer. Grace Hopper's team taped it into the logbook with the note: "First actual case of bug being found."

TYPES OF BUGS
There are three main categories:

1. SYNTAX ERRORS — the code is written incorrectly, breaking the rules of the language.
   The program will not run at all.
   Example: forgetting a closing parenthesis, misspelling a keyword.

2. LOGIC ERRORS — the code runs without crashing, but it produces the wrong result.
   These are the hardest bugs to find.
   Example: using + instead of * in a calculation, checking the wrong condition.

3. RUNTIME ERRORS — the code starts running correctly but crashes partway through.
   Usually caused by unexpected situations.
   Example: trying to read a file that does not exist, dividing a number by zero.

THE SCIENTIFIC METHOD APPLIED TO DEBUGGING
The best way to debug is to treat it like a scientific investigation:

1. OBSERVE — what exactly is happening? What is the program doing that it should not, or not doing that it should?
2. HYPOTHESIZE — form a theory about what is causing the problem.
3. TEST — make the smallest possible change to test your theory.
4. ANALYZE — did the change fix the problem? If yes, you found the bug. If no, form a new hypothesis.
5. REPEAT — keep going until you find the root cause.

PRACTICAL DEBUGGING STRATEGIES

READ THE ERROR MESSAGE FIRST.
Error messages tell you what went wrong and usually where. Many beginners skip reading the error message because it looks intimidating. Do not skip it. The answer is often right there.

ADD OUTPUT AT KEY POINTS.
When a program misbehaves, add temporary print statements to display the value of variables at key moments. This tells you exactly what the program "thinks" at each step.

NARROW IT DOWN.
If a program has 100 lines and something is wrong, check the first 50 lines. If they are fine, check lines 50-100. Keep halving the problem until you find the one line causing the issue.

TAKE A BREAK.
Fresh eyes catch bugs tired eyes miss. If you are stuck, step away for a few minutes.

THE DEBUGGING MINDSET
Debugging is not a sign of failure. It is a normal, essential part of programming. Every programmer spends a significant portion of their time debugging. The best programmers are often the best debuggers — patient, methodical, and curious.`,
      quiz: [
        {
          question: 'Your program runs without crashing but consistently produces the wrong calculation result. What type of bug is this?',
          options: [
            'A syntax error — the code is written incorrectly',
            'A logic error — the code runs but produces the wrong result',
            'A runtime error — the program crashes during execution',
            'A compiler error — the code cannot be translated',
          ],
          answer: 1,
        },
        {
          question: 'What is the first thing you should do when your program shows an error message?',
          options: [
            'Delete all your code and start over',
            'Ask someone else to fix it',
            'Read the error message carefully — it usually tells you what went wrong and where',
            'Restart your computer',
          ],
          answer: 2,
        },
        {
          question: 'Which statement best describes the attitude a programmer should have toward bugs?',
          options: [
            'Bugs are a sign of poor programming ability and should be avoided entirely',
            'Bugs are a normal part of programming; debugging is an essential skill all programmers develop',
            'Bugs only appear in large programs with hundreds of lines',
            'Bugs can be prevented entirely by writing more code',
          ],
          answer: 1,
        },
      ],
      exercise: null,
    },
    {
      id: 'think-9',
      title: 'Lesson 9: Reading Error Messages',
      content: `Error messages are not your enemy — they are your most direct path to fixing a problem. Learning to read them confidently transforms debugging from guesswork into investigation.

WHY BEGINNERS FEAR ERROR MESSAGES
When you are new to coding, an error message looks like a wall of meaningless text. It is easy to feel embarrassed and overwhelmed. But here is the truth: experienced programmers see an error message and feel relieved. It means the computer has pinpointed something specific. The error message is doing your work for you.

THE ANATOMY OF AN ERROR MESSAGE
Most error messages have the same three parts:

1. TYPE — what kind of error occurred.
   Examples: SyntaxError, TypeError, ReferenceError, ValueError.
   Each type tells you roughly what category of problem you are dealing with.

2. MESSAGE — a description of what went wrong.
   This is the most important part. Read it carefully.
   Example: "Cannot read properties of undefined (reading 'length')"

3. LOCATION — where the error occurred.
   Usually a file name and a line number.
   Example: app.js:42 — the error is on line 42 of app.js.

COMMON ERROR TYPES AND WHAT THEY MEAN

SYNTAXERROR
The code breaks the grammar rules of the language. The program cannot even start.
Typical message: "Unexpected token" or "Missing )"
What to do: Go to the line number shown. Look for a missing character — a closing bracket, a comma, a quote mark.

REFERENCEERROR
The code refers to something that does not exist.
Typical message: "variableName is not defined"
What to do: Check the spelling. Check that you created the variable before using it. Check that you are looking in the right place.

TYPEERROR
The code tries to do something with the wrong type of value.
Typical message: "Cannot read properties of null" or "x is not a function"
What to do: Check what type of value the variable actually holds. It may be null, undefined, or a number when you expected text.

VALUEERROR / RANGEERROR
The code uses a value that is outside the allowed range or wrong format.
Typical message: "Invalid date" or "Maximum call stack size exceeded"
What to do: Check the values you are passing into functions or calculations.

A PROCESS FOR READING ANY ERROR MESSAGE

Step 1: Read the error TYPE. What category of problem is this?
Step 2: Read the error MESSAGE. What is the computer specifically saying went wrong?
Step 3: Read the LOCATION. What file, what line?
Step 4: Go to that line in your code and look at it carefully.
Step 5: If the line looks correct, check the lines around it — the error sometimes points one line after the actual problem.
Step 6: Search the exact error message online if you are stuck. Millions of programmers have encountered the same error.

THE KEY INSIGHT
An error message is the computer trying to help you. It always points at something real. Your job is to read it carefully, locate the line, and investigate. Treat every error message as a clue, not a failure.`,
      quiz: [
        {
          question: 'An error message says: "ReferenceError: myVariable is not defined — app.js line 15". What should you check first?',
          options: [
            'Delete the entire file and start again',
            'Go to line 15 in app.js and check that myVariable was created and spelled correctly before being used',
            'Restart the computer and try running the program again',
            'Change the variable name to something shorter',
          ],
          answer: 1,
        },
        {
          question: 'Which part of an error message tells you WHERE the problem occurred?',
          options: [
            'The error type (SyntaxError, TypeError, etc.)',
            'The error message description',
            'The file name and line number',
            'The date and time the error occurred',
          ],
          answer: 2,
        },
        {
          question: 'You see the error: "SyntaxError: Unexpected token )". What does this most likely mean?',
          options: [
            'A variable was used before it was defined',
            'The program tried to divide by zero',
            'There is a grammar mistake in the code — possibly a mismatched or extra bracket/parenthesis near that location',
            'The computer does not have enough memory to run the program',
          ],
          answer: 2,
        },
      ],
      exercise: null,
    },
  ],
};

if (typeof module !== 'undefined') module.exports = thinkProgrammerModule;
if (typeof window !== 'undefined') window.thinkProgrammerModule = thinkProgrammerModule;
