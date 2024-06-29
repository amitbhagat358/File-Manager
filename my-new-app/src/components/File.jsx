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

  return (
    <div
      style={{ userSelect: 'none' }}
      onDoubleClick={(e) => {
        e.preventDefault();
        // openFile(name);
        openFileDefault(name);
      }}
      onClick={() =>{
        itemClick({name: name, type:type});
      }}
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
