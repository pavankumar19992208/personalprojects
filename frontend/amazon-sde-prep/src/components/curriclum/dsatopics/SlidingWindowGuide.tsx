import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Battery,
  BatteryWarning,
  Zap,
} from "lucide-react";

interface PageContent {
  title: string;
  content: React.ReactNode;
}

interface SlidingWindowGuideProps {
  initialPage?: number;
  onPageChange?: (page: number) => void;
  onComplete?: () => void;
}

export const SlidingWindowGuide: React.FC<SlidingWindowGuideProps> = ({
  initialPage = 0,
  onPageChange,
  onComplete,
}) => {
  // Define pages first so we can use length for initialization
  const pages: PageContent[] = [
    {
      title: "The Concept – Fixed vs. Variable Window",
      content: <Page1Content />,
    },
    {
      title: "Pattern A – Variable Window (Longest Substring)",
      content: <Page2Content />,
    },
    {
      title: "Pattern B – Monotonic Queue (Sliding Window Max)",
      content: <Page3Content />,
    },
    {
      title: "Pattern C – Flipping/Tolerance (Max Consecutive Ones III)",
      content: <Page4Content />,
    },
  ];

  // Calculate effective start page. If initialPage is the total length (completed), show the last page.
  const effectivePage = Math.min(Math.max(0, initialPage), pages.length - 1);

  const [currentPage, setCurrentPage] = useState(effectivePage);

  // Initialize completed pages based on initialPage
  const [completedPages, setCompletedPages] = useState<boolean[]>(() => {
    const initial = new Array(pages.length).fill(false);
    // If we are starting at page X, assume 0 to X-1 are complete.
    // If initialPage is pages.length (fully complete), mark all as true.
    const limit = initialPage >= pages.length ? pages.length : initialPage;
    for (let i = 0; i < limit; i++) {
      initial[i] = true;
    }
    return initial;
  });

  // Sync internal state if initialPage changes (e.g. from parent reload)
  useEffect(() => {
    const newPage = Math.min(Math.max(0, initialPage), pages.length - 1);
    setCurrentPage(newPage);

    setCompletedPages((prev) => {
      const next = [...prev];
      const limit = initialPage >= pages.length ? pages.length : initialPage;
      for (let i = 0; i < limit; i++) {
        next[i] = true;
      }
      return next;
    });
  }, [initialPage, pages.length]);

  const markComplete = (pageIndex: number) => {
    const newCompleted = [...completedPages];
    newCompleted[pageIndex] = true;
    setCompletedPages(newCompleted);
  };

  const nextPage = () => {
    markComplete(currentPage);
    if (currentPage < pages.length - 1) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    } else {
      // On the last page, clicking "Finish"
      onPageChange?.(pages.length); // Send length to indicate full completion
      onComplete?.();
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  };

  const progress = Math.round(
    (completedPages.filter(Boolean).length / pages.length) * 100
  );

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Progress Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Module Progress
          </span>
          <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
            {progress}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            {pages[currentPage].title}
          </h1>
          {pages[currentPage].content}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-between items-center">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentPage === 0
              ? "text-slate-400 cursor-not-allowed"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
          }`}
        >
          <ChevronLeft size={16} /> Previous
        </button>

        <div className="flex gap-1">
          {pages.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentPage
                  ? "bg-orange-500"
                  : completedPages[idx]
                  ? "bg-green-500"
                  : "bg-slate-300 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextPage}
          disabled={
            currentPage === pages.length - 1 &&
            completedPages[currentPage] &&
            initialPage < pages.length
          }
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
            currentPage === pages.length - 1
              ? "bg-green-600 text-white hover:bg-green-500"
              : "bg-orange-600 text-white hover:bg-orange-500"
          }`}
        >
          {currentPage === pages.length - 1 ? "Finish Module" : "Next"}
          {currentPage === pages.length - 1 ? (
            <CheckCircle2 size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>
      </div>
    </div>
  );
};

// --- PAGE CONTENT COMPONENTS ---

