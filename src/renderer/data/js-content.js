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
    'Handle form submissions with validation and accessible error messages',
    'Fetch data from a server using the Fetch API and async/await',
    'Save and load user preferences and progress with localStorage',
    'Implement accessible patterns: focus management, focus trapping, and aria-live announcements',
  ],
  goals: [
    'Write a function that takes inputs and returns a result',
    'Select an HTML element and change its content with JavaScript',
    'Add a click event listener to a button',
    'Update an ARIA live region to announce a change to screen readers',
    'Validate a form and show an accessible error message',
    'Fetch data from an API and display it in the DOM',
    'Save and retrieve a user preference from localStorage',
    'Implement a focus-trapping modal with Escape-to-close',
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
    {
      id: 'js-6',
      title: 'Lesson 6: Working with Forms',
      content: `Forms are how users send data to a web application — login forms, search boxes, contact forms, settings pages. JavaScript intercepts form submissions, reads the input values, validates them, and provides feedback. Accessible form handling means sighted users AND screen reader users get clear, timely feedback.

PREVENTING DEFAULT FORM SUBMISSION
By default, when a user submits a form the browser reloads the page. To handle submission with JavaScript, prevent that default behavior:

<form id="login-form">
  <label for="username">Username</label>
  <input type="text" id="username" required />
  <button type="submit">Log in</button>
</form>

const form = document.querySelector('#login-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();   // stops the page from reloading
  // handle the submission here
});

READING INPUT VALUES
const username = document.querySelector('#username').value;

.value gives you the current text typed into an input, select, or textarea.

CLIENT-SIDE VALIDATION
Validate inputs before sending data. Check for empty fields, format problems, etc.:

if (username.trim() === '') {
  // show an error
}

.trim() removes leading and trailing whitespace, catching inputs that are all spaces.

SHOWING ACCESSIBLE ERROR MESSAGES
Simply turning an input red is not enough — screen readers need text:

function showError(inputEl, errorEl, message) {
  inputEl.setAttribute('aria-invalid', 'true');
  inputEl.setAttribute('aria-describedby', errorEl.id);
  errorEl.textContent = message;
}

function clearError(inputEl, errorEl) {
  inputEl.removeAttribute('aria-invalid');
  inputEl.removeAttribute('aria-describedby');
  errorEl.textContent = '';
}

FULL VALIDATION EXAMPLE
const form = document.querySelector('#login-form');
const usernameInput = document.querySelector('#username');
const usernameError = document.querySelector('#username-error');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = usernameInput.value.trim();

  if (value === '') {
    showError(usernameInput, usernameError, 'Username is required.');
    usernameInput.focus();   // move focus to the problem field
    return;
  }

  clearError(usernameInput, usernameError);
  console.log('Submitting:', value);
});

KEY PRINCIPLES
1. Always call event.preventDefault() in a submit handler.
2. Validate on submit, not just on blur (some users do not tab away before submitting).
3. Set aria-invalid="true" on the field and put the error message in an element connected via aria-describedby.
4. Move focus to the first error field so keyboard and screen reader users land there.`,
      quiz: [
        {
          question: 'What does event.preventDefault() do in a form submit handler?',
          options: [
            'It validates the form automatically',
            'It stops the browser from reloading the page so you can handle submission with JavaScript',
            'It prevents the user from typing in inputs',
            'It clears all form fields',
          ],
          answer: 1,
        },
        {
          question: 'A form field has a validation error. Which two things must you do for screen reader users?',
          options: [
            'Change the border color to red and add a tooltip',
            'Set aria-invalid="true" on the input and display a text error message connected with aria-describedby',
            'Add a warning icon and change the label color',
            'Use window.alert() to announce the error',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write a submit handler for a form with id="signup-form". It should: (1) Call event.preventDefault(). (2) Read the value of an input with id="email". (3) If the value is empty after trimming, set aria-invalid="true" on the email input and set the textContent of an element with id="email-error" to "Email is required." then focus the email input and return early. (4) If valid, log "Submitting: " + the email value to console.',
        starterCode: `const form = document.querySelector('#signup-form');
const emailInput = document.querySelector('#email');
const emailError = document.querySelector('#email-error');

form.addEventListener('submit', (event) => {
  // 1. Prevent default

  // 2. Read email value

  // 3. Validate

  // 4. Log if valid
});`,
        solution: `const form = document.querySelector('#signup-form');
const emailInput = document.querySelector('#email');
const emailError = document.querySelector('#email-error');

form.addEventListener('submit', (event) => {
  // 1. Prevent default
  event.preventDefault();

  // 2. Read email value
  const value = emailInput.value.trim();

  // 3. Validate
  if (value === '') {
    emailInput.setAttribute('aria-invalid', 'true');
    emailInput.setAttribute('aria-describedby', 'email-error');
    emailError.textContent = 'Email is required.';
    emailInput.focus();
    return;
  }

  // 4. Log if valid
  console.log('Submitting: ' + value);
});`,
      },
    },
    {
      id: 'js-7',
      title: 'Lesson 7: The Fetch API',
      content: `So far, all the data in our JavaScript has been hard-coded — written directly in the code. Real applications get data from a server. The Fetch API is how JavaScript asks a server for data over the network.

WHAT IS AN API?
API stands for Application Programming Interface. A web API is a service that responds to HTTP requests with data, usually in JSON format. Think of it as a menu at a restaurant: you ask for something, and the kitchen (the server) sends it back.

JSON (JavaScript Object Notation) is a text format for data that looks almost like a JavaScript object:

{"name": "Alice", "age": 30, "active": true}

MAKING A FETCH REQUEST
fetch() takes a URL and returns a Promise. A Promise is an object that represents a future value — it does not have the data yet, but it will once the network request completes.

fetch('https://api.example.com/users')
  .then(response => response.json())   // parse the JSON body
  .then(data => console.log(data))     // use the data
  .catch(error => console.error(error)); // handle errors

ASYNC/AWAIT — A CLEANER SYNTAX
async/await is alternative syntax for the same thing. async marks a function as asynchronous (it can wait). await pauses inside that function until a Promise resolves.

async function loadUsers() {
  try {
    const response = await fetch('https://api.example.com/users');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Request failed:', error);
  }
}

loadUsers();

Always use try/catch with async/await. If the request fails, the catch block runs.

DISPLAYING DATA IN THE DOM
async function loadPosts() {
  const list = document.querySelector('#post-list');
  list.textContent = 'Loading...';   // tell users something is happening

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const posts = await response.json();

    list.textContent = '';   // clear "Loading..."
    posts.forEach(post => {
      const item = document.createElement('li');
      item.textContent = post.title;
      list.appendChild(item);
    });
  } catch (error) {
    list.textContent = 'Failed to load posts. Please try again.';
  }
}

ACCESSIBILITY WHEN LOADING DATA
Show a loading state immediately (so users know something is happening).
Show an error message in text (not just an icon) so screen readers can read it.
Use an aria-live region to announce when new content arrives:

<div aria-live="polite" id="status"></div>

document.querySelector('#status').textContent = 'Posts loaded.';`,
      quiz: [
        {
          question: 'What does await do inside an async function?',
          options: [
            'It runs the next line immediately without waiting',
            'It pauses the function until the Promise resolves, then continues with the result',
            'It converts JSON to a JavaScript object',
            'It sends a POST request to the server',
          ],
          answer: 1,
        },
        {
          question: 'Why should you show a loading state when fetching data?',
          options: [
            'Because fetch() only works after displaying "Loading..."',
            'So both sighted users and screen reader users know a request is in progress and the app has not frozen',
            'Because the browser requires it for network requests',
            'To prevent the user from clicking elsewhere on the page',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write an async function called loadData that: (1) Selects an element with id="output". (2) Sets its textContent to "Loading..." while the request is in progress. (3) Awaits a fetch from "https://jsonplaceholder.typicode.com/todos/1". (4) Awaits response.json() to parse the result. (5) Sets output.textContent to the "title" property of the returned object. (6) Catches any errors and sets output.textContent to "Error loading data." Call the function at the end.',
        starterCode: `async function loadData() {
  const output = document.querySelector('#output');

  // 2. Show loading state

  try {
    // 3. Fetch from jsonplaceholder

    // 4. Parse JSON

    // 5. Display the title

  } catch (error) {
    // 6. Show error message
  }
}

// Call the function`,
        solution: `async function loadData() {
  const output = document.querySelector('#output');

  // 2. Show loading state
  output.textContent = 'Loading...';

  try {
    // 3. Fetch from jsonplaceholder
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');

    // 4. Parse JSON
    const data = await response.json();

    // 5. Display the title
    output.textContent = data.title;

  } catch (error) {
    // 6. Show error message
    output.textContent = 'Error loading data.';
  }
}

// Call the function
loadData();`,
      },
    },
    {
      id: 'js-8',
      title: 'Lesson 8: Local Storage',
      content: `The web browser includes a small built-in database called localStorage. It stores text data permanently on the user's computer — it survives page refreshes and browser restarts. This is how websites remember your preferences, saved items, and progress without a server.

WHAT localStorage IS
localStorage is a key-value store: you save data with a name (key) and a value (always a string). You can store up to about 5–10 MB per domain.

The data lives in the user's browser on their device. It is NOT sent to a server. It is NOT shared between users. It persists until the user clears their browser data, or your code deletes it.

THE FOUR MAIN METHODS
localStorage.setItem('key', 'value')    — save a value
localStorage.getItem('key')             — read a value (returns null if key doesn't exist)
localStorage.removeItem('key')          — delete a specific item
localStorage.clear()                    — delete ALL items for your domain

STORING STRINGS
localStorage.setItem('username', 'Alice');
const name = localStorage.getItem('username');  // "Alice"

STORING OBJECTS WITH JSON
localStorage only stores strings. To store an object or array, convert it to JSON first:

const prefs = { theme: 'dark', fontSize: 16, reducedMotion: true };
localStorage.setItem('preferences', JSON.stringify(prefs));

To read it back:
const stored = localStorage.getItem('preferences');
const prefs = stored ? JSON.parse(stored) : null;

Always check if getItem returned null before parsing — if the key doesn't exist yet, JSON.parse(null) will throw an error.

SAVING USER PROGRESS EXAMPLE
function saveProgress(moduleId, lessonIndex) {
  const progress = getProgress() || {};
  progress[moduleId] = lessonIndex;
  localStorage.setItem('progress', JSON.stringify(progress));
}

function getProgress() {
  const stored = localStorage.getItem('progress');
  return stored ? JSON.parse(stored) : null;
}

SAVING PREFERENCES EXAMPLE
function saveTheme(theme) {
  localStorage.setItem('theme', theme);
  document.body.setAttribute('data-theme', theme);
}

function loadTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.body.setAttribute('data-theme', saved);
  }
}

// Call on page load to restore the user's preference
loadTheme();

ACCESSIBILITY NOTE
If your app uses localStorage to store accessibility preferences (like high contrast mode, text size, or reduced motion preference), always apply them early — ideally before the first paint — so the page does not flash into the default state before switching.`,
      quiz: [
        {
          question: 'What does localStorage.getItem("key") return if that key has never been set?',
          options: [
            'undefined',
            'An empty string',
            'null',
            'It throws a ReferenceError',
          ],
          answer: 2,
        },
        {
          question: 'Why must you use JSON.stringify() before storing an object in localStorage?',
          options: [
            'localStorage.setItem() only accepts JSON format',
            'localStorage only stores strings, so the object must be converted to a JSON string first',
            'Objects are automatically stored by reference',
            'JSON.stringify() is required for security',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write two functions: (1) saveColor(color) — saves the string color under the key "favoriteColor" in localStorage. (2) loadColor() — reads "favoriteColor" from localStorage and returns it. If nothing is stored yet, return the string "blue" as a default. Then call loadColor() and log the result.',
        starterCode: `function saveColor(color) {
  // Save to localStorage

}

function loadColor() {
  // Read from localStorage
  // Return stored value, or "blue" if nothing saved yet

}

// Test it
saveColor('indigo');
console.log(loadColor()); // should log "indigo"`,
        solution: `function saveColor(color) {
  // Save to localStorage
  localStorage.setItem('favoriteColor', color);
}

function loadColor() {
  // Read from localStorage
  const stored = localStorage.getItem('favoriteColor');
  // Return stored value, or "blue" if nothing saved yet
  return stored !== null ? stored : 'blue';
}

// Test it
saveColor('indigo');
console.log(loadColor()); // should log "indigo"`,
      },
    },
    {
      id: 'js-9',
      title: 'Lesson 9: Accessible JavaScript Patterns',
      content: `JavaScript has the power to create rich, interactive components — modals, menus, tabs, live feeds. But if built carelessly, they become completely unusable for keyboard and screen reader users. This lesson covers the patterns every accessible JS developer must know.

FOCUS MANAGEMENT
When JavaScript shows or hides content, focus must be managed manually. Sighted users can see where they are, but keyboard and screen reader users follow the focus ring.

Rule: When you open something (modal, dialog, panel), move focus INTO it.
Rule: When you close something, return focus to the element that triggered it.

// Store the element that triggered the open
let triggerElement;

function openModal() {
  triggerElement = document.activeElement;   // save current focus
  modal.removeAttribute('hidden');
  modal.querySelector('[data-focus-first]').focus();   // focus into modal
}

function closeModal() {
  modal.setAttribute('hidden', '');
  triggerElement.focus();   // return focus to trigger
}

FOCUS TRAPPING IN MODALS
When a modal is open, Tab should cycle ONLY through elements inside the modal. Tab on the last focusable element should wrap to the first. Shift+Tab on the first should wrap to the last.

function trapFocus(modal) {
  const focusable = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift+Tab
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      // Tab
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

ESCAPE KEY TO CLOSE
Modal dialogs should close when the user presses Escape:

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
    closeModal();
  }
});

ANNOUNCING DYNAMIC CONTENT
When JavaScript adds content to the page (a notification, a search result, a status message), use an aria-live region so screen readers announce it:

<div id="announcer" aria-live="polite" aria-atomic="true" class="sr-only"></div>

function announce(message) {
  const el = document.querySelector('#announcer');
  el.textContent = '';                        // clear first to re-trigger if same text
  setTimeout(() => el.textContent = message, 50);  // small delay ensures announcement fires
}

announce('3 results found for "button"');

COMPLETE ACCESSIBLE MODAL PATTERN
const modal = document.querySelector('#my-modal');
const openBtn = document.querySelector('#open-modal');
const closeBtn = modal.querySelector('#close-modal');
let trigger;

openBtn.addEventListener('click', () => {
  trigger = document.activeElement;
  modal.removeAttribute('hidden');
  modal.setAttribute('aria-modal', 'true');
  closeBtn.focus();
  trapFocus(modal);
});

closeBtn.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
});

function closeModal() {
  modal.setAttribute('hidden', '');
  trigger.focus();
}

THE THREE RULES OF ACCESSIBLE JAVASCRIPT
1. Focus goes where the user needs to go — move it on open, restore it on close.
2. Keyboard must do everything the mouse can do — Tab, Enter, Space, Escape, arrow keys.
3. Screen readers must hear about dynamic changes — use aria-live regions.`,
      quiz: [
        {
          question: 'When you open a modal dialog, where should keyboard focus go?',
          options: [
            'It should stay on the button that opened the modal',
            'It should go to the first focusable element inside the modal',
            'It should go to the top of the page',
            'Focus does not need to be managed — screen readers find the modal automatically',
          ],
          answer: 1,
        },
        {
          question: 'When the modal is closed, where should focus go?',
          options: [
            'The first focusable element on the page',
            'The browser address bar',
            'Back to the element that triggered the modal to open',
            'The bottom of the page',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Write a closeModal function that: (1) Takes a modal element and a trigger element as parameters. (2) Sets the "hidden" attribute on the modal. (3) Moves focus back to the trigger element. Then write a keydown event listener on the document that calls closeModal when Escape is pressed and the modal does not have the "hidden" attribute. Assume modal and trigger are already declared as variables above your code.',
        starterCode: `// modal and trigger are already declared

function closeModal(modal, trigger) {
  // 1. Hide the modal

  // 2. Return focus to trigger

}

// Escape key listener
document.addEventListener('keydown', (e) => {
  // Close modal on Escape if it is open

});`,
        solution: `// modal and trigger are already declared

function closeModal(modal, trigger) {
  // 1. Hide the modal
  modal.setAttribute('hidden', '');

  // 2. Return focus to trigger
  trigger.focus();
}

// Escape key listener
document.addEventListener('keydown', (e) => {
  // Close modal on Escape if it is open
  if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
    closeModal(modal, trigger);
  }
});`,
      },
    },
  ],
};

if (typeof module !== 'undefined') module.exports = jsModule;
if (typeof window !== 'undefined') window.jsModule = jsModule;
