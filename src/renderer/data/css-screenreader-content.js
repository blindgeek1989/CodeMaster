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
    {
      id: 'css-sr-6',
      title: 'Lesson 6: Styling Accessible Form States',
      content: `Forms are where accessibility often breaks down most severely. CSS controls how form states look — but it must work together with HTML and ARIA to communicate those states to screen readers. Color alone is never enough.

THE PROBLEM WITH COLOR-ONLY FEEDBACK
If the only way you communicate an error is by turning an input border red, a blind user gets no indication that something went wrong. CSS appearance must always be paired with a text change that screen readers can detect.

REQUIRED FIELDS
Visually mark required fields and add aria-required to communicate it to screen readers:

<label for="email">
  Email address <span aria-hidden="true">*</span>
  <span class="sr-only">(required)</span>
</label>
<input type="email" id="email" aria-required="true" />

The asterisk is hidden from screen readers (aria-hidden="true") and replaced with "(required)" in sr-only text. The aria-required attribute on the input also tells screen readers the field is required.

ERROR STATES WITH aria-invalid
When a field has an error, set aria-invalid="true" on the input and connect an error message with aria-describedby:

<input
  type="email"
  id="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<p id="email-error" class="field-error">
  Please enter a valid email address.
</p>

In CSS, style the error state:
input[aria-invalid="true"] {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.field-error {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

USING CSS ATTRIBUTE SELECTORS FOR STATES
CSS can target ARIA attributes directly, keeping your styles in sync with the accessibility state:

input[aria-invalid="true"] { border-color: red; }
button[aria-expanded="true"] { background: #e0e7ff; }
[aria-disabled="true"] { opacity: 0.5; cursor: not-allowed; }

DISABLED STATES
Never rely only on the greyed-out appearance of a disabled element:
- Add aria-disabled="true" for custom components
- Use the disabled attribute on native inputs (automatically communicated to screen readers)
- Style disabled elements to look visually distinct:

input:disabled,
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

SUCCESS STATES
When a form submits successfully, show a success message in an aria-live region:

<div id="form-status" aria-live="polite" aria-atomic="true"></div>

Then with JavaScript, set textContent to announce the success. CSS can style the success state:

.status-success {
  color: #16a34a;
  background: #f0fdf4;
  border: 1px solid #86efac;
  padding: 0.75rem 1rem;
  border-radius: 8px;
}`,
      quiz: [
        {
          question: 'A form field turns red when invalid. Why is this insufficient for accessibility?',
          options: [
            'Red is not a valid CSS color',
            'Color alone does not communicate the error to screen readers — you must also update text and use aria-invalid',
            'The input border-color property does not work in all browsers',
            'Screen readers read all CSS color changes automatically',
          ],
          answer: 1,
        },
        {
          question: 'What does aria-invalid="true" tell a screen reader?',
          options: [
            'The input field should be hidden',
            'The input has a wrong data type',
            'The current value of the input does not meet the required criteria — announced as "invalid" when focused',
            'The input is disabled',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Write CSS that styles three form states using ARIA attribute selectors. (1) An input with aria-invalid="true" should have a red (#ef4444) border and light red (#fef2f2) background. (2) A button with aria-expanded="true" should have an indigo (#e0e7ff) background. (3) Any element with aria-disabled="true" should have 0.5 opacity and a not-allowed cursor. Also write a .field-error class: red (#dc2626) text, 0.875rem font size.',
        starterCode: `/* Invalid input state */

/* Expanded button state */

/* Disabled state */

/* Error message text */
.field-error {

}`,
        solution: `/* Invalid input state */
input[aria-invalid="true"] {
  border-color: #ef4444;
  background-color: #fef2f2;
}

/* Expanded button state */
button[aria-expanded="true"] {
  background-color: #e0e7ff;
}

/* Disabled state */
[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Error message text */
.field-error {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}`,
      },
    },
    {
      id: 'css-sr-7',
      title: 'Lesson 7: Color and Contrast — The Numbers Behind Accessibility',
      content: `Color contrast is the difference in brightness between text and its background. Low contrast is one of the most common accessibility failures on the web — and one of the easiest to fix once you understand the numbers.

WHAT IS CONTRAST RATIO?
Contrast ratio is a number from 1:1 (no contrast — identical colors) to 21:1 (maximum contrast — pure black on pure white). The formula is based on the relative luminance of the two colors.

You do not need to calculate this by hand. Tools like the WebAIM Contrast Checker or browser developer tools calculate it for you.

WCAG CONTRAST REQUIREMENTS
WCAG 2.1 Level AA (the most widely required standard):

Normal text (below 18pt or 14pt bold):
  Minimum contrast ratio: 4.5:1

Large text (18pt/24px or larger, or 14pt/18.67px bold):
  Minimum contrast ratio: 3:1

Non-text elements (icons, borders, UI components):
  Minimum contrast ratio: 3:1

WCAG 2.1 Level AAA (enhanced):
  Normal text: 7:1
  Large text: 4.5:1

COMMON MISTAKES
  Light grey text on white: #999999 on #ffffff = 2.85:1 — FAILS
  Dark blue on black: #003366 on #000000 = 1.9:1 — FAILS
  Yellow on white: #ffff00 on #ffffff = 1.07:1 — FAILS badly

COMMON SAFE COMBINATIONS
  #1e293b (dark navy) on #f8fafc (near white) = 14.2:1 — PASSES
  #ffffff (white) on #6366f1 (indigo) = 4.55:1 — PASSES AA
  #000000 (black) on #ffffff (white) = 21:1 — PASSES everything

BEYOND CONTRAST: DO NOT RELY ON COLOR ALONE
WCAG 1.4.1: Color must not be the only visual means of conveying information, indicating an action, or distinguishing an element.

Bad:  "Required fields are shown in red."
Good: "Required fields are marked with an asterisk (*) and the word 'required'."

Bad:  "Green means success, red means error."
Good: "Error fields show a red border, an error icon, and error text. Success fields show a checkmark and success text."

Always add a second visual cue (icon, text, pattern, underline) alongside color.`,
      quiz: [
        {
          question: 'What is the minimum contrast ratio for normal body text to pass WCAG 2.1 Level AA?',
          options: ['2:1', '3:1', '4.5:1', '7:1'],
          answer: 2,
        },
        {
          question: 'A form highlights required fields in red. What else must be provided to meet WCAG 1.4.1?',
          options: [
            'Nothing — color is sufficient for form fields',
            'A second visual indicator such as an asterisk, the word "required", or an icon — because color cannot be the only signal',
            'An aria-required attribute (this satisfies the color rule)',
            'A tooltip explaining the red color',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Look at these four color combinations and mark each as PASS or FAIL for WCAG AA normal text (4.5:1 minimum). Write your answers as CSS comments. Approximate ratios given: (1) #767676 on #ffffff ≈ 4.54:1, (2) #999999 on #ffffff ≈ 2.85:1, (3) #ffffff on #6366f1 ≈ 4.55:1, (4) #555555 on #eeeeee ≈ 5.74:1.',
        starterCode: `/* Contrast ratio checks — WCAG AA normal text requires 4.5:1 minimum */

/* 1. #767676 text on #ffffff background (ratio ≈ 4.54:1) */
/* Result: */

/* 2. #999999 text on #ffffff background (ratio ≈ 2.85:1) */
/* Result: */

/* 3. #ffffff text on #6366f1 background (ratio ≈ 4.55:1) */
/* Result: */

/* 4. #555555 text on #eeeeee background (ratio ≈ 5.74:1) */
/* Result: */`,
        solution: `/* Contrast ratio checks — WCAG AA normal text requires 4.5:1 minimum */

/* 1. #767676 text on #ffffff background (ratio ≈ 4.54:1) */
/* Result: PASS — just above the 4.5:1 threshold */

/* 2. #999999 text on #ffffff background (ratio ≈ 2.85:1) */
/* Result: FAIL — below 4.5:1. This is the classic "light grey on white" mistake. */

/* 3. #ffffff text on #6366f1 background (ratio ≈ 4.55:1) */
/* Result: PASS — white text on indigo just meets AA */

/* 4. #555555 text on #eeeeee background (ratio ≈ 5.74:1) */
/* Result: PASS — comfortably above 4.5:1 */`,
      },
    },
    {
      id: 'css-sr-8',
      title: 'Lesson 8: CSS for Interactive States',
      content: `CSS can and should reflect the ARIA state of interactive components. When a button controls a collapsible section, its visual appearance should change to match whether that section is open or closed — not just for sighted users, but to reinforce what the screen reader is already announcing.

ARIA STATE ATTRIBUTES AND CSS
ARIA state attributes like aria-expanded, aria-selected, aria-checked, and aria-pressed can be targeted directly in CSS using attribute selectors:

[aria-expanded="true"]  { /* open state */ }
[aria-expanded="false"] { /* closed state */ }

DISCLOSURE BUTTONS (show/hide)
A button that toggles a section uses aria-expanded:

<button aria-expanded="false" aria-controls="details">
  Show details
</button>
<div id="details" hidden>More content here.</div>

CSS for the button's two states:

button[aria-expanded="false"]::after {
  content: " ▶";
}

button[aria-expanded="true"]::after {
  content: " ▼";
}

button[aria-expanded="true"] {
  background-color: #e0e7ff;
  font-weight: 700;
}

TAB COMPONENTS (aria-selected)
A selected tab uses aria-selected="true":

[role="tab"][aria-selected="true"] {
  border-bottom: 3px solid #6366f1;
  color: #6366f1;
  font-weight: 700;
}

[role="tab"][aria-selected="false"] {
  border-bottom: 3px solid transparent;
  color: #64748b;
}

TOGGLE BUTTONS (aria-pressed)
A toggle button (bold, mute, etc.) uses aria-pressed:

button[aria-pressed="true"] {
  background-color: #6366f1;
  color: white;
}

button[aria-pressed="false"] {
  background-color: transparent;
  color: #6366f1;
  border: 1px solid #6366f1;
}

THE BENEFIT OF THIS APPROACH
By tying CSS to ARIA attributes, you get one source of truth: the ARIA state drives both what screen readers announce AND what sighted users see. If someone toggles the ARIA attribute with JavaScript, the visual style updates automatically.`,
      quiz: [
        {
          question: 'A button has aria-expanded="true". Using CSS attribute selectors, how do you target it?',
          options: [
            '.expanded { }',
            'button.open { }',
            '[aria-expanded="true"] { }',
            'button:state(expanded) { }',
          ],
          answer: 2,
        },
        {
          question: 'Why is it better to base visual styling on ARIA state attributes than on CSS classes like .is-open?',
          options: [
            'ARIA attributes load faster than CSS classes',
            'ARIA attributes are the single source of truth — they drive both what screen readers announce and what sighted users see, eliminating the risk of them getting out of sync',
            'CSS classes cannot be toggled with JavaScript',
            'ARIA attributes have higher CSS specificity',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write CSS for three interactive states: (1) A [role="tab"] with aria-selected="true" should have an indigo (#6366f1) bottom border of 3px, indigo text color, and bold weight. With aria-selected="false" it should have transparent border and grey (#64748b) text. (2) A button with aria-pressed="true" should have indigo background and white text. With aria-pressed="false" it should be transparent with indigo text and a 1px indigo border. (3) A button with aria-expanded="true" should have a ▼ character added after it using ::after; with "false" it should show ▶.',
        starterCode: `/* Tab — selected */

/* Tab — not selected */

/* Toggle button — pressed */

/* Toggle button — not pressed */

/* Disclosure button — expanded */

/* Disclosure button — collapsed */
`,
        solution: `/* Tab — selected */
[role="tab"][aria-selected="true"] {
  border-bottom: 3px solid #6366f1;
  color: #6366f1;
  font-weight: 700;
}

/* Tab — not selected */
[role="tab"][aria-selected="false"] {
  border-bottom: 3px solid transparent;
  color: #64748b;
}

/* Toggle button — pressed */
button[aria-pressed="true"] {
  background-color: #6366f1;
  color: white;
}

/* Toggle button — not pressed */
button[aria-pressed="false"] {
  background-color: transparent;
  color: #6366f1;
  border: 1px solid #6366f1;
}

/* Disclosure button — expanded */
button[aria-expanded="true"]::after {
  content: " ▼";
}

/* Disclosure button — collapsed */
button[aria-expanded="false"]::after {
  content: " ▶";
}`,
      },
    },
  ],
};

if (typeof module !== 'undefined') module.exports = cssScreenReaderModule;
if (typeof window !== 'undefined') window.cssScreenReaderModule = cssScreenReaderModule;
