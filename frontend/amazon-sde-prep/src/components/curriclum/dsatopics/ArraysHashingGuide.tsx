import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

interface PageContent {
  title: string;
  content: React.ReactNode;
}

interface GuideProps {
  initialPage?: number;
  onPageChange?: (pageIndex: number) => void;
  onComplete?: () => void;
}

export const ArraysHashingGuide: React.FC<GuideProps> = ({
  initialPage = 0,
  onPageChange,
  onComplete,
}) => {
  // MOVED UP: Define pages first so we can use pages.length in hooks
  const pages: PageContent[] = [
    {
      title: "The Primitives – Arrays vs. HashMaps",
      content: <Page1Content />,
    },
    {
      title: "The Foundation – Why HashMaps & Collisions",
      content: <Page2Content />,
    },
    {
      title: "Pattern A – The Complement Map (Two Sum)",
      content: <Page3Content />,
    },
    {
      title: "Pattern B – The Frequency Map (Group Anagrams)",
      content: <Page4Content />,
    },
    {
      title: "Pattern C – Prefix & Suffix (Product of Array Except Self)",
      content: <Page5Content />,
    },
  ];

  // Safe current page (clamp to last page if bookmark is "5")
  const safeInitialPage =
    initialPage >= pages.length ? pages.length - 1 : initialPage;

  const [currentPage, setCurrentPage] = useState(safeInitialPage);
  const [completedPages, setCompletedPages] = useState<boolean[]>(
    new Array(pages.length).fill(false)
  );

  // Sync internal state if initialPage changes
  useEffect(() => {
    const safePage =
      initialPage >= pages.length ? pages.length - 1 : initialPage;
    setCurrentPage(safePage);

    // FIX: If initialPage is 5 (length), mark ALL pages as true.
    // If initialPage is 4, mark 0..3 as true.
    const countToMark =
      initialPage >= pages.length ? pages.length : initialPage;

    if (countToMark > 0) {
      setCompletedPages((prev) => {
        const newCompleted = [...prev];
        for (let i = 0; i < countToMark; i++) {
          newCompleted[i] = true;
        }
        return newCompleted;
      });
    }
  }, [initialPage, pages.length]);

  const markComplete = (pageIndex: number) => {
    const newCompleted = [...completedPages];
    newCompleted[pageIndex] = true;
    setCompletedPages(newCompleted);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const nextPage = () => {
    markComplete(currentPage);
    if (currentPage < pages.length - 1) {
      handlePageChange(currentPage + 1);
    } else if (currentPage === pages.length - 1) {
      // FIX: Save bookmark as "5" (pages.length) to indicate full completion
      if (onPageChange) onPageChange(pages.length);
      if (onComplete) onComplete();
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1);
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
        1. The Core Concept
      </h3>
      <p className="mb-4">
        Before solving problems, you must understand the tools. Amazon
        interviews focus on efficiency.
      </p>
      <ul className="space-y-2 ml-4">
        <li className="flex items-start gap-2">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
          <span>
            <strong className="text-slate-900 dark:text-white">
              Array (List):
            </strong>{" "}
            Best when order matters or you know the <em>Index</em>.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
          <span>
            <strong className="text-slate-900 dark:text-white">
              HashMap (Dict):
            </strong>{" "}
            Best when you need to find something instantly using an <em>ID</em>{" "}
            (Key).
          </span>
        </li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        2. Operations & Time Complexity
      </h3>

      <div className="mb-6">
        <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">
          A. Arrays (Contiguous Memory)
        </h4>
        <p className="mb-4 text-sm">
          Arrays are blocks of memory sitting side-by-side.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500">
                <th className="py-2">Operation</th>
                <th className="py-2">Python Code</th>
                <th className="py-2">Time Complexity</th>
                <th className="py-2">Why?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2 font-medium">Access</td>
                <td className="py-2 font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded w-fit">
                  val = arr[2]
                </td>
                <td className="py-2 text-green-600 dark:text-green-400 font-bold">
                  O(1)
                </td>
                <td className="py-2 text-xs">Direct calculation of address.</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Search</td>
                <td className="py-2 font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded w-fit">
                  if x in arr:
                </td>
                <td className="py-2 text-red-600 dark:text-red-400 font-bold">
                  O(N)
                </td>
                <td className="py-2 text-xs">Must check every box.</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Insert (Mid)</td>
                <td className="py-2 font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded w-fit">
                  arr.insert(1, x)
                </td>
                <td className="py-2 text-red-600 dark:text-red-400 font-bold">
                  O(N)
                </td>
                <td className="py-2 text-xs">
                  <strong>Shifting required.</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">
          B. HashMaps (Key-Value Pairs)
        </h4>
        <p className="mb-4 text-sm">
          HashMaps use a "Hash Function" to turn a Key into an Index.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500">
                <th className="py-2">Operation</th>
                <th className="py-2">Python Code</th>
                <th className="py-2">Time Complexity</th>
                <th className="py-2">Why?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2 font-medium">Access/Get</td>
                <td className="py-2 font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded w-fit">
                  val = data["key"]
                </td>
                <td className="py-2 text-green-600 dark:text-green-400 font-bold">
                  O(1)
                </td>
                <td className="py-2 text-xs">Hashing jumps directly.</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Search Key</td>
                <td className="py-2 font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded w-fit">
                  if "key" in data:
                </td>
                <td className="py-2 text-green-600 dark:text-green-400 font-bold">
                  O(1)
                </td>
                <td className="py-2 text-xs">Instant lookup.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* Visual Comparison */}
    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
      <h4 className="text-sm font-bold text-slate-500 uppercase mb-4 text-center">
        Visual Comparison
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Array Visual */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold mb-2">Array Insertion O(N)</span>
          <div className="flex gap-1">
            <div className="w-8 h-8 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center rounded text-xs font-mono">
              A
            </div>
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 border border-orange-500 flex items-center justify-center rounded text-xs font-mono text-orange-600 dark:text-orange-400 animate-pulse">
              X
            </div>
            <div className="w-8 h-8 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center rounded text-xs font-mono translate-x-2 transition-transform">
              B
            </div>
            <div className="w-8 h-8 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center rounded text-xs font-mono translate-x-2 transition-transform">
              C
            </div>
          </div>
          <span className="text-[10px] text-red-500 mt-2">
            Shifting Required
          </span>
        </div>

        {/* HashMap Visual */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold mb-2">HashMap Access O(1)</span>
          <div className="relative w-full max-w-[150px] h-12 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center px-2">
            <div className="absolute left-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold z-10">
              Key
            </div>
            <ArrowRight className="absolute left-12 text-slate-400" size={16} />
            <div className="absolute right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold animate-bounce">
              Val
            </div>
          </div>
          <span className="text-[10px] text-green-500 mt-2">Direct Jump</span>
        </div>
      </div>
    </div>
  </div>
);

const Page2Content = () => (
  <div className="space-y-8 text-slate-700 dark:text-slate-300">
    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        1. The Core Philosophy
      </h3>
      <p className="mb-4">
        In Amazon interviews, brute force solutions ($O(N^2)$) are rarely
        accepted because they fail at scale.
      </p>
      <div className="bg-orange-50 dark:bg-orange-900/10 border-l-4 border-orange-500 p-4 my-4">
        <p className="font-medium text-orange-800 dark:text-orange-200">
          The HashMap is your primary tool because it trades{" "}
          <strong>Space for Time</strong>.
        </p>
      </div>
      <ul className="space-y-2 ml-4">
        <li className="flex items-start gap-2">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
          <span>
            <strong>Trade-off:</strong> You use extra memory (RAM) to store
            information you've already seen.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
          <span>
            <strong>Benefit:</strong> You can look up that information in{" "}
            <strong>O(1)</strong> (instant) time.
          </span>
        </li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        2. Handling Collisions
      </h3>
      <p className="mb-4 text-sm italic text-slate-500">
        The prompt often asks: "What happens if two keys map to the same index?"
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        <div>
          <ul className="space-y-3 text-sm">
            <li>
              <strong>The Problem:</strong> You can't overwrite data at index 5.
            </li>
            <li>
              <strong>The Solution (Chaining):</strong> The bucket becomes a{" "}
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                Linked List
              </span>
              . Both items sit there.
            </li>
            <li>
              <strong>The Impact:</strong> If too many collisions happen, lookup
              speed degrades to <strong>O(N)</strong>.
            </li>
          </ul>
        </div>
        {/* Collision Visual */}
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg flex flex-col items-center justify-center h-40 relative">
          <div className="absolute top-2 text-[10px] text-slate-400">
            Bucket #5
          </div>
          <div className="w-16 h-24 border-b-4 border-l-4 border-r-4 border-slate-400 dark:border-slate-600 rounded-b-lg relative flex flex-col-reverse items-center gap-1 pb-2">
            <div className="w-10 h-8 bg-blue-500 rounded text-white text-[10px] flex items-center justify-center font-bold z-10">
              Key A
            </div>
            <div className="w-1 h-2 bg-slate-400"></div>
            <div className="w-10 h-8 bg-purple-500 rounded text-white text-[10px] flex items-center justify-center font-bold z-10">
              Key B
            </div>
          </div>
          <span className="text-[10px] text-slate-500 mt-2">Chaining</span>
        </div>
      </div>
    </section>
  </div>
);

const Page3Content = () => (
  <div className="space-y-8 text-slate-700 dark:text-slate-300">
    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        1. The Amazon Scenario (Two Sum)
      </h3>
      <p className="mb-4">
        <strong>Problem:</strong> Find two numbers in{" "}
        <code>[40, 10, 25, 60]</code> that add up to <strong>100</strong>.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        2. The Logic (One-Pass Hash Map)
      </h3>
      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm mb-4">
        Need = Target - Current_Price
      </div>
      <p className="mb-4">
        We check: <em>"Is the 'Need' in our map of items we saw earlier?"</em>
      </p>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        3. Step-by-Step Walkthrough
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-3 p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800/50">
          <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">
            1
          </div>
          <div>
            <strong>Current: 40.</strong> Need: 60. In Map? No.{" "}
            <span className="text-slate-400">Store {"{40: 0}"}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800/50">
          <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">
            2
          </div>
          <div>
            <strong>Current: 10.</strong> Need: 90. In Map? No.{" "}
            <span className="text-slate-400">Store {"{10: 1}"}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800/50">
          <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">
            3
          </div>
          <div>
            <strong>Current: 25.</strong> Need: 75. In Map? No.{" "}
            <span className="text-slate-400">Store {"{25: 2}"}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2 rounded bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30">
          <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
            4
          </div>
          <div>
            <strong>Current: 60.</strong> Need: 40. In Map?{" "}
            <strong className="text-green-600 dark:text-green-400">YES!</strong>{" "}
            (at index 0).
          </div>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        4. Python Implementation
      </h3>
      <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs overflow-x-auto">
        <pre>{`def twoSum(nums, target):
    prev_map = {} # Key: Number, Value: Index
    
    for i, n in enumerate(nums):
        diff = target - n
        if diff in prev_map:
            return [prev_map[diff], i]
        prev_map[n] = i
    return []`}</pre>
      </div>
    </section>
  </div>
);

const Page4Content = () => (
  <div className="space-y-8 text-slate-700 dark:text-slate-300">
    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        1. The Amazon Scenario (Group Anagrams)
      </h3>
      <p className="mb-4">
        <strong>Problem:</strong> Group "tab", "bat", "eat", "tea".
      </p>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        2. The Logic (Character Count Key)
      </h3>
      <ul className="space-y-2 ml-4">
        <li>
          <span className="text-red-500 font-bold">Bad Way:</span> Sort string
          (O(K log K)).
        </li>
        <li>
          <span className="text-green-500 font-bold">Amazon Way:</span> Use a{" "}
          <strong>Frequency Array</strong> (Count of a-z).
        </li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        3. Visual Walkthrough
      </h3>
      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl flex flex-col items-center gap-6">
        <div className="flex gap-4">
          <div className="bg-white dark:bg-slate-700 p-2 rounded shadow-sm text-center">
            <div className="font-bold text-lg">"eat"</div>
            <ArrowDown className="mx-auto text-slate-400 my-1" size={16} />
            <div className="text-[10px] font-mono bg-slate-200 dark:bg-slate-900 px-1 rounded">
              [1,0,0,0,1...1]
            </div>
          </div>
          <div className="bg-white dark:bg-slate-700 p-2 rounded shadow-sm text-center">
            <div className="font-bold text-lg">"tea"</div>
            <ArrowDown className="mx-auto text-slate-400 my-1" size={16} />
            <div className="text-[10px] font-mono bg-slate-200 dark:bg-slate-900 px-1 rounded">
              [1,0,0,0,1...1]
            </div>
          </div>
        </div>
        <div className="w-full max-w-xs border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-4 flex flex-col items-center">
          <div className="text-xs text-slate-500 mb-2">Bucket (Key Match)</div>
          <div className="flex gap-2">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-sm font-bold">
              "eat"
            </span>
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-sm font-bold">
              "tea"
            </span>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        4. Python Implementation
      </h3>
      <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs overflow-x-auto">
        <pre>{`def groupAnagrams(strs):
    res = defaultdict(list)
    for s in strs:
        count = [0] * 26 
        for c in s:
            count[ord(c) - ord('a')] += 1
        res[tuple(count)].append(s)
    return list(res.values())`}</pre>
      </div>
    </section>
  </div>
);

const Page5Content = () => (
  <div className="space-y-8 text-slate-700 dark:text-slate-300">
    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        1. The Amazon Scenario (Product Except Self)
      </h3>
      <p className="mb-4">
        <strong>Problem:</strong> Calculate product of all days <em>except</em>{" "}
        current. <strong>Constraint:</strong> No division. O(N).
      </p>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        2. The Logic (Left & Right Pass)
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
          <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">
            Pass 1: Prefix
          </h4>
          <p className="text-xs">
            Walk Left -&gt; Right. Calculate running product.
          </p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg border border-purple-100 dark:border-purple-900/30">
          <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">
            Pass 2: Postfix
          </h4>
          <p className="text-xs">
            Walk Right -&gt; Left. Multiply with stored Prefix.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        3. Visual Computation
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-center border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              <th className="p-2 border border-slate-200 dark:border-slate-700">
                Index
              </th>
              <th className="p-2 border border-slate-200 dark:border-slate-700">
                0
              </th>
              <th className="p-2 border border-slate-200 dark:border-slate-700">
                1
              </th>
              <th className="p-2 border border-slate-200 dark:border-slate-700">
                2
              </th>
              <th className="p-2 border border-slate-200 dark:border-slate-700">
                3
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 font-bold border border-slate-200 dark:border-slate-700">
                Input
              </td>
              <td className="p-2 border border-slate-200 dark:border-slate-700">
                1
              </td>
              <td className="p-2 border border-slate-200 dark:border-slate-700">
                2
              </td>
              <td className="p-2 border border-slate-200 dark:border-slate-700">
                3
              </td>
              <td className="p-2 border border-slate-200 dark:border-slate-700">
                4
              </td>
            </tr>
            <tr className="bg-blue-50/50 dark:bg-blue-900/10">
              <td className="p-2 font-bold border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">
                Prefix
              </td>
              <td className="p-2 border border-slate-200 dark:border-slate-700">
                1
              </td>
              <td className="p-2 border border-slate-200 dark:border-slate-700">
                1
              </td>
              <td className="p-2 border border-slate-200 dark:border-slate-700">
                2
              </td>
              <td className="p-2 border border-slate-200 dark:border-slate-700">
                6
              </td>
            </tr>
            <tr className="bg-purple-50/50 dark:bg-purple-900/10">
              <td className="p-2 font-bold border border-slate-200 dark:border-slate-700 text-purple-600 dark:text-purple-400">
                Final
              </td>
              <td className="p-2 border border-slate-200 dark:border-slate-700 font-bold">
                24
              </td>
              <td className="p-2 border border-slate-200 dark:border-slate-700 font-bold">
                12
              </td>
              <td className="p-2 border border-slate-200 dark:border-slate-700 font-bold">
                8
              </td>
              <td className="p-2 border border-slate-200 dark:border-slate-700 font-bold">
                6
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        4. Python Implementation
      </h3>
      <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs overflow-x-auto">
        <pre>{`def productExceptSelf(nums):
    res = [1] * len(nums)
    
    prefix = 1
    for i in range(len(nums)):
        res[i] = prefix
        prefix *= nums[i]
    postfix = 1
    for i in range(len(nums) - 1, -1, -1):
        res[i] *= postfix
        postfix *= nums[i]
        
    return res`}</pre>
      </div>
    </section>
  </div>
);
