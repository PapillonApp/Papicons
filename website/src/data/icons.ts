import type { Icon } from '../types';

type IconFile = {
  default: string;
};

const iconModules = import.meta.glob('../../../icons/*.svg', { eager: true });
const iconSource = import.meta.glob('../../../icons/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
});

export const icons: Icon[] = Object.entries(iconModules)
  .map(([path, module]) => {
    const name = path.split('/').pop()?.replace('.svg', '') ?? path;

    return {
      name,
      src: (module as IconFile).default,
      svg: iconSource[path] as string,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name))
  .filter((icon) => !icon.name.startsWith('private_'));
