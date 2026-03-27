import { useMemo, useState } from 'react';
import './style.css';

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

function App() {
  const [query, setQuery] = useState('');

  const filteredIcons = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase().replace(/\s+/g, '-');

    if (!normalizedQuery) {
      return icons;
    }

    return icons.filter((icon) =>
      icon.name.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  return (
    <main className="flex justify-center bg-neutral-100 min-h-screen">
      <div className="w-full max-w-5xl m-16 gap-6 flex flex-col">
        <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} />

        <IconList icons={filteredIcons} />
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
    <div className="flex items-center gap-2 bg-neutral-200 rounded-full transition-all">
      <input
        type="search"
        placeholder="Search icons"
        value={value}
        onChange={onChange}
        className="w-full px-7 h-15 text-xl bg-transparent focus:outline-none font-medium"
      />
    </div>
  );
};

const IconList = ({ icons }: { icons: Icon[] }) => {
  return (
    <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(72px,1fr))]">
      {icons.map((icon) => (
        <IconItem key={icon.name} icon={icon} />
      ))}
    </div>
  );
};

const IconItem = ({ icon }: { icon: Icon }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(icon.svg);
    } catch {
      return;
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="icon-button group aspect-square flex items-center justify-center rounded-2xl bg-white hover:shadow-lg transition-all cursor-pointer hover:scale-110 border border-neutral-100 hover:border-neutral-400 active:shadow-md active:scale-100"
      aria-label={`Copy ${icon.name} SVG`}
      title={`Copy ${icon.name} SVG`}
    >
      <IconRenderer src={icon.src} />
    </button>
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
