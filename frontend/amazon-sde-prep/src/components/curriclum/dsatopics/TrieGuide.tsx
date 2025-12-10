import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Copy, Check, Search, Zap } from "lucide-react";

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-slate-800 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-700 hover:text-white"
        title="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
      <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto text-xs text-slate-300 font-mono leading-relaxed border border-slate-800">
        {code}
      </pre>
    </div>
  );
};

// Page 1: Concept - Specialized Structures
const ConceptPage = () => {
  const [activeTab, setActiveTab] = useState<"trie" | "uf">("trie");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="text-yellow-400" /> Specialized Structures
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab("trie")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                  activeTab === "trie"
                    ? "bg-purple-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                Trie (Prefix Tree)
              </button>
              <button
                onClick={() => setActiveTab("uf")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                  activeTab === "uf"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                Union-Find
              </button>
            </div>

            {activeTab === "trie" ? (
              <div className="space-y-4 animate-in fade-in">
                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-purple-500">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">
                    Optimized for Strings
                  </h3>
                  <p className="text-slate-300 text-sm mb-2">
                    Instead of storing "Apple" and "App", we store paths of
                    characters.
                  </p>
                  <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                    <li>
                      <strong className="text-white">Search:</strong> O(L) where
                      L is word length.
                    </li>
                    <li>
                      <strong className="text-white">Use Case:</strong>{" "}
                      Autocomplete, Spell Check.
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in">
                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    Optimized for Connectivity
                  </h3>
                  <p className="text-slate-300 text-sm mb-2">
                    Efficiently track and merge disjoint sets.
                  </p>
                  <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                    <li>
                      <strong className="text-white">Merge/Find:</strong> Nearly
                      O(1).
                    </li>
                    <li>
                      <strong className="text-white">Use Case:</strong> Friend
                      Circles, Network Connectivity.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="bg-black/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center h-64 relative overflow-hidden">
            {activeTab === "trie" ? (
              <div className="relative w-full h-full animate-in zoom-in duration-500">
                {/* SVG Lines for Connectors */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Root -> C */}
                  <line
                    x1="50%"
                    y1="15%"
                    x2="35%"
                    y2="35%"
                    stroke="#475569"
                    strokeWidth="2"
                  />
                  {/* Root -> D */}
                  <line
                    x1="50%"
                    y1="15%"
                    x2="65%"
                    y2="35%"
                    stroke="#475569"
                    strokeWidth="2"
                  />
                  {/* C -> A */}
                  <line
                    x1="35%"
                    y1="35%"
                    x2="25%"
                    y2="60%"
                    stroke="#475569"
                    strokeWidth="2"
                  />
                  {/* C -> O */}
                  <line
                    x1="35%"
                    y1="35%"
                    x2="45%"
                    y2="60%"
                    stroke="#475569"
                    strokeWidth="2"
                  />
                  {/* A -> T */}
                  <line
                    x1="25%"
                    y1="60%"
                    x2="25%"
                    y2="85%"
                    stroke="#475569"
                    strokeWidth="2"
                  />
                  {/* O -> W */}
                  <line
                    x1="45%"
                    y1="60%"
                    x2="45%"
                    y2="85%"
                    stroke="#475569"
                    strokeWidth="2"
                  />
                </svg>

                {/* Nodes */}
                {/* Root */}
                <div className="absolute top-[15%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-700 border border-slate-500 flex items-center justify-center text-xs text-slate-300 z-10">
                  root
                </div>

                {/* Level 1 */}
                <div className="absolute top-[35%] left-[35%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-900 border border-purple-500 flex items-center justify-center text-white font-bold z-10">
                  C
                </div>
                <div className="absolute top-[35%] left-[65%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-400 z-10">
                  D
                </div>

                {/* Level 2 */}
                <div className="absolute top-[60%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-900 border border-purple-500 flex items-center justify-center text-white font-bold z-10">
                  A
                </div>
                <div className="absolute top-[60%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-900 border border-purple-500 flex items-center justify-center text-white font-bold z-10">
                  O
                </div>

                {/* Level 3 */}
                <div className="absolute top-[85%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-green-600 border border-green-400 flex items-center justify-center text-white font-bold text-[10px] z-10">
                  T
                </div>
                <div className="absolute top-[85%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-green-600 border border-green-400 flex items-center justify-center text-white font-bold text-[10px] z-10">
                  W
                </div>

                <div className="absolute bottom-2 right-2 text-xs text-slate-500">
                  Words: CAT, COW
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full animate-in zoom-in duration-500">
                {/* SVG Lines for Connectors */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Set 1: A-B, B-C */}
                  <line
                    x1="20%"
                    y1="20%"
                    x2="35%"
                    y2="35%"
                    stroke="#60a5fa"
                    strokeWidth="3"
                  />
                  <line
                    x1="20%"
                    y1="50%"
                    x2="35%"
                    y2="35%"
                    stroke="#60a5fa"
                    strokeWidth="3"
                  />

                  {/* Set 2: D-E */}
                  <line
                    x1="70%"
                    y1="30%"
                    x2="85%"
                    y2="45%"
                    stroke="#f87171"
                    strokeWidth="3"
                  />
                </svg>

                {/* Set 1 Nodes */}
                <div className="absolute top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.5)] z-10">
                  A
                </div>
                <div className="absolute top-[35%] left-[35%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.5)] z-10">
                  B
                </div>
                <div className="absolute top-[50%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.5)] z-10">
                  C
                </div>

                {/* Set 2 Nodes */}
                <div className="absolute top-[30%] left-[70%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(220,38,38,0.5)] z-10">
                  D
                </div>
                <div className="absolute top-[45%] left-[85%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(220,38,38,0.5)] z-10">
                  E
                </div>

                <div className="absolute bottom-2 right-2 text-xs text-slate-500">
                  2 Disjoint Sets (Provinces)
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 2: Trie Implementation
const TrieImplPage = () => {
  const [input, setInput] = useState("");
  const [path, setPath] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(true);

  // Simple Trie for "APPLE"
  // Root -> A -> P -> P -> L -> E (End)
  const trieData = "APPLE";

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    if (val.length > 5) return;
    setInput(val);

    // Check path
    let valid = true;
    const newPath = [];
    for (let i = 0; i < val.length; i++) {
      if (i >= trieData.length || val[i] !== trieData[i]) {
        valid = false;
        break;
      }
      newPath.push(val[i]);
    }
    setPath(newPath);
    setIsValid(valid || val === "");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern A: Trie Implementation
        </h2>
        <p className="text-slate-400 mb-6">Insert, Search, StartsWith.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-black/40 p-6 rounded-xl border border-slate-800 h-64 flex flex-col items-center justify-center relative">
              <div className="mb-8 w-full max-w-xs">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    value={input}
                    onChange={handleInput}
                    placeholder="Type 'APPLE'..."
                    className={`w-full bg-slate-800 border rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 transition-all ${
                      isValid
                        ? "border-slate-600 focus:ring-purple-500"
                        : "border-red-500 focus:ring-red-500"
                    }`}
                  />
                </div>
                {!isValid && (
                  <p className="text-red-400 text-xs mt-2 ml-2">
                    Path broken! Character not found.
                  </p>
                )}
              </div>

              {/* Trie Visual */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    input.length > 0
                      ? "bg-purple-600 border-purple-400 text-white"
                      : "bg-slate-800 border-slate-600 text-slate-400"
                  }`}
                >
                  Root
                </div>

                {trieData.split("").map((char, i) => {
                  const isActive = i < path.length;
                  //   const isError = !isValid && i === path.length; // The char that failed? No, path stops.
                  // Actually, if invalid, input is longer than path.

                  return (
                    <React.Fragment key={i}>
                      <div
                        className={`w-6 h-0.5 transition-colors duration-300 ${
                          isActive ? "bg-purple-500" : "bg-slate-700"
                        }`}
                      ></div>
                      <div
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-300 ${
                          isActive
                            ? "bg-purple-600 border-purple-400 text-white scale-110"
                            : "bg-slate-800 border-slate-600 text-slate-500"
                        }`}
                      >
                        {char}
                        {i === trieData.length - 1 && (
                          <span className="absolute -bottom-4 text-[8px] text-green-400">
                            END
                          </span>
                        )}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-semibold text-purple-400 mb-2">
                Trie Node Structure
              </h3>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>
                  <strong className="text-white">Children:</strong> Map&lt;Char,
                  TrieNode&gt;
                </li>
                <li>
                  <strong className="text-white">isEnd:</strong> Boolean (True
                  if word ends here)
                </li>
              </ul>
            </div>

            <CodeBlock
              code={`class TrieNode:
    def __init__(self):
        self.children = {}
        self.isEnd = False

class Trie:
    def insert(self, word):
        curr = self.root
        for c in word:
            if c not in curr.children:
                curr.children[c] = TrieNode()
            curr = curr.children[c]
        curr.isEnd = True`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 3: Word Search II
const WordSearchPage = () => {
  const [step, setStep] = useState(0);

  // Board: [['a', 'n'], ['t', 'e']]
  // Words: ["ant", "tea"]
  // Trie: Root -> a -> n -> t(End)
  //             -> t -> e -> a(End)

  // Steps:
  // 0: Start at (0,0) 'a'. Trie moves to 'a'.
  // 1: Move to (0,1) 'n'. Trie moves to 'n'.
  // 2: Move to (1,0) 't'. Trie moves to 't'. End found! "ant".
  // 3: Backtrack. Try 'e' from 'n'? No 'e' in Trie children of 'n'.
  // 4: Start at (1,0) 't'. Trie moves to 't'.
  // 5: Move to (1,1) 'e'. Trie moves to 'e'.
  // 6: Move to (0,0) 'a'. Trie moves to 'a'. End found! "tea".

  const steps = [
    {
      gridHl: [0, 0],
      trieHl: "a",
      found: null,
      msg: "DFS at (0,0) 'a'. Match in Trie? Yes. Move.",
    },
    {
      gridHl: [0, 1],
      trieHl: "n",
      found: null,
      msg: "Neighbor (0,1) 'n'. Match in Trie('a')? Yes. Move.",
    },
    {
      gridHl: [1, 0],
      trieHl: "t1",
      found: "ant",
      msg: "Neighbor (1,0) 't'. Match in Trie('n')? Yes. Word End! Found 'ant'.",
    },
    {
      gridHl: [1, 0],
      trieHl: "t2",
      found: null,
      msg: "New DFS at (1,0) 't'. Match in Trie? Yes. Move.",
    },
    {
      gridHl: [1, 1],
      trieHl: "e",
      found: null,
      msg: "Neighbor (1,1) 'e'. Match in Trie('t')? Yes. Move.",
    },
    {
      gridHl: [0, 0],
      trieHl: "a2",
      found: "tea",
      msg: "Neighbor (0,0) 'a'. Match in Trie('e')? Yes. Word End! Found 'tea'.",
    },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern B: Word Search II (Trie + DFS)
        </h2>
        <p className="text-slate-400 mb-6">Pruning DFS using a Trie.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-black/40 p-6 rounded-xl border border-slate-800 h-64 flex items-center justify-center gap-12 relative">
              {/* Grid */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  ["a", "n"],
                  ["t", "e"],
                ].map((row, r) =>
                  row.map((char, c) => (
                    <div
                      key={`${r}-${c}`}
                      className={`w-12 h-12 rounded flex items-center justify-center font-bold text-xl transition-all duration-300 ${
                        current.gridHl[0] === r && current.gridHl[1] === c
                          ? "bg-yellow-500 text-black scale-110 shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {char}
                    </div>
                  ))
                )}
              </div>

              {/* Trie Visual Simplified */}
              <div className="flex flex-col gap-4 relative">
                {/* Branch 1: ant */}
                <div className="flex items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs ${
                      current.trieHl === "a"
                        ? "bg-yellow-500 text-black border-yellow-400"
                        : "bg-slate-800 text-slate-500 border-slate-700"
                    }`}
                  >
                    a
                  </div>
                  <div className="w-4 h-0.5 bg-slate-700"></div>
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs ${
                      current.trieHl === "n"
                        ? "bg-yellow-500 text-black border-yellow-400"
                        : "bg-slate-800 text-slate-500 border-slate-700"
                    }`}
                  >
                    n
                  </div>
                  <div className="w-4 h-0.5 bg-slate-700"></div>
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs ${
                      current.trieHl === "t1"
                        ? "bg-green-500 text-white border-green-400"
                        : "bg-slate-800 text-slate-500 border-slate-700"
                    }`}
                  >
                    t
                  </div>
                </div>
                {/* Branch 2: tea */}
                <div className="flex items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs ${
                      current.trieHl === "t2"
                        ? "bg-yellow-500 text-black border-yellow-400"
                        : "bg-slate-800 text-slate-500 border-slate-700"
                    }`}
                  >
                    t
                  </div>
                  <div className="w-4 h-0.5 bg-slate-700"></div>
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs ${
                      current.trieHl === "e"
                        ? "bg-yellow-500 text-black border-yellow-400"
                        : "bg-slate-800 text-slate-500 border-slate-700"
                    }`}
                  >
                    e
                  </div>
                  <div className="w-4 h-0.5 bg-slate-700"></div>
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs ${
                      current.trieHl === "a2"
                        ? "bg-green-500 text-white border-green-400"
                        : "bg-slate-800 text-slate-500 border-slate-700"
                    }`}
                  >
                    a
                  </div>
                </div>
              </div>

              {current.found && (
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-bounce">
                  Found: {current.found}
                </div>
              )}

              <div className="absolute bottom-2 bg-slate-800/80 px-3 py-1 rounded text-xs text-yellow-300 border border-slate-700">
                {current.msg}
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="p-1.5 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-50"
                >
                  <ArrowLeft size={14} />
                </button>
                <button
                  onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                  disabled={step === steps.length - 1}
                  className="p-1.5 rounded bg-purple-600 hover:bg-purple-500 disabled:opacity-50"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-semibold text-yellow-400 mb-2">
                Optimization Strategy
              </h3>
              <p className="text-sm text-slate-300 mb-2">
                Don't run full DFS for every word. Run DFS on the grid{" "}
                <strong>guided</strong> by the Trie.
              </p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>
                  If <code className="text-white">grid[r][c]</code> is not in
                  Trie children, <strong>STOP</strong>.
                </li>
                <li>Prunes massive search branches instantly.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 4: Union Find
const UnionFindPage = () => {
  const [step, setStep] = useState(0);

  // Nodes: 0, 1, 2
  // Steps:
  // 0: Init. 3 separate components.
  // 1: Union(0, 1). 0 moves to 1.
  // 2: Result. 2 Components.

  const steps = [
    {
      merged: [],
      msg: "Start: 3 Isolated Cities (0, 1, 2). Parents: [0, 1, 2].",
    },
    {
      merged: [[0, 1]],
      msg: "Union(0, 1): 0 connects to 1. Parents: [1, 1, 2].",
    },
    {
      merged: [[0, 1]],
      msg: "Result: 2 Provinces ({0,1} and {2}).",
    },
  ];

  const current = steps[step];
  const isMerged = current.merged.length > 0;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern C: Union-Find (Disjoint Set)
        </h2>
        <p className="text-slate-400 mb-6">
          Tracking connected components efficiently.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center h-64 relative">
            {/* SVG Layer for Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Line 0-1 */}
              <line
                x1="25%"
                y1="50%"
                x2="50%"
                y2="50%"
                stroke="#60a5fa"
                strokeWidth="4"
                className={`transition-all duration-1000 ${
                  isMerged ? "opacity-100" : "opacity-0"
                }`}
              />
            </svg>

            {/* Nodes */}
            <div className="relative w-full h-full">
              {/* Node 0 */}
              <div className="absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold z-10 transition-all duration-1000">
                0
              </div>

              {/* Node 1 */}
              <div className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold z-10">
                1
              </div>

              {/* Node 2 */}
              <div className="absolute top-1/2 left-[75%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold z-10">
                2
              </div>
            </div>

            <div className="absolute bottom-2 bg-slate-800/80 px-3 py-1 rounded text-xs text-yellow-300 border border-slate-700">
              {current.msg}
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="p-1.5 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-50"
              >
                <ArrowLeft size={14} />
              </button>
              <button
                onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                disabled={step === steps.length - 1}
                className="p-1.5 rounded bg-purple-600 hover:bg-purple-500 disabled:opacity-50"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-400 mb-2">
                Core Operations
              </h3>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-2">
                <li>
                  <strong className="text-white">Find(i):</strong> Who is the
                  leader of i?
                </li>
                <li>
                  <strong className="text-white">Union(i, j):</strong> Connect
                  leader(i) to leader(j).
                </li>
              </ul>
            </div>

            <CodeBlock
              code={`class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        
    def find(self, i):
        if self.parent[i] != i:
            self.parent[i] = self.find(self.parent[i])
        return self.parent[i]
        
    def union(self, i, j):
        rootI = self.find(i)
        rootJ = self.find(j)
        if rootI != rootJ:
            self.parent[rootI] = rootJ`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 5: Path Compression
const OptimizationPage = () => {
  const [compressed, setCompressed] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Optimization: Path Compression
        </h2>
        <p className="text-slate-400 mb-6">
          Flattening the tree for O(1) lookups.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center h-64 relative">
            {/* SVG Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-1000">
              {/* R is at 50%, 20% */}

              {/* C Connection */}
              {/* Uncompressed: C(50, 40) -> R(50, 20) */}
              {/* Compressed: C(20, 60) -> R(50, 20) */}
              <line
                x1={compressed ? "20%" : "50%"}
                y1={compressed ? "60%" : "40%"}
                x2="50%"
                y2="20%"
                stroke="#64748b"
                strokeWidth="2"
                className="transition-all duration-1000"
              />

              {/* B Connection */}
              {/* Uncompressed: B(50, 60) -> C(50, 40) */}
              {/* Compressed: B(50, 60) -> R(50, 20) */}
              <line
                x1="50%"
                y1="60%"
                x2={compressed ? "50%" : "50%"}
                y2={compressed ? "20%" : "40%"}
                stroke="#64748b"
                strokeWidth="2"
                className="transition-all duration-1000"
              />

              {/* A Connection */}
              {/* Uncompressed: A(50, 80) -> B(50, 60) */}
              {/* Compressed: A(80, 60) -> R(50, 20) */}
              <line
                x1={compressed ? "80%" : "50%"}
                y1={compressed ? "60%" : "80%"}
                x2={compressed ? "50%" : "50%"}
                y2={compressed ? "20%" : "60%"}
                stroke="#64748b"
                strokeWidth="2"
                className="transition-all duration-1000"
              />
            </svg>

            <div className="relative w-full h-full">
              {/* Root R */}
              <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold z-20">
                R
              </div>

              {/* Node C */}
              <div
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold transition-all duration-1000 z-10 ${
                  compressed ? "top-[60%] left-[20%]" : "top-[40%] left-[50%]"
                }`}
              >
                C
              </div>

              {/* Node B */}
              <div
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold transition-all duration-1000 z-10 ${
                  compressed ? "top-[60%] left-[50%]" : "top-[60%] left-[50%]"
                }`}
              >
                B
              </div>

              {/* Node A */}
              <div
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold transition-all duration-1000 z-10 ${
                  compressed ? "top-[60%] left-[80%]" : "top-[80%] left-[50%]"
                }`}
              >
                A
              </div>
            </div>

            <button
              onClick={() => setCompressed(!compressed)}
              className="absolute bottom-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-bold transition-colors z-30"
            >
              {compressed ? "Reset Tree" : "Run Find(A) & Compress"}
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold text-green-400 mb-2">
                The "Almost O(1)" Secret
              </h3>
              <p className="text-sm text-slate-300 mb-2">
                When we find the root of <strong>A</strong>, we make{" "}
                <strong>A</strong> point directly to the root.
              </p>
              <p className="text-sm text-slate-300">
                Next time we search for A, it's just 1 hop away.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TrieGuideProps {
  initialPage?: number;
  onPageChange?: (page: number) => void;
  onComplete?: () => void;
}

const TrieGuide = ({
  initialPage = 1,
  onPageChange,
  onComplete,
}: TrieGuideProps) => {
  const [page, setPage] = useState(initialPage);
  const totalPages = 5;
  const [completedPages, setCompletedPages] = useState<boolean[]>(
    new Array(totalPages).fill(false)
  );

  useEffect(() => {
    if (initialPage) {
      setPage(initialPage);
    }
  }, [initialPage]);

  const markComplete = (pageIndex: number) => {
    setCompletedPages((prev) => {
      const newCompleted = [...prev];
      newCompleted[pageIndex] = true;
      return newCompleted;
    });
  };

  const nextPage = () => {
    markComplete(page - 1);
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      onPageChange?.(newPage);
    } else {
      onComplete?.();
    }
  };

  const prevPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      onPageChange?.(newPage);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full transition-colors ${
                i + 1 === page
                  ? "bg-purple-500"
                  : completedPages[i]
                  ? "bg-green-500"
                  : "bg-slate-700"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-slate-400">
          Page {page} of {totalPages}
        </span>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {page === 1 && <ConceptPage />}
        {page === 2 && <TrieImplPage />}
        {page === 3 && <WordSearchPage />}
        {page === 4 && <UnionFindPage />}
        {page === 5 && <OptimizationPage />}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-slate-800">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>
        <button
          onClick={nextPage}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
        >
          {page === totalPages ? "Complete Module" : "Next"}{" "}
          <ArrowRight
            className="w-4 h-
Analyzing Implementation Patterns
Here is the fully updated TrieGuide.tsx with the progress tracking integration.

4"
          />
        </button>
      </div>
    </div>
  );
};

export default TrieGuide;
