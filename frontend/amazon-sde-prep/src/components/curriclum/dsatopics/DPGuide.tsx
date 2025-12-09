import React, { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Brain,
  // Calculator,
  // Home,
  // Grid,
  // Table,
  // ArrowDown,
  // CornerDownRight,
} from "lucide-react";

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

// Page 1: Concept - Memoization vs Tabulation
const ConceptPage = () => {
  const [step, setStep] = useState(0);

  // Tree Structure for Fib(3)
  // Root: 3
  // L: 2, R: 1
  // L->L: 1, L->R: 0
  // Steps:
  // 0: Start Fib(3).
  // 1: Go Left Fib(2).
  // 2: Go Left Fib(1). Base Case. Return 1. (Green)
  // 3: Go Right Fib(0). Base Case. Return 0. (Green)
  // 4: Calc Fib(2) = 1+0 = 1. Store in Cache. (Green)
  // 5: Go Right Fib(1). Check Cache? No, usually simple base case, but let's pretend we cache everything.
  //    Actually, let's show Fib(4) structure simplified or just Fib(3) with cache hit on Fib(1) if it was complex.
  //    Let's stick to the prompt's "Left branch calculates... Right branch asks... Cache Hit".
  //    Let's use Fib(3) where Fib(1) is called twice?
  //    Fib(3) -> Fib(2), Fib(1).
  //    Fib(2) -> Fib(1), Fib(0).
  //    So Fib(1) is the repeated subproblem.

  const steps = [
    { msg: "Calculate Fib(3). Break into Fib(2) + Fib(1).", active: "root" },
    { msg: "Left Branch: Solve Fib(2) first.", active: "l" },
    { msg: "Fib(2) needs Fib(1) + Fib(0). Solving...", active: "ll" },
    { msg: "Fib(1) & Fib(0) solved. Fib(2) = 1. CACHED.", active: "l-done" },
    { msg: "Right Branch: Need Fib(1).", active: "r" },
    {
      msg: "Check Cache... HIT! Value 1 retrieved instantly.",
      active: "cache-hit",
    },
    { msg: "Fib(3) = Fib(2) + Fib(1) = 1 + 1 = 2.", active: "done" },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Brain className="text-purple-400" /> The Core Philosophy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">
                Recursion + Caching
              </h3>
              <p className="text-slate-300 text-sm mb-2">
                "Those who cannot remember the past are condemned to repeat it."
              </p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>
                  <strong className="text-white">
                    Memoization (Top-Down):
                  </strong>{" "}
                  Recursion with a lookup table.
                </li>
                <li>
                  <strong className="text-white">
                    Tabulation (Bottom-Up):
                  </strong>{" "}
                  Iterative table filling.
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-white mb-2">Why DP?</h3>
              <p className="text-xs text-slate-400">
                Turns exponential <code className="text-red-400">O(2^N)</code>{" "}
                brute force into linear{" "}
                <code className="text-green-400">O(N)</code> by solving each
                sub-problem only once.
              </p>
            </div>
          </div>

          <div className="bg-black/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center h-64 relative">
            {/* Tree Visual */}
            <div className="relative flex flex-col items-center gap-8 w-full">
              {/* Level 0 */}
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold z-10 transition-all duration-500 ${
                  current.active === "done"
                    ? "bg-green-600 border-green-500 text-white"
                    : "bg-slate-800 border-slate-600 text-slate-400"
                }`}
              >
                F(3)
              </div>

              {/* Level 1 */}
              <div className="flex gap-16 w-full justify-center relative">
                {/* Left Branch F(2) */}
                <div className="relative flex flex-col items-center">
                  <div
                    className={`absolute -top-8 left-1/2 w-0.5 h-8 bg-slate-600 -translate-x-1/2 origin-bottom -rotate-12`}
                  ></div>
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold z-10 transition-all duration-500 ${
                      ["l", "ll", "l-done", "r", "cache-hit", "done"].includes(
                        current.active
                      )
                        ? "bg-green-600 border-green-500 text-white"
                        : "bg-slate-800 border-slate-600 text-slate-400"
                    }`}
                  >
                    F(2)
                  </div>
                  {/* Children of F(2) */}
                  <div
                    className={`absolute top-14 flex gap-4 transition-opacity duration-500 ${
                      ["ll", "l-done", "r", "cache-hit", "done"].includes(
                        current.active
                      )
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    <div className="text-xs text-slate-500 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center mb-1">
                        1
                      </div>
                      F(1)
                    </div>
                    <div className="text-xs text-slate-500 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center mb-1">
                        0
                      </div>
                      F(0)
                    </div>
                  </div>
                </div>

                {/* Right Branch F(1) */}
                <div className="relative flex flex-col items-center">
                  <div
                    className={`absolute -top-8 left-1/2 w-0.5 h-8 bg-slate-600 -translate-x-1/2 origin-bottom rotate-12`}
                  ></div>
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold z-10 transition-all duration-500 ${
                      ["cache-hit", "done"].includes(current.active)
                        ? "bg-green-600 border-green-500 text-white"
                        : current.active === "r"
                        ? "bg-yellow-500 border-yellow-400 text-black"
                        : "bg-slate-800 border-slate-600 text-slate-400"
                    }`}
                  >
                    F(1)
                  </div>
                </div>

                {/* Cache Hit Arrow */}
                {["cache-hit", "done"].includes(current.active) && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-green-400 animate-in slide-in-from-left-4 fade-in duration-700">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-green-400 font-bold bg-black/80 px-1 rounded whitespace-nowrap">
                      Cache Hit
                    </div>
                    <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-green-400 rotate-45"></div>
                  </div>
                )}
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
        </div>
      </div>
    </div>
  );
};

