var webpack = require('webpack')
var Path = require('path');
module.exports={
  devtool: 'source-map', // 开发调试
  entry:[
      "./src/enterRisk/index.js"   //   "../src/自己开发的模块名/index.js"
  ],
  output: {
      path:Path.resolve(__dirname,"/dev/js"),
      publicPath:"/dev/js",
      filename: 'bundle.js'
  },
  devServer: {
      inline: true,
      port: 8090,    // 端口号自己可以修改
      hot: true,
  },
  module: {
      loaders: [
          {
              test: /\.(jsx|js)?$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
          },
          {
              test: /\.(css|less)$/,
              loader: "style-loader!css-loader"
          },
          {
              test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
              loader: 'url-loader?limit=1000000&name=[name]-[hash].[ext]'
          }
      ]
  },
  plugins:[
      new webpack.HotModuleReplacementPlugin() //热加载插件
  ]
}
