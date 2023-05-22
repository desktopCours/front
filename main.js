const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const fetch = require('electron-fetch');


const createWindow = () => {
    const win = new BrowserWindow({

        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js')
        },
    })
    win.maximize();
    win.setMenu(null)
    win.loadFile('composants/connexion/connexion.html')


}

// Écouter l'événement 'load-page' depuis le rendu
ipcMain.on('load-page', (event, path) => {
    const pagePath = path.join(__dirname, path);
    mainWindow.loadFile(pagePath);
});

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})