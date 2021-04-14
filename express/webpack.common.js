const path = require('path');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.resolve(__dirname, `./server.ts`),
  output: {
    path: path.resolve(__dirname, `dist`),
    filename: `server.js`
  },
  target: `node`,
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        loader: `babel-loader`,
        options: {
          presets: [`@babel/preset-env`, `@babel/preset-typescript`]
        }
      }
    ]
  },
  plugins: [new Dotenv()],
  resolve: {
    extensions: [`.js`, `.ts`, `.jsx`, `.tsx`]
  }
};
