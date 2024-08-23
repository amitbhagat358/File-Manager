import React, { useState } from 'react';
import ContextMenu from './ContextMenu.jsx';

function File({
  name,
  type,
  ext,
  URL,
  path,
  setPath,
  openFile,
  deleteFile,
  itemClick,
  selectedItem,
  openFileDefault
}) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDoubleClick = (e) => {
    e.preventDefault();
    openFileDefault(name);
  }

  const handleClick = () =>{
    itemClick({name : name, type: type});
  }

  const handleKeyDown = (e) => {
    if(e.key == 'Enter' || e.key === ' ') handleDoubleClick(e);
  }

  return (
    <div
      style={{ userSelect: 'none' }}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className={`file ${selectedItem.name ===name? 'selected': null}`}>
        <div className={`Icon ${ext.substring(1)}Icon`}>
        
        </div>
        <div className="ellipsis">{name}</div>
      </div>
      {isMenuOpen ? <ContextMenu /> : null}
    </div>
  );
}

export default File;
