const { contextBridge } = require("electron");

// 通过contextBridge.exposeInMainWorld()方法，将主进程中的函数暴露给渲染进程
contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // 除函数之外，我们也可以暴露变量
});
