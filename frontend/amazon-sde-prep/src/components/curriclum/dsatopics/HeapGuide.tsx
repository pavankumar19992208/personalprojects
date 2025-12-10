import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Layers,
  Copy,
  Check,
  //   Trophy,
  //   GitMerge,
  //   Scale,
  //   Binary,
  //   ArrowDown,
  //   ArrowUp,
} from "lucide-react";

interface HeapGuideProps {
  initialPage?: number;
  onPageChange?: (page: number) => void;
  onComplete?: () => void;
}

const HeapGuide = ({
  initialPage = 1,
  onPageChange,
  onComplete,
}: HeapGuideProps) => {
  const [page, setPage] = useState(initialPage);
  const [completedPages, setCompletedPages] = useState<boolean[]>(
    new Array(5).fill(false)
  );
  const totalPages = 5;

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
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full transition-colors ${
                i < page || completedPages[i - 1]
                  ? "bg-green-500"
                  : i === page
                  ? "bg-orange-500"
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
        {page === 2 && <TopKPage />}
        {page === 3 && <MergeKListsPage />}
        {page === 4 && <MedianPage />}
        {page === 5 && <ArrayMapPage />}
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
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
        >
          {page === totalPages ? "Complete Module" : "Next"}{" "}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

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

// Page 1: Concept
const ConceptPage = () => {
  const [step, setStep] = useState(0);

  // Min-Heap: 1 -> (3, 5) -> (10, 12)
  // Insert 0:
  // 0. Start: [1, 3, 5, 10, 12]
  // 1. Add 0 at end: [1, 3, 5, 10, 12, 0]
  // 2. Swap with parent (5): [1, 3, 0, 10, 12, 5]
  // 3. Swap with parent (1): [0, 3, 1, 10, 12, 5] (Done)

  const steps = [
    {
      nodes: [1, 3, 5, 10, 12],
      hl: null,
      msg: "Initial Min-Heap. Root (1) is smallest.",
    },
    {
      nodes: [1, 3, 5, 10, 12, 0],
      hl: 5,
      msg: "Insert 0 at bottom. Compare with Parent (5). 0 < 5.",
    },
    {
      nodes: [1, 3, 0, 10, 12, 5],
      hl: 2,
      msg: "Swap! Now compare 0 with Parent (1). 0 < 1.",
    },
    {
      nodes: [0, 3, 1, 10, 12, 5],
      hl: 0,
      msg: "Swap! 0 is now Root. Heap Property Restored.",
    },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 relative overflow-hidden">
        {/* Amazon Favorite Badge */}
        <div className="absolute -right-12 top-6 bg-orange-500 text-white text-xs font-bold px-12 py-1 rotate-45 shadow-lg">
          AMAZON FAVORITE
        </div>

        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Layers className="text-orange-400" /> Order in Chaos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-orange-500">
              <h3 className="text-lg font-semibold text-orange-400 mb-2">
                The Heap Property
              </h3>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
                <li>
                  <strong className="text-white">Min-Heap:</strong> Parent ≤
                  Children. Root is Minimum.
                </li>
                <li>
                  <strong className="text-white">Max-Heap:</strong> Parent ≥
                  Children. Root is Maximum.
                </li>
                <li>
                  <strong className="text-green-400">O(1)</strong> Access to Top
                  Priority.
                </li>
                <li>
                  <strong className="text-yellow-400">O(log N)</strong>{" "}
                  Insert/Delete.
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-white mb-2">
                Why Amazon Loves It?
              </h3>
              <p className="text-xs text-slate-400 italic">
                "Show me the Top 10 Bestsellers out of 10 million books."
                <br />
                Sorting takes O(N log N). Heaps take O(N log K).
              </p>
            </div>
          </div>

          <div className="bg-black/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center h-64 relative">
            {/* Tree Visual */}
            <div className="relative w-48 h-48">
              {/* Edges */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* L1 to L2 */}
                <line
                  x1="50%"
                  y1="20%"
                  x2="30%"
                  y2="50%"
                  stroke="#475569"
                  strokeWidth="2"
                />
                <line
                  x1="50%"
                  y1="20%"
                  x2="70%"
                  y2="50%"
                  stroke="#475569"
                  strokeWidth="2"
                />
                {/* L2 to L3 */}
                <line
                  x1="30%"
                  y1="50%"
                  x2="15%"
                  y2="80%"
                  stroke="#475569"
                  strokeWidth="2"
                />
                <line
                  x1="30%"
                  y1="50%"
                  x2="45%"
                  y2="80%"
                  stroke="#475569"
                  strokeWidth="2"
                />
                {/* New Node Edge */}
                {current.nodes.length > 5 && (
                  <line
                    x1="70%"
                    y1="50%"
                    x2="60%"
                    y2="80%"
                    stroke="#475569"
                    strokeWidth="2"
                  />
                )}
              </svg>

              {/* Nodes */}
              {current.nodes.map((val, idx) => {
                const positions = [
                  { x: "50%", y: "20%" }, // 0
                  { x: "30%", y: "50%" }, // 1
                  { x: "70%", y: "50%" }, // 2
                  { x: "15%", y: "80%" }, // 3
                  { x: "45%", y: "80%" }, // 4
                  { x: "60%", y: "80%" }, // 5 (New)
                ];
                const pos = positions[idx];
                const isNew = val === 0;

                return (
                  <div
                    key={`${idx}-${val}`}
                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                      isNew
                        ? "bg-green-500 text-white scale-110 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                        : "bg-slate-800 text-slate-400 border border-slate-600"
                    }`}
                    style={{
                      left: pos.x,
                      top: pos.y,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {val}
                  </div>
                );
              })}
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
                className="p-2 rounded-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-2">{current.msg}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 2: Top K
const TopKPage = () => {
  const [step, setStep] = useState(0);

  // Stream: [3, 2, 1, 5, 6, 4], K=2
  // Heap (Min-Heap of size 2)
  // 0: In: 3. Heap: [3]
  // 1: In: 2. Heap: [2, 3]
  // 2: In: 1. 1 < 2. Ignore. Heap: [2, 3]
  // 3: In: 5. 5 > 2. Pop 2, Push 5. Heap: [3, 5]
  // 4: In: 6. 6 > 3. Pop 3, Push 6. Heap: [5, 6]
  // 5: In: 4. 4 < 5. Ignore. Heap: [5, 6]

  const steps = [
    { in: 3, heap: [3], msg: "Add 3. Size < K." },
    { in: 2, heap: [2, 3], msg: "Add 2. Heap Full (Size 2)." },
    { in: 1, heap: [2, 3], msg: "1 < Root(2). Too small. Ignore." },
    { in: 5, heap: [3, 5], msg: "5 > Root(2). Kick 2, Add 5." },
    { in: 6, heap: [5, 6], msg: "6 > Root(3). Kick 3, Add 6." },
    { in: 4, heap: [5, 6], msg: "4 < Root(5). Too small. Ignore." },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern A: Kth Largest Element
        </h2>
        <p className="text-slate-400 mb-6">
          Maintain a "Hall of Fame" (Min-Heap) of size K.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-black/40 p-6 rounded-xl border border-slate-800 h-64 flex flex-col items-center justify-center relative">
              {/* VIP Club Visual */}
              <div className="flex items-end gap-8">
                {/* Incoming */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs text-slate-500">Incoming</span>
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {current.in}
                  </div>
                </div>

                <ArrowRight className="text-slate-600 mb-4" />

                {/* The Club (Heap) */}
                <div className="relative w-32 h-40 border-4 border-orange-500/50 rounded-xl bg-slate-900/50 flex flex-col items-center justify-end p-2 gap-2">
                  <div className="absolute -top-3 bg-orange-500 text-black text-[10px] font-bold px-2 rounded">
                    VIP CLUB (K=2)
                  </div>
                  {current.heap.map((val, i) => (
                    <div
                      key={i}
                      className={`w-full h-10 rounded flex items-center justify-center font-bold text-white transition-all duration-300 ${
                        i === 0 ? "bg-red-500/80" : "bg-green-500/80"
                      }`}
                    >
                      {val}{" "}
                      {i === 0 && (
                        <span className="text-[8px] ml-1">(Root)</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-2 bg-slate-800/80 px-3 py-1 rounded text-xs text-yellow-300">
                {current.msg}
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
                className="p-2 rounded-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-orange-500">
              <h3 className="font-semibold text-orange-400 mb-2">The Logic</h3>
              <p className="text-sm text-slate-300 mb-2">
                To find the <strong>Kth Largest</strong>, use a{" "}
                <strong>Min-Heap</strong> of size K.
              </p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>The Heap holds the "Top K" giants.</li>
                <li>The Root is the smallest of the giants.</li>
                <li>
                  If <code className="text-white">New &gt; Root</code>, kick out
                  Root.
                </li>
              </ul>
            </div>

            <CodeBlock
              code={`def findKthLargest(nums, k):
    heap = []
    for n in nums:
        heapq.heappush(heap, n)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 3: Merge K Lists
const MergeKListsPage = () => {
  const [step, setStep] = useState(0);

  // L1: [1, 4, 5]
  // L2: [1, 3, 4]
  // L3: [2, 6]
  // Heap stores (val, listId)
  // 0: Init: [(1, L1), (1, L2), (2, L3)]. Res: []
  // 1: Pop 1(L1). Push 4(L1). Heap: [(1, L2), (2, L3), (4, L1)]. Res: [1]
  // 2: Pop 1(L2). Push 3(L2). Heap: [(2, L3), (3, L2), (4, L1)]. Res: [1, 1]
  // 3: Pop 2(L3). Push 6(L3). Heap: [(3, L2), (4, L1), (6, L3)]. Res: [1, 1, 2]

  const steps = [
    {
      heap: [
        { v: 1, l: 1 },
        { v: 1, l: 2 },
        { v: 2, l: 3 },
      ],
      res: [],
      msg: "Init Heap with heads of all lists.",
    },
    {
      heap: [
        { v: 1, l: 2 },
        { v: 2, l: 3 },
        { v: 4, l: 1 },
      ],
      res: [1],
      msg: "Pop 1 (L1). Push next from L1 (4).",
    },
    {
      heap: [
        { v: 2, l: 3 },
        { v: 3, l: 2 },
        { v: 4, l: 1 },
      ],
      res: [1, 1],
      msg: "Pop 1 (L2). Push next from L2 (3).",
    },
    {
      heap: [
        { v: 3, l: 2 },
        { v: 4, l: 1 },
        { v: 6, l: 3 },
      ],
      res: [1, 1, 2],
      msg: "Pop 2 (L3). Push next from L3 (6).",
    },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern B: Merge K Sorted Lists
        </h2>
        <p className="text-slate-400 mb-6">
          The "Race Track". Always pick the winner from the Min-Heap.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-black/40 p-6 rounded-xl border border-slate-800 h-64 flex flex-col justify-between relative">
              {/* Lanes */}
              <div className="flex justify-around w-full px-4">
                {[1, 2, 3].map((l) => (
                  <div key={l} className="flex flex-col items-center gap-2">
                    <span className="text-xs text-slate-500">List {l}</span>
                    <div className="w-1 bg-slate-700 h-20 rounded-full relative">
                      {/* Runner */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-500 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Heap (The Starting Line) */}
              <div className="flex justify-center gap-2">
                {current.heap.map((item, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                      i === 0
                        ? "bg-green-600 border-green-400 text-white scale-110 z-10"
                        : "bg-slate-800 border-slate-600 text-slate-400"
                    }`}
                  >
                    <span className="text-lg">{item.v}</span>
                    <span className="text-[8px] opacity-70">L{item.l}</span>
                  </div>
                ))}
              </div>

              {/* Result */}
              <div className="bg-slate-900/80 p-2 rounded text-center border border-slate-700">
                <span className="text-xs text-slate-500 block mb-1">
                  Result List
                </span>
                <div className="flex justify-center gap-1">
                  {current.res.map((r, i) => (
                    <span
                      key={i}
                      className="bg-blue-600 text-white px-2 rounded text-sm font-bold animate-in zoom-in"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute top-2 right-2 bg-slate-800/80 px-2 py-1 rounded text-[10px] text-yellow-300 max-w-[150px]">
                {current.msg}
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
                className="p-2 rounded-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold text-green-400 mb-2">The Logic</h3>
              <p className="text-sm text-slate-300 mb-2">
                We only need to compare the <strong>Heads</strong> of the K
                lists.
              </p>
              <ol className="list-decimal list-inside text-sm text-slate-400 space-y-1">
                <li>Push first item of all lists to Min-Heap.</li>
                <li>Pop Min (Winner). Add to Result.</li>
                <li>Push the *next* item from the Winner's list.</li>
              </ol>
            </div>

            <CodeBlock
              code={`def mergeKLists(lists):
    heap = []
    for i, l in enumerate(lists):
        if l: heapq.heappush(heap, (l.val, i, l))
            
    dummy = curr = ListNode(0)
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
            
    return dummy.next`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 4: Median
const MedianPage = () => {
  const [step, setStep] = useState(0);

  // Add: 5, 15, 1, 3
  // 0: Add 5. L:[5], R:[]. Med: 5
  // 1: Add 15. L:[5], R:[15]. Med: 10
  // 2: Add 1. L:[1,5], R:[15]. Med: 5
  // 3: Add 3. L:[1,3], R:[5,15]. Med: 4

  const steps = [
    {
      val: 5,
      l: [5],
      r: [],
      med: 5,
      msg: "Add 5. Goes to Left (MaxHeap).",
    },
    {
      val: 15,
      l: [5],
      r: [15],
      med: 10,
      msg: "Add 15. 15 > 5. Goes to Right. Balanced.",
    },
    {
      val: 1,
      l: [1, 5],
      r: [15],
      med: 5,
      msg: "Add 1. 1 < 5. Goes to Left. Left has more.",
    },
    {
      val: 3,
      l: [1, 3],
      r: [5, 15],
      med: 4,
      msg: "Add 3. Rebalance! Move 5 to Right.",
    },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern C: Median from Data Stream
        </h2>
        <p className="text-slate-400 mb-6">
          Balancing Act with Two Heaps: Max-Heap (Small Half) & Min-Heap (Large
          Half).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center h-64 relative">
            {/* Seesaw Visual */}
            <div className="relative w-full h-32 flex items-end justify-center mb-8">
              {/* Fulcrum */}
              <div className="absolute bottom-0 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] border-b-slate-500"></div>

              {/* Beam */}
              <div
                className="w-48 h-2 bg-slate-400 rounded transition-transform duration-500 origin-center"
                style={{
                  transform:
                    current.l.length > current.r.length
                      ? "rotate(-10deg)"
                      : current.l.length < current.r.length
                      ? "rotate(10deg)"
                      : "rotate(0deg)",
                }}
              >
                {/* Left Bucket */}
                <div className="absolute left-0 -top-12 w-16 h-12 border-2 border-blue-500 rounded-b-lg bg-blue-900/30 flex flex-col-reverse items-center p-1 gap-1">
                  {current.l.map((v, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold"
                    >
                      {v}
                    </div>
                  ))}
                </div>
                {/* Right Bucket */}
                <div className="absolute right-0 -top-12 w-16 h-12 border-2 border-red-500 rounded-b-lg bg-red-900/30 flex flex-col-reverse items-center p-1 gap-1">
                  {current.r.map((v, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold"
                    >
                      {v}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-800/80 px-4 py-2 rounded text-center">
              <p className="text-xs text-slate-400 mb-1">Current Median</p>
              <p className="text-2xl font-bold text-white">{current.med}</p>
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
                className="p-2 rounded-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-semibold text-purple-400 mb-2">
                The Strategy
              </h3>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>
                  <strong className="text-blue-400">Left (Max-Heap):</strong>{" "}
                  Stores smaller half. Root is largest of smalls.
                </li>
                <li>
                  <strong className="text-red-400">Right (Min-Heap):</strong>{" "}
                  Stores larger half. Root is smallest of larges.
                </li>
                <li>
                  <strong className="text-white">Balance:</strong> Sizes differ
                  by max 1.
                </li>
              </ul>
            </div>

            <CodeBlock
              code={`def addNum(self, num):
    heapq.heappush(self.small, -num)
    
    # Balance values
    if self.small and self.large and (-self.small[0] > self.large[0]):
        val = -heapq.heappop(self.small)
        heapq.heappush(self.large, val)
        
    # Balance sizes
    if len(self.small) > len(self.large) + 1:
        val = -heapq.heappop(self.small)
        heapq.heappush(self.large, val)
    if len(self.large) > len(self.small) + 1:
        val = heapq.heappop(self.large)
        heapq.heappush(self.small, -val)`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 5: Array Map
const ArrayMapPage = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  // Tree: 10 (0) -> 5 (1), 3 (2) -> 2 (3)
  const nodes = [
    { id: 0, val: 10, x: "50%", y: "20%", p: null, l: 1, r: 2 },
    { id: 1, val: 5, x: "30%", y: "50%", p: 0, l: 3, r: null },
    { id: 2, val: 3, x: "70%", y: "50%", p: 0, l: null, r: null },
    { id: 3, val: 2, x: "15%", y: "80%", p: 1, l: null, r: null },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          The Mechanics: Heap in an Array
        </h2>
        <p className="text-slate-400 mb-6">
          Heaps are Trees stored in Arrays. No pointers needed!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center h-64 relative">
            {/* Tree */}
            <div className="relative w-48 h-32 mb-8">
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1="50%"
                  y1="20%"
                  x2="30%"
                  y2="50%"
                  stroke="#475569"
                  strokeWidth="2"
                />
                <line
                  x1="50%"
                  y1="20%"
                  x2="70%"
                  y2="50%"
                  stroke="#475569"
                  strokeWidth="2"
                />
                <line
                  x1="30%"
                  y1="50%"
                  x2="15%"
                  y2="80%"
                  stroke="#475569"
                  strokeWidth="2"
                />
              </svg>
              {nodes.map((n) => (
                <div
                  key={n.id}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`absolute w-10 h-10 rounded-full flex flex-col items-center justify-center text-sm font-bold border-2 cursor-pointer transition-all duration-300 ${
                    hovered === n.id
                      ? "bg-orange-600 border-orange-400 text-white scale-110 z-10"
                      : hovered === n.p
                      ? "bg-blue-900 border-blue-500 text-blue-200" // Child highlight
                      : hovered !== null &&
                        (nodes[hovered].l === n.id || nodes[hovered].r === n.id)
                      ? "bg-green-900 border-green-500 text-green-200" // Parent highlight
                      : "bg-slate-800 border-slate-600 text-slate-400"
                  }`}
                  style={{
                    left: n.x,
                    top: n.y,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {n.val}
                  <span className="text-[8px] opacity-70">idx:{n.id}</span>
                </div>
              ))}
            </div>

            {/* Array */}
            <div className="flex gap-1">
              {nodes.map((n) => (
                <div
                  key={n.id}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`w-12 h-12 border rounded flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    hovered === n.id
                      ? "bg-orange-600 border-orange-400 text-white"
                      : "bg-slate-800 border-slate-600 text-slate-400"
                  }`}
                >
                  <span className="font-bold">{n.val}</span>
                  <span className="text-[8px] opacity-50">{n.id}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-400 mb-2">The Formula</h3>
              <p className="text-sm text-slate-300 mb-4">
                For any node at index <code className="text-white">i</code>:
              </p>
              <div className="space-y-2 font-mono text-xs">
                <div className="bg-slate-900 p-2 rounded flex justify-between">
                  <span className="text-green-400">Left Child</span>
                  <span className="text-white">2 * i + 1</span>
                </div>
                <div className="bg-slate-900 p-2 rounded flex justify-between">
                  <span className="text-green-400">Right Child</span>
                  <span className="text-white">2 * i + 2</span>
                </div>
                <div className="bg-slate-900 p-2 rounded flex justify-between">
                  <span className="text-blue-400">Parent</span>
                  <span className="text-white">(i - 1) // 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeapGuide;
