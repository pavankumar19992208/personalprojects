import { Map, Bell, Zap, Cloud } from "lucide-react";

export const BEHAVIORAL_PATTERNS_THEORY = `
The Diplomat's Handbook: Mastering Behavioral Patterns
## 📊 At a Glance
  * **Amazon Frequency:** **Very High** (The backbone of notification systems, pricing engines, and event-driven architectures).
  * **Importance:** **Critical**. These patterns determine how your system handles change and communication.
  * **Difficulty:** **Hard** (Easy to understand, but hard to implement cleanly without tight coupling).
### 🧠 Before You Start
**The Mindset Shift:**

  * **Creational Patterns** build objects.
  * **Structural Patterns** connect objects.
  * **Behavioral Patterns** make objects **talk** to each other.
  * **The Golden Rule:** "Decouple the Sender from the Receiver." You don't want Class A to micromanage Class B. You want them to collaborate via contracts.
---
## Part 1: The Strategy Pattern (The GPS Route)
### The Concept

Defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

**The Metaphor:** **Google Maps Navigation.**
You want to go from Point A to Point B.

  * **Option 1:** Car (Fastest).
  * **Option 2:** Walking (Shortest distance).
  * **Option 3:** Bike (Eco-friendly).
    The *Destination* is the same. The *Strategy* (Route) changes. You can switch strategies mid-trip without changing your destination.
### 🎨 Visualizing the Logic

Imagine a **Payment System**.

<<<StrategyVisual>>>

1.  **Context:** The \`CheckoutPage\` class. It needs to collect money.
2.  **Strategy Interface:** \`pay(amount)\`.
3.  **Concrete Strategies:** \`CreditCardStrategy\`, \`PayPalStrategy\`, \`BitcoinStrategy\`.
    The \`CheckoutPage\` doesn't know how PayPal works. It just calls \`strategy.pay()\`.
### 🐍 Python Implementation

**Scenario:** Amazon's Dynamic Pricing Engine (Regular vs. Prime vs. Black Friday).

\`\`\`python
from abc import ABC, abstractmethod

# 1. The Strategy Interface
class PricingStrategy(ABC):
    @abstractmethod
    def calculate_price(self, price): pass

# 2. Concrete Strategies
class RegularPricing(PricingStrategy):
    def calculate_price(self, price):
        return price

class PrimePricing(PricingStrategy):
    def calculate_price(self, price):
        return price * 0.90  # 10% Discount

class BlackFridayPricing(PricingStrategy):
    def calculate_price(self, price):
        return price * 0.50  # 50% Discount

# 3. The Context
class Product:
    def __init__(self, price, strategy: PricingStrategy):
        self.price = price
        self.strategy = strategy

    def get_final_price(self):
        return self.strategy.calculate_price(self.price)

# Usage: Swapping logic at runtime
item = Product(100, RegularPricing())
print(f"Regular: {item.get_final_price()}") # 100

item.strategy = PrimePricing() # Switch strategy!
print(f"Prime: {item.get_final_price()}")   # 90
\`\`\`
---
## Part 2: The Observer Pattern (The YouTube Bell)
### The Concept
Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

**The Metaphor:** **YouTube Subscription.**

  * **Subject:** The YouTuber (Content Creator).
  * **Observers:** The Subscribers (You, me, millions of others).
  * **Action:** When the YouTuber uploads *one* video, they don't email 1 million people individually. They hit "Publish," and the system automatically notifies everyone who subscribed.
### 🎨 Visualizing the Logic

Imagine a **Stock Market Monitor**.

<<<ObserverVisual>>>

  * **Subject:** The stock \`AMZN\`.
  * **Observers:** \`MobileApp\`, \`TradingBot\`, \`AuditLogger\`.
  * When \`AMZN\` hits $200, the Subject shouts "UPDATE!". The App shows a notification, the Bot executes a trade, and the Logger writes to a file.
### 🐍 Python Implementation

**Scenario:** An Inventory System. When stock runs low, notify the Purchasing Dept and the Website.

\`\`\`python
# 1. The Subject (Publisher)
class Inventory:
    def __init__(self):
        self._observers = []
        self._stock = 10

    def attach(self, observer):
        self._observers.append(observer)

    def set_stock(self, count):
        self._stock = count
        if self._stock < 5:
            self.notify()

    def notify(self):
        for observer in self._observers:
            observer.update(self._stock)

# 2. The Observers (Subscribers)
class PurchasingDept:
    def update(self, stock):
        print(f"Purchasing: Stock is low ({stock}). Ordering more.")

class Website:
    def update(self, stock):
        print(f"Website: Stock is low ({stock}). Adding 'Limited Time' banner.")

# Usage
warehouse = Inventory()
warehouse.attach(PurchasingDept())
warehouse.attach(Website())

warehouse.set_stock(2) 
# Output:
# Purchasing: Stock is low (2). Ordering more.
# Website: Stock is low (2). Adding 'Limited Time' banner.
\`\`\`
---
## 🚀 Comparison: Strategy vs. State
This is a common "Bar Raiser" nuance. Both patterns involve swapping classes to change behavior.

| Feature | Strategy Pattern | State Pattern |
| :--- | :--- | :--- |
| **Who drives it?** | **The Client.** The client explicitly chooses "Credit Card" or "PayPal". | **The Object itself.** The object transitions internally (e.g., \`OrderPlaced\` -> \`OrderShipped\`). |
| **Intent** | **How** to do something (Algorithm). | **What** state the object is in (Lifecycle). |
| **Metaphor** | Choosing a weapon in a game. | A caterpillar turning into a butterfly. |
### 💡 Interview Tip

If asked: *"Design a system for Amazon Orders."*

1.  Use the **State Pattern** to manage the order lifecycle (\`New\` -> \`Processing\` -> \`Shipped\` -> \`Delivered\`).
2.  Use the **Strategy Pattern** to calculate the shipping cost inside the order (\`FedExCost\` vs. \`UPSCost\`).
---
## 🏗️ Scaling Up: From LLD to System Design

In a Low-Level Design (LLD) interview (single machine), we use the **Observer Pattern** (lists and function calls).

In a System Design (HLD) interview (distributed systems), this pattern scales up to **Pub/Sub** (Publisher/Subscriber).

  * Instead of a Python list of observers, we use **AWS SNS (Simple Notification Service)** or **Apache Kafka**.
  * The concept is identical: Decoupling the thing that *produces* the event from the things that *consume* it.
`;

export const BEHAVIORAL_PATTERNS_TIPS = [
  {
    title: "Strategy vs State",
    icon: Map,
    color: "bg-blue-500",
    dont: "Confuse them. They look similar in code.",
    do: "Strategy = Client chooses algorithm. State = Object changes its own behavior based on lifecycle.",
  },
  {
    title: "Observer vs Pub/Sub",
    icon: Bell,
    color: "bg-red-500",
    dont: "Think Observer is only for single apps.",
    do: "Mention that Observer scales to Pub/Sub (Kafka/SNS) in distributed systems.",
  },
  {
    title: "Decoupling",
    icon: Zap,
    color: "bg-yellow-500",
    dont: "Hardcode dependencies (e.g., Checkout calling PayPal directly).",
    do: "Use interfaces (Strategy) or events (Observer) to keep systems loose.",
  },
  {
    title: "System Design Link",
    icon: Cloud,
    color: "bg-purple-500",
    dont: "Forget the big picture.",
    do: "Connect Observer pattern to Event-Driven Architecture in your interview.",
  },
];
