const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
const IS_PRODUCTION = process.env.BUILD_TYPE === 'p'

// https://github.com/kangax/html-minifier#options-quick-reference
const htmlMinifierOptions = {
  removeComments: true,
  removeCommentsFromCDATA: true,
  collapseWhitespace: true,
  // vue-html-loader 默认设为了 true。设为 false 是为了让 html-minifier 不要在元素之间保留一个空格
  conservativeCollapse: false,
  removeAttributeQuotes: true,
  removeScriptTypeAttributes: true,
  removeStyleTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true
}

const config = {
  entry: {
    bg: './src/background-script/index.js',
    options: './src/options/index.js',
    ct: './src/content-script/index.js',
    popup: './src/popup/index.js'
  },
  output: {
    path: './dist',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, '../src')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.woff2$/,
        loader: 'file-loader',
        query: {
          // 内容脚本的 css 为了引用扩展里的字体文件，需要在文件前加上下面的前缀
          // @see https://developer.chrome.com/extensions/manifest/web_accessible_resources
          // @see https://developer.chrome.com/extensions/i18n#overview-predefined
          // @see http://webpack.github.io/docs/configuration.html#output-publicpath
          name: 'chrome-extension://__MSG_@@extension_id__/[name].[ext]'
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader!sass-loader?sourceMap')
      }
    ]
  },
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader'),
      scss: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader!sass-loader?sourceMap')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '',
      filename: 'popup.html',
      chunks: ['popup'],
      minify: IS_PRODUCTION ? htmlMinifierOptions : false
    }),
    new HtmlWebpackPlugin({
      title: '选项 - 划词翻译',
      filename: 'options.html',
      chunks: ['options'],
      minify: IS_PRODUCTION ? htmlMinifierOptions : false
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    }),
    new CopyWebpackPlugin([{ from: 'static' }]),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: IS_PRODUCTION ? '"production"' : '"development"'
      }
    })
  ],
  devtool: IS_PRODUCTION ? false : '#inline-source-map',
  watch: !IS_PRODUCTION
}

if (IS_PRODUCTION) {
  config.vue.html = htmlMinifierOptions
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  )
}

module.exports = config
