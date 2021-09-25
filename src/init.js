const init = (options) => {
  const dependencies = ["react", "react-dom", "typescript", "@popit/fire.app"];
  const devDependencies = [
    "@types/react",
    "@types/react-dom",
    "@babel/preset-react",
    "babel-preset-react-app",
  ];
  require("child_process").execSync(
    `npm install --save ${dependencies.join(" ")}`,
    {
      stdio: "inherit",
    }
  );

  require("child_process").execSync(
    `npm install --save-dev ${devDependencies.join(" ")}`,
    {
      stdio: "inherit",
    }
  );

  const path = require("path");
  const fs = require("fs");
  const packagepath = path.resolve("package.json");
  const package = require(packagepath);

  package.scripts = package.scripts || {};
  package.scripts.start = "popit-cli --server";

  console.log(package.scripts, { stdio: "inherit" });

  const tsConfigPath = path.resolve("tsconfig.json");

  if (!fs.existsSync(tsConfigPath)) {
    const tsConfig = {
      compilerOptions: {
        module: "commonjs",
        noImplicitAny: false,
        removeComments: true,
        preserveConstEnums: true,
        sourceMap: true,
        jsx: "react-jsxdev",
        esModuleInterop: true,
      },
    };
    fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 4));
  }

  fs.writeFileSync(packagepath, JSON.stringify(package, null, 4));
};

module.exports = init;
