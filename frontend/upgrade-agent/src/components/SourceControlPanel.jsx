import React, { useRef } from 'react';
import { FaGithub, FaBitbucket, FaDownload } from 'react-icons/fa';

function SourceControlPanel({ onFileChange, disabled, downloadPath }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="panel source-control-panel">
      <h3>Upload Project</h3>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        style={{ display: 'none' }}
        accept=".zip"
        disabled={disabled}
      />
      <button onClick={handleButtonClick} disabled={disabled}>
        Select .zip File
      </button>

      {downloadPath && (
        <div className="download-section">
          <h4>Upgrade Complete!</h4>
          <a href={`http://localhost:8000/${downloadPath}`} download className="download-button">
            <FaDownload /> Download Upgraded Project
          </a>
        </div>
      )}

      <div className="connect-repo">
        <h3>Connect Repository</h3>
        <div className="repo-icons">
          <FaGithub />
          <FaBitbucket />
        </div>
      </div>
    </div>
  );
}

export default SourceControlPanel;