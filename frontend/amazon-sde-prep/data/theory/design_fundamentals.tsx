import { Server, Network, Database, Zap } from "lucide-react";

export const DESIGN_FUNDAMENTALS_THEORY = `
Mastering Design Fundamentals: The "Prime Day" Survival Guide
## 📊 At a Glance
- **Amazon Frequency:** **High** (Essential for System Design & Bar Raiser rounds).
- **Importance:** **Core** (You cannot pass a design round without these).
- **Difficulty:** **Core/Medium**.
### 🧠 Before You Start
**The Mindset Shift:** Stop thinking about code on your laptop. Start thinking about a system that serves **100 million users** simultaneously.
- **Read this if:** You are preparing for the "Design Instagram," "Design TinyURL," or "Design Amazon Cart" questions.
- **Focus on:** Trade-offs. There is no "perfect" system, only the "right" system for the specific problem (e.g., consistency vs. speed).
---
## Part 1: Scalability – The "Prime Day" Problem
### The Scenario
It’s Amazon Prime Day. Traffic spikes from 1 million users to 100 million users in 10 minutes. If your server crashes, the company loses millions of dollars per minute. How do you survive?
### 1. Vertical Scaling (Scale Up)
This is the intuitive approach: "My computer is slow? I'll buy a better one."
- **Concept:** Upgrading the existing server with more RAM, a faster CPU, or a bigger SSD.
- **The Metaphor:** Buying a **Ferrari** to deliver packages. It's fast, but it can only carry so much.
- **The Limit:** There is a hardware limit (you can't buy a 100TB RAM stick yet).
- **The Risk:** Single Point of Failure. If the Ferrari crashes, deliveries stop.
### 2. Horizontal Scaling (Scale Out)
This is the "Amazon" way.
- **Concept:** Adding *more* machines to the pool rather than upgrading a single one.
- **The Metaphor:** Hiring **1,000 cyclists** to deliver packages. If one gets a flat tire, the others keep going.
- **The Benefit:** Infinite scaling. Need more power? Just add 50 more cheap servers.
- **The Amazon Reality:** AWS was literally built to make Horizontal Scaling easy (EC2 Auto Scaling Groups).

<<<ScalabilityVisual>>>
---
## Part 2: Load Balancers – The Traffic Cop
If you have 100 servers (Horizontal Scaling), how does a user's phone know which one to talk to? It can't memorize 100 IP addresses.
### The Role of the Load Balancer (LB)
The LB sits between the User and your Server Cluster. It is the entry point.
- **The Metaphor:** A receptionist at a busy doctor's office. You don't walk into a random room; you talk to the receptionist, and they point you to the next available doctor.

<<<LoadBalancerVisual>>>
### Routing Algorithms
How does the LB decide who gets the request?
1.  **Round Robin:** "You go to Server A, next goes to Server B, next to C, back to A..." (Simple, fair).
2.  **Least Connections:** "Server B is nearly empty, send traffic there." (Smart, good for long tasks).
3.  **Sticky Sessions (IP Hash):** "User 123 *always* goes to Server A." (Necessary if Server A holds that user's unsaved shopping cart).
---
## Part 3: CAP Theorem – The Impossible Trinity
In a Distributed System (many servers talking to each other), you cannot have it all. You must choose **two** of the following three guarantees:

1.  **Consistency (C):** Every read receives the most recent write or an error. (All nodes see the same data at the same time).
2.  **Availability (A):** Every request receives a (non-error) response, without the guarantee that it contains the most recent write.
3.  **Partition Tolerance (P):** The system continues to operate despite an arbitrary number of messages being dropped or delayed by the network between nodes.
### The Reality Check
**Partition Tolerance (P) is mandatory.** Networks fail. Cables get cut. You *must* handle partitions. Therefore, the real choice is between **CP** and **AP**.

<<<CAPVisual>>>
### Amazon Context: CP vs. AP
- **AP (Availability + Partition):** The **Amazon Shopping Cart**.
    - *Philosophy:* Never show an error. Let the user add items even if the server is disconnected from the main DB. We will sync (reconcile) the cart later.
- **CP (Consistency + Partition):** **Amazon Payments**.
    - *Philosophy:* We cannot allow a "double spend." If the network is shaky, it is better to show "Transaction Failed" than to accidentally charge the user twice or zero times.
---
## Part 4: Caching – Speed vs. Stale Data
Reading from a Database (Disk) is slow (milliseconds). Reading from a Cache (RAM) is fast (microseconds). To survive Prime Day, you typically place a Cache (like Redis or Memcached) in front of your Database.
### The Trade-off: Stale Data
If you update the Database, the Cache might still hold the old value. This is "Stale Data."

<<<CachingVisual>>>
### Caching Strategies
1.  **Write-Through:**
    - *Action:* Application writes to Cache **AND** DB simultaneously.
    - *Pro:* Data is always consistent.
    - *Con:* Slower writes (must wait for both).
2.  **Write-Back (Write-Behind):**
    - *Action:* Application writes to Cache immediately. The Cache updates the DB later in the background.
    - *Pro:* Super fast user experience.
    - *Con:* Risk of data loss if the Cache crashes before syncing to DB.
---
## 🚀 Application: Crushing the Amazon SDE1 Interview
When asked "Design a System for X," follow this "Golden Answer" pattern:

1.  **Start with Traffic:** "Is this read-heavy (Twitter) or write-heavy (IoT Sensors)?"
    - *Read-heavy?* Focus heavily on **Caching** and **Load Balancers**.
    - *Write-heavy?* Focus on **Async Queues** and **Database Sharding**.

2.  **Define CAP Strategy:** "For this system..."
    - "I will prioritize **Availability (AP)** because users expect the feed to load instantly, even if it's 5 seconds outdated."
    - *OR* "I will prioritize **Consistency (CP)** because this is a banking app."

3.  **Apply Scaling:**
    - "We will start with one server, but since we expect growth, I will place it behind a **Load Balancer** immediately to allow for **Horizontal Scaling** later."

**Final Tip:** Never say "I will use a Load Balancer" without saying *why* or *which algorithm* you might use. Detail shows seniority.
`;

export const DESIGN_FUNDAMENTALS_TIPS = [
  {
    title: "Scale Smart",
    icon: Server,
    color: "bg-blue-500",
    dont: "Suggest Vertical Scaling for a system like Amazon.com.",
    do: "Start with Horizontal Scaling and mention Load Balancers immediately.",
  },
  {
    title: "CAP Theorem",
    icon: Network,
    color: "bg-purple-500",
    dont: "Say you want Consistency, Availability, AND Partition Tolerance.",
    do: "Explicitly choose CP (Banking) or AP (Social Media) and explain why.",
  },
  {
    title: "Caching Strategy",
    icon: Zap,
    color: "bg-yellow-500",
    dont: "Forget about cache invalidation (stale data).",
    do: "Propose Write-Through for critical data and Write-Back for high-speed logs.",
  },
  {
    title: "Database Choice",
    icon: Database,
    color: "bg-green-500",
    dont: "Default to SQL for everything.",
    do: "Use SQL for structured/relational data (Orders) and NoSQL for massive unstructured data (Product Reviews).",
  },
];
