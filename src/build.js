const webpack = require("webpack");
const getModuleData = require("./utils/module-package");

module.exports = ({ prod }) => {
  process.env.NODE_ENV = prod ? "production" : "development";
  process.env.ENTRY = getModuleData().entrypoint;
  const config = require("@popit/webpack-config");

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
