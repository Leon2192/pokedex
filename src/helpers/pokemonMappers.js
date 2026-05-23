import { formatPokemonName, formatPokemonNumber } from '@/utils/formatters';
import { getResourceIdFromUrl, getPokemonTypeColor, getPokemonTypeLabel } from '@/utils/pokemon';

const STAT_LABELS = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Ataque especial',
  'special-defense': 'Defensa especial',
  speed: 'Velocidad',
};

const formatStatName = (name) => STAT_LABELS[name] ?? formatPokemonName(name);

export const mapNamedResource = (resource) => ({
  id: getResourceIdFromUrl(resource.url),
  name: resource.name,
  url: resource.url,
});

export const mapNamedResourceList = (response) => ({
  count: response.count,
  next: response.next,
  previous: response.previous,
  results: response.results.map(mapNamedResource),
});

const buildSpriteList = (sprites = {}) =>
  [
    { key: 'front_default', label: 'Frente', src: sprites.front_default },
    { key: 'back_default', label: 'Espalda', src: sprites.back_default },
    { key: 'front_shiny', label: 'Shiny', src: sprites.front_shiny },
    { key: 'back_shiny', label: 'Shiny espalda', src: sprites.back_shiny },
  ].filter((sprite) => Boolean(sprite.src));

const buildVariantList = (species, pokemonName) =>
  (species?.varieties ?? []).map((variety) => ({
    isDefault: Boolean(variety.is_default),
    name: variety.pokemon.name,
    displayName: formatPokemonName(variety.pokemon.name),
    isCurrent: variety.pokemon.name === pokemonName,
    url: variety.pokemon.url,
  }));

export const mapPokemonSpecies = (species) => ({
  id: species.id,
  name: species.name,
  variants: buildVariantList(species),
});

export const mapPokemonDetails = (pokemon, species) => {
  const sprite =
    pokemon.sprites?.other?.['official-artwork']?.front_default ??
    pokemon.sprites?.other?.home?.front_default ??
    pokemon.sprites?.front_default ??
    '';

  return {
    id: pokemon.id,
    name: pokemon.name,
    speciesName: pokemon.species?.name ?? pokemon.name,
    displayName: formatPokemonName(pokemon.name),
    number: formatPokemonNumber(pokemon.id),
    sprite,
    sprites: buildSpriteList(pokemon.sprites),
    variants: buildVariantList(species, pokemon.name),
    types: pokemon.types.map(({ type }) => ({
      name: type.name,
      displayName: getPokemonTypeLabel(type.name),
      color: getPokemonTypeColor(type.name),
    })),
    abilities: pokemon.abilities.map(({ ability, is_hidden: isHidden }) => ({
      name: ability.name,
      displayName: formatPokemonName(ability.name),
      isHidden,
    })),
    stats: pokemon.stats.map(({ base_stat: baseStat, stat }) => ({
      name: stat.name,
      displayName: formatStatName(stat.name),
      value: baseStat,
    })),
    height: pokemon.height,
    weight: pokemon.weight,
  };
};
