const common = [
    "--require-module dotenv/config",
    "--require-module ts-node/register",
    "--require backend/steps.ts",
    "--require-module tsconfig-paths/register",
    "--format progress", 
    "--publish-quiet",
    "backend/features"
  ];
  
  const profileDefault = [
    "--fail-fast",
    // "--parallel 20",
    // `--tags "@smoke and @fast"`,
  ];
  
  // https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md
  module.exports = {
    default: profileDefault.concat(common).join(" "),
  };
  