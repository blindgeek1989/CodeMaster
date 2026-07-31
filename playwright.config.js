const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  retries: 1,
  use: {
    headless: false,
  },
  reporter: [['list'], ['html', { outputFolder: 'test-results/html', open: 'never' }]],
});
