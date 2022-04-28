const { app, BrowserWindow } = require('electron');
const path = require('path');

exports.functionName = function createWindow(link) {
  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/w4ck3r.png')
  });

  if (link == null){
    win.loadFile('index.html');
  } else {
    win.loadURL(link);
  }
  // supprime la barre de menu au top
  win.menuBarVisible = false;
  // met la fenêtre en grand écran
  win.maximize();

  return win;
}

app.whenReady().then(() => {
  createWindow(null);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
