import React from "react";
import {
  Zap,
  Search,
  Map as MapIcon,
  Code,
  Layers,
  MessageSquare,
  AlertCircle,
  Terminal,
  ChevronRight,
  //   TrendingUp,
  //   Copy,
  //   Lightbulb,
} from "lucide-react";

// --- CHALLENGE COMPONENT (Problem Statement) ---
export const NumberOfIslandsChallenge = () => (
  <div className="prose prose-slate dark:prose-invert max-w-none p-6">
    <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
      200. Number of Islands
    </h1>
    <div className="flex gap-2 mb-6">
      <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2.5 py-0.5 rounded text-xs font-bold border border-yellow-200 dark:border-yellow-800">
        Medium
      </span>
      <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded text-xs font-bold border border-slate-200 dark:border-slate-700">
        Graph
      </span>
      <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2.5 py-0.5 rounded text-xs font-bold border border-orange-200 dark:border-orange-800 flex items-center gap-1">
        <Zap size={10} /> Amazon Premium
      </span>
    </div>

    <p className="text-slate-700 dark:text-slate-300">
      Given an <code>m x n</code> 2D binary grid <code>grid</code> which
      represents a map of <code>'1'</code>s (land) and <code>'0'</code>s
      (water), return <em>the number of islands</em>.
    </p>
    <p className="text-slate-700 dark:text-slate-300 mt-4">
      An island is surrounded by water and is formed by connecting adjacent
      lands horizontally or vertically. You may assume all four edges of the
      grid are all surrounded by water.
    </p>

    <div className="mt-8">
      <h3 className="font-bold text-slate-900 dark:text-white mb-3">
        Example 1:
      </h3>
      <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <div className="text-slate-500 dark:text-slate-400 mb-2">
          Input: grid = [
        </div>
        <div className="pl-4 text-slate-800 dark:text-slate-200">
          ["1","1","1","1","0"],
          <br />
          ["1","1","0","1","0"],
          <br />
          ["1","1","0","0","0"],
          <br />
          ["0","0","0","0","0"]
        </div>
        <div className="text-slate-500 dark:text-slate-400 mt-2">]</div>
        <div className="mt-2 text-slate-800 dark:text-slate-200">
          <span className="text-purple-600 dark:text-purple-400 font-bold">
            Output:
          </span>{" "}
          1
        </div>
      </div>
    </div>

    <div className="mt-6">
      <h3 className="font-bold text-slate-900 dark:text-white mb-3">
        Example 2:
      </h3>
      <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <div className="text-slate-500 dark:text-slate-400 mb-2">
          Input: grid = [
        </div>
        <div className="pl-4 text-slate-800 dark:text-slate-200">
          ["1","1","0","0","0"],
          <br />
          ["1","1","0","0","0"],
          <br />
          ["0","0","1","0","0"],
          <br />
          ["0","0","0","1","1"]
        </div>
        <div className="text-slate-500 dark:text-slate-400 mt-2">]</div>
        <div className="mt-2 text-slate-800 dark:text-slate-200">
          <span className="text-purple-600 dark:text-purple-400 font-bold">
            Output:
          </span>{" "}
          3
        </div>
      </div>
    </div>

    <div className="mt-8">
      <h3 className="font-bold text-slate-900 dark:text-white mb-3">
        Constraints:
      </h3>
      <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 font-mono text-sm">
        <li>
          <code>m == grid.length</code>
        </li>
        <li>
          <code>n == grid[i].length</code>
        </li>
        <li>
          <code>1 &lt;= m, n &lt;= 300</code>
        </li>
        <li>
          <code>grid[i][j]</code> is <code>'0'</code> or <code>'1'</code>.
        </li>
      </ul>
    </div>
  </div>
);

