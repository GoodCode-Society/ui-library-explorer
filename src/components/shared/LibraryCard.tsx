import React from 'react';
import { Star, Download, ExternalLink, Github, Heart, Eye, ScanEye , Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/Tooltip';
import { Library } from '../../types';
import { formatNumber } from '../../utils/filterUtils';

interface LibraryCardProps {
  library: Library;
  onToggleFavorite: (id: number) => void;
  isFavorite: boolean;
  onToggleCompare: (id: number) => void;
  isInComparison: boolean;
  onView: (library: Library) => void;
}

export const LibraryCard: React.FC<LibraryCardProps> = ({
  library,
  onToggleFavorite,
  isFavorite,
  onToggleCompare,
  isInComparison,
  onView
}) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

  return (
    <Card className="flex flex-col h-full group transition-all duration-200 hover:shadow-xl hover:scale-[1.01] rounded-xl border border-gray-100 dark:border-gray-800">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-3">
          <div
            className="flex items-center space-x-3 flex-1 cursor-pointer"
            onClick={() => onView(library)}
          >
            <div className="relative">
              <img
                src={library.img}
                alt={`${library.name} logo`}
                className="w-12 h-12 rounded-lg object-cover ring-1 ring-gray-200 dark:ring-gray-700"
              />
              {library.isSponsor && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    </TooltipTrigger>
                    <TooltipContent>Sponsor</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors truncate">
                {library.name}
              </CardTitle>
              <Badge variant="outline" className="text-xs mt-1 bg-gray-50 dark:bg-gray-800">
                {library.category}
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleFavorite(library.id)}
                    className={`p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                    aria-label="Toggle Favorite"
                  >
                    <Heart size={14} fill={isFavorite ? 'currentColor' : 'none'} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Favorite</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleCompare(library.id)}
                    className={`p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 ${isInComparison ? 'text-blue-500' : 'text-gray-400'}`}
                    aria-label="Toggle Compare"
                  >
                    <ScanEye  size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Compare</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Star size={14} className="mr-1 text-yellow-500" />
              <span className="font-medium">{formatNumber(library.stars)}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Download size={12} className="mr-1" />
              <span>{formatNumber(library.downloads)}</span>
            </div>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar size={12} className="mr-1" />
            {formatDate(library.lastUpdated)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 py-3">
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {library.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-3">
          {library.isTailwind && (
            <Badge variant="secondary" className="text-xs px-2 py-0.5">Tailwind</Badge>
          )}
          {library.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5 bg-gray-50 dark:bg-gray-800">
              {tag}
            </Badge>
          ))}
          {library.tags.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-0.5 text-gray-500">
              +{library.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between w-full">
          <div className="flex space-x-1">
            {library.website && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(library.website, '_blank')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <ExternalLink size={14} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Website</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {library.github && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(library.github, '_blank')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <Github size={14} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>GitHub</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          <Button
            size="sm"
            onClick={() => onView(library)}
            className="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            <Eye size={12} className="mr-1.5" />
            Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
