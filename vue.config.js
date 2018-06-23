const { IgnorePlugin } = require('webpack')

module.exports = {
  pwa: {
    name: 'Rolodromo',
    themeColor: '#524671',
    msTileColor: '#7f7c8a'
  },

  lintOnSave: false,
  configureWebpack: {
    plugins: [new IgnorePlugin(/^\.\/locale$/, /moment$/)]
  }
}
