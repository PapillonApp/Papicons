import { AnimatePresence, motion } from 'motion/react';
import { Papicons } from '@getpapillon/papicons';
import { copyModes } from '../constants/copyModes';
import type { CopyMode } from '../types';

type CopyModeSelectorProps = {
  mode: CopyMode;
  onChange: (mode: CopyMode) => void;
};

export default function CopyModeSelector({
  mode,
  onChange,
}: CopyModeSelectorProps) {
  const activeMode = copyModes.find((value) => value.value === mode);

  return (
    <div className="w-60 md:w-100 flex items-center gap-4 bg-[#e1e4ee] dark:bg-[#1b2338] rounded-full transition-all mb-6 md:mb-0 px-5">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          className="w-6 opacity-60"
          key={mode}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
        >
          <Papicons name={activeMode?.icon ?? 'code'} className="opacity-60" size={28} />
        </motion.div>
      </AnimatePresence>

      <select
        value={mode}
        onChange={(event) => onChange(event.target.value as CopyMode)}
        className="w-full h-15 text-xl bg-transparent focus:outline-none font-medium"
      >
        {copyModes.map((copyMode) => (
          <option key={copyMode.value} value={copyMode.value}>
            {copyMode.label}
          </option>
        ))}
      </select>
    </div>
  );
}
