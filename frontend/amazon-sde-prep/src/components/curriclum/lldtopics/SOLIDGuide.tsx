import React, { useState, useEffect } from "react";
import {
  Box,
  Layers,
  Shield,
  Zap,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Hammer,
  Wrench,
  Briefcase,
  Plug,
  Power,
  User,
  Mail,
  Database,
  CreditCard,
  Code,
  LayoutGrid,
  Puzzle,
} from "lucide-react";

// --- Visual Components ---

const BuildingBlocksVisual = () => {
  const [state, setState] = useState<"stable" | "bad" | "good">("stable");

  const animate = (type: "bad" | "good") => {
    setState(type);
    setTimeout(() => setState("stable"), 3000);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => animate("bad")}
          disabled={state !== "stable"}
          className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm font-bold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors disabled:opacity-50"
        >
          Bad Change (Tangled)
        </button>
        <button
          onClick={() => animate("good")}
          disabled={state !== "stable"}
          className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-sm font-bold hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors disabled:opacity-50"
        >
          Good Change (SOLID)
        </button>
      </div>

      <div className="h-48 flex items-end justify-center relative">
        {/* Base */}
        <div className="flex flex-col items-center gap-1">
          {/* Top Block */}
          <div
            className={`w-16 h-16 bg-blue-500 rounded-lg shadow-lg transition-all duration-500 z-20 flex items-center justify-center text-white font-bold ${
              state === "bad" ? "translate-y-20 rotate-12" : ""
            } ${state === "good" ? "bg-purple-500 scale-110" : ""}`}
          >
            {state === "good" ? "New" : "App"}
          </div>

          {/* Middle Block */}
          <div
            className={`w-24 h-16 bg-slate-400 rounded-lg shadow-lg transition-all duration-500 z-10 ${
              state === "bad" ? "rotate-6 translate-x-4" : ""
            }`}
          />

          {/* Bottom Block */}
          <div
            className={`w-32 h-16 bg-slate-600 rounded-lg shadow-lg transition-all duration-500 ${
              state === "bad" ? "-rotate-3 translate-x-2" : ""
            }`}
          />
        </div>

        {state === "bad" && (
          <div className="absolute top-0 text-red-500 font-bold animate-bounce">
            CRASH!
          </div>
        )}
        {state === "good" && (
          <div className="absolute top-0 text-green-500 font-bold animate-bounce">
            Smooth Swap!
          </div>
        )}
      </div>
      <p className="text-center text-sm text-slate-500 mt-4 italic">
        {state === "bad"
          ? "Changing one piece broke the whole structure."
          : state === "good"
          ? "Decoupled code allows swapping parts safely."
          : "The System Tower"}
      </p>
    </div>
  );
};

