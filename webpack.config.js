const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const NodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const HandlebarsPlugin = require("handlebars-webpack-plugin");

module.exports = {
  entry:['@babel/polyfill', './src/app.ts'],
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname,'dist')
  },
  externals:[NodeExternals()],
  resolve:{
    fallback: {
      "path": require.resolve("path-browserify")
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules:[
      {
        test: /\.ts?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.scss?$/,
        loader: 'sass-loader'
      },
      {
        test: /\.css?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new NodemonPlugin({
      script: './dist/build.js',
      watch: path.resolve('./dist'),
    }),
    new Dotenv(),
    new NodePolyfillPlugin(),
    
    new HtmlPlugin({
      template: './src/views/layout.hbs',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new HandlebarsPlugin({
 
      htmlWebpackPlugin: {
        enabled: true, // register all partials from html-webpack-plugin, defaults to `false`
        prefix: "html", // where to look for htmlWebpackPlugin output. default is "html"
        HtmlPlugin // optionally: pass in HtmlWebpackPlugin if it cannot be resolved
      },
   
      entry: path.join(process.cwd(), "src", "views", "*.hbs"),
      output: path.join(process.cwd(), "dist", "index.html"),
   
      partials: [
        path.join(process.cwd(), "html",/* <-- this should match htmlWebpackPlugin.prefix */ "*", "*.hbs"),
        path.join(process.cwd(), "src", "views", "*", "*.hbs")
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/app.bundle.css'
    })
  ]
}