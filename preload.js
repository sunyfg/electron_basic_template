const { contextBridge, ipcRenderer } = require("electron");

// 通过contextBridge.exposeInMainWorld()方法，将主进程中的函数暴露给渲染进程
contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
  // 除函数之外，我们也可以暴露变量
});

// 在发送端口之前，我们需要等待主窗口准备好接收消息 我们在预加载时创建此 promise ，以此保证
// 在触发 load 事件之前注册 onload 侦听器。
const windowLoaded = new Promise((resolve) => {
  window.onload = resolve;
});

ipcRenderer.on("main-world-port", async (event) => {
  await windowLoaded;
  // 我们使用 window.postMessage 将端口
  // 发送到主进程
  window.postMessage("main-world-port", "*", event.ports);
});
