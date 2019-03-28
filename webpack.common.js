const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './src/scripts/index.js',
  resolve: {
    alias: {
      'components': path.resolve(__dirname, 'src/scripts/components'),
      'containers': path.resolve(__dirname, 'src/scripts/containers'),
      'pages': path.resolve(__dirname, 'src/scripts/pages'),
      'utils': path.resolve(__dirname, 'src/scripts/utils'),
      'actions': path.resolve(__dirname, 'src/scripts/actions'),
      'images': path.resolve(__dirname, 'src/images'),
      'reducers': path.resolve(__dirname, 'src/scripts/reducers')
    }
  },
  output: {
    filename: 'main.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },{
        test: /\.html$/,
        use: [{
          loader: "html-loader"
        }]
      },{
        test: /\.(png|svg|jp(e*)g|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
            name: './assets/images/[name].[ext]'
          }
        }
      },{
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },{
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },{
            loader: "css-loader"
          },{
            loader: "sass-loader"
          }
        ]
      },{
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    })
  ]
}
