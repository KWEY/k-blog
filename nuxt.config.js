// const cssnano = require('cssnano')
// const autoprefixer = require('autoprefixer')
const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    // 'element-ui/lib/theme-chalk/index.css',
    '@/assets/less/main.less'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  // plugins: ['@/plugins/element-ui'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    // transpile: [/^element-ui/],
    // extractCSS: { allChunks: true },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev) {
        config.devtool = 'cheap-module-source-map'
      } else {
        config.devtool = ''
      }
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      const urlLoader = config.module.rules.find(rule => rule.test.toString().match('gif'))
      if (urlLoader) {
        urlLoader.test = new RegExp(/\.(png|jpe?g|gif)$/)
      }
      const lessLoader = config.module.rules.find(rule => rule.test.toString().match('less'))
      if (lessLoader) {
        // lessLoader.use = [
        //   {
        //     loader: 'css-loader',
        //     options: { minimize: true }
        //   },
        //   {
        //     loader: 'postcss-loader',
        //     options: {
        //       ident: 'postcss',
        //       sourceMap: false,
        //       plugins: [autoprefixer, cssnano]
        //     }
        //   },
        //   {
        //     loader: 'less-loader'
        //   }
        // ]
      }
      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: [
              {
                removeDimensions: true
              },
              {
                removeViewBox: false
              }
            ]
          }
        }
      })
    }
  }
}
