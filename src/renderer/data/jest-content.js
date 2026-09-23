'use strict';

const jestModule = {
  id: 'jest',
  title: 'Testing with Jest',
  description: 'Jest is the most widely used JavaScript testing framework. This module takes you from zero testing knowledge to writing unit tests, mocks, async tests, and measuring code coverage — skills that make you a more confident and professional developer.',
  objectives: [
    'Understand why automated testing matters and the different types of tests',
    'Set up Jest and write your first passing test',
    'Use Jest matchers to make precise assertions',
    'Test functions and classes with setup and teardown hooks',
    'Mock functions, modules, and third-party dependencies',
    'Test asynchronous code including promises and async/await',
    'Measure and improve code coverage',
    'Apply the red-green-refactor TDD cycle',
  ],
  goals: [
    'Install Jest and run a test suite with npm test',
    'Write a describe block with at least three it() tests',
    'Use toBe, toEqual, toThrow, and toContain in real tests',
    'Mock a function with jest.fn() and assert it was called correctly',
    'Write an async test that awaits a mocked fetch call',
    'Generate a coverage report and identify untested branches',
  ],
  lessons: [
    // ─────────────────────────────────────────────────────────────────
    // LESSON 1 — WHY TEST?
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'jest-1',
      title: 'Lesson 1: Why Test? The Case for Automated Testing',
      content: `Every developer tests their code — the question is whether they do it manually or automatically. This lesson explains why automated testing exists, what kinds of tests there are, and how professional teams think about testing.

THE PROBLEM WITH MANUAL TESTING
When you write code and click around in a browser to check it works, you are testing manually. Manual testing is fine for a first check, but it has serious problems:

1. It does not scale — as your app grows, fully testing it manually takes longer and longer
2. It is unreliable — humans miss things, especially after the tenth run
3. It does not prevent regressions — a change to one function can silently break another, and you only find out when a user reports a bug
4. It is not repeatable — different developers test different things in different orders

Automated tests solve all of these. You write the test once and it runs in milliseconds, every time, the same way.

THE THREE TYPES OF TESTS
Software testing is usually described as a pyramid with three levels:

UNIT TESTS (bottom of pyramid — most common)
  - Test a single function, method, or class in isolation
  - Fast to run (milliseconds each)
  - Easy to pinpoint failures — if a unit test fails, you know exactly which function broke
  - Example: "given the input 5, does addTax() return 5.40?"

INTEGRATION TESTS (middle layer)
  - Test how multiple units work together
  - Slower than unit tests
  - Catch bugs that unit tests miss — a function can work perfectly in isolation but fail when combined with another
  - Example: "does the checkout service correctly call the payment API and update the order status?"

END-TO-END TESTS (top of pyramid — least common)
  - Test the whole application from the user's perspective
  - Slowest — they launch a real browser and simulate real user actions
  - Expensive to write and maintain
  - Example: "can a user sign up, add a product to the cart, and complete a purchase?"

THE TESTING PYRAMID
Write many unit tests, some integration tests, and few end-to-end tests. The pyramid shape reflects the recommended ratio — unit tests are cheap and fast, so write lots of them. E2E tests are slow and brittle, so use them sparingly for the most critical user journeys.

WHAT MAKES A GOOD TEST?
A good test is:
  - FAST — runs in milliseconds, not seconds
  - ISOLATED — does not depend on other tests or external state
  - REPEATABLE — gives the same result every time
  - SELF-DESCRIBING — the name tells you exactly what is being tested
  - FOCUSED — tests one thing per test case

A bad test is one that passes when the code is broken, or fails when the code is correct. These are worse than no test at all.

INTRODUCTION TO TDD
Test-Driven Development (TDD) flips the usual order: you write the test BEFORE the code.

The cycle is:
  RED   — Write a test for the feature. Run it. It fails (red) because the code does not exist yet.
  GREEN — Write the minimum code to make the test pass.
  REFACTOR — Clean up the code, knowing the test will catch any regressions.

TDD forces you to think about the interface of your code before you write it — what inputs does this function take? What should it return? This leads to better-designed, more testable code.

You do not have to use TDD for everything, but understanding it makes you a better developer even when you write tests after the fact.

WHY JEST?
Jest is the most popular JavaScript testing framework. It is:
  - Zero-config for most projects — works out of the box
  - Fast — runs tests in parallel using worker processes
  - Full-featured — includes a test runner, assertion library, and mocking tools in one package
  - Used by default in Create React App, Next.js, and many other frameworks

Other testing frameworks exist (Vitest, Mocha, Jasmine) but Jest is the most common and the one you are most likely to encounter on a professional team.`,
      quiz: [
        {
          question: 'What is the main problem with relying solely on manual testing?',
          options: [
            'Manual testing is too expensive — it requires specialized hardware',
            'Manual testing does not scale, misses regressions, and is inconsistent across developers',
            'Manual testing only works in browsers, not in Node.js',
            'Manual testing cannot catch logic errors, only visual defects',
          ],
          answer: 1,
        },
        {
          question: 'Which type of test is at the BOTTOM of the testing pyramid, meaning you should write the most of them?',
          options: [
            'End-to-end tests — they test the full user journey',
            'Integration tests — they catch the most bugs',
            'Unit tests — they are fast, isolated, and cheap to write',
            'Visual regression tests — they catch UI changes',
          ],
          answer: 2,
        },
        {
          question: 'In TDD, what is the correct order of steps?',
          options: [
            'Write code → write test → refactor',
            'Write test → write code → refactor (red → green → refactor)',
            'Write test → refactor → write code',
            'Refactor → write test → write code',
          ],
          answer: 1,
        },
        {
          question: 'What makes Jest particularly popular compared to other JavaScript testing frameworks?',
          options: [
            'It only works with React, making it the best choice for React apps',
            'It is the fastest possible testing framework due to using WebAssembly',
            'It is zero-config, full-featured (runner + assertions + mocking), and widely used across the JavaScript ecosystem',
            'It generates tests automatically from your source code',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'No code to write yet — this is a conceptual lesson. In the text area, write a short description of one real feature from an app you use or could imagine building, and identify: (1) one unit test for it, (2) one integration test, and (3) one e2e test.',
        starterCode: `// Example feature: a shopping cart "apply discount code" function
// Unit test:        ...
// Integration test: ...
// E2E test:         ...

// Your feature: [describe it here]
// Unit test:        ...
// Integration test: ...
// E2E test:         ...`,
        solution: `// Example feature: a shopping cart "apply discount code" function

// Unit test:
//   Given discount code "SAVE10", applyDiscount(100, "SAVE10") returns 90.
//   Given an invalid code, applyDiscount(100, "FAKE") throws an error.

// Integration test:
//   When a user applies "SAVE10" to a cart with two items totaling $50,
//   the CartService calls applyDiscount and updates the cart total to $45.

// E2E test:
//   A logged-in user visits /cart, types "SAVE10" in the discount field,
//   clicks Apply, and sees the total update to the discounted amount.`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 2 — JEST SETUP AND FIRST TEST
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'jest-2',
      title: 'Lesson 2: Jest Setup and Your First Test',
      content: `This lesson gets Jest installed and walks you through writing, running, and understanding your first test suite.

INSTALLING JEST
In any Node.js project, install Jest as a dev dependency:

  npm install --save-dev jest

Add a test script to package.json:
  {
    "scripts": {
      "test": "jest"
    }
  }

Run all tests:
  npm test

Run in watch mode (re-runs on file save — great for development):
  npm test -- --watch

JEST FILE CONVENTIONS
Jest automatically finds test files that match:
  - Files ending in .test.js or .spec.js
  - Files inside a __tests__ folder

Common structure:
  src/
    utils.js
    utils.test.js     ← test file lives next to the file it tests
  __tests__/
    integration.test.js

THE STRUCTURE OF A TEST FILE
  describe('groupName', () => {
    it('does something specific', () => {
      // arrange, act, assert
    });
  });

DESCRIBE — groups related tests together. Think of it as a chapter heading.
IT / TEST — these are synonyms. Each one is a single test case. Use "it" when the name reads like a sentence: "it returns the correct total."
EXPECT — makes an assertion. If the assertion fails, the test fails.

YOUR FIRST TEST
Create add.js:
  function add(a, b) {
    return a + b;
  }
  module.exports = { add };

Create add.test.js:
  const { add } = require('./add');

  describe('add()', () => {
    it('returns the sum of two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('returns the correct result for negative numbers', () => {
      expect(add(-1, -1)).toBe(-2);
    });

    it('returns the first number when adding zero', () => {
      expect(add(7, 0)).toBe(7);
    });
  });

Run it:
  npm test

Jest output:
  PASS add.test.js
    add()
      ✓ returns the sum of two positive numbers (2ms)
      ✓ returns the correct result for negative numbers (1ms)
      ✓ returns the first number when adding zero (1ms)

  Test Suites: 1 passed
  Tests:       3 passed

READING A FAILING TEST
Change add.js to return a + b + 1 (intentionally broken), run npm test:

  FAIL add.test.js
    add()
      ✗ returns the sum of two positive numbers
        Expected: 5
        Received: 6

Jest tells you exactly what value it expected versus what it received. Fix the code and the test goes green.

THE AAA PATTERN
Structure every test as Arrange → Act → Assert:

  it('calculates the total with tax', () => {
    // Arrange — set up the inputs
    const price = 100;
    const taxRate = 0.1;

    // Act — call the function under test
    const result = calculateTotal(price, taxRate);

    // Assert — check the output
    expect(result).toBe(110);
  });

Keeping these three phases separate makes tests easier to read and debug.

NAMING TESTS WELL
A test name should describe the behaviour, not the implementation:

  // Bad — describes what the code does internally
  it('calls Math.round and multiplies', () => { ... });

  // Good — describes what the caller can observe
  it('rounds the price to two decimal places', () => { ... });

When a test fails in CI, the name is all your teammates see. Make it count.

SKIPPING AND ONLY
  it.skip('work in progress', () => { ... });   // skip this test
  it.only('run just this one', () => { ... });   // run only this test

Use .only and .skip sparingly — never commit a .only as it silences all other tests in the file.`,
      quiz: [
        {
          question: 'What command runs Jest in watch mode, re-running tests on every file save?',
          options: [
            'npm test --live',
            'npm test -- --watch',
            'jest --reload',
            'npm run test:watch',
          ],
          answer: 1,
        },
        {
          question: 'In Jest, what is the difference between it() and test()?',
          options: [
            'test() runs synchronous tests; it() runs async tests',
            'it() is for unit tests; test() is for integration tests',
            'There is no difference — they are synonyms',
            'it() requires a describe() wrapper; test() can stand alone',
          ],
          answer: 2,
        },
        {
          question: 'What does the Arrange-Act-Assert (AAA) pattern describe?',
          options: [
            'The three types of tests in the testing pyramid',
            'A way to structure each test: set up inputs, call the code, check the output',
            'The three phases of TDD: red, green, refactor',
            'A Jest configuration option for test ordering',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write a multiply(a, b) function and a test file for it. The tests should cover: two positive numbers, multiplying by zero, and multiplying two negative numbers (which should produce a positive result).',
        starterCode: `// multiply.js
function multiply(a, b) {
  // your implementation
}
module.exports = { multiply };

// multiply.test.js
const { multiply } = require('./multiply');

describe('multiply()', () => {
  it('returns the product of two positive numbers', () => {
    // your test
  });

  it('returns zero when either argument is zero', () => {
    // your test
  });

  it('returns a positive number when multiplying two negatives', () => {
    // your test
  });
});`,
        solution: `// multiply.js
function multiply(a, b) {
  return a * b;
}
module.exports = { multiply };

// multiply.test.js
const { multiply } = require('./multiply');

describe('multiply()', () => {
  it('returns the product of two positive numbers', () => {
    expect(multiply(3, 4)).toBe(12);
  });

  it('returns zero when either argument is zero', () => {
    expect(multiply(5, 0)).toBe(0);
    expect(multiply(0, 99)).toBe(0);
  });

  it('returns a positive number when multiplying two negatives', () => {
    expect(multiply(-3, -4)).toBe(12);
  });
});`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 3 — COMMON MATCHERS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'jest-3',
      title: 'Lesson 3: Common Matchers — Making Precise Assertions',
      content: `Matchers are the methods you chain onto expect() to describe exactly what you expect the value to be. Using the right matcher makes tests more readable and produces better failure messages.

EQUALITY MATCHERS

toBe — strict equality (===). Use for primitives: numbers, strings, booleans.
  expect(2 + 2).toBe(4);
  expect('hello').toBe('hello');
  expect(true).toBe(true);

  Do NOT use toBe for objects or arrays — it compares references, not contents:
  expect({ a: 1 }).toBe({ a: 1 });   // FAILS — different object references

toEqual — deep equality. Use for objects and arrays. Recursively checks every property.
  expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });   // passes
  expect([1, 2, 3]).toEqual([1, 2, 3]);               // passes

toStrictEqual — like toEqual but also checks that objects are the same class and that undefined properties are counted.

TRUTHINESS MATCHERS
  expect(1).toBeTruthy();     // passes for any truthy value
  expect(0).toBeFalsy();      // passes for any falsy value
  expect(null).toBeNull();    // passes only for null
  expect(undefined).toBeUndefined();
  expect(42).toBeDefined();   // passes for anything that is not undefined

NUMBER MATCHERS
  expect(5).toBeGreaterThan(3);
  expect(5).toBeGreaterThanOrEqual(5);
  expect(3).toBeLessThan(5);
  expect(3).toBeLessThanOrEqual(3);

For floating point numbers, use toBeCloseTo to avoid precision issues:
  expect(0.1 + 0.2).toBe(0.3);          // FAILS — floating point imprecision
  expect(0.1 + 0.2).toBeCloseTo(0.3);   // passes

STRING MATCHERS
  expect('CodeMaster').toContain('Master');
  expect('hello world').toMatch(/world/);
  expect('hello world').toMatch('world');

ARRAY AND ITERABLE MATCHERS
  expect([1, 2, 3]).toContain(2);
  expect([1, 2, 3]).toHaveLength(3);
  expect(['cat', 'dog']).toContain('dog');

OBJECT MATCHERS
toMatchObject — checks that the object contains at least these properties (extras are allowed):
  const user = { id: 1, name: 'Alex', role: 'admin' };
  expect(user).toMatchObject({ name: 'Alex', role: 'admin' });   // passes

toHaveProperty — checks a specific property path and optionally its value:
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('name', 'Alex');
  expect({ address: { city: 'Austin' } }).toHaveProperty('address.city', 'Austin');

EXCEPTION MATCHERS
toThrow — checks that a function throws an error when called:
  function divide(a, b) {
    if (b === 0) throw new Error('Division by zero');
    return a / b;
  }

  expect(() => divide(1, 0)).toThrow();
  expect(() => divide(1, 0)).toThrow('Division by zero');
  expect(() => divide(1, 0)).toThrow(Error);

  Important: wrap the call in an arrow function so Jest can catch the throw:
  // WRONG — Jest cannot catch the throw
  expect(divide(1, 0)).toThrow();

  // CORRECT — arrow function lets Jest intercept
  expect(() => divide(1, 0)).toThrow();

NEGATING WITH .not
Any matcher can be negated by putting .not before it:
  expect(5).not.toBe(10);
  expect([]).not.toContain(1);
  expect(() => add(1, 2)).not.toThrow();

CHOOSING THE RIGHT MATCHER
  Primitives              → toBe
  Objects / arrays        → toEqual
  Partial object match    → toMatchObject
  Contains substring      → toContain or toMatch
  Throws an error         → toThrow (wrapped in arrow function)
  Floating point          → toBeCloseTo
  Null / undefined check  → toBeNull, toBeUndefined, toBeDefined`,
      quiz: [
        {
          question: 'Why should you use toEqual instead of toBe when comparing two objects?',
          options: [
            'toEqual is faster for objects because it skips the prototype chain',
            'toBe compares references, so two different objects with identical properties would fail — toEqual does a deep comparison of contents',
            'toBe does not support objects at all and will throw an error',
            'toEqual works for both objects and primitives; toBe only works for numbers',
          ],
          answer: 1,
        },
        {
          question: 'Why do you wrap a function call in an arrow function when using toThrow?',
          options: [
            'Arrow functions are faster and Jest requires them for performance',
            'Without the wrapper, the function throws immediately during the expect() call before Jest can intercept it',
            'The arrow function tells Jest to run the code asynchronously',
            'toThrow only works with arrow functions, not regular functions',
          ],
          answer: 1,
        },
        {
          question: 'You are testing that a returned user object has a "name" property equal to "Jordan", but you do not want to specify every other property. Which matcher is best?',
          options: [
            'toEqual({ name: "Jordan" }) — it checks exact equality',
            'toHaveProperty("name") — it only checks the key exists',
            'toMatchObject({ name: "Jordan" }) — it checks the subset of properties you care about',
            'toContain("Jordan") — it checks if the string appears in the object',
          ],
          answer: 2,
        },
        {
          question: 'What does expect(0.1 + 0.2).toBeCloseTo(0.3) solve that expect(0.1 + 0.2).toBe(0.3) does not?',
          options: [
            'toBeCloseTo converts both values to integers before comparing',
            'Floating point arithmetic is imprecise in JavaScript — 0.1 + 0.2 is not exactly 0.3, so toBe fails while toBeCloseTo tolerates small rounding differences',
            'toBe does not work with decimal numbers at all',
            'toBeCloseTo rounds both values to the nearest integer',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write tests for a getUser() function that returns a user object. Use at least four different matchers: toEqual, toHaveProperty, toMatchObject, and toThrow.',
        starterCode: `// userService.js
function getUser(id) {
  const users = {
    1: { id: 1, name: 'Alex', email: 'alex@example.com', role: 'admin' },
    2: { id: 2, name: 'Jordan', email: 'jordan@example.com', role: 'user' },
  };
  if (!users[id]) throw new Error('User not found');
  return users[id];
}
module.exports = { getUser };

// userService.test.js
const { getUser } = require('./userService');

describe('getUser()', () => {
  // Write tests using toEqual, toHaveProperty, toMatchObject, and toThrow
});`,
        solution: `// userService.js
function getUser(id) {
  const users = {
    1: { id: 1, name: 'Alex', email: 'alex@example.com', role: 'admin' },
    2: { id: 2, name: 'Jordan', email: 'jordan@example.com', role: 'user' },
  };
  if (!users[id]) throw new Error('User not found');
  return users[id];
}
module.exports = { getUser };

// userService.test.js
const { getUser } = require('./userService');

describe('getUser()', () => {
  it('returns the full user object for a valid id', () => {
    expect(getUser(1)).toEqual({
      id: 1,
      name: 'Alex',
      email: 'alex@example.com',
      role: 'admin',
    });
  });

  it('has a name and email property', () => {
    expect(getUser(2)).toHaveProperty('name', 'Jordan');
    expect(getUser(2)).toHaveProperty('email');
  });

  it('returns at least the expected subset of fields', () => {
    expect(getUser(1)).toMatchObject({ name: 'Alex', role: 'admin' });
  });

  it('throws when the user id does not exist', () => {
    expect(() => getUser(999)).toThrow('User not found');
  });
});`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 4 — TESTING FUNCTIONS AND CLASSES
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'jest-4',
      title: 'Lesson 4: Testing Functions and Classes',
      content: `Real codebases have functions with edge cases and classes with state. This lesson covers testing strategies for both, plus the setup and teardown hooks that keep your tests clean.

TESTING PURE FUNCTIONS
Pure functions are the easiest to test — they always return the same output for the same input and have no side effects. Focus your test cases on:
  - Happy path: the normal, expected input
  - Edge cases: empty strings, zero, negative numbers, null
  - Boundaries: the minimum and maximum valid values
  - Invalid input: what happens when bad data is passed

  function clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }

  describe('clamp()', () => {
    it('returns the value unchanged when within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });
    it('returns min when value is below the range', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });
    it('returns max when value is above the range', () => {
      expect(clamp(99, 0, 10)).toBe(10);
    });
    it('returns min when value equals min (boundary)', () => {
      expect(clamp(0, 0, 10)).toBe(0);
    });
  });

TESTING CLASSES
For classes, test each method's behaviour independently. Create a new instance in each test so tests do not share state.

  class Counter {
    constructor() { this.count = 0; }
    increment() { this.count++; }
    decrement() { this.count--; }
    reset()     { this.count = 0; }
    getValue()  { return this.count; }
  }

  describe('Counter', () => {
    it('starts at zero', () => {
      const counter = new Counter();
      expect(counter.getValue()).toBe(0);
    });

    it('increments by one', () => {
      const counter = new Counter();
      counter.increment();
      expect(counter.getValue()).toBe(1);
    });

    it('decrements by one', () => {
      const counter = new Counter();
      counter.increment();
      counter.decrement();
      expect(counter.getValue()).toBe(0);
    });

    it('resets to zero', () => {
      const counter = new Counter();
      counter.increment();
      counter.increment();
      counter.reset();
      expect(counter.getValue()).toBe(0);
    });
  });

SETUP AND TEARDOWN
If multiple tests need the same starting state, use hooks instead of repeating setup code in every test:

beforeEach(() => { ... })   — runs before each test in the describe block
afterEach  (() => { ... })  — runs after each test (cleanup)
beforeAll  (() => { ... })  — runs once before all tests in the block
afterAll   (() => { ... })  — runs once after all tests (expensive teardown)

Using beforeEach with the Counter example:
  describe('Counter', () => {
    let counter;

    beforeEach(() => {
      counter = new Counter();   // fresh instance before each test
    });

    it('starts at zero', () => {
      expect(counter.getValue()).toBe(0);
    });

    it('increments by one', () => {
      counter.increment();
      expect(counter.getValue()).toBe(1);
    });
  });

NESTED DESCRIBE BLOCKS
You can nest describe blocks to group tests by scenario:

  describe('ShoppingCart', () => {
    describe('when empty', () => {
      it('has a total of zero', () => { ... });
      it('has no items', () => { ... });
    });

    describe('when items are added', () => {
      it('updates the total', () => { ... });
      it('increases the item count', () => { ... });
    });
  });

Each nested describe can have its own beforeEach. The outer beforeEach runs first, then the inner one.

TEST ISOLATION
Tests must not depend on each other. Each test should set up exactly what it needs and leave no shared state behind. Common isolation failures:
  - Mutating a shared variable across tests
  - Tests that must run in a specific order to pass
  - Leaving files or database rows created by one test to be cleaned up by another

If removing or reordering a test causes others to fail, your tests are not isolated.`,
      quiz: [
        {
          question: 'Why is it good practice to create a new class instance in each test rather than sharing one across all tests?',
          options: [
            'Creating new instances is faster than reusing old ones',
            'Shared instances can carry state from one test into the next, causing tests to pass or fail based on which order they run',
            'Jest requires a new instance per test to track coverage correctly',
            'Class constructors cannot be called more than once in a test file',
          ],
          answer: 1,
        },
        {
          question: 'What is the difference between beforeEach and beforeAll?',
          options: [
            'beforeEach runs once at the start of the file; beforeAll runs before every test',
            'beforeEach runs before every individual test; beforeAll runs once before all tests in the block',
            'They are identical — beforeEach is just an alias for beforeAll',
            'beforeAll is for async setup; beforeEach is for synchronous setup',
          ],
          answer: 1,
        },
        {
          question: 'What does it mean for tests to be "isolated"?',
          options: [
            'Tests are run in separate processes so they do not share memory',
            'Each test sets up its own state and does not rely on other tests having run first',
            'Tests are isolated in their own files, one file per function',
            'Test files are hidden from the main source code',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write a Stack class (push, pop, peek, isEmpty, size) and a full test suite for it. Use beforeEach to create a fresh Stack before each test.',
        starterCode: `// stack.js
class Stack {
  constructor() {
    this.items = [];
  }
  push(item) { /* add item to top */ }
  pop()      { /* remove and return top item; return undefined if empty */ }
  peek()     { /* return top item without removing; return undefined if empty */ }
  isEmpty()  { /* return true if no items */ }
  size()     { /* return number of items */ }
}
module.exports = { Stack };

// stack.test.js
const { Stack } = require('./stack');

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    // create a fresh stack
  });

  // write tests for push, pop, peek, isEmpty, and size
});`,
        solution: `// stack.js
class Stack {
  constructor() {
    this.items = [];
  }
  push(item) { this.items.push(item); }
  pop()      { return this.items.pop(); }
  peek()     { return this.items[this.items.length - 1]; }
  isEmpty()  { return this.items.length === 0; }
  size()     { return this.items.length; }
}
module.exports = { Stack };

// stack.test.js
const { Stack } = require('./stack');

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it('is empty when first created', () => {
    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);
  });

  it('is not empty after a push', () => {
    stack.push('a');
    expect(stack.isEmpty()).toBe(false);
    expect(stack.size()).toBe(1);
  });

  it('returns the top item with peek without removing it', () => {
    stack.push('a');
    stack.push('b');
    expect(stack.peek()).toBe('b');
    expect(stack.size()).toBe(2);
  });

  it('removes and returns the top item with pop', () => {
    stack.push('a');
    stack.push('b');
    expect(stack.pop()).toBe('b');
    expect(stack.size()).toBe(1);
  });

  it('returns undefined when popping an empty stack', () => {
    expect(stack.pop()).toBeUndefined();
  });
});`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 5 — MOCKING
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'jest-5',
      title: 'Lesson 5: Mocking — Isolating Code from Its Dependencies',
      content: `Real functions often depend on other modules, databases, APIs, or the file system. Mocking replaces those real dependencies with controlled fakes so your unit tests stay fast, isolated, and predictable.

WHY MOCK?
Imagine testing a function that sends an email. You do not want a real email sent every time you run your tests. Or a function that calls a third-party API — you do not want tests to fail when the internet is down, and you do not want to pay API costs per test run.

Mocking solves this by replacing the real dependency with a fake that behaves however you tell it to.

jest.fn() — MOCK FUNCTIONS
jest.fn() creates a mock function that records all calls made to it:

  const mockCallback = jest.fn();
  mockCallback('hello');
  mockCallback('world');

  expect(mockCallback).toHaveBeenCalledTimes(2);
  expect(mockCallback).toHaveBeenCalledWith('hello');
  expect(mockCallback).toHaveBeenLastCalledWith('world');

CONTROLLING MOCK RETURN VALUES
  const mockAdd = jest.fn();
  mockAdd.mockReturnValue(42);

  expect(mockAdd(1, 2)).toBe(42);   // always returns 42

  mockAdd.mockReturnValueOnce(10);  // returns 10 on the NEXT call only
  expect(mockAdd()).toBe(10);
  expect(mockAdd()).toBe(42);       // back to the default

MOCK IMPLEMENTATIONS
For more complex fakes:
  const mockFetch = jest.fn().mockImplementation((url) => {
    if (url.includes('users')) return Promise.resolve({ id: 1 });
    return Promise.reject(new Error('Not found'));
  });

CHECKING MOCK CALLS
  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledTimes(3);
  expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
  expect(mockFn).not.toHaveBeenCalled();

  // Access raw call data
  console.log(mockFn.mock.calls);     // array of argument arrays
  console.log(mockFn.mock.results);   // array of return values

jest.mock() — MOCKING WHOLE MODULES
To replace an entire module with a mock:

  // emailService.js
  function sendEmail(to, subject, body) { /* real implementation */ }
  module.exports = { sendEmail };

  // notifier.test.js
  jest.mock('./emailService');   // replaces the whole module with auto-mocks
  const { sendEmail } = require('./emailService');

  it('sends a welcome email when user registers', () => {
    registerUser({ name: 'Alex', email: 'alex@example.com' });
    expect(sendEmail).toHaveBeenCalledWith(
      'alex@example.com',
      'Welcome!',
      expect.any(String)
    );
  });

SPYING WITH jest.spyOn()
spyOn lets you mock a specific method on an object while leaving the rest of the object intact:

  const calculator = {
    add: (a, b) => a + b,
    multiply: (a, b) => a * b,
  };

  const addSpy = jest.spyOn(calculator, 'add');
  addSpy.mockReturnValue(99);

  expect(calculator.add(1, 2)).toBe(99);    // mocked
  expect(calculator.multiply(2, 3)).toBe(6); // real

  addSpy.mockRestore();   // restore the original implementation

CLEARING MOCKS
Stale mock call records can cause tests to interfere with each other. Clear them in afterEach:

  afterEach(() => {
    jest.clearAllMocks();   // clears call counts and return values
  });

Or configure Jest to clear mocks automatically in package.json:
  "jest": {
    "clearMocks": true
  }

The difference between:
  jest.clearAllMocks()  — clears call history and instances, keeps implementation
  jest.resetAllMocks()  — also resets return values and implementations
  jest.restoreAllMocks() — restores jest.spyOn mocks to their originals`,
      quiz: [
        {
          question: 'Why would you mock a function that sends emails in a unit test?',
          options: [
            'The email function is too slow and would make tests timeout',
            'To avoid sending real emails on every test run and to test the behaviour without real side effects',
            'Jest cannot test functions that involve strings',
            'Email functions always throw errors in a test environment',
          ],
          answer: 1,
        },
        {
          question: 'What does jest.fn().mockReturnValueOnce(10) do?',
          options: [
            'Makes the mock always return 10',
            'Makes the mock return 10 only on the very next call, then revert to its default',
            'Throws an error after the first call returns 10',
            'Sets the mock to return 10 exactly ten times',
          ],
          answer: 1,
        },
        {
          question: 'What is the difference between jest.mock() and jest.spyOn()?',
          options: [
            'jest.mock() replaces an entire module; jest.spyOn() mocks a single method on an object while leaving the rest intact',
            'jest.mock() is for async functions; jest.spyOn() is for synchronous ones',
            'jest.spyOn() only works on class instances, not plain objects',
            'They are identical — spyOn is just newer syntax for mock',
          ],
          answer: 0,
        },
        {
          question: 'After running multiple tests that use a mock, why should you call jest.clearAllMocks() in afterEach?',
          options: [
            'To free up memory used by the mock functions',
            'To prevent call counts and recorded arguments from one test leaking into the next',
            'Jest requires clearAllMocks to be called or it throws a warning',
            'clearAllMocks re-compiles the mock function for better performance',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write tests for a notifyUser() function that calls sendSMS() internally. Mock the sendSMS module so no real messages are sent. Assert it was called with the right arguments.',
        starterCode: `// smsService.js
function sendSMS(phone, message) {
  // real implementation would call a third-party API
  console.log('Sending SMS to', phone);
}
module.exports = { sendSMS };

// notifier.js
const { sendSMS } = require('./smsService');

function notifyUser(user, eventName) {
  const message = 'Hello ' + user.name + ', your event "' + eventName + '" is starting soon.';
  sendSMS(user.phone, message);
}
module.exports = { notifyUser };

// notifier.test.js
jest.mock('./smsService');
const { sendSMS } = require('./smsService');
const { notifyUser } = require('./notifier');

describe('notifyUser()', () => {
  afterEach(() => jest.clearAllMocks());

  it('calls sendSMS with the correct phone number', () => {
    // your test here
  });

  it('includes the user name and event name in the message', () => {
    // your test here
  });
});`,
        solution: `// notifier.test.js
jest.mock('./smsService');
const { sendSMS } = require('./smsService');
const { notifyUser } = require('./notifier');

describe('notifyUser()', () => {
  afterEach(() => jest.clearAllMocks());

  it('calls sendSMS with the correct phone number', () => {
    notifyUser({ name: 'Alex', phone: '555-1234' }, 'Team Meeting');
    expect(sendSMS).toHaveBeenCalledWith('555-1234', expect.any(String));
  });

  it('includes the user name and event name in the message', () => {
    notifyUser({ name: 'Jordan', phone: '555-9999' }, 'Code Review');
    const [, message] = sendSMS.mock.calls[0];
    expect(message).toContain('Jordan');
    expect(message).toContain('Code Review');
  });

  it('sends exactly one SMS per notification', () => {
    notifyUser({ name: 'Alex', phone: '555-1234' }, 'Standup');
    expect(sendSMS).toHaveBeenCalledTimes(1);
  });
});`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 6 — TESTING ASYNC CODE
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'jest-6',
      title: 'Lesson 6: Testing Async Code',
      content: `Modern JavaScript is full of asynchronous operations — fetch calls, timers, database queries. Jest has built-in support for testing all of them.

THE ASYNC PROBLEM
If you do not handle async correctly, Jest may finish the test before the async operation completes, producing a false positive (the test passes because no assertion was ever reached).

  // WRONG — Jest finishes before the promise resolves
  it('returns user data', () => {
    fetchUser(1).then(user => {
      expect(user.name).toBe('Alex');  // Jest may never reach this
    });
  });

APPROACH 1: ASYNC/AWAIT (RECOMMENDED)
Return a promise or use async/await in your test function:

  it('returns user data', async () => {
    const user = await fetchUser(1);
    expect(user.name).toBe('Alex');
  });

Jest sees that the test function is async and waits for it to resolve before marking the test complete.

APPROACH 2: RETURNING A PROMISE
  it('returns user data', () => {
    return fetchUser(1).then(user => {
      expect(user.name).toBe('Alex');
    });
  });

The return statement is critical — without it, Jest won't wait.

RESOLVES AND REJECTS MATCHERS
Jest provides .resolves and .rejects to make async assertions more readable:

  // Testing a promise that resolves
  it('resolves with user data', () => {
    return expect(fetchUser(1)).resolves.toMatchObject({ name: 'Alex' });
  });

  // Testing a promise that rejects
  it('rejects when user not found', () => {
    return expect(fetchUser(999)).rejects.toThrow('User not found');
  });

  // With async/await:
  it('resolves with user data', async () => {
    await expect(fetchUser(1)).resolves.toMatchObject({ name: 'Alex' });
  });

MOCKING FETCH
Browsers and Node.js have different fetch implementations. For tests, mock it:

  global.fetch = jest.fn();

  it('fetches user data from the API', async () => {
    const mockUser = { id: 1, name: 'Alex' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUser),
    });

    const user = await getUser(1);
    expect(fetch).toHaveBeenCalledWith('/api/users/1');
    expect(user).toEqual(mockUser);
  });

mockResolvedValueOnce is shorthand for mockReturnValueOnce(Promise.resolve(...)).

TESTING ERROR PATHS
Always test what happens when an async operation fails:

  it('throws when the API returns an error', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 404 });
    await expect(getUser(999)).rejects.toThrow('User not found');
  });

TESTING WITH TIMERS
For code that uses setTimeout or setInterval, use Jest's fake timers to avoid actually waiting:

  jest.useFakeTimers();

  it('calls the callback after 1 second', () => {
    const callback = jest.fn();
    delayedCall(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);   // fast-forward time by 1 second

    expect(callback).toHaveBeenCalledTimes(1);
  });

  afterEach(() => jest.useRealTimers());

COMMON MISTAKES
  // Missing await — test passes but assertions never run
  it('loads data', async () => {
    const data = loadData();  // forgot await
    expect(data).toEqual({ id: 1 });  // data is a Promise, not the value
  });

  // Not returning the promise — same problem without async/await
  it('loads data', () => {
    fetchData().then(d => expect(d.id).toBe(1));  // no return!
  });

Always either: (1) use async/await, or (2) return the promise.`,
      quiz: [
        {
          question: 'Why is it a problem if a Jest test function does not wait for an async operation to complete?',
          options: [
            'The test will throw a timeout error after 5 seconds',
            'Jest will mark the test as failed automatically for any unresolved promise',
            'The test may pass without ever running the assertion, giving a false positive',
            'Jest cannot detect async operations and will ignore them entirely',
          ],
          answer: 2,
        },
        {
          question: 'What is the correct way to test that a promise REJECTS with a specific error?',
          options: [
            'expect(promise).toThrow("error message")',
            'await expect(promise).rejects.toThrow("error message")',
            'try { await promise } catch(e) { /* no assertion needed */ }',
            'expect(await promise).toBe(new Error("error message"))',
          ],
          answer: 1,
        },
        {
          question: 'What does fetch.mockResolvedValueOnce(value) do?',
          options: [
            'It makes fetch return a resolved promise with value on the next call only',
            'It makes fetch always resolve with value for the rest of the test suite',
            'It replaces the fetch module entirely with a new implementation',
            'It records the value so you can assert on it later',
          ],
          answer: 0,
        },
      ],
      exercise: {
        prompt: 'Write an async function getPostTitle(id) that fetches a post from /api/posts/{id} and returns the title string. Then write tests for: the happy path (post found), and the error path (fetch returns ok:false).',
        starterCode: `// posts.js
async function getPostTitle(id) {
  // fetch /api/posts/{id}
  // if res.ok, return the post title
  // if not ok, throw new Error('Post not found')
}
module.exports = { getPostTitle };

// posts.test.js
const { getPostTitle } = require('./posts');

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

it('returns the post title when the fetch succeeds', async () => {
  // mock a successful fetch response
  // call getPostTitle and assert the returned value
});

it('throws when the server returns an error', async () => {
  // mock a failed fetch response (ok: false)
  // assert the function rejects
});`,
        solution: `// posts.js
async function getPostTitle(id) {
  const res = await fetch('/api/posts/' + id);
  if (!res.ok) throw new Error('Post not found');
  const post = await res.json();
  return post.title;
}
module.exports = { getPostTitle };

// posts.test.js
const { getPostTitle } = require('./posts');

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

it('returns the post title when the fetch succeeds', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ id: 1, title: 'Hello World' }),
  });
  const title = await getPostTitle(1);
  expect(title).toBe('Hello World');
  expect(fetch).toHaveBeenCalledWith('/api/posts/1');
});

it('throws when the server returns an error', async () => {
  fetch.mockResolvedValueOnce({ ok: false });
  await expect(getPostTitle(99)).rejects.toThrow('Post not found');
});`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 7 — COVERAGE AND TDD
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'jest-7',
      title: 'Lesson 7: Code Coverage and the TDD Cycle',
      content: `Code coverage tells you which lines, branches, and functions your tests actually exercise. TDD is the discipline of writing tests first. Together, they form the backbone of professional-quality JavaScript development.

CODE COVERAGE
Run Jest with coverage enabled:
  npm test -- --coverage

Or add it to package.json permanently:
  "jest": {
    "collectCoverage": true,
    "coverageThreshold": {
      "global": {
        "lines": 80,
        "branches": 75
      }
    }
  }

Jest outputs a coverage table in the terminal and an HTML report in the coverage/ folder. Open coverage/lcov-report/index.html in a browser for a line-by-line view.

THE FOUR COVERAGE METRICS

STATEMENTS — percentage of statements (lines) executed
BRANCHES    — percentage of decision branches taken (both sides of every if/else)
FUNCTIONS   — percentage of functions called at least once
LINES       — similar to statements; often nearly identical

Example output:
  File        | % Stmts | % Branch | % Funcs | % Lines
  ------------|---------|----------|---------|--------
  utils.js    |   92.3  |   75.0   |  100.0  |   92.3
  cart.js     |   68.1  |   50.0   |   80.0  |   68.1

UNDERSTANDING BRANCH COVERAGE
Branch coverage is the most important and the hardest to achieve. Every if/else, ternary, and logical && creates two branches — one where the condition is true, one where it is false. Both must be tested.

  function gradeScore(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    return 'F';
  }

To get 100% branch coverage here you need at least four tests — one that hits each return path.

WHAT COVERAGE DOES NOT TELL YOU
Coverage tells you WHAT code ran — not WHETHER IT IS CORRECT. You can have 100% coverage and still have bugs if your assertions are weak. Coverage is a floor, not a ceiling. Aim for high coverage as a baseline, but focus on writing meaningful assertions.

A common target: 80% line coverage, 75% branch coverage. 100% is rarely worth the effort.

THE TDD CYCLE IN PRACTICE
Let's build a password validator using TDD:

STEP 1 — RED: write a failing test
  it('requires at least 8 characters', () => {
    expect(isValidPassword('short')).toBe(false);
  });
  // Run: test fails — isValidPassword does not exist yet

STEP 2 — GREEN: write the minimum code to pass
  function isValidPassword(password) {
    return password.length >= 8;
  }
  // Run: test passes

STEP 3 — RED: add the next requirement
  it('requires at least one uppercase letter', () => {
    expect(isValidPassword('alllowercase1')).toBe(false);
    expect(isValidPassword('HasUppercase1')).toBe(true);
  });
  // Run: new test fails

STEP 4 — GREEN: extend the implementation
  function isValidPassword(password) {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    return true;
  }
  // Run: both tests pass

STEP 5 — REFACTOR
  function isValidPassword(password) {
    return password.length >= 8 && /[A-Z]/.test(password);
  }
  // Run tests again: still passes. Refactor complete.

Continue the cycle for each new rule: requires a number, requires a special character, rejects spaces.

BENEFITS OF TDD
  - You only write code that is needed — no dead code
  - Every function is testable by design because you wrote the test first
  - Regression safety — breaking changes immediately fail tests
  - Built-in documentation — tests describe what the code is supposed to do

COVERAGE THRESHOLDS IN CI
Add coverage thresholds to your Jest config so CI fails if coverage drops below your minimum:

  "coverageThreshold": {
    "global": {
      "lines": 80,
      "branches": 70,
      "functions": 80
    }
  }

This prevents new code from being merged without adequate tests.`,
      quiz: [
        {
          question: 'What does "branch coverage" measure?',
          options: [
            'How many files in the project have been tested',
            'The percentage of both sides of every conditional (if/else, ternary) that have been exercised by tests',
            'How many git branches have been tested in the CI pipeline',
            'The percentage of function parameters that receive non-null values in tests',
          ],
          answer: 1,
        },
        {
          question: 'You have 100% line coverage on a function. Does that guarantee the function is bug-free?',
          options: [
            'Yes — if every line ran, every possible bug would have been caught',
            'No — coverage only shows that lines ran, not that they produced the correct result; weak assertions can miss bugs even with full coverage',
            'Yes, as long as branch coverage is also above 80%',
            'No, but only because coverage tools have bugs themselves',
          ],
          answer: 1,
        },
        {
          question: 'In TDD, what is the purpose of the REFACTOR step?',
          options: [
            'To add new features while the tests are passing',
            'To clean up and improve the code structure while the tests confirm nothing broke',
            'To delete tests that are no longer needed',
            'To increase coverage by adding more assertions',
          ],
          answer: 1,
        },
        {
          question: 'Why is setting a coverage threshold in your CI configuration valuable?',
          options: [
            'It speeds up the CI build by skipping untested files',
            'It prevents new code from being merged if it drops coverage below the minimum, maintaining test quality over time',
            'Coverage thresholds automatically generate missing tests',
            'It forces developers to write tests before writing code (TDD)',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Use TDD to build an isValidEmail(email) function. Start with a failing test for each rule, then implement the minimum code to pass it. Rules: must contain @, must have at least one character before @, must have at least one character after @, must have a dot after @.',
        starterCode: `// email.js
function isValidEmail(email) {
  // implement incrementally as tests guide you
}
module.exports = { isValidEmail };

// email.test.js
const { isValidEmail } = require('./email');

describe('isValidEmail()', () => {
  // Write one test per rule, then implement each rule in email.js

  it('returns false when there is no @ symbol', () => {
    // your test
  });

  it('returns false when there is nothing before the @', () => {
    // your test
  });

  it('returns false when there is nothing after the @', () => {
    // your test
  });

  it('returns false when there is no dot after the @', () => {
    // your test
  });

  it('returns true for a valid email', () => {
    // your test
  });
});`,
        solution: `// email.js
function isValidEmail(email) {
  const atIndex = email.indexOf('@');
  if (atIndex < 1) return false;           // no @ or nothing before @
  const afterAt = email.slice(atIndex + 1);
  if (afterAt.length === 0) return false;  // nothing after @
  if (!afterAt.includes('.')) return false; // no dot after @
  return true;
}
module.exports = { isValidEmail };

// email.test.js
const { isValidEmail } = require('./email');

describe('isValidEmail()', () => {
  it('returns false when there is no @ symbol', () => {
    expect(isValidEmail('notanemail')).toBe(false);
  });

  it('returns false when there is nothing before the @', () => {
    expect(isValidEmail('@example.com')).toBe(false);
  });

  it('returns false when there is nothing after the @', () => {
    expect(isValidEmail('user@')).toBe(false);
  });

  it('returns false when there is no dot after the @', () => {
    expect(isValidEmail('user@nodot')).toBe(false);
  });

  it('returns true for a valid email', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('a@b.co')).toBe(true);
  });
});`,
      },
    },
  ],
};

window.jestModule = jestModule;
