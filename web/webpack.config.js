const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: 'http://localhost:8080/',
  },

  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.json'],
  },

  devServer: {
    port: 8080,
  },

  devtool: 'eval-source-map',

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    // new ModuleFederationPlugin({
    //   name: 'starter',
    //   filename: 'remoteEntry.js',
    //   remotes: {},
    //   exposes: {},
    //   shared: {
    //     ...deps,
    //     react: {
    //       singleton: true,
    //       eager: true,
    //       requiredVersion: deps.react,
    //     },
    //     'react-dom': {
    //       singleton: true,
    //       eager: true,
    //       requiredVersion: deps['react-dom'],
    //     },
    //     '@apollo/client': {
    //       singleton: true,
    //       eager: true,
    //       requiredVersion: deps['@apollo/client'],
    //     },
    //   },
    // }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};
