import { useMemo, useState } from 'react';
import './style.css';
import PapiconsLogotype from './icons/PapiconsLogotype';
import toast, { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'motion/react';

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
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <IconList icons={filteredIcons} />
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

        <Toaster />
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
    <div className="flex items-center gap-2 bg-[#e1e4ee] rounded-full transition-all mb-6 md:mb-0">
      <input
        type="search"
        placeholder="Search for an icon"
        value={value}
        onChange={onChange}
        className="w-full px-7 h-15 text-xl bg-transparent focus:outline-none font-medium"
      />
    </div>
  );
};

const IconList = ({ icons }: { icons: Icon[] }) => {
  return (
    <motion.div
      layout
      className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(72px,1fr))]"
    >
      <AnimatePresence mode="sync" initial={false}>
        {icons.map((icon) => (
          <IconItem key={icon.name} icon={icon} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

const IconItem = ({ icon }: { icon: Icon }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(icon.svg);
      toast.success('SVG copied to clipboard!');
    } catch {
      toast.error('Failed to copy SVG to clipboard.');
      return;
    }
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
        aria-label={`Copy ${icon.name} SVG`}
      >
        <IconRenderer src={icon.src} />
        <span className="pointer-events-none absolute -top-2 left-1/2 z-100 w-max -translate-x-1/2  whitespace-nowrap rounded-full bg-neutral-900 px-2 py-1 text-sm font-medium leading-none text-white opacity-0 transition-all group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:delay-50 duration-200 scale-80 group-hover:scale-100 -translate-y-4 group-hover:-translate-y-full">
          {icon.name}
        </span>
      </button>
    </motion.div>
  );
};

const IconRenderer = ({ src }: { src: string }) => {
  return (
    <img
      src={src}
      alt="icon"
      className="w-9 aspect-square opacity-70 group-hover:opacity-100 group-hover:w-10 transition-all group-active:w-9"
    />
  );
};

export default App;
