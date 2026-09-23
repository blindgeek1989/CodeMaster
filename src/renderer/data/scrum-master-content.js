const scrumMasterModule = {
  id: 'scrum-master',
  title: 'Scrum Master',
  description: 'The Scrum Master is a unique and powerful role — a servant-leader who helps teams, Product Owners, and organisations thrive with Scrum. This module dives deep into what Scrum Masters do, how they lead without authority, and the skills and stances that make them effective.',
  objectives: [
    'Explain the Scrum Master accountability and how it differs from a traditional project manager',
    'Understand servant leadership and why it is the foundation of the Scrum Master role',
    'Describe how Scrum Masters serve the Scrum Team, the Product Owner, and the organisation',
    'Apply techniques for facilitating Scrum events effectively',
    'Understand how to identify and remove impediments that block team progress',
    'Recognise the coaching and mentoring skills that help teams self-manage',
  ],
  goals: [
    'Explain servant leadership and give a concrete example of it in practice',
    'Describe how a Scrum Master serves each of the three groups they support',
    'Identify the difference between an impediment and a normal work problem',
    'Explain how a Scrum Master facilitates retrospectives without controlling them',
    'Understand the difference between coaching, mentoring, and advising',
  ],
  lessons: [
    {
      id: 'scrum-master-1',
      title: 'Lesson 1: The Scrum Master Role',
      content: `The Scrum Master is one of the three accountabilities on a Scrum Team, but it is unlike any other role in most workplaces. Understanding what a Scrum Master actually does — and does not do — is the foundation of everything else in this module.

WHAT A SCRUM MASTER IS
The Scrum Master is accountable for the Scrum Team's effectiveness. They do this by enabling the team to improve their practices within the Scrum framework.

A Scrum Master is sometimes described as a servant-leader — someone whose primary purpose is to serve others, not to be served. Their success is measured by the team's success, not by personal output.

WHAT A SCRUM MASTER IS NOT
Understanding what a Scrum Master is NOT helps clarify the role:

NOT A PROJECT MANAGER
A project manager assigns tasks, tracks timelines, controls scope, and reports status upward. A Scrum Master does none of these things. The team self-manages — the Scrum Master creates the conditions for that self-management to work.

NOT A TEAM LEAD OR MANAGER
A Scrum Master has no authority over team members. They cannot hire, fire, promote, or review performance. Authority in Scrum comes from the work and the team's collective decisions, not from hierarchy.

NOT A SECRETARY OR ADMIN
A Scrum Master does not schedule meetings for others, take notes as a service, or manage logistics. They facilitate events — which is different from simply organising them.

NOT A TECHNICAL LEAD
A Scrum Master does not direct technical decisions. Developers own their technical approach.

THE THREE SERVICES
The Scrum Guide defines three groups the Scrum Master serves:

1. THE SCRUM TEAM
   Coaching team members in self-management and cross-functionality
   Helping the team focus on high-value increments meeting the Definition of Done
   Causing removal of impediments to the team's progress
   Ensuring Scrum events happen, are productive, and stay within time-boxes

2. THE PRODUCT OWNER
   Helping find techniques for effective Product Backlog management
   Helping the team understand the need for clear and concise Product Backlog items
   Facilitating stakeholder collaboration when requested

3. THE ORGANISATION
   Leading, training, and coaching the organisation in its Scrum adoption
   Planning and advising Scrum implementations
   Helping employees and stakeholders understand and enact Scrum

PART-TIME OR FULL-TIME?
On smaller teams, the Scrum Master role is sometimes taken on part-time by a team member who also contributes as a Developer. On larger or more complex products, a dedicated Scrum Master is usually more effective. What matters most is that the role is genuinely filled — not just a title someone carries while doing something else entirely.`,
      quiz: [
        {
          question: 'What is the Scrum Master primarily accountable for?',
          options: [
            'Completing the most technical tasks in the Sprint',
            'Reporting project status to senior management',
            'The Scrum Team\'s effectiveness within the Scrum framework',
            'Approving Product Backlog items before they are worked on',
          ],
          answer: 2,
        },
        {
          question: 'How does the Scrum Master role differ from a traditional project manager?',
          options: [
            'The Scrum Master manages timelines and assigns tasks; the project manager does not',
            'A project manager controls scope and reports upward; the Scrum Master enables team self-management and serves the team',
            'There is no difference — Scrum Master is just a modern name for project manager',
            'The Scrum Master manages the budget; the project manager manages people',
          ],
          answer: 1,
        },
        {
          question: 'Which of the following is NOT one of the three groups a Scrum Master serves?',
          options: [
            'The Scrum Team',
            'The Product Owner',
            'The Organisation',
            'The external vendors and contractors',
          ],
          answer: 3,
        },
      ],
      exercise: null,
    },
    {
      id: 'scrum-master-2',
      title: 'Lesson 2: Servant Leadership',
      content: `Servant leadership is the philosophical foundation of the Scrum Master role. Understanding it deeply changes how you approach every interaction as a Scrum Master.

THE CONCEPT OF SERVANT LEADERSHIP
The term was coined by Robert K. Greenleaf in 1970. His central insight: the best leaders start with the desire to serve others first. Leadership comes second — as a way to enable more effective service.

This is the inverse of the traditional leadership model, where someone leads to gain power, status, or resources. A servant-leader leads because it is the most effective way to help others succeed.

In Scrum, this means the Scrum Master's primary question in any situation is: "How can I help this team, this Product Owner, or this organisation be more effective?"

THE SERVANT-LEADER IN PRACTICE
Servant leadership is not passive or weak. It requires courage, skill, and a willingness to challenge the status quo. Here is what it looks like in practice:

LISTENING
A servant-leader listens more than they speak. They try to understand the situation deeply before responding. They create space for team members to voice concerns without fear.

EMPATHY
They work to understand the perspectives of team members, Product Owners, and stakeholders — even when those perspectives conflict. Empathy does not mean agreement; it means understanding.

AWARENESS
They are self-aware about their own biases and limitations. They are aware of the dynamics within the team and the broader organisation.

STEWARDSHIP
They hold the Scrum framework in trust for the team and organisation — ensuring it is applied faithfully and helping others understand its intent.

COMMITMENT TO THE GROWTH OF OTHERS
A servant-leader's goal is to make themselves less necessary over time. They invest in the team's capability so the team becomes self-sufficient.

BUILDING COMMUNITY
They build trust and connection within the team and between the team and the wider organisation.

THE SCRUM MASTER STANCES
Experienced Scrum Masters move between different stances depending on the situation:

COACH — helping individuals and the team improve their thinking and practices, through powerful questions rather than direct answers
MENTOR — sharing experience and knowledge to guide less experienced team members or new Scrum adopters
FACILITATOR — creating the structure and conditions for productive conversations, especially in Scrum events
TEACHER — explicitly explaining Scrum theory, values, and practices
IMPEDIMENT REMOVER — actively working to clear obstacles blocking the team's progress
CHANGE AGENT — driving organisational change to improve the environment for Scrum Teams

A Scrum Master who only ever occupies one stance will be less effective than one who reads the situation and chooses the right stance for the moment.

WHAT SERVANT LEADERSHIP IS NOT
Servant leadership is not being a pushover or saying yes to everything. A Scrum Master protects the Scrum framework, challenges the team to improve, and tells hard truths when needed. They serve the team's long-term success — not their momentary comfort.`,
      quiz: [
        {
          question: 'What is the core idea behind servant leadership?',
          options: [
            'Leaders should do the most work on the team to set an example',
            'The best leaders start with the desire to serve others first — leadership is a means to enable more effective service',
            'Leaders should avoid conflict to keep team morale high',
            'Servant leaders report to the team rather than to management',
          ],
          answer: 1,
        },
        {
          question: 'A Scrum Master who only ever tells the team what to do — rather than asking questions to help them discover answers — is primarily missing which stance?',
          options: ['Impediment Remover', 'Coach', 'Change Agent', 'Teacher'],
          answer: 1,
        },
        {
          question: 'Why is a servant-leader\'s goal to make themselves less necessary over time?',
          options: [
            'So they can be assigned to more teams and increase their own workload',
            'Because servant leaders do not want to be promoted',
            'So they invest in the team\'s capability and the team becomes increasingly self-sufficient',
            'Because Scrum Master is a temporary role that ends after six Sprints',
          ],
          answer: 2,
        },
      ],
      exercise: null,
    },
    {
      id: 'scrum-master-3',
      title: 'Lesson 3: Facilitating Scrum Events',
      content: `One of the Scrum Master's most visible responsibilities is ensuring that Scrum events happen, are productive, and stay within their time-boxes. Facilitation is a skill — and a bad facilitation can turn a valuable event into a frustrating time-sink.

WHAT IS FACILITATION?
Facilitation is the act of helping a group work together effectively toward a shared outcome. A facilitator creates the structure and environment that allows the group to do their best thinking. Crucially, a facilitator is neutral — they are focused on the process, not the content.

This means the Scrum Master as facilitator is not there to provide answers or make decisions. They are there to help the team have a better conversation.

FACILITATING SPRINT PLANNING
Sprint Planning can fail in several common ways:
  - The team takes on too much or too little work
  - The Sprint Goal is vague and gives the team no real direction
  - The team runs out of time before planning is complete
  - Developers are told what to do rather than choosing their own work

A good Scrum Master facilitates Sprint Planning by:
  - Ensuring the Product Owner has prepared enough refined backlog items
  - Helping the team articulate a clear, meaningful Sprint Goal
  - Timekeeping — gently redirecting when discussions go off-track
  - Asking "can we commit to this?" rather than presuming commitments

FACILITATING THE DAILY SCRUM
The biggest facilitation mistakes in Daily Scrum:
  - Turning it into a status report directed at the Scrum Master
  - Allowing it to run over 15 minutes by diving into problem-solving
  - Having people report to each other rather than collaborating as a team

Good facilitation means:
  - Starting on time, every day
  - Redirecting problem-solving conversations to after the event
  - Stepping back — letting the Developers own the event
  - Occasionally asking "are we on track for the Sprint Goal?" to keep focus

FACILITATING THE SPRINT REVIEW
The Sprint Review is a working session, not a performance. The team inspects the increment with stakeholders and gets real feedback.

Facilitation challenges:
  - Stakeholders are passive and give no feedback
  - The session becomes a one-way presentation
  - Technical issues derail the demonstration

Good facilitation means:
  - Preparing stakeholders beforehand — explain their role is to give feedback, not just watch
  - Using concrete questions: "Does this meet the need you had in mind?"
  - Capturing feedback visibly (on a whiteboard or shared screen)

FACILITATING THE SPRINT RETROSPECTIVE
The retrospective is arguably the most important event to facilitate well — and the hardest.

Common failure modes:
  - The team says everything is fine when it is not (psychological safety is low)
  - The same problems come up every retrospective with no resolution
  - Discussion is dominated by one or two voices
  - Actions are identified but never followed up

Facilitation techniques:
  - Use structured formats: Start/Stop/Continue, 4Ls (Liked, Learned, Lacked, Longed For), Sailboat, etc.
  - Ensure every voice is heard — use anonymous input tools or round-robin formats
  - Focus on one to three actionable improvements per retrospective, not an overwhelming list
  - At the start of each retrospective, review the actions from the previous one

TIMEBOXING
Every Scrum event has a maximum time-box. Timeboxing is a facilitation tool — it creates focus, forces decisions, and prevents endless discussion. The Scrum Master's job is to respect the time-box, not exceed it.

If a discussion is valuable but goes long, the right response is to schedule a separate meeting — not extend the event.`,
      quiz: [
        {
          question: 'What does it mean for a facilitator to be "neutral"?',
          options: [
            'They agree with everything the team says to avoid conflict',
            'They are focused on the process of the conversation rather than on the content or outcome',
            'They do not attend the meeting themselves — they send a representative',
            'They treat all work items as equally important, regardless of business value',
          ],
          answer: 1,
        },
        {
          question: 'What is the biggest risk in facilitating the Daily Scrum poorly?',
          options: [
            'The team completes their work faster than planned',
            'It becomes a status report to the Scrum Master rather than a Developers\' coordination event, and runs over time',
            'Stakeholders attend and interfere with the discussion',
            'The Sprint Goal changes mid-Sprint',
          ],
          answer: 1,
        },
        {
          question: 'Why does the Scrum Master check previous retrospective actions at the start of each new retrospective?',
          options: [
            'To prove to management that the team is following Scrum correctly',
            'To ensure agreed improvements are followed up and not forgotten Sprint after Sprint',
            'To decide which team member was responsible for any failures',
            'Because the Scrum Guide requires it as a mandatory opening step',
          ],
          answer: 1,
        },
      ],
      exercise: null,
    },
    {
      id: 'scrum-master-4',
      title: 'Lesson 4: Removing Impediments',
      content: `One of the most concrete and practical responsibilities of a Scrum Master is removing impediments — obstacles that prevent the team from making progress. Doing this well is harder than it sounds.

WHAT IS AN IMPEDIMENT?
An impediment is anything that prevents the team from working effectively and that the team cannot resolve themselves within a reasonable time.

IMPEDIMENT VS NORMAL WORK PROBLEM
Not every problem is an impediment. There is an important distinction:

A NORMAL WORK PROBLEM is something the team can handle themselves. For example:
  - A Developer has a question about a requirement — they ask the Product Owner.
  - Two Developers disagree on a technical approach — they talk it through.
  - A unit test is failing — a Developer investigates and fixes it.

AN IMPEDIMENT is a problem that requires action outside the team, or that exceeds the team's authority to fix. For example:
  - The team needs access to a test environment but IT policy requires VP approval.
  - A dependency on another team is blocking progress and that team is unresponsive.
  - A recurring organisational process is forcing the team to violate Scrum.
  - Team morale is critically low due to management pressure on the team from outside Scrum.

The Scrum Master's job is to help the team identify the difference, and then act on the real impediments.

HOW SCRUM MASTERS REMOVE IMPEDIMENTS
The Scrum Guide says the Scrum Master "causes the removal" of impediments. This wording is deliberate — the Scrum Master is not required to personally fix every problem. They may:

  - Remove it directly: Fix the issue themselves (e.g., setting up a missing tool).
  - Escalate it: Bring it to someone with the authority or resources to fix it.
  - Broker a conversation: Connect people who can solve the problem together.
  - Make it visible: Surface the impediment in a place where it will get attention.

MAKING IMPEDIMENTS VISIBLE
Many organisations have a culture of hiding problems — admitting obstacles feels like failure. A Scrum Master changes this culture by making impediments visible and normalising the act of reporting them.

Tools like an Impediment Backlog (a list of known obstacles and their status) help with this. The Daily Scrum is often the place where impediments first surface. A skilled Scrum Master listens for them even when they are not explicitly named.

THE DIFFERENCE BETWEEN SPEED AND URGENCY
Not all impediments need to be resolved immediately. The Scrum Master should triage: which impediments are blocking work right now (urgent), and which are slowing things down but not stopping them (important but not urgent)? Resolving the urgent ones first is usually correct.

SYSTEMIC IMPEDIMENTS
Some impediments are not one-off problems — they are symptoms of a deeper systemic issue. For example, if a team consistently struggles with unclear requirements, the real impediment may be an ineffective refinement process or unclear collaboration with the Product Owner.

A great Scrum Master looks for patterns. When the same type of impediment recurs, they investigate the root cause and work to eliminate it permanently, rather than just clearing each instance as it arises.`,
      quiz: [
        {
          question: 'What distinguishes an impediment from a normal work problem?',
          options: [
            'Impediments are always caused by management; work problems are caused by the team',
            'An impediment requires action outside the team or exceeds their authority to fix; a normal work problem is something the team can handle themselves',
            'Impediments only exist in large organisations; small teams do not have them',
            'Any problem that takes more than one day to resolve is an impediment',
          ],
          answer: 1,
        },
        {
          question: 'The Scrum Guide says the Scrum Master "causes the removal" of impediments. What does this mean?',
          options: [
            'The Scrum Master must personally fix every obstacle themselves',
            'The Scrum Master delegates all impediment removal to the Product Owner',
            'The Scrum Master takes action to ensure impediments are removed — whether by fixing them directly, escalating, brokering a conversation, or making them visible',
            'The Scrum Master ignores impediments and lets the team resolve them without help',
          ],
          answer: 2,
        },
        {
          question: 'Why should a Scrum Master look for patterns in recurring impediments?',
          options: [
            'To report repeat offenders to senior management',
            'To investigate root causes and eliminate systemic issues permanently, rather than just clearing each instance as it appears',
            'Because the Scrum Guide requires a monthly impediment trend report',
            'To decide which team members need performance improvement plans',
          ],
          answer: 1,
        },
      ],
      exercise: null,
    },
    {
      id: 'scrum-master-5',
      title: 'Lesson 5: Coaching the Team and Organisation',
      content: `The deepest work a Scrum Master does is not facilitation or impediment removal — it is coaching. Coaching helps individuals and teams grow their own capabilities, rather than depending on the Scrum Master for answers.

COACHING VS OTHER STANCES
It helps to be clear about the difference between coaching, mentoring, and advising:

COACHING
The coach helps someone find their own answers through powerful questions and reflection. The coach does not assume they know the answer — they help the coachee discover it themselves.

Example: A Developer says, "I'm not sure how to break this large story down." A coaching response: "What are the smallest pieces that would still deliver independent value? What would the first one be?"

MENTORING
The mentor shares their own experience and knowledge to guide someone less experienced. Unlike coaching, mentoring involves the mentor providing direction based on what they have seen work.

Example: A new Scrum Master asks how to run a retrospective. An experienced Scrum Master describes formats they have used and why they work.

ADVISING
The advisor gives direct recommendations. It is appropriate when the person explicitly needs guidance and lacks the information to decide independently.

A skilled Scrum Master moves between these stances based on what the person and situation need. Over-relying on advising creates dependency; over-relying on coaching when someone needs direct guidance can feel frustrating.

COACHING THE SCRUM TEAM
The Scrum Master helps the team develop:
  - Self-management: the ability to organise their own work without external direction
  - Cross-functionality: the ability to collectively hold all the skills they need
  - Accountability: taking ownership of their commitments and quality

A Scrum Master coaches by asking questions: "What could you do to resolve this yourselves?" rather than, "Here is what I'd do."

COACHING THE PRODUCT OWNER
Product Owners often need coaching in:
  - Writing clear, valuable Product Backlog Items
  - Managing stakeholder expectations
  - Making difficult prioritisation decisions
  - Understanding the team's capacity and not over-committing

COACHING THE ORGANISATION
The hardest coaching challenge is the organisation itself. Many organisations are structured in ways that conflict with Scrum — hierarchical decision-making, siloed teams, annual budgeting cycles that prevent adaptive planning, or a culture that punishes failure rather than learning from it.

A Scrum Master who only focuses on their one team and ignores these systemic problems is operating at a fraction of their potential impact. Coaching the organisation means:
  - Making the impact of organisational impediments visible
  - Working with leadership to change structures that hinder agility
  - Building the organisation's understanding of Scrum values and empirical thinking
  - Advocating for psychological safety and a culture of continuous improvement

BUILDING PSYCHOLOGICAL SAFETY
Psychological safety — the belief that one can speak up, take risks, and make mistakes without fear of punishment — is the single biggest predictor of team effectiveness. A Scrum Master builds it through consistent, predictable behaviour: honouring confidentiality in retrospectives, responding to mistakes with curiosity rather than blame, and modelling vulnerability themselves.

MEASURING SCRUM MASTER EFFECTIVENESS
A Scrum Master is effective when:
  - The team delivers increasing value Sprint over Sprint
  - Impediments are resolved quickly
  - The team requires less facilitation and coaching over time (they are growing)
  - Scrum is understood and supported more broadly in the organisation
  - The team has high psychological safety and honest retrospectives`,
      quiz: [
        {
          question: 'What is the main difference between coaching and advising?',
          options: [
            'Coaching is for technical problems; advising is for process problems',
            'In coaching, the Scrum Master helps the person find their own answers through questions; advising gives direct recommendations',
            'Coaching is informal; advising requires a formal meeting',
            'There is no real difference — they are interchangeable terms',
          ],
          answer: 1,
        },
        {
          question: 'What is psychological safety and why does it matter for Scrum?',
          options: [
            'A formal process for reviewing team member wellbeing at the end of each Sprint',
            'The belief that one can speak up, take risks, and make mistakes without fear of punishment — it is the biggest predictor of team effectiveness',
            'A legal requirement for workplaces to provide safe working conditions',
            'The Scrum Master\'s method of protecting the team from excessive stakeholder demands',
          ],
          answer: 1,
        },
        {
          question: 'Why is coaching the organisation (not just the team) important for a Scrum Master?',
          options: [
            'The Scrum Guide requires Scrum Masters to work with at least three different departments per quarter',
            'Many organisational structures and cultures actively conflict with Scrum — a Scrum Master who ignores these systemic issues limits their impact',
            'Coaching the organisation is required for Scrum Master certification but not for day-to-day practice',
            'It is only important when the team has been underperforming for more than three Sprints',
          ],
          answer: 1,
        },
      ],
      exercise: null,
    },
  ],
};

if (typeof module !== 'undefined') module.exports = scrumMasterModule;
if (typeof window !== 'undefined') window.scrumMasterModule = scrumMasterModule;
