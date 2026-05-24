import { expect, test } from '@playwright/test';
import { mockPokemonApi } from './mocks/pokemon';

test.beforeEach(async ({ page }) => {
  await mockPokemonApi(page);
});

test('agrega un Pokemon al equipo y lo mantiene despues de refrescar', async ({ page }) => {
  await page.goto('/pokedex');

  await page.getByRole('link', { name: /Ver detalle de Bulbasaur/i }).click();
  await page.getByTestId('add-to-team-button').click();
  await page.getByRole('link', { name: 'Equipo' }).click();

  await expect(page).toHaveURL(/\/team$/);
  await expect(page.getByTestId('team-card')).toHaveCount(1);
  await expect(page.getByText('Bulbasaur')).toBeVisible();

  await page.reload();

  await expect(page.getByTestId('team-card')).toHaveCount(1);
  await expect(page.getByText('Bulbasaur')).toBeVisible();
});
