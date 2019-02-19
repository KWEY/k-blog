const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    app: './src/entry-client.js',
    vendor: [
      'vue',
      'vue-router',
      'vuex',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].js',
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public'),
    },
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false,
          // postcss: [
          //   require('autoprefixer')({
          //     browsers: ['last 3 versions'],
          //   }),
          // ],
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { minimize: true }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                sourceMap: false,
                plugins: [autoprefixer, cssnano],
              }
            },
            {
              loader: 'less-loader',
            },
          ],
          fallback: 'vue-style-loader'
        })
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: './img/[name].[ext]',
        },
      },
      {
        test: /\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: [{
              removeDimensions: true,
            }, {
              removeViewBox: false,
            }],
          },
        },
      },
    ],
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: 'warning',
  },
  plugins: [
    new VueLoaderPlugin(),
    new ExtractTextPlugin({
      filename: 'common.css'
    }),
    new FriendlyErrorsPlugin()
  ]
};
