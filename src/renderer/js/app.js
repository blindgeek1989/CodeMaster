'use strict';

// ===== Module data =====
const MODULES = {
  html: window.htmlModule,
  css: window.cssModule,
  'css-sr': window.cssScreenReaderModule,
  javascript: window.jsModule,
};

// ===== State =====
let state = {
  activeModuleId: null,
  activeLessonId: null,
  srMode: false,
  progress: {},
};

// ===== DOM refs =====
const moduleNav = document.getElementById('module-nav');
const mainContent = document.getElementById('main-content');
const srModeCheckbox = document.getElementById('sr-mode-checkbox');
const announcer = document.getElementById('sr-announcer');

// ===== Announce to screen reader =====
function announce(message) {
  announcer.textContent = '';
  requestAnimationFrame(() => {
    announcer.textContent = message;
  });
}

// ===== SR mode toggle =====
srModeCheckbox.addEventListener('change', () => {
  state.srMode = srModeCheckbox.checked;
  const cssBtnEl = document.querySelector('[data-module="css"]');
  if (cssBtnEl) {
    cssBtnEl.textContent = '';
    const icon = document.createElement('span');
    icon.className = 'module-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '🎨';
    cssBtnEl.appendChild(icon);
    cssBtnEl.appendChild(document.createTextNode(state.srMode ? 'CSS (Screen Reader)' : 'CSS'));
  }

  if (state.activeModuleId === 'css' || state.activeModuleId === 'css-sr') {
    const targetId = state.srMode ? 'css-sr' : 'css';
    loadModule(targetId);
    announce(state.srMode
      ? 'Screen Reader CSS mode enabled. Loading CSS for Screen Reader Users module.'
      : 'Standard CSS mode enabled. Loading CSS Fundamentals module.');
  } else {
    announce(state.srMode
      ? 'Screen Reader CSS mode enabled. Select CSS from the sidebar to load the screen reader module.'
      : 'Standard CSS mode disabled.');
  }
});

// ===== Build sidebar =====
function buildSidebar() {
  const modules = [
    { id: 'html', icon: '📄', label: 'HTML' },
    { id: 'css', icon: '🎨', label: 'CSS' },
    { id: 'javascript', icon: '⚡', label: 'JavaScript' },
  ];

  moduleNav.innerHTML = '';
  modules.forEach(({ id, icon, label }) => {
    const li = document.createElement('li');
    li.className = 'module-nav-item';

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
      toggleLessonList(li, btn);
    });

    const lessonUl = document.createElement('ul');
    lessonUl.className = 'module-lessons';
    lessonUl.id = `lessons-${id}`;

    const mod = MODULES[(id === 'css' && state.srMode) ? 'css-sr' : id];
    if (mod && mod.lessons) {
      mod.lessons.forEach((lesson, i) => {
        const lessonLi = document.createElement('li');
        const lessonBtn = document.createElement('button');
        lessonBtn.className = 'lesson-nav-btn';
        lessonBtn.textContent = lesson.title;
        lessonBtn.dataset.lesson = lesson.id;
        lessonBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          scrollToLesson(lesson.id);
        });
        lessonLi.appendChild(lessonBtn);
        lessonUl.appendChild(lessonLi);
      });
    }

    li.appendChild(btn);
    li.appendChild(lessonUl);
    moduleNav.appendChild(li);
  });
}

