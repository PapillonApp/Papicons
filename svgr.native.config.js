module.exports = {
  template: require('./dist/scripts/exportTemplate.native'),
  typescript: true,
  native: true,
  jsxRuntime: 'classic',
  outDir: './src/icons-native',
  dimensions: true,
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false
          },
        },
      },
      'removeDimensions',
      {
        name: 'removeAttrs',
        params: {
          attrs: '(fill|stroke)',
        },
      },
      {
        name: 'removeXMLNS',
        params: {
          xmlns: true,
        },
      },
    ],
  },
};
