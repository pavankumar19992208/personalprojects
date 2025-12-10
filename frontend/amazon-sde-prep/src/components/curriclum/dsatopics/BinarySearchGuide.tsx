import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  //   Search,
  Scissors,
  //   TrendingDown,
  Clock,
  //   RotateCw,
  CheckCircle2,
  XCircle,
  Split,
} from "lucide-react";

interface BinarySearchGuideProps {
  initialPage?: number;
  onPageChange?: (page: number) => void;
  onComplete?: () => void;
}

const BinarySearchGuide: React.FC<BinarySearchGuideProps> = ({
  initialPage = 0,
  onPageChange,
  onComplete,
}) => {
  const totalPages = 4;
  // Convert 0-based initialPage to 1-based current page
  // If initialPage is >= totalPages (completed), show the last page
  const effectivePage = Math.min(Math.max(1, initialPage + 1), totalPages);

  const [page, setPage] = useState(effectivePage);

  // Track completed pages (0-based index)
  const [completedPages, setCompletedPages] = useState<boolean[]>(() => {
    const initial = new Array(totalPages).fill(false);
    const limit = initialPage >= totalPages ? totalPages : initialPage;
    for (let i = 0; i < limit; i++) {
      initial[i] = true;
    }
    return initial;
  });

  // Sync with parent prop changes
  useEffect(() => {
    const newPage = Math.min(Math.max(1, initialPage + 1), totalPages);
    setPage(newPage);

    setCompletedPages((prev) => {
      const next = [...prev];
      const limit = initialPage >= totalPages ? totalPages : initialPage;
      for (let i = 0; i < limit; i++) {
        next[i] = true;
      }
      return next;
    });
  }, [initialPage]);

  const markComplete = (pageIndex: number) => {
    const newCompleted = [...completedPages];
    newCompleted[pageIndex] = true;
    setCompletedPages(newCompleted);
  };

  const nextPage = () => {
    // Mark current page (0-based) as complete before moving
    markComplete(page - 1);

    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      onPageChange?.(newPage - 1); // Send 0-based index
    } else {
      // On last page, finish
      onPageChange?.(totalPages); // Send total length to indicate completion
      onComplete?.();
    }
  };

  const prevPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      onPageChange?.(newPage - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((i) => {
            const isCurrent = i === page;
            const isCompleted = completedPages[i - 1];
            let color = "bg-slate-700";
            if (isCurrent) color = "bg-blue-500";
            else if (isCompleted) color = "bg-green-500";

            return (
              <div
                key={i}
                className={`h-2 w-8 rounded-full transition-colors ${color}`}
              />
            );
          })}
        </div>
        <span className="text-sm text-slate-400">Page {page} of 4</span>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {page === 1 && <ConceptPage />}
        {page === 2 && <RotatedSearchPage />}
        {page === 3 && <FindMinPage />}
        {page === 4 && <KokoPage />}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-slate-800">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-300"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>
        <button
          onClick={nextPage}
          disabled={page === 4 && completedPages[3] && initialPage < totalPages}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            page === 4
              ? "bg-green-600 hover:bg-green-500 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {page === 4 ? "Finish Module" : "Next"}
          {page === 4 ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

// Page 1: The Concept
const ConceptPage = () => {
  const [step, setStep] = useState(0);

  // Simulation of cutting search space
  // 0: Full [0-100]
  // 1: Cut Left [50-100]
  // 2: Cut Right [50-75]
  // 3: Cut Left [62-75]

  const ranges = [
    { l: 0, r: 100, active: true },
    { l: 50, r: 100, active: true },
    { l: 50, r: 75, active: true },
    { l: 62, r: 75, active: true },
  ];

  const current = ranges[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Split className="text-blue-400" /> Divide & Conquer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Binary Search (O(log N))
              </h3>
              <p className="text-slate-300 text-sm mb-2">
                Cutting the search space in half at every step.
              </p>
              <p className="text-xs text-slate-400 italic">
                "Like opening a dictionary in the middle. If the word is 'Ze',
                you ignore A-M entirely."
              </p>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-slate-600">
              <h3 className="text-lg font-semibold text-slate-400 mb-2">
                Linear Search (O(N))
              </h3>
              <p className="text-slate-300 text-sm mb-2">
                Checking one by one. Too slow for millions of items.
              </p>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-white mb-2">
                The Amazon Twist
              </h3>
              <p className="text-xs text-slate-400">
                Standard Binary Search requires a Sorted Array. Amazon often
                asks about{" "}
                <span className="text-yellow-400">Rotated Sorted Arrays</span>{" "}
                (e.g.,{" "}
                <code className="bg-slate-900 px-1 rounded">
                  [3, 4, 5, 1, 2]
                </code>
                ).
              </p>
            </div>
          </div>

          <div className="bg-black/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-8">
            <div className="w-full h-32 relative flex items-center justify-center">
              {/* Background Bar (Ghost) */}
              <div className="absolute w-full h-12 bg-slate-800/30 rounded-lg"></div>

              {/* Active Search Space */}
              <div
                className="absolute h-12 bg-blue-600 rounded-lg transition-all duration-500 flex items-center justify-center overflow-hidden"
                style={{
                  left: `${current.l}%`,
                  width: `${current.r - current.l}%`,
                }}
              >
                <span className="text-white/20 font-bold text-4xl">
                  SEARCH SPACE
                </span>
              </div>

              {/* Knife Animation */}
              <div className="absolute top-0 bottom-0 w-0.5 bg-yellow-500 left-1/2 -translate-x-1/2 animate-pulse shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-500">
                  <Scissors className="w-5 h-5 rotate-90" />
                </div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-slate-400">
                Step {step + 1}: Search Space Size
              </p>
              <p className="text-2xl font-mono text-white">
                {current.r - current.l}%
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setStep(Math.min(ranges.length - 1, step + 1))}
                disabled={step === ranges.length - 1}
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 2: Search in Rotated Array
const RotatedSearchPage = () => {
  const [step, setStep] = useState(0);
  const nums = [4, 5, 6, 7, 0, 1, 2];
  const target = 0;

  const steps = [
    {
      l: 0,
      r: 6,
      m: 3,
      msg: "Mid=7. Left [4..7] is Sorted. Target 0 NOT in [4..7]. Go Right.",
    },
    {
      l: 4,
      r: 6,
      m: 5,
      msg: "Mid=1. Left [0..1] is Sorted. Target 0 IS in [0..1]. Go Left.",
    },
    { l: 4, r: 4, m: 4, msg: "Mid=0. Found Target!" },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern A: Search in Rotated Array
        </h2>
        <p className="text-slate-400 mb-6">
          Find index of <code className="text-white">{target}</code> in{" "}
          <code className="text-white">[4, 5, 6, 7, 0, 1, 2]</code>.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-black/40 p-6 rounded-xl border border-slate-800 h-64 flex flex-col justify-center">
              {/* Graph Visualization */}
              <div className="flex items-end justify-between h-32 px-4 gap-2 mb-8">
                {nums.map((n, idx) => {
                  const isActive = idx >= current.l && idx <= current.r;

                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center gap-2 group relative"
                    >
                      <div
                        className={`w-full rounded-t transition-all duration-300 ${
                          idx === current.m
                            ? "bg-yellow-500"
                            : isActive
                            ? "bg-blue-500"
                            : "bg-slate-800 opacity-30"
                        }`}
                        style={{ height: `${(n + 1) * 10}%` }}
                      ></div>
                      <span
                        className={`text-xs font-bold ${
                          isActive ? "text-white" : "text-slate-600"
                        }`}
                      >
                        {n}
                      </span>

                      {/* Pointers */}
                      {idx === current.l && (
                        <div className="absolute -bottom-8 text-xs text-green-400 font-bold">
                          L
                        </div>
                      )}
                      {idx === current.r && (
                        <div className="absolute -bottom-8 text-xs text-green-400 font-bold">
                          R
                        </div>
                      )}
                      {idx === current.m && (
                        <div className="absolute -bottom-8 text-xs text-yellow-400 font-bold">
                          M
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="bg-slate-800/50 p-3 rounded text-center">
                <p className="text-sm text-yellow-300">{current.msg}</p>
              </div>
            </div>

            <div className="flex justify-center gap-2">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                disabled={step === steps.length - 1}
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-400 mb-2">The Logic</h3>
              <p className="text-sm text-slate-300 mb-2">
                In a rotated array, at least one half (Left or Right) is always
                perfectly sorted.
              </p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>
                  Check Left Half:{" "}
                  <code className="text-white">nums[L] &lt;= nums[Mid]</code>?
                </li>
                <li>If Yes: Is Target in this range?</li>
                <li>If No: Right Half must be sorted. Check that range.</li>
              </ul>
            </div>

            <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto text-xs text-slate-300 font-mono leading-relaxed border border-slate-800">
              {`while l <= r:
    mid = (l + r) // 2
    if nums[mid] == target: return mid
    
    # Left Sorted?
    if nums[l] <= nums[mid]:
        if nums[l] <= target < nums[mid]:
            r = mid - 1
        else:
            l = mid + 1
    # Right Sorted
    else:
        if nums[mid] < target <= nums[r]:
            l = mid + 1
        else:
            r = mid - 1`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 3: Find Minimum
const FindMinPage = () => {
  const [step, setStep] = useState(0);
  const nums = [3, 4, 5, 1, 2];

  const steps = [
    {
      l: 0,
      r: 4,
      m: 2,
      msg: "Mid(5) > Right(2). Cliff is to the Right. Go Right.",
    },
    {
      l: 3,
      r: 4,
      m: 3,
      msg: "Mid(1) <= Right(2). Min is Left or Current. Go Left.",
    },
    { l: 3, r: 3, m: 3, msg: "L=R. Found Min: 1" },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern B: Find Minimum
        </h2>
        <p className="text-slate-400 mb-6">
          Find the minimum element (pivot point) in{" "}
          <code className="text-white">[3, 4, 5, 1, 2]</code>.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-black/40 p-6 rounded-xl border border-slate-800 h-64 flex flex-col justify-center">
              {/* Cliff Visualization */}
              <div className="flex items-end justify-between h-32 px-4 gap-2 mb-8 relative">
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <polyline
                    points="20,80 80,60 140,40 200,120 260,100"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>

                {nums.map((n, idx) => {
                  const isActive = idx >= current.l && idx <= current.r;
                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center gap-2 group relative z-10"
                    >
                      <div
                        className={`w-full rounded-t transition-all duration-300 ${
                          idx === current.m
                            ? "bg-yellow-500"
                            : isActive
                            ? "bg-purple-500"
                            : "bg-slate-800 opacity-30"
                        }`}
                        style={{ height: `${(n + 1) * 15}%` }}
                      ></div>
                      <span
                        className={`text-xs font-bold ${
                          isActive ? "text-white" : "text-slate-600"
                        }`}
                      >
                        {n}
                      </span>

                      {idx === current.l && (
                        <div className="absolute -bottom-8 text-xs text-green-400 font-bold">
                          L
                        </div>
                      )}
                      {idx === current.r && (
                        <div className="absolute -bottom-8 text-xs text-green-400 font-bold">
                          R
                        </div>
                      )}
                      {idx === current.m && (
                        <div className="absolute -bottom-8 text-xs text-yellow-400 font-bold">
                          M
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="bg-slate-800/50 p-3 rounded text-center">
                <p className="text-sm text-yellow-300">{current.msg}</p>
              </div>
            </div>

            <div className="flex justify-center gap-2">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                disabled={step === steps.length - 1}
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-semibold text-purple-400 mb-2">
                The Logic (Cliff Dive)
              </h3>
              <p className="text-sm text-slate-300 mb-2">
                We want to find the "cliff" where numbers drop.
              </p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>
                  If{" "}
                  <code className="text-white">nums[Mid] &gt; nums[Right]</code>
                  : The drop is to the Right.{" "}
                  <code className="text-purple-300">L = Mid + 1</code>.
                </li>
                <li>
                  Else: We are on the low side. Min is Left or Current.{" "}
                  <code className="text-purple-300">R = Mid</code>.
                </li>
              </ul>
            </div>

            <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto text-xs text-slate-300 font-mono leading-relaxed border border-slate-800">
              {`while l < r:
    mid = (l + r) // 2
    
    # Cliff is to the right
    if nums[mid] > nums[r]:
        l = mid + 1
    # Min is mid or left
    else:
        r = mid
        
return nums[l]`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 4: Koko Eating Bananas
const KokoPage = () => {
  const [step, setStep] = useState(0);
  const piles = [3, 6, 7, 11];
  const H = 8;

  const steps = [
    {
      l: 1,
      r: 11,
      k: 6,
      hours: 6,
      msg: "Speed 6. Hours: 1+1+2+2 = 6. (6 <= 8). Success! Try Slower.",
    },
    {
      l: 1,
      r: 5,
      k: 3,
      hours: 10,
      msg: "Speed 3. Hours: 1+2+3+4 = 10. (10 > 8). Too Slow! Go Faster.",
    },
    {
      l: 4,
      r: 5,
      k: 4,
      hours: 8,
      msg: "Speed 4. Hours: 1+2+2+3 = 8. (8 <= 8). Success! Try Slower.",
    },
    { l: 4, r: 3, k: 4, hours: 0, msg: "L > R. Search End. Result: 4" },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern C: Answer on Range (Koko)
        </h2>
        <p className="text-slate-400 mb-6">
          Find min speed <code className="text-white">K</code> to eat all piles{" "}
          <code className="text-white">[3, 6, 7, 11]</code> within{" "}
          <code className="text-white">H=8</code> hours.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center">
            {/* Speedometer / Slider Visual */}
            <div className="w-full mb-8">
              <div className="flex justify-between text-xs text-slate-500 mb-2">
                <span>Speed 1</span>
                <span>Speed 11</span>
              </div>
              <div className="h-4 bg-slate-800 rounded-full relative">
                {/* Active Range */}
                <div
                  className="absolute h-full bg-blue-900/50 rounded-full transition-all duration-300"
                  style={{
                    left: `${((current.l - 1) / 10) * 100}%`,
                    width: `${((current.r - current.l) / 10) * 100}%`,
                  }}
                ></div>
                {/* Knob */}
                {step < 3 && (
                  <div
                    className="absolute w-6 h-6 bg-blue-500 rounded-full -top-1 -ml-3 border-2 border-white shadow-lg transition-all duration-500 flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ left: `${((current.k - 1) / 10) * 100}%` }}
                  >
                    {current.k}
                  </div>
                )}
              </div>
            </div>

            {/* Piles Visual */}
            <div className="flex gap-4 items-end h-32 mb-6">
              {piles.map((p, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-12 bg-yellow-500/20 border border-yellow-500/50 rounded flex flex-col justify-end overflow-hidden relative">
                    <div
                      style={{ height: `${p * 8}px` }}
                      className="bg-yellow-500 w-full opacity-80"
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black/50">
                      {p}
                    </div>
                  </div>
                  {step < 3 && (
                    <div className="text-xs text-slate-400">
                      {Math.ceil(p / current.k)}h
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg w-full text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-lg font-bold text-white">
                  {step < 3 ? current.hours : 8} / {H} Hours
                </span>
                {step < 3 &&
                  (current.hours <= H ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  ))}
              </div>
              <p className="text-sm text-slate-300">{current.msg}</p>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                disabled={step === steps.length - 1}
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold text-green-400 mb-2">
                Binary Search on Answer
              </h3>
              <p className="text-sm text-slate-300 mb-2">
                We are not searching the array. We are searching the{" "}
                <span className="text-white font-bold">
                  Range of Possible Speeds
                </span>{" "}
                [1...MaxPile].
              </p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>
                  If <code className="text-white">Hours &lt;= H</code>:
                  Possible! But can we do it slower?{" "}
                  <code className="text-green-300">Go Left</code>.
                </li>
                <li>
                  If <code className="text-white">Hours &gt; H</code>: Too slow!
                  Must eat faster.{" "}
                  <code className="text-green-300">Go Right</code>.
                </li>
              </ul>
            </div>

            <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto text-xs text-slate-300 font-mono leading-relaxed border border-slate-800">
              {`def minEatingSpeed(piles, h):
    l, r = 1, max(piles)
    res = r

    while l <= r:
        k = (l + r) // 2
        
        # Calculate hours needed
        hours = sum(math.ceil(p / k) for p in piles)
        
        if hours <= h:
            res = k
            r = k - 1 # Try slower
        else:
            l = k + 1 # Need faster
            
    return res`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinarySearchGuide;
