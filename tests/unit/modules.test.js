const htmlModule = require('../../src/renderer/data/html-content');
const cssModule = require('../../src/renderer/data/css-content');
const cssScreenReaderModule = require('../../src/renderer/data/css-screenreader-content');
const jsModule = require('../../src/renderer/data/js-content');
const pythonModule = require('../../src/renderer/data/python-content');

describe('HTML Module', () => {
  test('has required top-level fields', () => {
    expect(htmlModule).toHaveProperty('id', 'html');
    expect(htmlModule).toHaveProperty('title');
    expect(htmlModule).toHaveProperty('description');
    expect(Array.isArray(htmlModule.objectives)).toBe(true);
    expect(Array.isArray(htmlModule.goals)).toBe(true);
    expect(Array.isArray(htmlModule.lessons)).toBe(true);
  });

  test('has at least 1 lesson', () => {
    expect(htmlModule.lessons.length).toBeGreaterThanOrEqual(1);
  });

  test('every lesson has id, title, content, quiz, and exercise', () => {
    htmlModule.lessons.forEach(lesson => {
      expect(lesson).toHaveProperty('id');
      expect(lesson).toHaveProperty('title');
      expect(lesson).toHaveProperty('content');
      expect(Array.isArray(lesson.quiz)).toBe(true);
      expect(lesson).toHaveProperty('exercise');
    });
  });

  test('every quiz question has question, options array, and correct answer index', () => {
    htmlModule.lessons.forEach(lesson => {
      lesson.quiz.forEach(q => {
        expect(q).toHaveProperty('question');
        expect(Array.isArray(q.options)).toBe(true);
        expect(q.options.length).toBeGreaterThanOrEqual(2);
        expect(typeof q.answer).toBe('number');
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(q.options.length);
      });
    });
  });

  test('every exercise has prompt, starterCode, and solution', () => {
    htmlModule.lessons.forEach(lesson => {
      expect(lesson.exercise).toHaveProperty('prompt');
      expect(lesson.exercise).toHaveProperty('starterCode');
      expect(lesson.exercise).toHaveProperty('solution');
    });
  });
});

describe('CSS Module', () => {
  test('has required top-level fields', () => {
    expect(cssModule).toHaveProperty('id', 'css');
    expect(cssModule).toHaveProperty('title');
    expect(Array.isArray(cssModule.objectives)).toBe(true);
    expect(Array.isArray(cssModule.lessons)).toBe(true);
  });

  test('every quiz answer index is within options bounds', () => {
    cssModule.lessons.forEach(lesson => {
      lesson.quiz.forEach(q => {
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(q.options.length);
      });
    });
  });
});

describe('CSS Screen Reader Module', () => {
  test('has id css-sr', () => {
    expect(cssScreenReaderModule).toHaveProperty('id', 'css-sr');
  });

  test('has at least 3 lessons', () => {
    expect(cssScreenReaderModule.lessons.length).toBeGreaterThanOrEqual(3);
  });

  test('objectives mention screen reader concepts', () => {
    const text = cssScreenReaderModule.objectives.join(' ').toLowerCase();
    expect(text).toMatch(/screen reader|sr-only|focus|accessibility/);
  });
});

describe('JavaScript Module', () => {
  test('has required top-level fields', () => {
    expect(jsModule).toHaveProperty('id', 'javascript');
    expect(jsModule).toHaveProperty('title');
    expect(Array.isArray(jsModule.objectives)).toBe(true);
    expect(Array.isArray(jsModule.lessons)).toBe(true);
  });

  test('DOM lesson mentions accessibility', () => {
    const domLesson = jsModule.lessons.find(l => l.id === 'js-3');
    expect(domLesson).toBeDefined();
    expect(domLesson.content.toLowerCase()).toMatch(/screen reader|aria|focus|accessibility/);
  });
});

describe('Python Module', () => {
  test('has required top-level fields', () => {
    expect(pythonModule).toHaveProperty('id', 'python');
    expect(pythonModule).toHaveProperty('title');
    expect(Array.isArray(pythonModule.objectives)).toBe(true);
    expect(Array.isArray(pythonModule.goals)).toBe(true);
    expect(Array.isArray(pythonModule.lessons)).toBe(true);
  });

  test('has at least 10 lessons', () => {
    expect(pythonModule.lessons.length).toBeGreaterThanOrEqual(10);
  });

  test('every lesson has id, title, content, quiz, and exercise', () => {
    pythonModule.lessons.forEach(lesson => {
      expect(lesson).toHaveProperty('id');
      expect(lesson).toHaveProperty('title');
      expect(lesson).toHaveProperty('content');
      expect(Array.isArray(lesson.quiz)).toBe(true);
      expect(lesson).toHaveProperty('exercise');
    });
  });

  test('every exercise has steps array with at least 1 step', () => {
    pythonModule.lessons.forEach(lesson => {
      expect(Array.isArray(lesson.exercise.steps)).toBe(true);
      expect(lesson.exercise.steps.length).toBeGreaterThanOrEqual(1);
      lesson.exercise.steps.forEach(step => {
        expect(step).toHaveProperty('instruction');
        expect(step).toHaveProperty('starterCode');
        expect(step).toHaveProperty('solution');
      });
    });
  });

  test('every quiz answer index is within options bounds', () => {
    pythonModule.lessons.forEach(lesson => {
      lesson.quiz.forEach(q => {
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(q.options.length);
      });
    });
  });

  test('accessibility mentioned in module content', () => {
    const allContent = pythonModule.lessons.map(l => l.content).join(' ').toLowerCase();
    expect(allContent).toMatch(/accessibility|screen reader|blind|keyboard/);
  });
});
