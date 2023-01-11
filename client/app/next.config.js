/** @type {import('next').NextConfig} */
loadEnv(process.env.APP_ENV);

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
