import React, { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Topic, ProgressState } from "../../../types";
import { CURRICULUM } from "../../../data/curriculum";

interface CurriculumBoardProps {
  progress: ProgressState;
  onSelectTopic: (topic: Topic) => void;
  scrollToPhase?: string | null;
}

export const CurriculumBoard: React.FC<CurriculumBoardProps> = ({
  progress,
  onSelectTopic,
  scrollToPhase,
}) => {
  useEffect(() => {
    if (scrollToPhase) {
      const element = document.getElementById(scrollToPhase);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [scrollToPhase]);

  const handleTopicClick = (topic: Topic) => {
    // Request full screen if not already in full screen
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    }
    onSelectTopic(topic);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in zoom-in-95 pb-20 sm:pb-0">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Quest Board
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Select a module to enter the Simulation.
        </p>
      </header>

      {Object.values(CURRICULUM).map((phase) => (
        <div key={phase.id} id={phase.id} className="scroll-mt-8">
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`h-px flex-1 ${
                phase.id === "phase-4"
                  ? "bg-purple-200 dark:bg-purple-900"
                  : "bg-slate-200 dark:bg-slate-800"
              }`}
            />
            <h2 className="text-xl font-mono uppercase tracking-widest text-slate-600 dark:text-slate-300 flex items-center gap-2">
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
                phase.id === "phase-4"
                  ? "bg-purple-200 dark:bg-purple-900"
                  : "bg-slate-200 dark:bg-slate-800"
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
                onClick={() => handleTopicClick(topic)}
                className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500/50 p-5 rounded-xl cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-900/10 dark:hover:shadow-orange-900/10 shadow-sm dark:shadow-none"
              >
                <div className="absolute top-4 right-4">
                  {progress[topic.id] ? (
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white dark:text-slate-900">
                      <CheckCircle2 size={14} />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700" />
                  )}
                </div>

                <div className="mb-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${
                      topic.difficulty === "Hard" ||
                      topic.priority === "Critical"
                        ? "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400"
                        : "bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400"
                    }`}
                  >
                    {topic.priority}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
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
