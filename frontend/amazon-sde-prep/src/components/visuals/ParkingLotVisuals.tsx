import { useState } from "react";
import {
  Car,
  Truck,
  Bike,
  Factory,
  Lock,
  Unlock,
  AlertTriangle,
  Server,
  Database,
  ShieldCheck,
} from "lucide-react";

export const FactoryVisual = () => {
  const [vehicleType, setVehicleType] = useState<
    "car" | "truck" | "bike" | null
  >(null);
  const [animating, setAnimating] = useState(false);

  const handleCreate = (type: "car" | "truck" | "bike") => {
    if (animating) return;
    setAnimating(true);
    setVehicleType(type);
    setTimeout(() => {
      setAnimating(false);
    }, 2000);
  };

  return (
    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 my-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Factory className="w-5 h-5 text-purple-500" />
        The Factory Pattern: Vehicle Production
      </h3>

      <div className="flex flex-col items-center">
        <div className="h-48 w-full relative bg-white rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden shadow-inner">
          {/* Factory Machine */}
          <div className="absolute left-10 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="w-24 h-32 bg-slate-700 rounded-lg border-4 border-slate-500 flex items-center justify-center shadow-xl">
              <Factory className="text-white animate-pulse" size={40} />
            </div>
            <span className="text-xs font-bold mt-2 bg-slate-200 px-2 py-1 rounded text-slate-600">
              VehicleFactory
            </span>
          </div>

          {/* Conveyor Belt */}
          <div className="absolute bottom-10 left-0 w-full h-4 bg-slate-300 overflow-hidden">
            <div className="w-full h-full bg-[linear-gradient(90deg,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:20px_100%] animate-[slide_1s_linear_infinite]" />
          </div>

          {/* Produced Item */}
          {animating && vehicleType && (
            <div className="absolute top-1/2 -translate-y-1/2 animate-[moveRight_2s_linear_forwards] z-10">
              <div className="flex flex-col items-center bg-white p-2 rounded-lg shadow-lg border border-slate-200">
                {vehicleType === "car" && (
                  <Car size={32} className="text-blue-500" />
                )}
                {vehicleType === "truck" && (
                  <Truck size={40} className="text-red-500" />
                )}
                {vehicleType === "bike" && (
                  <Bike size={24} className="text-green-500" />
                )}
                <span className="text-[10px] font-mono mt-1 text-slate-600">
                  {vehicleType.toUpperCase()}_OBJ
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => handleCreate("car")}
            disabled={animating}
            className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-bold hover:bg-blue-200 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
          >
            <Car size={16} /> Create Car
          </button>
          <button
            onClick={() => handleCreate("truck")}
            disabled={animating}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-bold hover:bg-red-200 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
          >
            <Truck size={16} /> Create Truck
          </button>
          <button
            onClick={() => handleCreate("bike")}
            disabled={animating}
            className="px-4 py-2 bg-green-100 text-green-600 rounded-lg font-bold hover:bg-green-200 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
          >
            <Bike size={16} /> Create Bike
          </button>
        </div>
      </div>
    </div>
  );
};

export const StrategyVisual = () => {
  const [strategy, setStrategy] = useState<"hourly" | "flat" | "free">(
    "hourly"
  );

  const getCost = (hours: number) => {
    switch (strategy) {
      case "hourly":
        return hours * 10;
      case "flat":
        return 20;
      case "free":
        return 0;
    }
  };

  return (
    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 my-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-green-500 flex items-center justify-center text-white font-bold text-xs">
          $
        </div>
        The Strategy Pattern: Pricing Engine
      </h3>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full">
        {/* Kiosk */}
        <div className="w-48 h-64 bg-slate-800 rounded-xl border-4 border-slate-600 flex flex-col items-center p-4 shadow-2xl relative">
          <div className="w-full h-24 bg-green-900 rounded border-2 border-green-700 mb-4 flex items-center justify-center font-mono text-green-400 text-2xl shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
            ${getCost(5)}.00
          </div>
          <div className="w-full h-2 bg-black rounded-full mb-4" />

          {/* Cartridge Slot */}
          <div className="w-32 h-20 bg-slate-900 rounded border border-slate-700 flex items-center justify-center relative overflow-hidden">
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                strategy === "hourly"
                  ? "bg-blue-600"
                  : strategy === "flat"
                  ? "bg-purple-600"
                  : "bg-yellow-500"
              }`}
            >
              <span className="text-white font-bold text-xs uppercase">
                {strategy} Mode
              </span>
            </div>
          </div>

          <div className="absolute bottom-2 text-[10px] text-slate-400">
            Parking Kiosk v1.0
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <h4 className="font-bold text-slate-700 text-sm">
            Insert Strategy Cartridge:
          </h4>
          <button
            onClick={() => setStrategy("hourly")}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all text-sm ${
              strategy === "hourly"
                ? "border-blue-500 bg-blue-50"
                : "border-slate-200 bg-white hover:bg-slate-50"
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-blue-500" />
            <div className="flex flex-col items-start">
              <span className="font-bold text-slate-700">Hourly Rate</span>
              <span className="text-[10px] text-slate-500">$10 * Hours</span>
            </div>
          </button>

          <button
            onClick={() => setStrategy("flat")}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all text-sm ${
              strategy === "flat"
                ? "border-purple-500 bg-purple-50"
                : "border-slate-200 bg-white hover:bg-slate-50"
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-purple-500" />
            <div className="flex flex-col items-start">
              <span className="font-bold text-slate-700">Weekend Flat</span>
              <span className="text-[10px] text-slate-500">Fixed $20</span>
            </div>
          </button>

          <button
            onClick={() => setStrategy("free")}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all text-sm ${
              strategy === "free"
                ? "border-yellow-500 bg-yellow-50"
                : "border-slate-200 bg-white hover:bg-slate-50"
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-yellow-500" />
            <div className="flex flex-col items-start">
              <span className="font-bold text-slate-700">Black Friday</span>
              <span className="text-[10px] text-slate-500">Free!</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export const ConcurrencyVisual = () => {
  const [locked, setLocked] = useState(false);
  const [carAStatus, setCarAStatus] = useState<
    "waiting" | "parking" | "parked"
  >("waiting");
  const [carBStatus, setCarBStatus] = useState<
    "waiting" | "blocked" | "parked"
  >("waiting");

  const simulateRace = () => {
    setCarAStatus("waiting");
    setCarBStatus("waiting");
    setLocked(false);

    // Step 1: Car A approaches and locks
    setTimeout(() => {
      setLocked(true);
      setCarAStatus("parking");
      setCarBStatus("blocked"); // Car B is blocked by the lock
    }, 1000);

    // Step 2: Car A finishes
    setTimeout(() => {
      setCarAStatus("parked");
      setLocked(false); // Unlock
    }, 3000);

    // Step 3: Car B can now try (but spot is taken)
    setTimeout(() => {
      setCarBStatus("parked"); // In a real scenario, it would see "Full", but for visual simplicity we show flow
    }, 4000);
  };

  return (
    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 my-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Lock className="w-5 h-5 text-red-500" />
        Concurrency: The Race Condition
      </h3>

      <div className="flex flex-col items-center">
        <div className="h-48 w-full relative bg-white rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden shadow-inner">
          {/* The Critical Section (Spot) */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 w-24 h-32 border-2 border-dashed border-slate-400 rounded flex items-center justify-center bg-slate-50">
            <span className="text-xs font-bold text-slate-400 absolute top-2">
              Spot #10
            </span>
            {carAStatus === "parked" && (
              <Car className="text-blue-500" size={40} />
            )}
          </div>

          {/* The Lock (Mutex) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
                locked ? "bg-red-500 scale-110" : "bg-green-500"
              }`}
            >
              {locked ? (
                <Lock className="text-white" size={32} />
              ) : (
                <Unlock className="text-white" size={32} />
              )}
            </div>
            <span className="text-[10px] font-bold mt-2 bg-slate-200 px-2 py-1 rounded text-slate-600">
              Mutex Lock
            </span>
          </div>

          {/* Car A (Thread A) */}
          <div
            className={`absolute left-10 top-10 transition-all duration-1000 ${
              carAStatus === "parking"
                ? "translate-x-[150px] opacity-50"
                : carAStatus === "parked"
                ? "opacity-0"
                : ""
            }`}
          >
            <div className="flex flex-col items-center">
              <Car className="text-blue-500" size={32} />
              <span className="text-[10px] font-bold text-blue-500">
                Thread A
              </span>
            </div>
          </div>

          {/* Car B (Thread B) */}
          <div
            className={`absolute left-10 bottom-10 transition-all duration-1000 ${
              carBStatus === "blocked"
                ? "translate-x-[50px]"
                : carBStatus === "parked"
                ? "translate-x-[150px] opacity-50"
                : ""
            }`}
          >
            <div className="flex flex-col items-center">
              <Car className="text-red-500" size={32} />
              <span className="text-[10px] font-bold text-red-500">
                Thread B
              </span>
            </div>
            {carBStatus === "blocked" && (
              <div className="absolute -right-20 top-0 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded animate-bounce whitespace-nowrap">
                WAIT! Locked.
              </div>
            )}
          </div>
        </div>

        <button
          onClick={simulateRace}
          className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-bold transition-all flex items-center gap-2 text-sm"
        >
          <AlertTriangle size={18} /> Simulate Race Condition
        </button>
      </div>
    </div>
  );
};

