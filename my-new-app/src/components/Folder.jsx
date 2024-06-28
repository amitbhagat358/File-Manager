import React, { useState, useEffect } from 'react';
import ContextMenu from './ContextMenu.jsx';

function Folder({ name, type, URL, path, setPath, openFile, deleteFile, itemClick, selectedItem }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      onDoubleClick={(e) => {
        console.log(e);
        e.preventDefault();
        setPath(path + '/' + name);
      }}
      onClick={() => {
        itemClick({name: name, type:type});
      }}

    >
      <div
        // tabIndex={0} // Add tabIndex to make the div focusable
        // onFocus={handleFocus}
        // onBlur={handleBlur}
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
