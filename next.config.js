const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  swcMinify: true,
  images: {
    minimumCacheTTL: 60,
    loader: "custom",
  },
  pwa: {
    dest: "public",
    runtimeCaching,
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
});
