import React from 'react';
import { BookCopy, Github, User, Star, GitFork, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  const githubRepo = {
    stars: 1234,
    forks: 567,
    url: 'https://github.com/ddahan/ui-libs'
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl shadow-2xl p-1 border border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/15 rounded-xl backdrop-blur-sm shadow-lg">
            <BookCopy size={32} className="text-white drop-shadow-sm" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              React UI Library Picker
            </h1>
            <p className="text-blue-100/90 text-sm font-medium">Find the perfect React UI library</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <a 
            href={githubRepo.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden md:flex items-center space-x-2 text-blue-100 hover:text-white hover:scale-105 transition-all duration-300 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg"
          >
            <Github size={18} />
            <div className="flex space-x-4 text-sm font-medium">
              <span className="flex items-center">
                <Star size={14} className="mr-1.5" />
                {githubRepo.stars}
              </span>
              <span className="flex items-center">
                <GitFork size={14} className="mr-1.5" />
                {githubRepo.forks}
              </span>
            </div>
          </a>
          
          <a 
            href="https://ddahan.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-100 hover:text-white hover:scale-110 transition-all duration-300 p-2.5 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg"
          >
            <User size={18} />
          </a>
          
          <button
            onClick={toggleTheme}
            className="relative p-2.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg group overflow-hidden"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center justify-center">
              <div className={`transition-all duration-500 ${isDarkMode ? 'rotate-0 scale-100' : 'rotate-180 scale-0'} absolute`}>
                <Sun size={18} className="text-yellow-200" />
              </div>
              <div className={`transition-all duration-500 ${!isDarkMode ? 'rotate-0 scale-100' : 'rotate-180 scale-0'} absolute`}>
                <Moon size={18} className="text-blue-200" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};