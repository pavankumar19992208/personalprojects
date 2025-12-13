import React from "react";
import {
  Server,
  Users,
  ArrowRight,
  ArrowDown,
  Database,
  Zap,
  Network,
  Scale,
  ShieldAlert,
} from "lucide-react";

export const ScalabilityVisual = () => (
  <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="text-center mb-2">
      <h4 className="font-bold text-slate-700">Scaling Strategies</h4>
      <p className="text-xs text-slate-500">Vertical vs. Horizontal</p>
    </div>

    <div className="grid grid-cols-2 gap-8">
      {/* Vertical Scaling */}
      <div className="flex flex-col items-center gap-3">
        <div className="text-xs font-bold text-slate-500 uppercase">
          Vertical (Scale Up)
        </div>
        <div className="relative flex items-end justify-center h-24 w-full">
          <div className="w-16 h-24 bg-slate-800 rounded-lg flex items-center justify-center shadow-xl z-10 border-b-4 border-slate-900">
            <Server size={32} className="text-white" />
          </div>
          <div className="absolute -right-2 -top-2 bg-yellow-100 text-yellow-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-yellow-200">
            $$$
          </div>
        </div>
        <p className="text-[10px] text-center text-slate-400">
          One "Ferrari" Server
        </p>
      </div>

      {/* Horizontal Scaling */}
      <div className="flex flex-col items-center gap-3">
        <div className="text-xs font-bold text-slate-500 uppercase">
          Horizontal (Scale Out)
        </div>
        <div className="grid grid-cols-2 gap-2 h-24 content-center">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-sm"
            >
              <Server size={14} className="text-white" />
            </div>
          ))}
        </div>
        <p className="text-[10px] text-center text-slate-400">
          Army of "Cyclists"
        </p>
      </div>
    </div>
  </div>
);

export const LoadBalancerVisual = () => (
  <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="text-center mb-2">
      <h4 className="font-bold text-slate-700">
        The Traffic Cop (Load Balancer)
      </h4>
    </div>

    <div className="flex items-center gap-4 w-full justify-center">
      {/* Users */}
      <div className="flex flex-col gap-1">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center border-2 border-white">
            <Users size={14} />
          </div>
          <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center border-2 border-white">
            <Users size={14} />
          </div>
        </div>
        <span className="text-[10px] text-center text-slate-400">Traffic</span>
      </div>

      <ArrowRight className="text-slate-300" />

      {/* LB */}
      <div className="w-16 h-16 bg-purple-600 rounded-lg flex flex-col items-center justify-center shadow-lg relative z-10">
        <Network className="text-white mb-1" size={24} />
        <span className="text-[8px] text-white font-bold uppercase">LB</span>
      </div>

      {/* Distribution */}
      <div className="flex flex-col justify-center gap-2">
        <div className="flex items-center gap-2">
          <ArrowRight size={14} className="text-slate-300 -rotate-12" />
          <div className="w-8 h-8 bg-blue-100 border border-blue-300 rounded flex items-center justify-center">
            <Server size={14} className="text-blue-600" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ArrowRight size={14} className="text-slate-300" />
          <div className="w-8 h-8 bg-blue-100 border border-blue-300 rounded flex items-center justify-center">
            <Server size={14} className="text-blue-600" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ArrowRight size={14} className="text-slate-300 rotate-12" />
          <div className="w-8 h-8 bg-blue-100 border border-blue-300 rounded flex items-center justify-center">
            <Server size={14} className="text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const CAPVisual = () => (
  <div className="flex flex-col items-center gap-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="text-center">
      <h4 className="font-bold text-slate-700">CAP Theorem Trade-offs</h4>
      <p className="text-xs text-slate-500">Pick Two (But P is mandatory)</p>
    </div>

    <div className="flex gap-8">
      {/* CP Strategy */}
      <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg border border-slate-200 shadow-sm w-32">
        <div className="flex gap-1">
          <div className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">
            C
          </div>
          <div className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">
            P
          </div>
        </div>
        <div className="text-xs font-bold text-slate-700">Banking (CP)</div>
        <p className="text-[10px] text-slate-500 text-center leading-tight">
          "Transaction Failed" is better than wrong balance.
        </p>
      </div>

      {/* AP Strategy */}
      <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg border border-slate-200 shadow-sm w-32">
        <div className="flex gap-1">
          <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
            A
          </div>
          <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
            P
          </div>
        </div>
        <div className="text-xs font-bold text-slate-700">Social (AP)</div>
        <p className="text-[10px] text-slate-500 text-center leading-tight">
          Show old feed rather than error page.
        </p>
      </div>
    </div>
  </div>
);

export const CachingVisual = () => (
  <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="text-center mb-2">
      <h4 className="font-bold text-slate-700">The Speed Layer (Caching)</h4>
    </div>

    <div className="flex items-center gap-2 w-full justify-center">
      <div className="flex flex-col items-center">
        <Users size={20} className="text-slate-400 mb-1" />
        <span className="text-[10px] text-slate-400">App</span>
      </div>

      <ArrowRight size={16} className="text-slate-300" />

      {/* Cache Layer */}
      <div className="flex flex-col items-center relative group">
        <div className="w-16 h-20 bg-yellow-100 border-2 border-yellow-400 rounded-lg flex flex-col items-center justify-center shadow-sm z-10">
          <Zap className="text-yellow-600 mb-1" size={20} />
          <span className="text-[10px] font-bold text-yellow-800">RAM</span>
        </div>
        <div className="absolute -top-6 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 opacity-0 group-hover:opacity-100 transition-opacity">
          Hit: &lt;1ms
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <ArrowRight size={16} className="text-slate-300" />
        <span className="text-[8px] text-slate-400">Miss</span>
      </div>

      {/* DB Layer */}
      <div className="flex flex-col items-center relative group">
        <div className="w-16 h-20 bg-slate-200 border-2 border-slate-300 rounded-lg flex flex-col items-center justify-center shadow-sm">
          <Database className="text-slate-500 mb-1" size={20} />
          <span className="text-[10px] font-bold text-slate-600">Disk</span>
        </div>
        <div className="absolute -top-6 text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded border border-red-100 opacity-0 group-hover:opacity-100 transition-opacity">
          Read: 10ms
        </div>
      </div>
    </div>
  </div>
);
