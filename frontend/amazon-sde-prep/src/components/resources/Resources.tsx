import React from "react";
import { AlertTriangle, Book, Link2 } from "lucide-react";

export const Resources: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Intel Database</h1>
      <div className="p-8 bg-slate-900 border border-slate-800 rounded-xl space-y-6">
        <div className="flex gap-4">
          <AlertTriangle className="text-red-500 shrink-0" />
          <div>
            <h3 className="text-white font-bold mb-2">
              The 2025 "Worst Case" Scenario
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Standard LeetCode patterns are no longer sufficient. To pass the
              2025 loop, you must demonstrate competency in{" "}
              <strong className="text-orange-400">
                Low-Level Design (LLD)
              </strong>{" "}
              and{" "}
              <strong className="text-orange-400">Leadership Principles</strong>
              . Do not skip the "Hidden Curriculum".
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-slate-950 p-4 rounded border border-slate-800">
            <h4 className="text-sm font-bold text-cyan-400 mb-2 flex items-center gap-2">
              <Book size={14} /> Cheat Sheets
            </h4>
            <ul className="text-xs text-slate-500 space-y-2">
              <li className="hover:text-white cursor-pointer transition-colors">
                • Refactoring.guru (Design Patterns)
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                • System Design Primer (GitHub)
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                • Amazon LP Questions List
              </li>
            </ul>
          </div>
          <div className="bg-slate-900 p-4 rounded border border-slate-800">
            <h4 className="text-sm font-bold text-orange-400 mb-2 flex items-center gap-2">
              <Link2 size={14} /> Critical Links
            </h4>
            <ul className="text-xs text-slate-500 space-y-2">
              <li className="hover:text-white cursor-pointer transition-colors">
                • LeetCode: Top Amazon Questions
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                • Blind: Amazon 2025 Interview Trends
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                • NeetCode.io (Roadmap)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
