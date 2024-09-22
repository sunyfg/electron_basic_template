const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");

module.exports = {
  packagerConfig: {
    asar: true,
    // osxSign: {}, // macOS签名
    // // macOS公证
    // osxNotarize: {
    //   tool: "notarytool", // 公证工具，可以是xcrun或notarytool
    //   appleId: process.env.APPLE_ID, // 苹果开发者账号
    //   appleIdPassword: process.env.APPLE_PASSWORD, // 苹果开发者账号密码
    //   teamId: process.env.APPLE_TEAM_ID, // 苹果开发者账号团队ID
    // },
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        // 代码签名
        // certificateFile: "./cert.pfx", // 证书文件路径
        // certificatePassword: process.env.CERTIFICATE_PASSWORD, // 证书密码
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  // 发布者
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "sunyfg",
          name: "electron_basic_template",
        },
        prerelease: false, // 是否发布预览版
        draft: true, // 是否发布草稿
      },
    },
  ],
};
