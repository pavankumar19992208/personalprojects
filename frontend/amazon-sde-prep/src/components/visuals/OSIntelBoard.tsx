import {
  Cpu,
  Layers,
  Lock,
  MemoryStick,
  MessageSquare,
  Terminal,
  Clock,
  AlertTriangle,
} from "lucide-react";

const OS_TOPICS = [
  {
    title: "Process vs Thread",
    difficulty: "Critical",
    desc: "Shared memory (Heap) vs Isolated memory (Stack). Context Switching cost.",
    why: "Fundamental to writing scalable, concurrent code.",
    icon: <Layers className="text-blue-500 dark:text-blue-400" />,
  },
  {
    title: "Concurrency & Locks",
    difficulty: "Critical",
    desc: "Race Conditions. Mutex vs Semaphore. Critical Sections.",
    why: "Essential for multi-threaded Amazon services.",
    icon: <Lock className="text-red-500 dark:text-red-400" />,
  },
  {
    title: "Deadlocks",
    difficulty: "High",
    desc: "The 4 Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.",
    why: "Debugging frozen services in production.",
    icon: <AlertTriangle className="text-orange-500 dark:text-orange-400" />,
  },
  {
    title: "Memory Management",
    difficulty: "High",
    desc: "Stack vs Heap memory. Virtual Memory. Paging & Segmentation.",
    why: "Understanding memory leaks and OOM errors.",
    icon: <MemoryStick className="text-green-500 dark:text-green-400" />,
  },
  {
    title: "Inter-Process Comm (IPC)",
    difficulty: "Medium",
    desc: "Pipes, Sockets, Shared Memory, Message Queues.",
    why: "How microservices or processes talk locally.",
    icon: <MessageSquare className="text-purple-500 dark:text-purple-400" />,
  },
  {
    title: "Scheduling Algorithms",
    difficulty: "Low",
    desc: "Round Robin, FCFS, Priority Scheduling. Starvation.",
    why: "Theory behind how the OS manages CPU time.",
    icon: <Clock className="text-yellow-500 dark:text-yellow-400" />,
  },
  {
    title: "Linux Basics",
    difficulty: "Medium",
    desc: "Commands: grep, ps, top, chmod. File permissions.",
    why: "Practical skills for debugging on EC2 instances.",
    icon: <Terminal className="text-slate-500 dark:text-slate-400" />,
  },
];

export const OSIntelBoard = () => {
  return (
    <div className="w-full p-6 bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-200 pb-24 sm:pb-6">
      {/* Header Section */}
      <div className="mb-10 border-l-4 border-purple-500 pl-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Operating System{" "}
          <span className="text-purple-600 dark:text-purple-500">Intel</span>
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-xl text-sm leading-relaxed">
          The "Engine Room" of software. Amazon expects you to know what happens
          under the hood when your code runs.
          <span className="block mt-1 text-purple-600 dark:text-purple-400 font-medium">
            Priority: Concurrency & Memory.
          </span>
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {OS_TOPICS.map((topic, idx) => (
          <div
            key={idx}
            className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/10 dark:hover:shadow-purple-900/10 shadow-sm dark:shadow-none"
          >
            {/* Header: Icon + Difficulty Badge */}
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg group-hover:bg-slate-200 dark:group-hover:bg-slate-800 transition-colors">
                {topic.icon}
              </div>
              <span
                className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
                ${
                  topic.difficulty === "Critical"
                    ? "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20"
                    : topic.difficulty === "High"
                    ? "bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20"
                    : "bg-slate-100 dark:bg-slate-700/30 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                }`}
              >
                {topic.difficulty}
              </span>
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {topic.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 h-10 line-clamp-2">
              {topic.desc}
            </p>

            {/* Footer: "Why Amazon Asks" */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/50">
              <p className="text-xs font-mono text-slate-500">
                <span className="text-purple-600 dark:text-purple-500 font-bold mr-1">
                  WHY:
                </span>
                {topic.why}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Interlinking Section */}
      <div className="mt-12 bg-gradient-to-r from-slate-100 to-white dark:from-slate-900 dark:to-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Cpu size={120} className="text-slate-900 dark:text-white" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          Interlinking Strategy
        </h2>
        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-4">
            <span className="font-mono text-purple-600 dark:text-purple-400">
              01
            </span>
            <p>
              <strong>OS + CN:</strong> Context switching overhead can kill
              network throughput in high-concurrency servers.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-blue-600 dark:text-blue-400">
              02
            </span>
            <p>
              <strong>OS + DB:</strong> Database "ACID" properties rely heavily
              on OS file system sync/flush primitives (fsync).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
