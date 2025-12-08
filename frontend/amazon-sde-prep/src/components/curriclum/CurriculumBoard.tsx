import React from "react";
import { CheckCircle2 } from "lucide-react";
import type { Topic, ProgressState } from "../../../types";
import { CURRICULUM } from "../../../data/curriculum";

interface CurriculumBoardProps {
  progress: ProgressState;
  onSelectTopic: (topic: Topic) => void;
}

export const CurriculumBoard: React.FC<CurriculumBoardProps> = ({
  progress,
  onSelectTopic,
}) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in zoom-in-95">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Quest Board</h1>
        <p className="text-slate-400">
          Select a module to enter the Simulation.
        </p>
      </header>

      {Object.values(CURRICULUM).map((phase) => (
        <div key={phase.id}>
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`h-px flex-1 ${
                phase.id === "phase-4" ? "bg-purple-900" : "bg-slate-800"
              }`}
            />
            <h2 className="text-xl font-mono uppercase tracking-widest text-slate-300 flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  phase.id === "phase-4"
                    ? "bg-purple-500"
                    : phase.id === "phase-2"
                    ? "bg-cyan-500"
                    : "bg-orange-500"
                }`}
              />
              {phase.title}
            </h2>
            <div
              className={`h-px flex-1 ${
                phase.id === "phase-4" ? "bg-purple-900" : "bg-slate-800"
              }`}
            />
          </div>

          <p className="text-xs text-slate-500 mb-4 text-center">
            {phase.desc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {phase.topics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => onSelectTopic(topic)}
                className="group relative bg-slate-900 border border-slate-800 hover:border-orange-500/50 p-5 rounded-xl cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-900/10"
              >
                <div className="absolute top-4 right-4">
                  {progress[topic.id] ? (
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-slate-900">
                      <CheckCircle2 size={14} />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-700" />
                  )}
                </div>

                <div className="mb-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${
                      topic.difficulty === "Hard" ||
                      topic.priority === "Critical"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-cyan-500/20 text-cyan-400"
                    }`}
                  >
                    {topic.priority}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-100 group-hover:text-orange-400 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                  {topic.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
