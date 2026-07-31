const jsModule = {
  id: 'javascript',
  title: 'JavaScript Fundamentals',
  description: 'JavaScript is the programming language of the web. It makes pages interactive and responsive. We start from zero — no coding experience needed. By the end, you will understand how programs work and how to write JavaScript that is accessible.',
  objectives: [
    'Understand what programming is and how computers follow instructions',
    'Store and use information with variables',
    'Write reusable code with functions',
    'Make decisions and repeat actions with conditionals and loops',
    'Change web page content dynamically using the DOM',
    'Respond to user actions with event listeners',
    'Announce dynamic changes to screen readers using ARIA live regions',
  ],
  goals: [
    'Write a function that takes inputs and returns a result',
    'Select an HTML element and change its content with JavaScript',
    'Add a click event listener to a button',
    'Update an ARIA live region to announce a change to screen readers',
  ],
  lessons: [
    {
      id: 'js-1',
      title: 'Lesson 1: What Is Programming?',
      content: `Before you write a single line of JavaScript, let's understand what programming actually is. This lesson has no code — just ideas.

WHAT IS A PROGRAM?
A program is a set of instructions written for a computer to follow. That is all it is. The computer reads your instructions one by one, in order, and does exactly what you say.

The challenge of programming is that computers are incredibly literal. They do precisely what you tell them — nothing more, nothing less. If you tell the computer to do something in the wrong order, or forget a step, the result will not be what you expected.

Think about giving directions to a destination. If you said "turn right, go two blocks, turn left, go one block, you're there" — a human might figure it out even with a small error. A computer will fail at the first ambiguous instruction.

HOW COMPUTERS THINK
Computers are very good at four things:
1. Storing information — remembering values, numbers, and text
2. Comparing things — is A greater than B? Are these two things equal?
3. Making decisions — if this is true, do that; otherwise, do something else
4. Repeating things — do this same action 100 times without getting tired

Almost everything a program does is some combination of these four things.

KEY CONCEPTS YOU WILL USE
VARIABLE: A named container for storing a piece of information.
"Let the variable called score equal 0."
"Let the variable called playerName equal the text John."

FUNCTION: A named set of instructions you can run whenever you need them.
"To calculate the total: add the price to the tax and give back the result."
"To show a greeting: display hello followed by the player's name."

CONDITION: A question with a yes/no answer that changes what happens next.
"If the score is greater than 100, show the win screen. Otherwise, keep playing."

LOOP: A set of instructions that repeats.
"For each item in the shopping list, print the item name and price."

These four concepts — variables, functions, conditions, and loops — are the building blocks of every program ever written, in every programming language.`,
      quiz: [
        {
          question: 'What is a variable?',
          options: [
            'A type of error in a program',
            'A named container for storing a piece of information',
            'A set of instructions that repeats',
            'A question with a yes or no answer',
          ],
          answer: 1,
        },
        {
          question: 'A program needs to check if a user is old enough to access certain content. Which programming concept handles this?',
          options: [
            'A loop — repeat until the user is old enough',
            'A variable — store the age limit',
            'A condition — if age is greater than or equal to 18, allow access; otherwise, block it',
            'A function — define the age',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'No code yet. In the text area below, write out in plain English the instructions for a simple program that: (1) Asks the user for their name. (2) Asks for their age. (3) If they are 18 or older, displays a welcome message with their name. (4) If they are younger than 18, displays a message saying the site is for adults only.',
        starterCode: `// Write your plain-English program description:

// Step 1:

// Step 2:

// Step 3:

// Step 4:`,
        solution: `// Write your plain-English program description:

// Step 1: Store the user's name in a variable called "name"

// Step 2: Store the user's age in a variable called "age"

// Step 3: If age is 18 or greater, display "Welcome, [name]! You have access."

// Step 4: If age is less than 18, display "Sorry, this site is for adults only."`,
      },
    },
    {
      id: 'js-2',
      title: 'Lesson 2: Variables and Data Types',
      content: `Now let's write real JavaScript. We start with variables — named containers for storing information.

DECLARING VARIABLES
JavaScript has three ways to declare variables:
  var   — the old way (avoid it — it has confusing rules)
  let   — use when the value might change
  const — use when the value will not change (constant)

In modern JavaScript, use const by default. Only use let if you know the value will need to change.

const name = "Alex";     // A constant — this will not change
let score = 0;           // A variable — this will change as the game progresses
const isLoggedIn = true; // A constant boolean

NAMING RULES
- Names can contain letters, numbers, underscore, and dollar sign
- Names cannot start with a number
- Names cannot contain spaces (use camelCase instead: firstName, not first name)
- Names are case-sensitive: score and Score are different variables

DATA TYPES
JavaScript stores different kinds of information:

STRING — text, always in quotes (single or double):
  const greeting = "Hello, world!";
  const city = 'London';

NUMBER — any numeric value:
  const age = 30;
  const price = 9.99;

BOOLEAN — true or false (no quotes):
  const isComplete = false;
  const hasAccount = true;

ARRAY — an ordered list of values:
  const colors = ["red", "green", "blue"];
  const scores = [95, 87, 100, 72];
  // Access items by position (starting at 0):
  colors[0]   // "red"
  colors[2]   // "blue"

OBJECT — a collection of named values:
  const user = {
    name: "Alex",
    age: 30,
    isAdmin: false,
  };
  // Access values by name:
  user.name   // "Alex"
  user.age    // 30

NULL AND UNDEFINED
  null       — intentionally empty (you set it to nothing on purpose)
  undefined  — not yet given a value (JavaScript's default)`,
      quiz: [
        {
          question: 'You are writing a quiz app. The user\'s score starts at 0 and increases as they answer correctly. Which keyword should you use?',
          options: ['const — because the score is a constant value', 'let — because the score will change', 'var — because it is the most common', 'string — because scores are text'],
          answer: 1,
        },
        {
          question: 'What data type is the value ["apple", "banana", "cherry"]?',
          options: ['String', 'Object', 'Array', 'Boolean'],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Declare the following variables: (1) A const called appName set to the string "CodeMaster". (2) A let called currentLesson set to the number 1. (3) A const called isLoggedIn set to true. (4) A const called modules set to an array of three strings: "HTML", "CSS", and "JavaScript". (5) A const called user set to an object with two properties: name (your name as a string) and lessonsCompleted (the number 0).',
        starterCode: `// 1. App name (const, string)

// 2. Current lesson (let, number)

// 3. Is logged in (const, boolean)

// 4. Modules list (const, array of 3 strings)

// 5. User object (const, object with name and lessonsCompleted)
`,
        solution: `// 1. App name (const, string)
const appName = "CodeMaster";

// 2. Current lesson (let, number)
let currentLesson = 1;

// 3. Is logged in (const, boolean)
const isLoggedIn = true;

// 4. Modules list (const, array of 3 strings)
const modules = ["HTML", "CSS", "JavaScript"];

// 5. User object (const, object with name and lessonsCompleted)
const user = {
  name: "Alex",
  lessonsCompleted: 0,
};`,
      },
    },
    {
      id: 'js-3',
      title: 'Lesson 3: Functions — Writing Reusable Code',
      content: `A function is a named, reusable block of code. Instead of writing the same instructions over and over, you write them once inside a function and then call that function whenever you need it.

DECLARING A FUNCTION
function greet(name) {
  return "Hello, " + name + "!";
}

Breaking this down:
- function — the keyword that says "I am defining a function"
- greet — the name of the function (you choose this)
- (name) — a parameter: a variable that receives the input when the function is called
- { ... } — the body: the code that runs when the function is called
- return — sends a value back out of the function

CALLING A FUNCTION
Once defined, you call it by writing its name with parentheses:

greet("Alex")        // Returns: "Hello, Alex!"
greet("Sam")         // Returns: "Hello, Sam!"

PARAMETERS AND ARGUMENTS
Parameters are the variable names listed in the function definition: (name)
Arguments are the actual values you pass in when calling: ("Alex")

A function can have multiple parameters:
function add(a, b) {
  return a + b;
}
add(3, 5)    // Returns: 8

DEFAULT PARAMETERS
If a parameter is not provided, you can set a default value:
function greet(name = "friend") {
  return "Hello, " + name + "!";
}
greet()         // Returns: "Hello, friend!"
greet("Alex")   // Returns: "Hello, Alex!"

ARROW FUNCTIONS
A shorter way to write functions, common in modern JavaScript:

const greet = (name) => "Hello, " + name + "!";

This is exactly the same as the function above, just more compact. For single-line functions that immediately return a value, you can leave out the curly braces and the return keyword.

For multi-line arrow functions:
const greet = (name) => {
  const message = "Hello, " + name + "!";
  return message;
};

VOID FUNCTIONS
Not all functions return a value. Some just do something:
function logScore(score) {
  console.log("Your score is: " + score);
}
logScore(95);   // Prints to the console; returns undefined`,
      quiz: [
        {
          question: 'What does the return keyword do inside a function?',
          options: [
            'Stops the program completely',
            'Prints the value to the screen',
            'Sends a value out of the function back to where it was called',
            'Declares a new variable',
          ],
          answer: 2,
        },
        {
          question: 'What is the difference between a parameter and an argument?',
          options: [
            'They are two different words for the same thing',
            'A parameter is the variable name in the function definition; an argument is the actual value passed when calling the function',
            'Parameters are for arrow functions; arguments are for regular functions',
            'Arguments are numbers; parameters are strings',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write three functions: (1) An arrow function called "double" that takes one number and returns that number multiplied by 2. (2) A regular function called "fullName" that takes two parameters (firstName and lastName) and returns them combined with a space between. (3) An arrow function called "isEven" that takes a number and returns true if it is even, false if it is odd. Hint: use the % (modulo) operator — a number is even if number % 2 === 0.',
        starterCode: `// 1. double arrow function

// 2. fullName regular function

// 3. isEven arrow function
`,
        solution: `// 1. double arrow function
const double = (n) => n * 2;

// 2. fullName regular function
function fullName(firstName, lastName) {
  return firstName + " " + lastName;
}

// 3. isEven arrow function
const isEven = (n) => n % 2 === 0;`,
      },
    },
    {
      id: 'js-4',
      title: 'Lesson 4: Making Decisions and Repeating Actions',
      content: `Programs need to respond differently depending on the situation, and often need to repeat the same action many times. This lesson covers conditionals and loops.

CONDITIONALS: if / else if / else
if (condition) {
  // runs if condition is true
} else if (otherCondition) {
  // runs if otherCondition is true
} else {
  // runs if none of the above were true
}

Example:
const score = 85;
if (score >= 90) {
  console.log("Excellent!");
} else if (score >= 70) {
  console.log("Good job!");
} else {
  console.log("Keep practicing!");
}

COMPARISON OPERATORS
=== means exactly equal (value AND type): 5 === 5 is true, 5 === "5" is false
!== means not equal: 5 !== 10 is true
>  means greater than: 10 > 5 is true
<  means less than: 5 < 10 is true
>= means greater than or equal to
<= means less than or equal to

Always use === (triple equals) for comparison in JavaScript. The double equals == does automatic type conversion that causes unexpected bugs.

COMBINING CONDITIONS
&&  means AND: both conditions must be true
||  means OR: at least one condition must be true
!   means NOT: reverses true/false

if (age >= 18 && hasTicket) {
  // allowed in
}

LOOPS: for
A for loop repeats code a set number of times:

for (let i = 0; i < 5; i++) {
  console.log("Count: " + i);
}

This prints: Count: 0, Count: 1, Count: 2, Count: 3, Count: 4

Breaking it down:
- let i = 0      — start: the counter starts at 0
- i < 5          — condition: keep going as long as i is less than 5
- i++            — update: add 1 to i after each loop

LOOPS: forEach (for arrays)
Arrays have a built-in forEach method that runs a function for each item:

const fruits = ["apple", "banana", "cherry"];
fruits.forEach((fruit) => {
  console.log(fruit);
});
// Prints: apple, banana, cherry`,
      quiz: [
        {
          question: 'Why should you use === instead of == for comparisons in JavaScript?',
          options: [
            '=== is faster',
            '=== checks both the value and the data type, avoiding unexpected automatic type conversion bugs',
            '== does not work for numbers',
            'They are identical and interchangeable',
          ],
          answer: 1,
        },
        {
          question: 'In the loop: for (let i = 0; i < 3; i++), how many times does the loop body run?',
          options: ['2 times', '3 times', '4 times', 'It depends on the code inside'],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write a function called "gradeScore" that takes a number (the score) and returns a string grade: "A" for 90+, "B" for 80-89, "C" for 70-79, "D" for 60-69, and "F" for anything below 60. Then write a forEach loop that takes the array [95, 82, 67, 55, 78] and logs each score alongside its grade, like: "95: A".',
        starterCode: `// gradeScore function

// Array of scores
const scores = [95, 82, 67, 55, 78];

// forEach loop to log each score and its grade
`,
        solution: `// gradeScore function
function gradeScore(score) {
  if (score >= 90) return "A";
  else if (score >= 80) return "B";
  else if (score >= 70) return "C";
  else if (score >= 60) return "D";
  else return "F";
}

// Array of scores
const scores = [95, 82, 67, 55, 78];

// forEach loop to log each score and its grade
scores.forEach((score) => {
  console.log(score + ": " + gradeScore(score));
});`,
      },
    },
    {
      id: 'js-5',
      title: 'Lesson 5: JavaScript and the Web Page',
      content: `JavaScript can read and change your HTML page in real time. This is what makes web pages interactive. In this lesson, we cover the DOM, events, and how to make changes accessible to screen readers.

THE DOM
The DOM (Document Object Model) is JavaScript's interface to the HTML page. When the browser loads your HTML, it creates an internal tree of objects — the DOM. JavaScript can read and change that tree, and the browser immediately reflects the changes on screen.

SELECTING ELEMENTS
document.querySelector('h1')           — selects the first <h1> on the page
document.querySelector('.card')        — selects the first element with class "card"
document.querySelector('#status')      — selects the element with id="status"
document.querySelectorAll('li')        — selects ALL <li> elements (returns a list)

CHANGING CONTENT
const heading = document.querySelector('h1');
heading.textContent = "New heading text";    — changes the text (safe, no HTML injection)

CHANGING CSS CLASSES
const card = document.querySelector('.card');
card.classList.add('active');           — adds the class "active"
card.classList.remove('hidden');        — removes the class "hidden"
card.classList.toggle('open');          — adds if absent, removes if present

EVENT LISTENERS
An event listener runs a function when something happens (a click, a key press, a form submission):

const button = document.querySelector('button');
button.addEventListener('click', () => {
  button.textContent = "Clicked!";
});

Common events: 'click', 'keydown', 'submit', 'focus', 'blur', 'change'

ANNOUNCING CHANGES TO SCREEN READERS: ARIA LIVE REGIONS
When JavaScript changes content on the page, a screen reader does not automatically announce the change — it only reads content when it gains focus. To announce dynamic changes, use an ARIA live region.

In HTML:
<div id="status" aria-live="polite" aria-atomic="true"></div>

In JavaScript:
const status = document.querySelector('#status');
status.textContent = "Your answer was correct!";

The screen reader will now announce "Your answer was correct!" as soon as the textContent changes — without the user having to navigate to that element.

MANAGING FOCUS
When a new section of the page loads dynamically (like a new lesson), move focus to it:

const heading = document.querySelector('h1');
heading.setAttribute('tabindex', '-1');  // makes non-interactive elements focusable
heading.focus();

When a dialog closes, return focus to the element that opened it.

This is called focus management and is essential for screen reader users navigating single-page apps.`,
      quiz: [
        {
          question: 'You update the textContent of an element using JavaScript. Will a screen reader user automatically hear the updated text?',
          options: [
            'Yes — screen readers always detect text changes immediately',
            'Only if the user presses Tab to focus the element',
            'Only if the element has an aria-live attribute — otherwise, the change is silent',
            'No — JavaScript changes are never accessible to screen readers',
          ],
          answer: 2,
        },
        {
          question: 'Which method adds an event listener to a button so a function runs when it is clicked?',
          options: [
            'button.onClick = function() {}',
            'button.addEventListener("click", function() {})',
            'button.listen("click")',
            'button.on("click", function() {})',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write JavaScript that: (1) Selects a button with id="check-btn". (2) Selects a div with id="result" that has aria-live="polite" on it. (3) Adds a click event listener to the button. (4) When clicked, sets the result div\'s textContent to "Answer checked! 3 out of 5 correct." (5) Also moves focus to the result div after updating it (add tabindex="-1" first).',
        starterCode: `// 1. Select the button

// 2. Select the result div

// 3 & 4. Add click listener and update result

// 5. Move focus to result div
`,
        solution: `// 1. Select the button
const checkBtn = document.querySelector('#check-btn');

// 2. Select the result div
const result = document.querySelector('#result');

// 3 & 4. Add click listener and update result
checkBtn.addEventListener('click', () => {
  result.textContent = 'Answer checked! 3 out of 5 correct.';

  // 5. Move focus to result div
  result.setAttribute('tabindex', '-1');
  result.focus();
});`,
      },
    },
  ],
};

if (typeof module !== 'undefined') module.exports = jsModule;
if (typeof window !== 'undefined') window.jsModule = jsModule;
