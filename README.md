# Electron Basic Template

一个基于 Electron 的基础模板，集成了 ESLint、Prettier 等开发工具。

## 本地开发

### 安装依赖

```bash
npm install
```

### 运行

```bash
npm start
```

### 打包

```bash
npm run make
```

## 发布到 Github

```bash
# 安装发布插件
npm install --save-dev @electron-forge/publisher-github
```

设置 Github Token 到环境变量 `GITHUB_TOKEN` 中。

- MacOS: `export GITHUB_TOKEN=your_token`
- Windows: `set GITHUB_TOKEN=your_token`

```bash
# 发布到 Github
npm run publish
```

## License

MIT [LICENSE](LICENSE)
