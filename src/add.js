const closeBtn = document.getElementById("closeBtn");
const updateBtn = document.getElementById("updateBtn");

//notifyBtn.addEventListener("click", notify);
closeBtn.addEventListener("click", () => {
    ipcRenderer.send("closeNotifyWindowBtnClicked");
});


updateBtn.addEventListener("click", () => {
    ipcRenderer.send(
        "update-notify-value",
        document.getElementById("notifyVal").value

    );
    console.log("update-notify-value sent")
    ipcRenderer.send("closeNotifyWindowBtnClicked");
});