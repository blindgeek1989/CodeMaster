'use strict';

// ===== Module data =====
const MODULES = {
  html:       window.htmlModule,
  css:        window.cssModule,
  'css-sr':   window.cssScreenReaderModule,
  javascript: window.jsModule,
  python:     window.pythonModule,
  sql:        window.sqlModule,
  powershell: window.powershellModule,
};

// ===== Languages that support real code execution =====
const EXECUTABLE_LANGUAGES = new Set(['python', 'sql', 'powershell']);

// ===== State =====
let state = {
  activeModuleId: null,
  currentLessonIndex: -1,   // -1 = module intro screen
  srMode: false,
  completedLessons: {},      // { moduleId: Set<number> }
};

// ===== DOM refs =====
const moduleNav    = document.getElementById('module-nav');
const mainContent  = document.getElementById('main-content');
const srModeCheckbox = document.getElementById('sr-mode-checkbox');
const announcer    = document.getElementById('sr-announcer');

// ===== Announce to screen reader =====
function announce(message) {
  announcer.textContent = '';
  requestAnimationFrame(() => { announcer.textContent = message; });
}

function focusMainHeading() {
  const h = mainContent.querySelector('h1, h2');
  if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: false }); }
}

// ===== SR mode toggle =====
srModeCheckbox.addEventListener('change', () => {
  state.srMode = srModeCheckbox.checked;

  // Re-label CSS button in sidebar
  const cssBtn = document.querySelector('[data-module="css"]');
  if (cssBtn) {
    const icon = cssBtn.querySelector('.module-icon');
    cssBtn.textContent = '';
    if (icon) cssBtn.appendChild(icon);
    cssBtn.appendChild(document.createTextNode(state.srMode ? 'CSS (Screen Reader)' : 'CSS'));
  }

  if (state.activeModuleId === 'css' || state.activeModuleId === 'css-sr') {
    const target = state.srMode ? 'css-sr' : 'css';
    loadModule(target);
    announce(state.srMode
      ? 'Screen Reader CSS mode enabled. Loading CSS for Screen Reader Users.'
      : 'Standard CSS mode enabled. Loading CSS Fundamentals.');
  } else {
    announce(state.srMode
      ? 'Screen Reader CSS mode enabled. Open the CSS module to use it.'
      : 'Standard CSS mode enabled.');
  }
});

// ===== Build sidebar =====
function buildSidebar() {
  const defs = [
    { id: 'html',       icon: '📄', label: 'HTML' },
    { id: 'css',        icon: '🎨', label: 'CSS' },
    { id: 'javascript', icon: '⚡', label: 'JavaScript' },
    { id: 'python',     icon: '🐍', label: 'Python' },
    { id: 'sql',        icon: '🗄️', label: 'SQL' },
    { id: 'powershell', icon: '💻', label: 'PowerShell' },
  ];

  moduleNav.innerHTML = '';
  defs.forEach(({ id, icon, label }) => {
    const li = document.createElement('li');
    li.className = 'module-nav-item';
    li.id = `nav-item-${id}`;

    const btn = document.createElement('button');
    btn.className = 'module-nav-btn';
    btn.dataset.module = id;
    btn.setAttribute('aria-expanded', 'false');

    const iconSpan = document.createElement('span');
    iconSpan.className = 'module-icon';
    iconSpan.setAttribute('aria-hidden', 'true');
    iconSpan.textContent = icon;
    btn.appendChild(iconSpan);
    btn.appendChild(document.createTextNode(label));

    btn.addEventListener('click', () => {
      const targetId = (id === 'css' && state.srMode) ? 'css-sr' : id;
      loadModule(targetId);
      openLessonList(li, btn, targetId);
    });

    const lessonUl = buildLessonList(id);
    li.appendChild(btn);
    li.appendChild(lessonUl);
    moduleNav.appendChild(li);
  });
}

function buildLessonList(moduleNavId) {
  const ul = document.createElement('ul');
  ul.className = 'module-lessons';
  ul.id = `lessons-${moduleNavId}`;

  const modId = (moduleNavId === 'css' && state.srMode) ? 'css-sr' : moduleNavId;
  const mod   = MODULES[modId];
  if (!mod) return ul;

  mod.lessons.forEach((lesson, i) => {
    const li  = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'lesson-nav-btn';
    btn.textContent = lesson.title;
    btn.dataset.lessonIndex = i;
    btn.dataset.moduleId    = moduleNavId;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const tid = (moduleNavId === 'css' && state.srMode) ? 'css-sr' : moduleNavId;
      showLesson(tid, i);
    });
    li.appendChild(btn);
    ul.appendChild(li);
  });

  return ul;
}

