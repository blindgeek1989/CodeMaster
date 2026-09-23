'use strict';

const srTestingModule = {
  id: 'sr-testing',
  title: 'Screen Reader Testing',
  description: 'Automated accessibility tools catch roughly 30% of issues. The rest require real testing with screen readers. This module teaches you how to test with NVDA, JAWS, and VoiceOver, how to find and document accessibility bugs, and how to build a repeatable testing practice.',
  objectives: [
    'Understand why manual screen reader testing is essential alongside automated tools',
    'Use NVDA to navigate and test web content on Windows',
    'Use JAWS to navigate and test web content on Windows',
    'Use VoiceOver to test on macOS and iOS',
    'Identify common accessibility failure patterns and their root causes',
    'Write clear, reproducible accessibility bug reports',
    'Build a structured testing checklist for interactive components',
    'Understand where automated testing fits alongside manual testing',
  ],
  goals: [
    'Complete a keyboard-only walkthrough of a web page and note every barrier',
    'Use NVDA browse mode to read through a page and identify heading structure issues',
    'Write an accessibility bug report that a developer can immediately action',
    'Build a personal testing checklist for modals, navigation, and forms',
    'Explain to a colleague what automated tools can and cannot detect',
  ],
  lessons: [
    // ─────────────────────────────────────────────────────────────────
    // LESSON 1 — WHY TEST WITH REAL SCREEN READERS?
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'sr-test-1',
      title: 'Lesson 1: Why You Must Test with Real Screen Readers',
      content: `Automated accessibility tools are a valuable first step — but they cannot tell you whether a screen reader user can actually USE your application.

WHAT AUTOMATED TOOLS CAN FIND
Tools like axe, Lighthouse, WAVE, and IBM Equal Access Checker detect violations that can be determined programmatically:

  ✓ Missing alt text on images
  ✓ Missing form labels
  ✓ Insufficient colour contrast
  ✓ Missing document language attribute
  ✓ Duplicate IDs
  ✓ Empty links and buttons

These are important findings. Fix them first — they are fast to find and often easy to fix.

WHAT AUTOMATED TOOLS CANNOT FIND
  ✗ Whether alt text is USEFUL (they check it exists, not what it says)
  ✗ Whether the reading order makes sense
  ✗ Whether aria-label text is meaningful (or confusingly worded)
  ✗ Whether focus management works correctly in single-page apps
  ✗ Whether dynamic content changes are announced properly
  ✗ Whether a custom component (like a date picker) is actually operable
  ✗ Whether a form error message is associated with the right field
  ✗ Keyboard traps — elements you can Tab into but not escape
  ✗ Whether touch gestures work with mobile screen readers

THE 30% RULE
Research consistently shows that automated tools catch approximately 30-40% of WCAG failures. That means 60-70% of real accessibility issues require human judgment and manual testing to find.

You cannot ship an accessible product based on a green Lighthouse score alone.

TESTING ENVIRONMENTS
Each screen reader has different market share and different behaviour. A page that works in one may not work in another.

Common combinations:
  NVDA + Chrome or Firefox (most common on Windows)
  JAWS + Chrome or Edge (dominant in enterprise and government)
  VoiceOver + Safari (most common on macOS and iOS)
  TalkBack + Chrome (Android)

For most web testing, prioritise:
  1. NVDA + Chrome (free, large user base)
  2. VoiceOver + Safari (built-in on all Apple devices, large mobile user base)
  3. JAWS + Chrome (required for enterprise/government compliance)

A MINIMUM VIABLE TESTING PROCESS
1. Run automated scan — fix any flagged violations
2. Keyboard-only walkthrough — Tab through everything, confirm operability
3. NVDA/VoiceOver pass — listen to the page as a screen reader user hears it
4. Test critical flows — registration, checkout, login, search
5. Fix bugs, retest, document`,
      quiz: [
        {
          question: 'Approximately what percentage of WCAG failures do automated tools catch?',
          options: [
            'About 80-90%',
            'About 60-70%',
            'About 30-40%',
            'About 10-20%',
          ],
          answer: 'About 30-40%',
        },
        {
          question: 'Which of the following issues can automated tools reliably detect?',
          options: [
            'Whether alt text is meaningful and helpful',
            'Whether a custom date picker is keyboard operable',
            'Missing alt text on images',
            'Whether focus management in a SPA is correct',
          ],
          answer: 'Missing alt text on images',
        },
        {
          question: 'For testing a web application, which screen reader combination should you prioritise first?',
          options: [
            'JAWS + Internet Explorer — the most common enterprise combination',
            'NVDA + Chrome — free, widely used, representative of common user experience',
            'VoiceOver + Firefox — cross-platform and open source',
            'TalkBack + Chrome — the most popular globally due to Android market share',
          ],
          answer: 'NVDA + Chrome — free, widely used, representative of common user experience',
        },
      ],
      exercise: {
        prompt: 'List 5 accessibility issues that you would only discover through manual screen reader testing — not through an automated axe or Lighthouse scan. Explain briefly why each one requires human judgment.',
        starterCode: `// 5 issues that require manual screen reader testing

// 1.

// 2.

// 3.

// 4.

// 5.`,
        solution: `// 1. Confusing alt text — axe confirms alt text exists, but a human must judge whether "image-01.jpg" or "decorative graphic" makes sense to a user listening.

// 2. Focus management in a modal — when a modal opens, focus must move to it; when it closes, focus must return to the trigger. Automated tools cannot check runtime behaviour.

// 3. Unhelpful aria-label — a button labelled "click here" passes automated checks for label presence but is useless out of context.

// 4. Keyboard trap — a custom dropdown that responds to Tab and Enter to open, but traps focus inside with no Escape key handler. Automated tools do not simulate keyboard interaction.

// 5. Announcement of dynamic content — a search results list that updates without an aria-live region silently disappears for screen reader users. Automated tools check for live regions but not whether they actually work correctly at runtime.`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 2 — NVDA BASICS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'sr-test-2',
      title: 'Lesson 2: Testing with NVDA on Windows',
      content: `NVDA (NonVisual Desktop Access) is a free, open-source screen reader for Windows. It has a large user base and is the most common tool for web accessibility testing.

Download: nvaccess.org/download (free, no account required)

STARTING AND STOPPING NVDA
  Start: launch from desktop shortcut or Start Menu
  Stop: NVDA key + Q (then Enter to confirm)

The NVDA key is INSERT by default (Caps Lock can also be set as NVDA key).

THE TWO MODES
NVDA has two main modes for web content:

BROWSE MODE (virtual cursor mode):
  - Used for reading web pages
  - Arrow keys move through the content linearly
  - NVDA reads the semantics — headings, links, form controls are announced
  - Single letter navigation shortcuts work (H for headings, B for buttons, etc.)

FORMS MODE (focus mode):
  - NVDA switches to this automatically when you focus on an interactive element (input, select, etc.)
  - Arrow keys type into the field instead of navigating the page
  - NVDA announces: "forms mode"

ESSENTIAL BROWSE MODE SHORTCUTS
  H / Shift+H       — jump to next/previous heading
  1-6 / Shift+1-6   — jump to next/previous heading level 1-6
  B / Shift+B       — jump to next/previous button
  F / Shift+F       — jump to next/previous form field
  L / Shift+L       — jump to next/previous list
  T / Shift+T       — jump to next/previous table
  G / Shift+G       — jump to next/previous graphic
  K / Shift+K       — jump to next/previous link
  NVDA+F7           — open elements list (all headings, links, or landmarks)

READING COMMANDS
  NVDA + Down arrow — read from cursor position
  NVDA + Up arrow   — read current line
  NVDA + Tab        — announce current focus
  Ctrl              — stop speech

WHAT TO LISTEN FOR WHEN TESTING
1. HEADING STRUCTURE: Press H repeatedly. Do headings tell the story of the page? Is the hierarchy logical?

2. LINK TEXT: Press K to jump through links. Does every link make sense out of context? "Click here" and "Read more" are failures.

3. IMAGES: Press G for images. Does the alt text convey the image's meaning? Decorative images should be silent.

4. FORMS: Tab into each form field. Is the label announced? Is the required state announced? When an error occurs, is it associated with the field?

5. DYNAMIC CONTENT: After a page update (search results, live region), does NVDA announce the change?

6. CUSTOM WIDGETS: For accordions, tabs, and modals — can you open them with Enter/Space? Does focus move correctly?

TESTING WORKFLOW
1. Open Chrome, navigate to the page
2. Start NVDA
3. Press Ctrl+Home to go to the top of the page
4. Press NVDA+F7 and review the heading list — does the page have a logical structure?
5. Press Tab to move through interactive elements — are all focusable?
6. Use single-letter shortcuts to jump through key elements
7. Test each major interaction: search, form submission, modal dialogs`,
      quiz: [
        {
          question: 'What is the keyboard shortcut to jump to the next heading in NVDA\'s browse mode?',
          options: [
            'NVDA + H',
            'H',
            'Ctrl + H',
            'Alt + H',
          ],
          answer: 'H',
        },
        {
          question: 'NVDA switches from Browse Mode to Forms Mode automatically. When does this happen?',
          options: [
            'When you press the NVDA key',
            'When you reach the end of the page',
            'When you focus on an interactive form element like an input field',
            'When you are on a page that contains a form',
          ],
          answer: 'When you focus on an interactive form element like an input field',
        },
        {
          question: 'You press K repeatedly in NVDA browse mode and hear "Read more", "Read more", "Read more". What accessibility issue does this indicate?',
          options: [
            'The links are broken',
            'The links have non-descriptive text that does not make sense out of context',
            'NVDA is reading the wrong element',
            'The page has too many links',
          ],
          answer: 'The links have non-descriptive text that does not make sense out of context',
        },
      ],
      exercise: {
        prompt: 'You are testing a page with NVDA. Describe the step-by-step testing process you would follow to evaluate: (1) heading structure, (2) form field labelling, and (3) whether a modal dialog is accessible.',
        starterCode: `// NVDA testing procedure

// (1) Testing heading structure:

// (2) Testing form field labelling:

// (3) Testing a modal dialog:`,
        solution: `// (1) Testing heading structure:
// Open the page in Chrome with NVDA running. Press NVDA+F7 and select Headings. Review the list — are there any gaps? Does the hierarchy make sense? Then press Ctrl+Home and press H repeatedly, listening to each heading announcement. Confirm h1 is present and used once, h2 and h3 follow logically.

// (2) Testing form field labelling:
// Press F to jump to each form field. For each field, listen to what NVDA announces — it should say the label text, the type of control, and whether it is required. Enter text to trigger validation errors, then check if error messages are announced (they should be associated via aria-describedby or aria-errormessage).

// (3) Testing a modal dialog:
// Tab to the button that opens the modal. Press Enter or Space to open it. Listen: NVDA should announce the modal's role (dialog) and its label. Verify focus moved inside the modal. Tab through all interactive elements — can you reach all of them? Press Escape — the modal should close and focus should return to the trigger button. Verify you cannot Tab outside the modal while it is open (focus trap).`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 3 — JAWS BASICS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'sr-test-3',
      title: 'Lesson 3: Testing with JAWS on Windows',
      content: `JAWS (Job Access With Speech) is the market leader in enterprise and government accessibility. It costs several hundred dollars per licence, but Freedom Scientific offers a free 40-minute demo mode per session (the software pauses after 40 minutes).

Download demo: freedomscientific.com

JAWS vs NVDA — KEY DIFFERENCES
Both are powerful but they have differences that affect testing:

  - JAWS has more verbosity options and better support for complex enterprise software
  - NVDA is faster to install and free — better for regular web testing
  - JAWS and NVDA sometimes announce the same page differently — test both for enterprise compliance
  - JAWS is dominant in US government and financial institutions
  - The recommended browser for JAWS is Chrome or Edge

JAWS MODES
Like NVDA, JAWS has two main modes:

VIRTUAL PC CURSOR (browse mode equivalent):
  - Arrow keys read content
  - Single-letter shortcuts work

PC CURSOR (forms mode equivalent):
  - Active when in a form field or interactive widget
  - JAWS announces "forms mode on" or shows in the status bar

Toggle modes: JAWS + Z or Num Pad Plus

ESSENTIAL JAWS SHORTCUTS
(JAWS key is INSERT or CAPS LOCK)

  H / Shift+H        — next/previous heading
  1-6                — next heading of level 1-6
  F / Shift+F        — next/previous form field
  B / Shift+B        — next/previous button
  T / Shift+T        — next/previous table
  JAWS+F6            — list of headings
  JAWS+F5            — list of form fields
  JAWS+F7            — list of links

JAWS-SPECIFIC FEATURES TO TEST
JAWS announces things NVDA does not always announce — and vice versa. Pay attention to:

TABLE NAVIGATION: In complex tables, JAWS reads column and row headers as you navigate cells. If headers are not properly defined (using th elements with scope, or headers/id associations), JAWS reads data without context.

FORM VALIDATION: JAWS announces HTML5 constraint validation messages differently from NVDA. Test both.

CUSTOM WIDGETS: JAWS has more built-in handling for some ARIA patterns. A custom slider might work in JAWS but not NVDA — test both.

TESTING COMPLEX TABLES WITH JAWS
In a data table, JAWS should announce column and row headers as you move through cells. Test with:

  Arrow keys to navigate cells
  JAWS+Alt+Down   — read current cell with all headers
  JAWS+Alt+Left   — read row header for current cell

If headers are not announced, the table is missing proper th elements or scope attributes.`,
      quiz: [
        {
          question: 'JAWS is most commonly required for testing when your audience includes:',
          options: [
            'Users on Android devices',
            'Users on iOS devices',
            'Enterprise and government users, where JAWS is the dominant screen reader',
            'Users on macOS who cannot afford VoiceOver',
          ],
          answer: 'Enterprise and government users, where JAWS is the dominant screen reader',
        },
        {
          question: 'A developer says "the widget works in NVDA — we don\'t need to test JAWS." What is the problem with this reasoning?',
          options: [
            'NVDA is not a real screen reader — JAWS is the only one that matters',
            'JAWS and NVDA sometimes handle the same HTML and ARIA differently — a fix for one is not guaranteed to work in the other',
            'JAWS is always correct and NVDA is always wrong',
            'There is no problem — if it works in NVDA it will definitely work in JAWS',
          ],
          answer: 'JAWS and NVDA sometimes handle the same HTML and ARIA differently — a fix for one is not guaranteed to work in the other',
        },
        {
          question: 'When testing a data table with JAWS, what should be announced as you move between cells?',
          options: [
            'Only the cell value — header information clutters the experience',
            'The column and row headers for the current cell, providing context for the data',
            'The complete row from left to right before announcing the specific cell',
            'The table caption and cell value only',
          ],
          answer: 'The column and row headers for the current cell, providing context for the data',
        },
      ],
      exercise: {
        prompt: 'Write the JAWS keyboard shortcuts for: (1) opening a list of all headings on the page, (2) jumping to the next form field, (3) listing all links on the page.',
        starterCode: `// JAWS shortcuts

// (1) Open a list of all headings:

// (2) Jump to the next form field:

// (3) List all links on the page:`,
        solution: `// (1) Open a list of all headings:
// JAWS+F6

// (2) Jump to the next form field:
// F (in Virtual PC Cursor / browse mode)

// (3) List all links on the page:
// JAWS+F7`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 4 — VOICEOVER BASICS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'sr-test-4',
      title: 'Lesson 4: Testing with VoiceOver on macOS and iOS',
      content: `VoiceOver is Apple's built-in screen reader. It is free on all Apple devices and is the dominant screen reader on iOS. VoiceOver + Safari is the recommended testing combination on Mac.

STARTING VOICEOVER ON MACOS
  Turn on: Command + F5
  Turn off: Command + F5 (again)

  Or: System Settings -> Accessibility -> VoiceOver -> Enable VoiceOver

The VoiceOver modifier key is Control + Option (often written VO).

WEB NAVIGATION WITH VOICEOVER
VoiceOver uses a different navigation model from NVDA/JAWS.

QUICK NAV MODE: enables arrow key navigation without holding VO
  Toggle: Left Arrow + Right Arrow simultaneously

WITH QUICK NAV OFF:
  VO + Right Arrow    — next item
  VO + Left Arrow     — previous item
  VO + Shift + Down   — interact with an element (enter)
  VO + Shift + Up     — stop interacting (exit)

ROTOR (VoiceOver's element picker):
  VO + U              — open Rotor
  Left/Right arrows   — switch categories (Headings, Links, Form Controls, Landmarks, etc.)
  Up/Down arrows      — navigate within the selected category
  Enter               — jump to the selected element
  Escape              — close Rotor

The Rotor is equivalent to NVDA's Elements List (NVDA+F7).

ESSENTIAL VOICEOVER WEB SHORTCUTS
  VO + Command + H    — next heading
  VO + Command + J    — next form control
  VO + Command + L    — next link
  VO + Command + T    — next table
  VO + A              — read from current position
  VO + Space          — activate focused element

VOICEOVER ON IOS
Enable: Settings -> Accessibility -> VoiceOver -> On

Gestures:
  Single tap         — move focus to element and hear it
  Double tap         — activate focused element
  Three-finger swipe — scroll
  Two-finger swipe up — read all from top
  Swipe left/right   — move to previous/next element

Testing on iOS is essential because:
  - Over 70% of screen reader users are on mobile
  - VoiceOver on iOS has a huge user base
  - Mobile-specific bugs (touch target size, gesture conflicts) only appear on device

VOICEOVER vs NVDA/JAWS DIFFERENCES
  - VoiceOver uses a different navigation model (interaction mode vs browse mode)
  - VoiceOver + Safari has the best support for HTML semantics on macOS
  - VoiceOver announces ARIA roles differently — "web content" vs NVDA's approach
  - Focus management in SPAs often behaves differently in VoiceOver`,
      quiz: [
        {
          question: 'What keyboard shortcut turns VoiceOver on and off on macOS?',
          options: [
            'Ctrl + Alt + V',
            'Command + F5',
            'Option + Escape',
            'Ctrl + Shift + V',
          ],
          answer: 'Command + F5',
        },
        {
          question: 'What is the VoiceOver Rotor?',
          options: [
            'A setting that controls the speed of VoiceOver speech',
            'An element picker that lets you navigate by headings, links, form controls, and other categories',
            'The VoiceOver modifier key combination',
            'A feature that rotates text direction for RTL languages',
          ],
          answer: 'An element picker that lets you navigate by headings, links, form controls, and other categories',
        },
        {
          question: 'Why is testing with VoiceOver on iOS particularly important?',
          options: [
            'iOS bugs are the easiest to fix and should be prioritised',
            'VoiceOver is the only screen reader that tests WCAG compliance properly',
            'The majority of screen reader users access the web on mobile, and VoiceOver has a large iOS user base',
            'iOS testing is required by law in most countries',
          ],
          answer: 'The majority of screen reader users access the web on mobile, and VoiceOver has a large iOS user base',
        },
      ],
      exercise: {
        prompt: 'Write a step-by-step guide for using the VoiceOver Rotor to review all headings on a web page in Safari on macOS.',
        starterCode: `// How to review headings using the VoiceOver Rotor (macOS + Safari)

// Step 1:

// Step 2:

// Step 3:

// Step 4:

// Step 5:`,
        solution: `// Step 1: Open the web page in Safari on macOS.
// Step 2: Enable VoiceOver with Command + F5.
// Step 3: Press VO + U (Control + Option + U) to open the Rotor.
// Step 4: Use the Left or Right arrow keys to navigate to the "Headings" category.
// Step 5: Use Up and Down arrow keys to move through the list of headings — VoiceOver announces each heading level and text.
// Step 6: Press Enter on a heading to jump to it on the page.
// Step 7: Press Escape to close the Rotor without navigating.`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 5 — COMMON FAILURE PATTERNS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'sr-test-5',
      title: 'Lesson 5: Common Accessibility Failure Patterns',
      content: `Some accessibility failures appear repeatedly across virtually every codebase. Knowing these patterns lets you find them quickly in testing and understand the fix.

FAILURE 1: INACCESSIBLE CUSTOM COMPONENTS
When developers build custom widgets (dropdowns, tabs, sliders, date pickers) with divs and spans instead of native HTML elements, they must manually implement keyboard interaction and ARIA.

Symptoms in testing:
  - Click with mouse -> works. Navigate with keyboard -> cannot interact.
  - NVDA announces "blank" or nothing when focused.
  - No keyboard operable way to open, select, or close.

Root causes:
  - div or span used as a button (no role="button", no keyboard handler)
  - Custom select built without role="listbox" and role="option"
  - No focus management when the widget opens/closes

FAILURE 2: FOCUS MANAGEMENT ERRORS
When content changes (modal opens, page navigates, form submits), focus should move to the right place. When it does not, keyboard users are stranded.

Symptoms:
  - Modal opens but focus stays behind it
  - Form submits successfully but focus jumps to the top of the page
  - Back button returns focus to the top instead of where you were

FAILURE 3: MISSING OR MISLEADING ANNOUNCEMENTS
Dynamic content that updates without an aria-live region is invisible to screen readers.

Symptoms:
  - Search results update visually, but nothing is announced
  - A form field shows a red border on error, but no error message is announced
  - A loading spinner appears but NVDA says nothing

FAILURE 4: KEYBOARD TRAPS
A keyboard trap is when focus enters an element but cannot leave with standard keys.

Common culprits:
  - Rich text editors
  - Third-party date picker widgets
  - Embedded iframes
  - Video players

Note: A modal SHOULD trap focus (intentionally) while it is open — but it must release focus when closed. The difference is intentional vs accidental trapping.

FAILURE 5: VISUAL-ONLY INFORMATION
Information conveyed only through colour, icon shape, or visual position is inaccessible to screen reader users and those with visual impairments.

Examples:
  - A red asterisk (*) that means "required" with no text explanation
  - Tabs that show the active tab with a blue underline only
  - A price list where strikethrough price means "sale" with no text alternative

FAILURE 6: POOR HEADING STRUCTURE
Screen reader users often navigate by headings (the H key in NVDA). If headings skip levels, are non-existent, or are visually styled text that is not actually a heading element, navigation breaks.

Common mistakes:
  - Page starts with h3 (no h1 or h2)
  - Multiple h1 elements on one page
  - Heading levels used for visual size, not document structure
  - Important sections have no headings at all`,
      quiz: [
        {
          question: 'A developer uses a <div> with an onClick handler as a button. What must they add to make it accessible to screen reader users?',
          options: [
            'A class="button" attribute — screen readers detect styled divs',
            'role="button", tabindex="0", and keyboard event handlers for Enter and Space',
            'An onclick attribute — all browsers expose onClick to screen readers',
            'A title attribute with the button label',
          ],
          answer: 'role="button", tabindex="0", and keyboard event handlers for Enter and Space',
        },
        {
          question: 'A user submits a form and gets a success message, but focus jumps to the top of a long page. What type of accessibility failure is this?',
          options: [
            'Missing alt text',
            'Keyboard trap',
            'Focus management error',
            'Colour contrast failure',
          ],
          answer: 'Focus management error',
        },
        {
          question: 'A required form field shows a red asterisk (*) next to the label but no text says "required." Which failure pattern is this?',
          options: [
            'Missing label',
            'Visual-only information — the required state is conveyed through visual symbol only',
            'Incorrect ARIA role',
            'Insufficient colour contrast',
          ],
          answer: 'Visual-only information — the required state is conveyed through visual symbol only',
        },
      ],
      exercise: {
        prompt: 'For each failure pattern below, write one concrete fix. Focus on what code change would resolve the issue.',
        starterCode: `// Fixes for common failure patterns

// 1. A <div class="btn" onclick="submit()">Submit</div>:
// Fix:

// 2. A modal opens but focus stays on the trigger button behind it:
// Fix:

// 3. Search results update silently — no announcement:
// Fix:

// 4. Required fields marked with a red asterisk only:
// Fix:`,
        solution: `// 1. A non-semantic button div:
// Fix: Replace with <button type="button">Submit</button> — or add role="button" tabindex="0" and keyboard handlers for Enter and Space.

// 2. Focus not moved to modal on open:
// Fix: After showing the modal, call focus() on the modal element (or its first focusable child). On close, call focus() on the element that opened the modal.

// 3. Search results not announced:
// Fix: Add aria-live="polite" to the results container. When results load, update the container's content. Or add an aria-live region that announces "X results found."

// 4. Required fields marked visually only:
// Fix: Add required attribute to the input (browser announces "required"), and/or add visible text "(required)" to the label, and/or add aria-required="true".`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 6 — WRITING BUG REPORTS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'sr-test-6',
      title: 'Lesson 6: Writing Accessibility Bug Reports',
      content: `An accessibility bug report that a developer cannot reproduce or understand is useless. Clear, specific reports get fixed faster.

THE ANATOMY OF A GOOD ACCESSIBILITY BUG REPORT

TITLE:
  Bad: "Screen reader doesn't work on modal"
  Good: "Modal dialog — focus not moved to dialog on open (NVDA + Chrome)"

ENVIRONMENT:
  - Browser and version: Chrome 126
  - Screen reader and version: NVDA 2024.2
  - Operating system: Windows 11
  - URL or component: /checkout/payment, CardModal component

STEPS TO REPRODUCE:
  1. Navigate to /checkout/payment
  2. Tab to the "Enter card details" button
  3. Press Enter to activate it
  4. [Expected] Focus should move to the modal dialog
  5. [Actual] Focus remains on the "Enter card details" button — modal content is not reachable by keyboard

EXPECTED BEHAVIOUR:
  When the modal opens, focus should move to the dialog element or its first focusable child. NVDA should announce "Card details dialog" (or similar).

ACTUAL BEHAVIOUR:
  Focus stays on the trigger button. The modal content is visually visible but unreachable via keyboard or screen reader.

WCAG CRITERION:
  WCAG 2.1 Success Criterion 2.1.1 Keyboard (Level A)
  WCAG 2.1 Success Criterion 2.4.3 Focus Order (Level A)

SEVERITY:
  Critical — keyboard and screen reader users cannot complete payment

SUGGESTED FIX:
  After the modal is shown, call focus() on the modal element or its first focusable child. On modal close, return focus to the trigger button.

SEVERITY RATINGS
CRITICAL: Blocks a key task entirely for some users (cannot complete checkout, cannot log in, cannot access main content)

HIGH: Creates a significant barrier but a workaround exists (content is technically reachable but requires unusual effort)

MEDIUM: Degrades the experience but does not block task completion (confusing announcements, unexpected focus, missing context)

LOW: Minor polish issues (cosmetic, inconsistent announcements, minor WCAG violations with negligible impact)

INCLUDING CODE EVIDENCE
Include the problematic HTML in the report:

  <!-- Current code — modal lacks tabindex and focus management -->
  <div class="modal" role="dialog" aria-label="Card details">

  <!-- Suggested fix -->
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">

  // And in JavaScript:
  modal.focus();  // called after modal is shown`,
      quiz: [
        {
          question: 'Which bug report title is MOST useful for a developer?',
          options: [
            '"Accessibility issue on checkout page"',
            '"WCAG failure found"',
            '"Modal dialog — focus not moved to dialog on open (NVDA + Chrome)"',
            '"Screen reader problem"',
          ],
          answer: '"Modal dialog — focus not moved to dialog on open (NVDA + Chrome)"',
        },
        {
          question: 'Why should an accessibility bug report include the browser AND screen reader versions?',
          options: [
            'To help prioritise which screen readers are most important',
            'Because different browser/screen reader combinations behave differently — the bug may only reproduce in specific pairings',
            'For legal compliance purposes only',
            'Screen reader versions are not important — only browser version matters',
          ],
          answer: 'Because different browser/screen reader combinations behave differently — the bug may only reproduce in specific pairings',
        },
        {
          question: 'A logged-in user cannot reach the main navigation with a keyboard — it is completely inaccessible. What severity rating is most appropriate?',
          options: [
            'Low — navigation is accessible to mouse users',
            'Medium — it is inconvenient but not blocking core functionality',
            'High — it creates a significant barrier with no workaround',
            'Critical — it blocks keyboard users from accessing the application at all',
          ],
          answer: 'Critical — it blocks keyboard users from accessing the application at all',
        },
      ],
      exercise: {
        prompt: 'Write a complete accessibility bug report for this issue: you are testing a search form with NVDA and Chrome on Windows 11. When you submit the search and results appear, NVDA makes no announcement. You have to manually Tab through the page to find the results section.',
        starterCode: `// Write a complete accessibility bug report

Title:

Environment:
- Browser:
- Screen reader:
- OS:
- Page/URL:

Steps to reproduce:
1.
2.
3.
4.

Expected behaviour:

Actual behaviour:

WCAG criterion:

Severity:

Suggested fix:`,
        solution: `Title: Search results — no announcement when results load (NVDA + Chrome)

Environment:
- Browser: Chrome 126
- Screen reader: NVDA 2024.2
- OS: Windows 11
- Page/URL: /search

Steps to reproduce:
1. Navigate to /search with NVDA running in Chrome
2. Tab to the search input field
3. Type a query (e.g., "TypeScript")
4. Press Enter to submit the form
5. Wait for results to load (approximately 1 second)

Expected behaviour:
When results load, NVDA should announce the number of results found (e.g., "14 results for TypeScript") via an aria-live region, so users know the page has updated without having to explore manually.

Actual behaviour:
NVDA makes no announcement when results load. Focus remains on the search input. Users must Tab through the page to discover that results appeared below the fold.

WCAG criterion:
WCAG 2.1 Success Criterion 4.1.3 Status Messages (Level AA) — status messages must be programmatically determinable without receiving focus.

Severity:
High — screen reader users receive no feedback on search completion. They must guess that results loaded and navigate manually to find them.

Suggested fix:
Add an aria-live="polite" region to the results container, or add a separate live region that announces result count:
<div aria-live="polite" aria-atomic="true" class="sr-only" id="search-status"></div>
After results load: document.getElementById("search-status").textContent = results.length + " results for " + query;`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 7 — TESTING CHECKLISTS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'sr-test-7',
      title: 'Lesson 7: Building an Accessibility Testing Checklist',
      content: `A structured checklist ensures you test the same things consistently across pages and components. This lesson provides reference checklists you can adapt for your projects.

KEYBOARD-ONLY CHECKLIST
Before opening any screen reader, do a keyboard-only pass:

  □ Every interactive element is reachable by Tab
  □ Tab order matches the visual and logical reading order
  □ Focus is always visible — never invisible or hidden behind styles
  □ Custom interactive elements respond to Enter (links, buttons) and Space (buttons, checkboxes)
  □ Select elements respond to arrow keys
  □ No keyboard traps (can always Tab out of any element)
  □ Skip links are present and work correctly
  □ Modals trap focus correctly while open, and release it when closed
  □ Tooltips and dropdowns can be opened, used, and dismissed by keyboard
  □ Error states are reachable and can be corrected by keyboard

SCREEN READER CHECKLIST — PAGE LEVEL
  □ Page has a unique, descriptive <title>
  □ Language attribute is set (lang="en")
  □ One h1 per page, at the top of main content
  □ Heading hierarchy is logical (no skipped levels)
  □ All landmarks are present: header, nav, main, footer
  □ Skip link works and announces correctly
  □ Page reads linearly in a logical order

SCREEN READER CHECKLIST — INTERACTIVE COMPONENTS
IMAGES:
  □ Informative images have meaningful alt text
  □ Decorative images have alt="" (empty alt)
  □ Complex images (charts, diagrams) have a long description

LINKS:
  □ All link text makes sense out of context
  □ No "click here" or "read more" without additional context
  □ External links have an accessible indicator

FORMS:
  □ Every input has a visible label
  □ Every label is programmatically associated (for/id or aria-label)
  □ Required fields are announced as required
  □ Error messages are associated with their fields and announced
  □ Submit success is announced

MODALS AND DIALOGS:
  □ role="dialog" and aria-modal="true" present
  □ Dialog has an accessible name (aria-label or aria-labelledby)
  □ Focus moves to dialog on open
  □ Focus is trapped inside dialog while open
  □ Escape closes the dialog
  □ Focus returns to trigger on close

DYNAMIC CONTENT:
  □ Page updates are announced via aria-live or focus management
  □ Loading states are communicated
  □ Error states are announced

MOBILE SCREEN READER CHECKLIST (VOICEOVER/TALKBACK)
  □ Touch targets are at least 44x44 CSS pixels
  □ All interactive elements are reachable by swipe
  □ Custom gestures do not conflict with screen reader gestures
  □ Pinch-to-zoom is not disabled (meta viewport no user-scalable)`,
      quiz: [
        {
          question: 'Before opening a screen reader, what should you always do first?',
          options: [
            'Run an automated accessibility scan',
            'Review the page\'s HTML source code',
            'Complete a keyboard-only walkthrough to verify all interactive elements are reachable',
            'Check colour contrast ratios',
          ],
          answer: 'Complete a keyboard-only walkthrough to verify all interactive elements are reachable',
        },
        {
          question: 'A modal dialog closes but focus jumps to the top of the page. Which checklist item covers this?',
          options: [
            'Focus is always visible',
            'Focus returns to trigger on close',
            'Escape closes the dialog',
            'Dialog has an accessible name',
          ],
          answer: 'Focus returns to trigger on close',
        },
        {
          question: 'Why should the minimum touch target size for mobile be at least 44x44 CSS pixels?',
          options: [
            'It is a requirement of the Apple Human Interface Guidelines only',
            'Smaller targets are too hard to activate with a finger, especially for users with motor impairments — WCAG 2.5.5 recommends 44x44',
            'Screen readers cannot focus on elements smaller than 44 pixels',
            'Smaller elements are not rendered correctly on high-DPI screens',
          ],
          answer: 'Smaller targets are too hard to activate with a finger, especially for users with motor impairments — WCAG 2.5.5 recommends 44x44',
        },
      ],
      exercise: {
        prompt: 'Create a mini testing checklist specifically for an accessible dropdown navigation menu. Include keyboard requirements, screen reader requirements, and at least one mobile consideration.',
        starterCode: `// Testing checklist: Dropdown navigation menu

// Keyboard requirements:

// Screen reader requirements:

// Mobile consideration:`,
        solution: `// Keyboard requirements:
// □ Menu button is reachable by Tab
// □ Enter or Space opens the dropdown
// □ Arrow keys navigate between menu items when open
// □ Escape closes the dropdown and returns focus to the menu button
// □ Tab from the last item closes the dropdown and moves focus forward (or wraps)
// □ No keyboard trap inside the dropdown

// Screen reader requirements:
// □ Menu button announces its role (button) and expanded state (aria-expanded="false/true")
// □ Dropdown is associated with the button (aria-controls or aria-haspopup)
// □ Menu items are in a list (role="menu" with role="menuitem" children, or a ul/li structure)
// □ Opening and closing the menu is announced
// □ Active menu item is announced
// □ Dropdown closes when focus leaves (focusout handler)

// Mobile consideration:
// □ Menu button touch target is at least 44x44 CSS pixels
// □ Menu items have adequate spacing to prevent accidental activation of adjacent items`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 8 — AUTOMATED vs MANUAL
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'sr-test-8',
      title: 'Lesson 8: Automated vs Manual Testing — A Practical Strategy',
      content: `Automated and manual testing are complementary — neither replaces the other. The key is knowing when to use each.

THE TESTING PYRAMID
Think of accessibility testing in layers:

  LAYER 1: AUTOMATED (fast, cheap, runs in CI)
    - axe-core in unit/integration tests
    - Playwright with axe for E2E tests
    - Linting rules (eslint-plugin-jsx-a11y)
    Catches: ~30-40% of issues. Runs on every PR.

  LAYER 2: KEYBOARD TESTING (fast, anyone can do it)
    - Unplug or ignore your mouse
    - Tab through every feature
    Catches: focus management, keyboard traps, tab order issues

  LAYER 3: SCREEN READER TESTING (slower, requires expertise)
    - NVDA + Chrome, VoiceOver + Safari
    - Test critical user journeys
    Catches: semantic issues, announcement failures, complex widget behaviour

  LAYER 4: USER TESTING (most valuable, least frequent)
    - Real users with disabilities using real assistive technology
    Catches: usability issues that technical testing misses

INTEGRATING AUTOMATION INTO YOUR WORKFLOW

UNIT TESTS (Jest + axe):
  import { axe, toHaveNoViolations } from "jest-axe";
  expect.extend(toHaveNoViolations);

  test("Button is accessible", async () => {
    const { container } = render(<Button label="Submit" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

PLAYWRIGHT E2E (axe in browser context):
  import { checkA11y } from "axe-playwright";

  test("Homepage has no accessibility violations", async ({ page }) => {
    await page.goto("/");
    await checkA11y(page);
  });

CI INTEGRATION:
  Run axe tests on every pull request. A failed axe check blocks the merge.
  This creates a "accessibility floor" — no known automated failures ship.

WHEN TO SCHEDULE MANUAL TESTING
  - Before any major feature ships
  - When a new component type is introduced (first modal, first custom dropdown)
  - After significant design system changes
  - At least once per quarter for high-traffic pages
  - Before a public launch or government compliance audit

THE SHIFT-LEFT APPROACH
"Shift left" means testing earlier in the development process — not at the end.

Finding an accessibility issue in DESIGN: $1 cost to fix
Finding it in DEVELOPMENT: $10 cost to fix
Finding it in QA/TESTING: $100 cost to fix
Finding it after LAUNCH: $1,000+ cost to fix (including reputational and legal risk)

Best practices:
  - Designers use accessibility annotation kits to specify ARIA roles, focus order, and keyboard interaction upfront
  - Developers run axe in their browser (axe DevTools extension) during coding
  - PRs require automated a11y tests to pass before merging
  - Screen reader testing happens before features ship — not after`,
      quiz: [
        {
          question: 'Automated axe tests catch approximately what proportion of accessibility issues?',
          options: [
            '100% — automated tools find all WCAG failures',
            '70-80%',
            '30-40%',
            '5-10%',
          ],
          answer: '30-40%',
        },
        {
          question: 'What does "shift left" mean in accessibility testing?',
          options: [
            'Prioritising left-to-right reading direction in designs',
            'Testing earlier in the development process — catching issues in design and development rather than after launch',
            'Moving screen reader testing to a separate QA team',
            'Starting accessibility testing from the left side of the page',
          ],
          answer: 'Testing earlier in the development process — catching issues in design and development rather than after launch',
        },
        {
          question: 'You add an axe check to your CI pipeline that blocks merges if it finds violations. What category of issues does this NOT catch?',
          options: [
            'Missing alt text',
            'Insufficient colour contrast',
            'Whether a custom dropdown is keyboard operable',
            'Missing form labels',
          ],
          answer: 'Whether a custom dropdown is keyboard operable',
        },
      ],
      exercise: {
        prompt: 'Describe a practical accessibility testing strategy for a small team (3 developers) building a web app. Include: what automated tools to use, when manual testing happens, and who does what.',
        starterCode: `// Accessibility testing strategy for a 3-person dev team

// Automated tools and when they run:

// Keyboard testing — who does it and when:

// Screen reader testing — who does it and when:

// User testing — if applicable:`,
        solution: `// Automated tools and when they run:
// eslint-plugin-jsx-a11y runs in every developer's editor to catch issues while coding.
// jest-axe runs in the unit test suite on every PR — a11y violations fail the build.
// axe-playwright runs in the E2E test suite on every merge to main, testing critical flows.
// Browser axe DevTools extension: each developer uses it when building new components.

// Keyboard testing — who does it and when:
// Any developer can do keyboard testing. It is required before any PR that adds or modifies interactive components. Takes 5-10 minutes per component. No specialist tools needed — just unplug the mouse.

// Screen reader testing — who does it and when:
// The developer most familiar with NVDA/VoiceOver tests new components before they ship. Minimum: NVDA + Chrome for Windows, VoiceOver + Safari for macOS. Done before any feature launch, and for any critical flow change (login, checkout, search). Aim for every sprint for major features.

// User testing — if applicable:
// Recruit 2-3 participants with visual impairments once per quarter or before major launches. Use a research service or disability community partnerships. This surfaces usability issues that technical testing misses — e.g., confusing language, unexpected interaction patterns.`,
      },
    },
  ],
};

window.srTestingModule = srTestingModule;
