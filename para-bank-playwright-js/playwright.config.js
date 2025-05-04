import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://parabank.parasoft.com',
    browserName: 'chromium',
    ...devices['Desktop Chrome'],
    trace: 'on-first-retry',
  },
  reporter: [['list'], ['html']],
});