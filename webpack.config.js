const path        = require('path'),
      fs          = require('fs'),
      resolve     = dir => path.join(__dirname, '.', dir);

const isProduction = process.env.NODE_ENV === 'production';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let name      = 'webpack-sample',
    library   = name.replace(/(-\w)/, m => m.replace('-', '').toUpperCase()),
    plugins   = [],
    externals = [],
    mode      = 'development',
    devtool   = 'inline-source-map';

if (isProduction) {
  mode = 'production';
  devtool = 'source-map';
  name += `.min`;
  //compress js in production environment
  plugins.push(
    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        compress: {
          warnings: false
        },
        mangle: true
      },
      sourceMap: true
    })
  );
  externals = [
    'lodash',
  ];
}

if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  mode,
  devtool,
  entry: './index.js',
  output: {
    filename: `${name}.js`,
    path: resolve('dist'),
    publicPath: '/static/js/',
    library: `${library}`,
    libraryTarget: 'umd',
    libraryExport: 'default', // 兼容 ES6(ES2015) 的模块系统、CommonJS 和 AMD 模块规范
    globalObject: 'this' // 兼容node和浏览器运行，避免window is not undefined情况
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('lib'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      }
    ]
  },
  externals,
  devServer: {
    proxy: {
      "*": `http://127.0.0.1:8081`,
    }
  }
}
