const scrumMasterAIModule = {
  id: 'scrum-master-ai',
  title: 'Scrum Master with AI',
  description: 'AI tools are transforming how Scrum Masters work — from backlog refinement and sprint planning to retrospectives and stakeholder communication. This module explores practical, responsible AI use for Scrum Masters, including where AI helps most, where it falls short, and the ethical responsibilities that come with it.',
  objectives: [
    'Understand what AI tools are available to Scrum Masters and what they can do',
    'Apply AI assistance to Product Backlog refinement and Sprint Planning',
    'Use AI to support retrospectives, team health monitoring, and coaching',
    'Leverage AI for stakeholder communication, reporting, and documentation',
    'Recognise the limitations and risks of AI in a people-centred role',
    'Apply an ethical framework for responsible AI use as a Scrum Master',
  ],
  goals: [
    'Name at least three tasks where AI genuinely helps a Scrum Master',
    'Write an AI prompt that improves a poorly written user story',
    'Describe two risks of over-relying on AI in Scrum facilitation',
    'Explain why human judgment cannot be replaced by AI in Scrum coaching',
    'Apply a checklist for responsible AI use in your Scrum practice',
  ],
  lessons: [
    {
      id: 'scrum-master-ai-1',
      title: 'Lesson 1: AI Tools and the Modern Scrum Master',
      content: `AI tools have moved from novelty to practical utility across many professional roles. For Scrum Masters, AI offers real opportunities to work more effectively — but also introduces new responsibilities and risks. This lesson gives you the landscape.

WHAT DO WE MEAN BY AI TOOLS?
For the purposes of this module, AI tools includes:

  LARGE LANGUAGE MODELS (LLMs): Tools like ChatGPT, Claude, Copilot, and Gemini that can generate, refine, and summarise text. These are the most relevant AI tools for Scrum Masters.

  AI-ENHANCED AGILE PLATFORMS: Tools like Jira, Azure DevOps, Linear, and Notion are beginning to embed AI features — automated sprint summaries, backlog suggestions, risk indicators, and meeting notes.

  AI FACILITATION TOOLS: Tools that help run retrospectives, analyse sentiment, or summarise discussions — for example, Parabol, Neatro, or Miro AI.

  VOICE AND MEETING AI: Tools like Otter.ai, Fireflies, or Microsoft Copilot in Teams that transcribe meetings, generate summaries, and identify action items.

THE SCRUM MASTER'S UNIQUE POSITION
Unlike roles that involve primarily creating artifacts (code, designs, reports), the Scrum Master role is fundamentally about people — their relationships, their growth, their collaboration. This shapes what AI can and cannot do.

AI CAN HELP WITH:
  - Generating, refining, and formatting written content (user stories, reports, emails)
  - Summarising large amounts of information (meeting notes, backlog items, retrospective data)
  - Suggesting frameworks, formats, and techniques for events
  - Doing research (Scrum theory, facilitation techniques, coaching models)
  - Identifying patterns in data (velocity trends, impediment frequency)

AI CANNOT REPLACE:
  - Human empathy and trust-building within a team
  - Reading the room in a retrospective
  - Coaching someone through a difficult personal or professional challenge
  - Building the psychological safety that enables honest communication
  - Making ethical judgments about people and organisational dynamics

THE HUMAN-AI PARTNERSHIP
The most effective Scrum Masters will not ignore AI — they will use it as a force multiplier for the administrative and analytical parts of their work, freeing more time and energy for the deeply human parts: coaching, facilitating, leading, and building trust.

Think of AI as a very fast, very knowledgeable assistant who never gets tired. The assistant can draft things, research things, and analyse things. But the Scrum Master is always the one who reads the situation, makes the judgment call, and takes responsibility.`,
      quiz: [
        {
          question: 'Which of the following tasks is AI BEST suited to help a Scrum Master with?',
          options: [
            'Detecting that a team member is upset and needs a private conversation',
            'Building genuine trust between a Developer and the Product Owner after a conflict',
            'Drafting, refining, and summarising written content such as user stories and retrospective reports',
            'Deciding whether a team is psychologically safe enough for an honest retrospective',
          ],
          answer: 2,
        },
        {
          question: 'What is the best way to think about the relationship between a Scrum Master and AI tools?',
          options: [
            'AI replaces the Scrum Master\'s judgment in most situations — it has processed more data than any human',
            'AI is a force multiplier for administrative and analytical work, freeing the Scrum Master for the human-centred parts of the role',
            'AI is only useful for large organisations — small Scrum teams should avoid it',
            'AI should run the Daily Scrum to remove human bias from the status update',
          ],
          answer: 1,
        },
        {
          question: 'Which of the following is an example of an AI-enhanced Agile platform feature?',
          options: [
            'A whiteboard that the team uses to draw a sprint plan',
            'Automated sprint summaries and backlog suggestions generated by AI within tools like Jira or Linear',
            'A video conferencing tool that the team uses for remote retrospectives',
            'An email client the Scrum Master uses to communicate with stakeholders',
          ],
          answer: 1,
        },
      ],
      exercise: null,
    },
    {
      id: 'scrum-master-ai-2',
      title: 'Lesson 2: AI for Backlog Management and Sprint Planning',
      content: `Product Backlog refinement and Sprint Planning are two areas where AI can provide substantial practical value — especially when dealing with large, messy backlogs or teams new to writing good user stories.

WRITING BETTER USER STORIES WITH AI
User stories are supposed to be small, independent, and valuable. In practice, many teams write user stories that are too large, too vague, or missing acceptance criteria. AI tools can help improve them.

THE INVEST CRITERIA
Good user stories should be:
  Independent — can be developed in any order
  Negotiable — not a rigid contract, but a basis for conversation
  Valuable — delivers value to users or stakeholders
  Estimable — the team can estimate its size
  Small — fits within a Sprint
  Testable — can be verified with acceptance criteria

HOW AI HELPS WITH USER STORIES:
  - Rewriting vague stories to be clearer and more focused
  - Splitting large stories into smaller, INVEST-compliant stories
  - Generating acceptance criteria for a given story
  - Identifying missing edge cases
  - Translating technical language into user-facing terms

EXAMPLE PROMPT FOR AI ASSISTANCE:
"Here is a user story: 'As a user, I want a better checkout experience.' This is too vague. Please rewrite it as three to five smaller user stories that are specific, valuable, and testable. Include acceptance criteria for each."

AI will give you a draft — but the Product Owner and team must review and refine it. AI does not know your product, your users, or your context.

SPRINT PLANNING SUPPORT
Sprint Planning requires the team to commit to a Sprint Goal and select work they believe they can complete. AI can support:

  SPRINT GOAL DRAFTING
  If the team has identified candidate backlog items, AI can help draft Sprint Goal options: "Given these five user stories about user authentication improvements, suggest three possible Sprint Goal statements."

  CAPACITY PLANNING
  AI tools embedded in Agile platforms can analyse historical velocity and team capacity to suggest realistic Sprint loads. But humans must validate this — AI has no awareness of team members being on leave, of technical debt in the codebase, or of an unusually complex item.

  RISK IDENTIFICATION
  AI can scan a proposed Sprint Backlog and flag potential risks: "Review these Sprint Backlog items and identify any dependencies, ambiguities, or missing information that could put the Sprint Goal at risk."

REFINEMENT SESSION PREPARATION
Scrum Masters often help prepare for refinement sessions. AI can:
  - Summarise long epics or feature descriptions into concise briefing notes
  - Generate discussion questions for a refinement session: "What questions should the team ask to fully understand this backlog item before committing to it?"
  - Suggest acceptance criteria starting points based on the story description

THE CRITICAL LIMIT: CONTEXT
All AI assistance with backlog management requires human context. AI does not know:
  - What your users actually care about
  - Your technical constraints
  - Your team's current skill set
  - Decisions made in previous Sprints
  - The business reason behind a priority decision

Always treat AI output as a first draft requiring human review and judgment — never as a final answer.`,
      quiz: [
        {
          question: 'What does the "I" in INVEST stand for, and why does it matter for user stories?',
          options: [
            'Integrated — stories should combine multiple features into one deliverable',
            'Independent — stories should be developable in any order, so the team is not blocked by sequencing constraints',
            'Infinite — stories should be open-ended to allow future expansion',
            'Iterative — stories should repeat across multiple Sprints to build quality',
          ],
          answer: 1,
        },
        {
          question: 'A team pastes a long, vague user story into an AI tool and the AI rewrites it into five clear stories with acceptance criteria. What should happen next?',
          options: [
            'The AI output is the final version — add it directly to the Product Backlog',
            'The Product Owner and team review and refine the AI output, because AI lacks the product, user, and technical context needed to make final decisions',
            'The Scrum Master approves the output and adds it without team review',
            'The AI output is discarded — AI cannot write user stories effectively',
          ],
          answer: 1,
        },
        {
          question: 'What is one way AI can support Sprint Planning?',
          options: [
            'AI can commit to the Sprint Goal on behalf of the Developers',
            'AI can automatically assign tasks to Developers based on their availability',
            'AI can analyse historical velocity and suggest realistic Sprint loads, which humans then validate',
            'AI can replace the Sprint Planning event by generating a Sprint plan automatically',
          ],
          answer: 2,
        },
      ],
      exercise: null,
    },
    {
      id: 'scrum-master-ai-3',
      title: 'Lesson 3: AI for Retrospectives and Team Health',
      content: `Retrospectives are among the most powerful events in Scrum — and some of the easiest to run poorly. AI tools can improve the quality of retrospective data, help surface patterns, and reduce the administrative burden on the Scrum Master.

AI FOR RETROSPECTIVE PREPARATION
Before a retrospective, the Scrum Master often needs to:
  - Choose a format that fits the team's current situation
  - Prepare discussion prompts or activities
  - Review data from the Sprint (velocity, impediments, mood)

AI can help with all of these:
  "Our team has been struggling with unclear requirements for three Sprints. Suggest three retrospective formats that would help us have an honest conversation about this problem and identify root causes."

  "Generate a set of five discussion questions for a retrospective focused on improving our Definition of Done adherence."

AI FOR RETROSPECTIVE DATA ANALYSIS
If your team uses digital retrospective tools (like Parabol, EasyRetro, or FunRetro), participants often generate many written responses. AI can:
  - Group similar themes
  - Summarise the top three concerns across all responses
  - Identify whether a concern appears for the first time or has been raised in previous Sprints

EXAMPLE: A team of eight generates 40 sticky notes in a retrospective. The Scrum Master pastes them into an AI tool: "Here are the retrospective responses from our team. Group them by theme and summarise the top three concerns."

This saves time and gives the facilitator a clearer picture of what matters most — but the Scrum Master still reads, validates, and interprets before sharing with the team.

TEAM HEALTH MONITORING
Several Agile platforms now offer AI-driven team health features that track:
  - Sprint velocity trends over time
  - Impediment frequency and resolution time
  - Work in progress vs. capacity
  - Burndown patterns that suggest blockers

These tools can surface early warning signs: "The team's velocity has dropped 30 percent over three Sprints and impediment resolution time has tripled — this warrants investigation."

THE HUMAN SIDE OF TEAM HEALTH
AI can identify metrics-based signals. It cannot detect:
  - Interpersonal tension between team members
  - A team member who is disengaged but saying the right things
  - Cultural issues that make people unwilling to raise concerns
  - Burnout that does not yet show in velocity data

These require a present, observant Scrum Master who has built genuine relationships with the team.

AI AND PSYCHOLOGICAL SAFETY
One risk of AI-assisted retrospectives: if team members know their written responses are being fed into an AI tool — especially one they do not control — they may self-censor. Psychological safety requires trust. If the team does not trust that retrospective data is confidential, they will not be honest.

A Scrum Master using AI in retrospectives should be transparent about:
  - What data is being shared with AI tools
  - Where that data is stored
  - Who can see it
  - How it will be used

Get the team's informed consent before introducing AI into retrospective processes.`,
      quiz: [
        {
          question: 'What is the main risk of using AI to analyse retrospective data without informing the team?',
          options: [
            'AI may categorise themes incorrectly and confuse the team',
            'Team members may self-censor if they do not trust that their responses are confidential, which undermines psychological safety',
            'The Scrum Guide prohibits using technology in retrospectives',
            'AI tools are not accurate enough to process human language reliably',
          ],
          answer: 1,
        },
        {
          question: 'A velocity trend analysis by an AI tool shows the team\'s output has dropped significantly over three Sprints. What should the Scrum Master do?',
          options: [
            'Trust the AI analysis completely and immediately raise the issue to senior management',
            'Ignore the data — velocity is not a reliable indicator',
            'Use the signal as a starting point for investigation, and have a human conversation with the team to understand what is really happening',
            'Ask the AI tool to generate a root cause analysis and share it with the team',
          ],
          answer: 2,
        },
        {
          question: 'Which of the following team health signals can AI tools detect reliably?',
          options: [
            'A team member who is quietly disengaged but saying the right things in meetings',
            'Interpersonal tension between two Developers that has not yet affected output',
            'Metrics-based signals like velocity drops, increased impediment resolution time, and burndown anomalies',
            'Burnout in its early stages before it affects measurable output',
          ],
          answer: 2,
        },
      ],
      exercise: null,
    },
    {
      id: 'scrum-master-ai-4',
      title: 'Lesson 4: AI for Stakeholder Communication and Reporting',
      content: `Stakeholder communication is a significant part of any Scrum Master's work — explaining progress, clarifying blockers, managing expectations, and translating between technical and business language. AI tools can make this communication clearer, faster, and more consistent.

THE COMMUNICATION CHALLENGE
Scrum Masters often need to communicate the same information to multiple audiences with very different needs:

  DEVELOPERS want technical precision and honest acknowledgment of uncertainty.
  PRODUCT OWNERS want to understand how the work connects to the product goal.
  SENIOR LEADERS want to know if the initiative is on track and whether anything needs their attention.
  CUSTOMERS AND END USERS want to understand what is available and what is coming.

Writing four different versions of the same update is time-consuming. AI can help draft audience-specific versions quickly.

SPRINT REPORTS AND STAKEHOLDER UPDATES
Many Scrum Masters produce some form of Sprint summary for stakeholders. AI tools can dramatically reduce the time this takes.

EXAMPLE WORKFLOW:
1. Scrum Master collects raw data: items completed, items not completed, impediments raised, impediments resolved, Sprint Goal outcome.
2. They paste this into an AI tool with a prompt: "Write a clear, concise Sprint summary for non-technical stakeholders. The team completed X, did not complete Y due to Z, and achieved/did not achieve the Sprint Goal. Highlight the next Sprint's focus."
3. AI generates a first draft. The Scrum Master reviews, edits for accuracy, and sends.

This workflow might reduce a 30-minute writing task to a 5-minute editing task.

TRANSLATING TECHNICAL LANGUAGE
Developers naturally speak in technical terms. Stakeholders without a technical background may find this confusing or alarming. AI can help translate:

"Rewrite this technical incident summary for a non-technical audience: 'The API rate-limiting middleware failed to handle edge cases in concurrent request batches, causing intermittent 503 errors for 4% of users during peak load.'"

AI translation: "A component that manages the volume of requests to our service had an unexpected issue during our busiest period, causing a small percentage of users to experience temporary errors. The team has identified the cause and is working on a fix."

EMAIL AND COMMUNICATION DRAFTING
AI can draft:
  - Emails to stakeholders explaining a Sprint Goal miss
  - Messages requesting resources or approvals that are blocking the team
  - Agendas and pre-reads for Sprint Reviews
  - Announcements of new features released in a Sprint

IMPORTANT: AI drafts require Scrum Master review for tone, accuracy, and appropriateness. AI does not know the political dynamics of your organisation, the history of a stakeholder relationship, or the sensitivity of specific topics. Always read before sending.

MEETING NOTES AND DOCUMENTATION
AI-powered meeting tools (Otter.ai, Fireflies, Copilot) can transcribe and summarise Scrum events. This is most useful for Sprint Reviews, where stakeholder input can be captured automatically, and for organisation-level meetings where the Scrum Master participates but cannot take notes while facilitating.

CAUTION: Always inform participants that recording and AI transcription is happening. Some retrospectives or sensitive conversations should not be recorded — the team's trust is more valuable than efficient note-taking.`,
      quiz: [
        {
          question: 'Why might a Scrum Master need to communicate the same Sprint information to multiple different audiences?',
          options: [
            'Because Scrum requires five different report formats by the rules of the framework',
            'Different audiences — developers, product owners, senior leaders, users — have different needs and different levels of technical knowledge',
            'Because duplicating communication is a Scrum best practice that reduces the risk of misunderstanding',
            'Because AI tools generate multiple versions automatically and it is faster to send them all',
          ],
          answer: 1,
        },
        {
          question: 'What is the recommended workflow for using AI to write a Sprint summary?',
          options: [
            'Ask AI to generate the report from scratch without providing data — it can infer the Sprint status from context',
            'Collect raw Sprint data, feed it to AI with a clear prompt, then review and edit the draft before sending',
            'Send the AI-generated report directly to stakeholders without review to save time',
            'Use AI only for spelling and grammar checks — write the full report yourself first',
          ],
          answer: 1,
        },
        {
          question: 'When is it NOT appropriate to use AI meeting transcription tools?',
          options: [
            'During large Sprint Review meetings with many stakeholders',
            'During organisation-level planning meetings',
            'During sensitive retrospectives or conversations where team trust requires confidentiality',
            'During Sprint Planning when backlog items are being estimated',
          ],
          answer: 2,
        },
      ],
      exercise: null,
    },
    {
      id: 'scrum-master-ai-5',
      title: 'Lesson 5: Responsible AI — Ethics, Bias, and Human Judgment',
      content: `The most important lesson in this module is not about how to use AI — it is about when not to, and how to use it in a way that respects the people you serve. The Scrum Master role is fundamentally about human beings, and AI use must be grounded in that reality.

THE PEOPLE-FIRST PRINCIPLE
Every AI tool a Scrum Master uses is deployed in the context of real people — team members, Product Owners, stakeholders. Any AI use that undermines their trust, privacy, dignity, or wellbeing is wrong, regardless of how efficient it is.

Before using any AI tool in your Scrum practice, ask: would the people involved consent to this if they knew about it? If the answer is no or uncertain, stop and reconsider.

AI BIAS
AI tools are trained on vast amounts of human-generated text. That text reflects human biases — about race, gender, culture, communication styles, and what constitutes "good" work. This means AI output can embed and amplify those biases in subtle ways.

EXAMPLES:
  - An AI tool that analyses retrospective language may score assertive, direct responses more highly — which may disadvantage team members from cultures where indirect communication is the norm.
  - AI-generated user stories may make implicit assumptions about who users are and what they need.
  - AI tools that summarise team health metrics may reflect what is easily measurable and underweight what is not.

A Scrum Master must read AI output critically and be alert to the ways it might reflect and embed bias.

THE RISK OF OVER-AUTOMATION
Scrum Masters who rely too heavily on AI risk something worse than bad output — they risk losing the skills and presence that make them effective.

  If you always ask AI for retrospective formats, you stop developing your own facilitation intuition.
  If AI summarises every meeting, you stop listening actively.
  If AI drafts every communication, you lose your authentic voice and relationship with stakeholders.

Use AI to handle routine administrative tasks. Do not use it as a substitute for the human judgment, presence, and relationships that are the core of the role.

DATA PRIVACY AND SECURITY
Many AI tools are cloud-based. When you paste in retrospective data, user stories, or team performance information, you are sharing it with a third party. Consider:

  - Does your organisation allow sensitive data to be shared with this tool?
  - Could team member names or personal information be included in what you share?
  - What does the tool's privacy policy say about data retention and use?

When in doubt, anonymise data before sharing. Replace names with roles or letters. Remove any identifying detail that is not necessary for the task.

THE TRANSPARENCY OBLIGATION
The Scrum value of openness applies to AI use. Team members deserve to know when AI tools are being used in processes that affect them. This includes:

  - Informing the team before using AI to analyse retrospective data
  - Telling participants before AI transcription is used in meetings
  - Being clear in communications when AI assisted in drafting

You do not need to announce every AI-assisted spell check. But any use of AI that processes data about team members, shapes decisions, or changes how information about them is used requires informed consent and transparency.

AN ETHICAL CHECKLIST FOR SCRUM MASTERS USING AI
Before using an AI tool for a Scrum-related task, ask:

  1. Would the affected people consent if they knew?
  2. Could this data privacy policy harm someone?
  3. Am I reviewing the output critically for bias and errors?
  4. Am I maintaining my own judgment rather than deferring to AI?
  5. Does this use of AI build or erode trust with my team?
  6. Would I be comfortable explaining this AI use to my team openly?

If you can answer all six questions confidently, proceed. If any answer gives you pause, rethink the approach.

THE FUTURE OF AI IN SCRUM
AI tools will continue to evolve rapidly. New capabilities will emerge that are not covered in this module. The right response is not to adopt every new tool immediately, and not to avoid all tools defensively. It is to apply the same empirical thinking that Scrum is built on: inspect, adapt, be transparent, and keep human wellbeing at the centre of every decision.`,
      quiz: [
        {
          question: 'What is the "people-first principle" for Scrum Masters using AI?',
          options: [
            'Always prioritise AI tools that have people in their marketing team',
            'Any AI use that undermines the trust, privacy, dignity, or wellbeing of the people the Scrum Master serves is wrong, regardless of efficiency',
            'People should always be trained on AI tools before the Scrum Master uses them',
            'AI should only be used after a majority of team members vote to approve it',
          ],
          answer: 1,
        },
        {
          question: 'What is a concrete risk of a Scrum Master over-relying on AI for meeting summaries?',
          options: [
            'Meeting summaries will become too accurate, leaving no room for interpretation',
            'The Scrum Master stops actively listening during meetings and loses the contextual awareness and presence that are core to the role',
            'AI summaries are typically too long and stakeholders will stop reading updates',
            'Developers will start attending fewer meetings if they know AI is summarising them',
          ],
          answer: 1,
        },
        {
          question: 'Which of the following best describes the transparency obligation when using AI in Scrum?',
          options: [
            'Every AI use — including spell check — must be disclosed to the full team in writing',
            'AI use that processes data about team members, shapes decisions, or affects how they are represented requires informed consent and openness',
            'Transparency only applies to AI tools that cost money to use',
            'The Scrum Master decides privately which AI uses to disclose — team members do not need to know the details',
          ],
          answer: 1,
        },
      ],
      exercise: null,
    },
  ],
};

if (typeof module !== 'undefined') module.exports = scrumMasterAIModule;
if (typeof window !== 'undefined') window.scrumMasterAIModule = scrumMasterAIModule;
