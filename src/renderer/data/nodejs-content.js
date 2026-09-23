'use strict';

const nodejsModule = {
  id: 'nodejs',
  title: 'Node.js & Express',
  description: 'Node.js lets you run JavaScript on the server — outside the browser. Combined with Express, it gives you a fast, flexible toolkit for building REST APIs and web servers. This module takes you from installing Node.js through designing and building a full CRUD API with middleware and error handling.',
  objectives: [
    'Understand what Node.js is and how it differs from browser JavaScript',
    'Use the Node.js module system with require, exports, and ES modules',
    'Read and write files asynchronously with the fs module',
    'Build a basic HTTP server using the built-in http module',
    'Create routes and return JSON responses with Express',
    'Design a REST API following CRUD conventions and HTTP verbs',
    'Write and apply middleware for logging, parsing, and error handling',
    'Use a JSON file as a simple persistent data store',
  ],
  goals: [
    'Run a JavaScript file with Node.js and inspect the result',
    'Create a module that exports a function and import it elsewhere',
    'Read a file asynchronously and handle the error case',
    'Build an Express server with GET, POST, PUT, and DELETE routes',
    'Return correct HTTP status codes from each route',
    'Write a middleware function that logs every incoming request',
    'Handle route errors with Express error-handling middleware',
    'Load and save data to a JSON file from within a route handler',
  ],
  lessons: [
    // ─────────────────────────────────────────────────────────────────
    // LESSON 1 — WHAT IS NODE.JS?
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'node-1',
      title: 'Lesson 1: What Is Node.js?',
      content: `Node.js is a runtime that lets you execute JavaScript outside the browser. Before Node.js existed (it was released in 2009), JavaScript could only run inside a web browser. Node.js changed that by embedding the V8 JavaScript engine — the same one Chrome uses — into a standalone program you can run on your computer or server.

WHAT THIS MEANS IN PRACTICE
With Node.js you can:
  - Build web servers and REST APIs
  - Read and write files on disk
  - Connect to databases
  - Run build tools (webpack, Vite, TypeScript compiler)
  - Write command-line utilities
  - Do anything a server-side language like Python or Ruby can do

BROWSER JAVASCRIPT VS NODE.JS JAVASCRIPT
The JavaScript language itself is the same in both environments. The difference is what APIs are available.

  Browser has:                    Node.js has:
  document, window, DOM           fs (file system)
  fetch (browser version)         http, https modules
  localStorage                    path, os, crypto modules
  alert, confirm, prompt          process (command-line access)
  navigator, location             No DOM — no document or window

Code that references document or window will fail in Node.js. Code that uses fs or process will fail in the browser.

THE EVENT LOOP
Node.js is single-threaded and non-blocking. It uses an event loop — the same model as the browser — to handle many concurrent operations without creating multiple threads.

When you call an async operation (read a file, make a network request), Node.js hands the work off to the operating system, registers a callback, and moves on to handle other work. When the OS finishes, it pushes the result back into the event queue and Node.js calls the callback.

This is why Node.js can handle thousands of simultaneous HTTP connections efficiently on a single CPU core — it never sits and waits; it always moves on to the next task.

INSTALLING NODE.JS
Download from nodejs.org. The LTS (Long Term Support) version is recommended for most work.

Verify installation:
  node --version    # prints something like v20.11.0
  npm --version     # prints the npm version

RUNNING A FILE
Create a file called hello.js:
  console.log('Hello from Node.js!');

Run it:
  node hello.js

You should see:
  Hello from Node.js!

PACKAGE.JSON
Every Node.js project has a package.json file that records the project name, version, dependencies, and scripts.

Create one with:
  npm init -y

This generates a default package.json. The -y flag accepts all defaults without asking questions.

Key fields:
  "name"         — the project name
  "version"      — current version (semver: major.minor.patch)
  "main"         — entry point file
  "scripts"      — shortcuts for terminal commands (npm start, npm test)
  "dependencies" — packages required to run the app
  "devDependencies" — packages only needed during development

NPM — THE NODE PACKAGE MANAGER
npm is the package manager that comes with Node.js. It lets you install third-party libraries from the npm registry (npmjs.com).

  npm install express          # installs to node_modules, adds to dependencies
  npm install --save-dev jest  # adds to devDependencies

After installing, you will see a node_modules folder and a package-lock.json. Never commit node_modules — add it to .gitignore.

THE NODE.JS REPL
Type node with no arguments to open an interactive REPL (Read-Eval-Print Loop):
  node
  > 2 + 2
  4
  > 'hello'.toUpperCase()
  'HELLO'
  > .exit

Useful for quick experiments without writing a file.`,
      quiz: [
        {
          question: 'What is Node.js?',
          options: [
            'A JavaScript framework for building user interfaces in the browser',
            'A runtime that lets you execute JavaScript outside the browser, on a server or your own machine',
            'A database management system written in JavaScript',
            'A browser extension that adds server-side features to web pages',
          ],
          answer: 1,
        },
        {
          question: 'Why can Node.js handle thousands of concurrent connections on a single thread?',
          options: [
            'It creates a new thread for each connection automatically',
            'It uses an event loop — async operations are handed off to the OS, and Node moves on rather than waiting',
            'It compresses all requests into a single batch before processing',
            'It limits the number of connections to what one thread can handle sequentially',
          ],
          answer: 1,
        },
        {
          question: 'Which of these APIs is available in Node.js but NOT in the browser?',
          options: [
            'document.querySelector()',
            'console.log()',
            'fs.readFile()',
            'JSON.parse()',
          ],
          answer: 2,
        },
        {
          question: 'What does npm install express do?',
          options: [
            'Installs Node.js on your computer',
            'Downloads the Express library into node_modules and records it in package.json dependencies',
            'Creates a new Express project from a template',
            'Starts an Express server',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Create a Node.js script that prints your name, the current date, and the Node.js version to the console. Use process.version to get the Node version and new Date().toLocaleDateString() for the date.',
        starterCode: `// greeting.js
// Print three lines:
// 1. "Name: <your name>"
// 2. "Date: <today's date>"
// 3. "Node version: <process.version>"

console.log('Name: ');
console.log('Date: ');
console.log('Node version: ');`,
        solution: `// greeting.js
console.log('Name: Alex');
console.log('Date: ' + new Date().toLocaleDateString());
console.log('Node version: ' + process.version);`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 2 — NODE.JS MODULES
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'node-2',
      title: 'Lesson 2: The Node.js Module System',
      content: `Modules are how Node.js organises code into reusable files. Instead of one giant file, you split your code into focused pieces, each exporting what it offers and importing only what it needs.

CommonJS (CJS) — THE ORIGINAL SYSTEM
Node.js was built with the CommonJS module format. Every file is its own module. You export with module.exports and import with require().

EXPORTING
Create a file called mathUtils.js:

  // mathUtils.js
  function add(a, b) {
    return a + b;
  }

  function multiply(a, b) {
    return a * b;
  }

  module.exports = { add, multiply };

You can also export a single value:
  module.exports = function greet(name) {
    return 'Hello, ' + name;
  };

IMPORTING WITH require()
  // app.js
  const mathUtils = require('./mathUtils');   // .js extension optional
  console.log(mathUtils.add(2, 3));           // 5

  // Destructure directly
  const { add, multiply } = require('./mathUtils');
  console.log(multiply(4, 5));               // 20

The path must start with ./ or ../ for your own files. Without a path prefix, Node looks in node_modules.

ES MODULES (ESM) — THE MODERN STANDARD
ES modules use import and export, matching the browser syntax. To use ESM in Node.js:

Option 1 — name your file with .mjs extension
Option 2 — add "type": "module" to package.json (makes ALL .js files ESM)

  // mathUtils.mjs
  export function add(a, b) { return a + b; }
  export function multiply(a, b) { return a * b; }

  // app.mjs
  import { add, multiply } from './mathUtils.mjs';
  console.log(add(2, 3));

CJS vs ESM:
  - Most existing Node.js code and tutorials use CJS (require)
  - ESM is the future standard and works in both browser and Node
  - They cannot be mixed freely — pick one for a project

BUILT-IN MODULES
Node.js ships with many built-in modules you can require without installing anything.

PATH MODULE
Handles file paths in a cross-platform way (forward slashes vs backslashes):

  const path = require('path');

  path.join('users', 'alex', 'docs')    // 'users/alex/docs' (or backslash on Windows)
  path.basename('/users/alex/file.txt') // 'file.txt'
  path.extname('report.pdf')            // '.pdf'
  path.dirname('/users/alex/file.txt')  // '/users/alex'

Always use path.join() to build paths — never string concatenation — so your code works on all operating systems.

OS MODULE
Information about the operating system:

  const os = require('os');

  os.platform()    // 'win32', 'darwin', 'linux'
  os.homedir()     // C:\\Users\\alex  (or /Users/alex on Mac)
  os.cpus().length // number of CPU cores
  os.totalmem()    // total RAM in bytes
  os.freemem()     // available RAM in bytes

PROCESS OBJECT
The global process object is always available — no require needed:

  process.version           // Node.js version
  process.platform          // OS platform
  process.argv              // command-line arguments array
  process.env.NODE_ENV      // environment variable
  process.cwd()             // current working directory
  process.exit(0)           // exit with success code

Reading command-line arguments:
  // Run: node greet.js Alex
  const name = process.argv[2];   // process.argv[0] = 'node', [1] = script path
  console.log('Hello, ' + name);

__DIRNAME AND __FILENAME (CJS only)
In CommonJS modules, two globals give you the current file's location:

  __dirname   // absolute path to the directory containing this file
  __filename  // absolute path to this file

  const filePath = path.join(__dirname, 'data', 'users.json');
  // Always points to the right place regardless of where you run the script from

These are not available in ES modules — use import.meta.url instead.`,
      quiz: [
        {
          question: 'In CommonJS, how do you make a function available to other files?',
          options: [
            'By declaring it with the export keyword',
            'By assigning it to module.exports',
            'By placing it in a file named exports.js',
            'Functions are automatically shared between files in Node.js',
          ],
          answer: 1,
        },
        {
          question: 'What is the difference between require("express") and require("./utils")?',
          options: [
            'require("express") uses double quotes; require("./utils") uses single quotes',
            'require("express") looks in node_modules; require("./utils") loads your own local file',
            'There is no difference — both load from node_modules',
            'require("./utils") only works on Windows',
          ],
          answer: 1,
        },
        {
          question: 'Why should you use path.join() to build file paths instead of string concatenation?',
          options: [
            'path.join() is faster than string concatenation',
            'path.join() handles the difference between forward and backslashes across operating systems',
            'String concatenation does not work with file paths in JavaScript',
            'path.join() automatically creates the directory if it does not exist',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Create two files: a greetings.js module that exports a greet(name) function returning "Hello, <name>!", and an app.js that requires it, calls greet with your name, and logs the result.',
        starterCode: `// greetings.js
// Export a function greet(name) that returns "Hello, <name>!"


// ─────────────────────────────────────
// app.js
// Require greetings.js, call greet(), log the result
`,
        solution: `// greetings.js
function greet(name) {
  return 'Hello, ' + name + '!';
}
module.exports = { greet };

// ─────────────────────────────────────
// app.js
const { greet } = require('./greetings');
console.log(greet('Alex'));   // Hello, Alex!`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 3 — THE FILE SYSTEM
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'node-3',
      title: 'Lesson 3: Working with the File System',
      content: `The fs (file system) module lets you read, write, update, and delete files on disk. It is one of the most commonly used Node.js built-in modules.

CALLBACK STYLE (ORIGINAL API)
The original fs API uses callbacks — you pass a function that Node.js calls when the operation completes:

  const fs = require('fs');

  fs.readFile('notes.txt', 'utf8', function(err, data) {
    if (err) {
      console.error('Error reading file:', err.message);
      return;
    }
    console.log(data);
  });

The first argument to every fs callback is always an error object (or null if no error). Always check it first.

fs.writeFile creates the file if it does not exist, or overwrites it:
  fs.writeFile('output.txt', 'Hello, file!', 'utf8', function(err) {
    if (err) throw err;
    console.log('File written.');
  });

PROMISE STYLE — fs.promises (RECOMMENDED)
The modern fs.promises API returns Promises instead of using callbacks. Combine it with async/await for clean, readable code:

  const fs = require('fs').promises;
  // or: const { promises: fs } = require('fs');

  async function readConfig() {
    try {
      const data = await fs.readFile('config.json', 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Could not read config:', err.message);
      return null;
    }
  }

COMMON fs.promises OPERATIONS

Reading a file:
  const content = await fs.readFile('readme.txt', 'utf8');

Writing a file (overwrites):
  await fs.writeFile('output.txt', 'Some content', 'utf8');

Appending to a file:
  await fs.appendFile('log.txt', 'New log entry\n', 'utf8');

Checking if a file exists:
  try {
    await fs.access('myfile.txt');
    console.log('File exists');
  } catch {
    console.log('File does not exist');
  }

Deleting a file:
  await fs.unlink('temp.txt');

Renaming or moving a file:
  await fs.rename('old-name.txt', 'new-name.txt');

WORKING WITH DIRECTORIES

Create a directory:
  await fs.mkdir('logs', { recursive: true });
  // recursive: true means no error if directory already exists

List files in a directory:
  const files = await fs.readdir('src');
  console.log(files);   // ['app.js', 'utils.js', ...]

Remove a directory (must be empty):
  await fs.rmdir('logs');

Remove a directory and all its contents:
  await fs.rm('logs', { recursive: true, force: true });

READING AND WRITING JSON
JSON files are the standard way to store simple structured data in Node.js:

  // Read JSON
  async function loadUsers() {
    const raw = await fs.readFile('users.json', 'utf8');
    return JSON.parse(raw);
  }

  // Write JSON (pretty-printed with 2-space indent)
  async function saveUsers(users) {
    const json = JSON.stringify(users, null, 2);
    await fs.writeFile('users.json', json, 'utf8');
  }

SYNCHRONOUS VARIANTS
Every fs method has a synchronous version ending in Sync (readFileSync, writeFileSync, etc.). These block the entire Node.js process until they finish — fine for startup scripts or CLI tools, but never use them inside a server handling requests.

  // Only use at the top of a startup script — never inside request handlers
  const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

ALWAYS USE path.join() FOR PATHS
Hard-coding paths like 'data/users.json' breaks when you run the script from a different directory. Always build paths relative to the current file:

  const path = require('path');
  const filePath = path.join(__dirname, 'data', 'users.json');
  const data = await fs.readFile(filePath, 'utf8');`,
      quiz: [
        {
          question: 'In the fs callback API, what is always the first argument to the callback function?',
          options: [
            'The file contents',
            'An error object (or null if the operation succeeded)',
            'The number of bytes read',
            'The file path that was accessed',
          ],
          answer: 1,
        },
        {
          question: 'Why is fs.promises preferred over the callback-based fs API?',
          options: [
            'fs.promises is faster because it skips the event loop',
            'fs.promises works with async/await, making async file operations read like synchronous code without callback nesting',
            'fs.promises automatically retries on failure',
            'The callback API was removed in recent versions of Node.js',
          ],
          answer: 1,
        },
        {
          question: 'When is it acceptable to use synchronous fs methods like readFileSync?',
          options: [
            'Inside Express route handlers for better performance',
            'Whenever the file is small enough to read quickly',
            'Only at startup or in CLI scripts — never inside a server handling requests',
            'Always — synchronous code is easier to understand',
          ],
          answer: 2,
        },
        {
          question: 'What does JSON.stringify(data, null, 2) do differently from JSON.stringify(data)?',
          options: [
            'It produces the same output — the extra arguments are ignored',
            'It pretty-prints the JSON with 2-space indentation, making it human-readable',
            'It compresses the JSON to save disk space',
            'It only stringifies 2 levels of nesting',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write an async function saveNote(filename, content) that writes content to a .txt file in a "notes" subdirectory (creating the directory if it does not exist). Then write loadNote(filename) that reads and returns the content.',
        starterCode: `const fs = require('fs').promises;
const path = require('path');

const NOTES_DIR = path.join(__dirname, 'notes');

async function saveNote(filename, content) {
  // 1. Ensure the notes directory exists (use recursive: true)
  // 2. Write content to path.join(NOTES_DIR, filename)
}

async function loadNote(filename) {
  // Read and return the file content as a string
  // Return null if the file does not exist
}

// Test it
async function main() {
  await saveNote('hello.txt', 'This is my note.');
  const text = await loadNote('hello.txt');
  console.log(text);   // This is my note.
}
main();`,
        solution: `const fs = require('fs').promises;
const path = require('path');

const NOTES_DIR = path.join(__dirname, 'notes');

async function saveNote(filename, content) {
  await fs.mkdir(NOTES_DIR, { recursive: true });
  await fs.writeFile(path.join(NOTES_DIR, filename), content, 'utf8');
}

async function loadNote(filename) {
  try {
    return await fs.readFile(path.join(NOTES_DIR, filename), 'utf8');
  } catch {
    return null;
  }
}

async function main() {
  await saveNote('hello.txt', 'This is my note.');
  const text = await loadNote('hello.txt');
  console.log(text);
}
main();`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 4 — BUILDING AN HTTP SERVER
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'node-4',
      title: 'Lesson 4: Building an HTTP Server',
      content: `Node.js can act as a web server using the built-in http module. Understanding how this module works explains exactly what Express (which wraps it) is doing under the hood.

CREATING A BASIC SERVER
  const http = require('http');

  const server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, world!');
  });

  server.listen(3000, function() {
    console.log('Server running at http://localhost:3000');
  });

Run with node server.js, then open a browser to http://localhost:3000.

THE REQUEST OBJECT (req)
The request object carries everything about the incoming HTTP request:

  req.method     // 'GET', 'POST', 'PUT', 'DELETE', etc.
  req.url        // '/users', '/users/42', '/about', etc.
  req.headers    // object of request headers

Reading a POST body (data arrives in chunks):
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    const data = JSON.parse(body);
    // now data is the parsed request body
  });

THE RESPONSE OBJECT (res)
You use the response object to send data back to the client:

  res.writeHead(statusCode, headersObject)   // set status + headers
  res.write(chunk)                           // write a piece of the body
  res.end(body)                              // send and close the response

  // Shorthand — write and end in one call:
  res.end('Hello!');

HTTP STATUS CODES
Status codes tell the client what happened:

  200 OK             — request succeeded, data in body
  201 Created        — new resource was successfully created
  204 No Content     — success, but no body to return (DELETE)
  400 Bad Request    — the client sent invalid data
  401 Unauthorized   — authentication required
  403 Forbidden      — authenticated but not allowed
  404 Not Found      — resource does not exist
  500 Internal Server Error — something went wrong on the server

ROUTING BY URL
You can check req.url and req.method to send different responses:

  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET' && req.url === '/') {
      res.writeHead(200);
      res.end(JSON.stringify({ message: 'Welcome' }));

    } else if (req.method === 'GET' && req.url === '/users') {
      res.writeHead(200);
      res.end(JSON.stringify([{ id: 1, name: 'Alex' }]));

    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
    }
  });

This works but becomes unwieldy as routes grow — exactly why Express exists.

SENDING JSON RESPONSES
  function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  }

  // Usage:
  sendJSON(res, 200, { users: [] });
  sendJSON(res, 404, { error: 'User not found' });

PORTS AND LOCALHOST
  - localhost means "this machine" — your own computer
  - Port 3000 is a common development port (ports below 1024 need admin rights)
  - The server only receives requests while node is running — stop it with Ctrl+C

NODEMON — AUTO-RESTART ON CHANGES
During development, restart the server automatically when files change:
  npm install --save-dev nodemon

Add to package.json scripts:
  "scripts": {
    "dev": "nodemon server.js"
  }

Run with: npm run dev`,
      quiz: [
        {
          question: 'What does res.end() do?',
          options: [
            'Closes the database connection',
            'Sends the final piece of the response body and signals that the response is complete',
            'Terminates the Node.js process',
            'Ends the request before it reaches the server',
          ],
          answer: 1,
        },
        {
          question: 'A client sends a POST request with a JSON body. How does the raw http module receive the body?',
          options: [
            'It is available directly as req.body',
            'It arrives in chunks via req.on("data") events and must be assembled and parsed manually',
            'Node.js automatically parses it into req.json()',
            'The http module does not support POST bodies — only GET requests',
          ],
          answer: 1,
        },
        {
          question: 'What HTTP status code should you return when a resource is not found?',
          options: [
            '200',
            '400',
            '404',
            '500',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Build a raw HTTP server (no Express) that responds to GET /ping with 200 and JSON { status: "ok" }, and responds to any other route with 404 and JSON { error: "Not found" }.',
        starterCode: `const http = require('http');

const server = http.createServer((req, res) => {
  // Set Content-Type header for all responses
  // Route GET /ping -> 200 { status: 'ok' }
  // All other routes  -> 404 { error: 'Not found' }
});

server.listen(3000, () => {
  console.log('Server at http://localhost:3000');
});`,
        solution: `const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && req.url === '/ping') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'ok' }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(3000, () => {
  console.log('Server at http://localhost:3000');
});`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 5 — INTRODUCTION TO EXPRESS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'node-5',
      title: 'Lesson 5: Introduction to Express',
      content: `Express is a minimal, flexible web framework for Node.js. It wraps the built-in http module and adds routing, middleware, and convenience methods so you can build APIs in a fraction of the code.

INSTALLING EXPRESS
  npm install express

CREATING YOUR FIRST EXPRESS APP
  const express = require('express');
  const app     = express();

  app.get('/', (req, res) => {
    res.send('Hello from Express!');
  });

  app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
  });

ROUTE METHODS
Express exposes methods for each HTTP verb:

  app.get(path, handler)
  app.post(path, handler)
  app.put(path, handler)
  app.patch(path, handler)
  app.delete(path, handler)

Each handler receives (req, res) — the same request and response objects as the raw http module, but enhanced by Express.

SENDING RESPONSES
  res.send('text')              — send a string (Content-Type: text/html)
  res.json({ key: 'value' })   — send JSON (sets Content-Type automatically)
  res.status(404).json({...})  — set status then send JSON
  res.sendStatus(204)           — send status code with no body

Always end a route with one of these — if you do not send a response, the request hangs.

ROUTE PARAMETERS
Use a colon to define a URL parameter:

  app.get('/users/:id', (req, res) => {
    const userId = req.params.id;   // '42' if URL is /users/42
    res.json({ id: userId });
  });

Multiple parameters:
  app.get('/posts/:postId/comments/:commentId', (req, res) => {
    const { postId, commentId } = req.params;
    res.json({ postId, commentId });
  });

QUERY STRINGS
Query parameters come after ? in the URL:

  // GET /search?q=node&page=2
  app.get('/search', (req, res) => {
    const { q, page = 1 } = req.query;
    res.json({ query: q, page: Number(page) });
  });

Express parses query strings automatically — they are available on req.query.

REQUEST BODY
To read JSON bodies sent in POST/PUT requests, add the built-in JSON middleware:

  app.use(express.json());

Now req.body contains the parsed JSON:

  app.post('/users', (req, res) => {
    const { name, email } = req.body;
    res.status(201).json({ id: 1, name, email });
  });

STATIC FILES
Serve a folder of static files (HTML, CSS, images):

  app.use(express.static('public'));

Any file in the public/ folder is served automatically at its path.

ORGANISING ROUTES WITH express.Router
When you have many routes, split them into separate files using Router:

  // routes/users.js
  const router = require('express').Router();

  router.get('/',    (req, res) => res.json([]));
  router.post('/',   (req, res) => res.status(201).json({}));
  router.get('/:id', (req, res) => res.json({ id: req.params.id }));

  module.exports = router;

  // app.js
  const usersRouter = require('./routes/users');
  app.use('/users', usersRouter);
  // Now GET /users hits router.get('/')
  // And  GET /users/42 hits router.get('/:id')

COMPLETE MINIMAL EXAMPLE
  const express = require('express');
  const app = express();
  app.use(express.json());

  const books = [
    { id: 1, title: 'Dune', author: 'Frank Herbert' },
    { id: 2, title: '1984', author: 'George Orwell' },
  ];

  app.get('/books',     (req, res) => res.json(books));
  app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));
    if (!book) return res.status(404).json({ error: 'Not found' });
    res.json(book);
  });

  app.listen(3000, () => console.log('Books API on port 3000'));`,
      quiz: [
        {
          question: 'What does app.use(express.json()) do?',
          options: [
            'Sends all responses as JSON automatically',
            'Parses incoming request bodies with Content-Type application/json and puts the result on req.body',
            'Converts the response to JSON format',
            'Validates that all route handlers return valid JSON',
          ],
          answer: 1,
        },
        {
          question: 'Given the route app.get("/posts/:id", handler), what does req.params.id contain when the URL is /posts/99?',
          options: [
            'The number 99',
            'The string "99"',
            'An object { id: 99 }',
            'undefined — params only work with query strings',
          ],
          answer: 1,
        },
        {
          question: 'How do you send a 201 status code with a JSON body in Express?',
          options: [
            'res.send(201, { data })',
            'res.status(201).json({ data })',
            'res.json({ status: 201, data })',
            'res.writeHead(201); res.end(JSON.stringify({ data }))',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Build an Express API for a simple todo list. GET /todos returns all todos. POST /todos creates a new todo from req.body.text and assigns it the next ID. GET /todos/:id returns a single todo or 404.',
        starterCode: `const express = require('express');
const app = express();
app.use(express.json());

let todos = [
  { id: 1, text: 'Learn Node.js', done: false },
];
let nextId = 2;

// GET /todos  — return all todos

// POST /todos — create a new todo from req.body.text

// GET /todos/:id — return one todo or 404

app.listen(3000, () => console.log('Todos API on port 3000'));`,
        solution: `const express = require('express');
const app = express();
app.use(express.json());

let todos = [
  { id: 1, text: 'Learn Node.js', done: false },
];
let nextId = 2;

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const todo = { id: nextId++, text: req.body.text, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Not found' });
  res.json(todo);
});

app.listen(3000, () => console.log('Todos API on port 3000'));`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 6 — REST API DESIGN
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'node-6',
      title: 'Lesson 6: REST API Design',
      content: `REST (Representational State Transfer) is a set of conventions for designing HTTP APIs. Following REST makes your API predictable and consistent — any developer who knows REST will immediately understand how to use it.

THE CORE IDEA: RESOURCES AND VERBS
A REST API is built around RESOURCES (things) and HTTP VERBS (actions). The URL identifies the resource; the HTTP method identifies the action.

  Resource: users
  GET    /users          — list all users
  POST   /users          — create a new user
  GET    /users/42       — get user with id 42
  PUT    /users/42       — replace user 42 entirely
  PATCH  /users/42       — update part of user 42
  DELETE /users/42       — delete user 42

This pattern works for any resource: /posts, /products, /orders, /comments.

NESTED RESOURCES
When one resource belongs to another:
  GET  /users/42/posts        — all posts by user 42
  POST /users/42/posts        — create a post for user 42
  GET  /users/42/posts/7      — post 7 belonging to user 42

Keep nesting shallow — no more than two levels deep.

HTTP STATUS CODES FOR EACH OPERATION

  GET (list)     200 OK
  GET (single)   200 OK  /  404 Not Found
  POST           201 Created  (return the new resource in body)
  PUT / PATCH    200 OK  /  404 Not Found
  DELETE         204 No Content  (no body)  /  404 Not Found

BUILDING A FULL CRUD RESOURCE IN EXPRESS
  const express = require('express');
  const app = express();
  app.use(express.json());

  let users = [{ id: 1, name: 'Alex', email: 'alex@example.com' }];
  let nextId = 2;

  // List all
  app.get('/users', (req, res) => {
    res.json(users);
  });

  // Get one
  app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  });

  // Create
  app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'name and email are required' });
    }
    const user = { id: nextId++, name, email };
    users.push(user);
    res.status(201).json(user);
  });

  // Replace (PUT)
  app.put('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'User not found' });
    const { name, email } = req.body;
    users[index] = { id: users[index].id, name, email };
    res.json(users[index]);
  });

  // Delete
  app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'User not found' });
    users.splice(index, 1);
    res.sendStatus(204);
  });

INPUT VALIDATION
Always validate req.body before using it. Reject bad requests early with 400:

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'name must be a non-empty string' });
  }

CONSISTENT ERROR RESPONSES
Pick one error format and use it everywhere:

  { "error": "User not found" }
  { "error": "name is required", "field": "name" }

This makes it easy for clients to handle errors programmatically.

FILTERING AND PAGINATION
Real APIs often need filtering and pagination via query params:

  // GET /users?role=admin&page=2&limit=10
  app.get('/users', (req, res) => {
    const { role, page = 1, limit = 10 } = req.query;
    let result = users;
    if (role) result = result.filter(u => u.role === role);
    const start = (page - 1) * limit;
    res.json(result.slice(start, start + Number(limit)));
  });`,
      quiz: [
        {
          question: 'Which HTTP method and status code should a POST /users route return when it successfully creates a new user?',
          options: [
            '200 OK',
            '201 Created',
            '204 No Content',
            '202 Accepted',
          ],
          answer: 1,
        },
        {
          question: 'What is the correct status code for a successful DELETE operation?',
          options: [
            '200 OK with the deleted item in the response body',
            '201 Created',
            '204 No Content — success with no body',
            '404 Not Found',
          ],
          answer: 2,
        },
        {
          question: 'What is the difference between PUT and PATCH?',
          options: [
            'PUT updates a single field; PATCH replaces the whole resource',
            'PUT replaces the whole resource; PATCH updates only the supplied fields',
            'They are identical — either can be used for updates',
            'PUT is for creation; PATCH is for deletion',
          ],
          answer: 1,
        },
        {
          question: 'A client sends a POST request without a required "email" field. What status code should the server return?',
          options: [
            '200 OK — proceed with a default value',
            '400 Bad Request — the client sent invalid or incomplete data',
            '404 Not Found — the email address was not found',
            '500 Internal Server Error',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Add a PATCH /todos/:id route to update the "done" and/or "text" fields of a todo. Only update the fields that are present in req.body. Return 404 if the todo does not exist.',
        starterCode: `const express = require('express');
const app = express();
app.use(express.json());

let todos = [
  { id: 1, text: 'Learn Express', done: false },
  { id: 2, text: 'Build an API',  done: false },
];

app.get('/todos', (req, res) => res.json(todos));

// Add PATCH /todos/:id here
// - Find the todo by id (404 if not found)
// - If req.body.done is present, update todo.done
// - If req.body.text is present, update todo.text
// - Return the updated todo

app.listen(3000, () => console.log('Running'));`,
        solution: `const express = require('express');
const app = express();
app.use(express.json());

let todos = [
  { id: 1, text: 'Learn Express', done: false },
  { id: 2, text: 'Build an API',  done: false },
];

app.get('/todos', (req, res) => res.json(todos));

app.patch('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Not found' });

  if (req.body.done !== undefined) todo.done = req.body.done;
  if (req.body.text !== undefined) todo.text = req.body.text;

  res.json(todo);
});

app.listen(3000, () => console.log('Running'));`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 7 — MIDDLEWARE AND ERROR HANDLING
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'node-7',
      title: 'Lesson 7: Middleware and Error Handling',
      content: `Middleware is the engine of Express. Every request passes through a chain of functions before reaching a route handler, and each function can inspect or modify the request and response.

WHAT MIDDLEWARE IS
A middleware function has this signature:
  function myMiddleware(req, res, next) {
    // do something
    next();   // pass control to the next middleware or route
  }

If you do not call next(), the request hangs — no response is ever sent.

APPLYING MIDDLEWARE
  app.use(myMiddleware)             // runs for every request
  app.use('/api', myMiddleware)     // runs only for paths starting with /api
  app.get('/users', myMiddleware, routeHandler)  // runs only for this route

BUILT-IN EXPRESS MIDDLEWARE
  app.use(express.json())            // parse JSON bodies
  app.use(express.urlencoded(...))   // parse form bodies
  app.use(express.static('public'))  // serve static files

WRITING A REQUEST LOGGER
  function logger(req, res, next) {
    const now = new Date().toISOString();
    console.log(\`\${now} \${req.method} \${req.url}\`);
    next();
  }

  app.use(logger);

Now every request prints a line to the console before reaching any route.

AUTHENTICATION MIDDLEWARE
  function requireAuth(req, res, next) {
    const token = req.headers['authorization'];
    if (!token || token !== 'Bearer secret123') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = { id: 1, name: 'Alex' };  // attach data to req for later
    next();
  }

  app.get('/profile', requireAuth, (req, res) => {
    res.json(req.user);
  });

Middleware can attach data to req — all subsequent middleware and handlers see it.

ERROR-HANDLING MIDDLEWARE
Express recognises error-handling middleware by its FOUR arguments: (err, req, res, next).

  function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({
      error: err.message || 'Internal server error',
    });
  }

  // Must be registered AFTER all routes
  app.use(errorHandler);

To trigger it from a route, call next(err) with an error object:
  app.get('/users/:id', (req, res, next) => {
    const user = findUser(req.params.id);
    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      return next(err);
    }
    res.json(user);
  });

TRY/CATCH IN ASYNC ROUTES
async route handlers do not automatically send errors to next(). Wrap them:

  // Without wrapper — unhandled rejection, Express never sees the error
  app.get('/users', async (req, res) => {
    const users = await db.findAll();  // if this throws, Express hangs
    res.json(users);
  });

  // With wrapper — errors forwarded to error handler
  app.get('/users', async (req, res, next) => {
    try {
      const users = await db.findAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  });

A COMPLETE MIDDLEWARE STACK
  const express = require('express');
  const app = express();

  // 1. Parse JSON bodies
  app.use(express.json());

  // 2. Log every request
  app.use((req, res, next) => {
    console.log(\`\${req.method} \${req.url}\`);
    next();
  });

  // 3. Routes
  app.get('/users', async (req, res, next) => {
    try {
      res.json([{ id: 1, name: 'Alex' }]);
    } catch (err) {
      next(err);
    }
  });

  // 4. 404 handler — after all routes
  app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });

  // 5. Error handler — must be last and have 4 params
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
  });

  app.listen(3000);

The order is critical: middleware → routes → 404 → error handler.`,
      quiz: [
        {
          question: 'What happens if a middleware function does not call next()?',
          options: [
            'Express automatically moves to the next middleware',
            'The request hangs — no response is ever sent to the client',
            'Express throws an error and sends a 500 response',
            'The route handler runs anyway, ignoring the unfinished middleware',
          ],
          answer: 1,
        },
        {
          question: 'How does Express recognise an error-handling middleware?',
          options: [
            'You register it with app.error() instead of app.use()',
            'It must have exactly four parameters: (err, req, res, next)',
            'You pass { isErrorHandler: true } as an option',
            'Error handlers must be defined before routes',
          ],
          answer: 1,
        },
        {
          question: 'Why must async route handlers wrap their code in try/catch and call next(err)?',
          options: [
            'Express automatically catches async errors and forwards them',
            'Errors thrown in async functions are unhandled rejections — Express does not see them without explicit forwarding via next(err)',
            'try/catch is only needed for database operations',
            'async functions cannot be used as route handlers without a wrapper',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Add to an Express app: (1) a request logger middleware that prints the method and URL, (2) a route GET /secret that requires an "x-api-key: abc123" header and returns 401 if missing, (3) an error-handling middleware that returns { error: message } with the right status code.',
        starterCode: `const express = require('express');
const app = express();
app.use(express.json());

// 1. Logger middleware — log "\${req.method} \${req.url}" for every request

// 2. GET /secret — check req.headers['x-api-key'] === 'abc123'
//    Return 401 { error: 'Unauthorized' } if missing/wrong
//    Return 200 { secret: 'The answer is 42' } if correct

// 3. Error-handling middleware (4 params)
//    Return err.status (or 500) with { error: err.message }

app.listen(3000, () => console.log('Running on port 3000'));`,
        solution: `const express = require('express');
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
});

app.get('/secret', (req, res, next) => {
  if (req.headers['x-api-key'] !== 'abc123') {
    const err = new Error('Unauthorized');
    err.status = 401;
    return next(err);
  }
  res.json({ secret: 'The answer is 42' });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(3000, () => console.log('Running on port 3000'));`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 8 — JSON FILE AS A DATABASE
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'node-8',
      title: 'Lesson 8: Using a JSON File as a Simple Database',
      content: `For small projects and learning, a JSON file is a perfectly practical data store. It gives you persistence without installing a database, and the read/write pattern you learn here applies directly to real databases later.

THE PATTERN
  1. Read the JSON file from disk
  2. Parse it into a JavaScript array or object
  3. Perform your operation (add, update, delete)
  4. Stringify the updated data
  5. Write it back to disk

HELPER FUNCTIONS
Write two helper functions that every route will use:

  const fs   = require('fs').promises;
  const path = require('path');

  const DB_FILE = path.join(__dirname, 'data', 'users.json');

  async function readDB() {
    try {
      const raw = await fs.readFile(DB_FILE, 'utf8');
      return JSON.parse(raw);
    } catch {
      return [];   // file does not exist yet — start empty
    }
  }

  async function writeDB(data) {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  }

USING THE HELPERS IN ROUTES

  // GET all
  app.get('/users', async (req, res, next) => {
    try {
      const users = await readDB();
      res.json(users);
    } catch (err) { next(err); }
  });

  // POST — create
  app.post('/users', async (req, res, next) => {
    try {
      const users = await readDB();
      const { name, email } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: 'name and email required' });
      }
      const maxId = users.reduce((max, u) => Math.max(max, u.id), 0);
      const user  = { id: maxId + 1, name, email };
      users.push(user);
      await writeDB(users);
      res.status(201).json(user);
    } catch (err) { next(err); }
  });

  // PUT — replace
  app.put('/users/:id', async (req, res, next) => {
    try {
      const users = await readDB();
      const index = users.findIndex(u => u.id === Number(req.params.id));
      if (index === -1) return res.status(404).json({ error: 'Not found' });
      users[index] = { id: users[index].id, ...req.body };
      await writeDB(users);
      res.json(users[index]);
    } catch (err) { next(err); }
  });

  // DELETE
  app.delete('/users/:id', async (req, res, next) => {
    try {
      const users  = await readDB();
      const filtered = users.filter(u => u.id !== Number(req.params.id));
      if (filtered.length === users.length) {
        return res.status(404).json({ error: 'Not found' });
      }
      await writeDB(filtered);
      res.sendStatus(204);
    } catch (err) { next(err); }
  });

RACE CONDITIONS AND WHY THEY MATTER
A race condition happens when two requests arrive at the same time and both read the file before either writes back. The second write silently overwrites the first write's changes.

  Request A reads: [user1, user2]
  Request B reads: [user1, user2]
  Request A adds user3, writes: [user1, user2, user3]
  Request B adds user4, writes: [user1, user2, user4]  ← user3 is GONE

For a learning project this is acceptable. In production, use a real database — databases handle concurrent writes safely with transactions and locking.

INITIALISING THE DATABASE FILE
Create the data directory and an empty JSON file at startup:

  async function initDB() {
    const dir = path.dirname(DB_FILE);
    await fs.mkdir(dir, { recursive: true });
    try {
      await fs.access(DB_FILE);
    } catch {
      await fs.writeFile(DB_FILE, '[]', 'utf8');
    }
  }

  initDB().then(() => {
    app.listen(3000, () => console.log('Server started'));
  });

WHEN TO GRADUATE TO A REAL DATABASE
Use a JSON file when:
  - You are learning and want to focus on the API layer
  - The dataset is small (hundreds of records)
  - You have no concurrent writes (single-user tool)

Use a real database (SQLite, PostgreSQL, MongoDB) when:
  - Multiple users write data simultaneously
  - You need queries, filtering, or sorting at scale
  - Data integrity and transactions matter

SQLite is a great first "real" database — it is a file on disk (like your JSON approach) but handles concurrency safely.`,
      quiz: [
        {
          question: 'What does the readDB() helper do if the JSON file does not exist yet?',
          options: [
            'It throws an error and crashes the server',
            'It returns an empty array, allowing the app to start fresh without a pre-created file',
            'It creates the file automatically with a default dataset',
            'It returns null, which the caller must check for',
          ],
          answer: 1,
        },
        {
          question: 'What is a race condition in the context of a JSON file database?',
          options: [
            'When a file takes too long to read and the request times out',
            'When two concurrent requests both read the file before either writes back, so the second write overwrites the first write\'s changes',
            'When the JSON file becomes too large to parse quickly',
            'When the file is locked by the operating system',
          ],
          answer: 1,
        },
        {
          question: 'Why should you use JSON.stringify(data, null, 2) when writing to a database file?',
          options: [
            'It is required for JSON.parse() to work correctly',
            'The 2-space indentation makes the file human-readable, which helps when debugging',
            'It compresses the data to save disk space',
            'It adds a checksum to detect file corruption',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Build a complete persistent Express API for a "notes" resource stored in a JSON file. Support: GET /notes (list all), POST /notes (create with title and body), DELETE /notes/:id. Auto-generate IDs.',
        starterCode: `const express = require('express');
const fs      = require('fs').promises;
const path    = require('path');

const app     = express();
app.use(express.json());

const DB_FILE = path.join(__dirname, 'notes.json');

// Implement readDB() and writeDB()

// Implement initDB() to create the file if it does not exist

// GET    /notes      — return all notes
// POST   /notes      — create a note (requires title and body)
// DELETE /notes/:id  — delete by id, 404 if not found

// Error handler

// Start server after initialising DB
`,
        solution: `const express = require('express');
const fs      = require('fs').promises;
const path    = require('path');

const app     = express();
app.use(express.json());

const DB_FILE = path.join(__dirname, 'notes.json');

async function readDB() {
  try {
    return JSON.parse(await fs.readFile(DB_FILE, 'utf8'));
  } catch {
    return [];
  }
}

async function writeDB(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

async function initDB() {
  try { await fs.access(DB_FILE); }
  catch { await writeDB([]); }
}

app.get('/notes', async (req, res, next) => {
  try { res.json(await readDB()); }
  catch (err) { next(err); }
});

app.post('/notes', async (req, res, next) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) return res.status(400).json({ error: 'title and body required' });
    const notes = await readDB();
    const maxId = notes.reduce((m, n) => Math.max(m, n.id), 0);
    const note  = { id: maxId + 1, title, body };
    notes.push(note);
    await writeDB(notes);
    res.status(201).json(note);
  } catch (err) { next(err); }
});

app.delete('/notes/:id', async (req, res, next) => {
  try {
    const notes    = await readDB();
    const filtered = notes.filter(n => n.id !== Number(req.params.id));
    if (filtered.length === notes.length) return res.status(404).json({ error: 'Not found' });
    await writeDB(filtered);
    res.sendStatus(204);
  } catch (err) { next(err); }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

initDB().then(() => app.listen(3000, () => console.log('Notes API on port 3000')));`,
      },
    },
  ],
};

window.nodejsModule = nodejsModule;
