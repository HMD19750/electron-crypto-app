const { BrowserWindow } = require('electron');
const path = require('node:path')
console.log(BrowserWindow);

const notifyBtn = document.getElementById("notifyBtn");



function notify(event) {
    const modalPath = path.join("file//", __dirname, "add.html");

    const win = new BrowserWindow({
        width: 400,
        height: 200,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });

    win.on("close", () => { win = null });
    win.loadUrl(modalPath);
    win.show();
}





notifyBtn.addEventListener("click", notify);