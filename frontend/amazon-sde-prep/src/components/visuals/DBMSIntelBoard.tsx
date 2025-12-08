// import React from "react";
import {
  Database,
  Table,
  RefreshCw,
  Search,
  Server,
  Split,
  Scale,
  ShieldCheck,
} from "lucide-react";

const DBMS_TOPICS = [
  {
    title: "SQL vs NoSQL",
    difficulty: "Critical",
    desc: "The #1 Question. Scaling (Vertical vs Horizontal), Schema flexibility.",
    why: "Amazon uses both (RDS vs DynamoDB). You must know when to use which.",
    icon: <Database className="text-blue-400" />,
  },
  {
    title: "ACID Properties",
    difficulty: "Critical",
    desc: "Atomicity (Rollback), Consistency, Isolation (Levels), Durability (WAL).",
    why: "Essential for financial transactions (Amazon Pay).",
    icon: <ShieldCheck className="text-green-400" />,
  },
  {
    title: "Indexing (B-Trees)",
    difficulty: "High",
    desc: "B-Trees vs Hash Indexes. Read vs Write trade-offs.",
    why: "Why is my query slow? Understanding lookup costs.",
    icon: <Search className="text-yellow-400" />,
  },
  {
    title: "DynamoDB Internals",
    difficulty: "High",
    desc: "Amazon Specific. Partition Key vs Sort Key. Eventual Consistency.",
    why: "It's Amazon's flagship DB. You will use it.",
    icon: <Server className="text-orange-400" />,
  },
  {
    title: "Sharding & Partitioning",
    difficulty: "Medium",
    desc: "Consistent Hashing. How to partition data across servers.",
    why: "Handling massive scale (Prime Day traffic).",
    icon: <Split className="text-purple-400" />,
  },
  {
    title: "CAP Theorem",
    difficulty: "High",
    desc: "Consistency vs Availability. Why Partition Tolerance is non-negotiable.",
    why: "System Design trade-offs.",
    icon: <Scale className="text-red-400" />,
  },
  {
    title: "Transactions & Isolation",
    difficulty: "Medium",
    desc: "Dirty Reads vs Phantom Reads. Commit & Rollback.",
    why: "Data integrity in concurrent systems.",
    icon: <RefreshCw className="text-cyan-400" />,
  },
  {
    title: "Normalization",
    difficulty: "Medium",
    desc: "1NF, 2NF, 3NF vs Denormalization (Duplicating data for reads).",
    why: "Designing efficient schemas.",
    icon: <Table className="text-slate-400" />,
  },
];

export const DBMSIntelBoard = () => {
  return (
    <div className="w-full p-6 bg-slate-950 font-sans text-slate-200">
      {/* Header Section */}
      <div className="mb-10 border-l-4 border-blue-500 pl-6">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Data Systems <span className="text-blue-500">Intel</span>
        </h1>
        <p className="mt-2 text-slate-400 max-w-xl text-sm leading-relaxed">
          Amazon is a data company. You must know how data is stored, indexed,
          and retrieved at scale.
          <span className="block mt-1 text-blue-400 font-medium">
            Priority: Scaling & Consistency.
          </span>
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DBMS_TOPICS.map((topic, idx) => (
          <div
            key={idx}
            className="group relative bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10"
          >
            {/* Header: Icon + Difficulty Badge */}
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-800/50 rounded-lg group-hover:bg-slate-800 transition-colors">
                {topic.icon}
              </div>
              <span
                className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
                ${
                  topic.difficulty === "Critical"
                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                    : topic.difficulty === "High"
                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                    : "bg-slate-700/30 text-slate-400 border border-slate-700"
                }`}
              >
                {topic.difficulty}
              </span>
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {topic.title}
            </h3>
            <p className="text-sm text-slate-400 mb-4 h-10 line-clamp-2">
              {topic.desc}
            </p>

            {/* Footer: "Why Amazon Asks" */}
            <div className="pt-4 border-t border-slate-800/50">
              <p className="text-xs font-mono text-slate-500">
                <span className="text-blue-500 font-bold mr-1">WHY:</span>
                {topic.why}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Interlinking Section */}
      <div className="mt-12 bg-gradient-to-r from-slate-900 to-slate-900/50 border border-slate-800 rounded-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Database size={120} />
        </div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          Interlinking Strategy
        </h2>
        <div className="space-y-4 text-sm text-slate-300">
          <div className="flex items-center gap-4">
            <span className="font-mono text-blue-400">01</span>
            <p>
              <strong>DB + OS:</strong> "Durability" (ACID) is achieved by
              forcing the OS to flush the Write-Ahead Log (WAL) to disk.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-green-400">02</span>
            <p>
              <strong>DB + Network:</strong> Sharding requires a routing layer
              (Consistent Hashing) to know which server holds the data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
