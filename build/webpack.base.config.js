const path = require('path');

module.exports = {
  mode: 'development',
  devtool: '#source-map',
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
          postcss: [
            require('autoprefixer')({
              browsers: ['last 3 versions'],
            }),
          ],
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
        loader: 'style-loader!css-loader!less-loader',
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.resolve(__dirname, './static/img/[name].[ext]'),
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
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
  },
};
