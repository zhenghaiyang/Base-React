var webpack = require('webpack')
var Path = require('path');
const utils = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
module.exports={
  entry:{
    enterRisk:"./src/enterRisk/index.js"   //   "../src/自己开发的模块名/index.js"
  },
  output: {
      path:Path.resolve(__dirname,"./dist"),
    //  publicPath:"/static/js",
      filename: utils.assetsPath('/react/js/[name].bundle.js'),
  },
  module: {
      loaders: [
          {
              test: /\.(jsx|js)?$/,
              exclude: /(node_modules)/,
              loader: 'babel',
          },{
              test: /\.css$/,
              loader: ExtractTextPlugin.extract('style-loader','css-loader')
          },
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('/react/media/[name].[hash:7].[ext]')
            }
          },{
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('/react/img/[name].[hash:7].[ext]')
            }
          },{
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('/react/fonts/[name].[hash:7].[ext]')
            }
          }
      ]
  },
  plugins:[
    new ParallelUglifyPlugin({
       cacheDir: '.cache/',
       uglifyJS:{
         output: {
           comments: false, // 删除所有注释
           beautify: false
         },
         compress: {
           drop_console: true, // 删除console
           warnings: false
         }
       }
     }),
    new ExtractTextPlugin(utils.assetsPath('/react/css/[name].bundle.css')),
    new HtmlWebpackPlugin({
      title:"enterRisk",
      filename: 'enterRisk.html',    // 改成自己模块的名字
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
  ]
}
