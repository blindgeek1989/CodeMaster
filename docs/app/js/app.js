'use strict';

// ===== Module data =====
const MODULES = {
  git:                  window.gitModule,
  github:               window.githubModule,
  typescript:           window.typescriptModule,
  'async-js':           window.asyncJsModule,
  react:                window.reactModule,
  nextjs:               window.nextjsModule,
  nodejs:               window.nodejsModule,
  jest:                 window.jestModule,
  regex:                window.regexModule,
  'prompt-engineering': window.promptEngineeringModule,
  think:                window.thinkProgrammerModule,
  html:                 window.htmlModule,
  css:                  window.cssModule,
  javascript:           window.jsModule,
  python:               window.pythonModule,
  sql:                  window.sqlModule,
  powershell:           window.powershellModule,
  aria:                 window.ariaModule,
  'scrum-intro':        window.scrumIntroModule,
  'scrum-master':       window.scrumMasterModule,
  'scrum-ai':           window.scrumMasterAIModule,
  'scrum-exam':         window.scrumExamPrepModule,
};

// ===== Module metadata (icon, label, optional prereqs, category) =====
const MODULE_DEFS = [
  { id: 'think',                icon: '🧠', label: 'Think Like a Programmer', note: 'Start here',  category: 'beginner' },
  { id: 'html',                 icon: '📄', label: 'HTML',                                          category: 'beginner' },
  { id: 'css',                  icon: '🎨', label: 'CSS',                    prereqs: ['html'],      category: 'beginner' },
  { id: 'javascript',           icon: '⚡', label: 'JavaScript',             prereqs: ['html', 'css'], category: 'intermediate' },
  { id: 'python',               icon: '🐍', label: 'Python',                                        category: 'beginner' },
  { id: 'sql',                  icon: '🗄️', label: 'SQL',                                           category: 'beginner' },
  { id: 'powershell',           icon: '💻', label: 'PowerShell',                                    category: 'beginner' },
  { id: 'aria',                 icon: '♿', label: 'ARIA',                   prereqs: ['html'],      category: 'intermediate' },
  { id: 'git',                  icon: '🌿', label: 'Git & Version Control',                         category: 'beginner' },
  { id: 'github',               icon: '🐙', label: 'GitHub',                prereqs: ['git'],       category: 'intermediate' },
  { id: 'typescript',           icon: '🔷', label: 'TypeScript',            prereqs: ['javascript'], category: 'advanced' },
  { id: 'async-js',             icon: '⏳', label: 'Async JavaScript',      prereqs: ['javascript'], category: 'intermediate' },
  { id: 'react',                icon: '⚛️', label: 'React',                prereqs: ['javascript', 'async-js'], category: 'advanced' },
  { id: 'nextjs',               icon: '▲',  label: 'Next.js',               prereqs: ['react'],     category: 'advanced' },
  { id: 'nodejs',               icon: '🟢', label: 'Node.js & Express',     prereqs: ['javascript'], category: 'intermediate' },
  { id: 'jest',                 icon: '🧪', label: 'Testing with Jest',     prereqs: ['javascript'], category: 'intermediate' },
  { id: 'regex',                icon: '🔍', label: 'Regular Expressions',   prereqs: ['javascript'], category: 'intermediate' },
  { id: 'prompt-engineering',   icon: '✨', label: 'Prompt Engineering',                            category: 'beginner' },
  { id: 'scrum-intro',          icon: '🔄', label: 'Intro to Scrum',                               category: 'beginner' },
  { id: 'scrum-master',         icon: '🏉', label: 'Scrum Master',          prereqs: ['scrum-intro'], category: 'intermediate' },
  { id: 'scrum-ai',             icon: '🤖', label: 'Scrum Master with AI',  prereqs: ['scrum-master'], category: 'advanced' },
  { id: 'scrum-exam',           icon: '📝', label: 'Scrum Exam Prep',       prereqs: ['scrum-master'], category: 'advanced' },
];

// ===== Languages that support real code execution =====
const EXECUTABLE_LANGUAGES = new Set(['python', 'sql', 'powershell']);

// ===== Active category filter for welcome screen =====
let activeCategory = 'all';

// ===== State =====
let state = {
  activeModuleId: null,
  currentLessonIndex: -1,   // -1 = module intro screen
  completedLessons: {},      // { moduleId: Set<number> }
};

// ===== DOM refs =====
const mainContent  = document.getElementById('main-content');
const announcer    = document.getElementById('sr-announcer');
const searchInput  = document.getElementById('lesson-search');
const searchResults = document.getElementById('search-results');
const searchStatus  = document.getElementById('search-status');
const bookmarksPanel       = document.getElementById('bookmarks-panel');
const bookmarksToggleBtn   = document.getElementById('bookmarks-toggle-btn');
const bookmarksList        = document.getElementById('bookmarks-list');
const homeBtn              = document.getElementById('home-btn');

// ===== Announce to screen reader =====
function announce(message) {
  announcer.textContent = '';
  setTimeout(() => { announcer.textContent = message; }, 150);
}

function focusMainHeading() {
  const h = mainContent.querySelector('h1, h2');
  if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: false }); }
}

// ===== SEARCH ===== --------------------------------------------------------

function buildSearchIndex() {
  const index = [];
  Object.entries(MODULES).forEach(([moduleId, mod]) => {
    if (!mod) return;
    mod.lessons.forEach((lesson, i) => {
      index.push({
        moduleId,
        navId: moduleId,
        lessonIndex: i,
        moduleName: mod.title,
        lessonTitle: lesson.title,
        searchText: (lesson.title + ' ' + (lesson.content || '')).toLowerCase(),
      });
    });
  });
  return index;
}

const searchIndex = buildSearchIndex();

