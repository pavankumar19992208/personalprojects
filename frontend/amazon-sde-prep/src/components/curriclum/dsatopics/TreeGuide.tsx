import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Network, Copy, Check } from "lucide-react";

interface TreeGuideProps {
  initialPage?: number;
  onPageChange?: (page: number) => void;
  onComplete?: () => void;
}

const TreeGuide = ({
  initialPage = 1,
  onPageChange,
  onComplete,
}: TreeGuideProps) => {
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
                  ? "bg-blue-500"
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
        {page === 2 && <MaxDepthPage />}
        {page === 3 && <ZigZagPage />}
        {page === 4 && <LCAPage />}
        {page === 5 && <SerializationPage />}
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
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
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
  const [activeTab, setActiveTab] = useState<"dfs" | "bfs">("dfs");
  const [step, setStep] = useState(0);

  // Simple Tree: 1 -> (2, 3)
  // DFS Path: 1 -> 2 -> Back -> 3
  // BFS Path: 1 -> 2 -> 3

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Network className="text-blue-400" /> DFS vs. BFS
        </h2>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setActiveTab("dfs");
              setStep(0);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
              activeTab === "dfs"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            DFS (Depth First)
          </button>
          <button
            onClick={() => {
              setActiveTab("bfs");
              setStep(0);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
              activeTab === "bfs"
                ? "bg-purple-600 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            BFS (Breadth First)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div
              className={`bg-slate-800/50 p-4 rounded-lg border-l-4 ${
                activeTab === "dfs" ? "border-blue-500" : "border-purple-500"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-2 ${
                  activeTab === "dfs" ? "text-blue-400" : "text-purple-400"
                }`}
              >
                {activeTab === "dfs" ? "The Maze Solver" : "The Ripple Effect"}
              </h3>
              <p className="text-slate-300 text-sm mb-2">
                {activeTab === "dfs"
                  ? "Go deep down one path until you hit a dead end, then backtrack."
                  : "Visit all neighbors at the current depth before moving deeper."}
              </p>
              <div className="flex gap-2 text-xs">
                <span className="bg-slate-900 px-2 py-1 rounded text-slate-400">
                  DS: {activeTab === "dfs" ? "Stack (LIFO)" : "Queue (FIFO)"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-black/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center h-64 relative">
            {/* Tree Visual */}
            <div className="relative w-48 h-48">
              {/* Edges */}
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
                <line
                  x1="30%"
                  y1="50%"
                  x2="45%"
                  y2="80%"
                  stroke="#475569"
                  strokeWidth="2"
                />
              </svg>

              {/* Nodes */}
              {[
                { id: 1, x: "50%", y: "20%" },
                { id: 2, x: "30%", y: "50%" },
                { id: 3, x: "70%", y: "50%" },
                { id: 4, x: "15%", y: "80%" },
                { id: 5, x: "45%", y: "80%" },
              ].map((node) => {
                let isActive = false;
                if (activeTab === "dfs") {
                  // DFS Order: 1 -> 2 -> 4 -> 5 -> 3
                  if (step === 0 && node.id === 1) isActive = true;
                  if (step === 1 && node.id === 2) isActive = true;
                  if (step === 2 && (node.id === 4 || node.id === 5))
                    isActive = true;
                  if (step === 3 && node.id === 3) isActive = true;
                } else {
                  // BFS Order: 1 -> (2,3) -> (4,5)
                  if (step === 0 && node.id === 1) isActive = true;
                  if (step === 1 && (node.id === 2 || node.id === 3))
                    isActive = true;
                  if (step === 2 && (node.id === 4 || node.id === 5))
                    isActive = true;
                }

                return (
                  <div
                    key={node.id}
                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                      isActive
                        ? activeTab === "dfs"
                          ? "bg-blue-500 text-white scale-110 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                          : "bg-purple-500 text-white scale-110 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                        : "bg-slate-800 text-slate-500 border border-slate-700"
                    }`}
                    style={{
                      left: node.x,
                      top: node.y,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {node.id}
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 mt-4">
              {activeTab === "dfs" ? "Tracing path..." : "Scanning levels..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 2: Max Depth
const MaxDepthPage = () => {
  const [step, setStep] = useState(0);

  // Tree: 3 -> (9, 20 -> (15, 7))
  // Steps:
  // 0: Start at leaves 9, 15, 7. Return 1.
  // 1: Node 20 computes max(1,1)+1 = 2.
  // 2: Root 3 computes max(1,2)+1 = 3.

  const steps = [
    {
      active: [9, 15, 7],
      vals: { 9: 1, 15: 1, 7: 1 },
      msg: "Leaves return 1 (Depth 1)",
    },
    {
      active: [20],
      vals: { 9: 1, 15: 1, 7: 1, 20: 2 },
      msg: "Node 20: 1 + max(1, 1) = 2",
    },
    {
      active: [3],
      vals: { 9: 1, 15: 1, 7: 1, 20: 2, 3: 3 },
      msg: "Root 3: 1 + max(1, 2) = 3",
    },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern A: Max Depth (DFS)
        </h2>
        <p className="text-slate-400 mb-6">
          Calculate height by bubbling up values from children.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-black/40 p-6 rounded-xl border border-slate-800 h-64 flex flex-col items-center justify-center relative">
              <div className="relative w-64 h-48">
                {/* Edges */}
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
                    x1="70%"
                    y1="50%"
                    x2="55%"
                    y2="80%"
                    stroke="#475569"
                    strokeWidth="2"
                  />
                  <line
                    x1="70%"
                    y1="50%"
                    x2="85%"
                    y2="80%"
                    stroke="#475569"
                    strokeWidth="2"
                  />
                </svg>

                {/* Nodes */}
                {[
                  { id: 3, x: "50%", y: "20%" },
                  { id: 9, x: "30%", y: "50%" },
                  { id: 20, x: "70%", y: "50%" },
                  { id: 15, x: "55%", y: "80%" },
                  { id: 7, x: "85%", y: "80%" },
                ].map((node) => {
                  const val =
                    current.vals[node.id as keyof typeof current.vals];
                  const isActive = current.active.includes(node.id);

                  return (
                    <div
                      key={node.id}
                      className="absolute"
                      style={{
                        left: node.x,
                        top: node.y,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-500 ${
                          isActive
                            ? "bg-blue-600 border-blue-400 text-white scale-110"
                            : "bg-slate-800 border-slate-600 text-slate-400"
                        }`}
                      >
                        {node.id}
                      </div>
                      {val && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded animate-in zoom-in slide-in-from-bottom-2">
                          {val}
                        </div>
                      )}
                    </div>
                  );
                })}
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
                Recursive formula:
                <br />
                <code className="text-white">Depth = 1 + max(Left, Right)</code>
              </p>
            </div>

            <CodeBlock
              code={`def maxDepth(root):
    if not root:
        return 0
        
    left = maxDepth(root.left)
    right = maxDepth(root.right)
    
    return 1 + max(left, right)`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 3: ZigZag
const ZigZagPage = () => {
  const [step, setStep] = useState(0);

  // Tree: 3 -> (9, 20 -> (15, 7))
  // Levels:
  // 0: [3] -> L to R -> [3]
  // 1: [9, 20] -> R to L -> [20, 9]
  // 2: [15, 7] -> L to R -> [15, 7]

  const steps = [
    { level: 0, nodes: [3], dir: "L → R", res: "[3]" },
    { level: 1, nodes: [9, 20], dir: "R ← L", res: "[20, 9]" },
    { level: 2, nodes: [15, 7], dir: "L → R", res: "[15, 7]" },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern B: ZigZag Level Order (BFS)
        </h2>
        <p className="text-slate-400 mb-6">
          Standard BFS with a twist: Reverse direction every level.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-black/40 p-6 rounded-xl border border-slate-800 h-64 flex flex-col items-center justify-center relative">
              {/* Tree */}
              <div className="relative w-64 h-48">
                {/* Edges */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                  <line
                    x1="50%"
                    y1="20%"
                    x2="30%"
                    y2="50%"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <line
                    x1="50%"
                    y1="20%"
                    x2="70%"
                    y2="50%"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <line
                    x1="70%"
                    y1="50%"
                    x2="55%"
                    y2="80%"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <line
                    x1="70%"
                    y1="50%"
                    x2="85%"
                    y2="80%"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>

                {/* Level Highlights */}
                <div
                  className={`absolute w-full h-12 rounded-lg transition-all duration-500 flex items-center justify-center gap-2 ${
                    current.dir === "R ← L"
                      ? "bg-purple-500/20 border border-purple-500/50"
                      : "bg-blue-500/20 border border-blue-500/50"
                  }`}
                  style={{
                    top: step === 0 ? "10%" : step === 1 ? "40%" : "70%",
                  }}
                >
                  {current.dir === "L → R" ? (
                    <ArrowRight className="text-blue-400 animate-pulse" />
                  ) : (
                    <ArrowLeft className="text-purple-400 animate-pulse" />
                  )}
                </div>

                {/* Nodes */}
                {[
                  { id: 3, x: "50%", y: "20%", lvl: 0 },
                  { id: 9, x: "30%", y: "50%", lvl: 1 },
                  { id: 20, x: "70%", y: "50%", lvl: 1 },
                  { id: 15, x: "55%", y: "80%", lvl: 2 },
                  { id: 7, x: "85%", y: "80%", lvl: 2 },
                ].map((node) => (
                  <div
                    key={node.id}
                    className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                      node.lvl === step
                        ? "bg-white text-black border-white scale-110"
                        : "bg-slate-800 border-slate-600 text-slate-500"
                    }`}
                    style={{
                      left: node.x,
                      top: node.y,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {node.id}
                  </div>
                ))}
              </div>

              <div className="absolute bottom-2 bg-slate-800/80 px-3 py-1 rounded text-xs text-white font-mono">
                Result: {current.res}
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
              <h3 className="font-semibold text-purple-400 mb-2">The Twist</h3>
              <p className="text-sm text-slate-300 mb-2">
                Use a boolean flag{" "}
                <code className="text-white">leftToRight</code>. Flip it after
                every level.
              </p>
              <p className="text-xs text-slate-400">
                If false, reverse the level's values before adding to result.
              </p>
            </div>

            <CodeBlock
              code={`def zigzagLevelOrder(root):
    if not root: return []
    res, q = [], deque([root])
    ltr = True
    
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
            
        if not ltr: level.reverse()
        res.append(level)
        ltr = not ltr
        
    return res`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 4: LCA
const LCAPage = () => {
  const [step, setStep] = useState(0);

  // Tree: 3 -> (5, 1)
  // Find LCA(5, 1)
  // Steps:
  // 0: Highlight 5 and 1.
  // 1: Trace up from 5 -> 3. Trace up from 1 -> 3.
  // 2: Meet at 3.

  const steps = [
    {
      active: [5, 1],
      lca: null,
      msg: "Find LCA of 5 and 1. Search both subtrees.",
    },
    {
      active: [5, 1],
      paths: true,
      lca: null,
      msg: "Left returns 5. Right returns 1.",
    },
    {
      active: [5, 1],
      paths: true,
      lca: 3,
      msg: "Both sides returned non-null. Root 3 is the split point.",
    },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern C: Lowest Common Ancestor
        </h2>
        <p className="text-slate-400 mb-6">
          Find the lowest node that has both P and Q as descendants.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-black/40 p-6 rounded-xl border border-slate-800 h-64 flex flex-col items-center justify-center relative">
              <div className="relative w-64 h-48">
                {/* Edges */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line
                    x1="50%"
                    y1="20%"
                    x2="30%"
                    y2="50%"
                    stroke={current.paths ? "#eab308" : "#475569"}
                    strokeWidth={current.paths ? "4" : "2"}
                    className="transition-all duration-500"
                  />
                  <line
                    x1="50%"
                    y1="20%"
                    x2="70%"
                    y2="50%"
                    stroke={current.paths ? "#eab308" : "#475569"}
                    strokeWidth={current.paths ? "4" : "2"}
                    className="transition-all duration-500"
                  />
                </svg>

                {/* Nodes */}
                {[
                  { id: 3, x: "50%", y: "20%" },
                  { id: 5, x: "30%", y: "50%" },
                  { id: 1, x: "70%", y: "50%" },
                ].map((node) => {
                  const isTarget = current.active.includes(node.id);
                  const isLCA = current.lca === node.id;

                  return (
                    <div
                      key={node.id}
                      className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-2 transition-all duration-500 ${
                        isLCA
                          ? "bg-yellow-500 border-yellow-300 text-black scale-125 shadow-[0_0_20px_rgba(234,179,8,0.5)]"
                          : isTarget
                          ? "bg-blue-600 border-blue-400 text-white"
                          : "bg-slate-800 border-slate-600 text-slate-400"
                      }`}
                      style={{
                        left: node.x,
                        top: node.y,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {node.id}
                      {isTarget && !isLCA && (
                        <div className="absolute -bottom-6 text-xs text-blue-400 font-bold">
                          Target
                        </div>
                      )}
                      {isLCA && (
                        <div className="absolute -top-8 text-xs text-yellow-400 font-bold animate-bounce">
                          LCA!
                        </div>
                      )}
                    </div>
                  );
                })}
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
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-semibold text-yellow-400 mb-2">
                The Split Point
              </h3>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>
                  If <code className="text-white">Left</code> and{" "}
                  <code className="text-white">Right</code> both return a node,
                  then <strong className="text-yellow-300">I am the LCA</strong>
                  .
                </li>
                <li>
                  If only one side returns a node, pass it up (LCA is higher).
                </li>
              </ul>
            </div>

            <CodeBlock
              code={`def lowestCommonAncestor(root, p, q):
    if not root or root == p or root == q:
        return root
        
    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)
    
    if left and right:
        return root
        
    return left if left else right`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 5: Serialization
const SerializationPage = () => {
  const [step, setStep] = useState(0);

  // Tree: 1 -> (2, 3)
  // Preorder: 1, 2, N, N, 3, N, N
  const steps = [
    { hl: 1, str: "1" },
    { hl: 2, str: "1,2" },
    { hl: "2L", str: "1,2,N" },
    { hl: "2R", str: "1,2,N,N" },
    { hl: 3, str: "1,2,N,N,3" },
    { hl: "3L", str: "1,2,N,N,3,N" },
    { hl: "3R", str: "1,2,N,N,3,N,N" },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern D: Serialization
        </h2>
        <p className="text-slate-400 mb-6">
          Flatten a 2D tree into a 1D string (and back).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center h-64">
            <div className="flex items-center gap-8">
              {/* Tree */}
              <div className="relative w-32 h-32">
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line
                    x1="50%"
                    y1="20%"
                    x2="30%"
                    y2="60%"
                    stroke="#475569"
                    strokeWidth="2"
                  />
                  <line
                    x1="50%"
                    y1="20%"
                    x2="70%"
                    y2="60%"
                    stroke="#475569"
                    strokeWidth="2"
                  />
                </svg>
                {[
                  { id: 1, x: "50%", y: "20%" },
                  { id: 2, x: "30%", y: "60%" },
                  { id: 3, x: "70%", y: "60%" },
                ].map((node) => (
                  <div
                    key={node.id}
                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                      current.hl === node.id
                        ? "bg-green-600 border-green-400 text-white scale-125"
                        : "bg-slate-800 border-slate-600 text-slate-400"
                    }`}
                    style={{
                      left: node.x,
                      top: node.y,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {node.id}
                  </div>
                ))}
                {/* Null Indicators */}
                {current.hl === "2L" && (
                  <div className="absolute left-[10%] top-[80%] text-red-500 font-bold text-xs">
                    N
                  </div>
                )}
                {current.hl === "2R" && (
                  <div className="absolute left-[40%] top-[80%] text-red-500 font-bold text-xs">
                    N
                  </div>
                )}
                {current.hl === "3L" && (
                  <div className="absolute left-[60%] top-[80%] text-red-500 font-bold text-xs">
                    N
                  </div>
                )}
                {current.hl === "3R" && (
                  <div className="absolute left-[90%] top-[80%] text-red-500 font-bold text-xs">
                    N
                  </div>
                )}
              </div>

              <ArrowRight className="text-slate-600" />

              {/* String */}
              <div className="bg-slate-900 p-3 rounded border border-slate-700 font-mono text-sm text-green-400 w-40 break-all">
                "{current.str}"
              </div>
            </div>

            <div className="flex gap-2 mt-8">
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
                Preorder Traversal
              </h3>
              <p className="text-sm text-slate-300 mb-2">
                Visit Root, then Left, then Right.
              </p>
              <p className="text-xs text-slate-400">
                Crucial: Record <code className="text-red-400">N</code> (Null)
                for empty children to preserve structure.
              </p>
            </div>
            <CodeBlock
              code={`def serialize(root):
    res = []
    def dfs(node):
        if not node:
            res.append("N")
            return
        res.append(str(node.val))
        dfs(node.left)
        dfs(node.right)
    dfs(root)
    return ",".join(res)`}
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeGuide;
