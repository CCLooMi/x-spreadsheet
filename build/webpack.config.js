const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = dir => path.join(__dirname, '..', dir);

module.exports = {
  entry: {
    xspreadsheet: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        },
        include: [resolve('src'), resolve('test')],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/resource', // 让 Webpack 处理图片资源
        generator: {
          filename: 'assets/[hash][ext]', // 统一输出到 assets 目录
        },
      },
      {
        test: /\.svg$/,
        type: 'asset/resource', // 让 SVG 作为静态资源输出，避免被转换成 JS 模块
        generator: {
          // filename: 'assets/[name].[hash][ext]', // 统一存放到 assets 目录
          filename: 'assets/[hash][ext]', // 统一存放到 assets 目录
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource', // 处理字体文件
        generator: {
          filename: 'fonts/[hash][ext]', // 统一存放到 fonts 目录
        },
      },
    ],
  },
};
