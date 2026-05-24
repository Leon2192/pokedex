import { expect, test } from '@playwright/test';
import { mockPokemonApi } from './mocks/pokemon';

test.beforeEach(async ({ page }) => {
  await mockPokemonApi(page);
});

const addPokemonToTeam = async (page, name) => {
  await page.goto(`/pokemon/${name}`);
  await page.getByTestId('add-to-team-button').click();
};

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

test('reordena Pokemon con drag and drop y persiste el orden', async ({ page }) => {
  await addPokemonToTeam(page, 'bulbasaur');
  await addPokemonToTeam(page, 'charmander');
  await addPokemonToTeam(page, 'squirtle');

  await page.goto('/team');

  const cards = page.getByTestId('team-card');
  await expect(cards).toHaveCount(3);
  await expect(cards.nth(0)).toContainText('Bulbasaur');
  await expect(cards.nth(1)).toContainText('Charmander');
  await expect(cards.nth(2)).toContainText('Squirtle');

  await cards.nth(2).dragTo(cards.nth(0));

  await expect(cards.nth(0)).toContainText('Squirtle');
  await expect(cards.nth(1)).toContainText('Bulbasaur');
  await expect(cards.nth(2)).toContainText('Charmander');

  await page.reload();

  await expect(cards.nth(0)).toContainText('Squirtle');
  await expect(cards.nth(1)).toContainText('Bulbasaur');
  await expect(cards.nth(2)).toContainText('Charmander');
});
