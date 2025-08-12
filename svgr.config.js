module.exports = {
  template: require('./dist/scripts/exportTemplate'),
  typescript: true,
  native: true,
  jsxRuntime: 'classic',
  outDir: './src/icons',
  dimensions: true,
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
            removeDimensions: true,
          },
        },
      },
      {
        name: 'removeAttrs',
        params: {
          attrs: '(fill|stroke)',
        },
      },
    ],
  }
};