// --- EXPLANATION COMPONENT (The Playbook) ---
export const NumberOfIslandsExplanation = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      {/* --- HEADER SECTON --- */}
      <header className="mb-10 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold text-sm uppercase tracking-widest mb-2">
          <Zap size={16} fill="currentColor" />
          Amazon SDE Interview Series
        </div>
        <h1 className="text-4xl font-black mb-4 tracking-tight">
          200. Number of Islands
        </h1>
        <div className="flex flex-wrap gap-3">
          <Badge color="bg-yellow-500" text="Medium" />
          <Badge color="bg-blue-500" text="Graphs / DFS" />
          <Badge color="bg-emerald-500" text="Frequency: Top 5" />
        </div>
      </header>

      {/* --- PHASE 1: CLARIFYING QUESTIONS --- */}
      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
          <MessageSquare className="text-indigo-500" />
          Phase 1: Clarifying Questions (The "Senior" Move)
        </h2>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <p className="text-slate-600 dark:text-slate-400 mb-4 italic">
            At Amazon, "Ownership" means clarifying constraints before coding.
            Ask these:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <QuestionItem
              q="Are diagonal connections allowed?"
              a="No. Usually 4-directional (Up, Down, Left, Right)."
            />
            <QuestionItem
              q="Can I modify the input grid?"
              a="Crucial. If yes, space is O(1) extra. If no, O(M*N) for a visited set."
            />
            <QuestionItem
              q="How large is the grid?"
              a="Up to 300x300. This fits in memory, but suggest scalability for 'Big Data'."
            />
            <QuestionItem
              q="Is the grid always binary?"
              a="Yes, '1' for land and '0' for water."
            />
          </ul>
        </div>
      </section>

      {/* --- PHASE 2: VISUAL MENTAL MODEL --- */}
      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
          <MapIcon className="text-emerald-500" />
          Phase 2: The "Find & Sink" Mental Model
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4 text-slate-600 dark:text-slate-300">
            <p>
              Treat the matrix as a <strong>Graph</strong> where each '1' is a
              node connected to its neighbors. Our goal is to count{" "}
              <strong>Connected Components</strong>.
            </p>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border-l-4 border-emerald-500">
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                <strong>The Logic:</strong> Iterate through the grid. When you
                hit land ('1'):
              </p>
              <ol className="list-decimal pl-5 mt-2 space-y-1 text-sm">
                <li>
                  Increment the global <strong>Island Count</strong>.
                </li>
                <li>
                  Trigger a <strong>DFS/BFS</strong> to "Sink" (turn to '0') all
                  connected land.
                </li>
                <li>This "Sinking" prevents duplicate counting.</li>
              </ol>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-tighter">
              DFS Traversal Visualization
            </h4>
            <div className="grid grid-cols-5 gap-1 max-w-[200px] mx-auto">
              {[
                "S",
                "S",
                "S",
                "0",
                "0",
                "S",
                "S",
                "0",
                "0",
                "1",
                "0",
                "0",
                "0",
                "1",
                "1",
                "0",
                "0",
                "0",
                "0",
                "0",
              ].map((cell, i) => (
                <div
                  key={i}
                  className={`h-8 w-8 flex items-center justify-center text-[10px] font-bold rounded ${
                    cell === "S"
                      ? "bg-orange-500 text-white animate-pulse"
                      : cell === "1"
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                  }`}
                >
                  {cell === "S" ? "🔥" : cell}
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] text-slate-500 mt-4 italic">
              🔥 = Land currently being "sunk" via DFS recursion.
            </p>
          </div>
        </div>
      </section>

      {/* --- PHASE 3: TECHNICAL IMPLEMENTATION --- */}
      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
          <Code className="text-blue-500" />
          Phase 3: Clean & Modular Implementation
        </h2>
        <div className="bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden border border-slate-800">
          <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-slate-800">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs font-mono text-slate-400">
              island_solver.py
            </span>
          </div>
          <pre className="p-6 text-sm font-mono text-indigo-300 overflow-x-auto leading-relaxed">
            {`class IslandSolver:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid: return 0
        
        rows, cols = len(grid), len(grid[0])
        count = 0
        
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == "1":
                    count += 1
                    self._sink_dfs(grid, r, c)
        return count

    def _sink_dfs(self, grid, r, c):
        # 1. Check bounds and water
        if (r < 0 or r >= len(grid) or 
            c < 0 or c >= len(grid[0]) or 
            grid[r][c] == "0"):
            return
            
        # 2. Sink land (inplace modification)
        grid[r][c] = "0"
        
        # 3. Explore 4 directions
        self._sink_dfs(grid, r + 1, c) # Down
        self._sink_dfs(grid, r - 1, c) # Up
        self._sink_dfs(grid, r, c + 1) # Right
        self._sink_dfs(grid, r, c - 1) # Left`}
          </pre>
        </div>
      </section>

      {/* --- PHASE 4: COMPLEXITY ANALYSIS --- */}
      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
          <Layers className="text-purple-500" />
          Phase 4: Complexity Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h3 className="text-blue-600 font-bold mb-2 flex items-center gap-2">
              <Terminal size={18} /> Time Complexity: O(M × N)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Each cell is visited at most twice: once by the main loop and once
              by the DFS. $M$ is rows, $N$ is columns.
            </p>
          </div>
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h3 className="text-purple-600 font-bold mb-2 flex items-center gap-2">
              <AlertCircle size={18} /> Space Complexity: O(M × N)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              In the worst case (all land), the recursion stack can go up to $M
              \times N$ deep.
            </p>
          </div>
        </div>
      </section>

      {/* --- PHASE 5: AMAZON BAR RAISER FOLLOW-UP --- */}
      <footer className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-8 rounded-2xl">
        <h3 className="text-lg font-black text-orange-800 dark:text-orange-400 mb-4 flex items-center gap-2">
          <Search /> The "Bar Raiser" Follow-up
        </h3>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          <strong>Question:</strong> "What if the grid is massive (billions of
          rows) and stored across multiple machines?"
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
            <h4 className="font-bold text-sm mb-1">Union-Find Approach</h4>
            <p className="text-xs text-slate-500">
              Use a <strong>Disjoint Set Union (DSU)</strong>. You can process
              chunks of the grid independently and then "merge" the results at
              the boundaries.
            </p>
          </div>
          <div className="flex-1 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
            <h4 className="font-bold text-sm mb-1">Parallel Processing</h4>
            <p className="text-xs text-slate-500">
              Discussing <strong>MapReduce</strong> or{" "}
              <strong>Apache Spark</strong> logic for connectivity shows you can
              scale from SDE1 to SDE2 level.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* --- HELPER COMPONENTS --- */

interface BadgeProps {
  color: string;
  text: string;
}

const Badge: React.FC<BadgeProps> = ({ color, text }) => (
  <span
    className={`${color} text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm`}
  >
    {text}
  </span>
);

interface QuestionItemProps {
  q: string;
  a: string;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ q, a }) => (
  <li className="flex gap-3 items-start group">
    <div className="mt-1 p-1 bg-indigo-100 dark:bg-indigo-900/40 rounded text-indigo-600">
      <ChevronRight size={14} />
    </div>
    <div>
      <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
        {q}
      </p>
      <p className="text-xs text-slate-500">{a}</p>
    </div>
  </li>
);
