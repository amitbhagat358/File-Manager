import React, { useEffect, useState } from 'react';
import Header from './Header.jsx';
import FolderGrid from './FolderGrid.jsx';
import FileGrid from './FileGrid.jsx';
import Snackbar from './Snackbar.jsx';
import SnackbarForFile from './SnackbarForFile.jsx';
import SnackbarForRename from './SnackbarForRename.jsx';
import OpenFileDialog from './OpenFile.jsx';

const App = () => {
  const [filesAndDirectories, setFilesAndDirectories] = useState([]);
  const [path, setPath] = useState('');
  const [selectedItem, setSelectedItem] = useState({ name: null, type: null });
  const [currentFolder, setCurrentFolder] = useState('');
  const [showToastMsg, setShowToastMsg] = useState(null);
  const [toastMsgContent, setToastMsgContent] = useState('');
  const [showToastMsgFile, setShowToastMsgFile] = useState(null);
  const [toastMsgContentFile, setToastMsgContentFile] = useState('');
  const [isFolderEmpty, setIsFolderEmpty] = useState(false);
  const [details, setDetails] = useState(null);
  const [ancestors, setAncestors] = useState(null);



  let baseAddress = `C:\\Users\\amitb\\OneDrive\\Desktop\\file-manager`;

  useEffect(() => {
    window.electronAPI.setTitle('File Manager');

    window.electronAPI.getFiles((data) => {
      setFilesAndDirectories(data);
      if (data.length === 0) {
        setIsFolderEmpty(true);
        setSelectedItem({name:'', type:''});
      }
      else {
        setIsFolderEmpty(false);
      }
    });
  }, []);

  const findAncestors = async () =>{
    let ans = await window.fileMethodsAPI.getAncestors(baseAddress, path);
    console.log(ans);
    setAncestors(ans);
  }

  useEffect(() => {
    URL(path);
    setSelectedItem({ name: '', type: '' });
    console.log("hi");
    findAncestors();
  }, [path]);

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

    let parent = await window.fileMethodsAPI.getParentFolder(baseAddress, path);
    setPath(parent);
  }

  async function getCurrentFolder() {
    let ans = await window.fileMethodsAPI.getCurrFolder(baseAddress, path);
    return ans;
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
    setSelectedItem({ value: false, name: '' });
    window.location.reload();
  }

  async function deleteFolder(folderName) {
    await window.fileMethodsAPI.onDeleteFolder(path, folderName);
    window.location.reload();
  }

  async function itemClick(itemId) {
    let res = await window.fileMethodsAPI.getDetails(path, itemId.name);
    console.log(res);
    setDetails(res);
    setSelectedItem(itemId);
  }

  function showPath() {
    let visiblePath = path.replaceAll('/', '\\');
    visiblePath = baseAddress + visiblePath;
    return visiblePath;
  }

  const writeFile = (fileName)=>{
    window.fileMethodsAPI.onWriteFile(path, fileName)
  }

  async function checkFile(fileName) {
    let ans = await window.fileMethodsAPI.onCheckFile(path, fileName);
    if (ans === true) {
      setToastMsgContentFile('success');
      setShowToastMsgFile(true);
      await writeFile(fileName);
      openFileDefault(fileName);
      window.location.reload();
      itemClick({ name: fileName, type: 'file' });
      setIsFolderEmpty(false);
    } else {
      setToastMsgContentFile('error');
      setShowToastMsgFile(true);
    }
  }

  const [showToastMsgRename, setShowToastMsgRename] = useState(null);
  const [toastMsgContentRename, setToastMsgContentRename] = useState('');

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

  const openFileDefault = (name) =>{
    window.fileMethodsAPI.OnOpenFileDefault(path, name);
  }


  return (
    <>
      <Header
        navigateBack={navigateBack}
        showPath={showPath}
        currentFolder={currentFolder}
        createFolder={createFolder}
        itemClick={itemClick}
        selectedItem={selectedItem}
        deleteFile={deleteFile}
        deleteFolder={deleteFolder}
        checkFile={checkFile}
        rename={rename}
        ancestors={ancestors}
        baseAddress={baseAddress}
        setPath={setPath}
      />

      <div className="hero">
        <FolderGrid
          filesAndDirectories={filesAndDirectories}
          URL={URL}
          path={path}
          setPath={setPath}
          deleteFolder={deleteFolder}
          itemClick={itemClick}
          selectedItem={selectedItem}
        />

        <FileGrid
          filesAndDirectories={filesAndDirectories}
          URL={URL}
          path={path}
          setPath={setPath}
          deleteFile={deleteFile}
          itemClick={itemClick}
          selectedItem={selectedItem}
          openFileDefault={openFileDefault}
        />
      </div>

      {/* {selectedItem.name ? (<div className="details">

          name : {selectedItem.name}
          type : {selectedItem.type}
          ctime : {details.ctimeMs}
          atime: {details.atimeMs}
        </div>) : null} */}

      {showToastMsg ? (
        <Snackbar
          msg={showToastMsg}
          setMsg={setShowToastMsg}
          content={toastMsgContent}
        />
      ) : null}

      {showToastMsgFile ? (
        <SnackbarForFile
          msg={showToastMsgFile}
          setMsg={setShowToastMsgFile}
          content={toastMsgContentFile}
        />
      ) : null}

      {showToastMsgRename ? (
        <SnackbarForRename
          msg={showToastMsgRename}
          setMsg={setShowToastMsgRename}
          content={toastMsgContentRename}
        />
      ) : null}


      {isFolderEmpty ? (
        <h3 className="emptyFolder">This folder is empty</h3>
      ) : null}
    </>
  );
};

export default App;
