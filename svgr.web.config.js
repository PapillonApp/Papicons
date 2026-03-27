module.exports = {
  template: require('./dist/scripts/exportTemplate.web'),
  typescript: true,
  native: false,
  jsxRuntime: 'classic',
  outDir: './src/icons-web',
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