const Page1Content = () => (
  <div className="space-y-8 text-slate-700 dark:text-slate-300">
    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        1. The Core Philosophy
      </h3>
      <p className="mb-4">
        In Amazon interviews, you often deal with "Streaming Data" (e.g., server
        logs arriving every second). You cannot re-calculate everything from
        scratch every time a new log arrives.
      </p>
      <div className="bg-orange-50 dark:bg-orange-900/10 border-l-4 border-orange-500 p-4 my-4">
        <p className="font-medium text-orange-800 dark:text-orange-200">
          <strong>The Solution:</strong> The Sliding Window.
        </p>
        <p className="text-sm mt-2">
          Instead of nested loops (checking every possible subarray), we
          maintain a "Window" (a range <code>[Left, Right]</code>) over the
          data. As we move the window, we only update the changes.
        </p>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        2. The Two Types
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
          <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">
            A. Fixed Window
          </h4>
          <p className="text-xs text-slate-500 mb-2 uppercase font-bold">
            Size K is constant
          </p>
          <p className="text-sm mb-3">
            <strong>Scenario:</strong> "Find the maximum sum of any contiguous
            subarray of size 3."
          </p>
          <div className="bg-white dark:bg-slate-900 p-2 rounded text-xs font-mono border border-slate-200 dark:border-slate-800">
            Sum = Sum + nums[i] - nums[i-k]
          </div>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
          <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">
            B. Variable Window
          </h4>
          <p className="text-xs text-slate-500 mb-2 uppercase font-bold">
            Size changes
          </p>
          <p className="text-sm mb-3">
            <strong>Scenario:</strong> "Find the longest substring without
            repeating characters."
          </p>
          <ul className="text-xs space-y-1 list-decimal ml-4">
            <li>
              <strong>Expand</strong> Right pointer.
            </li>
            <li>
              <strong>Check</strong> Constraint.
            </li>
            <li>
              <strong>Shrink</strong> Left pointer if invalid.
            </li>
          </ul>
        </div>
      </div>
    </section>

    {/* Visual Animation */}
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col items-center">
      <h4 className="text-sm font-bold text-slate-400 uppercase mb-4">
        Window Overlay Visual
      </h4>
      <div className="relative flex gap-2">
        {/* Window Overlay */}
        <div className="absolute -top-2 -bottom-2 left-0 w-[90px] border-2 border-orange-500 rounded-lg bg-orange-500/10 z-10 transition-all duration-1000 animate-[slide_3s_ease-in-out_infinite]" />

        {["A", "B", "C", "D", "E"].map((char, i) => (
          <div
            key={i}
            className="w-10 h-10 bg-slate-800 border border-slate-700 rounded flex items-center justify-center text-white font-bold"
          >
            {char}
          </div>
        ))}
      </div>
      <div className="flex justify-between w-full max-w-[200px] mt-4 text-[10px] text-slate-500 font-mono">
        <span>Drop Old</span>
        <span>Add New</span>
      </div>
    </div>
    <style>{`
      @keyframes slide {
        0%, 20% { transform: translateX(0); }
        40%, 60% { transform: translateX(48px); }
        80%, 100% { transform: translateX(96px); }
      }
    `}</style>
  </div>
);

const Page2Content = () => (
  <div className="space-y-8 text-slate-700 dark:text-slate-300">
    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        1. The Amazon Scenario
      </h3>
      <p className="mb-4">
        <strong>Problem:</strong> Find the{" "}
        <strong>Longest Substring Without Repeating Characters</strong> in{" "}
        <code>"abcabcbb"</code>.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        2. The Logic (Expand & Shrink)
      </h3>
      <p className="mb-4">
        We use a <strong>Set</strong> to track characters currently inside our
        window.
      </p>
      <ul className="space-y-2 ml-4">
        <li className="flex items-start gap-2">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
          <span>
            <strong>Pointer R (Right):</strong> Always moves forward to add
            characters.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
          <span>
            <strong>Pointer L (Left):</strong> Only moves forward if we find a
            duplicate.
          </span>
        </li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        3. Visual Walkthrough
      </h3>
      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl">
        <div className="flex flex-col gap-4">
          {/* Step 1 */}
          <div className="flex items-center gap-4">
            <div className="font-mono text-sm bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
              [p, w, w]
            </div>
            <div className="text-sm text-red-500 font-bold flex items-center gap-1">
              <BatteryWarning size={16} /> Invalid! Duplicate 'w'
            </div>
          </div>
          {/* Step 2 */}
          <div className="ml-8 border-l-2 border-slate-300 dark:border-slate-600 pl-4 py-2">
            <div className="text-xs text-slate-500 mb-1">Shrink Phase</div>
            <div className="flex items-center gap-2">
              <ArrowRight size={14} className="text-slate-400" />
              <span className="text-sm">Remove 'p'. Move L.</span>
            </div>
          </div>
          {/* Step 3 */}
          <div className="ml-8 border-l-2 border-slate-300 dark:border-slate-600 pl-4 py-2">
            <div className="text-xs text-slate-500 mb-1">Shrink Phase</div>
            <div className="flex items-center gap-2">
              <ArrowRight size={14} className="text-slate-400" />
              <span className="text-sm">Remove 'w'. Move L.</span>
            </div>
          </div>
          {/* Step 4 */}
          <div className="flex items-center gap-4">
            <div className="font-mono text-sm bg-white dark:bg-slate-900 px-2 py-1 rounded border border-green-500 text-green-600 dark:text-green-400">
              [w]
            </div>
            <div className="text-sm text-green-600 dark:text-green-400 font-bold flex items-center gap-1">
              <CheckCircle2 size={16} /> Valid
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        4. Python Implementation
      </h3>
      <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs overflow-x-auto">
        <pre>{`def lengthOfLongestSubstring(s):
    char_set = set()
    l = 0
    res = 0
    
    for r in range(len(s)):
        while s[r] in char_set:
            char_set.remove(s[l])
            l += 1
        char_set.add(s[r])
        res = max(res, r - l + 1)
        
    return res`}</pre>
      </div>
    </section>
  </div>
);

