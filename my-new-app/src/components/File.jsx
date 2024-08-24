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
  openFileDefault,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleDoubleClick = (e) => {
    e.preventDefault();
    openFileDefault(name);
  };

  const handleClick = () => {
    itemClick({ name: name, type: type });
  };

  const handleKeyDown = (e) => {
    if (e.key == 'Enter' || e.key === ' ') handleDoubleClick(e);
  };

  const handleFocus = () => {
    handleClick();
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div >
      <div
        style={{ userSelect: 'none' }}
        onDoubleClick={handleDoubleClick}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={4}
        className={`file ${isFocused ? 'focused' : null}`}
      >
        <div className={`Icon ${ext.substring(1)}Icon`}></div>
        <div className="ellipsis">{name}</div>
      </div>
      {isMenuOpen ? <ContextMenu /> : null}
    </div>
  );
}

export default File;
