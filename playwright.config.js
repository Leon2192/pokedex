import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, devices } from '@playwright/test';

const rootDir = dirname(fileURLToPath(import.meta.url));

const loadTestingEnv = () => {
  const envPath = resolve(rootDir, '.env.testing');

  if (!existsSync(envPath)) {
    return;
  }

  readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .forEach((line) => {
      const trimmedLine = line.trim();

      if (!trimmedLine || trimmedLine.startsWith('#')) {
        return;
      }

      const separatorIndex = trimmedLine.indexOf('=');

      if (separatorIndex === -1) {
        return;
      }

      const key = trimmedLine.slice(0, separatorIndex).trim();
      const value = trimmedLine
        .slice(separatorIndex + 1)
        .trim()
        .replace(/^['"]|['"]$/g, '');

      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    });
};

loadTestingEnv();

const APP_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:5173';
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