// Page 2: House Robber
const HouseRobberPage = () => {
  const [step, setStep] = useState(0);

  // Houses: [1, 2, 3, 1]
  // Steps:
  // 0: Init. rob1=0, rob2=0.
  // 1: House 0 ($1). Max(1+0, 0) = 1. rob1=0, rob2=1.
  // 2: House 1 ($2). Max(2+0, 1) = 2. rob1=1, rob2=2.
  // 3: House 2 ($3). Max(3+1, 2) = 4. rob1=2, rob2=4.
  // 4: House 3 ($1). Max(1+2, 4) = 4. rob1=4, rob2=4.

  const houses = [1, 2, 3, 1];
  const steps = [
    {
      idx: -1,
      rob1: 0,
      rob2: 0,
      msg: "Start. rob1=0 (prev-prev), rob2=0 (prev).",
    },
    {
      idx: 0,
      rob1: 0,
      rob2: 1,
      calc: "max(1+0, 0) = 1",
      msg: "House 0 ($1). Rob it!",
    },
    {
      idx: 1,
      rob1: 1,
      rob2: 2,
      calc: "max(2+0, 1) = 2",
      msg: "House 1 ($2). Rob it (Skip H0)!",
    },
    {
      idx: 2,
      rob1: 2,
      rob2: 4,
      calc: "max(3+1, 2) = 4",
      msg: "House 2 ($3). Rob it + H0 loot ($1) = $4.",
    },
    {
      idx: 3,
      rob1: 4,
      rob2: 4,
      calc: "max(1+2, 4) = 4",
      msg: "House 3 ($1). Skip it. Keep H2 loot ($4).",
    },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern A: 1D DP (House Robber)
        </h2>
        <p className="text-slate-400 mb-6">
          Decision Making: Rob current + (i-2) OR Skip current + (i-1).
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-black/40 p-6 rounded-xl border border-slate-800 h-64 flex flex-col items-center justify-center relative">
              <div className="flex gap-4 items-end mb-8">
                {houses.map((val, i) => {
                  const isCurrent = i === current.idx;
                  const isPrev = i === current.idx - 1;
                  const isPrevPrev = i === current.idx - 2;

                  return (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div
                        className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 font-bold text-lg transition-all duration-500 ${
                          isCurrent
                            ? "bg-blue-600 border-blue-400 text-white scale-110 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                            : isPrev
                            ? "bg-slate-800 border-red-500/50 text-slate-400"
                            : isPrevPrev
                            ? "bg-slate-800 border-green-500/50 text-slate-400"
                            : "bg-slate-800 border-slate-700 text-slate-600"
                        }`}
                      >
                        ${val}
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        idx:{i}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-8 text-sm font-mono">
                <div className="flex flex-col items-center">
                  <span className="text-slate-500 text-xs">rob1 (i-2)</span>
                  <span className="text-green-400 font-bold text-xl">
                    {current.rob1}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-slate-500 text-xs">rob2 (i-1)</span>
                  <span className="text-blue-400 font-bold text-xl">
                    {current.rob2}
                  </span>
                </div>
              </div>

              <div className="absolute bottom-2 bg-slate-800/80 px-3 py-1 rounded text-xs text-yellow-300 border border-slate-700">
                {current.msg}{" "}
                <span className="text-slate-400 ml-2">{current.calc}</span>
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
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-400 mb-2">The Logic</h3>
              <p className="text-sm text-slate-300 mb-2">
                At every house <code className="text-white">i</code>, choose max
                of:
              </p>
              <ol className="list-decimal list-inside text-sm text-slate-400 space-y-1">
                <li>
                  <strong className="text-white">Rob:</strong>{" "}
                  <code className="text-green-400">money[i] + rob1</code>
                </li>
                <li>
                  <strong className="text-white">Skip:</strong>{" "}
                  <code className="text-red-400">rob2</code>
                </li>
              </ol>
            </div>

            <CodeBlock
              code={`def rob(nums):
    rob1, rob2 = 0, 0
    for n in nums:
        # Max(Current + PrevPrev, Prev)
        newRob = max(n + rob1, rob2)
        rob1 = rob2
        rob2 = newRob
    return rob2`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 3: Unique Paths
const UniquePathsPage = () => {
  const [step, setStep] = useState(0);

  // Grid 3x3
  // Steps:
  // 0: Init. Top row/Left col = 1.
  // 1: Fill (1,1). 1+1=2.
  // 2: Fill (1,2). 1+2=3.
  // 3: Fill (2,1). 2+1=3.
  // 4: Fill (2,2). 3+3=6.

  const steps = [
    {
      grid: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 0, 0],
      ],
      active: null,
      msg: "Init: Top row & Left col are 1 (Only 1 way to reach).",
    },
    {
      grid: [
        [1, 1, 1],
        [1, 2, 0],
        [1, 0, 0],
      ],
      active: [1, 1],
      parents: [
        [0, 1],
        [1, 0],
      ],
      msg: "Cell (1,1) = Top(1) + Left(1) = 2.",
    },
    {
      grid: [
        [1, 1, 1],
        [1, 2, 3],
        [1, 0, 0],
      ],
      active: [1, 2],
      parents: [
        [0, 2],
        [1, 1],
      ],
      msg: "Cell (1,2) = Top(1) + Left(2) = 3.",
    },
    {
      grid: [
        [1, 1, 1],
        [1, 2, 3],
        [1, 3, 0],
      ],
      active: [2, 1],
      parents: [
        [1, 1],
        [2, 0],
      ],
      msg: "Cell (2,1) = Top(2) + Left(1) = 3.",
    },
    {
      grid: [
        [1, 1, 1],
        [1, 2, 3],
        [1, 3, 6],
      ],
      active: [2, 2],
      parents: [
        [1, 2],
        [2, 1],
      ],
      msg: "Cell (2,2) = Top(3) + Left(3) = 6. Done!",
    },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern B: 2D Grid DP (Unique Paths)
        </h2>
        <p className="text-slate-400 mb-6">
          Sum of Parents: Ways(r, c) = Ways(Up) + Ways(Left).
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-black/40 p-6 rounded-xl border border-slate-800 h-64 flex flex-col items-center justify-center relative">
              <div className="grid grid-cols-3 gap-2">
                {current.grid.map((row, r) =>
                  row.map((val, c) => {
                    const isActive =
                      current.active &&
                      current.active[0] === r &&
                      current.active[1] === c;
                    const isParent =
                      current.parents &&
                      current.parents.some((p) => p[0] === r && p[1] === c);

                    return (
                      <div
                        key={`${r}-${c}`}
                        className={`w-12 h-12 rounded flex items-center justify-center font-bold transition-all duration-500 ${
                          isActive
                            ? "bg-purple-600 text-white scale-110 z-10 shadow-[0_0_15px_rgba(147,51,234,0.5)]"
                            : isParent
                            ? "bg-slate-700 text-green-400 border border-green-500/50"
                            : val > 0
                            ? "bg-slate-800 text-slate-300"
                            : "bg-slate-900 text-slate-700"
                        }`}
                      >
                        {val > 0 ? val : "?"}
                      </div>
                    );
                  })
                )}
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
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-semibold text-purple-400 mb-2">
                Combinatorics on a Grid
              </h3>
              <p className="text-sm text-slate-300 mb-2">
                To reach <code className="text-white">(r, c)</code>, you must
                come from:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>
                  <strong className="text-white">Top:</strong> (r-1, c)
                </li>
                <li>
                  <strong className="text-white">Left:</strong> (r, c-1)
                </li>
              </ul>
            </div>

            <CodeBlock
              code={`def uniquePaths(m, n):
    row = [1] * n
    for i in range(m - 1):
        newRow = [1] * n
        for j in range(1, n):
            # Right = Right + Down
            newRow[j] = newRow[j-1] + row[j]
        row = newRow
    return row[-1]`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 4: LCS
const LCSPage = () => {
  const [step, setStep] = useState(0);

  // Str1: "abc", Str2: "ac"
  // Grid 4x3 (rows 0-3, cols 0-2)
  // 0: Init.
  // 1: 'a' vs 'a'. Match. 1 + diag(0) = 1.
  // 2: 'b' vs 'a'. No. Max(Top, Left) = 1.
  // 3: 'c' vs 'a'. No. Max(Top, Left) = 1.
  // 4: 'a' vs 'c'. No. Max...
  // Let's just show the diagonal match logic for 'a'=='a' and 'c'=='c'.

  // Simplified steps for visual clarity
  const steps = [
    {
      hl: [1, 1],
      match: true,
      val: 1,
      msg: "'a' == 'a'. Match! 1 + Diagonal(0) = 1.",
    },
    {
      hl: [2, 1],
      match: false,
      val: 1,
      msg: "'b' != 'a'. No Match. Max(Top, Left) = 1.",
    },
    {
      hl: [3, 1],
      match: false,
      val: 1,
      msg: "'c' != 'a'. No Match. Max(Top, Left) = 1.",
    },
    {
      hl: [1, 2],
      match: false,
      val: 1,
      msg: "'a' != 'c'. No Match. Max(Top, Left) = 1.",
    },
    {
      hl: [2, 2],
      match: false,
      val: 1,
      msg: "'b' != 'c'. No Match. Max(Top, Left) = 1.",
    },
    {
      hl: [3, 2],
      match: true,
      val: 2,
      msg: "'c' == 'c'. Match! 1 + Diagonal(1) = 2.",
    },
  ];

  // Static grid state for the final step
  const grid = [
    [0, 0, 0],
    [0, 1, 1],
    [0, 1, 1],
    [0, 1, 2],
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern C: Longest Common Subsequence
        </h2>
        <p className="text-slate-400 mb-6">
          2D Matrix. Diagonal for Match, Max(Top, Left) for No Match.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center h-64 relative">
            <div className="grid grid-cols-4 gap-1">
              {/* Header Row */}
              <div className="w-8 h-8"></div>
              <div className="w-8 h-8 flex items-center justify-center text-slate-500 text-xs">
                ""
              </div>
              <div className="w-8 h-8 flex items-center justify-center text-slate-300 font-bold">
                a
              </div>
              <div className="w-8 h-8 flex items-center justify-center text-slate-300 font-bold">
                c
              </div>

              {/* Rows */}
              {["", "a", "b", "c"].map((char, r) => (
                <React.Fragment key={r}>
                  <div className="w-8 h-8 flex items-center justify-center text-slate-300 font-bold">
                    {char === "" ? '""' : char}
                  </div>
                  {[0, 1, 2].map((c) => {
                    // Determine value based on step
                    // If current step index >= cell calculation order, show value
                    // Calculation order: (1,1)->(2,1)->(3,1)->(1,2)->(2,2)->(3,2)
                    // Map (r,c) to step index
                    let stepIdx = -1;
                    if (c === 0 || r === 0) stepIdx = -1; // Base cases always 0
                    else if (c === 1) stepIdx = r - 1; // 0, 1, 2
                    else if (c === 2) stepIdx = 3 + (r - 1); // 3, 4, 5

                    const showVal = step >= stepIdx;
                    const isHighlight =
                      current.hl[0] === r && current.hl[1] === c;

                    return (
                      <div
                        key={c}
                        className={`w-8 h-8 flex items-center justify-center rounded border text-sm transition-all duration-300 ${
                          isHighlight
                            ? current.match
                              ? "bg-green-600 border-green-400 text-white scale-110"
                              : "bg-yellow-600 border-yellow-400 text-white scale-110"
                            : "bg-slate-800 border-slate-700 text-slate-500"
                        }`}
                      >
                        {c === 0 || r === 0 ? 0 : showVal ? grid[r][c] : ""}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
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
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-orange-500">
              <h3 className="font-semibold text-orange-400 mb-2">
                The Recurrence
              </h3>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-2">
                <li>
                  <strong className="text-white">Match (A[i] == B[j]):</strong>
                  <br />
                  <span className="text-green-400 ml-4">
                    1 + dp[i-1][j-1]
                  </span>{" "}
                  (Diagonal)
                </li>
                <li>
                  <strong className="text-white">No Match:</strong>
                  <br />
                  <span className="text-yellow-400 ml-4">
                    max(dp[i-1][j], dp[i][j-1])
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DPGuide = () => {
  const [page, setPage] = useState(1);

  const nextPage = () => setPage((p) => Math.min(4, p + 1));
  const prevPage = () => setPage((p) => Math.max(1, p - 1));

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full transition-colors ${
                i <= page ? "bg-purple-500" : "bg-slate-700"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-slate-400">Page {page} of 4</span>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {page === 1 && <ConceptPage />}
        {page === 2 && <HouseRobberPage />}
        {page === 3 && <UniquePathsPage />}
        {page === 4 && <LCSPage />}
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
          disabled={page === 4}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DPGuide;
