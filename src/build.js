const webpack = require("webpack");
const getModuleData = require("./utils/module-package");

module.exports = ({ prod }) => {
  process.env.NODE_ENV = prod ? "production" : "development";
  process.env.ENTRY = getModuleData().entryPoint; // TODO: This does not work
  let config = require("@popit/webpack-config");
  config = { ...config, entry: getModuleData().entryPoint };

  console.log("Running webpack...");
  webpack(config, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(
      stats.toString({
        chunks: false,
        colors: true,
      })
    );
  });
};
