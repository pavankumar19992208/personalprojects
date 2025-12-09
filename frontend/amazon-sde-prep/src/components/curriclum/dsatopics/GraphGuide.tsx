import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Grid,
  Copy,
  Check,
  //   Waves,
  Clock,
  //   GitFork,
  //   RefreshCw,
} from "lucide-react";

const GraphGuide = () => {
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
        {page === 2 && <IslandsPage />}
        {page === 3 && <RottingOrangesPage />}
        {page === 4 && <CloneGraphPage />}
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
  const [hovered, setHovered] = useState<number | null>(null);

  // 4x4 Grid
  // Center is 5 (idx 5 in 0-15 flat array) -> (1,1)
  // Neighbors: 1(0,1), 4(1,0), 6(1,2), 9(2,1)
  const cells = Array.from({ length: 16 }, (_, i) => i);
  const center = 5;
  const neighbors = [1, 4, 6, 9];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Grid className="text-purple-400" /> Matrix as a Graph
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">
                The Core Philosophy
              </h3>
              <p className="text-slate-300 text-sm mb-2">
                A Grid is just a Graph where every cell is a Node.
              </p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>
                  <strong className="text-white">Nodes:</strong> Cells (r, c).
                </li>
                <li>
                  <strong className="text-white">Edges:</strong> Up, Down, Left,
                  Right.
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-white mb-2">
                Amazon Context
              </h3>
              <p className="text-xs text-slate-400 italic">
                "A robot at (0,0) needs to reach a package at (5,5) avoiding
                obstacles."
              </p>
            </div>
          </div>

          <div className="bg-black/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center h-64">
            <div
              className="grid grid-cols-4 gap-2"
              onMouseEnter={() => setHovered(center)}
              onMouseLeave={() => setHovered(null)}
            >
              {cells.map((i) => {
                const isCenter = i === center;
                const isNeighbor = neighbors.includes(i);
                const isActive = hovered === center && (isCenter || isNeighbor);

                return (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded flex items-center justify-center text-xs font-bold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? isCenter
                          ? "bg-blue-600 text-white scale-110 z-10"
                          : "bg-yellow-500 text-black scale-105"
                        : "bg-slate-800 text-slate-600"
                    }`}
                  >
                    {isActive
                      ? isCenter
                        ? "Node"
                        : "Edge"
                      : `(${Math.floor(i / 4)},${i % 4})`}
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Hover over (1,1) to see implicit edges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 2: Number of Islands
const IslandsPage = () => {
  const [step, setStep] = useState(0);

  // Grid:
  // 1 1 0
  // 1 0 0
  // 0 0 1
  // Steps:
  // 0: Init. Count=0.
  // 1: Found (0,0). Count=1.
  // 2: DFS Sink (0,0)->(0,1)->(1,0)->(1,1). All turn blue.
  // 3: Loop continues. (0,1) is water. Ignore.
  // 4: Found (2,2). Count=2.
  // 5: DFS Sink (2,2).

  const steps = [
    {
      grid: [
        [1, 1, 0],
        [1, 0, 0],
        [0, 0, 1],
      ],
      count: 0,
      msg: "Start. Scan grid for '1' (Land).",
    },
    {
      grid: [
        [1, 1, 0],
        [1, 0, 0],
        [0, 0, 1],
      ],
      hl: [0, 0],
      count: 1,
      msg: "Found Land at (0,0)! Count = 1. Trigger DFS.",
    },
    {
      grid: [
        [2, 2, 0],
        [2, 0, 0],
        [0, 0, 1],
      ],
      count: 1,
      msg: "DFS Sinks the island (Turns 1 -> 0).",
    },
    {
      grid: [
        [2, 2, 0],
        [2, 0, 0],
        [0, 0, 1],
      ],
      hl: [2, 2],
      count: 2,
      msg: "Found Land at (2,2)! Count = 2. Trigger DFS.",
    },
    {
      grid: [
        [2, 2, 0],
        [2, 0, 0],
        [0, 0, 2],
      ],
      count: 2,
      msg: "DFS Sinks the island. All done.",
    },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern A: Number of Islands
        </h2>
        <p className="text-slate-400 mb-6">
          Count connected components. "Sink" visited land to avoid recounting.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-black/40 p-6 rounded-xl border border-slate-800 h-64 flex flex-col items-center justify-center relative">
              <div className="grid grid-cols-3 gap-2">
                {current.grid.map((row, r) =>
                  row.map((val, c) => (
                    <div
                      key={`${r}-${c}`}
                      className={`w-12 h-12 rounded flex items-center justify-center font-bold transition-all duration-500 ${
                        val === 1
                          ? "bg-green-600 text-white" // Land
                          : val === 2
                          ? "bg-blue-900 text-blue-300 scale-90" // Sunk Land
                          : "bg-slate-800 text-slate-600" // Water
                      } ${
                        current.hl && current.hl[0] === r && current.hl[1] === c
                          ? "ring-4 ring-yellow-400 z-10"
                          : ""
                      }`}
                    >
                      {val === 2 ? "0" : val}
                    </div>
                  ))
                )}
              </div>

              <div className="absolute top-4 right-4 bg-slate-800 px-3 py-1 rounded border border-slate-600">
                <span className="text-xs text-slate-400">Islands:</span>
                <span className="ml-2 text-xl font-bold text-white">
                  {current.count}
                </span>
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
                className="p-2 rounded-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold text-green-400 mb-2">The Logic</h3>
              <p className="text-sm text-slate-300 mb-2">
                Iterate through every cell. If you see a{" "}
                <code className="text-white">1</code>:
              </p>
              <ol className="list-decimal list-inside text-sm text-slate-400 space-y-1">
                <li>Increment Count.</li>
                <li>
                  Run DFS/BFS to turn that <code className="text-white">1</code>{" "}
                  and all connected <code className="text-white">1</code>s into{" "}
                  <code className="text-blue-400">0</code>.
                </li>
              </ol>
            </div>

            <CodeBlock
              code={`def numIslands(grid):
    count = 0
    def dfs(r, c):
        if (r<0 or c<0 or r>=R or c>=C or 
            grid[r][c] == "0"): return
        grid[r][c] = "0" # Sink
        dfs(r+1, c); dfs(r-1, c)
        dfs(r, c+1); dfs(r, c-1)
        
    for r in range(R):
        for c in range(C):
            if grid[r][c] == "1":
                dfs(r, c)
                count += 1
    return count`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 3: Rotting Oranges
const RottingOrangesPage = () => {
  const [step, setStep] = useState(0);

  // Grid:
  // 2 1 1
  // 1 1 0
  // 0 1 1
  // Steps:
  // 0: T=0. Q=[(0,0)].
  // 1: T=1. Infect (0,1), (1,0). Q=[(0,1), (1,0)].
  // 2: T=2. Infect (0,2), (1,1). Q=[(0,2), (1,1)].
  // 3: T=3. Infect (2,1). Q=[(2,1)].
  // 4: T=4. Infect (2,2). Q=[(2,2)].

  const steps = [
    {
      grid: [
        [2, 1, 1],
        [1, 1, 0],
        [0, 1, 1],
      ],
      t: 0,
      msg: "T=0. Start with all Rotten oranges in Queue.",
    },
    {
      grid: [
        [2, 2, 1],
        [2, 1, 0],
        [0, 1, 1],
      ],
      t: 1,
      msg: "T=1. Neighbors of (0,0) rot.",
    },
    {
      grid: [
        [2, 2, 2],
        [2, 2, 0],
        [0, 1, 1],
      ],
      t: 2,
      msg: "T=2. Neighbors of T=1 rot.",
    },
    {
      grid: [
        [2, 2, 2],
        [2, 2, 0],
        [0, 2, 1],
      ],
      t: 3,
      msg: "T=3. Neighbors of T=2 rot.",
    },
    {
      grid: [
        [2, 2, 2],
        [2, 2, 0],
        [0, 2, 2],
      ],
      t: 4,
      msg: "T=4. All fresh oranges are now rotten.",
    },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern B: Rotting Oranges
        </h2>
        <p className="text-slate-400 mb-6">
          Multi-Source BFS. The "Shockwave" effect.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-black/40 p-6 rounded-xl border border-slate-800 h-64 flex flex-col items-center justify-center relative">
              <div className="grid grid-cols-3 gap-2">
                {current.grid.map((row, r) =>
                  row.map((val, c) => (
                    <div
                      key={`${r}-${c}`}
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
                        val === 1
                          ? "bg-orange-500 text-white" // Fresh
                          : val === 2
                          ? "bg-green-600 text-white animate-pulse" // Rotten
                          : "bg-slate-800 opacity-20" // Empty
                      }`}
                    >
                      {val === 0 ? "" : val === 2 ? "R" : "F"}
                    </div>
                  ))
                )}
              </div>

              <div className="absolute top-4 right-4 bg-slate-800 px-3 py-1 rounded border border-slate-600 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-xl font-bold text-white">
                  {current.t}m
                </span>
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
                className="p-2 rounded-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-orange-500">
              <h3 className="font-semibold text-orange-400 mb-2">
                Multi-Source BFS
              </h3>
              <p className="text-sm text-slate-300 mb-2">
                Instead of starting from one node, we start with{" "}
                <strong>ALL</strong> rotten oranges in the Queue.
              </p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>Level 0: All initially rotten.</li>
                <li>Level 1: All fresh neighbors of Level 0.</li>
                <li>Level 2: All fresh neighbors of Level 1.</li>
              </ul>
            </div>

            <CodeBlock
              code={`def orangesRotting(grid):
    q = deque()
    fresh = 0
    for r in range(R):
        for c in range(C):
            if grid[r][c] == 2: q.append((r,c))
            if grid[r][c] == 1: fresh += 1
            
    time = 0
    while q and fresh > 0:
        for _ in range(len(q)):
            r, c = q.popleft()
            for dr, dc in dirs:
                # if fresh neighbor:
                # make rotten, add to q, fresh--
        time += 1
    return time if fresh == 0 else -1`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 4: Clone Graph
const CloneGraphPage = () => {
  const [step, setStep] = useState(0);

  // Graph: 1 -- 2
  // 0: Visit 1. Create Clone(1). Map {1: C1}.
  // 1: Visit 2. Create Clone(2). Map {1: C1, 2: C2}.
  // 2: Visit 1 (from 2). Found in Map. Link C2 -> C1.
  // 3: Back to 1. Link C1 -> C2. Done.

  const steps = [
    {
      active: 1,
      clones: [1],
      links: [],
      msg: "Visit 1. Create Clone(1). Add to Map.",
    },
    {
      active: 2,
      clones: [1, 2],
      links: [],
      msg: "Visit 2 (Neighbor of 1). Create Clone(2). Add to Map.",
    },
    {
      active: 1,
      clones: [1, 2],
      links: ["2-1"],
      msg: "Visit 1 (Neighbor of 2). Found in Map! Link C2 -> C1.",
    },
    {
      active: null,
      clones: [1, 2],
      links: ["2-1", "1-2"],
      msg: "Back to 1. Link C1 -> C2. Graph Cloned.",
    },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pattern C: Clone Graph
        </h2>
        <p className="text-slate-400 mb-6">
          Deep Copy using a HashMap to handle cycles.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center h-64 relative">
            <div className="flex gap-12 w-full justify-center">
              {/* Original */}
              <div className="relative w-24 h-32 border-r border-slate-700 pr-6">
                <span className="absolute -top-4 left-0 text-xs text-slate-500">
                  Original
                </span>
                <div
                  className={`absolute top-4 left-4 w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${
                    current.active === 1
                      ? "bg-blue-600 border-blue-400 text-white"
                      : "bg-slate-800 border-slate-600 text-slate-400"
                  }`}
                >
                  1
                </div>
                <div
                  className={`absolute bottom-4 right-4 w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${
                    current.active === 2
                      ? "bg-blue-600 border-blue-400 text-white"
                      : "bg-slate-800 border-slate-600 text-slate-400"
                  }`}
                >
                  2
                </div>
                <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-slate-600 -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
              </div>

              {/* Clone */}
              <div className="relative w-24 h-32 pl-6">
                <span className="absolute -top-4 left-6 text-xs text-green-500">
                  Clone Zone
                </span>
                {current.clones.includes(1) && (
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full border-2 border-green-500 bg-green-900/50 text-green-200 flex items-center justify-center font-bold animate-in zoom-in">
                    1
                  </div>
                )}
                {current.clones.includes(2) && (
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full border-2 border-green-500 bg-green-900/50 text-green-200 flex items-center justify-center font-bold animate-in zoom-in">
                    2
                  </div>
                )}
                {current.links.length > 0 && (
                  <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-green-500 -translate-x-1/2 -translate-y-1/2 rotate-45 animate-in fade-in"></div>
                )}
              </div>
            </div>

            <div className="absolute bottom-2 bg-slate-800/80 px-3 py-1 rounded text-xs text-yellow-300">
              {current.msg}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-400 mb-2">
                HashMap Memoization
              </h3>
              <p className="text-sm text-slate-300 mb-2">
                Map:{" "}
                <code className="text-white">
                  Original Node &rarr; Clone Node
                </code>
              </p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>If node in Map: Return existing clone (Cycle closed).</li>
                <li>If not: Create clone, add to Map, recurse.</li>
              </ul>
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
                className="p-2 rounded-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50"
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

export default GraphGuide;
