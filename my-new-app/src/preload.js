// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { getFilledInputUtilityClass } = require('@mui/material');
const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('fileMethodsAPI', {
  onCheckFile: async(path, fileName) => {
    let ans = await ipcRenderer.invoke('check-file', path, fileName);
    return ans; 
  },


  onRename: async(path, oldName, newName) =>{
    let ans = await ipcRenderer.invoke('rename-item', path, oldName, newName);
    return ans;
  },

  onOpenFile: (path) => ipcRenderer.send('open-file', path),

  onCreateFolder: async(path, folderName) =>{
    const folderCreated = await ipcRenderer.invoke('create-folder', path, folderName);
    return folderCreated;
  },

  onDeleteFile: (path, fileName) => ipcRenderer.send('delete-file', path, fileName),
  onDeleteFolder: async (path, folderName) => await ipcRenderer.invoke('delete-folder', path, folderName),

  onReadFile: async (path, fileName) => {
    try{
      let fileData = await ipcRenderer.invoke('read-file',path, fileName);
      return fileData;
    }
    catch{
      return null;
    }
  },

  onWriteFile: async (path, fileName) => {
    await ipcRenderer.invoke('write-file',path, fileName);
  },

  getParentFolder: async(baseAddress, path) =>{
    try{
      const ans = await ipcRenderer.invoke('parent-folder', baseAddress, path);
      return ans;
    }
    catch(error){
      return null;
    }
  },

  getCurrFolder: async (baseAddress, path) => {
    try{
      const ans = await ipcRenderer.invoke('curr-folder', baseAddress, path);
      return ans;
    }
    catch(error){
      return null;
    }
  },

  getDetails: async (path) =>{
    try{
      const details = await ipcRenderer.invoke('get-details',path, name);
      return details;
    }
    catch(error){
      return null;
    }
  },

  getAncestors: async(baseAddress, pathName) =>{
    try{
      const res = await ipcRenderer.invoke('get-ancestors',baseAddress, pathName)
      return res;
    }
    catch(error){
      return null;
    }
  },

  getFileExt: async (path, name)=>{
    let ans = await ipcRenderer.invoke('get-ext', path, name);
    console.log("preload: "+ ans);
    return ans;
  },

  OnOpenFileDefault: (path, name) => ipcRenderer.send('open-file-default', path, name)
});

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),

  getFiles: async (callback) => {
    try {
      return  ipcRenderer.on("get-files", (event, args)=>{
        callback(args);
      });
    } catch (error) {
      throw error;
    }
  }


});
