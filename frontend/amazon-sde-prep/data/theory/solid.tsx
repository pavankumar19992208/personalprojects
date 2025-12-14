import { Hammer, Plug, Scissors, ShieldCheck, Split } from "lucide-react";

export const SOLID_THEORY = `
The Grammar of Clean Code: Mastering SOLID Principles
## 📊 At a Glance
- **Amazon Frequency:** **Every Interview** (Often implied during the coding/design phase).
- **Importance:** **Mandatory**. Violating these is an instant "red flag."
- **Difficulty:** **Core** (Easy to learn, hard to practice).
### 🧠 Before You Start
**The Amazon Lens:** Amazon engineers obsess over **maintainability**. Code is written once but read 100 times.

- **The Litmus Test:** If you have to touch existing, working code to add a new feature, you are likely breaking SOLID principles.
- **The Goal:** Write code that is "bored" by change. When requirements change, your code should extend, not break.
---
## 1. S - Single Responsibility Principle (SRP)
<<<SRPVisual>>>
### The "Swiss Army Knife" Trap
**The Concept:** A class should have **one, and only one, reason to change.**
Many junior engineers create "God Classes"—classes that know too much. If a class handles Business Logic *and* Database Operations *and* Email Notifications, it has 3 reasons to change.

**The Metaphor:**
Imagine a Swiss Army Knife. It has a knife, a spoon, a corkscrew, and scissors. If the scissors break, you have to throw the whole knife away (or send the whole thing for repairs). SRP suggests keeping a separate Knife, Spoon, and Scissors.

**❌ Bad Code (The God Class):**

\`\`\`python
class Order:
    def calculate_total(self):
        # Business Logic
        pass
    
    def save_to_database(self):
        # Database Logic
        pass
        
    def send_confirmation_email(self):
        # Notification Logic
        pass
\`\`\`

**✅ Good Code (Decoupled):**

\`\`\`python
class Order:
    def calculate_total(self): pass

class OrderRepository:
    def save(self, order): pass

class EmailService:
    def send_confirmation(self, order): pass
\`\`\`
---
## 2. O - Open/Closed Principle (OCP)
<<<OCPVisual>>>
### The "Plug and Play" Rule
**The Concept:** Software entities (classes, modules) should be **Open for Extension, but Closed for Modification.**
You should be able to add new features without rewriting existing, tested code.

**The Amazon Scenario:**
You have a \`PricingEngine\`. It calculates costs.

- *Requirement 1:* Standard price.
- *Requirement 2:* Add "Black Friday" discount.
- *Violation:* You open the \`PricingEngine\` class and add an \`if (isBlackFriday)\` statement.
- *Correction:* You create a new class \`BlackFridayPricingStrategy\` that extends the base pricing logic.

**❌ Bad Code (Modification):**

\`\`\`python
class Discount:
    def give_discount(self, type):
        if type == "fav": return 0.2
        if type == "vip": return 0.4 # Making changes here risks breaking "fav"
\`\`\`

**✅ Good Code (Extension):**

\`\`\`python
class Discount(ABC):
    @abstractmethod
    def get_discount(self): pass

class VIPDiscount(Discount):
    def get_discount(self): return 0.4

class FavDiscount(Discount):
    def get_discount(self): return 0.2
\`\`\`
---
## 3. L - Liskov Substitution Principle (LSP)
<<<LSPVisual>>>
### The "Rubber Duck" Test
**The Concept:** Subtypes must be substitutable for their base types.
If \`Class B\` inherits from \`Class A\`, you should be able to use \`B\` anywhere you use \`A\` without crashing the app.

**The Metaphor:**
If it looks like a duck and quacks like a duck but needs batteries, you have the wrong abstraction.
A **Rubber Duck** inherits from **Duck**. The \`Duck\` class has a \`fly()\` method. If you call \`rubber_duck.fly()\`, it throws an error (or does nothing). This violates LSP because the subclass *removed* functionality promised by the parent.

**❌ Bad Code:**

\`\`\`python
class Bird:
    def fly(self): pass

class Ostrich(Bird):
    def fly(self):
        raise Exception("I can't fly!") # Surprise! This breaks the trust.
\`\`\`

**✅ Good Code:**

\`\`\`python
class Bird: pass
class FlyingBird(Bird):
    def fly(self): pass

class Ostrich(Bird): pass # Ostrich is a Bird, but not a FlyingBird
\`\`\`
---
## 4. I - Interface Segregation Principle (ISP)

<<<ISPVisual>>>
### The "Menu Card" Rule
**The Concept:** Clients should not be forced to depend on interfaces they do not use.
It is better to have many small, specific interfaces than one general-purpose interface.

**The Metaphor:**
Imagine a Restaurant Menu.

- *Bad:* One giant menu with "Breakfast, Lunch, Dinner, Drinks, and Souvenirs." If you just want coffee, you have to hold the giant book.
- *Good:* A separate "Drinks Menu" and "Dinner Menu."

**❌ Bad Code (Fat Interface):**

\`\`\`python
class WorkerInterface:
    def work(self): pass
    def eat(self): pass

class Robot(WorkerInterface):
    def work(self): pass
    def eat(self):
        # Robots don't eat! Why am I forced to implement this?
        pass 
\`\`\`

**✅ Good Code:**

\`\`\`python
class Workable:
    def work(self): pass

class Eatable:
    def eat(self): pass

class Robot(Workable): # Only implements what it needs
    def work(self): pass
\`\`\`
---
## 5. D - Dependency Inversion Principle (DIP)
<<<DIPVisual>>>
### The "Wall Socket" Rule
**The Concept:** High-level modules should not depend on low-level modules. Both should depend on abstractions.
Don't hardwire your lamp directly into the electrical lines in the wall. Use a plug (Interface).

**The Amazon Scenario:**
Your "Order Service" (High Level) saves data to "PostgreSQL" (Low Level).

- *Violation:* \`OrderService\` creates a \`new PostgresDatabase()\`.
- *Correction:* \`OrderService\` asks for a \`DatabaseInterface\`. You can pass in Postgres, MySQL, or even a Mock Database for testing.

**❌ Bad Code (Hard Dependency):**

\`\`\`python
class LightBulb:
    def turn_on(self): pass

class Switch:
    def __init__(self):
        self.bulb = LightBulb() # Hardcoded! Can't use this switch for a Fan.
\`\`\`

**✅ Good Code (Abstraction):**

\`\`\`python
class Switchable(ABC):
    @abstractmethod
    def turn_on(self): pass

class Switch:
    def __init__(self, device: Switchable):
        self.device = device # Flexible! Works with Bulb, Fan, or AC.
\`\`\`

---

## 🚀 Application: Crushing the Amazon Interview

When you are asked to "Refactor this code" or "Design a Class Hierarchy," use SOLID as your checklist:

1.  **Check S:** Did I just put logic in the wrong place? (Move it).
2.  **Check O:** If I add a new type tomorrow, do I have to change my if-statements? (Use Strategy Pattern).
3.  **Check L:** Did I inherit from a class just to reuse code, even though it doesn't make sense logically? (Use Composition instead).
4.  **Check I:** Is my Interface massive? (Split it).
5.  **Check D:** Am I using \`new ClassName()\` inside my business logic? (Inject it via constructor).
`;

export const SOLID_TIPS = [
  {
    title: "SRP Check",
    icon: Scissors,
    color: "bg-red-500",
    dont: "Put DB logic in your Controller.",
    do: "Create a separate Repository class for data access.",
  },
  {
    title: "OCP Strategy",
    icon: ShieldCheck,
    color: "bg-blue-500",
    dont: "Use if/else for new features.",
    do: "Use Polymorphism (Strategy Pattern) to extend behavior.",
  },
  {
    title: "LSP Trust",
    icon: Hammer,
    color: "bg-yellow-500",
    dont: "Throw 'NotImplementedException' in a subclass.",
    do: "Ensure subclasses can fully replace the parent class.",
  },
  {
    title: "ISP Split",
    icon: Split,
    color: "bg-purple-500",
    dont: "Force a class to implement methods it doesn't use.",
    do: "Break large interfaces into smaller, specific ones.",
  },
  {
    title: "DIP Plug",
    icon: Plug,
    color: "bg-green-500",
    dont: "Use 'new' keyword for dependencies.",
    do: "Inject dependencies via constructor (Dependency Injection). ",
  },
];
