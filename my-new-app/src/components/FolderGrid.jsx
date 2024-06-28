import React from 'react';
import Folder from './Folder.jsx';

function FolderGrid({ filesAndDirectories, URL, path, setPath, deleteFolder, itemClick, selectedItem }) {
  return (
    <div className="folderGrid">
      {filesAndDirectories.map((item, index) =>
        item.type === 'directory' ? (
          <Folder
            key={index}
            name={item.name}
            type={item.type}
            URL={URL}
            path={path}
            setPath={setPath}
            deleteFolder={deleteFolder}
            itemClick={itemClick}
            selectedItem={selectedItem}
          />
        ) : null
      )}
    </div>
  );
}

export default FolderGrid;
