// CodeMaster Electron driver — REPL for agent/automated use on Windows.
// Run from the project root: node .claude/skills/run/driver.mjs
// Wrap in tmux for agent use; send lines, capture-pane the output.
import { _electron as electron } from 'playwright';
import * as readline from 'node:readline';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const APP_DIR   = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const SHOT_DIR  = process.env.SCREENSHOT_DIR || path.join(APP_DIR, 'screenshots');
const ELECTRON  = path.join(APP_DIR, 'node_modules/electron/dist/electron.exe');
fs.mkdirSync(SHOT_DIR, { recursive: true });

let app  = null;
let page = null;

const COMMANDS = {
  async launch() {
    if (app) return console.log('already launched');
    app = await electron.launch({
      executablePath: ELECTRON,
      args: [APP_DIR],
      timeout: 30_000,
    });
    page = await app.firstWindow();
    await page.waitForLoadState('domcontentloaded');
    await new Promise(r => setTimeout(r, 2500));
    console.log('launched.', app.windows().length, 'windows');
    for (const w of app.windows()) console.log(' ', w.url());
  },

  // Dismiss the "Welcome back / Resume" dialog if it is showing.
  async 'dismiss-dialog'() {
    if (!page) return console.log('ERROR: launch first');
    const r = await page.evaluate(() => {
      const btns = [...document.querySelectorAll('button')];
      const btn  = btns.find(b => b.textContent?.includes('Start Fresh'));
      if (!btn) return 'no dialog';
      btn.click(); return 'dismissed';
    });
    if (r !== 'no dialog') await new Promise(r => setTimeout(r, 500));
    console.log(r);
  },

  // Open a module by any part of its sidebar label, e.g. "HTML" or "Python".
  async 'open-module'(label) {
    if (!page) return console.log('ERROR: launch first');
    const r = await page.evaluate(lbl => {
      const btns = [...document.querySelectorAll('button, [role="button"]')];
      const btn  = btns.find(b => b.textContent?.includes(lbl));
      if (!btn) return 'NOT_FOUND: ' + lbl;
      btn.click(); return 'OK: ' + btn.textContent?.trim().slice(0, 60);
    }, label);
    await new Promise(r => setTimeout(r, 800));
    console.log('open-module', JSON.stringify(label), '→', r);
  },

  // Open a lesson by partial title or "Lesson N" text.
  async 'open-lesson'(text) {
    if (!page) return console.log('ERROR: launch first');
    const r = await page.evaluate(t => {
      const btns = [...document.querySelectorAll('button, [role="button"], a')];
      const btn  = btns.find(b => b.textContent?.includes(t));
      if (!btn) return 'NOT_FOUND: ' + t;
      btn.click(); return 'OK: ' + btn.textContent?.trim().slice(0, 60);
    }, text);
    await new Promise(r => setTimeout(r, 1000));
    console.log('open-lesson', JSON.stringify(text), '→', r);
  },

  async ss(name) {
    if (!page) return console.log('ERROR: launch first');
    const f = path.join(SHOT_DIR, (name || `ss-${Date.now()}`) + '.png');
    await page.screenshot({ path: f });
    console.log('screenshot:', f);
  },

  async click(sel) {
    if (!page) return console.log('ERROR: launch first');
    const r = await page.evaluate(s => {
      const el = document.querySelector(s);
      if (!el) return 'NOT_FOUND';
      el.click(); return 'OK';
    }, sel);
    console.log('click', sel, '→', r);
  },

  async 'click-text'(text) {
    if (!page) return console.log('ERROR: launch first');
    const r = await page.evaluate(t => {
      const els = [...document.querySelectorAll('button, a, [role="button"]')];
      const el  = els.find(e => e.textContent?.trim() === t)
               ?? els.find(e => e.textContent?.includes(t));
      if (!el) return 'NOT_FOUND';
      el.click(); return 'OK: ' + el.tagName;
    }, text);
    console.log('click-text', JSON.stringify(text), '→', r);
  },

  async scroll(px) {
    if (!page) return console.log('ERROR: launch first');
    await page.evaluate(n => {
      const el = document.querySelector('.lesson-content') ?? document.scrollingElement;
      el.scrollTop += n;
    }, Number(px) || 400);
    console.log('scrolled', px, 'px');
  },

  async type(text)  { if (page) await page.keyboard.type(text, { delay: 30 }); },
  async press(key)  { if (page) await page.keyboard.press(key); },

  async wait(sel) {
    if (!page) return console.log('ERROR: launch first');
    try   { await page.waitForSelector(sel, { timeout: 10_000 }); console.log('found:', sel); }
    catch { console.log('TIMEOUT:', sel); }
  },

  async eval(expr) {
    if (!page) return console.log('ERROR: launch first');
    try   { console.log(JSON.stringify(await page.evaluate(expr))); }
    catch (e) { console.log('ERROR:', e.message); }
  },

  async text(sel) {
    if (!page) return console.log('ERROR: launch first');
    console.log(await page.evaluate(
      s => (s ? document.querySelector(s) : document.body)?.innerText ?? '(null)',
      sel || null));
  },

  async windows() {
    if (!app) return console.log('ERROR: launch first');
    for (const w of app.windows()) console.log(' ', w.url());
  },

  async quit() { if (app) await app.close().catch(() => {}); app = null; page = null; },
  help() { console.log('commands:', Object.keys(COMMANDS).join(', ')); },
};

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: 'driver> ' });

const queue = [];
let busy = false;
let eofReceived = false;

async function drain() {
  if (busy || queue.length === 0) {
    if (eofReceived && !busy && queue.length === 0) { await COMMANDS.quit(); process.exit(0); }
    return;
  }
  busy = true;
  const { cmd, args } = queue.shift();
  const fn = COMMANDS[cmd];
  if (!fn) {
    console.log('unknown:', cmd, '— try: help');
  } else {
    try { await fn(args); } catch (e) { console.log('ERROR:', e.message); }
  }
  if (!eofReceived) rl.prompt();
  busy = false;
  if (cmd === 'quit') { process.exit(0); }
  drain();
}

rl.on('line', line => {
  const [cmd, ...rest] = line.trim().split(/\s+/);
  if (!cmd) return rl.prompt();
  queue.push({ cmd, args: rest.join(' ') });
  drain();
});
rl.on('close', () => { eofReceived = true; drain(); });

console.log('CodeMaster driver — "help" for commands, "launch" to start');
console.log('Screenshots →', SHOT_DIR);
rl.prompt();
