import React, { useState, useEffect } from "react";
import {
  Box,
  Layers,
  //   Shield,
  //   Zap,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Crown,
  Factory,
  Hammer,
  //   Utensils,
  Truck,
  Ship,
  //   Package,
  //   Database,
  //   FileText,
  Settings,
  MousePointer2,
} from "lucide-react";

// --- Visual Components ---

const BlueprintVisual = () => {
  const [mode, setMode] = useState<"messy" | "factory">("messy");

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setMode("messy")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            mode === "messy"
              ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 shadow-sm"
              : "bg-white dark:bg-slate-800 text-slate-500"
          }`}
        >
          Without Patterns (Messy)
        </button>
        <button
          onClick={() => setMode("factory")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            mode === "factory"
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm"
              : "bg-white dark:bg-slate-800 text-slate-500"
          }`}
        >
          With Patterns (Clean)
        </button>
      </div>

      <div className="h-48 relative overflow-hidden bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center">
        {mode === "messy" ? (
          <div className="relative w-full h-full">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 80}%`,
                  top: `${Math.random() * 60}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                <div className="w-12 h-12 bg-red-200 dark:bg-red-900/20 border-2 border-red-400 rounded flex items-center justify-center">
                  <AlertTriangle size={20} className="text-red-500" />
                </div>
              </div>
            ))}
            <div className="absolute bottom-2 w-full text-center text-xs text-red-500 font-bold">
              Hard-coded Dependencies Everywhere!
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-8 animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/20 border-2 border-blue-500 rounded-lg flex flex-col items-center justify-center shadow-lg z-10">
              <Factory
                size={32}
                className="text-blue-600 dark:text-blue-400 mb-2"
              />
              <span className="text-[10px] font-bold text-blue-800 dark:text-blue-200">
                Creator
              </span>
            </div>
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-12 h-12 bg-green-100 dark:bg-green-900/20 border border-green-400 rounded flex items-center justify-center animate-in slide-in-from-left duration-500"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <Box
                    size={20}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SingletonVisual = () => {
  const [attempts, setAttempts] = useState<number[]>([]);
  const [king, setKing] = useState(false);

  const tryEnter = () => {
    if (!king) {
      setKing(true);
      setAttempts((prev) => [...prev, 1]); // Success
    } else {
      setAttempts((prev) => [...prev, 0]); // Blocked
    }
  };

  const reset = () => {
    setKing(false);
    setAttempts([]);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={tryEnter}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-bold transition-colors shadow-lg"
        >
          Try to Create Instance
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-sm font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="h-64 relative bg-slate-900 rounded-lg overflow-hidden border-4 border-slate-800 flex flex-col items-center justify-end pb-4">
        {/* Throne Room Background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900 via-slate-900 to-slate-900" />

        {/* The Throne */}
        <div className="relative z-10 mb-8">
          <div className="w-32 h-40 bg-yellow-600 rounded-t-full border-4 border-yellow-400 flex items-center justify-center shadow-2xl">
            {king ? (
              <div className="animate-in zoom-in duration-300 flex flex-col items-center">
                <Crown
                  size={48}
                  className="text-yellow-300 drop-shadow-lg mb-2"
                />
                <div className="w-16 h-20 bg-purple-700 rounded-t-lg" />
              </div>
            ) : (
              <div className="text-yellow-900/50 font-bold text-xs uppercase tracking-widest">
                Empty
              </div>
            )}
          </div>
          <div className="w-40 h-8 bg-yellow-700 rounded-sm -mx-4 border-t-4 border-yellow-500" />
        </div>

        {/* Attempts */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {attempts.map((success, i) => (
            <div
              key={i}
              className={`px-3 py-1 rounded text-xs font-bold animate-in slide-in-from-right ${
                success ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              {success ? "Instance Created!" : "Blocked: Already Exists"}
            </div>
          ))}
        </div>

        {/* Shield Effect */}
        {king && (
          <div className="absolute inset-0 border-4 border-purple-500/30 rounded-lg pointer-events-none animate-pulse z-20" />
        )}
      </div>
    </div>
  );
};

const FactoryVisual = () => {
  const [product, setProduct] = useState<"none" | "truck" | "ship">("none");

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
      <div className="flex justify-center gap-8 mb-8">
        <button
          onClick={() => setProduct("truck")}
          className="group flex flex-col items-center gap-2"
        >
          <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border-2 border-orange-200 dark:border-orange-800">
            <Truck size={24} className="text-orange-600 dark:text-orange-400" />
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
            Road Logistics
          </span>
        </button>

        <button
          onClick={() => setProduct("ship")}
          className="group flex flex-col items-center gap-2"
        >
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border-2 border-blue-200 dark:border-blue-800">
            <Ship size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
            Sea Logistics
          </span>
        </button>
      </div>

      <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-lg relative overflow-hidden flex items-center justify-center border-b-8 border-slate-300 dark:border-slate-700">
        {/* Factory Machine */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-24 bg-slate-700 rounded-b-xl z-20 flex items-center justify-center shadow-xl">
          <Settings
            size={40}
            className={`text-slate-400 ${
              product !== "none" ? "animate-spin" : ""
            }`}
          />
        </div>

        {/* Output Chute */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-20 h-12 bg-slate-600 z-10" />

        {/* Product */}
        {product !== "none" && (
          <div
            key={product} // Force re-render for animation
            className="absolute top-32 animate-bounce z-0"
          >
            {product === "truck" ? (
              <div className="bg-orange-500 p-4 rounded-lg shadow-lg text-white">
                <Truck size={32} />
              </div>
            ) : (
              <div className="bg-blue-500 p-4 rounded-lg shadow-lg text-white">
                <Ship size={32} />
              </div>
            )}
          </div>
        )}
      </div>
      <p className="text-center text-xs text-slate-500 mt-4">
        The Client asks for "Road" or "Sea". The Factory handles the creation
        details.
      </p>
    </div>
  );
};

const BuilderVisual = () => {
  const [steps, setSteps] = useState<string[]>([]);

  const addStep = (step: string) => {
    if (!steps.includes(step)) {
      setSteps([...steps, step]);
    }
  };

  const reset = () => setSteps([]);

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => addStep("bun")}
          disabled={steps.includes("bun")}
          className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded text-xs font-bold disabled:opacity-50"
        >
          + Bun
        </button>
        <button
          onClick={() => addStep("patty")}
          disabled={steps.includes("patty")}
          className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-xs font-bold disabled:opacity-50"
        >
          + Patty
        </button>
        <button
          onClick={() => addStep("cheese")}
          disabled={steps.includes("cheese")}
          className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded text-xs font-bold disabled:opacity-50"
        >
          + Cheese
        </button>
        <button
          onClick={() => addStep("lettuce")}
          disabled={steps.includes("lettuce")}
          className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-bold disabled:opacity-50"
        >
          + Lettuce
        </button>
        <button
          onClick={reset}
          className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-xs font-bold ml-4"
        >
          Reset
        </button>
      </div>

      <div className="h-48 flex items-center justify-center bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 relative">
        {/* Assembly Line Belt */}
        <div className="absolute bottom-4 w-full h-2 bg-slate-300 dark:bg-slate-700" />

        {/* Burger Stack */}
        <div className="flex flex-col-reverse items-center gap-1 mb-6 transition-all">
          {steps.length === 0 && (
            <div className="text-slate-400 text-xs italic">Empty Tray</div>
          )}

          {steps.includes("bun") && (
            <div className="w-24 h-6 bg-yellow-200 rounded-b-lg border border-yellow-400 animate-in slide-in-from-top" />
          )}
          {steps.includes("patty") && (
            <div className="w-24 h-4 bg-red-800 rounded-sm border border-red-900 animate-in slide-in-from-top" />
          )}
          {steps.includes("cheese") && (
            <div className="w-26 h-2 bg-orange-400 rounded-sm -mx-1 animate-in slide-in-from-top" />
          )}
          {steps.includes("lettuce") && (
            <div className="w-22 h-2 bg-green-500 rounded-full animate-in slide-in-from-top" />
          )}
          {steps.includes("bun") && (
            <div className="w-24 h-8 bg-yellow-200 rounded-t-full border border-yellow-400 animate-in slide-in-from-top" />
          )}
        </div>
      </div>

      <div className="mt-4 p-3 bg-slate-800 rounded text-xs font-mono text-green-400 overflow-x-auto">
        {`BurgerBuilder()`}
        {steps.map((s) => `\n  .add_${s}()`)}
        {`\n  .build()`}
      </div>
    </div>
  );
};

const PatternSelectorVisual = () => {
  const [selected, setSelected] = useState<
    "singleton" | "factory" | "builder" | null
  >(null);

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
      <div className="grid grid-cols-3 gap-4 h-48">
        {/* Door 1: Singleton */}
        <button
          onClick={() => setSelected("singleton")}
          className={`relative rounded-lg border-2 transition-all overflow-hidden group ${
            selected === "singleton"
              ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
              : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
          }`}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="text-2xl font-bold text-slate-400 group-hover:text-purple-500 mb-2">
              1
            </div>
            <div className="text-xs text-slate-500 text-center">
              "Exactly One"
            </div>
          </div>
          {selected === "singleton" && (
            <div className="absolute inset-0 bg-purple-600 flex flex-col items-center justify-center text-white animate-in zoom-in">
              <Crown size={32} className="mb-2" />
              <span className="font-bold text-sm">Singleton</span>
            </div>
          )}
        </button>

        {/* Door 2: Factory */}
        <button
          onClick={() => setSelected("factory")}
          className={`relative rounded-lg border-2 transition-all overflow-hidden group ${
            selected === "factory"
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
          }`}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="text-2xl font-bold text-slate-400 group-hover:text-blue-500 mb-2">
              ?
            </div>
            <div className="text-xs text-slate-500 text-center">
              "Unknown Type"
            </div>
          </div>
          {selected === "factory" && (
            <div className="absolute inset-0 bg-blue-600 flex flex-col items-center justify-center text-white animate-in zoom-in">
              <Factory size={32} className="mb-2" />
              <span className="font-bold text-sm">Factory</span>
            </div>
          )}
        </button>

        {/* Door 3: Builder */}
        <button
          onClick={() => setSelected("builder")}
          className={`relative rounded-lg border-2 transition-all overflow-hidden group ${
            selected === "builder"
              ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
              : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
          }`}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="text-2xl font-bold text-slate-400 group-hover:text-orange-500 mb-2">
              10+
            </div>
            <div className="text-xs text-slate-500 text-center">"Complex"</div>
          </div>
          {selected === "builder" && (
            <div className="absolute inset-0 bg-orange-600 flex flex-col items-center justify-center text-white animate-in zoom-in">
              <Hammer size={32} className="mb-2" />
              <span className="font-bold text-sm">Builder</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

// --- Main Component ---

interface CreationalPatternsGuideProps {
  initialPage: number;
  onPageChange?: (page: number) => void;
  onComplete: () => void;
}

export const CreationalPatternsGuide: React.FC<
  CreationalPatternsGuideProps
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
      title: "The Concept: Object Creation",
      icon: Layers,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
              <AlertTriangle size={18} /> The Problem: Hard-coded Dependencies
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-200">
              Using <code>new ClassName()</code> everywhere makes your code
              rigid. If you want to switch from <code>MySQL</code> to{" "}
              <code>Postgres</code>, you have to rewrite everything.
            </p>
          </div>

          <BlueprintVisual />

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">
              The Amazon Context
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 italic border-l-4 border-orange-500 pl-4">
              "At Amazon, we don't let 50 different services create their own DB
              connections. We use a <strong>Singleton</strong>{" "}
              <code>ConnectionManager</code>. We don't let the user code decide
              whether to create a <code>PrimeOrder</code> or{" "}
              <code>RegularOrder</code>. We use a <strong>Factory</strong>."
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Singleton Pattern (The President)",
      icon: Crown,
      content: (
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-lg mb-2">The Rule</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Ensure a class has <strong>only one instance</strong> and provide
              a global point of access to it.
            </p>
          </div>

          <SingletonVisual />

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">
              Thread Safety (Interview Trap)
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              If two threads call <code>getInstance()</code> at the same time,
              they might create two instances.
            </p>
            <div className="bg-slate-900 text-slate-300 p-3 rounded text-xs font-mono overflow-x-auto">
              {`class DatabaseConnection:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock: # Double-Checked Locking
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
        return cls._instance`}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Factory Pattern (The Pizza Store)",
      icon: Factory,
      content: (
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-lg mb-2">The Rule</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Define an interface for creating an object, but let subclasses
              decide which class to instantiate.
            </p>
          </div>

          <FactoryVisual />

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">
              Amazon Scenario: Logistics
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              Instead of <code>if type == 'truck': new Truck()</code>, use a
              Factory.
            </p>
            <div className="bg-slate-900 text-slate-300 p-3 rounded text-xs font-mono overflow-x-auto">
              {`class LogisticsFactory:
    @staticmethod
    def get_transport(type):
        if type == "road": return Truck()
        if type == "sea": return Ship()
        raise ValueError("Unknown type")`}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Builder Pattern (The Subway Sandwich)",
      icon: Hammer,
      content: (
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-lg mb-2">The Rule</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Separate the construction of a complex object from its
              representation. Solves the "Telescoping Constructor" problem.
            </p>
          </div>

          <BuilderVisual />

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">
              Fluent Interface
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              By returning <code>this</code> (or <code>self</code>) in each
              setter method, you can chain calls together for readable code.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Interview Cheat Sheet",
      icon: MousePointer2,
      content: (
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-lg mb-4">When to use what?</h3>
            <PatternSelectorVisual />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase">
                <tr>
                  <th className="p-2">Pattern</th>
                  <th className="p-2">The "Trigger"</th>
                  <th className="p-2">Amazon Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr>
                  <td className="p-2 font-bold text-purple-600">Singleton</td>
                  <td className="p-2 text-slate-500">"Exactly one instance"</td>
                  <td className="p-2">
                    <code>Logger</code>, <code>ConnectionManager</code>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-blue-600">Factory</td>
                  <td className="p-2 text-slate-500">
                    "Unknown type until runtime"
                  </td>
                  <td className="p-2">
                    <code>NotificationFactory</code> (Email/SMS)
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-orange-600">Builder</td>
                  <td className="p-2 text-slate-500">
                    "Complex object, many options"
                  </td>
                  <td className="p-2">
                    <code>RequestObjectBuilder</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/30">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
              <AlertTriangle size={16} /> Common Trap: Singleton Anti-Pattern
            </h4>
            <p className="text-sm text-red-600 dark:text-red-300">
              Do not use Singleton just to share global variables. It makes unit
              testing hard because state persists between tests. Use Dependency
              Injection where possible.
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
