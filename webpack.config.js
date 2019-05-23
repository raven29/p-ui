module.exports = () => ({
  entry: ['whatwg-fetch', __dirname + '/src/app/index.js'],
  output: {
    path: __dirname + '/build/',
    publicPath: '/',
    filename: 'assets/index.js',
  },

  devServer: {
    contentBase: __dirname + "/public/",
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:8181/",
    }
  },
  resolve: {
    alias: {
        libs: __dirname + '/src/libs',
        widgets: __dirname + '/src/widgets',
        api: __dirname + '/src/api',
        app: __dirname + '/src/app',
        services: __dirname + '/src/services',
        constants: __dirname + '/src/constants',
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        enforce: "pre",
      },
      {
        test: /\.css$/,
        include: [
          /node_modules/,
        ],
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.css$/,
        exclude: [
          /node_modules/,
        ],
        use: [
          { loader: "style-loader"},
          {
            loader: "css-loader",
            options: {
              modules: true,
              camelCase: "dashes",
              // importLoaders: 1,
              localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require('postcss-import')(),
                require('postcss-css-variables')(),
                require('autoprefixer')({
                  browsers: "last 2 versions, Firefox ESR"
                }),
              ]
            },
          },
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 800000, // Convert images < 8kb to base64 strings
            name:  __dirname + '/public/images/[name].[ext]'
          }
        }]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 65000,
          name: 'fonts/[name].[ext]',
        },
      }
    ],
  },
});
