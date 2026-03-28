import PapiconsLogotype from '../icons/PapiconsLogotype';
import PapiconsPackageJSON from '../../../package.json';
import { Papicons } from '@getpapillon/papicons';

const links = [
  { href: 'https://papillon.bzh', label: 'App' },
  { href: 'https://docs.papillon.bzh/papicons', label: 'Docs' },
  { href: 'https://github.com/PapillonApp/Papicons', label: 'GitHub' },
];

export default function Header({
  isDarkMode,
  onToggleDarkMode,
}: {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8 md:gap-12 self-start w-full">
      <div className="flex items-start gap-2">
        <PapiconsLogotype className="w-42" />
        <p className="text-sm opacity-50">v{PapiconsPackageJSON.version}</p>
        <p className="text-sm text-blue-700 font-bold -ml-1">beta</p>
      </div>

      <ul className="flex items-center md:justify-end gap-6 md:gap-8 text-lg text-neutral-700 dark:text-neutral-300">
        {links.map((link) => (
          <li
            key={link.href}
            className="font-medium text-neutral-900 dark:text-neutral-100 hover:text-blue-700 dark:hover:text-blue-300"
          >
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
        <li
          onClick={() => onToggleDarkMode()}
          className="cursor-pointer text-neutral-900 dark:text-neutral-100 hover:text-blue-700 dark:hover:text-blue-300"
        >
          <Papicons name={isDarkMode ? 'sun' : 'moon'} size={24} />
        </li>
      </ul>
    </div>
  );
}
