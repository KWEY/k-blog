const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const nodeExternals = require('webpack-node-externals');
const VueSSRPlugin = require('vue-ssr-webpack-plugin');

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
    target: 'node',
    entry: './src/entry-server.js',
    output: {
      filename: 'server-bundle.js',
      libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
      // do not externalize CSS files in case we need to import it from a dep
      whitelist: /\.css$/
    }),
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.VUE_ENV': '"server"'
      }),
      // 这是将服务器的整个输出
      // 构建为单个 JSON 文件的插件。
      // 默认文件名为 `vue-ssr-server-bundle.json`
      new VueSSRPlugin()
    ]
  });

  return config;
};
