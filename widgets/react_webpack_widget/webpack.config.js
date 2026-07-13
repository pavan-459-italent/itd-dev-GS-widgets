const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.tsx',
  output: {
    filename: 'widget.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'module',
    },
    clean: true,
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public', to: '.' }],
    }),
  ],
  devServer: {
    port: 3001,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    devMiddleware: {
      writeToDisk: true,
    },
    hot: false,
    liveReload: false,
  },
};
