const os = require('os');
const path = require('path');
const { app, ipcRenderer, contextBridge } = require('electron');
const axios = require("axios");


// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
/* window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
}) */

contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, (event, data) => func(event, data)),
});

//Poging axios toegankelijk te maken in renderer
contextBridge.exposeInMainWorld('axios', {
    get: async(url) => axios.get(url)

});

contextBridge.exposeInMainWorld('path', {
    join: (...args) => path.join(...args),
});

contextBridge.exposeInMainWorld('app', {
    dirname: () => __dirname
});