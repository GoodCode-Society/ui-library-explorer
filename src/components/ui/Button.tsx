import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'default', 
  size = 'md',
  className = '',
  disabled = false
}) => {
  const baseClasses = 'font-semibold transition-all duration-200 rounded-lg focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  let variantClasses = '';
  switch (variant) {
    case 'default':
      variantClasses = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600';
      break;
    case 'outline':
      variantClasses = 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700';
      break;
    case 'ghost':
      variantClasses = 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-700';
      break;
    case 'destructive':
      variantClasses = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      break;
  }

  let sizeClasses = '';
  switch (size) {
    case 'sm':
      sizeClasses = 'px-3 py-1.5 text-sm';
      break;
    case 'md':
      sizeClasses = 'px-4 py-2';
      break;
    case 'lg':
      sizeClasses = 'px-6 py-3 text-lg';
      break;
  }

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
    >
      {children}
    </button>
  );
};