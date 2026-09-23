'use strict';

const typescriptModule = {
  id: 'typescript',
  title: 'TypeScript',
  description: 'TypeScript is JavaScript with a type system — it adds static types to JavaScript so that errors are caught before the code ever runs. This module takes you from your first TypeScript file all the way to generics, tooling, and converting an existing JavaScript project.',
  objectives: [
    'Understand what TypeScript is and why it exists',
    'Use the basic types: string, number, boolean, array, and object',
    'Define interfaces and type aliases to shape data',
    'Write typed functions with parameter and return types',
    'Use union types, optional properties, and type narrowing',
    'Understand generics and write reusable typed code',
    'Configure TypeScript with tsconfig.json',
    'Convert a small JavaScript project to TypeScript',
  ],
  goals: [
    'Write a TypeScript file, compile it, and run it',
    'Define an interface and use it to type a function parameter',
    'Write a generic function that works with multiple types',
    'Configure a tsconfig.json for a web project',
    'Identify a category of runtime bug that TypeScript would have caught at compile time',
  ],
  lessons: [
    // ─────────────────────────────────────────────────────────────────
    // LESSON 1 — WHAT IS TYPESCRIPT?
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'ts-1',
      title: 'Lesson 1: What Is TypeScript and Why Use It?',
      content: `TypeScript is a programming language created by Microsoft. It is a superset of JavaScript — meaning all valid JavaScript is also valid TypeScript. TypeScript adds one major feature on top: a static type system.

THE PROBLEM TYPESCRIPT SOLVES
JavaScript is a dynamically typed language. You can write:

  let x = 42;
  x = "hello";    // no error — JavaScript allows this
  x.toFixed(2);   // RUNTIME ERROR: x is now a string

JavaScript does not check types until the code actually runs. This means type errors can reach production undetected.

TypeScript adds type checking BEFORE the code runs:

  let x: number = 42;
  x = "hello";    // TypeScript ERROR at compile time: string is not assignable to number

HOW TYPESCRIPT WORKS
TypeScript is a COMPILED language. You write .ts files -> run the TypeScript compiler -> it produces .js files that browsers and Node.js can run.

  your-code.ts  ->  [TypeScript Compiler (tsc)]  ->  your-code.js

The TypeScript compiler also performs type checking during compilation. If it finds type errors, it warns you before the code runs.

INSTALLING TYPESCRIPT
Install via npm (requires Node.js):

  npm install -g typescript

Verify installation:
  tsc --version

Compile a TypeScript file:
  tsc myfile.ts

Watch mode (recompiles on save):
  tsc --watch

YOUR FIRST TYPESCRIPT FILE
Create hello.ts:

  function greet(name: string): string {
    return "Hello, " + name;
  }

  console.log(greet("CodeMaster"));

Compile and run:
  tsc hello.ts
  node hello.js

WHY TYPESCRIPT IS WORTH IT
Benefits:
  1. Catches errors at compile time instead of runtime
  2. Provides excellent autocomplete in editors (VS Code uses TypeScript internally)
  3. Makes code self-documenting — types describe what data is expected
  4. Essential for large codebases where tracking data shapes manually is impossible

Trade-offs:
  - Adds a compilation step
  - Requires learning the type syntax
  - Can feel verbose in small scripts

Most professional JavaScript projects — React apps, Node.js APIs, Electron apps — now use TypeScript.`,
      quiz: [
        {
          question: 'TypeScript is best described as:',
          options: [
            'A completely different language that replaces JavaScript',
            'A superset of JavaScript that adds a static type system',
            'A JavaScript framework like React or Vue',
            'A runtime that makes JavaScript faster',
          ],
          answer: 'A superset of JavaScript that adds a static type system',
        },
        {
          question: 'When does TypeScript catch type errors?',
          options: [
            'When the code runs in the browser',
            'When you upload code to GitHub',
            'At compile time, before the code runs',
            'TypeScript does not catch errors — it just adds documentation',
          ],
          answer: 'At compile time, before the code runs',
        },
        {
          question: 'What does the TypeScript compiler (tsc) produce?',
          options: [
            'A .ts file with type annotations removed',
            'A .js file that browsers and Node.js can run',
            'A .tsx file for use with React',
            'A binary executable file',
          ],
          answer: 'A .js file that browsers and Node.js can run',
        },
      ],
      exercise: {
        prompt: 'Write a TypeScript function called "formatName" that takes a firstName (string) and lastName (string) and returns the full name as a string. Add explicit type annotations on the parameters and return type.',
        starterCode: `// Write a typed function called formatName

function formatName(/* add parameters with types here */)/* add return type */ {
  // return the full name as "firstName lastName"
}

console.log(formatName("Ada", "Lovelace")); // should print: Ada Lovelace`,
        solution: `function formatName(firstName: string, lastName: string): string {
  return firstName + " " + lastName;
}

console.log(formatName("Ada", "Lovelace")); // Ada Lovelace`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 2 — BASIC TYPES
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'ts-2',
      title: 'Lesson 2: Basic Types',
      content: `TypeScript provides a set of built-in types that map closely to JavaScript's primitive values, plus several extras.

PRIMITIVE TYPES

  let username: string = "ada";
  let age: number = 36;
  let isActive: boolean = true;

These are the three most common types. They match JavaScript's primitive types.

ARRAYS
Two equivalent syntaxes:

  let scores: number[] = [98, 87, 92];
  let scores: Array<number> = [98, 87, 92];

A string array:
  let tags: string[] = ["html", "css", "typescript"];

TUPLES
A tuple is an array with a fixed number of elements where each position has a known type:

  let coordinate: [number, number] = [40.7128, -74.0060];
  let person: [string, number] = ["Ada", 36];

ANY
The any type disables type checking for a variable:

  let data: any = 42;
  data = "now a string";   // no error
  data = true;             // no error

Avoid any whenever possible — it defeats the purpose of TypeScript. Use it only when working with genuinely dynamic data (like untyped third-party libraries).

UNKNOWN
unknown is the safer alternative to any. It accepts any value but requires you to check the type before using it:

  let input: unknown = getUserInput();

  if (typeof input === "string") {
    console.log(input.toUpperCase());  // safe — TypeScript knows it is a string here
  }

VOID AND NEVER
void — for functions that do not return a value:

  function announce(message: string): void {
    console.log(message);
    // no return statement
  }

never — for functions that never complete (throw an error or run forever):

  function fail(message: string): never {
    throw new Error(message);
  }

TYPE INFERENCE
TypeScript can often infer the type without you writing it explicitly:

  let count = 0;       // TypeScript infers: number
  let name = "Ada";    // TypeScript infers: string

You only need to write explicit types when TypeScript cannot infer them (function parameters, complex data shapes).`,
      quiz: [
        {
          question: 'What is the problem with using "any" in TypeScript?',
          options: [
            'It causes a compile error because "any" is not a valid type',
            'It disables type checking for that variable, defeating TypeScript\'s purpose',
            'It makes the code run slower at runtime',
            'It only works with primitive values, not objects',
          ],
          answer: 'It disables type checking for that variable, defeating TypeScript\'s purpose',
        },
        {
          question: 'What is the difference between "any" and "unknown"?',
          options: [
            'They are identical — both accept any value',
            '"unknown" requires you to check the type before using the value; "any" does not',
            '"any" is for variables; "unknown" is for function return types only',
            '"unknown" is deprecated — use "any" instead',
          ],
          answer: '"unknown" requires you to check the type before using the value; "any" does not',
        },
        {
          question: 'What does TypeScript infer as the type of "let score = 100"?',
          options: [
            'any',
            'unknown',
            'number',
            'integer',
          ],
          answer: 'number',
        },
        {
          question: 'Which of the following correctly declares a tuple for a [name, age] pair?',
          options: [
            'let person: (string, number) = ["Ada", 36];',
            'let person: [string, number] = ["Ada", 36];',
            'let person: Array<string, number> = ["Ada", 36];',
            'let person: {string, number} = ["Ada", 36];',
          ],
          answer: 'let person: [string, number] = ["Ada", 36];',
        },
      ],
      exercise: {
        prompt: 'Declare four variables with explicit TypeScript types: a user\'s name (string), their score (number), whether they are logged in (boolean), and an array of their completed lesson IDs (numbers).',
        starterCode: `// Declare four typed variables

// 1. User's name:

// 2. User's score:

// 3. Whether they are logged in:

// 4. Array of completed lesson IDs (numbers):`,
        solution: `// 1. User's name:
let userName: string = "Ada Lovelace";

// 2. User's score:
let score: number = 950;

// 3. Whether they are logged in:
let isLoggedIn: boolean = true;

// 4. Array of completed lesson IDs:
let completedLessons: number[] = [1, 2, 3, 5, 8];`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 3 — INTERFACES AND TYPE ALIASES
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'ts-3',
      title: 'Lesson 3: Interfaces and Type Aliases',
      content: `When your data has structure — objects with multiple properties — you need interfaces or type aliases to describe that shape.

INTERFACES
An interface describes the shape of an object:

  interface User {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
  }

Now you can type variables, parameters, and return values with this shape:

  function greetUser(user: User): string {
    return "Hello, " + user.name;
  }

  const ada: User = {
    id: 1,
    name: "Ada Lovelace",
    email: "ada@example.com",
    isAdmin: false,
  };

If you forget a required property or add an extra one TypeScript does not know about, you get an error.

OPTIONAL PROPERTIES
Add a ? to make a property optional:

  interface User {
    id: number;
    name: string;
    email: string;
    avatarUrl?: string;   // optional — may or may not be present
  }

READONLY PROPERTIES
Mark a property as readonly to prevent it from being changed after creation:

  interface Point {
    readonly x: number;
    readonly y: number;
  }

  const origin: Point = { x: 0, y: 0 };
  origin.x = 5;   // TypeScript ERROR: cannot assign to readonly property

TYPE ALIASES
A type alias creates a name for any type — not just objects:

  type ID = number | string;
  type Status = "pending" | "active" | "closed";

  function getUser(id: ID): User { ... }

Type aliases can also describe object shapes, just like interfaces:

  type Point = {
    x: number;
    y: number;
  };

INTERFACE VS TYPE ALIAS — WHEN TO USE WHICH
In most cases they are interchangeable. The common convention:
  - Use interface for objects and classes (especially when you expect them to be extended)
  - Use type for primitives, unions, intersections, and complex type expressions

  type Status = "open" | "closed";        // type alias — best for unions
  interface ApiResponse { data: User[] }  // interface — best for objects`,
      quiz: [
        {
          question: 'What is the purpose of a TypeScript interface?',
          options: [
            'To create a class with predefined methods',
            'To describe the shape of an object — what properties it has and their types',
            'To import functions from another module',
            'To define a variable that can hold multiple types',
          ],
          answer: 'To describe the shape of an object — what properties it has and their types',
        },
        {
          question: 'How do you mark a property as optional in a TypeScript interface?',
          options: [
            'Add an exclamation mark: name!: string',
            'Add a question mark: name?: string',
            'Use the optional keyword: optional name: string',
            'Wrap it in square brackets: [name]: string',
          ],
          answer: 'Add a question mark: name?: string',
        },
        {
          question: 'Which is the BEST use case for a type alias instead of an interface?',
          options: [
            'Describing the shape of an API response object',
            'A union type like "pending" | "active" | "closed"',
            'Extending another interface with additional properties',
            'Defining the properties of a React component',
          ],
          answer: 'A union type like "pending" | "active" | "closed"',
        },
      ],
      exercise: {
        prompt: 'Define an interface called "Lesson" with: an id (number), a title (string), a content (string), a completed status (boolean), and an optional durationMinutes (number). Then create a variable of that type.',
        starterCode: `// Define the Lesson interface

interface Lesson {
  // add properties here
}

// Create a Lesson object
const firstLesson: Lesson = {
  // fill in the values
};`,
        solution: `interface Lesson {
  id: number;
  title: string;
  content: string;
  completed: boolean;
  durationMinutes?: number;
}

const firstLesson: Lesson = {
  id: 1,
  title: "What Is TypeScript?",
  content: "TypeScript adds types to JavaScript...",
  completed: true,
  durationMinutes: 15,
};`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 4 — FUNCTIONS WITH TYPES
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'ts-4',
      title: 'Lesson 4: Typed Functions',
      content: `TypeScript brings full type safety to functions — parameter types, return types, optional parameters, default values, and overloads.

PARAMETER AND RETURN TYPES
  function add(a: number, b: number): number {
    return a + b;
  }

  function greet(name: string): string {
    return "Hello, " + name;
  }

  function logMessage(message: string): void {
    console.log(message);
  }

OPTIONAL PARAMETERS
Use ? to make a parameter optional. Optional parameters must come AFTER required ones:

  function greet(name: string, title?: string): string {
    if (title) return title + " " + name;
    return "Hello, " + name;
  }

  greet("Ada");              // "Hello, Ada"
  greet("Ada", "Dr.");       // "Dr. Ada"

DEFAULT PARAMETERS
  function createUser(name: string, role: string = "student"): string {
    return name + " (" + role + ")";
  }

  createUser("Ada");          // "Ada (student)"
  createUser("Grace", "admin"); // "Grace (admin)"

REST PARAMETERS
  function sum(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0);
  }

  sum(1, 2, 3, 4);    // 10

FUNCTION TYPE SIGNATURES
You can define the TYPE of a function as a variable:

  type Formatter = (value: string) => string;

  const toUpperCase: Formatter = (s) => s.toUpperCase();
  const trim: Formatter = (s) => s.trim();

This is useful for callbacks and higher-order functions:

  function processAll(items: string[], format: Formatter): string[] {
    return items.map(format);
  }

ARROW FUNCTIONS
TypeScript types work identically with arrow functions:

  const multiply = (a: number, b: number): number => a * b;`,
      quiz: [
        {
          question: 'A function that does not return a value should have which return type?',
          options: [
            'null',
            'undefined',
            'void',
            'never',
          ],
          answer: 'void',
        },
        {
          question: 'Where must optional parameters appear in a function signature?',
          options: [
            'Before required parameters',
            'After required parameters',
            'They can appear anywhere',
            'Optional parameters are not allowed in TypeScript',
          ],
          answer: 'After required parameters',
        },
        {
          question: 'What does this type alias describe: type Handler = (event: string) => void',
          options: [
            'An object with an event property and a void property',
            'A function that takes a string parameter and returns nothing',
            'A variable that can be either a string or void',
            'A class that handles events',
          ],
          answer: 'A function that takes a string parameter and returns nothing',
        },
      ],
      exercise: {
        prompt: 'Write a typed function "calculateDiscount" that takes a price (number) and an optional discountPercent (number, defaulting to 10). It should return the discounted price as a number.',
        starterCode: `// Write the calculateDiscount function with TypeScript types

function calculateDiscount(/* parameters */): /* return type */ {
  // Calculate the discounted price
  // discount formula: price - (price * discountPercent / 100)
}

console.log(calculateDiscount(100));      // should return 90
console.log(calculateDiscount(100, 20));  // should return 80`,
        solution: `function calculateDiscount(price: number, discountPercent: number = 10): number {
  return price - (price * discountPercent / 100);
}

console.log(calculateDiscount(100));      // 90
console.log(calculateDiscount(100, 20));  // 80`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 5 — UNION TYPES AND TYPE NARROWING
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'ts-5',
      title: 'Lesson 5: Union Types, Literal Types, and Type Narrowing',
      content: `Real-world data is not always a single type. TypeScript's union types and type narrowing let you handle values that can be one of several types safely.

UNION TYPES
A union type allows a value to be one of several types:

  let id: number | string;
  id = 42;         // valid
  id = "abc-123";  // also valid
  id = true;       // ERROR — boolean is not in the union

LITERAL TYPES
You can restrict a value to specific literal values:

  type Direction = "north" | "south" | "east" | "west";
  type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
  type Rating = 1 | 2 | 3 | 4 | 5;

  function move(direction: Direction): void {
    console.log("Moving " + direction);
  }

  move("north");    // valid
  move("up");       // ERROR — "up" is not a valid Direction

TYPE NARROWING
When a value can be multiple types, you must narrow it before using type-specific methods. TypeScript tracks the narrowing through control flow.

Using typeof:
  function formatId(id: number | string): string {
    if (typeof id === "string") {
      return id.toUpperCase();   // TypeScript knows id is a string here
    }
    return id.toFixed(0);        // TypeScript knows id is a number here
  }

Using in (checking for object properties):
  interface Cat { meow(): void }
  interface Dog { bark(): void }

  function makeSound(animal: Cat | Dog): void {
    if ("meow" in animal) {
      animal.meow();   // TypeScript knows it's a Cat
    } else {
      animal.bark();   // TypeScript knows it's a Dog
    }
  }

Using instanceof:
  function processDate(value: Date | string): string {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value;
  }

NULLABILITY — null AND undefined
By default (with strict null checks enabled), null and undefined are not assignable to other types:

  let name: string = null;    // ERROR in strict mode

Use union types to allow null:
  let name: string | null = null;    // valid

The optional chaining operator (?.) is useful with nullable values:
  const length = name?.length;   // undefined if name is null, number otherwise`,
      quiz: [
        {
          question: 'What does a union type like "number | string" mean?',
          options: [
            'A value that must be both a number and a string simultaneously',
            'A value that can be either a number or a string',
            'A function that accepts numbers and returns strings',
            'An array containing numbers and strings',
          ],
          answer: 'A value that can be either a number or a string',
        },
        {
          question: 'You have a parameter typed as "string | number". Inside the function, you want to call .toUpperCase(). What must you do first?',
          options: [
            'Cast it to string using (value as string)',
            'Narrow the type using typeof to confirm it is a string',
            'Nothing — TypeScript automatically knows which type to use',
            'Declare the parameter as "any" to bypass the restriction',
          ],
          answer: 'Narrow the type using typeof to confirm it is a string',
        },
        {
          question: 'What is a literal type?',
          options: [
            'A type that describes the exact content of a file literally',
            'A type restricted to specific exact values, like "GET" | "POST"',
            'A string type that is displayed literally in console output',
            'A type alias defined with the "literal" keyword',
          ],
          answer: 'A type restricted to specific exact values, like "GET" | "POST"',
        },
      ],
      exercise: {
        prompt: 'Write a function "describe" that accepts a value typed as string | number | boolean and returns a string description. Use type narrowing to handle each case differently.',
        starterCode: `// Write the describe function using type narrowing

function describe(value: string | number | boolean): string {
  // Handle each type with typeof narrowing
  // string: return 'Text: ' + value
  // number: return 'Number: ' + value.toFixed(2)
  // boolean: return value ? 'Yes' : 'No'
}

console.log(describe("hello"));  // Text: hello
console.log(describe(3.14159));  // Number: 3.14
console.log(describe(true));     // Yes`,
        solution: `function describe(value: string | number | boolean): string {
  if (typeof value === "string") {
    return "Text: " + value;
  }
  if (typeof value === "number") {
    return "Number: " + value.toFixed(2);
  }
  return value ? "Yes" : "No";
}

console.log(describe("hello"));  // Text: hello
console.log(describe(3.14159));  // Number: 3.14
console.log(describe(true));     // Yes`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 6 — GENERICS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'ts-6',
      title: 'Lesson 6: Generics — Reusable Typed Code',
      content: `Generics are TypeScript's way of writing code that works with multiple types while still being fully type-safe. They are one of TypeScript's most powerful features.

THE PROBLEM GENERICS SOLVE
Suppose you want a function that returns the first element of any array:

WITHOUT generics (using any):
  function first(arr: any[]): any {
    return arr[0];
  }
  const n = first([1, 2, 3]);   // TypeScript thinks n is "any" — no type safety

WITH generics:
  function first<T>(arr: T[]): T {
    return arr[0];
  }
  const n = first([1, 2, 3]);      // TypeScript knows n is number
  const s = first(["a", "b"]);     // TypeScript knows s is string

<T> is a type parameter — a placeholder that TypeScript fills in based on what you pass.

GENERIC SYNTAX
The <T> can be named anything (T, U, V, K, V are conventions):

  function identity<T>(value: T): T {
    return value;
  }

Multiple type parameters:
  function pair<K, V>(key: K, value: V): [K, V] {
    return [key, value];
  }

  const result = pair("name", 42);   // [string, number]

GENERIC INTERFACES
  interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
  }

  const userResponse: ApiResponse<User> = {
    data: { id: 1, name: "Ada", email: "ada@test.com", isAdmin: false },
    status: 200,
    message: "success",
  };

  const listResponse: ApiResponse<User[]> = { ... };

GENERIC CONSTRAINTS
You can constrain what types T can be using extends:

  interface HasLength {
    length: number;
  }

  function getLength<T extends HasLength>(item: T): number {
    return item.length;
  }

  getLength("hello");          // 5 (strings have .length)
  getLength([1, 2, 3]);        // 3 (arrays have .length)
  getLength(42);               // ERROR — numbers have no .length

BUILT-IN GENERIC TYPES
TypeScript's standard library uses generics everywhere:

  Array<T>           — an array of T
  Promise<T>         — a Promise that resolves to T
  Map<K, V>          — a Map with keys K and values V
  Set<T>             — a Set of T values
  Partial<T>         — makes all properties of T optional
  Required<T>        — makes all properties of T required
  Readonly<T>        — makes all properties of T readonly`,
      quiz: [
        {
          question: 'What is the purpose of generics in TypeScript?',
          options: [
            'To allow a function to accept any type without type checking',
            'To write reusable code that works with multiple types while maintaining type safety',
            'To generate TypeScript code from JavaScript automatically',
            'To create generic error messages for type violations',
          ],
          answer: 'To write reusable code that works with multiple types while maintaining type safety',
        },
        {
          question: 'Given: function wrap<T>(value: T): T[] — what does TypeScript infer as the return type of wrap(42)?',
          options: [
            'any[]',
            'unknown[]',
            'number[]',
            'T[]',
          ],
          answer: 'number[]',
        },
        {
          question: 'What does "extends" do in a generic constraint like <T extends HasLength>?',
          options: [
            'T must be a subclass of HasLength',
            'T must have at least the properties defined by HasLength',
            'T extends all properties of HasLength to the caller',
            'HasLength extends the generic type T',
          ],
          answer: 'T must have at least the properties defined by HasLength',
        },
      ],
      exercise: {
        prompt: 'Write a generic function "getProperty" that takes an object of type T and a key of type K (where K extends keyof T) and returns the property value. This is a real TypeScript utility pattern.',
        starterCode: `// Write a generic getProperty function

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  // return the value at obj[key]
}

const user = { id: 1, name: "Ada", email: "ada@test.com" };

console.log(getProperty(user, "name"));   // Ada
console.log(getProperty(user, "id"));     // 1
// getProperty(user, "age");  // should be a TypeScript error — "age" does not exist on user`,
        solution: `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Ada", email: "ada@test.com" };

console.log(getProperty(user, "name"));   // Ada
console.log(getProperty(user, "id"));     // 1`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 7 — TSCONFIG
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'ts-7',
      title: 'Lesson 7: tsconfig.json — Configuring TypeScript',
      content: `The tsconfig.json file tells the TypeScript compiler how to behave. Understanding it is essential for real project setup.

CREATING A TSCONFIG
Generate a default tsconfig:
  tsc --init

This creates a tsconfig.json with all options commented out and sensible defaults.

KEY OPTIONS

TARGET — which JavaScript version to compile to:
  "target": "ES2020"
  Options: "ES5", "ES6"/"ES2015", "ES2020", "ESNext"
  Newer targets produce cleaner output but require modern browsers/Node.

MODULE — which module system to use:
  "module": "CommonJS"     // for Node.js
  "module": "ESNext"       // for modern browsers and bundlers

OUTDIR — where compiled .js files go:
  "outDir": "./dist"

ROOTDIR — where your .ts source files are:
  "rootDir": "./src"

STRICT — enables all strict type-checking options at once (HIGHLY RECOMMENDED):
  "strict": true

What "strict": true enables:
  - strictNullChecks: null and undefined are not assignable to other types
  - strictFunctionTypes: stricter checking of function types
  - noImplicitAny: error if TypeScript cannot infer a type (forces you to be explicit)
  - and more

INCLUDE AND EXCLUDE
Control which files the compiler processes:

  "include": ["src/**/*"]
  "exclude": ["node_modules", "dist", "tests"]

A TYPICAL WEB PROJECT TSCONFIG
  {
    "compilerOptions": {
      "target": "ES2020",
      "module": "ESNext",
      "moduleResolution": "bundler",
      "outDir": "./dist",
      "rootDir": "./src",
      "strict": true,
      "sourceMap": true,
      "declaration": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules"]
  }

sourceMap: true — generates .map files so browser devtools show your TypeScript source instead of compiled JS
declaration: true — generates .d.ts type declaration files (needed if you are publishing a library)

RUNNING WITH TSCONFIG
Simply run tsc with no arguments — it reads tsconfig.json automatically:
  tsc

Watch mode (recompiles on every save):
  tsc --watch`,
      quiz: [
        {
          question: 'What does setting "strict": true in tsconfig.json do?',
          options: [
            'Makes the compiler produce errors for any type of mistake, including style issues',
            'Enables all strict type-checking options including strictNullChecks and noImplicitAny',
            'Prevents the compiled JavaScript from running in non-strict browsers',
            'Makes all properties of all interfaces required',
          ],
          answer: 'Enables all strict type-checking options including strictNullChecks and noImplicitAny',
        },
        {
          question: 'What does the "outDir" option control?',
          options: [
            'The folder where your TypeScript source files are located',
            'The folder where compiled JavaScript files are placed',
            'The folder TypeScript searches for node_modules',
            'The output directory for generated documentation',
          ],
          answer: 'The folder where compiled JavaScript files are placed',
        },
        {
          question: 'How do you run the TypeScript compiler using tsconfig.json settings?',
          options: [
            'tsc --config tsconfig.json',
            'tsc --use-tsconfig',
            'tsc (with no arguments — it reads tsconfig.json automatically)',
            'npm run tsc',
          ],
          answer: 'tsc (with no arguments — it reads tsconfig.json automatically)',
        },
      ],
      exercise: {
        prompt: 'Write a tsconfig.json for a Node.js API project. It should: compile to ES2020, use CommonJS modules, output to a "dist" folder, read source from "src", and enable strict mode.',
        starterCode: `// Write a tsconfig.json for a Node.js API project
{
  "compilerOptions": {

  },
  "include": [],
  "exclude": []
}`,
        solution: `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 8 — ENUMS AND ADVANCED TYPES
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'ts-8',
      title: 'Lesson 8: Enums, Intersection Types, and Utility Types',
      content: `This lesson covers enums, combining types with intersections, and the built-in utility types that TypeScript provides for common transformations.

ENUMS
An enum defines a set of named constants:

  enum Direction {
    North,
    South,
    East,
    West,
  }

  let heading: Direction = Direction.North;

By default, enum values are numbers starting at 0. You can set custom values:

  enum StatusCode {
    OK = 200,
    NotFound = 404,
    InternalError = 500,
  }

String enums (more readable in debugging):
  enum Role {
    Admin = "ADMIN",
    User = "USER",
    Guest = "GUEST",
  }

When to use enums vs literal types:
  - Enums: when the value needs to be used as a runtime value (logging, switch statements)
  - Literal union types: when you only need compile-time type checking

INTERSECTION TYPES
An intersection type combines multiple types into one:

  interface Person {
    name: string;
    age: number;
  }

  interface Employee {
    employeeId: string;
    department: string;
  }

  type StaffMember = Person & Employee;

  const staff: StaffMember = {
    name: "Ada",
    age: 36,
    employeeId: "E001",
    department: "Engineering",
  };

BUILT-IN UTILITY TYPES

Partial<T> — makes all properties optional:
  type PartialUser = Partial<User>;
  // all User properties are now optional

Required<T> — makes all properties required:
  type RequiredUser = Required<PartialUser>;

Readonly<T> — makes all properties readonly:
  type ReadonlyUser = Readonly<User>;

Pick<T, K> — creates a type with only the specified properties:
  type UserPreview = Pick<User, "id" | "name">;
  // only has id and name, not email or isAdmin

Omit<T, K> — creates a type WITHOUT the specified properties:
  type PublicUser = Omit<User, "isAdmin">;
  // everything except isAdmin

Record<K, V> — creates an object type with keys K and values V:
  type PageMap = Record<string, number>;
  const views: PageMap = { home: 1200, about: 340, contact: 89 };`,
      quiz: [
        {
          question: 'What does Partial<User> do?',
          options: [
            'Creates a new User object with some properties removed',
            'Makes all properties of User optional',
            'Picks only the first half of User\'s properties',
            'Creates a partial implementation of the User interface',
          ],
          answer: 'Makes all properties of User optional',
        },
        {
          question: 'What is the result of type StaffMember = Person & Employee?',
          options: [
            'A type that is either a Person or an Employee',
            'A type that has all properties from both Person and Employee',
            'A type that inherits from Person and overrides Employee',
            'A type with only the properties shared between Person and Employee',
          ],
          answer: 'A type that has all properties from both Person and Employee',
        },
        {
          question: 'When would you use Omit<User, "password"> instead of Pick?',
          options: [
            'When you want to include most of User\'s properties but exclude specific ones',
            'When you want to select only the "password" property',
            'When "password" needs to be made optional rather than removed',
            'Omit and Pick are identical — they are aliases for the same utility',
          ],
          answer: 'When you want to include most of User\'s properties but exclude specific ones',
        },
      ],
      exercise: {
        prompt: 'Using the User interface from Lesson 3, create three derived types: (1) a PublicUser that omits "isAdmin", (2) a UserSummary that picks only "id" and "name", and (3) a DraftUser where all fields are optional.',
        starterCode: `// Assume this interface exists:
interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

// 1. PublicUser — omit the isAdmin field:
type PublicUser =

// 2. UserSummary — pick only id and name:
type UserSummary =

// 3. DraftUser — all fields optional (for form state):
type DraftUser =`,
        solution: `interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

// 1. PublicUser:
type PublicUser = Omit<User, "isAdmin">;

// 2. UserSummary:
type UserSummary = Pick<User, "id" | "name">;

// 3. DraftUser:
type DraftUser = Partial<User>;`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 9 — CONVERTING JS TO TS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'ts-9',
      title: 'Lesson 9: Converting a JavaScript Project to TypeScript',
      content: `One of the most common TypeScript tasks is migrating an existing JavaScript project. TypeScript is designed to make this gradual and low-risk.

THE MIGRATION STRATEGY
The safest approach is to migrate incrementally — not all at once:

1. Add TypeScript tooling
2. Rename files from .js to .ts one at a time
3. Fix type errors as they appear
4. Gradually enable stricter checks

STEP 1: INSTALL TYPESCRIPT
  npm install --save-dev typescript

STEP 2: CREATE A LENIENT tsconfig.json
Start with a permissive config to minimise initial errors:

  {
    "compilerOptions": {
      "target": "ES2020",
      "module": "CommonJS",
      "outDir": "./dist",
      "strict": false,           <- start permissive
      "allowJs": true,           <- allow .js files alongside .ts
      "checkJs": false,          <- do not type-check .js files yet
      "noImplicitAny": false
    },
    "include": ["src/**/*"]
  }

STEP 3: RENAME FILES .js -> .ts
Start with utility functions and data models — they have no browser or framework dependencies and are easiest to migrate.

Add types to function parameters and return values. Start with the most critical files.

STEP 4: FIX ERRORS PROGRESSIVELY
TypeScript will flag issues. Common ones:

IMPLICIT ANY:
  function process(data) { ... }  // TypeScript: parameter 'data' implicitly has an 'any' type
  Fix: function process(data: string) { ... }

NULL CHECKS:
  const element = document.getElementById("app");
  element.innerHTML = "...";  // Error: element may be null
  Fix: element!.innerHTML = "..."  (if you are certain it exists)
  Or:  if (element) { element.innerHTML = "..."; }

TYPE ASSERTIONS:
  const input = document.getElementById("name") as HTMLInputElement;
  input.value;   // TypeScript now knows this is an input element

STEP 5: TIGHTEN GRADUALLY
Once the main files are migrated, enable stricter settings one by one:
  "noImplicitAny": true
  "strict": true

COMMON PATTERNS WHEN ADDING TYPES
DOM elements:
  const btn = document.querySelector(".submit-btn") as HTMLButtonElement;
  const input = document.getElementById("username") as HTMLInputElement;

Event handlers:
  btn.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
  });

API responses:
  interface ApiUser { id: number; name: string; }
  const response = await fetch("/api/user");
  const user: ApiUser = await response.json();`,
      quiz: [
        {
          question: 'What is the recommended strategy for migrating a large JavaScript project to TypeScript?',
          options: [
            'Convert all files to .ts at once and fix all errors before running anything',
            'Migrate incrementally — one file at a time, starting permissive and tightening gradually',
            'Rewrite the project from scratch using TypeScript',
            'Use a tool that automatically adds types to all files simultaneously',
          ],
          answer: 'Migrate incrementally — one file at a time, starting permissive and tightening gradually',
        },
        {
          question: 'What does setting "allowJs": true in tsconfig.json enable?',
          options: [
            'TypeScript will skip type-checking JavaScript files',
            'JavaScript (.js) files can exist alongside TypeScript (.ts) files in the project',
            'The compiler will automatically convert .js files to .ts files',
            'JavaScript files will be treated as TypeScript files without renaming',
          ],
          answer: 'JavaScript (.js) files can exist alongside TypeScript (.ts) files in the project',
        },
        {
          question: 'document.getElementById("name") returns HTMLElement | null. You know the element always exists. What is the BEST way to handle this in TypeScript?',
          options: [
            'Change the return type of getElementById globally',
            'Use a type assertion: document.getElementById("name") as HTMLInputElement',
            'Use "any" type to bypass the null check',
            'Disable strict null checks in tsconfig.json',
          ],
          answer: 'Use a type assertion: document.getElementById("name") as HTMLInputElement',
        },
      ],
      exercise: {
        prompt: 'Take this JavaScript function and rewrite it in TypeScript. Add interface definitions for the data shapes and type all parameters and return values.',
        starterCode: `// Original JavaScript — add TypeScript types

// This function takes a list of students and returns only those who passed (score >= 60)
// Each student has: id, name, and score

function getPassingStudents(students) {
  return students.filter(student => student.score >= 60);
}

// Also write the interface(s) needed above the function`,
        solution: `interface Student {
  id: number;
  name: string;
  score: number;
}

function getPassingStudents(students: Student[]): Student[] {
  return students.filter(student => student.score >= 60);
}

// Usage:
const results = getPassingStudents([
  { id: 1, name: "Ada", score: 92 },
  { id: 2, name: "Grace", score: 55 },
  { id: 3, name: "Alan", score: 78 },
]);
// results = [{ id: 1, name: "Ada", score: 92 }, { id: 3, name: "Alan", score: 78 }]`,
      },
    },
  ],
};

window.typescriptModule = typescriptModule;
