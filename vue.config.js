const { IgnorePlugin } = require('webpack')

module.exports = {
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
  configureWebpack: {
    plugins: [new IgnorePlugin(/^\.\/locale$/, /moment$/)]
  }
}
