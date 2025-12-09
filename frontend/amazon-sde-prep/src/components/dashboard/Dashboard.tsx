import React from "react";
import { Activity, BarChart3, Clock, Shield, Target, Zap } from "lucide-react";
import type { UserSettings, ProgressState } from "../../../types";
import { CURRICULUM } from "../../../data/curriculum";

interface DashboardProps {
  user: UserSettings;
  progress: ProgressState;
  pace: {
    daysLeft: number;
    unitsPerDay: string;
    status: string;
    color: string;
  };
  completedCount: number;
}

// Helper for Tailwind dynamic colors
const COLOR_STYLES: Record<string, any> = {
  cyan: {
    bg: "bg-cyan-500",
    bgSoft: "bg-cyan-100 dark:bg-cyan-500/10",
    text: "text-cyan-600 dark:text-cyan-400",
  },
  red: {
    bg: "bg-red-500",
    bgSoft: "bg-red-100 dark:bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
  },
  orange: {
    bg: "bg-orange-500",
    bgSoft: "bg-orange-100 dark:bg-orange-500/10",
    text: "text-orange-600 dark:text-orange-400",
  },
  green: {
    bg: "bg-green-500",
    bgSoft: "bg-green-100 dark:bg-green-500/10",
    text: "text-green-600 dark:text-green-400",
  },
};

/**
 * STAT CARD COMPONENT
 */
const StatCard = ({ title, value, icon, color, desc, subValue }: any) => {
  const styles = COLOR_STYLES[color] || COLOR_STYLES.cyan;

  return (
    <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 rounded-xl backdrop-blur-sm relative overflow-hidden group transition-all hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none">
      {/* Colored Accent Strip */}
      <div className={`absolute top-0 left-0 w-1 h-full ${styles.bg}`} />

      <div className="flex justify-between items-start mb-2 sm:mb-4">
        <div>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium uppercase tracking-wide">
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            {value}
            {subValue && (
              <span className="text-xs sm:text-sm font-normal text-slate-500 ml-1 sm:ml-2">
                {subValue}
              </span>
            )}
          </h3>
        </div>
        {/* Icon Container */}
        <div className={`p-1.5 sm:p-2 rounded-lg ${styles.bgSoft}`}>
          {React.cloneElement(icon, {
            className: styles.text,
            size: 16,
          })}
        </div>
      </div>

      {/* Description Footer */}
      {desc && (
        <p className="text-[10px] sm:text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-2 sm:pt-3 mt-1 sm:mt-2">
          {desc}
        </p>
      )}
    </div>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  progress,
  pace,
  completedCount,
}) => {
  // Determine color for Pace card based on status
  const getPaceColor = () => {
    if (pace.status === "SUICIDE MISSION") return "red";
    if (pace.status === "AGGRESSIVE") return "orange";
    return "green";
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-in slide-in-from-bottom-4 pb-20 sm:pb-0">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1 sm:mb-2">
            Mission Control
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            Target: Amazon SDE-1 • Date: {user.targetDate}
          </p>
        </div>
        <div className="text-left sm:text-right w-full sm:w-auto bg-slate-100 dark:bg-slate-900/50 sm:bg-transparent p-3 sm:p-0 rounded-lg sm:rounded-none border border-slate-200 dark:border-slate-800 sm:border-none">
          <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest mb-1">
            Schedule Status
          </p>
          <div
            className={`text-lg sm:text-xl font-black ${pace.color} flex items-center gap-2 justify-start sm:justify-end`}
          >
            <Activity size={18} className="sm:w-5 sm:h-5" /> {pace.status}
          </div>
        </div>
      </header>

      {/* STAT CARDS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Days Left"
          value={pace.daysLeft}
          icon={<Clock />}
          color="cyan"
        />
        <StatCard
          title="Pace"
          value={pace.unitsPerDay}
          subValue="/day"
          icon={<Zap />}
          color={getPaceColor()}
        />
        <StatCard
          title="Gap"
          value="High"
          desc="Hard Graphs"
          icon={<Shield />}
          color="red"
        />
        <StatCard
          title="Mastery"
          value={completedCount}
          icon={<Target />}
          color="green"
        />
      </div>

      {/* PHASE PROGRESS SECTION */}
      <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 backdrop-blur-sm shadow-sm dark:shadow-none">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
          <BarChart3 className="text-orange-500 w-5 h-5 sm:w-6 sm:h-6" />
          Phase Progress
        </h3>
        <div className="space-y-4 sm:space-y-6">
          {Object.values(CURRICULUM).map((phase) => {
            const phaseTotal = phase.topics.length;
            const phaseDone = phase.topics.filter((t) => progress[t.id]).length;
            const phasePercent =
              Math.round((phaseDone / phaseTotal) * 100) || 0;

            return (
              <div key={phase.id}>
                <div className="flex justify-between mb-1 sm:mb-2 text-xs sm:text-sm">
                  <span className="text-slate-600 dark:text-slate-300 font-medium truncate pr-2">
                    {phase.title}
                  </span>
                  <span className="text-slate-500 whitespace-nowrap">
                    {phaseDone}/{phaseTotal}
                  </span>
                </div>
                <div className="h-1.5 sm:h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      phase.id === "phase-4"
                        ? "bg-purple-500"
                        : phase.id === "phase-2"
                        ? "bg-cyan-500"
                        : "bg-orange-500"
                    }`}
                    style={{ width: `${phasePercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
