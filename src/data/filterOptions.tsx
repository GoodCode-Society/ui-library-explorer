import { FilterOption } from '../types';
import { 
  Layers, 
  Sparkles, 
  Code, 
  Import, 
  HardDrive, 
  Wand, 
  Accessibility, 
  Palette, 
  Moon, 
  Figma, 
  Type 
} from 'lucide-react';

export const mainFeatures: FilterOption[] = [
  { id: 'styled', name: 'Styled', icon: <Sparkles size={16} />, type: 'toggle', tag: 'styled' },
  { id: 'unstyled', name: 'Unstyled', icon: <Code size={16} />, type: 'toggle', tag: 'headless' },
  { id: 'imported', name: 'Imported', icon: <Import size={16} />, type: 'toggle', prop: 'isImported' },
  { id: 'pasted', name: 'Pasted', icon: <HardDrive size={16} />, type: 'toggle', prop: 'isImported', invert: true },
  { id: 'components', name: 'Components', icon: <Layers size={16} />, type: 'toggle', prop: 'hasComponents' },
  { id: 'tailwind', name: 'Tailwind CSS', icon: <Wand size={16} />, type: 'toggle', prop: 'isTailwind' },
  { id: 'free', name: 'Free', icon: <Wand size={16} />, type: 'toggle', prop: 'isFree' },
];

export const moreFeatures: FilterOption[] = [
  { id: 'accessible', name: 'Fully Accessible', icon: <Accessibility size={16} />, type: 'toggle', prop: 'isFullyAccessible' },
  { id: 'themes', name: 'Built-in Themes', icon: <Palette size={16} />, type: 'toggle', prop: 'hasBuiltinThemes' },
  { id: 'darkmode', name: 'Dark Mode', icon: <Moon size={16} />, type: 'toggle', prop: 'hasDarkMode' },
  { id: 'figma', name: 'Figma files', icon: <Figma size={16} />, type: 'toggle', prop: 'hasFigmaFiles' },
  { id: 'typed', name: 'Fully Typed', icon: <Type size={16} />, type: 'toggle', prop: 'isFullyTyped' },
];