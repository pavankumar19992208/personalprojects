import {
  Shield,
  Globe,
  Server,
  Activity,
  AlertTriangle,
  Search,
  Scale,
  Layers,
} from "lucide-react";

const CN_TOPICS = [
  {
    title: "Life of a URL Request",
    difficulty: "Critical",
    desc: "DNS -> TCP Handshake -> SSL -> HTTP Request -> Server.",
    why: "Tests full-stack understanding.",
    icon: <Globe className="text-blue-500 dark:text-blue-400" />,
  },
  {
    title: "TCP vs UDP",
    difficulty: "High",
    desc: "Reliability (ACKs) vs Speed. Connection-oriented vs connectionless.",
    why: "Critical for streaming & payments logic.",
    icon: <Activity className="text-green-500 dark:text-green-400" />,
  },
  {
    title: "HTTP vs HTTPS (SSL)",
    difficulty: "High",
    desc: "SSL/TLS Handshake basics (Symmetric vs Asymmetric encryption).",
    why: "Security is 'Job Zero' at Amazon.",
    icon: <Shield className="text-purple-500 dark:text-purple-400" />,
  },
  {
    title: "Status Codes & Debugging",
    difficulty: "Mandatory",
    desc: "200 (OK), 301 (Redirect), 401 vs 403 (Auth), 500 (Server), 503 (Unavailable).",
    why: "Basic operational competence.",
    icon: <AlertTriangle className="text-red-500 dark:text-red-400" />,
  },
  {
    title: "DNS Resolution",
    difficulty: "Medium",
    desc: "Records (A, CNAME). Caching hierarchies.",
    why: "Understanding latency and caching layers.",
    icon: <Search className="text-yellow-500 dark:text-yellow-400" />,
  },
  {
    title: "Load Balancing",
    difficulty: "Medium",
    desc: "L4 (Transport) vs L7 (Application) balancing basics.",
    why: "Core concept for AWS/Cloud architecture.",
    icon: <Scale className="text-cyan-500 dark:text-cyan-400" />,
  },
  {
    title: "OSI Model",
    difficulty: "Theory",
    desc: "Quick summary of 7 layers (Focus on Transport & Application).",
    why: "Foundational vocabulary for networking.",
    icon: <Layers className="text-slate-500 dark:text-slate-400" />,
  },
];

export const NetworkIntelBoard = () => {
  return (
    <div className="w-full p-6 bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-200 pb-24 sm:pb-6">
      {/* Header Section */}
      <div className="mb-10 border-l-4 border-orange-500 pl-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Network Protocol{" "}
          <span className="text-orange-600 dark:text-orange-500">Intel</span>
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-xl text-sm leading-relaxed">
          The "Hidden Curriculum" for SDE-1. Amazon demands you know how data
          moves, not just how to reverse a linked list.
          <span className="block mt-1 text-orange-600 dark:text-orange-400 font-medium">
            Priority: Debugging & Trade-offs.
          </span>
        </p>
      </div>

      {/* Grid Layout: Responsive (1 col mobile, 2 col desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CN_TOPICS.map((topic, idx) => (
          <div
            key={idx}
            className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-900/10 dark:hover:shadow-orange-900/10 shadow-sm dark:shadow-none"
          >
            {/* Header: Icon + Difficulty Badge */}
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg group-hover:bg-slate-200 dark:group-hover:bg-slate-800 transition-colors">
                {topic.icon}
              </div>
              <span
                className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
                ${
                  topic.difficulty === "Critical" ||
                  topic.difficulty === "Mandatory"
                    ? "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20"
                    : "bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20"
                }`}
              >
                {topic.difficulty}
              </span>
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              {topic.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 h-10 line-clamp-2">
              {topic.desc}
            </p>

            {/* Footer: "Why Amazon Asks" */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/50">
              <p className="text-xs font-mono text-slate-500">
                <span className="text-orange-600 dark:text-orange-500 font-bold mr-1">
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
          <Server size={120} className="text-slate-900 dark:text-white" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          Interlinking Strategy
        </h2>
        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-4">
            <span className="font-mono text-orange-600 dark:text-orange-400">
              01
            </span>
            <p>
              <strong>CN + OS:</strong> High TCP connections consume file
              descriptors (OS resource). Limits concurrency.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-cyan-600 dark:text-cyan-400">
              02
            </span>
            <p>
              <strong>CN + DB:</strong> Database Connection Pooling reuses TCP
              connections to avoid the expensive 3-way handshake.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
