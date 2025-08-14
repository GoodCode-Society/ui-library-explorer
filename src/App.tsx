import React, { useState, useMemo, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { Header } from './components/shared/Header';
import { SearchAndSort } from './components/shared/SearchAndSort';
import { Filters } from './components/shared/Filters';
import { LibraryCard } from './components/shared/LibraryCard';
import { LibraryModal } from './components/shared/LibraryModal';
import { ComparisonPanel } from './components/shared/ComparisonPanel';
import { Button } from './components/ui/Button';
import { librariesData } from './data/libraries';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDebounce } from './hooks/useDebounce';
import { filterLibraries, sortLibraries } from './utils/filterUtils';
import { FilterState, RangeFilters, SortOption, SortDirection, Library } from './types';

function App() {
  // State management
  const [filtersState, setFiltersState] = useState<FilterState>({
    styled: false,
    unstyled: false,
    imported: false,
    pasted: false,
    components: false,
    tailwind: false,
    free: false,
    accessible: false,
    themes: false,
    darkmode: false,
    figma: false,
    typed: false,
  });

  const [rangeFilters, setRangeFilters] = useState<RangeFilters>({ stars: 0, downloads: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('stars');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);
  const [favorites, setFavorites] = useLocalStorage<number[]>('favorites', []);
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage<number[]>('recentlyViewed', []);
  const [comparison, setComparison] = useState<number[]>([]);
  const [selectedLibrary, setSelectedLibrary] = useState<Library | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Debounced search
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Dark mode effect
  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Also apply to body for better coverage
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Filter and sort libraries
  const filteredAndSortedLibraries = useMemo(() => {
    const filtered = filterLibraries(librariesData, filtersState, rangeFilters, debouncedSearchQuery);
    return sortLibraries(filtered, sortBy, sortDirection);
  }, [filtersState, rangeFilters, debouncedSearchQuery, sortBy, sortDirection]);

  // Handler functions
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const toggleCompare = (id: number) => {
    setComparison(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 3) {
        // Limit to 3 items for comparison
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const handleViewLibrary = (library: Library) => {
    setSelectedLibrary(library);
    setIsModalOpen(true);
    
    // Add to recently viewed
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== library.id);
      return [library.id, ...filtered].slice(0, 10); // Keep last 10
    });
  };

  const comparisonLibraries = librariesData.filter(lib => comparison.includes(lib.id));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      {/* Header - Full Width */}
      <div className="w-full px-0 sm:px-0 lg:px-1 py-2">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 space-y-8">

        {/* Search and Sort */}
        <SearchAndSort
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          resultsCount={filteredAndSortedLibraries.length}
        />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Button
              onClick={() => setIsFiltersOpen(true)}
              variant="outline"
              className="w-full justify-center"
            >
              <Filter size={16} className="mr-2" />
              Show Filters
            </Button>
          </div>

          {/* Filters Sidebar */}
          <aside className="w-full lg:w-80 lg:shrink-0">
            <Filters
              filtersState={filtersState}
              setFiltersState={setFiltersState}
              rangeFilters={rangeFilters}
              setRangeFilters={setRangeFilters}
              isOpen={isFiltersOpen}
              onClose={() => setIsFiltersOpen(false)}
            />
          </aside>

          {/* Library Grid */}
          <main className="flex-1">
            {filteredAndSortedLibraries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedLibraries.map(library => (
                  <LibraryCard
                    key={library.id}
                    library={library}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={favorites.includes(library.id)}
                    onToggleCompare={toggleCompare}
                    isInComparison={comparison.includes(library.id)}
                    onView={handleViewLibrary}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <Filter size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No libraries found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your filters or search terms to find the perfect UI library.
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Library Detail Modal */}
      <LibraryModal
        library={selectedLibrary}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Comparison Panel */}
      <ComparisonPanel
        libraries={comparisonLibraries}
        onRemove={toggleCompare}
        onClose={() => setComparison([])}
      />
    </div>
  );
}

export default App;