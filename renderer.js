const information = document.getElementById('info');
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`;

const func = async () => {
  const response = await window.versions.ping();
  console.log(response); // 打印 'pong'
};

func();

window.onmessage = event => {
  // event.source === window 意味着消息来自预加载脚本
  // 而不是来自iframe或其他来源
  if (event.source === window && event.data === 'main-world-port') {
    const [port] = event.ports;
    // 一旦我们有了这个端口，我们就可以直接与主进程通信
    port.onmessage = event => {
      console.log('from main process:', event.data);
      port.postMessage(event.data.test * 2);
    };
  }
};