function getExcerpt(lesson, query) {
  const content = lesson.content || '';
  const lower = content.toLowerCase();
  const pos = lower.indexOf(query.toLowerCase());
  if (pos === -1) return content.slice(0, 100);
  const start = Math.max(0, pos - 40);
  const end = Math.min(content.length, pos + 80);
  return (start > 0 ? '…' : '') + content.slice(start, end).trim() + (end < content.length ? '…' : '');
}

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim();
  if (q.length < 2) {
    searchResults.hidden = true;
    searchResults.innerHTML = '';
    searchStatus.textContent = '';
    return;
  }
  const lower = q.toLowerCase();
  const hits = searchIndex.filter(e => e.searchText.includes(lower)).slice(0, 12);

  searchResults.innerHTML = '';
  if (hits.length === 0) {
    const li = document.createElement('li');
    li.className = 'search-result-item';
    li.textContent = 'No results found.';
    li.style.padding = '0.6rem 0.85rem';
    li.style.color = 'var(--text-muted)';
    li.style.fontSize = '0.85rem';
    searchResults.appendChild(li);
  } else {
    const mod = Object.values(MODULES).find(m => m && m.lessons);
    hits.forEach(hit => {
      const li = document.createElement('li');
      li.className = 'search-result-item';
      li.setAttribute('role', 'option');

      const btn = document.createElement('button');
      btn.className = 'search-result-btn';

      const moduleSpan = document.createElement('span');
      moduleSpan.className = 'search-result-module';
      moduleSpan.textContent = hit.moduleName;

      const titleSpan = document.createElement('span');
      titleSpan.className = 'search-result-title';
      titleSpan.textContent = hit.lessonTitle;

      const srcMod = MODULES[hit.moduleId];
      const excerpt = srcMod ? getExcerpt(srcMod.lessons[hit.lessonIndex], q) : '';
      const excerptSpan = document.createElement('span');
      excerptSpan.className = 'search-result-excerpt';
      excerptSpan.textContent = excerpt;

      btn.appendChild(moduleSpan);
      btn.appendChild(titleSpan);
      btn.appendChild(excerptSpan);

      btn.setAttribute('aria-label', `${hit.lessonTitle} in ${hit.moduleName}`);

      btn.addEventListener('click', () => {
        searchResults.hidden = true;
        searchInput.value = '';
        searchStatus.textContent = '';
        showLesson(hit.moduleId, hit.lessonIndex);
      });

      li.appendChild(btn);
      searchResults.appendChild(li);
    });
  }
  searchResults.hidden = false;
  const count = hits.length;
  searchStatus.textContent = count === 0 ? 'No results.' : `${count} result${count !== 1 ? 's' : ''} for "${q}"`;
});

// Close search results when focus leaves the search area
searchInput.addEventListener('blur', () => {
  setTimeout(() => {
    if (!searchResults.contains(document.activeElement)) {
      searchResults.hidden = true;
    }
  }, 150);
});

// ===== BOOKMARKS ===== ------------------------------------------------------

const BOOKMARKS_KEY = 'codemaster-bookmarks';

function loadBookmarks() {
  try { return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]'); }
  catch { return []; }
}

function saveBookmarks(arr) {
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(arr));
}

function isBookmarked(moduleId, lessonIndex) {
  return loadBookmarks().some(b => b.moduleId === moduleId && b.lessonIndex === lessonIndex);
}

function toggleBookmark(moduleId, lessonIndex) {
  const bookmarks = loadBookmarks();
  const idx = bookmarks.findIndex(b => b.moduleId === moduleId && b.lessonIndex === lessonIndex);
  if (idx !== -1) {
    bookmarks.splice(idx, 1);
    saveBookmarks(bookmarks);
    return false;
  }
  const mod = MODULES[moduleId];
  if (!mod) return false;
  const lesson = mod.lessons[lessonIndex];
  if (!lesson) return false;
  bookmarks.push({ moduleId, lessonIndex, moduleTitle: mod.title, lessonTitle: lesson.title });
  saveBookmarks(bookmarks);
  return true;
}

function renderBookmarksSidebar() {
  const bookmarks = loadBookmarks();
  bookmarksList.innerHTML = '';
  if (bookmarks.length === 0) {
    bookmarksPanel.hidden = true;
    bookmarksToggleBtn.setAttribute('aria-expanded', 'false');
    return;
  }
  bookmarks.forEach(({ moduleId, lessonIndex, lessonTitle }) => {
    const li = document.createElement('li');
    li.className = 'bookmark-item';

    const navBtn = document.createElement('button');
    navBtn.className = 'bookmark-nav-btn';
    navBtn.textContent = lessonTitle;
    navBtn.setAttribute('aria-label', `Go to bookmarked lesson: ${lessonTitle}`);
    navBtn.addEventListener('click', () => showLesson(moduleId, lessonIndex));

    const removeBtn = document.createElement('button');
    removeBtn.className = 'bookmark-remove-btn';
    removeBtn.textContent = '×';
    removeBtn.setAttribute('aria-label', `Remove bookmark: ${lessonTitle}`);
    removeBtn.addEventListener('click', () => {
      toggleBookmark(moduleId, lessonIndex);
      renderBookmarksSidebar();
      announce(`Bookmark removed: ${lessonTitle}`);
    });

    li.appendChild(navBtn);
    li.appendChild(removeBtn);
    bookmarksList.appendChild(li);
  });
}

// ===== QUIZ HISTORY ===== ---------------------------------------------------

const QUIZ_HISTORY_KEY = 'codemaster-quiz-history';

function getQuizHistory(moduleId, lessonIndex) {
  try {
    const all = JSON.parse(localStorage.getItem(QUIZ_HISTORY_KEY) || '{}');
    return all[`${moduleId}:${lessonIndex}`] || { attempts: 0, best: null, last: null };
  } catch { return { attempts: 0, best: null, last: null }; }
}

function recordQuizResult(moduleId, lessonIndex, score, total) {
  try {
    const all = JSON.parse(localStorage.getItem(QUIZ_HISTORY_KEY) || '{}');
    const key = `${moduleId}:${lessonIndex}`;
    const prev = all[key] || { attempts: 0, best: null, last: null };
    const pct = Math.round((score / total) * 100);
    all[key] = {
      attempts: prev.attempts + 1,
      best: prev.best === null ? pct : Math.max(prev.best, pct),
      last: pct,
    };
    localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(all));
  } catch { /* storage unavailable */ }
}

function buildQuizHistoryWidget(moduleId, lessonIndex) {
  const hist = getQuizHistory(moduleId, lessonIndex);
  if (hist.attempts === 0) return null;

  const section = document.createElement('div');
  section.className = 'quiz-history-section';
  section.setAttribute('aria-label', 'Quiz history');

  const title = document.createElement('div');
  title.className = 'quiz-history-title';
  title.textContent = 'Your quiz history';
  section.appendChild(title);

  const stats = document.createElement('div');
  stats.className = 'quiz-history-stats';

  const addStat = (label, value, passing) => {
    const wrap = document.createElement('div');
    wrap.className = 'quiz-history-stat';
    const lbl = document.createElement('span');
    lbl.className = 'quiz-history-stat-label';
    lbl.textContent = label;
    const val = document.createElement('span');
    val.className = 'quiz-history-stat-value' + (passing === true ? ' passing' : passing === false ? ' failing' : '');
    val.textContent = value;
    wrap.appendChild(lbl);
    wrap.appendChild(val);
    stats.appendChild(wrap);
  };

  addStat('Attempts', hist.attempts);
  addStat('Best score', hist.best + '%', hist.best >= 80);
  addStat('Last score', hist.last + '%', hist.last >= 80);

  section.appendChild(stats);
  return section;
}

// ===== TIMED EXAM MODE ===== ------------------------------------------------

const EXAM_MODULE_IDS = new Set(['scrum-exam']);
const EXAM_DURATION_SECONDS = 60 * 60; // 60 minutes
const EXAM_PASS_THRESHOLD = 0.85;

