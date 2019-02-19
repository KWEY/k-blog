const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const HTMLPlugin = require('html-webpack-plugin');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = (env = {}) => {
  let mode = 'development';
  let devtool = 'cheap-module-source-map';
  if (env.pro) {
    mode = 'production';
    devtool = '';
  }
  const config = merge(base, {
    mode,
    devtool,
    optimization: {
      // 抽取公共的dm
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: 'vendor',
            chunks: 'initial',
            priority: 2,
            minChunks: 2,
          },
        },
      },
      minimizer: [],
    },
    plugins: [
      // 全局变量
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.VUE_ENV': '"client"',
      }),
      // html模板
      new HTMLPlugin({
        template: 'src/index.html',
      }),
    ],
  });
  if (env.pro) {
    config.plugins.push(
      new VueSSRClientPlugin()
    );
    config.plugins.push(
      // 用于使用service worker来缓存外部项目依赖项。
      new SWPrecachePlugin({
        cacheId: 'vue-hn',
        filename: 'service-worker.js',
        minify: true,
        dontCacheBustUrlsMatching: /./,
        staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/, /\.json$/],
        runtimeCaching: [
          {
            urlPattern: '/',
            handler: 'networkFirst'
          },
          {
            urlPattern: /\/(top|new|show|ask|jobs)/,
            handler: 'networkFirst'
          },
          {
            urlPattern: '/item/:id',
            handler: 'networkFirst'
          },
          {
            urlPattern: '/user/:id',
            handler: 'networkFirst'
          }
        ]
      })
    );
    // 生产环境下 - 压缩js
    config.optimization.minimizer.push(
      new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          },
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true,
          },
        },
      }),
    );
  }

  return config;
};
