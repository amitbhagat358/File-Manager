import React, { useState, useEffect } from 'react';
import ContextMenu from './ContextMenu.jsx';

function Folder({
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
  const [isFocused, setIsFocused] = useState(false);

  const handleDoubleClick = (e) => {
    e.preventDefault();
    setPath(path + '/' + name);
  };

  const handleClick = () => {
    itemClick({ name: name, type: type });
  };

  const handleKeyDown = (e) => {
    if (e.key == 'Enter' || e.key === ' ') {
      handleDoubleClick(e);
    }
  };

  const handleFocus = () => {
    handleClick();
    setIsFocused(true);
  };

  const handleBlur = () => {
    itemClick({name: "", type: ""});
    setIsFocused(false);
  };

  return (
    <div>
      <div
        onDoubleClick={handleDoubleClick}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        id={name}
        className={`folder ${isFocused ? 'focused' : null}`}
      >
        <div className="folderIcon"></div>
        <div className="ellipsis">{name}</div>
      </div>
      {isMenuOpen ? <ContextMenu /> : null}
    </div>
  );
}

export default Folder;
