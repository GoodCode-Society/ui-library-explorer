import { Library, FilterState, RangeFilters, SortOption, SortDirection } from '../types';

export const filterLibraries = (
  libraries: Library[],
  filtersState: FilterState,
  rangeFilters: RangeFilters,
  searchQuery: string
): Library[] => {
  return libraries.filter(lib => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        lib.name.toLowerCase().includes(query) ||
        lib.description.toLowerCase().includes(query) ||
        lib.tags.some(tag => tag.toLowerCase().includes(query)) ||
        lib.category.toLowerCase().includes(query);
      
      if (!matchesSearch) return false;
    }

    // Tags filter (styled/unstyled)
    const passesTagFilter = (!filtersState.styled && !filtersState.unstyled) ||
      (filtersState.styled && lib.tags.includes('styled')) ||
      (filtersState.unstyled && lib.tags.includes('headless'));
    
    // Other boolean filters
    const passesBooleanFilters = 
      (!filtersState.imported || lib.isImported) &&
      (!filtersState.pasted || !lib.isImported) &&
      (!filtersState.components || lib.hasComponents) &&
      (!filtersState.tailwind || lib.isTailwind) &&
      (!filtersState.free || lib.isFree) &&
      (!filtersState.accessible || lib.isFullyAccessible) &&
      (!filtersState.themes || lib.hasBuiltinThemes) &&
      (!filtersState.darkmode || lib.hasDarkMode) &&
      (!filtersState.figma || lib.hasFigmaFiles) &&
      (!filtersState.typed || lib.isFullyTyped);

    // Range filters
    const passesStarsFilter = lib.stars >= rangeFilters.stars;
    const passesDownloadsFilter = lib.downloads >= rangeFilters.downloads;

    return passesTagFilter && passesBooleanFilters && passesStarsFilter && passesDownloadsFilter;
  });
};

export const sortLibraries = (
  libraries: Library[],
  sortBy: SortOption,
  sortDirection: SortDirection
): Library[] => {
  return [...libraries].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'stars':
        comparison = a.stars - b.stars;
        break;
      case 'downloads':
        comparison = a.downloads - b.downloads;
        break;
      case 'updated':
        comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
        break;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
};