function openLessonList(li, btn, moduleId) {
  document.querySelectorAll('.module-lessons.open').forEach(el => el.classList.remove('open'));
  document.querySelectorAll('.module-nav-btn[aria-expanded="true"]').forEach(el => el.setAttribute('aria-expanded', 'false'));
  const ul = li.querySelector('.module-lessons');
  if (ul) { ul.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
}

function updateSidebarActive(moduleId, lessonIndex) {
  const navId = moduleId === 'css-sr' ? 'css' : moduleId;

  document.querySelectorAll('.module-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.module === navId);
  });

  document.querySelectorAll('.lesson-nav-btn').forEach(btn => {
    const match = btn.dataset.moduleId === navId &&
                  parseInt(btn.dataset.lessonIndex) === lessonIndex;
    btn.classList.toggle('active', match);
  });
}

// ===== Load module → show intro =====
function loadModule(moduleId) {
  state.activeModuleId    = moduleId;
  state.currentLessonIndex = -1;
  if (!state.completedLessons[moduleId]) state.completedLessons[moduleId] = new Set();

  const mod = MODULES[moduleId];
  if (!mod) return;

  const navId = moduleId === 'css-sr' ? 'css' : moduleId;
  document.querySelectorAll('.module-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.module === navId);
  });
  document.querySelectorAll('.lesson-nav-btn').forEach(btn => btn.classList.remove('active'));

  mainContent.innerHTML = '';

  // Badge
  const badge = document.createElement('span');
  badge.className = 'module-badge';
  badge.textContent = moduleId === 'css-sr' ? 'CSS — Screen Reader Edition' : mod.title;

  // Title
  const h1 = document.createElement('h1');
  h1.className = 'module-title';
  h1.id = 'module-title';
  h1.textContent = mod.title;

  // Description
  const desc = document.createElement('p');
  desc.className = 'module-description';
  desc.textContent = mod.description;

  const header = document.createElement('header');
  header.className = 'module-header';
  header.appendChild(badge);
  header.appendChild(h1);
  header.appendChild(desc);
  mainContent.appendChild(header);

  // Objectives & Goals
  const og = document.createElement('div');
  og.className = 'objectives-goals';
  og.appendChild(buildInfoCard('Learning Objectives', mod.objectives, 'objectives'));
  og.appendChild(buildInfoCard('Goals', mod.goals, 'goals'));
  mainContent.appendChild(og);

  // Lesson list overview
  const overviewSection = document.createElement('section');
  overviewSection.setAttribute('aria-label', 'Lessons in this module');
  overviewSection.className = 'lesson-overview';

  const overviewTitle = document.createElement('h2');
  overviewTitle.className = 'section-label';
  overviewTitle.textContent = `${mod.lessons.length} Lessons`;
  overviewSection.appendChild(overviewTitle);

  const lessonList = document.createElement('ol');
  lessonList.className = 'lesson-overview-list';

  mod.lessons.forEach((lesson, i) => {
    const li   = document.createElement('li');
    const btn  = document.createElement('button');
    btn.className = 'lesson-overview-btn';
    btn.textContent = lesson.title;
    const done = state.completedLessons[moduleId] && state.completedLessons[moduleId].has(i);
    if (done) {
      btn.classList.add('completed');
      btn.setAttribute('aria-label', `${lesson.title} — completed`);
    }
    btn.addEventListener('click', () => showLesson(moduleId, i));
    li.appendChild(btn);
    lessonList.appendChild(li);
  });

  overviewSection.appendChild(lessonList);
  mainContent.appendChild(overviewSection);

  // Start button
  const startWrap = document.createElement('div');
  startWrap.className = 'start-wrap';
  const startBtn = document.createElement('button');
  startBtn.className = 'btn-start';
  startBtn.textContent = 'Start Learning';
  startBtn.addEventListener('click', () => showLesson(moduleId, 0));
  startWrap.appendChild(startBtn);
  mainContent.appendChild(startWrap);

  announce(`${mod.title} — ${mod.lessons.length} lessons. Press Start Learning to begin.`);
  focusMainHeading();
}

function buildInfoCard(label, items, id) {
  const card = document.createElement('section');
  card.className = 'card';
  card.setAttribute('aria-labelledby', `${id}-heading`);

  const h2 = document.createElement('h2');
  h2.className = 'card-title';
  h2.id = `${id}-heading`;
  h2.textContent = label;

  const ul = document.createElement('ul');
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });

  card.appendChild(h2);
  card.appendChild(ul);
  return card;
}

