import { useMemo, useState } from 'react';
import './style.css';
import PapiconsLogotype from './icons/PapiconsLogotype';
import toast, { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'motion/react';
import { Papicons } from '@getpapillon/papicons';

type IconFile = {
  default: string;
};

type Icon = {
  name: string;
  src: string;
  svg: string;
};

const iconModules = import.meta.glob('../../icons/*.svg', { eager: true });
const iconSource = import.meta.glob('../../icons/*.svg', {
  eager: true,
  as: 'raw',
});

const formatHyphenatedName = (name: string) => {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
};

const icons = Object.entries(iconModules)
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

const normalizeForSearch = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '');

const tokenizeForSearch = (value: string) =>
  value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

function App() {
  const [query, setQuery] = useState('');

  const filteredIcons = useMemo(() => {
    const normalizedQuery = normalizeForSearch(query);
    const queryTokens = tokenizeForSearch(query);

    if (!normalizedQuery && queryTokens.length === 0) {
      return icons;
    }

    return icons.filter((icon) => {
      const normalizedName = normalizeForSearch(icon.name);
      if (normalizedQuery && normalizedName.includes(normalizedQuery)) {
        return true;
      }

      if (queryTokens.length === 0) {
        return false;
      }

      return queryTokens.every((token) => normalizedName.includes(token));
    });
  }, [query]);

  const [copyMode, setCopyMode] = useState<CopyModeTypes>('svg');

  return (
    <main className="flex justify-center bg-[#f0f2f9] min-h-screen">
      <div className="w-full max-w-5xl m-8 md:m-16 gap-2 md:gap-6 flex flex-col">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8 md:gap-12 self-start w-full">
          <PapiconsLogotype className="w-42" />

          <ul className="flex items-center md:justify-end gap-6 md:gap-8 text-lg text-neutral-700">
            <li className="font-medium text-neutral-900 hover:text-blue-700">
              <a href="https://papillon.bzh">The Papillon Project</a>
            </li>
            <li className="font-medium text-neutral-900 hover:text-blue-700">
              <a href="https://docs.papillon.bzh/papicons">Docs</a>
            </li>
            <li className="font-medium text-neutral-900 hover:text-blue-700">
              <a href="https://github.com/PapillonApp/Papicons">GitHub</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 my-6">
          <div className="max-w-3xl flex items-start gap-5 justify-center flex-col">
            <h1 className="text-5xl tracking-tight font-bold text-left">
              Open source, simple, human icons for everyone.
            </h1>
            <p className="text-xl font-medium text-left text-neutral-700">
              Papicons is a free and open source icon library designed for
              everyone, focused on simplicity and accessibility.
            </p>
            <a
              href="https://github.com/PapillonApp/Papicons/blob/react-native/LICENSE"
              className="text-md -mt-1 leading-relaxed text-left text-neutral-400 hover:underline"
            >
              Papicons is an open-source project under the MIT license.{' '}
            </a>
          </div>

          <iframe
            className="aspect-video rounded-xl w-full max-w-120 shadow-lg -mt-2 hidden lg:block"
            src="https://www.youtube.com/embed/ob53CHx9kTs?si=zrLPHiaoKY3noJWm&amp;controls=0"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          />
        </div>

        <div className="min-h-screen gap-4 flex flex-col">
          <div className="flex items-center gap-4">
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <CopyModeSelector mode={copyMode} onChange={setCopyMode} />
          </div>

          <IconList icons={filteredIcons} copyMode={copyMode} />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between md:gap-4 mt-16 md:mt-0">
          <p className="text-sm text-neutral-500">
            © 2026 Association Papillon - This website is open source
          </p>

          <p className="text-sm text-neutral-500">
            Made with {'<3'} by the Papillon Team -{' '}
            <a href="https://papillon.bzh" className="hover:underline">
              papillon.bzh
            </a>
          </p>
        </div>

        <Toaster
          toastOptions={{
            className: '',
            style: {
              borderRadius: '80px',
              fontWeight: '500',
              padding: '6px 12px',
              paddingRight: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            },
          }}
        />
      </div>
    </main>
  );
}

const SearchInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex items-center gap-4 bg-[#e1e4ee] rounded-full transition-all mb-6 md:mb-0 px-5 w-full">
      <div className="w-6 opacity-60">
        <Papicons name="search" size={28} />
      </div>

      <input
        type="search"
        placeholder="Search for an icon"
        value={value}
        onChange={onChange}
        className="w-full h-15 text-xl bg-transparent focus:outline-none font-medium"
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
              onClick={() => onChange({ target: { value: '' } } as any)}
              className="p-2 rounded-full hover:bg-neutral-300 transition-all"
              aria-label="Clear search input"
            >
              <Papicons name="cross" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type CopyModeTypes = 'svg' | 'jsx' | 'name' | 'react';

const copyModes = [
  { value: 'svg', label: 'SVG', icon: 'code' },
  { value: 'jsx', label: 'JSX', icon: 'code' },
  { value: 'name', label: 'Icon name', icon: 'pen' },
  { value: 'react', label: 'React', icon: 'grid' }
];

const CopyModeSelector = ({
  mode,
  onChange,
}: {
  mode: CopyModeTypes;
  onChange: (mode: CopyModeTypes) => void;
}) => {
  return (
    <div className="w-100 flex items-center gap-4 bg-[#e1e4ee] rounded-full transition-all mb-6 md:mb-0 px-5">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          className="w-6 opacity-60"
          key={mode}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
        >
          <Papicons
            name={copyModes.find((m) => m.value === mode)?.icon || 'code'}
            className="opacity-60"
            size={28}
          />
        </motion.div>
      </AnimatePresence>

      <select
        value={mode}
        onChange={(e) =>
          onChange(
            e.target.value as 'svg' | 'jsx' | 'name' | 'react' | 'react-native'
          )
        }
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
};

const IconList = ({
  icons,
  copyMode,
}: {
  icons: Icon[];
  copyMode: CopyModeTypes;
}) => {
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
};

const IconItem = ({
  icon,
  copyMode,
}: {
  icon: Icon;
  copyMode: CopyModeTypes;
}) => {
  const copyIcon = useMemo(() => {
    switch (copyMode) {
      case 'svg':
        return icon.svg;
      case 'jsx':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">${icon.svg
          .replace(/<\?xml.*?\?>/, '')
          .replace(/<!DOCTYPE.*?>/, '')
          .replace(/<svg[^>]*>/, '')
          .replace(/<\/svg>/, '')}</svg>`;
      case 'name':
        return icon.name;
      case 'react':
        return `<Papicons name="${formatHyphenatedName(icon.name)}" />`;
      default:
        return icon.svg;
    }
  }, [icon, copyMode]);

  const handleCopy = async () => {
    toast.promise(navigator.clipboard.writeText(copyIcon), {
      loading: `Copying ${copyMode === 'svg' ? 'SVG' : copyMode === 'jsx' ? 'JSX' : copyMode === 'name' ? 'Name' : copyMode === 'react' ? 'React' : 'React Native'} to clipboard...`,
      success: `${copyMode === 'svg' ? 'SVG' : copyMode === 'jsx' ? 'JSX' : copyMode === 'name' ? icon.name : copyMode === 'react' ? 'React' : 'React Native'} copied to clipboard!`,
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
        aria-label={`Copy ${icon.name} ${copyMode === 'svg' ? 'SVG' : copyMode === 'jsx' ? 'JSX' : copyMode === 'name' ? 'Name' : copyMode === 'react' ? 'React' : 'React Native'}`}
      >
        <IconRenderer name={icon.name} />
        <span className="pointer-events-none absolute -top-2 left-1/2 z-100 w-max -translate-x-1/2  whitespace-nowrap rounded-full bg-neutral-900 px-2 py-1 text-sm font-medium leading-none text-white opacity-0 transition-all group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:delay-50 duration-200 scale-80 group-hover:scale-100 -translate-y-4 group-hover:-translate-y-full">
          {icon.name}
        </span>
      </button>
    </motion.div>
  );
};

const IconRenderer = ({ name }: { name: string }) => {
  return (
    <div className="aspect-square opacity-70 group-hover:opacity-100 transition-all">
      <Papicons color="#071833" size={32} name={formatHyphenatedName(name)} />
    </div>
  );
};

export default App;
