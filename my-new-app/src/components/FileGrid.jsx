import React from 'react';
import File from './File.jsx';

function FileGrid({ filesAndDirectories, URL, path, setPath, openFile, deleteFile, itemClick, selectedItem, openFileDefault}) {
  const hasFolders = filesAndDirectories.some(item => item.type === 'directory');


  return (

    <div className={`fileGrid ${hasFolders ? null :'removePadding'}`}>
    {filesAndDirectories.map((item, index) =>
      item.type === 'file' ? (
        <File
          key={index}
          name={item.name}
          type={item.type}
          ext={item.ext}
          URL={URL}
          path={path}
          setPath={setPath}
          openFile={openFile}
          deleteFile={deleteFile}
          itemClick={itemClick}
          selectedItem={selectedItem}
          openFileDefault={openFileDefault}
        />
      ) : null
    )}
  </div>
  )
}

export default FileGrid
