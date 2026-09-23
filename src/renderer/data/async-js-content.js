'use strict';

const asyncJsModule = {
  id: 'async-js',
  title: 'Async JavaScript',
  description: 'Asynchronous JavaScript is what makes modern web apps fast and responsive. This module covers the event loop, callbacks, Promises, async/await, error handling, and parallel async patterns — giving you the tools to write clean, reliable async code.',
  objectives: [
    'Understand what asynchronous programming means and why JavaScript needs it',
    'Explain the event loop and how JavaScript handles async work',
    'Use callbacks and understand their limitations',
    'Create and chain Promises to manage async operations',
    'Write clean async code using async/await',
    'Handle errors in async code with try/catch and .catch()',
    'Use the Fetch API to load data from a server',
    'Run multiple async operations in parallel with Promise.all',
  ],
  goals: [
    'Explain why JavaScript is single-threaded and how it handles async work',
    'Convert a callback-based function to a Promise',
    'Write an async function that fetches data and handles errors',
    'Use Promise.all to load multiple resources simultaneously',
    'Identify the difference between sequential and parallel async execution',
  ],
  lessons: [
    // ─────────────────────────────────────────────────────────────────
    // LESSON 1 — WHAT IS ASYNC?
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'async-1',
      title: 'Lesson 1: What Is Asynchronous Programming?',
      content: `JavaScript runs in a single thread — it can only do one thing at a time. But web applications need to do things like fetch data from a server, read files, and wait for timers — all without freezing the page. This is the problem that asynchronous programming solves.

SYNCHRONOUS VS ASYNCHRONOUS
SYNCHRONOUS code runs line by line — each line waits for the previous one to finish:

  const a = doHeavyCalculation();   // must finish before moving on
  const b = doAnotherThing();       // only runs after "a" is done
  console.log(a, b);

If doHeavyCalculation takes 3 seconds, the entire program is frozen for 3 seconds.

ASYNCHRONOUS code starts an operation and moves on without waiting:

  fetchUserData(userId, function(user) {
    // this runs LATER, when the data arrives
    console.log(user.name);
  });
  console.log("This runs IMMEDIATELY, before the data arrives");

WHY ASYNC MATTERS FOR THE WEB
Consider a web page that:
  1. Loads user profile from a server (500ms)
  2. Loads their friends list (300ms)
  3. Loads their messages (400ms)

Synchronous: total wait = 500 + 300 + 400 = 1,200ms
Asynchronous (all at once): total wait = max(500, 300, 400) = 500ms

Async also prevents the UI from freezing. If JavaScript had to wait synchronously for network requests, the page would lock up and be unresponsive every time data was loading.

THE THREE ERAS OF ASYNC JS
JavaScript's async story has evolved through three stages:

1. CALLBACKS (oldest): pass a function to be called when the work is done
   Problem: "callback hell" when tasks depend on each other

2. PROMISES (ES6, 2015): a better API for handling async results
   Better: chainable, composable, built into the language

3. ASYNC/AWAIT (ES2017): makes async code look synchronous
   Best developer experience: readable, easy error handling`,
      quiz: [
        {
          question: 'JavaScript is described as single-threaded. What does this mean?',
          options: [
            'JavaScript can only run in one browser tab at a time',
            'JavaScript can only do one thing at a time on the main thread',
            'JavaScript can only execute one function per file',
            'JavaScript cannot share data between different functions',
          ],
          answer: 'JavaScript can only do one thing at a time on the main thread',
        },
        {
          question: 'A web page needs to load data from three different API endpoints. What is the asynchronous advantage over synchronous loading?',
          options: [
            'Async loading is more secure because requests are isolated from each other',
            'All three requests can be made simultaneously, reducing total wait time to roughly the longest single request',
            'Async loading bypasses the browser\'s network limits',
            'The server processes async requests faster than sequential ones',
          ],
          answer: 'All three requests can be made simultaneously, reducing total wait time to roughly the longest single request',
        },
        {
          question: 'Which is the correct chronological order of JavaScript async approaches?',
          options: [
            'Promises -> Callbacks -> Async/Await',
            'Async/Await -> Promises -> Callbacks',
            'Callbacks -> Promises -> Async/Await',
            'All three were introduced at the same time',
          ],
          answer: 'Callbacks -> Promises -> Async/Await',
        },
      ],
      exercise: {
        prompt: 'Explain in your own words why a web page would freeze if JavaScript loaded data synchronously. Write 2-3 sentences.',
        starterCode: `// Why would synchronous network requests freeze the UI?

// Explanation:`,
        solution: `// Explanation:
// JavaScript runs on a single thread — when it is waiting for a synchronous operation (like a network request), no other code can run. This means the browser cannot respond to user interactions, update the screen, or process any other events. The page appears completely frozen until the synchronous operation finishes, which is a terrible user experience.`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 2 — THE EVENT LOOP
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'async-2',
      title: 'Lesson 2: The Event Loop',
      content: `The event loop is the mechanism that lets JavaScript be both single-threaded AND non-blocking. Understanding it demystifies why async code behaves the way it does.

THE KEY COMPONENTS

CALL STACK: where JavaScript executes functions. It is LIFO (Last In, First Out). When a function is called, it is pushed onto the stack. When it returns, it is popped off.

WEB APIS (or Node.js APIs): the browser provides built-in functions for async work — setTimeout, fetch, addEventListener. These run OUTSIDE the call stack (in separate threads provided by the browser).

CALLBACK QUEUE (Task Queue): when an async operation finishes, its callback is placed here, waiting for the call stack to be empty.

MICROTASK QUEUE: higher priority than the callback queue. Promise callbacks (.then, .catch, async/await) go here. Microtasks are processed BEFORE the next task from the callback queue.

THE EVENT LOOP: continuously checks — "is the call stack empty? If yes, move the next item from the queue to the stack."

HOW IT WORKS — STEP BY STEP

  console.log("1");                    // (A)
  setTimeout(() => console.log("2"), 0); // (B)
  console.log("3");                    // (C)

Execution order:
  1. "1" is printed — (A) runs on the call stack, completes
  2. setTimeout is called — (B) is handed to the Web API with 0ms delay
  3. "3" is printed — (C) runs on the call stack, completes
  4. setTimeout fires (0ms later) — the callback joins the callback queue
  5. Call stack is empty — event loop moves the callback to the stack
  6. "2" is printed

OUTPUT: 1, 3, 2

Even with a 0ms delay, setTimeout always runs AFTER the current synchronous code finishes.

MICROTASKS RUN BEFORE TASKS

  console.log("start");

  setTimeout(() => console.log("timeout"), 0);  // task queue

  Promise.resolve()
    .then(() => console.log("promise"));          // microtask queue

  console.log("end");

OUTPUT: start, end, promise, timeout

Promises (microtasks) always run before setTimeout callbacks (tasks), even if the timeout is 0ms.

WHAT THIS MEANS IN PRACTICE
  - Async code NEVER interrupts running synchronous code
  - Long-running synchronous code BLOCKS the event loop (freezes the page)
  - You can break up heavy work with setTimeout to give the UI a chance to breathe
  - Promise callbacks (.then) run between tasks — they are not delayed like setTimeout`,
      quiz: [
        {
          question: 'What is the event loop\'s job?',
          options: [
            'To run JavaScript code faster by using multiple threads',
            'To continuously check if the call stack is empty and move callbacks from the queue to the stack',
            'To schedule when DOM updates happen during animations',
            'To manage memory allocation for JavaScript objects',
          ],
          answer: 'To continuously check if the call stack is empty and move callbacks from the queue to the stack',
        },
        {
          question: 'What is the output of: console.log("A"); setTimeout(()=>console.log("B"),0); console.log("C")',
          options: [
            'A, B, C',
            'B, A, C',
            'A, C, B',
            'C, A, B',
          ],
          answer: 'A, C, B',
        },
        {
          question: 'Promise callbacks are placed in the microtask queue. How does this compare to setTimeout callbacks in the task queue?',
          options: [
            'They run at the same priority',
            'Microtasks (Promise callbacks) run before task queue callbacks, even if the setTimeout delay is 0',
            'Task queue callbacks always run first because they were registered earlier',
            'It depends on which one finished its async operation first',
          ],
          answer: 'Microtasks (Promise callbacks) run before task queue callbacks, even if the setTimeout delay is 0',
        },
      ],
      exercise: {
        prompt: 'Predict the output of this code. Write the output order and briefly explain why each line runs when it does.',
        starterCode: `// Predict the output of this code:

console.log("start");

setTimeout(() => console.log("timeout 1"), 100);
setTimeout(() => console.log("timeout 2"), 0);

Promise.resolve().then(() => console.log("promise 1"));
Promise.resolve().then(() => console.log("promise 2"));

console.log("end");

// Predicted output (write in order):
// 1.
// 2.
// 3.
// 4.
// 5.
// 6.`,
        solution: `// 1. start       — synchronous, runs immediately
// 2. end         — synchronous, runs before any async callbacks
// 3. promise 1   — microtask queue, runs before any setTimeout callbacks
// 4. promise 2   — microtask queue, all microtasks drain before tasks
// 5. timeout 2   — 0ms delay fires before 100ms delay
// 6. timeout 1   — 100ms delay fires last`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 3 — CALLBACKS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'async-3',
      title: 'Lesson 3: Callbacks',
      content: `A callback is a function that is passed as an argument to another function and called when async work is done. Callbacks were the original async pattern in JavaScript.

A BASIC CALLBACK

  function loadUser(userId, callback) {
    // Simulate async work with setTimeout
    setTimeout(() => {
      const user = { id: userId, name: "Ada" };
      callback(null, user);   // node convention: error first, then result
    }, 500);
  }

  loadUser(1, function(error, user) {
    if (error) {
      console.log("Error:", error);
      return;
    }
    console.log("Loaded:", user.name);
  });

THE ERROR-FIRST CONVENTION
Node.js popularised the error-first callback pattern: the callback always receives the error as its first argument. If there is no error, it is null.

  readFile("data.txt", function(error, data) {
    if (error) { handle(error); return; }
    process(data);
  });

CALLBACK HELL
Callbacks get messy when operations depend on each other:

  loadUser(1, function(err, user) {
    loadPosts(user.id, function(err, posts) {
      loadComments(posts[0].id, function(err, comments) {
        loadAuthor(comments[0].authorId, function(err, author) {
          // Now we are 4 levels deep...
          console.log(author.name);
        });
      });
    });
  });

This is "callback hell" or the "pyramid of doom." Problems:
  - Hard to read and reason about
  - Error handling must be repeated at every level
  - Modifying the flow requires touching many layers

Promises were created to solve this.

WHERE CALLBACKS STILL APPEAR
Even with Promises and async/await, callbacks remain common in:
  - Event listeners: btn.addEventListener("click", callback)
  - Array methods: [1,2,3].forEach(callback), .map(), .filter()
  - setTimeout and setInterval

These are not "async" in the Promise sense — they are just the function-passing pattern.`,
      quiz: [
        {
          question: 'What is a callback function?',
          options: [
            'A function that calls itself recursively',
            'A function passed as an argument that is called when async work completes',
            'A function that is only called when an error occurs',
            'A function that can only be used with setTimeout',
          ],
          answer: 'A function passed as an argument that is called when async work completes',
        },
        {
          question: 'What is "callback hell"?',
          options: [
            'When callbacks run so fast they overflow the call stack',
            'Deeply nested callbacks that form a pyramid shape and are hard to read and maintain',
            'When a callback function throws an error that is not caught',
            'The term for callbacks that run in the wrong order',
          ],
          answer: 'Deeply nested callbacks that form a pyramid shape and are hard to read and maintain',
        },
        {
          question: 'In the error-first callback convention, what is the first argument of the callback when the operation succeeds?',
          options: [
            'The result of the operation',
            'An empty string',
            'null (no error)',
            'The string "success"',
          ],
          answer: 'null (no error)',
        },
      ],
      exercise: {
        prompt: 'Write a function "delayedDouble" that takes a number and a callback. After 500ms, it calls the callback with double the number. Then call it and log the result.',
        starterCode: `// Write delayedDouble using a callback

function delayedDouble(number, callback) {
  // After 500ms, call callback with number * 2

}

// Call it and log the result
delayedDouble(21, function(result) {
  console.log(result); // should log 42 after 500ms
});`,
        solution: `function delayedDouble(number, callback) {
  setTimeout(() => {
    callback(number * 2);
  }, 500);
}

delayedDouble(21, function(result) {
  console.log(result); // 42 (after 500ms)
});`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 4 — PROMISES
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'async-4',
      title: 'Lesson 4: Promises',
      content: `A Promise is an object representing the eventual completion or failure of an async operation. It is a cleaner alternative to callbacks.

THE THREE STATES OF A PROMISE
  PENDING:   the async work has not finished yet
  FULFILLED: the async work completed successfully (has a value)
  REJECTED:  the async work failed (has a reason/error)

A Promise starts pending and settles to either fulfilled or rejected — it can never go back.

CREATING A PROMISE
  const myPromise = new Promise((resolve, reject) => {
    // do async work here
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve({ id: 1, name: "Ada" });   // fulfil with a value
      } else {
        reject(new Error("Failed to load user"));  // reject with an error
      }
    }, 500);
  });

CONSUMING PROMISES — .then() AND .catch()
  myPromise
    .then(user => {
      console.log("User:", user.name);  // runs on fulfillment
    })
    .catch(error => {
      console.error("Error:", error.message);  // runs on rejection
    })
    .finally(() => {
      console.log("Done, either way");  // always runs
    });

CHAINING PROMISES
Each .then() returns a NEW Promise. This lets you chain operations:

  loadUser(1)
    .then(user => loadPosts(user.id))      // returns another Promise
    .then(posts => loadComments(posts[0].id))  // returns another Promise
    .then(comments => console.log(comments))
    .catch(error => console.error(error));   // catches ANY error in the chain

This is much cleaner than nested callbacks. One .catch at the end handles errors from any step.

RETURNING VALUES IN .then()
Whatever you return from a .then() becomes the value passed to the next .then():

  Promise.resolve(5)
    .then(n => n * 2)    // returns 10
    .then(n => n + 1)    // receives 10, returns 11
    .then(n => console.log(n));  // logs 11

PROMISE.RESOLVE AND PROMISE.REJECT
Create an instantly settled Promise:

  Promise.resolve(42)        // immediately fulfilled with 42
    .then(v => console.log(v));

  Promise.reject(new Error("oops"))  // immediately rejected
    .catch(e => console.error(e));

These are useful for testing and for wrapping non-Promise values in a consistent API.`,
      quiz: [
        {
          question: 'What are the three possible states of a Promise?',
          options: [
            'Loading, complete, failed',
            'Pending, fulfilled, rejected',
            'Waiting, resolved, errored',
            'Queued, running, done',
          ],
          answer: 'Pending, fulfilled, rejected',
        },
        {
          question: 'You have a Promise chain with 4 .then() steps and one .catch() at the end. If the second step throws an error, what happens?',
          options: [
            'The third and fourth .then() steps run, then .catch() runs',
            'The chain stops at the error and .catch() handles it — steps three and four are skipped',
            'The error is silently swallowed and the chain continues',
            '.catch() never runs because it is at the end of the chain',
          ],
          answer: 'The chain stops at the error and .catch() handles it — steps three and four are skipped',
        },
        {
          question: 'What does .finally() do in a Promise chain?',
          options: [
            'It runs only if the Promise is rejected',
            'It runs only if the Promise is fulfilled',
            'It always runs whether the Promise fulfilled or rejected',
            'It cancels the Promise and runs cleanup code',
          ],
          answer: 'It always runs whether the Promise fulfilled or rejected',
        },
      ],
      exercise: {
        prompt: 'Convert this callback-based function to return a Promise instead. The function simulates loading a user by ID.',
        starterCode: `// BEFORE — callback style:
function loadUserCallback(id, callback) {
  setTimeout(() => {
    if (id <= 0) {
      callback(new Error("Invalid ID"), null);
    } else {
      callback(null, { id, name: "User " + id });
    }
  }, 300);
}

// AFTER — rewrite as a Promise:
function loadUser(id) {
  return new Promise((resolve, reject) => {
    // your code here
  });
}

// Test it:
loadUser(5)
  .then(user => console.log(user.name))  // "User 5"
  .catch(err => console.error(err.message));

loadUser(-1)
  .then(user => console.log(user.name))
  .catch(err => console.error(err.message));  // "Invalid ID"`,
        solution: `function loadUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) {
        reject(new Error("Invalid ID"));
      } else {
        resolve({ id, name: "User " + id });
      }
    }, 300);
  });
}

loadUser(5)
  .then(user => console.log(user.name))  // User 5
  .catch(err => console.error(err.message));

loadUser(-1)
  .then(user => console.log(user.name))
  .catch(err => console.error(err.message));  // Invalid ID`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 5 — ASYNC / AWAIT
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'async-5',
      title: 'Lesson 5: async/await — Cleaner Async Code',
      content: `async/await is syntactic sugar built on top of Promises. It lets you write async code that LOOKS synchronous — no .then() chains, just straight-line code.

THE ASYNC KEYWORD
Mark a function with async and it automatically returns a Promise:

  async function getName(): string { ... }
  // is equivalent to:
  function getName(): Promise<string> { ... }

  async function getData() {
    return 42;   // the function wraps this in a resolved Promise automatically
  }

  getData().then(v => console.log(v));  // logs 42

THE AWAIT KEYWORD
await pauses execution INSIDE the async function until the Promise settles:

  async function loadUser() {
    const user = await fetchUser(1);   // waits for fetchUser to resolve
    console.log(user.name);            // runs after user is loaded
    return user;
  }

await can only be used INSIDE an async function. Using it at the top level is only valid in ES modules.

BEFORE AND AFTER
BEFORE (Promise chains):
  function displayUser(id) {
    return loadUser(id)
      .then(user => loadPosts(user.id))
      .then(posts => loadComments(posts[0].id))
      .then(comments => renderPage(comments))
      .catch(error => showError(error));
  }

AFTER (async/await):
  async function displayUser(id) {
    try {
      const user     = await loadUser(id);
      const posts    = await loadPosts(user.id);
      const comments = await loadComments(posts[0].id);
      renderPage(comments);
    } catch (error) {
      showError(error);
    }
  }

The async/await version reads like synchronous code — each line clearly waits for the previous one.

ERROR HANDLING WITH TRY/CATCH
With async/await, use try/catch instead of .catch():

  async function getUser(id) {
    try {
      const user = await loadUser(id);
      return user;
    } catch (error) {
      console.error("Failed to load user:", error.message);
      return null;
    }
  }

AWAIT IN LOOPS
SEQUENTIAL (each waits for the previous):
  for (const id of userIds) {
    const user = await loadUser(id);  // loads one by one — slow
    console.log(user.name);
  }

PARALLEL (all start at once):
  const users = await Promise.all(userIds.map(id => loadUser(id)));
  // All load simultaneously — much faster

Use sequential when each operation depends on the previous result.
Use parallel when operations are independent.`,
      quiz: [
        {
          question: 'What does the async keyword do to a function?',
          options: [
            'It makes the function run on a separate thread',
            'It makes the function automatically return a Promise',
            'It enables the function to accept callbacks',
            'It makes the function execute faster',
          ],
          answer: 'It makes the function automatically return a Promise',
        },
        {
          question: 'What does await do inside an async function?',
          options: [
            'It blocks the entire JavaScript thread until the Promise resolves',
            'It pauses execution of the current async function until the Promise settles, without blocking other code',
            'It converts a Promise to a synchronous value permanently',
            'It schedules the Promise to run on the next tick',
          ],
          answer: 'It pauses execution of the current async function until the Promise settles, without blocking other code',
        },
        {
          question: 'How do you handle errors in an async/await function?',
          options: [
            'You cannot — errors in async functions are always silently swallowed',
            'Using .catch() chained after the function call only',
            'Using try/catch inside the async function',
            'By passing an error-first callback as the last parameter',
          ],
          answer: 'Using try/catch inside the async function',
        },
      ],
      exercise: {
        prompt: 'Rewrite this Promise chain using async/await syntax. Keep the same error handling behaviour.',
        starterCode: `// BEFORE — Promise chain:
function getUserProfile(userId) {
  return fetchUser(userId)
    .then(user => {
      return fetchAvatar(user.avatarId)
        .then(avatar => ({ ...user, avatar }));
    })
    .catch(error => {
      console.error("Failed to load profile:", error.message);
      return null;
    });
}

// AFTER — rewrite using async/await:
async function getUserProfile(userId) {
  // your code here
}`,
        solution: `async function getUserProfile(userId) {
  try {
    const user = await fetchUser(userId);
    const avatar = await fetchAvatar(user.avatarId);
    return { ...user, avatar };
  } catch (error) {
    console.error("Failed to load profile:", error.message);
    return null;
  }
}`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 6 — FETCH API
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'async-6',
      title: 'Lesson 6: The Fetch API',
      content: `The Fetch API is the modern, Promise-based way to make HTTP requests in the browser. It replaced the older XMLHttpRequest (XHR).

BASIC FETCH
  fetch("https://api.example.com/users/1")
    .then(response => response.json())
    .then(user => console.log(user))
    .catch(error => console.error("Fetch failed:", error));

fetch() returns a Promise that resolves to a Response object. You call .json() on the Response to parse the body (which is itself a Promise).

FETCH WITH ASYNC/AWAIT
  async function getUser(id) {
    try {
      const response = await fetch(\`https://api.example.com/users/\${id}\`);

      if (!response.ok) {
        throw new Error(\`HTTP error: \${response.status}\`);
      }

      const user = await response.json();
      return user;
    } catch (error) {
      console.error("Failed to fetch user:", error.message);
      return null;
    }
  }

IMPORTANT: FETCH ONLY REJECTS ON NETWORK FAILURE
This is a common gotcha. fetch() does NOT reject on HTTP error statuses like 404 or 500 — it only rejects on actual network failures (no connection, DNS failure).

You MUST check response.ok (which is true for 200-299) yourself:

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Server error: " + response.status);
  }

  const data = await response.json();

MAKING POST REQUESTS
  async function createUser(userData) {
    const response = await fetch("https://api.example.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error("Failed to create user");
    return response.json();
  }

READING DIFFERENT RESPONSE FORMATS
  response.json()    — parse as JSON (returns a Promise)
  response.text()    — parse as plain text (returns a Promise)
  response.blob()    — parse as binary data (images, files)

ABORT CONTROLLER
Cancel a fetch request (useful for cleanup when components unmount):

  const controller = new AbortController();

  fetch(url, { signal: controller.signal })
    .then(r => r.json())
    .catch(e => {
      if (e.name === "AbortError") console.log("Request cancelled");
    });

  // Cancel the request:
  controller.abort();`,
      quiz: [
        {
          question: 'A fetch() request to a server returns a 404 response. What does the Promise do?',
          options: [
            'It rejects — all HTTP error codes cause the fetch Promise to reject',
            'It fulfils — fetch only rejects on network failure, not HTTP errors',
            'It stays pending until a valid response is received',
            'It depends on whether you provided a .catch() handler',
          ],
          answer: 'It fulfils — fetch only rejects on network failure, not HTTP errors',
        },
        {
          question: 'After getting a fetch response, why do you need to call response.json()?',
          options: [
            'Because fetch returns a compressed binary by default',
            'Because the response body is a stream — .json() reads and parses it, returning another Promise',
            'To validate that the JSON is properly formatted',
            'Because .json() also checks the response status for errors',
          ],
          answer: 'Because the response body is a stream — .json() reads and parses it, returning another Promise',
        },
        {
          question: 'To send JSON data in a POST request with fetch, what must you include in the options?',
          options: [
            'method: "POST" only — fetch handles JSON serialisation automatically',
            'method: "POST", headers with Content-Type: application/json, and body: JSON.stringify(data)',
            'type: "json" in the fetch options object',
            'A special fetchJSON() function — fetch does not support JSON POST natively',
          ],
          answer: 'method: "POST", headers with Content-Type: application/json, and body: JSON.stringify(data)',
        },
      ],
      exercise: {
        prompt: 'Write an async function "searchUsers" that fetches users from "/api/users?query=X" where X is a parameter. Handle the case where the response is not OK, and return the parsed JSON array.',
        starterCode: `// Write searchUsers using fetch and async/await

async function searchUsers(query) {
  // Build the URL with the query parameter
  // Check response.ok and throw if not
  // Return the parsed JSON
}

// Test call:
searchUsers("ada")
  .then(users => console.log(users))
  .catch(err => console.error(err.message));`,
        solution: `async function searchUsers(query) {
  const url = \`/api/users?query=\${encodeURIComponent(query)}\`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(\`Search failed: \${response.status} \${response.statusText}\`);
  }

  return response.json();
}

searchUsers("ada")
  .then(users => console.log(users))
  .catch(err => console.error(err.message));`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 7 — PARALLEL ASYNC PATTERNS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'async-7',
      title: 'Lesson 7: Running Async Operations in Parallel',
      content: `When multiple async operations are independent of each other, running them in parallel dramatically reduces total wait time. JavaScript provides several tools for this.

PROMISE.ALL — ALL MUST SUCCEED
Run multiple Promises simultaneously. Resolves when ALL succeed; rejects as soon as ANY one fails.

  const [user, posts, settings] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchSettings(1),
  ]);

  // user, posts, and settings are all available here
  // Total time ≈ longest single request (not the sum)

If any Promise rejects, Promise.all immediately rejects with that error. The other operations may still be running, but their results are ignored.

USE WHEN: you need all results to proceed, and one failure should stop everything.

PROMISE.ALLSETTLED — WAIT FOR ALL
Like Promise.all, but does NOT reject early. Waits for every Promise to settle (fulfilled or rejected) and returns an array of result objects.

  const results = await Promise.allSettled([
    fetchUser(1),
    fetchUser(-1),   // will fail
    fetchUser(3),
  ]);

  results.forEach(result => {
    if (result.status === "fulfilled") {
      console.log("Got:", result.value);
    } else {
      console.error("Failed:", result.reason);
    }
  });

USE WHEN: you want all results but do not want one failure to cancel the others (e.g., loading multiple optional widgets on a dashboard).

PROMISE.RACE — FIRST ONE WINS
Resolves or rejects as soon as the FIRST Promise settles:

  const result = await Promise.race([
    fetchFromPrimaryServer(),
    fetchFromBackupServer(),
  ]);

USE WHEN: you want the fastest of several sources. Also used for timeout patterns:

  function withTimeout(promise, ms) {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timed out")), ms)
    );
    return Promise.race([promise, timeout]);
  }

  const user = await withTimeout(fetchUser(1), 5000);  // fails after 5s

PROMISE.ANY — FIRST SUCCESS
Like Promise.race, but ignores rejections and resolves as soon as the first Promise FULFILS:

  const fastestResult = await Promise.any([
    fetchFromRegion("us"),
    fetchFromRegion("eu"),
    fetchFromRegion("ap"),
  ]);

Only rejects if ALL Promises reject (throws AggregateError).

USE WHEN: you have multiple fallbacks and want the first one that succeeds.`,
      quiz: [
        {
          question: 'You need to load a user\'s profile, their posts, and their settings before rendering a page. All three are independent. What is the MOST efficient approach?',
          options: [
            'Await each request sequentially — user, then posts, then settings',
            'Use Promise.all to load all three simultaneously',
            'Use Promise.race to load whichever finishes first',
            'Use setTimeout to stagger the requests',
          ],
          answer: 'Use Promise.all to load all three simultaneously',
        },
        {
          question: 'Promise.all is loading 5 requests. The third one fails. What happens?',
          options: [
            'The other 4 are automatically cancelled',
            'Promise.all waits for all 5 to finish before reporting the error',
            'Promise.all immediately rejects with the error from the third request',
            'The failed request is retried automatically',
          ],
          answer: 'Promise.all immediately rejects with the error from the third request',
        },
        {
          question: 'When would you choose Promise.allSettled over Promise.all?',
          options: [
            'When you need results faster — allSettled is more optimised',
            'When you want all operations to complete regardless of individual failures, and want to handle each result separately',
            'When you are loading a single resource that might need a fallback',
            'When you want the first successful result only',
          ],
          answer: 'When you want all operations to complete regardless of individual failures, and want to handle each result separately',
        },
      ],
      exercise: {
        prompt: 'Write an async function "loadDashboard" that loads three pieces of data in parallel — user, notifications, and recentActivity — using Promise.all. Then return an object combining all three.',
        starterCode: `// These functions return Promises:
// fetchUser(id) -> { id, name }
// fetchNotifications(userId) -> [notification, ...]
// fetchRecentActivity(userId) -> [activity, ...]

async function loadDashboard(userId) {
  // Load all three in parallel with Promise.all
  // Return { user, notifications, recentActivity }
}

loadDashboard(1).then(dashboard => {
  console.log("User:", dashboard.user.name);
  console.log("Notifications:", dashboard.notifications.length);
});`,
        solution: `async function loadDashboard(userId) {
  const [user, notifications, recentActivity] = await Promise.all([
    fetchUser(userId),
    fetchNotifications(userId),
    fetchRecentActivity(userId),
  ]);

  return { user, notifications, recentActivity };
}

loadDashboard(1).then(dashboard => {
  console.log("User:", dashboard.user.name);
  console.log("Notifications:", dashboard.notifications.length);
});`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 8 — PUTTING IT ALL TOGETHER
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'async-8',
      title: 'Lesson 8: Async JavaScript in Practice',
      content: `This lesson consolidates everything and walks through real-world patterns you will encounter in professional JavaScript code.

PATTERN 1: LOADING WITH LOADING/ERROR STATES
  async function loadContent(url) {
    showSpinner();
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Server error: " + response.status);
      const data = await response.json();
      renderContent(data);
    } catch (error) {
      renderError(error.message);
    } finally {
      hideSpinner();   // always runs — whether success or error
    }
  }

PATTERN 2: RETRY LOGIC
  async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url);
        if (response.ok) return response.json();
      } catch (error) {
        if (i === retries - 1) throw error;   // re-throw on last attempt
        await new Promise(r => setTimeout(r, 1000 * (i + 1)));  // wait before retry
      }
    }
  }

PATTERN 3: SEQUENTIAL WITH EARLY EXIT
  async function processOrders(orderIds) {
    const results = [];
    for (const id of orderIds) {
      const order = await processOrder(id);
      results.push(order);
      if (order.status === "failed") break;   // stop processing if one fails
    }
    return results;
  }

PATTERN 4: ACCESSIBLE ASYNC UI
For accessible apps, async UI changes must be announced to screen readers:

  async function loadResults(query) {
    announceToScreenReader("Loading search results...");
    try {
      const results = await searchApi(query);
      renderResults(results);
      announceToScreenReader(results.length + " results found for " + query);
    } catch (error) {
      renderError(error.message);
      announceToScreenReader("Error: " + error.message);
    }
  }

  function announceToScreenReader(message) {
    const announcer = document.getElementById("sr-announcer");
    announcer.textContent = "";
    setTimeout(() => { announcer.textContent = message; }, 100);
  }

ASYNC ANTIPATTERNS TO AVOID

ANTIPATTERN 1: Unnecessary await on non-Promises
  const value = await 42;    // pointless — 42 is not a Promise

ANTIPATTERN 2: Forgetting to await
  async function bad() {
    const user = loadUser(1);   // forgot await — user is a Promise, not a User!
    console.log(user.name);     // undefined
  }

ANTIPATTERN 3: Sequential when parallel is possible
  const user  = await loadUser(1);    // slow — waits for each one
  const posts = await loadPosts(1);   // before starting the next
  // Better: Promise.all([loadUser(1), loadPosts(1)])

ANTIPATTERN 4: Unhandled rejections
  loadUser(1).then(u => process(u));   // no .catch — rejection is silently lost
  // Better: always add .catch() or use try/catch`,
      quiz: [
        {
          question: 'In the loading pattern, why is "finally" used to hide the spinner?',
          options: [
            'Because "finally" runs synchronously before the try block',
            'Because "finally" always runs whether the operation succeeded or failed — ensuring the spinner is always hidden',
            'Because "finally" is faster than putting hideSpinner() in both try and catch',
            'Because "finally" prevents errors from propagating to the caller',
          ],
          answer: 'Because "finally" always runs whether the operation succeeded or failed — ensuring the spinner is always hidden',
        },
        {
          question: 'Why is it important to announce async content changes to screen readers?',
          options: [
            'It is not important — screen readers track DOM changes automatically',
            'Screen readers read the entire page again after any DOM change',
            'Screen readers only announce changes in aria-live regions — dynamic updates are otherwise silently invisible to them',
            'It is a legal requirement under GDPR',
          ],
          answer: 'Screen readers only announce changes in aria-live regions — dynamic updates are otherwise silently invisible to them',
        },
        {
          question: 'You have an async function but forgot to add "await" before a Promise call. What happens?',
          options: [
            'JavaScript throws a runtime error immediately',
            'The variable receives the Promise object instead of the resolved value',
            'The function waits anyway — JavaScript infers the await',
            'The Promise resolves synchronously without the await keyword',
          ],
          answer: 'The variable receives the Promise object instead of the resolved value',
        },
      ],
      exercise: {
        prompt: 'Write an accessible async search function. It should: show a loading message, fetch from "/api/search?q=query", handle errors, display results, and announce the outcome to screen readers via an aria-live region with id "sr-announcer".',
        starterCode: `// Accessible async search function

async function performSearch(query) {
  const announcer = document.getElementById("sr-announcer");

  // 1. Announce loading state

  // 2. Show a loading spinner (call showSpinner())

  try {
    // 3. Fetch from /api/search?q=query (check response.ok)

    // 4. Render results (call renderResults(data))

    // 5. Announce success to screen reader

  } catch (error) {
    // 6. Show error to user (call renderError(error.message))

    // 7. Announce error to screen reader

  } finally {
    // 8. Always hide the spinner

  }
}`,
        solution: `async function performSearch(query) {
  const announcer = document.getElementById("sr-announcer");

  // 1. Announce loading state
  announcer.textContent = "";
  setTimeout(() => { announcer.textContent = "Searching for " + query + "..."; }, 100);

  // 2. Show a loading spinner
  showSpinner();

  try {
    // 3. Fetch results
    const response = await fetch("/api/search?q=" + encodeURIComponent(query));
    if (!response.ok) throw new Error("Search failed: " + response.status);
    const data = await response.json();

    // 4. Render results
    renderResults(data);

    // 5. Announce success
    announcer.textContent = "";
    setTimeout(() => {
      announcer.textContent = data.length + " results found for " + query;
    }, 100);

  } catch (error) {
    // 6. Show error
    renderError(error.message);

    // 7. Announce error
    announcer.textContent = "";
    setTimeout(() => {
      announcer.textContent = "Error: " + error.message;
    }, 100);

  } finally {
    // 8. Always hide spinner
    hideSpinner();
  }
}`,
      },
    },
  ],
};

window.asyncJsModule = asyncJsModule;
