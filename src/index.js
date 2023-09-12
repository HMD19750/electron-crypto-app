//const path = require('node:path')

const notifyBtn = document.getElementById("notifyBtn");



//notifyBtn.addEventListener("click", notify);
notifyBtn.addEventListener("click", () => {
    window.ipcRenderer.send("notifyBtnClicked");
});