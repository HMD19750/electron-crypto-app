//const { ipcRenderer } = require("electron");

const notifyBtn = document.getElementById("notifyBtn");
const price = document.querySelector("h1");
const targetPrice = document.getElementById("targetprice");
let targetPriceVal;

const notification = {
    title: "BTC alert",
    body: "BTC just beat your target price!",
    icon: path.join(app.dirname(), "assets/images/BTC.png")
};


function getBTC() {

    axios.get("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD")
        .then(res => {
            const cryptos = res.data.USD;
            price.innerHTML = "$" + cryptos.toLocaleString('nl');

            if (targetPrice.innerHTML != '' && targetPriceVal < cryptos) {
                const myNotification = new window.Notification(notification.title, notification);
            }
        })
        .catch(err => {
            console.log(err);
        })
}

//BtC koers wordt iedere 10 seconden opgehaald
getBTC();
setInterval(getBTC, 10000);

//notifyBtn.addEventListener("click", notify);
notifyBtn.addEventListener("click", () => {
    window.ipcRenderer.send("notifyBtnClicked");
});

ipcRenderer.on("targetPriceVal", function(event, arg) {
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = "$" + targetPriceVal.toLocaleString("nl");
})