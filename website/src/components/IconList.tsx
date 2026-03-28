import { AnimatePresence, motion } from 'motion/react';
import type { CopyMode, Icon } from '../types';
import IconItem from './IconItem';

type IconListProps = {
  icons: Icon[];
  copyMode: CopyMode;
};

export default function IconList({ icons, copyMode }: IconListProps) {
  return (
    <motion.div
      layout
      className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(72px,1fr))]"
    >
      <AnimatePresence mode="sync" initial={false}>
        {icons.map((icon) => (
          <IconItem key={icon.name} icon={icon} copyMode={copyMode} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
