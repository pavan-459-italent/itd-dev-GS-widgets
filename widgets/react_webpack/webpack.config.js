const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (_, { mode } = {}) => {
  const isProd = mode === "production";
  return {
    entry: isProd ? "./src/main.tsx" : "./src/dev.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "widget.js",
      clean: true,
      ...(isProd && { library: { type: "module" } }),
    },
    ...(isProd && { experiments: { outputModule: true } }),
    resolve: { extensions: [".tsx", ".ts", ".js"] },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
      ],
    },
    plugins: isProd ? [] : [new HtmlWebpackPlugin({ template: "./index.html" })],
    externals: isProd
      ? { react: "react", "react-dom": "react-dom" }
      : {},
    devServer: {
      port: 3001,
      open: false,
    },
  };
};