// ===== Show a single lesson =====
function showLesson(moduleId, lessonIndex) {
  state.activeModuleId     = moduleId;
  state.currentLessonIndex = lessonIndex;

  const mod   = MODULES[moduleId];
  const lesson = mod.lessons[lessonIndex];
  const total  = mod.lessons.length;
  if (!mod || !lesson) return;

  if (!state.completedLessons[moduleId]) state.completedLessons[moduleId] = new Set();

  updateSidebarActive(moduleId, lessonIndex);
  mainContent.innerHTML = '';

  // ── Top bar: module + lesson counter ──
  const topBar = document.createElement('div');
  topBar.className = 'lesson-top-bar';

  const moduleCrumb = document.createElement('span');
  moduleCrumb.className = 'lesson-crumb';
  const crumbBtn = document.createElement('button');
  crumbBtn.className = 'crumb-btn';
  crumbBtn.textContent = mod.title;
  crumbBtn.setAttribute('aria-label', `Back to ${mod.title} overview`);
  crumbBtn.addEventListener('click', () => loadModule(moduleId));
  moduleCrumb.appendChild(crumbBtn);

  const lessonCounter = document.createElement('span');
  lessonCounter.className = 'lesson-counter';
  lessonCounter.setAttribute('aria-label', `Lesson ${lessonIndex + 1} of ${total}`);
  lessonCounter.textContent = `Lesson ${lessonIndex + 1} of ${total}`;

  topBar.appendChild(moduleCrumb);
  topBar.appendChild(lessonCounter);
  mainContent.appendChild(topBar);

  // ── Progress bar ──
  const progressWrap = document.createElement('div');
  progressWrap.className = 'progress-bar-wrap';
  const progressFill = document.createElement('div');
  progressFill.className = 'progress-bar-fill';
  progressFill.setAttribute('role', 'progressbar');
  progressFill.setAttribute('aria-label', `${mod.title} progress`);
  progressFill.setAttribute('aria-valuemin', '0');
  progressFill.setAttribute('aria-valuemax', '100');
  const pct = Math.round((state.completedLessons[moduleId].size / total) * 100);
  progressFill.setAttribute('aria-valuenow', pct);
  progressFill.style.width = `${pct}%`;
  progressWrap.appendChild(progressFill);
  mainContent.appendChild(progressWrap);

  // ── Lesson header ──
  const lessonHeader = document.createElement('div');
  lessonHeader.className = 'lesson-header';

  const numBadge = document.createElement('span');
  numBadge.className = 'lesson-number';
  numBadge.setAttribute('aria-hidden', 'true');
  numBadge.textContent = lessonIndex + 1;

  const lessonTitle = document.createElement('h1');
  lessonTitle.className = 'lesson-title';
  lessonTitle.id = 'lesson-title';
  lessonTitle.textContent = lesson.title;

  lessonHeader.appendChild(numBadge);
  lessonHeader.appendChild(lessonTitle);
  mainContent.appendChild(lessonHeader);

  // ── Skip to exercise link ──
  if (lesson.exercise) {
    const skipExercise = document.createElement('a');
    skipExercise.className = 'skip-link skip-to-exercise';
    skipExercise.href = '#exercise-section';
    skipExercise.textContent = 'Skip to exercise';
    mainContent.appendChild(skipExercise);
  }

  // ── Lesson content ──
  const contentBox = document.createElement('div');
  contentBox.className = 'lesson-content';
  contentBox.setAttribute('tabindex', '0');
  contentBox.setAttribute('aria-label', `${lesson.title} — lesson content`);
  contentBox.textContent = lesson.content;
  mainContent.appendChild(contentBox);

  // ── Quiz ──
  if (lesson.quiz && lesson.quiz.length) {
    mainContent.appendChild(buildQuiz(lesson, progressFill, total, moduleId, lessonIndex));
  }

  // ── Exercise ──
  if (lesson.exercise) {
    mainContent.appendChild(buildExercise(lesson.exercise, lesson.title, moduleId));
  }

  // ── Navigation ──
  mainContent.appendChild(buildNavigation(moduleId, lessonIndex, total));

  announce(`Lesson ${lessonIndex + 1} of ${total}: ${lesson.title}`);
  focusMainHeading();
}

function buildNavigation(moduleId, lessonIndex, total) {
  const nav = document.createElement('nav');
  nav.className = 'lesson-nav';
  nav.setAttribute('aria-label', 'Lesson navigation');

  const prevWrap = document.createElement('div');
  prevWrap.className = 'lesson-nav-prev';

  const nextWrap = document.createElement('div');
  nextWrap.className = 'lesson-nav-next';

  if (lessonIndex > 0) {
    const prevBtn = document.createElement('button');
    prevBtn.className = 'btn-lesson-nav btn-prev';
    prevBtn.textContent = '← Previous Lesson';
    prevBtn.addEventListener('click', () => showLesson(moduleId, lessonIndex - 1));
    prevWrap.appendChild(prevBtn);
  } else {
    const overviewBtn = document.createElement('button');
    overviewBtn.className = 'btn-lesson-nav btn-overview';
    overviewBtn.textContent = '← Module Overview';
    overviewBtn.addEventListener('click', () => loadModule(moduleId));
    prevWrap.appendChild(overviewBtn);
  }

  if (lessonIndex < total - 1) {
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn-lesson-nav btn-next';
    nextBtn.textContent = 'Next Lesson →';
    nextBtn.addEventListener('click', () => {
      markComplete(moduleId, lessonIndex);
      showLesson(moduleId, lessonIndex + 1);
    });
    nextWrap.appendChild(nextBtn);
  } else {
    const finishBtn = document.createElement('button');
    finishBtn.className = 'btn-lesson-nav btn-finish';
    finishBtn.textContent = 'Complete Module ✓';
    finishBtn.addEventListener('click', () => {
      markComplete(moduleId, lessonIndex);
      showModuleComplete(moduleId);
    });
    nextWrap.appendChild(finishBtn);
  }

  nav.appendChild(prevWrap);
  nav.appendChild(nextWrap);
  return nav;
}

