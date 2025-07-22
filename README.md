<p style="text-align: center">
<img src=".github/assets/logotype.svg" alt="Papicons Logo" width="400">
</p>

## Papicons
Papicons is a collection of icons designed by Tom Things for Papillon.

## Installation

You can use Papicons in your React Native project by installing the package via npm or yarn:

```bash
npm install papicons
```

or

```bash
yarn add papicons
```

## Usage

To use Papicons in your React Native project, you can import the icons directly from the package. Here's an example of how to use an icon:

```javascript
import React from 'react';
import { View } from 'react-native';
import { Butterfly } from 'papicons';

const App = () => {
  return (
    <View>
      <Butterfly width={50} height={50} fill={"#0042DC"}/>
    </View>
  );
};

export default App;
```

## Contributing

You can add you own icons to the Papicons collection by following these steps:

1. **Create a new SVG icon :** You can join the [Figma community](https://www.figma.com/community/file/1234567890) to create your own icons with the grids and rules provided.
2. **Export the SVG icon :** Once you have created your icon, export it as an SVG file.
3. **Clean the SVG file :** Remove fill on paths and groups, remove unnecessary attributes, and ensure the SVG is optimized for React Native.
4. **Add the icon to the package :** Place the cleaned SVG file in the `icons` directory.
5. **Run the build script :** Run the build script to generate the React components from the SVG files. You can do this by running:
```bash
npm run icons:build
```
6. **Your icons will be automatically added to the package !**

## License

Not known yet. Considering this to privately owned by Papillon for now.

