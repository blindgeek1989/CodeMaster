'use strict';

const scrumExamPrepModule = {
  id: 'scrum-exam-prep',
  title: 'Scrum Certification Exam Prep',
  description: 'Prepare for the PSM I (Professional Scrum Master) and CSM (Certified ScrumMaster) certification exams. This module fills the gaps left by the foundational Scrum modules, then puts you through two full-length mock exams written in the exact style of PSM I questions.',
  objectives: [
    'Recall the five Scrum Values and apply them to realistic team scenarios',
    'Explain empiricism and how its three pillars drive every Scrum decision',
    'Identify the most common PSM I exam traps and why they are wrong',
    'Describe Product Backlog refinement, ordering, and the Product Goal commitment',
    'Explain Definition of Done as the commitment of the Increment',
    'Understand the basics of Scrum at Scale (Nexus)',
    'Complete two timed mock exams and review your results',
  ],
  goals: [
    'Score 85% or higher on both mock exams (the PSM I passing threshold)',
    'Explain all five Scrum Values with a concrete workplace example for each',
    'Correctly answer scenario questions about who has authority over each artifact',
    'Identify whether a described behaviour violates the Scrum Guide',
    'Explain what Nexus adds to Scrum for multiple teams',
  ],
  lessons: [
    // ─────────────────────────────────────────────────────────────────
    // LESSON 1 — SCRUM VALUES
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'exam-prep-1',
      title: 'Lesson 1: The Five Scrum Values',
      content: `The Scrum Values are not decorative. They are the behavioural foundation that makes the Scrum framework function. The 2020 Scrum Guide states: "Successful use of Scrum depends on people becoming more proficient in living five values."

The five values are: Commitment, Focus, Openness, Respect, and Courage.

Every PSM I and CSM exam includes questions where a team's behaviour is described and you must judge whether it reflects or violates Scrum values. Memorising the definitions is not enough — you must be able to apply them.

COMMITMENT
Commitment means the Scrum Team commits to achieving its goals and to supporting each other. This is NOT a commitment to deliver every item in the Sprint Backlog — it is a commitment to the Sprint Goal and to doing their best work.

EXAM TRAP: "The team committed to finishing 20 story points but only finished 14. They failed to demonstrate Commitment."
WHY IT IS WRONG: Commitment is to the Sprint Goal, not to a specific number. If the Sprint Goal was met, Commitment was demonstrated. If the team worked hard but faced unexpected complexity, they may still have shown Commitment.

WHAT IT LOOKS LIKE IN PRACTICE:
  - Developers own the Sprint Backlog and adapt it daily to reach the Sprint Goal
  - The Scrum Master commits to serving the team rather than managing them
  - The Product Owner commits to the Product Goal and to being available

FOCUS
Focus means the Scrum Team focuses on the work of the Sprint and the Sprint Goal. Distractions, unplanned work, and mid-Sprint scope additions all violate Focus.

EXAM TRAP: "A senior manager asks a Developer to work on an urgent bug in another system during the Sprint. The Developer should help because it is urgent."
WHY IT IS WRONG: This violates Focus. Any new work during the Sprint must go through the Product Owner, who decides whether the Sprint Goal is at risk and whether to negotiate scope.

WHAT IT LOOKS LIKE IN PRACTICE:
  - The Daily Scrum keeps Developers focused on the Sprint Goal every day
  - The Product Owner protects the team from stakeholder interruptions
  - The Scrum Master removes impediments so the team can stay focused

OPENNESS
Openness means the Scrum Team and stakeholders are open about all the work and challenges. This includes being transparent about progress, problems, and impediments — even when the news is bad.

EXAM TRAP: "A Developer knows the Sprint Goal cannot be met but does not tell anyone because they are worried about looking incompetent."
WHY IT IS WRONG: This violates Openness. Problems must surface immediately so the team can adapt. This is also why the Daily Scrum exists — to inspect progress and surface impediments early.

WHAT IT LOOKS LIKE IN PRACTICE:
  - Sprint Reviews are open to stakeholders — not just good news
  - Retrospectives surface real problems, not just surface-level complaints
  - The Scrum Master creates safety so Openness is possible

RESPECT
Respect means Scrum Team members respect each other as capable, independent people. No role has authority over another. Developers are not resources — they are professionals who own their own work.

EXAM TRAP: "The Scrum Master told the Developers how to solve the technical problem because they were taking too long."
WHY IT IS WRONG: This violates Respect and undermines self-management. Developers are the experts in their own technical domain. The Scrum Master facilitates, coaches, and removes impediments — not direct work.

WHAT IT LOOKS LIKE IN PRACTICE:
  - The Product Owner does not dictate how Developers build the product
  - The Scrum Master does not assign tasks or evaluate performance
  - Retrospectives are a space where all voices carry equal weight

COURAGE
Courage means Scrum Team members have the courage to do the right thing, work on tough problems, and have difficult conversations. This is especially relevant for the Scrum Master.

EXAM TRAP: "The Scrum Master avoided confronting the manager who keeps assigning tasks directly to Developers because they did not want to cause conflict."
WHY IT IS WRONG: This violates Courage. The Scrum Master must protect the team's self-management, even when it means difficult conversations with organisational leadership.

WHAT IT LOOKS LIKE IN PRACTICE:
  - A Developer tells the team the feature will take twice as long as estimated
  - The Scrum Master tells a stakeholder that bypassing the Product Owner is not acceptable
  - The team tells the Product Owner the Sprint Goal is unachievable with the current scope

HOW VALUES CONNECT TO PILLARS
The Scrum Values enable the three pillars of empiricism:
  - Commitment, Focus, and Respect -> enable TRANSPARENCY
  - Openness and Courage -> enable INSPECTION
  - All five values together -> enable ADAPTATION

If the values are absent, empiricism breaks down. If empiricism breaks down, Scrum stops working.`,
      quiz: [
        {
          question: 'A Developer realises on Day 3 of a Sprint that the Sprint Goal cannot be met. They decide to keep working and hope things improve rather than raise the issue. Which Scrum Value is most clearly violated?',
          options: [
            'Commitment',
            'Focus',
            'Openness',
            'Courage',
          ],
          answer: 'Openness',
        },
        {
          question: 'During a Sprint, a stakeholder contacts a Developer directly and asks them to add a new feature. The Developer agrees and starts working on it. Which Scrum Value is most clearly violated?',
          options: [
            'Respect',
            'Focus',
            'Courage',
            'Commitment',
          ],
          answer: 'Focus',
        },
        {
          question: 'The Scrum Master assigns tasks to Developers each morning because they feel the team is not self-organising quickly enough. Which Scrum Value does this most clearly violate?',
          options: [
            'Openness',
            'Commitment',
            'Respect',
            'Focus',
          ],
          answer: 'Respect',
        },
        {
          question: 'According to the Scrum Values, what does "Commitment" mean for Developers during a Sprint?',
          options: [
            'Committing to deliver every item in the Sprint Backlog',
            'Committing to the Sprint Goal and to supporting each other',
            'Committing to work overtime if the Sprint is at risk',
            'Committing to the velocity estimate made in Sprint Planning',
          ],
          answer: 'Committing to the Sprint Goal and to supporting each other',
        },
        {
          question: 'A Scrum Master avoids raising a serious organisational impediment because they fear upsetting senior management. Which Scrum Value are they failing to demonstrate?',
          options: [
            'Focus',
            'Openness',
            'Courage',
            'Commitment',
          ],
          answer: 'Courage',
        },
      ],
      exercise: {
        prompt: 'For each Scrum Value, write a one-sentence description of what violating it looks like in a real team. Use the format: "Violating [Value] looks like..."',
        starterCode: `// Five Scrum Values — write what each violation looks like
// Example: "Violating Commitment looks like a team ignoring the Sprint Goal to work on personal projects."

Violating Commitment looks like...
Violating Focus looks like...
Violating Openness looks like...
Violating Respect looks like...
Violating Courage looks like...`,
        solution: `Violating Commitment looks like: a team treating the Sprint Goal as optional and working on whatever seems interesting.
Violating Focus looks like: Developers accepting tasks from managers mid-Sprint without involving the Product Owner.
Violating Openness looks like: a team hiding impediments at the Daily Scrum to avoid looking behind schedule.
Violating Respect looks like: a Scrum Master telling Developers which technical approach to use.
Violating Courage looks like: a Scrum Master staying silent when an executive bypasses the Product Owner to add scope.`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 2 — EMPIRICISM
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'exam-prep-2',
      title: 'Lesson 2: Empiricism — The Theory Behind Scrum',
      content: `Scrum is founded on empiricism and lean thinking. Understanding this is critical for the exam because many questions ask WHY Scrum works the way it does — not just what the rules are.

WHAT IS EMPIRICISM?
Empiricism means knowledge comes from experience. In Scrum, decisions are made based on what is actually observed, not on predictions or assumptions made at the start of a project.

This is the direct answer to WHY Scrum uses short Sprints, frequent Reviews, and mandatory Retrospectives. Each is an opportunity to observe reality and adapt based on what you actually learn.

EMPIRICISM VS DEFINED PROCESS
A defined process assumes you can predict the future. If you do steps A, B, and C in sequence, you will get result D. This works for simple, repeatable work (manufacturing a product to spec).

Scrum rejects this for complex work — software development, product innovation, organisational change — where the requirements, technology, and environment are unpredictable. In complex work, you discover the path by walking it.

THE THREE PILLARS

PILLAR 1: TRANSPARENCY
Everything significant must be visible to those responsible for the outcome. There must be a shared understanding of what "done" means, what the work is, and how progress is measured.

Transparency is NOT just "making things visible." It requires a shared language. If two people look at the same Sprint Backlog but have different definitions of what "done" means, transparency is broken even though the backlog is public.

This is why the Definition of Done is so important — it creates shared understanding.

PILLAR 2: INSPECTION
Scrum users must frequently inspect the artifacts and progress toward agreed goals to detect undesirable variances or problems.

Inspection happens through the Scrum events:
  - Daily Scrum: inspect progress toward Sprint Goal
  - Sprint Review: inspect the Increment and gather feedback
  - Sprint Retrospective: inspect the team's process and relationships

EXAM TRAP: "Inspection means checking whether Developers are doing their work correctly."
WHY IT IS WRONG: Inspection is about inspecting artifacts and progress toward goals — not inspecting or monitoring individual people. Micromanaging people is the opposite of Scrum.

PILLAR 3: ADAPTATION
If any aspect of the process deviates outside acceptable limits, or the resulting product is unacceptable, the process or material being processed must be adjusted as soon as possible.

Adaptation cannot happen without Transparency and Inspection. You cannot adapt to something you cannot see, and you cannot adapt meaningfully without having inspected it first.

EXAM TRAP: "The team should wait until the Sprint Retrospective to make any process changes."
WHY IT IS WRONG: Adaptation should happen as soon as possible after inspection reveals a problem. If an impediment appears on Day 2, you address it on Day 2 — you do not wait for the Retrospective.

LEAN THINKING
Scrum also incorporates lean thinking, which focuses on:
  - Reducing waste (work that does not add value)
  - Focusing on the whole system, not individual parts
  - Deciding as late as responsibly possible (avoiding premature commitments)
  - Delivering as fast as possible to get feedback

The Scrum Guide explicitly states: "Scrum is founded on empiricism and lean thinking."

THE PILLARS IN EVERY SCRUM EVENT
Sprint Planning:        Transparency of Product Backlog -> Inspection of priorities -> Adaptation into Sprint Backlog
Daily Scrum:           Transparency of daily progress -> Inspection toward Sprint Goal -> Adaptation of plan
Sprint Review:         Transparency of Increment -> Inspection by stakeholders -> Adaptation of Product Backlog
Sprint Retrospective:  Transparency of team dynamics -> Inspection of process -> Adaptation of working practices`,
      quiz: [
        {
          question: 'Scrum is founded on which theoretical framework?',
          options: [
            'Waterfall and defined process control',
            'Empiricism and lean thinking',
            'Agile and extreme programming',
            'Systems thinking and complexity theory',
          ],
          answer: 'Empiricism and lean thinking',
        },
        {
          question: 'A team has a Sprint Backlog that is visible to everyone, but the Developers and the Product Owner have different understandings of what "done" means for each item. Which pillar of empiricism is broken?',
          options: [
            'Inspection',
            'Adaptation',
            'Transparency',
            'All three pillars equally',
          ],
          answer: 'Transparency',
        },
        {
          question: 'During the Daily Scrum, the Developers discover that a third-party API they depend on has changed and will block their work. What should happen?',
          options: [
            'Document the impediment and raise it at the Sprint Retrospective',
            'Wait to see if the API issue resolves itself before raising it',
            'Adapt the plan immediately to address the impediment as soon as possible',
            'Cancel the Sprint and start a new Sprint Planning session',
          ],
          answer: 'Adapt the plan immediately to address the impediment as soon as possible',
        },
        {
          question: 'Which Scrum event MOST directly supports the Adaptation pillar in relation to the product?',
          options: [
            'Daily Scrum',
            'Sprint Planning',
            'Sprint Review',
            'Sprint Retrospective',
          ],
          answer: 'Sprint Review',
        },
        {
          question: 'Why does Scrum use short Sprints instead of one long delivery cycle?',
          options: [
            'To give management more frequent status reports',
            'Because complex work requires frequent opportunities to inspect and adapt based on real experience',
            'To ensure Developers stay productive without long gaps between releases',
            'To comply with the Agile Manifesto requirement for monthly delivery',
          ],
          answer: 'Because complex work requires frequent opportunities to inspect and adapt based on real experience',
        },
      ],
      exercise: {
        prompt: 'Describe how each of the three pillars of empiricism is present in the Sprint Retrospective. Write one sentence per pillar.',
        starterCode: `// How does the Sprint Retrospective demonstrate each pillar?

Transparency in the Retrospective:
Inspection in the Retrospective:
Adaptation in the Retrospective:`,
        solution: `Transparency in the Retrospective: The team makes visible their working practices, relationships, and any problems that may otherwise stay hidden.
Inspection in the Retrospective: The team examines how they worked together during the Sprint to identify what went well and what needs improvement.
Adaptation in the Retrospective: The team creates a concrete plan to improve at least one aspect of their process before the next Sprint begins.`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 3 — SCRUM GUIDE KEY RULES & EXAM TRAPS
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'exam-prep-3',
      title: 'Lesson 3: Scrum Guide Rules and Exam Traps',
      content: `This lesson is a concentrated reference of the most frequently tested Scrum Guide facts and the traps that catch most exam candidates. Study this carefully — many of these appear word-for-word on the PSM I and CSM exams.

SCRUM TEAM
  - A Scrum Team consists of: one Product Owner, one Scrum Master, and Developers
  - There are no sub-teams or hierarchies within a Scrum Team
  - The recommended size is 10 or fewer people
  - If a Scrum Team is too large, consider reorganising into multiple cohesive Scrum Teams
  - The Scrum Master is a member of the Scrum Team but is NOT a manager of the team

TRAP: "The Scrum Master is the team lead." — FALSE. No hierarchy exists.
TRAP: "Developers report to the Product Owner." — FALSE. No reporting structure exists.

SPRINT
  - A Sprint is a time-box of one month or less
  - Sprints have consistent length throughout the product development
  - A new Sprint starts immediately after the previous Sprint ends — there is no gap
  - During a Sprint: no changes that endanger the Sprint Goal, quality does not decrease, Product Backlog is refined as needed, scope may be clarified with the Product Owner
  - Only the Product Owner can cancel a Sprint
  - A Sprint can only be cancelled if the Sprint Goal becomes obsolete
  - Cancellations are rare

TRAP: "The Scrum Master can cancel a Sprint if the team is not making progress." — FALSE. Only the PO can cancel.
TRAP: "Scope cannot change during a Sprint." — FALSE. Scope (items) can be negotiated; the Sprint Goal cannot be changed.

SPRINT PLANNING
  - Time-box: 8 hours maximum for a one-month Sprint (shorter for shorter Sprints)
  - The entire Scrum Team attends Sprint Planning
  - The output is the Sprint Backlog: the Sprint Goal + selected PBIs + a plan for delivering
  - Developers select how much work to bring in from the Product Backlog — the PO cannot force them to take more
  - The Sprint Goal is created during Sprint Planning and represents the single objective
  - The Sprint Goal provides flexibility (Developers can adjust scope to meet the Goal)

TRAP: "The Product Owner assigns the Sprint Backlog items to Developers." — FALSE. Developers self-select.
TRAP: "Sprint Planning produces a schedule for the Sprint." — FALSE. It produces the Sprint Backlog and Sprint Goal.

DAILY SCRUM
  - Time-box: 15 minutes
  - The Daily Scrum is FOR DEVELOPERS — it is their event
  - The Scrum Master is NOT a required attendee; they attend to ensure it happens and is useful
  - The Product Owner is NOT required to attend
  - The three questions format is a suggestion — not mandated by the Scrum Guide
  - The Daily Scrum inspects progress toward the Sprint Goal and adapts the plan

TRAP: "The Scrum Master must run the Daily Scrum." — FALSE. Developers run it; SM ensures it happens.
TRAP: "Attendees must answer the three standard questions." — FALSE. Any useful structure is allowed.
TRAP: "The Daily Scrum is a status meeting for the Scrum Master." — FALSE. It is for Developers, about their plan.

SPRINT REVIEW
  - Time-box: 4 hours maximum for a one-month Sprint
  - The Scrum Team and stakeholders attend
  - Purpose: inspect the Increment and adapt the Product Backlog based on new information
  - The Sprint Review is NOT a demo — it is a working session with stakeholders
  - The output is a revised Product Backlog

TRAP: "The Sprint Review is a sign-off meeting where stakeholders approve the Increment." — FALSE.
TRAP: "Only completed items are shown in the Sprint Review." — NUANCED. Only items meeting the DoD are part of the Increment, but the Review is a conversation, not a showcase.

SPRINT RETROSPECTIVE
  - Time-box: 3 hours maximum for a one-month Sprint
  - The Scrum Team attends (Developers, PO, and SM)
  - Purpose: inspect how the last Sprint went regarding individuals, interactions, processes, tools, and Definition of Done
  - Output: at least one actionable improvement for the next Sprint
  - The Retrospective is the last event of the Sprint (after Sprint Review, before next Sprint Planning)

TRAP: "Stakeholders attend the Retrospective." — FALSE. Only the Scrum Team.
TRAP: "The Retrospective is optional if there is no time." — FALSE. All Scrum events are mandatory.

ARTIFACTS AND COMMITMENTS
  Product Backlog     ->  commitment: Product Goal
  Sprint Backlog      ->  commitment: Sprint Goal
  Increment           ->  commitment: Definition of Done

  - The Product Owner is accountable for the Product Backlog — ordering, content, and transparency
  - Developers are accountable for the Sprint Backlog — they own it, update it daily
  - The Increment must meet the Definition of Done to be released — a PO cannot release an item that does not meet DoD
  - Multiple Increments may be created within a Sprint
  - An Increment is usable even if the PO decides not to release it

TRAP: "The Product Owner manages the Sprint Backlog." — FALSE. Developers own the Sprint Backlog.
TRAP: "The Scrum Master is accountable for the Definition of Done." — FALSE. The Developers create it; if no org-level DoD exists, they define it themselves.`,
      quiz: [
        {
          question: 'Who has the authority to cancel a Sprint?',
          options: [
            'The Scrum Master, if the team is significantly behind',
            'The Product Owner',
            'The Developers, by consensus',
            'The Scrum Team, by unanimous vote',
          ],
          answer: 'The Product Owner',
        },
        {
          question: 'The Daily Scrum is time-boxed to 15 minutes. Who is it primarily designed for?',
          options: [
            'The Scrum Master, to track team progress',
            'The Product Owner, to verify Sprint Goal progress',
            'The Developers, to inspect and adapt their Sprint plan',
            'All stakeholders who want to know the team\'s status',
          ],
          answer: 'The Developers, to inspect and adapt their Sprint plan',
        },
        {
          question: 'During Sprint Planning, the Product Owner wants the team to commit to 30 story points. The Developers believe they can only complete 20 points reliably. What should happen?',
          options: [
            'The Scrum Master decides how much work the team takes',
            'The Developers select how much work they can complete — the PO cannot force more',
            'The team splits the difference and commits to 25 points',
            'The Sprint is cancelled and replanned with a smaller scope',
          ],
          answer: 'The Developers select how much work they can complete — the PO cannot force more',
        },
        {
          question: 'Which of the following is the correct time-box for a Sprint Retrospective in a four-week Sprint?',
          options: [
            '1 hour',
            '2 hours',
            '3 hours',
            '4 hours',
          ],
          answer: '3 hours',
        },
        {
          question: 'What is the commitment associated with the Increment artifact?',
          options: [
            'The Sprint Goal',
            'The Product Goal',
            'The Definition of Done',
            'The Release Plan',
          ],
          answer: 'The Definition of Done',
        },
        {
          question: 'A Scrum Team finishes the Sprint Review and Retrospective. When does the next Sprint begin?',
          options: [
            'The following Monday, to give the team a buffer',
            'Immediately after the previous Sprint ends',
            'After the Scrum Master approves the Sprint Backlog',
            'Once the Product Owner orders the Product Backlog for the new Sprint',
          ],
          answer: 'Immediately after the previous Sprint ends',
        },
      ],
      exercise: {
        prompt: 'List all five Scrum events with their time-boxes for a one-month Sprint. Then write one sentence explaining what each event is NOT (a common exam trap).',
        starterCode: `// Event | Time-box | What it is NOT

Sprint:
Sprint Planning:
Daily Scrum:
Sprint Review:
Sprint Retrospective:`,
        solution: `Sprint: up to 1 month | Not a phase in a Waterfall plan — it is a container for all other events.
Sprint Planning: 8 hours max | Not a meeting where the PO assigns work — Developers self-select.
Daily Scrum: 15 minutes | Not a status report to the Scrum Master — it is the Developers' own planning session.
Sprint Review: 4 hours max | Not a demo or sign-off meeting — it is a collaborative working session with stakeholders.
Sprint Retrospective: 3 hours max | Not optional — it is mandatory and inspects team process, not just the product.`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 4 — PRODUCT BACKLOG IN DEPTH
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'exam-prep-4',
      title: 'Lesson 4: Product Backlog, Refinement, and the Product Goal',
      content: `The Product Backlog is tested deeply on the PSM I. You must know not just what it is but how it is managed, who owns it, and what its commitment (the Product Goal) means.

WHAT THE PRODUCT BACKLOG IS
The Product Backlog is an emergent, ordered list of what is needed to improve the product. It is the single source of work undertaken by the Scrum Team.

Key properties:
  - ORDERED: Items at the top are more refined and ready to be worked on. The Product Owner orders the backlog.
  - EMERGENT: It is never complete. It evolves as the product and its environment change.
  - TRANSPARENT: All Product Backlog items must be visible to stakeholders.
  - SINGLE SOURCE: There is one Product Backlog per product, regardless of how many Scrum Teams work on it.

TRAP: "The Product Backlog is prioritised." — The Scrum Guide uses the word ORDERED, not prioritised. Priority is one factor in ordering, but value, risk, dependency, and learning all influence order too.

WHO OWNS THE PRODUCT BACKLOG
The Product Owner is accountable for the Product Backlog. This means:
  - Only the PO decides the order of items
  - The PO is accountable for maximising the value of the product
  - The PO may delegate backlog management work to others, but remains accountable for it
  - The PO is one person, not a committee

TRAP: "The team or Scrum Master can reorder the backlog if the PO is unavailable." — FALSE. The PO retains accountability even if they delegate some work.

PRODUCT BACKLOG REFINEMENT
Refinement is the act of breaking down and adding detail to Product Backlog items — adding detail, estimates, and order. It is an ongoing activity, not a formal Scrum event.

Key facts:
  - Refinement is not a separate Scrum event (not one of the five events)
  - The Scrum Team collaborates on refinement — it is not just the PO's job
  - Refined items at the top of the backlog are ready for Sprint Planning
  - Refinement typically consumes no more than 10% of the Developers' capacity

WHAT MAKES A GOOD PRODUCT BACKLOG ITEM?
Many teams use the INVEST criteria (not from the Scrum Guide but widely tested):
  - Independent: can be delivered independently from others
  - Negotiable: details can be discussed and adjusted
  - Valuable: delivers value to users or stakeholders
  - Estimable: the team can estimate its size
  - Small: fits within a Sprint
  - Testable: the team knows when it is done

THE PRODUCT GOAL
The Product Goal is the commitment for the Product Backlog. It describes the future state of the product and serves as a long-term objective for the Scrum Team.

  - The Scrum Team pursues one Product Goal at a time
  - A Product Goal is fulfilled or abandoned before a new one is adopted
  - The Product Backlog defines the WHAT needed to achieve the Product Goal

EXAM TRAP: "The Product Goal is the same as the product roadmap." — FALSE. The Product Goal is a single, focused long-term objective. A roadmap may span multiple Product Goals.

SPRINT BACKLOG vs PRODUCT BACKLOG
Product Backlog:
  - Owned by the Product Owner
  - Contains all future work for the product
  - Ordered by the PO

Sprint Backlog:
  - Owned by the Developers
  - Contains the Sprint Goal, selected PBIs, and the plan for the Sprint
  - Updated daily by Developers
  - The PO cannot add to or change the Sprint Backlog without negotiating with Developers`,
      quiz: [
        {
          question: 'The Scrum Guide describes the Product Backlog as "ordered" rather than "prioritised." What does this distinction mean?',
          options: [
            'Nothing — the two words mean the same thing in Scrum',
            'Ordering reflects that value, risk, dependency, and learning all influence item sequence — not just priority',
            'It means the Product Backlog is sorted alphabetically',
            'It means only technical items are placed at the top regardless of business value',
          ],
          answer: 'Ordering reflects that value, risk, dependency, and learning all influence item sequence — not just priority',
        },
        {
          question: 'Product Backlog refinement is best described as:',
          options: [
            'A formal Scrum event that happens once per Sprint',
            'An activity the Product Owner performs alone before Sprint Planning',
            'An ongoing collaborative activity to add detail and order to backlog items',
            'A meeting the Scrum Master schedules to estimate story points',
          ],
          answer: 'An ongoing collaborative activity to add detail and order to backlog items',
        },
        {
          question: 'A product has three Scrum Teams working on it. How many Product Backlogs should there be?',
          options: [
            'Three — one per Scrum Team',
            'One per Product Owner',
            'One — a single Product Backlog for the product',
            'As many as needed to keep teams from blocking each other',
          ],
          answer: 'One — a single Product Backlog for the product',
        },
        {
          question: 'The Product Owner is going on vacation. They ask the Scrum Master to manage and reorder the Product Backlog while they are away. Is this acceptable?',
          options: [
            'Yes — the Scrum Master can manage the backlog in the PO\'s absence',
            'Yes — any Scrum Team member may manage the backlog temporarily',
            'No — the Product Owner retains accountability and should remain available or delegate to another PO',
            'No — the Developers should manage the backlog themselves to stay self-organising',
          ],
          answer: 'No — the Product Owner retains accountability and should remain available or delegate to another PO',
        },
        {
          question: 'What is the Product Goal?',
          options: [
            'The list of features the team will build in the next three Sprints',
            'The long-term objective for the Scrum Team that the Product Backlog works toward',
            'The business case written by the Product Owner before the project begins',
            'The measure of velocity the team aims to reach by the end of the quarter',
          ],
          answer: 'The long-term objective for the Scrum Team that the Product Backlog works toward',
        },
      ],
      exercise: {
        prompt: 'List three key differences between the Product Backlog and the Sprint Backlog. Focus on ownership, content, and how each can be changed.',
        starterCode: `// Product Backlog vs Sprint Backlog — three key differences

Difference 1 (Ownership):
Difference 2 (Content):
Difference 3 (How it can be changed):`,
        solution: `Difference 1 (Ownership): The Product Owner is accountable for the Product Backlog; the Developers own the Sprint Backlog.
Difference 2 (Content): The Product Backlog contains all future work for the product; the Sprint Backlog contains the Sprint Goal, selected items for the Sprint, and the delivery plan.
Difference 3 (How it can be changed): The PO orders and updates the Product Backlog continuously; the Sprint Backlog is updated daily by Developers and the PO cannot add to it without negotiating with the Developers.`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 5 — DEFINITION OF DONE
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'exam-prep-5',
      title: 'Lesson 5: Definition of Done and the Increment',
      content: `The Definition of Done (DoD) is one of the most tested topics on the PSM I. It is also one of the most misunderstood concepts in Scrum practice.

WHAT THE DEFINITION OF DONE IS
The Definition of Done is a formal description of the state of the Increment when it meets the quality measures required for the product.

In plain terms: it is a shared checklist that defines what "complete" means. Without it, different people have different assumptions about what "done" means — which destroys Transparency.

THE DOD IS THE COMMITMENT OF THE INCREMENT
Just as the Sprint Goal is the commitment of the Sprint Backlog, and the Product Goal is the commitment of the Product Backlog — the Definition of Done is the commitment of the Increment.

WHO CREATES THE DOD?
  - If the organisation has an existing DoD standard, the Scrum Team must follow it as a minimum
  - If no organisational standard exists, the Developers create the DoD for their Scrum Team
  - Multiple Scrum Teams working on one product must share a mutually agreed DoD

TRAP: "The Product Owner defines the Definition of Done." — FALSE. Developers create it.
TRAP: "The Scrum Master approves the Definition of Done." — FALSE. There is no approval — Developers define it.

WHAT HAPPENS WHEN AN ITEM DOES NOT MEET THE DOD
  - The item does NOT become part of the Increment
  - The item is returned to the Product Backlog for future consideration
  - The Product Owner CANNOT release an item that does not meet the DoD
  - Items failing the DoD are NOT considered done and must not be presented as done in the Sprint Review

TRAP: "The Product Owner can accept an item even if it doesn't meet DoD, if the stakeholder needs it now." — FALSE. The DoD is non-negotiable for what constitutes an Increment.

THE RELATIONSHIP BETWEEN DOD AND QUALITY
The Definition of Done ensures the Increment is always usable. It is not just a test checklist — it includes everything that must be true for the Increment to be transparent and potentially releasable.

Typical DoD items:
  - Code written and reviewed
  - Unit tests passed
  - Integration tests passed
  - Accessibility requirements met
  - Documentation updated
  - Deployed to staging environment

UNDONE WORK
If a team consistently fails to meet the DoD, the unconventional items pile up as "undone work." This is a form of technical debt and violates transparency — the true state of the product is hidden.

The Scrum Guide notes that if the DoD for an Increment is part of the standards of the organisation, all Scrum Teams must follow it as a minimum.

THE INCREMENT
  - The Increment is the sum of all completed Product Backlog items during a Sprint, plus the value of previous Increments
  - Each Increment is additive to prior Increments
  - Multiple Increments may be created within a Sprint
  - The Increment must be usable — whether or not the PO decides to release it
  - Work does not become an Increment unless it meets the DoD

TRAP: "The Increment is only what was delivered in the current Sprint." — FALSE. It is cumulative — all previous Increments plus new completed work.`,
      quiz: [
        {
          question: 'A Product Owner wants to release a feature to customers urgently. The Developers say it does not yet meet the Definition of Done. What should happen?',
          options: [
            'The Product Owner can release it with a note that it is a partial release',
            'The Scrum Master makes the final call on whether to release',
            'The feature cannot be released — items not meeting the DoD are not part of the Increment',
            'The team votes and the majority decision determines whether it ships',
          ],
          answer: 'The feature cannot be released — items not meeting the DoD are not part of the Increment',
        },
        {
          question: 'If no organisational Definition of Done exists, who creates one for the Scrum Team?',
          options: [
            'The Product Owner',
            'The Scrum Master',
            'The Developers',
            'The stakeholders, as they determine what quality means',
          ],
          answer: 'The Developers',
        },
        {
          question: 'What is the Definition of Done in relation to the Increment artifact?',
          options: [
            'A suggested quality checklist',
            'The commitment of the Increment',
            'A management approval gate',
            'A release checklist defined by the Product Owner',
          ],
          answer: 'The commitment of the Increment',
        },
        {
          question: 'Three Scrum Teams are working on the same product. How should the Definition of Done be handled?',
          options: [
            'Each team defines their own DoD independently',
            'The Scrum Masters from each team agree on a single DoD',
            'The Product Owner defines one DoD for all three teams',
            'All three teams must have a mutually agreed Definition of Done for the product',
          ],
          answer: 'All three teams must have a mutually agreed Definition of Done for the product',
        },
        {
          question: 'A team completes 8 out of 10 Sprint Backlog items. The 2 incomplete items do not meet the Definition of Done. What happens to those 2 items?',
          options: [
            'They are marked as partially complete and counted as 50% velocity',
            'They are returned to the Product Backlog for future consideration',
            'They carry over automatically to the next Sprint Backlog',
            'The Product Owner decides whether to accept them anyway',
          ],
          answer: 'They are returned to the Product Backlog for future consideration',
        },
      ],
      exercise: {
        prompt: 'Write a sample Definition of Done for a web development team building an accessible web application. Include at least 6 criteria that would need to be true before any item is considered "done."',
        starterCode: `// Definition of Done — Accessible Web Application Team
// List at least 6 criteria that must ALL be true for an item to be "done"

1.
2.
3.
4.
5.
6.`,
        solution: `1. Code has been peer-reviewed by at least one other Developer
2. All automated unit tests pass with no failures
3. The feature is accessible: keyboard operable, screen reader compatible, passes axe automated scan
4. Colour contrast meets WCAG 2.1 AA for all text and interactive elements
5. The feature has been tested in at least two browsers (Chrome and Firefox)
6. Any new user-facing text has been reviewed for plain language
7. The feature is deployed to the staging environment and passes smoke tests
8. Relevant documentation (README, API docs, or inline comments) has been updated`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 6 — SCRUM AT SCALE (NEXUS)
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'exam-prep-6',
      title: 'Lesson 6: Scaling Scrum — Nexus',
      content: `The PSM I tests basic awareness of how Scrum scales. Nexus is the scaling framework developed by Scrum.org and is the one most directly referenced in PSM I preparation materials. You do not need deep expertise — you need to understand the core concepts.

WHY SCALING IS NEEDED
A single Scrum Team is typically 10 or fewer people. When a product is too large for one team, organisations must coordinate multiple Scrum Teams working on the same product.

The challenge: multiple teams can create integration problems, duplicated work, and conflicting decisions. Scaling frameworks address this coordination challenge.

NEXUS — THE BASICS
Nexus is a framework for scaling Scrum to three to nine Scrum Teams working on a single Product Backlog for a single product.

Nexus ADDS to Scrum — it does not replace it. Every team in a Nexus still runs full Scrum with all five events.

WHAT NEXUS ADDS
ONE NEW ROLE: The Nexus Integration Team
  - Responsible for ensuring the Increment is integrated and usable at the end of every Sprint
  - Consists of: one Product Owner, one Scrum Master, and Nexus Integration Team members (typically Developers from member teams)
  - There is still only ONE Product Owner and ONE Product Backlog

THREE NEW EVENTS (added around existing Scrum events):
  1. Nexus Sprint Planning — the teams coordinate which team takes which backlog items, identifying dependencies
  2. Nexus Daily Scrum — representatives from each team share integration issues
  3. Nexus Sprint Retrospective — three parts: overall inspection, individual team retros, consolidating improvements

ONE EXPANDED ARTIFACT:
  - Nexus Sprint Backlog — shows items from the Sprint Backlogs of all teams and their dependencies

THE INTEGRATED INCREMENT
The goal of Nexus is an Integrated Increment at the end of every Sprint — one working, tested, integrated product built by multiple teams.

This requires:
  - Continuous integration practices
  - Shared Definition of Done across all teams
  - Proactive management of dependencies

OTHER SCALING APPROACHES (AWARENESS LEVEL)
The PSM I may also reference:
  - LeSS (Large-Scale Scrum): scales Scrum with minimal additional roles and events; focuses on keeping things simple
  - SAFe (Scaled Agile Framework): more prescriptive; adds many roles and processes; often criticised for complexity
  - Scrum of Scrums: an informal technique (not a framework) where representatives from each team meet to coordinate

For the PSM I exam, Nexus knowledge is most important. Awareness of LeSS and that other frameworks exist is sufficient.`,
      quiz: [
        {
          question: 'Nexus is designed for how many Scrum Teams working on a single product?',
          options: [
            '2 to 5 teams',
            '3 to 9 teams',
            '5 to 15 teams',
            'Any number of teams',
          ],
          answer: '3 to 9 teams',
        },
        {
          question: 'In a Nexus, how many Product Backlogs exist?',
          options: [
            'One per Scrum Team',
            'One per Product Owner',
            'One for the entire Nexus',
            'One per major feature area',
          ],
          answer: 'One for the entire Nexus',
        },
        {
          question: 'What is the primary responsibility of the Nexus Integration Team?',
          options: [
            'Managing the Product Owner\'s time and stakeholder communication',
            'Ensuring the Increment is integrated and usable at the end of every Sprint',
            'Assigning backlog items to each Scrum Team',
            'Running the Nexus Daily Scrum for all teams',
          ],
          answer: 'Ensuring the Increment is integrated and usable at the end of every Sprint',
        },
        {
          question: 'A Nexus has five Scrum Teams. How does Nexus affect the Scrum events for each individual team?',
          options: [
            'Individual team events are replaced by Nexus-level events',
            'Individual teams still run all five Scrum events — Nexus adds coordination events around them',
            'Individual teams only run the Daily Scrum; all other events are Nexus-level',
            'Nexus teams skip the Sprint Retrospective — it is handled at the Nexus level only',
          ],
          answer: 'Individual teams still run all five Scrum events — Nexus adds coordination events around them',
        },
      ],
      exercise: {
        prompt: 'In your own words, explain why a single shared Definition of Done is especially important when multiple Scrum Teams work on the same product.',
        starterCode: `// Why is a shared Definition of Done critical in a scaled environment?
// Write 3-5 sentences explaining the risks of multiple teams having different DoDs.`,
        solution: `When multiple Scrum Teams work on the same product, each team's output must integrate into a single Increment. If each team has a different Definition of Done, what one team considers "complete" may not meet another team's quality standards, causing integration failures. A shared DoD ensures every team's work is at the same level of quality before integration, which means the combined Increment is actually usable. Without a shared DoD, transparency is broken — stakeholders and other teams cannot trust that "done" means the same thing across teams. This is especially critical for accessibility and security requirements, which must be uniformly applied across the entire product.`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 7 — MOCK EXAM 1
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'exam-prep-7',
      title: 'Mock Exam 1 — 40 PSM I Style Questions',
      content: `This is Mock Exam 1. It contains 40 scenario-based questions written in the style of PSM I and CSM certification exams.

PSM I PASSING THRESHOLD: 85% (34 out of 40 correct)
CSM PASSING THRESHOLD: 74% (30 out of 40 correct)

HOW TO USE THIS EXAM:
  - Answer each question based on the Scrum Guide (2020 edition) — not based on how your organisation works
  - When in doubt, ask: "What does the Scrum Guide say?" — not "What would be practical?"
  - Many questions describe a situation and ask what the Scrum Master SHOULD do
  - The correct answer is usually the one that supports self-management, empiricism, and Scrum values
  - The wrong answers usually involve the Scrum Master taking control, assigning tasks, or bypassing the framework

Use the Timed Exam Mode (available from the module menu) to simulate real exam conditions with a 60-minute countdown.`,
      quiz: [
        {
          question: 'A Development Team member is pulled into another project by their line manager mid-Sprint. What should the Scrum Master do?',
          options: [
            'Tell the Developer to complete the other project first, then return to Sprint work',
            'Update the Sprint Backlog to reflect the reduced capacity and inform the Product Owner',
            'Help the team understand the impact and coach the organisation on protecting the team\'s focus',
            'Cancel the Sprint and re-plan with the reduced team size',
          ],
          answer: 'Help the team understand the impact and coach the organisation on protecting the team\'s focus',
        },
        {
          question: 'True or False: The Scrum Master is required to attend the Daily Scrum.',
          options: [
            'True — the Scrum Master facilitates all Scrum events',
            'True — the Scrum Master must verify the team is making progress',
            'False — the Daily Scrum is for Developers; the Scrum Master ensures it happens but need not attend',
            'False — no one outside the Development Team may attend the Daily Scrum',
          ],
          answer: 'False — the Daily Scrum is for Developers; the Scrum Master ensures it happens but need not attend',
        },
        {
          question: 'The Product Owner is unavailable during Sprint Planning. What should the Scrum Master do?',
          options: [
            'Run Sprint Planning without the Product Owner and present the results later',
            'Cancel Sprint Planning and postpone the Sprint until the PO is available',
            'Allow the most senior Developer to act as Product Owner for the session',
            'Postpone Sprint Planning and work with the organisation to ensure the PO attends',
          ],
          answer: 'Postpone Sprint Planning and work with the organisation to ensure the PO attends',
        },
        {
          question: 'A Scrum Team has been using the same Sprint length for months but management wants to shorten it. Who decides the Sprint length?',
          options: [
            'Management, as they set the organisational delivery cadence',
            'The Product Owner, as they are accountable for value',
            'The Scrum Master, as they are responsible for the Scrum process',
            'The Scrum Team, as Sprint length is part of how they organise their work',
          ],
          answer: 'The Scrum Team, as Sprint length is part of how they organise their work',
        },
        {
          question: 'Halfway through a Sprint, the team realises they have taken on too much work and cannot complete the Sprint Goal. What should they do?',
          options: [
            'Cancel the Sprint and start over with a smaller scope',
            'Work overtime to ensure all Sprint Backlog items are completed',
            'Negotiate with the Product Owner to reduce scope while keeping the Sprint Goal intact',
            'Remove the Sprint Goal so the team can focus on individual items',
          ],
          answer: 'Negotiate with the Product Owner to reduce scope while keeping the Sprint Goal intact',
        },
        {
          question: 'Which statement about the Sprint Goal is correct?',
          options: [
            'The Sprint Goal is optional — small teams can skip it',
            'The Sprint Goal is created during Sprint Planning and is the commitment of the Sprint Backlog',
            'The Product Owner sets the Sprint Goal before Sprint Planning begins',
            'The Sprint Goal can be changed by the Product Owner if business priorities shift',
          ],
          answer: 'The Sprint Goal is created during Sprint Planning and is the commitment of the Sprint Backlog',
        },
        {
          question: 'A stakeholder approaches a Developer during the Sprint and asks for a quick feature addition. The Developer agrees and adds it to the Sprint Backlog. Is this acceptable?',
          options: [
            'Yes — Developers can add small items if the Sprint Goal is not at risk',
            'Yes — self-managing teams have the authority to adjust their own backlog',
            'No — all new work must go through the Product Owner, who decides if the Sprint Goal is affected',
            'No — the Scrum Master must approve any Sprint Backlog changes',
          ],
          answer: 'No — all new work must go through the Product Owner, who decides if the Sprint Goal is affected',
        },
        {
          question: 'When should the Definition of Done be created?',
          options: [
            'Before the first Sprint, during Sprint Zero',
            'At the start of the first Sprint, if no organisational standard exists',
            'During the first Sprint Review, once the team has seen what "done" looks like',
            'After the first Sprint, so the team has practical experience to draw from',
          ],
          answer: 'At the start of the first Sprint, if no organisational standard exists',
        },
        {
          question: 'A Scrum Master notices the team\'s velocity has dropped over the last three Sprints. What is the MOST appropriate first step?',
          options: [
            'Increase the team\'s working hours to compensate',
            'Raise the issue in the next Sprint Retrospective so the team can inspect and adapt',
            'Reduce the Sprint Backlog size to prevent further underperformance',
            'Report the velocity drop to management and request additional resources',
          ],
          answer: 'Raise the issue in the next Sprint Retrospective so the team can inspect and adapt',
        },
        {
          question: 'Which of the following is NOT a Scrum artifact?',
          options: [
            'Product Backlog',
            'Sprint Backlog',
            'Increment',
            'Sprint Burndown Chart',
          ],
          answer: 'Sprint Burndown Chart',
        },
        {
          question: 'The Scrum Guide says the Scrum Master serves the organisation. Which of the following BEST describes this service?',
          options: [
            'Attending executive meetings to represent the team\'s interests',
            'Leading and coaching the organisation in Scrum adoption and empirical approaches',
            'Hiring and staffing the Scrum Team with the right skills',
            'Reporting team velocity and progress to organisational leadership',
          ],
          answer: 'Leading and coaching the organisation in Scrum adoption and empirical approaches',
        },
        {
          question: 'A product has two Scrum Teams. Team A has a Definition of Done that includes accessibility testing; Team B does not. Is this acceptable?',
          options: [
            'Yes — each team is self-managing and defines their own DoD',
            'Yes — as long as Team A\'s Increment passes accessibility tests',
            'No — multiple teams on the same product must have a mutually agreed Definition of Done',
            'No — the Product Owner must define one DoD for all teams',
          ],
          answer: 'No — multiple teams on the same product must have a mutually agreed Definition of Done',
        },
        {
          question: 'Scrum is described as a framework. What does this mean?',
          options: [
            'Scrum is a complete methodology with detailed instructions for every situation',
            'Scrum provides a lightweight structure within which teams can apply various techniques',
            'Scrum is a project management tool with built-in templates and reports',
            'Scrum is a set of best practices that replaces all other processes',
          ],
          answer: 'Scrum provides a lightweight structure within which teams can apply various techniques',
        },
        {
          question: 'Who is accountable for maximising the value of the product?',
          options: [
            'The Scrum Master',
            'The Developers',
            'The Product Owner',
            'The Scrum Team collectively',
          ],
          answer: 'The Product Owner',
        },
        {
          question: 'A manager tells the Scrum Master to track individual Developer productivity metrics. What should the Scrum Master do?',
          options: [
            'Implement the metrics as requested — the Scrum Master serves the organisation',
            'Track the metrics privately and only share aggregated results',
            'Explain why individual tracking undermines self-management and suggest team-level metrics instead',
            'Ask the Developers to track their own productivity and self-report',
          ],
          answer: 'Explain why individual tracking undermines self-management and suggest team-level metrics instead',
        },
        {
          question: 'True or False: A Sprint can be extended if the team has not completed all Sprint Backlog items.',
          options: [
            'True — the Scrum Master can approve a Sprint extension to protect quality',
            'True — the Product Owner can extend the Sprint if business value is at risk',
            'False — Sprints have a fixed length and do not extend; incomplete items return to the Product Backlog',
            'False — only management can approve a Sprint extension in exceptional circumstances',
          ],
          answer: 'False — Sprints have a fixed length and do not extend; incomplete items return to the Product Backlog',
        },
        {
          question: 'During the Sprint Review, stakeholders ask for a feature that was not in the original Sprint Backlog. What happens with this request?',
          options: [
            'The team adds it to the current Sprint immediately if there is capacity',
            'The Scrum Master logs it and schedules it for the next Sprint',
            'The Product Owner considers it and may add it to the Product Backlog for future ordering',
            'It is rejected — scope changes must be requested before Sprint Planning',
          ],
          answer: 'The Product Owner considers it and may add it to the Product Backlog for future ordering',
        },
        {
          question: 'The Scrum Team is consistently failing to meet the Sprint Goal. Which Scrum event is MOST designed to address this pattern?',
          options: [
            'Daily Scrum',
            'Sprint Review',
            'Sprint Retrospective',
            'Sprint Planning',
          ],
          answer: 'Sprint Retrospective',
        },
        {
          question: 'Who can add items to the Sprint Backlog during a Sprint?',
          options: [
            'Only the Product Owner',
            'Only the Scrum Master',
            'The Developers, in collaboration with the Product Owner when needed',
            'Any stakeholder with a request that supports the Sprint Goal',
          ],
          answer: 'The Developers, in collaboration with the Product Owner when needed',
        },
        {
          question: 'An organisation requires all Scrum Teams to include a security review in their Definition of Done. A Scrum Team wants to remove this requirement. Is this acceptable?',
          options: [
            'Yes — the Scrum Team is self-managing and defines their own DoD',
            'Yes — if the team can demonstrate the security risk is low',
            'No — if an organisational DoD standard exists, the team must follow it as a minimum',
            'No — only the Scrum Master can approve changes to the DoD',
          ],
          answer: 'No — if an organisational DoD standard exists, the team must follow it as a minimum',
        },
        {
          question: 'Scrum is founded on which two concepts?',
          options: [
            'Agile and Lean',
            'Empiricism and Lean thinking',
            'Transparency and Inspection',
            'Self-management and Cross-functionality',
          ],
          answer: 'Empiricism and Lean thinking',
        },
        {
          question: 'A Scrum Team decides to skip the Sprint Retrospective because the Sprint went well. Is this acceptable?',
          options: [
            'Yes — the Retrospective is optional if there are no issues to discuss',
            'Yes — experienced teams can decide which events to hold',
            'No — all Scrum events are mandatory regardless of Sprint outcome',
            'No — only the Scrum Master can decide to cancel a Scrum event',
          ],
          answer: 'No — all Scrum events are mandatory regardless of Sprint outcome',
        },
        {
          question: 'What is the maximum size recommended for a Scrum Team?',
          options: [
            '5 people',
            '7 people',
            '10 people',
            '15 people',
          ],
          answer: '10 people',
        },
        {
          question: 'The Scrum Master is asked to create a project plan and Gantt chart for the upcoming Sprints. What should they do?',
          options: [
            'Create the Gantt chart — detailed planning helps the organisation understand progress',
            'Create the plan but present it as a forecast, not a commitment',
            'Explain that Scrum uses empirical planning rather than fixed upfront plans, and suggest alternatives',
            'Ask the Product Owner to create the plan since they own the roadmap',
          ],
          answer: 'Explain that Scrum uses empirical planning rather than fixed upfront plans, and suggest alternatives',
        },
        {
          question: 'A new Product Owner has started and wants to completely reorder the Product Backlog before the next Sprint. Is this within their authority?',
          options: [
            'Yes — the Product Owner has full authority to order the Product Backlog',
            'Yes — but only after consulting with each Developer',
            'No — the Scrum Master must approve significant backlog changes',
            'No — the previous ordering must be preserved for at least one more Sprint',
          ],
          answer: 'Yes — the Product Owner has full authority to order the Product Backlog',
        },
        {
          question: 'How does the Scrum Master handle a conflict between two Developers?',
          options: [
            'Make a decision and tell both Developers how to resolve it',
            'Escalate to management so a neutral party can decide',
            'Coach the team to resolve the conflict themselves, stepping in to facilitate if needed',
            'Remove the lower-performing Developer from the team',
          ],
          answer: 'Coach the team to resolve the conflict themselves, stepping in to facilitate if needed',
        },
        {
          question: 'Which of the following events results in an inspected Increment AND an adapted Product Backlog?',
          options: [
            'Daily Scrum',
            'Sprint Planning',
            'Sprint Review',
            'Sprint Retrospective',
          ],
          answer: 'Sprint Review',
        },
        {
          question: 'True or False: The Product Owner may be a committee of stakeholders who collectively make backlog decisions.',
          options: [
            'True — large products often require a committee Product Owner',
            'True — but the committee must appoint one spokesperson',
            'False — the Product Owner is one person, not a committee',
            'False — committees are allowed only in scaled Scrum frameworks',
          ],
          answer: 'False — the Product Owner is one person, not a committee',
        },
        {
          question: 'A Scrum Master sees that the team\'s Daily Scrum has become a lengthy status report to management. What should the Scrum Master do?',
          options: [
            'Allow it — keeping management informed is part of organisational service',
            'Coach the team and protect the Daily Scrum as a Developer planning event, not a status meeting',
            'Attend the Daily Scrum and redirect it back to the three standard questions',
            'Create a separate management meeting so the Daily Scrum is kept shorter',
          ],
          answer: 'Coach the team and protect the Daily Scrum as a Developer planning event, not a status meeting',
        },
        {
          question: 'How many Scrum Masters does a typical Scrum Team have?',
          options: [
            'One per five Developers',
            'One',
            'Two — a primary and a backup',
            'It depends on the team size',
          ],
          answer: 'One',
        },
        {
          question: 'What should a Scrum Master do if a Developer is consistently blocked by a slow approval process outside the team?',
          options: [
            'Tell the Developer to work around the approval process',
            'Document the issue in the Sprint Backlog as a task',
            'Cause the removal of the impediment by working with the organisation to fix the process',
            'Accept it as an external constraint and adjust capacity planning',
          ],
          answer: 'Cause the removal of the impediment by working with the organisation to fix the process',
        },
        {
          question: 'The Increment at the end of a Sprint must be:',
          options: [
            'Released to production',
            'Approved by the Product Owner before it can be used',
            'Usable and meeting the Definition of Done',
            'Demonstrated to all stakeholders before it counts',
          ],
          answer: 'Usable and meeting the Definition of Done',
        },
        {
          question: 'A team\'s velocity has been very consistent. The Product Owner uses it to forecast when the Product Goal will be achieved. Is this a good use of velocity?',
          options: [
            'No — velocity is a measure of team health, not a planning tool',
            'Yes — consistent velocity makes it a useful input for product-level forecasting',
            'No — only the Scrum Master may use velocity data for forecasting',
            'Yes — but only if the forecast is shared as a guarantee with stakeholders',
          ],
          answer: 'Yes — consistent velocity makes it a useful input for product-level forecasting',
        },
        {
          question: 'During a Sprint, the Developers discover the selected approach will not work. What should they do?',
          options: [
            'Continue with the approach and raise it in the Retrospective',
            'Wait for the Daily Scrum to inform the Scrum Master',
            'Adapt immediately — collaborate within the Scrum Team to find a solution that still meets the Sprint Goal',
            'Cancel the Sprint and re-plan with a different technical approach',
          ],
          answer: 'Adapt immediately — collaborate within the Scrum Team to find a solution that still meets the Sprint Goal',
        },
        {
          question: 'Scrum events are designed to:',
          options: [
            'Replace traditional project meetings with shorter alternatives',
            'Create regularity and minimise the need for unplanned meetings',
            'Keep management informed of team progress at regular intervals',
            'Give the Scrum Master structured opportunities to evaluate the team',
          ],
          answer: 'Create regularity and minimise the need for unplanned meetings',
        },
        {
          question: 'A manager insists the team use a specific technical tool. The Developers believe a different tool is better. Who decides?',
          options: [
            'The manager — they are accountable for the tools budget',
            'The Scrum Master — they are responsible for the team\'s effectiveness',
            'The Developers — they are accountable for the technical decisions',
            'The Product Owner — they are accountable for value delivered',
          ],
          answer: 'The Developers — they are accountable for the technical decisions',
        },
        {
          question: 'Which statement about Scrum is TRUE?',
          options: [
            'Scrum is a methodology that prescribes exactly how teams should work',
            'Scrum is a framework intentionally incomplete — it requires techniques to fill in the gaps',
            'Scrum is only suitable for software development teams',
            'Scrum guarantees faster delivery than traditional project management',
          ],
          answer: 'Scrum is a framework intentionally incomplete — it requires techniques to fill in the gaps',
        },
        {
          question: 'A Sprint Review reveals that stakeholders are unhappy with the direction of the product. What is the most appropriate outcome?',
          options: [
            'The team cancels the next Sprint and conducts an extended planning session',
            'The Product Owner updates and reorders the Product Backlog to reflect the new information',
            'The Scrum Master facilitates an emergency meeting with all stakeholders',
            'The Developers commit to working on higher-priority items next Sprint without changing the backlog',
          ],
          answer: 'The Product Owner updates and reorders the Product Backlog to reflect the new information',
        },
        {
          question: 'Which of the following BEST describes a Scrum Master\'s role during the Sprint Retrospective?',
          options: [
            'Observer — they do not participate since they are not Developers',
            'Facilitator and full participant — they are a Scrum Team member who also helps create the right conditions',
            'Note-taker — they record action items for the team',
            'Chair — they set the agenda and control the discussion',
          ],
          answer: 'Facilitator and full participant — they are a Scrum Team member who also helps create the right conditions',
        },
        {
          question: 'The Product Goal is best described as:',
          options: [
            'The list of features planned for the next release',
            'The business case approved by the sponsor',
            'The long-term objective the Scrum Team pursues through the Product Backlog',
            'The Sprint Goal for the most important Sprint',
          ],
          answer: 'The long-term objective the Scrum Team pursues through the Product Backlog',
        },
        {
          question: 'A team consistently delivers working software every Sprint but never improves their process. Which Scrum pillar is most at risk?',
          options: [
            'Transparency',
            'Inspection',
            'Adaptation',
            'None — delivering working software is the primary goal',
          ],
          answer: 'Adaptation',
        },
      ],
      exercise: {
        prompt: 'Review your mock exam answers and identify the two questions you found hardest. Write a short explanation of the correct answer in your own words for each.',
        starterCode: `// Hard question 1 — write the question topic and your explanation:

Topic:
Why the correct answer is right:
Why the wrong answers are tempting:

// Hard question 2:

Topic:
Why the correct answer is right:
Why the wrong answers are tempting:`,
        solution: `// Example — your answers will vary based on which questions you found difficult

Topic: Sprint cancellation authority
Why the correct answer is right: The Scrum Guide explicitly states only the Product Owner can cancel a Sprint. This reflects the PO's accountability for value — if the Sprint Goal is no longer worth pursuing, the PO makes that call.
Why the wrong answers are tempting: The Scrum Master seems responsible for process, and the team seems to have authority over their own work — but neither has the authority to cancel.

Topic: Scrum Master at the Daily Scrum
Why the correct answer is right: The Daily Scrum belongs to the Developers. The Scrum Master ensures it happens and is useful, but is not required to attend — and definitely should not run it.
Why the wrong answers are tempting: The Scrum Master seems like the event facilitator for all Scrum events, which makes it easy to assume they must attend and run the Daily Scrum.`,
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // LESSON 8 — MOCK EXAM 2
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'exam-prep-8',
      title: 'Mock Exam 2 — 40 PSM I Style Questions',
      content: `This is Mock Exam 2. The questions are different from Mock Exam 1 and focus on scenarios not yet covered. This exam pushes deeper on Scrum Master behaviours, edge cases, and situations that require applying values and empiricism — not just recalling rules.

PSM I PASSING THRESHOLD: 85% (34 out of 40 correct)
CSM PASSING THRESHOLD: 74% (30 out of 40 correct)

If you scored below 85% on Mock Exam 1, review the lessons that cover your weak areas before attempting this exam.

Use the Timed Exam Mode (available from the module menu) to simulate real exam conditions with a 60-minute countdown.`,
      quiz: [
        {
          question: 'A new Scrum Team has just formed. No organisational Definition of Done exists. When should the Developers create one?',
          options: [
            'After the first Sprint, once they know what "done" looks like in practice',
            'Before work begins on the first Sprint',
            'During Sprint Review, based on stakeholder feedback',
            'At the first Sprint Retrospective',
          ],
          answer: 'Before work begins on the first Sprint',
        },
        {
          question: 'A Scrum Master is asked by the Product Owner to estimate story points for the upcoming Sprint. What should the Scrum Master do?',
          options: [
            'Provide estimates based on their project management experience',
            'Explain that estimation is the Developers\' responsibility and support them in doing it',
            'Facilitate a Planning Poker session and record the results',
            'Decline to estimate and ask the Product Owner to do it instead',
          ],
          answer: 'Explain that estimation is the Developers\' responsibility and support them in doing it',
        },
        {
          question: 'Which artifact has the Sprint Goal as its commitment?',
          options: [
            'Product Backlog',
            'Sprint Backlog',
            'Increment',
            'Definition of Done',
          ],
          answer: 'Sprint Backlog',
        },
        {
          question: 'A team has adopted Scrum but continues to use their existing technical practices without change. What should the Scrum Master do?',
          options: [
            'Accept this — Scrum does not prescribe technical practices',
            'Coach the team to adopt engineering practices that support producing a Done Increment every Sprint',
            'Mandate specific technical practices to ensure the DoD can be met',
            'Report the issue to management and request technical training',
          ],
          answer: 'Coach the team to adopt engineering practices that support producing a Done Increment every Sprint',
        },
        {
          question: 'Scrum Teams should be cross-functional. What does this mean?',
          options: [
            'Team members must be able to work across multiple Scrum Teams simultaneously',
            'The team collectively has all the skills needed to create value each Sprint without depending on outsiders',
            'Each Developer must be able to perform the work of every other Developer',
            'The team must include members from every department in the organisation',
          ],
          answer: 'The team collectively has all the skills needed to create value each Sprint without depending on outsiders',
        },
        {
          question: 'During Sprint Planning, the team cannot agree on how to approach a complex technical item. The Sprint Planning time-box is nearly up. What should happen?',
          options: [
            'The Scrum Master makes the technical decision so the team can proceed',
            'The Sprint is extended until the team reaches agreement',
            'The Developers carry only work they are confident in and leave the complex item for refinement',
            'The Product Owner removes the complex item from the Sprint',
          ],
          answer: 'The Developers carry only work they are confident in and leave the complex item for refinement',
        },
        {
          question: 'The Scrum Master notices that the Product Owner is overloaded and frequently unavailable. What should the Scrum Master do?',
          options: [
            'Step in to make product decisions on the PO\'s behalf when needed',
            'Ask a senior Developer to act as PO until the workload reduces',
            'Coach the Product Owner on techniques for managing their role and help the organisation understand the PO\'s needs',
            'Raise the issue in the Sprint Review and ask stakeholders to give the PO less work',
          ],
          answer: 'Coach the Product Owner on techniques for managing their role and help the organisation understand the PO\'s needs',
        },
        {
          question: 'An organisation wants to run two-week Sprints, but a stakeholder insists on getting a delivery every week. How should the Scrum Master handle this?',
          options: [
            'Change to one-week Sprints to meet the stakeholder\'s need',
            'Create a mid-Sprint release process outside the Scrum framework',
            'Explain that the team can create a Done Increment at any point in the Sprint and release it without changing the Sprint length',
            'Ask the Product Owner to negotiate with the stakeholder for bi-weekly deliveries',
          ],
          answer: 'Explain that the team can create a Done Increment at any point in the Sprint and release it without changing the Sprint length',
        },
        {
          question: 'Which of the following best describes self-management in Scrum?',
          options: [
            'Each Developer independently decides what to work on without team coordination',
            'The Scrum Team decides internally who does what, when, and how',
            'Developers manage themselves without any involvement from the Scrum Master',
            'The team votes on every decision using majority rules',
          ],
          answer: 'The Scrum Team decides internally who does what, when, and how',
        },
        {
          question: 'A Developer tells the Scrum Master they are bored with their current work. What should the Scrum Master do?',
          options: [
            'Reassign the Developer to more interesting work',
            'Report the concern to the Developer\'s manager',
            'Listen, coach, and help the Developer explore what they want from their work within the team context',
            'Tell the Developer to focus on their Sprint commitments',
          ],
          answer: 'Listen, coach, and help the Developer explore what they want from their work within the team context',
        },
        {
          question: 'What is the PRIMARY purpose of the Sprint Review?',
          options: [
            'To demonstrate completed features to stakeholders for sign-off',
            'To inspect the Increment and adapt the Product Backlog based on what was learned',
            'To give management a project status update',
            'To review team velocity and adjust Sprint capacity',
          ],
          answer: 'To inspect the Increment and adapt the Product Backlog based on what was learned',
        },
        {
          question: 'True or False: The Scrum Guide mandates the use of story points for estimation.',
          options: [
            'True — story points are the standard unit of estimation in Scrum',
            'True — the Daily Scrum requires reporting work in story points',
            'False — Scrum does not mandate any specific estimation technique',
            'False — the Scrum Guide mandates hours for estimation to ensure accuracy',
          ],
          answer: 'False — Scrum does not mandate any specific estimation technique',
        },
        {
          question: 'The Developers want to use a new technology for the next Sprint. The Product Owner is concerned about risk. Who decides?',
          options: [
            'The Product Owner — they are accountable for value and must approve technical decisions',
            'The Scrum Master — they resolve technical disagreements',
            'The Developers — they are accountable for technical decisions within the Sprint',
            'Management — they own the technical standards for the organisation',
          ],
          answer: 'The Developers — they are accountable for technical decisions within the Sprint',
        },
        {
          question: 'A Sprint ends and the team has not achieved the Sprint Goal, though they completed several items. What should happen in the Sprint Review?',
          options: [
            'Cancel the Sprint Review — there is nothing worth reviewing',
            'Present only the completed items and note the Sprint Goal was not met; use the Review to inspect and adapt',
            'Skip the Sprint Review and go straight to the Retrospective to address what went wrong',
            'The Product Owner accepts the completed items but does not update the backlog until the goal is achieved',
          ],
          answer: 'Present only the completed items and note the Sprint Goal was not met; use the Review to inspect and adapt',
        },
        {
          question: 'What makes the Product Owner effective in Scrum?',
          options: [
            'Detailed knowledge of software development so they can guide technical decisions',
            'Authority to order the Product Backlog and the organisational support to have those decisions respected',
            'Control over the Sprint Backlog so they can adjust priorities mid-Sprint',
            'The ability to attend all Scrum events, including the Daily Scrum',
          ],
          answer: 'Authority to order the Product Backlog and the organisational support to have those decisions respected',
        },
        {
          question: 'A Scrum Team is releasing software every Sprint. Management wants monthly release reports instead of Sprint-level feedback. What should the Scrum Master do?',
          options: [
            'Create monthly reports as requested — supporting management is part of organisational service',
            'Help management understand the value of Sprint-level transparency and empiricism, and find useful reporting approaches',
            'Tell management the team only reports at Sprint Reviews',
            'Ask the Product Owner to handle all management communication',
          ],
          answer: 'Help management understand the value of Sprint-level transparency and empiricism, and find useful reporting approaches',
        },
        {
          question: 'What does it mean for a Scrum Master to "cause the removal" of an impediment?',
          options: [
            'The Scrum Master personally removes every impediment the team faces',
            'The Scrum Master identifies who can remove the impediment and enables that to happen',
            'The Scrum Master documents the impediment and waits for management to act',
            'The Scrum Master removes impediments only when no one else is available',
          ],
          answer: 'The Scrum Master identifies who can remove the impediment and enables that to happen',
        },
        {
          question: 'During the Retrospective, a Developer raises a recurring problem that has been mentioned in three previous Retrospectives with no improvement. What should the Scrum Master do?',
          options: [
            'Note it again and hope it improves next Sprint',
            'Escalate the issue to management',
            'Help the team create a specific, measurable action item with an owner and deadline',
            'Remove the impediment themselves to finally resolve it',
          ],
          answer: 'Help the team create a specific, measurable action item with an owner and deadline',
        },
        {
          question: 'The Scrum Guide defines Scrum as lightweight. What does this mean?',
          options: [
            'Scrum has minimal documentation requirements',
            'Scrum is fast to implement and requires no training',
            'Scrum has very few rules intentionally — it is incomplete by design and filled in by the team',
            'Scrum teams carry a lighter workload than traditional project teams',
          ],
          answer: 'Scrum has very few rules intentionally — it is incomplete by design and filled in by the team',
        },
        {
          question: 'When is it acceptable to release an Increment to users?',
          options: [
            'Only at the end of a Sprint, during the Sprint Review',
            'Only after the Product Owner has formally accepted it',
            'At any point during or after a Sprint, as long as it meets the Definition of Done',
            'Only after all Scrum events for that Sprint have been completed',
          ],
          answer: 'At any point during or after a Sprint, as long as it meets the Definition of Done',
        },
        {
          question: 'A Scrum Team is asked to provide a firm end date for a large product initiative. What is the MOST appropriate response from the Scrum Master?',
          options: [
            'Provide a firm date based on current velocity and Product Backlog size',
            'Refuse to give a date — Scrum does not allow fixed delivery commitments',
            'Help the team create a forecast based on empirical data while making clear it is a forecast, not a guarantee',
            'Ask the Product Owner to negotiate a fixed scope so a firm date is possible',
          ],
          answer: 'Help the team create a forecast based on empirical data while making clear it is a forecast, not a guarantee',
        },
        {
          question: 'True or False: The Scrum Master role can be combined with the Developer role on the same Scrum Team.',
          options: [
            'True — in small teams this is common and acceptable',
            'True — but only if the team agrees and it does not create a conflict of interest',
            'False — the Scrum Master must be dedicated full-time to the role',
            'False — combining roles is prohibited by the Scrum Guide',
          ],
          answer: 'True — in small teams this is common and acceptable',
        },
        {
          question: 'Which of the following is NOT a responsibility of the Scrum Master?',
          options: [
            'Coaching the team in self-management',
            'Facilitating Scrum events',
            'Ordering the Product Backlog',
            'Helping remove impediments',
          ],
          answer: 'Ordering the Product Backlog',
        },
        {
          question: 'A Product Owner wants to attend every Daily Scrum to stay updated on progress. Is this acceptable?',
          options: [
            'Yes — the PO should attend all Scrum events including the Daily Scrum',
            'Yes — the PO may attend but should not disrupt or redirect the Developers\' discussion',
            'No — the Daily Scrum is for Developers only and the PO must never attend',
            'No — the Scrum Master must formally approve any non-Developer attendance',
          ],
          answer: 'Yes — the PO may attend but should not disrupt or redirect the Developers\' discussion',
        },
        {
          question: 'What is the relationship between a Sprint and the five Scrum events?',
          options: [
            'The Sprint is one of the five events',
            'The Sprint is the container within which all other Scrum events occur',
            'Each Scrum event is a separate Sprint',
            'Sprint Planning replaces the Sprint — the plan and the execution are the same event',
          ],
          answer: 'The Sprint is the container within which all other Scrum events occur',
        },
        {
          question: 'A Scrum Team is struggling to create a Done Increment every Sprint. What is the MOST likely root cause?',
          options: [
            'The Sprint is too short for the complexity of the work',
            'The team lacks the technical practices and skills to integrate and test work continuously',
            'The Product Owner is adding too many items to the Sprint Backlog',
            'The Scrum Master is not running the Daily Scrum effectively',
          ],
          answer: 'The team lacks the technical practices and skills to integrate and test work continuously',
        },
        {
          question: 'Which of the following is an example of the Adaptation pillar of empiricism?',
          options: [
            'Publishing the Sprint Backlog where everyone can see it',
            'Holding a Daily Scrum every day',
            'Updating the development plan when new information changes the best approach',
            'Creating a Definition of Done before the first Sprint',
          ],
          answer: 'Updating the development plan when new information changes the best approach',
        },
        {
          question: 'A Scrum Master from another team asks for advice on how to handle a disengaged Product Owner. What guidance should be given?',
          options: [
            'Replace the PO with a more engaged team member',
            'Have the Developers make product decisions independently',
            'Coach the PO on the value of their engagement and help the organisation understand the impact of PO disengagement',
            'Have the Scrum Master take on product decisions temporarily',
          ],
          answer: 'Coach the PO on the value of their engagement and help the organisation understand the impact of PO disengagement',
        },
        {
          question: 'The Scrum Guide defines three accountabilities on a Scrum Team. Which option correctly lists all three?',
          options: [
            'Scrum Master, Team Lead, Product Owner',
            'Developers, Scrum Master, Product Owner',
            'Developers, Scrum Master, Stakeholders',
            'Product Owner, Project Manager, Developers',
          ],
          answer: 'Developers, Scrum Master, Product Owner',
        },
        {
          question: 'A Scrum Team is working in a two-week Sprint. The time-box for their Sprint Retrospective is:',
          options: [
            '45 minutes',
            '1 hour',
            '1.5 hours',
            '3 hours',
          ],
          answer: '1.5 hours',
        },
        {
          question: 'Halfway through the Sprint, the Developers realise a key assumption in a backlog item was wrong and the item is far more complex than expected. What should they do?',
          options: [
            'Continue with the original estimate and catch up later',
            'Immediately inform the Product Owner and negotiate scope to protect the Sprint Goal',
            'Remove the item from the Sprint Backlog and complete other items instead',
            'Cancel the Sprint and re-plan from the corrected understanding',
          ],
          answer: 'Immediately inform the Product Owner and negotiate scope to protect the Sprint Goal',
        },
        {
          question: 'True or False: The Scrum Master is a servant-leader for the Scrum Team.',
          options: [
            'True — the Scrum Guide explicitly describes the Scrum Master as a servant-leader',
            'True — but only in relation to the Developers, not the Product Owner',
            'False — the Scrum Master is a facilitator, not a leader',
            'False — servant-leadership is a management philosophy, not part of Scrum',
          ],
          answer: 'True — the Scrum Guide explicitly describes the Scrum Master as a servant-leader',
        },
        {
          question: 'A Scrum Team uses the Sprint Retrospective to create three action items but never follows through on them. What is the BEST approach?',
          options: [
            'Stop holding Retrospectives until the team can commit to actions',
            'Have the Scrum Master complete the action items on the team\'s behalf',
            'Add the improvements to the Sprint Backlog so they are tracked and visible',
            'Reduce the number of action items to one and hold the team accountable for completing it',
          ],
          answer: 'Add the improvements to the Sprint Backlog so they are tracked and visible',
        },
        {
          question: 'The Scrum Guide says the Scrum Team should be "small enough to remain nimble." What is the recommended approach if the team grows too large?',
          options: [
            'Promote a Developer to a co-Scrum Master to help manage the team',
            'Split into multiple cohesive Scrum Teams each focused on the same product',
            'Reduce the Sprint length so the team can coordinate more frequently',
            'Add a second Product Owner to split the backlog management',
          ],
          answer: 'Split into multiple cohesive Scrum Teams each focused on the same product',
        },
        {
          question: 'A Product Owner adds a new high-priority item to the Product Backlog on Day 5 of a two-week Sprint. What happens to the Sprint in progress?',
          options: [
            'The Sprint is cancelled and replanned to include the new item',
            'The item is added to the current Sprint Backlog immediately',
            'Nothing changes in the current Sprint — the item enters the Product Backlog for consideration in future Sprint Planning',
            'The Scrum Master decides whether to interrupt the Sprint',
          ],
          answer: 'Nothing changes in the current Sprint — the item enters the Product Backlog for consideration in future Sprint Planning',
        },
        {
          question: 'What is the main reason Scrum uses time-boxes for its events?',
          options: [
            'To keep meetings short so Developers can spend more time coding',
            'To create regularity, limit waste, and force useful outcomes within a defined time',
            'To satisfy ISO and PMI project management standards',
            'To give the Scrum Master control over meeting length',
          ],
          answer: 'To create regularity, limit waste, and force useful outcomes within a defined time',
        },
        {
          question: 'A Scrum Master is new to a team that has been using Scrum for two years. The team has developed bad habits. What is the BEST first step?',
          options: [
            'Immediately correct every bad habit in the first Sprint',
            'Observe, build trust, and introduce changes incrementally with the team\'s involvement',
            'Tell the team their existing practices are wrong and impose the correct Scrum framework',
            'Wait until the first Sprint Retrospective to raise any concerns',
          ],
          answer: 'Observe, build trust, and introduce changes incrementally with the team\'s involvement',
        },
        {
          question: 'True or False: Scrum can be used outside of software development.',
          options: [
            'True — the Scrum Guide says Scrum applies wherever complex adaptive problems exist',
            'True — but only in IT-adjacent fields like UX and product management',
            'False — Scrum was designed for software and is only effective there',
            'False — the Scrum Guide limits application to software and hardware product development',
          ],
          answer: 'True — the Scrum Guide says Scrum applies wherever complex adaptive problems exist',
        },
        {
          question: 'A Developer has completed their assigned work on Day 8 of a 10-day Sprint and has spare capacity. What should they do?',
          options: [
            'Wait for the next Sprint — there is nothing to do until Sprint Planning',
            'Ask the Scrum Master to assign new work',
            'Self-organise to pull the next item from the Sprint Backlog that helps meet the Sprint Goal',
            'Spend the time on technical debt or learning — work outside the Sprint Goal is permitted',
          ],
          answer: 'Self-organise to pull the next item from the Sprint Backlog that helps meet the Sprint Goal',
        },
        {
          question: 'The Increment produced in a Sprint is of poor quality because the Definition of Done is weak. Who is responsible for strengthening it?',
          options: [
            'The Scrum Master, who is responsible for quality',
            'The Product Owner, who sets the quality bar for the product',
            'The Developers, who own the Definition of Done',
            'Management, who sets the quality standards for the organisation',
          ],
          answer: 'The Developers, who own the Definition of Done',
        },
      ],
      exercise: {
        prompt: 'Compare your scores from Mock Exam 1 and Mock Exam 2. Write which topic areas you missed the most questions in, and identify the specific lessons in this module to review before your real exam.',
        starterCode: `// Post-exam review

Mock Exam 1 score: __ / 40
Mock Exam 2 score: __ / 40

Topics where I missed questions:
1.
2.
3.

Lessons to review before the real exam:`,
        solution: `// Your review will be personal — here is an example:

Mock Exam 1 score: 32 / 40 (80%)
Mock Exam 2 score: 35 / 40 (87.5%)

Topics where I missed questions:
1. Daily Scrum — who runs it and who attends
2. Definition of Done — who creates it and what happens to items that fail it
3. Sprint cancellation — who has authority

Lessons to review before the real exam:
- Lesson 3 (Scrum Guide Rules and Exam Traps) — covers Daily Scrum, Sprint, and event rules
- Lesson 5 (Definition of Done and the Increment) — covers DoD creation and enforcement`,
      },
    },
  ],
};

window.scrumExamPrepModule = scrumExamPrepModule;
