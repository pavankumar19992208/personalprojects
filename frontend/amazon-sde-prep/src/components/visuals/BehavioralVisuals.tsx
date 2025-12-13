import { useState } from "react";
import {
  Map,
  Car,
  Footprints,
  Bike,
  ArrowRight,
  Bell,
  Smartphone,
  Bot,
  FileText,
  Radio,
  //   CreditCard,
  //   Banknote,
  //   Bitcoin,
} from "lucide-react";

export const StrategyVisual = () => {
  const [strategy, setStrategy] = useState<"car" | "walk" | "bike">("car");

  const getStrategyDetails = () => {
    switch (strategy) {
      case "car":
        return {
          icon: <Car size={24} />,
          color: "bg-blue-500",
          text: "Fastest Route",
          time: "15 min",
          cost: "$5.00",
        };
      case "walk":
        return {
          icon: <Footprints size={24} />,
          color: "bg-green-500",
          text: "Shortest Path",
          time: "45 min",
          cost: "$0.00",
        };
      case "bike":
        return {
          icon: <Bike size={24} />,
          color: "bg-orange-500",
          text: "Eco-Friendly",
          time: "25 min",
          cost: "$1.00",
        };
    }
  };

  const details = getStrategyDetails();

  return (
    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 my-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Map className="w-5 h-5 text-blue-500" />
        The Strategy Pattern: Interchangeable Algorithms
      </h3>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Context (Navigator) */}
        <div className="w-64 h-40 bg-white rounded-xl border-2 border-slate-300 flex flex-col items-center justify-center relative overflow-hidden shadow-lg">
          <div className="absolute top-2 left-2 text-xs font-bold text-slate-400">
            Navigator Context
          </div>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
              A
            </div>
            <ArrowRight className="text-slate-400" />
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
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
            <div className="flex flex-col items-end">
              <span className="text-xs font-mono bg-black/20 px-1.5 py-0.5 rounded mb-1">
                {details.time}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <h4 className="font-bold text-slate-700 mb-1 text-sm">
            Select Strategy:
          </h4>
          <button
            onClick={() => setStrategy("car")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm ${
              strategy === "car"
                ? "bg-blue-50 border-blue-500 text-blue-700"
                : "bg-white border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Car size={16} /> Car Strategy
          </button>
          <button
            onClick={() => setStrategy("walk")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm ${
              strategy === "walk"
                ? "bg-green-50 border-green-500 text-green-700"
                : "bg-white border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Footprints size={16} /> Walk Strategy
          </button>
          <button
            onClick={() => setStrategy("bike")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm ${
              strategy === "bike"
                ? "bg-orange-50 border-orange-500 text-orange-700"
                : "bg-white border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Bike size={16} /> Bike Strategy
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-600 mt-4 text-center">
        The Context (Navigator) stays the same. The Strategy (Route Calculation)
        is swapped at runtime.
      </p>
    </div>
  );
};

export const ObserverVisual = () => {
  const [broadcasting, setBroadcasting] = useState(false);
  const [stockPrice, setStockPrice] = useState(150);

  const handleBroadcast = () => {
    setBroadcasting(true);
    setStockPrice((prev) => prev + 10);
    setTimeout(() => setBroadcasting(false), 2000);
  };

  return (
    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 my-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Bell className="w-5 h-5 text-red-500" />
        The Observer Pattern: Pub/Sub
      </h3>

      <div className="flex flex-col items-center">
        <div className="h-64 w-full relative bg-white rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden shadow-inner">
          {/* Signal Tower (Subject) */}
          <div className="absolute z-20 flex flex-col items-center">
            <div
              className={`w-20 h-20 bg-slate-800 text-white rounded-xl flex flex-col items-center justify-center shadow-xl border-4 border-slate-600 transition-transform ${
                broadcasting ? "scale-110" : ""
              }`}
            >
              <span className="text-xs font-mono text-green-400 mb-1">
                AMZN
              </span>
              <span className="text-xl font-bold">${stockPrice}</span>
            </div>
            <span className="text-xs font-bold mt-2 bg-slate-200 px-2 py-1 rounded text-slate-600">
              Subject
            </span>
          </div>

          {/* Broadcast Waves */}
          {broadcasting && (
            <>
              <div className="absolute w-24 h-24 border-4 border-red-500/50 rounded-full animate-[ping_1.5s_linear_infinite]" />
              <div className="absolute w-48 h-48 border-4 border-red-500/30 rounded-full animate-[ping_1.5s_linear_infinite_0.5s]" />
            </>
          )}

          {/* Observers */}
          {[
            {
              icon: <Smartphone size={20} />,
              label: "App",
              pos: "top-8 left-8 md:left-20",
              color: "bg-blue-100 text-blue-600 border-blue-300",
            },
            {
              icon: <Bot size={20} />,
              label: "Trading Bot",
              pos: "top-8 right-8 md:right-20",
              color: "bg-purple-100 text-purple-600 border-purple-300",
            },
            {
              icon: <FileText size={20} />,
              label: "Logger",
              pos: "bottom-8 left-1/2 -translate-x-1/2",
              color: "bg-amber-100 text-amber-600 border-amber-300",
            },
          ].map((obs, i) => (
            <div
              key={i}
              className={`absolute ${obs.pos} flex flex-col items-center transition-all duration-300`}
            >
              {broadcasting && (
                <div className="absolute -top-8 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded shadow animate-bounce whitespace-nowrap z-30">
                  Price Updated: ${stockPrice}
                </div>
              )}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg ${
                  broadcasting ? "scale-110 ring-4 ring-green-200" : ""
                } ${obs.color}`}
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
          className="mt-6 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold shadow-lg shadow-red-500/30 transition-all disabled:opacity-50 flex items-center gap-2 active:scale-95"
        >
          <Radio size={20} className={broadcasting ? "animate-pulse" : ""} />
          {broadcasting ? "Notifying Observers..." : "Update Stock Price"}
        </button>
      </div>
    </div>
  );
};
