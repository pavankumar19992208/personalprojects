// import React from "react";
import { ChevronRight, Database, Server, Globe, Shield } from "lucide-react";

export const SlidingWindowVisual = () => (
  <div className="my-6 p-4 bg-slate-900 rounded-lg border border-slate-700 flex flex-col items-center animate-in fade-in">
    <div className="text-xs text-slate-400 mb-2 font-mono">Dynamic Window</div>
    <div className="flex gap-1 relative">
      {[0, 1, 0, 1, 1, 0].map((n, i) => (
        <div
          key={i}
          className={`w-10 h-10 border rounded flex items-center justify-center font-bold transition-all
          ${
            i >= 1 && i <= 3
              ? "bg-orange-500/20 border-orange-500 text-white scale-110 shadow-lg shadow-orange-500/20"
              : "border-slate-700 text-slate-500"
          }`}
        >
          {n}
        </div>
      ))}
      <div className="absolute -bottom-4 left-12 text-[10px] text-orange-400">
        Start
      </div>
      <div className="absolute -bottom-4 right-20 text-[10px] text-orange-400">
        End
      </div>
    </div>
  </div>
);

export const GraphVisual = () => (
  <div className="my-6 p-4 bg-slate-900 rounded-lg border border-slate-700 flex flex-col items-center animate-in fade-in">
    <div className="text-xs text-slate-400 mb-4 font-mono">
      Dependency Graph (DAG)
    </div>
    <div className="flex gap-8 items-center">
      <div className="w-12 h-12 rounded-full border-2 border-green-500 flex items-center justify-center bg-green-500/10 text-green-400 font-bold">
        A
      </div>
      <ChevronRight className="text-slate-500" />
      <div className="w-12 h-12 rounded-full border-2 border-orange-500 flex items-center justify-center bg-orange-500/10 text-orange-400 font-bold">
        B
      </div>
      <ChevronRight className="text-slate-500" />
      <div className="w-12 h-12 rounded-full border-2 border-red-500 flex items-center justify-center bg-red-500/10 text-red-400 font-bold">
        C
      </div>
    </div>
    <div className="mt-2 text-xs text-slate-500">A must complete before B</div>
  </div>
);

export const LLDParkingVisual = () => (
  <div className="my-6 p-6 bg-slate-900 rounded-lg border border-dashed border-slate-700 font-mono text-xs animate-in fade-in">
    <div className="text-center text-slate-400 mb-4">UML Class Diagram</div>
    <div className="border border-cyan-500 rounded p-2 w-40 mx-auto bg-cyan-900/20 mb-4">
      <div className="border-b border-cyan-500 pb-1 font-bold text-cyan-300">
        ParkingLot
      </div>
      <div className="pt-1 text-cyan-100">+ getInstance()</div>
    </div>
    <div className="h-4 w-px bg-slate-500 mx-auto"></div>
    <div className="h-px w-20 bg-slate-500 mx-auto"></div>
    <div className="flex justify-center gap-4 mt-2">
      <div className="border border-orange-500 rounded p-2 w-32 bg-orange-900/20">
        <div className="border-b border-orange-500 pb-1 font-bold text-orange-300">
          Level
        </div>
        <div className="pt-1 text-orange-100">- spots: List</div>
      </div>
    </div>
  </div>
);

export const StarMethodVisual = () => (
  <div className="my-6 grid grid-cols-2 gap-2 animate-in fade-in">
    {["Situation", "Task", "Action", "Result"].map((s) => (
      <div
        key={s}
        className="bg-slate-800 p-3 rounded border-l-4 border-purple-500 hover:bg-slate-700 transition-colors"
      >
        <div className="font-bold text-purple-300">{s.charAt(0)}</div>
        <div className="text-xs text-slate-400">{s}</div>
      </div>
    ))}
  </div>
);

export const HeapVisual = () => (
  <div className="my-6 p-4 bg-slate-900 rounded-lg border border-slate-700 flex flex-col items-center animate-in fade-in">
    <div className="text-xs text-slate-400 mb-2 font-mono">Max Heap</div>
    <div className="flex flex-col items-center gap-2">
      <div className="w-10 h-10 rounded-full border-2 border-orange-500 flex items-center justify-center text-orange-400 font-bold bg-orange-500/10">
        10
      </div>
      <div className="flex gap-8">
        <div className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center text-slate-400">
          8
        </div>
        <div className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center text-slate-400">
          5
        </div>
      </div>
    </div>
  </div>
);

export const DbVisual = () => (
  <div className="my-6 p-4 bg-slate-900 rounded-lg border border-slate-700 flex justify-center gap-6 animate-in fade-in">
    <div className="flex flex-col items-center gap-2">
      <Database className="text-blue-400" size={24} />
      <span className="text-xs text-blue-300 font-mono">SQL</span>
      <div className="w-16 h-12 border border-blue-500/30 grid grid-cols-2 gap-px bg-blue-500/30">
        <div className="bg-slate-900"></div>
        <div className="bg-slate-900"></div>
        <div className="bg-slate-900"></div>
        <div className="bg-slate-900"></div>
      </div>
    </div>
    <div className="w-px bg-slate-700"></div>
    <div className="flex flex-col items-center gap-2">
      <Server className="text-green-400" size={24} />
      <span className="text-xs text-green-300 font-mono">NoSQL</span>
      <div className="w-16 h-12 border border-green-500/30 flex flex-col gap-1 p-1">
        <div className="h-2 w-full bg-green-500/20 rounded-sm"></div>
        <div className="h-2 w-3/4 bg-green-500/20 rounded-sm"></div>
        <div className="h-2 w-full bg-green-500/20 rounded-sm"></div>
      </div>
    </div>
  </div>
);

export const NetworkVisual = () => (
  <div className="my-6 p-4 bg-slate-900 rounded-lg border border-slate-700 flex items-center justify-center gap-4 animate-in fade-in">
    <div className="flex flex-col items-center">
      <Globe className="text-cyan-400" size={24} />
      <span className="text-[10px] text-slate-500 mt-1">Client</span>
    </div>
    <div className="flex flex-col gap-1 items-center w-24">
      <div className="w-full h-px bg-slate-600 relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] text-orange-400">
          HTTPS
        </div>
      </div>
      <div className="w-full h-px bg-slate-600"></div>
    </div>
    <div className="flex flex-col items-center">
      <Shield className="text-purple-400" size={24} />
      <span className="text-[10px] text-slate-500 mt-1">Server</span>
    </div>
  </div>
);
