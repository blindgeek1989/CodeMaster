const cssScreenReaderModule = {
  id: 'css-sr',
  title: 'CSS for Screen Reader Users',
  description: 'This module teaches CSS from an accessibility-first perspective. As someone who uses a screen reader, you already understand accessibility deeply. This module uses that knowledge as your starting point, and explains CSS in terms of how it affects what screen readers announce.',
  objectives: [
    'Understand which CSS properties affect screen readers and which do not',
    'Learn the visually hidden (sr-only) pattern and write it from memory',
    'Write focus indicators that keyboard users depend on',
    'Use media queries to respect motion sensitivity and high-contrast preferences',
    'Understand how CSS visual order can conflict with screen reader order',
    'Know when CSS-generated content is read by screen readers',
  ],
  goals: [
    'Write an sr-only class from memory and explain every property in it',
    'Identify CSS that incorrectly hides content from screen readers',
    'Build a WCAG-compliant focus indicator',
    'Write a prefers-reduced-motion media query that disables animations',
  ],
  lessons: [
    {
      id: 'css-sr-1',
      title: 'Lesson 1: CSS and Screen Readers — What You Need to Know',
      content: `If you have used a screen reader, you already have an advantage that most CSS students do not: you understand how content is experienced without visual rendering. This module builds on that.

TWO SEPARATE SYSTEMS
When a browser loads a web page, it builds two things:
1. The visual render — what sighted users see on screen
2. The accessibility tree — a structured representation of the page that assistive technologies like screen readers, braille displays, and voice control software use

CSS controls the visual render. It has almost no effect on the accessibility tree — but there are important exceptions.

WHAT CSS DOES NOT AFFECT (FOR SCREEN READERS)
- font-size: making text larger or smaller does not change what a screen reader announces
- color: changing the color of text has no effect on the spoken output
- font-weight: bold styling does not make text sound "louder" or more important
- background-color: a yellow highlight does nothing for a screen reader user
- text-align, letter-spacing, text-transform: all visual only

WHAT CSS DOES AFFECT (FOR SCREEN READERS)
A small number of CSS properties DO change what screen readers announce:
- display: none — removes the element from both the visual render AND the accessibility tree. Screen readers cannot find it at all.
- visibility: hidden — same result: hidden from everyone including screen readers.
- opacity: 0 — hides visually but does NOT remove from the accessibility tree. Screen readers will still announce it.

WHY THIS MATTERS WHEN YOU WRITE CODE
When you write CSS for others, understanding this difference lets you make deliberate decisions. Do you want to hide something from everyone? Use display: none. Do you want to hide it visually but keep it accessible? You need a different technique — which is what the next lesson covers.

THE KEY INSIGHT
The accessibility tree and the visual render are separate systems. CSS mostly controls the visual system. But a few CSS properties reach into the accessibility tree — and you need to know which ones they are.`,
      quiz: [
        {
          question: 'A developer sets an element\'s color to white on a white background, making it visually invisible. Can a screen reader still find it?',
          options: [
            'No — if it is invisible, screen readers cannot detect it',
            'Yes — CSS color has no effect on the accessibility tree; the element is still there',
            'Only if the element has an aria-label',
            'Only if the element is a heading',
          ],
          answer: 1,
        },
        {
          question: 'Which CSS property removes an element from the accessibility tree entirely, so screen readers cannot find it?',
          options: ['opacity: 0', 'color: transparent', 'display: none', 'font-size: 0'],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'For each CSS property below, write a comment labeling it as either "affects screen readers" or "visual only". Think carefully about opacity vs display.',
        starterCode: `p {
  color: #333;           /*  */
  display: none;         /*  */
  font-size: 1.2rem;     /*  */
  visibility: hidden;    /*  */
  font-weight: bold;     /*  */
  opacity: 0;            /*  */
  background: yellow;    /*  */
}`,
        solution: `p {
  color: #333;           /* visual only */
  display: none;         /* affects screen readers — removes from accessibility tree */
  font-size: 1.2rem;     /* visual only */
  visibility: hidden;    /* affects screen readers — removes from accessibility tree */
  font-weight: bold;     /* visual only */
  opacity: 0;            /* visual only — element is still in accessibility tree */
  background: yellow;    /* visual only */
}`,
      },
    },
    {
      id: 'css-sr-2',
      title: 'Lesson 2: Showing and Hiding Content the Right Way',
      content: `One of the most important things to understand as a developer who uses a screen reader is how to hide content correctly — because hiding it the wrong way has real accessibility consequences.

FOUR WAYS TO HIDE CONTENT
Here is how each method behaves for sighted users and for screen readers:

1. display: none
   Sighted users: cannot see it
   Screen readers: cannot find it (removed from accessibility tree)
   Space in layout: element takes no space
   USE WHEN: you want to completely hide something from everyone — for example, a menu that is closed

2. visibility: hidden
   Sighted users: cannot see it
   Screen readers: cannot find it (removed from accessibility tree)
   Space in layout: element still takes up space (unlike display: none)
   USE WHEN: rarely — usually prefer display: none for full hiding

3. opacity: 0
   Sighted users: cannot see it (transparent)
   Screen readers: CAN still find and read it
   Space in layout: element takes up space
   USE WHEN: animating an element in/out while keeping it accessible during the transition — but be careful, sighted users cannot see it

4. The sr-only pattern (visually hidden)
   Sighted users: cannot see it (it is clipped to 1x1 pixel)
   Screen readers: CAN find and read it
   Space in layout: takes minimal space
   USE WHEN: adding extra context for screen reader users that sighted users do not need

THE sr-only PATTERN — MEMORIZE THIS
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

This class makes an element invisible to sighted users while keeping it fully accessible to screen readers.

WHEN TO USE sr-only
Example: An icon button that shows an "X" visually but needs to say "Close dialog" for screen readers:

<button>
  <span aria-hidden="true">X</span>
  <span class="sr-only">Close dialog</span>
</button>

The X is decorative (hidden from screen readers with aria-hidden="true"), and the sr-only span provides the meaningful label.`,
      quiz: [
        {
          question: 'You are building a search button that shows a magnifying glass icon visually. What is the correct way to make it accessible?',
          options: [
            'Add title="Search" to the button',
            'Add a hidden <span class="sr-only">Search</span> inside the button',
            'Set display: none on the icon',
            'Use opacity: 0 on the button label',
          ],
          answer: 1,
        },
        {
          question: 'What does margin: -1px in the sr-only class do?',
          options: [
            'Removes the element from the page entirely',
            'Pulls the element slightly outside its normal position to prevent it from affecting layout',
            'Makes the element 1 pixel in size',
            'Clips the element to a 1px square',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write the complete sr-only CSS class from memory. Then in a comment, write the HTML for a "Delete" icon button where the trash icon (use the letter "D" as a stand-in) is hidden from screen readers and the text "Delete item" is visually hidden but accessible.',
        starterCode: `/* Write the sr-only class */
.sr-only {

}

/* Write your HTML example in this comment:
<button>

</button>
*/`,
        solution: `/* Write the sr-only class */
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

/* Write your HTML example in this comment:
<button>
  <span aria-hidden="true">D</span>
  <span class="sr-only">Delete item</span>
</button>
*/`,
      },
    },
    {
      id: 'css-sr-3',
      title: 'Lesson 3: Focus Styles — Helping Keyboard Users Find Their Place',
      content: `A focus indicator is the visual outline that appears on an element when a keyboard user moves focus to it by pressing Tab. It is one of the most important accessibility features on the web.

WHY FOCUS INDICATORS MATTER
Screen reader users often use a keyboard or a braille keyboard to navigate. Even users who are not screen reader users — people with motor disabilities, power users, anyone who prefers keyboard navigation — depend on the focus indicator to know where they are on the page.

Without a focus indicator, keyboard navigation is effectively blind. The user has no idea which element is currently selected.

THE PROBLEM
Many websites remove the default browser focus outline using:
  * { outline: none; }
  a:focus { outline: 0; }

This is done for aesthetic reasons, but it destroys keyboard accessibility. It makes the page unusable for anyone who cannot use a mouse.

As a developer — especially one who uses assistive technology — you understand what this feels like.

THE DEFAULT BROWSER FOCUS
Every browser shows a focus indicator by default, but it is often:
- Too thin to see clearly
- Too low contrast against some backgrounds
- Overridden by CSS resets without replacement

HOW TO WRITE A GOOD FOCUS INDICATOR
:focus-visible targets elements that received focus via keyboard navigation only (not mouse clicks). This is usually what you want:

:focus-visible {
  outline: 3px solid #f59e0b;
  outline-offset: 3px;
  border-radius: 2px;
}

What makes this good:
- 3px is thick enough to see clearly
- A bright amber (#f59e0b) contrasts well against most backgrounds
- outline-offset: 3px gives the outline a bit of breathing room from the element
- border-radius: 2px softens the corners to match modern design

WCAG REQUIREMENTS
WCAG 2.1 Success Criterion 2.4.7 requires that any keyboard-operable interface has a visible focus indicator. Never remove it without providing a replacement.`,
      quiz: [
        {
          question: 'A developer writes * { outline: none; } in their global CSS. What is the impact?',
          options: [
            'Only images lose their outlines',
            'The page looks cleaner with no change to accessibility',
            'All keyboard focus indicators are removed, making keyboard navigation inaccessible',
            'Screen readers stop reading the page',
          ],
          answer: 2,
        },
        {
          question: 'What is the difference between :focus and :focus-visible?',
          options: [
            'They are exactly the same',
            ':focus is for links; :focus-visible is for buttons',
            ':focus applies to all focus events including mouse clicks; :focus-visible applies only during keyboard navigation',
            ':focus-visible requires JavaScript to work',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Write a complete focus indicator rule using :focus-visible that applies to all links, buttons, inputs, selects, and textareas. Use a 3px solid outline in #6366f1 (indigo) with a 3px offset and 2px border-radius. Also write a rule that explicitly does NOT remove the default outline (show what NOT to do in a comment).',
        starterCode: `/* NEVER do this: */

/* Correct focus indicator */
`,
        solution: `/* NEVER do this: */
/* * { outline: none; } — this destroys keyboard accessibility */

/* Correct focus indicator */
a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 3px solid #6366f1;
  outline-offset: 3px;
  border-radius: 2px;
}`,
      },
    },
    {
      id: 'css-sr-4',
      title: 'Lesson 4: Respecting User Preferences with Media Queries',
      content: `CSS media queries can detect preferences the user has set in their operating system. These preferences exist because some users need them for health or accessibility reasons — and honoring them is an important part of accessible design.

WHAT IS A MEDIA QUERY?
A media query is a CSS rule that only applies under certain conditions. The condition goes in parentheses after @media:

@media (max-width: 600px) { }    — applies when the screen is 600px or narrower

But media queries can also respond to user preferences:

1. prefers-reduced-motion
Some users experience nausea, dizziness, or seizures from animations and moving content on screen. They can enable a "Reduce Motion" setting in their OS (available in Windows, macOS, iOS, and Android). This media query detects that setting:

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

This effectively disables all animations for users who need it.

2. prefers-color-scheme
Detects whether the user has set their OS to prefer dark or light mode:

@media (prefers-color-scheme: dark) {
  body {
    background-color: #0f172a;
    color: #f8fafc;
  }
}

3. forced-colors (Windows High Contrast mode)
Many screen reader users also use Windows High Contrast mode, which overrides colors with a high-contrast palette. CSS backgrounds and custom colors are replaced by system colors.

@media (forced-colors: active) {
  .custom-button {
    border: 2px solid ButtonText;
  }
}

In forced-colors mode, use system color keywords (ButtonText, CanvasText, LinkText, Highlight) instead of hex values — because hex values will be overridden anyway.

THE RULE
Always include a prefers-reduced-motion query if your page has any animations or transitions. It takes five minutes and it significantly improves the experience for users who are affected by motion.`,
      quiz: [
        {
          question: 'Who uses the "Reduce Motion" OS setting?',
          options: [
            'Only blind users',
            'Only users on slow internet connections',
            'Users who experience nausea, dizziness, or seizures from screen animations',
            'Users who want faster page load times',
          ],
          answer: 2,
        },
        {
          question: 'In Windows High Contrast (forced-colors: active) mode, what happens to CSS background-color values set with hex codes?',
          options: [
            'They are preserved exactly as written',
            'They are converted to greyscale',
            'They are overridden by the operating system\'s high-contrast color scheme',
            'They are doubled in brightness',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Write three separate media query blocks: (1) A prefers-reduced-motion block that disables all animations and transitions globally. (2) A prefers-color-scheme: dark block that sets body background to #0f172a and text color to #f8fafc. (3) A forced-colors: active block that adds a 2px solid ButtonText border to elements with the class .btn.',
        starterCode: `/* 1. Reduced motion */

/* 2. Dark mode */

/* 3. High contrast / forced colors */
`,
        solution: `/* 1. Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* 2. Dark mode */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #0f172a;
    color: #f8fafc;
  }
}

/* 3. High contrast / forced colors */
@media (forced-colors: active) {
  .btn {
    border: 2px solid ButtonText;
  }
}`,
      },
    },
    {
      id: 'css-sr-5',
      title: 'Lesson 5: Reading Order — Does Your Page Make Sense?',
      content: `One of the most subtle but important accessibility issues in CSS is the difference between visual order and DOM order.

WHAT IS DOM ORDER?
The DOM (Document Object Model) is the browser's internal representation of your HTML — it follows the source order, meaning the order elements appear in your HTML file.

Screen readers follow DOM order. They read content in the order it appears in the HTML, from top to bottom.

WHAT IS VISUAL ORDER?
Visual order is how elements appear on screen after CSS is applied. CSS has several properties that change visual order without changing DOM order:
- flex-direction: row-reverse  — reverses the visual order of flex children
- order property in Flexbox    — reorders a specific item visually
- grid-template-areas           — can place grid items in any visual position
- position: absolute/fixed      — removes an element from normal flow
- float                         — shifts an element left or right

THE PROBLEM: A MISMATCH
If visual order and DOM order do not match, the experience is different for:
- Sighted users (who follow the visual order)
- Screen reader users (who follow the DOM order)
- Keyboard users (whose Tab order follows the DOM order)

EXAMPLE OF A MISMATCH
HTML source order: Logo, Navigation, Main content, Sidebar
CSS Grid visual order: Sidebar, Logo, Main content, Navigation

A sighted user sees: Sidebar → Logo → Main → Navigation
A screen reader user hears: Logo → Navigation → Main → Sidebar

This creates confusion and is a WCAG 2.4.3 failure (Focus Order).

THE RULE
The visual reading order of your page should match the DOM order for any content that has a meaningful sequence. If you reorder elements visually, make sure the experience still makes logical sense when read in DOM order.

WHEN VISUAL REORDERING IS ACCEPTABLE
- Decorative or symmetrical elements where either order is equally logical
- An image that floats left or right of text (both orders work)
- Purely cosmetic reordering that does not change the meaning of the content`,
      quiz: [
        {
          question: 'A developer uses flex-direction: row-reverse to reverse the order of navigation links visually. What do screen reader users experience?',
          options: [
            'The same reversed order that sighted users see',
            'The original DOM order — the links in the order they appear in the HTML',
            'No navigation links at all',
            'An error message',
          ],
          answer: 1,
        },
        {
          question: 'When is it acceptable to use CSS to change visual order differently from DOM order?',
          options: [
            'Whenever it makes the design look better',
            'Never — they must always match exactly',
            'When the elements are decorative or equally valid in either order, so the experience is logical in both sequences',
            'Only when the page has no screen reader users',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'The HTML below has a sidebar that appears after the main content in the DOM, but a developer used CSS to make it appear first visually. In the code area, explain the accessibility problem in a comment, then rewrite the HTML so the DOM order matches the intended visual order (sidebar first, main content second), and update the CSS to remove the visual reordering.',
        starterCode: `/* HTML (the current problematic version):
<div class="page">
  <main class="main-content">Main content</main>
  <aside class="sidebar">Sidebar</aside>
</div>
*/

/* Current CSS — creates a mismatch: */
.page {
  display: flex;
  flex-direction: row-reverse;
}

/* Problem: */

/* Fixed HTML (write in a comment): */

/* Fixed CSS: */
`,
        solution: `/* HTML (the current problematic version):
<div class="page">
  <main class="main-content">Main content</main>
  <aside class="sidebar">Sidebar</aside>
</div>
*/

/* Current CSS — creates a mismatch: */
.page {
  display: flex;
  flex-direction: row-reverse;
}

/* Problem:
   The DOM order is: Main content → Sidebar.
   The visual order (due to row-reverse) is: Sidebar → Main content.
   Screen reader users hear: Main content → Sidebar (DOM order).
   Sighted users see: Sidebar → Main content (visual order).
   This is a WCAG 2.4.3 (Focus Order) failure.
*/

/* Fixed HTML (write in a comment):
<div class="page">
  <aside class="sidebar">Sidebar</aside>
  <main class="main-content">Main content</main>
</div>
*/

/* Fixed CSS: */
.page {
  display: flex;
  /* No row-reverse needed — DOM order now matches visual order */
}`,
      },
    },
  ],
};

if (typeof module !== 'undefined') module.exports = cssScreenReaderModule;
if (typeof window !== 'undefined') window.cssScreenReaderModule = cssScreenReaderModule;
