import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    env: {
      browser: true, // 浏览器中运行（Electron的渲染进程）
      es6: true, // ECMAScript 6
      node: true, // Node.js环境中运行（Electron的主进程）
    },
    globals: {
      process: "readonly", // Node.js的全局变量
    },
    extends: ["eslint:recommended", "prettier"],
  },
];
