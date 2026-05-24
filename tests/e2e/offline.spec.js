import { expect, test } from '@playwright/test';
import { mockPokemonApi } from './mocks/pokemon';

test('el header refleja estado online y offline', async ({ context, page }) => {
  await mockPokemonApi(page);
  await page.goto('/pokedex');

  await expect(page.getByText('En linea')).toBeVisible();

  await context.setOffline(true);
  await expect(page.getByText('Sin conexion', { exact: true })).toBeVisible();

  await context.setOffline(false);
  await expect(page.getByText('En linea')).toBeVisible();
});

test('offline pausa el infinite scroll y evita requests fallidas en loop', async ({
  context,
  page,
}) => {
  await mockPokemonApi(page, { pokemonCount: 60 });

  const failedPokemonRequests = [];
  page.on('requestfailed', (request) => {
    if (request.url().startsWith('https://pokeapi.co/api/v2/')) {
      failedPokemonRequests.push(request.url());
    }
  });

  await page.goto('/pokedex');
  await expect(page.getByTestId('pokemon-card')).toHaveCount(24);

  await context.setOffline(true);
  await expect(page.getByText('Sin conexion', { exact: true })).toBeVisible();

  for (let attempt = 0; attempt < 4; attempt += 1) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(150);
  }

  await expect(
    page.getByText('Estas sin conexion. Se muestran los datos disponibles en cache.')
  ).toBeVisible();
  await expect(page.getByTestId('pokemon-card')).toHaveCount(24);
  expect(failedPokemonRequests).toHaveLength(0);
});

test('muestra datos cacheados al navegar offline si ya estaban cargados', async ({
  context,
  page,
}) => {
  await mockPokemonApi(page);
  await page.goto('/pokedex');

  await expect(page.getByTestId('pokemon-card')).toHaveCount(4);
  await page.getByRole('link', { name: 'Equipo', exact: true }).click();
  await page.getByRole('link', { name: 'Pokedex', exact: true }).click();
  await expect(page.getByTestId('pokemon-card')).toHaveCount(4);

  await context.setOffline(true);
  await page.getByRole('link', { name: 'Equipo', exact: true }).click();
  await page.getByRole('link', { name: 'Pokedex', exact: true }).click();

  await expect(page.getByTestId('pokemon-card')).toHaveCount(4);
  await expect(page.getByText('Cache sin conexion')).toBeVisible();
  await expect(
    page.getByText('Estas sin conexion. Se muestran los datos disponibles en cache.')
  ).toBeVisible();
});

test('offline sin cache muestra estado controlado y recupera al volver online', async ({
  context,
  page,
}) => {
  await mockPokemonApi(page);
  await page.goto('/pokedex');
  await expect(page.getByTestId('pokemon-card')).toHaveCount(4);

  await context.setOffline(true);
  await page.route('https://pokeapi.co/api/v2/**', (route) => route.abort('internetdisconnected'));
  await page.getByTestId('pokemon-search-input').fill('pika');

  await expect(page.getByRole('heading', { name: 'No hay conexion' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Reintentar' })).toBeDisabled();

  await page.unroute('https://pokeapi.co/api/v2/**');
  await mockPokemonApi(page);
  await context.setOffline(false);

  await expect(page.getByTestId('pokemon-card')).toHaveCount(1);
  await expect(page.getByRole('link', { name: /Ver detalle de Pikachu/i })).toBeVisible();
});
