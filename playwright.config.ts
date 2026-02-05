import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './playwright/tests',

  timeout: 60 * 1000,
  expect: {
    timeout: 10 * 1000,
  },

  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,

  reporter: 'html',

  use: {
    baseURL: 'https://megdever0.github.io/qa-automation-demo',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 5000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
      },
    },
  ],

  // No web server needed for GitHub Pages
  webServer: undefined,
});
