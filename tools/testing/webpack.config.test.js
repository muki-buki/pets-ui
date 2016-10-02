const webpack = require('webpack');

const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const absolutePath = require('./../../utils').absolutePath;

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {

  entry: {},

  /**
   * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
   *
   * Do not change, leave as is or it wont work.
   * See: https://github.com/webpack/karma-webpack#source-maps
   */
  devtool: 'inline-source-map',

  /**
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {

    /**
     * An array of extensions that should be used to resolve modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ['.ts', '.js']

  },

  /**
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {

    /**
     * An array of applied pre and post loaders.
     *
     * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
     */
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        exclude: [absolutePath('node_modules')]
      },

      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
        exclude: [
          absolutePath('node_modules/@angular'),
          absolutePath('node_modules/rxjs')
        ]
      },

      /**
       * Typescript loader support for .ts and Angular 2 async routes via .async.ts
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader
       */
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader?sourceMap=false,inlineSourceMap=true,compilerOptions{}=removeComments:true',
          'angular2-template-loader'
        ],
        exclude: [/\.e2e\.ts$/]
      },

      /**
       * Json loader support for *.json files.
       *
       * See: https://github.com/webpack/json-loader
       */
      { test: /\.json$/, loader: 'json-loader', exclude: [absolutePath('src/index.html')] },

      /**
       * Raw loader support for *.css files
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'], exclude: [absolutePath('src/index.html')] },

      /**
       * Raw loader support for *.html
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      { test: /\.html$/, loader: 'raw-loader', exclude: [absolutePath('src/index.html')] },

      /**
       * Instruments JS files with Istanbul for subsequent code coverage reporting.
       * Instrument only testing sources.
       *
       * See: https://github.com/deepsweet/istanbul-instrumenter-loader
       */
      {
        test: /\.(js|ts)$/, loader: 'istanbul-instrumenter-loader',
        enforce: 'post',
        include: absolutePath('src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ]
  },

  /**
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      absolutePath('./src')
    ),
    /**
     * Plugin: DefinePlugin
     * Description: Define free variables.
     * Useful for having development builds with debug logging or adding global constants.
     *
     * Environment helpers
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
     */
    // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
    new DefinePlugin({
      ENV: JSON.stringify('test'),
      PORT: 3000,
      HOST: JSON.stringify('localhost')
    }),
    new NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: false,
          failOnHint: false,
          resourcePath: absolutePath('./src')
        }
      }
    })
  ],

  /**
   * Include polyfills or mocks for various node stuff
   * Description: Node configuration
   *
   * See: https://webpack.github.io/docs/configuration.html#node
   */
  node: {
    global: true,
    process: false,
    crypto: false,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