function markComplete(moduleId, lessonIndex) {
  if (!state.completedLessons[moduleId]) state.completedLessons[moduleId] = new Set();
  state.completedLessons[moduleId].add(lessonIndex);
  saveProgress();
}

// ===== Progress persistence =====
function saveProgress() {
  const toSave = {};
  for (const [id, set] of Object.entries(state.completedLessons)) {
    toSave[id] = [...set];
  }
  try { localStorage.setItem('codemaster-progress', JSON.stringify(toSave)); } catch (_) {}
}

function loadProgress() {
  try {
    const raw = localStorage.getItem('codemaster-progress');
    if (!raw) return;
    const parsed = JSON.parse(raw);
    for (const [id, indices] of Object.entries(parsed)) {
      if (Array.isArray(indices)) state.completedLessons[id] = new Set(indices);
    }
  } catch (_) {}
}

// ===== Font size =====
const FONT_MIN = 14, FONT_MAX = 24, FONT_STEP = 2;
let currentFontSize = 16;

function applyFontSize(size) {
  currentFontSize = Math.max(FONT_MIN, Math.min(FONT_MAX, size));
  document.documentElement.style.setProperty('--base-font-size', currentFontSize + 'px');
  const display = document.getElementById('font-size-display');
  if (display) display.textContent = currentFontSize + 'px';
  try { localStorage.setItem('codemaster-font-size', currentFontSize); } catch (_) {}
}

function initFontSize() {
  const saved = parseInt(localStorage.getItem('codemaster-font-size') || '16');
  applyFontSize(isNaN(saved) ? 16 : saved);

  document.getElementById('font-increase').addEventListener('click', () => {
    applyFontSize(currentFontSize + FONT_STEP);
    announce(`Text size: ${currentFontSize}px`);
  });
  document.getElementById('font-decrease').addEventListener('click', () => {
    applyFontSize(currentFontSize - FONT_STEP);
    announce(`Text size: ${currentFontSize}px`);
  });
}

// ===== Glossary =====
function showGlossary() {
  mainContent.innerHTML = '';
  state.activeModuleId = null;
  state.currentLessonIndex = -1;

  const terms = window.glossaryData || [];

  const section = document.createElement('section');
  section.setAttribute('aria-labelledby', 'glossary-heading');

  const h1 = document.createElement('h1');
  h1.id = 'glossary-heading';
  h1.textContent = 'Glossary';
  section.appendChild(h1);

  const intro = document.createElement('p');
  intro.textContent = `${terms.length} terms across all modules. Use the search box to filter.`;
  section.appendChild(intro);

  const searchWrap = document.createElement('div');
  searchWrap.className = 'glossary-search-wrap';

  const searchLabel = document.createElement('label');
  searchLabel.setAttribute('for', 'glossary-search');
  searchLabel.textContent = 'Search terms:';
  searchWrap.appendChild(searchLabel);

  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.id = 'glossary-search';
  searchInput.className = 'glossary-search';
  searchInput.setAttribute('aria-controls', 'glossary-list');
  searchInput.setAttribute('aria-label', 'Search glossary terms');
  searchInput.placeholder = 'Type to filter…';
  searchWrap.appendChild(searchInput);

  const resultCount = document.createElement('p');
  resultCount.id = 'glossary-result-count';
  resultCount.className = 'glossary-result-count';
  resultCount.setAttribute('aria-live', 'polite');
  resultCount.setAttribute('aria-atomic', 'true');
  searchWrap.appendChild(resultCount);

  section.appendChild(searchWrap);

  const list = document.createElement('dl');
  list.id = 'glossary-list';
  list.className = 'glossary-list';

  function renderTerms(filter) {
    list.innerHTML = '';
    const q = filter.toLowerCase().trim();
    const visible = terms.filter(t =>
      !q || t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q) || t.module.toLowerCase().includes(q)
    );

    resultCount.textContent = q
      ? `${visible.length} result${visible.length !== 1 ? 's' : ''} for "${filter}"`
      : `${visible.length} terms`;

    visible.forEach(t => {
      const dt = document.createElement('dt');
      dt.className = 'glossary-term';

      const termSpan = document.createElement('span');
      termSpan.textContent = t.term;
      dt.appendChild(termSpan);

      const badge = document.createElement('span');
      badge.className = 'glossary-module-badge';
      badge.textContent = t.module;
      dt.appendChild(badge);

      const dd = document.createElement('dd');
      dd.className = 'glossary-def';
      dd.textContent = t.definition;

      if (t.example) {
        const pre = document.createElement('pre');
        pre.className = 'glossary-example';
        pre.textContent = t.example;
        dd.appendChild(pre);
      }

      list.appendChild(dt);
      list.appendChild(dd);
    });
  }

  searchInput.addEventListener('input', () => renderTerms(searchInput.value));
  renderTerms('');

  section.appendChild(list);
  mainContent.appendChild(section);
  h1.setAttribute('tabindex', '-1');
  h1.focus();
  announce(`Glossary opened. ${terms.length} terms available. Use the search box to filter.`);
}