function isExamLesson(moduleId, lessonIndex) {
  if (!EXAM_MODULE_IDS.has(moduleId)) return false;
  const mod = MODULES[moduleId];
  if (!mod) return false;
  const lesson = mod.lessons[lessonIndex];
  return lesson && lesson.quiz && lesson.quiz.length >= 20;
}

function showTimedExam(moduleId, lessonIndex) {
  const mod = MODULES[moduleId];
  const lesson = mod.lessons[lessonIndex];
  const questions = lesson.quiz;

  mainContent.innerHTML = '';
  announce('Timed exam started. 60 minutes remaining.');

  // Timer bar
  const timerBar = document.createElement('div');
  timerBar.className = 'exam-timer-bar';
  timerBar.setAttribute('role', 'timer');
  timerBar.setAttribute('aria-label', 'Exam timer');

  const timerLabel = document.createElement('span');
  timerLabel.className = 'exam-timer-label';
  timerLabel.textContent = 'Time remaining';

  const timerDisplay = document.createElement('span');
  timerDisplay.className = 'exam-timer-display';
  timerDisplay.setAttribute('aria-live', 'off');
  timerDisplay.id = 'exam-timer-display';

  const progressText = document.createElement('span');
  progressText.className = 'exam-progress-text';
  progressText.textContent = `${questions.length} questions`;

  timerBar.appendChild(timerLabel);
  timerBar.appendChild(timerDisplay);
  timerBar.appendChild(progressText);
  mainContent.appendChild(timerBar);

  // Questions wrap
  const wrap = document.createElement('div');
  wrap.className = 'exam-mode-wrap';

  const h1 = document.createElement('h1');
  h1.className = 'module-title';
  h1.textContent = lesson.title;
  h1.setAttribute('tabindex', '-1');
  wrap.appendChild(h1);

  // Build question blocks — store selected answers
  const answers = new Array(questions.length).fill(null);
  const radioGroups = [];

  questions.forEach((q, qi) => {
    const block = document.createElement('div');
    block.className = 'exam-question-block';
    block.id = `exam-q-${qi}`;

    const num = document.createElement('div');
    num.className = 'exam-question-num';
    num.textContent = `Question ${qi + 1} of ${questions.length}`;

    const text = document.createElement('p');
    text.className = 'exam-question-text';
    text.textContent = q.question;

    const optList = document.createElement('ul');
    optList.className = 'exam-options';
    optList.setAttribute('role', 'group');
    optList.setAttribute('aria-labelledby', `exam-q-label-${qi}`);
    text.id = `exam-q-label-${qi}`;

    const groupRadios = [];
    q.options.forEach((opt, oi) => {
      const li = document.createElement('li');
      const label = document.createElement('label');
      label.className = 'exam-option-label';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = `exam-q-${qi}`;
      radio.value = opt;
      radio.addEventListener('change', () => { answers[qi] = opt; });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(opt));
      li.appendChild(label);
      optList.appendChild(li);
      groupRadios.push(radio);
    });

    radioGroups.push(groupRadios);
    block.appendChild(num);
    block.appendChild(text);
    block.appendChild(optList);
    wrap.appendChild(block);
  });

  // Submit button
  const submitWrap = document.createElement('div');
  submitWrap.className = 'exam-submit-wrap';
  const submitBtn = document.createElement('button');
  submitBtn.className = 'btn-start';
  submitBtn.textContent = 'Submit Exam';
  submitBtn.addEventListener('click', () => finishExam(moduleId, lessonIndex, questions, answers, secondsLeft));
  submitWrap.appendChild(submitBtn);
  wrap.appendChild(submitWrap);
  mainContent.appendChild(wrap);

  // Focus heading
  h1.focus();

  // Timer
  let secondsLeft = EXAM_DURATION_SECONDS;
  const announcedAt = new Set();

  const formatTime = s => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  timerDisplay.textContent = formatTime(secondsLeft);

  const timerInterval = setInterval(() => {
    secondsLeft--;
    timerDisplay.textContent = formatTime(secondsLeft);

    if (secondsLeft <= 300 && !announcedAt.has(300)) {
      announcedAt.add(300); announce('5 minutes remaining on the exam.');
      timerDisplay.classList.add('warning');
    }
    if (secondsLeft <= 60 && !announcedAt.has(60)) {
      announcedAt.add(60); announce('1 minute remaining on the exam.');
      timerDisplay.classList.remove('warning');
      timerDisplay.classList.add('critical');
    }
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      announce('Time is up. Submitting exam.');
      finishExam(moduleId, lessonIndex, questions, answers, 0);
    }
  }, 1000);

  // Store interval ref so finishExam can clear it
  mainContent.dataset.examInterval = timerInterval;
}

function finishExam(moduleId, lessonIndex, questions, answers, secondsLeft) {
  const interval = mainContent.dataset.examInterval;
  if (interval) clearInterval(parseInt(interval, 10));

  let correct = 0;
  questions.forEach((q, i) => { if (answers[i] === q.answer) correct++; });
  const total = questions.length;
  const pct = Math.round((correct / total) * 100);
  const passed = correct / total >= EXAM_PASS_THRESHOLD;

  recordQuizResult(moduleId, lessonIndex, correct, total);

  mainContent.innerHTML = '';

  const results = document.createElement('div');
  results.className = 'exam-results';

  const h1 = document.createElement('h1');
  h1.className = 'module-title';
  h1.setAttribute('tabindex', '-1');
  h1.textContent = passed ? 'Exam Passed!' : 'Keep Practising';
  results.appendChild(h1);

  const score = document.createElement('div');
  score.className = `exam-results-score ${passed ? 'pass' : 'fail'}`;
  score.textContent = `${pct}%`;
  results.appendChild(score);

  const verdict = document.createElement('p');
  verdict.className = 'exam-results-verdict';
  verdict.textContent = `${correct} of ${total} correct`;
  results.appendChild(verdict);

  const detail = document.createElement('p');
  detail.className = 'exam-results-detail';
  detail.textContent = passed
    ? 'You met the PSM I passing threshold of 85%. Well done!'
    : `The PSM I passing threshold is 85% (${Math.ceil(total * EXAM_PASS_THRESHOLD)} correct). Review the lessons and try again.`;
  results.appendChild(detail);

  // Breakdown
  const breakdown = document.createElement('div');
  breakdown.className = 'exam-results-breakdown';
  const breakTitle = document.createElement('div');
  breakTitle.className = 'exam-results-breakdown-title';
  breakTitle.textContent = 'Question breakdown';
  breakdown.appendChild(breakTitle);

  questions.forEach((q, i) => {
    const wasCorrect = answers[i] === q.answer;
    const row = document.createElement('div');
    row.className = 'exam-result-item';

    const icon = document.createElement('span');
    icon.className = 'exam-result-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = wasCorrect ? '✓' : '✗';

    const qText = document.createElement('span');
    qText.className = 'exam-result-question';
    qText.textContent = `Q${i + 1}: ${q.question.slice(0, 80)}${q.question.length > 80 ? '…' : ''}`;

    const ans = document.createElement('span');
    ans.className = 'exam-result-answer';
    ans.textContent = wasCorrect ? 'Correct' : `Your: ${answers[i] || 'No answer'} | Correct: ${q.answer}`;

    row.appendChild(icon);
    row.appendChild(qText);
    row.appendChild(ans);
    breakdown.appendChild(row);
  });
  results.appendChild(breakdown);

  // Actions
  const actionsDiv = document.createElement('div');
  actionsDiv.style.display = 'flex';
  actionsDiv.style.gap = '1rem';
  actionsDiv.style.justifyContent = 'center';

  const retryBtn = document.createElement('button');
  retryBtn.className = 'btn-start';
  retryBtn.textContent = 'Retake Exam';
  retryBtn.addEventListener('click', () => showTimedExam(moduleId, lessonIndex));

  const moduleBtn = document.createElement('button');
  moduleBtn.className = 'btn-primary';
  moduleBtn.textContent = 'Back to Module';
  moduleBtn.addEventListener('click', () => loadModule(moduleId));

  actionsDiv.appendChild(retryBtn);
  actionsDiv.appendChild(moduleBtn);
  results.appendChild(actionsDiv);

  mainContent.appendChild(results);
  h1.focus();
  announce(`Exam complete. You scored ${pct}%. ${passed ? 'You passed!' : 'You did not pass this time.'}`);
}

