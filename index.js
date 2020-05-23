const { app, BrowserWindow, globalShortcut } = require('electron')
const baseURL = require('./config')

let win;

function createWindow () {
  // Cria uma janela de navegação.
  win = new BrowserWindow({
    width: 800,
    height: 500,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  // and load the index.html of the app.
  //win.loadFile('index.html')
  win.loadURL(baseURL.url)
}

function toggleDevTools(){
  win.webContents.toggleDevTools()
}

function createShortcuts(){
  globalShortcut.register('CommandOrControl+J', toggleDevTools)
}

app.whenReady().then(createWindow).then(createShortcuts)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', () => {
  const atalho = createShortcuts()

  console.log(globalShortcut.isRegistered('CommandOrControl+J'))
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})