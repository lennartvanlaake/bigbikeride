const common = [
	"--require-module dotenv/config",
	"--require-module ts-node/register",
	"--require steps.ts",
	"--require-module tsconfig-paths/register",
	"--format progress",
	"--publish-quiet",
	"features",
];

const profileDefault = [
	"--fail-fast",
];

// https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md
module.exports = {
	default: profileDefault.concat(common).join(" "),
};
