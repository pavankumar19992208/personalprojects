import { Plug, Layers, RefreshCw, Box } from "lucide-react";

export const STRUCTURAL_PATTERNS_THEORY = `
# The Architects of Connectivity: Mastering Structural Patterns

## 📊 At a Glance

  * **Amazon Frequency:** **Medium** (Common in Bar Raiser rounds and practical coding).
  * **Importance:** **Medium** (Solves very specific, messy real-world integration problems).
  * **Difficulty:** **Medium** (Requires understanding interfaces and wrappers).

### 🧠 Before You Start

**The Mindset Shift:**
In Creational Patterns, we focused on *making* objects.
In Structural Patterns, we focus on *connecting* objects.

  * **The Rule:** "Favor Composition over Inheritance."
  * **Why?** Inheritance is rigid. If \`Class B\` inherits from \`Class A\`, they are married forever. Structural patterns let you "snap" objects together like Lego bricks at runtime.

---

## Part 1: The Adapter Pattern (The Translator)

### The Concept

Allows objects with incompatible interfaces to collaborate.

**The Metaphor:** **The Universal Travel Plug.**
You have a US Laptop (Client) and a UK Socket (Legacy System). You cannot change the laptop plug, and you cannot rebuild the wall socket. You need a piece in the middle (Adapter) to translate.

### 🎨 Visualizing the Logic

Imagine a **Legacy XML System** and a **New JSON System**.

<<<AdapterVisual>>>

1.  **Client:** Asks for \`get_data()\`.
2.  **Adapter:** Intercepts the call.
3.  **Translation:** It calls the old \`get_xml_data()\`, receives \`<stock>50</stock>\`, converts it to \`{"stock": 50}\`, and hands it to the Client.
    The Client has no idea the XML system exists.



### 🐍 Python Implementation

**Scenario:** Amazon buys a new company ("Twitch") that uses a different API format.

\`\`\`python
# 1. The Target Interface (What our app expects)
class TargetJSON:
    def get_data(self): pass

# 2. The Adaptee (The messy legacy code we can't touch)
class LegacyXML:
    def get_xml_data(self):
        return "<data>Stock: 50</data>"

# 3. The Adapter (The Bridge)
class XMLToJSONAdapter(TargetJSON):
    def __init__(self, legacy_system):
        self.legacy_system = legacy_system

    def get_data(self):
        # Translate the call
        xml = self.legacy_system.get_xml_data()
        return {"stock": 50} # Simplified translation logic
\`\`\`

---

## Part 2: The Decorator Pattern (The Matryoshka Doll)

### The Concept

Attaches new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.

**The Metaphor:** **Layers of Clothing.**

  * **Base:** You (The Object).
  * **Layer 1:** T-Shirt (Adds Style).
  * **Layer 2:** Jacket (Adds Warmth).
  * **Layer 3:** Raincoat (Adds Waterproofing).
    You are still "You" underneath, but you have dynamically gained new properties. Inheritance would force you to create a \`HumanWithTShirtAndJacketAndRaincoat\` class.

### 🎨 Visualizing the Logic

Imagine a **Coffee Shop**.

<<<DecoratorVisual>>>

  * \`BaseCoffee\` costs $5.
  * You wrap it in \`Milk\` (+$2).
  * You wrap that in \`Sugar\` (+$1).
  * When you call \`cost()\`, the outer layer asks the inner layer, adds its own cost, and returns the total ($8).



### 🐍 Python Implementation

**Scenario:** Adding logging/metrics to Amazon service calls without rewriting the service.

\`\`\`python
# The Component Interface
class Coffee:
    def cost(self): return 5

# The Decorator (Wrapper)
class MilkDecorator:
    def __init__(self, coffee):
        self.coffee = coffee # Hold a reference to the inner object

    def cost(self):
        # Delegate to inner object, then add own behavior
        return self.coffee.cost() + 2

class SugarDecorator:
    def __init__(self, coffee):
        self.coffee = coffee

    def cost(self):
        return self.coffee.cost() + 1

# Usage: Stacking Wrappers
my_drink = Coffee()                 # Cost: 5
my_drink = MilkDecorator(my_drink)  # Cost: 7 (5+2)
my_drink = SugarDecorator(my_drink) # Cost: 8 (7+1)
\`\`\`

---

## 🚀 Comparison: Adapter vs. Decorator

This is a classic "Bar Raiser" question. Both involve wrapping an object. What's the difference?

| Feature | Adapter | Decorator |
| :--- | :--- | :--- |
| **Intent** | **Translation** | **Enhancement** |
| **Interface** | **Changes it** (XML -> JSON) | **Keeps it** (Coffee -> Coffee) |
| **Metaphor** | Power Plug | Winter Jacket |
| **Use Case** | Integrating Legacy Code | Adding Features Runtime (Logging, Caching) |

### 💡 Interview Tip

If the interviewer asks: *"How would you add caching to an existing database service without changing the database code?"*
**Answer:** *"I would use the **Decorator Pattern**. I'd create a \`CachedDatabase\` wrapper that checks the cache first. If it misses, it delegates the call to the real \`Database\` object inside it. This follows the Open/Closed Principle."*
`;

export const STRUCTURAL_PATTERNS_TIPS = [
  {
    title: "Adapter vs Decorator",
    icon: RefreshCw,
    color: "bg-blue-500",
    dont: "Confuse them. They both wrap objects.",
    do: "Remember: Adapter changes the interface (Plug). Decorator adds behavior (Jacket).",
  },
  {
    title: "Composition over Inheritance",
    icon: Layers,
    color: "bg-purple-500",
    dont: "Create a 'CoffeeWithMilkAndSugar' class.",
    do: "Use Decorators to combine behaviors dynamically at runtime.",
  },
  {
    title: "Legacy Integration",
    icon: Plug,
    color: "bg-orange-500",
    dont: "Rewrite legacy code just to fit a new interface.",
    do: "Use an Adapter to wrap the legacy code and translate calls.",
  },
  {
    title: "Open/Closed Principle",
    icon: Box,
    color: "bg-green-500",
    dont: "Modify existing classes to add logging or caching.",
    do: "Wrap them in a Decorator that handles the new concern.",
  },
];
