//@ts-check

'use strict';

// OpenSSL 3 no longer supports the insecure md4 hash, but webpack < 6
// hardcodes it. Work around by substituting a supported algorithm.
// https://github.com/webpack/webpack/issues/13572
// https://github.com/webpack/webpack/issues/14532
const crypto = require("crypto");
const crypto_orig_createHash = crypto.createHash;
crypto.createHash = (algorithm) => crypto_orig_createHash(algorithm == "md4" ? "sha256" : algorithm);

const path = require('path');

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const extensionConfig = {
  target: 'node', // VS Code extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
	mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')

  entry: './src/extension.ts', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
  output: {
    // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: path.resolve(__dirname, 'dist'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]'
  },
  externals: {
    vscode: 'commonjs vscode',
    keytar: "commonjs keytar",
    "cpu-features": "commonjs cpu-features",
  },
  resolve: {
    // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    extensions: ['.ts', '.js']
  },
  stats: {
    // Ignore warnings
    warnings: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.js/,
        include: /wontache/, // https://gitlab.com/jgonggrijp/wontache/-/issues/68
        type: 'javascript/auto'
    },
    {
        test: /\.node$/,
        loader: 'node-loader'
    }
    ]
  },
  devtool: 'source-map',
  infrastructureLogging: {
    level: "log", // enables logging required for problem matchers
  },
};
module.exports = [ extensionConfig ];