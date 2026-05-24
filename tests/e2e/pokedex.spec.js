import { expect, test } from '@playwright/test';
import { mockPokemonApi } from './mocks/pokemon';

test.beforeEach(async ({ page }) => {
  await mockPokemonApi(page);
});

test('carga la Pokedex y permite buscar un Pokemon', async ({ page }) => {
  await page.goto('/pokedex');

  await expect(page.getByRole('heading', { name: 'Pokedex' })).toBeVisible();
  await expect(page.getByTestId('pokemon-card')).toHaveCount(4);

  await page.getByTestId('pokemon-search-input').fill('pika');

  await expect(page.getByTestId('pokemon-card')).toHaveCount(1);
  await expect(page.getByRole('link', { name: /Ver detalle de Pikachu/i })).toBeVisible();
});
