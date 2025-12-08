import React, { useState } from "react";
import {
  Terminal,
  User,
  Calendar,
  ChevronRight,
  Briefcase,
} from "lucide-react";
import type { UserSettings } from "../../../types";

interface LoginScreenProps {
  onLogin: (settings: UserSettings) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [experience, setExperience] =
    useState<UserSettings["experienceLevel"]>("New Grad");

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-slate-950 to-slate-950" />
      <div className="relative z-10 w-full max-w-md p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Terminal size={32} className="text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          SDE-1 MASTERY
        </h1>
        <p className="text-center text-slate-400 mb-8">
          Amazon Interview Protocol v2025
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              CANDIDATE_ID
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-3 text-slate-600"
                size={18}
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 pl-10 pr-4 text-white focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              EXPERIENCE_LEVEL
            </label>
            <div className="relative">
              <Briefcase
                className="absolute left-3 top-3 text-slate-600"
                size={18}
              />
              <select
                value={experience}
                onChange={(e) =>
                  setExperience(
                    e.target.value as UserSettings["experienceLevel"]
                  )
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 pl-10 pr-4 text-white focus:border-orange-500 focus:outline-none transition-colors appearance-none"
              >
                <option value="Intern">Intern (SDE Intern)</option>
                <option value="New Grad">New Grad (SDE-1)</option>
                <option value="Experienced">Experienced (SDE-1/2)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              TARGET_INTERVIEW_DATE
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-3 top-3 text-slate-600"
                size={18}
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 pl-10 pr-4 text-white focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            onClick={() => {
              if (name && date)
                onLogin({
                  name,
                  targetDate: date,
                  experienceLevel: experience,
                });
            }}
            disabled={!name || !date}
            className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-4 group"
          >
            INITIALIZE_SYSTEM
            <ChevronRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
