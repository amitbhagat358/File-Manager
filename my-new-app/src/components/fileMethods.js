async function URL(path) {
  if (path === '') setPath('/Testing Folder');
  window.history.pushState({}, '', path);
  let ans = await getCurrentFolder();
  setCurrentFolder(ans);
  window.location.href = path;
}

async function navigateBack() {
  if (path === '/Testing Folder') return;

  if (isFolderEmpty) {
    setIsFolderEmpty(false);
  }

  let parentDirectory = await window.fileMethodsAPI.getParentDirectory(path);
  setPath(parentDirectory);
}

async function getCurrentFolder() {
  let parentDirectory = await window.fileMethodsAPI.getParentDirectory(path);
  return path.replace(parentDirectory + '/', '');
}

async function createFolder(folderName) {
  let ans = await window.fileMethodsAPI.onCreateFolder(path, folderName);
  if (ans === true) {
    setToastMsgContent('success');
    setShowToastMsg(true);
    setIsFolderEmpty(false);
  } else {
    setToastMsgContent('error');
    setShowToastMsg(true);
  }
  window.location.reload();
}

function deleteFile(fileName) {
  window.fileMethodsAPI.onDeleteFile(path, fileName);
  setSelectedItem({value:false, name:""});
  window.location.reload();
}

async function deleteFolder(folderName) {
  await window.fileMethodsAPI.onDeleteFolder(path, folderName);
  window.location.reload();
}

async function itemClick(itemId) {
  setSelectedItem(itemId);
}

function showPath() {
  let visiblePath = path.replaceAll('/', '\\');
  visiblePath = baseAddress + visiblePath;
  return visiblePath;
}

async function openFile(fileName) {
  let fileData = await window.fileMethodsAPI.onReadFile(path, fileName);
  setFileData(fileData);
  setFileOpen({ value: true, name: fileName });
}

async function writeFile(fileName) {
  await window.fileMethodsAPI.onWriteFile(path, fileName, fileData);
}

async function checkFile(fileName) {
  let ans = await window.fileMethodsAPI.onCheckFile(path, fileName);
  if (ans === true) {
    setToastMsgContentFile('success');
    setShowToastMsgFile(true);
    await writeFile(fileName);
    openFile(fileName);
    window.location.reload();
    itemClick({ name: fileName, type: 'file' });
    setIsFolderEmpty(false);
  } else {
    setToastMsgContentFile('error');
    setShowToastMsgFile(true);
  }
}


async function rename(oldName, newName) {
  let check = await window.fileMethodsAPI.onCheckFile(path, newName);
  if (check) {
    await window.fileMethodsAPI.onRename(path, oldName, newName);
    setToastMsgContentRename('success');
    setShowToastMsgRename(true);
    itemClick({ name: newName, type: '' });
    window.location.reload();
  } else {
    setToastMsgContentRename('error');
    setShowToastMsgRename(true);
  }
}

export {
  URL,
  navigateBack,
  getCurrentFolder,
  createFolder,
  deleteFile,
  deleteFolder,
  itemClick,
  showPath,
  openFile,
  writeFile,
  checkFile,
  rename
};