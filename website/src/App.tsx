import { useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './style.css';
import CopyModeSelector from './components/CopyModeSelector';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import IconList from './components/IconList';
import SearchInput from './components/SearchInput';
import { icons } from './data/icons';
import type { CopyMode } from './types';
import { normalizeForSearch, tokenizeForSearch } from './utils/search';

export default function App() {
  const [query, setQuery] = useState('');
  const [copyMode, setCopyMode] = useState<CopyMode>('svg');

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
        <Header />
        <Hero />

        <div className="min-h-screen gap-4 flex flex-col">
          <div className="flex items-center gap-4">
            <SearchInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onClear={() => setQuery('')}
              numberOfIcons={icons.length}
            />
            <CopyModeSelector mode={copyMode} onChange={setCopyMode} />
          </div>

          <IconList icons={filteredIcons} copyMode={copyMode} />
        </div>

        <Footer />

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
