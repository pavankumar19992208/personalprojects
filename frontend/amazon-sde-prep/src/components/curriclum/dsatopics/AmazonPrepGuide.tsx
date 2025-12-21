import React, { useState } from "react";
import {
  ExternalLink,
  BookOpen,
  //   ChevronLeft,
  Save,
  //   X,
  Code2,
  Sun,
  Moon,
  Lightbulb,
  Zap,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import type { Topic, Problem } from "../../../../types";
import {
  NumberOfIslandsChallenge,
  NumberOfIslandsExplanation,
} from "./problems/NumberOfIslands";

interface AmazonPrepGuideProps {
  topic: Topic;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

// Map problem titles to their content components
const PROBLEM_CONTENTS: Record<
  string,
  { challenge: React.ComponentType; explanation: React.ComponentType }
> = {
  "Number of Islands": {
    challenge: NumberOfIslandsChallenge,
    explanation: NumberOfIslandsExplanation,
  },
  // Add more problems here as they are created
};

export const AmazonPrepGuide: React.FC<AmazonPrepGuideProps> = ({ topic }) => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [activeMode, setActiveMode] = useState<"solve" | "learn" | null>(null);
  const [code, setCode] = useState<string>("");
  const [editorTheme, setEditorTheme] = useState<"dark" | "light">("dark");
  const [showProtocol, setShowProtocol] = useState(true);

  // Group problems by section
  const sections: Record<string, Problem[]> = {};

  if (topic && topic.problems) {
    topic.problems.forEach((problem) => {
      const section = problem.section || "Other";
      if (!sections[section]) {
        sections[section] = [];
      }
      sections[section].push(problem);
    });
  }

  const handleSolveClick = (problem: Problem, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProblem(problem);
    setActiveMode("solve");
    setCode(
      `# Write your solution for ${problem.title} here...\n\ndef solution():\n    pass`
    );
  };

  const handleLearnClick = (problem: Problem, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProblem(problem);
    setActiveMode("learn");
  };

  //   const handleCloseRightPanel = () => {
  //     setSelectedProblem(null);
  //     setActiveMode(null);
  //   };

  const handleSave = () => {
    // Mock save
    alert("Solution saved to backend (mock)!");
  };

  const toggleEditorTheme = () => {
    setEditorTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Helper to render the correct content in the Left Panel
  const renderLeftPanelContent = () => {
    if (!selectedProblem) {
      // Default View: Problem List
      return (
        <>
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Problem List
            </h2>
            <p className="text-sm text-slate-500">
              {topic.problems.length} Problems • Critical Priority
            </p>
          </div>

          <div className="p-4 space-y-6">
            {Object.entries(sections).map(([sectionTitle, problems]) => (
              <div key={sectionTitle}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 pl-2 border-l-2 border-orange-500">
                  {sectionTitle}
                </h3>
                <div className="space-y-2">
                  {/* FIX: Explicitly cast problems to Problem[] to avoid 'never' type inference */}
                  {(problems as Problem[]).map((problem, idx) => (
                    <div
                      key={idx}
                      className={`group flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border transition-all ${
                        // Use reference equality instead of title comparison to avoid property access issues
                        selectedProblem === problem
                          ? "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 shadow-md"
                          : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3 sm:mb-0">
                        <span className="text-xs font-mono text-slate-400 w-6">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                            {problem.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                                problem.difficulty === "Easy"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                  : problem.difficulty === "Medium"
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                            >
                              {problem.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          onClick={(e) => handleSolveClick(problem, e)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-colors bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-slate-600 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <Code2 size={14} /> Solve
                        </button>
                        <button
                          onClick={(e) => handleLearnClick(problem, e)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-colors bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-purple-50 dark:hover:bg-slate-600 hover:text-purple-600 dark:hover:text-purple-400"
                        >
                          <BookOpen size={14} /> Learn
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      );
    } else {
      // Problem Selected View: Show Challenge (Problem Statement)
      const Content = PROBLEM_CONTENTS[selectedProblem.title];

      return (
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3 sticky top-0 z-10">
            <button
              onClick={() => setSelectedProblem(null)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500"
              title="Back to Problem List"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="font-bold text-slate-900 dark:text-white">
              Problem Description
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900">
            {Content ? (
              <Content.challenge />
            ) : (
              <div className="p-8 text-center text-slate-500">
                <p>Problem description not available for this demo.</p>
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
      {/* Interview Tips Header */}
      {showProtocol ? (
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 shadow-md flex-none transition-all duration-300 ease-in-out">
          <button
            onClick={() => setShowProtocol(false)}
            className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
            title="Hide Protocol"
          >
            <ChevronUp size={16} />
          </button>
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pr-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Zap
                  className="text-yellow-300"
                  size={20}
                  fill="currentColor"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">Amazon Interview Protocol</h3>
                <p className="text-xs text-indigo-100">
                  Follow this structure for every problem.
                </p>
              </div>
            </div>
            <div className="flex gap-2 text-xs font-medium flex-wrap">
              <span className="px-3 py-1 bg-white/10 rounded-full border border-white/20">
                1. Explain Approach
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full border border-white/20">
                2. Code
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full border border-white/20">
                3. Dry Run
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full border border-white/20">
                4. Complexity (TC/SC)
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-1 flex justify-center cursor-pointer hover:bg-indigo-700 transition-all"
          onClick={() => setShowProtocol(true)}
          title="Show Protocol"
        >
          <ChevronDown size={16} />
        </div>
      )}

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden p-4 gap-4 max-w-[1600px] mx-auto w-full">
        {/* Left Container: Problem List OR Problem Statement */}
        <div className="flex-1 overflow-hidden bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          {renderLeftPanelContent()}
        </div>

        {/* Right Container: Editor / Theory */}
        <div
          className={`flex-[2] flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden ${
            !selectedProblem ? "hidden lg:flex" : "flex"
          }`}
        >
          {selectedProblem ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 dark:text-white">
                        {selectedProblem.title}
                      </h3>
                      <div className="flex bg-slate-200 dark:bg-slate-800 rounded-lg p-0.5">
                        <button
                          onClick={() => setActiveMode("solve")}
                          className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                            activeMode === "solve"
                              ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          }`}
                        >
                          Solve
                        </button>
                        <button
                          onClick={() => setActiveMode("learn")}
                          className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                            activeMode === "learn"
                              ? "bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm"
                              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          }`}
                        >
                          Learn
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {activeMode === "solve" && (
                    <>
                      <button
                        onClick={() =>
                          window.open(
                            `https://leetcode.com/problemset/all/?search=${selectedProblem.title}`,
                            "_blank"
                          )
                        }
                        className="flex items-center gap-1.5 px-3 py-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors text-xs font-bold"
                        title="Solve on LeetCode"
                      >
                        <ExternalLink size={14} />
                        <span className="hidden sm:inline">LeetCode</span>
                      </button>
                      <button
                        onClick={toggleEditorTheme}
                        className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                        title="Toggle Theme"
                      >
                        {editorTheme === "dark" ? (
                          <Sun size={18} />
                        ) : (
                          <Moon size={18} />
                        )}
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm shadow-green-500/20"
                      >
                        <Save size={16} />
                        Save
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 relative overflow-hidden">
                {activeMode === "solve" ? (
                  <div
                    className={`w-full h-full font-mono text-sm leading-relaxed p-4 resize-none focus:outline-none ${
                      editorTheme === "dark"
                        ? "bg-[#1e1e1e] text-slate-200"
                        : "bg-white text-slate-800"
                    }`}
                  >
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-full bg-transparent resize-none focus:outline-none"
                      spellCheck={false}
                    />
                  </div>
                ) : (
                  <div className="h-full overflow-y-auto bg-white dark:bg-slate-900">
                    {PROBLEM_CONTENTS[selectedProblem.title] ? (
                      React.createElement(
                        PROBLEM_CONTENTS[selectedProblem.title].explanation
                      )
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-60 p-8">
                        <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                          <Lightbulb
                            size={48}
                            className="text-purple-500 dark:text-purple-400"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            Theoretical Explanation
                          </h3>
                          <p className="text-slate-500 dark:text-slate-400 max-w-md mt-2">
                            Visuals and detailed explanation for{" "}
                            <span className="font-bold text-slate-900 dark:text-white">
                              {selectedProblem.title}
                            </span>{" "}
                            will be loaded here.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Code2 size={40} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Ready to Practice?
              </h3>
              <p className="max-w-md mx-auto text-slate-600 dark:text-slate-400 mb-8">
                Select a problem from the list to start coding or learn the
                underlying concepts.
              </p>
              <div className="flex gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Code2 size={16} /> Solve{" "}
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={16} /> Learn
                </div>{" "}
              </div>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
