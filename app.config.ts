import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "Fellow",
  slug: "Fellow-v2",
  version: "0.0.1",
  orientation: "portrait",
  icon: "./assets/images/Main-Logo.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/images/Landing-Logo.png",
    resizeMode: "contain",
    backgroundColor: "#000000",
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/1bf98d7a-1330-4e8e-9b15-6e6fe60e0dba",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.osiobomighie.Fellowv2",
    buildNumber: "2.0.0",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/Landing-Logo.png",
      backgroundColor: "#000000",
    },
    package: "com.osiobomighie.Fellowv2",
    versionCode: 2,
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "1bf98d7a-1330-4e8e-9b15-6e6fe60e0dba",
    },
  },
  plugins: [
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
        },
      },
    ],
  ],
  runtimeVersion: {
    policy: "sdkVersion",
  },
});

export default defineConfig;
