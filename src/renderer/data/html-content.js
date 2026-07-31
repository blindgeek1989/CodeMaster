const htmlModule = {
  id: 'html',
  title: 'HTML Fundamentals',
  description: 'Start here. No experience needed. HTML is the language that defines the content and structure of every web page in the world. By the end of this module, you will be able to build real web pages from scratch.',
  objectives: [
    'Understand what a website is and how browsers display it',
    'Write HTML tags and understand how they work',
    'Build a complete HTML document from scratch',
    'Organize content with headings, paragraphs, and lists',
    'Add links and images to a page',
    'Build accessible forms that anyone can use',
  ],
  goals: [
    'Write your first HTML page from memory',
    'Build a multi-section page using proper structure',
    'Create a working form with accessible labels',
    'Understand what makes HTML accessible to screen reader users',
  ],
  lessons: [
    {
      id: 'html-1',
      title: 'Lesson 1: What Is the Web?',
      content: `Before you write a single line of code, it helps to understand what you are building.

WHAT IS A WEBSITE?
A website is a collection of files stored on a computer somewhere in the world. That computer is called a server — because its job is to serve files to anyone who asks for them. When you visit a website, your computer sends a request over the internet, the server sends back a set of files, and your browser turns those files into the page you see and hear.

WHAT IS A BROWSER?
A browser is a program that reads files and turns them into a web page. Common browsers include Chrome, Firefox, Edge, and Safari. Screen readers like NVDA and JAWS work alongside the browser to translate the page into speech or braille.

THREE LANGUAGES THAT MAKE THE WEB
Almost every website in the world is built using exactly three languages working together:

1. HTML — HyperText Markup Language
   This defines the CONTENT and STRUCTURE of the page.
   It answers: "What is on this page?"
   Examples: headings, paragraphs, images, links, buttons, forms.

2. CSS — Cascading Style Sheets
   This defines the APPEARANCE of the page.
   It answers: "What does this look like?"
   Examples: colors, fonts, layout, spacing.

3. JavaScript
   This defines the BEHAVIOR of the page.
   It answers: "What does this do?"
   Examples: menus that open, forms that validate, content that updates.

In this course, you will learn all three. We start with HTML because without HTML, CSS and JavaScript have nothing to work with. HTML is the foundation of everything on the web.

WHY DOES THIS MATTER FOR SCREEN READERS?
Screen readers read the HTML, not the visual appearance. This is why writing good HTML is the single most important thing you can do for accessibility. Well-written HTML means screen readers, voice assistants, and other assistive technologies can correctly interpret your page.`,
      quiz: [
        {
          question: 'What is a server?',
          options: [
            'A type of web browser',
            'A computer that stores and sends website files to people who request them',
            'A programming language for making websites',
            'A program that checks for spelling errors in code',
          ],
          answer: 1,
        },
        {
          question: 'Which of the three web languages defines the CONTENT and STRUCTURE of a page?',
          options: ['CSS', 'JavaScript', 'HTML', 'Python'],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'No coding yet — but let\'s think it through. In the text area below, list the three web languages and write one sentence explaining what each one does. Use plain English, no copying.',
        starterCode: `HTML:

CSS:

JavaScript:`,
        solution: `HTML: Defines the content and structure of a web page — the words, headings, images, links, and forms.

CSS: Controls the appearance — colors, fonts, spacing, and layout.

JavaScript: Adds interactivity — things like buttons that respond to clicks and menus that open and close.`,
      },
    },
    {
      id: 'html-2',
      title: 'Lesson 2: HTML Tags and Elements',
      content: `Now that you know what HTML does, let's look at how it actually works.

WHAT IS A TAG?
HTML uses tags to label content. A tag is written inside angle brackets — the less-than and greater-than symbols: < and >

Tags come in pairs:
- Opening tag:  <p>
- Closing tag:  </p>   (notice the forward slash before the tag name)

The content goes between the two tags:
<p>This is a paragraph.</p>

This whole thing — opening tag + content + closing tag — is called an ELEMENT.

TAG NAMES
The tag name describes what kind of content it is:
  p    = paragraph
  h1   = the most important heading
  a    = a link (short for "anchor")
  img  = an image
  ul   = an unordered (bulleted) list
  li   = a list item

ATTRIBUTES
Tags can have extra information called attributes. You write them inside the opening tag:

<a href="https://example.com">Visit Example</a>

Here, href is the attribute name, and "https://example.com" is its value. Attributes always follow this pattern: name="value"

SELF-CLOSING TAGS
Some tags do not have content between them, so they have no closing tag. These are called self-closing tags:

<img src="photo.jpg" alt="A landscape photo" />
<br />      (a line break)
<input />   (a form field)

The slash before the > is optional in modern HTML, but it is good practice to include it for clarity.

NESTING
You can put elements inside other elements. This is called nesting:

<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>

The ul (list) element contains two li (list item) elements. Always close the inner element before closing the outer one.`,
      quiz: [
        {
          question: 'What is the correct way to write a closing tag for a paragraph?',
          options: ['<p/>', '</p>', '<close p>', 'p>'],
          answer: 1,
        },
        {
          question: 'What is an attribute?',
          options: [
            'A closing tag with a forward slash',
            'Extra information added inside an opening tag, written as name="value"',
            'A tag that has no content inside it',
            'A way to add color to text',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write three HTML elements: (1) A paragraph that says "I am learning HTML." (2) A link that displays the text "Visit my site" and points to https://example.com. (3) A self-closing image tag with src="logo.png" and alt="CodeMaster logo".',
        starterCode: `<!-- 1. A paragraph -->

<!-- 2. A link -->

<!-- 3. An image -->
`,
        solution: `<!-- 1. A paragraph -->
<p>I am learning HTML.</p>

<!-- 2. A link -->
<a href="https://example.com">Visit my site</a>

<!-- 3. An image -->
<img src="logo.png" alt="CodeMaster logo" />`,
      },
    },
    {
      id: 'html-3',
      title: 'Lesson 3: Your First HTML Document',
      content: `Now that you understand tags, let's build a complete HTML page. Every HTML document follows the same required structure.

THE REQUIRED STRUCTURE
Every HTML page must start with these four things:

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Page Title</title>
  </head>
  <body>
    <!-- Your content goes here -->
  </body>
</html>

Let's go through each part:

1. <!DOCTYPE html>
   This is not actually a tag — it is a declaration. It tells the browser "this file is written in HTML5 (the modern standard)." Every HTML file must start with this on the very first line.

2. <html lang="en">
   This is the root element — it wraps everything else. The lang="en" attribute tells browsers and screen readers what language the page is in. This is crucial for accessibility: screen readers use the language setting to choose the correct pronunciation engine. If you are writing in English, use lang="en".

3. <head>
   The head contains information ABOUT the page that does not appear as visible content. Think of it as the behind-the-scenes section.

4. <meta charset="UTF-8" />
   This tells the browser which character set to use. UTF-8 supports virtually every character, symbol, and emoji in the world. Always include this.

5. <title>My Page Title</title>
   This sets the title of the page — what appears in the browser tab and what screen readers announce when the page loads. It is also the text that search engines display as the link headline. Make it descriptive and specific.

6. <body>
   Everything inside the body tag is visible content — your text, headings, images, links, and forms.

COMMENTS
You can add notes to your HTML that the browser ignores:
<!-- This is a comment. The browser will not display it. -->

Comments are useful for leaving yourself reminders in your code.`,
      quiz: [
        {
          question: 'What does the lang="en" attribute on the <html> element do?',
          options: [
            'Changes the page text to English',
            'Sets the font to an English-style typeface',
            'Tells browsers and screen readers what language the page is written in',
            'Links an English translation file to the page',
          ],
          answer: 2,
        },
        {
          question: 'Where does the visible content of a web page go?',
          options: ['Inside the <head> element', 'Inside the <html> element but before <head>', 'Inside the <body> element', 'After the closing </html> tag'],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Build a complete HTML document from scratch. It should have: a DOCTYPE declaration, an html element with lang="en", a head section with charset meta tag and a title of "My First Page", and a body section with a paragraph that says "Hello, world! This is my first HTML page."',
        starterCode: `<!-- Build your complete HTML document here -->
`,
        solution: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My First Page</title>
  </head>
  <body>
    <p>Hello, world! This is my first HTML page.</p>
  </body>
</html>`,
      },
    },
    {
      id: 'html-4',
      title: 'Lesson 4: Headings, Paragraphs, and Lists',
      content: `Content on a web page is organized using headings, paragraphs, and lists. Learning to use these correctly is one of the most important skills in HTML — especially for accessibility.

HEADINGS: h1 through h6
HTML has six levels of headings, from h1 (most important) to h6 (least important):

<h1>Main Page Title</h1>
<h2>Section Title</h2>
<h3>Sub-section Title</h3>

IMPORTANT: Headings are not about size or appearance — they are about importance and structure. Think of them like an outline for a document. A screen reader user can navigate a page entirely by jumping from heading to heading. If your headings are in the wrong order, the page is confusing to navigate.

The rules:
- Every page should have exactly one h1 — the main topic of the page
- Do not skip levels (do not jump from h1 to h3)
- Use headings to create a logical outline, not to make text big

PARAGRAPHS
A paragraph is a block of text:
<p>This is a paragraph. It can be as long or as short as you need.</p>

Each paragraph is its own separate block. A screen reader will pause briefly between paragraphs.

UNORDERED LISTS (bullet points)
Use when order does not matter — like a list of ingredients or features:

<ul>
  <li>Apples</li>
  <li>Oranges</li>
  <li>Bananas</li>
</ul>

ORDERED LISTS (numbered)
Use when order matters — like steps in a recipe or instructions:

<ol>
  <li>Boil water</li>
  <li>Add pasta</li>
  <li>Cook for 10 minutes</li>
</ol>

Screen readers announce "list, 3 items" before reading a list, and "list end" when finished. This tells users exactly what kind of content they are about to hear.`,
      quiz: [
        {
          question: 'A page about "How to bake bread" has three sections: Ingredients, Equipment, and Steps. What heading level should each section title use?',
          options: [
            'h1 for each section title',
            'h2 for each section title, since h1 is used for the main page title',
            'h3 for each, to keep them visually small',
            'It does not matter what heading level you use',
          ],
          answer: 1,
        },
        {
          question: 'Which list type should you use for a step-by-step recipe where the order of steps matters?',
          options: ['<ul> — unordered list', '<ol> — ordered list', '<dl> — description list', '<p> — paragraph'],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Build the structure of a page about your favorite hobby. Include: (1) An h1 with the hobby name. (2) An h2 that says "Why I enjoy it" followed by a paragraph. (3) An h2 that says "What you need to get started" followed by an unordered list of at least three items. (4) An h2 that says "Steps to get started" followed by an ordered list of at least three steps.',
        starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Favorite Hobby</title>
  </head>
  <body>
    <!-- Add your content here -->
  </body>
</html>`,
        solution: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Favorite Hobby</title>
  </head>
  <body>
    <h1>Photography</h1>

    <h2>Why I enjoy it</h2>
    <p>Photography lets me capture moments and see the world from new angles. Every photo tells a story.</p>

    <h2>What you need to get started</h2>
    <ul>
      <li>A camera or smartphone</li>
      <li>Good natural lighting</li>
      <li>An interesting subject</li>
      <li>Patience</li>
    </ul>

    <h2>Steps to get started</h2>
    <ol>
      <li>Choose your subject</li>
      <li>Find good lighting</li>
      <li>Frame your shot</li>
      <li>Take the photo and review it</li>
    </ol>
  </body>
</html>`,
      },
    },
    {
      id: 'html-5',
      title: 'Lesson 5: Links and Images',
      content: `Links and images are two of the most used elements on the web. Both require special attention for accessibility.

LINKS
A link uses the <a> tag (short for "anchor"). The href attribute tells the browser where to go:

<a href="https://example.com">Visit Example</a>

The text between the tags is what the user sees (or hears). This text is critical:

BAD:  <a href="/about">Click here</a>
GOOD: <a href="/about">About us</a>

Screen reader users often navigate pages by listening to a list of all links. If every link says "click here," the list is useless. The link text should make sense on its own, out of context.

TYPES OF LINKS
Absolute link — a full web address, including https://
  <a href="https://bbc.com">BBC News</a>

Relative link — a path to another file in the same website
  <a href="/about">About us</a>
  <a href="contact.html">Contact page</a>

Opening in a new tab — use target="_blank" carefully (it can surprise screen reader users)
  <a href="https://example.com" target="_blank">Example (opens new tab)</a>

IMAGES
An image uses the <img> tag. It requires two attributes:
- src — the path to the image file
- alt — a text description of the image

<img src="dog.jpg" alt="A golden retriever playing in autumn leaves" />

THE ALT ATTRIBUTE IS ESSENTIAL
Screen readers cannot see images. The alt attribute is how a screen reader user understands what an image shows. Write alt text as if you are describing the image to someone on the phone.

Good alt text describes the content and purpose of the image:
  alt="A bar chart showing sales rising 30% in Q3 2026"
  alt="CodeMaster logo — three colored brackets"

If an image is purely decorative (adds no information), use an empty alt attribute:
  alt=""
This tells screen readers to skip the image entirely.

Never do: alt="image" or alt="photo" — these are meaningless.`,
      quiz: [
        {
          question: 'Which of the following is the best link text for a link to a contact page?',
          options: [
            '<a href="/contact">Click here</a>',
            '<a href="/contact">More</a>',
            '<a href="/contact">Contact us</a>',
            '<a href="/contact">Page</a>',
          ],
          answer: 2,
        },
        {
          question: 'An image of a decorative swirl pattern used only as a background design has no meaningful information. What alt text should it have?',
          options: [
            'alt="decorative swirl"',
            'alt="image"',
            'alt="" (empty alt attribute)',
            'No alt attribute at all',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Write the HTML for: (1) A link to https://bbc.com that says "BBC News — World Headlines". (2) An image of a mountain sunrise with a meaningful alt description. (3) A decorative divider image (no information) with the correct alt attribute. (4) A link to a "privacy.html" page in the same website.',
        starterCode: `<!-- 1. Link to BBC News -->

<!-- 2. Mountain sunrise image -->

<!-- 3. Decorative divider image -->

<!-- 4. Link to privacy.html -->
`,
        solution: `<!-- 1. Link to BBC News -->
<a href="https://bbc.com">BBC News — World Headlines</a>

<!-- 2. Mountain sunrise image -->
<img src="mountain-sunrise.jpg" alt="Orange and pink sunrise over a snow-capped mountain range" />

<!-- 3. Decorative divider image -->
<img src="divider.png" alt="" />

<!-- 4. Link to privacy.html -->
<a href="privacy.html">Privacy policy</a>`,
      },
    },
    {
      id: 'html-6',
      title: 'Lesson 6: Semantic HTML and Forms',
      content: `In this final HTML lesson, we cover two powerful topics: semantic elements that give your page meaning, and forms that let users send information.

WHAT IS SEMANTIC HTML?
"Semantic" means using the right tool for the job — choosing elements that describe what the content IS, not just how it looks. Compare:

Non-semantic (generic boxes):
<div class="header">...</div>
<div class="nav">...</div>
<div class="content">...</div>

Semantic (meaningful labels):
<header>...</header>
<nav>...</nav>
<main>...</main>

The semantic versions tell browsers, search engines, and screen readers exactly what each section is. Screen reader users can jump directly to any landmark by pressing a single key — but only if you use semantic elements.

THE MAIN LANDMARK ELEMENTS
<header>  — the top of the page or a section, often contains the logo and site title
<nav>     — a set of navigation links
<main>    — the primary content of the page (use only one per page)
<footer>  — the bottom of the page or section
<article> — a self-contained piece of content (a blog post, a news story)
<section> — a thematic grouping of content within a page
<aside>   — secondary content related to the main content

FORMS
Forms let users send information — for signing up, logging in, searching, or sending a message.

The most important rule: EVERY input must have a label.

<label for="name">Your name</label>
<input type="text" id="name" name="name" />

The for attribute on the label matches the id attribute on the input. This connects them so that:
- Clicking the label focuses the input
- Screen readers announce the label when the input is focused

COMMON INPUT TYPES
<input type="text" />      — plain text
<input type="email" />     — email address (shows email keyboard on phones)
<input type="password" />  — hides the typed text
<input type="checkbox" />  — a checkbox
<textarea></textarea>      — multi-line text area

BUTTONS
<button type="submit">Send message</button>

Always use a <button> for buttons — never a <div> or <span>. Only a real button is keyboard-operable by default.`,
      quiz: [
        {
          question: 'What is the purpose of semantic HTML elements like <main>, <nav>, and <header>?',
          options: [
            'They make text larger and more visible',
            'They give meaning to page sections so browsers, screen readers, and search engines understand the structure',
            'They replace the need for CSS',
            'They are only useful for visual design',
          ],
          answer: 1,
        },
        {
          question: 'What connects a <label> to its <input> element?',
          options: [
            'They must be placed next to each other in the HTML',
            'The label\'s for attribute must match the input\'s id attribute',
            'The label must be inside the input tag',
            'They are automatically connected if inside the same <form>',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Build a complete, accessible "Contact Us" page. It should include: (1) A proper HTML document structure with a descriptive title. (2) Semantic landmarks: header, main, footer. (3) Inside main: an h1, a short intro paragraph, and a form with labeled fields for name, email address, a message textarea, and a submit button.',
        starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title></title>
  </head>
  <body>
    <!-- header, main, footer -->
  </body>
</html>`,
        solution: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Contact Us — My Website</title>
  </head>
  <body>
    <header>
      <h1>My Website</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>

    <main>
      <h1>Contact Us</h1>
      <p>Fill in the form below and we will get back to you within 24 hours.</p>

      <form>
        <label for="name">Your name</label>
        <input type="text" id="name" name="name" required />

        <label for="email">Email address</label>
        <input type="email" id="email" name="email" required />

        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5"></textarea>

        <button type="submit">Send message</button>
      </form>
    </main>

    <footer>
      <p>© 2026 My Website</p>
    </footer>
  </body>
</html>`,
      },
    },
    {
      id: 'html-7',
      title: 'Lesson 7: Tables — Organizing Data',
      content: `Tables are for displaying information that has rows and columns — like a schedule, a price list, or a comparison chart. They are NOT for layout (arranging a page visually). Using tables for layout was a practice from the early 2000s that caused enormous accessibility problems. Always use CSS for layout.

BASIC TABLE STRUCTURE
A table is built from three main elements:
- <table> — the wrapper for the entire table
- <tr>    — table row (a horizontal row of cells)
- <td>    — table data cell (a single cell of content)

<table>
  <tr>
    <td>Name</td>
    <td>Score</td>
  </tr>
  <tr>
    <td>Alex</td>
    <td>95</td>
  </tr>
</table>

HEADER CELLS: <th>
Use <th> instead of <td> for header cells — the cells that label a column or row.
Screen readers announce "column header: Name" when the user moves to that column.

<table>
  <tr>
    <th>Name</th>
    <th>Score</th>
  </tr>
  <tr>
    <td>Alex</td>
    <td>95</td>
  </tr>
</table>

THE scope ATTRIBUTE
The scope attribute tells screen readers whether a <th> is a column header or a row header:
  scope="col"  — this header labels a column (most common)
  scope="row"  — this header labels a row

<th scope="col">Name</th>
<th scope="col">Score</th>

GROUPING WITH thead, tbody, tfoot
These elements group rows logically — header rows, data rows, and summary rows:

<table>
  <thead>
    <tr><th scope="col">Name</th><th scope="col">Score</th></tr>
  </thead>
  <tbody>
    <tr><td>Alex</td><td>95</td></tr>
    <tr><td>Sam</td><td>87</td></tr>
  </tbody>
  <tfoot>
    <tr><td>Average</td><td>91</td></tr>
  </tfoot>
</table>

THE caption ELEMENT
Always give a table a caption — a visible title that describes what the table contains:

<table>
  <caption>Quiz scores for Module 1</caption>
  ...
</table>

Screen readers announce the caption before reading the table, so users know what they are about to hear.`,
      quiz: [
        {
          question: 'What element should you use for cells that label a column or row in a table?',
          options: ['<td>', '<tr>', '<th>', '<caption>'],
          answer: 2,
        },
        {
          question: 'What does scope="col" on a <th> element tell screen readers?',
          options: [
            'This cell spans multiple columns',
            'This header cell labels the column below it',
            'This cell is in the footer of the table',
            'This header applies to the whole table',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Build an accessible table showing three students and their grades. It should have: a caption describing the table, a thead with column headers (Name, Subject, Grade) using th and scope="col", and a tbody with three rows of student data.',
        starterCode: `<table>
  <!-- Add caption -->

  <!-- Add thead with headers -->

  <!-- Add tbody with 3 rows -->

</table>`,
        solution: `<table>
  <caption>Student grades for Introduction to Web Development</caption>

  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Subject</th>
      <th scope="col">Grade</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>Alex</td>
      <td>HTML</td>
      <td>A</td>
    </tr>
    <tr>
      <td>Sam</td>
      <td>HTML</td>
      <td>B+</td>
    </tr>
    <tr>
      <td>Jordan</td>
      <td>HTML</td>
      <td>A-</td>
    </tr>
  </tbody>
</table>`,
      },
    },
    {
      id: 'html-8',
      title: 'Lesson 8: Audio and Video',
      content: `HTML5 introduced native audio and video elements that work directly in the browser without plugins. Making media accessible requires more than just embedding a file — you need captions, transcripts, and audio descriptions.

THE audio ELEMENT
<audio controls src="podcast.mp3">
  Your browser does not support audio.
</audio>

The controls attribute adds the play, pause, and volume controls. Without it, users cannot interact with the player.

THE video ELEMENT
<video controls width="640" height="360">
  <source src="lesson.mp4" type="video/mp4" />
  Your browser does not support video.
</video>

Using <source> elements lets you provide multiple file formats as fallbacks.

CAPTIONS AND SUBTITLES: THE track ELEMENT
Captions are text versions of spoken dialogue and important sounds, synchronized to the video. They are essential for deaf and hard-of-hearing users, and extremely useful for anyone watching in a noisy environment.

<video controls>
  <source src="lesson.mp4" type="video/mp4" />
  <track
    kind="captions"
    src="lesson-captions.vtt"
    srclang="en"
    label="English captions"
    default
  />
</video>

The track attributes:
- kind="captions"    — captions include dialogue and sounds
- kind="subtitles"   — subtitles are usually just dialogue (for a different language)
- src                — the path to a .vtt caption file
- srclang="en"       — the language of the track
- label              — what appears in the captions menu
- default            — this track is on by default

TRANSCRIPTS
A transcript is a full text version of all spoken content in an audio or video file. Unlike captions, it is not synchronized — it is just a block of text. Transcripts are important for:
- Users who are deaf-blind (using a braille display)
- Users who prefer to read rather than listen
- Search engines (audio and video content is not searchable without a transcript)

Always provide a transcript for any audio or video content, linked directly below the player.

AUDIO DESCRIPTIONS
For videos that contain important visual information not described in the dialogue, an audio description track provides a spoken description of what is happening on screen. This is essential for blind users watching video content.`,
      quiz: [
        {
          question: 'Which attribute must you add to <audio> and <video> elements so users can control playback?',
          options: ['autoplay', 'controls', 'src', 'muted'],
          answer: 1,
        },
        {
          question: 'What is the difference between captions and a transcript?',
          options: [
            'Captions are for audio only; transcripts are for video only',
            'Captions are synchronized to the media timeline; a transcript is a separate block of text covering all spoken content',
            'Transcripts are for deaf users; captions are for hard-of-hearing users',
            'They are different names for the same thing',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write the HTML for an accessible video player. It should: use a <video> element with controls, provide an mp4 source, include an English captions track set as default, and below the video add a paragraph with a link to "transcript.html" that says "Read the full transcript".',
        starterCode: `<!-- Accessible video player -->

<!-- Transcript link below the player -->
`,
        solution: `<!-- Accessible video player -->
<video controls width="640" height="360">
  <source src="lesson.mp4" type="video/mp4" />
  <track
    kind="captions"
    src="lesson-captions.vtt"
    srclang="en"
    label="English captions"
    default
  />
</video>

<!-- Transcript link below the player -->
<p>
  <a href="transcript.html">Read the full transcript for this video</a>
</p>`,
      },
    },
    {
      id: 'html-9',
      title: 'Lesson 9: Introduction to ARIA',
      content: `ARIA stands for Accessible Rich Internet Applications. It is a set of HTML attributes that give assistive technologies extra information about what elements do and what state they are in.

THE FIRST RULE OF ARIA
Never use ARIA when native HTML can do the job. A real <button> element is always better than a <div> with role="button". Native HTML elements come with built-in keyboard support and accessibility semantics — ARIA adds them manually and requires much more work to do correctly.

Use ARIA when:
- You are building a custom interactive widget (a tab panel, a combobox, a slider)
- Native HTML does not have an element for what you need
- You need to provide extra context that HTML alone cannot express

aria-label
Provides a text label directly on an element, overriding its visible text (or providing one when there is none):

<button aria-label="Close dialog">X</button>

Without aria-label, a screen reader would say "X, button" — meaningless. With it, "Close dialog, button".

aria-labelledby
Points to another element that serves as the label:

<h2 id="billing-heading">Billing address</h2>
<section aria-labelledby="billing-heading">
  ...
</section>

The section is now labeled by the heading text. Screen readers announce the heading when entering the section.

aria-describedby
Points to an element that provides additional description (not the label, but extra context):

<input id="email" aria-describedby="email-hint" />
<p id="email-hint">We will never share your email with anyone.</p>

aria-hidden
Hides an element from screen readers while keeping it visible on screen. Use for decorative content:

<span aria-hidden="true">★★★★☆</span>
<span class="sr-only">4 out of 5 stars</span>

aria-live
Marks a region that will update dynamically. Screen readers announce changes:

<div aria-live="polite" id="status"></div>

role
Tells screen readers what an element IS when a native element is not used. Rarely needed:

<div role="alert">Your session is about to expire.</div>

role="alert" makes screen readers announce the content immediately as an alert.`,
      quiz: [
        {
          question: 'What is the first rule of ARIA?',
          options: [
            'Always add aria-label to every element',
            'Never use ARIA when a native HTML element can do the same job',
            'ARIA must be used on all interactive elements',
            'ARIA replaces the need for semantic HTML',
          ],
          answer: 1,
        },
        {
          question: 'What does aria-hidden="true" do?',
          options: [
            'Hides the element visually on screen',
            'Removes the element from the DOM completely',
            'Hides the element from screen readers while keeping it visible on screen',
            'Makes the element transparent',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Fix the four accessibility issues in the HTML below using ARIA attributes. (1) The icon button needs a meaningful label. (2) The search results section needs to be labeled by its heading. (3) The star rating needs to be hidden from screen readers (add a visible replacement). (4) The status div needs to announce updates politely.',
        starterCode: `<!-- 1. Icon button with no label -->
<button>🔍</button>

<!-- 2. Section not linked to its heading -->
<h2 id="results-heading">Search results</h2>
<section>
  <p>5 results found.</p>
</section>

<!-- 3. Star rating -->
<span>★★★☆☆</span>

<!-- 4. Status area that updates dynamically -->
<div id="status"></div>`,
        solution: `<!-- 1. Icon button with no label -->
<button aria-label="Search">🔍</button>

<!-- 2. Section not linked to its heading -->
<h2 id="results-heading">Search results</h2>
<section aria-labelledby="results-heading">
  <p>5 results found.</p>
</section>

<!-- 3. Star rating -->
<span aria-hidden="true">★★★☆☆</span>
<span class="sr-only">3 out of 5 stars</span>

<!-- 4. Status area that updates dynamically -->
<div id="status" aria-live="polite" aria-atomic="true"></div>`,
      },
    },
    {
      id: 'html-10',
      title: 'Lesson 10: Putting It All Together',
      content: `You have covered all the core HTML concepts. This final lesson brings everything together into one complete, accessible page — and gives you a checklist to use on every page you build.

WHAT A COMPLETE, ACCESSIBLE PAGE LOOKS LIKE
Here is a full example using everything from this module:

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CodeMaster — HTML Module Complete</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>

    <a class="skip-link" href="#main-content">Skip to main content</a>

    <header>
      <a href="/"><img src="logo.png" alt="CodeMaster home" /></a>
      <nav aria-label="Main navigation">
        <ul>
          <li><a href="/html">HTML</a></li>
          <li><a href="/css">CSS</a></li>
          <li><a href="/js">JavaScript</a></li>
        </ul>
      </nav>
    </header>

    <main id="main-content">
      <h1>HTML Module Complete</h1>
      <p>Congratulations on finishing the HTML module.</p>

      <section aria-labelledby="what-next">
        <h2 id="what-next">What to do next</h2>
        <ol>
          <li>Start the CSS module</li>
          <li>Build a real page using only what you have learned</li>
          <li>Share your work with someone</li>
        </ol>
      </section>
    </main>

    <footer>
      <p>© 2026 CodeMaster</p>
    </footer>

  </body>
</html>

YOUR ACCESSIBLE HTML CHECKLIST
Use this every time you build a page:

[ ] <!DOCTYPE html> on line 1
[ ] <html lang="en"> with the correct language
[ ] <meta charset="UTF-8"> in head
[ ] <meta name="viewport"> in head
[ ] Descriptive <title> — unique per page
[ ] Skip link as the first focusable element
[ ] One <h1> per page — the main topic
[ ] Headings in logical order — never skip levels
[ ] All images have alt text (or alt="" if decorative)
[ ] All links have descriptive text — no "click here"
[ ] All form inputs have associated <label> elements
[ ] Landmark elements used: header, nav, main, footer
[ ] Tables have caption and scope on headers
[ ] Videos have captions track
[ ] ARIA used only when native HTML cannot do the job`,
      quiz: [
        {
          question: 'Why should a skip link be the very first focusable element on a page?',
          options: [
            'It improves search engine rankings',
            'It lets keyboard and screen reader users jump past repeated navigation directly to the main content',
            'It is required by the HTML5 specification',
            'It makes the page load faster',
          ],
          answer: 1,
        },
        {
          question: 'You have a logo image that also serves as a link to the homepage. What should the alt text say?',
          options: [
            'alt="logo"',
            'alt="" because it is decorative',
            'alt="CodeMaster home" — describing the destination of the link',
            'No alt attribute needed on linked images',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Build a complete, accessible HTML page for a personal blog post. It must include: DOCTYPE, html with lang, charset meta, viewport meta, a descriptive title, a skip link, a header with a site name and nav, a main section with an h1, at least two h2 sections with paragraphs, an unordered list, an image with good alt text, and a footer. Use the checklist from the lesson.',
        starterCode: `<!DOCTYPE html>
<!-- Build your complete accessible blog post page here -->
`,
        solution: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My First Week Learning HTML — My Blog</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>

    <a href="#main-content" class="skip-link">Skip to main content</a>

    <header>
      <a href="/">My Blog</a>
      <nav aria-label="Main navigation">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>

    <main id="main-content">
      <h1>My First Week Learning HTML</h1>
      <p>I started learning HTML this week and wanted to share what I discovered.</p>

      <section aria-labelledby="what-i-learned">
        <h2 id="what-i-learned">What I learned</h2>
        <p>HTML is much more logical than I expected. Once you understand tags, everything clicks.</p>
        <ul>
          <li>Tags always come in pairs (mostly)</li>
          <li>Semantic elements matter for screen readers</li>
          <li>Alt text on images is non-negotiable</li>
        </ul>
      </section>

      <section aria-labelledby="my-setup">
        <h2 id="my-setup">My setup</h2>
        <p>I used a simple text editor and a browser to get started.</p>
        <img
          src="desk-setup.jpg"
          alt="A desk with a laptop, external keyboard, and braille display"
        />
      </section>
    </main>

    <footer>
      <p>© 2026 My Blog — <a href="/privacy">Privacy policy</a></p>
    </footer>

  </body>
</html>`,
      },
    },
  ],
};

if (typeof module !== 'undefined') module.exports = htmlModule;
if (typeof window !== 'undefined') window.htmlModule = htmlModule;
