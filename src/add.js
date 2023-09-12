const closeBtn = document.getElementById("closeBtn");

//notifyBtn.addEventListener("click", notify);
closeBtn.addEventListener("click", () => {
    ipcRenderer.send("closeNotifyWindowBtnClicked");
});