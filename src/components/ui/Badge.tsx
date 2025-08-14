import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'error';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors';
  
  let variantClasses = '';
  switch (variant) {
    case 'default':
      variantClasses = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      break;
    case 'secondary':
      variantClasses = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      break;
    case 'outline':
      variantClasses = 'border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-300';
      break;
    case 'success':
      variantClasses = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      break;
    case 'warning':
      variantClasses = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      break;
    case 'error':
      variantClasses = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      break;
  }

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};