export const ScalabilityVisual = () => {
  const [scale, setScale] = useState(false);

  return (
    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 my-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-indigo-500" />
        Scalability: Distributed Locking
      </h3>

      <div className="flex flex-col items-center">
        <div className="h-48 w-full flex items-center justify-center relative bg-white rounded-lg border border-slate-200 shadow-inner overflow-hidden">
          <div
            className={`transition-all duration-1000 flex flex-col items-center ${
              scale ? "opacity-0 absolute" : "opacity-100"
            }`}
          >
            <div className="w-24 h-24 bg-slate-800 rounded-lg flex items-center justify-center text-white font-mono text-xs p-2 text-center shadow-lg">
              Python Script
              <br />
              (Single Thread)
            </div>
          </div>

          <div
            className={`transition-all duration-1000 flex items-center gap-8 ${
              scale ? "opacity-100 scale-100" : "opacity-0 scale-50 absolute"
            }`}
          >
            <div className="flex flex-col items-center">
              <Server size={40} className="text-slate-600" />
              <span className="text-[10px] font-bold mt-1 text-slate-500">
                Server 1
              </span>
            </div>

            <div className="flex flex-col items-center animate-pulse">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center shadow-lg">
                <Database size={32} className="text-white" />
              </div>
              <span className="text-xs font-bold mt-2 text-red-600">
                Redis Lock
              </span>
            </div>

            <div className="flex flex-col items-center">
              <Server size={40} className="text-slate-600" />
              <span className="text-[10px] font-bold mt-1 text-slate-500">
                Server 2
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setScale(!scale)}
          className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold transition-all flex items-center gap-2 text-sm"
        >
          <ShieldCheck size={18} />
          {scale ? "Show LLD View" : "Scale to HLD (Distributed)"}
        </button>
      </div>
    </div>
  );
};
