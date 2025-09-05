// react-native.config.js
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  dependencies: {
    "react-native-vector-icons": {
      platforms: {
        ios: null,
      },
    },
    'react-native-sqlite-storage': {
      platforms: {
        android: null,
        ios: null,
      },
    },
  },
  assets: ["./src/asset"],
  getTransformModulePath() {
    return require.resolve("react-native-typescript-transformer");
  },
  getSourceExts() {
    return ["ts", "tsx"];
  },
};