const cssModule = {
  id: 'css',
  title: 'CSS Fundamentals',
  description: 'CSS is the language that controls how your HTML looks — colors, fonts, spacing, and layout. No experience needed. We will build up from the very basics.',
  objectives: [
    'Understand what CSS is and why we need it',
    'Write CSS rules and connect them to HTML',
    'Target specific elements with selectors',
    'Control colors, fonts, and text styling',
    'Understand the box model and how spacing works',
    'Build flexible layouts with Flexbox',
  ],
  goals: [
    'Style a complete HTML page with CSS',
    'Build a readable, well-spaced layout',
    'Create a navigation bar using Flexbox',
    'Write CSS that respects keyboard users with visible focus indicators',
  ],
  lessons: [
    {
      id: 'css-1',
      title: 'Lesson 1: What Is CSS and Why Do We Need It?',
      content: `Without CSS, every web page looks the same: black text on a white background, using the browser's default font. CSS is what makes the web visually interesting — and it is also what makes pages readable and usable.

WHAT DOES CSS STAND FOR?
CSS stands for Cascading Style Sheets. Let's break that down:
- Style Sheets: files (or blocks of code) that contain style rules
- Cascading: when multiple rules apply to the same element, a set of rules determines which one wins

WHAT CAN CSS DO?
CSS controls the visual presentation of your HTML:
- Colors — background colors, text colors, borders
- Typography — fonts, text size, line spacing, alignment
- Spacing — margins, padding, gaps between elements
- Layout — arranging elements in rows, columns, or grids
- Animation — movement and transitions
- Responsive design — making pages look good on any screen size

HOW CSS CONNECTS TO HTML
You connect CSS to an HTML page using a <link> element inside the <head>:

<head>
  <link rel="stylesheet" href="styles.css" />
</head>

This tells the browser: "for this HTML page, use the rules in styles.css."

WHAT A CSS RULE LOOKS LIKE
A CSS rule has three parts:

p {
  color: navy;
  font-size: 1rem;
}

1. Selector: p — this targets every <p> element on the page
2. Property: color — this is what we are changing
3. Value: navy — this is what we are changing it to

The curly braces { } wrap all the rules for that selector. Each rule is a property: value; pair ending with a semicolon.

You can have as many property: value pairs as you need inside one selector.`,
      quiz: [
        {
          question: 'What element do you use inside <head> to connect a CSS file to your HTML page?',
          options: [
            '<style src="styles.css" />',
            '<css href="styles.css" />',
            '<link rel="stylesheet" href="styles.css" />',
            '<script src="styles.css"></script>',
          ],
          answer: 2,
        },
        {
          question: 'In a CSS rule, what are the three parts?',
          options: [
            'Tag, class, and value',
            'Selector, property, and value',
            'HTML, head, and body',
            'Opening, content, and closing',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write a CSS rule that styles all <h1> elements with: a color of #1e293b (a dark navy), a font-size of 2rem, and a margin-bottom of 1rem. Then write a second rule that styles all <p> elements with a color of #475569 (a medium grey) and a line-height of 1.7.',
        starterCode: `/* Style all h1 elements */

/* Style all p elements */
`,
        solution: `/* Style all h1 elements */
h1 {
  color: #1e293b;
  font-size: 2rem;
  margin-bottom: 1rem;
}

/* Style all p elements */
p {
  color: #475569;
  line-height: 1.7;
}`,
      },
    },
    {
      id: 'css-2',
      title: 'Lesson 2: Selectors — Targeting What You Want to Style',
      content: `A CSS rule only applies to the elements you select. Learning to write precise selectors is one of the most important CSS skills.

THE ELEMENT SELECTOR
Targets every instance of a given tag:

h1 { }      — all <h1> elements
p { }       — all <p> elements
button { }  — all <button> elements

Use when you want a consistent style across all instances of that element.

THE CLASS SELECTOR
A class is a label you add to one or more HTML elements. You define the style once; any element with that class gets those styles.

HTML:  <p class="highlight">Important text</p>
CSS:   .highlight { background-color: yellow; }

The dot (.) before the name is what makes it a class selector. You can apply the same class to as many elements as you like.

THE ID SELECTOR
An ID is a unique label — each ID should appear only once per page.

HTML:  <nav id="main-nav">...</nav>
CSS:   #main-nav { background: #1e293b; }

The hash (#) before the name makes it an ID selector. Use IDs sparingly in CSS — classes are more flexible.

COMBINING SELECTORS
You can apply the same rules to multiple selectors at once by separating them with commas:

h1, h2, h3 { font-family: Georgia, serif; }

PSEUDO-CLASS SELECTORS
These target elements in specific states:

a:hover     { }  — a link when the mouse is over it
a:focus     { }  — an element when it has keyboard focus
button:hover { } — a button when the mouse is over it

THE :focus SELECTOR — ESSENTIAL FOR ACCESSIBILITY
When a keyboard user presses Tab, the browser moves focus through interactive elements. The :focus state shows them where they are. Never remove this indicator without providing a replacement:

:focus-visible {
  outline: 3px solid #f59e0b;
  outline-offset: 3px;
}

This uses :focus-visible, which only shows the outline for keyboard users — not for mouse clicks. It gives keyboard and screen reader users a clear visual marker without affecting mouse users.`,
      quiz: [
        {
          question: 'You want to give three different paragraphs a blue background, but leave all other paragraphs unstyled. What is the best approach?',
          options: [
            'Use the p { } selector and style all paragraphs blue',
            'Add a class to those three paragraphs and style the class',
            'Give each paragraph a unique ID',
            'Use JavaScript to add the color',
          ],
          answer: 1,
        },
        {
          question: 'What does the CSS pseudo-class :focus-visible target?',
          options: [
            'Any element currently visible on screen',
            'An element when hovered by a mouse',
            'An element that has keyboard focus, but only when using keyboard navigation',
            'An element that has been clicked',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Write CSS that: (1) Gives all <a> elements a color of #2563eb and no text underline by default. (2) Gives all <a> elements an underline on hover. (3) Gives all focusable elements (:focus-visible) a 3px solid orange (#f59e0b) outline with 3px offset. (4) Gives elements with the class "card" a white background, 1.5rem padding, and a 1px solid #e2e8f0 border.',
        starterCode: `/* Links */

/* Links on hover */

/* Focus indicator for keyboard users */

/* .card class */
`,
        solution: `/* Links */
a {
  color: #2563eb;
  text-decoration: none;
}

/* Links on hover */
a:hover {
  text-decoration: underline;
}

/* Focus indicator for keyboard users */
:focus-visible {
  outline: 3px solid #f59e0b;
  outline-offset: 3px;
}

/* .card class */
.card {
  background-color: white;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
}`,
      },
    },
    {
      id: 'css-3',
      title: 'Lesson 3: Colors, Fonts, and Text',
      content: `Typography and color are the most visible parts of any design. They also directly affect whether your page is readable.

COLORS IN CSS
CSS accepts colors in several formats:

Named colors:  color: red;  color: navy;  color: tomato;
Hex codes:     color: #1e293b;   (# followed by 6 hexadecimal digits)
RGB:           color: rgb(30, 41, 59);
RGBA:          color: rgba(30, 41, 59, 0.5);   (the 4th number is opacity, 0–1)

Hex codes are the most common in professional code. The six digits are three pairs representing Red, Green, and Blue values from 00 (none) to ff (full).

TEXT COLOR AND BACKGROUND COLOR
color: sets the text color
background-color: sets the background color

Always make sure text has enough contrast against its background. The minimum ratio recommended for normal text is 4.5:1. Dark text on light backgrounds or light text on dark backgrounds usually works well.

FONTS
font-family sets the typeface. List your preferred font first, then fallbacks:

font-family: 'Segoe UI', Arial, sans-serif;

The browser uses the first font it can find. sans-serif is a generic fallback the browser can always provide.

font-size controls how large text is. Use rem units (relative to the root font size, typically 16px):
  1rem = 16px (the default)
  1.5rem = 24px
  2rem = 32px

Rem units respect the user's font size preferences — this is important for accessibility.

font-weight controls thickness:
  font-weight: 400;   — normal
  font-weight: 600;   — semi-bold
  font-weight: 700;   — bold

LINE HEIGHT
line-height controls the space between lines of text. A comfortable line height for body text is 1.5 to 1.7:
  line-height: 1.6;

TEXT ALIGNMENT
text-align: left;    — default for most languages
text-align: center;
text-align: right;

Avoid centering long paragraphs — it is much harder to read than left-aligned text.`,
      quiz: [
        {
          question: 'Why should you use rem units for font sizes instead of pixels (px)?',
          options: [
            'Rem units make text appear larger automatically',
            'Rem units respect the user\'s browser font size settings, which is important for accessibility',
            'Pixels are not supported in modern browsers',
            'Rem units are faster to type than pixels',
          ],
          answer: 1,
        },
        {
          question: 'What does font-family: "Georgia", serif; mean?',
          options: [
            'Use Georgia font only; fail if it is not available',
            'Use the serif font named Georgia',
            'Use Georgia as the preferred font; if not available, use any serif font the browser has',
            'Apply a Georgia-style color theme',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Write a CSS rule for the <body> element that sets: a background color of #f8fafc, a text color of #1e293b, a font-family of "Segoe UI", Arial, sans-serif, a font-size of 1rem, and a line-height of 1.6. Then write a rule for <h1> that sets font-size to 2.5rem, font-weight to 700, and color to #0f172a.',
        starterCode: `/* Body styles */

/* h1 styles */
`,
        solution: `/* Body styles */
body {
  background-color: #f8fafc;
  color: #1e293b;
  font-family: "Segoe UI", Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}

/* h1 styles */
h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #0f172a;
}`,
      },
    },
    {
      id: 'css-4',
      title: 'Lesson 4: The Box Model — Spacing and Sizing',
      content: `Every element on a web page is a rectangular box. Understanding the box model is the key to controlling spacing and sizing.

THE FOUR LAYERS OF EVERY BOX
From inside to outside:

1. CONTENT — the actual text, image, or other content inside the element
2. PADDING — space between the content and the border (inside the element)
3. BORDER — a line around the element
4. MARGIN — space outside the border (between this element and its neighbors)

Imagine a framed painting:
- The painting itself = content
- The mat board around the painting = padding
- The frame = border
- The wall space between frames = margin

WRITING THESE IN CSS
padding: 1rem;                    — same on all four sides
padding: 1rem 2rem;               — top/bottom: 1rem, left/right: 2rem
padding-top: 0.5rem;              — just the top

margin: 0 auto;                   — 0 top/bottom, auto left/right (centers the element)
margin-bottom: 1.5rem;

border: 1px solid #e2e8f0;        — a 1px solid border
border-radius: 8px;               — rounds the corners

THE BOX-SIZING FIX
By default, if you set an element's width to 200px and add 20px of padding, the element becomes 240px wide — the padding is added on top of the width. This is confusing and leads to layout bugs.

The fix is to use box-sizing: border-box, which includes padding and border inside the width:

*, *::before, *::after {
  box-sizing: border-box;
}

Put this at the very top of every CSS file you write. It makes sizing predictable.

WIDTH AND HEIGHT
width: 100%;                  — stretches to fill the container
width: 400px;                 — fixed 400px width
max-width: 800px;             — never wider than 800px (great for readability)
height: auto;                 — grows to fit content (usually what you want)`,
      quiz: [
        {
          question: 'What is the difference between padding and margin?',
          options: [
            'Padding is outside the border; margin is inside',
            'Padding is inside the element (between content and border); margin is outside the element (between elements)',
            'They are two names for the same thing',
            'Padding controls the border thickness; margin controls text size',
          ],
          answer: 1,
        },
        {
          question: 'What does box-sizing: border-box do?',
          options: [
            'Adds a visible border around every element',
            'Makes the border glow in a box shape',
            'Includes padding and border inside the element\'s declared width, making sizing predictable',
            'Removes all margins from the page',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Write CSS for a .card element that: applies the box-sizing fix globally first (*, *::before, *::after), then gives .card a max-width of 500px, padding of 2rem, a background of white, a border of 1px solid #e2e8f0, a border-radius of 12px, and a margin of 0 auto (to center it).',
        starterCode: `/* Box-sizing fix */

/* .card */
`,
        solution: `/* Box-sizing fix */
*, *::before, *::after {
  box-sizing: border-box;
}

/* .card */
.card {
  max-width: 500px;
  padding: 2rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin: 0 auto;
}`,
      },
    },
    {
      id: 'css-5',
      title: 'Lesson 5: Layouts with Flexbox',
      content: `For most of web history, creating layouts was complicated and full of workarounds. Flexbox changed that. It is now the standard tool for arranging elements in a row or column.

WHAT IS A LAYOUT?
A layout is how elements are arranged on the page. Without any layout CSS, elements stack on top of each other vertically. Flexbox lets you place elements side by side, space them evenly, and align them.

HOW TO TURN ON FLEXBOX
Add display: flex; to the parent container — the element that wraps the items you want to arrange:

<div class="container">
  <div class="item">One</div>
  <div class="item">Two</div>
  <div class="item">Three</div>
</div>

.container {
  display: flex;
}

Now the three divs sit side by side in a row instead of stacking.

DIRECTION
flex-direction: row;     — items go left to right (default)
flex-direction: column;  — items stack top to bottom

SPACING BETWEEN ITEMS
gap: 1rem;               — adds 1rem of space between every item
gap: 1rem 2rem;          — 1rem between rows, 2rem between columns

ALIGNMENT
Flexbox has two axes. The main axis runs in the flex-direction (row = horizontal). The cross axis is perpendicular.

justify-content — aligns items along the MAIN axis
  justify-content: flex-start;    — all items at the start (default)
  justify-content: center;        — all items centered
  justify-content: space-between; — first item at start, last at end, rest evenly spaced
  justify-content: space-evenly;  — equal space around all items

align-items — aligns items along the CROSS axis
  align-items: stretch;   — items fill the container height (default)
  align-items: center;    — items centered vertically (in a row)
  align-items: flex-start;— items aligned to the top

WRAPPING
flex-wrap: wrap;  — items wrap to the next line if they run out of space
                    (great for responsive layouts)

A COMPLETE NAVIGATION BAR EXAMPLE
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #1e293b;
}`,
      quiz: [
        {
          question: 'Which CSS property do you apply to a container element to turn on Flexbox for its children?',
          options: ['flex: 1', 'display: flex', 'flex-direction: row', 'align-items: center'],
          answer: 1,
        },
        {
          question: 'You have a navigation bar with a logo on the left and links on the right. Which justify-content value achieves this?',
          options: ['justify-content: center', 'justify-content: flex-start', 'justify-content: space-between', 'justify-content: flex-end'],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Write CSS for a navigation bar. The HTML is: <nav class="main-nav"><a href="/">Home</a><a href="/about">About</a><a href="/contact">Contact</a></nav>. Style .main-nav to: use Flexbox, space items evenly with gap of 1.5rem, align items centered vertically, have a background of #1e293b, padding of 1rem 2rem. Also style the links inside it: white color, no text underline, font-weight 600.',
        starterCode: `/* Navigation bar */
.main-nav {

}

/* Links inside the nav */
.main-nav a {

}
`,
        solution: `/* Navigation bar */
.main-nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  background-color: #1e293b;
  padding: 1rem 2rem;
}

/* Links inside the nav */
.main-nav a {
  color: white;
  text-decoration: none;
  font-weight: 600;
}`,
      },
    },
  ],
};

if (typeof module !== 'undefined') module.exports = cssModule;
if (typeof window !== 'undefined') window.cssModule = cssModule;
