const path = require('path');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');


module.exports = {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
          test: /\.less$/,
          use:[
              {
                  loader: 'style-loader',
                  options: {
                      attrs: {'data-injector': 'kwe-nav'},
                      singleton: true,
                  },
              },
              {
                  loader: 'css-loader',
                  options: {
                      sourceMap: false, // `sourceMap: true` option will cause some problems.
                      importLoaders: 2,
                      minimize: {
                          discardComments: {removeAll: true},
                      },
                  },
              },
              {
                  loader: 'postcss-loader',
                  options: {
                      ident: 'postcss',
                      sourceMap: false,
                      plugins: [autoprefixer, cssnano]
                  },
              },
              {
                  loader: 'less-loader',
                  options: {sourceMap: false},
              },
          ]
      },
      {
          test: /\.(png|jpg|gif|ttf|eot|woff)$/,
          use: [
              {
                  loader: 'url-loader',
                  options: {limit: 819200},
              },
          ],
      },
      {
          test: /\.svg$/,
          use:[
            "babel-loader",
            {
              loader: "react-svg-loader",
              options: {
                svgo: {
                  plugins: [
                    { removeTitle: false }
                  ],
                  floatPrecision: 2
                }
              }
            }
          ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
}