const SRPVisual = () => {
  const [mode, setMode] = useState<"god" | "srp">("god");

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setMode("god")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            mode === "god"
              ? "bg-red-600 text-white shadow-lg"
              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400"
          }`}
        >
          God Object (Bad)
        </button>
        <button
          onClick={() => setMode("srp")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            mode === "srp"
              ? "bg-green-600 text-white shadow-lg"
              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400"
          }`}
        >
          SRP (Good)
        </button>
      </div>

      <div className="h-48 flex items-center justify-center relative">
        {mode === "god" ? (
          <div className="relative animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center text-white shadow-xl z-10 relative">
              <User size={40} />
            </div>
            {/* Burden Icons */}
            <div className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 p-2 rounded-full shadow border border-red-200">
              <Database size={16} className="text-slate-500" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 p-2 rounded-full shadow border border-red-200">
              <Mail size={16} className="text-slate-500" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 p-2 rounded-full shadow border border-red-200">
              <Shield size={16} className="text-slate-500" />
            </div>
            <div className="absolute -top-4 -left-4 bg-white dark:bg-slate-800 p-2 rounded-full shadow border border-red-200">
              <CreditCard size={16} className="text-slate-500" />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-red-500 whitespace-nowrap">
              Doing EVERYTHING!
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-8 animate-in fade-in duration-500">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
                <User size={24} />
              </div>
              <span className="text-[10px] font-bold">User Data</span>
            </div>
            <div className="h-1 w-8 bg-slate-300 dark:bg-slate-700" />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <Database size={16} className="text-blue-500 mb-1" />
                <span className="text-[8px]">Repository</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <Mail size={16} className="text-orange-500 mb-1" />
                <span className="text-[8px]">EmailService</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const OCPVisual = () => {
  const [cartridge, setCartridge] = useState<"none" | "card" | "paypal">(
    "none"
  );

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setCartridge("card")}
          className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-bold hover:bg-blue-200 transition-colors"
        >
          Plug Credit Card
        </button>
        <button
          onClick={() => setCartridge("paypal")}
          className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-bold hover:bg-indigo-200 transition-colors"
        >
          Plug PayPal
        </button>
      </div>

      <div className="h-48 flex flex-col items-center justify-center relative">
        {/* Console */}
        <div className="w-48 h-24 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500 font-mono text-xs border-b-4 border-slate-950 relative z-10">
          <div className="absolute top-2 left-4 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          PAYMENT CONSOLE
          {/* Slot */}
          <div className="absolute -top-4 w-32 h-4 bg-black/50 rounded-b-lg" />
        </div>

        {/* Cartridge Animation */}
        <div
          className={`absolute transition-all duration-500 flex items-center justify-center w-28 h-16 rounded-t-lg border-t-4 border-white/20 shadow-xl z-0 ${
            cartridge === "none" ? "-top-10 opacity-0" : "top-12 opacity-100"
          } ${cartridge === "card" ? "bg-blue-600" : "bg-indigo-600"}`}
        >
          <span className="text-white font-bold text-xs uppercase">
            {cartridge === "card" ? "Credit Card" : "PayPal"}
          </span>
        </div>

        <div className="mt-8 text-xs text-slate-500">
          The Console (Core Code) never changes. We just plug in new logic.
        </div>
      </div>
    </div>
  );
};

const LSPVisual = () => {
  const [duckType, setDuckType] = useState<"real" | "rubber">("real");
  const [status, setStatus] = useState<"idle" | "swim" | "sink">("idle");

  const testDuck = (type: "real" | "rubber") => {
    setDuckType(type);
    setStatus("idle");
    setTimeout(() => {
      setStatus(type === "real" ? "swim" : "sink");
    }, 100);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => testDuck("real")}
          className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-sm font-bold"
        >
          Real Duck
        </button>
        <button
          onClick={() => testDuck("rubber")}
          className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg text-sm font-bold"
        >
          Rubber Duck
        </button>
      </div>

      <div className="h-48 bg-blue-200 dark:bg-blue-900/20 rounded-lg border-b-4 border-blue-300 dark:border-blue-800 relative overflow-hidden flex items-center justify-center">
        <div className="absolute bottom-0 w-full h-12 bg-blue-400/30 animate-pulse" />

        <div
          className={`transition-all duration-1000 ${
            status === "swim" ? "translate-x-20" : ""
          } ${status === "sink" ? "translate-y-20 rotate-12" : ""}`}
        >
          {duckType === "real" ? (
            <div className="text-4xl">🦆</div>
          ) : (
            <div className="text-4xl">🐤</div>
          )}
        </div>

        {status === "sink" && (
          <div className="absolute top-4 text-red-600 font-bold bg-white/80 px-3 py-1 rounded animate-bounce">
            ERROR: Cannot Fly/Swim!
          </div>
        )}
      </div>
    </div>
  );
};

