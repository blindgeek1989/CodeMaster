const scrumIntroModule = {
  id: 'scrum-intro',
  title: 'Introduction to Scrum',
  description: 'Scrum is the most widely used agile framework in the world. This module introduces Scrum from the ground up — what it is, why it exists, and how its roles, events, and artifacts work together to deliver value iteratively.',
  objectives: [
    'Understand what Agile is and why it was created',
    'Explain the Scrum framework and its three pillars',
    'Identify the three roles on a Scrum Team',
    'Describe the five Scrum events and their purpose',
    'Explain the three Scrum artifacts and their commitments',
    'Understand how Sprints work and what Definition of Done means',
  ],
  goals: [
    'Explain Scrum to someone who has never heard of it',
    'Name all three Scrum roles and describe each one',
    'Name all five Scrum events and explain what happens in each',
    'Describe the Product Backlog, Sprint Backlog, and Increment',
    'Understand the difference between Agile and Scrum',
  ],
  lessons: [
    {
      id: 'scrum-intro-1',
      title: 'Lesson 1: What Is Agile?',
      content: `Before you can understand Scrum, you need to understand Agile — the broader philosophy that Scrum belongs to.

WHAT IS AGILE?
Agile is a mindset for managing complex work. It is not a specific tool or process — it is a set of values and principles designed to help teams deliver better results when they cannot predict everything upfront.

The word "agile" means able to move quickly and adapt to change. That is exactly what Agile teams do.

THE PROBLEM AGILE WAS CREATED TO SOLVE
Before Agile, most software projects used a method called Waterfall. In Waterfall, you plan everything at the start, then execute the plan in sequence — requirements, design, development, testing, delivery — before the customer ever sees the product.

The problem: by the time the product was delivered — often one or two years later — the customer's needs had changed. The market had shifted. The assumptions made at the start were wrong. Teams delivered exactly what was specified, but not what was actually needed.

Agile was created to fix this. Instead of building everything and then showing it to the customer, Agile teams deliver small, working pieces of the product frequently. The customer sees real progress, gives feedback, and the team adjusts. This means the final product is far more likely to meet real needs.

THE AGILE MANIFESTO
In 2001, seventeen software developers gathered in a ski resort in Utah and wrote the Agile Manifesto. It contains four core values:

  We are uncovering better ways of developing software by doing it and helping others do it.
  Through this work we have come to value:

  Individuals and interactions  over  processes and tools
  Working software              over  comprehensive documentation
  Customer collaboration        over  contract negotiation
  Responding to change          over  following a plan

  That is, while there is value in the items on the right, we value the items on the left more.

The manifesto also includes twelve principles, including delivering working software frequently, welcoming changing requirements, and maintaining a sustainable pace.

AGILE IS NOT JUST FOR SOFTWARE
Although Agile was created for software development, its principles now apply widely — to marketing, product design, HR, project management, and beyond. Anywhere that work is complex and needs to adapt, Agile thinking helps.

AGILE VS SCRUM
Agile is the philosophy. Scrum is one specific framework that implements Agile principles. Think of Agile as the values, and Scrum as a structured way to live those values.

Other Agile frameworks include Kanban, SAFe, LeSS, and XP (Extreme Programming). Scrum is the most popular by far — more than 75 percent of Agile teams use it.`,
      contentBlocks: [
        {
          type: 'text',
          value: `Before you write a single line of code, you need to understand Agile — the broader philosophy that Scrum belongs to.

WHAT IS AGILE?
Agile is a mindset for managing complex work. It is not a specific tool or process — it is a set of values and principles designed to help teams deliver better results when they cannot predict everything upfront.

The word "agile" means able to move quickly and adapt to change. That is exactly what Agile teams do.

THE PROBLEM AGILE WAS CREATED TO SOLVE
Before Agile, most software projects used a method called Waterfall. In Waterfall, you plan everything at the start, then execute the plan in sequence — requirements, design, development, testing, delivery — before the customer ever sees the product.

The problem: by the time the product was delivered — often one or two years later — the customer's needs had changed. The market had shifted. The assumptions made at the start were wrong. Teams delivered exactly what was specified, but not what was actually needed.

Agile was created to fix this. Instead of building everything and then showing it to the customer, Agile teams deliver small, working pieces of the product frequently. The customer sees real progress, gives feedback, and the team adjusts. This means the final product is far more likely to meet real needs.

THE AGILE MANIFESTO
In 2001, seventeen software developers gathered in a ski resort in Utah and wrote the Agile Manifesto. It contains four core values:

  We are uncovering better ways of developing software by doing it and helping others do it.
  Through this work we have come to value:`,
        },
        {
          type: 'table',
          caption: 'The four core values of the Agile Manifesto',
          headers: ['We value...', '...over'],
          rows: [
            ['Individuals and interactions', 'Processes and tools'],
            ['Working software', 'Comprehensive documentation'],
            ['Customer collaboration', 'Contract negotiation'],
            ['Responding to change', 'Following a plan'],
          ],
        },
        {
          type: 'text',
          value: `  That is, while there is value in the items on the right, we value the items on the left more.

The manifesto also includes twelve principles, including delivering working software frequently, welcoming changing requirements, and maintaining a sustainable pace.

AGILE IS NOT JUST FOR SOFTWARE
Although Agile was created for software development, its principles now apply widely — to marketing, product design, HR, project management, and beyond. Anywhere that work is complex and needs to adapt, Agile thinking helps.

AGILE VS SCRUM
Agile is the philosophy. Scrum is one specific framework that implements Agile principles. Think of Agile as the values, and Scrum as a structured way to live those values.

Other Agile frameworks include Kanban, SAFe, LeSS, and XP (Extreme Programming). Scrum is the most popular by far — more than 75 percent of Agile teams use it.`,
        },
      ],
      quiz: [
        {
          question: 'What is the main problem that Agile was created to solve?',
          options: [
            'Software teams were moving too fast and making too many mistakes',
            'Projects delivered late because requirements were never documented',
            'By the time products were delivered using sequential methods, customer needs had changed',
            'Teams lacked skilled programmers and needed a structured hiring process',
          ],
          answer: 2,
        },
        {
          question: 'According to the Agile Manifesto, which of these is valued MORE?',
          options: [
            'Comprehensive documentation over working software',
            'Following a plan over responding to change',
            'Customer collaboration over contract negotiation',
            'Processes and tools over individuals and interactions',
          ],
          answer: 2,
        },
        {
          question: 'What is the relationship between Agile and Scrum?',
          options: [
            'They are the same thing — Agile and Scrum are interchangeable terms',
            'Agile is a philosophy or mindset; Scrum is a specific framework that implements Agile principles',
            'Scrum is the older method that Agile replaced',
            'Agile is a framework; Scrum is the philosophy behind it',
          ],
          answer: 1,
        },
      ],
      exercise: null,
    },
    {
      id: 'scrum-intro-2',
      title: 'Lesson 2: What Is Scrum?',
      content: `Scrum is a lightweight framework for developing, delivering, and sustaining complex products. It is defined in a single document called the Scrum Guide, written by Ken Schwaber and Jeff Sutherland — the two people who created Scrum.

THE CORE IDEA
Scrum organises work into short, fixed-length cycles called Sprints — usually one to four weeks long. At the end of each Sprint, the team delivers a working, potentially releasable increment of the product. This cycle repeats until the product is complete or no longer worth investing in.

Scrum works by making progress visible early, inspecting that progress regularly, and adapting whenever something is not working. These three activities — transparency, inspection, and adaptation — are called the three pillars of Scrum.

THE THREE PILLARS OF SCRUM

TRANSPARENCY
Everyone involved can see the same information. The state of the work, the goals, the problems — all of it is visible to the whole team and stakeholders. There are no secrets. When problems arise, they are surfaced, not hidden.

INSPECTION
The team regularly examines their work, their process, and their progress. Scrum builds inspection into its events — at the end of every Sprint, the team looks at what was built and how they built it.

ADAPTATION
When inspection reveals something is wrong, the team adapts. They change the product, the plan, or the process. Adaptation is only possible because of transparency and inspection — you cannot fix what you cannot see.

SCRUM VALUES
The Scrum Guide defines five values that support the pillars:

  COMMITMENT — The team commits to achieving its goals and supporting each other.
  FOCUS — Everyone focuses on the work of the Sprint and the team's goals.
  OPENNESS — The team is open about the work and any challenges they face.
  RESPECT — Team members respect each other as capable, independent people.
  COURAGE — Team members have the courage to do the right thing and work through hard problems.

When these values are embodied by the team, the pillars of transparency, inspection, and adaptation become real.

THE SCRUM FRAMEWORK IN ONE SENTENCE
Scrum gives a small team a shared goal, a short period of time to work toward it, and regular opportunities to inspect their progress and adapt — until the product is done.

WHAT SCRUM IS NOT
Scrum is not a rigid methodology with step-by-step instructions for every situation. It is intentionally incomplete — it defines a framework (a structure to work within) not a playbook. Teams are expected to think, collaborate, and solve their own problems within the structure Scrum provides.`,
      quiz: [
        {
          question: 'What are the three pillars of Scrum?',
          options: [
            'Planning, Execution, and Review',
            'Transparency, Inspection, and Adaptation',
            'Roles, Events, and Artifacts',
            'Commitment, Focus, and Courage',
          ],
          answer: 1,
        },
        {
          question: 'What is a Sprint?',
          options: [
            'A meeting where the team plans their work for the next year',
            'A race to see which team member can complete the most tasks',
            'A short, fixed-length cycle — usually one to four weeks — at the end of which the team delivers a working increment',
            'A document that describes the product requirements',
          ],
          answer: 2,
        },
        {
          question: 'Which Scrum value means team members are honest about the work and any challenges they face?',
          options: ['Commitment', 'Courage', 'Openness', 'Respect'],
          answer: 2,
        },
      ],
      exercise: null,
    },
    {
      id: 'scrum-intro-3',
      title: 'Lesson 3: The Scrum Team',
      content: `Every Scrum team consists of exactly three accountabilities (often called roles): the Product Owner, the Developers, and the Scrum Master. Together, they form a small, self-managing team — usually ten people or fewer.

There is no hierarchy within the team. No one gives orders. The team decides together how to accomplish their work.

THE PRODUCT OWNER
The Product Owner is accountable for maximising the value of the product. They represent the business, the customers, and the stakeholders.

The Product Owner's main responsibilities:
  - Creating and maintaining the Product Backlog — the ordered list of everything the team might work on
  - Deciding what work is most important and ensuring it appears at the top of the backlog
  - Making the product goal clear to the team and stakeholders
  - Accepting or rejecting completed work based on whether it meets the agreed criteria

The Product Owner is one person — not a committee. While they may gather input from many people, they are the final decision-maker on what the team builds next.

THE DEVELOPERS
Developers are the people who do the work of building the product each Sprint. Despite the name, Developers are not limited to software engineers — they are everyone who creates the increment. This could include designers, testers, analysts, or anyone else whose work contributes to the deliverable.

The Developers' responsibilities:
  - Creating a plan for each Sprint (the Sprint Backlog)
  - Holding themselves accountable to the Definition of Done
  - Adapting their plan each day toward the Sprint Goal
  - Deciding together how to do the work — no one outside tells them how

Developers are cross-functional, meaning together they have all the skills needed to complete the work without depending on anyone outside the team.

THE SCRUM MASTER
The Scrum Master is accountable for the team's effectiveness within the Scrum framework. They are a servant-leader — their job is to help others succeed, not to manage or control them.

The Scrum Master serves three groups:
  1. The Scrum Team — by coaching, facilitating, and removing obstacles
  2. The Product Owner — by helping manage the Product Backlog and communicate with stakeholders
  3. The Organisation — by helping the broader company understand and adopt Scrum

The Scrum Master does not assign work, make product decisions, or manage performance. They create the conditions for the team to thrive. We will study the Scrum Master role in detail in the dedicated Scrum Master module.

TEAM SIZE
Scrum teams are intentionally small — typically three to nine Developers, plus the Product Owner and Scrum Master. Small teams communicate better, make decisions faster, and are more productive per person.

If the work requires more people, multiple Scrum teams work on the same product using coordination techniques, but each individual Scrum team remains small.`,
      quiz: [
        {
          question: 'Who is accountable for maximising the value of the product and managing the Product Backlog?',
          options: ['The Scrum Master', 'The Developers', 'The Product Owner', 'The Project Manager'],
          answer: 2,
        },
        {
          question: 'In Scrum, who decides HOW to do the work each Sprint?',
          options: [
            'The Scrum Master assigns tasks to Developers',
            'The Product Owner directs the Developers',
            'The Developers decide together how to do the work',
            'An external manager assigns work based on availability',
          ],
          answer: 2,
        },
        {
          question: 'What does it mean for the Developers to be "cross-functional"?',
          options: [
            'They can work across multiple companies at the same time',
            'Together they have all the skills needed to complete the work without depending on people outside the team',
            'Each Developer must know every programming language',
            'They rotate roles every Sprint to stay flexible',
          ],
          answer: 1,
        },
      ],
      exercise: null,
    },
    {
      id: 'scrum-intro-4',
      title: 'Lesson 4: Scrum Events',
      content: `Scrum defines five formal events. Each one is an opportunity for transparency, inspection, and adaptation. Together they create a regular rhythm that replaces the need for many unplanned meetings.

THE SPRINT
The Sprint is the heart of Scrum. Everything else happens inside a Sprint.

A Sprint is a fixed-length period — one to four weeks long — during which the team creates a usable, potentially releasable increment of the product. Sprints have a consistent length. Once a team picks a Sprint length, they keep it — consistency creates rhythm and predictability.

During a Sprint:
  - No changes are made that would endanger the Sprint Goal
  - Quality does not decrease
  - The Product Backlog is refined as needed
  - The scope can be clarified with the Product Owner as more is learned

SPRINT PLANNING
Sprint Planning is the first event of every Sprint. The whole Scrum Team collaborates to answer three questions:
  1. WHY is this Sprint valuable? — The team creates the Sprint Goal.
  2. WHAT can be Done this Sprint? — The team selects items from the Product Backlog.
  3. HOW will the work be done? — The Developers plan how to accomplish the selected items.

Sprint Planning is time-boxed to a maximum of eight hours for a one-month Sprint (shorter for shorter Sprints).

THE DAILY SCRUM
The Daily Scrum is a 15-minute event held every day of the Sprint for the Developers. Its purpose is to inspect progress toward the Sprint Goal and adapt the Sprint Backlog if necessary.

The Daily Scrum is not a status report for the Scrum Master or manager. It is the Developers' event to synchronise and plan the next 24 hours of work.

Many teams use three questions as a structure:
  - What did I do yesterday that helped toward the Sprint Goal?
  - What will I do today to help toward the Sprint Goal?
  - Are there any impediments in my way?

SPRINT REVIEW
The Sprint Review is held at the end of the Sprint. The Scrum Team and stakeholders inspect the increment together and discuss what was accomplished and what changed in the environment.

The Sprint Review is NOT a formal presentation or approval meeting. It is a working session — a conversation about what was built, what was learned, and what comes next. The output is a revised Product Backlog.

Time-box: maximum four hours for a one-month Sprint.

SPRINT RETROSPECTIVE
The Sprint Retrospective is the final event of the Sprint. The Scrum Team inspects how the last Sprint went — the people, the relationships, the process, the tools — and creates a plan for improvements to be enacted in the next Sprint.

This is the team's dedicated time to improve. Retrospectives are confidential and honest. The team asks: what went well, what could be improved, and what will we commit to changing?

Time-box: maximum three hours for a one-month Sprint.

THE RHYTHM
Sprint Planning -> Daily Scrum (every day) -> Sprint Review -> Sprint Retrospective -> new Sprint Planning -> repeat.

This cycle creates a steady heartbeat. Problems surface quickly. Improvements happen continuously. The team gets better with every Sprint.`,
      quiz: [
        {
          question: 'What is the maximum time-box for the Daily Scrum?',
          options: ['5 minutes', '15 minutes', '30 minutes', '1 hour'],
          answer: 1,
        },
        {
          question: 'What is the main purpose of the Sprint Retrospective?',
          options: [
            'To demonstrate completed work to stakeholders and get their approval',
            'To plan what the team will build in the next Sprint',
            'For the team to inspect how the last Sprint went and identify improvements for the next Sprint',
            'To report progress to management on deliverables and timelines',
          ],
          answer: 2,
        },
        {
          question: 'In what order do Scrum events occur within a Sprint?',
          options: [
            'Daily Scrum, Sprint Planning, Sprint Review, Sprint Retrospective',
            'Sprint Planning, Daily Scrum (each day), Sprint Review, Sprint Retrospective',
            'Sprint Retrospective, Sprint Planning, Daily Scrum, Sprint Review',
            'Sprint Review, Sprint Planning, Daily Scrum, Sprint Retrospective',
          ],
          answer: 1,
        },
      ],
      exercise: null,
    },
    {
      id: 'scrum-intro-5',
      title: 'Lesson 5: Scrum Artifacts',
      content: `Scrum defines three artifacts — three representations of work or value that provide transparency and create opportunities for inspection and adaptation. Each artifact has a commitment attached to it, which gives the team something concrete to measure against.

THE PRODUCT BACKLOG
The Product Backlog is an ordered list of everything that might be done to improve the product. It is the single source of work for the Scrum Team. Items in the Product Backlog are called Product Backlog Items (PBIs), and they include features, fixes, improvements, and anything else that adds value.

The Product Backlog is:
  - Managed by the Product Owner
  - Never complete — it evolves as the product and its environment change
  - Ordered by value — the most important items appear at the top
  - Refined continuously — items are broken down, estimated, and clarified over time

The commitment for the Product Backlog is the PRODUCT GOAL — a longer-term objective that the team works toward. Every Sprint moves the product closer to the Product Goal.

THE SPRINT BACKLOG
The Sprint Backlog is the Developers' plan for the Sprint. It contains three things:
  1. The Sprint Goal (the WHY)
  2. The set of Product Backlog Items selected for the Sprint (the WHAT)
  3. An actionable plan for delivering the increment (the HOW)

The Sprint Backlog is owned by the Developers. Only they update it. It is a real-time picture of the work remaining, updated throughout the day.

The commitment for the Sprint Backlog is the SPRINT GOAL — a single objective that gives the Sprint coherence. If everything else in the Sprint Backlog turns out to be wrong, the Sprint Goal still gives the team a direction.

THE INCREMENT
The Increment is the sum of all Product Backlog Items completed during the Sprint and all previous Sprints — that is, the running total of everything built so far.

Each Increment must be usable. It does not have to be released, but it must be in a condition where it could be released. Multiple Increments can be created during a single Sprint.

The commitment for the Increment is the DEFINITION OF DONE — a shared understanding of what "done" means. The Definition of Done is a formal description of the quality standards an Increment must meet before it can be considered complete.

THE DEFINITION OF DONE
The Definition of Done is one of the most important concepts in Scrum. It prevents a team from calling work "done" when it is really only partially finished.

A typical Definition of Done for a software team might include:
  - Code written and reviewed by at least one other Developer
  - Unit tests written and passing
  - No known critical defects
  - Documentation updated
  - Accessibility requirements verified

If a Product Backlog Item does not meet the Definition of Done, it cannot be included in the Increment. It goes back to the Product Backlog.

WHY ARTIFACTS MATTER
Without visible, transparent artifacts, Scrum cannot function. The Product Backlog shows what the team might build. The Sprint Backlog shows what the team is building right now. The Increment shows what the team has already built. Together, they make the state of the product completely visible to everyone.`,
      quiz: [
        {
          question: 'Who is responsible for managing and ordering the Product Backlog?',
          options: ['The Scrum Master', 'The Developers', 'The Product Owner', 'The stakeholders'],
          answer: 2,
        },
        {
          question: 'What is the Definition of Done?',
          options: [
            'A list of features the team plans to build by the end of the project',
            'A formal description of the quality standards an Increment must meet to be considered complete',
            'A document the Product Owner writes to explain the product goal',
            'The criteria the Scrum Master uses to evaluate Developer performance',
          ],
          answer: 1,
        },
        {
          question: 'What are the three commitments attached to the three Scrum artifacts?',
          options: [
            'Sprint Goal, Product Goal, and Definition of Done',
            'Product Goal (Product Backlog), Sprint Goal (Sprint Backlog), Definition of Done (Increment)',
            'Definition of Done, Sprint Goal, and Acceptance Criteria',
            'Product Vision, Sprint Target, and Release Criteria',
          ],
          answer: 1,
        },
      ],
      exercise: null,
    },
  ],
};

if (typeof module !== 'undefined') module.exports = scrumIntroModule;
if (typeof window !== 'undefined') window.scrumIntroModule = scrumIntroModule;