function toggleLessonList(li, btn) {
  const ul = li.querySelector('.module-lessons');
  const isOpen = ul.classList.contains('open');
  document.querySelectorAll('.module-lessons.open').forEach(el => el.classList.remove('open'));
  document.querySelectorAll('.module-nav-btn[aria-expanded="true"]').forEach(el => el.setAttribute('aria-expanded', 'false'));
  if (!isOpen) {
    ul.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

// ===== Load module =====
function loadModule(moduleId) {
  state.activeModuleId = moduleId;
  const mod = MODULES[moduleId];
  if (!mod) return;

  document.querySelectorAll('.module-nav-btn').forEach(btn => {
    const isActive = btn.dataset.module === (moduleId === 'css-sr' ? 'css' : moduleId);
    btn.classList.toggle('active', isActive);
  });

  mainContent.innerHTML = '';

  // Progress bar
  const progressWrap = document.createElement('div');
  progressWrap.className = 'progress-bar-wrap';
  const progressFill = document.createElement('div');
  progressFill.className = 'progress-bar-fill';
  progressFill.setAttribute('role', 'progressbar');
  progressFill.setAttribute('aria-label', `${mod.title} progress`);
  progressFill.setAttribute('aria-valuemin', '0');
  progressFill.setAttribute('aria-valuemax', '100');
  progressFill.setAttribute('aria-valuenow', '0');
  progressWrap.appendChild(progressFill);
  mainContent.appendChild(progressWrap);

  // Module header
  const header = document.createElement('header');
  header.className = 'module-header';

  const badge = document.createElement('span');
  badge.className = 'module-badge';
  badge.textContent = moduleId === 'css-sr' ? 'CSS — Screen Reader Edition' : mod.title;

  const title = document.createElement('h1');
  title.className = 'module-title';
  title.id = 'module-title';
  title.textContent = mod.title;

  const desc = document.createElement('p');
  desc.className = 'module-description';
  desc.textContent = mod.description;

  header.appendChild(badge);
  header.appendChild(title);
  header.appendChild(desc);
  mainContent.appendChild(header);

  // Objectives & Goals
  const og = document.createElement('div');
  og.className = 'objectives-goals';
  og.appendChild(buildList('Learning Objectives', mod.objectives));
  og.appendChild(buildList('Goals', mod.goals));
  mainContent.appendChild(og);

  // Lessons
  const lessonsSection = document.createElement('section');
  lessonsSection.setAttribute('aria-label', 'Module lessons');

  mod.lessons.forEach((lesson, i) => {
    lessonsSection.appendChild(buildLesson(lesson, i + 1, progressFill, mod.lessons.length));
  });

  mainContent.appendChild(lessonsSection);

  announce(`Loaded ${mod.title}. ${mod.lessons.length} lessons available.`);

  mainContent.querySelector('h1').focus();
}

function buildList(label, items) {
  const card = document.createElement('section');
  card.className = 'card';
  card.setAttribute('aria-labelledby', label.toLowerCase().replace(' ', '-') + '-heading');

  const h2 = document.createElement('h2');
  h2.className = 'card-title';
  h2.id = label.toLowerCase().replace(' ', '-') + '-heading';
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

function buildLesson(lesson, number, progressBar, totalLessons) {
  const section = document.createElement('section');
  section.className = 'lesson-section';
  section.id = lesson.id;
  section.setAttribute('aria-labelledby', `${lesson.id}-title`);

  // Header
  const header = document.createElement('div');
  header.className = 'lesson-header';

  const num = document.createElement('span');
  num.className = 'lesson-number';
  num.setAttribute('aria-hidden', 'true');
  num.textContent = number;

  const title = document.createElement('h2');
  title.className = 'lesson-title';
  title.id = `${lesson.id}-title`;
  title.textContent = lesson.title;

  header.appendChild(num);
  header.appendChild(title);
  section.appendChild(header);

  // Content
  const content = document.createElement('div');
  content.className = 'lesson-content';
  content.setAttribute('tabindex', '0');
  content.setAttribute('aria-label', `${lesson.title} — lesson content`);
  content.textContent = lesson.content;
  section.appendChild(content);

  // Quiz
  if (lesson.quiz && lesson.quiz.length) {
    section.appendChild(buildQuiz(lesson, progressBar, totalLessons, number));
  }

  // Exercise
  if (lesson.exercise) {
    section.appendChild(buildExercise(lesson.exercise, lesson.title));
  }

  return section;
}

function buildQuiz(lesson, progressBar, totalLessons, lessonNum) {
  const quizSection = document.createElement('div');
  quizSection.className = 'quiz-section';
  quizSection.setAttribute('role', 'group');
  quizSection.setAttribute('aria-label', `Quiz for ${lesson.title}`);

  const quizTitle = document.createElement('h3');
  quizTitle.className = 'quiz-title';
  quizTitle.textContent = 'Knowledge Check';
  quizSection.appendChild(quizTitle);

  lesson.quiz.forEach((q, qi) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'quiz-question';

    const fieldset = document.createElement('fieldset');
    fieldset.style.border = 'none';
    fieldset.style.padding = '0';

    const legend = document.createElement('legend');
    legend.className = 'question-text';
    legend.textContent = `${qi + 1}. ${q.question}`;
    fieldset.appendChild(legend);

    const optionsList = document.createElement('ul');
    optionsList.className = 'options-list';
    optionsList.setAttribute('role', 'list');

    const name = `q-${lesson.id}-${qi}`;

    q.options.forEach((opt, oi) => {
      const li = document.createElement('li');
      const label = document.createElement('label');
      label.className = 'option-label';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = name;
      radio.value = oi;
      radio.id = `${name}-opt-${oi}`;

      label.setAttribute('for', radio.id);
      label.appendChild(radio);
      label.appendChild(document.createTextNode(opt));
      li.appendChild(label);
      optionsList.appendChild(li);
    });

    fieldset.appendChild(optionsList);

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
        updateProgress(progressBar, totalLessons, lessonNum);
      } else {
        feedback.textContent = `Incorrect. The correct answer is: ${q.options[q.answer]}`;
        feedback.className = 'quiz-feedback show incorrect';
        announce(`Incorrect. The correct answer is: ${q.options[q.answer]}`);
      }
    });

    fieldset.appendChild(checkBtn);
    fieldset.appendChild(feedback);
    questionDiv.appendChild(fieldset);
    quizSection.appendChild(questionDiv);
  });

  return quizSection;
}

