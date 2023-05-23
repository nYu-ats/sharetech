/** @type {import('next').NextConfig} */

// nextjsの仕様上、recoilのatomが再宣言されるため、そのエラー出力を抑止する
const withInterceptStdout = require("next-intercept-stdout");
module.exports = withInterceptStdout(
  {
    reactStrictMode: true,
    swcMinify: false,
    ignoreDuringBuilds: true,
    staticPageGenerationTimeout: 1000,
  },
  (text) => (text.includes("Duplicate atom key") ? "" : text)
);

const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

function loadEnv(appEnv = "local") {
  const env = {
    ...require(`./env/env.${appEnv}`),
    NEXT_PUBLIC_APP_ENV: appEnv,
  };
  Object.entries(env).forEach(([key, value]) => {
    process.env[key] = value;
  });
}

loadEnv(process.env.APP_ENV);