// ===== Module complete screen =====
function showModuleComplete(moduleId) {
  const mod   = MODULES[moduleId];
  const total = mod.lessons.length;

  mainContent.innerHTML = '';

  const screen = document.createElement('section');
  screen.className = 'complete-screen';
  screen.setAttribute('aria-labelledby', 'complete-heading');

  const icon = document.createElement('span');
  icon.className = 'complete-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '✓';

  const h1 = document.createElement('h1');
  h1.id = 'complete-heading';
  h1.className = 'complete-title';
  h1.textContent = 'Module Complete!';

  const msg = document.createElement('p');
  msg.className = 'complete-msg';
  msg.textContent = `You finished all ${total} lessons in ${mod.title}. Great work.`;

  const actions = document.createElement('div');
  actions.className = 'complete-actions';

  const reviewBtn = document.createElement('button');
  reviewBtn.className = 'btn-primary';
  reviewBtn.textContent = 'Review this module';
  reviewBtn.addEventListener('click', () => loadModule(moduleId));

  const nextModuleId = getNextModuleId(moduleId);
  if (nextModuleId) {
    const nextMod = MODULES[nextModuleId];
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn-start';
    nextBtn.textContent = `Start ${nextMod.title} →`;
    nextBtn.addEventListener('click', () => {
      const navId = nextModuleId === 'css-sr' ? 'css' : nextModuleId;
      const li = document.getElementById(`nav-item-${navId}`);
      const btn = li && li.querySelector('.module-nav-btn');
      if (li && btn) openLessonList(li, btn, nextModuleId);
      loadModule(nextModuleId);
    });
    actions.appendChild(nextBtn);
  }

  actions.appendChild(reviewBtn);
  screen.appendChild(icon);
  screen.appendChild(h1);
  screen.appendChild(msg);
  screen.appendChild(actions);
  mainContent.appendChild(screen);

  announce(`Module complete! You finished all ${total} lessons in ${mod.title}.`);
  focusMainHeading();
}

function getNextModuleId(currentId) {
  const order = ['html', 'css', 'javascript', 'python', 'sql', 'powershell'];
  const navId = currentId === 'css-sr' ? 'css' : currentId;
  const idx   = order.indexOf(navId);
  if (idx === -1 || idx === order.length - 1) return null;
  const next  = order[idx + 1];
  return (next === 'css' && state.srMode) ? 'css-sr' : next;
}

