const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = {
  target: 'node',
  entry: ['webpack/hot/poll?100', './src/server/index.ts'], // make sure this matches the main root of your code 
  output: {
    path: path.join(__dirname, 'out/bundle/server'), // this can be any path and directory you want
    filename: 'server.js',
  },
  optimization: {
    minimize: false, // enabling this reduces file size and readability
  },
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  resolve: {
    alias: {
      // add as many aliases as you like! 
      "@server": path.resolve(__dirname, 'src/server') 
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new RunScriptWebpackPlugin({ name: 'server.js' }),
  ],
  devtool: 'source-map'
};
