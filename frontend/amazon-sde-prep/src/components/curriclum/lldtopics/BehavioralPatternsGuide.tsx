import React, { useState } from "react";
import {
  Map,
  Car,
  Footprints,
  Bike,
  Bell,
  Radio,
  Smartphone,
  Bot,
  FileText,
  Gamepad2,
  Egg,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Zap,
  ArrowRight,
  Cloud,
} from "lucide-react";

// --- Visual Components ---

const NetworkVisual = () => {
  const [mode, setMode] = useState<"messy" | "clean">("messy");

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6 flex flex-col items-center">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setMode("messy")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            mode === "messy"
              ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 shadow-sm"
              : "bg-white dark:bg-slate-800 text-slate-500"
          }`}
        >
          Tangled (Coupled)
        </button>
        <button
          onClick={() => setMode("clean")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            mode === "clean"
              ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 shadow-sm"
              : "bg-white dark:bg-slate-800 text-slate-500"
          }`}
        >
          Hub (Decoupled)
        </button>
      </div>

      <div className="h-64 w-full relative bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden">
        {/* Nodes */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * 72 * Math.PI) / 180;
          const r = 80;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          return (
            <div
              key={i}
              className="absolute w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg z-10 transition-all duration-500"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              {String.fromCharCode(65 + i)}
            </div>
          );
        })}

        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <g
            style={{
              transform: "translate(50%, 50%)",
            }}
          >
            {mode === "messy" ? (
              // Messy Connections (All to All)
              [0, 1, 2, 3, 4].map((i) =>
                [0, 1, 2, 3, 4].map((j) => {
                  if (i >= j) return null;
                  const angle1 = (i * 72 * Math.PI) / 180;
                  const angle2 = (j * 72 * Math.PI) / 180;
                  const x1 = Math.cos(angle1) * 80;
                  const y1 = Math.sin(angle1) * 80;
                  const x2 = Math.cos(angle2) * 80;
                  const y2 = Math.sin(angle2) * 80;
                  return (
                    <line
                      key={`${i}-${j}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(239, 68, 68, 0.4)"
                      strokeWidth="2"
                      className="animate-pulse"
                    />
                  );
                })
              )
            ) : (
              // Clean Connections (Hub)
              <>
                <circle r="15" fill="#10b981" className="animate-pulse" />
                {[0, 1, 2, 3, 4].map((i) => {
                  const angle = (i * 72 * Math.PI) / 180;
                  const x = Math.cos(angle) * 80;
                  const y = Math.sin(angle) * 80;
                  return (
                    <line
                      key={`hub-${i}`}
                      x1={0}
                      y1={0}
                      x2={x}
                      y2={y}
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeDasharray="4"
                      className="animate-[dash_1s_linear_infinite]"
                    />
                  );
                })}
              </>
            )}
          </g>
        </svg>
      </div>
    </div>
  );
};

const StrategyVisual = () => {
  const [strategy, setStrategy] = useState<"car" | "walk" | "bike">("car");

  const getStrategyDetails = () => {
    switch (strategy) {
      case "car":
        return {
          icon: <Car size={24} />,
          color: "bg-blue-500",
          text: "Fastest Route",
          time: "15 min",
        };
      case "walk":
        return {
          icon: <Footprints size={24} />,
          color: "bg-green-500",
          text: "Shortest Path",
          time: "45 min",
        };
      case "bike":
        return {
          icon: <Bike size={24} />,
          color: "bg-orange-500",
          text: "Eco-Friendly",
          time: "25 min",
        };
    }
  };

  const details = getStrategyDetails();

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Context (Navigator) */}
        <div className="w-64 h-40 bg-white dark:bg-slate-950 rounded-xl border-2 border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center relative overflow-hidden shadow-lg">
          <div className="absolute top-2 left-2 text-xs font-bold text-slate-400">
            Navigator Context
          </div>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold">
              A
            </div>
            <ArrowRight className="text-slate-400" />
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold">
              B
            </div>
          </div>

          {/* Swappable Strategy Card */}
          <div
            key={strategy}
            className={`w-48 h-16 ${details.color} rounded-lg flex items-center justify-between px-4 text-white shadow-md animate-in slide-in-from-right duration-300`}
          >
            <div className="flex items-center gap-2">
              {details.icon}
              <div className="flex flex-col">
                <span className="text-xs font-bold opacity-80">Strategy</span>
                <span className="text-sm font-bold">{details.text}</span>
              </div>
            </div>
            <span className="text-xs font-mono bg-black/20 px-1.5 py-0.5 rounded">
              {details.time}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-1">
            Select Strategy:
          </h4>
          <button
            onClick={() => setStrategy("car")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              strategy === "car"
                ? "bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            }`}
          >
            <Car size={16} /> Car Strategy
          </button>
          <button
            onClick={() => setStrategy("walk")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              strategy === "walk"
                ? "bg-green-50 border-green-500 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            }`}
          >
            <Footprints size={16} /> Walk Strategy
          </button>
          <button
            onClick={() => setStrategy("bike")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              strategy === "bike"
                ? "bg-orange-50 border-orange-500 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            }`}
          >
            <Bike size={16} /> Bike Strategy
          </button>
        </div>
      </div>
    </div>
  );
};

const ObserverVisual = () => {
  const [broadcasting, setBroadcasting] = useState(false);

  const handleBroadcast = () => {
    setBroadcasting(true);
    setTimeout(() => setBroadcasting(false), 2000);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6 flex flex-col items-center">
      <div className="h-64 w-full relative bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden">
        {/* Signal Tower (Subject) */}
        <div className="absolute z-20 flex flex-col items-center">
          <div className="w-16 h-16 bg-slate-800 text-white rounded-lg flex items-center justify-center shadow-xl border-2 border-slate-600">
            <Radio
              size={32}
              className={broadcasting ? "animate-pulse text-red-400" : ""}
            />
          </div>
          <span className="text-xs font-bold mt-2 bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded">
            Subject
          </span>
        </div>

        {/* Broadcast Waves */}
        {broadcasting && (
          <>
            <div className="absolute w-20 h-20 border-4 border-red-500/50 rounded-full animate-[ping_1.5s_linear_infinite]" />
            <div className="absolute w-40 h-40 border-4 border-red-500/30 rounded-full animate-[ping_1.5s_linear_infinite_0.5s]" />
          </>
        )}

        {/* Observers */}
        {[
          {
            icon: <Smartphone size={20} />,
            label: "App",
            pos: "top-10 left-10",
          },
          { icon: <Bot size={20} />, label: "Bot", pos: "top-10 right-10" },
          {
            icon: <FileText size={20} />,
            label: "Log",
            pos: "bottom-10 left-1/2 -translate-x-1/2",
          },
        ].map((obs, i) => (
          <div
            key={i}
            className={`absolute ${obs.pos} flex flex-col items-center transition-all duration-300`}
          >
            {broadcasting && (
              <div className="absolute -top-8 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded shadow animate-bounce">
                Notified!
              </div>
            )}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg ${
                broadcasting
                  ? "bg-green-100 border-green-500 text-green-600 scale-110"
                  : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-500"
              }`}
            >
              {obs.icon}
            </div>
            <span className="text-[10px] font-bold mt-1 text-slate-500">
              {obs.label}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={handleBroadcast}
        disabled={broadcasting}
        className="mt-6 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold shadow-lg shadow-red-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
      >
        <Bell size={20} />
        {broadcasting ? "Broadcasting..." : "Broadcast Event"}
      </button>
    </div>
  );
};

const ComparisonVisual = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      {/* Strategy Side */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800 flex flex-col items-center">
        <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
          <Map size={20} /> Strategy Pattern
        </h4>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-white">
            <Gamepad2 size={24} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="px-3 py-1 bg-white dark:bg-slate-800 border border-blue-300 rounded text-xs font-bold text-blue-600 shadow-sm">
              Sword
            </div>
            <div className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-300 rounded text-xs text-slate-400">
              Bow
            </div>
          </div>
        </div>
        <p className="text-xs text-center text-slate-600 dark:text-slate-400">
          <strong>Client Chooses:</strong> "I want to use the Sword strategy."
          <br />
          (Swapping Algorithms)
        </p>
      </div>

      {/* State Side */}
      <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800 flex flex-col items-center">
        <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-4 flex items-center gap-2">
          <Zap size={20} /> State Pattern
        </h4>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex flex-col items-center">
            <Egg size={20} className="text-purple-400 mb-1" />
            <span className="text-[10px]">Egg</span>
          </div>
          <ArrowRight size={16} className="text-purple-300" />
          <div className="flex flex-col items-center">
            <div className="w-5 h-5 bg-purple-500 rounded-full mb-1" />
            <span className="text-[10px]">Larva</span>
          </div>
          <ArrowRight size={16} className="text-purple-300" />
          <div className="flex flex-col items-center">
            <Zap size={20} className="text-purple-600 mb-1" />
            <span className="text-[10px]">Butterfly</span>
          </div>
        </div>
        <p className="text-xs text-center text-slate-600 dark:text-slate-400">
          <strong>Object Evolves:</strong> "I am growing up."
          <br />
          (Lifecycle Transitions)
        </p>
      </div>
    </div>
  );
};

const ScaleUpVisual = () => {
  const [scaled, setScaled] = useState(false);

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6 flex flex-col items-center">
      <div className="h-48 w-full flex items-center justify-center relative">
        <div
          className={`transition-all duration-1000 flex flex-col items-center justify-center ${
            scaled ? "scale-150" : "scale-100"
          }`}
        >
          {scaled ? (
            <div className="w-24 h-24 bg-orange-500 rounded-lg flex items-center justify-center shadow-2xl animate-in zoom-in duration-500">
              <Cloud size={48} className="text-white" />
              <span className="absolute -bottom-6 text-sm font-bold text-orange-500">
                AWS SNS
              </span>
            </div>
          ) : (
            <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center shadow-lg">
              <Radio size={32} className="text-white" />
              <span className="absolute -bottom-6 text-xs font-bold text-slate-500">
                Observer
              </span>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => setScaled(!scaled)}
        className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold transition-all"
      >
        {scaled ? "Scale Down (LLD)" : "Scale Up (System Design)"}
      </button>
    </div>
  );
};

// --- Main Component ---

interface BehavioralPatternsGuideProps {
  initialPage?: number;
  onPageChange?: (page: number) => void;
  onComplete?: () => void;
}

export const BehavioralPatternsGuide: React.FC<
  BehavioralPatternsGuideProps
> = ({ initialPage = 0, onPageChange, onComplete }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = 5;

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      onPageChange?.(nextPage);
    } else {
      onComplete?.();
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      onPageChange?.(prevPage);
    }
  };

  const slides = [
    // Page 1: Concept
    <div
      key="concept"
      className="animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
        Objects Talking to Each Other
      </h3>

      <div className="prose dark:prose-invert max-w-none mb-6">
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Creational patterns build objects. Structural patterns connect them.{" "}
          <strong>Behavioral patterns</strong> handle <em>communication</em> and{" "}
          <em>algorithms</em>.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>The Rule:</strong> "Decouple the sender from the receiver."
          </li>
          <li>
            <strong>Why?</strong> We don't want Class A to micromanage Class B.
            We want them to collaborate flexibly.
          </li>
        </ul>
      </div>

      <NetworkVisual />

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
          The Amazon Context
        </h4>
        <p className="text-sm text-blue-700 dark:text-blue-200 italic">
          "At Amazon, the 'Checkout' service doesn't hardcode how to charge you
          (Strategy Pattern). It asks a <code>PaymentStrategy</code> to handle
          it. When your package ships, the 'Shipping Service' doesn't email you
          directly. It publishes an event (Observer Pattern) that the 'Email
          Service', 'SMS Service', and 'App Push' all listen to."
        </p>
      </div>
    </div>,

    // Page 2: Strategy
    <div
      key="strategy"
      className="animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Map className="text-blue-500" /> Strategy Pattern
      </h3>

      <div className="prose dark:prose-invert max-w-none mb-6">
        <p>
          <strong>The Metaphor:</strong> Google Maps Navigation.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          The <em>Destination</em> (Goal) is the same. The <em>Algorithm</em>{" "}
          (Route) changes. You can switch strategies mid-trip without changing
          your destination.
        </p>
      </div>

      <StrategyVisual />

      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 mb-6">
        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">
          Amazon Scenario: Dynamic Pricing
        </h4>
        <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
          <div className="bg-white dark:bg-slate-800 p-2 rounded border">
            Regular: $10/hr
          </div>
          <div className="bg-white dark:bg-slate-800 p-2 rounded border">
            VIP: 1st hr Free
          </div>
          <div className="bg-white dark:bg-slate-800 p-2 rounded border">
            Truck: Flat $50
          </div>
        </div>
        <div className="font-mono text-xs bg-white dark:bg-black p-3 rounded border border-slate-200 dark:border-slate-800">
          class Ticket:
          <br />
          &nbsp;&nbsp;def __init__(self, strategy):
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;self.strategy = strategy
          <br />
          <br />
          # Runtime Swapping
          <br />
          my_ticket = Ticket(VipPrice())
          <br />
          print(my_ticket.get_price(5)) # Uses VIP logic
        </div>
      </div>
    </div>,

    // Page 3: Observer
    <div
      key="observer"
      className="animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Bell className="text-red-500" /> Observer Pattern
      </h3>

      <div className="prose dark:prose-invert max-w-none mb-6">
        <p>
          <strong>The Metaphor:</strong> YouTube Subscription (The Bell Icon).
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          When the YouTuber (Subject) uploads <em>one</em> video, the system
          automatically notifies everyone who subscribed (Observers).
        </p>
      </div>

      <ObserverVisual />

      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 mb-6">
        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">
          Amazon Scenario: Stock Price Monitor
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
          When AMZN hits $200, multiple systems need to react differently.
        </p>
        <div className="font-mono text-xs bg-white dark:bg-black p-3 rounded border border-slate-200 dark:border-slate-800">
          amzn = StockSubject()
          <br />
          amzn.attach(MobileApp())
          <br />
          amzn.attach(TradingBot())
          <br />
          <br />
          amzn.set_price(200) # Notifies ALL observers
        </div>
      </div>
    </div>,

    // Page 4: Comparison
    <div
      key="comparison"
      className="animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
        Strategy vs. State
      </h3>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
        <p className="text-sm text-yellow-700 dark:text-yellow-200">
          <strong>Nuance:</strong> Both involve swapping classes. The difference
          is <em>Intent</em>.
        </p>
      </div>

      <ComparisonVisual />

      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">
          Amazon Interview Tip
        </h4>
        <p className="text-sm text-green-700 dark:text-green-200 italic">
          "Design an Order Processing System": Use{" "}
          <strong>State Pattern</strong> for lifecycle (New &rarr; Shipped
          &rarr; Delivered). Use <strong>Strategy Pattern</strong> for shipping
          cost (FedEx vs UPS).
        </p>
      </div>
    </div>,

    // Page 5: Cheat Sheet
    <div
      key="cheatsheet"
      className="animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
        Interview Cheat Sheet
      </h3>

      <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 mb-6">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold">
            <tr>
              <th className="p-3">Pattern</th>
              <th className="p-3">The "Trigger"</th>
              <th className="p-3">Amazon Example</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
            <tr>
              <td className="p-3 font-bold text-blue-600">Strategy</td>
              <td className="p-3">
                "Support multiple algorithms and switch easily."
              </td>
              <td className="p-3">
                <code>PaymentProcessor</code>
              </td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-red-600">Observer</td>
              <td className="p-3">"When X happens, Y and Z need to know."</td>
              <td className="p-3">
                <code>NotificationService</code>
              </td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-purple-600">Command</td>
              <td className="p-3">"Queue requests (Undo/Redo)."</td>
              <td className="p-3">
                <code>JobQueue</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ScaleUpVisual />

      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">
          Implementation Note
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          In modern distributed systems, the <strong>Observer Pattern</strong>{" "}
          scales up to become <strong>Pub/Sub</strong> (using Kafka or SNS/SQS).
          Mentioning this shows System Design awareness.
        </p>
      </div>
    </div>,
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 mb-6 rounded-full overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-500 ease-out"
          style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {slides[currentPage]}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            currentPage === 0
              ? "text-slate-300 dark:text-slate-700 cursor-not-allowed"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <ChevronLeft size={20} />
          Previous
        </button>

        <span className="text-sm text-slate-400 font-mono">
          {currentPage + 1} / {totalPages}
        </span>

        <button
          onClick={handleNext}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-white transition-all ${
            currentPage === totalPages - 1
              ? "bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/20"
              : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
          }`}
        >
          {currentPage === totalPages - 1 ? (
            <>
              Complete <CheckCircle2 size={20} />
            </>
          ) : (
            <>
              Next <ChevronRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