// ===== Quiz builder =====
function buildQuiz(lesson, progressFill, total, moduleId, lessonIndex) {
  const section = document.createElement('div');
  section.className = 'quiz-section';
  section.setAttribute('role', 'group');
  section.setAttribute('aria-label', `Knowledge check for ${lesson.title}`);

  const h2 = document.createElement('h2');
  h2.className = 'quiz-title';
  h2.textContent = 'Knowledge Check';
  section.appendChild(h2);

  lesson.quiz.forEach((q, qi) => {
    const qDiv    = document.createElement('div');
    qDiv.className = 'quiz-question';

    const fieldset = document.createElement('fieldset');
    fieldset.style.cssText = 'border:none;padding:0;margin:0';

    const legend = document.createElement('legend');
    legend.className = 'question-text';
    legend.textContent = `${qi + 1}. ${q.question}`;
    fieldset.appendChild(legend);

    const optList = document.createElement('ul');
    optList.className = 'options-list';
    optList.setAttribute('role', 'list');

    const name = `q-${lesson.id}-${qi}`;

    q.options.forEach((opt, oi) => {
      const li    = document.createElement('li');
      const lbl   = document.createElement('label');
      lbl.className = 'option-label';

      const radio = document.createElement('input');
      radio.type  = 'radio';
      radio.name  = name;
      radio.value = oi;
      radio.id    = `${name}-opt-${oi}`;
      lbl.setAttribute('for', radio.id);
      lbl.appendChild(radio);
      lbl.appendChild(document.createTextNode(opt));
      li.appendChild(lbl);
      optList.appendChild(li);
    });

    fieldset.appendChild(optList);

    const checkBtn = document.createElement('button');
    checkBtn.className = 'check-btn';
    checkBtn.textContent = 'Check answer';

    const feedback = document.createElement('div');
    feedback.className = 'quiz-feedback';
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');

    checkBtn.addEventListener('click', () => {
      const selected = fieldset.querySelector(`input[name="${name}"]:checked`);
      if (!selected) {
        feedback.textContent = 'Please select an answer before checking.';
        feedback.className = 'quiz-feedback show incorrect';
        announce('Please select an answer before checking.');
        return;
      }
      const isCorrect = parseInt(selected.value) === q.answer;
      fieldset.querySelectorAll('.option-label').forEach((lbl, i) => {
        lbl.classList.remove('correct', 'incorrect');
        if (i === q.answer) lbl.classList.add('correct');
        else if (i === parseInt(selected.value) && !isCorrect) lbl.classList.add('incorrect');
      });
      if (isCorrect) {
        feedback.textContent = 'Correct! Well done.';
        feedback.className = 'quiz-feedback show correct';
        announce('Correct! Well done.');
        markComplete(moduleId, lessonIndex);
        const pct = Math.round((state.completedLessons[moduleId].size / total) * 100);
        progressFill.style.width = `${pct}%`;
        progressFill.setAttribute('aria-valuenow', pct);
      } else {
        feedback.textContent = `Not quite. The correct answer is: ${q.options[q.answer]}`;
        feedback.className = 'quiz-feedback show incorrect';
        announce(`Not quite. The correct answer is: ${q.options[q.answer]}`);
      }
    });

    fieldset.appendChild(checkBtn);
    fieldset.appendChild(feedback);
    qDiv.appendChild(fieldset);
    section.appendChild(qDiv);
  });

  return section;
}

