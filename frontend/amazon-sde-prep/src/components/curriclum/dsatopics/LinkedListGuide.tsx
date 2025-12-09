import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Link,
  //   RotateCcw,
  //   GitMerge,
  //   Trash2,
  Copy,
  Check,
} from "lucide-react";

const LinkedListGuide = () => {
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
        {page === 2 && <CycleDetectionPage />}
        {page === 3 && <MergeListsPage />}
        {page === 4 && <ReverseListPage />}
        {page === 5 && <RemoveNthNodePage />}
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

const CodeBlock = ({
  code,
}: //   language = "python",
{
  code: string;
  language?: string;
}) => {
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

// Page 1: The Concept
const ConceptPage = () => {
  const [step, setStep] = useState(0);

  // 0: Initial State A -> B
  // 1: New Node Appears
  // 2: A -> New -> B

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Link className="text-blue-400" /> Pointers & Dummy Nodes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                The Core Philosophy
              </h3>
              <p className="text-slate-300 text-sm mb-2">
                Arrays are contiguous. Linked Lists are scattered.
              </p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>
                  <strong className="text-green-400">Pros:</strong> O(1)
                  Insert/Delete (No shifting!)
                </li>
                <li>
                  <strong className="text-red-400">Cons:</strong> O(N) Access
                  (Must walk to index)
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                The "Amazon Trick": Dummy Nodes
              </h3>
              <p className="text-slate-300 text-sm mb-2">
                Eliminate 90% of edge case bugs (like deleting the Head).
              </p>
              <p className="text-xs text-slate-400 italic">
                "Create a Dummy Node (-1) that points to the real Head. Always
                return dummy.next."
              </p>
            </div>
          </div>

          <div className="bg-black/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-8">
            <div className="h-32 flex items-center justify-center gap-2 relative w-full">
              {/* Node A */}
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white z-10 relative">
                A
                <div className="absolute -bottom-6 text-xs text-slate-500">
                  Head
                </div>
              </div>

              {/* Arrow A -> B (Dissolving) */}
              <div
                className={`h-1 bg-slate-600 transition-all duration-500 relative ${
                  step === 2 ? "w-0 opacity-0" : "w-16"
                }`}
              >
                <div className="absolute right-0 -top-1.5 border-t-4 border-b-4 border-l-8 border-transparent border-l-slate-600"></div>
              </div>

              {/* New Node (Appearing) */}
              <div
                className={`
                absolute left-1/2 -translate-x-1/2 transition-all duration-500 flex flex-col items-center
                ${
                  step === 0
                    ? "opacity-0 -translate-y-8 scale-50"
                    : step === 1
                    ? "opacity-100 -translate-y-12 scale-100"
                    : "opacity-100 translate-y-0 scale-100"
                }
              `}
              >
                <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                  New
                </div>
                {step === 2 && (
                  <div className="absolute -top-8 text-xs text-green-400 font-bold whitespace-nowrap animate-bounce">
                    O(1) Insertion!
                  </div>
                )}
              </div>

              {/* New Arrows (Appearing) */}
              {step === 2 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* A -> New */}
                  <div className="absolute left-[35%] w-12 h-1 bg-green-500 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="absolute right-0 -top-1.5 border-t-4 border-b-4 border-l-8 border-transparent border-l-green-500"></div>
                  </div>
                  {/* New -> B */}
                  <div className="absolute right-[35%] w-12 h-1 bg-green-500 animate-in fade-in slide-in-from-left-4 duration-500 delay-150">
                    <div className="absolute right-0 -top-1.5 border-t-4 border-b-4 border-l-8 border-transparent border-l-green-500"></div>
                  </div>
                </div>
              )}

              {/* Node B */}
              <div
                className={`w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white z-10 transition-all duration-500 ${
                  step === 2 ? "translate-x-8" : ""
                }`}
              >
                B
              </div>
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
                onClick={() => setStep(Math.min(2, step + 1))}
                disabled={step === 2}
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400">
              {step === 0
                ? "Initial State: A points to B"
                : step === 1
                ? "Create New Node"
                : "Rewire Pointers: A->New, New->B"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 2: Cycle Detection
const CycleDetectionPage = () => {
  const [step, setStep] = useState(0);

  // Nodes: 0(3) -> 1(2) -> 2(0) -> 3(-4) -> 1(2)
  // Positions on a circle
  const nodes = [
    { id: 0, val: 3, x: 50, y: 10 },
    { id: 1, val: 2, x: 90, y: 50 },
    { id: 2, val: 0, x: 50, y: 90 },
    { id: 3, val: -4, x: 10, y: 50 },
  ];

  // Steps: { slow: nodeIdx, fast: nodeIdx }
  //   const steps = [
  //     { s: 0, f: 0, msg: "Start: Slow=3, Fast=3" },
  //     { s: 1, f: 2, msg: "Step 1: Slow moves 1 (to 2), Fast moves 2 (to 0)" },
  //     {
  //       s: 2,
  //       f: 0,
  //       msg: "Step 2: Slow moves 1 (to 0), Fast moves 2 (loops to 3 -> 2 -> 0? No wait. 0->-4->2. Fast is at 2? Let's trace carefully. 0->1->2->3->1. Fast was at 2(idx 2). Next is 3, then 1. So Fast is at 1.",
  //     },
  //     // Correction for visual simplicity: 0->1->2->3->1
  //     // S:0, F:0
  //     // S:1, F:2
  //     // S:2, F:0 (Wait, 2->3->1. Fast is at 1)
  //     // Let's stick to the prompt example: 3 -> 2 -> 0 -> -4 -> 2
  //     // Idx: 0 -> 1 -> 2 -> 3 -> 1
  //     // S:0(3), F:0(3)
  //     // S:1(2), F:2(0)
  //     // S:2(0), F:1(2) (Fast went 0->-4->2)
  //     // S:3(-4), F:3(-4) (Fast went 2->0->-4). MEET!
  //   ];

  // Corrected Steps for Visual
  const simSteps = [
    { s: 0, f: 0, msg: "Start: Slow=3, Fast=3" },
    { s: 1, f: 2, msg: "Step 1: Slow->2, Fast->0 (Jumped over 2)" },
    {
      s: 2,
      f: 1,
      msg: "Step 2: Slow->0, Fast->2 (Jumped over -4, loops to 2)",
    },
    { s: 3, f: 3, msg: "Step 3: Slow->-4, Fast->-4. MEET! Cycle Detected." },
  ];

  const current = simSteps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern A: Fast & Slow Pointers
        </h2>
        <p className="text-slate-400 mb-6">
          Detect if a Linked List has a cycle using Floyd's Tortoise & Hare
          algorithm.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-black/40 p-6 rounded-xl border border-slate-800 h-64 flex flex-col items-center justify-center relative">
              {/* Circular Track Visual */}
              <div className="relative w-48 h-48">
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 50 10 L 90 50 L 50 90 L 10 50 L 90 50"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                  />
                  <defs>
                    <marker
                      id="arrow"
                      markerWidth="10"
                      markerHeight="10"
                      refX="9"
                      refY="3"
                      orient="auto"
                      markerUnits="strokeWidth"
                    >
                      <path d="M0,0 L0,6 L9,3 z" fill="#475569" />
                    </marker>
                  </defs>
                </svg>

                {nodes.map((n, i) => (
                  <div
                    key={i}
                    className="absolute w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-white font-bold z-10"
                    style={{
                      left: `${n.x}%`,
                      top: `${n.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {n.val}
                  </div>
                ))}

                {/* Pointers */}
                <div
                  className="absolute w-4 h-4 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)] z-20 transition-all duration-500"
                  style={{
                    left: `${nodes[current.s].x}%`,
                    top: `${nodes[current.s].y}%`,
                    transform: "translate(-50%, -50%) translate(-10px, -10px)",
                  }}
                >
                  <div className="absolute -top-4 -left-2 text-[10px] text-green-400 font-bold">
                    S
                  </div>
                </div>
                <div
                  className="absolute w-4 h-4 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] z-20 transition-all duration-500"
                  style={{
                    left: `${nodes[current.f].x}%`,
                    top: `${nodes[current.f].y}%`,
                    transform: "translate(-50%, -50%) translate(10px, -10px)",
                  }}
                >
                  <div className="absolute -top-4 -right-2 text-[10px] text-red-400 font-bold">
                    F
                  </div>
                </div>

                {/* Collision Flash */}
                {step === 3 && (
                  <div className="absolute inset-0 flex items-center justify-center z-30 animate-ping">
                    <div className="w-full h-full rounded-full bg-yellow-500/20"></div>
                  </div>
                )}
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
                onClick={() => setStep(Math.min(simSteps.length - 1, step + 1))}
                disabled={step === simSteps.length - 1}
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-400 mb-2">The Physics</h3>
              <p className="text-sm text-slate-300 mb-2">
                If there is a loop, the Fast pointer (Hare) will eventually lap
                the Slow pointer (Tortoise).
              </p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>
                  <strong className="text-white">Slow:</strong> Moves 1 step.
                </li>
                <li>
                  <strong className="text-white">Fast:</strong> Moves 2 steps.
                </li>
                <li>
                  If <code className="text-yellow-300">Slow == Fast</code>:
                  Cycle Detected!
                </li>
              </ul>
            </div>

            <CodeBlock
              code={`def hasCycle(head):
    slow, fast = head, head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        if slow == fast:
            return True
            
    return False`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 3: Merge Two Lists
const MergeListsPage = () => {
  const [step, setStep] = useState(0);

  // L1: 1 -> 2 -> 4
  // L2: 1 -> 3 -> 4
  // Result built step by step

  const steps = [
    {
      l1: 0,
      l2: 0,
      res: [],
      msg: "Start. Compare 1 vs 1. Pick L1 (arbitrary).",
    },
    { l1: 1, l2: 0, res: [1], msg: "Added 1. Compare 2 vs 1. Pick L2." },
    { l1: 1, l2: 1, res: [1, 1], msg: "Added 1. Compare 2 vs 3. Pick L1." },
    { l1: 2, l2: 1, res: [1, 1, 2], msg: "Added 2. Compare 4 vs 3. Pick L2." },
    {
      l1: 2,
      l2: 2,
      res: [1, 1, 2, 3],
      msg: "Added 3. Compare 4 vs 4. Pick L1.",
    },
    {
      l1: 3,
      l2: 2,
      res: [1, 1, 2, 3, 4],
      msg: "Added 4. L1 Empty. Attach rest of L2.",
    },
    { l1: 3, l2: 3, res: [1, 1, 2, 3, 4, 4], msg: "Done." },
  ];

  const current = steps[step];
  const list1 = [1, 2, 4];
  const list2 = [1, 3, 4];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern B: Merge Two Sorted Lists
        </h2>
        <p className="text-slate-400 mb-6">
          The "Zipper" technique. Always pick the smaller value.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-black/40 p-6 rounded-xl border border-slate-800 h-64 flex flex-col justify-between relative">
              {/* Source Lists */}
              <div className="flex justify-around">
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-xs text-slate-500">List 1</span>
                  {list1.map((val, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded bg-blue-900/50 border border-blue-700 flex items-center justify-center text-sm transition-all ${
                        i < current.l1 ? "opacity-20" : "opacity-100"
                      }`}
                    >
                      {val}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-xs text-slate-500">List 2</span>
                  {list2.map((val, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded bg-purple-900/50 border border-purple-700 flex items-center justify-center text-sm transition-all ${
                        i < current.l2 ? "opacity-20" : "opacity-100"
                      }`}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              </div>

              {/* Result List (Zipper) */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-400 border border-dashed border-slate-500">
                  D
                </div>
                {current.res.map((val, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded bg-green-600 flex items-center justify-center text-white font-bold text-sm animate-in zoom-in duration-300"
                  >
                    {val}
                  </div>
                ))}
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-yellow-300 bg-slate-900/80 px-2 py-1 rounded">
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
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold text-green-400 mb-2">The Logic</h3>
              <p className="text-sm text-slate-300 mb-2">
                Iterate through both lists, picking the smaller node to attach
                to <code className="text-yellow-300">tail.next</code>.
              </p>
              <p className="text-xs text-slate-400">
                Crucial: Use a <span className="text-white">Dummy Node</span> as
                the anchor. Return{" "}
                <code className="text-white">dummy.next</code>.
              </p>
            </div>

            <CodeBlock
              code={`def mergeTwoLists(l1, l2):
    dummy = ListNode(-1)
    tail = dummy
    
    while l1 and l2:
        if l1.val < l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next
        
    if l1: tail.next = l1
    elif l2: tail.next = l2
        
    return dummy.next`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 4: Reverse List
const ReverseListPage = () => {
  const [step, setStep] = useState(0);

  // List: 1 -> 2 -> 3
  // Steps:
  // 0: Init. Prev=None, Curr=1
  // 1: Save 2. 1->None. Prev=1, Curr=2
  // 2: Save 3. 2->1. Prev=2, Curr=3
  // 3: Save None. 3->2. Prev=3, Curr=None

  const steps = [
    {
      prev: null,
      curr: 1,
      links: { 1: null, 2: 3, 3: null },
      msg: "Start. Prev=None, Curr=1",
    },
    {
      prev: 1,
      curr: 2,
      links: { 1: "None", 2: 3, 3: null },
      msg: "Flip 1->None. Move P=1, C=2",
    },
    {
      prev: 2,
      curr: 3,
      links: { 1: "None", 2: 1, 3: null },
      msg: "Flip 2->1. Move P=2, C=3",
    },
    {
      prev: 3,
      curr: null,
      links: { 1: "None", 2: 1, 3: 2 },
      msg: "Flip 3->2. Move P=3, C=None. Done.",
    },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern C: Reverse Linked List
        </h2>
        <p className="text-slate-400 mb-6">
          Locally reverse the arrow using 3 pointers: Prev, Curr, Nxt.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center h-64">
            <div className="flex gap-8 items-center relative">
              {[1, 2, 3].map((val) => (
                <div key={val} className="relative">
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold z-10 relative bg-slate-800 ${
                      current.curr === val
                        ? "border-blue-500 text-blue-400"
                        : current.prev === val
                        ? "border-green-500 text-green-400"
                        : "border-slate-600 text-slate-500"
                    }`}
                  >
                    {val}
                    {current.curr === val && (
                      <div className="absolute -top-6 text-xs text-blue-500 font-bold">
                        Curr
                      </div>
                    )}
                    {current.prev === val && (
                      <div className="absolute -bottom-6 text-xs text-green-500 font-bold">
                        Prev
                      </div>
                    )}
                  </div>

                  {/* Arrow Logic */}
                  {/* If link points to None (left) */}
                  {current.links[val as 1 | 2 | 3] === "None" && (
                    <div className="absolute right-full top-1/2 w-8 h-0.5 bg-green-500 -translate-y-1/2 mr-1">
                      <div className="absolute left-0 -top-1 border-t-4 border-b-4 border-r-8 border-transparent border-r-green-500"></div>
                    </div>
                  )}
                  {/* If link points to left neighbor */}
                  {typeof current.links[val as 1 | 2 | 3] === "number" &&
                    (current.links[val as 1 | 2 | 3] as number) < val && (
                      <div className="absolute right-full top-1/2 w-8 h-0.5 bg-green-500 -translate-y-1/2 mr-1">
                        <div className="absolute left-0 -top-1 border-t-4 border-b-4 border-r-8 border-transparent border-r-green-500"></div>
                      </div>
                    )}
                  {/* If link points to right neighbor (default) */}
                  {current.links[val as 1 | 2 | 3] === val + 1 && (
                    <div className="absolute left-full top-1/2 w-8 h-0.5 bg-slate-600 -translate-y-1/2 ml-1">
                      <div className="absolute right-0 -top-1 border-t-4 border-b-4 border-l-8 border-transparent border-l-slate-600"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 bg-slate-800/50 px-4 py-2 rounded text-sm text-yellow-300">
              {current.msg}
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
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-semibold text-purple-400 mb-2">
                The Algorithm
              </h3>
              <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2">
                <li>
                  Save <code className="text-white">nxt = curr.next</code>{" "}
                  (Don't lose the list!)
                </li>
                <li>
                  Reverse{" "}
                  <code className="text-green-400">curr.next = prev</code>
                </li>
                <li>
                  Move <code className="text-white">prev = curr</code>
                </li>
                <li>
                  Move <code className="text-white">curr = nxt</code>
                </li>
              </ol>
            </div>

            <CodeBlock
              code={`def reverseList(head):
    prev, curr = None, head
    
    while curr:
        nxt = curr.next  # Save future
        curr.next = prev # Reverse link
        prev = curr      # Move fwd
        curr = nxt       # Move fwd
        
    return prev`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 5: Remove Nth Node
const RemoveNthNodePage = () => {
  const [step, setStep] = useState(0);

  // List: D -> 1 -> 2 -> 3 -> 4 -> 5
  // N=2 (Remove 4)
  // Steps:
  // 0: Init. L=D, R=D
  // 1: Gap. Move R 2 steps -> 2. Gap is 2.
  // 2: Slide. Move L->3, R->5 (End).
  // 3: Delete. L.next = L.next.next (Skip 4).

  const steps = [
    { l: 0, r: 0, msg: "Init. Left=Dummy, Right=Dummy" },
    { l: 0, r: 2, msg: "Create Gap. Move Right N=2 steps." },
    { l: 3, r: 5, msg: "Slide Window. Move both until Right hits End." },
    { l: 3, r: 5, deleted: true, msg: "Delete. Left is at 3. Skip 4. (3->5)" },
  ];

  const current = steps[step];
  const nodes = ["D", 1, 2, 3, 4, 5];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern D: Remove Nth Node From End
        </h2>
        <p className="text-slate-400 mb-6">
          The "Gap Method". One pass solution using two pointers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center h-64">
            <div className="flex gap-2 items-center relative">
              {nodes.map((val, i) => (
                <div
                  key={i}
                  className={`relative transition-all duration-500 ${
                    current.deleted && val === 4
                      ? "scale-0 opacity-0 w-0 mx-0"
                      : "w-10 h-10 mx-1"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded bg-slate-800 border border-slate-600 flex items-center justify-center text-sm font-bold text-white z-10 relative`}
                  >
                    {val}
                    {current.l === i && (
                      <div className="absolute -bottom-6 text-xs text-green-500 font-bold">
                        L
                      </div>
                    )}
                    {current.r === i && (
                      <div className="absolute -top-6 text-xs text-blue-500 font-bold">
                        R
                      </div>
                    )}
                  </div>
                  {/* Connector */}
                  {i < nodes.length - 1 && !(current.deleted && val === 3) && (
                    <div className="absolute left-full top-1/2 w-4 h-0.5 bg-slate-600 -translate-y-1/2"></div>
                  )}
                  {/* New Connector after delete */}
                  {current.deleted && val === 3 && (
                    <div className="absolute left-full top-1/2 w-14 h-0.5 bg-green-500 -translate-y-1/2 z-0"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Ruler Visual */}
            <div
              className="mt-8 h-2 bg-blue-500/30 rounded relative transition-all duration-500"
              style={{
                width: "80px",
                transform: `translateX(${current.r * 20}px)`,
              }}
            >
              <div className="absolute -top-4 text-[10px] text-blue-400 w-full text-center">
                Gap = N
              </div>
            </div>

            <div className="mt-4 bg-slate-800/50 px-4 py-2 rounded text-sm text-yellow-300">
              {current.msg}
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
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-400 mb-2">
                The Gap Method
              </h3>
              <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2">
                <li>
                  Move <code className="text-blue-300">Right</code> pointer N
                  steps ahead.
                </li>
                <li>
                  Move both <code className="text-green-300">Left</code> and{" "}
                  <code className="text-blue-300">Right</code> until Right hits
                  end.
                </li>
                <li>
                  <code className="text-green-300">Left</code> is now at the
                  node <em>before</em> the target.
                </li>
                <li>
                  Delete:{" "}
                  <code className="text-white">left.next = left.next.next</code>
                </li>
              </ol>
            </div>

            <CodeBlock
              code={`def removeNthFromEnd(head, n):
    dummy = ListNode(0, head)
    left = dummy
    right = head
    
    # 1. Move Right N steps
    while n > 0 and right:
        right = right.next
        n -= 1
        
    # 2. Move both to end
    while right:
        left = left.next
        right = right.next
        
    # 3. Delete
    left.next = left.next.next
    
    return dummy.next`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedListGuide;
