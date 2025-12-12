import React, { useState } from "react";
import {
  Puzzle,
  Plug,
  Zap,
  Layers,
  ArrowRight,
  Box,
  AlertTriangle,
  Square,
  Circle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Coffee,
  //   Plus,
} from "lucide-react";

// --- Visual Components ---

const LegoVisual = () => {
  const [snapped, setSnapped] = useState(false);

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6 flex flex-col items-center">
      <div className="h-48 w-full relative bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden">
        {/* Blue Block (Base) */}
        <div
          className={`absolute w-24 h-24 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg transition-all duration-700 z-10 ${
            snapped ? "translate-x-[-50px]" : "translate-x-[-80px]"
          }`}
        >
          <div className="absolute -right-4 w-4 h-8 bg-blue-500 rounded-r-md" />
          Class A
        </div>

        {/* Red Block (Component) */}
        <div
          className={`absolute w-24 h-24 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg transition-all duration-700 ${
            snapped ? "translate-x-[50px]" : "translate-x-[80px]"
          }`}
        >
          <div className="absolute -left-4 w-4 h-10 bg-red-600/30 rounded-l-md" />
          Class B
        </div>

        {/* Connection Spark */}
        {snapped && (
          <div className="absolute z-20 animate-ping">
            <Zap className="text-yellow-400 fill-yellow-400" size={32} />
          </div>
        )}

        {snapped && (
          <div className="absolute bottom-4 text-green-600 dark:text-green-400 font-bold animate-in fade-in slide-in-from-bottom-2">
            Flexible Structure Formed!
          </div>
        )}
      </div>

      <button
        onClick={() => setSnapped(!snapped)}
        className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold transition-all flex items-center gap-2"
      >
        <Puzzle size={18} />
        {snapped ? "Detach Components" : "Snap Together"}
      </button>
    </div>
  );
};

