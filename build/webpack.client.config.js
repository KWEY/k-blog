const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const HTMLPlugin = require('html-webpack-plugin');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


const config = merge(base, {
  optimization: {
    // 抽取公共的dm
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
    minimizer: [],
  },
  plugins: [
    // 全局变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': 'client',
    }),
    // 提取公共库
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor'
    // }),
    // html模板
    new HTMLPlugin({
      template: 'src/index.html',
    }),
  ],
});

if (process.env.NODE_ENV === 'production') {
  config.mode = 'production';
  config.plugins.push(
    // 用于使用service worker来缓存外部项目依赖项。
    new SWPrecachePlugin({
      cacheId: 'vue-hn',
      filename: 'service-worker.js',
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/],
    }),
  );
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
    // 生产环境下 - 压缩js
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
  );
}

module.exports = config;
