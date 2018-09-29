const { IgnorePlugin } = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
  crossorigin: 'anonymous',
  integrity: true,
  pwa: {
    name: 'Rolodromo',
    themeColor: '#19253c',
    msTileColor: '#19253c',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/service-worker.js'
    }
  },

  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [new IgnorePlugin(/^\.\/locale$/, /moment$/), new LodashModuleReplacementPlugin()],
    devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : ''
  }
}