const AdapterVisual = () => {
  const [step, setStep] = useState(0); // 0: Disconnected, 1: Adapter, 2: Connected

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6 flex flex-col items-center">
      <div className="h-48 w-full relative bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-8 overflow-hidden">
        {/* Client (US Plug) */}
        <div
          className={`flex flex-col items-center transition-all duration-700 ${
            step === 2 ? "translate-x-12" : ""
          }`}
        >
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 rounded-lg flex items-center justify-center mb-2">
            <Square className="text-blue-500" />
          </div>
          <span className="text-xs font-bold text-slate-500">US Plug</span>
        </div>

        {/* Adapter */}
        <div
          className={`flex flex-col items-center transition-all duration-500 ${
            step >= 1
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-10 scale-50"
          }`}
        >
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500 rounded flex items-center justify-center mb-2 relative">
            <div className="absolute -left-3 w-3 h-6 border-y-2 border-l-2 border-purple-500 bg-white dark:bg-slate-900 rounded-l" />
            <div className="absolute -right-3 w-3 h-6 bg-purple-500 rounded-r" />
            <Plug size={20} className="text-purple-500" />
          </div>
          <span className="text-xs font-bold text-purple-500">Adapter</span>
        </div>

        {/* Service (UK Socket) */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 border-2 border-red-500 rounded-full flex items-center justify-center mb-2">
            <Circle className="text-red-500" />
          </div>
          <span className="text-xs font-bold text-slate-500">UK Socket</span>
        </div>

        {/* Connection Line */}
        {step === 2 && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-green-500/20 -z-10 animate-pulse" />
        )}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setStep(0)}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            step === 0
              ? "bg-slate-800 text-white"
              : "bg-white dark:bg-slate-800 text-slate-500"
          }`}
        >
          Reset
        </button>
        <button
          onClick={() => setStep(1)}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            step === 1
              ? "bg-purple-600 text-white"
              : "bg-white dark:bg-slate-800 text-slate-500"
          }`}
        >
          Add Adapter
        </button>
        <button
          onClick={() => setStep(2)}
          disabled={step < 1}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            step === 2
              ? "bg-green-600 text-white"
              : "bg-white dark:bg-slate-800 text-slate-500 disabled:opacity-50"
          }`}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

const DecoratorVisual = () => {
  const [layers, setLayers] = useState<string[]>([]);

  const toggleLayer = (layer: string) => {
    if (layers.includes(layer)) {
      setLayers(layers.filter((l) => l !== layer));
    } else {
      setLayers([...layers, layer]);
    }
  };

  const getPrice = () => {
    let price = 5;
    if (layers.includes("milk")) price += 2;
    if (layers.includes("sugar")) price += 1;
    if (layers.includes("whip")) price += 3;
    return price;
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Visual Representation */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Base Coffee */}
          <div className="absolute z-10 w-16 h-16 bg-amber-800 rounded-full flex items-center justify-center text-white shadow-lg animate-in zoom-in duration-300">
            <Coffee size={24} />
          </div>

          {/* Layers */}
          {layers.includes("milk") && (
            <div className="absolute z-20 w-24 h-24 border-4 border-white bg-white/20 rounded-full animate-in zoom-in duration-300 flex items-start justify-center pt-1">
              <span className="text-[10px] font-bold bg-white text-slate-800 px-1 rounded">
                Milk
              </span>
            </div>
          )}
          {layers.includes("sugar") && (
            <div className="absolute z-30 w-32 h-32 border-4 border-pink-200 bg-pink-200/10 rounded-full animate-in zoom-in duration-300 flex items-start justify-center pt-1">
              <span className="text-[10px] font-bold bg-pink-100 text-pink-800 px-1 rounded">
                Sugar
              </span>
            </div>
          )}
          {layers.includes("whip") && (
            <div className="absolute z-40 w-40 h-40 border-4 border-yellow-200 bg-yellow-200/10 rounded-full animate-in zoom-in duration-300 flex items-start justify-center pt-1">
              <span className="text-[10px] font-bold bg-yellow-100 text-yellow-800 px-1 rounded">
                Whip
              </span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3 min-w-[200px]">
          <div className="text-xl font-bold text-slate-800 dark:text-white mb-2 flex justify-between items-center">
            <span>Total Cost:</span>
            <span className="text-green-600">${getPrice()}</span>
          </div>
          <div className="h-px bg-slate-300 dark:bg-slate-700 mb-2" />

          <button
            onClick={() => toggleLayer("milk")}
            className={`flex items-center justify-between px-4 py-2 rounded-lg border transition-all ${
              layers.includes("milk")
                ? "bg-white border-slate-400 shadow-inner"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400"
            }`}
          >
            <span>Add Milk (+$2)</span>
            {layers.includes("milk") && (
              <CheckCircle2 size={16} className="text-green-500" />
            )}
          </button>

          <button
            onClick={() => toggleLayer("sugar")}
            className={`flex items-center justify-between px-4 py-2 rounded-lg border transition-all ${
              layers.includes("sugar")
                ? "bg-pink-50 border-pink-400 shadow-inner"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-pink-400"
            }`}
          >
            <span>Add Sugar (+$1)</span>
            {layers.includes("sugar") && (
              <CheckCircle2 size={16} className="text-green-500" />
            )}
          </button>

          <button
            onClick={() => toggleLayer("whip")}
            className={`flex items-center justify-between px-4 py-2 rounded-lg border transition-all ${
              layers.includes("whip")
                ? "bg-yellow-50 border-yellow-400 shadow-inner"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-yellow-400"
            }`}
          >
            <span>Add Whip (+$3)</span>
            {layers.includes("whip") && (
              <CheckCircle2 size={16} className="text-green-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ComparisonVisual = () => {
  return (
    <div className="grid grid-cols-2 gap-4 my-6">
      {/* Adapter Side */}
      <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center">
        <h4 className="font-bold text-purple-600 mb-4">Adapter</h4>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white">
            <Square size={16} />
          </div>
          <ArrowRight size={16} className="text-slate-400" />
          <div className="w-8 h-8 bg-purple-100 border-2 border-purple-500 rounded flex items-center justify-center">
            <Plug size={16} className="text-purple-500" />
          </div>
          <ArrowRight size={16} className="text-slate-400" />
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white">
            <Circle size={16} />
          </div>
        </div>
        <p className="text-xs text-center text-slate-500 mt-2">
          Changes the <strong>Interface</strong> (Shape)
        </p>
      </div>

      {/* Decorator Side */}
      <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center">
        <h4 className="font-bold text-amber-600 mb-4">Decorator</h4>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white">
            <Square size={16} />
          </div>
          <ArrowRight size={16} className="text-slate-400" />
          <div className="w-8 h-8 bg-amber-100 border-2 border-amber-500 rounded flex items-center justify-center">
            <Layers size={16} className="text-amber-500" />
          </div>
          <ArrowRight size={16} className="text-slate-400" />
          <div className="w-10 h-10 bg-blue-500 rounded border-4 border-amber-400 shadow-lg flex items-center justify-center text-white">
            <Square size={16} />
          </div>
        </div>
        <p className="text-xs text-center text-slate-500 mt-2">
          Enhances the <strong>Behavior</strong> (Style)
        </p>
      </div>
    </div>
  );
};

// --- Main Component ---

interface StructuralPatternsGuideProps {
  initialPage?: number;
  onPageChange?: (page: number) => void;
  onComplete?: () => void;
}

export const StructuralPatternsGuide: React.FC<
  StructuralPatternsGuideProps
> = ({ initialPage = 0, onPageChange, onComplete }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = 4;

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
        Composition over Inheritance
      </h3>

      <div className="prose dark:prose-invert max-w-none mb-6">
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Structural patterns are about how we <strong>assemble</strong> objects
          and classes into larger structures.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>The Rule:</strong> "Favor Composition over Inheritance."
          </li>
          <li>
            <strong>Why?</strong> Inheritance is rigid (static). If you inherit
            from <code>Class A</code>, you are stuck with it forever. Structural
            patterns let you "snap" objects together dynamically at runtime,
            like Lego bricks.
          </li>
        </ul>
      </div>

      <LegoVisual />

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
          <Box size={18} /> The Amazon Context
        </h4>
        <p className="text-sm text-blue-700 dark:text-blue-200 italic">
          "Amazon acquires companies (like Twitch, Whole Foods, Ring) all the
          time. These companies have their own codebases with different APIs. We
          can't rewrite Twitch from scratch. We use <strong>Adapters</strong> to
          make their systems talk to ours. We use <strong>Decorators</strong> to
          add Amazon-standard logging and metrics to their existing services."
        </p>
      </div>
    </div>,

    // Page 2: Adapter
    <div
      key="adapter"
      className="animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Plug className="text-purple-500" /> Adapter Pattern
      </h3>

      <div className="prose dark:prose-invert max-w-none mb-6">
        <p>
          <strong>The Metaphor:</strong> The Universal Travel Plug.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          You have a US Laptop (Client) and a UK Socket (Legacy System). The
          Adapter is the piece in the middle that translates the interface
          without changing the electricity.
        </p>
      </div>

      <AdapterVisual />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
          <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">
            The Problem
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            You have an old <code>LegacyInventory</code> system that returns
            XML. You are building a new <code>Frontend</code> that expects JSON.
          </p>
          <div className="mt-2 text-xs bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-2 rounded">
            <strong>Bad:</strong> Rewrite the Legacy System (Too
            risky/expensive).
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
          <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">
            The Solution
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Build an <code>InventoryAdapter</code> class. It "looks like" the
            new JSON system on the outside, but calls the old XML system on the
            inside.
          </p>
          <div className="mt-2 text-xs bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-2 rounded">
            <strong>Good:</strong> Wraps the legacy code safely.
          </div>
        </div>
      </div>

      <div className="mt-6 bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs overflow-x-auto">
        <pre>{`# 1. The Target Interface
