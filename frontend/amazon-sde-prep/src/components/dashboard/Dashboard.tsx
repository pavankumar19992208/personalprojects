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
    bgSoft: "bg-cyan-500/10",
    text: "text-cyan-400",
  },
  red: {
    bg: "bg-red-500",
    bgSoft: "bg-red-500/10",
    text: "text-red-400",
  },
  orange: {
    bg: "bg-orange-500",
    bgSoft: "bg-orange-500/10",
    text: "text-orange-400",
  },
  green: {
    bg: "bg-green-500",
    bgSoft: "bg-green-500/10",
    text: "text-green-400",
  },
};

/**
 * STAT CARD COMPONENT
 * Implements the "Glass Panel" design with colored accent strips.
 */
const StatCard = ({ title, value, icon, color, desc, subValue }: any) => {
  const styles = COLOR_STYLES[color] || COLOR_STYLES.cyan;

  return (
    <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl backdrop-blur-sm relative overflow-hidden group transition-all hover:border-slate-700">
      {/* Colored Accent Strip */}
      <div className={`absolute top-0 left-0 w-1 h-full ${styles.bg}`} />

      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-white mt-1">
            {value}
            {subValue && (
              <span className="text-sm font-normal text-slate-500 ml-2">
                {subValue}
              </span>
            )}
          </h3>
        </div>
        {/* Icon Container */}
        <div className={`p-2 rounded-lg ${styles.bgSoft}`}>
          {React.cloneElement(icon, { className: styles.text, size: 20 })}
        </div>
      </div>

      {/* Description Footer */}
      {desc && (
        <p className="text-xs text-slate-500 border-t border-slate-800 pt-3 mt-2">
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
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-4">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Mission Control
          </h1>
          <p className="text-slate-400">
            Target: Amazon SDE-1 • Date: {user.targetDate}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">
            Schedule Status
          </p>
          <div
            className={`text-xl font-black ${pace.color} flex items-center gap-2 justify-end`}
          >
            <Activity size={20} /> {pace.status}
          </div>
        </div>
      </header>

      {/* STAT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Days Remaining"
          value={pace.daysLeft}
          icon={<Clock />}
          color="cyan"
        />
        <StatCard
          title="Required Pace"
          value={pace.unitsPerDay}
          subValue="topics/day"
          icon={<Zap />}
          color={getPaceColor()}
        />
        <StatCard
          title="Gap Analysis"
          value="Critical"
          desc="Focus: Hard Graphs"
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
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="text-orange-500" size={20} />
          Phase Progress
        </h3>
        <div className="space-y-6">
          {Object.values(CURRICULUM).map((phase) => {
            const phaseTotal = phase.topics.length;
            const phaseDone = phase.topics.filter((t) => progress[t.id]).length;
            const phasePercent =
              Math.round((phaseDone / phaseTotal) * 100) || 0;

            return (
              <div key={phase.id}>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-slate-300 font-medium">
                    {phase.title}
                  </span>
                  <span className="text-slate-500">
                    {phaseDone}/{phaseTotal}
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
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
