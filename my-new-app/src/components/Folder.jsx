import React, { useState, useEffect } from 'react';
import ContextMenu from './ContextMenu.jsx';

function Folder({ name, type, URL, path, setPath, openFile, deleteFile, itemClick, selectedItem }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDoubleClick = (e) => {
    e.preventDefault();
    setPath(path + '/' + name);
  }

  const handleClick = () => {
    itemClick({name: name, type:type});
  }

  const handleKeyDown = (e) => {
    if(e.key == 'Enter' || e.key === ' '){
      handleDoubleClick(e);
    }
  }

  return (
    <div
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div
        id={name}
        className={`folder ${selectedItem.name===name? 'selected': null}`}
      >
        <div className="folderIcon"></div>
        <div className="ellipsis">{name}</div>
      </div>
      {isMenuOpen ? <ContextMenu /> : null}
    </div>
  );
}

export default Folder;