function buildExercise(exercise, lessonTitle) {
  const section = document.createElement('div');
  section.className = 'exercise-section';

  const title = document.createElement('h3');
  title.className = 'exercise-title';
  title.textContent = 'Coding Exercise';
  section.appendChild(title);

  const prompt = document.createElement('p');
  prompt.className = 'exercise-prompt';
  prompt.textContent = exercise.prompt;
  section.appendChild(prompt);

  const editorLabel = document.createElement('label');
  editorLabel.setAttribute('for', `editor-${lessonTitle.replace(/\s+/g, '-')}`);
  editorLabel.className = 'sr-only-label';
  editorLabel.textContent = `Code editor for: ${exercise.prompt}`;
  section.appendChild(editorLabel);

  const editor = document.createElement('textarea');
  editor.className = 'code-editor';
  editor.id = `editor-${lessonTitle.replace(/\s+/g, '-')}`;
  editor.value = exercise.starterCode;
  editor.setAttribute('aria-label', `Code editor: ${exercise.prompt}`);
  editor.setAttribute('spellcheck', 'false');
  editor.setAttribute('autocorrect', 'off');
  editor.setAttribute('autocapitalize', 'off');

  // Tab key inserts spaces in editor instead of leaving it
  editor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
      editor.selectionStart = editor.selectionEnd = start + 2;
    }
  });

  section.appendChild(editor);

  const actions = document.createElement('div');
  actions.className = 'exercise-actions';

  const runBtn = document.createElement('button');
  runBtn.className = 'btn-primary';
  runBtn.textContent = 'Run code';
  runBtn.setAttribute('aria-describedby', 'exercise-output-desc');

  const showSolutionBtn = document.createElement('button');
  showSolutionBtn.className = 'btn-secondary';
  showSolutionBtn.textContent = 'Show solution';

  const resetBtn = document.createElement('button');
  resetBtn.className = 'btn-secondary';
  resetBtn.textContent = 'Reset';

  actions.appendChild(runBtn);
  actions.appendChild(showSolutionBtn);
  actions.appendChild(resetBtn);
  section.appendChild(actions);

  const output = document.createElement('div');
  output.className = 'exercise-output';
  output.id = 'exercise-output-desc';
  output.setAttribute('role', 'region');
  output.setAttribute('aria-label', 'Exercise output');
  output.setAttribute('aria-live', 'polite');
  section.appendChild(output);

  runBtn.addEventListener('click', () => {
    output.textContent = 'Code submitted. In a full environment, your code would run here.';
    output.className = 'exercise-output show';
    announce('Code submitted.');
  });

  showSolutionBtn.addEventListener('click', () => {
    editor.value = exercise.solution;
    output.textContent = 'Solution loaded into editor.';
    output.className = 'exercise-output show';
    announce('Solution loaded into the code editor.');
    showSolutionBtn.textContent = 'Hide solution';
    showSolutionBtn.addEventListener('click', () => {
      editor.value = exercise.starterCode;
      output.textContent = 'Editor reset to starter code.';
      announce('Editor reset to starter code.');
    }, { once: true });
  }, { once: true });

  resetBtn.addEventListener('click', () => {
    editor.value = exercise.starterCode;
    output.className = 'exercise-output';
    output.textContent = '';
    announce('Editor reset to starter code.');
  });

  return section;
}

