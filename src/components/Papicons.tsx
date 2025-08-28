import React from 'react';
import type { SvgProps } from 'react-native-svg';
import * as Icons from '../icons';
import type { PapiconsProps } from '../types/PapiconsProps';
import { IconNames } from '../icons';

function Papicons({ name, ...props }: {
  name: IconNames | string;
} & SvgProps & PapiconsProps): React.JSX.Element {

  if (name) {
    const IconComponent = Object.entries(Icons).find(
      ([key]) => key.toLowerCase() === name.toLowerCase()
    )?.[1] as React.ComponentType<SvgProps>;

    if (IconComponent) {
      return <IconComponent {...props} />;
    }
  }

  console.warn(`Papicons icon "${name}" does not exist.`);
  return <Icons.Placeholder {...props} />;
}

export default Papicons;
