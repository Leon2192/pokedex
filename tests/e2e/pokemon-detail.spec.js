import { expect, test } from '@playwright/test';
import { mockPokemonApi } from './mocks/pokemon';

test.beforeEach(async ({ page }) => {
  await mockPokemonApi(page);
});

test('navega desde una card al detalle y vuelve al listado', async ({ page }) => {
  await page.goto('/pokedex');

  await page.getByRole('link', { name: /Ver detalle de Bulbasaur/i }).click();

  await expect(page).toHaveURL(/\/pokemon\/bulbasaur$/);
  await expect(page.getByTestId('pokemon-detail-title')).toHaveText('Bulbasaur');
  await expect(page.getByText('Estadisticas')).toBeVisible();
  await expect(page.getByText('Altura')).toBeVisible();

  await page.getByRole('button', { name: 'Volver a la Pokedex' }).click();

  await expect(page).toHaveURL(/\/pokedex$/);
  await expect(page.getByTestId('pokemon-card')).toHaveCount(4);
});
