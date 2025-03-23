module.exports = {
  globDirectory: "dist/",
  globPatterns: [
    "**/*.{html,js,css,png,svg,jpg,gif,json,ttf,woff,woff2}"
  ],
  swDest: "dist/service-worker.js",
  clientsClaim: true,
  skipWaiting: true
};