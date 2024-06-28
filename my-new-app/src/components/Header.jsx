import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import PopupFolderName from './PopupFolderName.jsx';
import PopupFileName from './PopupFileName.jsx';
import PopupRename from './PopupRename.jsx';
import FollowCursorTooltips from './CursorFollow.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import AddressBar from './AddressBar.jsx';

function Header({
  navigateBack,
  showPath,
  currentFolder,
  createFolder,
  itemClick,
  setErrorInFolder,
  selectedItem,
  deleteFile,
  deleteFolder,
  checkFile,
  openFile,
  rename,
  ancestors,
  baseAddress,
  setPath,
}) {
  return (
    <div className="header1">
      <div className="top">
        {/* <div className="header1">
          <div className="backButton">
            <IconButton
              sx={{ color: 'white' }}
              onClick={() => {
                navigateBack();
              }}
              aria-label="ArrowBack"
              size="small"
            >
              <ArrowBackIcon fontSize="medium" />
            </IconButton>
          </div>
          <FollowCursorTooltips showPath={showPath} />
        </div> */}

        {ancestors ? (
          <AddressBar
            ancestors={ancestors}
            baseAddress={baseAddress}
            setPath={setPath}
          />
        ) : null}

        <div className="opendFolder"> {currentFolder}</div>
      </div>

      <div className="actions-bar">
        <div
          className="delete"
          onClick={() => {
            if (selectedItem.name !== '') {
              selectedItem.type === 'directory'
                ? deleteFolder(selectedItem.name)
                : deleteFile(selectedItem.name);
            }
          }}
        >
          <div className="deleteIcon">
            <IconButton
              color="error"
              aria-label="delete"
              size="small"
              disabled={selectedItem.name === ''}
            >
              <DeleteIcon />
            </IconButton>
          </div>
          <div className="deleteText" style={selectedItem.name === ''? {color:"#b6b6b7", cursor:"default"}:null}>
            <span>Delete</span>
          </div>
        </div>

        <PopupRename
          rename={rename}
          itemClick={itemClick}
          selectedItem={selectedItem}
        />

        <PopupFolderName
          createFolder={createFolder}
          itemClick={itemClick}
          setErrorInFolder={setErrorInFolder}
        />
        <PopupFileName
          checkFile={checkFile}
          itemClick={itemClick}
          openFile={openFile}
        />
      </div>
    </div>
  );
}

export default Header;
