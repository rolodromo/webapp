const { IgnorePlugin } = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
  crossorigin: 'anonymous',
  integrity: true,
  pwa: {
    name: 'Rolodromo',
    themeColor: '#524671',
    msTileColor: '#7f7c8a',
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
    devtool: process.env.NODE_ENV !== 'production' ? 'nosources-source-map' : 'source-map'
  }
}
