const { app, BrowserWindow, ipcMain, MessageChannelMain } = require("electron");
const path = require("node:path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");

  const { port1, port2 } = new MessageChannelMain();

  // 允许在另一端还没有注册监听器的情况下就通过通道向其发送消息 消息将排队等待，直到有一个监听器注册为止。
  port2.postMessage({ test: 21 });

  // 我们也可以接收来自渲染器主进程的消息。
  port2.on("message", (event) => {
    console.log("from renderer main world:", event.data);
  });
  port2.start();

  // 预加载脚本将接收此 IPC 消息并将端口
  // 传输到主进程。
  win.webContents.postMessage("main-world-port", null, [port1]);
};

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");
  createWindow();
});
