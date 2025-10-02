import React, { useState, useEffect, } from 'react';
import { FaCheckCircle, FaTimesCircle, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import { VscCircleFilled } from "react-icons/vsc";

const statusIcons = {
  success: <FaCheckCircle className="icon-success" />,
  error: <FaTimesCircle className="icon-error" />,
  loading: <CgSpinner className="icon-loading" />,
  info: <VscCircleFilled className="icon-info" />,
  warning: <FaTimesCircle className="icon-warning" />,
};

const LogLine = ({ log }) => (
  <div className={`log-line status-${log.status}`}>
    {statusIcons[log.status] || <span className="log-icon-space" />}
    <span className="log-message">{log.message}</span>
  </div>
);

const LogGroup = ({ group }) => {
  const [isOpen, setIsOpen] = useState(group.isOpen);

  useEffect(() => {
    setIsOpen(group.isOpen);
  }, [group.isOpen]);

  return (
    <div className="log-group">
      <button className="log-group-header" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaChevronDown /> : <FaChevronRight />}
        {statusIcons[group.status]}
        <span className="log-group-title">{group.title}</span>
      </button>
      {isOpen && (
        <div className="log-group-content">
          {group.logs.map((log, index) => (
            <LogLine key={index} log={log} />
          ))}
        </div>
      )}
    </div>
  );
};

function LogViewer({ logGroups }) {
  // The auto-scrolling is now handled by CSS overflow properties,
  // so the useEffect and ref are no longer needed here.
  return (
    <div className="panel log-viewer">
      <div className="log-viewer-content">
        {logGroups.map((group) => (
          <LogGroup key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}

export default LogViewer;