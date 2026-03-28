import { useMemo } from 'react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { copyModeLabel } from '../constants/copyModes';
import type { CopyMode, Icon } from '../types';
import { formatHyphenatedName } from '../utils/iconName';
import IconRenderer from './IconRenderer';

type IconItemProps = {
  icon: Icon;
  copyMode: CopyMode;
};

const toJsxSvg = (svg: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">${svg
    .replace(/<\?xml.*?\?>/, '')
    .replace(/<!DOCTYPE.*?>/, '')
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')}</svg>`;

const getCopyValue = (icon: Icon, copyMode: CopyMode) => {
  if (copyMode === 'svg') return icon.svg;
  if (copyMode === 'jsx') return toJsxSvg(icon.svg);
  if (copyMode === 'name') return icon.name;
  return `<Papicons name="${formatHyphenatedName(icon.name)}" />`;
};

export default function IconItem({ icon, copyMode }: IconItemProps) {
  const copyValue = useMemo(() => getCopyValue(icon, copyMode), [icon, copyMode]);
  const modeLabel = copyModeLabel[copyMode];

  const handleCopy = async () => {
    toast.promise(navigator.clipboard.writeText(copyValue), {
      loading: `Copying ${modeLabel} to clipboard...`,
      success: `${copyMode === 'name' ? icon.name : modeLabel} copied to clipboard!`,
      error: 'Failed to copy to clipboard.',
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        layout: { duration: 0.4, type: 'spring', bounce: 0.2 },
        opacity: { duration: 0.1, ease: 'easeOut' },
        scale: { duration: 0.1, ease: 'easeOut' },
      }}
      className="w-full h-full"
    >
      <button
        type="button"
        onClick={handleCopy}
        className="w-full h-full icon-button group aspect-square flex items-center justify-center overflow-visible rounded-2xl bg-white hover:shadow-lg transition-all cursor-pointer hover:scale-110 border border-neutral-100 hover:border-neutral-400 active:shadow-md active:scale-100"
        aria-label={`Copy ${icon.name} ${modeLabel}`}
      >
        <IconRenderer name={icon.name} />
        <span className="pointer-events-none absolute -top-2 left-1/2 z-100 w-max -translate-x-1/2 whitespace-nowrap rounded-full bg-neutral-900 px-2 py-1 text-sm font-medium leading-none text-white opacity-0 transition-all group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:delay-50 duration-200 scale-80 group-hover:scale-100 -translate-y-4 group-hover:-translate-y-full">
          {icon.name}
        </span>
      </button>
    </motion.div>
  );
}
