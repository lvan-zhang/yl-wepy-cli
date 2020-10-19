const path = require('path')
const DefinePlugin = require('@wepy/plugin-define')
var prod = process.env.NODE_ENV === 'production'
// var pxtorpx = require('postcss-pxtorpx-pro')

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: !prod,
  static: ['static'],
  build: {
  },
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: prod
    },
    babel: {
      sourceMap: true,
      presets: [
        '@babel/preset-env'
      ],
      plugins: [
        '@wepy/babel-plugin-import-regenerator'
      ]
    }

  },
  plugins: [
    DefinePlugin({
      __BASE_URL__: (() => {
        switch (process.env.NODE_ENV) {
          case 'production':
            return JSON.stringify('https://mcp.cmvalue.com')
          case 'test':
            return JSON.stringify('https://mcptest.cmvalue.com')
          case 'develop':
            return JSON.stringify('http://192.168.3.4:9006')
        }
      })()
    })
  ],
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}
