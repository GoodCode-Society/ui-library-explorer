import React from 'react';
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { SortOption, SortDirection } from '../../types';

interface SearchAndSortProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  sortDirection: SortDirection;
  setSortDirection: (direction: SortDirection) => void;
  resultsCount: number;
}

export const SearchAndSort: React.FC<SearchAndSortProps> = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
  resultsCount
}) => {
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'stars', label: 'Stars' },
    { value: 'downloads', label: 'Downloads' },
    { value: 'updated', label: 'Last Updated' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 max-w-md">
          <Input
            type="text"
            placeholder="Search libraries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={16} />}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {resultsCount} {resultsCount === 1 ? 'library' : 'libraries'}
          </span>
          
          <div className="flex items-center gap-2">
            <Select
              value={sortBy}
              onChange={(value) => setSortBy(value as SortOption)}
              options={sortOptions}
            />
            
            <Button
              variant="outline"
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              className="p-2"
            >
              {sortDirection === 'asc' ? (
                <ArrowUp size={16} />
              ) : (
                <ArrowDown size={16} />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};