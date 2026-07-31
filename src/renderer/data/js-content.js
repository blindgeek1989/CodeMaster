const jsModule = {
  id: 'javascript',
  title: 'JavaScript Fundamentals',
  description: 'Learn how to make web pages interactive. JavaScript is the programming language of the web — it controls behavior, responds to user input, and communicates with servers.',
  objectives: [
    'Understand variables, data types, and operators',
    'Write functions and understand scope',
    'Use conditionals and loops to control program flow',
    'Manipulate the DOM to update page content dynamically',
    'Respond to keyboard and mouse events accessibly',
    'Manage focus programmatically for accessible dynamic content',
    'Fetch data from an API and display it on the page',
    'Handle errors gracefully and announce them to screen readers',
  ],
  goals: [
    'Build an interactive quiz that works fully with a keyboard',
    'Create a live search filter that announces results to screen readers',
    'Build a modal dialog that traps focus correctly',
    'Write a fetch request and display the response in the DOM',
  ],
  lessons: [
    {
      id: 'js-1',
      title: 'Lesson 1: Variables and Data Types',
      content: `JavaScript stores data in variables. Use const for values that do not change,
and let for values that do.

Data types:
- String: text in quotes — "Hello" or 'World'
- Number: numeric values — 42 or 3.14
- Boolean: true or false
- Array: a list of values — [1, 2, 3]
- Object: key-value pairs — { name: "Alex", age: 30 }
- null: intentionally empty
- undefined: not yet assigned a value

Examples:
const name = "Alex";
let score = 0;
const isLoggedIn = false;
const colors = ["red", "green", "blue"];
const user = { name: "Alex", role: "admin" };

Avoid var — it has confusing scoping rules. Always prefer const, then let.`,
      quiz: [
        {
          question: 'Which keyword should you use for a variable whose value will never change?',
          options: ['var', 'let', 'const', 'static'],
          answer: 2,
        },
        {
          question: 'What data type is the value true?',
          options: ['String', 'Number', 'Boolean', 'Object'],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Declare: (1) a const named appName set to "CodeMaster", (2) a let named currentLesson set to 1, (3) a const named modules set to an array of three strings: "HTML", "CSS", "JavaScript".',
        starterCode: `// Declare appName


// Declare currentLesson


// Declare modules
`,
        solution: `const appName = "CodeMaster";

let currentLesson = 1;

const modules = ["HTML", "CSS", "JavaScript"];`,
      },
    },
    {
      id: 'js-2',
      title: 'Lesson 2: Functions',
      content: `Functions are reusable blocks of code. Define them once, call them many times.

Function declaration:
function greet(name) {
  return "Hello, " + name + "!";
}

Arrow function (modern, concise):
const greet = (name) => "Hello, " + name + "!";

Functions can take parameters (inputs) and return values (outputs).
If a function has no return statement, it returns undefined.

Default parameters:
function greet(name = "friend") {
  return "Hello, " + name + "!";
}
greet(); // "Hello, friend!"
greet("Alex"); // "Hello, Alex!"`,
      quiz: [
        {
          question: 'What does a function return if it has no return statement?',
          options: ['null', '0', 'undefined', 'false'],
          answer: 2,
        },
        {
          question: 'What is an arrow function?',
          options: [
            'A function that only works with arrays',
            'A modern, concise syntax for writing functions',
            'A function that runs automatically on page load',
            'A function that points to another function',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write an arrow function called calculateProgress that takes two parameters: completed and total. It should return the percentage as a number (completed divided by total, multiplied by 100). Round the result to the nearest whole number using Math.round().',
        starterCode: `// Write your calculateProgress arrow function below
`,
        solution: `const calculateProgress = (completed, total) => Math.round((completed / total) * 100);`,
      },
    },
    {
      id: 'js-3',
      title: 'Lesson 3: DOM Manipulation and Accessible Dynamic Content',
      content: `The DOM (Document Object Model) is JavaScript's interface to the HTML page.
You can select elements, change their content, and respond to events.

Selecting elements:
const heading = document.querySelector('h1');
const buttons = document.querySelectorAll('button');

Changing content:
heading.textContent = "New Heading";

Adding/removing classes:
element.classList.add('active');
element.classList.remove('hidden');
element.classList.toggle('expanded');

Accessibility with dynamic content:
When you update the page dynamically, screen readers do not automatically announce the change.
Use ARIA live regions to announce updates:

<div aria-live="polite" aria-atomic="true" id="status"></div>

Then in JavaScript:
document.getElementById('status').textContent = "3 results found";

Managing focus for accessible interactions:
When a dialog opens, move focus into it:
dialog.querySelector('h2').focus();

When it closes, return focus to the element that opened it:
triggerButton.focus();`,
      quiz: [
        {
          question: 'What does document.querySelector("button") return?',
          options: [
            'All button elements on the page as an array',
            'The first button element found on the page',
            'The button with id="button"',
            'An error if no button exists',
          ],
          answer: 1,
        },
        {
          question: 'What is an ARIA live region used for?',
          options: [
            'Making elements visible to sighted users',
            'Announcing dynamic page updates to screen readers automatically',
            'Replacing ARIA roles on landmarks',
            'Improving page load performance',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: `Write JavaScript that:
1. Selects the element with id "result-count"
2. Sets its textContent to "5 results found"
3. Also write the HTML for an aria-live region with id "result-count" that uses polite announcements.`,
        starterCode: `// HTML (write as a comment):
/*

*/

// JavaScript:
`,
        solution: `// HTML (write as a comment):
/*
<div id="result-count" aria-live="polite" aria-atomic="true"></div>
*/

// JavaScript:
const resultCount = document.getElementById('result-count');
resultCount.textContent = '5 results found';`,
      },
    },
  ],
};

if (typeof module !== 'undefined') module.exports = jsModule;
if (typeof window !== 'undefined') window.jsModule = jsModule;
