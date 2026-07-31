const { test, expect } = require('@playwright/test');
const { findLatestBuild, parseElectronApp } = require('electron-playwright-helpers');
const { _electron: electron } = require('playwright');
const path = require('path');

let electronApp;
let page;

test.beforeAll(async () => {
  electronApp = await electron.launch({
    args: [path.join(__dirname, '../../src/main.js')],
  });
  page = await electronApp.firstWindow();
  await page.waitForLoadState('domcontentloaded');
});

test.afterAll(async () => {
  await electronApp.close();
});

// ===== Skip link =====
test('skip link is present and becomes visible on focus', async () => {
  const skipLink = page.locator('.skip-link');
  await expect(skipLink).toHaveAttribute('href', '#main-content');
  await skipLink.focus();
  const top = await skipLink.evaluate(el => getComputedStyle(el).top);
  expect(top).not.toBe('-100%');
});

// ===== Landmark regions =====
test('page has required ARIA landmarks', async () => {
  await expect(page.locator('header[role="banner"]')).toBeVisible();
  await expect(page.locator('nav[aria-label="Course modules"]')).toBeVisible();
  await expect(page.locator('main#main-content')).toBeVisible();
});

// ===== SR announcer =====
test('sr-announcer live region exists', async () => {
  const announcer = page.locator('#sr-announcer');
  await expect(announcer).toHaveAttribute('aria-live', 'assertive');
  await expect(announcer).toHaveAttribute('role', 'status');
});

// ===== SR Mode checkbox =====
test('SR mode checkbox is labelled and keyboard operable', async () => {
  const checkbox = page.locator('#sr-mode-checkbox');
  await expect(checkbox).toBeVisible();
  await checkbox.focus();
  await page.keyboard.press('Space');
  await expect(checkbox).toBeChecked();
  await page.keyboard.press('Space');
  await expect(checkbox).not.toBeChecked();
});

// ===== Keyboard navigation: modules =====
test('HTML module loads on button click and focus moves to heading', async () => {
  const htmlBtn = page.locator('.module-nav-btn[data-module="html"]');
  await htmlBtn.click();
  const heading = page.locator('#module-title');
  await expect(heading).toBeFocused();
  await expect(heading).toHaveText('HTML Fundamentals');
});

// ===== Quiz keyboard accessibility =====
test('quiz options are selectable by keyboard', async () => {
  await page.locator('.module-nav-btn[data-module="html"]').click();
  const firstRadio = page.locator('input[type="radio"]').first();
  await firstRadio.focus();
  await page.keyboard.press('Space');
  await expect(firstRadio).toBeChecked();
});

// ===== Code editor tab key =====
test('Tab key in code editor inserts spaces, not moves focus', async () => {
  const editor = page.locator('.code-editor').first();
  await editor.focus();
  const before = await editor.inputValue();
  await page.keyboard.press('Tab');
  const after = await editor.inputValue();
  expect(after.length).toBeGreaterThan(before.length);
});

// ===== Focus indicators =====
test('interactive elements have visible focus styles', async () => {
  const btn = page.locator('.module-nav-btn').first();
  await btn.focus();
  const outline = await btn.evaluate(el => getComputedStyle(el).outlineStyle);
  expect(outline).not.toBe('none');
});

// ===== CSS module SR toggle =====
test('checking SR mode checkbox changes CSS module title', async () => {
  const checkbox = page.locator('#sr-mode-checkbox');
  await checkbox.check();
  await page.locator('.module-nav-btn[data-module="css"]').click();
  const heading = page.locator('#module-title');
  await expect(heading).toHaveText('CSS for Screen Reader Users');
  await checkbox.uncheck();
});