const ISPVisual = () => {
  const [menu, setMenu] = useState<"giant" | "specific">("giant");

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setMenu("giant")}
          className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-sm font-bold"
        >
          Giant Interface
        </button>
        <button
          onClick={() => setMenu("specific")}
          className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-bold"
        >
          Segregated Interface
        </button>
      </div>

      <div className="flex justify-center items-start gap-8 h-48">
        {/* Client */}
        <div className="flex flex-col items-center">
          <User size={40} className="text-slate-600 dark:text-slate-400" />
          <span className="text-xs font-bold mt-2">Developer</span>
        </div>

        {/* Interface */}
        <div
          className={`bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 transition-all duration-500 ${
            menu === "giant" ? "w-48" : "w-32"
          }`}
        >
          <div className="text-xs font-mono text-slate-400 mb-2 border-b border-slate-200 dark:border-slate-700 pb-1">
            {menu === "giant" ? "IWorker" : "ICoder"}
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-green-600 text-sm font-bold">
              <Code size={14} /> code()
            </div>
            {menu === "giant" && (
              <>
                <div className="flex items-center gap-2 text-slate-300 dark:text-slate-600 text-sm line-through">
                  <Briefcase size={14} /> manage()
                </div>
                <div className="flex items-center gap-2 text-slate-300 dark:text-slate-600 text-sm line-through">
                  <Hammer size={14} /> repair()
                </div>
                <div className="flex items-center gap-2 text-slate-300 dark:text-slate-600 text-sm line-through">
                  <Wrench size={14} /> fix_ac()
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500 mt-2">
        {menu === "giant"
          ? "Developer is forced to implement methods they don't use."
          : "Developer only sees what they need."}
      </p>
    </div>
  );
};

const DIPVisual = () => {
  const [source, setSource] = useState<"battery" | "grid">("grid");

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setSource("grid")}
          className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-bold"
        >
          Power Grid
        </button>
        <button
          onClick={() => setSource("battery")}
          className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-sm font-bold"
        >
          Battery
        </button>
      </div>

      <div className="h-48 flex items-center justify-center gap-0 relative">
        {/* High Level Module (Lamp) */}
        <div className="flex flex-col items-center z-20">
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center border-4 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.5)]">
            <Zap size={32} className="text-yellow-500 fill-yellow-500" />
          </div>
          <div className="h-8 w-2 bg-slate-400" />
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
            <Plug size={20} className="text-white rotate-90" />
          </div>
        </div>

        {/* Abstraction (Socket) */}
        <div className="w-12 h-16 bg-slate-200 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded flex flex-col items-center justify-center gap-2 z-10 ml-[-4px]">
          <div className="w-1 h-3 bg-black/20 rounded-full" />
          <div className="w-1 h-3 bg-black/20 rounded-full" />
        </div>

        {/* Low Level Module (Source) */}
        <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 border-l-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center ml-4 transition-all duration-500">
          {source === "grid" ? (
            <div className="flex flex-col items-center animate-in fade-in">
              <Zap size={48} className="text-blue-500" />
              <span className="text-xs font-bold mt-2">Power Grid</span>
            </div>
          ) : (
            <div className="flex flex-col items-center animate-in fade-in">
              <Power size={48} className="text-green-500" />
              <span className="text-xs font-bold mt-2">Battery</span>
            </div>
          )}
        </div>
      </div>
      <p className="text-center text-xs text-slate-500 mt-2">
        The Lamp (High Level) depends on the Socket (Abstraction), not the Power
        Source (Low Level).
      </p>
    </div>
  );
};

// --- Main Component ---

interface SOLIDGuideProps {
  initialPage: number;
  onPageChange?: (page: number) => void;
  onComplete: () => void;
}

