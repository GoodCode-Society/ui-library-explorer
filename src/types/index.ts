export interface Library {
  id: number;
  name: string;
  description: string;
  img: string;
  tags: string[];
  isTailwind: boolean;
  isSponsor: boolean;
  stars: number;
  downloads: number;
  license: string;
  isImported: boolean;
  hasComponents: boolean;
  isFree: boolean;
  isFullyAccessible: boolean;
  hasBuiltinThemes: boolean;
  hasThemeGenerator: boolean;
  hasDarkMode: boolean;
  hasSemanticColors: boolean;
  hasFigmaFiles: boolean;
  isFullyTyped: boolean;
  website?: string;
  github?: string;
  category: string;
  lastUpdated: string;
}

export interface FilterState {
  styled: boolean;
  unstyled: boolean;
  imported: boolean;
  pasted: boolean;
  components: boolean;
  tailwind: boolean;
  free: boolean;
  accessible: boolean;
  themes: boolean;
  darkmode: boolean;
  figma: boolean;
  typed: boolean;
}

export interface RangeFilters {
  stars: number;
  downloads: number;
}

export interface FilterOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  type: 'toggle' | 'select';
  tag?: string;
  prop?: string;
  invert?: boolean;
}

export type SortOption = 'name' | 'stars' | 'downloads' | 'updated';
export type SortDirection = 'asc' | 'desc';