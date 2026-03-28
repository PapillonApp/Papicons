import { AnimatePresence, motion } from 'motion/react';
import { Papicons } from '@getpapillon/papicons';
import type { ChangeEvent } from 'react';

type SearchInputProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  numberOfIcons?: number;
};

export default function SearchInput({
  value,
  onChange,
  onClear,
  numberOfIcons = 1,
}: SearchInputProps) {
  return (
    <div className="flex items-center gap-4 bg-[#e1e4ee] dark:bg-[#1b2338] rounded-full transition-all mb-6 md:mb-0 px-5 w-full">
      <div className="w-6 opacity-60 dark:opacity-70">
        <Papicons name="search" size={28} />
      </div>

      <input
        type="search"
        placeholder={`Search for ${numberOfIcons} icons...`}
        value={value}
        onChange={onChange}
        className="w-full h-15 text-xl bg-transparent focus:outline-none font-medium placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
      />

      <AnimatePresence mode="popLayout" initial={false}>
        {value.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
          >
            <motion.button
              type="button"
              onClick={onClear}
              className="p-2 rounded-full hover:bg-neutral-300 dark:hover:bg-[#2a3554] transition-all"
              aria-label="Clear search input"
            >
              <Papicons name="cross" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
