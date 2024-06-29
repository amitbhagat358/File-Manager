const { app, BrowserWindow, ipcMain, shell, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const open = require('open')
const { exec } = require('child_process');
const util = require('util');
const { AsyncLocalStorage } = require('async_hooks');
const mkdirPromise = util.promisify(fs.mkdir);
const rmPromise = util.promisify(fs.rm);
const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);
const statPromise = util.promisify(fs.stat);
const renamePromise = util.promisify(fs.rename);

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame:true,
    titleBarStyle:'default',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
    },
  });
  Menu.setApplicationMenu(null);
  mainWindow.webContents.openDevTools();

  console.log(mainWindow.getTitle());

  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.setTitle(title);
  });

  ipcMain.handle('check-file', async (event, x, fileName) => {
    try {
      await statPromise(path.join(baseAddress, x, fileName));
      return false;
    } catch (err) {
      console.error("file doesn't exists", err);
      return true;
    }
  });

  ipcMain.handle('rename-item', async (event, x, oldName, newName) => {
    try {
      await renamePromise(
        path.join(baseAddress, x, oldName),
        path.join(baseAddress, x, newName)
      );
      return true;
    } catch (err) {
      console.error('error renaming', err);
      return false;
    }
  });

  let baseAddress = __dirname.replace('\\my-new-app\\.webpack\\main', '');

  mainWindow.webContents.on('will-navigate', async (event, url) => {
    const pathname = new URL(url).pathname;
    let newpath = pathname.replace('/main_window', '');
    newpath = newpath.replaceAll('%20', ' ');

    event.preventDefault();
    let pathUptoFileManager = __dirname.replace(
      '\\my-new-app\\.webpack\\main',
      ''
    );

    const directoryPath = path.join(pathUptoFileManager, newpath);
    try {
      const files = await fs.promises.readdir(directoryPath);
      const filesObject = [];

      for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const stats = await fs.promises.stat(filePath);
        filesObject.push({
          name: file,
          type: stats.isDirectory() ? 'directory' : 'file',
          ext: stats.isDirectory()? null: path.extname(file)
        });
      }
      mainWindow.webContents.send('get-files', filesObject);
    } catch (error) {
      console.error(error);
      return {};
    }
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);



  ipcMain.on('open-file', (event, x) => {
    console.log('open file: ' + x);
    shell.openPath(path.join(x));
  });

  ipcMain.handle('create-folder', async (event, x, folderName) => {
    try {
      await mkdirPromise(path.join(baseAddress, x, folderName));
      console.log('Directory created successfully');
      return true;
    } catch (error) {
      console.error('Error creating directory:', error);
      return false;
    }
  });

  ipcMain.on('delete-file', (event, x, fileName) => {
    fs.unlink(path.join(baseAddress, x, fileName), (err) => {
      if (err) {
        console.error('Error deleting file: ', err);
        return;
      }
      console.log('file deleted successfully! ');
    });
  });

  ipcMain.handle('delete-folder', async (event, x, folderName) => {
    try {
      await rmPromise(path.join(baseAddress, x, folderName), {
        recursive: true,
      });
      console.log('directory deleted');
      return true;
    } catch (err) {
      console.log('error deleting directory');
      return false;
    }
  });

  ipcMain.handle('read-file', async (event, x, fileName) => {
    try {
      let fileData = await readFilePromise(
        path.join(baseAddress, x, fileName),
        'utf8'
      );
      return fileData;
    } catch (err) {
      console.log('error reading file');
      return null;
    }
  });

  ipcMain.handle('write-file', async (event, x, fileName) => {
    await writeFilePromise(path.join(baseAddress, x, fileName), "");
  });

  ipcMain.handle('get-details', async (event, x, name) =>{
    let stats = await fs.promises.stat(path.join(baseAddress,x ,name));
    return stats;
  })

  ipcMain.handle('parent-folder', async (event,baseAddress, pathName) =>{
    let x =  path.dirname(path.join(baseAddress, pathName));
    x = x.replace(baseAddress, "");
    return x;
  })

  ipcMain.handle('curr-folder', async (event,baseAddress, pathName) =>{
    let x =  path.basename(path.join(baseAddress, pathName));
    return x;
  })

  ipcMain.handle('get-ancestors', async (event,baseAddress,pathName) =>{
    console.log("base: " + baseAddress);

    let newBase = path.join(baseAddress, 'Testing Folder');
    console.log("hello " + newBase);

    let curr_path = path.join(baseAddress, pathName);

    let res = [];

    while(curr_path != baseAddress){
      res.push([curr_path, path.basename(curr_path)])
      curr_path = path.dirname(curr_path);
    }

    res.reverse();
    return res;
  })

  ipcMain.handle('get-ext', async (event, x, name) =>{
    let ans = await path.extname(path.join(baseAddress, x, name));
    console.log("hey : " + ans);
    return ans;
  })

  ipcMain.on('open-file-default', (event, x, name) =>{
    open(path.join(baseAddress, x, name));
  })

};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
