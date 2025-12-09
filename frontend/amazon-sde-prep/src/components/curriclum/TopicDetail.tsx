import React from "react";
import {
  CheckCircle2,
  Circle,
  Bot,
  Copy,
  TrendingUp,
  Code,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import type { Topic } from "../../../types";
import {
  SlidingWindowVisual,
  GraphVisual,
  LLDParkingVisual,
  StarMethodVisual,
  HeapVisual,
  DbVisual,
  NetworkVisual,
} from "../visuals/TopicVisuals";
import { ArraysHashingGuide } from "./dsatopics/ArraysHashingGuide";
import { SlidingWindowGuide } from "./dsatopics/SlidingWindowGuide";
import TwoPointersGuide from "./dsatopics/TwoPointersGuide";
import BinarySearchGuide from "./dsatopics/BinarySearchGuide";
import LinkedListGuide from "./dsatopics/LinkedListGuide";
import TreeGuide from "./dsatopics/TreeGuide";
import GraphGuide from "./dsatopics/GraphGuide";
import HeapGuide from "./dsatopics/HeapGuide";
import DPGuide from "./dsatopics/DPGuide";
import TrieGuide from "./dsatopics/TrieGuide";

interface TopicDetailProps {
  topic: Topic;
  isCompleted: boolean;
  onToggleComplete: () => void;
  initialPage?: number; // <--- Added
  onPageChange?: (page: number) => void; // <--- Added
}

export const TopicDetail: React.FC<TopicDetailProps> = ({
  topic,
  isCompleted,
  onToggleComplete,
  initialPage, // <--- Destructured
  onPageChange, // <--- Destructured
}) => {
  const renderVisual = () => {
    switch (topic.visualType) {
      case "window":
        return <SlidingWindowVisual />;
      case "graph":
        return <GraphVisual />;
      case "lld-parking":
        return <LLDParkingVisual />;
      case "star-method":
        return <StarMethodVisual />;
      case "heap":
        return <HeapVisual />;
      case "db":
        return <DbVisual />;
      case "network":
        return <NetworkVisual />;
      case "os":
        return <DbVisual />;
      default:
        return null;
    }
  };

  // Special case for Arrays & Hashing to show the full guide
  const isArraysHashing = topic.title === "Arrays & Hashing";
  const isSlidingWindow = topic.title.includes("Sliding Window");
  const isTwoPointers = topic.title.includes("Two Pointers");
  const isBinarySearch = topic.title.includes("Binary Search");
  const isLinkedList = topic.title.includes("Linked Lists");
  const isTree = topic.title.includes("Trees");
  const isGraph = topic.title.includes("Graphs: Basics");
  const isHeap = topic.title.includes("Heaps / Priority Queue");
  const isDP = topic.title.includes("Dynamic Programming");
  const isTrie = topic.title.includes("Tries & Union-Find");

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 animate-in fade-in overflow-hidden">
      {/* Header - Fixed at top */}
      <div className="bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 p-6 flex justify-between items-center z-20 backdrop-blur flex-none">
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
            <span className="text-xs text-slate-500">• {topic.difficulty}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {topic.title}
            {isCompleted && (
              <CheckCircle2 className="text-green-500" size={20} />
            )}
          </h2>
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

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto lg:overflow-hidden lg:grid lg:grid-cols-3 pb-20 sm:pb-0">
        {/* LEFT COLUMN: EXPLANATION */}
        <div className="lg:col-span-2 lg:h-full lg:overflow-y-auto p-4 sm:p-8 border-r border-slate-200 dark:border-slate-800 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800">
          {isArraysHashing ? (
            <ArraysHashingGuide
              initialPage={initialPage}
              onPageChange={onPageChange}
            />
          ) : isSlidingWindow ? (
            <SlidingWindowGuide />
          ) : isTwoPointers ? (
            <TwoPointersGuide />
          ) : isBinarySearch ? (
            <BinarySearchGuide />
          ) : isLinkedList ? (
            <LinkedListGuide />
          ) : isTree ? (
            <TreeGuide />
          ) : isGraph ? (
            <GraphGuide />
          ) : isHeap ? (
            <HeapGuide />
          ) : isDP ? (
            <DPGuide />
          ) : isTrie ? (
            <TrieGuide />
          ) : (
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {renderVisual()}

              <div className="whitespace-pre-wrap text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                {topic.explanation.split("\n").map((line, i) => {
                  if (line.trim().startsWith("###"))
                    return (
                      <h3
                        key={i}
                        className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4 border-l-4 border-orange-500 pl-3"
                      >
                        {line.replace("###", "")}
                      </h3>
                    );
                  if (line.trim().startsWith("*"))
                    return (
                      <li
                        key={i}
                        className="ml-4 text-slate-600 dark:text-slate-300 list-disc marker:text-orange-500"
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

              <div className="mt-8 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
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
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: PROBLEMS & METRICS */}
        <div className="lg:col-span-1 lg:h-full bg-slate-50 dark:bg-slate-900/30 lg:overflow-y-auto p-6 space-y-6 border-t lg:border-t-0 border-slate-200 dark:border-slate-800">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm dark:shadow-none">
            <h4 className="text-xs font-mono text-slate-500 uppercase mb-4">
              Amazon Frequency
            </h4>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-xl mb-1">
              <TrendingUp size={20} />
              {topic.frequency}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {topic.priority === "Critical"
                ? "Failure here usually means immediate rejection."
                : "Commonly asked in Rounds 1 & 2."}
            </p>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-slate-900 dark:text-white font-bold mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
              <Code size={16} className="text-orange-500" />
              Practice Lab
            </h4>
            <div className="space-y-3">
              {topic.problems.length > 0 ? (
                topic.problems.map((prob, idx) => (
                  <a
                    key={idx}
                    href={prob.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-orange-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all group shadow-sm dark:shadow-none"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        {prob.title}
                      </span>
                      <ExternalLink
                        size={12}
                        className="text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                      />
                    </div>
                    <div className="mt-2 flex gap-2">
                      <span
                        className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                          prob.difficulty === "Easy"
                            ? "bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400"
                            : prob.difficulty === "Medium"
                            ? "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                            : "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                        }`}
                      >
                        {prob.difficulty}
                      </span>
                    </div>
                  </a>
                ))
              ) : (
                <div className="p-4 bg-slate-100 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-center text-xs text-slate-500 flex flex-col items-center gap-2">
                  <BookOpen size={20} />
                  <span>
                    No Code Problems.
                    <br />
                    This is a Design/Behavioral topic.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
