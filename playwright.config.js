import { defineConfig, devices } from '@playwright/test';

const APP_URL = process.env.VITE_APP_URL || 'http://127.0.0.1:5173';
const appUrl = new URL(APP_URL);
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: APP_URL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: `${npmCommand} run dev -- --host ${appUrl.hostname} --port ${appUrl.port || 5173}`,
    url: APP_URL,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
