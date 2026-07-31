const htmlModule = {
  id: 'html',
  title: 'HTML Fundamentals',
  description: 'Learn the building blocks of the web. HTML defines the structure and meaning of web content.',
  objectives: [
    'Understand what HTML is and how browsers interpret it',
    'Write valid semantic HTML documents from scratch',
    'Use headings, paragraphs, lists, links, and images correctly',
    'Build accessible forms with proper labels and inputs',
    'Understand the difference between block and inline elements',
    'Apply ARIA roles and landmark elements for screen reader compatibility',
  ],
  goals: [
    'Create a complete, valid HTML page with a proper document structure',
    'Build a multi-section article using semantic elements',
    'Construct an accessible contact form',
    'Navigate a page using only a keyboard and screen reader',
  ],
  lessons: [
    {
      id: 'html-1',
      title: 'Lesson 1: What is HTML?',
      content: `HTML stands for HyperText Markup Language. It is the standard language for creating web pages.
HTML uses elements represented by tags like <p>, <h1>, and <div> to structure content.
Browsers read HTML and render it visually — but screen readers read it too, making good HTML critical for accessibility.

A basic HTML document looks like this:

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>Welcome to my page.</p>
  </body>
</html>

Key parts:
- <!DOCTYPE html> tells the browser this is HTML5
- <html lang="en"> sets the page language (critical for screen readers)
- <head> contains metadata not shown on the page
- <body> contains all visible content`,
      quiz: [
        {
          question: 'What does the lang attribute on the <html> element do?',
          options: [
            'Sets the page background color',
            'Tells screen readers and browsers what language the page is in',
            'Links a language translation file',
            'Changes the font of the page',
          ],
          answer: 1,
        },
        {
          question: 'Which element contains all the visible content of a web page?',
          options: ['<head>', '<meta>', '<body>', '<html>'],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Write a valid HTML5 document with a title of "My Page", a level-1 heading that says "Welcome", and a paragraph that says "This is my first HTML page."',
        starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Add your title here -->
  </head>
  <body>
    <!-- Add your heading and paragraph here -->
  </body>
</html>`,
        solution: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Page</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>This is my first HTML page.</p>
  </body>
</html>`,
      },
    },
    {
      id: 'html-2',
      title: 'Lesson 2: Semantic Elements',
      content: `Semantic HTML uses elements that describe the meaning of content, not just its appearance.
Examples of semantic elements:
- <header> — top of a page or section
- <nav> — navigation links
- <main> — main content of the page (only one per page)
- <article> — self-contained content like a blog post
- <section> — a thematic grouping of content
- <aside> — related but secondary content
- <footer> — bottom of a page or section

Screen readers announce these landmarks so users can jump directly to the section they want.
Without semantic HTML, screen reader users must read through the entire page line by line.`,
      quiz: [
        {
          question: 'Which element should be used for the primary content of a page?',
          options: ['<div>', '<main>', '<section>', '<content>'],
          answer: 1,
        },
        {
          question: 'Why do semantic elements help screen reader users?',
          options: [
            'They make the page load faster',
            'They create visual landmarks on screen',
            'They expose navigation landmarks screen readers can jump to',
            'They are required by HTML5 validators',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Restructure the code below to use semantic HTML. Replace the generic divs with appropriate semantic elements.',
        starterCode: `<div class="header"><h1>My Blog</h1></div>
<div class="nav"><a href="/">Home</a> <a href="/about">About</a></div>
<div class="content">
  <div class="post">
    <h2>My First Post</h2>
    <p>Hello everyone!</p>
  </div>
</div>
<div class="footer"><p>© 2026</p></div>`,
        solution: `<header><h1>My Blog</h1></header>
<nav><a href="/">Home</a> <a href="/about">About</a></nav>
<main>
  <article>
    <h2>My First Post</h2>
    <p>Hello everyone!</p>
  </article>
</main>
<footer><p>© 2026</p></footer>`,
      },
    },
    {
      id: 'html-3',
      title: 'Lesson 3: Accessible Forms',
      content: `Forms are one of the most important and most often broken areas of web accessibility.

Rules for accessible forms:
1. Every input must have a <label> with a matching "for" attribute that equals the input's "id"
2. Use <fieldset> and <legend> to group related inputs (like radio buttons)
3. Mark required fields with aria-required="true"
4. Provide helpful error messages linked to the input via aria-describedby
5. Buttons should have descriptive text — avoid "Click here" or "Submit"

Example of an accessible form field:
<label for="email">Email address</label>
<input type="email" id="email" name="email" aria-required="true" />`,
      quiz: [
        {
          question: 'What attribute connects a <label> to an <input>?',
          options: ['name', 'class', 'for', 'aria-label'],
          answer: 2,
        },
        {
          question: 'Which element groups related form controls like radio buttons?',
          options: ['<group>', '<section>', '<fieldset>', '<div>'],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Fix the form below so that it is accessible. Add proper labels, ids, and aria attributes.',
        starterCode: `<form>
  <input type="text" placeholder="Your name" />
  <input type="email" placeholder="Your email" />
  <input type="checkbox" /> Subscribe to newsletter
  <button>Go</button>
</form>`,
        solution: `<form>
  <label for="name">Your name</label>
  <input type="text" id="name" name="name" aria-required="true" />

  <label for="email">Your email</label>
  <input type="email" id="email" name="email" aria-required="true" />

  <label>
    <input type="checkbox" name="subscribe" />
    Subscribe to newsletter
  </label>

  <button type="submit">Submit form</button>
</form>`,
      },
    },
  ],
};

if (typeof module !== 'undefined') module.exports = htmlModule;
if (typeof window !== 'undefined') window.htmlModule = htmlModule;
