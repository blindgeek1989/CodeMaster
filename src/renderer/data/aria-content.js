const ariaModule = {
  id: 'aria',
  title: 'ARIA — Accessible Rich Internet Applications',
  description: 'Learn how browsers build the accessibility tree, how ARIA roles, states, and properties let you communicate with screen readers, and how to apply ARIA correctly without making things worse. This module is essential for anyone building or testing interactive web content.',
  objectives: [
    'Understand what the accessibility tree is and how browsers build it',
    'Know the five rules of ARIA and why rule one is "do not use ARIA if you do not need to"',
    'Use ARIA landmark roles to give pages meaningful structure',
    'Apply ARIA states such as aria-expanded, aria-checked, and aria-selected correctly',
    'Name elements accessibly using aria-label, aria-labelledby, and aria-describedby',
    'Build and announce dynamic content updates using aria-live regions',
    'Identify and avoid the most common ARIA mistakes',
  ],
  goals: [
    'Explain the accessibility tree and how it differs from the DOM',
    'Recite the five rules of ARIA from memory',
    'Correctly apply aria-expanded to an accordion or disclosure widget',
    'Build a live region that announces status updates to screen readers',
    'Audit a page for common ARIA mistakes and explain how to fix each one',
  ],
  lessons: [
    {
      id: 'aria-1',
      title: 'Lesson 1: The Accessibility Tree',
      content: `Before you can understand ARIA, you need to understand the accessibility tree. It is the foundation that everything else in this module builds on.

WHAT THE BROWSER BUILDS
When a browser loads a web page, it does not just paint pixels. It builds several parallel data structures from the HTML source. The one you interact with in JavaScript is the DOM — the Document Object Model. But the browser also builds a second tree specifically for assistive technologies: the accessibility tree.

The accessibility tree is what screen readers, braille displays, voice control software, and other assistive technologies actually read. It is not the visual layout and it is not the full DOM. It is a structured representation of the page's meaning — what elements are present, what their roles are, what their names are, and what their current states are.

WHAT A NODE IN THE ACCESSIBILITY TREE CONTAINS
Every element exposed in the accessibility tree has four core properties:

  Role — What kind of thing is this? (button, heading, link, checkbox, textbox)
  Name — What is it called? (the label or text that identifies it)
  State — What condition is it in right now? (checked, expanded, disabled, invalid)
  Properties — Additional descriptors. (describedby, required, readonly, level)

When your screen reader says "Submit, button" it is reading the name and role from the tree. When it says "Notifications, collapsed, button" it is adding the state.

HOW NATIVE HTML FILLS THE TREE AUTOMATICALLY
The most important fact about the accessibility tree is that native HTML elements populate it for free. You do not need ARIA if you use the right element.

  <button>         gets role: button automatically
  <a href="...">   gets role: link
  <h1>             gets role: heading, level: 1
  <input type="checkbox">  gets role: checkbox, state: checked/unchecked
  <nav>            gets role: navigation
  <main>           gets role: main

This is why ARIA exists: not all interactive patterns have a matching HTML element. A tab panel, a tree view, a date picker, a combobox with autocomplete — none of these exist as native HTML elements. ARIA lets you describe those patterns to the accessibility tree in a way that assistive technologies understand.

WHAT GETS EXCLUDED FROM THE TREE
Not every element in the DOM appears in the accessibility tree:
  - Elements with display: none or visibility: hidden are removed entirely
  - Elements with aria-hidden="true" are removed entirely
  - Decorative elements like <div> and <span> with no role and no content are often skipped
  - Elements with role="presentation" or role="none" are stripped of their semantics

THE RELATIONSHIP BETWEEN DOM AND ACCESSIBILITY TREE
The accessibility tree mirrors the DOM structure but is not identical to it. Changes to the DOM — adding elements, removing them, changing attributes — are reflected in the accessibility tree. This is how dynamic web apps communicate state changes to assistive technologies: by changing the DOM, which updates the tree, which the screen reader reads.

THE KEY INSIGHT
You are not writing code for a visual layout engine. You are writing code for two parallel systems: one visual, one semantic. HTML gives you semantic meaning for free when you use the right elements. ARIA fills the gaps where HTML falls short.`,
      quiz: [
        {
          question: 'What four core properties does every node in the accessibility tree have?',
          options: [
            'Tag, class, ID, and style',
            'Role, name, state, and properties',
            'Type, label, value, and placeholder',
            'Element, attribute, event, and handler',
          ],
          answer: 1,
        },
        {
          question: 'A developer wraps text in a <div> with no role, no ARIA attributes, and no other semantic meaning. What happens to that element in the accessibility tree?',
          options: [
            'It appears in the tree with role: div',
            'It appears in the tree with role: generic',
            'It is often omitted or passed through transparently — its text content is still accessible',
            'It is always fully hidden from screen readers',
          ],
          answer: 2,
        },
        {
          question: 'Which CSS property removes an element from the accessibility tree entirely (not just visually)?',
          options: [
            'opacity: 0',
            'visibility: hidden',
            'color: transparent',
            'pointer-events: none',
          ],
          answer: 1,
        },
      ],
      exercise: null,
    },
    {
      id: 'aria-2',
      title: 'Lesson 2: The Five Rules of ARIA',
      content: `The WAI-ARIA specification (the official standard written by the W3C) includes five rules about how ARIA should be used. Every developer working on the web should know these.

RULE 1: DO NOT USE ARIA IF YOU DO NOT NEED TO
If a native HTML element or attribute already gives you the semantics and behavior you need, use it instead of ARIA.

Instead of this:
  <div role="button" tabindex="0">Submit</div>

Use this:
  <button>Submit</button>

The native <button> gets you role, keyboard operability (Enter and Space activate it), focus management, and form integration for free. The div gets you only the role — you have to write all the rest yourself, and you will miss things.

This rule is the most violated rule in web development. When you see ARIA on a page, always ask: is there a native HTML element that would do this without ARIA?

RULE 2: DO NOT CHANGE THE NATIVE SEMANTICS OF AN ELEMENT
If you use a native HTML element, do not override its built-in role with ARIA unless you have a very good reason.

Do not do this:
  <h2 role="tab">Panel Title</h2>

A heading is a heading. Making it a tab strips its heading semantics and creates confusion. If you need a tab, build it with a <button> and role="tab".

The exception: when you use a generic element like <div> or <span> and give it a role, that is fine — those elements have no built-in semantics to override.

RULE 3: ALL INTERACTIVE ARIA CONTROLS MUST BE KEYBOARD ACCESSIBLE
If you give an element an interactive role — like button, checkbox, tab, or slider — it must be operable by keyboard alone. Not just focusable, but actually usable.

A custom checkbox with role="checkbox" must:
  - Be reachable with Tab
  - Toggle with Space
  - Announce its checked state to screen readers

If you cannot make it fully keyboard accessible, you should not use that role.

RULE 4: DO NOT SUPPRESS FOCUS ON FOCUSABLE ELEMENTS
Never set aria-hidden="true" on an element that can receive keyboard focus, or on any ancestor of a focusable element.

Do not do this:
  <div aria-hidden="true">
    <button>Close</button>   ← this button is now hidden from AT but still focusable
  </div>

This is one of the most dangerous ARIA mistakes. A keyboard user can Tab onto the button, but a screen reader user gets no announcement — they are on a focusable element that the accessibility tree does not know about. This causes silent focus traps and extreme confusion.

If you need to hide content from AT, remove focus from all its children first (use tabindex="-1" on each focusable descendant, or use display:none or inert).

RULE 5: ALL INTERACTIVE ELEMENTS MUST HAVE AN ACCESSIBLE NAME
Every button, link, input, and custom widget must have a name that assistive technologies can announce. An icon button with no label is inaccessible. A form input with no label is inaccessible.

How to give an element an accessible name (in order of preference):
  1. Native labeling: <label for="id"> for inputs, visible text content for buttons and links
  2. aria-labelledby pointing to an existing visible element
  3. aria-label as a last resort when no visible text is appropriate

WHY THESE RULES EXIST
ARIA is powerful but it only adds or overrides semantics in the accessibility tree. It does not add behavior, keyboard handling, or focus management. Every rule above reflects a category of bug that developers create by reaching for ARIA when they should not have, or by using it without understanding what it does and does not do.

The shorthand: ARIA tells screen readers what something IS. HTML and JavaScript decide what something DOES. You need both.`,
      quiz: [
        {
          question: 'Rule 1 says to prefer native HTML over ARIA. Which of these follows Rule 1 correctly?',
          options: [
            '<div role="button" tabindex="0" onclick="submit()">Submit</div>',
            '<button onclick="submit()">Submit</button>',
            '<span role="button" aria-label="Submit" tabindex="0"></span>',
            '<a role="button" href="#">Submit</a>',
          ],
          answer: 1,
        },
        {
          question: 'A developer sets aria-hidden="true" on a modal overlay div that contains a Close button. What problem does this create?',
          options: [
            'The modal disappears visually for all users',
            'The Close button can still receive keyboard focus but screen readers get no announcement — creating a silent focus trap',
            'The modal background becomes clickable again',
            'Nothing — aria-hidden on a parent does not affect children',
          ],
          answer: 1,
        },
        {
          question: 'Rule 5 requires all interactive elements to have an accessible name. A developer creates an icon-only button using an SVG icon with no text. What is the BEST way to give it a name?',
          options: [
            'Add a title attribute to the SVG',
            'Use a visible text label next to the icon',
            'Add aria-hidden="true" to the SVG and add aria-label to the button',
            'Use role="img" on the button',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: `The code below has violations of the five ARIA rules. In the text area, identify which rule each violation breaks and rewrite the corrected version.

BROKEN CODE:
  1. <div role="link" onclick="navigate()">Go to settings</div>
  2. <h3 role="button" onclick="toggle()">Expand section</h3>
  3. <div aria-hidden="true"><button>Close dialog</button></div>
  4. <button><svg><!-- icon --></svg></button>

For each one: name the rule, explain the problem, and write the fix.`,
        starterCode: `1. Rule violated:
   Problem:
   Fix:

2. Rule violated:
   Problem:
   Fix:

3. Rule violated:
   Problem:
   Fix:

4. Rule violated:
   Problem:
   Fix:`,
        solution: `1. Rule violated: Rule 1 — do not use ARIA if a native element exists.
   Problem: <div role="link"> is redundant — <a> does this natively with keyboard support and browser history integration built in.
   Fix: <a href="settings.html">Go to settings</a>

2. Rule violated: Rule 2 — do not change the native semantics of an element.
   Problem: Adding role="button" to <h3> removes its heading semantics. Users navigating by heading will skip it; users tabbing to interactive elements will find it confusing.
   Fix: Use a <button> inside or next to the heading: <h3>Section Title</h3><button onclick="toggle()">Expand section</button>
   Or wrap the heading in the button only if the full heading IS the button label.

3. Rule violated: Rule 4 — do not suppress focus on focusable elements.
   Problem: aria-hidden="true" on the parent hides the Close button from the accessibility tree, but keyboard users can still Tab to it — creating a silent, inaccessible focus trap.
   Fix: Remove aria-hidden from the container, or if the container should be hidden, also hide the button: <button hidden>Close dialog</button>

4. Rule violated: Rule 5 — all interactive elements must have an accessible name.
   Problem: The button has no text and the SVG has no aria-label or title, so screen readers announce "button" with no name.
   Fix: <button aria-label="Close dialog"><svg aria-hidden="true"><!-- icon --></svg></button>`,
      },
    },
    {
      id: 'aria-3',
      title: 'Lesson 3: ARIA Landmark Roles',
      content: `Landmark roles are one of the most practical and widely supported parts of ARIA. They define the large structural regions of a page and let screen reader users jump directly to any section without reading everything in between.

WHAT LANDMARKS ARE
Landmarks are named regions of a page. When you assign a landmark role to a container element, screen readers can:
  - List all landmarks on the page (in most screen readers via a dedicated shortcut)
  - Jump directly between landmarks (typically with a single keypress)
  - Announce the landmark type when the user navigates into it

This means a well-landmarked page lets a screen reader user navigate to "main content," "navigation," or "search" in seconds, the same way a sighted user visually scans a page layout.

THE EIGHT LANDMARK ROLES
  banner         — the site-wide header. Should appear once per page.
  navigation     — a set of navigation links. Can appear multiple times (must be named if so).
  main           — the primary content of the page. Should appear once per page.
  complementary  — supporting content related to but not essential to the main content (sidebars, related links).
  contentinfo    — the site-wide footer. Should appear once per page.
  search         — a search form or search UI. Can appear multiple times.
  form           — a significant form (requires an accessible name to be a landmark; unnamed forms are not exposed).
  region         — a generic significant section (requires an accessible name to be a landmark).

NATIVE HTML ELEMENTS GIVE YOU LANDMARKS FOR FREE
This connects back to Rule 1. You do not need ARIA for landmarks if you use the right HTML elements:

  <header>   → role: banner (when a direct child of <body>)
  <nav>      → role: navigation
  <main>     → role: main
  <aside>    → role: complementary
  <footer>   → role: contentinfo (when a direct child of <body>)
  <search>   → role: search (HTML 5.3+; not yet universally supported — use role="search" on a <form> for now)
  <form>     with an accessible name → role: form
  <section>  with an accessible name → role: region

So the best way to add landmarks is to simply use semantic HTML. ARIA landmark roles are there as a fallback for when you cannot change the HTML element (for example, when working in a legacy template that uses <div> for everything).

NAMING MULTIPLE LANDMARKS
If a page has more than one of the same landmark type (two navigation regions, for example), each must have a unique accessible name so users can tell them apart.

  <nav aria-label="Main navigation">...</nav>
  <nav aria-label="Breadcrumb">...</nav>

Without names, a screen reader listing the landmarks would show "navigation, navigation" with no way to distinguish them. With names, it shows "Main navigation, navigation" and "Breadcrumb, navigation."

NAMING WITH ARIA-LABELLEDBY
When the region already has a visible heading, use aria-labelledby instead of aria-label to avoid saying the same thing twice:

  <section aria-labelledby="recent-posts-heading">
    <h2 id="recent-posts-heading">Recent Posts</h2>
    ...
  </section>

This tells screen readers: the name of this region is whatever the referenced element says. The heading is the label.

THE LANDMARK AUDIT CHECKLIST
For any page you build or test, verify:
  ✓ There is exactly one <main> (or role="main")
  ✓ There is exactly one <header> at the top level (or role="banner")
  ✓ There is exactly one <footer> at the top level (or role="contentinfo")
  ✓ Every <nav> has a unique, descriptive accessible name if there are multiple
  ✓ Every <section> used as a landmark has an accessible name
  ✓ The skip link (if present) points to the <main> landmark`,
      quiz: [
        {
          question: 'A page has two navigation regions: one for the main site menu and one for breadcrumbs. What must the developer do to make these landmarks usable for screen reader users?',
          options: [
            'Use role="navigation" on one and role="nav" on the other',
            'Give each one a unique accessible name using aria-label or aria-labelledby',
            'Combine them into a single navigation landmark',
            'Nothing — screen readers announce navigation landmarks by their position automatically',
          ],
          answer: 1,
        },
        {
          question: 'Which native HTML element, when used as a direct child of <body>, automatically gets the landmark role "contentinfo"?',
          options: [
            '<aside>',
            '<section>',
            '<footer>',
            '<div role="footer">',
          ],
          answer: 2,
        },
        {
          question: 'A developer uses <section> to wrap a "Related Articles" block. Under what condition does this become a landmark region?',
          options: [
            'Always — <section> is always a landmark',
            'Only when it contains at least three child elements',
            'Only when it has an accessible name via aria-label or aria-labelledby',
            'Never — <section> never creates a landmark',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: `Below is a page layout using only <div> elements. Rewrite it using the correct semantic HTML elements and/or ARIA landmark roles. Add aria-label attributes where needed. Write your answer in the text area.

STARTING MARKUP:
  <div id="header">
    <div id="site-nav"><!-- links --></div>
  </div>
  <div id="sidebar"><!-- related links --></div>
  <div id="content">
    <div id="breadcrumb-nav"><!-- breadcrumbs --></div>
    <div id="article"><!-- article content --></div>
  </div>
  <div id="footer"><!-- copyright --></div>`,
        starterCode: `<!-- Rewrite the layout here using semantic HTML landmarks: -->

<header>

</header>

`,
        solution: `<!-- Rewrite the layout here using semantic HTML landmarks: -->

<header>
  <nav aria-label="Main navigation">
    <!-- links -->
  </nav>
</header>

<aside>
  <!-- related links (complementary landmark) -->
</aside>

<main>
  <nav aria-label="Breadcrumb">
    <!-- breadcrumbs -->
  </nav>

  <article>
    <!-- article content -->
  </article>
</main>

<footer>
  <!-- copyright (contentinfo landmark) -->
</footer>`,
      },
    },
    {
      id: 'aria-4',
      title: 'Lesson 4: Naming Elements — aria-label, aria-labelledby, aria-describedby',
      content: `Every interactive element and every landmark in the accessibility tree needs an accessible name. How you compute that name — the accessible name computation — follows a specific algorithm. Understanding the algorithm tells you when to use each naming technique.

THE ACCESSIBLE NAME COMPUTATION (SIMPLIFIED)
When a screen reader needs to announce an element's name, the browser follows these steps in order, stopping at the first one that applies:

  1. aria-labelledby — if present, concatenate the text content of all referenced elements
  2. aria-label — if present, use its string value directly
  3. Native labeling — <label for="id"> for inputs; text content for buttons and links
  4. title attribute — if none of the above apply, use the title (not recommended as primary labeling)
  5. placeholder — only for inputs, as a last resort (not recommended)

The practical implication: aria-labelledby always wins. If you set both aria-label and aria-labelledby, aria-labelledby wins.

ARIA-LABELLEDBY — REFERENCING EXISTING TEXT
aria-labelledby points to one or more element IDs whose text content becomes the name.

  <h2 id="billing-heading">Billing Address</h2>
  <div role="group" aria-labelledby="billing-heading">
    <label for="street">Street</label>
    <input id="street" type="text">
    ...
  </div>

Advantages:
  - The visible text and the accessible name are always in sync — one source of truth
  - You can compose names from multiple elements by listing multiple IDs
  - No duplication: "Billing Address" is visible AND it is the group's name

You can reference multiple IDs, and the browser concatenates them:
  <button aria-labelledby="icon-id label-id">...</button>

ARIA-LABEL — ADDING A NAME WHERE THERE IS NO VISIBLE TEXT
aria-label provides a string directly in the attribute. Use it when there is no existing visible text to reference.

  <button aria-label="Close dialog">
    <svg aria-hidden="true"><!-- X icon --></svg>
  </button>

Note: When you use aria-label, the visible content of the element is overridden for AT. If the button says "OK" visually but has aria-label="Confirm and submit form", screen readers will say "Confirm and submit form, button" but sighted users see "OK." This mismatch can break voice control (WCAG 2.5.3 Label in Name). Keep aria-label values that start with the same words as any visible label text.

ARIA-DESCRIBEDBY — ADDING SUPPLEMENTARY INFORMATION
aria-describedby is different from labeling. It provides a description — supplementary information that comes after the name is announced.

  <label for="password">Password</label>
  <input id="password" type="password" aria-describedby="pw-hint">
  <p id="pw-hint">Must be at least 8 characters and include a number.</p>

Screen readers typically announce: "Password, edit text. Must be at least 8 characters and include a number."

The name comes first, the description comes after. aria-describedby does not replace the accessible name — it adds to it.

Good uses for aria-describedby:
  - Password requirements on a password field
  - Error messages (use together with aria-invalid="true")
  - Keyboard shortcut hints
  - Warning text below a destructive action button

NAMING ICON BUTTONS: THE PATTERN
Icon-only buttons are the most common naming mistake. The correct pattern:
  1. Add aria-label to the button with a clear action name
  2. Add aria-hidden="true" to the icon inside it (so the icon's alt text or SVG title is not double-announced)

  <button aria-label="Open main menu">
    <svg aria-hidden="true" focusable="false">
      <!-- hamburger icon paths -->
    </svg>
  </button>

NAMING FORM INPUTS: ALWAYS USE A LABEL ELEMENT
For all form inputs, the preferred technique is a visible <label> element. aria-label and aria-labelledby are fallbacks for cases where a visible label is genuinely not possible (for example, a search box inside a search landmark that is its own label).

  <!-- Preferred -->
  <label for="email">Email address</label>
  <input id="email" type="email">

  <!-- Acceptable when no visible label is possible -->
  <input type="search" aria-label="Search products">

Never rely on placeholder text as a label. Placeholder text disappears when the user types and has poor color contrast. It is not a label.`,
      quiz: [
        {
          question: 'A button has both aria-label="Delete" and aria-labelledby pointing to a heading that says "Delete selected items". What name will screen readers announce?',
          options: [
            '"Delete" — aria-label wins when both are present',
            '"Delete selected items" — aria-labelledby always wins over aria-label',
            '"Delete — Delete selected items" — both are concatenated',
            'Neither — having both attributes causes an error',
          ],
          answer: 1,
        },
        {
          question: 'What is the difference between aria-label and aria-describedby?',
          options: [
            'They do the same thing — only one should be used per element',
            'aria-label replaces the accessible name; aria-describedby adds supplementary information after the name',
            'aria-label is for buttons; aria-describedby is for inputs',
            'aria-describedby overrides aria-label when both are present',
          ],
          answer: 1,
        },
        {
          question: 'A developer creates a search input and puts the word "Search" as the placeholder. No <label> is present. Why is this a problem?',
          options: [
            'Placeholder text is never read by screen readers at all',
            'Screen readers always read placeholder text twice',
            'Placeholder disappears when the user types, leaving the field unlabeled; it also has poor contrast and is not a substitute for a real label',
            'Placeholder text cannot contain the word "Search"',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: `Fix the naming problems in each snippet below. Write the corrected HTML in the text area and explain what you changed and why.

SNIPPET 1: An icon-only close button with no accessible name.
  <button><svg><!-- X icon --></svg></button>

SNIPPET 2: A password field with instructions but no connection to them.
  <label for="pw">Password</label>
  <input id="pw" type="password">
  <span id="pw-rules">At least 8 characters, one number, one symbol.</span>

SNIPPET 3: A form group with a visible heading that should name the group.
  <h3>Shipping Address</h3>
  <div>
    <label for="addr1">Street</label>
    <input id="addr1" type="text">
  </div>`,
        starterCode: `SNIPPET 1 FIX:


SNIPPET 2 FIX:


SNIPPET 3 FIX:
`,
        solution: `SNIPPET 1 FIX:
<button aria-label="Close">
  <svg aria-hidden="true" focusable="false"><!-- X icon --></svg>
</button>
Changes: Added aria-label="Close" to give the button an accessible name. Added aria-hidden="true" to the SVG so the icon itself is not double-announced.

SNIPPET 2 FIX:
<label for="pw">Password</label>
<input id="pw" type="password" aria-describedby="pw-rules">
<span id="pw-rules">At least 8 characters, one number, one symbol.</span>
Changes: Added aria-describedby="pw-rules" to the input, pointing to the instructions paragraph. Screen readers will now announce the password requirements after the field's label.

SNIPPET 3 FIX:
<h3 id="shipping-heading">Shipping Address</h3>
<div role="group" aria-labelledby="shipping-heading">
  <label for="addr1">Street</label>
  <input id="addr1" type="text">
</div>
Changes: Added id="shipping-heading" to the <h3>. Wrapped the fields in role="group" with aria-labelledby pointing to the heading. Screen readers now announce "Shipping Address, group" when entering this section.`,
      },
    },
    {
      id: 'aria-5',
      title: 'Lesson 5: ARIA States and Properties',
      content: `States and properties are how ARIA communicates dynamic information — whether something is expanded, checked, selected, disabled, or invalid. States change as the user interacts with the page. Properties tend to be more stable.

THE DIFFERENCE: STATES VS PROPERTIES
  States   — values that change during a user session: aria-expanded, aria-checked, aria-selected, aria-disabled, aria-invalid, aria-busy, aria-pressed
  Properties — values that describe the element's configuration: aria-label, aria-labelledby, aria-describedby, aria-required, aria-readonly, aria-level, aria-haspopup

In practice, the distinction matters less than knowing which attribute to use and when.

ARIA-EXPANDED
Use when an element controls a collapsible section (accordion, disclosure, menu trigger, navigation that has sub-items).

  <button aria-expanded="false" aria-controls="panel-1">Section One</button>
  <div id="panel-1" hidden>Content here.</div>

When the user activates the button, your JavaScript must:
  1. Toggle the hidden attribute on the panel (to show/hide it)
  2. Change aria-expanded to "true" on the button

  button.setAttribute('aria-expanded', 'true');
  panel.removeAttribute('hidden');

Screen readers announce: "Section One, collapsed, button" or "Section One, expanded, button" depending on the state. Never use aria-expanded on the panel itself — it belongs on the control that toggles the panel.

ARIA-CHECKED AND ARIA-PRESSED
Use aria-checked for widgets with a two- or three-state checked model (checkboxes, radio equivalents, toggle switches implemented as custom elements).

  <div role="checkbox" tabindex="0" aria-checked="false">Dark mode</div>

Three-state values: "true", "false", "mixed" (mixed is for a parent checkbox where some but not all children are checked).

Use aria-pressed for toggle buttons (buttons that stay in a pushed-in state):
  <button aria-pressed="false">Mute</button>

The difference: role="checkbox" implies a form-like selection. A <button> with aria-pressed implies a toggleable action state. Use aria-pressed on <button>, not on custom roles.

ARIA-SELECTED
Use in widgets where items can be selected: tabs (role="tab"), options (role="option"), rows (role="row" in a grid), tree items (role="treeitem").

  <button role="tab" aria-selected="true">Overview</button>
  <button role="tab" aria-selected="false">Details</button>

Only the currently selected item should have aria-selected="true". Unselected items should explicitly have aria-selected="false" — omitting the attribute entirely can cause inconsistent announcements.

ARIA-DISABLED
aria-disabled="true" tells assistive technologies the element is not currently operable, but it does not remove the element from the focus order or prevent events the way the native disabled attribute does.

  <button aria-disabled="true">Save</button>  ← still focusable, AT announces it as dimmed/unavailable

  <button disabled>Save</button>              ← removed from focus order, cannot receive events

Use aria-disabled when you want the element to remain focusable but announce as unavailable (for example, keeping a disabled "Next" button in a wizard focusable so users know it exists and why it is unavailable, shown via aria-describedby).

Use the native disabled when the control is truly not available and you do not need it in the tab order.

ARIA-INVALID AND ARIA-ERRORMESSAGE
Use for form validation states.

  <label for="email">Email</label>
  <input id="email" type="email"
         aria-invalid="true"
         aria-errormessage="email-err">
  <p id="email-err" role="alert">Please enter a valid email address.</p>

aria-invalid values: "true", "false", "grammar", "spelling"
aria-errormessage points to the element that contains the error text. The error container should use role="alert" so it is announced automatically when it appears, or you can use a live region (next lesson).

ARIA-HIDDEN: USE WITH CARE
aria-hidden="true" removes an element and all its descendants from the accessibility tree. Use it for:
  - Decorative icons inside labeled buttons
  - Duplicate text that would be announced twice
  - Visual decorations with no meaning

Never use it on:
  - Focusable elements (or ancestors of focusable elements)
  - The element that currently has focus
  - Content the screen reader user needs to access

ARIA-REQUIRED
Marks a field as required before the form can be submitted:
  <input type="text" aria-required="true">

The native required attribute does the same thing and also enables browser-native validation. Prefer the native required attribute; use aria-required only in custom widgets.

ARIA-CURRENT
Marks the current item in a set — the current page in navigation, current step in a wizard, current date in a date picker.

  <nav aria-label="Main navigation">
    <a href="/" aria-current="page">Home</a>
    <a href="/about">About</a>
  </nav>

Values: "page", "step", "location", "date", "time", "true"

Browsers and screen readers announce: "Home, current page, link" — letting screen reader users know which page they are already on.`,
      quiz: [
        {
          question: 'A "Load more" button triggers an async operation. While the content is loading, you want to communicate to screen reader users that something is happening. Which attribute is most appropriate?',
          options: [
            'aria-disabled="true"',
            'aria-busy="true" on the region being updated',
            'aria-expanded="true"',
            'aria-selected="true"',
          ],
          answer: 1,
        },
        {
          question: 'A developer builds a custom accordion. The trigger button starts collapsed. Which attribute and initial value is correct for communicating the collapsed state?',
          options: [
            'aria-hidden="true" on the button',
            'aria-selected="false" on the button',
            'aria-expanded="false" on the button',
            'aria-pressed="false" on the panel',
          ],
          answer: 2,
        },
        {
          question: 'What is the key difference between aria-disabled="true" and the native disabled attribute?',
          options: [
            'aria-disabled removes the element from the DOM; disabled keeps it',
            'aria-disabled keeps the element focusable and in the tab order; disabled removes it from focus and prevents events',
            'They are identical — only the spelling differs',
            'disabled is for buttons only; aria-disabled works on any element',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: `Complete the JavaScript below so the accordion button correctly manages the aria-expanded state and toggles the panel visibility. Then answer the follow-up question.

HTML:
  <button id="toggle-btn" aria-expanded="false" aria-controls="panel">What is ARIA?</button>
  <div id="panel" hidden>ARIA stands for Accessible Rich Internet Applications.</div>

JavaScript to complete:
  const btn = document.getElementById('toggle-btn');
  const panel = document.getElementById('panel');

  btn.addEventListener('click', () => {
    // Your code here
  });

FOLLOW-UP: This accordion only has two states: expanded and collapsed. If it were a tri-state checkbox (some children checked), what aria-checked value would you use for the "some but not all" state?`,
        starterCode: `const btn = document.getElementById('toggle-btn');
const panel = document.getElementById('panel');

btn.addEventListener('click', () => {
  // Toggle the expanded state
  const isExpanded = /* read current state */;

  // Update aria-expanded

  // Show or hide the panel

});

// FOLLOW-UP answer:
// The "some but not all" aria-checked value is:`,
        solution: `const btn = document.getElementById('toggle-btn');
const panel = document.getElementById('panel');

btn.addEventListener('click', () => {
  // Toggle the expanded state
  const isExpanded = btn.getAttribute('aria-expanded') === 'true';

  // Update aria-expanded
  btn.setAttribute('aria-expanded', String(!isExpanded));

  // Show or hide the panel
  if (isExpanded) {
    panel.setAttribute('hidden', '');
  } else {
    panel.removeAttribute('hidden');
  }
});

// FOLLOW-UP answer:
// The "some but not all" aria-checked value is: "mixed"
// Example: <div role="checkbox" aria-checked="mixed">Select all</div>`,
      },
    },
    {
      id: 'aria-6',
      title: 'Lesson 6: ARIA Live Regions',
      content: `Live regions are the mechanism for announcing dynamic content changes to screen reader users. When a page updates without a full page load — a status message appears, an error is shown, a counter updates — screen readers do not know about the change unless you tell them via a live region.

THE PROBLEM LIVE REGIONS SOLVE
Screen readers operate in a read-on-demand model: you navigate to content and the screen reader reads it. If content changes somewhere on the page while the user is focused elsewhere, they do not hear it.

A sighted user sees a notification banner appear in the corner. A screen reader user, focused on a form field, hears nothing. Live regions solve this by watching a part of the DOM and automatically announcing changes.

HOW LIVE REGIONS WORK
Mark a container element with aria-live:

  <div aria-live="polite" id="status-region"></div>

When your JavaScript changes the text content of this div, the screen reader announces the new content automatically, at the appropriate time.

The two core values:
  aria-live="polite"    — waits until the user is idle before announcing. Does not interrupt.
  aria-live="assertive" — interrupts immediately. For urgent, time-sensitive information only.

Use polite for almost everything. Use assertive only for true emergencies — authentication timeouts, critical errors that block the user from continuing.

THE TWO SHORTHAND ROLES
Instead of aria-live="polite" and aria-live="assertive", you can use two pre-built roles:

  role="status"  → equivalent to aria-live="polite" + aria-atomic="true"
  role="alert"   → equivalent to aria-live="assertive" + aria-atomic="true"

These are the most widely supported and tested patterns. Prefer role="alert" and role="status" over raw aria-live when they fit.

  <div role="alert" id="error-region"></div>    ← for errors
  <div role="status" id="status-region"></div>  ← for status updates

ARIA-ATOMIC
aria-atomic="true" means the entire live region is announced as a single unit when any part of it changes. Without it, only the changed portion is announced, which can be confusing.

Example: a timer updating the seconds:
  <div aria-live="polite" aria-atomic="true">Time remaining: 2:45</div>

If the whole string updates, aria-atomic ensures screen readers do not just announce "45" — they announce the full "Time remaining: 2:45."

THE MOST IMPORTANT RULE FOR LIVE REGIONS: INJECT INTO AN EXISTING CONTAINER
A live region must be in the DOM before you start putting content into it. Do not dynamically create the live region element at the same time you add the message — many screen readers will miss it.

DO THIS:
  <!-- In HTML, always present in the DOM -->
  <div role="status" id="sr-status"></div>

  // In JS, when something happens:
  document.getElementById('sr-status').textContent = 'Form saved successfully.';

DO NOT DO THIS:
  // Screen readers often miss dynamically created live regions
  const live = document.createElement('div');
  live.setAttribute('role', 'status');
  live.textContent = 'Form saved successfully.';
  document.body.appendChild(live); // ← too late, screen reader missed the announcement

CLEARING AND REFILLING
To announce the same message twice in a row, you must clear the live region first:

  const region = document.getElementById('sr-status');
  region.textContent = '';
  // Use setTimeout or requestAnimationFrame to let the DOM settle
  requestAnimationFrame(() => {
    region.textContent = 'Search complete. 15 results found.';
  });

This is the same pattern used by the announce() function in this application.

COMMON LIVE REGION USE CASES
  - Form submission success/error messages
  - Search results count after filtering
  - Items added to / removed from a shopping cart
  - Countdown timers
  - Chat messages
  - Toast notifications
  - Progress bar updates during file uploads

WHAT NOT TO USE LIVE REGIONS FOR
Do not use live regions for:
  - Moving focus — use JavaScript focus management instead
  - Decorative animations or visual-only updates
  - Content the user explicitly navigated to — just let them read it
  - Every minor UI state change — too many announcements causes announcement fatigue

A live region is for information the user needs to know that they are not actively looking at. If the user just activated a button, focus on the result instead of announcing it via a live region.`,
      quiz: [
        {
          question: 'When should you use aria-live="assertive" instead of aria-live="polite"?',
          options: [
            'For any important message the user should not miss',
            'For all form validation errors',
            'Only for urgent, time-sensitive messages that require immediate attention and where interrupting the user is justified',
            'Whenever the message is longer than one sentence',
          ],
          answer: 2,
        },
        {
          question: 'A developer creates a live region dynamically at the same moment they inject the message. What problem might occur?',
          options: [
            'The message will be announced twice',
            'The screen reader may miss the announcement because it was not observing the region when the content changed',
            'The live region will permanently intercept all keyboard focus',
            'aria-live only works on elements present in the HTML, not ones added via JavaScript',
          ],
          answer: 1,
        },
        {
          question: 'What does aria-atomic="true" do on a live region?',
          options: [
            'It makes the live region interrupt immediately, like assertive',
            'It prevents the live region from being updated more than once per second',
            'It causes the entire live region contents to be announced as a single unit when any part changes',
            'It removes the live region from the accessibility tree when empty',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: `Below is an HTML form with a submit button. When submitted, a success or error message should be announced to screen readers. Write the HTML live region and the JavaScript to make this work correctly.

Requirements:
  - Success message: "Your message has been sent."
  - Error message: "Error: please fill in all required fields."
  - Success should use polite announcement; error should interrupt (assertive)
  - The live regions must already be in the DOM before the messages appear
  - Handle the case where the same message might be announced twice in a row

STARTING HTML:
  <form id="contact-form">
    <label for="name">Name (required)</label>
    <input id="name" type="text" required>
    <button type="submit">Send message</button>
  </form>`,
        starterCode: `<!-- Add your live regions here: -->


<!-- JavaScript: -->
<script>
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameField = document.getElementById('name');

    if (nameField.value.trim() === '') {
      // announce error

    } else {
      // announce success

    }
  });

  function announce(regionId, message) {
    // Handle same-message-twice case

  }
</script>`,
        solution: `<!-- Add your live regions here: -->
<div role="status" id="success-region" aria-live="polite" aria-atomic="true"></div>
<div role="alert" id="error-region" aria-live="assertive" aria-atomic="true"></div>

<!-- JavaScript: -->
<script>
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameField = document.getElementById('name');

    if (nameField.value.trim() === '') {
      // announce error
      announce('error-region', 'Error: please fill in all required fields.');
    } else {
      // announce success
      announce('success-region', 'Your message has been sent.');
    }
  });

  function announce(regionId, message) {
    // Handle same-message-twice case by clearing first
    const region = document.getElementById(regionId);
    region.textContent = '';
    requestAnimationFrame(() => {
      region.textContent = message;
    });
  }
</script>`,
      },
    },
    {
      id: 'aria-7',
      title: 'Lesson 7: Common ARIA Patterns',
      content: `ARIA was designed to describe interface patterns that have no native HTML equivalent. Understanding the established patterns lets you build and test them correctly.

TABS
Tabs are one of the most common patterns. The structure:

  <div role="tablist" aria-label="Settings sections">
    <button role="tab" id="tab-1" aria-selected="true"  aria-controls="panel-1">General</button>
    <button role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2">Privacy</button>
    <button role="tab" id="tab-3" aria-selected="false" aria-controls="panel-3">Notifications</button>
  </div>

  <div role="tabpanel" id="panel-1" aria-labelledby="tab-1">General settings content</div>
  <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>Privacy content</div>
  <div role="tabpanel" id="panel-3" aria-labelledby="tab-3" hidden>Notification settings</div>

Key keyboard behavior for tabs:
  - Tab moves focus into and out of the tablist
  - Arrow keys (Left/Right) move between tabs and automatically activate them (automatic activation pattern)
  - Home/End jump to the first/last tab
  - Only the selected tab is in the tab order (roving tabindex — selected tab has tabindex="0", others have tabindex="-1")

ACCORDION / DISCLOSURE
An accordion is a series of headers that each control a collapsible panel:

  <h3>
    <button aria-expanded="false" aria-controls="section-1-panel">
      Section 1
    </button>
  </h3>
  <div id="section-1-panel" hidden>
    Content for section 1.
  </div>

No special ARIA role is needed for accordion. The <button> inside a heading is sufficient. Each button's aria-expanded state tells the screen reader whether its panel is open.

DIALOG / MODAL
Dialogs require careful focus management in addition to ARIA:

  <div role="dialog" id="confirm-dialog"
       aria-labelledby="dialog-title"
       aria-describedby="dialog-desc"
       aria-modal="true">
    <h2 id="dialog-title">Confirm deletion</h2>
    <p id="dialog-desc">This action cannot be undone.</p>
    <button>Delete</button>
    <button>Cancel</button>
  </div>

When the dialog opens:
  1. Move focus to the first interactive element inside the dialog (or the heading)
  2. Trap focus inside the dialog — Tab and Shift+Tab must cycle only within the dialog
  3. Pressing Escape closes the dialog and returns focus to the element that opened it

aria-modal="true" tells screen readers that content outside the dialog is inert. Without it, virtual cursor users (in browse mode) can still navigate outside the dialog — you also need the inert attribute on the background content.

When the dialog closes:
  1. Remove the dialog from the DOM or hide it with display:none
  2. Return focus to the element that triggered the dialog

COMBOBOX / AUTOCOMPLETE
The combobox pattern is complex. The simplified structure:

  <label for="search">Search</label>
  <input id="search" type="text"
         role="combobox"
         aria-expanded="false"
         aria-autocomplete="list"
         aria-haspopup="listbox"
         aria-controls="search-results">
  <ul role="listbox" id="search-results" hidden>
    <li role="option" id="opt-1">HTML</li>
    <li role="option" id="opt-2">CSS</li>
  </ul>

When the user selects an option, set aria-activedescendant on the input to the ID of the active option:
  input.setAttribute('aria-activedescendant', 'opt-1');

This tells the screen reader which option is currently "active" without moving DOM focus away from the input.

MENU BUTTON
A menu button opens a list of actions, not navigation links:

  <button id="menu-btn"
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="action-menu">
    Actions
  </button>
  <ul role="menu" id="action-menu" hidden>
    <li role="menuitem" tabindex="-1">Edit</li>
    <li role="menuitem" tabindex="-1">Delete</li>
  </ul>

Menu keyboard behavior:
  - Enter/Space on trigger opens menu, focus moves to first item
  - Arrow keys navigate between items
  - Escape closes menu, focus returns to trigger
  - First character navigation: pressing a letter jumps to the first item starting with that letter

THE GENERAL PRINCIPLE
Every ARIA pattern has a defined keyboard interaction model in the ARIA Authoring Practices Guide (APG) published by the W3C. When in doubt, look up the pattern in the APG — it specifies exactly which keys do what, which attributes are required, and how focus should move.`,
      quiz: [
        {
          question: 'In a tab widget, only one tab is in the tab order at a time. What technique enables this?',
          options: [
            'display:none on the inactive tabs',
            'aria-hidden="true" on inactive tabs',
            'Roving tabindex — the active tab has tabindex="0", all others have tabindex="-1"',
            'The tabindex attribute is not used in tab widgets',
          ],
          answer: 2,
        },
        {
          question: 'When a modal dialog opens, what must happen with keyboard focus?',
          options: [
            'Focus stays where it was — the user must navigate into the dialog manually',
            'Focus moves to the dialog container element itself',
            'Focus moves to the first interactive element inside the dialog, and focus must be trapped inside the dialog while it is open',
            'Focus is removed entirely so the dialog is in browse mode',
          ],
          answer: 2,
        },
        {
          question: 'What does aria-haspopup="listbox" on an input tell assistive technologies?',
          options: [
            'The input is disabled and will show a popup error',
            'Activating this input will show a listbox popup, so users know to expect a list of options',
            'The input has a label that pops up on hover',
            'The input will open a new browser window',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: `Write the HTML structure (attributes only — no CSS or full JS needed) for an accessible tab widget with two tabs: "Profile" and "Security". Include:
  - The tablist with an accessible name
  - Both tab buttons with correct roles and states (Profile is selected by default)
  - Both tabpanels with correct roles, IDs, and labelling
  - The hidden attribute on the inactive panel
  - Correct tabindex values using the roving tabindex pattern`,
        starterCode: `<!-- Tab widget structure: -->
<div ___="___" ___="Account settings">

  <button ___="___" id="tab-profile" ___="true"  ___="panel-profile" ___="0">
    Profile
  </button>

  <button ___="___" id="tab-security" ___="false" ___="panel-security" ___="-1">
    Security
  </button>

</div>

<div ___="___" id="panel-profile" ___="tab-profile">
  Profile settings content here.
</div>

<div ___="___" id="panel-security" ___="tab-security" hidden>
  Security settings content here.
</div>`,
        solution: `<!-- Tab widget structure: -->
<div role="tablist" aria-label="Account settings">

  <button role="tab" id="tab-profile" aria-selected="true"  aria-controls="panel-profile" tabindex="0">
    Profile
  </button>

  <button role="tab" id="tab-security" aria-selected="false" aria-controls="panel-security" tabindex="-1">
    Security
  </button>

</div>

<div role="tabpanel" id="panel-profile" aria-labelledby="tab-profile">
  Profile settings content here.
</div>

<div role="tabpanel" id="panel-security" aria-labelledby="tab-security" hidden>
  Security settings content here.
</div>`,
      },
    },
    {
      id: 'aria-8',
      title: 'Lesson 8: ARIA in Forms',
      content: `Forms are where screen reader users spend a lot of time and where ARIA mistakes cause the most friction. Most form accessibility comes from native HTML — but ARIA fills the gaps for validation feedback, grouping, and dynamic error handling.

THE BASELINE: NATIVE HTML FIRST
Most form accessibility is solved before you write a single ARIA attribute:

  <label for="username">Username</label>
  <input id="username" type="text" required autocomplete="username">

This gets you:
  - An accessible name (from <label>)
  - The correct role (textbox)
  - Required state (from the required attribute)
  - Autocomplete hints (for password managers and assistive tech)

Before adding ARIA to a form field, ask: does a native attribute or element already do this?

GROUPING RELATED FIELDS
Use <fieldset> and <legend> to group related fields. Screen readers announce the group name before each field inside it:

  <fieldset>
    <legend>Billing address</legend>
    <label for="bill-street">Street</label>
    <input id="bill-street" type="text">
    <label for="bill-city">City</label>
    <input id="bill-city" type="text">
  </fieldset>

When using a custom element instead of <fieldset>, use role="group" and aria-labelledby:

  <div role="group" aria-labelledby="billing-heading">
    <h3 id="billing-heading">Billing address</h3>
    ...
  </div>

Radio buttons must always be in a <fieldset> with a <legend>. Without the group label, a screen reader user hears "Yes, radio button, 1 of 2" with no context for what question they are answering.

VALIDATION AND ERROR MESSAGES
When validation fails, you need to communicate three things:
  1. That the field has an error (aria-invalid="true")
  2. What the error is (via aria-errormessage or aria-describedby pointing to the error message)
  3. That something has changed (via focus management or a live region)

  <label for="email">Email address</label>
  <input id="email" type="email"
         aria-invalid="true"
         aria-errormessage="email-error">
  <p id="email-error" role="alert">
    Please enter a valid email address, like name@example.com.
  </p>

The difference between aria-errormessage and aria-describedby for errors:
  - aria-errormessage is specifically for error messages and is suppressed when aria-invalid is "false" or absent
  - aria-describedby always reads its target regardless of validity state

In practice, aria-describedby is more widely supported today. aria-errormessage support is improving.

THE PATTERN FOR INLINE VALIDATION (ON BLUR)
When you validate a field when the user leaves it (on blur):

  input.addEventListener('blur', () => {
    if (!input.validity.valid) {
      input.setAttribute('aria-invalid', 'true');
      errorEl.textContent = 'Please enter a valid email.';
      errorEl.removeAttribute('hidden');
    } else {
      input.setAttribute('aria-invalid', 'false');
      errorEl.setAttribute('hidden', '');
      errorEl.textContent = '';
    }
  });

Note: role="alert" on the error container causes it to be announced automatically when text is injected. You do not need a separate live region.

THE PATTERN FOR SUBMIT-TIME VALIDATION
When the user submits and there are errors:
  1. Prevent submission
  2. Set aria-invalid="true" on all invalid fields
  3. Show all error messages
  4. Move focus to the first invalid field (not to a summary — directly to the field)

  form.addEventListener('submit', (e) => {
    const firstInvalidField = form.querySelector(':invalid');
    if (firstInvalidField) {
      e.preventDefault();
      firstInvalidField.setAttribute('aria-invalid', 'true');
      firstInvalidField.focus();
    }
  });

ARIA-REQUIRED VS THE NATIVE REQUIRED ATTRIBUTE
  native required: triggers browser-native validation, removes the field from :valid state, adds "required" to the accessibility tree
  aria-required: only adds "required" to the accessibility tree — no browser validation

Use native required whenever possible. Use aria-required on custom widget roles that cannot use the native attribute:
  <div role="spinbutton" aria-required="true" aria-valuenow="0">...</div>

ACCESSIBLE ERROR SUMMARY PATTERN
For long forms, an error summary at the top (after submission failure) can be helpful — but it must be done correctly:

  <div role="alert" id="error-summary" hidden>
    <h2>The form has errors. Please correct the following:</h2>
    <ul>
      <li><a href="#email">Email: please enter a valid address</a></li>
    </ul>
  </div>

  1. Make the summary visible and inject the list of errors
  2. Move focus to the summary heading (not the container — to the <h2>)
  3. Each error links directly to the invalid field

Moving focus to the summary heading causes it to be read aloud, and then the user can follow the links to each field.`,
      quiz: [
        {
          question: 'A form has three radio buttons for a question. They have no <fieldset> or <legend>. What is the screen reader experience?',
          options: [
            'The radio buttons work fine — labels on each button are sufficient',
            'The user hears each option with no context for what question they are answering, making the form confusing',
            'Screen readers skip ungrouped radio buttons entirely',
            'Radio buttons never need a group label',
          ],
          answer: 1,
        },
        {
          question: 'After submit-time form validation fails, where should keyboard focus move?',
          options: [
            'To the top of the page',
            'To the submit button',
            'To the first invalid field so the user can immediately correct it',
            'To an error summary if one exists, otherwise stay where it is',
          ],
          answer: 2,
        },
        {
          question: 'What does aria-invalid="true" communicate, and what else must you provide for it to be useful?',
          options: [
            'It communicates that the field is required; no other attributes are needed',
            'It communicates that the field has an error; you must also provide an error message referenced by aria-errormessage or aria-describedby',
            'It prevents form submission until corrected',
            'It changes the field\'s role to "invalid-input" in the accessibility tree',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: `Build the HTML and JavaScript for a single field form with accessible inline validation. Requirements:

HTML:
  - A visible label: "Phone number"
  - An input with id="phone", type="tel"
  - A native required attribute
  - An initially hidden error message container (role="alert")

JavaScript:
  - On blur: validate that the field is not empty
  - If empty: set aria-invalid="true", show error "Phone number is required."
  - If valid: set aria-invalid="false", hide the error
  - On submit: prevent default if invalid, and focus the invalid field`,
        starterCode: `<!-- HTML: -->
<form id="phone-form">
  <!-- label -->

  <!-- input with aria attributes -->

  <!-- error message container -->

  <button type="submit">Submit</button>
</form>

<!-- JavaScript: -->
<script>
  const input = document.getElementById('phone');
  const errorEl = document.getElementById('phone-error');

  input.addEventListener('blur', () => {
    // validate

  });

  document.getElementById('phone-form').addEventListener('submit', (e) => {
    // prevent and focus if invalid

  });
</script>`,
        solution: `<!-- HTML: -->
<form id="phone-form">
  <label for="phone">Phone number</label>

  <input id="phone" type="tel" required
         aria-describedby="phone-error">

  <p id="phone-error" role="alert" hidden></p>

  <button type="submit">Submit</button>
</form>

<!-- JavaScript: -->
<script>
  const input = document.getElementById('phone');
  const errorEl = document.getElementById('phone-error');

  input.addEventListener('blur', () => {
    if (input.value.trim() === '') {
      input.setAttribute('aria-invalid', 'true');
      errorEl.textContent = 'Phone number is required.';
      errorEl.removeAttribute('hidden');
    } else {
      input.setAttribute('aria-invalid', 'false');
      errorEl.textContent = '';
      errorEl.setAttribute('hidden', '');
    }
  });

  document.getElementById('phone-form').addEventListener('submit', (e) => {
    if (input.value.trim() === '') {
      e.preventDefault();
      input.setAttribute('aria-invalid', 'true');
      errorEl.textContent = 'Phone number is required.';
      errorEl.removeAttribute('hidden');
      input.focus();
    }
  });
</script>`,
      },
    },
    {
      id: 'aria-9',
      title: 'Lesson 9: Common ARIA Mistakes',
      content: `ARIA is a sharp tool. Used correctly, it bridges the gap between visual interfaces and assistive technologies. Used incorrectly, it actively makes things worse. Every mistake below has a real-world counterpart on production websites right now.

MISTAKE 1: ARIA-HIDDEN ON FOCUSABLE ELEMENTS
This is the most dangerous mistake. It creates silent focus traps — elements a keyboard user can reach but a screen reader cannot announce.

  <!-- WRONG -->
  <nav aria-hidden="true">
    <a href="/home">Home</a>
    <a href="/about">About</a>
  </nav>

  <!-- RIGHT: if the nav should be hidden, also remove links from focus -->
  <nav hidden>...</nav>

  <!-- RIGHT: if the nav IS visible, do not use aria-hidden on it at all -->
  <nav aria-label="Main navigation">...</nav>

Rule of thumb: if your cursor can Tab to it, do not put aria-hidden="true" on it or any of its ancestors.

MISTAKE 2: REDUNDANT ROLES
Adding a role that is already implied by the native element wastes no meaningful effort but signals a misunderstanding that can lead to more serious mistakes.

  <a href="/" role="link">Home</a>      ← redundant — <a href> is already role: link
  <button role="button">Submit</button> ← redundant — <button> is already role: button
  <h1 role="heading">Title</h1>         ← redundant — <h1> is already role: heading, level: 1

This is harmless on its own but indicates the developer does not know that HTML provides semantics automatically — which often means other ARIA mistakes are nearby.

MISTAKE 3: OVERRIDING NATIVE SEMANTICS
Changing a native element's role with ARIA strips its built-in behavior.

  <input type="checkbox" role="button"> ← the checkbox still looks and behaves like a checkbox but
                                          screen readers announce it as a button — deeply confusing

  <h2 role="presentation">Section</h2>  ← strips the heading from the accessibility tree;
                                          users navigating by heading cannot find this section

MISTAKE 4: USING ROLE="PRESENTATION" OR ROLE="NONE" ON INTERACTIVE ELEMENTS
role="presentation" (same as role="none") strips an element's semantics. It is valid for layout tables or purely decorative images. It is invalid on interactive elements.

  <button role="presentation">Click me</button>  ← wrong: interactive elements cannot be none

Interactive elements with role="presentation" have undefined behavior across screen readers. Never do this.

MISTAKE 5: EMPTY OR MEANINGLESS ARIA LABELS
aria-label with an empty string or a generic string like "button" provides no useful name.

  <button aria-label="">X</button>         ← empty string: the button has no name
  <button aria-label="button">Submit</button> ← the role is already announced; repeating it is useless

Accessible names should describe the action or purpose: "Close dialog", "Delete photo of sunset", "Subscribe to weekly newsletter."

MISTAKE 6: ARIA-LABEL THAT DOES NOT MATCH VISIBLE TEXT (WCAG 2.5.3)
WCAG 2.5.3 (Label in Name) requires that when an element has visible text, the accessible name must contain that text (or start with it). Voice control users say what they see to activate controls. If the label does not match, voice control fails.

  <!-- WRONG: visible text is "Submit", aria-label is completely different -->
  <button aria-label="Send form and confirm subscription">Submit</button>

  <!-- RIGHT: accessible name starts with the visible text -->
  <button aria-label="Submit and confirm subscription">Submit</button>

MISTAKE 7: USING ARIA-LIVE ASSERTIVE FOR EVERYTHING
Every assertive announcement interrupts whatever the screen reader is currently saying. If you use assertive for status updates, search results, or progress messages, you create a chaotic, interruption-heavy experience.

  <!-- WRONG for a non-urgent status message -->
  <div aria-live="assertive" id="progress">Uploading... 45%</div>

  <!-- RIGHT -->
  <div aria-live="polite" id="progress">Uploading... 45%</div>

Reserve assertive for: session timeouts, authentication errors, or any situation where the user needs to act immediately or will lose data.

MISTAKE 8: ARIA ROLES WITHOUT REQUIRED KEYBOARD BEHAVIOR
Adding a role tells screen readers what the element IS. It does not make the element behave that way. If you add role="slider" to a div, you must also implement the keyboard interaction (arrow keys to change value, Home/End for min/max).

  <div role="slider" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
    <!-- You must also handle: ArrowLeft/ArrowRight to change value, Tab to enter/exit,
         Home/End for min/max, aria-valuenow updates, announce value changes -->
  </div>

This is why Rule 1 (use native HTML) matters so much. A native <input type="range"> handles all keyboard behavior automatically.

MISTAKE 9: NOT TESTING WITH AN ACTUAL SCREEN READER
ARIA problems are invisible in visual testing and mostly invisible in automated accessibility audits. Tools like axe, Lighthouse, and WAVE can catch structural issues but cannot tell you what a screen reader actually announces. They cannot detect silent focus traps, incorrect state announcements, or confusing reading order.

Minimum testing checklist:
  ✓ Tab through the entire page — every interactive element must be reachable
  ✓ Activate every interactive element with Enter and Space
  ✓ Verify that state changes are announced (expanded/collapsed, checked/unchecked)
  ✓ Trigger validation errors and confirm error messages are announced
  ✓ Test every live region by causing the triggering action

MISTAKE 10: USING ARIA TO COMPENSATE FOR BAD HTML
ARIA should augment good HTML, not rescue bad HTML. If your heading structure is wrong, aria-level will not reliably fix it. If your form has no labels, aria-label on every field is a band-aid that misses the root cause.

The correct order:
  1. Write semantic, well-structured HTML
  2. Layer ARIA on top where HTML falls short
  3. Verify with a screen reader`,
      quiz: [
        {
          question: 'A developer adds aria-label="icon" to an icon-only button. Why is this an accessibility problem?',
          options: [
            'aria-label is not valid on buttons',
            '"icon" describes what the element contains, not what action it performs — it gives screen reader users no useful information about what the button does',
            'aria-label must match the visible text exactly to comply with WCAG',
            'Icon buttons must always use aria-labelledby, not aria-label',
          ],
          answer: 1,
        },
        {
          question: 'Why is it dangerous to use aria-live="assertive" for upload progress updates (like "Uploading... 45%")?',
          options: [
            'assertive is not supported on div elements',
            'Progress updates happen frequently and each one would interrupt the screen reader mid-speech, creating an unusable, chaotic experience',
            'assertive live regions do not update when percentages are involved',
            'Percentage values are not valid content for live regions',
          ],
          answer: 1,
        },
        {
          question: 'Which of these correctly identifies a WCAG 2.5.3 (Label in Name) violation?',
          options: [
            'A button with visible text "Save" and aria-label="Save document"',
            'A button with visible text "Submit" and aria-label="Send and confirm"',
            'A link with visible text "Learn more" and aria-label="Learn more about our pricing plans"',
            'An input with visible label "Email" and aria-label="Email address"',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: `The component below has multiple ARIA mistakes. List each mistake, identify which rule or concept it violates, and write the corrected version.

BROKEN COMPONENT:
  <nav aria-hidden="true">
    <a href="/" role="link">Home</a>
    <a href="/about" aria-label="button">About</a>
  </nav>

  <h2 role="presentation">Latest news</h2>

  <div aria-live="assertive" id="scroll-tracker">
    Scrolled to: 45%
  </div>

  <button aria-label="x">
    <svg><!-- close icon --></svg>
  </button>`,
        starterCode: `MISTAKE 1 (nav):
  Violates:
  Fix:

MISTAKE 2 (home link):
  Violates:
  Fix:

MISTAKE 3 (about link):
  Violates:
  Fix:

MISTAKE 4 (h2):
  Violates:
  Fix:

MISTAKE 5 (scroll tracker):
  Violates:
  Fix:

MISTAKE 6 (button):
  Violates:
  Fix:`,
        solution: `MISTAKE 1 (nav):
  Violates: Rule 4 — aria-hidden on an ancestor of focusable elements. The links inside are keyboard focusable but screen readers cannot announce them.
  Fix: Remove aria-hidden="true" from the nav entirely. If it should be hidden, use hidden attribute (which also removes focus).

MISTAKE 2 (home link):
  Violates: Redundant role — <a href> already has role: link automatically.
  Fix: <a href="/">Home</a>

MISTAKE 3 (about link):
  Violates: Meaningless aria-label — "button" describes a role, not a purpose. Also violates WCAG 2.5.3 since "button" does not start with "About".
  Fix: <a href="/about">About</a> (remove the aria-label — the link text is the accessible name)

MISTAKE 4 (h2):
  Violates: Rule 2 — role="presentation" strips the heading's semantics from the accessibility tree, removing it from heading navigation.
  Fix: <h2>Latest news</h2>

MISTAKE 5 (scroll tracker):
  Violates: Using assertive for a non-urgent, frequently updating status. This would interrupt the screen reader every few seconds.
  Fix: <div aria-live="polite" id="scroll-tracker">Scrolled to: 45%</div>

MISTAKE 6 (button):
  Violates: Rule 5 — "x" is not a meaningful accessible name; it describes the visual icon character, not the action.
  Fix: <button aria-label="Close"><svg aria-hidden="true"><!-- close icon --></svg></button>`,
      },
    },
    {
      id: 'aria-10',
      title: 'Lesson 10: Accessible Data Tables',
      content: `Data tables are one of the most complex accessibility challenges. A well-structured table is easy to navigate with a screen reader; a poorly structured one is incomprehensible.

─────────────────────────────
THE PROBLEM WITH TABLES AND SCREEN READERS
─────────────────────────────
A screen reader navigates a table cell by cell using arrow keys. When a user lands on a data cell, the screen reader announces the cell's value AND the associated column/row headers. Without proper headers, users hear raw data with no context — like hearing "145" with no idea if it is a price, a quantity, or a score.

─────────────────────────────
SIMPLE TABLE STRUCTURE
─────────────────────────────
For a simple table (one row of headers, one column of headers):

  <table>
    <caption>Quarterly sales by region</caption>
    <thead>
      <tr>
        <th scope="col">Region</th>
        <th scope="col">Q1</th>
        <th scope="col">Q2</th>
        <th scope="col">Q3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">North</th>
        <td>£1,200</td>
        <td>£1,450</td>
        <td>£1,100</td>
      </tr>
      <tr>
        <th scope="row">South</th>
        <td>£980</td>
        <td>£1,100</td>
        <td>£1,300</td>
      </tr>
    </tbody>
  </table>

KEY ELEMENTS:
  <caption>  — the table's accessible name; always include one
  <thead>    — groups header rows
  <tbody>    — groups data rows
  <th scope="col"> — a column header (applies to all cells below it)
  <th scope="row"> — a row header (applies to all cells to its right)
  <td>       — a data cell

When a user navigates to the £1,450 cell in the example above, JAWS and NVDA will announce: "Q2 North £1,450" — the column header, the row header, and the value.

─────────────────────────────
COMPLEX TABLES — USING HEADERS AND ID ATTRIBUTES
─────────────────────────────
When a table has merged cells (colspan/rowspan) or multiple header levels, scope alone is not enough. Use id and headers attributes:

  <table>
    <caption>Employee training completion</caption>
    <thead>
      <tr>
        <td></td>
        <th id="q1" scope="colgroup" colspan="2">Q1</th>
        <th id="q2" scope="colgroup" colspan="2">Q2</th>
      </tr>
      <tr>
        <td></td>
        <th id="online" scope="col">Online</th>
        <th id="class" scope="col">In-class</th>
        <th id="online2" scope="col">Online</th>
        <th id="class2" scope="col">In-class</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th id="team-a" scope="row">Team A</th>
        <td headers="q1 online team-a">12</td>
        <td headers="q1 class team-a">8</td>
        <td headers="q2 online2 team-a">15</td>
        <td headers="q2 class2 team-a">10</td>
      </tr>
    </tbody>
  </table>

The headers attribute takes a space-separated list of id values — it explicitly links each cell to its headers.

─────────────────────────────
WHAT NOT TO DO WITH TABLES
─────────────────────────────
  DO NOT use tables for layout — use CSS Grid or Flexbox
  DO NOT use <td> for headers — always use <th>
  DO NOT omit <caption> — it is the table's accessible name
  DO NOT use display:block or display:flex on table elements — this breaks the accessibility tree

─────────────────────────────
SORTABLE TABLES
─────────────────────────────
When a column is sortable, announce the sort state:

  <th scope="col" aria-sort="ascending">
    Name <button>Sort</button>
  </th>

  aria-sort values: "ascending", "descending", "none", "other"`,
      quiz: [
        {
          question: 'What does scope="col" on a <th> element tell a screen reader?',
          options: [
            'The cell spans multiple columns',
            'This header applies to all cells below it in the same column',
            'The column should be hidden from screen readers',
            'This cell is part of a column group',
          ],
          answer: 'This header applies to all cells below it in the same column',
        },
        {
          question: 'A data table has two levels of column headers (a parent group header spanning two columns, and two child headers). scope="col" alone is not enough. What should you use instead?',
          options: [
            'aria-label on each header cell',
            'id on each header and headers attribute on each data cell listing the applicable header ids',
            'th colspan and rowspan to merge the headers visually',
            'A nested table inside each header cell',
          ],
          answer: 'id on each header and headers attribute on each data cell listing the applicable header ids',
        },
        {
          question: 'Why should you not use display:flex or display:block on a <table> or its children?',
          options: [
            'It causes visual layout issues in all browsers',
            'It breaks the accessibility tree — screen readers no longer recognise the element as a table',
            'It prevents the table from being sortable',
            'It removes the table borders in some browsers',
          ],
          answer: 'It breaks the accessibility tree — screen readers no longer recognise the element as a table',
        },
      ],
      exercise: {
        prompt: 'Write an accessible HTML table showing three students\' quiz scores for two subjects. Include: caption, thead with column headers (scope="col"), a row header for each student (scope="row"), and data cells.',
        starterCode: `<!-- Accessible data table: 3 students, 2 subjects -->

<table>
  <!-- Add caption -->

  <!-- Add thead with column headers -->

  <!-- Add tbody with row headers and data cells -->

</table>`,
        solution: `<table>
  <caption>Quiz scores by student and subject</caption>
  <thead>
    <tr>
      <th scope="col">Student</th>
      <th scope="col">HTML</th>
      <th scope="col">CSS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Ada Lovelace</th>
      <td>92</td>
      <td>88</td>
    </tr>
    <tr>
      <th scope="row">Grace Hopper</th>
      <td>78</td>
      <td>95</td>
    </tr>
    <tr>
      <th scope="row">Alan Turing</th>
      <td>85</td>
      <td>80</td>
    </tr>
  </tbody>
</table>`,
      },
    },
  ],
};

window.ariaModule = ariaModule;
