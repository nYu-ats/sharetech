const path = require("path");

module.exports = {
  stories: [
    path.resolve(__dirname, "../src/**/*.stories.mdx"),
    path.resolve(__dirname, "../src/**/*.stories.@(js|jsx|ts|tsx)"),
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-controls",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
    "storybook-addon-next",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
};
