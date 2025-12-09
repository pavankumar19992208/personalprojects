import React, { useState } from "react";
import { AlertTriangle, Book, Link2, FileText, ArrowRight } from "lucide-react";
import { AmazonPrepGuide } from "./AmazonPrepGuide";

export const Resources: React.FC = () => {
  const [showGuide, setShowGuide] = useState(false);

  if (showGuide) {
    return <AmazonPrepGuide onBack={() => setShowGuide(false)} />;
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
        Intel Database
      </h1>

      {/* Featured Guide Card */}
      <div
        onClick={() => setShowGuide(true)}
        className="mb-8 group cursor-pointer relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 p-1 shadow-lg transition-all hover:shadow-orange-500/20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 transition-opacity group-hover:opacity-10" />
        <div className="relative flex items-center justify-between rounded-lg bg-slate-900 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-orange-500/10 p-3 text-orange-500">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                Amazon SDE-1 Hiring Protocol (2025)
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Comprehensive audit of the interview loop, hidden curriculum,
                and gap analysis.
              </p>
            </div>
          </div>
          <ArrowRight className="text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-orange-400" />
        </div>
      </div>

      <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-6 shadow-sm dark:shadow-none">
        <div className="flex gap-4">
          <AlertTriangle className="text-red-600 dark:text-red-500 shrink-0" />
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold mb-2">
              The 2025 "Worst Case" Scenario
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Standard LeetCode patterns are no longer sufficient. To pass the
              2025 loop, you must demonstrate competency in{" "}
              <strong className="text-orange-600 dark:text-orange-400">
                Low-Level Design (LLD)
              </strong>{" "}
              and{" "}
              <strong className="text-orange-600 dark:text-orange-400">
                Leadership Principles
              </strong>
              . Do not skip the "Hidden Curriculum".
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded border border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-bold text-cyan-600 dark:text-cyan-400 mb-2 flex items-center gap-2">
              <Book size={14} /> Cheat Sheets
            </h4>
            <ul className="text-xs text-slate-600 dark:text-slate-500 space-y-2">
              <li className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">
                • Refactoring.guru (Design Patterns)
              </li>
              <li className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">
                • System Design Primer (GitHub)
              </li>
              <li className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">
                • Amazon LP Questions List
              </li>
            </ul>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded border border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-bold text-orange-600 dark:text-orange-400 mb-2 flex items-center gap-2">
              <Link2 size={14} /> Critical Links
            </h4>
            <ul className="text-xs text-slate-600 dark:text-slate-500 space-y-2">
              <li className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">
                • LeetCode: Top Amazon Questions
              </li>
              <li className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">
                • Blind: Amazon 2025 Interview Trends
              </li>
              <li className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">
                • NeetCode.io (Roadmap)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
