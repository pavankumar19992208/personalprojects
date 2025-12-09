import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  //   Code,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  MoveHorizontal,
  Layers,
  //   Droplets,
  //   Minimize,
} from "lucide-react";

const TwoPointersGuide = () => {
  const [page, setPage] = useState(1);

  const nextPage = () => setPage((p) => Math.min(5, p + 1));
  const prevPage = () => setPage((p) => Math.max(1, p - 1));

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full transition-colors ${
                i <= page ? "bg-blue-500" : "bg-slate-700"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-slate-400">Page {page} of 5</span>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {page === 1 && <ConceptPage />}
        {page === 2 && <ThreeSumPage />}
        {page === 3 && <ValidParenthesesPage />}
        {page === 4 && <TrappingRainWaterPage />}
        {page === 5 && <MinStackPage />}
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
          disabled={page === 5}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Page 1: The Concept
const ConceptPage = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <MoveHorizontal className="text-blue-400" /> Two Pointers vs.{" "}
          <Layers className="text-purple-400" /> Stack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Two Pointers
              </h3>
              <p className="text-slate-300 text-sm mb-2">
                Primarily used to optimize loops from{" "}
                <span className="font-mono text-yellow-400">O(N²)</span> to{" "}
                <span className="font-mono text-green-400">O(N)</span> by
                manipulating indices based on logic (usually on sorted arrays).
              </p>
              <p className="text-xs text-slate-400 italic">
                "Reading a book from both ends at once to find a specific
                sentence."
              </p>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">
                Stack (LIFO)
              </h3>
              <p className="text-slate-300 text-sm mb-2">
                Used when the "most recent" element is the only one that matters
                for the current decision.
              </p>
              <p className="text-xs text-slate-400 italic">
                "A stack of plates. You can only inspect or remove the top one."
              </p>
            </div>
          </div>

          <div className="bg-black/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-8">
            {/* Visual A: Pointers */}
            <div className="w-full">
              <div className="text-xs text-center text-slate-500 mb-2">
                Two Pointers: Converging on Target
              </div>
              <div className="flex justify-between items-end h-16 px-4 gap-1">
                {[2, 4, 5, 7, 9, 11].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-slate-700 rounded-t-sm relative group"
                    style={{ height: `${h * 8}%` }}
                  >
                    {i === 0 && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-blue-400 animate-bounce">
                        <ArrowRight className="w-4 h-4 rotate-90" />
                        <span className="text-[10px] font-bold">L</span>
                      </div>
                    )}
                    {i === 5 && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-blue-400 animate-bounce">
                        <ArrowRight className="w-4 h-4 rotate-90" />
                        <span className="text-[10px] font-bold">R</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Visual B: Stack */}
            <div className="w-full flex flex-col items-center">
              <div className="text-xs text-center text-slate-500 mb-2">
                Stack: LIFO Processing
              </div>
              <div className="w-16 h-24 border-b-4 border-x-4 border-slate-600 rounded-b-lg relative flex flex-col-reverse items-center p-1 gap-1 bg-slate-900/50">
                <div className="w-10 h-4 bg-purple-500 rounded-full animate-in slide-in-from-top-8 fade-in duration-700 delay-300"></div>
                <div className="w-10 h-4 bg-purple-600 rounded-full animate-in slide-in-from-top-8 fade-in duration-700 delay-150"></div>
                <div className="w-10 h-4 bg-purple-700 rounded-full animate-in slide-in-from-top-8 fade-in duration-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 2: 3Sum
const ThreeSumPage = () => {
  const [step, setStep] = useState(0);

  // Simplified array for demo: [-4, -1, -1, 0, 1, 2]
  // Target: 0
  const nums = [-4, -1, -1, 0, 1, 2];

  // Simulation steps
  const steps = [
    {
      i: 0,
      l: 1,
      r: 5,
      msg: "i=-4. Need sum 4. L=-1, R=2. Sum=1 (Too small, L++)",
    },
    {
      i: 0,
      l: 2,
      r: 5,
      msg: "i=-4. Need sum 4. L=-1, R=2. Sum=1 (Too small, L++)",
    },
    {
      i: 0,
      l: 3,
      r: 5,
      msg: "i=-4. Need sum 4. L=0, R=2. Sum=2 (Too small, L++)",
    },
    { i: 1, l: 2, r: 5, msg: "i=-1. Need sum 1. L=-1, R=2. Sum=1 (MATCH!)" },
    {
      i: 1,
      l: 3,
      r: 4,
      msg: "Found [-1, -1, 2]. Move L++, R--. L=0, R=1. Sum=1 (MATCH!)",
    },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern A: Two Pointers (3Sum)
        </h2>
        <p className="text-slate-400 mb-6">
          Find all unique triplets{" "}
          <code className="bg-slate-800 px-1 rounded">[a, b, c]</code> that sum
          to zero.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-black/40 p-6 rounded-xl border border-slate-800">
              <div className="flex justify-center gap-2 mb-8">
                {nums.map((n, idx) => (
                  <div
                    key={idx}
                    className={`
                      w-10 h-10 flex items-center justify-center rounded font-bold transition-all duration-300
                      ${
                        idx === current.i
                          ? "bg-blue-600 scale-110 ring-2 ring-blue-400"
                          : ""
                      }
                      ${
                        idx === current.l
                          ? "bg-green-600 scale-110 ring-2 ring-green-400"
                          : ""
                      }
                      ${
                        idx === current.r
                          ? "bg-green-600 scale-110 ring-2 ring-green-400"
                          : ""
                      }
                      ${
                        idx !== current.i &&
                        idx !== current.l &&
                        idx !== current.r
                          ? "bg-slate-700 text-slate-400"
                          : "text-white"
                      }
                    `}
                  >
                    {n}
                    {idx === current.i && (
                      <div className="absolute -bottom-6 text-[10px] text-blue-400 font-normal">
                        i (Fix)
                      </div>
                    )}
                    {idx === current.l && (
                      <div className="absolute -bottom-6 text-[10px] text-green-400 font-normal">
                        L
                      </div>
                    )}
                    {idx === current.r && (
                      <div className="absolute -bottom-6 text-[10px] text-green-400 font-normal">
                        R
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg text-center">
                <p className="text-sm font-mono text-yellow-300 mb-1">
                  Current Sum: {nums[current.i]} + {nums[current.l]} +{" "}
                  {nums[current.r]} ={" "}
                  {nums[current.i] + nums[current.l] + nums[current.r]}
                </p>
                <p className="text-xs text-slate-400">{current.msg}</p>
              </div>

              <div className="flex justify-center gap-2 mt-4">
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

            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-400 mb-2">The Strategy</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300">
                <li>
                  <span className="text-white font-medium">Sort</span> the array
                  first (Crucial!).
                </li>
                <li>
                  Loop <code className="text-blue-300">i</code> from 0 to N.
                  This is fixed 'a'.
                </li>
                <li>
                  Set <code className="text-green-300">L = i + 1</code> and{" "}
                  <code className="text-green-300">R = End</code>.
                </li>
                <li>
                  If Sum &gt; 0, <code className="text-green-300">R--</code>. If
                  Sum &lt; 0, <code className="text-green-300">L++</code>.
                </li>
              </ol>
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-2 right-2 flex gap-2">
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Time:
                O(N²)
              </div>
            </div>
            <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto text-xs text-slate-300 font-mono leading-relaxed border border-slate-800">
              {`def threeSum(nums):
    res = []
    nums.sort()
    
    for i in range(len(nums)):
        # Skip positive integers
        if nums[i] > 0: break
        # Skip duplicate 'a'
        if i > 0 and nums[i] == nums[i-1]:
            continue
            
        l, r = i + 1, len(nums) - 1
        while l < r:
            threeSum = nums[i] + nums[l] + nums[r]
            if threeSum > 0:
                r -= 1
            elif threeSum < 0:
                l += 1
            else:
                res.append([nums[i], nums[l], nums[r]])
                l += 1
                r -= 1
                # Skip duplicate 'b'
                while nums[l] == nums[l-1] and l < r:
                    l += 1
    return res`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 3: Valid Parentheses
const ValidParenthesesPage = () => {
  const [stack, setStack] = useState<string[]>([]);
  const [inputIndex, setInputIndex] = useState(0);
  const [status, setStatus] = useState<"processing" | "valid" | "invalid">(
    "processing"
  );

  const input = "{[]}";
  const chars = input.split("");

  const reset = () => {
    setStack([]);
    setInputIndex(0);
    setStatus("processing");
  };

  const step = () => {
    if (inputIndex >= chars.length) return;

    const char = chars[inputIndex];
    const pairs: Record<string, string> = { "}": "{", "]": "[", ")": "(" };

    if (["{", "[", "("].includes(char)) {
      setStack((prev) => [...prev, char]);
      if (inputIndex === chars.length - 1) setStatus("invalid"); // Ended with open
    } else {
      const last = stack[stack.length - 1];
      if (last === pairs[char]) {
        setStack((prev) => prev.slice(0, -1));
        if (inputIndex === chars.length - 1 && stack.length === 1)
          setStatus("valid");
      } else {
        setStatus("invalid");
        return;
      }
    }
    setInputIndex((prev) => prev + 1);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern B: The Stack (Valid Parentheses)
        </h2>
        <p className="text-slate-400 mb-6">
          Validate that every opening bracket has a corresponding closing
          bracket in the correct order.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 p-8 rounded-xl border border-slate-800 flex flex-col items-center">
            {/* Input Strip */}
            <div className="flex gap-2 mb-8">
              {chars.map((c, i) => (
                <div
                  key={i}
                  className={`
                    w-8 h-8 flex items-center justify-center rounded font-mono text-lg
                    ${
                      i === inputIndex
                        ? "bg-yellow-500 text-black ring-2 ring-yellow-300"
                        : i < inputIndex
                        ? "bg-slate-700 text-slate-500"
                        : "bg-slate-800 text-white"
                    }
                  `}
                >
                  {c}
                </div>
              ))}
            </div>

            {/* The Stack Visual */}
            <div
              className={`
              w-24 h-48 border-b-4 border-x-4 rounded-b-xl relative flex flex-col-reverse items-center p-2 gap-2 transition-colors duration-300
              ${
                status === "invalid"
                  ? "border-red-500 bg-red-900/20"
                  : status === "valid"
                  ? "border-green-500 bg-green-900/20"
                  : "border-slate-600 bg-slate-900/50"
              }
            `}
            >
              {stack.map((c, i) => (
                <div
                  key={i}
                  className="w-16 h-10 bg-purple-600 rounded flex items-center justify-center text-white font-bold animate-in slide-in-from-top-12 fade-in duration-300"
                >
                  {c}
                </div>
              ))}
              {stack.length === 0 && status === "processing" && (
                <div className="absolute top-1/2 text-xs text-slate-600">
                  Empty
                </div>
              )}
              {status === "valid" && (
                <div className="absolute top-1/2 text-green-500 font-bold flex flex-col items-center">
                  <CheckCircle2 className="w-8 h-8" />
                  <span>Valid!</span>
                </div>
              )}
              {status === "invalid" && (
                <div className="absolute top-1/2 text-red-500 font-bold flex flex-col items-center">
                  <XCircle className="w-8 h-8" />
                  <span>Invalid!</span>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={reset}
                className="p-2 rounded-full bg-slate-700 hover:bg-slate-600"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={step}
                disabled={status !== "processing" || inputIndex >= chars.length}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium disabled:opacity-50 flex items-center gap-2"
              >
                <Play className="w-4 h-4" /> Step
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-semibold text-purple-400 mb-2">LIFO Logic</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="bg-slate-700 px-1.5 rounded text-xs mt-0.5">
                    Open
                  </span>
                  Push to Stack.
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-slate-700 px-1.5 rounded text-xs mt-0.5">
                    Close
                  </span>
                  Check top of Stack. Match?
                </li>
                <li className="pl-8 text-green-400">
                  Yes: Pop (Close successful).
                </li>
                <li className="pl-8 text-red-400">No: Invalid (Mismatch).</li>
              </ul>
            </div>

            <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto text-xs text-slate-300 font-mono leading-relaxed border border-slate-800">
              {`def isValid(s):
    stack = []
    map = { ")": "(", "]": "[", "}": "{" }
    
    for c in s:
        if c in map:
            if stack and stack[-1] == map[c]:
                stack.pop()
            else:
                return False
        else:
            stack.append(c)
            
    return True if not stack else False`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 4: Trapping Rain Water
const TrappingRainWaterPage = () => {
  const heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
  const [l, setL] = useState(0);
  const [r, setR] = useState(heights.length - 1);
  const [maxL, setMaxL] = useState(heights[0]);
  const [maxR, setMaxR] = useState(heights[heights.length - 1]);
  const [water, setWater] = useState<number[]>(
    new Array(heights.length).fill(0)
  );
  const [totalWater, setTotalWater] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const step = () => {
    if (l >= r) {
      setIsFinished(true);
      return;
    }

    const newWater = [...water];
    let added = 0;

    if (maxL < maxR) {
      const nextL = l + 1;
      if (heights[nextL] < maxL) {
        added = maxL - heights[nextL];
        newWater[nextL] = added;
      }
      setMaxL(Math.max(maxL, heights[nextL]));
      setL(nextL);
    } else {
      const nextR = r - 1;
      if (heights[nextR] < maxR) {
        added = maxR - heights[nextR];
        newWater[nextR] = added;
      }
      setMaxR(Math.max(maxR, heights[nextR]));
      setR(nextR);
    }

    setWater(newWater);
    setTotalWater((prev) => prev + added);
  };

  const reset = () => {
    setL(0);
    setR(heights.length - 1);
    setMaxL(heights[0]);
    setMaxR(heights[heights.length - 1]);
    setWater(new Array(heights.length).fill(0));
    setTotalWater(0);
    setIsFinished(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern C: Two Pointers (Trapping Rain Water)
        </h2>
        <p className="text-slate-400 mb-6">
          Compute how much water can be trapped between bars after raining.
        </p>

        <div className="bg-black/40 p-6 rounded-xl border border-slate-800 mb-6">
          <div className="h-48 flex items-end justify-center gap-1 mb-4 px-4 relative">
            {heights.map((h, i) => (
              <div
                key={i}
                className="w-8 relative flex flex-col justify-end h-full"
              >
                {/* Water */}
                {water[i] > 0 && (
                  <div
                    className="w-full bg-blue-500/60 absolute bottom-0 transition-all duration-300 border-t border-blue-400"
                    style={{ height: `${(water[i] + h) * 25}px` }}
                  ></div>
                )}
                {/* Bar */}
                <div
                  className={`w-full bg-slate-600 border-t border-slate-500 transition-colors ${
                    i === l || i === r ? "bg-slate-500" : ""
                  }`}
                  style={{ height: `${h * 25}px`, zIndex: 10 }}
                ></div>

                {/* Pointers */}
                {i === l && !isFinished && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-yellow-400 flex flex-col items-center transition-all duration-300">
                    <ArrowRight className="w-4 h-4 -rotate-90" />
                    <span className="text-xs font-bold">L</span>
                  </div>
                )}
                {i === r && !isFinished && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-yellow-400 flex flex-col items-center transition-all duration-300">
                    <ArrowRight className="w-4 h-4 -rotate-90" />
                    <span className="text-xs font-bold">R</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-lg">
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-slate-400">MaxLeft:</span>{" "}
                <span className="text-white font-mono">{maxL}</span>
              </div>
              <div>
                <span className="text-slate-400">MaxRight:</span>{" "}
                <span className="text-white font-mono">{maxR}</span>
              </div>
              <div>
                <span className="text-blue-400 font-bold">
                  Total Water: {totalWater}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={reset}
                className="p-2 rounded-full bg-slate-700 hover:bg-slate-600"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={step}
                disabled={isFinished}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-sm font-medium disabled:opacity-50"
              >
                Step
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-400 mb-2">
              The Logic (Min of Maxes)
            </h3>
            <p className="text-sm text-slate-300 mb-2">
              Water at index <code className="text-yellow-300">i</code> is
              determined by:
              <br />
              <code className="bg-slate-900 px-1 rounded block mt-1 text-center">
                min(MaxLeft, MaxRight) - Height[i]
              </code>
            </p>
            <p className="text-sm text-slate-400">
              Instead of scanning O(N²) for every bar, we move pointers inward.
              The smaller side is the limiting factor, so we process that side.
            </p>
          </div>
          <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto text-xs text-slate-300 font-mono border border-slate-800">
            {`while l < r:
    if leftMax < rightMax:
        l += 1
        leftMax = max(leftMax, height[l])
        res += leftMax - height[l]
    else:
        r -= 1
        # ... symmetric logic for right`}
          </pre>
        </div>
      </div>
    </div>
  );
};

// Page 5: Min Stack
const MinStackPage = () => {
  const [mainStack, setMainStack] = useState<number[]>([]);
  const [minStack, setMinStack] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("-2");

  const push = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;

    setMainStack((prev) => [...prev, val]);

    const currentMin =
      minStack.length > 0 ? minStack[minStack.length - 1] : val;
    setMinStack((prev) => [...prev, Math.min(val, currentMin)]);

    // Randomize next input for demo feel
    setInputValue(Math.floor(Math.random() * 10 - 5).toString());
  };

  const pop = () => {
    if (mainStack.length === 0) return;
    setMainStack((prev) => prev.slice(0, -1));
    setMinStack((prev) => prev.slice(0, -1));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern D: Min Stack
        </h2>
        <p className="text-slate-400 mb-6">
          Design a stack that supports retrieving the minimum element in{" "}
          <span className="text-green-400 font-mono">O(1)</span> time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center">
            <div className="flex gap-8 mb-8 items-end h-64">
              {/* Main Stack */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-slate-400 font-medium">
                  Main Stack
                </span>
                <div className="w-20 h-56 border-x-4 border-b-4 border-slate-600 rounded-b-lg flex flex-col-reverse p-1 gap-1 bg-slate-900/50">
                  {mainStack.map((val, i) => (
                    <div
                      key={i}
                      className="w-full h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm animate-in slide-in-from-top-4 fade-in"
                    >
                      {val}
                    </div>
                  ))}
                </div>
              </div>

              {/* Min Stack */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-slate-400 font-medium">
                  Min Stack
                </span>
                <div className="w-20 h-56 border-x-4 border-b-4 border-slate-600 rounded-b-lg flex flex-col-reverse p-1 gap-1 bg-slate-900/50">
                  {minStack.map((val, i) => (
                    <div
                      key={i}
                      className="w-full h-8 bg-purple-600 rounded flex items-center justify-center text-white font-bold text-sm animate-in slide-in-from-top-4 fade-in"
                    >
                      {val}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-lg">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-center"
              />
              <button
                onClick={push}
                className="px-4 py-1.5 bg-green-600 hover:bg-green-500 rounded text-sm font-medium"
              >
                Push
              </button>
              <button
                onClick={pop}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-500 rounded text-sm font-medium"
              >
                Pop
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-slate-400">Current Min (O(1)):</p>
              <p className="text-2xl font-bold text-purple-400">
                {minStack.length > 0 ? minStack[minStack.length - 1] : "-"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-semibold text-purple-400 mb-2">
                Parallel Stack Logic
              </h3>
              <p className="text-sm text-slate-300 mb-2">
                We maintain a second stack that tracks the "minimum seen so
                far".
              </p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>
                  <strong className="text-white">Push:</strong> Push to Main.
                  Push{" "}
                  <code className="bg-slate-900 px-1 rounded">
                    min(val, topOfMin)
                  </code>{" "}
                  to MinStack.
                </li>
                <li>
                  <strong className="text-white">Pop:</strong> Pop from both.
                </li>
                <li>
                  <strong className="text-white">GetMin:</strong> Just peek at
                  MinStack top.
                </li>
              </ul>
            </div>

            <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto text-xs text-slate-300 font-mono leading-relaxed border border-slate-800">
              {`class MinStack:
    def push(self, val):
        self.stack.append(val)
        # Push new min or keep old min
        newMin = min(val, self.minStack[-1] 
                 if self.minStack else val)
        self.minStack.append(newMin)

    def getMin(self):
        return self.minStack[-1]`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoPointersGuide;
