import React, { useState, useRef, useEffect } from "react";
import SourceControlPanel from "./components/SourceControlPanel";
import LogViewer from "./components/LogViewer";
import ActionItemsPanel from "./components/ActionItemsPanel";
import "./App.css";
import "./components/LogViewer.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [logs, setLogs] = useState([]);
  const [results, setResults] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [downloadPath, setDownloadPath] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const socketRef = useRef(null);

  const addLog = (log) => {
    setLogs((prevLogs) => {
      const newLogs = JSON.parse(JSON.stringify(prevLogs)); // Deep copy for safe mutation

      if (log.type === "major_step_start") {
        // When a new major step starts, mark the previous one as successful
        if (newLogs.length > 0) {
          const lastStep = newLogs[newLogs.length - 1];
          if (lastStep.status === "loading") {
            lastStep.status = "success";
          }
        }
        newLogs.push({
          id: newLogs.length,
          title: log.message,
          status: "loading",
          logs: [],
          isOpen: true,
        });
      } else if (log.type === "major_step_end") {
        if (newLogs.length > 0) {
          const currentStep = newLogs[newLogs.length - 1];
          const hasError = currentStep.logs.some((l) => l.status === "error");
          currentStep.status = hasError ? "error" : "success";

          // Clean up any minor logs that are still 'loading'
          // This prevents them from getting stuck in a loading state.
          currentStep.logs.forEach((minorLog) => {
            if (minorLog.status === "loading") {
              minorLog.status = "success";
            }
          });
        }
      } else {
        // This is a minor log
        if (newLogs.length === 0) {
          newLogs.push({
            id: 0,
            title: "Initialization",
            status: "loading",
            logs: [],
            isOpen: true,
          });
        }
        const currentStep = newLogs[newLogs.length - 1];

        // Find a loading log that can be completed by the current message
        const loadingLogIndex = currentStep.logs.findIndex(
          (l) => l.status === "loading"
        );

        if (log.status === "success" && loadingLogIndex !== -1) {
          // If the current log is a success and there's a loading log, update the loading log.
          // This handles cases like "Installing..." -> "Dependencies installed."
          const loadingLog = currentStep.logs[loadingLogIndex];
          loadingLog.status = "success";
          loadingLog.message = log.message; // Update with the final success message
        } else {
          // Otherwise, just add the new log line.
          currentStep.logs.push(log);
        }
      }
      return newLogs;
    });
  };

  useEffect(() => {
    if (!fileToUpload) return;

    const clientId = uuidv4();
    const wsUrl = `ws://localhost:8000/ws/${clientId}`;
    socketRef.current = new WebSocket(wsUrl);
    const socket = socketRef.current;

    socket.onopen = () =>
      addLog({
        type: "log",
        status: "info",
        message: "Connection established. Waiting for server...",
      });

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "connection_ready") {
        addLog({
          type: "log",
          status: "info",
          message: "Server is ready. Uploading file...",
        });
        socket.send(fileToUpload);
        return;
      }

      addLog(data);

      if (data.type === "phase_one_complete") {
        setResults(data.payload);
        setIsProcessing(false);
      } else if (data.type === "refactor_complete") {
        // When refactor is complete, ensure the last major step is marked as success.
        addLog({ type: "major_step_end" });
        setDownloadPath(data.download_path);
        setIsUpgrading(false);
        socket.close();
      }
    };

    socket.onerror = () => {
      addLog({
        type: "log",
        status: "error",
        message: `WebSocket Error: Could not connect to server.`,
      });
      setIsProcessing(false);
      setIsUpgrading(false);
      setFileToUpload(null);
    };

    return () => {
      if (socket && socket.readyState === 1) socket.close();
    };
  }, [fileToUpload]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.name.endsWith(".zip")) {
      setLogs([
        {
          type: "log",
          status: "error",
          message: "Error: Please upload a .zip file.",
        },
      ]);
      return;
    }
    setDownloadPath(null);
    setLogs([]);
    setResults(null);
    setSelectedPackages([]);
    setIsProcessing(true);
    setFileToUpload(file);
  };

  const handleUpgrade = () => {
    if (socketRef.current && selectedPackages.length > 0) {
      setIsUpgrading(true);
      const packagesToUpgrade = results.deprecatedDependencies
        .filter((p) => selectedPackages.includes(p.name))
        .sort((a, b) => {
          const priorityOrder = {
            "Must have": 1,
            "Should have": 2,
            "Could have": 3,
          };
          return (
            (priorityOrder[a.priority] || 99) -
            (priorityOrder[b.priority] || 99)
          );
        });

      socketRef.current.send(
        JSON.stringify({
          type: "start_upgrade",
          packages: packagesToUpgrade,
        })
      );
    }
  };
  return (
    <div className="App">
      <header className="app-header">
        <h1>🔧 Version Upgrade Agent</h1>
      </header>
      <main className="app-main">
        <SourceControlPanel
          onFileChange={onFileChange}
          disabled={isProcessing || isUpgrading}
          downloadPath={downloadPath}
        />
        <LogViewer logGroups={logs} />
        <ActionItemsPanel
          results={results}
          selectedPackages={selectedPackages}
          onSelectionChange={setSelectedPackages}
          onUpgrade={handleUpgrade}
          isUpgrading={isUpgrading}
        />
      </main>
    </div>
  );
}

export default App;
