import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Shield,
  EyeOff,
  GitBranch,
  Zap,
  AlertTriangle,
  FileText,
  PenTool,
  Lock,
  Play,
  CheckCircle2,
} from "lucide-react";

// --- Visual Components ---

const PillarsVisual = () => (
  <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
    <div className="flex justify-center items-end gap-4 h-48">
      {[
        {
          name: "Encapsulation",
          icon: Shield,
          color: "bg-blue-500",
          desc: "Protection",
        },
        {
          name: "Abstraction",
          icon: EyeOff,
          color: "bg-purple-500",
          desc: "Simplicity",
        },
        {
          name: "Inheritance",
          icon: GitBranch,
          color: "bg-green-500",
          desc: "Reusability",
        },
        {
          name: "Polymorphism",
          icon: Zap,
          color: "bg-orange-500",
          desc: "Flexibility",
        },
      ].map((pillar, idx) => (
        <div
          key={idx}
          className="group relative flex flex-col items-center h-full justify-end w-1/4"
        >
          <div className="absolute -top-8 w-[120%] h-4 bg-slate-300 dark:bg-slate-700 rounded-t-sm" />
          <div
            className={`w-12 sm:w-16 h-full ${pillar.color} opacity-80 group-hover:opacity-100 transition-all duration-300 rounded-sm flex flex-col items-center justify-center shadow-lg relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 pointer-events-none" />
            <div className="absolute inset-0 flex justify-center gap-1 opacity-20">
              <div className="w-1 h-full bg-black/20" />
              <div className="w-1 h-full bg-black/20" />
            </div>
            <pillar.icon className="text-white w-6 h-6 sm:w-8 sm:h-8 drop-shadow-md transform group-hover:scale-110 transition-transform" />
          </div>
          <div className="w-16 sm:w-20 h-4 bg-slate-400 dark:bg-slate-600 rounded-sm mt-1" />
          <div className="mt-3 text-center">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              {pillar.name}
            </p>
            <p className="text-[9px] text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
              {pillar.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
    <div className="text-center mt-8 text-xs font-mono text-slate-400 uppercase tracking-widest">
      The Foundation of Software
    </div>
  </div>
);

interface SafeVisualProps {
  locked: boolean;
  code: string;
  message: string;
  onKeyPress: (k: string) => void;
  onLock: () => void;
}

const SafeVisual: React.FC<SafeVisualProps> = ({
  locked,
  code,
  message,
  onKeyPress,
  onLock,
}) => {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 my-6 flex flex-col items-center">
      <div
        className={`w-64 h-48 bg-slate-800 rounded-xl border-4 ${
          locked ? "border-red-500" : "border-green-500"
        } shadow-2xl relative flex overflow-hidden transition-colors duration-500`}
      >
        <div
          className={`absolute inset-0 bg-slate-700 flex flex-col items-center justify-center transition-transform duration-700 origin-left ${
            !locked ? "rotate-y-12 translate-x-4 scale-95 opacity-50" : ""
          }`}
        >
          <div className="w-48 h-32 border border-slate-600 rounded bg-slate-800/50 flex items-center justify-center mb-2">
            <div className="font-mono text-green-500 text-xl tracking-widest bg-black px-4 py-1 rounded border border-slate-600 shadow-inner">
              {code.length > 0 ? code.padEnd(4, "*") : message}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <button
                key={n}
                onClick={() => onKeyPress(n.toString())}
                className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded text-white text-xs font-bold shadow-sm active:translate-y-0.5"
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => onKeyPress("C")}
              className="w-8 h-8 bg-red-900 hover:bg-red-800 rounded text-white text-xs font-bold"
            >
              C
            </button>
            <button
              onClick={() => onKeyPress("0")}
              className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded text-white text-xs font-bold"
            >
              0
            </button>
            <button
              onClick={() => onKeyPress("E")}
              className="w-8 h-8 bg-green-900 hover:bg-green-800 rounded text-white text-xs font-bold"
            >
              E
            </button>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-yellow-900/20 -z-10">
          <div className="text-yellow-500 font-bold text-2xl drop-shadow-lg animate-pulse">
            💰 DATA 💰
          </div>
        </div>

        <div
          className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
            locked ? "bg-red-500 animate-pulse" : "bg-green-500"
          }`}
        />
      </div>

      <div className="mt-4 flex gap-4 text-sm">
        <button
          onClick={onLock}
          className="px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
        >
          <Lock size={14} /> Lock
        </button>
        <div className="text-slate-500 flex items-center gap-2">
          <span className="font-mono bg-slate-200 dark:bg-slate-800 px-2 rounded">
            1234
          </span>{" "}
          to unlock
        </div>
      </div>
    </div>
  );
};

interface ShapeShifterVisualProps {
  shapeType: "blob" | "circle" | "square" | "triangle";
  setShapeType: (t: "blob" | "circle" | "square" | "triangle") => void;
}

const ShapeShifterVisual: React.FC<ShapeShifterVisualProps> = ({
  shapeType,
  setShapeType,
}) => (
  <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 my-6 flex flex-col items-center">
    <div className="h-40 flex items-center justify-center">
      <div
        className={`w-24 h-24 transition-all duration-700 ease-in-out shadow-xl flex items-center justify-center text-white font-bold text-xs
          ${
            shapeType === "blob"
              ? "bg-slate-500 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%]"
              : ""
          }
          ${shapeType === "circle" ? "bg-blue-500 rounded-full rotate-180" : ""}
          ${shapeType === "square" ? "bg-green-500 rounded-none rotate-90" : ""}
          ${
            shapeType === "triangle"
              ? "bg-orange-500 [clip-path:polygon(50%_0%,_0%_100%,_100%_100%)]"
              : ""
          }
        `}
      >
        <span className={shapeType === "triangle" ? "mt-8" : ""}>draw()</span>
      </div>
    </div>

    <div className="flex gap-2 mt-4">
      <button
        onClick={() => setShapeType("circle")}
        className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
      >
        Circle
      </button>
      <button
        onClick={() => setShapeType("square")}
        className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
      >
        Square
      </button>
      <button
        onClick={() => setShapeType("triangle")}
        className="px-3 py-1 text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
      >
        Triangle
      </button>
    </div>
    <p className="mt-4 text-xs text-slate-500 text-center max-w-xs">
      The function call <code>draw()</code> is the same, but the implementation
      (shape) changes at runtime.
    </p>
  </div>
);

interface DiamondVisualProps {
  signal: "idle" | "running" | "error";
  setSignal: (s: "idle" | "running" | "error") => void;
}

const DiamondVisual: React.FC<DiamondVisualProps> = ({ signal, setSignal }) => {
  useEffect(() => {
    if (signal === "running") {
      const timer = setTimeout(() => setSignal("error"), 1500);
      return () => clearTimeout(timer);
    }
    if (signal === "error") {
      const timer = setTimeout(() => setSignal("idle"), 2000);
      return () => clearTimeout(timer);
    }
  }, [signal, setSignal]);

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 my-6 flex flex-col items-center">
      <div className="relative w-64 h-64">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-10 bg-slate-200 dark:bg-slate-800 border border-slate-400 rounded flex items-center justify-center text-xs font-bold z-10">
          Vehicle
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-20 h-10 bg-blue-100 dark:bg-blue-900/30 border border-blue-400 rounded flex items-center justify-center text-xs font-bold z-10">
          Car
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-20 h-10 bg-green-100 dark:bg-green-900/30 border border-green-400 rounded flex items-center justify-center text-xs font-bold z-10">
          Boat
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-10 bg-purple-100 dark:bg-purple-900/30 border border-purple-400 rounded flex items-center justify-center text-xs font-bold z-10">
          Amphibious
        </div>
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 128 40 L 40 110"
            stroke="currentColor"
            className="text-slate-300"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 128 40 L 216 110"
            stroke="currentColor"
            className="text-slate-300"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 40 150 L 128 216"
            stroke="currentColor"
            className="text-slate-300"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 216 150 L 128 216"
            stroke="currentColor"
            className="text-slate-300"
            strokeWidth="2"
            fill="none"
          />
          {signal !== "idle" && (
            <>
              <circle r="4" fill="red" className="animate-[ping_1s_infinite]">
                <animateMotion
                  dur="1.5s"
                  repeatCount="1"
                  path="M 128 216 L 40 150 L 128 40"
                />
              </circle>
              <circle r="4" fill="red" className="animate-[ping_1s_infinite]">
                <animateMotion
                  dur="1.5s"
                  repeatCount="1"
                  path="M 128 216 L 216 150 L 128 40"
                />
              </circle>
            </>
          )}
        </svg>
        {signal === "error" && (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-bounce shadow-lg z-20 flex items-center gap-1">
            <AlertTriangle size={12} /> AMBIGUITY
          </div>
        )}
      </div>
      <button
        onClick={() => setSignal("running")}
        disabled={signal !== "idle"}
        className="mt-6 flex items-center gap-2 px-4 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-bold"
      >
        <Play size={16} /> Call drive()
      </button>
    </div>
  );
};

const BlueprintVisual = () => (
  <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl">
        IS-A
      </div>
      <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold mb-3">
        <PenTool size={18} /> Blueprint
      </div>
      <div className="space-y-2 font-mono text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span>engine_type = "V8"</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span>start_engine() &#123;...&#125;</span>
        </div>
        <div className="flex items-center gap-2 opacity-50">
          <div className="w-3 h-3 border border-slate-400 rounded-full" />
          <span>drive() (Abstract)</span>
        </div>
      </div>
      <p className="mt-4 text-blue-600/70 dark:text-blue-400/70 italic">
        "Partial implementation. Shared state."
      </p>
    </div>
    <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 rounded-lg p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-purple-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl">
        CAN-DO
      </div>
      <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-bold mb-3">
        <FileText size={18} /> Contract
      </div>
      <div className="space-y-2 font-mono text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2 opacity-50">
          <div className="w-3 h-3 border border-slate-400 rounded-full" />
          <span>fly()</span>
        </div>
        <div className="flex items-center gap-2 opacity-50">
          <div className="w-3 h-3 border border-slate-400 rounded-full" />
          <span>land()</span>
        </div>
        <div className="flex items-center gap-2 opacity-50">
          <div className="w-3 h-3 border border-slate-400 rounded-full" />
          <span>get_altitude()</span>
        </div>
      </div>
      <p className="mt-4 text-purple-600/70 dark:text-purple-400/70 italic">
        "No implementation. Just rules."
      </p>
    </div>
  </div>
);

interface OOPGuideProps {
  onComplete: () => void;
  initialPage?: number;
  onPageChange?: (page: number) => void;
}

export const OOPGuide: React.FC<OOPGuideProps> = ({
  onComplete,
  initialPage = 0,
  onPageChange,
}) => {
  const totalPages = 5;

  // Safe current page (clamp to last page if bookmark is "5")
  const safeInitialPage =
    initialPage >= totalPages ? totalPages - 1 : initialPage;

  const [currentPage, setCurrentPage] = useState(safeInitialPage);
  const [completedPages, setCompletedPages] = useState<boolean[]>(
    new Array(totalPages).fill(false)
  );

  // Visual States
  const [safeLocked, setSafeLocked] = useState(true);
  const [safeCode, setSafeCode] = useState("");
  const [safeMessage, setSafeMessage] = useState("LOCKED");

  const [shapeType, setShapeType] = useState<
    "blob" | "circle" | "square" | "triangle"
  >("blob");

  const [diamondSignal, setDiamondSignal] = useState<
    "idle" | "running" | "error"
  >("idle");

  // Sync internal state if initialPage changes
  useEffect(() => {
    const safePage = initialPage >= totalPages ? totalPages - 1 : initialPage;
    setCurrentPage(safePage);

    // FIX: If initialPage is 5 (length), mark ALL pages as true.
    // If initialPage is 4, mark 0..3 as true.
    const countToMark = initialPage >= totalPages ? totalPages : initialPage;

    if (countToMark > 0) {
      setCompletedPages((prev) => {
        const newCompleted = [...prev];
        for (let i = 0; i < countToMark; i++) {
          newCompleted[i] = true;
        }
        return newCompleted;
      });
    }
  }, [initialPage, totalPages]);

  const markComplete = (pageIndex: number) => {
    const newCompleted = [...completedPages];
    newCompleted[pageIndex] = true;
    setCompletedPages(newCompleted);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const nextPage = () => {
    markComplete(currentPage);
    if (currentPage < totalPages - 1) {
      handlePageChange(currentPage + 1);
    } else if (currentPage === totalPages - 1) {
      // FIX: Save bookmark as "5" (totalPages) to indicate full completion
      if (onPageChange) onPageChange(totalPages);
      if (onComplete) onComplete();
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleSafeKey = (k: string) => {
    if (safeLocked) {
      if (k === "C") {
        setSafeCode("");
        setSafeMessage("LOCKED");
      } else if (k === "E") {
        if (safeCode === "1234") {
          setSafeLocked(false);
          setSafeMessage("OPEN");
          setSafeCode("");
        } else {
          setSafeMessage("ERROR");
          setSafeCode("");
          setTimeout(() => setSafeMessage("LOCKED"), 1000);
        }
      } else {
        if (safeCode.length < 4) setSafeCode((prev) => prev + k);
      }
    } else {
      if (k === "L") {
        setSafeLocked(true);
        setSafeMessage("LOCKED");
      }
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 0:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              The 4 Pillars of OOP
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                Object-Oriented Programming (OOP) is about modeling software
                like the real world to manage complexity. As apps grow,
                spaghetti code breaks. OOP organizes code into modular "Objects"
                that talk to each other.
              </p>
              <PillarsVisual />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 flex items-center gap-2">
                <div className="w-1 h-6 bg-orange-500 rounded-full" />
                Why Amazon Cares
              </h3>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">
                      Scalability:
                    </strong>{" "}
                    If every team accessed every other team's database directly
                    (No Encapsulation), one change would break the whole site.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">
                      Maintenance:
                    </strong>{" "}
                    OOP allows teams to swap out old systems for new ones
                    without rewriting the whole codebase (Polymorphism).
                  </span>
                </li>
              </ul>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Encapsulation & Abstraction
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                  <Shield size={20} /> Encapsulation (The Capsule)
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Bundling data and methods together and <em>hiding</em> the
                  internal state. "Keep your privates private."
                </p>
                <div className="text-xs font-mono bg-white dark:bg-slate-900 p-3 rounded border border-blue-200 dark:border-blue-800">
                  bankAccount.balance = -100{" "}
                  <span className="text-red-500 font-bold">❌</span>
                  <br />
                  bankAccount.withdraw(100){" "}
                  <span className="text-green-500 font-bold">✅</span>
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-xl border border-purple-100 dark:border-purple-800">
                <h3 className="text-lg font-bold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
                  <EyeOff size={20} /> Abstraction (The Remote)
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Hiding complex implementation details and showing only
                  essential features. You press "On", you don't see the
                  circuits.
                </p>
                <div className="text-xs font-mono bg-white dark:bg-slate-900 p-3 rounded border border-purple-200 dark:border-purple-800">
                  tv.turnOn(){" "}
                  <span className="text-green-500 font-bold">✅</span>
                  <br />
                  tv.circuits.voltage.set(120){" "}
                  <span className="text-red-500 font-bold">❌</span>
                </div>
              </div>
            </div>
            <SafeVisual
              locked={safeLocked}
              code={safeCode}
              message={safeMessage}
              onKeyPress={handleSafeKey}
              onLock={() => {
                setSafeLocked(true);
                setSafeMessage("LOCKED");
              }}
            />
            <div className="mt-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Python Implementation
              </h3>
              <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`class BankAccount:
    def __init__(self):
        self._balance = 0 # _ indicates "protected"

    # Encapsulation: Control access via methods
    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            
    # Abstraction: User doesn't need to know HOW interest is calculated
    def apply_interest(self):
        self._complex_interest_calculation()
        
    def _complex_interest_calculation(self):
        # Hidden complex math
        self._balance *= 1.05`}</pre>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Inheritance & Polymorphism
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
              <p className="text-lg text-slate-600 dark:text-slate-300">
                <strong>Inheritance (Is-A):</strong> Creating new classes based
                on existing ones to reuse code. A <code>Dog</code> is an{" "}
                <code>Animal</code>.
                <br />
                <strong>Polymorphism (Universal Plug):</strong> The ability of
                different objects to respond to the <em>same</em> method call in
                their own way.
              </p>
            </div>
            <ShapeShifterVisual
              shapeType={shapeType}
              setShapeType={setShapeType}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                  Compile-time (Overloading)
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Same method name, different parameters. (Not natively
                  supported in Python).
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                  Runtime (Overriding)
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Subclass provides a specific implementation of a method
                  defined in the Parent.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Python Implementation
              </h3>
              <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`class Animal:
    def speak(self): pass

class Dog(Animal):
    def speak(self): return "Woof"

class Cat(Animal):
    def speak(self): return "Meow"

# Polymorphism in action
def make_it_speak(animal: Animal):
    # The function doesn't care if it's a Dog or Cat
    print(animal.speak())`}</pre>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              The Diamond Problem
            </h2>
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 p-6 rounded-xl mb-8">
              <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle size={20} /> The Inheritance Trap
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                You have an <code>AmphibiousVehicle</code> that inherits from
                both <code>Car</code> and <code>Boat</code>. Both Car and Boat
                inherit from <code>Vehicle</code>. When you call{" "}
                <code>drive()</code>, whose method runs? Car's? Or Boat's?
              </p>
            </div>
            <DiamondVisual
              signal={diamondSignal}
              setSignal={setDiamondSignal}
            />
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  How Languages Handle It
                </h3>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
                  <li>
                    <strong>Java/C#:</strong> Banned. No multiple inheritance of
                    classes.
                  </li>
                  <li>
                    <strong>Python/C++:</strong> Allowed. Uses complex MRO
                    (Method Resolution Order) rules (Left-to-Right,
                    Depth-First).
                  </li>
                </ul>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-xl border-l-4 border-orange-500">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-sm uppercase tracking-wider">
                  Interview Answer
                </h4>
                <p className="italic text-slate-600 dark:text-slate-300 text-sm">
                  "Multiple inheritance introduces the Diamond Problem, creating
                  ambiguity and tight coupling. I prefer using{" "}
                  <strong>Interfaces</strong> (or Mixins) for multiple
                  capabilities because they don't carry state implementation,
                  avoiding this conflict."
                </p>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Abstract Class vs Interface
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              This is the #1 LLD question. Knowing when to use a "Partial
              Blueprint" vs a "Contract".
            </p>
            <BlueprintVisual />
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 mt-8">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold uppercase">
                  <tr>
                    <th className="p-4">Feature</th>
                    <th className="p-4">Abstract Class</th>
                    <th className="p-4">Interface</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  <tr>
                    <td className="p-4 font-medium text-slate-900 dark:text-white">
                      Methods
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      Can have both abstract & concrete
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      Only abstract (mostly)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-900 dark:text-white">
                      Variables
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      Can have state (instance vars)
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      Constant (static final) only
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-900 dark:text-white">
                      Relationship
                    </td>
                    <td className="p-4 text-blue-600 dark:text-blue-400 font-bold">
                      Is-A
                    </td>
                    <td className="p-4 text-purple-600 dark:text-purple-400 font-bold">
                      Can-Do
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-900 dark:text-white">
                      Purpose
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      Code Reuse
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      Decoupling / Contract
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const progress = Math.round(
    (completedPages.filter(Boolean).length / totalPages) * 100
  );

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Progress Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Module Progress
          </span>
          <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
            {progress}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 sm:p-8 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
        {renderContent()}
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-between items-center">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} /> Previous
        </button>

        <div className="flex gap-1">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentPage
                  ? "bg-orange-500"
                  : completedPages[idx]
                  ? "bg-green-500"
                  : "bg-slate-300 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextPage}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
            currentPage === totalPages - 1
              ? "bg-green-600 text-white hover:bg-green-500"
              : "bg-orange-600 text-white hover:bg-orange-500"
          }`}
        >
          {currentPage === totalPages - 1 ? "Finish Module" : "Next"}
          {currentPage === totalPages - 1 ? (
            <CheckCircle2 size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>
      </div>
    </div>
  );
};
