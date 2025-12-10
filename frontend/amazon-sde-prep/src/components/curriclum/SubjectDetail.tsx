import React from "react";
import {
  ChevronLeft,
  CheckCircle2,
  Circle,
  BookOpen,
  AlertTriangle,
  TrendingUp,
  Bot,
  Copy,
} from "lucide-react";
import type { Topic } from "../../../types";
import { NetworkIntelBoard } from "../visuals/NetworkIntelBoard";
import { OSIntelBoard } from "../visuals/OSIntelBoard";
import { DBMSIntelBoard } from "../visuals/DBMSIntelBoard";
import { OOPGuide } from "./lldtopics/OOPGuide";
import { DesignFundamentalsGuide } from "./lldtopics/DesignFundamentalsGuide";
import { SOLIDGuide } from "./lldtopics/SOLIDGuide";
import { CreationalPatternsGuide } from "./lldtopics/CreationalPatternsGuide";

interface SubjectDetailProps {
  topic: Topic;
  isCompleted: boolean;
  onToggleComplete: () => void;
  initialPage?: number;
  onPageChange?: (page: number) => void;
  onBack: () => void;
}

export const SubjectDetail: React.FC<SubjectDetailProps> = ({
  topic,
  isCompleted,
  onToggleComplete,
  initialPage,
  onPageChange,
  onBack,
}) => {
  const isNetworkTopic = topic.id === "cs-net";
  const isOSTopic = topic.id === "cs-os";
  const isDBMSTopic = topic.id === "cs-dbms";
  const isOOP = topic.id === "lld-oop";
  const isDesignFundamentals = topic.id === "lld-fundamentals";
  const isSOLID = topic.id === "lld-solid";
  const isInteractiveGuide =
    isOOP || isNetworkTopic || isOSTopic || isDBMSTopic;
  const isCreational = topic.id === "lld-creational";

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 animate-in fade-in overflow-hidden">
      {/* Header - Fixed at top */}
      <div className="bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 p-6 flex justify-between items-center z-20 backdrop-blur flex-none">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500 hover:text-slate-900 dark:hover:text-white"
            title="Back to Board"
          >
            <ChevronLeft size={24} />
          </button>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                  topic.phase === "DSA"
                    ? "bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                    : topic.phase === "LLD"
                    ? "bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400"
                    : topic.phase === "Behavioral"
                    ? "bg-pink-100 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400"
                    : "bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400"
                }`}
              >
                {topic.phase}
              </span>
              <span className="text-xs text-slate-500">
                • {topic.difficulty}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {topic.title}
              {isCompleted && (
                <CheckCircle2 className="text-green-500" size={20} />
              )}
            </h2>
          </div>
        </div>

        <button
          onClick={onToggleComplete}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            isCompleted
              ? "bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/50"
              : "bg-orange-600 text-white hover:bg-orange-500"
          }`}
        >
          {isCompleted ? <CheckCircle2 size={16} /> : <Circle size={16} />}
          {isCompleted ? "COMPLETED" : "MARK COMPLETE"}
        </button>
      </div>

      {/* Content Area - Grid Layout */}
      <div className="flex-1 overflow-y-auto lg:overflow-hidden lg:grid lg:grid-cols-3 pb-20 sm:pb-0">
        {/* LEFT COLUMN: EXPLANATION / GUIDE */}
        <div
          className={`lg:col-span-2 lg:h-full p-4 sm:p-8 border-r border-slate-200 dark:border-slate-800 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800 ${
            isInteractiveGuide
              ? "lg:overflow-hidden flex flex-col"
              : "lg:overflow-y-auto"
          }`}
        >
          {isOOP ? (
            <OOPGuide
              initialPage={initialPage || 0}
              onPageChange={onPageChange}
              onComplete={() => {
                if (!isCompleted) onToggleComplete();
                setTimeout(() => {
                  onBack();
                }, 1000);
              }}
            />
          ) : isDesignFundamentals ? (
            <DesignFundamentalsGuide
              initialPage={initialPage || 0}
              onPageChange={onPageChange}
              onComplete={() => {
                if (!isCompleted) onToggleComplete();
                setTimeout(() => {
                  onBack();
                }, 1000);
              }}
            />
          ) : isSOLID ? (
            <SOLIDGuide
              initialPage={initialPage || 0}
              onPageChange={onPageChange}
              onComplete={() => {
                if (!isCompleted) onToggleComplete();
                setTimeout(() => {
                  onBack();
                }, 1000);
              }}
            />
          ) : isCreational ? (
            <CreationalPatternsGuide
              initialPage={initialPage || 0}
              onPageChange={onPageChange}
              onComplete={() => {
                if (!isCompleted) onToggleComplete();
                setTimeout(() => {
                  onBack();
                }, 1000);
              }}
            />
          ) : isNetworkTopic ? (
            <NetworkIntelBoard />
          ) : isOSTopic ? (
            <OSIntelBoard />
          ) : isDBMSTopic ? (
            <DBMSIntelBoard />
          ) : (
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
                <AlertTriangle className="text-orange-500" size={24} />
                How Amazon Assesses This
              </h3>
              <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {topic.explanation.split("\n").map((line, i) => {
                  if (line.trim().startsWith("###"))
                    return (
                      <h4
                        key={i}
                        className="text-lg font-bold mt-8 mb-3 text-slate-900 dark:text-white border-l-4 border-orange-500 pl-3"
                      >
                        {line.replace("###", "")}
                      </h4>
                    );
                  if (line.trim().startsWith("*"))
                    return (
                      <li
                        key={i}
                        className="ml-4 text-slate-600 dark:text-slate-300 list-disc marker:text-orange-500 mb-2"
                      >
                        {line.replace("*", "")}
                      </li>
                    );
                  return (
                    <p key={i} className="mb-3">
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: STATS & METRICS */}
        <div className="lg:col-span-1 lg:h-full bg-slate-50 dark:bg-slate-900/30 lg:overflow-y-auto p-6 space-y-6 border-t lg:border-t-0 border-slate-200 dark:border-slate-800">
          {/* Frequency Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
            <h4 className="text-xs font-mono text-slate-500 uppercase mb-4">
              Amazon Frequency
            </h4>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-xl mb-1">
              <TrendingUp size={20} />
              {topic.frequency}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {topic.priority === "Critical"
                ? "High failure rate topic. Critical for L4/L5."
                : "Standard interview topic."}
            </p>
          </div>

          {/* Subtopics / Core Concepts */}
          <div>
            <h4 className="flex items-center gap-2 text-slate-900 dark:text-white font-bold mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
              <BookOpen size={16} className="text-cyan-500" />
              Core Concepts
            </h4>
            <div className="space-y-3">
              {topic.subTopics?.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-lg hover:border-cyan-500/50 transition-all group shadow-sm"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {sub.title}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                        sub.priority === "Critical"
                          ? "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {sub.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {sub.desc}
                  </p>
                </div>
              ))}
              {!topic.subTopics && (
                <div className="text-xs text-slate-400 italic text-center py-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
                  No sub-topics defined.
                </div>
              )}
            </div>
          </div>

          {/* AI Prompt */}
          {topic.prompt && (
            <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-mono text-sm mb-2">
                <Bot size={16} /> AI PROMPT
              </div>
              <div className="bg-white dark:bg-black/50 p-3 rounded text-slate-600 dark:text-slate-400 font-mono text-xs mb-3 border border-slate-200 dark:border-transparent">
                {topic.prompt}
              </div>
              <button className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Copy size={12} /> Copy to Clipboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
