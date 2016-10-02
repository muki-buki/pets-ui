require('ts-helpers');
const absolutePath = require('./utils').absolutePath

const {
  ContextReplacementPlugin,
  DefinePlugin,
  ProgressPlugin
} = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const {ForkCheckerPlugin} = require('awesome-typescript-loader');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const webpackMerge = require('webpack-merge');
const config = require('config');

const port = config.get('app.port');
console.log(`Starting dev server on port: ${port}\n`);

const outDir = config.get('build.dir');

const CONSTANTS = {
  ENV: JSON.stringify('dev'),
  HOST: '0.0.0.0',
  PORT: port
};

module.exports = webpackMerge({
  cache: true,
  devtool: 'eval',

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
    ])
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
});
