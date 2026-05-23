import { normalizePokemonSearch } from '@/helpers/pokedexFilters';

export const filterNamedResourcesBySearch = (resources, search) => {
  const normalizedSearch = normalizePokemonSearch(search);

  if (!normalizedSearch) {
    return resources;
  }

  return resources.filter(
    (resource) =>
      resource.name.includes(normalizedSearch) ||
      String(resource.id ?? '').includes(normalizedSearch)
  );
};

export const intersectNamedResourceGroups = (groups) => {
  const [baseGroup, ...remainingGroups] = groups.filter((group) => group.length > 0);

  if (!baseGroup) {
    return [];
  }

  if (remainingGroups.length === 0) {
    return baseGroup;
  }

  const resourceNameSets = remainingGroups.map(
    (group) => new Set(group.map((resource) => resource.name))
  );

  return baseGroup.filter((resource) =>
    resourceNameSets.every((resourceSet) => resourceSet.has(resource.name))
  );
};

export const sortNamedResourcesById = (resources) =>
  [...resources].sort((firstResource, secondResource) => {
    const firstId = firstResource.id ?? Number.MAX_SAFE_INTEGER;
    const secondId = secondResource.id ?? Number.MAX_SAFE_INTEGER;

    if (firstId !== secondId) {
      return firstId - secondId;
    }

    return firstResource.name.localeCompare(secondResource.name);
  });

export const paginateNamedResources = (resources, { limit, offset }) =>
  resources.slice(offset, offset + limit);
