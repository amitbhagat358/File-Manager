import React, { useState } from 'react';
import ContextMenu from './ContextMenu.jsx';

function Hey({
  name,
  type,
  URL,
  path,
  setPath,
  openFile,
  deleteFile,
  itemClick,
  selectedItem,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      style={{ userSelect: 'none' }}
      onDoubleClick={(e) => {
        e.preventDefault();
        openFile(name);
      }}
      onClick={() =>{
        itemClick({name: name, type:type});
      }}
    >
      <div className={`file ${selectedItem.name ===name? 'selected': null}`}>
        <div className="fileIcon"></div>
        <div className="ellipsis">{name}</div>
      </div>
      {isMenuOpen ? <ContextMenu /> : null}
    </div>
  );
}

export default Hey;
