import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronDown,
  CheckCircle2,
  Circle,
  BookOpen,
  AlertTriangle,
  TrendingUp,
  Bot,
  Copy,
  Lightbulb,
  Code2,
  Zap,
} from "lucide-react";
import type { Topic } from "../../../types";
import { NetworkIntelBoard } from "../visuals/NetworkIntelBoard";
import { OSIntelBoard } from "../visuals/OSIntelBoard";
import { DBMSIntelBoard } from "../visuals/DBMSIntelBoard";
import { OOPGuide } from "./lldtopics/OOPGuide";
import { DesignFundamentalsGuide } from "./lldtopics/DesignFundamentalsGuide";
import { SOLIDGuide } from "./lldtopics/SOLIDGuide";
import { CreationalPatternsGuide } from "./lldtopics/CreationalPatternsGuide";
import { StructuralPatternsGuide } from "./lldtopics/StructuralPatternsGuide";
import { BehavioralPatternsGuide } from "./lldtopics/BehavioralPatternsGuide";
import { ParkingLotGuide } from "./lldtopics/ParkingLotGuide";
import { CommonLLDProblemsGuide } from "./lldtopics/CommonLLDProblemsGuide";

// Import Data & Components
import { OOP_THEORY, OOP_TIPS } from "../../../data/theory/oop";
import { TipsModal } from "./TipsModal";

