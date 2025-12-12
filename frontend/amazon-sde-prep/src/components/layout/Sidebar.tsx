import React, { useState, useEffect } from "react";
import {
  Terminal,
  Layout,
  BrainCircuit,
  Database,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";
import type { UserSettings } from "../../../types";
import { useTheme } from "../../context/ThemeContext";

interface SidebarProps {
  user: UserSettings;
  activeView: "dashboard" | "curriculum" | "resources";
  setActiveView: (view: "dashboard" | "curriculum" | "resources") => void;
  percentage: number;
  shouldCollapse?: boolean;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  activeView,
  setActiveView,
  percentage,
  shouldCollapse = false,
  onLogout,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme, toggleTheme } = useTheme();

  // Auto-collapse effect
  useEffect(() => {
    if (shouldCollapse && !isMobile) {
      setIsCollapsed(true);
    }
  }, [shouldCollapse, isMobile]);

  // Handle resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll for mobile nav visibility
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowMobileNav(false); // Scrolling down
      } else {
        setShowMobileNav(true); // Scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, lastScrollY]);

  // --- MOBILE BOTTOM NAV ---
  if (isMobile) {
    return (
      <>
        {/* Mobile Theme Toggle (Floating) */}
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <button
            onClick={onLogout}
            className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 text-red-600 dark:text-red-400"
          >
            <LogOut size={20} />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <nav
          className={`fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-50 transition-transform duration-300 ease-in-out ${
            showMobileNav ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* Progress Bar (Top of Nav) */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-orange-600 to-yellow-400 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex justify-around items-center py-2">
            <MobileNavButton
              active={activeView === "dashboard"}
              onClick={() => setActiveView("dashboard")}
              icon={<Layout size={20} />}
              label="Command"
            />
            <MobileNavButton
              active={activeView === "curriculum"}
              onClick={() => setActiveView("curriculum")}
              icon={<BrainCircuit size={20} />}
              label="Quest"
            />
            <MobileNavButton
              active={activeView === "resources"}
              onClick={() => setActiveView("resources")}
              icon={<Database size={20} />}
              label="Intel"
            />
          </div>
        </nav>
      </>
    );
  }

  // --- DESKTOP SIDEBAR ---
  return (
    <nav
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-10 transition-all duration-300 relative h-screen sticky top-0`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 rounded-full p-1 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors z-50 shadow-lg"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 overflow-hidden whitespace-nowrap flex-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-orange-600 dark:text-orange-500 font-bold text-xl tracking-wider">
            <Terminal size={24} className="shrink-0" />
            <span
              className={`transition-opacity duration-200 ${
                isCollapsed ? "opacity-0 w-0" : "opacity-100"
              }`}
            >
              SDE:PREP
            </span>
          </div>
          {/* Desktop Theme & Logout Toggle */}
          {!isCollapsed && (
            <div className="flex items-center gap-1">
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
                title="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold shrink-0 border border-slate-200 dark:border-slate-700">
            {user.name.charAt(0)}
          </div>
          <div
            className={`transition-opacity duration-200 ${
              isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
            }`}
          >
            <p className="text-xs text-slate-500 uppercase">Operative</p>
            <p className="text-sm font-medium text-slate-900 dark:text-white truncate w-32">
              {user.name}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 space-y-1 overflow-y-auto scrollbar-none">
        <NavButton
          active={activeView === "dashboard"}
          onClick={() => setActiveView("dashboard")}
          icon={<Layout size={18} />}
          label="Command Center"
          collapsed={isCollapsed}
        />
        <NavButton
          active={activeView === "curriculum"}
          onClick={() => setActiveView("curriculum")}
          icon={<BrainCircuit size={18} />}
          label="Quest Board"
          collapsed={isCollapsed}
        />
        <NavButton
          active={activeView === "resources"}
          onClick={() => setActiveView("resources")}
          icon={<Database size={18} />}
          label="Intel Database"
          collapsed={isCollapsed}
        />
      </div>

      {/* Footer / Progress */}
      <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden flex-none">
        <div
          className={`flex justify-between mb-2 text-xs font-mono transition-opacity duration-200 ${
            isCollapsed ? "opacity-0 hidden" : "opacity-100"
          }`}
        >
          <span className="text-slate-500">SYS.READY</span>
          <span className="text-orange-600 dark:text-orange-400">
            {percentage}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-600 to-yellow-400 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        {isCollapsed && (
          <div className="mt-2 text-[10px] text-center text-orange-600 dark:text-orange-400 font-mono">
            {percentage}%
          </div>
        )}
        {/* Collapsed Theme & Logout Toggle */}
        {isCollapsed && (
          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={toggleTheme}
              className="w-full flex justify-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={onLogout}
              className="w-full flex justify-center p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

function NavButton({
  active,
  onClick,
  icon,
  label,
  collapsed,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={`w-full flex items-center ${
        collapsed ? "justify-center px-0" : "gap-3 px-6"
      } py-3 text-sm font-medium transition-all duration-200 border-l-2
        ${
          active
            ? "bg-slate-100 dark:bg-slate-800 border-orange-500 text-slate-900 dark:text-white"
            : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
        }`}
    >
      <span
        className={
          active
            ? "text-orange-600 dark:text-orange-500"
            : "text-slate-400 dark:text-slate-500"
        }
      >
        {icon}
      </span>
      <span
        className={`whitespace-nowrap transition-all duration-200 ${
          collapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

function MobileNavButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 p-1 rounded-lg transition-all duration-200
        ${
          active
            ? "text-orange-600 dark:text-orange-500"
            : "text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
        }`}
    >
      <div
        className={`p-1 rounded-full transition-all ${
          active
            ? "bg-slate-100 dark:bg-slate-800 shadow-lg shadow-orange-500/20"
            : ""
        }`}
      >
        {icon}
      </div>
      <span className="text-[10px] font-medium tracking-wide">{label}</span>
    </button>
  );
}
