const path = require("path");
const glob = require("glob");

module.exports = {
  entry: glob.sync("./src/**/**.js").reduce((obj, el) => {
    const fileName = path.parse(el).name;
    obj[fileName] = el;
    return obj;
  }, {}),
  // devtool: "inline-source-map",
  output: {
    filename: "./[name]/[name].js",
    // filename: (pathData) => {
    //   return pathData.chunk.name === 'main' ? '[name].js' : '[name]/[name].js';
    // },
    path: path.resolve(__dirname, "./docs/"),
    library: ["[name]"],
    libraryTarget: "umd",
  },
  mode: "production",
  module: {
    rules: [],
  },
  resolve: {
    extensions: [".js"],
  },
  // target: ["web", "es5"],
};
