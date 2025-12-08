import React from "react";
import { Terminal, Layout, BrainCircuit, Database } from "lucide-react";
import type { UserSettings } from "../../../types";

interface SidebarProps {
  user: UserSettings;
  activeView: "dashboard" | "curriculum" | "resources";
  setActiveView: (view: "dashboard" | "curriculum" | "resources") => void;
  percentage: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  activeView,
  setActiveView,
  percentage,
}) => {
  return (
    <nav className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-10">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-orange-500 font-bold text-xl tracking-wider">
          <Terminal size={24} /> <span>SDE:PREP</span>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-400 font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase">Operative</p>
            <p className="text-sm font-medium text-white">{user.name}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 py-6 space-y-1">
        <NavButton
          active={activeView === "dashboard"}
          onClick={() => setActiveView("dashboard")}
          icon={<Layout size={18} />}
          label="Command Center"
        />
        <NavButton
          active={activeView === "curriculum"}
          onClick={() => setActiveView("curriculum")}
          icon={<BrainCircuit size={18} />}
          label="Quest Board"
        />
        <NavButton
          active={activeView === "resources"}
          onClick={() => setActiveView("resources")}
          icon={<Database size={18} />}
          label="Intel Database"
        />
      </div>

      <div className="p-6 border-t border-slate-800 bg-slate-900/50">
        <div className="flex justify-between mb-2 text-xs font-mono">
          <span className="text-slate-500">SYS.READY</span>
          <span className="text-orange-400">{percentage}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-600 to-yellow-400 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </nav>
  );
};

function NavButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-200 border-l-2
        ${
          active
            ? "bg-slate-800 border-orange-500 text-white"
            : "border-transparent text-slate-400 hover:text-white hover:bg-slate-800/50"
        }`}
    >
      <span className={active ? "text-orange-500" : "text-slate-500"}>
        {icon}
      </span>
      {label}
    </button>
  );
}
