//const { ipcRenderer } = require("electron");

const notifyBtn = document.getElementById("notifyBtn");
const price = document.querySelector("h1");
const targetPrice = document.getElementById("targetprice");


function getBTC() {

    axios.get("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD")
        .then(res => {
            const cryptos = res.data.USD;
            price.innerHTML = "$" + cryptos.toLocaleString('nl');
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
    const targetPriceVal = Number(arg);
    targetPrice.innerHTML = "$" + targetPriceVal.toLocaleString("nl");
})