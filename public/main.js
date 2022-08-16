const { app, BrowserWindow, screen, shell } = require("electron");
const path = require("path");

function createWindow() {
  const { width: screenW } = screen.getPrimaryDisplay().workAreaSize;
  const winW = 1000;
  const winH = 800;
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    // 设置是否显示边框
    // frame: false,
    // transparent: true,
    // hasShadow: true,
    // 设置初始位置
    x: screenW - winW,
    y: 0,
    // 设置透明度
    // opacity:1,
    width: winW,
    height: winH,
    // alwaysOnTop: true,
    closable: true,
    movable: true,
    // resizable: true,
    // enableLargerThanScreen: true,
  });

  // and load the index.html of the app.
  mainWindow.loadFile("dist/index.html");
  // mainWindow.loadURL('http://localhost:3000/')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  // shell.beep()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
