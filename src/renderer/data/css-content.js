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
    {
      id: 'css-6',
      title: 'Lesson 6: CSS Grid — Two-Dimensional Layouts',
      content: `Flexbox is great for one-dimensional layouts — a row of items or a column of items. CSS Grid is for two-dimensional layouts — rows AND columns at the same time. Think of it like a spreadsheet for your page layout.

TURNING ON GRID
Like Flexbox, you apply display: grid to the parent container:

<div class="page-layout">
  <header>Header</header>
  <nav>Sidebar</nav>
  <main>Main content</main>
  <footer>Footer</footer>
</div>

.page-layout {
  display: grid;
}

DEFINING COLUMNS: grid-template-columns
This is where Grid gets powerful. You define how many columns the grid has and how wide each one is:

grid-template-columns: 200px 1fr;
  — Two columns: 200px fixed, then the rest of the space

grid-template-columns: 1fr 1fr 1fr;
  — Three equal columns

grid-template-columns: repeat(3, 1fr);
  — Same as above, but shorter to write

THE fr UNIT
fr means "fraction of the available space." It is unique to CSS Grid:
  1fr 1fr     — two equal columns
  1fr 2fr     — second column is twice as wide as the first
  200px 1fr   — fixed sidebar, flexible main area

DEFINING ROWS: grid-template-rows
grid-template-rows: auto 1fr auto;
  — Three rows: header (auto height), main (fills space), footer (auto height)

GAP
gap: 1rem;           — space between all rows and columns
column-gap: 2rem;    — space between columns only
row-gap: 1rem;       — space between rows only

PLACING ITEMS: grid-column and grid-row
You can tell an item to span multiple columns or rows:

header {
  grid-column: 1 / -1;   /* span from column 1 to the last column */
}

1 / -1 means "start at line 1, end at the last line" — spanning the full width.

A COMPLETE PAGE LAYOUT EXAMPLE
.page-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 0;
  min-height: 100vh;
}

header  { grid-column: 1 / -1; }
footer  { grid-column: 1 / -1; }`,
      quiz: [
        {
          question: 'What does grid-template-columns: 1fr 2fr create?',
          options: [
            'One column that is 1px wide and one that is 2px wide',
            'Two columns where the second is twice as wide as the first',
            'Three columns of equal width',
            'A grid with fractions as row heights',
          ],
          answer: 1,
        },
        {
          question: 'What does grid-column: 1 / -1 do to an element?',
          options: [
            'Places it in the first column only',
            'Removes it from the grid',
            'Makes it span from the first column line to the last — the full width of the grid',
            'Sets the column gap to 1 unit',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Write CSS for a classic page layout with a header, sidebar, main content area, and footer. The grid should have: two columns (sidebar: 240px, main: remaining space), three rows (header: auto, content: 1fr, footer: auto), 0 gap, min-height of 100vh. Make the header and footer span both columns.',
        starterCode: `/* Page layout grid */
.page-layout {

}

/* Header spans full width */
.page-layout header {

}

/* Footer spans full width */
.page-layout footer {

}`,
        solution: `/* Page layout grid */
.page-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 0;
  min-height: 100vh;
}

/* Header spans full width */
.page-layout header {
  grid-column: 1 / -1;
}

/* Footer spans full width */
.page-layout footer {
  grid-column: 1 / -1;
}`,
      },
    },
    {
      id: 'css-7',
      title: 'Lesson 7: Responsive Design and Media Queries',
      content: `Responsive design means your page looks good and works well on any screen size — a large desktop monitor, a laptop, a tablet, or a phone. The primary tool for this is the CSS media query.

THE VIEWPORT META TAG
Before writing any responsive CSS, your HTML must have this in <head>:

<meta name="viewport" content="width=device-width, initial-scale=1.0" />

Without it, mobile browsers zoom out to fit the desktop version of the page, ignoring all your responsive CSS.

WHAT IS A MEDIA QUERY?
A media query wraps CSS rules that only apply when certain conditions are true — most commonly, when the screen is narrower than a certain width:

@media (max-width: 768px) {
  /* These rules only apply when the screen is 768px wide or less */
  .sidebar {
    display: none;
  }
}

MOBILE-FIRST APPROACH
Write your base CSS for mobile (small screens) first. Then use media queries to add styles for larger screens:

/* Base styles — mobile */
.nav-links {
  display: none;
}

/* When screen is 768px or wider, show the nav */
@media (min-width: 768px) {
  .nav-links {
    display: flex;
  }
}

Mobile-first is recommended because it forces you to think about the essential content first, and progressively enhance for larger screens.

COMMON BREAKPOINTS (approximate screen widths)
  Small phones:   max-width: 480px
  Tablets:        max-width: 768px
  Small laptops:  max-width: 1024px
  Desktops:       min-width: 1280px

FLEXIBLE IMAGES
Images can overflow their container on small screens. Fix it globally:

img {
  max-width: 100%;
  height: auto;
}

This makes every image shrink to fit its container while preserving its aspect ratio.

FLUID TYPOGRAPHY
Instead of fixed pixel sizes, use clamp() to scale text smoothly:

font-size: clamp(1rem, 2.5vw, 1.5rem);
  — Minimum 1rem, scales with viewport, maximum 1.5rem`,
      quiz: [
        {
          question: 'Why must you include the viewport meta tag for responsive design to work?',
          options: [
            'It speeds up page loading on mobile devices',
            'Without it, mobile browsers zoom out to fit the desktop layout, ignoring your responsive CSS',
            'It is required for CSS Grid to work',
            'It sets the default font size for mobile screens',
          ],
          answer: 1,
        },
        {
          question: 'What is the mobile-first approach?',
          options: [
            'Building a separate website just for mobile users',
            'Writing base styles for mobile, then adding media queries for larger screens using min-width',
            'Using max-width media queries to override desktop styles for mobile',
            'Always starting with a 375px canvas in your design tool',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write responsive CSS for a card grid. On mobile (base styles): cards stack in a single column, full width. At 600px and wider: cards display in a 2-column grid with 1.5rem gap. At 900px and wider: cards display in a 3-column grid. Also add the flexible image rule so images inside cards never overflow.',
        starterCode: `/* Base styles — mobile: single column */
.card-grid {

}

/* 600px and wider: 2 columns */

/* 900px and wider: 3 columns */

/* Flexible images */
`,
        solution: `/* Base styles — mobile: single column */
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

/* 600px and wider: 2 columns */
@media (min-width: 600px) {
  .card-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* 900px and wider: 3 columns */
@media (min-width: 900px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Flexible images */
img {
  max-width: 100%;
  height: auto;
}`,
      },
    },
    {
      id: 'css-8',
      title: 'Lesson 8: CSS Custom Properties (Variables)',
      content: `CSS custom properties — often called CSS variables — let you store values in named containers and reuse them throughout your stylesheet. They make your code easier to maintain and update.

DECLARING A VARIABLE
Variables are declared with two dashes before the name:

:root {
  --color-primary: #6366f1;
  --color-text: #1e293b;
  --spacing-md: 1.5rem;
  --radius: 8px;
}

:root is a special selector that refers to the root of the document (the html element). Variables declared here are available everywhere on the page.

USING A VARIABLE
Use the var() function to apply the variable's value:

button {
  background-color: var(--color-primary);
  border-radius: var(--radius);
  padding: var(--spacing-md);
}

WHY VARIABLES ARE POWERFUL
Without variables, if you use the same color in 50 different places and need to change it, you must update all 50 places. With a variable, you change one line:

:root {
  --color-primary: #6366f1;   /* Change this once */
}

Every element using var(--color-primary) updates automatically.

DEFAULT VALUES
var() accepts a fallback value if the variable is not defined:

color: var(--color-brand, #333);

If --color-brand is not defined, it uses #333.

THEMING WITH VARIABLES
Variables make dark mode simple:

:root {
  --bg: #ffffff;
  --text: #1e293b;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f172a;
    --text: #f8fafc;
  }
}

body {
  background: var(--bg);
  color: var(--text);
}

The variables update automatically based on the user's preference — you do not need to rewrite the body rule.

NAMING CONVENTIONS
Name variables by what they REPRESENT, not what they look like:
  Good:  --color-primary, --spacing-sm, --font-heading
  Bad:   --blue, --sixteen-pixels, --big-font`,
      quiz: [
        {
          question: 'How do you use a CSS variable called --color-accent in a rule?',
          options: [
            'color: --color-accent;',
            'color: $color-accent;',
            'color: var(--color-accent);',
            'color: css(--color-accent);',
          ],
          answer: 2,
        },
        {
          question: 'Why is naming a variable --blue considered bad practice?',
          options: [
            '--blue is not valid CSS syntax',
            'Variable names cannot contain colors',
            'If you change the color to purple, the name --blue is now misleading — name by purpose (--color-primary), not appearance',
            'Blue is a reserved word in CSS',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Create a complete CSS variable system for a small design. In :root, declare variables for: primary color (#6366f1), text color (#1e293b), background (#f8fafc), border radius (8px), and two spacing values (small: 0.75rem, medium: 1.5rem). Then write styles for a .btn element and a .card element that use only var() references — no hardcoded values.',
        starterCode: `/* Design tokens */
:root {

}

/* Button using only variables */
.btn {

}

/* Card using only variables */
.card {

}`,
        solution: `/* Design tokens */
:root {
  --color-primary: #6366f1;
  --color-text: #1e293b;
  --color-bg: #f8fafc;
  --radius: 8px;
  --spacing-sm: 0.75rem;
  --spacing-md: 1.5rem;
}

/* Button using only variables */
.btn {
  background-color: var(--color-primary);
  color: white;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius);
  border: none;
  cursor: pointer;
}

/* Card using only variables */
.card {
  background-color: var(--color-bg);
  color: var(--color-text);
  padding: var(--spacing-md);
  border-radius: var(--radius);
  border: 1px solid #e2e8f0;
}`,
      },
    },
    {
      id: 'css-9',
      title: 'Lesson 9: Transitions and Animations',
      content: `CSS can animate elements smoothly — changing color, size, position, or opacity over time. Used thoughtfully, animation improves usability. Used carelessly, it can make pages inaccessible for users with motion sensitivity.

TRANSITIONS
A transition smoothly animates a change from one state to another (like hover or focus). You add it to the base element, not the hover state:

button {
  background-color: #6366f1;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #818cf8;
}

When the user hovers, the background smoothly changes over 0.2 seconds instead of jumping.

THE transition PROPERTY
transition: property duration timing-function delay;

  property    — what to animate (background-color, transform, opacity, or all)
  duration    — how long (0.2s, 500ms)
  timing-function — the speed curve (ease, linear, ease-in, ease-out)
  delay       — wait before starting (usually 0s)

Common shorthand:
  transition: all 0.2s ease;      — animate everything that changes
  transition: transform 0.3s ease-out;

TRANSFORMS
transform changes an element's shape or position without affecting layout:

  transform: translateY(-2px);     — move up 2px
  transform: scale(1.05);          — grow to 105% size
  transform: rotate(45deg);        — rotate 45 degrees

button:hover {
  transform: translateY(-2px);
  transition: transform 0.15s ease;
}

KEYFRAME ANIMATIONS
For more complex animations, use @keyframes:

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card {
  animation: fadeIn 0.3s ease forwards;
}

ALWAYS RESPECT prefers-reduced-motion
Some users get nausea or seizures from motion. ALWAYS include this at the top of any file with animations:

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

This is not optional — it is an accessibility requirement.`,
      quiz: [
        {
          question: 'Where should the transition property be placed — on the base element or on the :hover state?',
          options: [
            'On the :hover state, so it only applies when hovering',
            'On both the base element and the :hover state',
            'On the base element, so it applies to both entering and leaving the hover state',
            'In a separate @keyframes rule',
          ],
          answer: 2,
        },
        {
          question: 'Why must you always include a prefers-reduced-motion media query when using animations?',
          options: [
            'It is required by the CSS specification',
            'Some users experience nausea, dizziness, or seizures from motion on screen — this query disables animations for them',
            'It makes animations load faster',
            'Without it, animations do not work in Firefox',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write CSS for a button that: smoothly transitions its background color and transform over 0.2s ease on hover (lift up 2px with translateY). Also write a @keyframes animation called "slideIn" that animates from opacity 0 and translateY(16px) to opacity 1 and translateY(0). Apply it to .card elements with 0.3s duration. Finally, write the prefers-reduced-motion override.',
        starterCode: `/* Button with hover transition */
.btn {
  background-color: #6366f1;

}

.btn:hover {

}

/* slideIn keyframe animation */

/* Apply to .card */
.card {

}

/* Reduced motion override — always include this */
`,
        solution: `/* Button with hover transition */
.btn {
  background-color: #6366f1;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.btn:hover {
  background-color: #818cf8;
  transform: translateY(-2px);
}

/* slideIn keyframe animation */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Apply to .card */
.card {
  animation: slideIn 0.3s ease forwards;
}

/* Reduced motion override — always include this */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`,
      },
    },
  ],
};

if (typeof module !== 'undefined') module.exports = cssModule;
if (typeof window !== 'undefined') window.cssModule = cssModule;
