'use strict';

const nextjsModule = {
  id: 'nextjs',
  title: 'Next.js',
  description: 'Next.js is the most popular React framework for building production-grade web applications. It adds file-based routing, server-side rendering, static generation, API routes, and a powerful deployment story on top of React — letting you build fast, accessible, full-stack apps without boilerplate configuration.',
  objectives: [
    'Understand what Next.js adds on top of React and when to choose it',
    'Create pages using file-based routing in the pages/ directory',
    'Use dynamic routes to handle parameterised URLs',
    'Pre-render pages at build time with getStaticProps and getStaticPaths',
    'Fetch fresh data on every request with getServerSideProps',
    'Build backend API endpoints with API Routes',
    'Work with the App Router introduced in Next.js 13',
    'Configure environment variables and deploy to Vercel',
  ],
  goals: [
    'Create a Next.js app and navigate between pages using the Link component',
    'Build a dynamic route that reads a URL parameter and fetches matching data',
    'Use getStaticProps to pre-render a page with data from an external API',
    'Write an API route that handles GET and POST requests',
    'Create a root layout.js with a shared header using the App Router',
    'Set an environment variable and read it inside a Next.js page',
    'Deploy a Next.js app to Vercel from a GitHub repository',
  ],
  lessons: [
    // ─────────────────────────────────────────────────────────────────
    // LESSON 1 — WHAT IS NEXT.JS?
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'next-1',
      title: 'Lesson 1: What Is Next.js and Why Use It?',
      content: `Next.js is a React framework created by Vercel. A framework is a set of opinions and tools built on top of a library — React is the library, Next.js is the framework. It solves real problems that come up the moment you try to ship a React app to production.

WHAT PROBLEMS DOES NEXT.JS SOLVE?
If you build a React app with Create React App or Vite, you get a Single-Page Application (SPA). An SPA ships a nearly empty HTML file to the browser, then JavaScript downloads and runs, builds the page in the browser, and finally shows content to the user.

This approach has three drawbacks:
  1. Slow first load — the user sees nothing until JavaScript finishes downloading and running
  2. Poor SEO — search engine crawlers often see the empty HTML, not the rendered content
  3. No backend — you need a separate server for API calls, authentication, and database access

Next.js solves all three by rendering pages on the server (or at build time) and giving you a built-in backend through API Routes.

THE THREE RENDERING STRATEGIES

CLIENT-SIDE RENDERING (CSR)
The browser downloads JavaScript and renders the page entirely in the browser.
  - Best for: highly interactive dashboards, apps behind a login, real-time data
  - Worst for: public pages that need to be indexed by search engines

STATIC SITE GENERATION (SSG)
Pages are rendered at BUILD TIME and saved as HTML files. The server just serves the pre-built file — no computation on each request.
  - Best for: blogs, marketing pages, documentation — content that does not change per user
  - Fastest possible load time — pure static HTML

SERVER-SIDE RENDERING (SSR)
The server renders the page on EVERY REQUEST and sends fresh HTML.
  - Best for: pages with data that changes frequently or is personalised per user
  - Slower than SSG but always fresh

INCREMENTAL STATIC REGENERATION (ISR)
A hybrid: pages are pre-rendered at build time, but Next.js can regenerate individual pages in the background after a set interval (e.g., every 60 seconds).
  - Best for: pages whose content changes occasionally but does not need to be real-time

Next.js lets you mix all four strategies in the same app — different pages can use different approaches.

CREATING A NEXT.JS APP
The recommended way to start:

  npx create-next-app@latest my-app
  cd my-app
  npm run dev

create-next-app asks a few questions (TypeScript? Tailwind? App Router?). For learning, answer no to Tailwind and choose whichever router you want. The dev server starts at http://localhost:3000.

PROJECT STRUCTURE (PAGES ROUTER)
  my-app/
  ├── pages/
  │   ├── index.js        ← home page (route: /)
  │   ├── about.js        ← about page (route: /about)
  │   └── api/
  │       └── hello.js    ← API route (/api/hello)
  ├── public/             ← static assets (images, fonts)
  ├── styles/             ← CSS files
  └── next.config.js      ← Next.js configuration

NEXT.JS VS CREATE REACT APP
  Feature                  CRA / Vite     Next.js
  ─────────────────────    ──────────     ───────
  Routing                  Manual         Built-in (file-based)
  Server-side rendering    No             Yes
  Static generation        No             Yes
  API routes               No             Yes
  Image optimisation       No             Yes (next/image)
  SEO-ready                No             Yes
  Configuration required   Minimal        Minimal

For anything beyond a personal project or prototype, Next.js is the standard choice in the React ecosystem.`,
      quiz: [
        {
          question: 'What is the main drawback of a plain React SPA (Single-Page Application) for public-facing pages?',
          options: [
            'React SPAs cannot use CSS',
            'The browser must download and run JavaScript before showing content, hurting load time and SEO',
            'SPAs do not support TypeScript',
            'React cannot render lists in a SPA',
          ],
          answer: 1,
        },
        {
          question: 'Which rendering strategy pre-renders pages at build time and serves static HTML with no server computation per request?',
          options: [
            'Server-Side Rendering (SSR)',
            'Client-Side Rendering (CSR)',
            'Static Site Generation (SSG)',
            'Incremental Static Regeneration (ISR)',
          ],
          answer: 2,
        },
        {
          question: 'You are building a personalised dashboard that shows different data for each logged-in user. Which rendering strategy fits best?',
          options: [
            'Static Site Generation — pre-render all users\' dashboards at build time',
            'Server-Side Rendering — render the page on each request with the user\'s data',
            'No rendering strategy is needed — dashboards cannot be built with Next.js',
            'Incremental Static Regeneration — regenerate every 60 seconds',
          ],
          answer: 1,
        },
        {
          question: 'What command creates a new Next.js project?',
          options: [
            'npm init next-app',
            'npx create-react-app --next',
            'npx create-next-app@latest my-app',
            'next new my-app',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'No code to run yet. In the text area below, write a comment describing which rendering strategy you would choose for each scenario and why: (1) a company blog, (2) a stock price ticker, (3) a user account settings page.',
        starterCode: `// Choose SSG, SSR, or CSR for each and explain why:

// (1) Company blog:
//

// (2) Stock price ticker:
//

// (3) User account settings page:
//`,
        solution: `// (1) Company blog: SSG
//     Blog posts rarely change. Pre-rendering at build time gives the
//     fastest load and best SEO with no per-request cost.

// (2) Stock price ticker: CSR
//     Prices change every second. CSR lets the browser poll or
//     subscribe to live data without a full page reload.

// (3) User account settings page: SSR (or CSR behind auth)
//     Settings are personalised per user — SSR fetches the user's
//     data on each request and renders fresh HTML. Alternatively,
//     CSR behind a login check is also fine since SEO is not needed.`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 2 — FILE-BASED ROUTING
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'next-2',
      title: 'Lesson 2: File-Based Routing',
      content: `One of Next.js's most useful features is its file-based routing system. Instead of writing a router configuration, you create files inside the pages/ directory and Next.js automatically creates routes that match the file paths.

HOW FILE-BASED ROUTING WORKS
Every .js (or .jsx / .tsx) file inside pages/ becomes a route:

  pages/index.js          →  /
  pages/about.js          →  /about
  pages/blog/index.js     →  /blog
  pages/blog/first.js     →  /blog/first
  pages/contact.js        →  /contact

Each file must export a default React component. That component is what gets rendered when the user visits the route.

CREATING A PAGE
  // pages/about.js
  export default function About() {
    return (
      <main>
        <h1>About Us</h1>
        <p>We build accessible software.</p>
      </main>
    );
  }

Visit http://localhost:3000/about and this component renders.

THE LINK COMPONENT
For client-side navigation between pages, use Next.js's built-in Link component instead of a plain HTML anchor:

  import Link from 'next/link';

  export default function Navigation() {
    return (
      <nav aria-label="Main navigation">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/blog">Blog</Link></li>
        </ul>
      </nav>
    );
  }

Link renders as an <a> element in the DOM (so it is fully accessible and keyboard-navigable), but handles the navigation client-side — no full page reload. Next.js also pre-fetches linked pages in the background, making navigation feel instant.

DYNAMIC ROUTES
For pages where part of the URL changes — a blog post, a product page, a user profile — use square brackets in the filename to create a dynamic route:

  pages/blog/[slug].js    →  /blog/anything
  pages/users/[id].js     →  /users/42

Inside the component, read the dynamic segment with useRouter from next/router:

  // pages/blog/[slug].js
  import { useRouter } from 'next/router';

  export default function BlogPost() {
    const router = useRouter();
    const { slug } = router.query;   // e.g. "my-first-post"

    return (
      <main>
        <h1>Post: {slug}</h1>
      </main>
    );
  }

CATCH-ALL ROUTES
To match any number of path segments, use three dots inside the brackets:

  pages/docs/[...slug].js   →  /docs/a, /docs/a/b, /docs/a/b/c

router.query.slug will be an array: ['a', 'b', 'c'].

NESTED DYNAMIC ROUTES
You can nest dynamic segments:

  pages/users/[userId]/posts/[postId].js  →  /users/42/posts/7

router.query gives you { userId: '42', postId: '7' }.

THE _app.js FILE
pages/_app.js is a special file that wraps every page. Use it for global layout elements (navigation, footer) and global CSS imports:

  // pages/_app.js
  import '../styles/globals.css';

  export default function App({ Component, pageProps }) {
    return (
      <>
        <SkipLink />
        <SiteHeader />
        <Component {...pageProps} />
        <SiteFooter />
      </>
    );
  }

Component is the current page component. pageProps are the props it needs (fetched by getStaticProps or getServerSideProps).

THE _document.js FILE
pages/_document.js lets you customise the HTML document shell — the <html>, <head>, and <body> tags. Use it to set the lang attribute and add any global meta tags:

  // pages/_document.js
  import { Html, Head, Main, NextScript } from 'next/document';

  export default function Document() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

Setting lang="en" on the <html> element is required for screen readers to use the correct language profile. Always include this.

404 PAGES
Create pages/404.js to customise the not-found page:

  export default function NotFound() {
    return (
      <main>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist.</p>
        <a href="/">Go home</a>
      </main>
    );
  }`,
      quiz: [
        {
          question: 'What file path creates the route /products in Next.js Pages Router?',
          options: [
            'routes/products.js',
            'pages/products.js',
            'src/products/index.js',
            'app/products/route.js',
          ],
          answer: 1,
        },
        {
          question: 'Why should you use Next.js\'s Link component instead of a plain <a> tag for internal navigation?',
          options: [
            'Plain <a> tags do not work in Next.js',
            'Link renders as a <button> which is more accessible',
            'Link handles navigation client-side with pre-fetching, avoiding full page reloads while remaining a proper anchor in the DOM',
            'Link automatically adds ARIA attributes to the anchor',
          ],
          answer: 2,
        },
        {
          question: 'Which filename creates a dynamic route that matches /blog/any-slug?',
          options: [
            'pages/blog/:slug.js',
            'pages/blog/{slug}.js',
            'pages/blog/[slug].js',
            'pages/blog/$slug.js',
          ],
          answer: 2,
        },
        {
          question: 'What is the purpose of pages/_app.js?',
          options: [
            'It defines the app\'s database connection',
            'It wraps every page, making it the right place for global layout and CSS imports',
            'It replaces pages/index.js as the home page',
            'It configures the Next.js dev server port',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write the file structure (as comments) for a Next.js pages/ directory that has: a home page, an about page, a blog index page, individual blog post pages at /blog/[slug], and a 404 page. Then write the BlogPost component that reads the slug from the router and renders it in an <h1>.',
        starterCode: `// File structure:
// pages/
//   ...

// pages/blog/[slug].js
import { useRouter } from 'next/router';

export default function BlogPost() {
  // Read the slug from the router and render it
}`,
        solution: `// File structure:
// pages/
//   index.js          → /
//   about.js          → /about
//   404.js            → (custom 404)
//   blog/
//     index.js        → /blog
//     [slug].js       → /blog/:slug

// pages/blog/[slug].js
import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <main>
      <h1>{slug}</h1>
      <p>Content for post: {slug}</p>
    </main>
  );
}`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 3 — STATIC GENERATION
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'next-3',
      title: 'Lesson 3: Static Generation with getStaticProps',
      content: `Static Generation (SSG) pre-renders a page at build time. The HTML is generated once and reused for every visitor — no server computation on each request. This makes SSG pages the fastest possible option.

getStaticProps
To pre-render a page with data, export an async function called getStaticProps from the page file:

  // pages/index.js
  export default function Home({ posts }) {
    return (
      <main>
        <h1>Latest Posts</h1>
        <ul>
          {posts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </main>
    );
  }

  export async function getStaticProps() {
    const res  = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const posts = await res.json();

    return {
      props: { posts },   // passed to the component as props
    };
  }

Next.js calls getStaticProps at build time (npm run build). It fetches the data, passes it as props to your component, and saves the rendered HTML. The component never runs on the server again after the build — the user always gets the pre-built page.

WHAT getStaticProps CAN DO
  - Fetch from an external REST API or GraphQL endpoint
  - Read from the filesystem (markdown files, JSON)
  - Query a database directly (this code runs on the server, never in the browser)
  - Import heavy Node.js libraries — they are never sent to the browser

The code inside getStaticProps is NEVER included in the browser bundle. It is safe to put secrets (API keys, DB connection strings) there — they stay on the server.

THE notFound AND redirect RETURNS
  return { notFound: true }           // renders the 404 page
  return { redirect: { destination: '/login', permanent: false } }

INCREMENTAL STATIC REGENERATION (ISR)
Add a revalidate property to regenerate the page in the background:

  return {
    props: { posts },
    revalidate: 60,   // regenerate at most once every 60 seconds
  };

After the initial build, when a user visits the page and the 60-second window has passed, Next.js regenerates it in the background. The next visitor gets the fresh version.

getStaticPaths FOR DYNAMIC ROUTES
For dynamic routes (like [slug].js), you must tell Next.js which paths to pre-render. Export getStaticPaths:

  // pages/blog/[slug].js
  export async function getStaticPaths() {
    const res   = await fetch('https://api.example.com/posts');
    const posts = await res.json();

    const paths = posts.map(post => ({
      params: { slug: post.slug },
    }));

    return {
      paths,
      fallback: false,   // 404 for any path not in the list
    };
  }

  export async function getStaticProps({ params }) {
    const res  = await fetch(\`https://api.example.com/posts/\${params.slug}\`);
    const post = await res.json();

    return { props: { post } };
  }

  export default function BlogPost({ post }) {
    return (
      <article>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </article>
    );
  }

THE fallback OPTION
  fallback: false    — 404 for unknown paths. Good when the full list is known at build time.
  fallback: true     — serve a loading state, then generate the page on first request and cache it.
  fallback: 'blocking' — wait for the page to generate before responding (no loading state).

WHEN TO USE STATIC GENERATION
Use SSG when:
  - The data does not change per user (public content)
  - The data changes infrequently (revalidate handles this)
  - You want the fastest possible page loads
  - SEO matters

Do NOT use SSG when:
  - The data changes every second and must always be fresh
  - The page shows user-specific data (use SSR or CSR instead)`,
      quiz: [
        {
          question: 'When does getStaticProps run?',
          options: [
            'On every request, on the server',
            'In the browser, after the page loads',
            'At build time (npm run build), not on each request',
            'Only when the user clicks a button',
          ],
          answer: 2,
        },
        {
          question: 'Is it safe to put a database password inside getStaticProps?',
          options: [
            'No — getStaticProps code is bundled into the browser JavaScript',
            'Yes — getStaticProps code runs only on the server and is never sent to the browser',
            'Only if you encrypt the password first',
            'No — Next.js explicitly blocks access to environment variables',
          ],
          answer: 1,
        },
        {
          question: 'What does the revalidate property in a getStaticProps return value do?',
          options: [
            'It checks the user\'s session before serving the page',
            'It forces the page to regenerate on every request',
            'It allows Next.js to regenerate the static page in the background after a set number of seconds (ISR)',
            'It validates the props before passing them to the component',
          ],
          answer: 2,
        },
        {
          question: 'A dynamic route /blog/[slug].js uses getStaticProps. What additional function must you export?',
          options: [
            'getStaticRoutes — to list all known slugs',
            'getStaticPaths — to tell Next.js which paths to pre-render',
            'generatePaths — to define the dynamic segments',
            'No additional function is needed',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write a complete Next.js page at pages/users/[id].js that uses getStaticPaths and getStaticProps to pre-render user profiles. Fetch the list of users from https://jsonplaceholder.typicode.com/users for paths, and fetch individual user data for props.',
        starterCode: `// pages/users/[id].js

export default function UserProfile({ user }) {
  // Render user.name, user.email, user.company.name
}

export async function getStaticPaths() {
  // Fetch users and return paths array
  // Use fallback: false
}

export async function getStaticProps({ params }) {
  // Fetch single user by params.id
  // Return { props: { user } }
}`,
        solution: `// pages/users/[id].js

export default function UserProfile({ user }) {
  return (
    <main>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Company: {user.company.name}</p>
    </main>
  );
}

export async function getStaticPaths() {
  const res   = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();

  const paths = users.map(user => ({
    params: { id: String(user.id) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res  = await fetch(\`https://jsonplaceholder.typicode.com/users/\${params.id}\`);
  const user = await res.json();

  return { props: { user } };
}`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 4 — SERVER-SIDE RENDERING
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'next-4',
      title: 'Lesson 4: Server-Side Rendering with getServerSideProps',
      content: `Server-Side Rendering (SSR) renders a page on the server on EVERY request. When a user visits the page, Next.js runs getServerSideProps, fetches data, renders the component to HTML, and sends the result to the browser. The browser receives a fully-rendered page — no waiting for JavaScript to build it client-side.

getServerSideProps
Export an async function called getServerSideProps from your page file:

  // pages/dashboard.js
  export default function Dashboard({ user, stats }) {
    return (
      <main>
        <h1>Welcome, {user.name}</h1>
        <p>Total orders: {stats.totalOrders}</p>
        <p>Revenue: \${stats.revenue}</p>
      </main>
    );
  }

  export async function getServerSideProps(context) {
    const { req, res, params, query } = context;

    // Read a cookie or auth header from the request
    const token = req.cookies.authToken;
    if (!token) {
      return { redirect: { destination: '/login', permanent: false } };
    }

    const [userRes, statsRes] = await Promise.all([
      fetch('https://api.example.com/me',    { headers: { Authorization: \`Bearer \${token}\` } }),
      fetch('https://api.example.com/stats', { headers: { Authorization: \`Bearer \${token}\` } }),
    ]);

    const user  = await userRes.json();
    const stats = await statsRes.json();

    return { props: { user, stats } };
  }

THE context OBJECT
getServerSideProps receives a context object with:
  context.req      — the Node.js HTTP request object (headers, cookies)
  context.res      — the Node.js HTTP response object
  context.params   — dynamic route params (same as getStaticProps)
  context.query    — URL query string as an object (/page?search=foo → { search: 'foo' })

You can read cookies, set response headers, and access the full request — things that are impossible with static generation.

REDIRECT AND NOT FOUND
  return { redirect: { destination: '/login', permanent: false } }
  return { notFound: true }

These work identically to their getStaticProps equivalents.

SSR vs SSG: WHEN TO USE EACH

  Use SSG (getStaticProps) when:
    - Content is the same for all users
    - Data changes infrequently (or revalidate handles it)
    - Maximum performance is the priority

  Use SSR (getServerSideProps) when:
    - Data is personalised per user
    - You need to read cookies or auth headers
    - Data changes every request and must always be fresh
    - You need to set response headers (cache-control, cookies)

PERFORMANCE CONSIDERATIONS
SSR is slower than SSG because the server must render the page on every request. The Time to First Byte (TTFB) is higher because the browser must wait for the server to fetch data and render HTML before sending anything.

Strategies to improve SSR performance:
  1. Cache aggressively — if the page content is the same for all users for a short window, set Cache-Control headers
  2. Use streaming — Next.js 13+ supports React streaming to send HTML in chunks as it renders
  3. Fetch in parallel — use Promise.all() to make concurrent data requests instead of sequential ones
  4. Move non-personalised data to SSG — only SSR the parts that need per-user data

CLIENT-SIDE DATA FETCHING ALONGSIDE SSR
You can combine SSR with client-side fetching. getServerSideProps provides the initial data; the component uses SWR or React Query to keep it fresh:

  import useSWR from 'swr';

  export default function LiveScores({ initialScores }) {
    const { data: scores } = useSWR('/api/scores', fetcher, {
      fallbackData: initialScores,
      refreshInterval: 5000,   // poll every 5 seconds
    });

    return <ScoreBoard scores={scores} />;
  }

  export async function getServerSideProps() {
    const res = await fetch('https://api.example.com/scores');
    const initialScores = await res.json();
    return { props: { initialScores } };
  }

This gives you a fast first render with SSR plus live updates via client-side polling.`,
      quiz: [
        {
          question: 'When does getServerSideProps run?',
          options: [
            'Once at build time and cached forever',
            'On every request, on the server, before sending HTML to the browser',
            'In the browser after the page loads',
            'Only when the database changes',
          ],
          answer: 1,
        },
        {
          question: 'You need to read the user\'s auth cookie and fetch personalised data before rendering. Which function should you use?',
          options: [
            'getStaticProps — it can read cookies through the context object',
            'getServerSideProps — it receives the full request object including cookies',
            'useEffect — fetch the data client-side after the page loads',
            'getStaticPaths — it has access to the request',
          ],
          answer: 1,
        },
        {
          question: 'What is the main performance trade-off of SSR compared to SSG?',
          options: [
            'SSR pages cannot use React components',
            'SSR requires more browser memory than SSG',
            'SSR has a higher Time to First Byte because the server must render on every request instead of serving a pre-built file',
            'SSR pages are not indexed by search engines',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Write a getServerSideProps function for a /search page that reads the "q" query parameter from the URL (/search?q=javascript) and fetches matching posts from https://jsonplaceholder.typicode.com/posts. Pass the query string and results as props.',
        starterCode: `// pages/search.js

export default function SearchResults({ query, posts }) {
  return (
    <main>
      <h1>Results for: {query}</h1>
      <ul>
        {posts.map(p => <li key={p.id}>{p.title}</li>)}
      </ul>
    </main>
  );
}

export async function getServerSideProps(context) {
  // 1. Read context.query.q (default to empty string if missing)
  // 2. Fetch posts from the API
  // 3. Filter posts whose title includes the query (case-insensitive)
  // 4. Return { props: { query, posts } }
}`,
        solution: `// pages/search.js

export default function SearchResults({ query, posts }) {
  return (
    <main>
      <h1>Results for: {query}</h1>
      <ul>
        {posts.map(p => <li key={p.id}>{p.title}</li>)}
      </ul>
    </main>
  );
}

export async function getServerSideProps(context) {
  const query = context.query.q || '';

  const res   = await fetch('https://jsonplaceholder.typicode.com/posts');
  const all   = await res.json();

  const posts = query
    ? all.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
    : all.slice(0, 10);

  return { props: { query, posts } };
}`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 5 — API ROUTES
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'next-5',
      title: 'Lesson 5: API Routes',
      content: `Next.js lets you write backend API endpoints in the same project as your frontend — no separate Express server needed. Any file inside pages/api/ becomes an HTTP endpoint.

YOUR FIRST API ROUTE
  // pages/api/hello.js
  export default function handler(req, res) {
    res.status(200).json({ message: 'Hello from Next.js API!' });
  }

Visit http://localhost:3000/api/hello and you get:
  { "message": "Hello from Next.js API!" }

The handler function receives:
  req — the HTTP request (method, headers, body, query params)
  res — the HTTP response (with helpers like .json(), .status(), .send())

HANDLING DIFFERENT HTTP METHODS
A single handler can respond differently based on req.method:

  // pages/api/posts.js
  export default function handler(req, res) {
    if (req.method === 'GET') {
      // Return a list of posts
      res.status(200).json({ posts: [] });

    } else if (req.method === 'POST') {
      // Create a new post
      const { title, body } = req.body;

      if (!title || !body) {
        return res.status(400).json({ error: 'title and body are required' });
      }

      // ... save to database ...
      res.status(201).json({ message: 'Post created', title });

    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ error: \`Method \${req.method} not allowed\` });
    }
  }

READING THE REQUEST BODY
Next.js automatically parses JSON request bodies. Access them via req.body:

  const { name, email } = req.body;

For form submissions (application/x-www-form-urlencoded), you may need a body parser — but JSON is the standard for modern APIs.

READING QUERY PARAMETERS
URL query parameters are available on req.query:

  // GET /api/users?role=admin&page=2
  const { role, page } = req.query;

DYNAMIC API ROUTES
API routes support the same dynamic segment syntax as pages:

  // pages/api/users/[id].js
  export default function handler(req, res) {
    const { id } = req.query;   // e.g. /api/users/42 → id = '42'
    res.json({ userId: id });
  }

CONNECTING TO A DATABASE
API routes run on the server, so you can connect to a database directly. Here is an example using a hypothetical database module:

  import { db } from '../../lib/db';

  export default async function handler(req, res) {
    try {
      const users = await db.query('SELECT id, name, email FROM users');
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  }

Common database options for Next.js:
  - Prisma — TypeScript ORM, works great with Next.js
  - Drizzle — lightweight TypeScript ORM
  - Supabase — PostgreSQL as a service with a JavaScript client
  - MongoDB / Mongoose — document database

CALLING API ROUTES FROM YOUR PAGES
Use fetch inside a React component or useEffect:

  import { useState, useEffect } from 'react';

  export default function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetch('/api/users')
        .then(r => r.json())
        .then(data => setUsers(data.users));
    }, []);

    return (
      <ul>
        {users.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    );
  }

Or fetch from within getServerSideProps — though for same-app API routes it is more efficient to import the data logic directly rather than making an extra HTTP round-trip.

IMPORTANT NOTES
  - API routes are NOT static — they always run on a server (or serverless function in deployment)
  - They are never included in the client-side bundle
  - Do not call your own API routes from getStaticProps — import the function directly instead
  - Always validate and sanitise user input before using it in database queries or responses`,
      quiz: [
        {
          question: 'Where do you create API route files in Next.js Pages Router?',
          options: [
            'api/ at the project root',
            'pages/api/ directory',
            'src/routes/api/',
            'server/api/',
          ],
          answer: 1,
        },
        {
          question: 'How do you read the request body in a Next.js API route?',
          options: [
            'req.params.body',
            'req.data',
            'req.body (Next.js parses JSON bodies automatically)',
            'context.body',
          ],
          answer: 2,
        },
        {
          question: 'A POST request arrives at your API route with missing required fields. What is the correct HTTP status code to return?',
          options: [
            '200 — always return 200 and explain the error in the body',
            '404 — the resource was not found',
            '400 — Bad Request, indicating the client sent invalid input',
            '500 — Internal Server Error',
          ],
          answer: 2,
        },
        {
          question: 'Why should you avoid calling your own Next.js API routes from inside getStaticProps?',
          options: [
            'getStaticProps cannot use fetch',
            'It creates a circular dependency that crashes the build',
            'It adds an unnecessary HTTP round-trip — it is more efficient to import the data logic directly',
            'API routes are unavailable at build time',
          ],
          answer: 2,
        },
      ],
      exercise: {
        prompt: 'Write a Next.js API route at pages/api/todos/[id].js that handles GET (return the todo), PUT (update it), and DELETE (remove it). Use a simple in-memory array as the data store. Return 405 for unsupported methods and 404 if the id is not found.',
        starterCode: `// pages/api/todos/[id].js

// Simple in-memory store (resets on server restart)
const todos = [
  { id: 1, text: 'Learn Next.js', done: false },
  { id: 2, text: 'Build an app', done: false },
];

export default function handler(req, res) {
  const id   = parseInt(req.query.id);
  const todo = todos.find(t => t.id === id);

  // Handle 404 if not found

  // Handle GET, PUT, DELETE
  // Return 405 for other methods
}`,
        solution: `// pages/api/todos/[id].js

const todos = [
  { id: 1, text: 'Learn Next.js', done: false },
  { id: 2, text: 'Build an app', done: false },
];

export default function handler(req, res) {
  const id    = parseInt(req.query.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(todos[index]);
  }

  if (req.method === 'PUT') {
    const { text, done } = req.body;
    todos[index] = { ...todos[index], ...(text !== undefined && { text }), ...(done !== undefined && { done }) };
    return res.status(200).json(todos[index]);
  }

  if (req.method === 'DELETE') {
    todos.splice(index, 1);
    return res.status(200).json({ message: 'Deleted' });
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).json({ error: \`Method \${req.method} not allowed\` });
}`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 6 — THE APP ROUTER
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'next-6',
      title: 'Lesson 6: The App Router (Next.js 13+)',
      content: `Next.js 13 introduced the App Router — a new routing system that lives in the app/ directory alongside (or instead of) pages/. The App Router is now the recommended approach for new Next.js projects. It introduces a fundamentally different mental model based on React Server Components.

APP/ DIRECTORY CONVENTIONS
Instead of one file per route, the App Router uses a folder-per-route structure with special reserved filenames:

  app/
  ├── layout.js        ← root layout (wraps ALL pages)
  ├── page.js          ← home page (route: /)
  ├── loading.js       ← loading UI for this segment
  ├── error.js         ← error boundary for this segment
  ├── not-found.js     ← custom 404 for this segment
  ├── about/
  │   └── page.js      ← /about
  └── blog/
      ├── page.js      ← /blog
      └── [slug]/
          └── page.js  ← /blog/:slug

Only page.js files create publicly accessible routes. layout.js, loading.js, and error.js are special and do not create routes themselves.

layout.js — SHARED LAYOUTS
layout.js wraps all pages at its level and below. The root layout MUST include <html> and <body> tags:

  // app/layout.js
  export const metadata = {
    title: 'My App',
    description: 'Built with Next.js',
  };

  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          <header>
            <nav aria-label="Main navigation">
              <a href="/">Home</a>
              <a href="/about">About</a>
            </nav>
          </header>
          <main>{children}</main>
        </body>
      </html>
    );
  }

Unlike _app.js, layouts are NESTED — a layout at app/blog/layout.js wraps only blog pages, while the root layout still wraps everything.

page.js — ROUTE COMPONENTS
  // app/about/page.js
  export default function About() {
    return <h1>About</h1>;
  }

loading.js — STREAMING LOADING UI
Create a loading.js file to automatically show a loading state while the page fetches data:

  // app/blog/loading.js
  export default function Loading() {
    return <p aria-live="polite">Loading posts...</p>;
  }

Next.js uses React Suspense under the hood — the loading UI shows instantly while the page component streams in.

error.js — ERROR BOUNDARIES
  // app/blog/error.js
  'use client';   // error components must be Client Components

  export default function Error({ error, reset }) {
    return (
      <div role="alert">
        <h2>Something went wrong</h2>
        <p>{error.message}</p>
        <button onClick={reset}>Try again</button>
      </div>
    );
  }

SERVER COMPONENTS VS CLIENT COMPONENTS
This is the most important concept in the App Router.

SERVER COMPONENTS (default):
  - Render only on the server
  - Can fetch data directly (async/await at the component level — no useEffect needed)
  - Cannot use browser APIs, useState, useEffect, or event handlers
  - Their code is never sent to the browser — great for security and performance

  // app/blog/page.js — Server Component
  export default async function BlogPage() {
    const posts = await fetch('https://api.example.com/posts').then(r => r.json());

    return (
      <ul>
        {posts.map(p => <li key={p.id}>{p.title}</li>)}
      </ul>
    );
  }

CLIENT COMPONENTS:
  - Use the 'use client' directive at the top of the file
  - Can use useState, useEffect, event handlers, and browser APIs
  - Sent to the browser as JavaScript

  // components/Counter.js — Client Component
  'use client';
  import { useState } from 'react';

  export default function Counter() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>;
  }

THE RULE: push 'use client' as far DOWN the component tree as possible. Keep data-fetching in Server Components; only mark components as client when they truly need interactivity.

FETCHING DATA IN SERVER COMPONENTS
No getStaticProps or getServerSideProps — just async/await:

  // Static (equivalent to getStaticProps)
  const data = await fetch(url, { cache: 'force-cache' });

  // SSR (equivalent to getServerSideProps)
  const data = await fetch(url, { cache: 'no-store' });

  // ISR (equivalent to revalidate)
  const data = await fetch(url, { next: { revalidate: 60 } });

The fetch cache option controls the rendering strategy per-request, not per-page.`,
      quiz: [
        {
          question: 'In the App Router, which filename creates a publicly accessible route?',
          options: [
            'layout.js',
            'route.js',
            'page.js',
            'index.js',
          ],
          answer: 2,
        },
        {
          question: 'What is a Server Component in Next.js App Router?',
          options: [
            'A component that can only be used on the home page',
            'A component that renders only on the server, can fetch data with async/await, and is never sent to the browser as JavaScript',
            'A component that requires a running Node.js server and cannot be statically generated',
            'A component that replaces API routes',
          ],
          answer: 1,
        },
        {
          question: 'When must you add the "use client" directive to a component?',
          options: [
            'Always — all App Router components require "use client"',
            'When the component uses CSS stylesheets',
            'When the component uses useState, useEffect, event handlers, or browser APIs',
            'Only for components inside the app/api directory',
          ],
          answer: 2,
        },
        {
          question: 'In App Router, how do you make a page equivalent to SSR (getServerSideProps — always fresh, never cached)?',
          options: [
            'Export getServerSideProps from the page.js file',
            'Use fetch with { cache: "no-store" } in a Server Component',
            'Add "use server" at the top of the page file',
            'Set revalidate: 0 in the layout.js',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Write the root layout (app/layout.js) for an accessible Next.js app. It should set the page lang, include a skip link, a nav with two links (Home and About), and a main landmark. Then write app/page.js as a Server Component that fetches the first 3 posts from https://jsonplaceholder.typicode.com/posts?_limit=3 and renders them.',
        starterCode: `// app/layout.js
export const metadata = {
  title: 'My App',
};

export default function RootLayout({ children }) {
  // Include: lang="en", skip link, nav with Home and About, <main>
}

// app/page.js
// Server Component — fetch posts and render a list
export default async function HomePage() {

}`,
        solution: `// app/layout.js
export const metadata = {
  title: 'My App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <header>
          <nav aria-label="Main navigation">
            <a href="/">Home</a>
            <a href="/about">About</a>
          </nav>
        </header>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}

// app/page.js
export default async function HomePage() {
  const res   = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3', {
    cache: 'force-cache',
  });
  const posts = await res.json();

  return (
    <section>
      <h1>Latest Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </section>
  );
}`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 7 — DEPLOYMENT AND ENVIRONMENT VARIABLES
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'next-7',
      title: 'Lesson 7: Deployment and Environment Variables',
      content: `Getting a Next.js app from your laptop to the web involves two things: managing secrets safely and deploying the build. Next.js has first-class support for both.

ENVIRONMENT VARIABLES
Secrets like API keys, database passwords, and third-party tokens must never be committed to git or exposed to the browser. Next.js handles this with .env files.

CREATE A .env.local FILE
  # .env.local  ← never commit this file
  DATABASE_URL=postgresql://user:password@localhost/mydb
  STRIPE_SECRET_KEY=sk_test_abc123
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xyz789

Add .env.local to .gitignore immediately:
  echo ".env.local" >> .gitignore

READING ENVIRONMENT VARIABLES

Server-only (safe — never exposed to the browser):
  // In getServerSideProps, getStaticProps, API routes, Server Components
  const dbUrl = process.env.DATABASE_URL;

Available in the browser (must be prefixed with NEXT_PUBLIC_):
  // In any component — this value is baked into the JS bundle at build time
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

CRITICAL RULE: Any variable WITHOUT the NEXT_PUBLIC_ prefix is server-only. Accessing it in a client component returns undefined. This is intentional — it prevents accidental secret exposure.

.env FILE PRIORITY ORDER
Next.js loads env files in this order (later files override earlier ones):
  .env                   ← checked into git — non-secret defaults
  .env.local             ← never in git — local overrides
  .env.development       ← loaded in dev mode only
  .env.production        ← loaded in production builds only

BUILDING FOR PRODUCTION
  npm run build    ← compiles and optimises the app
  npm start        ← starts the production server

npm run build outputs a .next/ folder containing:
  - Statically generated HTML files
  - Optimised JavaScript bundles
  - Server-side code for SSR pages and API routes
  - A build manifest

Run npm run build before deploying to catch type errors, missing env variables referenced in code, and optimisation failures.

DEPLOYING TO VERCEL
Vercel is the company behind Next.js and provides the most seamless deployment experience. Free tier is generous for personal projects.

Steps:
  1. Push your project to GitHub (git push)
  2. Go to vercel.com, sign in with GitHub
  3. Click "Add New Project" and import your repository
  4. Add environment variables in the Vercel dashboard (Settings → Environment Variables)
  5. Click Deploy

Every git push to your main branch automatically triggers a new deployment. Pull requests get preview deployments at unique URLs.

ADDING ENV VARIABLES IN VERCEL
In the Vercel dashboard:
  Project → Settings → Environment Variables

Add each key and value, and choose which environments (Production, Preview, Development) the variable applies to. Vercel injects these at build and runtime — you never commit them to git.

OTHER DEPLOYMENT OPTIONS
Next.js can be deployed beyond Vercel:

  SELF-HOSTED (Node.js server):
    npm run build
    npm start             ← runs on port 3000 by default
    PORT=8080 npm start   ← customise the port

  DOCKER:
    FROM node:20-alpine
    WORKDIR /app
    COPY . .
    RUN npm ci && npm run build
    CMD ["npm", "start"]

  STATIC EXPORT (SSG-only apps — no SSR, no API routes):
    // next.config.js
    module.exports = { output: 'export' };

    npm run build   ← generates a static out/ folder

  The static export works on any web host (GitHub Pages, Netlify, S3 + CloudFront).

THE next.config.js FILE
next.config.js at the project root lets you configure:
  - Redirects and rewrites
  - Image domains
  - Environment variable exposure
  - Experimental features
  - Webpack customisation

  // next.config.js
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    images: {
      domains: ['images.example.com'],
    },
    async redirects() {
      return [
        { source: '/old-page', destination: '/new-page', permanent: true },
      ];
    },
  };

  module.exports = nextConfig;

CHECKLIST BEFORE DEPLOYING
  [ ] All secrets are in .env.local (not committed to git)
  [ ] .env.local is in .gitignore
  [ ] npm run build succeeds locally
  [ ] Environment variables are added to the deployment platform
  [ ] NEXT_PUBLIC_ variables that are truly public are reviewed
  [ ] The app has been tested in production mode (npm start) locally`,
      quiz: [
        {
          question: 'You have a secret API key that should only be used server-side. How should you name it in .env.local?',
          options: [
            'NEXT_PUBLIC_API_KEY — all env vars must have this prefix',
            'API_KEY — no NEXT_PUBLIC_ prefix keeps it server-only and never exposed to the browser',
            'SECRET_NEXT_API_KEY — the SECRET_ prefix marks it as private',
            'api_key — lowercase prevents browser access',
          ],
          answer: 1,
        },
        {
          question: 'What does the NEXT_PUBLIC_ prefix on an environment variable mean?',
          options: [
            'The variable is encrypted at rest',
            'The variable is available in the browser — it is baked into the JavaScript bundle at build time',
            'The variable can only be used in public (unauthenticated) pages',
            'The variable is shared between all projects in a Vercel team',
          ],
          answer: 1,
        },
        {
          question: 'What command builds a Next.js app for production?',
          options: [
            'npm run start',
            'next export',
            'npm run build',
            'npm run compile',
          ],
          answer: 2,
        },
        {
          question: 'You deploy a Next.js app to Vercel. Where do you add production environment variables?',
          options: [
            'Commit a .env.production file to the GitHub repository',
            'Add them in the Vercel dashboard under Project → Settings → Environment Variables',
            'Add them to package.json in a "env" field',
            'Email them to Vercel support',
          ],
          answer: 1,
        },
      ],
      exercise: {
        prompt: 'Set up environment variable usage for a Next.js project. Write: (1) a .env.local file with a server-only DATABASE_URL and a public NEXT_PUBLIC_APP_NAME, (2) an API route that reads DATABASE_URL, and (3) a page component that reads NEXT_PUBLIC_APP_NAME. Add a comment explaining why each variable is or is not prefixed.',
        starterCode: `// .env.local
// Add your two environment variables here

// pages/api/db-status.js
export default function handler(req, res) {
  // Read DATABASE_URL and return whether it is configured (not the value!)
}

// pages/index.js
export default function Home() {
  // Read and display NEXT_PUBLIC_APP_NAME
}`,
        solution: `// .env.local
// No NEXT_PUBLIC_ prefix — stays on the server only, never in the browser bundle
// DATABASE_URL=postgresql://user:password@localhost/mydb
//
// NEXT_PUBLIC_ prefix — safe to expose in the browser (it is not a secret)
// NEXT_PUBLIC_APP_NAME=My Awesome App

// pages/api/db-status.js
export default function handler(req, res) {
  // process.env.DATABASE_URL is available here (server-side)
  // We return only whether it is set — never expose the actual connection string
  const configured = Boolean(process.env.DATABASE_URL);
  res.status(200).json({ databaseConfigured: configured });
}

// pages/index.js
export default function Home() {
  // NEXT_PUBLIC_ variables are available in the browser because
  // Next.js replaces them with their values at build time
  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  return (
    <main>
      <h1>Welcome to {appName}</h1>
    </main>
  );
}`,
      },
    },
  ],
};

window.nextjsModule = nextjsModule;