// ===== Build sidebar =====
function buildSidebar() {
  const defs = MODULE_DEFS;

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
      loadModule(id);
    });

    // Collapse lesson list when focus leaves the entire nav item (Tab or Shift+Tab)
    li.addEventListener('focusout', (e) => {
      if (!li.contains(e.relatedTarget)) {
        const ul = li.querySelector('.module-lessons');
        if (ul) ul.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
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

  const mod = MODULES[moduleNavId];
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
      showLesson(moduleNavId, i);
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
  document.querySelectorAll('.module-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.module === moduleId);
  });

  document.querySelectorAll('.lesson-nav-btn').forEach(btn => {
    const match = btn.dataset.moduleId === moduleId &&
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

  document.querySelectorAll('.module-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.module === moduleId);
  });
  document.querySelectorAll('.lesson-nav-btn').forEach(btn => btn.classList.remove('active'));

  mainContent.innerHTML = '';

  // Badge
  const badge = document.createElement('span');
  badge.className = 'module-badge';
  badge.textContent = mod.title;

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

  // Prerequisites notice
  const def = MODULE_DEFS.find(d => d.id === moduleId);
  if (def && def.prereqs && def.prereqs.length > 0) {
    const prereqDiv = document.createElement('div');
    prereqDiv.className = 'prereq-notice';
    prereqDiv.setAttribute('role', 'note');
    const label = document.createElement('span');
    label.textContent = 'Recommended first: ';
    prereqDiv.appendChild(label);
    def.prereqs.forEach((prereqId, i) => {
      const prereqDef = MODULE_DEFS.find(d => d.id === prereqId);
      if (!prereqDef) return;
      if (i > 0) prereqDiv.appendChild(document.createTextNode(' and '));
      const btn = document.createElement('button');
      btn.className = 'prereq-link';
      btn.textContent = prereqDef.label;
      btn.addEventListener('click', () => loadModule(prereqId));
      prereqDiv.appendChild(btn);
    });
    mainContent.appendChild(prereqDiv);
  }

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
  const completedCount = state.completedLessons[moduleId] ? state.completedLessons[moduleId].size : 0;
  overviewTitle.textContent = completedCount > 0
    ? `${mod.lessons.length} Lessons — ${completedCount} of ${mod.lessons.length} complete`
    : `${mod.lessons.length} Lessons`;
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

// ===== Lesson content renderer =====
function isContentHeading(text) {
  return text.length > 0 && /[A-Z]/.test(text) && !/[a-z]/.test(text);
}

function parseAndRenderText(text, container) {
  const lines = text.split('\n');
  let pendingLines = [];

  const flushParagraph = () => {
    const joined = pendingLines.join('\n').trimEnd();
    if (joined.trim()) {
      const p = document.createElement('p');
      p.className = 'lesson-para';
      p.textContent = joined;
      container.appendChild(p);
    }
    pendingLines = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
    } else if (isContentHeading(trimmed)) {
      flushParagraph();
      const h = document.createElement('h2');
      h.className = 'lesson-section-heading';
      h.textContent = trimmed;
      container.appendChild(h);
    } else {
      pendingLines.push(line.trim());
    }
  }
  flushParagraph();
}

function buildContentTable(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'content-table-wrapper';

  const table = document.createElement('table');
  table.className = 'content-table';

  if (block.caption) {
    const caption = document.createElement('caption');
    caption.textContent = block.caption;
    table.appendChild(caption);
  }

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  block.headers.forEach(headerText => {
    const th = document.createElement('th');
    th.setAttribute('scope', 'col');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  block.rows.forEach(rowData => {
    const tr = document.createElement('tr');
    rowData.forEach(cellText => {
      const td = document.createElement('td');
      td.textContent = cellText;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  wrapper.appendChild(table);
  return wrapper;
}

function renderLessonContent(lesson, container) {
  if (lesson.contentBlocks) {
    lesson.contentBlocks.forEach(block => {
      if (block.type === 'text') {
        parseAndRenderText(block.value, container);
      } else if (block.type === 'table') {
        container.appendChild(buildContentTable(block));
      } else if (block.type === 'code') {
        container.appendChild(buildCodeBlock(block));
      }
    });
  } else {
    parseAndRenderText(lesson.content, container);
  }
}

function buildCodeBlock(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'code-block-wrapper';
  wrapper.setAttribute('role', 'region');
  const langName = block.lang || 'code';
  wrapper.setAttribute('aria-label', `Code example: ${langName}`);

  const header = document.createElement('div');
  header.className = 'code-block-header';

  const langLabel = document.createElement('span');
  langLabel.className = 'code-lang-label';
  langLabel.setAttribute('aria-hidden', 'true');
  langLabel.textContent = langName;
  header.appendChild(langLabel);

  if (block.caption) {
    const caption = document.createElement('span');
    caption.className = 'code-block-caption';
    caption.textContent = block.caption;
    header.appendChild(caption);
  }

  const copyBtn = document.createElement('button');
  copyBtn.className = 'code-copy-btn';
  copyBtn.textContent = 'Copy';
  copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(block.value).then(() => {
      copyBtn.textContent = 'Copied';
      announce('Code copied to clipboard.');
      setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
    });
  });
  header.appendChild(copyBtn);

  const pre = document.createElement('pre');
  pre.className = 'code-block';
  if (block.lang) pre.setAttribute('lang', block.lang);

  const code = document.createElement('code');
  code.textContent = block.value;
  pre.appendChild(code);

  wrapper.appendChild(header);
  wrapper.appendChild(pre);
  return wrapper;
}

// ===== Show a single lesson =====
function showLesson(moduleId, lessonIndex) {
  // Route exam lessons to timed exam UI
  if (isExamLesson(moduleId, lessonIndex)) {
    state.activeModuleId     = moduleId;
    state.currentLessonIndex = lessonIndex;
    updateSidebarActive(moduleId, lessonIndex);
    showTimedExam(moduleId, lessonIndex);
    return;
  }

  state.activeModuleId     = moduleId;
  state.currentLessonIndex = lessonIndex;
  saveLastPosition(moduleId, lessonIndex);

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

  // ── Bookmark button ──
  const bookmarkBtn = document.createElement('button');
  bookmarkBtn.className = 'lesson-bookmark-btn';
  const bookmarked = isBookmarked(moduleId, lessonIndex);
  bookmarkBtn.setAttribute('aria-pressed', String(bookmarked));
  bookmarkBtn.setAttribute('aria-label', bookmarked ? `Remove bookmark for ${lesson.title}` : `Bookmark ${lesson.title}`);
  bookmarkBtn.textContent = bookmarked ? '★' : '☆';
  bookmarkBtn.addEventListener('click', () => {
    const nowBookmarked = toggleBookmark(moduleId, lessonIndex);
    bookmarkBtn.setAttribute('aria-pressed', String(nowBookmarked));
    bookmarkBtn.setAttribute('aria-label', nowBookmarked ? `Remove bookmark for ${lesson.title}` : `Bookmark ${lesson.title}`);
    bookmarkBtn.textContent = nowBookmarked ? '★' : '☆';
    renderBookmarksSidebar();
    announce(nowBookmarked ? `Bookmarked: ${lesson.title}` : `Bookmark removed: ${lesson.title}`);
  });

  // ── Copy lesson text button ──
  const copyBtn = document.createElement('button');
  copyBtn.className = 'lesson-copy-btn';
  copyBtn.textContent = 'Copy lesson';
  copyBtn.setAttribute('aria-label', 'Copy lesson content to clipboard');
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(lesson.content || '').then(() => {
      copyBtn.textContent = 'Copied!';
      announce('Lesson content copied to clipboard.');
      setTimeout(() => { copyBtn.textContent = 'Copy lesson'; }, 2000);
    }).catch(() => {
      announce('Copy failed. Please select and copy the text manually.');
    });
  });

  topBar.appendChild(moduleCrumb);
  topBar.appendChild(lessonCounter);
  topBar.appendChild(copyBtn);
  topBar.appendChild(bookmarkBtn);
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
  renderLessonContent(lesson, contentBox);
  mainContent.appendChild(contentBox);

  // ── Quiz ──
  if (lesson.quiz && lesson.quiz.length) {
    mainContent.appendChild(buildQuiz(lesson, progressFill, total, moduleId, lessonIndex));
    const histWidget = buildQuizHistoryWidget(moduleId, lessonIndex);
    if (histWidget) mainContent.appendChild(histWidget);
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

// ===== Last position — resume dialog =====
function saveLastPosition(moduleId, lessonIndex) {
  try {
    const mod = MODULES[moduleId];
    if (!mod) return;
    localStorage.setItem('codemaster-last-position', JSON.stringify({
      moduleId,
      lessonIndex,
      moduleTitle: mod.title,
      lessonTitle: mod.lessons[lessonIndex] ? mod.lessons[lessonIndex].title : '',
    }));
  } catch (_) {}
}

function showResumeDialog(moduleId, lessonIndex, moduleTitle, lessonTitle) {
  const overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'resume-dialog-title');

  const box = document.createElement('div');
  box.className = 'dialog-box';

  const h2 = document.createElement('h2');
  h2.id = 'resume-dialog-title';
  h2.textContent = 'Welcome back!';

  const p = document.createElement('p');
  p.textContent = `You were last on "${lessonTitle}" in ${moduleTitle}. Would you like to resume?`;

  const actions = document.createElement('div');
  actions.className = 'dialog-actions';

  const resumeBtn = document.createElement('button');
  resumeBtn.className = 'btn-primary';
  resumeBtn.textContent = 'Resume';

  const freshBtn = document.createElement('button');
  freshBtn.className = 'btn-secondary';
  freshBtn.textContent = 'Start Fresh';

  const dismiss = () => { document.body.removeChild(overlay); };

  resumeBtn.addEventListener('click', () => { dismiss(); showLesson(moduleId, lessonIndex); });
  freshBtn.addEventListener('click', () => {
    dismiss();
    try { localStorage.removeItem('codemaster-last-position'); } catch (_) {}
    announce('Home screen.');
  });

  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { dismiss(); announce('Resume cancelled.'); return; }
    if (e.key === 'Tab') {
      const focusable = Array.from(box.querySelectorAll('button'));
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });

  actions.appendChild(resumeBtn);
  actions.appendChild(freshBtn);
  box.appendChild(h2);
  box.appendChild(p);
  box.appendChild(actions);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  resumeBtn.focus();
  announce(`Welcome back! You were on "${lessonTitle}" in ${moduleTitle}. Press Resume to continue or Start Fresh for the home screen.`);
}

function checkAndShowResumeDialog() {
  showWelcome();
  try {
    const raw = localStorage.getItem('codemaster-last-position');
    if (!raw) return;
    const { moduleId, lessonIndex, moduleTitle, lessonTitle } = JSON.parse(raw);
    const mod = MODULES[moduleId];
    if (!mod || !mod.lessons[lessonIndex]) return;
    showResumeDialog(moduleId, lessonIndex, moduleTitle || mod.title, lessonTitle || mod.lessons[lessonIndex].title);
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
  const order = ['think', 'html', 'css', 'javascript', 'python', 'sql', 'powershell'];
  const idx   = order.indexOf(currentId);
  if (idx === -1 || idx === order.length - 1) return null;
  return order[idx + 1];
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

  const quizTotal = lesson.quiz.length;
  // Track which questions have been checked and whether they were correct
  const questionResults = new Array(quizTotal).fill(null); // null | true | false

  lesson.quiz.forEach((q, qi) => {
    // Normalise answer: string answer → find matching option index
    const answerIsString = typeof q.answer === 'string';
    const correctIndex = answerIsString
      ? q.options.indexOf(q.answer)
      : q.answer;
    const correctText = q.options[correctIndex] ?? q.answer;

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
    feedback.setAttribute('aria-hidden', 'true');

    checkBtn.addEventListener('click', () => {
      const selected = fieldset.querySelector(`input[name="${name}"]:checked`);
      if (!selected) {
        feedback.textContent = 'Please select an answer before checking.';
        feedback.className = 'quiz-feedback show incorrect';
        announce('Please select an answer before checking.');
        return;
      }
      const selectedIndex = parseInt(selected.value);
      const isCorrect = selectedIndex === correctIndex;

      // Only record first attempt for quiz history
      if (questionResults[qi] === null) {
        questionResults[qi] = isCorrect;
        const answered = questionResults.filter(r => r !== null).length;
        if (answered === quizTotal) {
          const correctCount = questionResults.filter(Boolean).length;
          recordQuizResult(moduleId, lessonIndex, correctCount, quizTotal);
        }
      }

      fieldset.querySelectorAll('.option-label').forEach((lbl, i) => {
        lbl.classList.remove('correct', 'incorrect');
        if (i === correctIndex) lbl.classList.add('correct');
        else if (i === selectedIndex && !isCorrect) lbl.classList.add('incorrect');
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
        feedback.textContent = `Not quite. The correct answer is: ${correctText}`;
        feedback.className = 'quiz-feedback show incorrect';
        announce(`Not quite. The correct answer is: ${correctText}`);
      }
    });

    fieldset.appendChild(checkBtn);
    fieldset.appendChild(feedback);
    qDiv.appendChild(fieldset);
    section.appendChild(qDiv);
  });

  return section;
}

// ===== Exercise guidance helpers =====
function extractSignificantTokens(code) {
  const tokens = new Set();
  for (const m of code.matchAll(/<\/?(\w[\w-]*)/g))
    tokens.add(`tag:${m[1].toLowerCase()}`);
  for (const m of code.matchAll(/\b([\w-][\w-]*)=/g))
    tokens.add(`attr:${m[1].toLowerCase()}`);
  for (const m of code.matchAll(/\b([\w-]+)\s*:\s*\S/g)) {
    const prop = m[1].toLowerCase();
    if (prop.length > 2 && !prop.startsWith('http'))
      tokens.add(`prop:${prop}`);
  }
  for (const m of code.matchAll(/\.([\w$]+)\s*\(/g))
    tokens.add(`method:${m[1]}`);
  return tokens;
}

function findMissingElements(userCode, solution, starterCode) {
  const solutionTokens = extractSignificantTokens(solution);
  const userTokens = extractSignificantTokens(userCode);
  const starterTokens = extractSignificantTokens(starterCode || '');
  return [...solutionTokens]
    .filter(t => !starterTokens.has(t) && !userTokens.has(t))
    .map(t => t.replace(/^(?:tag|attr|prop|method):/, ''));
}

function buildMistakeGuidance(missing, attemptCount) {
  const items = missing.slice(0, 3).join(', ');
  if (attemptCount === 1)
    return `Not quite. Make sure your code includes: ${items}. Review the instructions and try again.`;
  if (attemptCount === 2)
    return `Still missing some elements. Check for: ${items}. Use "Show solution" if you need a hint.`;
  return 'Keep trying! Use "Show solution" to study the approach, then reset and try again on your own.';
}

function buildOutputHint(actual, expected, attemptCount) {
  if (attemptCount === 1) {
    const aLines = actual.trim().split('\n');
    const eLines = expected.trim().split('\n');
    if (aLines.length !== eLines.length)
      return `Your output has ${aLines.length} line(s) but ${eLines.length} are expected. Check for extra or missing output.`;
    for (let i = 0; i < eLines.length; i++) {
      if ((aLines[i] || '').trim() !== eLines[i].trim())
        return `Line ${i + 1} doesn't match. Check the value or format of that line.`;
    }
    return "The output doesn't match. Double-check your logic and try again.";
  }
  if (attemptCount === 2)
    return 'Still not matching. Re-read the instructions carefully. Use "Show solution" if you are stuck.';
  return 'Use "Show solution" to study the approach, then reset and try it yourself.';
}

function buildErrorGuidance(errorText, attemptCount) {
  if (attemptCount === 1) {
    if (/SyntaxError/i.test(errorText))
      return 'You have a syntax error. Check for missing brackets, quotes, or semicolons near the line mentioned.';
    if (/TypeError/i.test(errorText))
      return 'You have a type error. Check that you are using the right data type or that variables are defined before use.';
    if (/NameError|ReferenceError/i.test(errorText))
      return 'A variable or function is not defined. Check the spelling and make sure it is declared before use.';
    return 'Read the error message carefully — the line number tells you where to look.';
  }
  if (attemptCount === 2)
    return 'Still an error. Try simplifying your code — comment out parts until it runs, then add them back.';
  return 'Use "Show solution" to compare your code, then reset and try again.';
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

  // Project context banner
  const mod = MODULES[moduleId];
  if (mod && mod.project && exercise.projectStep) {
    const projectBanner = document.createElement('div');
    projectBanner.className = 'project-context';
    projectBanner.setAttribute('role', 'note');
    projectBanner.setAttribute('aria-label',
      `Project: ${mod.project.name}, step ${exercise.projectStep}`);

    const projectLbl = document.createElement('span');
    projectLbl.className = 'project-label';
    projectLbl.textContent = `Project: ${mod.project.name}`;

    const stepLbl = document.createElement('span');
    stepLbl.className = 'project-step-label';
    stepLbl.textContent = exercise.projectStepLabel
      ? `Step ${exercise.projectStep} — ${exercise.projectStepLabel}`
      : `Step ${exercise.projectStep}`;

    projectBanner.appendChild(projectLbl);
    projectBanner.appendChild(stepLbl);
    section.appendChild(projectBanner);
  }

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
      editor.value = editor.value.substring(0, s) + '  ' + editor.value.substring(end);
      editor.selectionStart = editor.selectionEnd = s + 2;
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
  let attemptCount = 0;

  function renderStep(idx) {
    const step = steps[idx];
    stepPassed = false;
    solShown = false;
    attemptCount = 0;
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
            if (passed) {
              markStepPassed(`Output:\n${result.output}\n\n✓ Correct!`, true);
            } else {
              attemptCount++;
              const hint = buildOutputHint(result.output, step.expectedOutput, attemptCount);
              output.textContent = `Output:\n${result.output}\n\nExpected:\n${step.expectedOutput}\n\n${hint}`;
              output.classList.add('show', 'error');
              output.classList.remove('success');
              announce(hint);
            }
          } else {
            markStepPassed(`Output:\n${out}\n\nLooks good! Check the output matches what you expected.`, true);
          }
        } else {
          attemptCount++;
          const errHint = buildErrorGuidance(result.output, attemptCount);
          output.textContent = `Error:\n${result.output}\n\n${errHint}`;
          output.classList.add('show', 'error');
          output.classList.remove('success');
          announce(errHint);
        }
      } catch (err) {
        runBtn.disabled = false;
        runBtn.textContent = 'Run code  Ctrl+Enter';
        output.textContent = 'Could not run code. Check that the required runtime is installed.';
        output.classList.add('show', 'error');
      }
    } else {
      const step = steps[currentStep];
      if (step.solution) {
        attemptCount++;
        const missing = findMissingElements(code, step.solution, step.starterCode || '');
        if (missing.length === 0 || attemptCount >= 3) {
          const msg = missing.length === 0
            ? 'Your code includes all the key elements. Well done!'
            : 'Code submitted. Use "Show solution" to compare your approach.';
          markStepPassed(msg, missing.length === 0);
        } else {
          const hint = buildMistakeGuidance(missing, attemptCount);
          output.textContent = hint;
          output.classList.add('show', 'error');
          output.classList.remove('success');
          announce(hint);
        }
      } else {
        markStepPassed('Code submitted! Compare your work with the solution to check your understanding.', true);
      }
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
    attemptCount = 0;
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
function buildModuleCards(welcome) {
  const filtered = activeCategory === 'all'
    ? MODULE_DEFS
    : MODULE_DEFS.filter(d => d.category === activeCategory);

  const statusMsg = activeCategory === 'all'
    ? `Showing all ${filtered.length} modules`
    : `Showing ${filtered.length} ${activeCategory} module${filtered.length !== 1 ? 's' : ''}`;

  const status = document.createElement('p');
  status.className = 'filter-status sr-only';
  status.setAttribute('aria-live', 'polite');
  status.setAttribute('aria-atomic', 'true');
  status.textContent = statusMsg;

  const cards = document.createElement('ul');
  cards.className = 'module-cards';

  filtered.forEach(({ id, icon, label, note, category }) => {
    const mod = MODULES[id];
    if (!mod) return;
    const count = mod.lessons.length;
    const done  = state.completedLessons[id] ? state.completedLessons[id].size : 0;
    const progressText = done > 0 ? ` — ${done}/${count} complete` : '';
    const desc = note ? `${count} lessons — ${note}${progressText}` : `${count} lessons${progressText}`;
    const catLabel = category.charAt(0).toUpperCase() + category.slice(1);

    const li = document.createElement('li');

    const card = document.createElement('button');
    card.className = 'module-start-card';
    card.setAttribute('aria-label', `${label} — ${desc} — ${catLabel}`);

    const iconSpan = document.createElement('span');
    iconSpan.className = 'card-icon';
    iconSpan.setAttribute('aria-hidden', 'true');
    iconSpan.textContent = icon;

    const labelSpan = document.createElement('span');
    labelSpan.className = 'card-label';
    labelSpan.setAttribute('aria-hidden', 'true');
    labelSpan.textContent = label;

    const descSpan = document.createElement('span');
    descSpan.className = 'card-desc';
    descSpan.setAttribute('aria-hidden', 'true');
    descSpan.textContent = desc;

    const badge = document.createElement('span');
    badge.className = `card-category-badge card-category-badge--${category}`;
    badge.setAttribute('aria-hidden', 'true');
    badge.textContent = catLabel;

    card.appendChild(iconSpan);
    card.appendChild(labelSpan);
    card.appendChild(descSpan);
    card.appendChild(badge);
    card.addEventListener('click', () => loadModule(id));
    li.appendChild(card);
    cards.appendChild(li);
  });

  return { cards, status, statusMsg };
}

function showWelcome() {
  mainContent.innerHTML = '';

  const welcome = document.createElement('section');
  welcome.className = 'welcome-screen';
  welcome.setAttribute('aria-labelledby', 'welcome-heading');

  const h1 = document.createElement('h1');
  h1.id = 'welcome-heading';
  h1.textContent = 'CodeMaster';

  const p1 = document.createElement('p');
  p1.textContent = 'A guided coding curriculum for the modern web developer.';

  const p2 = document.createElement('p');
  p2.textContent = 'Choose a module below to get started.';

  // ---- Category filter bar ----
  const filterGroup = document.createElement('div');
  filterGroup.className = 'category-filters';
  filterGroup.setAttribute('role', 'group');
  filterGroup.setAttribute('aria-label', 'Filter modules by difficulty');

  [
    { value: 'all',          label: 'All' },
    { value: 'beginner',     label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced',     label: 'Advanced' },
  ].forEach(({ value, label }) => {
    const btn = document.createElement('button');
    btn.className = 'category-filter-btn';
    btn.dataset.category = value;
    btn.textContent = label;
    btn.setAttribute('aria-pressed', value === activeCategory ? 'true' : 'false');
    btn.addEventListener('click', () => {
      activeCategory = value;
      filterGroup.querySelectorAll('.category-filter-btn').forEach(b => {
        b.setAttribute('aria-pressed', b.dataset.category === value ? 'true' : 'false');
      });
      const old = welcome.querySelector('.module-cards');
      const oldStatus = welcome.querySelector('.filter-status');
      if (old) old.remove();
      if (oldStatus) oldStatus.remove();
      const { cards, status, statusMsg } = buildModuleCards(welcome);
      welcome.appendChild(status);
      welcome.appendChild(cards);
      announce(statusMsg);
    });
    filterGroup.appendChild(btn);
  });

  // ---- Initial cards ----
  const { cards, status } = buildModuleCards(welcome);

  welcome.appendChild(h1);
  welcome.appendChild(p1);
  welcome.appendChild(p2);
  welcome.appendChild(filterGroup);
  welcome.appendChild(status);
  welcome.appendChild(cards);
  mainContent.appendChild(welcome);
  h1.setAttribute('tabindex', '-1');
  h1.focus();
}

// ===== Auto-updater UI =====
function initUpdater() {
  const modal           = document.getElementById('update-modal');
  const modalHeading    = document.getElementById('update-modal-heading');
  const modalNotes      = document.getElementById('update-modal-notes');
  const progressSection = document.getElementById('update-modal-progress');
  const progressBar     = document.getElementById('update-modal-bar');
  const progressLabel   = document.getElementById('update-modal-progress-label');
  const modalStatus     = document.getElementById('update-modal-status');
  const btnInstall      = document.getElementById('btn-update-install');
  const btnLater        = document.getElementById('btn-update-later');

  if (!window.electronAPI) return;

  // ---- Focus trap ----
  let _trapFocus = null;

  function openUpdateModal() {
    modal.hidden = false;
    btnLater.focus();
    _trapFocus = (e) => {
      if (e.key !== 'Tab') return;
      const focusable = [...modal.querySelectorAll('button:not([hidden])')];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };
    modal.addEventListener('keydown', _trapFocus);
  }

  function closeUpdateModal() {
    modal.hidden = true;
    if (_trapFocus) modal.removeEventListener('keydown', _trapFocus);
    _trapFocus = null;
  }

  btnLater.addEventListener('click', closeUpdateModal);

  // ---- Version display ----
  window.electronAPI.getVersion().then(v => {
    const el = document.getElementById('app-version-display');
    if (el) el.textContent = `v${v}`;
  });

  // ---- Updater events ----
  window.electronAPI.onUpdateAvailable((info) => {
    const notes = info.releaseNotes
      ? info.releaseNotes.replace(/<[^>]+>/g, '').trim()
      : 'Improvements and bug fixes.';
    modalHeading.textContent = `What's New in CodeMaster v${info.version}`;
    modalNotes.textContent = notes;
    modalStatus.textContent = 'Downloading update…';
    progressBar.style.setProperty('--progress', '0%');
    progressBar.setAttribute('aria-valuenow', 0);
    progressLabel.textContent = '0%';
    progressSection.hidden = false;
    btnInstall.hidden = true;
    openUpdateModal();
    announce(`Update available: Version ${info.version}. Downloading now.`);
    window.electronAPI.downloadUpdate();
  });

  window.electronAPI.onDownloadProgress((progress) => {
    progressBar.style.setProperty('--progress', `${progress.percent}%`);
    progressBar.setAttribute('aria-valuenow', progress.percent);
    progressLabel.textContent = `${progress.percent}%`;
  });

  window.electronAPI.onUpdateDownloaded((info) => {
    progressSection.hidden = true;
    modalStatus.textContent = 'Update ready. Restart CodeMaster to apply it.';
    btnInstall.hidden = false;
    btnInstall.focus();
    announce(`Version ${info.version} is downloaded and ready to install.`);
  });

  window.electronAPI.onUpdateError(() => {
    if (!modal.hidden) {
      progressSection.hidden = true;
      modalStatus.textContent = 'Download failed. Please check your connection and try again later.';
    }
  });

  btnInstall.addEventListener('click', () => {
    window.electronAPI.installUpdate();
  });
}

// ===== Feedback & Help panels =====
function initFeedbackHelp() {
  const feedbackBtn     = document.getElementById('feedback-btn');
  const feedbackModal   = document.getElementById('feedback-modal');
  const feedbackForm    = document.getElementById('feedback-form');
  const feedbackType    = document.getElementById('feedback-type');
  const feedbackTitle   = document.getElementById('feedback-title');
  const feedbackBody    = document.getElementById('feedback-body');
  const feedbackTitleError = document.getElementById('feedback-title-error');
  const btnCloseFeedback = document.getElementById('btn-close-feedback');

  const helpBtn     = document.getElementById('help-btn');
  const helpModal   = document.getElementById('help-modal');
  const helpEmail   = document.getElementById('help-email-link');
  const helpGithub  = document.getElementById('help-github-link');
  const btnCloseHelp = document.getElementById('btn-close-help');

  const REPO = 'https://github.com/blindgeek1989/CodeMaster';
  const HELP_EMAIL = 'blindgeek1989@gmail.com';

  function openModal(modal, firstFocusable, triggerEl) {
    modal.hidden = false;
    modal._trigger = triggerEl;
    firstFocusable.focus();
    const handler = (e) => {
      if (e.key === 'Escape') { closeModal(modal); return; }
      if (e.key !== 'Tab') return;
      const els = [...modal.querySelectorAll(
        'button:not([disabled]), [href], input, select, textarea, [tabindex="0"]'
      )];
      const first = els[0];
      const last  = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };
    modal.addEventListener('keydown', handler);
    modal._trapHandler = handler;
    modal._outsideHandler = (e) => { if (e.target === modal) closeModal(modal); };
    modal.addEventListener('click', modal._outsideHandler);
  }

  function closeModal(modal) {
    modal.hidden = true;
    if (modal._trapHandler) { modal.removeEventListener('keydown', modal._trapHandler); modal._trapHandler = null; }
    if (modal._outsideHandler) { modal.removeEventListener('click', modal._outsideHandler); modal._outsideHandler = null; }
    if (modal._trigger) { modal._trigger.focus(); modal._trigger = null; }
  }

  function openExternal(url) {
    if (window.electronAPI && window.electronAPI.openExternal) {
      window.electronAPI.openExternal(url);
    } else {
      window.open(url, '_blank', 'noopener');
    }
  }

  // ---- Feedback ----
  const labelMap = { bug: 'bug', feature: 'enhancement', general: 'feedback' };

  feedbackBtn.addEventListener('click', () => openModal(feedbackModal, feedbackTitle, feedbackBtn));

  btnCloseFeedback.addEventListener('click', () => closeModal(feedbackModal));

  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = feedbackTitle.value.trim();
    if (!title) {
      feedbackTitle.setAttribute('aria-invalid', 'true');
      feedbackTitleError.textContent = 'Please enter a title.';
      feedbackTitleError.hidden = false;
      feedbackTitle.focus();
      return;
    }
    feedbackTitle.removeAttribute('aria-invalid');
    feedbackTitleError.hidden = true;

    const type   = feedbackType.value;
    const label  = labelMap[type] || 'feedback';
    const body   = feedbackBody.value.trim();
    const url    = `${REPO}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}&labels=${encodeURIComponent(label)}`;
    openExternal(url);
    closeModal(feedbackModal);
    announce('Opening GitHub to create your issue. Thank you for the feedback!');
  });

  feedbackTitle.addEventListener('input', () => {
    if (feedbackTitle.value.trim()) {
      feedbackTitle.removeAttribute('aria-invalid');
      feedbackTitleError.hidden = true;
    }
  });

  // ---- Help ----
  helpEmail.href  = `mailto:${HELP_EMAIL}?subject=CodeMaster%20Help`;
  helpGithub.href = REPO;

  helpEmail.addEventListener('click', (e) => { e.preventDefault(); openExternal(helpEmail.href); });
  helpGithub.addEventListener('click', (e) => { e.preventDefault(); openExternal(helpGithub.href); });

  helpBtn.addEventListener('click', () => openModal(helpModal, btnCloseHelp, helpBtn));

  btnCloseHelp.addEventListener('click', () => closeModal(helpModal));
}

// ===== Init =====
function init() {
  loadProgress();
  renderBookmarksSidebar();
  initFontSize();
  checkAndShowResumeDialog();
  initUpdater();
  initFeedbackHelp();

  homeBtn.addEventListener('click', () => {
    showWelcome();
    announce('Home screen');
  });

  bookmarksToggleBtn.addEventListener('click', () => {
    const isOpen = bookmarksPanel.hidden === false;
    if (isOpen) {
      bookmarksPanel.hidden = true;
      bookmarksToggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      renderBookmarksSidebar();
      if (!bookmarksPanel.hidden) {
        bookmarksToggleBtn.setAttribute('aria-expanded', 'true');
        const first = bookmarksList.querySelector('button');
        if (first) first.focus();
      } else {
        announce('No bookmarks saved yet.');
      }
    }
  });

  document.getElementById('glossary-btn').addEventListener('click', () => {
    showGlossary();
  });
}

document.addEventListener('DOMContentLoaded', init);
