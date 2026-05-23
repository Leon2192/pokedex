import { formatPokemonName, formatPokemonNumber } from '@/utils/formatters';
import { getResourceIdFromUrl, getPokemonTypeColor } from '@/utils/pokemon';

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
    { key: 'front_default', label: 'Front', src: sprites.front_default },
    { key: 'back_default', label: 'Back', src: sprites.back_default },
    { key: 'front_shiny', label: 'Shiny', src: sprites.front_shiny },
    { key: 'back_shiny', label: 'Back shiny', src: sprites.back_shiny },
  ].filter((sprite) => Boolean(sprite.src));

export const mapPokemonDetails = (pokemon) => {
  const sprite =
    pokemon.sprites?.other?.['official-artwork']?.front_default ??
    pokemon.sprites?.other?.home?.front_default ??
    pokemon.sprites?.front_default ??
    '';

  return {
    id: pokemon.id,
    name: pokemon.name,
    displayName: formatPokemonName(pokemon.name),
    number: formatPokemonNumber(pokemon.id),
    sprite,
    sprites: buildSpriteList(pokemon.sprites),
    types: pokemon.types.map(({ type }) => ({
      name: type.name,
      displayName: formatPokemonName(type.name),
      color: getPokemonTypeColor(type.name),
    })),
    abilities: pokemon.abilities.map(({ ability, is_hidden: isHidden }) => ({
      name: ability.name,
      displayName: formatPokemonName(ability.name),
      isHidden,
    })),
    stats: pokemon.stats.map(({ base_stat: baseStat, stat }) => ({
      name: stat.name,
      displayName: formatPokemonName(stat.name),
      value: baseStat,
    })),
    height: pokemon.height,
    weight: pokemon.weight,
  };
};
