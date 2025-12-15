import packageJson from "./package.json";

module.exports = {
  expo: {
    name: process.env.APP_NAME,
    slug: process.env.APP_SLUG,
    scheme: process.env.APP_SCHEME,
    version: packageJson.version,
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      useFrameworks: "static",
      supportsTablet: true,
      bundleIdentifier: process.env.BUNDLE_IDENTIFIER,
    },
    android: {
      package: process.env.BUNDLE_IDENTIFIER,
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};
