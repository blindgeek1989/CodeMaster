'use strict';

const regexModule = {
  id: 'regex',
  title: 'Regular Expressions',
  description: 'Regular expressions (regex) are patterns that describe text — you use them to search, validate, extract, and replace strings. This module takes you from your first pattern to real-world use cases like email validation, phone number formatting, and log parsing.',
  objectives: [
    'Understand what regular expressions are and when to use them',
    'Write patterns using literal characters, the dot, and escape sequences',
    'Use character classes, ranges, and shorthand classes like \\d, \\w, and \\s',
    'Control how many times a pattern matches with quantifiers',
    'Anchor patterns to the start, end, or word boundaries',
    'Group patterns, use alternation, and capture parts of a match',
    'Apply JavaScript regex methods: test, match, matchAll, replace, and split',
    'Build practical patterns for email, phone numbers, and URLs',
  ],
  goals: [
    'Write a regex that validates a 5-digit ZIP code',
    'Use a character class to match any vowel in a string',
    'Apply a quantifier to match one or more digits',
    'Use anchors to ensure a pattern matches the whole string',
    'Capture a named group and access it from a match result',
    'Replace all occurrences of a word in a string using replace with the g flag',
    'Validate an email address with a practical regex pattern',
  ],
  lessons: [
    // ─────────────────────────────────────────────────────────────────
    // LESSON 1 — WHAT ARE REGULAR EXPRESSIONS?
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'regex-1',
      title: 'Lesson 1: What Are Regular Expressions?',
      content: `A regular expression (shortened to "regex" or "regexp") is a pattern you write to describe a set of strings. Once you have a pattern, you can use it to search text, validate input, extract pieces of a string, and replace content — all in one concise expression.

Regular expressions exist in nearly every programming language: JavaScript, Python, Java, Ruby, PHP, Go, and more. The core syntax is almost identical across all of them, so learning regex once gives you a tool that works everywhere.

WHAT PROBLEMS DO REGULAR EXPRESSIONS SOLVE?
Before regex, text operations required writing long chains of string methods — indexOf, slice, startsWith, endsWith — pieced together with conditionals. For simple cases that works. For complex patterns it becomes unmaintainable.

Consider checking whether a string looks like an email address. Without regex you might:
  1. Check that it contains exactly one @ symbol
  2. Check that there is a dot somewhere after the @
  3. Check that the local part (before @) has no spaces
  4. Check that the domain part has at least two characters after the dot

That is already four separate operations. With regex it is one pattern.

THE FOUR MAIN USES
1. VALIDATE — does this string match the expected format?
   Does "user@example.com" look like an email?
   Is "12345" a valid US ZIP code?

2. SEARCH — find all occurrences of a pattern in a string
   Find every word that starts with a capital letter.
   Find all URLs in a block of text.

3. EXTRACT — pull out the matching parts
   Get the protocol, domain, and path from a URL.
   Extract all dates from a log file.

4. REPLACE — swap matched text with something else
   Replace all phone number formats with a standard format.
   Redact all email addresses in a document.

HOW REGEX LOOKS IN JAVASCRIPT
In JavaScript you write a regex literal between forward slashes:

  /pattern/

  /pattern/flags

Or using the RegExp constructor (useful when the pattern is dynamic):

  new RegExp('pattern', 'flags')

A quick example — test whether a string contains a digit:

  const pattern = /\d/;
  pattern.test('hello123');   // true
  pattern.test('hello');      // false

TESTING REGEX IN THE BROWSER CONSOLE
Open your browser's DevTools console (F12) and try patterns interactively:

  /\d+/.test('Order #4521')      // true — one or more digits found
  'hello world'.match(/\w+/g)   // ["hello", "world"]
  'cats and dogs'.replace(/and/, 'or')   // "cats or dogs"

This is the fastest way to experiment while you learn. Type a pattern, test it on a string, adjust, repeat.

ONLINE TOOLS
Several websites let you test regex with real-time highlighting and explanations:
  - regex101.com — shows what each part of your pattern does
  - regexr.com — community patterns and live testing
  - debuggex.com — visualises the pattern as a railroad diagram

These tools are invaluable while building complex patterns. Use them freely.

REGEX IS A SKILL, NOT A LOOKUP TABLE
Many developers treat regex as something to copy from Stack Overflow. That works for one-off tasks, but understanding the rules lets you write and debug your own patterns confidently. This module teaches you the rules. By the end you will be able to read any pattern and reason about what it matches.

THE MENTAL MODEL
Think of a regex pattern as a template that slides along the input string, trying to match at each position. At each position it checks: does the pattern fit here? If yes, the position is a match. If no, it moves one character forward and tries again.

  Input:  "abc123def"
  Pattern: /\d+/     (one or more digits)

  Position 0 ('a') — no match
  Position 1 ('b') — no match
  Position 2 ('c') — no match
  Position 3 ('1') — match! Extends greedily: "123"
  Returns: "123"

This sliding-window model explains most regex behaviour.`,
      quiz: [
        {
          question: 'Which of the following is NOT a common use case for regular expressions?',
          options: [
            'Validating that an input matches a format like an email or phone number',
            'Replacing all occurrences of a pattern in a string',
            'Sorting an array of strings alphabetically',
            'Extracting specific parts of a string like a date or URL',
          ],
          answer: 2,
        },
        {
          question: 'In JavaScript, which syntax creates a regex literal?',
          options: [
            '"pattern"',
            '/pattern/',
            '`pattern`',
            '(pattern)',
          ],
          answer: 1,
        },
        {
          question: 'What does the mental model of a "sliding window" describe about regex?',
          options: [
            'Regex only searches the first 100 characters of a string',
            'The pattern tries to match at each position in the string, moving forward one character at a time until it finds a match or exhausts the input',
            'Regex patterns shrink to fit shorter strings automatically',
            'The regex engine backtracks from the end of the string to the beginning',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Open your browser console and run the three expressions below. Write what each one returns as a comment.',
        starterCode: `// Run each line in the browser console and record the result:

// 1. /\\d+/.test('My order number is 8821')
// Result:

// 2. 'JavaScript is great'.match(/\\w+/g)
// Result:

// 3. 'I like cats and cats like me'.replace(/cats/g, 'dogs')
// Result: `,
        solution: `// 1. /\\d+/.test('My order number is 8821')
// Result: true  — the string contains one or more digits

// 2. 'JavaScript is great'.match(/\\w+/g)
// Result: ["JavaScript", "is", "great"]  — all word-character sequences

// 3. 'I like cats and cats like me'.replace(/cats/g, 'dogs')
// Result: "I like dogs and dogs like me"  — all occurrences replaced`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 2 — LITERAL CHARACTERS AND THE DOT
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'regex-2',
      title: 'Lesson 2: Literal Characters and the Dot',
      content: `The simplest regex is a sequence of literal characters — the pattern matches exactly those characters in the string, in that order. Understanding literals and the special dot character is the foundation for everything that follows.

LITERAL CHARACTERS
Every character in a regex pattern that is not a special metacharacter matches itself literally:

  /cat/  matches the string "cat" anywhere in the input.

  'I have a cat'.match(/cat/)     // matches at index 9
  'concatenate'.match(/cat/)      // also matches — "con[cat]enate"
  'dog'.match(/cat/)              // null — no match

The pattern does not care where in the string the match appears. It just needs to find those characters in that sequence.

CASE SENSITIVITY
By default regex is case-sensitive:

  /Cat/.test('cat')   // false
  /Cat/.test('Cat')   // true
  /Cat/.test('CAT')   // false

Add the i (case-insensitive) flag to ignore case:

  /Cat/i.test('cat')   // true
  /Cat/i.test('CAT')   // true
  /Cat/i.test('CaT')   // true

THE DOT METACHARACTER
The dot (.) is a wildcard that matches ANY single character except a newline:

  /c.t/  matches any three-character sequence starting with c and ending with t

  /c.t/.test('cat')   // true  — 'a' matches the dot
  /c.t/.test('cut')   // true  — 'u' matches the dot
  /c.t/.test('c t')   // true  — space matches the dot
  /c.t/.test('ct')    // false — nothing between c and t, dot needs one char
  /c.t/.test('cart')  // false — two characters between c and t, dot needs exactly one

The dot is the most commonly used metacharacter. It is useful when the character at a position can be anything.

MATCHING A LITERAL DOT
Because dot is a metacharacter, writing /3.14/ would match "3X14", "3 14", "3.14" — the dot matches anything. To match a real dot character, escape it with a backslash:

  /3\.14/  matches only "3.14"

  /3\.14/.test('3.14')   // true
  /3\.14/.test('3x14')   // false — the dot is now literal

SPECIAL CHARACTERS THAT NEED ESCAPING
These characters have special meaning in regex and must be backslash-escaped when you want to match them literally:

  . * + ? ^ $ { } [ ] | ( ) \

Examples:
  /1\+1/   matches "1+1" (not "1 anything 1")
  /\$100/  matches "$100"
  /C\+\+/  matches "C++"
  /https:\/\//  matches "https://"

THE BACKSLASH ESCAPE SEQUENCES
Besides escaping metacharacters, backslash creates special sequences with their own meaning:

  \n   newline character
  \t   tab character
  \r   carriage return
  \0   null character

These let you match whitespace and control characters precisely.

PUTTING IT TOGETHER
  /Mr\. [A-Z]/   matches "Mr. " followed by any capital letter (we will cover [A-Z] next lesson)

  /v\d\.\d/      matches version numbers like "v1.0", "v2.3", "v9.8"
  Here \d means "any digit" — we will cover this fully in the next lesson.

COMMON MISTAKE: FORGETTING TO ESCAPE
A frequent bug is writing /file.txt/ and expecting it to match only "file.txt". But the dot matches anything, so it also matches "filextxt", "file1txt", etc.

Always ask: does every character in my pattern mean what I intend? If you want a literal dot, write \.

A PRACTICAL EXAMPLE
Suppose you want to find version strings like "1.0", "2.14", "10.3":

  /\d+\.\d+/   — one or more digits, a literal dot, one or more digits

  'Version 2.14 released'.match(/\d+\.\d+/)   // ["2.14"]
  'Price: $9.99'.match(/\d+\.\d+/)             // ["9.99"]
  'No version here'.match(/\d+\.\d+/)          // null`,
      quiz: [
        {
          question: 'What does the dot (.) match in a regular expression?',
          options: [
            'Only a literal period character',
            'Any single character except a newline',
            'Any sequence of characters',
            'Only alphanumeric characters',
          ],
          answer: 1,
        },
        {
          question: 'The pattern /3.14/ is applied to the string "3x14". What happens?',
          options: [
            'No match — the dot only matches a period',
            'A match — the dot matches any character including "x"',
            'An error — the dot cannot appear between digits',
            'No match — digits cannot surround a dot in regex',
          ],
          answer: 1,
        },
        {
          question: 'Which pattern correctly matches the literal string "C++"?',
          options: [
            '/C++/',
            '/C\\+\\+/',
            '/C[++]/',
            '/C.+/',
          ],
          answer: 1,
        },
        {
          question: 'You want a regex that matches "file.txt" but not "filextxt". Which pattern is correct?',
          options: [
            '/file.txt/',
            '/file\\.txt/',
            '/file[.]txt/',
            'Both B and C are correct',
          ],
          answer: 3,
        },
      ],
      exercise: {
        prompt: 'Write regex patterns that match each of the described strings. Use the browser console to test them.',
        starterCode: `// 1. A pattern that matches "dog", "fog", "log", "bog" (any 3-letter word ending in "og")
const pattern1 = //;

// 2. A pattern that matches the literal string "2+2=4"
const pattern2 = //;

// 3. A pattern that matches a version like "v3.7" (letter v, digit, literal dot, digit)
const pattern3 = //;

// Test them:
// console.log(pattern1.test('log'));   // should be true
// console.log(pattern2.test('2+2=4')); // should be true
// console.log(pattern3.test('v3.7'));  // should be true`,
        solution: `// 1. Any 3-letter word ending in "og"
const pattern1 = /.og/;

// 2. Literal "2+2=4" — escape the + and =
const pattern2 = /2\\+2=4/;

// 3. Version like "v3.7" — escape the dot
const pattern3 = /v\\d\\.\\d/;

// All three tests return true`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 3 — CHARACTER CLASSES
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'regex-3',
      title: 'Lesson 3: Character Classes',
      content: `A character class lets you define a set of characters, any one of which can match at a position. While the dot matches anything, a character class gives you precise control over which characters are allowed.

THE BASIC CHARACTER CLASS: [...]
Write characters inside square brackets to create a class that matches any one of them:

  /[aeiou]/  matches any lowercase vowel

  'hello'.match(/[aeiou]/g)   // ["e", "o"]
  'rhythm'.match(/[aeiou]/g)  // null — no vowels

Order inside the brackets does not matter. [aeiou] and [uoiea] are identical.

CHARACTER RANGES
A hyphen inside a class creates a range:

  [a-z]   any lowercase letter
  [A-Z]   any uppercase letter
  [0-9]   any digit
  [a-zA-Z]  any letter (upper or lower)
  [a-zA-Z0-9]  any letter or digit

  'Hello World 123'.match(/[A-Z]/g)   // ["H", "W"]
  'abc123'.match(/[0-9]/g)            // ["1", "2", "3"]

The hyphen is only a range indicator when it is between two characters. At the start or end of a class it is literal:

  /[-+*]/  matches a literal hyphen, plus, or asterisk

NEGATED CHARACTER CLASSES: [^...]
A caret at the START of a class negates it — match any character NOT in the set:

  /[^aeiou]/  matches any character that is NOT a lowercase vowel
  /[^0-9]/    matches any character that is NOT a digit

  'hello'.match(/[^aeiou]/g)   // ["h", "l", "l"]
  'abc123'.match(/[^0-9]/g)    // ["a", "b", "c"]

Note: the caret only negates when it is the FIRST character inside the brackets. Elsewhere it is literal.

SHORTHAND CHARACTER CLASSES
These are abbreviations for common character sets:

  \d   Any digit             — equivalent to [0-9]
  \D   Any non-digit         — equivalent to [^0-9]
  \w   Any word character    — equivalent to [a-zA-Z0-9_]
  \W   Any non-word character — equivalent to [^a-zA-Z0-9_]
  \s   Any whitespace        — spaces, tabs, newlines
  \S   Any non-whitespace

  /\d/.test('Room 42')       // true  — contains a digit
  /\d/.test('Room number')   // false — no digits
  /\w+/.test('hello_world')  // true  — word chars including underscore
  /\s/.test('no spaces')     // true  — the space is whitespace

COMBINING CLASSES AND LITERALS
You can mix character classes freely in a pattern:

  /\d\d:\d\d/   matches a time like "09:45" or "23:00"
  /[A-Z]\w+/    matches a word starting with a capital letter

INSIDE A CLASS, MOST METACHARACTERS ARE LITERAL
Inside square brackets, most special characters lose their regex meaning:

  /[.+*?]/   matches a literal dot, plus, asterisk, or question mark
  — you do not need to escape them inside a class (though you can)

Exceptions: the hyphen (range), caret at start (negation), backslash (escape), and closing bracket ] must still be escaped.

PRACTICAL EXAMPLES
Match a hex color code (#fff or #ffffff):
  /#[0-9a-fA-F]{3,6}/
  (We cover {3,6} in the next lesson — it means "3 to 6 repetitions".)

Match a US state abbreviation (two capital letters):
  /[A-Z]{2}/

Match anything that is NOT a letter or digit:
  /[^a-zA-Z0-9]/

Check if a password contains at least one digit:
  /[0-9]/.test(password)   // or /\d/.test(password)

Check if a string has any whitespace:
  /\s/.test(input)

COMMON MISTAKE: MISPLACING THE HYPHEN
Writing [a-Z] might look like "any letter" but it actually creates a range from lowercase 'a' (ASCII 97) to uppercase 'Z' (ASCII 90) — which is an invalid range and throws an error. Write [a-zA-Z] instead.

Writing [0-z] covers the whole ASCII range including punctuation characters — almost certainly not what you want.`,
      quiz: [
        {
          question: 'What does the character class [^0-9] match?',
          options: [
            'Only the digit zero',
            'Any digit from 0 to 9',
            'Any character that is NOT a digit',
            'The beginning of the string followed by a digit',
          ],
          answer: 2,
        },
        {
          question: 'Which shorthand class matches any word character (letters, digits, underscore)?',
          options: [
            '\\d',
            '\\s',
            '\\w',
            '\\a',
          ],
          answer: 2,
        },
        {
          question: 'You need a pattern to match a two-digit hour followed by a colon and two-digit minutes (e.g. "14:30"). Which is correct?',
          options: [
            '/[0-9][0-9]:[0-9][0-9]/',
            '/\\d\\d:\\d\\d/',
            '/[\\d]{2}:[\\d]{2}/',
            'All of the above are equivalent and correct',
          ],
          answer: 3,
        },
        {
          question: 'Inside a character class [], which of these does NOT need to be escaped?',
          options: [
            'The closing bracket ]',
            'The backslash \\',
            'A literal dot .',
            'A hyphen at the start [-',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Write regex patterns for each requirement below. Test each one in the browser console.',
        starterCode: `// 1. Match any single uppercase vowel (A, E, I, O, U)
const upperVowel = //;

// 2. Match any character that is NOT a letter or digit or underscore
//    (hint: negate \\w)
const nonWord = //;

// 3. Match a 3-character string: digit, hyphen, digit (e.g. "4-7")
const digitHyphenDigit = //;

// 4. Match a hex digit (0-9 or a-f or A-F)
const hexDigit = //;`,
        solution: `// 1. Any uppercase vowel
const upperVowel = /[AEIOU]/;

// 2. Any non-word character
const nonWord = /\\W/;

// 3. Digit, literal hyphen, digit
const digitHyphenDigit = /\\d-\\d/;

// 4. Hex digit
const hexDigit = /[0-9a-fA-F]/;`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 4 — QUANTIFIERS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'regex-4',
      title: 'Lesson 4: Quantifiers',
      content: `So far every part of your pattern has matched exactly one character. Quantifiers let you say "match this zero or more times", "exactly three times", or "between two and five times". They are what make regex genuinely powerful.

THE BASIC QUANTIFIERS
Each quantifier follows the element it modifies (a character, class, or group):

  *    Zero or more times
  +    One or more times
  ?    Zero or one time (makes it optional)
  {n}  Exactly n times
  {n,} At least n times
  {n,m} Between n and m times (inclusive)

* — ZERO OR MORE
  /ab*c/   matches "ac", "abc", "abbc", "abbbc" etc.
  The b is optional and can repeat any number of times.

  /\d*/   matches zero or more digits — even an empty string!

+ — ONE OR MORE
  /ab+c/   matches "abc", "abbc", "abbbc" — but NOT "ac" (needs at least one b)

  /\d+/   one or more digits — matches "0", "42", "9999" but not ""

The difference: * allows zero occurrences, + requires at least one.

? — OPTIONAL (ZERO OR ONE)
  /colou?r/   matches both "color" and "colour" — the u is optional

  /Jan(uary)?/  would match "Jan" or "January" (groups covered next lesson)

{n} — EXACT COUNT
  /\d{4}/   exactly 4 digits — matches "2024", "0000"
  /\w{8}/   exactly 8 word characters

{n,} — AT LEAST n
  /\d{3,}/   three or more digits — matches "123", "1234", "99999"

{n,m} — BETWEEN n AND m
  /\d{2,4}/   between 2 and 4 digits — matches "12", "123", "1234" but not "1" or "12345"
  /\w{6,12}/  between 6 and 12 word characters — useful for password length checks

GREEDY vs LAZY MATCHING
By default, quantifiers are GREEDY — they match as many characters as possible while still allowing the overall pattern to succeed.

  Input: "<b>hello</b> and <b>world</b>"
  Pattern: /<b>.*<\/b>/

  Greedy match: "<b>hello</b> and <b>world</b>"
  — the .* consumed everything up to the LAST </b>

This is rarely what you want when matching HTML-like structures. Add a ? after the quantifier to make it LAZY — match as FEW characters as possible:

  *?   zero or more (lazy)
  +?   one or more (lazy)
  ??   zero or one (lazy)
  {n,m}?  between n and m (lazy)

  Pattern: /<b>.*?<\/b>/  (lazy)
  Matches: "<b>hello</b>" then "<b>world</b>" separately

The lazy version stops as soon as it finds the first </b> rather than the last one.

QUANTIFIERS APPLY TO THE PREVIOUS ELEMENT
The quantifier always modifies the single element immediately before it:

  /ab+/   means a followed by one-or-more b's — NOT one-or-more "ab" pairs
  /cat|dog+/  means "cat" OR "dog+" (one-or-more g's after do)

To repeat a group of characters, use parentheses (covered next lesson):
  /(ab)+/  means one-or-more "ab" pairs

PRACTICAL PATTERNS
Match a US ZIP code (5 digits):
  /\d{5}/

Match a ZIP+4 code (12345 or 12345-6789):
  /\d{5}(-\d{4})?/

Match one or more words separated by spaces:
  /\w+(\s\w+)*/

Match a sequence of one or more whitespace characters:
  /\s+/

Check minimum password length of 8:
  /\w{8,}/.test(password)

Strip multiple spaces (replace with one):
  str.replace(/\s+/g, ' ')

COMMON MISTAKE: USING * WHEN YOU MEAN +
  /\d*/  matches zero or more digits — it matches empty strings too!
  'hello'.match(/\d*/)   // [""]  — matched zero digits at position 0

This is almost always a bug. When you need at least one digit, use \d+ not \d*.`,
      quiz: [
        {
          question: 'What is the difference between + and * quantifiers?',
          options: [
            '+ matches uppercase letters, * matches lowercase letters',
            '+ requires at least one match, * allows zero matches',
            '+ is greedy, * is lazy',
            '+ matches characters, * matches whole words',
          ],
          answer: 1,
        },
        {
          question: 'Which pattern matches a US ZIP code of exactly 5 digits?',
          options: [
            '/\\d+/',
            '/\\d{5}/',
            '/\\d*/',
            '/\\d{4,6}/',
          ],
          answer: 1,
        },
        {
          question: 'The pattern /<.+>/ is applied to "<b>bold</b>". What does it match?',
          options: [
            '"<b>" only',
            '"</b>" only',
            '"<b>bold</b>" — the greedy + matches as much as possible',
            'Nothing — angle brackets must be escaped',
          ],
          answer: 2,
        },
        {
          question: 'How do you make a quantifier lazy (match as few characters as possible)?',
          options: [
            'Add a ! after the quantifier',
            'Add a ? after the quantifier',
            'Use uppercase: * becomes STAR',
            'Wrap the element in parentheses',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write patterns using quantifiers to match each described string.',
        starterCode: `// 1. Match a word of 3 to 10 lowercase letters
const shortWord = //;

// 2. Match "color" or "colour" (the 'u' is optional)
const colour = //;

// 3. Match one or more digits followed by a literal dot followed by one or more digits
//    (decimal numbers like "3.14" or "100.0")
const decimal = //;

// 4. Match a string of exactly 8 word characters (\\w) — a fixed-length username
const username8 = //;

// Test:
// shortWord.test('hello')    // true
// colour.test('colour')      // true
// colour.test('color')       // true
// decimal.test('3.14')       // true
// username8.test('johndoe1') // true (8 chars)
// username8.test('john')     // false (4 chars)`,
        solution: `// 1. Three to ten lowercase letters
const shortWord = /[a-z]{3,10}/;

// 2. color or colour
const colour = /colou?r/;

// 3. Decimal number
const decimal = /\\d+\\.\\d+/;

// 4. Exactly 8 word characters
const username8 = /^\\w{8}$/;
// ^ and $ anchors (next lesson) ensure the whole string is 8 chars`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 5 — ANCHORS AND BOUNDARIES
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'regex-5',
      title: 'Lesson 5: Anchors and Boundaries',
      content: `A character class or quantifier matches characters at a position. An anchor asserts a condition about the position itself — without consuming any character. Anchors are what let you say "this pattern must match the entire string" or "this word must appear at the start of a line".

THE START ANCHOR: ^
^ matches the position at the very beginning of the string (or the beginning of a line in multiline mode):

  /^Hello/  matches "Hello world" but NOT "Say Hello"
  — the string must start with "Hello"

  /^\d{4}/  the string must start with 4 digits
  '2024-01-15'.match(/^\d{4}/)   // ["2024"]
  'Report 2024'.match(/^\d{4}/)  // null — digits are not at the start

THE END ANCHOR: $
$ matches the position at the very end of the string (or end of a line in multiline mode):

  /world$/  matches "Hello world" but NOT "world domination"
  — the string must end with "world"

  /\d+$/  the string must end with one or more digits
  'Version 3'.match(/\d+$/)      // ["3"]
  '3 blind mice'.match(/\d+$/)   // null — digits are not at the end

ANCHORING THE WHOLE STRING
The most common use of both anchors together is to match a pattern against the COMPLETE string — validation:

  /^\d{5}$/  the string must be EXACTLY 5 digits (nothing before, nothing after)

  /^\d{5}$/.test('12345')     // true
  /^\d{5}$/.test('123456')    // false — too long
  /^\d{5}$/.test('1234a')     // false — contains a non-digit
  /^\d{5}$/.test(' 12345')    // false — leading space

Without anchors, /\d{5}/ would match any string containing 5 consecutive digits, including "abc12345xyz".

WORD BOUNDARY: \b
\b matches a position between a word character (\w) and a non-word character (\W) — or between \w and the start/end of the string. It marks the edge of a word.

  /\bcat\b/  matches "cat" as a standalone word

  'The cat sat'.match(/\bcat\b/)       // ["cat"] ✓
  'concatenate'.match(/\bcat\b/)       // null    — "cat" is not at a word boundary here
  'cats are cool'.match(/\bcat\b/)     // null    — "cat" is followed by 's', not a boundary

This is invaluable for finding whole words without matching fragments:

  // Find the word "is" without matching "this" or "island"
  /\bis\b/.test('this is a test')   // true  — "is" found as a word
  /\bis\b/.test('this')             // false — no standalone "is"

NON-WORD BOUNDARY: \B
\B is the opposite of \b — it matches positions that are NOT at a word boundary (i.e., inside a word):

  /\Bcat\B/  matches "cat" only when surrounded by word characters

  'concatenate'.match(/\Bcat\B/)   // ["cat"] — cat is surrounded by word chars
  'the cat'.match(/\Bcat\B/)       // null    — cat is at word boundaries

\B is less commonly used but useful when you specifically want a substring inside a word.

THE MULTILINE FLAG: m
By default ^ matches the start of the whole string and $ matches the end. With the m flag, they match the start and end of EACH LINE:

  const text = "line one\nline two\nline three";

  text.match(/^line/gm)   // ["line", "line", "line"] — matches at start of each line
  text.match(/^line/)     // ["line"]                 — only the first line (no m flag)

Use the m flag whenever your input has multiple lines and you want ^ and $ to work per-line.

PRACTICAL USES
Validate an email domain ends with .com, .org, or .net:
  /\.(com|org|net)$/i

Ensure a string starts with http or https:
  /^https?:\/\//

Find standalone numbers (not inside words):
  /\b\d+\b/

Match blank lines:
  /^$/m

Strip leading and trailing whitespace:
  str.replace(/^\s+|\s+$/g, '')   // trim manually
  // (though String.prototype.trim() is simpler here)

COMMON MISTAKE: ANCHOR PLACEMENT
  /^hello world$/  is very strict — matches ONLY the exact string "hello world"
  /hello world/    matches "hello world" anywhere in a larger string

Choose ^ and $ deliberately based on whether you are validating a whole string or searching within a larger text.`,
      quiz: [
        {
          question: 'What does the pattern /^\\d{5}$/ match?',
          options: [
            'Any string containing 5 consecutive digits',
            'Only a string that is exactly 5 digits with nothing before or after',
            'A string starting with 5 digits',
            'A string ending with 5 digits',
          ],
          answer: 1,
        },
        {
          question: 'Why does /\\bcat\\b/ NOT match inside the word "concatenate"?',
          options: [
            'Because the pattern is case-sensitive',
            'Because \\b requires at least 3 characters before and after the match',
            'Because the letters adjacent to "cat" in "concatenate" are word characters, so there is no word boundary',
            'Because \\b only works at the start of a string',
          ],
          answer: 2,
        },
        {
          question: 'What does the m flag do to the ^ and $ anchors?',
          options: [
            'Makes them match more aggressively across the whole document',
            'Changes ^ and $ to match the start and end of each line instead of the whole string',
            'Makes the anchors optional',
            'Has no effect — ^ and $ already work per-line by default',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write patterns using anchors and word boundaries for each requirement.',
        starterCode: `// 1. Validate that a string is exactly 10 digits (a US phone number without formatting)
const tenDigits = //;

// 2. Find the word "the" as a whole word only (not inside "there" or "other")
const wholeThe = //;

// 3. Match any line that starts with "//" (a JavaScript comment line)
//    Use the m flag so it works on multi-line strings
const commentLine = //;

// Tests:
// tenDigits.test('5551234567')   // true
// tenDigits.test('555123456')    // false (9 digits)
// tenDigits.test('555 123 4567') // false (spaces)
// wholeThe.test('the cat')       // true
// wholeThe.test('there')         // false
// commentLine.test('// a comment') // true`,
        solution: `// 1. Exactly 10 digits
const tenDigits = /^\\d{10}$/;

// 2. Whole word "the"
const wholeThe = /\\bthe\\b/i;

// 3. Lines starting with //
const commentLine = /^\\/\\//m;`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 6 — GROUPS AND ALTERNATION
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'regex-6',
      title: 'Lesson 6: Groups and Alternation',
      content: `Groups let you treat multiple characters as a single unit. Alternation lets you say "match this OR that". Together with named captures, these features let you extract structured data from text — not just detect whether something matches.

CAPTURING GROUPS: (...)
Parentheses create a capturing group. They do two things:
  1. Treat the enclosed pattern as a unit (so quantifiers apply to the whole group)
  2. Capture the matched text so you can retrieve it from the match result

  /(ab)+/   matches "ab", "abab", "ababab" etc. — one or more "ab" pairs
  /(\d{4})-(\d{2})-(\d{2})/  matches a date "2024-01-15" and captures year, month, day separately

Accessing captured groups with match():

  const result = '2024-01-15'.match(/(\d{4})-(\d{2})-(\d{2})/);
  // result[0] = "2024-01-15"  (the full match)
  // result[1] = "2024"        (group 1)
  // result[2] = "01"          (group 2)
  // result[3] = "15"          (group 3)

Groups are numbered from left to right by their opening parenthesis.

NON-CAPTURING GROUPS: (?:...)
If you need grouping for quantifier purposes but do not need to capture the text, use (?:...):

  /(?:ab)+/  groups "ab" for the + quantifier without capturing it

This is more efficient and keeps match results clean — use it whenever you do not need the captured value.

NAMED CAPTURING GROUPS: (?<name>...)
Named groups assign a readable name to a capture, making the result much easier to work with:

  const pattern = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
  const result = '2024-01-15'.match(pattern);

  result.groups.year    // "2024"
  result.groups.month   // "01"
  result.groups.day     // "15"

This is far clearer than result[1], result[2], result[3]. Use named groups in any pattern where you plan to use the captured data.

ALTERNATION: |
The pipe character means OR — match the pattern on the left or the pattern on the right:

  /cat|dog/   matches "cat" or "dog"

  'I have a cat'.match(/cat|dog/)   // ["cat"]
  'I have a dog'.match(/cat|dog/)   // ["dog"]
  'No pets'.match(/cat|dog/)        // null

Alternation has very LOW precedence — it applies to everything to its left and right:

  /cat|dog food/  means "cat" OR "dog food" — NOT "cat or dog" + " food"

Use groups to limit the scope of alternation:

  /(?:cat|dog) food/  means "cat food" or "dog food"

BACKREFERENCES: \\1, \\2, ...
A backreference matches the same text that was matched by a numbered group earlier in the pattern:

  /(\\w+) \\1/   matches a word followed by a space followed by THE SAME WORD

  'hello hello'.match(/(\\w+) \\1/)   // ["hello hello", "hello"]
  'hello world'.match(/(\\w+) \\1/)   // null — different words

Named backreferences use \\k<name>:

  /(?<word>\\w+) \\k<word>/  same as above with a named group

Backreferences are useful for finding repeated words, matching opening and closing tags, and detecting duplicates.

PRACTICAL EXAMPLES
Match a full name (first and last):
  /([A-Z][a-z]+) ([A-Z][a-z]+)/
  Captures first name in group 1, last name in group 2.

Match either "http" or "https":
  /https?:\/\//  (using ? on the s)
  — or explicitly: /http(?:s)?:\/\//

Match a date in multiple formats (2024-01-15 or 01/15/2024):
  /(?<y>\\d{4})-(?<m>\\d{2})-(?<d>\\d{2})|(?<m2>\\d{2})\/(?<d2>\\d{2})\/(?<y2>\\d{4})/

Extract a domain from a URL:
  const url = 'https://www.example.com/path';
  const { domain } = url.match(/https?:\\/\\/(?<domain>[^\\/]+)/)?.groups ?? {};
  // domain = "www.example.com"

LOOKAHEAD AND LOOKBEHIND (ADVANCED)
These are zero-width assertions — they check context without consuming characters:

  (?=...)   positive lookahead  — match if followed by ...
  (?!...)   negative lookahead  — match if NOT followed by ...
  (?<=...)  positive lookbehind — match if preceded by ...
  (?<!...)  negative lookbehind — match if NOT preceded by ...

  /\d+(?= dollars)/   matches digits only when followed by " dollars"
  '100 dollars 50 cents'.match(/\d+(?= dollars)/)   // ["100"]

These are powerful tools for extracting data in context.`,
      quiz: [
        {
          question: 'What is the difference between (...) and (?:...) in a regex?',
          options: [
            '(...) is for required groups, (?:...) is for optional groups',
            '(...) captures the matched text for later retrieval, (?:...) groups without capturing',
            '(...) works in all browsers, (?:...) only works in modern browsers',
            'There is no difference — they are interchangeable',
          ],
          answer: 1,
        },
        {
          question: 'The pattern /cat|dog food/ matches which strings?',
          options: [
            '"cat food" or "dog food"',
            '"cat" or "dog food"',
            '"cat" or "dog" followed by " food"',
            '"catdog food"',
          ],
          answer: 1,
        },
        {
          question: 'How do you access a named capture group called "year" from a match result?',
          options: [
            'result.year',
            'result[0].year',
            'result.groups.year',
            'result.captures.year',
          ],
          answer: 2,
        },
        {
          question: 'What does the pattern /(\\w+) \\1/ match?',
          options: [
            'Any two-word phrase',
            'A word followed by a space followed by the same word repeated',
            'A word character followed by a digit',
            'Any string containing a backslash and the digit 1',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Use groups and alternation to solve each problem.',
        starterCode: `// 1. Write a pattern that matches "Mr.", "Mrs.", "Ms.", or "Dr." followed by a space and a name
//    Use alternation inside a non-capturing group
const title = //;

// 2. Write a pattern that captures a date formatted as YYYY-MM-DD
//    into named groups: year, month, day
const datePattern = //;

// 3. Use the datePattern to extract year, month, day from '2024-07-04'
const result = '2024-07-04'.match(datePattern);
const year  = /* result.groups.year  */ '';
const month = /* result.groups.month */ '';
const day   = /* result.groups.day   */ '';`,
        solution: `// 1. Titles with alternation
const title = /(?:Mr|Mrs|Ms|Dr)\\. [A-Z][a-z]+/;

// 2. Named date groups
const datePattern = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;

// 3. Extract parts
const result = '2024-07-04'.match(datePattern);
const year  = result.groups.year;    // "2024"
const month = result.groups.month;   // "07"
const day   = result.groups.day;     // "04"`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 7 — JAVASCRIPT METHODS AND REAL-WORLD PATTERNS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'regex-7',
      title: 'Lesson 7: JavaScript Regex Methods and Real-World Patterns',
      content: `You now know how to write patterns. This lesson covers all the JavaScript methods that use regex and then applies everything to patterns you will encounter in real projects: email addresses, phone numbers, URLs, and passwords.

REGEX FLAGS
Flags modify how the pattern is applied. Append them after the closing slash:

  g   Global — find all matches, not just the first
  i   Case-insensitive — treat upper and lowercase as equal
  m   Multiline — ^ and $ match line starts/ends
  s   Dotall — the dot matches newlines too
  u   Unicode — treat pattern and string as Unicode
  d   Indices — include start/end indices for each match (ES2022)

You can combine flags: /pattern/gi matches all occurrences case-insensitively.

REGEX METHODS ON THE RegExp OBJECT

pattern.test(string)
Returns true or false. Use when you only need a yes/no answer:

  /^\d{5}$/.test('90210')   // true
  /^\d{5}$/.test('9021O')   // false — O is not a digit

REGEX METHODS ON THE String OBJECT

string.match(pattern)
Without the g flag: returns an array with the first match, plus captured groups, plus index and input properties. Returns null if no match.

  '2024-01-15'.match(/(\d{4})-(\d{2})-(\d{2})/)
  // ["2024-01-15", "2024", "01", "15", index: 0, input: "2024-01-15"]

With the g flag: returns an array of all matches (no capture groups), or null.

  'one 1 two 2 three 3'.match(/\d/g)   // ["1", "2", "3"]

string.matchAll(pattern)
Returns an iterator of all matches, each with full capture group information. Requires the g flag.

  const str = '2024-01-15 and 2025-06-30';
  const iter = str.matchAll(/(\d{4})-(\d{2})-(\d{2})/g);
  for (const m of iter) {
    console.log(m[1], m[2], m[3]);   // year, month, day for each date
  }

Use matchAll when you need captures AND all matches.

string.replace(pattern, replacement)
Replaces the matched text. With a string replacement, use $1, $2 etc. to reference captured groups:

  'John Smith'.replace(/(\w+) (\w+)/, '$2, $1')   // "Smith, John"

With a function as replacement:
  'hello world'.replace(/\w+/g, word => word.toUpperCase())
  // "HELLO WORLD"

string.replaceAll(string, replacement)
Built-in method for replacing all literal occurrences of a string (ES2021). For regex use replace with the g flag.

string.split(pattern)
Split using a regex delimiter:

  'one1two2three3'.split(/\d/)   // ["one", "two", "three", ""]
  'a, b,c ,d'.split(/\s*,\s*/)  // ["a", "b", "c", "d"] — split on comma + optional whitespace

string.search(pattern)
Returns the index of the first match, or -1. Like indexOf but with regex:

  'hello world'.search(/\bworld\b/)   // 6
  'hello world'.search(/\bfoo\b/)     // -1

REAL-WORLD PATTERNS

EMAIL ADDRESS
A pragmatic pattern (not RFC-compliant but covers 99% of real emails):

  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  Breakdown:
  ^                    start of string
  [a-zA-Z0-9._%+-]+   local part: letters, digits, dots, underscores, percent, plus, hyphen
  @                    literal @
  [a-zA-Z0-9.-]+      domain name: letters, digits, dots, hyphens
  \\.                   literal dot before TLD
  [a-zA-Z]{2,}        TLD: at least 2 letters
  $                    end of string

US PHONE NUMBER (flexible formats)
  /^\+?1?\s?[\(\-]?\d{3}[\)\-\s]?\d{3}[\-\s]?\d{4}$/

This matches: 5551234567, 555-123-4567, (555) 123-4567, +1 555 123 4567

STRONG PASSWORD CHECK
At least 8 chars, one uppercase, one lowercase, one digit, one special character:

  function isStrongPassword(pw) {
    return (
      pw.length >= 8 &&
      /[A-Z]/.test(pw) &&
      /[a-z]/.test(pw) &&
      /\d/.test(pw) &&
      /[!@#$%^&*()_+]/.test(pw)
    );
  }

URL (basic)
  /^https?:\/\/[^\s/$.?#][^\s]*$/i

HEX COLOR
  /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

ISO DATE (YYYY-MM-DD)
  /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/

BUILDING YOUR OWN PATTERNS
A reliable approach:
  1. Write examples of strings that SHOULD match
  2. Write examples of strings that SHOULD NOT match
  3. Start with the simplest pattern that matches the positive examples
  4. Tighten it (add anchors, narrow character classes) until it rejects the negative examples
  5. Test on regex101.com with your full list

No regex is perfect. For critical validation (financial data, medical records), combine regex with additional server-side checks. Regex is the first gate — not the last.`,
      quiz: [
        {
          question: 'What does string.matchAll() return that string.match() with the g flag does not?',
          options: [
            'The global flag is required for matchAll but not for match',
            'matchAll returns an iterator where each match includes full capture group information',
            'matchAll returns a Promise',
            'matchAll is case-insensitive by default',
          ],
          answer: 1,
        },
        {
          question: 'How do you reference the first captured group in a replace() replacement string?',
          options: [
            '\\1',
            '#{1}',
            '$1',
            '%1',
          ],
          answer: 2,
        },
        {
          question: 'Which flag makes a regex find ALL occurrences in a string instead of just the first?',
          options: [
            'i',
            'm',
            'g',
            's',
          ],
          answer: 2,
        },
        {
          question: 'Why is a single regex often not sufficient for validating a strong password?',
          options: [
            'Regex cannot handle passwords',
            'A single regex can check for character types but mixing all requirements in one pattern becomes complex and hard to maintain — multiple simple tests is clearer',
            'Passwords must be validated server-side only',
            'The g flag is not allowed in password validation',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Complete the validateForm function using regular expressions. It should return an object with an error message for each invalid field, or an empty object if everything is valid.',
        starterCode: `function validateForm({ email, zip, phone }) {
  const errors = {};

  // 1. Validate email: must match basic email format
  //    (letters/digits/dots/etc before @, domain, 2+ letter TLD)
  if (!/* your email regex */.test(email)) {
    errors.email = 'Please enter a valid email address';
  }

  // 2. Validate ZIP: must be exactly 5 digits
  if (!/* your ZIP regex */.test(zip)) {
    errors.zip = 'ZIP code must be 5 digits';
  }

  // 3. Validate phone: exactly 10 digits (no spaces or dashes)
  if (!/* your phone regex */.test(phone)) {
    errors.phone = 'Phone must be 10 digits with no spaces or dashes';
  }

  return errors;
}`,
        solution: `function validateForm({ email, zip, phone }) {
  const errors = {};

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!/^\\d{5}$/.test(zip)) {
    errors.zip = 'ZIP code must be 5 digits';
  }

  if (!/^\\d{10}$/.test(phone)) {
    errors.phone = 'Phone must be 10 digits with no spaces or dashes';
  }

  return errors;
}`,
      },
    },
  ],
};

window.regexModule = regexModule;
