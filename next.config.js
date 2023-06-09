/** @type {import('next').NextConfig} */
const nextBuildId = require("next-build-id");
const nextConfig = {
  // target: "serverless",
  experimental: {
    images: {
      allowFutureImage: true,
      unoptimized: true,
    },
    // optimizeCss: true,
    runtime: "experimental-edge",
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    return config;
  },
  images: {
    domains: [
      "jump-baseapi.guardiannft.org",
      "cdn.guardianlink.io",
      "mpcdn.guardiannft.org",
      "mclgameadmin.guardiannft.org",
      "blog.jump.trade",
      "www.guardianlink.io",
      "cdn.jump.trade",
      "baseapi.jump.trade",
      "www.facebook.com",
      "www.google.com",
      "mcladmin.guardiangames.trade",
      "www.pexels.com",
    ],
  },
  generateBuildId: () => nextBuildId({ dir: __dirname }),
};

module.exports = nextConfig;