// ===== Exercise builder =====
function buildExercise(exercise, lessonTitle, moduleId) {
  // Normalise: old format {prompt, starterCode, solution} → stepped format
  const steps = exercise.steps || [
    { instruction: exercise.prompt, starterCode: exercise.starterCode, solution: exercise.solution },
  ];

  const isExecutable = EXECUTABLE_LANGUAGES.has(moduleId);
  const schema = exercise.schema || null;

  const section = document.createElement('div');
  section.className = 'exercise-section';
  section.id = 'exercise-section';

  const h2 = document.createElement('h2');
  h2.className = 'exercise-title';
  h2.textContent = 'Coding Exercise';
  section.appendChild(h2);

  // Step counter header
  const stepHeader = document.createElement('div');
  stepHeader.className = 'step-header';
  stepHeader.setAttribute('aria-live', 'polite');
  section.appendChild(stepHeader);

  // Instruction paragraph
  const instructionEl = document.createElement('p');
  instructionEl.className = 'exercise-prompt';
  section.appendChild(instructionEl);

  const edId = `editor-${lessonTitle.replace(/\W+/g, '-')}`;

  const lbl = document.createElement('label');
  lbl.setAttribute('for', edId);
  lbl.className = 'sr-only-label';
  section.appendChild(lbl);

  const editor = document.createElement('textarea');
  editor.className = 'code-editor';
  editor.id = edId;
  editor.setAttribute('spellcheck', 'false');
  editor.setAttribute('autocorrect', 'off');
  editor.setAttribute('autocapitalize', 'off');

  editor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const s = editor.selectionStart;
      const end = editor.selectionEnd;
      editor.value = editor.value.substring(0, s) + '    ' + editor.value.substring(end);
      editor.selectionStart = editor.selectionEnd = s + 4;
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runBtn.click();
    }
  });

  section.appendChild(editor);

  const actions = document.createElement('div');
  actions.className = 'exercise-actions';

  const runBtn = document.createElement('button');
  runBtn.className = 'btn-primary';
  runBtn.textContent = isExecutable ? 'Run code  Ctrl+Enter' : 'Submit code';

  const solBtn = document.createElement('button');
  solBtn.className = 'btn-secondary';
  solBtn.textContent = 'Show solution';

  const resetBtn = document.createElement('button');
  resetBtn.className = 'btn-secondary';
  resetBtn.textContent = 'Reset';

  actions.appendChild(runBtn);
  actions.appendChild(solBtn);
  actions.appendChild(resetBtn);
  section.appendChild(actions);

  const output = document.createElement('div');
  output.className = 'exercise-output';
  output.setAttribute('role', 'region');
  output.setAttribute('aria-label', 'Exercise output');
  output.setAttribute('aria-live', 'polite');
  section.appendChild(output);

  // Next step / finish button — hidden until step is passed
  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn-primary step-next-btn';
  nextBtn.setAttribute('hidden', '');
  section.appendChild(nextBtn);

  let currentStep = 0;
  let stepPassed = false;
  let solShown = false;

  function renderStep(idx) {
    const step = steps[idx];
    stepPassed = false;
    solShown = false;
    nextBtn.setAttribute('hidden', '');
    output.textContent = '';
    output.classList.remove('show', 'success', 'error');

    stepHeader.textContent = `Step ${idx + 1} of ${steps.length}`;
    instructionEl.textContent = step.instruction;
    lbl.textContent = `Code editor for step ${idx + 1}: ${step.instruction}`;
    editor.setAttribute('aria-label', `Code editor, step ${idx + 1}: ${step.instruction}`);
    editor.value = step.starterCode;
    solBtn.textContent = 'Show solution';

    nextBtn.textContent = idx < steps.length - 1 ? 'Next step →' : 'Finish exercise ✓';
    announce(`Step ${idx + 1} of ${steps.length}. ${step.instruction}`);
  }

  function markStepPassed(message, isSuccess) {
    stepPassed = true;
    output.textContent = message;
    output.classList.add('show');
    output.classList.toggle('success', isSuccess);
    output.classList.toggle('error', !isSuccess);
    if (isSuccess) nextBtn.removeAttribute('hidden');
  }

  runBtn.addEventListener('click', async () => {
    const step = steps[currentStep];
    const code = editor.value;

    if (isExecutable && window.electronAPI) {
      runBtn.disabled = true;
      runBtn.textContent = 'Running…';
      output.textContent = 'Running your code…';
      output.classList.add('show');
      output.classList.remove('success', 'error');

      try {
        const result = await window.electronAPI.runCode(code, moduleId, schema);
        runBtn.disabled = false;
        runBtn.textContent = 'Run code  Ctrl+Enter';

        if (result.success) {
          const out = result.output || '(No output)';
          if (step.expectedOutput !== undefined) {
            const passed = result.output.trim() === step.expectedOutput.trim();
            const msg = passed
              ? `Output:\n${result.output}\n\n✓ Correct!`
              : `Output:\n${result.output}\n\nExpected:\n${step.expectedOutput}\n\nNot quite — check your code and try again.`;
            markStepPassed(msg, passed);
          } else {
            markStepPassed(`Output:\n${out}\n\nLooks good! Check the output matches what you expected.`, true);
          }
        } else {
          output.textContent = `Error:\n${result.output}`;
          output.classList.add('show', 'error');
          output.classList.remove('success');
          announce('Your code has an error. Read the error message below the editor.');
        }
      } catch (err) {
        runBtn.disabled = false;
        runBtn.textContent = 'Run code  Ctrl+Enter';
        output.textContent = 'Could not run code. Check that the required runtime is installed.';
        output.classList.add('show', 'error');
      }
    } else {
      markStepPassed('Code submitted! Compare your work with the solution to check your understanding.', true);
    }
  });

  solBtn.addEventListener('click', () => {
    solShown = !solShown;
    const step = steps[currentStep];
    if (solShown) {
      editor.value = step.solution;
      solBtn.textContent = 'Hide solution';
      output.textContent = 'Solution loaded. Study it, then press Reset to try again.';
      output.classList.add('show');
      output.classList.remove('success', 'error');
      announce('Solution loaded into the code editor.');
    } else {
      editor.value = step.starterCode;
      solBtn.textContent = 'Show solution';
      output.textContent = '';
      output.classList.remove('show', 'success', 'error');
      announce('Editor reset to starter code.');
    }
  });

  resetBtn.addEventListener('click', () => {
    editor.value = steps[currentStep].starterCode;
    solShown = false;
    solBtn.textContent = 'Show solution';
    output.textContent = '';
    output.classList.remove('show', 'success', 'error');
    stepPassed = false;
    nextBtn.setAttribute('hidden', '');
    announce('Editor reset to starter code.');
  });

  nextBtn.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      renderStep(currentStep);
      editor.focus();
    } else {
      output.textContent = 'Exercise complete! Great work.';
      output.classList.add('show', 'success');
      nextBtn.setAttribute('hidden', '');
      announce('Exercise complete!');
    }
  });

  renderStep(0);
  return section;
}

