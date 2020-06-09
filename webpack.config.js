const path = require("path");

module.exports = {
  mode: "none",
  entry: "./src/lib.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "transaction_maker_lib.js",
    library: "TransactionMaker",
    libraryTarget: "umd",
  },
  target: "node",
  externals: [
    "bignumber.js",
    "bottleneck",
    "consola",
    "csv-parser",
    "esm",
    "ethers",
    "level",
    "lodash",
    "minimist",
    "node-cache",
    "strip-bom-stream",
    "fs",
    "path",
  ],
};
