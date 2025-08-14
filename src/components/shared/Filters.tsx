import React from 'react';
import { Filter, Star, Download, Eraser, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { FilterState, RangeFilters } from '../../types';
import { mainFeatures, moreFeatures } from '../../data/filterOptions';

interface FiltersProps {
  filtersState: FilterState;
  setFiltersState: React.Dispatch<React.SetStateAction<FilterState>>;
  rangeFilters: RangeFilters;
  setRangeFilters: React.Dispatch<React.SetStateAction<RangeFilters>>;
  isOpen: boolean;
  onClose: () => void;
}

interface FilterButtonProps {
  filter: any;
  activeFilter: FilterState;
  onSelect: (filterId: string) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ filter, activeFilter, onSelect }) => {
  const isActive = activeFilter[filter.id as keyof FilterState];
  
  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      size="sm"
      onClick={() => onSelect(filter.id)}
      className="flex items-center space-x-2"
    >
      {filter.icon}
      <span>{filter.name}</span>
    </Button>
  );
};

interface FilterRangeProps {
  label: string;
  icon: React.ReactNode;
  value: number;
  onChange: (value: number) => void;
  max: number;
}

const FilterRange: React.FC<FilterRangeProps> = ({ label, icon, value, onChange, max }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
        {icon}
        <span>{label}</span>
      </span>
      <span className="text-sm font-semibold">
        {value === 0 ? 'Any' : `${Math.round(value / 1000)}k+`}
      </span>
    </div>
    <input
      type="range"
      min="0"
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider"
    />
  </div>
);

export const Filters: React.FC<FiltersProps> = ({ 
  filtersState, 
  setFiltersState, 
  rangeFilters, 
  setRangeFilters,
  isOpen,
  onClose
}) => {
  const toggleFilter = (filterId: string) => {
    setFiltersState(prev => {
      const newState = { ...prev };
      
      if (filterId === 'styled' || filterId === 'unstyled') {
        newState['styled'] = false;
        newState['unstyled'] = false;
        newState[filterId as keyof FilterState] = !prev[filterId as keyof FilterState];
      }
      else if (filterId === 'imported' || filterId === 'pasted') {
        newState['imported'] = false;
        newState['pasted'] = false;
        newState[filterId as keyof FilterState] = !prev[filterId as keyof FilterState];
      }
      else {
        newState[filterId as keyof FilterState] = !prev[filterId as keyof FilterState];
      }
      return newState;
    });
  };

  const clearFilters = () => {
    setFiltersState({
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
    setRangeFilters({ stars: 0, downloads: 0 });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filtersState).filter(Boolean).length + 
           (rangeFilters.stars > 0 ? 1 : 0) + 
           (rangeFilters.downloads > 0 ? 1 : 0);
  };

  return (
    <div className={`fixed inset-0 z-50 lg:static lg:inset-auto ${isOpen ? 'block' : 'hidden lg:block'}`}>
      {/* Mobile overlay */}
      <div 
        className="fixed inset-0 bg-black/50 lg:hidden"
        onClick={onClose}
      />
      
      {/* Filter panel */}
      <div className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 overflow-y-auto lg:relative lg:w-full lg:h-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Filter size={20} />
                <span>Filters</span>
                {getActiveFiltersCount() > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onClose}
                className="lg:hidden"
              >
                <X size={16} />
              </Button>
            </div>
            <CardDescription>Refine your search with these options.</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-500 mb-3 dark:text-gray-400">
                Main Features
              </h4>
              <div className="flex flex-wrap gap-2">
                {mainFeatures.map(filter => (
                  <FilterButton
                    key={filter.id}
                    filter={filter}
                    activeFilter={filtersState}
                    onSelect={toggleFilter}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-500 mb-3 dark:text-gray-400">
                Additional Features
              </h4>
              <div className="flex flex-wrap gap-2">
                {moreFeatures.map(filter => (
                  <FilterButton
                    key={filter.id}
                    filter={filter}
                    activeFilter={filtersState}
                    onSelect={toggleFilter}
                  />
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-500 mb-3 dark:text-gray-400">
                Popularity
              </h4>
              <FilterRange 
                label="Stars" 
                icon={<Star size={16} />} 
                value={rangeFilters.stars} 
                onChange={(val) => setRangeFilters(prev => ({ ...prev, stars: val }))} 
                max={100000} 
              />
              <FilterRange 
                label="Weekly Downloads" 
                icon={<Download size={16} />} 
                value={rangeFilters.downloads} 
                onChange={(val) => setRangeFilters(prev => ({ ...prev, downloads: val }))} 
                max={10500000} 
              />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              onClick={clearFilters} 
              variant="outline" 
              className="w-full justify-center"
            >
              <Eraser size={16} className="mr-2" />
              Clear all filters
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};