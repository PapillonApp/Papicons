<p align="center">
  <img src=".github/assets/logotype.svg" alt="Papicons" width="400">
</p>
<p align="center">
Papicons is a collection of icons designed by Tom Things for Papillon.
</p>
<br/>

## Installation

```bash
npm install @getpapillon/papicons
```

or

```bash
yarn add @getpapillon/papicons
```

## Usage

### React Native

```tsx
import React from 'react';
import { View } from 'react-native';
import { Butterfly } from '@getpapillon/papicons';

const App = () => {
  return (
    <View>
      <Butterfly size={50} color="#0042DC" />
    </View>
  );
};

export default App;
```

### React (Web)

```tsx
import React from 'react';
import { Butterfly } from '@getpapillon/papicons';

const App = () => {
  return <Butterfly size={50} color="#0042DC" />;
};

export default App;
```

## Contributing

You can add your own icons to the Papicons collection by following these steps:

1. **Create a new SVG icon :** You can join the [Figma community](https://www.figma.com/community/file/1543947677978703963) to create your own icons with the grids and rules provided.
2. **Export the SVG icon :** Once you have created your icon, export it as an SVG file.
3. **Clean the SVG file :** Remove fill on paths and groups, remove unnecessary attributes, and ensure the SVG is optimized for both React Native and React.
4. **Add the icon to the package :** Place the cleaned SVG file in the `icons` directory.
5. **Run the build script :**
```bash
npm run build
```
6. **Your icons will be automatically added to the package.**

## License

This repository, including the icons and the website, is licensed under the [MIT License](./LICENSE).
