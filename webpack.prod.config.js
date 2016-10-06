require('ts-helpers');
const absolutePath = require('./utils').absolutePath;
const {
  ContextReplacementPlugin,
  DefinePlugin,
  ProgressPlugin,
  NoErrorsPlugin
} = require('webpack');

const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ForkCheckerPlugin } = require('awesome-typescript-loader');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const config = require('config');
const port = config.get('app.port');
const outDir = config.get('build.dir');

const CONSTANTS = {
  ENV: JSON.stringify('production'),
  HOST: JSON.stringify('0.0.0.0'),
  PORT: port
};

module.exports = {
  cache: true,
  devtool: 'source-map',

  entry: {
    main: './src/main.browser'
  },

  output: {
    path: absolutePath(outDir),
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: './src',
    port: port,
    historyApiFallback: true,
    host: '0.0.0.0'
  },

  plugins: [
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      absolutePath('./src')
    ),
    new ProgressPlugin(),
    new ForkCheckerPlugin(),
    new DefinePlugin(CONSTANTS),
    new NamedModulesPlugin(),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }, {
      from: 'src/index.html',
      to: ''
    }
    ]),
    new NoErrorsPlugin(),
    new UglifyJsPlugin({
      beautify: false,
      comments: false
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          'node_modules/@angular',
          'node_modules/rxjs'
        ]
      },
      {
        test: /\.ts$/,
        loaders: [
          '@angularclass/hmr-loader',
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader?loader=system&genDir=src/compiled/src/app&aot=false'
        ],
        exclude: [/\.(spec|e2e|d)\.ts$/]
      },
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.html/, loader: 'raw-loader', exclude: [absolutePath('./src/index.html')]},
      {test: /\.css$/, loader: 'raw-loader'}
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  node: {
    global: true,
    process: true,
    Buffer: false,
    crypto: true,
    module: false,
    clearImmediate: false,
    setImmediate: false,
    clearTimeout: true,
    setTimeout: true
  }
};
