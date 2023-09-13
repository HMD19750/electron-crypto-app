const notifyBtn = document.getElementById("notifyBtn");
const price = document.querySelector("h1");
const targetPrice = document.getElementById("targetPrice");


function getBTC() {

    axios.get("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD")
        .then(res => {
            console.log(res.data.USD);
        })
        .catch(err => {
            console.log(err);
        })
}

getBTC();

//notifyBtn.addEventListener("click", notify);
notifyBtn.addEventListener("click", () => {
    window.ipcRenderer.send("notifyBtnClicked");
});