// FileComponent.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FileComponent = ({ fileName, fileType, basePath, setPath }) => {
  const [filesInDirectory, setFilesInDirectory] = useState([]);

  useEffect(() => {
    if (fileType === 'directory' ) {
      const fetchFilesInDirectory = async () => {
        try {
          const files = await window.electronAPI.getFilesInDirectory(
            `${basePath}\\${fileName}`
          );
          setFilesInDirectory(files);
          setPath(`${basePath}\\${fileName}`);
          console.log(files);
        } catch (error) {
          console.error(error);
        }
      };
      fetchFilesInDirectory();
    }

  }, []);


  return (
    <div>
      <h1>{fileName}</h1>
      {fileType === 'directory' && (
        <ul>
          {filesInDirectory.map((file) => (
            <li key={file}>
              <Link to={`/${file}`}>
                {file}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {/* Render file content or specific UI based on the file */}
    </div>
  );
};

export default FileComponent;