class TargetJSON:
    def get_data(self): pass

# 2. The Adaptee (Legacy)
class LegacyXML:
    def get_xml_data(self):
        return "<data>Stock: 50</data>"

# 3. The Adapter
class XMLToJSONAdapter(TargetJSON):
    def __init__(self, legacy_system):
        self.legacy_system = legacy_system

    def get_data(self):
        xml = self.legacy_system.get_xml_data()
        return {"stock": 50} # Translated`}</pre>
      </div>
    </div>,

    // Page 3: Decorator
    <div
      key="decorator"
      className="animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Layers className="text-amber-500" /> Decorator Pattern
      </h3>

      <div className="prose dark:prose-invert max-w-none mb-6">
        <p>
          <strong>The Metaphor:</strong> Putting on Layers (Clothes).
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          You start with a base object (Human). You add a T-Shirt (+Warmth). You
          add a Jacket (+Pockets). You do this <strong>dynamically</strong> at
          runtime, avoiding "Inheritance Explosion".
        </p>
      </div>

      <DecoratorVisual />

      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 mb-6">
        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">
          Amazon Scenario: Coffee Machine
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
          Instead of creating 100 classes like{" "}
          <code>CoffeeWithMilkAndSugar</code>, we wrap objects.
        </p>
        <div className="font-mono text-xs bg-white dark:bg-black p-3 rounded border border-slate-200 dark:border-slate-800">
          my_drink = Coffee()
          <br />
          my_drink = MilkDecorator(my_drink)
          <br />
          my_drink = SugarDecorator(my_drink)
          <br />
          print(my_drink.cost()) # Base + Milk + Sugar
        </div>
      </div>
    </div>,

    // Page 4: Comparison
    <div
      key="comparison"
      className="animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
        Adapter vs. Decorator
      </h3>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
        <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
          <AlertTriangle size={18} /> Bar Raiser Question
        </h4>
        <p className="text-sm text-yellow-700 dark:text-yellow-200">
          "Both involve wrapping an object. What's the difference?"
        </p>
      </div>

      <ComparisonVisual />

      <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 mb-6">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold">
            <tr>
              <th className="p-3">Feature</th>
              <th className="p-3 text-purple-600">Adapter</th>
              <th className="p-3 text-amber-600">Decorator</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
            <tr>
              <td className="p-3 font-bold">Intent</td>
              <td className="p-3">Translation (Make A look like B)</td>
              <td className="p-3">Enhancement (Add features to A)</td>
            </tr>
            <tr>
              <td className="p-3 font-bold">Interface</td>
              <td className="p-3">Changes it (XML &rarr; JSON)</td>
              <td className="p-3">Keeps it (Coffee &rarr; Coffee)</td>
            </tr>
            <tr>
              <td className="p-3 font-bold">Metaphor</td>
              <td className="p-3">Travel Plug</td>
              <td className="p-3">Winter Jacket</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">
          Interview Tip
        </h4>
        <p className="text-sm text-green-700 dark:text-green-200 italic">
          If asked "How would you add logging to every API call without
          rewriting functions?", answer: <strong>Decorator Pattern</strong>. It
          adheres to the Open/Closed Principle.
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
