// import React from "react";
import {
  Crown,
  Lock,
  User,
  Package,
  //   Truck,
  Ship,
  ArrowRight,
  //   Layers,
  Check,
} from "lucide-react";

export const SingletonVisual = () => (
  <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="text-center mb-2">
      <h4 className="font-bold text-slate-700">The Throne Room (Singleton)</h4>
      <p className="text-xs text-slate-500">Only one seat available.</p>
    </div>
    <div className="relative">
      {/* The Throne */}
      <div className="w-24 h-32 bg-yellow-100 border-4 border-yellow-400 rounded-t-full flex items-center justify-center shadow-lg relative z-10">
        <Crown className="text-yellow-600 w-10 h-10" />
        {/* Lock Icon indicating thread safety */}
        <div className="absolute -bottom-3 bg-slate-800 text-white p-1.5 rounded-full border-2 border-white shadow-sm">
          <Lock size={14} />
        </div>
      </div>

      {/* Threads waiting */}
      <div className="absolute top-1/2 -left-16 -translate-y-1/2 flex flex-col gap-2 opacity-50">
        <div className="flex items-center gap-1">
          <User size={16} className="text-slate-400" />
          <span className="text-[10px] font-mono text-slate-400">Thread A</span>
        </div>
        <div className="flex items-center gap-1">
          <User size={16} className="text-slate-400" />
          <span className="text-[10px] font-mono text-slate-400">Thread B</span>
        </div>
      </div>
    </div>
  </div>
);

export const FactoryVisual = () => (
  <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="text-center mb-2">
      <h4 className="font-bold text-slate-700">The Logistics Box (Factory)</h4>
      <p className="text-xs text-slate-500">Input Type &gt; Output Object.</p>
    </div>
    <div className="flex items-center gap-2">
      {/* Input */}
      <div className="flex flex-col items-center gap-1">
        <div className="bg-white border border-slate-200 px-2 py-1 rounded text-xs font-mono text-slate-600 shadow-sm">
          "sea"
        </div>
        <ArrowRight size={16} className="text-slate-400" />
      </div>

      {/* The Factory */}
      <div className="w-24 h-24 bg-slate-800 rounded-xl flex flex-col items-center justify-center shadow-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
        <Package className="text-white relative z-10 mb-1" />
        <span className="text-[10px] text-slate-300 font-bold relative z-10 uppercase tracking-wider">
          Factory
        </span>

        {/* Gear animation hint */}
        <div className="absolute -right-4 -bottom-4 w-12 h-12 border-4 border-dashed border-slate-600 rounded-full animate-spin-slow opacity-20" />
      </div>

      {/* Output */}
      <div className="flex flex-col items-center gap-1">
        <ArrowRight size={16} className="text-slate-400" />
        <div className="bg-blue-100 border border-blue-200 p-2 rounded-lg text-blue-600 shadow-sm">
          <Ship size={20} />
        </div>
      </div>
    </div>
  </div>
);

export const BuilderVisual = () => (
  <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="text-center mb-2">
      <h4 className="font-bold text-slate-700">The Assembly Line (Builder)</h4>
      <p className="text-xs text-slate-500">Step-by-step construction.</p>
    </div>
    <div className="flex items-end gap-1">
      {/* Step 1: Bun */}
      <div className="flex flex-col items-center gap-1 animate-in slide-in-from-left-4 fade-in duration-500 delay-100">
        <div className="w-16 h-4 bg-orange-200 rounded-full border border-orange-300" />
        <span className="text-[10px] text-slate-400">1. Bun</span>
      </div>

      <ArrowRight size={12} className="text-slate-300 mb-2" />

      {/* Step 2: Patty */}
      <div className="flex flex-col items-center gap-1 animate-in slide-in-from-left-4 fade-in duration-500 delay-200">
        <div className="flex flex-col -space-y-1">
          <div className="w-16 h-4 bg-orange-200 rounded-t-full border border-orange-300" />
          <div className="w-16 h-3 bg-amber-700 rounded-sm border border-amber-800" />
          <div className="w-16 h-4 bg-orange-200 rounded-b-full border border-orange-300" />
        </div>
        <span className="text-[10px] text-slate-400">2. Patty</span>
      </div>

      <ArrowRight size={12} className="text-slate-300 mb-2" />

      {/* Step 3: Cheese (Final) */}
      <div className="flex flex-col items-center gap-1 animate-in slide-in-from-left-4 fade-in duration-500 delay-300">
        <div className="flex flex-col -space-y-1 relative">
          <div className="absolute -right-2 -top-2 bg-green-500 text-white rounded-full p-0.5 shadow-sm z-20">
            <Check size={10} />
          </div>
          <div className="w-16 h-4 bg-orange-200 rounded-t-full border border-orange-300 z-10" />
          <div className="w-18 h-1 bg-yellow-400 z-10 mx-auto" />
          <div className="w-16 h-3 bg-amber-700 rounded-sm border border-amber-800" />
          <div className="w-16 h-4 bg-orange-200 rounded-b-full border border-orange-300" />
        </div>
        <span className="text-[10px] font-bold text-slate-600">3. Done</span>
      </div>
    </div>
  </div>
);
