const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'), // 定义输出路径
    filename: '[name].[contenthash].js',
  },
  plugins: [
    // new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist/*')], // 清理 dist 文件夹
    // }),
    new HtmlWebpackPlugin({
      template: './index.html', // 指定 HTML 模板
      title: 'x-spreadsheet', // 设置 HTML 标题
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css', // 提取 CSS 文件
    }),
  ],
  devtool: 'inline-source-map', // 开发环境下的 source map
  devServer: {
    host: 'localhost', // 开发服务器主机
    static: {
      directory: path.join(__dirname, '../dist'), // 替换 contentBase
    },
    compress: true, // 启用 gzip 压缩
    port: 9000, // 开发服务器端口
  },
});