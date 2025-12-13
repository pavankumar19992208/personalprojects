import {
  Crown,
  //   Package,
  //   Layers,
  Settings,
  CreditCard,
  Search,
} from "lucide-react";

export const CREATIONAL_THEORY = `

# The Architects of Code: Mastering Creational Patterns

## 📊 At a Glance

- **Amazon Frequency:** **High** (Appears in almost every LLD round involving object creation).
- **Importance:** **High** (The foundation of flexible systems).
- **Difficulty:** **Easy** (Conceptually simple, but implementation details matter).

### 🧠 Before You Start

**The Mindset Shift:** In university, you create objects like this: \`my_obj = new DatabaseClass()\`.
In Amazon LLD, this is a **sin**.

- **Why?** It creates a "hard dependency." If you want to switch databases later, you have to find-and-replace code in 500 files.
- **The Goal:** Move the logic of *creation* away from the logic of *execution*.

---

## Part 1: The Singleton Pattern (The President)

### The Concept

Ensure a class has **only one instance** and provide a global point of access to it.

**The Metaphor:** **The White House.**
There are many houses in the US, but there is only one White House. If you mail a letter to "The President," the post office doesn't need to check which President you mean. There is only one active state at a time.

### 🎨 Visualizing the Logic

Imagine a **Throne Room** with a single chair.

<<<SingletonVisual>>>

1.  **Attempt 1:** Thread A enters. The chair is empty. Thread A sits down (Instance Created).
2.  **Attempt 2:** Thread B enters. The chair is occupied. Thread B is blocked or returned the existing King (Instance Returned).

### 🐍 Python Implementation (The Interview Standard)

**Critical:** A basic Singleton is not enough. You must write a **Thread-Safe** Singleton using Double-Checked Locking.

\`\`\`python
import threading

class DatabaseConnection:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            # Critical Section: Only one thread enters here
            with cls._lock:
                # Double Check: Ensure it wasn't created while waiting for lock
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
        return cls._instance
\`\`\`

**⚠️ The Trap:** Do not use Singleton just to share global variables. This is an "Anti-Pattern" because it makes Unit Testing difficult (state persists between tests).

---

## Part 2: The Factory Pattern (The Logistics Center)

### The Concept

Define an interface for creating an object, but let subclasses decide which class to instantiate.

**The Metaphor:** **Amazon Logistics.**
The central dispatch system doesn't care *how* a package gets there. It just looks at the destination.

- If destination is "Overseas" -> Create \`Ship()\`.
- If destination is "Local" -> Create \`Truck()\`.

### 🎨 Visualizing the Logic

Imagine a **Black Box Machine**.

<<<FactoryVisual>>>

1.  **Input:** You throw in a string "Road".
2.  **Process:** The machine (Factory) contains the \`if/else\` logic.
3.  **Output:** A shiny new \`Truck\` object pops out.
    The client code (You) never sees the \`new Truck()\` line.

### 🐍 Python Implementation

\`\`\`python
class LogisticsFactory:
    @staticmethod
    def get_transport(transport_type):
        if transport_type == "road":
            return Truck()
        elif transport_type == "sea":
            return Ship()
        else:
            raise ValueError("Unknown transport type")

# Usage
vehicle = LogisticsFactory.get_transport("road")
vehicle.deliver() 
\`\`\`

**Why Amazon Cares:** If they add "Drone Delivery" next year, they only change the *Factory* code. The millions of lines of code calling \`get_transport()\` remain untouched.

---

## Part 3: The Builder Pattern (The Subway Sandwich)

### The Concept

Separate the construction of a complex object from its representation. It allows you to create different flavors of an object using the same construction code.

**The Metaphor:** **Subway Sandwich Artist.**
You don't walk in and find a pre-made sandwich. You say:

1.  "Start with Italian Bread."
2.  "Add Turkey."
3.  "Add Lettuce."
4.  "Skip Onions."
5.  "Build."

### 🎨 Visualizing the Logic

Imagine an **Assembly Line**.

<<<BuilderVisual>>>

- The object travels down a conveyor belt.
- Station 1 adds the Bun.
- Station 2 adds the Patty.
- Station 3 adds the Cheese.
  At the end, you have a finished Burger, customized to your needs.

### 🐍 Python Implementation (Fluent Interface)

This solves the **Telescoping Constructor Problem** (e.g., \`new Burger(true, false, true, false, true...)\`).

\`\`\`python
class BurgerBuilder:
    def __init__(self):
        self.bun = None
        self.patty = None
        self.cheese = False

    def add_bun(self, type):
        self.bun = type
        return self # Returning self allows chaining!

    def add_patty(self, type):
        self.patty = type
        return self

    def add_cheese(self):
        self.cheese = True
        return self

    def build(self):
        return Burger(self.bun, self.patty, self.cheese)

# Usage: Clean and Readable
my_lunch = (BurgerBuilder()
            .add_bun("Sesame")
            .add_patty("Beef")
            .add_cheese()
            .build())
\`\`\`

---

## 🚀 Application: When to use what?

In your interview, listen for these "Triggers":

1.  **"We need a central configuration manager..."**
    - 👉 **Singleton.** (Only one config exists).
2.  **"The system needs to support different payment methods (Credit, PayPal, Crypto), and we might add more later..."**
    - 👉 **Factory.** (Decouple the creation logic).
3.  **"We need to create a complex Search Request object with many optional filters..."**
    - 👉 **Builder.** (Avoid a constructor with 20 \`null\` arguments).
`;

export const CREATIONAL_TIPS = [
  {
    title: "Singleton Trigger",
    icon: Settings,
    color: "bg-slate-500",
    dont: "Use Singleton for everything (Global State).",
    do: "Use it for Config, Logging, or DB Connections.",
  },
  {
    title: "Factory Trigger",
    icon: CreditCard,
    color: "bg-blue-500",
    dont: "Call 'new Payment()' directly in business logic.",
    do: "Use a Factory to decide between Credit/PayPal/Crypto.",
  },
  {
    title: "Builder Trigger",
    icon: Search,
    color: "bg-orange-500",
    dont: "Create constructors with 10+ arguments (Telescoping).",
    do: "Use Builder for complex objects with optional fields.",
  },
  {
    title: "Thread Safety",
    icon: Crown,
    color: "bg-red-500",
    dont: "Forget about threads when writing Singleton.",
    do: "Always mention 'Double-Checked Locking' in Python/Java.",
  },
];