function updateProgress(progressBar, totalLessons, lessonNum) {
  const pct = Math.min(100, Math.round((lessonNum / totalLessons) * 100));
  progressBar.style.width = `${pct}%`;
  progressBar.setAttribute('aria-valuenow', pct);
}

function scrollToLesson(lessonId) {
  const el = document.getElementById(lessonId);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const focusTarget = el.querySelector('h2') || el;
  focusTarget.setAttribute('tabindex', '-1');
  focusTarget.focus({ preventScroll: true });
  announce(`Jumped to ${focusTarget.textContent}`);
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
  p1.textContent = 'A fully accessible coding learning platform built for keyboard and screen reader users. Learn HTML, CSS, and JavaScript at your own pace.';

  const p2 = document.createElement('p');
  p2.textContent = 'Choose a module from the sidebar or select one below to get started.';

  const cards = document.createElement('div');
  cards.className = 'module-cards';
  cards.setAttribute('role', 'list');

  const moduleList = [
    { id: 'html', icon: '📄', label: 'HTML', desc: '3 lessons' },
    { id: 'css', icon: '🎨', label: 'CSS', desc: '3 lessons' },
    { id: 'javascript', icon: '⚡', label: 'JavaScript', desc: '3 lessons' },
  ];

  moduleList.forEach(({ id, icon, label, desc }) => {
    const card = document.createElement('button');
    card.className = 'module-start-card';
    card.setAttribute('role', 'listitem');
    const iconSpan = document.createElement('span');
    iconSpan.className = 'icon';
    iconSpan.setAttribute('aria-hidden', 'true');
    iconSpan.textContent = icon;
    const h3 = document.createElement('h3');
    h3.textContent = label;
    const pDesc = document.createElement('p');
    pDesc.textContent = desc;
    card.appendChild(iconSpan);
    card.appendChild(h3);
    card.appendChild(pDesc);
    card.addEventListener('click', () => loadModule(id));
    cards.appendChild(card);
  });

  welcome.appendChild(h1);
  welcome.appendChild(p1);
  welcome.appendChild(p2);
  welcome.appendChild(cards);
  mainContent.appendChild(welcome);
  h1.focus();
}

// ===== Init =====
function init() {
  buildSidebar();
  showWelcome();
}

document.addEventListener('DOMContentLoaded', init);
