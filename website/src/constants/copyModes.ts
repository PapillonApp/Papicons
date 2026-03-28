import type { CopyMode } from '../types';

export const copyModes: { value: CopyMode; label: string; icon: string }[] = [
  { value: 'svg', label: 'SVG', icon: 'code' },
  { value: 'jsx', label: 'JSX', icon: 'code' },
  { value: 'name', label: 'Icon name', icon: 'pen' },
  { value: 'react', label: 'React', icon: 'grid' },
];

export const copyModeLabel: Record<CopyMode, string> = {
  svg: 'SVG',
  jsx: 'JSX',
  name: 'Name',
  react: 'React',
};
