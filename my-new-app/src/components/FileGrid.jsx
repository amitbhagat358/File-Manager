import React from 'react';
import File from './File.jsx';

function FileGrid({ filesAndDirectories, URL, path, setPath, openFile, deleteFile, itemClick, selectedItem }) {
  const hasFolders = filesAndDirectories.some(item => item.type === 'directory');


  return (

    <div className={`fileGrid ${hasFolders ? null :'removePadding'}`}>
    {filesAndDirectories.map((item, index) =>
      item.type === 'file' ? (
        <File
          key={index}
          name={item.name}
          type={item.type}
          URL={URL}
          path={path}
          setPath={setPath}
          openFile={openFile}
          deleteFile={deleteFile}
          itemClick={itemClick}
          selectedItem={selectedItem}
        />
      ) : null
    )}
  </div>
  )
}

export default FileGrid