export const SOLIDGuide: React.FC<SOLIDGuideProps> = ({
  initialPage,
  onPageChange,
  onComplete,
}) => {
  const [currentSlide, setCurrentSlide] = useState(initialPage);
  const [completedSlides, setCompletedSlides] = useState<boolean[]>(
    new Array(6).fill(false)
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
    if (currentSlide < 5) {
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
      title: "The Concept: Why SOLID?",
      icon: Layers,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
              <AlertTriangle size={18} /> The Problem: Spaghetti Code
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-200">
              You change one line in the <code>User</code> class, and suddenly
              the <code>Invoice</code> class breaks. Everything is tangled.
            </p>
          </div>

          <BuildingBlocksVisual />

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">
              The Amazon Context
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 italic border-l-4 border-orange-500 pl-4">
              "At Amazon, we build services that last for years. If your code
              isn't SOLID, adding a new feature (like 'Pay with Venmo') six
              months from now will require rewriting the entire Payment Service.
              We can't afford that risk."
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "S - Single Responsibility Principle (SRP)",
      icon: User,
      content: (
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-lg mb-2">The Rule</h3>
            <p className="text-slate-600 dark:text-slate-300">
              "A class should have one, and only one, reason to change."
            </p>
          </div>

          <SRPVisual />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/30">
              <h4 className="font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle size={16} /> Bad Code
              </h4>
              <pre className="text-[10px] bg-white dark:bg-black/30 p-2 rounded overflow-x-auto">
                {`class User:
  def register(self):
    # Job 1: Save DB
    # Job 2: Send Email`}
              </pre>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/30">
              <h4 className="font-bold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                <CheckCircle2 size={16} /> Good Code
              </h4>
              <pre className="text-[10px] bg-white dark:bg-black/30 p-2 rounded overflow-x-auto">
                {`class UserRepository:
  def save(self): ...

class EmailService:
  def send(self): ...`}
              </pre>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "O - Open/Closed Principle (OCP)",
      icon: Box,
      content: (
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-lg mb-2">The Rule</h3>
            <p className="text-slate-600 dark:text-slate-300">
              "Software entities should be open for extension, but closed for
              modification."
            </p>
          </div>

          <OCPVisual />

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">
              The Amazon Scenario
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              <strong>Problem:</strong> Adding PayPal support to a Payment
              Processor.
            </p>
            <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
              <li>
                <span className="text-red-500 font-bold">Bad:</span> Modifying
                the <code>if/else</code> block in the main class. Risks breaking
                Credit Card logic.
              </li>
              <li>
                <span className="text-green-500 font-bold">Good:</span> Creating
                a new <code>PayPal</code> class that implements the{" "}
                <code>Payment</code> interface.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "L - Liskov Substitution Principle (LSP)",
      icon: Puzzle,
      content: (
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-lg mb-2">The Rule</h3>
            <p className="text-slate-600 dark:text-slate-300">
              "Subtypes must be substitutable for their base types."
            </p>
          </div>

          <LSPVisual />

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">
              The Rubber Duck Test
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              If it looks like a duck and quacks like a duck, but needs
              batteries... you have the wrong abstraction. Don't make a{" "}
              <code>Penguin</code> inherit from <code>Bird</code> if{" "}
              <code>Bird</code> has a <code>fly()</code> method.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "I - Interface Segregation Principle (ISP)",
      icon: LayoutGrid,
      content: (
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-lg mb-2">The Rule</h3>
            <p className="text-slate-600 dark:text-slate-300">
              "Clients should not be forced to depend on methods they do not
              use."
            </p>
          </div>

          <ISPVisual />

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">
              The Universal Remote Trap
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Don't create a "God Interface" like <code>Worker</code> with{" "}
              <code>code()</code> and <code>manage()</code>. Split it into{" "}
              <code>ICoder</code> and <code>IManager</code> so developers aren't
              forced to implement empty management methods.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "D - Dependency Inversion Principle (DIP)",
      icon: Plug,
      content: (
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-lg mb-2">The Rule</h3>
            <p className="text-slate-600 dark:text-slate-300">
              "High-level modules should not depend on low-level modules. Both
              should depend on abstractions."
            </p>
          </div>

          <DIPVisual />

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">
              The Wall Socket Metaphor
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Your lamp (High Level) doesn't care if the electricity comes from
              a Nuclear Plant or Solar Farm (Low Level). It just cares about the
              standard Socket (Abstraction).
            </p>
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
