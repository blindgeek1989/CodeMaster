'use strict';

const reactModule = {
  id: 'react',
  title: 'React',
  description: 'React is a JavaScript library for building user interfaces out of reusable components. This module takes you from zero React knowledge to building accessible, interactive UIs — covering JSX, components, props, state, effects, and the patterns you need for real-world apps.',
  objectives: [
    'Understand what React is and why it exists',
    'Write JSX and understand how it compiles to JavaScript',
    'Build function components that accept and render props',
    'Manage dynamic data with the useState hook',
    'Handle user events and controlled form inputs',
    'Render lists correctly using keys',
    'Run side effects and fetch data with useEffect',
    'Apply accessibility best practices inside React components',
  ],
  goals: [
    'Create a function component that renders JSX',
    'Pass data into a component via props and render it',
    'Use useState to toggle or update UI in response to a button click',
    'Control a text input with React state',
    'Render a list of items from an array with correct keys',
    'Fetch data from an API inside useEffect and display it',
    'Use an aria-live region inside a React component to announce updates',
  ],
  lessons: [
    // ─────────────────────────────────────────────────────────────────
    // LESSON 1 — WHAT IS REACT?
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'react-1',
      title: 'Lesson 1: What Is React and Why Use It?',
      content: `React is a JavaScript library created by Meta (Facebook) in 2013 for building user interfaces. It is now one of the most widely used frontend tools in the world.

WHAT PROBLEM DOES REACT SOLVE?
In plain JavaScript, keeping the DOM in sync with your data is manual work. Every time data changes, you must find the right element, update its content, maybe add or remove classes, maybe show or hide sections. As apps grow, this becomes error-prone and hard to maintain.

React solves this by letting you DESCRIBE what the UI should look like for a given state of data, and then updating the DOM automatically whenever that data changes.

Instead of:
  "Find the element, change its text, show the error div, hide the loading div..."

You write:
  "If loading is true, show a spinner. If there is an error, show the error. Otherwise, show the data."

React handles the DOM updates for you.

THE COMPONENT MODEL
React's core idea is the COMPONENT — a reusable piece of UI with its own logic and appearance. A React app is a tree of components, from a top-level App component down to small ones like Button or SearchInput.

Components let you:
  - Reuse UI across your app without copy-pasting HTML
  - Keep related HTML, logic, and styling together
  - Think in isolated pieces that are easier to test and reason about

HOW REACT WORKS: THE VIRTUAL DOM
React keeps a lightweight copy of the DOM in memory called the VIRTUAL DOM. When data changes:
  1. React re-renders the affected components in the virtual DOM
  2. It compares (diffs) the new virtual DOM against the previous one
  3. It applies only the minimal real DOM changes needed

This makes React fast and predictable.

REACT VS A FRAMEWORK
React is a LIBRARY, not a full framework. It handles the view layer — rendering UI — and nothing else. For routing, data fetching, and state management you add other libraries (React Router, Redux, React Query) or use a framework built on React like Next.js.

SETTING UP REACT (QUICK REFERENCE)
The fastest way to start is with Create React App or Vite:

  npx create-react-app my-app
  cd my-app
  npm start

Or with Vite (faster, recommended for new projects):
  npm create vite@latest my-app -- --template react
  cd my-app
  npm install
  npm run dev

Both give you a dev server with live reload, JSX compilation, and a build pipeline.

WHAT YOU NEED TO KNOW FIRST
React requires solid JavaScript fundamentals:
  - Arrow functions
  - Array methods: map, filter, find
  - Object destructuring
  - The spread operator (...)
  - Modules: import / export
  - Promises and async/await (for data fetching)

If any of these feel shaky, revisit the JavaScript and Async JavaScript modules before continuing here.`,
      quiz: [
        {
          question: 'What core problem does React solve?',
          options: [
            'Replacing JavaScript with a simpler language',
            'Keeping the DOM in sync with data automatically so you describe the desired UI rather than manually updating elements',
            'Making CSS easier to write',
            'Providing a database for storing user data',
          ],
          answer: 1,
        },
        {
          question: 'What is a React component?',
          options: [
            'A CSS file that styles part of a page',
            'A reusable, self-contained piece of UI with its own logic and appearance',
            'A server-side route handler',
            'A type of database table',
          ],
          answer: 1,
        },
        {
          question: 'React is best described as:',
          options: [
            'A full-stack framework that handles routing, database, and UI',
            'A library for the view layer — it renders UI but leaves routing and data fetching to other tools',
            'A replacement for HTML and CSS',
            'A backend framework like Express',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'No code to run yet — this lesson is conceptual. In the text area below, write a one-sentence answer: what is the main advantage of React\'s virtual DOM approach compared to manually updating the DOM in plain JavaScript?',
        starterCode: '// Your answer (as a comment):\n// The virtual DOM helps because...',
        solution: '// The virtual DOM helps because React automatically calculates the minimal\n// set of real DOM changes needed when data updates, so you never manually\n// hunt for elements to update — you just re-describe the desired UI.',
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 2 — JSX
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'react-2',
      title: 'Lesson 2: JSX — JavaScript Meets HTML',
      content: `JSX (JavaScript XML) is a syntax extension that lets you write HTML-like markup inside JavaScript. It is the most visible thing that makes React code look different from plain JavaScript.

WHAT JSX LOOKS LIKE
  function Greeting() {
    return <h1>Hello, world!</h1>;
  }

That <h1> inside a JavaScript function looks like HTML but it is NOT HTML. It is JSX — a special syntax that Babel (a compiler) transforms into plain JavaScript calls before the browser ever sees it.

WHAT JSX COMPILES TO
Babel turns:
  <h1>Hello, world!</h1>

Into:
  React.createElement('h1', null, 'Hello, world!')

React.createElement returns a JavaScript object (a virtual DOM node). You never need to call createElement directly — JSX is a cleaner way to write it.

JSX RULES
JSX looks like HTML but has important differences:

1. Return a single root element
   Every component must return one top-level element. Wrap multiple elements in a <div> or a React Fragment (<>...</>):

   // Wrong — two siblings at the top level
   return (
     <h1>Title</h1>
     <p>Paragraph</p>
   );

   // Correct — wrapped in a fragment
   return (
     <>
       <h1>Title</h1>
       <p>Paragraph</p>
     </>
   );

2. Close every tag
   Self-closing tags must include the slash: <img />, <input />, <br />

3. Use className instead of class
   'class' is a reserved word in JavaScript, so JSX uses className:
   <div className="container">...</div>

4. Use htmlFor instead of for (on labels)
   <label htmlFor="email">Email</label>
   <input id="email" type="email" />

5. JavaScript expressions go in curly braces
   const name = 'Alex';
   return <h1>Hello, {name}!</h1>;

   Anything inside {} is evaluated as JavaScript:
   <p>Result: {2 + 2}</p>          // renders: Result: 4
   <p>{isLoggedIn ? 'Welcome' : 'Please log in'}</p>

6. Styles are objects with camelCase properties
   <div style={{ backgroundColor: 'blue', fontSize: '1rem' }}>...</div>
   Note the double curly braces: outer {} for JSX expression, inner {} for the style object.

EMBEDDING EXPRESSIONS
You can embed any JavaScript expression inside {}:
  - Variables: {userName}
  - Function calls: {formatDate(date)}
  - Ternaries: {count > 0 ? count : 'none'}
  - Logical AND (conditional rendering): {isLoading && <Spinner />}

WHAT YOU CANNOT EMBED
Objects cannot be rendered directly — React does not know how to display them:
  // ERROR: Objects are not valid as React children
  const obj = { name: 'Alex' };
  return <p>{obj}</p>;

  // Correct: access a specific property
  return <p>{obj.name}</p>;

A COMPLETE JSX EXAMPLE
  function UserCard({ name, role, isAdmin }) {
    return (
      <article className="user-card">
        <h2>{name}</h2>
        <p>Role: {role}</p>
        {isAdmin && <span className="badge">Admin</span>}
      </article>
    );
  }`,
      quiz: [
        {
          question: 'What does Babel do with JSX?',
          options: [
            'Sends it to the server to be rendered as HTML',
            'Leaves it unchanged — browsers understand JSX natively',
            'Transforms it into React.createElement() calls that browsers can run',
            'Converts it into CSS classes',
          ],
          answer: 2,
        },
        {
          question: 'Why does JSX use className instead of class?',
          options: [
            'It is just a React convention with no technical reason',
            'class is a reserved word in JavaScript, so JSX uses className to avoid the conflict',
            'className applies styles differently than the HTML class attribute',
            'React does not support CSS classes',
          ],
          answer: 1,
        },
        {
          question: 'Which of the following correctly embeds a JavaScript variable in JSX?',
          options: [
            '<p>Hello, {{name}}</p>',
            '<p>Hello, $(name)</p>',
            '<p>Hello, {name}</p>',
            '<p>Hello, %name%</p>',
          ],
          answer: 2,
        },
        {
          question: 'A component returns two <p> elements side by side with no wrapper. What happens?',
          options: [
            'React renders them both fine — multiple roots are allowed',
            'Only the first element renders',
            'This causes a compile error — JSX requires a single root element',
            'React wraps them in a <div> automatically',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Fix the JSX below. It has three errors: a missing root wrapper, a wrong attribute name, and an unclosed tag.',
        starterCode: `// Fix the three JSX errors in this component:
function ProfileCard() {
  const name = "Jordan";
  return (
    <h2 class="profile-name">{name}</h2>
    <img src="avatar.png">
  );
}`,
        solution: `function ProfileCard() {
  const name = "Jordan";
  return (
    <>
      <h2 className="profile-name">{name}</h2>
      <img src="avatar.png" alt="Jordan's avatar" />
    </>
  );
}`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 3 — COMPONENTS AND PROPS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'react-3',
      title: 'Lesson 3: Function Components and Props',
      content: `Components are the building blocks of a React app. A function component is a JavaScript function that returns JSX — it describes what a piece of UI should look like.

DEFINING A FUNCTION COMPONENT
  function Button() {
    return <button type="button">Click me</button>;
  }

Rules:
  - Component names MUST start with a capital letter. React uses this to tell your components apart from plain HTML elements. <button> is HTML; <Button> is your component.
  - A component must return JSX (or null to render nothing).

USING A COMPONENT
Use your component like an HTML tag:
  function App() {
    return (
      <main>
        <h1>My App</h1>
        <Button />
      </main>
    );
  }

PROPS: PASSING DATA INTO COMPONENTS
Props (short for properties) let you pass data from a parent component into a child component — the same way HTML attributes pass data to HTML elements.

Define props as the first parameter of your function:
  function Greeting({ name }) {
    return <p>Hello, {name}!</p>;
  }

Pass props when you use the component:
  <Greeting name="Alex" />
  <Greeting name="Jordan" />

Each renders a different greeting. One component definition, multiple uses with different data — that is the power of props.

PROPS ARE READ-ONLY
A component must NEVER modify its own props. Props flow one way: from parent to child. If you need to change something, that is state (covered next lesson).

MULTIPLE PROPS
  function ProductCard({ title, price, inStock }) {
    return (
      <article>
        <h2>{title}</h2>
        <p>Price: \${price}</p>
        <p>{inStock ? 'In stock' : 'Out of stock'}</p>
      </article>
    );
  }

  // Used as:
  <ProductCard title="Keyboard" price={89} inStock={true} />

Note: string props use quotes, but numbers and booleans use curly braces.

DESTRUCTURING VS THE PROPS OBJECT
Both of these are equivalent:

  // Destructuring (recommended — cleaner)
  function Greeting({ name, role }) { ... }

  // Props object
  function Greeting(props) {
    const { name, role } = props;
    ...
  }

DEFAULT PROPS
Give a prop a default value with JavaScript default parameter syntax:
  function Greeting({ name = 'Guest' }) {
    return <p>Hello, {name}!</p>;
  }

  <Greeting />         // Hello, Guest!
  <Greeting name="Alex" />  // Hello, Alex!

THE CHILDREN PROP
React passes anything between a component's opening and closing tags as the special children prop:

  function Card({ children }) {
    return <div className="card">{children}</div>;
  }

  // Used as:
  <Card>
    <h2>Title</h2>
    <p>Some content inside the card.</p>
  </Card>

This pattern makes components like wrappers or layout containers much more flexible.

COMPOSING COMPONENTS
Real apps are trees of components. A top-level App renders layout components; those render content components; those render primitives like Button or Input. Keep components small and focused on one responsibility.`,
      quiz: [
        {
          question: 'Why must React component names start with a capital letter?',
          options: [
            'It is a style convention with no technical effect',
            'React uses capitalization to distinguish your components from built-in HTML elements',
            'Lowercase names cause a runtime error in JavaScript',
            'Capital letters enable TypeScript type checking',
          ],
          answer: 1,
        },
        {
          question: 'What are props?',
          options: [
            'Internal data that a component manages and can change on its own',
            'Data passed from a parent component into a child component',
            'CSS properties written in JavaScript',
            'Event listeners attached to DOM elements',
          ],
          answer: 1,
        },
        {
          question: 'A component receives a "count" prop. Inside the component, can it change that prop?',
          options: [
            'Yes — components are free to modify their props as needed',
            'No — props are read-only; a component must never modify its own props',
            'Yes, but only if the prop is a number',
            'Only if the parent gave explicit permission',
          ],
          answer: 1,
        },
        {
          question: 'What is the children prop?',
          options: [
            'An array of all components rendered below this one in the tree',
            'Anything placed between a component\'s opening and closing tags',
            'A list of CSS class names to apply',
            'The component\'s own sub-components defined in the same file',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write a BookCard component that accepts title, author, and year as props and renders them in an <article> element with appropriate headings.',
        starterCode: `// Write a BookCard component:
// - Accepts: title (string), author (string), year (number)
// - Returns an <article> with an <h2> for title,
//   a <p> for author, and a <p> for year
// - Use "Book title:" and "Author:" as labels

function BookCard({ title, author, year }) {
  // your code here
}

// How it would be used:
// <BookCard title="Dune" author="Frank Herbert" year={1965} />`,
        solution: `function BookCard({ title, author, year }) {
  return (
    <article>
      <h2>Book title: {title}</h2>
      <p>Author: {author}</p>
      <p>Published: {year}</p>
    </article>
  );
}`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 4 — STATE WITH useState
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'react-4',
      title: 'Lesson 4: State with useState',
      content: `Props let components receive data from outside. State lets components track and manage their own data over time. When state changes, React re-renders the component with the new values.

THE useState HOOK
useState is a function (a "hook") provided by React. You call it at the top of your component to declare a piece of state:

  import { useState } from 'react';

  function Counter() {
    const [count, setCount] = useState(0);

    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Add one</button>
      </div>
    );
  }

Breaking this down:
  - useState(0) declares a state variable with initial value 0
  - It returns an array with two items: [currentValue, setterFunction]
  - We name them count and setCount by convention
  - Calling setCount(newValue) updates the state AND triggers a re-render

NEVER MODIFY STATE DIRECTLY
  // WRONG — React does not know the value changed
  count = count + 1;

  // CORRECT — React knows, re-renders the component
  setCount(count + 1);

If you mutate state directly, the component will not re-render and the UI will not update.

THE FUNCTIONAL UPDATE FORM
If the new state depends on the old state, use the functional form to avoid stale values:

  // Safe form — React guarantees prev is the latest value
  setCount(prev => prev + 1);

Always use this form inside event handlers that fire repeatedly or inside effects.

MULTIPLE STATE VARIABLES
You can call useState as many times as you need:

  const [name, setName]       = useState('');
  const [isOpen, setIsOpen]   = useState(false);
  const [items, setItems]     = useState([]);

Keep state variables small and focused. Each one should represent one piece of UI state.

STATE WITH OBJECTS
When state is an object, you must replace the whole object — not mutate it:

  const [user, setUser] = useState({ name: 'Alex', age: 30 });

  // WRONG — mutates the existing object
  user.age = 31;

  // CORRECT — spread the old object, override the changed property
  setUser({ ...user, age: 31 });

STATE WITH ARRAYS
Same rule: replace, do not mutate.

  const [items, setItems] = useState(['apple', 'banana']);

  // Add an item:
  setItems([...items, 'cherry']);

  // Remove an item:
  setItems(items.filter(item => item !== 'banana'));

  // Update an item:
  setItems(items.map(item => item === 'apple' ? 'APPLE' : item));

WHAT TRIGGERS A RE-RENDER?
React re-renders a component when:
  1. Its state changes (via a setter function)
  2. Its parent re-renders (causing new props)
  3. A context it subscribes to changes

Re-rendering is cheap — React diffs the virtual DOM and updates only what changed.

RULES OF HOOKS
All hooks (useState, useEffect, etc.) follow two rules:
  1. Only call hooks at the TOP LEVEL of a function component — never inside loops, conditions, or nested functions
  2. Only call hooks inside React function components (not regular JS functions)

These rules ensure React can track which hook call corresponds to which state.`,
      quiz: [
        {
          question: 'What does calling useState(0) return?',
          options: [
            'Just the current value, 0',
            'An array containing the current value and a function to update it',
            'A reference to the DOM element',
            'An object with a value property',
          ],
          answer: 1,
        },
        {
          question: 'Why must you call the setter function (like setCount) instead of directly assigning to the variable?',
          options: [
            'JavaScript variables are immutable and cannot be reassigned',
            'React only knows about a state change when you call the setter — direct assignment does not trigger a re-render',
            'Direct assignment would cause a TypeError',
            'The setter converts values to strings before storing them',
          ],
          answer: 1,
        },
        {
          question: 'You have state: const [user, setUser] = useState({ name: "Alex", age: 30 }). How do you correctly update just the age?',
          options: [
            'user.age = 31',
            'setUser(user.age = 31)',
            'setUser({ ...user, age: 31 })',
            'useState({ ...user, age: 31 })',
          ],
          answer: 2,
        },
        {
          question: 'Where must you call useState?',
          options: [
            'Inside an if statement so it only runs when needed',
            'Inside a for loop to create multiple state variables at once',
            'At the top level of a function component, never inside conditions or loops',
            'In a separate state.js file outside the component',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Build a ToggleMessage component that shows and hides a message when a button is clicked. The button should say "Show message" when the message is hidden and "Hide message" when it is visible.',
        starterCode: `import { useState } from 'react';

function ToggleMessage() {
  // Declare a boolean state variable called "visible"
  // initial value: false

  return (
    <div>
      <button onClick={/* toggle visible */}>
        {/* Show "Show message" or "Hide message" based on state */}
      </button>
      {/* Conditionally render this paragraph when visible is true: */}
      {/* <p>React state makes UIs interactive!</p> */}
    </div>
  );
}`,
        solution: `import { useState } from 'react';

function ToggleMessage() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(prev => !prev)}>
        {visible ? 'Hide message' : 'Show message'}
      </button>
      {visible && <p>React state makes UIs interactive!</p>}
    </div>
  );
}`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 5 — EVENTS AND FORMS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'react-5',
      title: 'Lesson 5: Handling Events and Forms',
      content: `React handles user events with camelCase event props on JSX elements. You pass a function (the event handler) as the value.

EVENT HANDLERS
  function AlertButton() {
    function handleClick() {
      alert('Button was clicked!');
    }
    return <button onClick={handleClick}>Click me</button>;
  }

Common event props:
  onClick       — mouse click or keyboard activation (Enter/Space on focusable elements)
  onChange      — input value changes
  onSubmit      — form submitted
  onKeyDown     — key pressed
  onFocus       — element receives focus
  onBlur        — element loses focus

PASSING THE EVENT OBJECT
React event handlers receive a synthetic event object (React's cross-browser wrapper around the native event):

  function LogKey({ label }) {
    function handleKeyDown(event) {
      console.log('Key pressed:', event.key);
    }
    return <input aria-label={label} onKeyDown={handleKeyDown} />;
  }

INLINE ARROW FUNCTIONS
For simple handlers, an inline arrow function is fine:

  <button onClick={() => setCount(count + 1)}>Add</button>

Avoid calling the function directly — this would fire on render, not on click:
  // WRONG — runs immediately when rendering
  <button onClick={setCount(count + 1)}>Add</button>

  // CORRECT — passes the function reference
  <button onClick={() => setCount(count + 1)}>Add</button>

CONTROLLED INPUTS (FORMS)
In React, the recommended pattern for form inputs is CONTROLLED COMPONENTS — the input's value is driven by React state, and onChange keeps state in sync with what the user types.

  import { useState } from 'react';

  function SearchForm() {
    const [query, setQuery] = useState('');

    function handleSubmit(event) {
      event.preventDefault();   // prevent page reload
      console.log('Searching for:', query);
    }

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Go</button>
      </form>
    );
  }

Why controlled inputs?
  - The input value is always in sync with React state
  - You can validate or transform the value on every keystroke
  - You can reset the input programmatically (setQuery(''))
  - You can read the value anywhere without touching the DOM

PREVENTING DEFAULT BEHAVIOR
Many HTML elements have default browser behavior that React apps need to suppress:
  - Forms reload the page on submit → event.preventDefault()
  - Links navigate away → event.preventDefault()

Always call event.preventDefault() in your onSubmit handler.

MULTIPLE INPUTS WITH ONE HANDLER
For forms with many fields, use a single state object and a shared handler:

  const [form, setForm] = useState({ name: '', email: '' });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  <input name="name"  value={form.name}  onChange={handleChange} />
  <input name="email" value={form.email} onChange={handleChange} />

This pattern uses the input's name attribute as the key to update in the state object.

ACCESSIBLE FORM REQUIREMENTS
Every input must have a label:
  <label htmlFor="email">Email address</label>
  <input id="email" type="email" ... />

Required fields should use the required attribute AND communicate the requirement in the label:
  <label htmlFor="name">Full name (required)</label>
  <input id="name" required ... />

Error messages must be linked to their input with aria-describedby:
  <input id="email" aria-describedby="email-error" ... />
  {error && <p id="email-error" role="alert">{error}</p>}`,
      quiz: [
        {
          question: 'Why is onClick={() => doSomething()} correct but onClick={doSomething()} wrong?',
          options: [
            'Arrow functions run faster than regular function calls',
            'The second form calls the function immediately during rendering instead of waiting for a click',
            'React does not accept function calls as event handlers',
            'There is no difference — both work the same way',
          ],
          answer: 1,
        },
        {
          question: 'What is a controlled input?',
          options: [
            'An input that the user cannot change',
            'An input whose value is driven by React state and kept in sync via onChange',
            'An input that validates itself automatically',
            'An input rendered inside a <form> element',
          ],
          answer: 1,
        },
        {
          question: 'Why do you call event.preventDefault() in a form\'s onSubmit handler?',
          options: [
            'To stop React from re-rendering the component',
            'To clear all the form fields after submission',
            'To prevent the browser\'s default behavior of reloading the page',
            'To stop onChange from firing during submission',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Complete the LoginForm component. It should have email and password inputs, both controlled. On submit, prevent the default behavior and call console.log with the form data.',
        starterCode: `import { useState } from 'react';

function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });

  function handleChange(event) {
    // Update form state using the input's name attribute as the key
  }

  function handleSubmit(event) {
    // Prevent page reload
    // Log form data
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Log in</button>
    </form>
  );
}`,
        solution: `import { useState } from 'react';

function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Logging in with:', form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Log in</button>
    </form>
  );
}`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 6 — LISTS AND KEYS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'react-6',
      title: 'Lesson 6: Rendering Lists and Using Keys',
      content: `Most real-world UIs display collections of items: a list of contacts, a table of orders, a grid of products. React renders lists using JavaScript's array .map() method.

RENDERING A LIST WITH .map()
  const fruits = ['Apple', 'Banana', 'Cherry'];

  function FruitList() {
    return (
      <ul>
        {fruits.map(fruit => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
    );
  }

The .map() call returns an array of JSX elements. React renders each one in order.

THE key PROP
Every list item must have a unique key prop. React uses keys to identify which items changed, were added, or were removed between renders.

  fruits.map(fruit => <li key={fruit}>{fruit}</li>)

Rules for keys:
  - Must be UNIQUE among siblings (not globally unique)
  - Must be STABLE — the same item should have the same key across renders
  - Must be a STRING or NUMBER

GOOD KEYS VS BAD KEYS
  // Best: use a stable, unique ID from your data
  items.map(item => <li key={item.id}>{item.name}</li>)

  // Acceptable if items are static and never reordered
  items.map(item => <li key={item.name}>{item.name}</li>)

  // BAD: using array index as key
  items.map((item, index) => <li key={index}>{item.name}</li>)

Why is index bad? If the array order changes (sort, filter, delete), items get the wrong keys and React updates the wrong DOM nodes. This causes subtle bugs: inputs keep their old values, animations fire on the wrong items.

ONLY use index as a key when the list is static and will never be reordered, filtered, or have items removed.

FILTERING BEFORE RENDERING
  function InStockList({ products }) {
    const available = products.filter(p => p.inStock);
    return (
      <ul>
        {available.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    );
  }

COMPONENTS IN LISTS
List items are often their own components:

  function TaskList({ tasks }) {
    return (
      <ul>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    );
  }

  function TaskItem({ task }) {
    return (
      <li>
        <span>{task.title}</span>
        <span>{task.done ? '✓' : '○'}</span>
      </li>
    );
  }

Note: the key goes on the outermost element returned by map — here, the <TaskItem> itself — not inside the component.

EMPTY STATES
Always handle the empty case:
  function TaskList({ tasks }) {
    if (tasks.length === 0) {
      return <p>No tasks yet. Add one above.</p>;
    }
    return (
      <ul>
        {tasks.map(task => <TaskItem key={task.id} task={task} />)}
      </ul>
    );
  }

CONDITIONAL RENDERING PATTERNS
  // Ternary — good for if/else
  {isLoading ? <Spinner /> : <DataTable />}

  // Logical AND — good for show/hide
  {error && <ErrorMessage text={error} />}

  // Early return — good for whole-component guards
  if (!user) return <p>Please log in.</p>;`,
      quiz: [
        {
          question: 'What method do you use to render a list of items in React?',
          options: [
            'forEach — to iterate over the array',
            'map — to transform each item into a JSX element',
            'filter — to select which items to show',
            'reduce — to combine items into a single element',
          ],
          answer: 1,
        },
        {
          question: 'What is the purpose of the key prop on list items?',
          options: [
            'It sets the CSS class for each item',
            'It lets React identify which items changed, were added, or removed between renders',
            'It provides keyboard navigation between items',
            'It is required for accessibility — screen readers use it as a label',
          ],
          answer: 1,
        },
        {
          question: 'Why is using the array index as a key problematic?',
          options: [
            'Indexes are not allowed as key values — React requires strings',
            'Indexes change when items are reordered, deleted, or filtered, causing React to update the wrong DOM nodes',
            'Using an index makes the list render twice',
            'It is only problematic in lists with more than 100 items',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write a MovieList component that accepts an array of movie objects (each with id, title, year) and renders them as an accessible <ul> list. Handle the empty state with a message.',
        starterCode: `// Each movie object: { id: number, title: string, year: number }

function MovieList({ movies }) {
  // Handle empty state

  // Render a <ul> with each movie as an <li>
  // Show title and year for each movie
  // Use movie.id as the key
}

// Example usage:
// const data = [
//   { id: 1, title: 'Inception', year: 2010 },
//   { id: 2, title: 'The Matrix', year: 1999 },
// ];
// <MovieList movies={data} />`,
        solution: `function MovieList({ movies }) {
  if (movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>
          {movie.title} ({movie.year})
        </li>
      ))}
    </ul>
  );
}`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 7 — useEffect
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'react-7',
      title: 'Lesson 7: Side Effects with useEffect',
      content: `Rendering JSX is a pure operation — given the same props and state, a component always returns the same output. But real apps need to do things beyond rendering: fetch data, set document titles, start timers, subscribe to events. These are called SIDE EFFECTS, and useEffect is how React handles them.

BASIC USAGE
  import { useState, useEffect } from 'react';

  function PageTitle({ title }) {
    useEffect(() => {
      document.title = title;
    }, [title]);

    return <h1>{title}</h1>;
  }

useEffect takes two arguments:
  1. A function containing the side effect code
  2. A dependency array — a list of values the effect depends on

THE DEPENDENCY ARRAY
The dependency array controls WHEN the effect runs:

  useEffect(() => { ... });
  // No array — runs after EVERY render. Usually wrong. Avoid this.

  useEffect(() => { ... }, []);
  // Empty array — runs ONCE after the first render (on mount). Good for:
  //   - initial data fetching
  //   - setting up subscriptions
  //   - one-time event listeners

  useEffect(() => { ... }, [userId, filter]);
  // Runs after mount AND whenever userId or filter changes.

Rule: include every variable from the component that the effect uses. If you read count inside the effect, put count in the array.

FETCHING DATA
  import { useState, useEffect } from 'react';

  function UserProfile({ userId }) {
    const [user, setUser]       = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    useEffect(() => {
      setLoading(true);
      setError(null);

      fetch('/api/users/' + userId)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load user');
          return res.json();
        })
        .then(data => {
          setUser(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }, [userId]);   // re-fetch whenever userId changes

    if (loading) return <p>Loading...</p>;
    if (error)   return <p>Error: {error}</p>;
    if (!user)   return null;

    return <h1>{user.name}</h1>;
  }

THE CLEANUP FUNCTION
Effects can return a cleanup function that runs before the next effect or when the component unmounts:

  useEffect(() => {
    const timer = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(timer);   // cleanup: stop the timer
  }, []);

Use cleanup for:
  - Clearing timers (clearInterval, clearTimeout)
  - Removing event listeners (removeEventListener)
  - Cancelling fetch requests (AbortController)
  - Unsubscribing from external stores

Without cleanup, side effects accumulate and leak memory.

ABORT CONTROLLER PATTERN (avoiding stale data)
When userId changes while a fetch is in flight, two requests can race. The old result might overwrite the new one. Use AbortController to cancel stale requests:

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/users/' + userId, { signal: controller.signal })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => {
        if (err.name === 'AbortError') return;  // ignore cancelled requests
        setError(err.message);
      });

    return () => controller.abort();   // cancel if userId changes before done
  }, [userId]);

COMMON MISTAKES
  // Infinite loop — setCount causes a re-render, re-render runs the effect
  // which calls setCount again, endlessly
  useEffect(() => {
    setCount(count + 1);   // depends on count but count is not in the array
  }, []);

  // Fix: use the functional update form so you don't need count in the dep array
  useEffect(() => {
    setCount(prev => prev + 1);
  }, []);  // runs once — no dependency on count`,
      quiz: [
        {
          question: 'What is a side effect in React?',
          options: [
            'An error thrown during rendering',
            'An operation beyond rendering, such as fetching data, setting the document title, or starting a timer',
            'A prop that changes unexpectedly',
            'A component that renders inside another component',
          ],
          answer: 1,
        },
        {
          question: 'What does an empty dependency array [] tell useEffect?',
          options: [
            'Run the effect before every render',
            'Run the effect after every render',
            'Run the effect once, only after the first render',
            'Never run the effect',
          ],
          answer: 2,
        },
        {
          question: 'What is the purpose of the cleanup function returned from useEffect?',
          options: [
            'It clears the component\'s state when the effect runs',
            'It runs before the next effect or on unmount, to cancel timers, remove listeners, or abort requests',
            'It formats the data returned by a fetch call',
            'It is called when the component renders for the first time',
          ],
          answer: 1,
        },
        {
          question: 'You fetch user data inside useEffect. The userId prop can change. What should you put in the dependency array?',
          options: [
            '[] — empty, so the fetch only runs once',
            '[user] — the state variable set by the fetch',
            '[userId] — the prop the fetch depends on, so it re-fetches when it changes',
            'Nothing — omit the array entirely',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Complete the PostLoader component. It should fetch a post from "https://jsonplaceholder.typicode.com/posts/{postId}" when postId changes, handle loading and error states, and display the post title and body.',
        starterCode: `import { useState, useEffect } from 'react';

function PostLoader({ postId }) {
  const [post, setPost]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    // 1. Reset loading and error state
    // 2. Fetch the post from the URL
    // 3. On success: setPost and setLoading(false)
    // 4. On error: setError and setLoading(false)
    // 5. Return a cleanup function using AbortController
  }, [postId]);  // re-run when postId changes

  // Handle loading state
  // Handle error state
  // Handle missing post

  return (
    <article>
      {/* Render post.title and post.body */}
    </article>
  );
}`,
        solution: `import { useState, useEffect } from 'react';

function PostLoader({ postId }) {
  const [post, setPost]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch('https://jsonplaceholder.typicode.com/posts/' + postId, {
      signal: controller.signal,
    })
      .then(res => {
        if (!res.ok) throw new Error('Post not found');
        return res.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [postId]);

  if (loading) return <p>Loading post...</p>;
  if (error)   return <p>Error: {error}</p>;
  if (!post)   return null;

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </article>
  );
}`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 8 — ACCESSIBLE REACT
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'react-8',
      title: 'Lesson 8: Accessible React — Building for Screen Readers',
      content: `React does not make your app inaccessible — but it introduces patterns that can go wrong if you are not deliberate. This lesson covers the accessibility requirements that apply specifically to React apps.

SEMANTIC HTML COMES FIRST
React lets you render any element. Use the right one for the job:

  // Wrong — a div cannot receive keyboard focus or convey role
  <div onClick={handleClick}>Submit</div>

  // Correct — a button is keyboard focusable and announces its role
  <button type="button" onClick={handleClick}>Submit</button>

If you find yourself adding role, tabIndex, and onKeyDown to a <div>, you probably just need a <button> or <a>.

LABELS FOR EVERY INPUT
React's htmlFor and id pairing works the same as HTML:

  <label htmlFor="username">Username</label>
  <input id="username" type="text" />

For inputs without visible labels (icon buttons, search boxes), use aria-label:
  <input type="search" aria-label="Search lessons" />

ANNOUNCING DYNAMIC CHANGES
Screen readers only announce new content automatically when focus moves there. For content that appears without a focus change — search results, success messages, error alerts — use aria-live or the ARIA alert role:

  // Polite: announced at the next available moment
  <div aria-live="polite" aria-atomic="true">
    {message && <p>{message}</p>}
  </div>

  // Assertive / alert: announced immediately, interrupts the user
  {error && <p role="alert">{error}</p>}

  // Key rule: the aria-live container must be in the DOM BEFORE the content changes.
  // Render the container unconditionally; update its children.

FOCUS MANAGEMENT
When a new view loads or a modal opens, focus must move to the right place. Use a ref to imperatively focus an element:

  import { useRef, useEffect } from 'react';

  function SearchResults({ results, query }) {
    const headingRef = useRef(null);

    useEffect(() => {
      if (results.length > 0 && headingRef.current) {
        headingRef.current.focus();
      }
    }, [results]);

    return (
      <section>
        <h2 tabIndex={-1} ref={headingRef}>
          {results.length} results for "{query}"
        </h2>
        {/* ... */}
      </section>
    );
  }

tabIndex={-1} makes an element programmatically focusable without putting it in the tab order.

MODAL DIALOGS
Accessible modals require:
  1. Focus moves into the modal when it opens
  2. Focus is trapped inside while the modal is open (Tab cycles within it)
  3. Escape closes the modal and returns focus to the trigger
  4. The background is marked aria-hidden="true" while the modal is open

  function Modal({ isOpen, onClose, children }) {
    const closeRef = useRef(null);

    useEffect(() => {
      if (isOpen && closeRef.current) {
        closeRef.current.focus();
      }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <div role="dialog" aria-modal="true" aria-label="Dialog">
        <button ref={closeRef} onClick={onClose}>Close</button>
        {children}
      </div>
    );
  }

THE SVG ICON TRAP
Icon-only buttons are common in React UIs. Make sure they have accessible names:

  // Wrong — screen reader announces "button" with no context
  <button onClick={onDelete}>
    <TrashIcon />
  </button>

  // Correct — visually hidden text provides the name
  <button onClick={onDelete} aria-label="Delete item">
    <TrashIcon aria-hidden="true" />
  </button>

Mark decorative SVGs with aria-hidden="true" so they are ignored by screen readers.

KEYBOARD NAVIGATION
React event handlers fire on the correct events automatically for interactive elements. But if you build a custom widget (a listbox, a tree, a carousel), you must add keyboard interaction manually:

  function onKeyDown(event) {
    if (event.key === 'ArrowDown') selectNext();
    if (event.key === 'ArrowUp')   selectPrev();
    if (event.key === 'Enter' || event.key === ' ') activateCurrent();
    if (event.key === 'Escape')    close();
  }

Refer to the ARIA Authoring Practices Guide (APG) for the expected keyboard patterns for each widget type.

AUTOMATED ACCESSIBILITY TESTING
Add axe-core to your React test suite:

  npm install --save-dev @axe-core/react

  // In development only (slows down the app):
  import React from 'react';
  import ReactDOM from 'react-dom';
  if (process.env.NODE_ENV !== 'production') {
    const axe = require('@axe-core/react');
    axe(React, ReactDOM, 1000);
  }

This logs accessibility violations to the browser console during development. Fix every violation before shipping.

ACCESSIBILITY CHECKLIST FOR REACT COMPONENTS
  [ ] Every interactive element is a button, link, or input — not a div
  [ ] Every input has an associated label (htmlFor/id or aria-label)
  [ ] Dynamic content changes use aria-live or role="alert"
  [ ] Modals trap focus and can be closed with Escape
  [ ] Icon-only buttons have aria-label
  [ ] Decorative images and icons have aria-hidden="true" or alt=""
  [ ] Focus moves to the right place after navigation or modal opens
  [ ] Color is never the only way to convey information`,
      quiz: [
        {
          question: 'A developer writes <div onClick={handleDelete}>Delete</div>. What accessibility problem does this create?',
          options: [
            'None — onClick works on any element',
            'A div is not keyboard focusable and does not announce its role as a button, making it inaccessible to keyboard and screen reader users',
            'The onClick event does not fire on div elements',
            'The text "Delete" is too short for screen readers to announce',
          ],
          answer: 1,
        },
        {
          question: 'An aria-live region must be in the DOM before content changes into it. Why?',
          options: [
            'It is just a performance optimization — the order does not matter',
            'If the region is added at the same time as the content, the browser may not register it as a live region in time to announce the change',
            'React renders aria-live regions differently from other elements',
            'Screen readers only read aria-live regions on page load',
          ],
          answer: 1,
        },
        {
          question: 'An icon-only delete button uses an SVG icon with no visible text. What should you do?',
          options: [
            'Add a tooltip — the tooltip text is read by screen readers',
            'Add aria-label="Delete item" to the button and aria-hidden="true" to the SVG',
            'Wrap the SVG in a <span> with the text "Delete" hidden via CSS display:none',
            'No change needed — screen readers can interpret SVG shapes',
          ],
          answer: 1,
        },
        {
          question: 'When a modal opens, what must happen with focus?',
          options: [
            'Focus stays on whatever element triggered the modal',
            'Focus moves to the first focusable element inside the modal',
            'Focus moves to the page heading',
            'Focus is removed entirely until the user tabs manually',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Fix the three accessibility problems in this React component: the interactive element is not keyboard accessible, the icon button has no label, and the status message is not announced to screen readers.',
        starterCode: `function TaskManager() {
  const [tasks, setTasks] = useState(['Write tests', 'Review PR']);
  const [status, setStatus] = useState('');

  function deleteTask(task) {
    setTasks(tasks.filter(t => t !== task));
    setStatus(task + ' deleted');
  }

  return (
    <section>
      <h1>Tasks</h1>
      {/* Problem 3: status is not in an aria-live region */}
      <p>{status}</p>
      <ul>
        {tasks.map(task => (
          <li key={task}>
            {task}
            {/* Problem 1: div is not keyboard accessible */}
            {/* Problem 2: icon button has no accessible name */}
            <div onClick={() => deleteTask(task)}>🗑️</div>
          </li>
        ))}
      </ul>
    </section>
  );
}`,
        solution: `function TaskManager() {
  const [tasks, setTasks] = useState(['Write tests', 'Review PR']);
  const [status, setStatus] = useState('');

  function deleteTask(task) {
    setTasks(tasks.filter(t => t !== task));
    setStatus(task + ' deleted');
  }

  return (
    <section>
      <h1>Tasks</h1>
      {/* Fix 3: wrap status in an aria-live region */}
      <div aria-live="polite" aria-atomic="true">
        {status && <p>{status}</p>}
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task}>
            {task}
            {/* Fix 1 & 2: use a button with aria-label */}
            <button
              type="button"
              aria-label={\`Delete \${task}\`}
              onClick={() => deleteTask(task)}
            >
              <span aria-hidden="true">🗑️</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 9 — useContext
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'react-9',
      title: 'Lesson 9: Sharing Data with useContext',
      content: `Props work well for passing data one or two levels down the component tree. But when many components at different nesting levels need the same data — a logged-in user, a color theme, a language preference — passing props through every intermediate component becomes tedious. This is called PROP DRILLING, and Context is React's solution.

THE PROBLEM: PROP DRILLING
  // userName must be passed through Layout and Sidebar just to reach UserGreeting
  function App() {
    const [userName] = useState('Alex');
    return <Layout userName={userName} />;
  }

  function Layout({ userName }) {
    return <Sidebar userName={userName} />;
  }

  function Sidebar({ userName }) {
    return <UserGreeting userName={userName} />;
  }

  function UserGreeting({ userName }) {
    return <p>Hello, {userName}</p>;
  }

Layout and Sidebar do not use userName — they only pass it along. Context eliminates this.

CREATING CONTEXT
  import { createContext } from 'react';

  // Create the context object with a default value
  const UserContext = createContext(null);

createContext takes an optional default value that is used when a component reads the context without a Provider above it.

THE PROVIDER
Wrap the part of the tree that needs access to the value in the context's Provider:

  function App() {
    const [user, setUser] = useState({ name: 'Alex', role: 'admin' });

    return (
      <UserContext.Provider value={user}>
        <Layout />
      </UserContext.Provider>
    );
  }

Every component inside the Provider — at any depth — can read the value directly.

READING CONTEXT WITH useContext
  import { useContext } from 'react';

  function UserGreeting() {
    const user = useContext(UserContext);
    return <p>Hello, {user.name}</p>;
  }

No props needed. Layout and Sidebar do not need to know about user at all.

PRACTICAL EXAMPLE: THEME CONTEXT
  import { createContext, useContext, useState } from 'react';

  const ThemeContext = createContext('light');

  function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  function ThemeToggle() {
    const { theme, setTheme } = useContext(ThemeContext);
    return (
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    );
  }

CUSTOM HOOK PATTERN
Wrap useContext in a custom hook to get a better error message and cleaner imports:

  function useUser() {
    const user = useContext(UserContext);
    if (!user) throw new Error('useUser must be used inside UserProvider');
    return user;
  }

  // In any component:
  const user = useUser();

WHEN TO USE CONTEXT — AND WHEN NOT TO
Use context for:
  - Global app data: current user, auth token, language/locale, color theme
  - Data that many components at many levels need

Do NOT use context for:
  - Data that only a few nearby components need — props are fine
  - Rapidly changing values (every keystroke) — context re-renders all consumers

Context is not a replacement for a state management library like Redux or Zustand. For large apps with complex state, consider those tools instead.

RE-RENDERING CAVEAT
When a Provider's value changes, ALL components that call useContext with that context re-render. To avoid unnecessary re-renders, split contexts (one for stable data, one for frequently changing data) or memoize the value object.`,
      quiz: [
        {
          question: 'What problem does React Context solve?',
          options: [
            'It replaces useState for all state management needs',
            'It eliminates prop drilling by letting any component in the tree read shared data directly',
            'It makes component rendering faster',
            'It provides a built-in database for storing user data',
          ],
          answer: 1,
        },
        {
          question: 'Where must a Context Provider be placed relative to the components that consume it?',
          options: [
            'It must be inside the component that needs the data',
            'It must be in a separate file',
            'It must be an ancestor (above) the components that need the context value',
            'It can be anywhere in the tree — position does not matter',
          ],
          answer: 2,
        },
        {
          question: 'What happens to context consumers when the Provider\'s value changes?',
          options: [
            'Nothing — they must manually re-fetch the context value',
            'Only the closest consumer re-renders',
            'All components that call useContext with that context re-render',
            'The entire application re-renders from the root',
          ],
          answer: 2,
        },
        {
          question: 'When should you NOT use Context?',
          options: [
            'For a color theme used across the whole app',
            'For the currently logged-in user',
            'For a value that only two adjacent sibling components share — props are simpler',
            'For a language/locale setting',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Create a LanguageContext that holds a language string ("en" or "es"). Build a LanguageProvider that wraps children with the context, and a Greeting component that reads the language and renders "Hello!" for "en" or "Hola!" for "es".',
        starterCode: `import { createContext, useContext, useState } from 'react';

// 1. Create LanguageContext with default value 'en'

// 2. Build LanguageProvider that holds language state
//    and wraps children in the Provider

// 3. Build Greeting that reads the context and
//    shows "Hello!" for 'en' or "Hola!" for 'es'

// 4. Build LanguageToggle that switches between 'en' and 'es'

// Usage:
// <LanguageProvider>
//   <Greeting />
//   <LanguageToggle />
// </LanguageProvider>`,
        solution: `import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext({ language: 'en', setLanguage: () => {} });

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

function Greeting() {
  const { language } = useContext(LanguageContext);
  return <p>{language === 'en' ? 'Hello!' : 'Hola!'}</p>;
}

function LanguageToggle() {
  const { language, setLanguage } = useContext(LanguageContext);
  return (
    <button onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}>
      Switch to {language === 'en' ? 'Spanish' : 'English'}
    </button>
  );
}`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 10 — useReducer
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'react-10',
      title: 'Lesson 10: Complex State with useReducer',
      content: `useState is great for simple, independent pieces of state. But when state logic grows — multiple sub-values that change together, transitions that depend on the previous state, or actions that affect several parts of state at once — useReducer gives you a cleaner, more predictable model.

THE CONCEPT
useReducer is inspired by the Redux pattern. Instead of calling multiple setters, you DISPATCH an ACTION — a plain object that describes what happened. A REDUCER FUNCTION takes the current state and the action, and returns the next state.

  dispatch({ type: 'INCREMENT' })
  // → reducer sees current state + this action → returns new state
  // → React re-renders with new state

THE SIGNATURE
  const [state, dispatch] = useReducer(reducer, initialState);

  - reducer: a pure function (state, action) => newState
  - initialState: the starting state value
  - state: the current state
  - dispatch: a function to send actions to the reducer

A BASIC REDUCER
  function counterReducer(state, action) {
    switch (action.type) {
      case 'INCREMENT':
        return { count: state.count + 1 };
      case 'DECREMENT':
        return { count: state.count - 1 };
      case 'RESET':
        return { count: 0 };
      default:
        return state;   // always return state for unknown actions
    }
  }

  function Counter() {
    const [state, dispatch] = useReducer(counterReducer, { count: 0 });

    return (
      <div>
        <p>Count: {state.count}</p>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
        <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      </div>
    );
  }

ACTIONS WITH PAYLOADS
Actions can carry extra data in a payload property:

  function todosReducer(state, action) {
    switch (action.type) {
      case 'ADD_TASK':
        return [...state, { id: Date.now(), text: action.payload, done: false }];
      case 'TOGGLE_TASK':
        return state.map(task =>
          task.id === action.payload ? { ...task, done: !task.done } : task
        );
      case 'DELETE_TASK':
        return state.filter(task => task.id !== action.payload);
      default:
        return state;
    }
  }

  // Dispatching with payload:
  dispatch({ type: 'ADD_TASK',    payload: 'Buy groceries' });
  dispatch({ type: 'TOGGLE_TASK', payload: 42 });
  dispatch({ type: 'DELETE_TASK', payload: 42 });

REDUCER RULES
  1. Reducers must be PURE — no side effects, no mutations
  2. Always return a new object/array, never mutate state directly
  3. Handle the default case by returning the current state

WHY useReducer OVER useState?
  Choose useReducer when:
  - State has multiple sub-values that often change together
  - Next state depends on previous state in complex ways
  - You have many different state transitions (more than 2-3 update patterns)
  - You want to test state logic in isolation (reducer is a plain function)

  Stick with useState when:
  - State is a single primitive or a simple boolean
  - Updates are straightforward setters

useReducer + useContext = GLOBAL STATE
Combining useReducer with useContext gives you a lightweight global state solution without Redux:

  const StateContext   = createContext(null);
  const DispatchContext = createContext(null);

  function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);
    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </StateContext.Provider>
    );
  }

Splitting state and dispatch into separate contexts means components that only dispatch (but don't read state) won't re-render when state changes.`,
      quiz: [
        {
          question: 'What is a reducer function?',
          options: [
            'A function that combines multiple components into one',
            'A pure function that takes current state and an action, and returns the next state',
            'A function that reduces the number of renders',
            'A function that merges two state objects together',
          ],
          answer: 1,
        },
        {
          question: 'What does dispatch do?',
          options: [
            'It directly updates a specific piece of state',
            'It sends an action object to the reducer to describe what happened',
            'It fetches data from an API',
            'It triggers a re-render without changing state',
          ],
          answer: 1,
        },
        {
          question: 'A reducer receives an action type it does not recognize. What should it return?',
          options: [
            'null',
            'An empty object {}',
            'undefined',
            'The current state unchanged',
          ],
          answer: 3,
        },
        {
          question: 'When should you prefer useReducer over useState?',
          options: [
            'When state is a single boolean toggle',
            'When state has multiple related sub-values and several distinct update patterns',
            'Always — useReducer is strictly better than useState',
            'Only when using Redux in the same project',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Build a task list using useReducer. The reducer should handle three actions: ADD_TASK (payload: text string), TOGGLE_TASK (payload: task id), and CLEAR_COMPLETED. Render the list and wire up an input + button to add tasks.',
        starterCode: `import { useReducer, useState } from 'react';

function tasksReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      // return new array with task added
      // task shape: { id: Date.now(), text: action.payload, done: false }
    case 'TOGGLE_TASK':
      // return array with matching task's done toggled
    case 'CLEAR_COMPLETED':
      // return array with only incomplete tasks
    default:
      return state;
  }
}

function TaskList() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [input, setInput] = useState('');

  function handleAdd() {
    // dispatch ADD_TASK with input as payload, then clear input
  }

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>
        Clear completed
      </button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {/* toggle done on click, show task.text */}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
        solution: `import { useReducer, useState } from 'react';

function tasksReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now(), text: action.payload, done: false }];
    case 'TOGGLE_TASK':
      return state.map(t =>
        t.id === action.payload ? { ...t, done: !t.done } : t
      );
    case 'CLEAR_COMPLETED':
      return state.filter(t => !t.done);
    default:
      return state;
  }
}

function TaskList() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [input, setInput] = useState('');

  function handleAdd() {
    if (!input.trim()) return;
    dispatch({ type: 'ADD_TASK', payload: input.trim() });
    setInput('');
  }

  return (
    <div>
      <label htmlFor="task-input">New task</label>
      <input
        id="task-input"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>
        Clear completed
      </button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
              aria-pressed={task.done}
            >
              {task.done ? '[done] ' : '[    ] '}{task.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 11 — useMemo AND useCallback
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'react-11',
      title: 'Lesson 11: Performance with useMemo and useCallback',
      content: `React re-renders components when state or props change. Most of the time this is fast and fine. But occasionally a component does expensive work on every render, or passes a new function reference to a child on every render, causing unnecessary re-renders downstream. useMemo and useCallback are the tools for these specific situations.

THE PROBLEM: EXPENSIVE RECALCULATIONS
Imagine a component that filters and sorts a large list:

  function ProductList({ products, filterText }) {
    // This runs on EVERY render — even if products and filterText haven't changed
    const filtered = products
      .filter(p => p.name.toLowerCase().includes(filterText.toLowerCase()))
      .sort((a, b) => a.price - b.price);

    return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
  }

If this component re-renders because some unrelated state changed, the filter+sort runs again unnecessarily.

useMemo: MEMOIZE A COMPUTED VALUE
useMemo caches the result of a function and only recomputes it when its dependencies change:

  import { useMemo } from 'react';

  function ProductList({ products, filterText }) {
    const filtered = useMemo(() => {
      return products
        .filter(p => p.name.toLowerCase().includes(filterText.toLowerCase()))
        .sort((a, b) => a.price - b.price);
    }, [products, filterText]);   // only recompute when these change

    return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
  }

Now filtered is recalculated only when products or filterText changes — not on every render.

THE PROBLEM: UNSTABLE FUNCTION REFERENCES
In JavaScript, every time a function is defined, it creates a new object. So:

  function Parent() {
    function handleClick() { /* ... */ }
    // handleClick is a NEW function on every render
    return <ExpensiveChild onClick={handleClick} />;
  }

If ExpensiveChild is wrapped in React.memo (to skip re-renders when props haven't changed), it will still re-render because handleClick is technically a new value every time.

useCallback: MEMOIZE A FUNCTION REFERENCE
useCallback returns the same function reference between renders unless its dependencies change:

  import { useCallback } from 'react';

  function Parent() {
    const [count, setCount] = useState(0);

    const handleClick = useCallback(() => {
      console.log('clicked');
    }, []);   // no dependencies — same function forever

    return (
      <>
        <button onClick={() => setCount(c => c + 1)}>Re-render parent</button>
        <ExpensiveChild onClick={handleClick} />
      </>
    );
  }

Now ExpensiveChild gets the same handleClick reference on every render and does not re-render unnecessarily.

React.memo: SKIPPING CHILD RE-RENDERS
useCallback only helps if the child component is wrapped in React.memo:

  const ExpensiveChild = React.memo(function ExpensiveChild({ onClick }) {
    console.log('ExpensiveChild rendered');
    return <button onClick={onClick}>Do something</button>;
  });

React.memo makes a component skip re-rendering if its props have not changed (using shallow equality). Without React.memo, the stable function reference from useCallback has no effect.

WHEN TO USE THEM — AND WHEN NOT TO
  Use useMemo when:
  - A calculation is genuinely expensive (sorting/filtering large arrays, complex math)
  - The result is used as a dependency in another useMemo or useEffect

  Use useCallback when:
  - You pass a callback to a child wrapped in React.memo
  - A function is in the dependency array of a useEffect and would otherwise cause an infinite loop

  Do NOT use them:
  - As a default on every value and function — memoization itself has a cost
  - On cheap computations (adding two numbers, simple string concatenation)
  - When the component rarely re-renders anyway

THE GOLDEN RULE
Measure first. React is fast. Add useMemo and useCallback only when you have identified a real performance problem with profiling (React DevTools Profiler). Premature optimization adds complexity without benefit.

QUICK REFERENCE
  useMemo(fn, deps)       — cache a computed VALUE, recompute when deps change
  useCallback(fn, deps)   — cache a FUNCTION REFERENCE, recreate when deps change
  React.memo(Component)   — skip re-rendering a component when props are unchanged`,
      quiz: [
        {
          question: 'What does useMemo do?',
          options: [
            'It prevents a component from ever re-rendering',
            'It caches the result of a function and only recomputes it when its dependencies change',
            'It stores values in localStorage automatically',
            'It replaces useState for storing computed values',
          ],
          answer: 1,
        },
        {
          question: 'Why does useCallback help when passing functions to child components?',
          options: [
            'It makes the function run faster',
            'It ensures the function is only called once',
            'It returns the same function reference between renders so React.memo children are not re-rendered unnecessarily',
            'It automatically debounces the function call',
          ],
          answer: 2,
        },
        {
          question: 'useCallback only prevents child re-renders when paired with what?',
          options: [
            'useEffect',
            'useMemo on the parent',
            'React.memo on the child component',
            'A dependency array with no entries',
          ],
          answer: 2,
        },
        {
          question: 'When should you add useMemo to a computation?',
          options: [
            'By default on all computed values to keep the app fast',
            'Only after profiling confirms the computation is causing a measurable performance problem',
            'Whenever the computation involves more than one variable',
            'Only in class components — function components are always fast enough',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'A SearchList component receives a large items array and a query string. Use useMemo to memoize the filtered list so it only recomputes when items or query changes. Then wrap an ItemRow child in React.memo and use useCallback to stabilize the onSelect handler passed to it.',
        starterCode: `import { useState, useMemo, useCallback, memo } from 'react';

// Wrap with React.memo so it skips re-renders when props are unchanged
const ItemRow = memo(function ItemRow({ item, onSelect }) {
  console.log('ItemRow rendered:', item.name);
  return (
    <li>
      <button onClick={() => onSelect(item.id)}>{item.name}</button>
    </li>
  );
});

function SearchList({ items }) {
  const [query, setQuery]       = useState('');
  const [selected, setSelected] = useState(null);

  // TODO: memoize filtered using useMemo
  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  // TODO: stabilize with useCallback so ItemRow doesn't re-render on every keystroke
  function handleSelect(id) {
    setSelected(id);
  }

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {selected && <p>Selected ID: {selected}</p>}
      <ul>
        {filtered.map(item => (
          <ItemRow key={item.id} item={item} onSelect={handleSelect} />
        ))}
      </ul>
    </div>
  );
}`,
        solution: `import { useState, useMemo, useCallback, memo } from 'react';

const ItemRow = memo(function ItemRow({ item, onSelect }) {
  console.log('ItemRow rendered:', item.name);
  return (
    <li>
      <button onClick={() => onSelect(item.id)}>{item.name}</button>
    </li>
  );
});

function SearchList({ items }) {
  const [query, setQuery]       = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() =>
    items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    ),
    [items, query]
  );

  const handleSelect = useCallback((id) => {
    setSelected(id);
  }, []);

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {selected && <p>Selected ID: {selected}</p>}
      <ul>
        {filtered.map(item => (
          <ItemRow key={item.id} item={item} onSelect={handleSelect} />
        ))}
      </ul>
    </div>
  );
}`,
      },
    },
  ],
};

window.reactModule = reactModule;
