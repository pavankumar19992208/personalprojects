import React, { useState } from "react";
import {
  Car,
  Truck,
  Bike,
  //   CreditCard,
  DollarSign,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Factory,
  Settings,
  Database,
  Server,
  ShieldCheck,
} from "lucide-react";

// --- Visual Components ---

const FactoryVisual = () => {
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
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6 flex flex-col items-center">
      <div className="h-48 w-full relative bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden">
        {/* Factory Machine */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <div className="w-24 h-32 bg-slate-700 rounded-lg border-4 border-slate-500 flex items-center justify-center shadow-xl">
            <Factory className="text-white animate-pulse" size={40} />
          </div>
          <span className="text-xs font-bold mt-2 bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded">
            VehicleFactory
          </span>
        </div>

        {/* Conveyor Belt */}
        <div className="absolute bottom-10 left-0 w-full h-4 bg-slate-300 dark:bg-slate-700 overflow-hidden">
          <div className="w-full h-full bg-[linear-gradient(90deg,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:20px_100%] animate-[slide_1s_linear_infinite]" />
        </div>

        {/* Produced Item */}
        {animating && vehicleType && (
          <div className="absolute top-1/2 -translate-y-1/2 animate-[moveRight_2s_linear_forwards] z-10">
            <div className="flex flex-col items-center bg-white dark:bg-slate-800 p-2 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
              {vehicleType === "car" && (
                <Car size={32} className="text-blue-500" />
              )}
              {vehicleType === "truck" && (
                <Truck size={40} className="text-red-500" />
              )}
              {vehicleType === "bike" && (
                <Bike size={24} className="text-green-500" />
              )}
              <span className="text-[10px] font-mono mt-1">
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
          className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg font-bold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <Car size={16} /> Create Car
        </button>
        <button
          onClick={() => handleCreate("truck")}
          disabled={animating}
          className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg font-bold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <Truck size={16} /> Create Truck
        </button>
        <button
          onClick={() => handleCreate("bike")}
          disabled={animating}
          className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg font-bold hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <Bike size={16} /> Create Bike
        </button>
      </div>
    </div>
  );
};

const StrategyVisual = () => {
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
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6 flex flex-col items-center">
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
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-slate-700 dark:text-slate-300">
            Insert Strategy Cartridge:
          </h4>
          <button
            onClick={() => setStrategy("hourly")}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
              strategy === "hourly"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-blue-500" />
            <div className="flex flex-col items-start">
              <span className="font-bold text-sm">Hourly Rate</span>
              <span className="text-[10px] text-slate-500">$10 * Hours</span>
            </div>
          </button>

          <button
            onClick={() => setStrategy("flat")}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
              strategy === "flat"
                ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-purple-500" />
            <div className="flex flex-col items-start">
              <span className="font-bold text-sm">Weekend Flat</span>
              <span className="text-[10px] text-slate-500">Fixed $20</span>
            </div>
          </button>

          <button
            onClick={() => setStrategy("free")}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
              strategy === "free"
                ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-yellow-500" />
            <div className="flex flex-col items-start">
              <span className="font-bold text-sm">Black Friday</span>
              <span className="text-[10px] text-slate-500">Free!</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const ConcurrencyVisual = () => {
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
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6 flex flex-col items-center">
      <div className="h-48 w-full relative bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden">
        {/* The Critical Section (Spot) */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-24 h-32 border-2 border-dashed border-slate-400 rounded flex items-center justify-center bg-slate-100 dark:bg-slate-900">
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
          <span className="text-[10px] font-bold mt-2 bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded">
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
            <span className="text-[10px] font-bold text-red-500">Thread B</span>
          </div>
          {carBStatus === "blocked" && (
            <div className="absolute -right-20 top-0 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded animate-bounce">
              WAIT! Locked.
            </div>
          )}
        </div>
      </div>

      <button
        onClick={simulateRace}
        className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-bold transition-all flex items-center gap-2"
      >
        <AlertTriangle size={18} /> Simulate Race Condition
      </button>
    </div>
  );
};

const ScalabilityVisual = () => {
  const [scale, setScale] = useState(false);

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6 flex flex-col items-center">
      <div className="h-48 w-full flex items-center justify-center relative">
        <div
          className={`transition-all duration-1000 flex flex-col items-center ${
            scale ? "opacity-0 absolute" : "opacity-100"
          }`}
        >
          <div className="w-20 h-24 bg-slate-800 rounded-lg flex items-center justify-center text-white font-mono text-xs p-2 text-center">
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
            <Server size={40} className="text-slate-600 dark:text-slate-400" />
            <span className="text-[10px] font-bold mt-1">Server 1</span>
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
            <Server size={40} className="text-slate-600 dark:text-slate-400" />
            <span className="text-[10px] font-bold mt-1">Server 2</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => setScale(!scale)}
        className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold transition-all flex items-center gap-2"
      >
        <ShieldCheck size={18} />
        {scale ? "Show LLD View" : "Scale to HLD (Distributed)"}
      </button>
    </div>
  );
};

// --- Main Component ---

interface ParkingLotGuideProps {
  initialPage?: number;
  onPageChange?: (page: number) => void;
  onComplete?: () => void;
}

export const ParkingLotGuide: React.FC<ParkingLotGuideProps> = ({
  initialPage = 0,
  onPageChange,
  onComplete,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = 5;

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
        The Parking Ecosystem
      </h3>

      <div className="prose dark:prose-invert max-w-none mb-6">
        <p className="text-lg text-slate-600 dark:text-slate-300">
          A Parking Lot isn't just a grid of squares. It is a{" "}
          <strong>state machine</strong>.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>The Trap:</strong> Writing "Spaghetti Code" where one class
            does everything.
          </li>
          <li>
            <strong>The Solution:</strong> Break it down.
            <ul className="list-disc pl-5 mt-1 text-sm text-slate-500">
              <li>
                <strong>Manager (Singleton):</strong> Single source of truth.
              </li>
              <li>
                <strong>Gate (Factory):</strong> Issues tickets.
              </li>
              <li>
                <strong>Biller (Strategy):</strong> Calculates cost.
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
        <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
          <Settings size={18} /> The Amazon Context
        </h4>
        <p className="text-sm text-blue-700 dark:text-blue-200 italic">
          "Think of an <strong>Amazon Fulfillment Center</strong>. The 'Parking
          Spots' are 'Inventory Slots'. If two systems try to assign the same
          slot to different products (Race Condition), we have a collision. We
          use Mutex Locks to ensure safety."
        </p>
      </div>
    </div>,

    // Page 2: Factory
    <div
      key="factory"
      className="animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Factory className="text-purple-500" /> Factory Pattern (The Gate)
      </h3>

      <div className="prose dark:prose-invert max-w-none mb-6">
        <p>
          <strong>The Metaphor:</strong> The Ticket Dispenser.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          The machine doesn't care <em>who</em> you are. It just checks your
          size and "Manufactures" a ticket. We decouple object creation from the
          main system.
        </p>
      </div>

      <FactoryVisual />

      <div className="mt-6 bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs overflow-x-auto">
        <pre>{`from enum import Enum
    
    class VehicleType(Enum):
        CAR = 1
        TRUCK = 2
        BIKE = 3
    
    class Vehicle:
        def __init__(self, license_plate, v_type):
            self.license_plate = license_plate
            self.type = v_type
    
    # The Factory
    class VehicleFactory:
        @staticmethod
        def create_vehicle(license_plate, v_type):
            # We can add validation logic here (e.g., license format check)
            return Vehicle(license_plate, v_type)`}</pre>
      </div>
    </div>,

    // Page 3: Strategy
    <div
      key="strategy"
      className="animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <DollarSign className="text-green-500" /> Strategy Pattern (Pricing)
      </h3>

      <div className="prose dark:prose-invert max-w-none mb-6">
        <p>
          <strong>The Metaphor:</strong> The Checkout Kiosk.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          The Kiosk is dumb. It asks the "Brain" (Strategy) plugged into it how
          to calculate the fee. This allows us to swap pricing models (Weekday
          vs Weekend) without rewriting code.
        </p>
      </div>

      <StrategyVisual />

      <div className="mt-6 bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs overflow-x-auto">
        <pre>{`from abc import ABC, abstractmethod
    import math
    
    # 1. The Interface
    class PricingStrategy(ABC):
        @abstractmethod
        def calculate(self, hours): pass
    
    # 2. Concrete Strategies
    class HourlyStrategy(PricingStrategy):
        def __init__(self, rate):
            self.rate = rate
            
        def calculate(self, hours):
            return math.ceil(hours) * self.rate
    
    class FlatRateStrategy(PricingStrategy):
        def calculate(self, hours):
            return 20.0  # Flat fee regardless of time
    
    # 3. Context (The Ticket)
    class Ticket:
        def __init__(self, vehicle, strategy: PricingStrategy):
            self.vehicle = vehicle
            self.strategy = strategy # Plug-and-play strategy
            
        def get_cost(self, hours_parked):
            return self.strategy.calculate(hours_parked)`}</pre>
      </div>
    </div>,

    // Page 4: Concurrency
    <div
      key="concurrency"
      className="animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Lock className="text-red-500" /> Singleton & Concurrency
      </h3>

      <div className="prose dark:prose-invert max-w-none mb-6">
        <p>
          <strong>The Challenge:</strong> The Race Condition.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          If Spot #10 is the only one left, and two gates try to book it at the
          exact same millisecond, we get a collision. We need a{" "}
          <strong>Mutex Lock</strong>.
        </p>
      </div>

      <ConcurrencyVisual />

      <div className="mt-6 bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs overflow-x-auto">
        <pre>{`import threading
    import time
    
    class ParkingLotManager:
        _instance = None
        _lock = threading.Lock() # Lock for Singleton creation
    
        # Singleton Implementation
        def __new__(cls):
            if not cls._instance:
                with cls._lock:
                    if not cls._instance:
                        cls._instance = super(ParkingLotManager, cls).__new__(cls)
                        cls._instance._initialize()
            return cls._instance
    
        def _initialize(self):
            self.spots = [True] * 10 # True = Empty, False = Occupied
            self.entry_lock = threading.Lock() # THE CRITICAL LOCK
    
        def park_vehicle(self, vehicle_id):
            # ACQUIRE LOCK: No one else can touch 'spots' right now
            with self.entry_lock:
                for i in range(len(self.spots)):
                    if self.spots[i]: # If spot is free
                        # Simulate processing delay to prove the lock works
                        time.sleep(0.1) 
                        self.spots[i] = False
                        print(f"Vehicle {vehicle_id} parked at Spot {i}")
                        return i # Return Spot ID
                
                print(f"Vehicle {vehicle_id}: Parking Full!")
                return -1
            # RELEASE LOCK automatically`}</pre>
      </div>
    </div>,

    // Page 5: Cheat Sheet
    <div
      key="cheatsheet"
      className="animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
        Interview Cheat Sheet
      </h3>

      <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 mb-6">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold">
            <tr>
              <th className="p-3">Feature</th>
              <th className="p-3">Pattern</th>
              <th className="p-3">Why?</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
            <tr>
              <td className="p-3 font-bold">Global Access</td>
              <td className="p-3 text-blue-600">Singleton</td>
              <td className="p-3">
                One physical parking lot = One state manager.
              </td>
            </tr>
            <tr>
              <td className="p-3 font-bold">Creation</td>
              <td className="p-3 text-purple-600">Factory</td>
              <td className="p-3">
                Decouples "What is a Truck?" from "How to park".
              </td>
            </tr>
            <tr>
              <td className="p-3 font-bold">Pricing</td>
              <td className="p-3 text-green-600">Strategy</td>
              <td className="p-3">
                Change pricing without redeploying system.
              </td>
            </tr>
            <tr>
              <td className="p-3 font-bold">Safety</td>
              <td className="p-3 text-red-600">Mutex/Lock</td>
              <td className="p-3">Prevents double-booking collisions.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ScalabilityVisual />

      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">
          Scalability (HLD Bridge)
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <strong>Interviewer:</strong> "What if we have 10,000 spots and 50
          gates?"
          <br />
          <strong>You:</strong> "For a distributed system, I would use a{" "}
          <strong>Distributed Lock</strong> (like Redis Redlock) or Database Row
          Locking."
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
