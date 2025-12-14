// import React from "react";
import {
  Lock,
  Key,
  Tv,
  Cpu,
  GitFork,
  Circle,
  Square,
  Triangle,
} from "lucide-react";

export const EncapsulationVisual = () => (
  <div className="flex flex-col items-center gap-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="text-center mb-2">
      <h4 className="font-bold text-slate-700">
        Encapsulation: The Digital Safe
      </h4>
      <p className="text-xs text-slate-500">
        Data is locked inside; access is only via the keypad (methods).
      </p>
    </div>
    <div className="relative">
      {/* The Safe */}
      <div className="w-32 h-40 bg-slate-800 rounded-xl border-4 border-slate-600 flex flex-col items-center justify-center shadow-xl relative z-10">
        <div className="w-24 h-24 border-2 border-dashed border-slate-600 rounded flex flex-col items-center justify-center gap-1 opacity-50">
          <span className="text-[10px] text-slate-400">Private Data</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800/90 rounded-lg">
          <Lock className="text-red-500 w-10 h-10" />
        </div>
      </div>

      {/* The Keypad (Public Interface) */}
      <div className="absolute -right-12 top-10 bg-white p-2 rounded-lg shadow-lg border border-slate-200 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-bold text-green-600">
          <Key size={12} /> .deposit()
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-green-600">
          <Key size={12} /> .withdraw()
        </div>
      </div>
    </div>
  </div>
);

export const AbstractionVisual = () => (
  <div className="flex flex-col items-center gap-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="text-center mb-2">
      <h4 className="font-bold text-slate-700">
        Abstraction: The Remote Control
      </h4>
      <p className="text-xs text-slate-500">
        Simple interface hiding complex implementation.
      </p>
    </div>
    <div className="flex items-center gap-8">
      {/* Complex Internals (Hidden) */}
      <div className="flex flex-col items-center opacity-40 grayscale">
        <div className="w-24 h-32 bg-slate-900 rounded-lg border border-slate-700 p-2 relative overflow-hidden">
          <Cpu className="text-slate-500 w-full h-full opacity-20" />
          <div className="absolute top-2 left-2 text-[8px] font-mono text-green-500">
            010101
            <br />
            110010
            <br />
            VOLT_REG
          </div>
        </div>
        <span className="text-xs font-bold text-slate-500 mt-2">
          Implementation
        </span>
      </div>

      <div className="text-slate-300 text-2xl">vs</div>

      {/* Simple Interface (Exposed) */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-32 bg-slate-100 rounded-2xl border-2 border-slate-300 flex flex-col items-center py-4 shadow-lg">
          <div className="w-3 h-3 bg-red-500 rounded-full mb-4 shadow-sm"></div>
          <div className="flex flex-col gap-2">
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
              <Tv size={14} className="text-slate-600" />
            </div>
            <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <span className="text-xs font-bold text-blue-600 mt-2">Interface</span>
      </div>
    </div>
  </div>
);

export const InheritanceVisual = () => (
  <div className="flex flex-col items-center gap-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="text-center mb-2">
      <h4 className="font-bold text-slate-700">Inheritance: The Blueprint</h4>
      <p className="text-xs text-slate-500">
        Shared traits flow down from parent to child.
      </p>
    </div>
    <div className="flex flex-col items-center gap-4">
      {/* Parent */}
      <div className="bg-blue-100 border-2 border-blue-500 p-3 rounded-lg w-32 text-center shadow-sm">
        <span className="text-xs font-bold text-blue-800 block">Animal</span>
        <span className="text-[10px] text-blue-600">eat()</span>
      </div>

      <GitFork className="text-slate-300 rotate-180" size={32} />

      {/* Children */}
      <div className="flex gap-4">
        <div className="bg-white border border-slate-300 p-3 rounded-lg w-24 text-center shadow-sm">
          <span className="text-xs font-bold text-slate-700 block">Dog</span>
          <span className="text-[10px] text-slate-500">bark()</span>
        </div>
        <div className="bg-white border border-slate-300 p-3 rounded-lg w-24 text-center shadow-sm">
          <span className="text-xs font-bold text-slate-700 block">Cat</span>
          <span className="text-[10px] text-slate-500">meow()</span>
        </div>
      </div>
    </div>
  </div>
);

export const PolymorphismVisual = () => (
  <div className="flex flex-col items-center gap-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="text-center mb-2">
      <h4 className="font-bold text-slate-700">
        Polymorphism: The Shape Shifter
      </h4>
      <p className="text-xs text-slate-500">
        One command (.draw()), many forms.
      </p>
    </div>
    <div className="flex items-center gap-2">
      {/* Command */}
      <div className="bg-slate-800 text-white px-3 py-1.5 rounded-md font-mono text-xs shadow-lg mr-4">
        items.forEach(i =&gt; i.draw())
      </div>

      <div className="text-slate-300 text-xl">→</div>

      {/* Shapes */}
      <div className="flex gap-3">
        <div className="w-12 h-12 bg-red-100 border-2 border-red-500 rounded-full flex items-center justify-center shadow-sm animate-pulse">
          <Circle size={20} className="text-red-500" />
        </div>
        <div className="w-12 h-12 bg-blue-100 border-2 border-blue-500 rounded-none flex items-center justify-center shadow-sm animate-pulse delay-75">
          <Square size={20} className="text-blue-500" />
        </div>
        <div className="w-12 h-12 bg-green-100 border-2 border-green-500 flex items-center justify-center shadow-sm animate-pulse delay-150">
          <Triangle size={16} className="text-green-500" />
        </div>
      </div>
    </div>
  </div>
);
