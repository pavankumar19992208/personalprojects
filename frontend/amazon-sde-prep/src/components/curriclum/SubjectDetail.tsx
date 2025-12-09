import React from "react";
import { ChevronRight, BookOpen, AlertTriangle } from "lucide-react";
import type { Topic } from "../../../types";
import { NetworkIntelBoard } from "../visuals/NetworkIntelBoard";
import { OSIntelBoard } from "../visuals/OSIntelBoard";
import { DBMSIntelBoard } from "../visuals/DBMSIntelBoard";

interface SubjectDetailProps {
  topic: Topic;
  onBack: () => void;
}

export const SubjectDetail: React.FC<SubjectDetailProps> = ({
  topic,
  onBack,
}) => {
  const isNetworkTopic = topic.id === "cs-net";
  const isOSTopic = topic.id === "cs-os";
  const isDBMSTopic = topic.id === "cs-dbms";

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 animate-in slide-in-from-right duration-300 overflow-hidden">
      {/* Header - Fixed */}
      <div className="bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 p-6 flex items-center gap-4 z-20 backdrop-blur-md flex-none">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ChevronRight className="rotate-180" size={20} />
          Back
        </button>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {topic.title}
        </h1>
      </div>

      {/* CONDITIONAL RENDER */}
      {isNetworkTopic ? (
        <div className="flex-1 overflow-y-auto">
          <NetworkIntelBoard />
        </div>
      ) : isOSTopic ? (
        <div className="flex-1 overflow-y-auto">
          <OSIntelBoard />
        </div>
      ) : isDBMSTopic ? (
        <div className="flex-1 overflow-y-auto">
          <DBMSIntelBoard />
        </div>
      ) : (
        /* STANDARD LAYOUT FOR OTHER SUBJECTS (DBMS, LLD) */
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-3 pb-24 sm:pb-0">
          {/* LEFT COL: IMPORTANCE & INFO */}
          <div className="lg:col-span-1 h-full overflow-y-auto p-6 space-y-6 border-r border-slate-200 dark:border-slate-800">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-none">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="text-orange-500" size={20} />
                Why Amazon Asks This
              </h3>
              <div className="prose prose-slate dark:prose-invert text-sm text-slate-600 dark:text-slate-300">
                {topic.explanation.split("\n").map((line, i) => (
                  <p key={i}>{line.replace("###", "")}</p>
                ))}
              </div>
            </div>

            <div className="bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <h4 className="text-sm font-mono text-slate-500 uppercase mb-2">
                Frequency
              </h4>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {topic.frequency}
              </p>
            </div>
          </div>

          {/* RIGHT COL: SUB-TOPICS LIST */}
          <div className="lg:col-span-2 h-full overflow-y-auto p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <BookOpen
                className="text-cyan-600 dark:text-cyan-400"
                size={24}
              />
              Core Concepts & Sub-Topics
            </h3>

            <div className="space-y-4">
              {topic.subTopics?.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl hover:border-cyan-500/50 transition-all group cursor-pointer shadow-sm dark:shadow-none"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {sub.title}
                    </h4>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-1 rounded-sm ${
                        sub.priority === "Critical"
                          ? "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400"
                          : sub.priority === "High"
                          ? "bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {sub.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {sub.desc}
                  </p>
                </div>
              ))}

              {!topic.subTopics && (
                <div className="text-slate-500 italic">
                  No sub-topics defined for this module.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
