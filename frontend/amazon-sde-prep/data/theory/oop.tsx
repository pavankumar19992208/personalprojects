import { Car, Mouse, Bell, Layers } from "lucide-react";

export const OOP_THEORY = `

# The Foundation of Software: Mastering OOP for the Amazon Interview

## 📊 At a Glance

- **Amazon Frequency:** **Ubiquitous** (Appears in almost every LLD/OOD round)
- **Importance:** **Critical**
- **Difficulty:** **Medium**

### 🧠 Before You Start

**The Mindset Shift:** Do not memorize definitions. The interviewer doesn't care if you can recite what "Polymorphism" is. They care if you understand _why_ it exists.

- **Read this if:** You are preparing for the Object-Oriented Design (OOD) or Low-Level Design (LLD) round (e.g., "Design a Parking Lot" or "Design a Movie Ticket System").
- **Focus on:** The difference between _implementation_ (how code works) and _interface_ (how objects talk to each other).

---

## Part 1: The Core Philosophy

Software engineering isn't just about writing code; it's about managing complexity. As applications (like Amazon.com) grow, "spaghetti code"—where everything is connected to everything else—becomes impossible to maintain.

**Object-Oriented Programming (OOP)** is the solution. It models software like the real world, organizing code into modular "Objects" that communicate through defined rules.

### Why Amazon Cares

1.  **Scalability:** If every team at Amazon accessed every other team's database directly (breaking **Encapsulation**), a single change in the "Orders" team could crash the "Payments" team.
2.  **Maintenance:** OOP allows teams to swap out old engines for new ones without rewriting the entire vehicle (using **Polymorphism**).

---

## Part 2: Encapsulation & Abstraction

These two pillars are often confused, but they serve distinct purposes. Think of them as the **Safe** and the **Remote Control**.

### 1. Encapsulation (The Safe)

<<<EncapsulationVisual>>>

Encapsulation is about **Protection**. It bundles data and methods together and _hides_ the internal state from the outside world.

- **The Metaphor:** A Digital Safe. You cannot reach inside and rearrange the gears (the data). You must use the keypad (public methods) to interact with it.
- **The Rule:** "Keep your privates private."

### 2. Abstraction (The Remote)

<<<AbstractionVisual>>>

Abstraction is about **Simplicity**. It hides complex implementation details and exposes only the essential features relevant to the user.

- **The Metaphor:** A TV Remote. When you press "Power On," you don't need to understand infrared signals or voltage regulation. You just need the button.

### 🐍 Python Implementation

In an interview, use Python property decorators or naming conventions (\`\_variable\`) to demonstrate this.

\`\`\`python
class BankAccount:
def **init**(self):
self.\_balance = 0 # The underscore indicates "protected/private" status

    # Encapsulation: Control access via methods
    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
        else:
            print("Invalid amount")

    # Abstraction: User doesn't need to know HOW interest is calculated
    def apply_interest(self):
        self._complex_interest_calculation()

    def _complex_interest_calculation(self):
        # The hidden complex math happens here
        self._balance *= 1.05

\`\`\`

---

## Part 3: Inheritance & Polymorphism

These pillars handle **Reusability** and **Flexibility**.

### 3. Inheritance (The Blueprint)

<<<InheritanceVisual>>>

Inheritance allows you to create new classes based on existing ones. It follows the **IS-A** relationship.

- _Example:_ A \`Dog\` **IS-A** \`Animal\`. A \`Sedan\` **IS-A** \`Car\`.
- _Benefit:_ Don't Repeat Yourself (DRY). You write the logic for "eating" once in the Animal class, and all animals inherit it.

### 4. Polymorphism (The Shape Shifter)

<<<PolymorphismVisual>>>

Polymorphism (Poly = Many, Morph = Forms) is the ability of different objects to respond to the _same_ method call in their own specific way.

- **The Metaphor:** A generic \`draw()\` command. You can tell a list of shapes to \`draw()\`. The Circle will draw a curve, the Square will draw lines, but the command remains the same.

\`\`\`python
class Animal:
def speak(self): pass

class Dog(Animal):
def speak(self): return "Woof"

class Cat(Animal):
def speak(self): return "Meow"

# Polymorphism in action

def make_it_speak(animal: Animal): # The function doesn't care if it's a Dog or Cat # It just knows that any Animal can speak.
print(animal.speak())
\`\`\`

---

## Part 4: The Diamond Problem ⚠️

This is a classic "Gotcha" question in interviews regarding Inheritance.

**The Scenario:**
Imagine a class hierarchy involving an \`AmphibiousVehicle\`.

1.  \`Vehicle\` is the parent.
2.  \`Car\` inherits from \`Vehicle\`.
3.  \`Boat\` inherits from \`Vehicle\`.
4.  \`AmphibiousVehicle\` inherits from **both** \`Car\` and \`Boat\`.

**The Conflict:**
If \`Car\` has a \`drive()\` method and \`Boat\` has a \`drive()\` method, and you call \`AmphibiousVehicle.drive()\`, **which one runs?**

**The Interview Answer:**

- **Java/C#:** Multiple inheritance of classes is banned to prevent this ambiguity.
- **Python/C++:** It is allowed but complex. Python uses **MRO (Method Resolution Order)** to determine priority (usually Left-to-Right).
- **Best Practice:** Prefer **Composition** or **Interfaces** over multiple inheritance to avoid this trap.

---

## Part 5: Abstract Class vs. Interface

This is the #1 LLD conceptual question. You must know when to use a "Partial Blueprint" vs. a "Contract."

### The Blueprint (Abstract Class)

- **Concept:** A class that cannot be instantiated on its own. It provides a base for subclasses.
- **Key Feature:** Can contain **shared state** (variables) and implemented methods.
- **Use Case:** When objects share code (e.g., \`Vehicle\` has \`engine_type\` and \`start_engine()\`).

### The Contract (Interface)

- **Concept:** A set of rules. It defines _what_ an object can do, without defining _how_.
- **Key Feature:** No state. Only method signatures.
- **Use Case:** When unrelated objects share a capability (e.g., \`IFlyable\` can apply to a \`Bird\`, \`Airplane\`, and \`Superman\`).

| Feature          | Abstract Class              | Interface                 |
| :--------------- | :-------------------------- | :------------------------ |
| **Relationship** | **IS-A** (Identity)         | **CAN-DO** (Capability)   |
| **Variables**    | Can have instance variables | Constants only            |
| **Methods**      | Abstract & Concrete         | Abstract only (mostly)    |
| **Purpose**      | Code Reuse                  | Decoupling / API Contract |

`;

export const OOP_TIPS = [
  {
    title: "Design a Parking Lot",
    icon: Car,
    color: "bg-blue-500",
    dont: "Create a single massive class called ParkingLot that does everything.",
    do: "Create a ParkingSpot class that manages its own is_occupied state (Encapsulation). Use Polymorphism for Fee calculation (WeekdayFee vs WeekendFee).",
  },
  {
    title: "Design a Zoo",
    icon: Mouse,
    color: "bg-green-500",
    dont: "Write if type == 'Lion': roar() elif type == 'Duck': quack().",
    do: "Create an abstract Animal class with a make_sound() method. Let Lion and Duck override it (Polymorphism).",
  },
  {
    title: "Notification System",
    icon: Bell,
    color: "bg-purple-500",
    dont: "Hardcode SMS or Email logic inside the main Order class.",
    do: "Define an interface INotification with a method send(). Implement SMSNotification, EmailNotification, etc. (Interface/Strategy Pattern).",
  },
  {
    title: "Abstract vs Interface",
    icon: Layers,
    color: "bg-orange-500",
    dont: "Use Abstract Class just because you like it.",
    do: "Use Abstract Class when you need to share state (variables). Use Interface when you need to define a contract/capability across unrelated objects.",
  },
];
