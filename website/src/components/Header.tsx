import PapiconsLogotype from '../icons/PapiconsLogotype';
import PapiconsPackageJSON from '../../../package.json';

const links = [
  { href: 'https://papillon.bzh', label: 'The Papillon Project' },
  { href: 'https://docs.papillon.bzh/papicons', label: 'Docs' },
  { href: 'https://github.com/PapillonApp/Papicons', label: 'GitHub' },
];

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8 md:gap-12 self-start w-full">
      <div className="flex items-start gap-2">
        <PapiconsLogotype className="w-42" />
        <p className="text-sm opacity-50">v{PapiconsPackageJSON.version}</p>
        <p className="text-sm text-blue-700 font-bold -ml-1">beta</p>
      </div>

      <ul className="flex items-center md:justify-end gap-6 md:gap-8 text-lg text-neutral-700">
        {links.map((link) => (
          <li
            key={link.href}
            className="font-medium text-neutral-900 hover:text-blue-700"
          >
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