const Page3Content = () => (
  <div className="space-y-8 text-slate-700 dark:text-slate-300">
    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        1. The Amazon Scenario (Sliding Window Max)
      </h3>
      <p className="mb-4">
        <strong>Problem:</strong> Find the <strong>Maximum CPU usage</strong> in
        every window of size K=3.
        <br />
        <code>[1, 3, -1, -3, 5, 3, 6, 7]</code>
      </p>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        2. The Logic (Decreasing Deque)
      </h3>
      <p className="mb-4">
        We use a <strong>Deque</strong> to store indices.
      </p>
      <div className="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-4 my-4">
        <p className="font-medium text-blue-800 dark:text-blue-200">
          <strong>Rule:</strong> The Deque must always be in{" "}
          <strong>Decreasing Order</strong>.
        </p>
        <p className="text-sm mt-2">
          If current is <code>5</code>, we kick out any <code>3</code> or{" "}
          <code>1</code> before it. They can never be max again.
        </p>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        3. Visual Walkthrough
      </h3>
      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl flex flex-col items-center gap-6">
        <div className="flex items-end gap-2 h-32 border-b-2 border-slate-300 dark:border-slate-600 pb-2 px-4">
          <div className="w-8 bg-slate-300 dark:bg-slate-600 h-10 rounded-t flex items-center justify-center text-xs">
            1
          </div>
          <div className="w-8 bg-slate-300 dark:bg-slate-600 h-20 rounded-t flex items-center justify-center text-xs">
            3
          </div>
          <div className="w-8 bg-slate-300 dark:bg-slate-600 h-8 rounded-t flex items-center justify-center text-xs">
            -1
          </div>
          <div className="w-8 bg-orange-500 h-28 rounded-t flex items-center justify-center text-white font-bold animate-bounce">
            5
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold mb-2">Deque State</p>
          <div className="flex gap-2 justify-center">
            <div className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded text-slate-400 line-through decoration-red-500">
              3
            </div>
            <div className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded text-slate-400 line-through decoration-red-500">
              -1
            </div>
            <div className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 border border-orange-500 rounded text-orange-600 dark:text-orange-400 font-bold">
              5
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            5 "kicks out" smaller values
          </p>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        4. Python Implementation
      </h3>
      <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs overflow-x-auto">
        <pre>{`def maxSlidingWindow(nums, k):
    q = deque()
    res = []
    for i, n in enumerate(nums):
        while q and nums[q[-1]] < n:
            q.pop()
        q.append(i)
        if q[0] < i - k + 1:
            q.popleft()
        if i >= k - 1:
            res.append(nums[q[0]])
    return res`}</pre>
      </div>
    </section>
  </div>
);

const Page4Content = () => (
  <div className="space-y-8 text-slate-700 dark:text-slate-300">
    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        1. The Amazon Scenario (Max Consecutive Ones III)
      </h3>
      <p className="mb-4">
        <strong>Problem:</strong> Longest sequence of <code>1</code>s if you can
        flip at most <strong>K</strong> <code>0</code>s.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        2. The Logic (Resource Consumption)
      </h3>
      <p className="mb-4">
        Treat <strong>K</strong> as fuel.
      </p>
      <ul className="space-y-2 ml-4">
        <li className="flex items-start gap-2">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
          <span>
            <strong>Expand R:</strong> If we see a <code>0</code>, consume fuel
            (<code>K -= 1</code>).
          </span>
        </li>
        <li className="flex items-start gap-2">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
          <span>
            <strong>Shrink L:</strong> If <code>K &lt; 0</code>, move L. If
            leaving element was <code>0</code>, refill fuel (<code>K += 1</code>
            ).
          </span>
        </li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        3. Visual Walkthrough
      </h3>
      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <Battery className="text-green-500 mb-1" size={24} />
            <span className="text-xs font-bold">K=1</span>
          </div>
          <ArrowRight className="text-slate-400" />
          <div className="flex flex-col items-center">
            <div className="relative">
              <BatteryWarning className="text-orange-500 mb-1" size={24} />
              <Zap
                size={12}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-400 fill-yellow-400"
              />
            </div>
            <span className="text-xs font-bold">K=0</span>
          </div>
          <ArrowRight className="text-slate-400" />
          <div className="flex flex-col items-center">
            <div className="relative">
              <Battery className="text-red-500 mb-1 rotate-90" size={24} />
            </div>
            <span className="text-xs font-bold text-red-500">K=-1</span>
          </div>
        </div>
        <div className="text-center text-sm">
          <p>
            When <strong>K &lt; 0</strong>, the window is invalid.
          </p>
          <p className="text-slate-500 text-xs mt-1">
            Must shrink left to regain fuel.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        4. Python Implementation
      </h3>
      <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs overflow-x-auto">
        <pre>{`def longestOnes(nums, k):
    l = 0
    res = 0
    for r, n in enumerate(nums):
        if n == 0:
            k -= 1
        if k < 0:
            if nums[l] == 0:
                k += 1
            l += 1
        res = max(res, r - l + 1)
    return res`}</pre>
      </div>
    </section>
  </div>
);
