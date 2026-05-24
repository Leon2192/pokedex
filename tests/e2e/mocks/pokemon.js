const SPRITE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96"%3E%3Crect width="96" height="96" fill="%23f2f5f9"/%3E%3Ccircle cx="48" cy="48" r="28" fill="%23ef5350"/%3E%3C/svg%3E';

const pokemonNames = ['bulbasaur', 'charmander', 'squirtle', 'pikachu'];

const pokemonByName = {
  bulbasaur: {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    species: namedResource('bulbasaur', 'pokemon-species', 1),
    types: [{ slot: 1, type: namedResource('grass', 'type', 12) }],
    abilities: [{ ability: namedResource('overgrow', 'ability', 65), is_hidden: false }],
    stats: buildStats([45, 49, 49, 65, 65, 45]),
    sprites: buildSprites(),
  },
  charmander: {
    id: 4,
    name: 'charmander',
    height: 6,
    weight: 85,
    species: namedResource('charmander', 'pokemon-species', 4),
    types: [{ slot: 1, type: namedResource('fire', 'type', 10) }],
    abilities: [{ ability: namedResource('blaze', 'ability', 66), is_hidden: false }],
    stats: buildStats([39, 52, 43, 60, 50, 65]),
    sprites: buildSprites(),
  },
  squirtle: {
    id: 7,
    name: 'squirtle',
    height: 5,
    weight: 90,
    species: namedResource('squirtle', 'pokemon-species', 7),
    types: [{ slot: 1, type: namedResource('water', 'type', 11) }],
    abilities: [{ ability: namedResource('torrent', 'ability', 67), is_hidden: false }],
    stats: buildStats([44, 48, 65, 50, 64, 43]),
    sprites: buildSprites(),
  },
  pikachu: {
    id: 25,
    name: 'pikachu',
    height: 4,
    weight: 60,
    species: namedResource('pikachu', 'pokemon-species', 25),
    types: [{ slot: 1, type: namedResource('electric', 'type', 13) }],
    abilities: [{ ability: namedResource('static', 'ability', 9), is_hidden: false }],
    stats: buildStats([35, 55, 40, 50, 50, 90]),
    sprites: buildSprites(),
  },
};

function namedResource(name, resource, id) {
  return {
    name,
    url: `https://pokeapi.co/api/v2/${resource}/${id}/`,
  };
}

function buildStats(values) {
  const statNames = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

  return values.map((base_stat, index) => ({
    base_stat,
    stat: namedResource(statNames[index], 'stat', index + 1),
  }));
}

function buildSprites() {
  return {
    front_default: SPRITE,
    back_default: SPRITE,
    front_shiny: SPRITE,
    back_shiny: SPRITE,
    other: {
      'official-artwork': {
        front_default: SPRITE,
      },
      home: {
        front_default: SPRITE,
      },
    },
  };
}

function getPokemon(name) {
  const knownPokemon = pokemonByName[name];

  if (knownPokemon) {
    return knownPokemon;
  }

  const id = Number(name.replace('pokemon-', ''));

  return {
    id,
    name,
    height: 7,
    weight: 70,
    species: namedResource(name, 'pokemon-species', id),
    types: [{ slot: 1, type: namedResource('normal', 'type', 1) }],
    abilities: [{ ability: namedResource('run-away', 'ability', 50), is_hidden: false }],
    stats: buildStats([45, 45, 45, 45, 45, 45]),
    sprites: buildSprites(),
  };
}

function buildPokemonNames(count) {
  if (count <= pokemonNames.length) {
    return pokemonNames.slice(0, count);
  }

  return [
    ...pokemonNames,
    ...Array.from({ length: count - pokemonNames.length }, (_, index) => {
      const id = pokemonNames.length + index + 1;

      return `pokemon-${id}`;
    }),
  ];
}

function buildPokemonList(url, names) {
  const limit = Number(url.searchParams.get('limit') ?? pokemonNames.length);
  const offset = Number(url.searchParams.get('offset') ?? 0);
  const pageNames = names.slice(offset, offset + limit);
  const nextOffset = offset + limit;

  return {
    count: names.length,
    next:
      nextOffset < names.length
        ? `https://pokeapi.co/api/v2/pokemon?offset=${nextOffset}&limit=${limit}`
        : null,
    previous:
      offset > 0
        ? `https://pokeapi.co/api/v2/pokemon?offset=${Math.max(offset - limit, 0)}&limit=${limit}`
        : null,
    results: pageNames.map((name) => {
      const pokemon = getPokemon(name);

      return namedResource(name, 'pokemon', pokemon.id);
    }),
  };
}

function buildSpecies(name) {
  const pokemon = getPokemon(name);

  return {
    id: pokemon.id,
    name,
    varieties: [
      {
        is_default: true,
        pokemon: namedResource(name, 'pokemon', pokemon.id),
      },
    ],
  };
}

export async function mockPokemonApi(page, { pokemonCount = pokemonNames.length } = {}) {
  const names = buildPokemonNames(pokemonCount);

  await page.route('https://pokeapi.co/api/v2/**', async (route) => {
    const url = new URL(route.request().url());
    const path = url.pathname.replace('/api/v2', '').replace(/\/$/, '');
    let body;

    if (path === '/pokemon') {
      body = buildPokemonList(url, names);
    } else if (path.startsWith('/pokemon-species/')) {
      body = buildSpecies(path.split('/').at(-1));
    } else if (path.startsWith('/pokemon/')) {
      body = getPokemon(path.split('/').at(-1));
    } else if (path === '/type') {
      body = {
        results: [
          namedResource('normal', 'type', 1),
          namedResource('grass', 'type', 12),
          namedResource('fire', 'type', 10),
          namedResource('water', 'type', 11),
          namedResource('electric', 'type', 13),
        ],
      };
    } else if (path === '/generation') {
      body = {
        results: [namedResource('generation-i', 'generation', 1)],
      };
    } else {
      body = {};
    }

    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(body),
    });
  });
}
