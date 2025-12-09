import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Users,
  BrainCircuit,
  Code2,
  Layers,
  ShieldAlert,
  Phone,
  MonitorPlay,
  UserCheck,
} from "lucide-react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  title,
  children,
  icon,
  className = "",
}) => (
  <section
    className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm ${className}`}
  >
    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
      {icon && <span className="text-orange-500">{icon}</span>}
      {title}
    </h2>
    {children}
  </section>
);

export const AmazonPrepGuide: React.FC<{ onBack: () => void }> = ({
  onBack,
}) => {
  const [activeStage, setActiveStage] = useState<
    "oa" | "phone" | "loop" | "bar"
  >("oa");

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-start gap-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors mt-1"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Amazon SDE-1 Hiring Protocol{" "}
            <span className="text-orange-500">2025</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Declassified Audit of the Evaluation Architecture & Gap Analysis
          </p>
        </div>
      </div>

      {/* 1. The Evaluation Architecture (Interactive Timeline) */}
      <Section title="The Evaluation Architecture" icon={<Layers />}>
        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden md:flex justify-between items-start relative z-10">
            <StageCard
              step="01"
              title="Online Assessment"
              desc="Coding + Work Sim + Workstyle"
              color="blue"
              isActive={activeStage === "oa"}
              onClick={() => setActiveStage("oa")}
            />
            <div className="pt-8 text-slate-300 dark:text-slate-700">
              -----------------&gt;
            </div>
            <StageCard
              step="02"
              title="Phone Screen"
              desc="1 Hour DSA (Optional)"
              color="cyan"
              isActive={activeStage === "phone"}
              onClick={() => setActiveStage("phone")}
            />
            <div className="pt-8 text-slate-300 dark:text-slate-700">
              -----------------&gt;
            </div>
            <StageCard
              step="03"
              title="The Loop"
              desc="3-4 Rounds (DSA + LLD + LP)"
              color="orange"
              isActive={activeStage === "loop"}
              onClick={() => setActiveStage("loop")}
            />
            <div className="pt-8 text-slate-300 dark:text-slate-700">
              -----------------&gt;
            </div>
            <StageCard
              step="04"
              title="Bar Raiser"
              desc="Veto Power + LP Deep Dive"
              color="red"
              isActive={activeStage === "bar"}
              onClick={() => setActiveStage("bar")}
            />
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-4">
            <StageCard
              step="01"
              title="Online Assessment"
              desc="Coding + Work Sim + Workstyle"
              color="blue"
              isActive={activeStage === "oa"}
              onClick={() => setActiveStage("oa")}
            />
            <StageCard
              step="02"
              title="Phone Screen"
              desc="1 Hour DSA (Optional)"
              color="cyan"
              isActive={activeStage === "phone"}
              onClick={() => setActiveStage("phone")}
            />
            <StageCard
              step="03"
              title="The Loop"
              desc="3-4 Rounds (DSA + LLD + LP)"
              color="orange"
              isActive={activeStage === "loop"}
              onClick={() => setActiveStage("loop")}
            />
            <StageCard
              step="04"
              title="Bar Raiser"
              desc="Veto Power + LP Deep Dive"
              color="red"
              isActive={activeStage === "bar"}
              onClick={() => setActiveStage("bar")}
            />
          </div>
        </div>
      </Section>

      {/* Dynamic Content Area based on Active Stage */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeStage === "oa" && <OADetails />}
        {activeStage === "phone" && <PhoneScreenDetails />}
        {activeStage === "loop" && <LoopDetails />}
        {activeStage === "bar" && <BarRaiserDetails />}
      </div>

      {/* 3. The Hidden Curriculum (Gap Analysis) */}
      <Section
        title="The Hidden Curriculum: Why Patterns Aren't Enough"
        icon={<ShieldAlert />}
      >
        <div className="space-y-6">
          <div className="flex gap-4 items-start p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg">
            <AlertTriangle className="text-red-500 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                Gap 1: Low-Level Design (LLD)
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                SDE-1s are now asked to design classes (OOD).
                <br />
                <span className="font-mono text-xs bg-slate-200 dark:bg-slate-800 px-1 rounded">
                  Design a Parking Lot
                </span>
                ,{" "}
                <span className="font-mono text-xs bg-slate-200 dark:bg-slate-800 px-1 rounded">
                  Design a Bookstore
                </span>
                .
              </p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-2 font-medium">
                Risk: Writing a giant main() function instead of proper
                Classes/Interfaces = Fail.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-lg">
            <BrainCircuit className="text-orange-500 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                Gap 2: "Hard" Graph Theory
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Basic BFS/DFS is not enough. You need named algorithms.
              </p>
              <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  Topological Sort (Alien Dictionary)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  Dijkstra's Algorithm (Shortest Path)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  Multi-Source BFS (Rotten Oranges)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  Union-Find (Graph Connectivity)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. The 50% Rule (Leadership Principles) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Section title="The 50% Rule" icon={<Users />}>
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-48 h-48 rounded-full border-8 border-slate-100 dark:border-slate-800 relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 border-8 border-orange-500 rounded-full border-l-transparent border-b-transparent rotate-45" />
              <div className="text-center">
                <span className="block text-3xl font-bold text-slate-900 dark:text-white">
                  50%
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-widest">
                  Technical
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              At Amazon, Leadership Principles (LPs) are not a "soft skill"
              bonus. They are weighted equally with coding.
            </p>
          </div>
        </Section>

        <Section title="Top 5 SDE-1 LPs" icon={<CheckCircle2 />}>
          <div className="space-y-4">
            <LPItem
              title="Customer Obsession"
              desc="Start with the customer and work backwards. Never sacrifice customer experience for a shortcut."
            />
            <LPItem
              title="Ownership"
              desc="Act on behalf of the entire company. Never say 'that's not my job'."
            />
            <LPItem
              title="Bias for Action"
              desc="Speed matters. Calculated risk taking is valued."
            />
            <LPItem
              title="Dive Deep"
              desc="Operate at all levels. No task is beneath you. Be skeptical when metrics and anecdotes differ."
            />
            <LPItem
              title="Deliver Results"
              desc="Focus on the key inputs for your business and deliver them with the right quality."
            />
          </div>
        </Section>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS FOR DETAILS ---

const OADetails = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
        <Code2 size={20} />
      </div>
      <h3 className="font-bold text-slate-900 dark:text-white mb-2">
        Part 1: Coding
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        70-90 mins. Two problems.
      </p>
      <ul className="text-xs space-y-2 text-slate-500 dark:text-slate-500">
        <li className="flex gap-2">
          <CheckCircle2 size={14} className="text-green-500" /> Sliding Window /
          Two Pointers
        </li>
        <li className="flex gap-2">
          <CheckCircle2 size={14} className="text-green-500" /> Arrays & Strings
        </li>
        <li className="flex gap-2">
          <CheckCircle2 size={14} className="text-green-500" /> Greedy / Heap
        </li>
      </ul>
    </div>

    <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
        <Cpu size={20} />
      </div>
      <h3 className="font-bold text-slate-900 dark:text-white mb-2">
        Part 2: Work Sim
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        15 mins - 2 hours.
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
        "Day in the life" simulation. You receive emails from managers and
        peers. You must prioritize tasks.
        <br />
        <strong className="text-red-500 block mt-2">
          CRITICAL FAIL POINT:
        </strong>
        Ignoring customer bugs to build features = Automatic Rejection.
      </p>
    </div>

    <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
        <Users size={20} />
      </div>
      <h3 className="font-bold text-slate-900 dark:text-white mb-2">
        Part 3: Workstyle
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        Behavioral Personality Test.
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
        Tests alignment with Leadership Principles. Be consistent. Do not choose
        "neutral" options. Pick a side that aligns with "Ownership" and "Bias
        for Action".
      </p>
    </div>
  </div>
);

const PhoneScreenDetails = () => (
  <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
        <Phone size={24} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          The Phone Screen (Optional)
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Often skipped for university hires who ace the OA. If you get this,
          it's a 45-60 minute video call with an engineer.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
              Format
            </h4>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <li>• 5 mins: Intro</li>
              <li>• 15 mins: LP Questions (Tell me about a time...)</li>
              <li>• 35 mins: 1 Coding Problem (Medium difficulty)</li>
              <li>• 5 mins: Q&A</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
              Focus Areas
            </h4>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <li>• Communication: Explain your thought process aloud.</li>
              <li>• Clean Code: Variable naming matters.</li>
              <li>• Edge Cases: Handle nulls and empty inputs.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LoopDetails = () => (
  <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
        <MonitorPlay size={24} />
      </div>
      <div className="w-full">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          The Loop (On-Site / Virtual)
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          3 to 4 back-to-back interviews (60 mins each). Each interviewer has a
          specific role and assigned Leadership Principles.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
              Round 1: Logic & Maintainability
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Focus on Data Structures. Expect "Medium" to "Hard" problems.
              Emphasis on clean, modular code.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
              Round 2: Problem Solving
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Often involves ambiguity. "Design a system to..." or complex
              algorithmic challenges requiring optimization.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
              Round 3: Object-Oriented Design
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <span className="text-orange-500 font-bold">New for SDE-1:</span>{" "}
              Low-Level Design. Class diagrams for "Parking Lot" or "Linux Find
              Command".
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const BarRaiserDetails = () => (
  <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
        <UserCheck size={24} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          The Bar Raiser
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          An interviewer from a different team with veto power. Their goal is to
          ensure you are better than 50% of current employees.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
              The "Dive Deep" Test
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              They will drill down into your past projects or your code solution
              until you say "I don't know". They test the limits of your
              knowledge.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
              Behavioral Stress Test
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Expect probing questions on "Have Backbone; Disagree and Commit".
              They want to see if you can stand your ground with data.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StageCard = ({
  step,
  title,
  desc,
  color,
  isActive,
  onClick,
}: {
  step: string;
  title: string;
  desc: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  const colorMap: any = {
    blue: "bg-blue-500",
    cyan: "bg-cyan-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
  };

  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center text-center w-full md:w-40 relative group cursor-pointer transition-all duration-300 ${
        isActive ? "scale-105" : "opacity-70 hover:opacity-100"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-full ${
          colorMap[color]
        } text-white flex items-center justify-center font-bold text-lg shadow-lg mb-3 z-10 relative ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ${
          isActive ? `ring-2 ring-${color}-500` : ""
        }`}
      >
        {step}
      </div>
      <h4
        className={`font-bold text-sm transition-colors ${
          isActive
            ? "text-slate-900 dark:text-white"
            : "text-slate-500 dark:text-slate-400"
        }`}
      >
        {title}
      </h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{desc}</p>
      {isActive && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-slate-50 dark:border-b-slate-950" />
      )}
    </div>
  );
};

const LPItem = ({ title, desc }: { title: string; desc: string }) => (
  <div className="border-l-2 border-orange-500 pl-4">
    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
      {title}
    </h4>
    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{desc}</p>
  </div>
);