// --- Helper Component for Theoretical Content (Light Mode Only) ---
const TheoreticalPanel = ({
  content,
  topic,
  onClose,
}: {
  content: string;
  topic: Topic;
  onClose?: () => void;
}) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Helper to parse inline formatting: **bold**, `code`
  const parseInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-bold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={i}
            className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  const highlightLine = (line: string) => {
    const commentIndex = line.indexOf("#");
    let code = line;
    let comment = "";
    if (commentIndex !== -1) {
      code = line.slice(0, commentIndex);
      comment = line.slice(commentIndex);
    }

    // Split by string literals, words, or non-word characters
    const parts = code.split(/(".*?"|'.*?'|\b\w+\b|[^\w\s])/g).filter(Boolean);

    return (
      <>
        {parts.map((part, i) => {
          if (part.startsWith('"') || part.startsWith("'"))
            return (
              <span key={i} className="text-green-600">
                {part}
              </span>
            );
          if (
            [
              "def",
              "class",
              "return",
              "if",
              "else",
              "elif",
              "import",
              "from",
              "pass",
              "while",
              "for",
              "in",
              "try",
              "except",
              "finally",
              "raise",
              "with",
              "as",
            ].includes(part)
          )
            return (
              <span key={i} className="text-purple-600 font-bold">
                {part}
              </span>
            );
          if (["self", "cls"].includes(part))
            return (
              <span key={i} className="text-orange-500 italic">
                {part}
              </span>
            );
          if (["True", "False", "None"].includes(part))
            return (
              <span key={i} className="text-blue-600 font-bold">
                {part}
              </span>
            );
          if (["print", "len", "range", "__init__", "super"].includes(part))
            return (
              <span key={i} className="text-cyan-600">
                {part}
              </span>
            );
          if (/^[A-Z]/.test(part) && part.length > 1)
            return (
              <span key={i} className="text-yellow-600">
                {part}
              </span>
            ); // Class names heuristic
          return (
            <span key={i} className="text-slate-800">
              {part}
            </span>
          );
        })}
        {comment && <span className="text-slate-400 italic">{comment}</span>}
      </>
    );
  };

  const renderContent = (text: string) => {
    // Split by code blocks first to avoid parsing inside code
    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith("```")) {
        const lines = part.split("\n");
        const lang = lines[0].replace(/^```/, "").trim() || "text";
        const codeContent = part.replace(/^```.*\n?/, "").replace(/```$/, "");
        const codeLines = codeContent.split("\n");

        return (
          <div
            key={index}
            className="my-6 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50 group"
          >
            <div className="bg-slate-100/50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Code2 size={14} className="text-blue-500" /> {lang}
              </div>
              <button
                onClick={() => handleCopy(codeContent, index)}
                className="p-1.5 hover:bg-white rounded-md transition-colors text-slate-400 hover:text-slate-600"
                title="Copy code"
              >
                {copiedIndex === index ? (
                  <CheckCircle2 size={14} className="text-green-500" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>
            <div className="p-5 overflow-x-auto bg-white">
              <pre className="font-mono text-sm leading-relaxed whitespace-pre">
                {codeLines.map((line, i) => (
                  <div key={i} className="table-row">
                    <span className="table-cell text-slate-300 select-none pr-4 text-right w-8 text-xs">
                      {i + 1}
                    </span>
                    <span className="table-cell">{highlightLine(line)}</span>
                  </div>
                ))}
              </pre>
            </div>
          </div>
        );
      }

      // Text processing
      return (
        <div key={index}>
          {part.split("\n").map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return <div key={i} className="h-3" />; // Spacing

            if (trimmed.startsWith("###")) {
              return (
                <h3
                  key={i}
                  className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2 tracking-tight"
                >
                  {trimmed.replace(/^###\s*/, "")}
                </h3>
              );
            }
            if (trimmed.startsWith("##")) {
              return (
                <h4
                  key={i}
                  className="text-lg font-bold text-slate-800 mt-6 mb-3 tracking-tight"
                >
                  {trimmed.replace(/^##\s*/, "")}
                </h4>
              );
            }
            if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
              return (
                <div key={i} className="flex gap-3 mb-2 ml-1 group">
                  <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-blue-500/60 group-hover:bg-blue-500 transition-colors flex-shrink-0" />
                  <p className="text-slate-700 leading-relaxed text-base">
                    {parseInline(trimmed.replace(/^[\*\-]\s*/, ""))}
                  </p>
                </div>
              );
            }
            if (trimmed.startsWith("> ")) {
              return (
                <div
                  key={i}
                  className="border-l-4 border-purple-300 pl-4 py-1 my-4 italic text-slate-600 bg-purple-50/50 rounded-r-lg"
                >
                  {parseInline(trimmed.replace(/^>\s*/, ""))}
                </div>
              );
            }
            if (trimmed.startsWith("|")) {
              // Basic table rendering support (very simple)
              const cells = trimmed.split("|").filter((c) => c.trim() !== "");
              if (trimmed.includes("---")) return null; // Skip separator lines
              return (
                <div
                  key={i}
                  className="grid grid-cols-3 gap-4 border-b border-slate-100 py-2 text-sm"
                >
                  {cells.map((c, idx) => (
                    <div key={idx} className="text-slate-700">
                      {parseInline(c.trim())}
                    </div>
                  ))}
                </div>
              );
            }

            return (
              <p
                key={i}
                className="text-slate-700 leading-relaxed mb-3 text-base"
              >
                {parseInline(trimmed)}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="h-full bg-white text-slate-900 overflow-y-auto p-4 sm:p-8 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Mobile Header with Hide Option */}
      <div className="lg:hidden flex justify-between items-center mb-6 pb-4 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur z-10 -mx-4 px-4 sm:-mx-8 sm:px-8 pt-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Theoretical Notes
        </span>
        <button
          onClick={onClose}
          className="flex items-center gap-1 text-sm font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors"
        >
          Hide <ChevronDown size={16} />
        </button>
      </div>

      <div className="max-w-3xl mx-auto pb-20">
        {/* Header Stats for Context */}
        <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            <TrendingUp size={16} className="text-green-600" />
            Frequency:{" "}
            <span className="text-slate-900 font-bold">{topic.frequency}</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            <AlertTriangle
              size={16}
              className={
                topic.priority === "Critical"
                  ? "text-red-500"
                  : "text-orange-500"
              }
            />
            Priority:{" "}
            <span className="text-slate-900 font-bold">{topic.priority}</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">
          Theoretical Deep Dive
        </h2>

        {/* AI Prompt Box if available */}
        {topic.prompt && (
          <div className="mb-8 bg-purple-50 border border-purple-100 rounded-xl p-6">
            <div className="flex items-center gap-2 text-purple-700 font-bold mb-3 text-sm uppercase tracking-wider">
              <Bot size={18} /> AI Context
            </div>
            <p className="text-purple-900/80 italic text-sm leading-relaxed">
              "{topic.prompt}"
            </p>
          </div>
        )}

        <div className="prose prose-slate max-w-none">
          {renderContent(content)}
        </div>

        {/* Core Concepts List embedded in theory */}
        {topic.subTopics && (
          <div className="mt-12 pt-8 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <BookOpen size={20} className="text-blue-500" />
              Key Concepts to Master
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {topic.subTopics.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-slate-50 border border-slate-100 p-4 rounded-lg hover:border-blue-200 transition-colors"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-slate-800">
                      {sub.title}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-500">
                      {sub.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{sub.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

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
  const [showTips, setShowTips] = useState(false);
  const [mobileTheoryOpen, setMobileTheoryOpen] = useState(false);

  const isNetworkTopic = topic.id === "cs-net";
  const isOSTopic = topic.id === "cs-os";
  const isDBMSTopic = topic.id === "cs-dbms";
  const isOOP = topic.id === "lld-oop";
  const isDesignFundamentals = topic.id === "lld-fundamentals";
  const isSOLID = topic.id === "lld-solid";
  // const isInteractiveGuide =
  //   isOOP || isNetworkTopic || isOSTopic || isDBMSTopic;
  const isCreational = topic.id === "lld-creational";
  const isStructural = topic.id === "lld-structural";
  const isBehavioral = topic.id === "lld-behavioral";
  const isParkingLot = topic.id === "lld-parking-lot";
  const isCommonLLD = topic.id === "lld-common";

  // Determine content based on topic
  const theoryContent = isOOP ? OOP_THEORY : topic.explanation;
  const tipsContent = isOOP ? OOP_TIPS : [];

  // Determine which guide component to render
  const renderGuide = () => {
    const commonProps = {
      initialPage: initialPage || 0,
      onPageChange: onPageChange,
      onComplete: () => {
        if (!isCompleted) onToggleComplete();
        // Optional: Auto-close or show success message
      },
    };

    if (isOOP) return <OOPGuide {...commonProps} />;
    if (isDesignFundamentals)
      return <DesignFundamentalsGuide {...commonProps} />;
    if (isSOLID) return <SOLIDGuide {...commonProps} />;
    if (isCreational) return <CreationalPatternsGuide {...commonProps} />;
    if (isStructural) return <StructuralPatternsGuide {...commonProps} />;
    if (isBehavioral) return <BehavioralPatternsGuide {...commonProps} />;
    if (isParkingLot) return <ParkingLotGuide {...commonProps} />;
    if (isCommonLLD)
      return <CommonLLDProblemsGuide onComplete={commonProps.onComplete} />;
    if (isNetworkTopic) return <NetworkIntelBoard />;
    if (isOSTopic) return <OSIntelBoard />;
    if (isDBMSTopic) return <DBMSIntelBoard />;

    // Fallback for non-interactive topics (render placeholder or nothing)
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400">
        <Lightbulb size={48} className="mb-4 opacity-20" />
        <p>No interactive guide available for this topic.</p>
        <p className="text-sm">Focus on the theoretical notes.</p>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 animate-in fade-in overflow-hidden">
      {/* Header - Fixed at top */}
      <div className="bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 p-2 sm:p-6 flex justify-between items-center z-20 backdrop-blur flex-none">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onBack}
            className="p-1 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500 hover:text-slate-900 dark:hover:text-white"
            title="Back to Board"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div>
            <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
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
              <span className="text-[10px] sm:text-xs text-slate-500">
                • {topic.difficulty}
              </span>
            </div>
            <h2 className="text-base sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {topic.title}
              {isCompleted && (
                <CheckCircle2 className="text-green-500 w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Theory Toggle */}
          <button
            onClick={() => setMobileTheoryOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
          >
            <BookOpen size={16} />
            <span className="hidden sm:inline">Notes</span>
          </button>

          {/* Tips Button - Only show if tips exist */}
          {tipsContent.length > 0 && (
            <button
              onClick={() => setShowTips(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:shadow-lg hover:scale-105 transition-all animate-pulse"
            >
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" />
              <span className="hidden sm:inline">Interview Tips</span>
            </button>
          )}

          <button
            onClick={onToggleComplete}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              isCompleted
                ? "bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/50"
                : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <Circle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
            <span className="hidden sm:inline">
              {isCompleted ? "COMPLETED" : "MARK COMPLETE"}
            </span>
          </button>
        </div>
      </div>

      {/* Content Area - Split Layout */}
      <div className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col lg:grid lg:grid-cols-5 relative pb-20 lg:pb-0">
        {/* LEFT COLUMN: Interactive Guide */}
        <div
          className={`
            ${mobileTheoryOpen ? "hidden" : "flex"} 
            lg:flex 
            flex-col flex-1 
            lg:h-full
            lg:col-span-3 
            lg:overflow-hidden
            border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 relative 
          `}
        >
          {renderGuide()}
        </div>

        {/* RIGHT COLUMN: Theoretical Explanation */}
        {/* Mobile: Full height if theory open, Desktop: Full height (2/5 width) */}
        <div
          className={`
            ${mobileTheoryOpen ? "flex" : "hidden"} 
            lg:flex h-full lg:col-span-2 overflow-hidden relative shadow-xl z-10 bg-white flex-col
        `}
        >
          <TheoreticalPanel
            content={theoryContent}
            topic={topic}
            onClose={() => setMobileTheoryOpen(false)}
          />
        </div>
      </div>

      {/* Tips Modal */}
      <TipsModal
        isOpen={showTips}
        onClose={() => setShowTips(false)}
        tips={tipsContent}
      />
    </div>
  );
};
