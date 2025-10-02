import React from 'react';

const priorityConfig = {
  "Must have": { order: 1 },
  "Should have": { order: 2 },
  "Could have": { order: 3 },
};

function ActionItemsPanel({ results, selectedPackages, onSelectionChange, onUpgrade, isUpgrading }) {
  if (!results || !results.deprecatedDependencies) {
    return <div className="panel action-items-panel" />;
  }

  const { deprecatedDependencies } = results;
  const groupedByPriority = deprecatedDependencies.reduce((acc, dep) => {
    const { priority } = dep;
    if (!acc[priority]) acc[priority] = [];
    acc[priority].push(dep);
    return acc;
  }, {});

  const sortedPriorities = Object.keys(groupedByPriority).sort((a, b) => 
    (priorityConfig[a]?.order || 99) - (priorityConfig[b]?.order || 99)
  );

  const handleMasterCheckbox = (e) => {
    const allPackageNames = deprecatedDependencies.map(p => p.name);
    onSelectionChange(e.target.checked ? allPackageNames : []);
  };

  const handlePriorityCheckbox = (e, priority) => {
    const priorityPackageNames = groupedByPriority[priority].map(p => p.name);
    const otherSelected = selectedPackages.filter(p => !priorityPackageNames.includes(p));
    onSelectionChange(e.target.checked ? [...otherSelected, ...priorityPackageNames] : otherSelected);
  };

  const handlePackageCheckbox = (e, packageName) => {
    onSelectionChange(
      e.target.checked
        ? [...selectedPackages, packageName]
        : selectedPackages.filter(p => p !== packageName)
    );
  };

  const allSelected = deprecatedDependencies.length > 0 && selectedPackages.length === deprecatedDependencies.length;
  const anySelected = selectedPackages.length > 0;

  return (
    <div className="panel action-items-panel">
      <div className="action-items-header">
        <h3>Action Items ({deprecatedDependencies.length} Found)</h3>
        <label className="master-checkbox">
          <input type="checkbox" checked={allSelected} onChange={handleMasterCheckbox} />
          Select All
        </label>
      </div>
      <div className="action-items-body">
        {sortedPriorities.map(priority => (
          <div key={priority} className="priority-group">
            <div className="priority-header">
              <h4>{priority} ({groupedByPriority[priority].length})</h4>
              <input
                type="checkbox"
                checked={groupedByPriority[priority].every(p => selectedPackages.includes(p.name))}
                onChange={(e) => handlePriorityCheckbox(e, priority)}
              />
            </div>
            <ul>
              {groupedByPriority[priority].map(dep => (
                <li key={dep.name}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedPackages.includes(dep.name)}
                      onChange={(e) => handlePackageCheckbox(e, dep.name)}
                    />
                    <span className="package-name">{dep.name}:</span>
                    <span className="version-change">{dep.current} → {dep.latest}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="action-items-footer">
        <button onClick={onUpgrade} disabled={!anySelected || isUpgrading}>
          {isUpgrading ? 'Upgrading...' : `Upgrade ${selectedPackages.length} Selected Packages`}
        </button>
      </div>
    </div>
  );
}

export default ActionItemsPanel;