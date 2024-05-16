//const { app, BrowserWindow, ipcMain, dialog } = require('electron');
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import readMetadata from '../components/fileReader/MetadataReader';
import convertMetadata from '../components/converter/MetadataConverter';
import writeGeoJSON from '../components/fileWriter/JSONWriter';
import setAllLoggers, {setAllListeners} from '../components/logger/Logger';
import { userInfo } from "os";

const user = userInfo().username;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 850,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.removeMenu();
  mainWindow.webContents.on('before-input-event', (_, input) => {
    if (input.type === 'keyDown' && input.key === 'F12') {
      mainWindow.webContents.toggleDevTools();
    }
  });

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  const logOnRenderer = (message) => {
    mainWindow.webContents.send('logOnRenderer', message);
  }

  const eventListener = (message) => {
    mainWindow.webContents.send('eventListener', message);
  }


  setAllLoggers(logOnRenderer);
  setAllListeners(eventListener)

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


ipcMain.handle('getUser', (event) => {
  return user
});

ipcMain.handle('openMetadata', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'], 
      filters: [{ name: 'Metadata', extensions: ['xml', 'dim', "json", "kmeta"] }],
    })
  if (!canceled) {
    const fileDataArray = await readMetadata(filePaths)
    const geoJSONArray = fileDataArray.length > 0 ? convertMetadata(fileDataArray) : [];
    return geoJSONArray;
  } else {
    return [];
  }
})

ipcMain.handle('saveMetadata', (event, objectsArray) => {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then(result => {
    if (!result.canceled && result.filePaths.length > 0) {
      writeGeoJSON(result, objectsArray);
    }
  }).catch(err => {
    console.error('Error opening dialog:', err);
  });
});


