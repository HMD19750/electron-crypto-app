// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron')
const path = require('node:path')

const isMac = process.platform === "darwin";
const isDev = process.env.NODE_ENV !== "production";
var mainWindow;

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: isDev ? 1300 : 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            sandbox: false
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('./src/index.html')

    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }


}





app.whenReady().then(() => {
    createWindow()

    //Implement menu
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    app.on('activate', () => {

        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        };
    })




})

//Menus
const menu = [{
    label: "Menu",
    submenu: [{
            label: "Adjust Notification Value"
        },
        {
            label: "CoinMarketCap",
            click: () => shell.openExternal("https://coinmarketcap.com")
        },
        {
            type: "separator"
        },
        {
            label: "Exit",
            click: () => app.quit()
        }
    ]
}];

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    };
});

//Afvangen button clicked to open small window
ipcMain.on("notifyBtnClicked", openNotifyWindow);

ipcMain.on("update-notify-value", function(event, arg) {
    mainWindow.webContents.send("targetPriceVal", arg);
})



//Openen notify window
function openNotifyWindow() {
    const modalPath = path.join(__dirname, "./src/add.html");

    const win = new BrowserWindow({
        width: 400,
        height: 200,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    //win.webContents.openDevTools();
    win.loadFile(modalPath);
    win.show();

    //Handling close button
    ipcMain.on("closeNotifyWindowBtnClicked", () => {
        win.close()
    });

}