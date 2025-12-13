// import React from "react";
import {
  Scissors,
  Utensils,
  Wine,
  Plug,
  Zap,
  AlertTriangle,
  ArrowRightLeft,
  CheckCircle2,
  XCircle,
  Coffee,
  Pizza,
} from "lucide-react";

// 1. Single Responsibility Principle
export const SRPVisual = () => (
  <div className="flex flex-col items-center gap-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="text-center mb-2">
      <h4 className="font-bold text-slate-700">The "Swiss Army Knife" Trap</h4>
      <p className="text-xs text-slate-500">
        One tool doing too many things breaks easily.
      </p>
    </div>
    <div className="flex gap-8 items-center">
      {/* Bad: Swiss Army Knife */}
      <div className="relative group">
        <div className="w-24 h-40 bg-red-500 rounded-full flex flex-col items-center justify-center shadow-lg relative z-10">
          <div className="text-white font-bold text-[10px] mb-2">GOD CLASS</div>
          <Scissors className="text-white w-6 h-6 mb-1" />
          <Utensils className="text-white w-6 h-6 mb-1" />
          <Wine className="text-white w-6 h-6" />
        </div>
        <div className="absolute -top-2 -right-2 bg-red-100 text-red-600 p-1 rounded-full border border-red-200">
          <AlertTriangle size={16} />
        </div>
        <p className="text-center text-xs font-bold text-red-500 mt-2">
          Fragile
        </p>
      </div>

      <div className="text-slate-300 text-2xl">→</div>

      {/* Good: Separated Tools */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border border-slate-200">
          <div className="bg-blue-100 p-1.5 rounded text-blue-600">
            <Scissors size={16} />
          </div>
          <span className="text-xs font-bold text-slate-600">Cutter</span>
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border border-slate-200">
          <div className="bg-green-100 p-1.5 rounded text-green-600">
            <Utensils size={16} />
          </div>
          <span className="text-xs font-bold text-slate-600">Eater</span>
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border border-slate-200">
          <div className="bg-purple-100 p-1.5 rounded text-purple-600">
            <Wine size={16} />
          </div>
          <span className="text-xs font-bold text-slate-600">Opener</span>
        </div>
      </div>
    </div>
  </div>
);

// 2. Open/Closed Principle
export const OCPVisual = () => (
  <div className="flex flex-col items-center gap-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="text-center mb-2">
      <h4 className="font-bold text-slate-700">The "Plug & Play" Rule</h4>
      <p className="text-xs text-slate-500">
        Add features without opening the box.
      </p>
    </div>
    <div className="flex items-center gap-4">
      {/* Core System */}
      <div className="w-32 h-32 bg-slate-800 rounded-xl flex flex-col items-center justify-center shadow-xl relative">
        <div className="text-slate-400 text-[10px] uppercase tracking-widest mb-1">
          Core
        </div>
        <div className="text-white font-bold">System</div>
        {/* Slots */}
        <div className="absolute -right-2 top-6 w-4 h-8 bg-slate-700 rounded-r border-y border-r border-slate-600" />
        <div className="absolute -right-2 bottom-6 w-4 h-8 bg-slate-700 rounded-r border-y border-r border-slate-600" />
      </div>

      {/* Extensions */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 animate-pulse">
          <div className="w-8 h-6 bg-green-500 rounded-l flex items-center justify-center text-white text-xs font-bold">
            Ext
          </div>
          <span className="text-xs text-green-600 font-bold">New Feature</span>
        </div>
        <div className="flex items-center gap-2 opacity-50">
          <div className="w-8 h-6 bg-blue-500 rounded-l flex items-center justify-center text-white text-xs font-bold">
            Ext
          </div>
          <span className="text-xs text-slate-400">Old Feature</span>
        </div>
      </div>
    </div>
  </div>
);

// 3. Liskov Substitution Principle
export const LSPVisual = () => (
  <div className="flex flex-col items-center gap-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="text-center mb-2">
      <h4 className="font-bold text-slate-700">The "Rubber Duck" Test</h4>
      <p className="text-xs text-slate-500">
        If it acts like a duck but needs batteries, it's not a duck.
      </p>
    </div>
    <div className="flex items-start gap-8">
      {/* Real Duck */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-500">
          <span className="text-2xl">🦆</span>
        </div>
        <div className="text-center">
          <div className="text-xs font-bold text-slate-700">Real Duck</div>
          <div className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded mt-1 border border-green-200 flex items-center gap-1">
            <CheckCircle2 size={10} /> .fly()
          </div>
        </div>
      </div>

      <div className="mt-4 text-slate-300">
        <ArrowRightLeft size={24} />
      </div>

      {/* Rubber Duck */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center border-2 border-yellow-500 relative">
          <span className="text-2xl">🐤</span>
          <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5">
            <AlertTriangle size={12} />
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs font-bold text-slate-700">Rubber Duck</div>
          <div className="text-[10px] text-red-600 bg-red-50 px-1.5 py-0.5 rounded mt-1 border border-red-200 flex items-center gap-1">
            <XCircle size={10} /> .fly()
          </div>
        </div>
      </div>
    </div>
    <div className="text-xs text-center text-red-500 font-medium bg-red-50 px-3 py-1 rounded-full border border-red-100">
      Violation: Subclass breaks parent behavior
    </div>
  </div>
);

// 4. Interface Segregation Principle
export const ISPVisual = () => (
  <div className="flex flex-col items-center gap-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="text-center mb-2">
      <h4 className="font-bold text-slate-700">The "Menu Card" Rule</h4>
      <p className="text-xs text-slate-500">
        Don't force clients to read the whole book for a coffee.
      </p>
    </div>
    <div className="flex items-center gap-8">
      {/* Fat Interface */}
      <div className="flex flex-col items-center gap-2 opacity-50 grayscale">
        <div className="w-20 h-28 bg-slate-200 border border-slate-300 rounded flex flex-col p-2 gap-1.5 shadow-sm">
          <div className="h-1.5 w-8 bg-slate-400 rounded mb-1"></div>
          <div className="h-1 w-full bg-slate-300 rounded"></div>
          <div className="h-1 w-full bg-slate-300 rounded"></div>
          <div className="h-1 w-full bg-slate-300 rounded"></div>
          <div className="h-1 w-full bg-slate-300 rounded"></div>
          <div className="h-1 w-full bg-slate-300 rounded"></div>
        </div>
        <span className="text-xs font-bold text-slate-500">Fat Interface</span>
      </div>

      <div className="text-slate-300 text-xl">→</div>

      {/* Segregated Interfaces */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-blue-200 shadow-sm">
          <div className="bg-blue-100 p-1.5 rounded text-blue-600">
            <Coffee size={14} />
          </div>
          <span className="text-xs font-bold text-blue-700">Drinks Menu</span>
        </div>
        <div className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-purple-200 shadow-sm">
          <div className="bg-purple-100 p-1.5 rounded text-purple-600">
            <Pizza size={14} />
          </div>
          <span className="text-xs font-bold text-purple-700">Food Menu</span>
        </div>
      </div>
    </div>
  </div>
);

// 5. Dependency Inversion Principle
export const DIPVisual = () => (
  <div className="flex flex-col items-center gap-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="text-center mb-2">
      <h4 className="font-bold text-slate-700">The "Wall Socket" Rule</h4>
      <p className="text-xs text-slate-500">
        Depend on abstractions (plugs), not wiring.
      </p>
    </div>
    <div className="flex items-center justify-center gap-0">
      {/* Wall (High Level) */}
      <div className="w-24 h-32 bg-slate-200 border-l-4 border-slate-300 flex flex-col items-center justify-center relative">
        <div className="w-12 h-12 bg-white rounded-full border border-slate-300 flex items-center justify-center shadow-inner">
          <div className="flex gap-2">
            <div className="w-1.5 h-4 bg-black rounded-full" />
            <div className="w-1.5 h-4 bg-black rounded-full" />
          </div>
        </div>
        <span className="absolute bottom-2 text-[10px] text-slate-500 font-mono">
          Interface
        </span>
      </div>

      {/* Plug (Connection) */}
      <div className="flex items-center">
        <div className="w-8 h-4 bg-black rounded-l" />
        <div className="w-16 h-8 bg-slate-800 rounded-r flex items-center justify-center">
          <Plug className="text-white w-4 h-4" />
        </div>
        <div className="h-1 w-12 bg-slate-800" />
      </div>

      {/* Device (Low Level) */}
      <div className="w-20 h-20 bg-yellow-100 rounded-full border-4 border-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-200">
        <Zap className="text-yellow-500 w-8 h-8 fill-current" />
      </div>
    </div>
  </div>
);
