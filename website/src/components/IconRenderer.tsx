import { Papicons } from '@getpapillon/papicons';
import { formatHyphenatedName } from '../utils/iconName';

type IconRendererProps = {
  name: string;
};

export default function IconRenderer({ name }: IconRendererProps) {
  return (
    <div className="aspect-square opacity-70 group-hover:opacity-100 transition-all">
      <Papicons color="var(--icon-color)" size={32} name={formatHyphenatedName(name)} />
    </div>
  );
}
