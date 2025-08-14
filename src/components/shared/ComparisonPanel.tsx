import React from 'react';
import { X, Star, Download, Check, X as XIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Library } from '../../types';
import { formatNumber } from '../../utils/filterUtils';

interface ComparisonPanelProps {
  libraries: Library[];
  onRemove: (id: number) => void;
  onClose: () => void;
}

export const ComparisonPanel: React.FC<ComparisonPanelProps> = ({ 
  libraries, 
  onRemove, 
  onClose 
}) => {
  if (libraries.length === 0) return null;

  const features = [
    { key: 'isFullyAccessible', label: 'Fully Accessible' },
    { key: 'hasBuiltinThemes', label: 'Built-in Themes' },
    { key: 'hasDarkMode', label: 'Dark Mode' },
    { key: 'hasFigmaFiles', label: 'Figma Files' },
    { key: 'isFullyTyped', label: 'TypeScript' },
    { key: 'isTailwind', label: 'Tailwind' },
    { key: 'hasComponents', label: 'Components' },
    { key: 'isFree', label: 'Free' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-xl z-40 max-h-[60vh] overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold">Compare Libraries ({libraries.length})</h3>
          <Button variant="ghost" onClick={onClose} className="p-2" aria-label="Close comparison">
            <X size={16} />
          </Button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white dark:bg-gray-900">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-2 font-medium min-w-32">Feature</th>
                  {libraries.map(lib => (
                    <th key={lib.id} className="text-center py-3 px-2 min-w-40">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex items-center space-x-2">
                          <img src={lib.img} alt={`${lib.name} logo`} className="w-6 h-6 rounded flex-shrink-0" />
                          <span className="font-medium truncate max-w-20" title={lib.name}>{lib.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemove(lib.id)}
                            className="p-1 text-gray-400 hover:text-red-500 flex-shrink-0"
                            aria-label={`Remove ${lib.name} from comparison`}
                          >
                            <X size={12} />
                          </Button>
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <span className="flex items-center" title={`${lib.stars} stars`}>
                            <Star size={12} className="mr-1 text-yellow-500" />
                            {formatNumber(lib.stars)}
                          </span>
                          <span className="flex items-center" title={`${lib.downloads} downloads`}>
                            <Download size={12} className="mr-1" />
                            {formatNumber(lib.downloads)}
                          </span>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map(feature => (
                  <tr key={feature.key} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-2 font-medium text-gray-700 dark:text-gray-300">
                      {feature.label}
                    </td>
                    {libraries.map(lib => (
                      <td key={lib.id} className="py-3 px-2 text-center">
                        {lib[feature.key as keyof Library] ? (
                          <Check size={16} className="mx-auto text-green-500" aria-label="Yes" />
                        ) : (
                          <XIcon size={16} className="mx-auto text-gray-300" aria-label="No" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};