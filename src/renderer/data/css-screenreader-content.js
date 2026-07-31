/* CSS Module — Screen Reader Edition
   This module covers what blind and low-vision users need to know about CSS.
   Focus: how CSS affects accessibility, what to watch for, and CSS patterns
   that every screen reader user who writes code must understand.
*/

const cssScreenReaderModule = {
  id: 'css-sr',
  title: 'CSS for Screen Reader Users',
  description: `This module teaches CSS through the lens of accessibility. As a screen reader user,
you already understand accessibility deeply — this module uses that knowledge as a foundation.
You will learn which CSS properties affect what screen readers announce, which patterns you must
know to write accessible code, and how to reason about visual styling even without seeing it.`,
  objectives: [
    'Understand which CSS properties hide content from screen readers — and which do not',
    'Learn the sr-only (visually hidden) pattern and when to use it',
    'Write CSS focus indicators that keyboard and screen reader users rely on',
    'Understand how CSS display and visibility affect the accessibility tree',
    'Use prefers-reduced-motion to respect users who are sensitive to animation',
    'Use prefers-color-scheme and forced-colors for high-contrast and dark mode support',
    'Understand CSS content ordering vs DOM ordering and why it matters',
    'Know which CSS-generated content (::before, ::after) screen readers may or may not announce',
  ],
  goals: [
    'Write a sr-only utility class from memory and explain what each property does',
    'Identify CSS that incorrectly hides content from screen readers',
    'Build a visible, WCAG-compliant focus indicator',
    'Write a media query that disables animations for users who prefer reduced motion',
  ],
  lessons: [
    {
      id: 'css-sr-1',
      title: 'Lesson 1: How CSS Relates to Screen Readers',
      content: `As a screen reader user, you experience content through the accessibility tree — not the visual rendering.
CSS mostly controls the visual presentation, but some CSS properties directly affect what a screen reader announces.

The key insight: CSS and the accessibility tree are separate systems that occasionally intersect.

What CSS does NOT do:
- CSS does not change the semantic meaning of elements (adding bold styling does not make a <span> a heading)
- CSS does not determine the reading order (that comes from the DOM/HTML order)
- CSS color and font changes have no effect on screen reader output

What CSS CAN do:
- CSS can hide content from everyone, including screen readers (display: none, visibility: hidden)
- CSS can hide content visually but keep it accessible (the sr-only pattern)
- CSS can hide content from sighted users but keep it visible (aria-hidden does not do this — CSS does)
- CSS content property (::before, ::after) may or may not be read by screen readers depending on the browser

Why this matters for you:
When you write code for others to use, understanding these intersections lets you write CSS that is
accessible by default — not accidentally broken.`,
      quiz: [
        {
          question: 'Does changing the CSS font-size of a paragraph affect what a screen reader announces?',
          options: [
            'Yes, larger text is announced as a heading',
            'No, CSS styling has no effect on screen reader output',
            'Only if the font-size is greater than 24px',
            'Yes, the screen reader reads the font size aloud',
          ],
          answer: 1,
        },
        {
          question: 'What determines the reading order a screen reader uses on a page?',
          options: [
            'The CSS order property',
            'The CSS float property',
            'The HTML DOM order (the order elements appear in the source)',
            'The z-index of each element',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: `Look at the CSS below. Identify which properties DO affect screen readers and which do not.
Add a comment next to each property: /* affects screen readers */ or /* visual only */`,
        starterCode: `p {
  color: #333;
  display: none;
  font-size: 1.2rem;
  visibility: hidden;
  font-weight: bold;
  background-color: yellow;
}`,
        solution: `p {
  color: #333;              /* visual only */
  display: none;            /* affects screen readers — hides from everyone */
  font-size: 1.2rem;        /* visual only */
  visibility: hidden;       /* affects screen readers — hides from everyone */
  font-weight: bold;        /* visual only */
  background-color: yellow; /* visual only */
}`,
      },
    },
    {
      id: 'css-sr-2',
      title: 'Lesson 2: Hiding Content — The Right and Wrong Ways',
      content: `There are four ways to hide content with CSS, and they behave very differently for screen readers.

1. display: none
   - Hidden from sighted users AND screen readers
   - Element is removed from the layout entirely
   - Use when content should be completely hidden (a collapsed menu)

2. visibility: hidden
   - Hidden from sighted users AND screen readers
   - Element still takes up space in layout
   - Use rarely — prefer display: none for full hiding

3. opacity: 0
   - Hidden from sighted users but STILL READ by screen readers
   - Use with caution — sighted users cannot see it but screen readers announce it
   - Good for animation transitions where content appears/disappears

4. The sr-only / visually-hidden pattern
   - Hidden from sighted users but STILL READ by screen readers
   - Use for text that gives screen reader users extra context

The sr-only pattern (memorize this):
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

Example use: a button that says "X" visually but has sr-only text "Close dialog"
<button>
  <span aria-hidden="true">X</span>
  <span class="sr-only">Close dialog</span>
</button>`,
      quiz: [
        {
          question: 'Which CSS property hides an element visually but still allows screen readers to announce it?',
          options: [
            'display: none',
            'visibility: hidden',
            'opacity: 0',
            'display: block',
          ],
          answer: 2,
        },
        {
          question: 'What is the sr-only pattern used for?',
          options: [
            'Making text larger for low-vision users',
            'Hiding content from screen readers while showing it visually',
            'Providing extra descriptive text to screen readers that is hidden visually',
            'Removing elements from the DOM',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: `Write the complete sr-only CSS class from memory. Then write an example HTML button
that has a visible icon (use the letter "i") and sr-only text that says "More information about pricing".`,
        starterCode: `/* Write the sr-only class */
.sr-only {

}

/* Write the HTML button below as a CSS comment — it will not be styled but write it out */
/*

*/`,
        solution: `.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/*
<button>
  <span aria-hidden="true">i</span>
  <span class="sr-only">More information about pricing</span>
</button>
*/`,
      },
    },
    {
      id: 'css-sr-3',
      title: 'Lesson 3: Focus Indicators',
      content: `Focus indicators are the visual outline that appears on a focused element.
For keyboard users and screen reader users who use a keyboard, focus indicators are essential —
without them, sighted keyboard users have no idea where they are on the page.

Even if you use a screen reader exclusively, the people who use your code may also be sighted keyboard users.
Writing good focus styles is part of being a thoughtful developer.

The default browser focus outline is often inadequate — too thin, too low contrast, or removed by CSS resets.

WCAG 2.1 Success Criterion 2.4.11 (AA) requires:
- Focus indicator must have a contrast ratio of at least 3:1 against adjacent colors
- The focused component must not be entirely hidden

A strong, reliable focus indicator:

:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 3px;
  border-radius: 2px;
}

Note: :focus-visible only shows the outline for keyboard navigation, not mouse clicks.
This is usually preferable to :focus which shows on all interactions.

Never do this:
* { outline: none; } /* This destroys keyboard accessibility */
a:focus { outline: 0; } /* Never remove focus outlines without a replacement */`,
      quiz: [
        {
          question: 'What does outline: none do to keyboard accessibility?',
          options: [
            'It improves it by removing visual clutter',
            'It has no effect on keyboard users',
            'It removes the visual indicator that shows keyboard users where they are',
            'It only affects mouse users',
          ],
          answer: 2,
        },
        {
          question: 'What is the difference between :focus and :focus-visible?',
          options: [
            'They are identical — different names for the same thing',
            ':focus-visible only shows on keyboard navigation; :focus shows on all interactions including mouse clicks',
            ':focus is for links; :focus-visible is for buttons',
            ':focus-visible requires JavaScript to work',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write a CSS rule that gives all interactive elements (a, button, input, select, textarea) a strong, WCAG-compliant focus indicator using :focus-visible.',
        starterCode: `/* Write your focus indicator styles below */
`,
        solution: `a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 3px;
  border-radius: 2px;
}`,
      },
    },
    {
      id: 'css-sr-4',
      title: 'Lesson 4: Motion, Color Schemes, and Forced Colors',
      content: `CSS media queries let you adapt your styles based on user preferences set at the OS level.
These are critical for accessibility and directly benefit screen reader and low-vision users.

1. prefers-reduced-motion
Users with vestibular disorders or motion sensitivity can turn off animations in their OS.
This query detects that preference:

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

2. prefers-color-scheme
Detects whether the user prefers dark or light mode:

@media (prefers-color-scheme: dark) {
  body {
    background-color: #0f172a;
    color: #f8fafc;
  }
}

3. forced-colors (Windows High Contrast mode)
Windows High Contrast mode forces its own color palette. Many screen reader users use this.
The forced-colors media query lets you adapt your layout:

@media (forced-colors: active) {
  .custom-button {
    border: 2px solid ButtonText;
  }
}

In forced-colors mode, CSS backgrounds and colors are overridden by the OS.
Use system color keywords (ButtonText, CanvasText, LinkText) not hex values.`,
      quiz: [
        {
          question: 'What does the prefers-reduced-motion media query detect?',
          options: [
            'Whether the user has a slow internet connection',
            'Whether the user has set their OS to reduce or eliminate animations',
            'Whether the browser supports CSS animations',
            'Whether the page has too many animations',
          ],
          answer: 1,
        },
        {
          question: 'In Windows High Contrast (forced-colors) mode, what happens to CSS background colors?',
          options: [
            'They become black and white automatically',
            'They are preserved exactly as written',
            'They are overridden by the operating system color scheme',
            'They are doubled in contrast',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Write a CSS media query block that: (1) Removes all transitions and animations when the user prefers reduced motion. (2) Applies a dark background (#0f172a) and light text (#f8fafc) when the user prefers dark color scheme.',
        starterCode: `/* Reduced motion */

/* Dark mode */
`,
        solution: `@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: #0f172a;
    color: #f8fafc;
  }
}`,
      },
    },
    {
      id: 'css-sr-5',
      title: 'Lesson 5: CSS Order vs DOM Order',
      content: `CSS can visually reorder elements — but screen readers always follow DOM (HTML source) order.
This creates a dangerous mismatch if you use CSS order without thinking about accessibility.

CSS properties that change visual order:
- order property in Flexbox
- grid-template-areas in CSS Grid
- position: absolute / fixed
- float

Example of a problem:
HTML source order: Logo, Nav, Main, Sidebar
CSS Grid reorder: Sidebar, Logo, Main, Nav (using grid-template-areas)

A sighted user reads: Sidebar → Logo → Main → Nav (what they see visually)
A screen reader user reads: Logo → Nav → Main → Sidebar (HTML source order)

This is confusing and is a WCAG 2.4.3 (Focus Order) failure.

The rule: The visual reading order should match the DOM source order.
If you use CSS to reorder content, make sure the experience still makes sense in the source order.

When visual reordering IS acceptable:
- Decorative elements that have no semantic importance
- Elements that are equally valid in either position (swapping two visually symmetric columns)`,
      quiz: [
        {
          question: 'Which order does a screen reader follow when reading a page?',
          options: [
            'The visual order as rendered on screen',
            'Alphabetical order by element ID',
            'The DOM source order — the order elements appear in the HTML',
            'The order specified by the CSS order property',
          ],
          answer: 2,
        },
        {
          question: 'When might it be acceptable to use CSS to visually reorder content differently from the DOM order?',
          options: [
            'Never — visual order must always match DOM order exactly',
            'When the elements are decorative or equally valid in either position',
            'Whenever it makes the design look better',
            'Only with JavaScript enabled',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: `The CSS below uses flexbox to reverse the visual order of two elements.
Explain in comments why this could be an accessibility problem, and suggest a fix.`,
        starterCode: `/* HTML: <div class="row"><div class="a">First</div><div class="b">Second</div></div> */

.row {
  display: flex;
  flex-direction: row-reverse; /* DOM order: First, Second — Visual order: Second, First */
}

/* What is the problem? */

/* What is the fix? */
`,
        solution: `/* HTML: <div class="row"><div class="a">First</div><div class="b">Second</div></div> */

.row {
  display: flex;
  flex-direction: row-reverse; /* DOM order: First, Second — Visual order: Second, First */
}

/* Problem: Screen readers read "First" then "Second" (DOM order),
   but sighted users see "Second" then "First" (visual order).
   This mismatch creates a confusing experience and violates WCAG 2.4.3 Focus Order. */

/* Fix: Reorder the HTML source so the DOM order matches the intended reading order,
   then use CSS without row-reverse:

   <div class="row">
     <div class="b">Second</div>
     <div class="a">First</div>
   </div>

   .row { display: flex; }

   Now both sighted and screen reader users read: Second, First.
*/`,
      },
    },
  ],
};

if (typeof module !== 'undefined') module.exports = cssScreenReaderModule;
if (typeof window !== 'undefined') window.cssScreenReaderModule = cssScreenReaderModule;
