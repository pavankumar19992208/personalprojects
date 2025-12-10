import React, { useState, useEffect } from "react";
import {
  Server,
  //   Database,
  //   Globe,
  //   ArrowRight,
  //   Shield,
  Zap,
  Activity,
  Layers,
  Box,
  Share2,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Play,
  Users,
  Cpu,
  HardDrive,
  Clock,
} from "lucide-react";

// --- Visual Components ---

const ScalabilityVisual = () => {
  const [mode, setMode] = useState<"vertical" | "horizontal">("vertical");

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setMode("vertical")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            mode === "vertical"
              ? "bg-blue-600 text-white shadow-lg scale-105"
              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
          }`}
        >
          Vertical (Scale Up)
        </button>
        <button
          onClick={() => setMode("horizontal")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            mode === "horizontal"
              ? "bg-purple-600 text-white shadow-lg scale-105"
              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
          }`}
        >
          Horizontal (Scale Out)
        </button>
      </div>

      <div className="h-64 flex items-center justify-center bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 relative overflow-hidden">
        {mode === "vertical" ? (
          <div className="flex flex-col items-center animate-in zoom-in duration-500">
            <Server size={120} className="text-blue-500 mb-2" />
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded font-mono">
                128GB RAM
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded font-mono">
                64 Cores
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">The "Ferrari"</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 animate-in fade-in duration-500 p-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Server size={32} className="text-purple-500" />
                <span className="text-[10px] text-slate-400 mt-1">
                  Node {i + 1}
                </span>
              </div>
            ))}
            <div className="absolute bottom-2 right-4 text-xs text-purple-500 font-bold animate-pulse">
              + Auto-Scaling...
            </div>
          </div>
        )}
      </div>
      <p className="text-center text-sm text-slate-500 mt-4 italic">
        {mode === "vertical"
          ? "Single Point of Failure. If this breaks, we are down."
          : "Resilient. If Node 1 fails, Node 2 takes over."}
      </p>
    </div>
  );
};

const LoadBalancerVisual = () => {
  const [activeServer, setActiveServer] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const simulateTraffic = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    let count = 0;
    const interval = setInterval(() => {
      setActiveServer((prev) => (prev === null || prev === 2 ? 0 : prev + 1));
      count++;
      if (count > 5) {
        clearInterval(interval);
        setIsAnimating(false);
        setActiveServer(null);
      }
    }, 600);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
      <div className="flex items-center justify-between h-48 relative">
        {/* User */}
        <div className="flex flex-col items-center z-10">
          <Users size={40} className="text-slate-600 dark:text-slate-400" />
          <span className="text-xs font-bold mt-2">Users</span>
        </div>

        {/* Traffic Animation */}
        {isAnimating && (
          <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-1 bg-slate-300 dark:bg-slate-700 overflow-hidden rounded-full">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-shimmer" />
          </div>
        )}

        {/* LB */}
        <div className="flex flex-col items-center z-10 bg-white dark:bg-slate-800 p-4 rounded-full shadow-lg border-2 border-blue-500">
          <Share2 size={32} className="text-blue-500" />
          <span className="text-[10px] font-bold mt-1">LB</span>
        </div>

        {/* Servers */}
        <div className="flex flex-col gap-4 z-10">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`flex items-center gap-2 p-2 rounded-lg border transition-all duration-300 ${
                activeServer === i
                  ? "bg-green-100 dark:bg-green-900/30 border-green-500 scale-110"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              }`}
            >
              <Server
                size={20}
                className={
                  activeServer === i ? "text-green-600" : "text-slate-400"
                }
              />
              <span className="text-xs font-mono">
                Server {String.fromCharCode(65 + i)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={simulateTraffic}
          disabled={isAnimating}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-sm transition-colors disabled:opacity-50"
        >
          <Play size={16} />
          Simulate Traffic (Round Robin)
        </button>
      </div>
    </div>
  );
};