// ===== Welcome screen =====
function showWelcome() {
  mainContent.innerHTML = '';

  const welcome = document.createElement('section');
  welcome.className = 'welcome-screen';
  welcome.setAttribute('aria-labelledby', 'welcome-heading');

  const h1 = document.createElement('h1');
  h1.id = 'welcome-heading';
  h1.textContent = 'CodeMaster';

  const p1 = document.createElement('p');
  p1.textContent = 'A fully accessible coding learning platform built for keyboard and screen reader users. No experience needed — start from the very beginning.';

  const p2 = document.createElement('p');
  p2.textContent = 'Choose a module below or from the sidebar to get started.';

  const cards = document.createElement('div');
  cards.className = 'module-cards';
  cards.setAttribute('role', 'list');

  const defs = [
    { id: 'html',       icon: '📄', label: 'HTML',        desc: '10 lessons — Start here' },
    { id: 'css',        icon: '🎨', label: 'CSS',         desc: '9 lessons' },
    { id: 'javascript', icon: '⚡', label: 'JavaScript',  desc: '9 lessons' },
    { id: 'python',     icon: '🐍', label: 'Python',      desc: '10 lessons' },
    { id: 'sql',        icon: '🗄️', label: 'SQL',         desc: '10 lessons' },
    { id: 'powershell', icon: '💻', label: 'PowerShell',  desc: '8 lessons' },
  ];

  defs.forEach(({ id, icon, label, desc }) => {
    const card = document.createElement('button');
    card.className = 'module-start-card';
    card.setAttribute('role', 'listitem');

    const iconSpan = document.createElement('span');
    iconSpan.className = 'icon';
    iconSpan.setAttribute('aria-hidden', 'true');
    iconSpan.textContent = icon;

    const h3  = document.createElement('h3');
    h3.textContent = label;

    const pDesc = document.createElement('p');
    pDesc.textContent = desc;

    card.appendChild(iconSpan);
    card.appendChild(h3);
    card.appendChild(pDesc);
    card.addEventListener('click', () => {
      const navId = id;
      const li  = document.getElementById(`nav-item-${navId}`);
      const btn = li && li.querySelector('.module-nav-btn');
      if (li && btn) openLessonList(li, btn, navId);
      loadModule(id);
    });
    cards.appendChild(card);
  });

  welcome.appendChild(h1);
  welcome.appendChild(p1);
  welcome.appendChild(p2);
  welcome.appendChild(cards);
  mainContent.appendChild(welcome);
  h1.setAttribute('tabindex', '-1');
  h1.focus();
}

// ===== Auto-updater UI =====
function initUpdater() {
  const banner          = document.getElementById('update-banner');
  const versionLabel    = document.getElementById('update-version-label');
  const notesBody       = document.getElementById('update-notes');
  const btnDownload     = document.getElementById('btn-download-update');
  const btnDismiss      = document.getElementById('btn-dismiss-update');
  const progressSection = document.getElementById('update-progress-section');
  const progressBar     = document.getElementById('update-progress-bar');
  const progressLabel   = document.getElementById('update-progress-label');
  const restartSection  = document.getElementById('update-restart-section');
  const btnInstall      = document.getElementById('btn-install-update');

  if (!window.electronAPI) return;

  window.electronAPI.getVersion().then(v => {
    const el = document.getElementById('app-version-display');
    if (el) el.textContent = `v${v}`;
  });

  window.electronAPI.onUpdateAvailable((info) => {
    versionLabel.textContent = `Version ${info.version}`;
    const notes = info.releaseNotes
      ? info.releaseNotes.replace(/<[^>]+>/g, '').trim()
      : 'No release notes provided.';
    notesBody.textContent = notes;
    banner.hidden = false;
    announce(`Update available: Version ${info.version}. Use the update bar to download.`);
    btnDownload.focus();
  });

  window.electronAPI.onDownloadProgress((progress) => {
    progressSection.hidden = false;
    btnDownload.disabled = true;
    btnDownload.textContent = 'Downloading...';
    progressBar.style.setProperty('--progress', `${progress.percent}%`);
    progressBar.setAttribute('aria-valuenow', progress.percent);
    progressLabel.textContent = `${progress.percent}%`;
  });

  window.electronAPI.onUpdateDownloaded((info) => {
    progressSection.hidden = true;
    restartSection.hidden = false;
    announce(`Update downloaded. Version ${info.version} is ready. Press Restart and Install to apply.`);
    btnInstall.focus();
  });

  window.electronAPI.onUpdateError((msg) => {
    announce(`Update error: ${msg}`);
    btnDownload.disabled = false;
    btnDownload.textContent = 'Retry Download';
    progressSection.hidden = true;
  });

  btnDownload.addEventListener('click', () => {
    window.electronAPI.downloadUpdate();
    announce('Downloading update. Please wait.');
  });

  btnDismiss.addEventListener('click', () => {
    banner.hidden = true;
    announce('Update notification dismissed.');
  });

  btnInstall.addEventListener('click', () => {
    window.electronAPI.installUpdate();
  });
}

// ===== Init =====
function init() {
  loadProgress();
  buildSidebar();
  initFontSize();
  showWelcome();
  initUpdater();

  document.getElementById('glossary-btn').addEventListener('click', () => {
    showGlossary();
    // Deactivate sidebar module highlights
    document.querySelectorAll('.module-nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.lesson-nav-btn').forEach(b => b.classList.remove('active'));
  });
}

document.addEventListener('DOMContentLoaded', init);
