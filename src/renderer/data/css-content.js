const cssModule = {
  id: 'css',
  title: 'CSS Fundamentals',
  description: 'Learn how to style web pages. CSS controls the visual appearance of HTML elements — colors, layout, typography, and more.',
  objectives: [
    'Understand how CSS rules are written and applied to HTML',
    'Use selectors to target specific elements',
    'Control typography: font size, weight, line height, and color',
    'Use the box model to control spacing and layout',
    'Build flexible layouts with Flexbox and CSS Grid',
    'Write responsive CSS that adapts to different screen sizes',
    'Style interactive states: hover, focus, and active',
    'Create strong, visible focus indicators for keyboard users',
  ],
  goals: [
    'Style a full web page with a cohesive visual design',
    'Build a responsive navigation bar',
    'Create a card layout using CSS Grid',
    'Write CSS that passes WCAG 2.1 color contrast requirements',
    'Build a custom, highly visible focus indicator',
  ],
  lessons: [
    {
      id: 'css-1',
      title: 'Lesson 1: How CSS Works',
      content: `CSS stands for Cascading Style Sheets. It controls the visual presentation of HTML.

CSS rules have three parts:
1. Selector — which element to style
2. Property — what aspect to change
3. Value — what to change it to

Example:
p {
  color: #1e293b;
  font-size: 1rem;
}

You can apply CSS three ways:
- External stylesheet (recommended): <link rel="stylesheet" href="styles.css" />
- Internal: inside a <style> tag in <head>
- Inline: style attribute on an element (avoid for maintainability)

The "Cascading" in CSS means multiple rules can apply to one element.
Specificity determines which rule wins when there are conflicts.`,
      quiz: [
        {
          question: 'What are the three parts of a CSS rule?',
          options: [
            'Tag, class, and ID',
            'Selector, property, and value',
            'Color, size, and position',
            'HTML, body, and div',
          ],
          answer: 1,
        },
        {
          question: 'Which method of applying CSS is generally recommended for maintainability?',
          options: [
            'Inline styles using the style attribute',
            'A <style> block inside <head>',
            'An external .css file linked with <link>',
            'CSS inside JavaScript files',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Write CSS that styles all <h1> elements to have a font size of 2rem, a color of #1e293b, and a bottom margin of 1rem.',
        starterCode: `/* Write your CSS rule for h1 below */
`,
        solution: `h1 {
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 1rem;
}`,
      },
    },
    {
      id: 'css-2',
      title: 'Lesson 2: Selectors',
      content: `CSS selectors determine which HTML elements a rule applies to.

Common selectors:
- Element: p { } — targets all <p> elements
- Class: .card { } — targets elements with class="card"
- ID: #main { } — targets the element with id="main"
- Descendant: nav a { } — targets <a> inside <nav>
- Pseudo-class: a:hover { } — targets links on hover
- Pseudo-class: :focus { } — targets the currently focused element (crucial for keyboard accessibility)

The :focus pseudo-class is one of the most important for accessibility.
Never use outline: none without providing an alternative focus indicator.`,
      quiz: [
        {
          question: 'Which selector targets elements with class="highlight"?',
          options: ['#highlight', '.highlight', 'highlight', '*highlight'],
          answer: 1,
        },
        {
          question: 'Why should you never remove the focus outline without replacement?',
          options: [
            'It breaks the CSS cascade',
            'Keyboard and screen reader users lose visual indication of where they are',
            'It causes browser compatibility issues',
            'It makes the page load slower',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write CSS that: (1) gives all links a color of #2563eb, (2) gives focused links a visible outline of 3px solid #f59e0b, and (3) gives elements with class "active" a background of #dbeafe.',
        starterCode: `/* Style links */

/* Style focused links */

/* Style .active elements */
`,
        solution: `a {
  color: #2563eb;
}

a:focus {
  outline: 3px solid #f59e0b;
  outline-offset: 2px;
}

.active {
  background-color: #dbeafe;
}`,
      },
    },
    {
      id: 'css-3',
      title: 'Lesson 3: Box Model and Layout',
      content: `Every HTML element is a rectangular box. CSS controls its size and spacing through the box model:

- content — the actual text or images
- padding — space inside the border (between content and border)
- border — a line around the padding
- margin — space outside the border (between this element and neighbors)

Tip: Use box-sizing: border-box so padding is included in the element's width.

Flexbox is the most practical tool for one-dimensional layouts (rows or columns):

.container {
  display: flex;
  gap: 1rem;
  align-items: center;
}

CSS Grid is best for two-dimensional layouts:

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}`,
      quiz: [
        {
          question: 'What is padding in the CSS box model?',
          options: [
            'Space outside the border',
            'Space inside the border, between content and border',
            'The element\'s background color area',
            'The width of the border',
          ],
          answer: 1,
        },
        {
          question: 'Which CSS property creates a two-dimensional grid layout?',
          options: ['display: flex', 'display: block', 'display: grid', 'display: table'],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Write CSS for a .card-container that displays its children in a 3-column grid with a 1.5rem gap, and center-aligns items.',
        starterCode: `/* Style .card-container */
`,
        solution: `.card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  align-items: center;
}`,
      },
    },
  ],
};

if (typeof module !== 'undefined') module.exports = cssModule;
if (typeof window !== 'undefined') window.cssModule = cssModule;
