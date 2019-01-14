const HWPP = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const htmlPlugin = new HWPP({template: "./src/index.html", filename: "./index.html", inject: false});
//We will use this to analyse the bundle
const BundleAn = new BundleAnalyzerPlugin({generateStatsFile: true, statsFilename: 'BundleStats', analyzerPort: 8081});

module.exports = {
  entry: ['babel-polyfill', './src/App.js'],
  module: {
    rules: [
      {
        test: /\js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }]
      },
      {
        test: /\.(png|svg)$/, 
        exclude: /node_modules/,
        loader: 'file-loader?name=images/[name].[ext]'
      },
      {
        test: /\.(jpeg|jpg)$/, 
        exclude: /node_modules/,
        loader: 'url-loader?limit=1024&name=images/[name].[ext]'
      },
      {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: 'file-loader?name=public/fonts/[name].[ext]'
      }
    ]
  },
  plugins: [htmlPlugin],
  devServer: {
    // host: '192.168.1.13' | 'localhost',
    proxy: {
      '/':'http://localhost:8888'
    }
  }
};