const CAPTheoremVisual = () => {
  const [selected, setSelected] = useState<string[]>(["P"]);

  const toggle = (key: string) => {
    if (key === "P") return; // P is mandatory in this context

    if (selected.includes(key)) {
      setSelected(selected.filter((k) => k !== key));
    } else {
      // If we are adding a key, and we already have 2, remove the non-P one
      if (selected.length >= 2) {
        // const other = selected.find((k) => k !== "P");
        setSelected(["P", key]);
      } else {
        setSelected([...selected, key]);
      }
    }
  };

  const getMessage = () => {
    if (selected.includes("C") && selected.includes("A"))
      return "Impossible in distributed systems!";
    if (selected.includes("C") && selected.includes("P"))
      return "CP: Consistent but may be unavailable during partitions (e.g., Payments).";
    if (selected.includes("A") && selected.includes("P"))
      return "AP: Always available but data might be stale (e.g., Shopping Cart).";
    return "Pick one more property.";
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
      <div className="flex justify-center mb-8 relative h-48">
        {/* Triangle Lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 border-2 border-slate-300 dark:border-slate-700 rounded-full opacity-20" />
        </div>

        {/* C Node */}
        <button
          onClick={() => toggle("C")}
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-lg transition-all ${
            selected.includes("C")
              ? "bg-green-500 text-white scale-110 ring-4 ring-green-200 dark:ring-green-900"
              : "bg-white dark:bg-slate-800 text-slate-400 hover:bg-slate-50"
          }`}
        >
          C
        </button>

        {/* A Node */}
        <button
          onClick={() => toggle("A")}
          className={`absolute bottom-0 left-10 w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-lg transition-all ${
            selected.includes("A")
              ? "bg-blue-500 text-white scale-110 ring-4 ring-blue-200 dark:ring-blue-900"
              : "bg-white dark:bg-slate-800 text-slate-400 hover:bg-slate-50"
          }`}
        >
          A
        </button>

        {/* P Node */}
        <button
          onClick={() => toggle("P")}
          className={`absolute bottom-0 right-10 w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-lg transition-all cursor-not-allowed ${
            selected.includes("P")
              ? "bg-orange-500 text-white scale-110 ring-4 ring-orange-200 dark:ring-orange-900"
              : "bg-white dark:bg-slate-800 text-slate-400"
          }`}
        >
          P
        </button>
      </div>

      <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <p className="font-bold text-slate-800 dark:text-slate-200">
          {getMessage()}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          (P is mandatory because networks fail. You must choose between C and
          A.)
        </p>
      </div>
    </div>
  );
};

const CachingVisual = () => {
  const [state, setState] = useState<"idle" | "hit" | "miss">("idle");

  const simulate = (type: "hit" | "miss") => {
    setState("idle");
    setTimeout(() => setState(type), 50);
    setTimeout(() => setState("idle"), 2000);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
      <div className="space-y-4">
        {/* Cache Lane */}
        <div className="relative h-16 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center px-4 overflow-hidden">
          <div className="w-24 flex flex-col items-center z-10">
            <Cpu size={24} className="text-orange-500" />
            <span className="text-[10px] font-bold">Cache (RAM)</span>
          </div>

          {state === "hit" && (
            <div className="absolute left-24 right-0 h-1 bg-green-500 animate-ping" />
          )}

          {state === "hit" && (
            <div className="absolute right-4 text-green-600 font-bold text-sm animate-bounce">
              FAST! (5ms)
            </div>
          )}
        </div>

        {/* DB Lane */}
        <div className="relative h-16 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center px-4 overflow-hidden">
          <div className="w-24 flex flex-col items-center z-10 opacity-50">
            <HardDrive size={24} className="text-slate-500" />
            <span className="text-[10px] font-bold">DB (Disk)</span>
          </div>

          {state === "miss" && (
            <div className="absolute left-24 right-0 h-1 bg-red-500 animate-pulse duration-1000" />
          )}

          {state === "miss" && (
            <div className="absolute right-4 text-red-600 font-bold text-sm animate-pulse">
              SLOW... (100ms)
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => simulate("hit")}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-bold"
        >
          Simulate Cache Hit
        </button>
        <button
          onClick={() => simulate("miss")}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-bold"
        >
          Simulate Cache Miss
        </button>
      </div>
    </div>
  );
};

const SystemDashboardVisual = () => (
  <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 my-6 text-white font-mono text-xs">
    <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
      <span className="text-green-400">SYSTEM STATUS: HEALTHY</span>
      <span className="text-slate-500">REGION: US-EAST-1</span>
    </div>

    <div className="grid grid-cols-3 gap-4 text-center">
      <div className="p-3 bg-slate-800 rounded border border-slate-700">
        <div className="text-slate-400 mb-1">Load Balancer</div>
        <div className="text-blue-400 font-bold text-lg">ALB-01</div>
        <div className="text-[10px] text-green-500">Active</div>
      </div>

      <div className="p-3 bg-slate-800 rounded border border-slate-700">
        <div className="text-slate-400 mb-1">Cache Hit Rate</div>
        <div className="text-orange-400 font-bold text-lg">98.5%</div>
        <div className="text-[10px] text-slate-500">Redis Cluster</div>
      </div>

      <div className="p-3 bg-slate-800 rounded border border-slate-700">
        <div className="text-slate-400 mb-1">DB Latency</div>
        <div className="text-red-400 font-bold text-lg">45ms</div>
        <div className="text-[10px] text-slate-500">Primary (Write)</div>
      </div>
    </div>

    <div className="mt-4 p-3 bg-slate-800 rounded border border-slate-700 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Activity size={16} className="text-green-500" />
        <span>Auto-Scaling Group</span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-2 h-6 bg-green-500/50 rounded-sm" />
        ))}
        <div className="w-2 h-6 bg-slate-700 rounded-sm" />
      </div>
    </div>
  </div>
);

// --- Main Component ---

interface DesignFundamentalsGuideProps {
  initialPage: number;
  onPageChange?: (page: number) => void;
  onComplete: () => void;
}

export const DesignFundamentalsGuide: React.FC<
  DesignFundamentalsGuideProps
> = ({ initialPage, onPageChange, onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(initialPage);
  const [completedSlides, setCompletedSlides] = useState<boolean[]>(
    new Array(5).fill(false)
  );

  useEffect(() => {
    setCurrentSlide(initialPage);
  }, [initialPage]);

  useEffect(() => {
    setCompletedSlides((prev) => {
      const newCompleted = [...prev];
      newCompleted[currentSlide] = true;
      return newCompleted;
    });
  }, [currentSlide]);

  const handleNext = () => {
    if (currentSlide < 4) {
      const next = currentSlide + 1;
      setCurrentSlide(next);
      onPageChange?.(next);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      const prev = currentSlide - 1;
      setCurrentSlide(prev);
      onPageChange?.(prev);
    }
  };

  const pages = [
    {
      title: "Scalability: The 'Prime Day' Problem",
      icon: Layers,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
              <AlertTriangle size={18} /> The Scenario
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-200">
              It's Prime Day. Traffic jumps from 1 million to 100 million users
              in 10 minutes. If your system isn't scalable, Amazon loses
              millions.
            </p>
          </div>

          <ScalabilityVisual />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                Vertical Scaling (Scale Up)
              </h4>
              <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2 list-disc pl-4">
                <li>
                  <strong>Concept:</strong> Buying a bigger machine (more
                  RAM/CPU).
                </li>
                <li>
                  <strong>Metaphor:</strong> Buying a Ferrari for deliveries.
                </li>
                <li>
                  <strong>Con:</strong> Has a limit (Finite RAM). Single point
                  of failure.
                </li>
              </ul>
            </div>
            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                Horizontal Scaling (Scale Out)
              </h4>
              <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2 list-disc pl-4">
                <li>
                  <strong>Concept:</strong> Adding more cheap machines.
                </li>
                <li>
                  <strong>Metaphor:</strong> Hiring 100 cyclists.
                </li>
                <li>
                  <strong>Pro:</strong> Infinite scaling. Resilient to failure.
                </li>
              </ul>
            </div>
          </div>

          <div className="text-xs text-slate-500 italic border-l-2 border-slate-300 pl-3">
            "At Amazon, we almost always prefer Horizontal Scaling because it
            allows us to add capacity dynamically."
          </div>
        </div>
      ),
    },
    {
      title: "Load Balancers: The Traffic Cop",
      icon: Share2,
      content: (
        <div className="space-y-6">
          <p className="text-slate-600 dark:text-slate-300">
            If you have 100 servers (Horizontal Scaling), how does a user know
            which one to talk to? The <strong>Load Balancer (LB)</strong> sits
            between the User and the Servers to distribute requests.
          </p>

          <LoadBalancerVisual />

          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white">
              Routing Algorithms
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-xs uppercase text-slate-500 mb-1">
                  Simple
                </div>
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  Round Robin
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  "You go to A, you go to B..."
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-xs uppercase text-slate-500 mb-1">
                  Smart
                </div>
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  Least Connections
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  "Send to the least busy server."
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-xs uppercase text-slate-500 mb-1">
                  Sticky
                </div>
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  IP Hash
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  "User 123 always goes to A."
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "CAP Theorem: The Impossible Trinity",
      icon: AlertTriangle,
      content: (
        <div className="space-y-6">
          <p className="text-slate-600 dark:text-slate-300">
            In a Distributed System, you can only pick <strong>two</strong> of
            these three guarantees. Since networks always fail,{" "}
            <strong>Partition Tolerance (P) is mandatory</strong>.
          </p>

          <CAPTheoremVisual />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/10">
              <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-1">
                AP (Availability + Partition)
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                "System is always up, but data might be stale."
              </p>
              <div className="text-xs font-mono bg-white dark:bg-black/20 p-2 rounded">
                Example: Amazon Cart. Better to let you add items (and sync
                later) than show an error.
              </div>
            </div>

            <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/10">
              <h4 className="font-bold text-green-700 dark:text-green-300 mb-1">
                CP (Consistency + Partition)
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                "Data is always correct, but system might reject requests."
              </p>
              <div className="text-xs font-mono bg-white dark:bg-black/20 p-2 rounded">
                Example: Amazon Payments. We cannot allow a double-spend. Show
                error if network fails.
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Caching: Speed vs Stale Data",
      icon: Zap,
      content: (
        <div className="space-y-6">
          <p className="text-slate-600 dark:text-slate-300">
            Reading from Disk (DB) is slow. Reading from Memory (RAM) is fast. A{" "}
            <strong>Cache</strong> (Redis/Memcached) sits in front of the DB to
            speed up reads.
          </p>

          <CachingVisual />

          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white">
              Writing Strategies
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <div className="mt-1 bg-green-100 text-green-600 p-1 rounded">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="font-bold text-sm">Write-Through</div>
                  <p className="text-xs text-slate-500">
                    Write to Cache AND DB at the same time. Safe but slower.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <div className="mt-1 bg-orange-100 text-orange-600 p-1 rounded">
                  <Clock size={16} />
                </div>
                <div>
                  <div className="font-bold text-sm">
                    Write-Back (Write-Behind)
                  </div>
                  <p className="text-xs text-slate-500">
                    Write to Cache immediately, DB later. Fast but risky (data
                    loss).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Interview Cheat Sheet",
      icon: Box,
      content: (
        <div className="space-y-6">
          <SystemDashboardVisual />

          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">
              The "Golden Answer" Pattern
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              If asked "Design a system for X...", always start with these
              questions:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                  1
                </span>
                <span>
                  Is it <strong>Read-heavy</strong> or{" "}
                  <strong>Write-heavy</strong>? (Caching strategy)
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <span>
                  Do we prioritize <strong>Consistency</strong> or{" "}
                  <strong>Availability</strong>? (CAP Theorem)
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <span>How much data are we storing? (Sharding/Scaling)</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase">
                <tr>
                  <th className="p-2">Concept</th>
                  <th className="p-2">Buzzword</th>
                  <th className="p-2">Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr>
                  <td className="p-2 font-bold">Horizontal Scaling</td>
                  <td className="p-2 text-slate-500">"Scalability"</td>
                  <td className="p-2">Prime Day Traffic</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">Load Balancer</td>
                  <td className="p-2 text-slate-500">"Traffic Distribution"</td>
                  <td className="p-2">Routing Users</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">CAP Theorem</td>
                  <td className="p-2 text-slate-500">"Trade-offs"</td>
                  <td className="p-2">Payments (CP) vs Cart (AP)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
  ];

  const progress =
    (completedSlides.filter(Boolean).length / pages.length) * 100;

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
            {React.createElement(pages[currentSlide].icon, { size: 24 })}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {pages[currentSlide].title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Page {currentSlide + 1} of {pages.length}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {pages[currentSlide].content}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            currentSlide === 0
              ? "text-slate-300 dark:text-slate-700 cursor-not-allowed"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <ChevronLeft size={20} />
          Previous
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-blue-500/25"
        >
          {currentSlide === pages.length - 1 ? (
            <>
              Complete Module <CheckCircle2 size={20} />
            </>
          ) : (
            <>
              Next Concept <ChevronRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
