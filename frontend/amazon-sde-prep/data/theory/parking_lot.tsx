import { Factory, DollarSign, Lock, ShieldCheck } from "lucide-react";

export const PARKING_LOT_THEORY = `
# The Final Boss: Designing a Multilevel Parking Lot

## 📊 At a Glance

  * **Amazon Frequency:** **The Final Boss** (This is the most common comprehensive LLD question).
  * **Importance:** **Critical** (It tests instantiation, logic, *and* concurrency).
  * **Difficulty:** **Hard** (Easy to start, very hard to finish correctly).

### 🧠 Before You Start

**The Mindset Shift:** Most candidates fail this because they treat it like a database design problem. They create a table of spots and write SQL queries.
**Wrong.** In LLD, this is a **State Machine**.

  * **State:** Which spots are free? Which are locked?
  * **Concurrency:** What happens if two threads try to book the last spot at $t=0$?

---

## Part 1: The Ecosystem (The Core Classes)

### The Trap: The "God Class"

Junior engineers write one giant class called \`ParkingLot\` that handles:

1.  Parking cars.
2.  Calculating fees.
3.  Printing tickets.
4.  Opening gates.

This violates the **Single Responsibility Principle (SRP)**. If we change the printer, we might break the parking logic.

### The Solution: Divide and Conquer

We break the system into three distinct actors using design patterns:

1.  **The Manager (Singleton):** The central brain. It knows the state of every spot.
2.  **The Gate (Factory):** It manufactures tickets and vehicle objects.
3.  **The Biller (Strategy):** It calculates the price.

**Amazon Context:** "Think of an **Amazon Fulfillment Center**. The 'Parking Spots' are 'Inventory Slots'. When a robot places a product, it must lock that slot so no other robot tries to place an item there."

---

## Part 2: Factory Pattern (The Entry Gate)

### The Concept

The entry gate is a **Factory**. When a vehicle arrives, the gate doesn't care about the driver. It only cares about the **Type** (Car, Truck, Bike) to issue the correct ticket.

**The Metaphor:** **The Ticket Dispenser.**
You press a button. The machine "manufactures" a \`Ticket\` object linked to a \`Vehicle\` object.

<<<FactoryVisual>>>

### 🐍 Python Implementation

\`\`\`python
from enum import Enum

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
        return Vehicle(license_plate, v_type)
\`\`\`

---

## Part 3: Strategy Pattern (The Pricing Engine)

### The Concept

How much do we charge?

  * **Weekday:** Hourly rate.
  * **Weekend:** Flat rate.
  * **Black Friday:** Free.

If we use \`if/else\` statements inside the \`Ticket\` class, we have to modify the core class every time marketing changes the price. Instead, we plug in a **Strategy**.

**The Metaphor:** **The Payment Kiosk.**
The Kiosk is a dumb box. It has a slot. We plug in a "Pricing Cartridge" (Strategy). To change prices, we just swap the cartridge.

<<<StrategyVisual>>>

### 🐍 Python Implementation

\`\`\`python
from abc import ABC, abstractmethod
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
        return self.strategy.calculate(hours_parked)
\`\`\`

---

## Part 4: Concurrency (The Boss Battle) ⚠️

This is where 50% of candidates fail.

### The Challenge: The Race Condition

Imagine the lot is full except for **Spot #10**.

1.  **Gate A (Thread A):** Checks database. Sees Spot #10 is empty.
2.  **Gate B (Thread B):** Checks database. Sees Spot #10 is empty.
3.  **Gate A:** Assigns Spot #10 to Car A.
4.  **Gate B:** Assigns Spot #10 to Car B.
5.  **Result:** **Collision.** Two cars, one spot.

### The Solution: Mutex Locks

We must **Lock** the critical section (the code that assigns the spot). Only one thread can enter this section at a time.

<<<ConcurrencyVisual>>>

### 🐍 Python Implementation

\`\`\`python
import threading
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
        # RELEASE LOCK automatically
\`\`\`

---

## 🚀 Interview Cheat Sheet

| Feature | Pattern | Why? |
| :--- | :--- | :--- |
| **Global Access** | **Singleton** | There is only one physical parking lot. We need one state manager. |
| **Object Creation** | **Factory** | Decouples the logic of "What is a Truck?" from "How do I park it?" |
| **Pricing** | **Strategy** | Allows changing pricing models without redeploying the whole system. |
| **Safety** | **Mutex/Lock** | Prevents double-booking when multiple gates operate simultaneously. |

### 🧠 The "Bar Raiser" Question

**Interviewer:** "This works for one server. What if we have 50 gates and the system is distributed across multiple servers?"
**You:** "Python's \`threading.Lock\` only works on one machine. For a distributed system, I would use a **Distributed Lock** (like Redis Redlock) or a Database Row Lock (\`SELECT ... FOR UPDATE\`) to ensure consistency across servers."

<<<ScalabilityVisual>>>
`;

export const PARKING_LOT_TIPS = [
  {
    title: "Global Access",
    icon: ShieldCheck,
    color: "bg-blue-500",
    dont: "Pass the manager instance around everywhere.",
    do: "Use Singleton for the ParkingLotManager to ensure one source of truth.",
  },
  {
    title: "Object Creation",
    icon: Factory,
    color: "bg-purple-500",
    dont: "Use 'new Car()' everywhere.",
    do: "Use a Factory to decouple vehicle creation logic.",
  },
  {
    title: "Pricing",
    icon: DollarSign,
    color: "bg-green-500",
    dont: "Use if/else for pricing logic.",
    do: "Use Strategy pattern to make pricing pluggable.",
  },
  {
    title: "Safety",
    icon: Lock,
    color: "bg-red-500",
    dont: "Ignore concurrency.",
    do: "Use Mutex Locks to prevent race conditions on shared resources (spots).",
  },
];
