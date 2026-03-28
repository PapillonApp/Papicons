import { useEffect, useMemo, useState } from 'react';
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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    const storedTheme = window.localStorage.getItem('papicons-theme');
    if (storedTheme === 'dark') {
      return true;
    }
    if (storedTheme === 'light') {
      return false;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDarkMode);
    window.localStorage.setItem(
      'papicons-theme',
      isDarkMode ? 'dark' : 'light'
    );
  }, [isDarkMode]);

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
    <main className="flex justify-center bg-[#f0f2f9] dark:bg-[#0d1220] text-[#071833] dark:text-[#e7ebff] min-h-screen transition-colors">
      <div className="w-full max-w-5xl m-8 md:m-16 gap-2 md:gap-6 flex flex-col">
        <Header
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode((value) => !value)}
        />
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
