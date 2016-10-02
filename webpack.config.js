require('ts-helpers');
let path = require('path');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [path.resolve(__dirname)].concat(args));
}

const {
  ContextReplacementPlugin,
  DefinePlugin,
  ProgressPlugin
} = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const {ForkCheckerPlugin} = require('awesome-typescript-loader');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const webpackMerge = require('webpack-merge');

let port = 3000;
console.log(`Starting dev server on port: ${port}`);

const CONSTANTS = {
  ENV: JSON.stringify('dev'),
  HOST: '0.0.0.0',
  PORT: port,
  STORE_DEV_TOOLS: JSON.stringify('monitor')
};

module.exports = webpackMerge({
  cache: true,
  devtool: 'eval',

  entry: {
    main: './src/main.browser'
  },

  output: {
    path: root('dist/client'),
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
      root('./src')
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
        exclude: [/\.d\.ts$/]
      },
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.html/, loader: 'raw-loader', exclude: [root('./src/index.html')]},
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
