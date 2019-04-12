const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  icon: {
    // Icon options
    sizes: [16, 120]
  },
  head: {
    title: '雪人的最新日志',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/icon.png' },
      { rel: 'manifest', href: '/manifest.json' }
    ]
  },
  render: {
    resourceHints: false
  },
  server: {
    host: '127.0.0.1'
  },
  router: {
    scrollBehavior: (to, from, savedPosition) => {
      return { x: 0, y: 0 }
    }
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
    '@nuxtjs/axios'
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
    postcss: {
      preset: {
        autoprefixer: {
          browsers: ['ie >= 10', '> 8%']
        }
      }
    },
    loaders: {
      less: {}
    },
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
        urlLoader.use = [
          {
            loader: 'url-loader',
            options: { limit: 30480 }
          }
        ]
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
