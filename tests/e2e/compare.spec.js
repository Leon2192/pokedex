import { expect, test } from '@playwright/test';
import { mockPokemonApi } from './mocks/pokemon';

test.beforeEach(async ({ page }) => {
  await mockPokemonApi(page);
});

test('muestra grafico al comparar dos Pokemon', async ({ page }) => {
  await page.goto('/compare');

  await page.getByRole('combobox', { name: 'Primer Pokemon' }).fill('pika');
  await page.getByRole('option', { name: /Pikachu/i }).click();

  await page.getByRole('combobox', { name: 'Segundo Pokemon' }).fill('char');
  await page.getByRole('option', { name: /Charmander/i }).click();

  await page.getByRole('button', { name: 'Comparar' }).click();

  const chart = page.getByTestId('pokemon-comparison-chart');

  await expect(chart).toBeVisible();
  await expect(page.getByText('Comparacion de stats')).toBeVisible();
  await expect(chart).toContainText('Pikachu');
  await expect(chart).toContainText('Charmander');
});
