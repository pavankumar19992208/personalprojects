import type { CurriculumPhase } from "../types";

export const CURRICULUM: Record<string, CurriculumPhase> = {
  "phase-1": {
    id: "phase-1",
    title: "Phase 1: DSA Mastery",
    desc: "Days 1-15 & 19. The Filtering Layer. If you fail here, you go home.",
    topics: [
      {
        id: "dsa-arrays",
        title: "Arrays & Hashing (Day 1)",
        phase: "DSA",
        difficulty: "Easy/Med",
        priority: "Critical",
        frequency: "High",
        visualType: "none",
        desc: "Optimizing O(N^2) logic using HashMaps.",
        explanation: `
### The Concept
HashMaps (Dictionaries) are the #1 tool in OA. Know internal collision handling (Open Addressing vs Chaining).

### Key Patterns
1. **Frequency Map:** Count occurrences (Group Anagrams).
2. **Complement Map:** Store (Target - Current) to find pairs (Two Sum).
        `,
        prompt: "Explain Python Dict internals and collision handling...",
        problems: [
          {
            title: "Two Sum",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/two-sum/",
          },
          {
            title: "Group Anagrams",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/group-anagrams/",
          },
          {
            title: "Product of Array Except Self",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/product-of-array-except-self/",
          },
          {
            title: "Top K Frequent Elements",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/top-k-frequent-elements/",
          },
        ],
      },
      {
        id: "dsa-window",
        title: "Sliding Window (Day 2-3)",
        phase: "DSA",
        difficulty: "Medium",
        priority: "Critical",
        frequency: "Top 1%",
        visualType: "window",
        desc: "Processing streams of data (Logs, Clicks).",
        explanation: `
### The Pattern
Maintain a subset of data within a window.
1. **Fixed Window:** Size k is constant (e.g., Max Sum Subarray of size K).
2. **Variable Window:** Expand right until invalid, then shrink left (e.g., Longest Substring).

### Amazon Context
Used for "Anomaly Detection in Logs" and "Clickstream Analysis".
        `,
        prompt: "Explain Fixed vs Variable Sliding Window...",
        problems: [
          {
            title: "Longest Substring Without Repeating Characters",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
          },
          {
            title: "Sliding Window Maximum",
            difficulty: "Hard",
            url: "https://leetcode.com/problems/sliding-window-maximum/",
          },
          {
            title: "Max Consecutive Ones III",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/max-consecutive-ones-iii/",
          },
        ],
      },
      {
        id: "dsa-pointers",
        title: "Two Pointers & Stack (Day 3-4)",
        phase: "DSA",
        difficulty: "Medium",
        priority: "High",
        frequency: "Common",
        visualType: "none",
        desc: "Optimization & LIFO logic. Rain Water & Parentheses.",
        explanation: `
### Two Pointers
Used for sorted arrays or inward-moving logic.
* **Opposite Ends:** Container With Most Water, Two Sum II.
* **Fast/Slow:** Cycle Detection.

### Monotonic Stack
Used to find "Next Greater Element" or "Previous Smaller Element" in O(N).
        `,
        prompt: "Explain Monotonic Stack logic...",
        problems: [
          {
            title: "Trapping Rain Water",
            difficulty: "Hard",
            url: "https://leetcode.com/problems/trapping-rain-water/",
          },
          {
            title: "Valid Parentheses",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/valid-parentheses/",
          },
          {
            title: "Min Stack",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/min-stack/",
          },
          {
            title: "3Sum",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/3sum/",
          },
        ],
      },
      {
        id: "dsa-binary",
        title: "Binary Search (Day 4)",
        phase: "DSA",
        difficulty: "Medium",
        priority: "Medium",
        frequency: "Common",
        visualType: "none",
        desc: "O(log N) search in rotated spaces.",
        explanation: `
### The Concept
Discard half the search space at every step.
**Critical Skill:** Identifying the "sorted half" in a Rotated Sorted Array.

### Pattern: Answer on Range
Used when the answer is a value (e.g., min speed to eat bananas) rather than an index.
        `,
        prompt: "Write Binary Search logic for Rotated Array...",
        problems: [
          {
            title: "Search in Rotated Sorted Array",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
          },
          {
            title: "Find Minimum in Rotated Sorted Array",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
          },
          {
            title: "Koko Eating Bananas",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/koko-eating-bananas/",
          },
        ],
      },
      {
        id: "dsa-linkedlist",
        title: "Linked Lists (Day 5)",
        phase: "DSA",
        difficulty: "Easy/Med",
        priority: "Medium",
        frequency: "Low",
        visualType: "none",
        desc: "Pointer gymnastics. Merge & Cycle Detection.",
        explanation: `
### The Tricks
1. **Dummy Node:** Simplifies edge cases at the head.
2. **Fast & Slow Pointers:** Cycle detection (Floyd's Algorithm) and finding the middle node.
        `,
        prompt: "Explain Floyd's Cycle Detection...",
        problems: [
          {
            title: "Reverse Linked List",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/reverse-linked-list/",
          },
          {
            title: "Merge Two Sorted Lists",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/merge-two-sorted-lists/",
          },
          {
            title: "Linked List Cycle",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/linked-list-cycle/",
          },
          {
            title: "Remove Nth Node From End of List",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
          },
        ],
      },
      {
        id: "dsa-trees",
        title: "Trees BFS/DFS (Day 6-7)",
        phase: "DSA",
        difficulty: "Medium",
        priority: "Critical",
        frequency: "Very High",
        visualType: "none",
        desc: "Hierarchical data. LCA, ZigZag, Serialization.",
        explanation: `
### Traversals
* **DFS (Recursive):** Good for path finding, max depth.
* **BFS (Queue):** Level order traversal.

### Critical Algorithms
* **LCA (Lowest Common Ancestor):** Essential for hierarchy problems.
* **Serialization:** Converting tree to string and back (Data Storage).
        `,
        prompt: "Explain DFS vs BFS trade-offs...",
        problems: [
          {
            title: "Maximum Depth of Binary Tree",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
          },
          {
            title: "Lowest Common Ancestor",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
          },
          {
            title: "Binary Tree Zigzag Level Order Traversal",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
          },
          {
            title: "Serialize and Deserialize Binary Tree",
            difficulty: "Hard",
            url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
          },
        ],
      },
      {
        id: "dsa-heaps",
        title: "Heaps / Priority Queue (Day 8)",
        phase: "DSA",
        difficulty: "Medium",
        priority: "High",
        frequency: "Amazon Favorite",
        visualType: "heap",
        desc: "Finding 'Top K' items efficiently.",
        explanation: `
### The Concept
Efficiently access the Min or Max element in O(1).
* **Min-Heap:** Keep smallest at top.
* **Max-Heap:** Keep largest at top.

### Amazon Context
"Best selling items", "Nearest warehouses", "Merge K sorted log files".
        `,
        prompt: "Explain how a Heap works in an Array...",
        problems: [
          {
            title: "Kth Largest Element in an Array",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
          },
          {
            title: "Find Median from Data Stream",
            difficulty: "Hard",
            url: "https://leetcode.com/problems/find-median-from-data-stream/",
          },
          {
            title: "Merge K Sorted Lists",
            difficulty: "Hard",
            url: "https://leetcode.com/problems/merge-k-sorted-lists/",
          },
        ],
      },
      {
        id: "dsa-graphs-basic",
        title: "Graphs: Basics (Day 10)",
        phase: "DSA",
        difficulty: "Medium",
        priority: "Critical",
        frequency: "High",
        visualType: "none",
        desc: "Matrix traversal (Islands) & Cloning.",
        explanation: `
### Grid Graphs
Treat a 2D matrix as a graph where cells are nodes and neighbors are edges.
Use DFS/BFS to flood fill, count islands, or find shortest path in an unweighted grid (Rotting Oranges).
        `,
        prompt: "Explain Number of Islands logic...",
        problems: [
          {
            title: "Number of Islands",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/number-of-islands/",
          },
          {
            title: "Rotting Oranges",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/rotting-oranges/",
          },
          {
            title: "Clone Graph",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/clone-graph/",
          },
        ],
      },
      {
        id: "dsa-dp",
        title: "Dynamic Programming (Day 11 & 15)",
        phase: "DSA",
        difficulty: "Medium/Hard",
        priority: "Medium",
        frequency: "Medium",
        visualType: "none",
        desc: "1D (Climbing Stairs) & 2D (Grid Paths).",
        explanation: `
### Memoization vs Tabulation
* **Memoization:** Top-down recursion + cache.
* **Tabulation:** Bottom-up iteration + array.

### 2D DP
dp[i][j] represents the result for the sub-problem ending at (i, j).
Common for Unique Paths or Longest Common Subsequence.
        `,
        prompt: "Explain Memoization...",
        problems: [
          {
            title: "Climbing Stairs",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/climbing-stairs/",
          },
          {
            title: "House Robber",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/house-robber/",
          },
          {
            title: "Unique Paths",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/unique-paths/",
          },
          {
            title: "Longest Common Subsequence",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/longest-common-subsequence/",
          },
        ],
      },
      {
        id: "dsa-graphs-advanced",
        title: "Advanced Graphs (Day 13-14)",
        phase: "DSA",
        difficulty: "Hard",
        priority: "Critical",
        frequency: "The Filter",
        visualType: "graph",
        desc: "Topological Sort & Dijkstra. The #1 Failure Point.",
        explanation: `
### Kahn's Algorithm (Topo Sort)
Used for scheduling tasks with dependencies (e.g., Build Systems).
1. Count in-degrees. 2. Queue 0 in-degree nodes. 3. Process & reduce neighbors.

### Dijkstra's Algorithm
BFS + Priority Queue. Finds shortest path in weighted graphs (Network Delay).
        `,
        prompt: "Explain Topological Sort...",
        problems: [
          {
            title: "Course Schedule",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/course-schedule/",
          },
          {
            title: "Alien Dictionary",
            difficulty: "Hard",
            url: "https://leetcode.com/problems/alien-dictionary/",
          },
          {
            title: "Network Delay Time",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/network-delay-time/",
          },
          {
            title: "Cheapest Flights Within K Stops",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
          },
        ],
      },
      {
        id: "dsa-tries",
        title: "Tries & Union-Find (Day 19)",
        phase: "DSA",
        difficulty: "Hard",
        priority: "Medium",
        frequency: "Medium",
        visualType: "none",
        desc: "Prefix Trees & Disjoint Sets.",
        explanation: `
### Trie (Prefix Tree)
Efficient storage for autocomplete/spellcheck systems.

### Union-Find (Disjoint Set)
Efficiently tracking connected components in a graph (e.g., "Friend Circles" / "Provinces").
        `,
        prompt: "Explain Trie structure...",
        problems: [
          {
            title: "Word Search II",
            difficulty: "Hard",
            url: "https://leetcode.com/problems/word-search-ii/",
          },
          {
            title: "Number of Provinces",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/number-of-provinces/",
          },
        ],
      },
    ],
  },
  "phase-2": {
    id: "phase-2",
    title: "Phase 2: Low-Level Design (LLD)",
    desc: "Days 15-18 & 20. The 'Hidden' Round. Pure OOP & Design Patterns.",
    topics: [
      {
        id: "lld-fundamentals",
        title: "Design Fundamentals (Day 15)",
        phase: "LLD",
        difficulty: "Core",
        priority: "High",
        frequency: "High",
        visualType: "none",
        desc: "Scalability, CAP Theorem, Load Balancers.",
        explanation: `
### [cite_start]Concepts [cite: 147, 149, 173]
* **Horizontal vs Vertical Scaling:** Buying bigger machines vs buying more machines.
* **Load Balancers:** Round Robin vs Least Connections.
* **CAP Theorem:** Consistency vs Availability vs Partition Tolerance.
* **Caching:** LRU Policy, Write-through vs Write-back.
        `,
        prompt: "Explain CAP Theorem...",
        problems: [],
      },
      {
        id: "lld-solid",
        title: "SOLID & Patterns",
        phase: "LLD",
        difficulty: "Core",
        priority: "Critical",
        frequency: "Mandatory",
        visualType: "none",
        desc: "The Grammar of Good Code. SRP, OCP, LSP, ISP, DIP.",
        explanation: `### S.O.L.I.D\n* **S:** Single Responsibility.\n* **O:** Open/Closed.\n* **L:** Liskov Substitution.\n* **I:** Interface Segregation.\n* **D:** Dependency Inversion.`,
        prompt: "Explain SOLID principles...",
        problems: [],
        subTopics: [
          {
            id: "solid-srp",
            title: "Single Responsibility Principle",
            difficulty: "Core",
            priority: "Critical",
            desc: "A class should have one, and only one, reason to change.",
          },
          {
            id: "solid-ocp",
            title: "Open/Closed Principle",
            difficulty: "Core",
            priority: "Critical",
            desc: "Open for extension, closed for modification.",
          },
          {
            id: "pat-singleton",
            title: "Singleton Pattern",
            difficulty: "Core",
            priority: "High",
            desc: "Ensure a class has only one instance.",
          },
          {
            id: "pat-factory",
            title: "Factory Pattern",
            difficulty: "Core",
            priority: "High",
            desc: "Create objects without specifying the exact class.",
          },
          {
            id: "pat-strategy",
            title: "Strategy Pattern",
            difficulty: "Core",
            priority: "High",
            desc: "Define a family of algorithms.",
          },
        ],
      },
      {
        id: "lld-parking",
        title: "Design a Parking Lot",
        phase: "LLD",
        difficulty: "Design",
        priority: "Critical",
        frequency: "Very Common",
        visualType: "lld-parking",
        desc: "Singleton (Manager), Factory (Ticket), Strategy (Pricing).",
        explanation: `### Key Objects\nParkingLot, Level, Spot, Vehicle, Ticket.\n### Challenges\nConcurrency, Scalability.`,
        prompt: "Design a Parking Lot...",
        problems: [],
        subTopics: [
          {
            id: "pl-1",
            title: "Core Classes",
            difficulty: "Medium",
            priority: "Critical",
            desc: "Vehicle, Spot, Ticket, Gate.",
          },
          {
            id: "pl-2",
            title: "Concurrency",
            difficulty: "Hard",
            priority: "Critical",
            desc: "Handling two cars taking the same spot.",
          },
          {
            id: "pl-3",
            title: "Pricing Strategy",
            difficulty: "Medium",
            priority: "High",
            desc: "Hourly vs Flat rate logic.",
          },
        ],
      },
      {
        id: "lld-common",
        title: "Common LLD Problems",
        phase: "LLD",
        difficulty: "Design",
        priority: "High",
        frequency: "Common",
        visualType: "none",
        desc: "Bookstore, Rate Limiter, Notification System.",
        explanation: `
### High Frequency Questions
1. **Design Amazon Fresh Bookstore Search:** Indexing and filtering.
2. **Design Rate Limiter:** Token Bucket or Leaky Bucket algorithms.
3. **Design Notification System:** Observer pattern (Push/Email/SMS).
4. **Design URL Shortener (TinyURL):** Hashing and DB schema.
        `,
        prompt: "Design a Rate Limiter...",
        problems: [],
      },
    ],
  },
  "phase-3": {
    id: "phase-3",
    title: "Phase 3: CS Fundamentals",
    desc: "Days 12-14, 21-23. 'Dive Deep' Trivia: OS, DB, Networks.",
    topics: [
      {
        id: "cs-os",
        title: "Operating Systems (Day 13/21)",
        phase: "CS_Fund",
        difficulty: "Medium",
        priority: "Medium",
        frequency: "Drill Down",
        visualType: "os",
        desc: "Threads, Deadlocks, Memory Management.",
        explanation: `
### [cite_start]Core Concepts [cite: 125, 127, 139]
* **Process vs Thread:** Processes are isolated (heavy); Threads share memory (light).
* **Deadlock:** 4 Conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait).
* **Paging:** Virtual memory mapping to physical frames.
        `,
        prompt: "Explain Deadlock conditions...",
        problems: [],
        subTopics: [
          {
            id: "os-1",
            title: "Process vs Thread",
            difficulty: "Core",
            priority: "Critical",
            desc: "Shared memory (Heap) vs Isolated memory (Stack).",
          },
          {
            id: "os-2",
            title: "Concurrency & Locks",
            difficulty: "Hard",
            priority: "Critical",
            desc: "Race Conditions. Mutex vs Semaphore.",
          },
          {
            id: "os-3",
            title: "Deadlocks",
            difficulty: "Medium",
            priority: "High",
            desc: "The 4 Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.",
          },
          {
            id: "os-4",
            title: "Memory Management",
            difficulty: "Hard",
            priority: "High",
            desc: "Stack vs Heap. Virtual Memory. Paging.",
          },
        ],
      },
      {
        id: "cs-dbms",
        title: "DBMS: SQL vs NoSQL (Day 14/22)",
        phase: "CS_Fund",
        difficulty: "Medium",
        priority: "High",
        frequency: "Core",
        visualType: "db",
        desc: "ACID, Indexing, and DynamoDB.",
        explanation: `
### [cite_start]SQL vs NoSQL [cite: 136, 142]
* **SQL (Relational):** ACID properties, JOINs, Structured (MySQL).
* **NoSQL (Amazon DynamoDB):** Flexible schema, CAP theorem, Key-Value store.

### [cite_start]Indexing [cite: 137]
How B-Trees work to speed up reads at the cost of writes.
        `,
        prompt: "Explain ACID properties...",
        problems: [],
        subTopics: [
          {
            id: "db-1",
            title: "SQL vs NoSQL",
            difficulty: "Core",
            priority: "Critical",
            desc: "Scaling (Vertical vs Horizontal), Schema flexibility.",
          },
          {
            id: "db-2",
            title: "ACID Properties",
            difficulty: "Medium",
            priority: "Critical",
            desc: "Atomicity, Consistency, Isolation, Durability.",
          },
          {
            id: "db-3",
            title: "Indexing",
            difficulty: "Hard",
            priority: "High",
            desc: "B-Trees vs Hash Indexes. Read vs Write trade-offs.",
          },
          {
            id: "db-4",
            title: "Sharding",
            difficulty: "Hard",
            priority: "Medium",
            desc: "Consistent Hashing. Partitioning data.",
          },
          {
            id: "db-5",
            title: "CAP Theorem",
            difficulty: "Theory",
            priority: "High",
            desc: "Consistency vs Availability.",
          },
        ],
      },
      {
        id: "cs-net",
        title: "Computer Networks",
        phase: "CS_Fund",
        difficulty: "Medium",
        priority: "Medium",
        frequency: "Common",
        visualType: "network",
        desc: "HTTP, DNS, TCP/IP, Load Balancing.",
        explanation: `
### [cite_start]The Life of a Request [cite: 182]
1. **DNS Lookup:** Domain -> IP.
2. **TCP Handshake:** SYN, SYN-ACK, ACK.
3. **SSL Handshake:** Encryption setup.
4. **HTTP GET:** Requesting the resource.

### [cite_start]Status Codes [cite: 185]
200 (OK), 400 (Bad Request), 500 (Server Error).
        `,
        prompt: "What happens when you type a URL?",
        problems: [],
        subTopics: [
          {
            id: "cn-1",
            title: "Life of a URL Request",
            difficulty: "Critical",
            priority: "Critical",
            desc: "DNS -> TCP -> SSL -> HTTP -> Server.",
          },
          {
            id: "cn-2",
            title: "HTTP vs HTTPS",
            difficulty: "High",
            priority: "High",
            desc: "SSL/TLS Handshake basics.",
          },
          {
            id: "cn-3",
            title: "TCP vs UDP",
            difficulty: "High",
            priority: "High",
            desc: "Reliability vs Speed.",
          },
          {
            id: "cn-4",
            title: "Status Codes",
            difficulty: "Mandatory",
            priority: "Mandatory",
            desc: "200, 301, 401, 500.",
          },
          {
            id: "cn-5",
            title: "DNS Resolution",
            difficulty: "Medium",
            priority: "Medium",
            desc: "Records (A, CNAME). Caching.",
          },
        ],
      },
    ],
  },
  "phase-4": {
    id: "phase-4",
    title: "Phase 4: Behavioral (LPs)",
    desc: "Days 24-25. The Bar Raiser. 50% of your score.",
    topics: [
      {
        id: "lp-group1",
        title: "Customer & Ownership",
        phase: "Behavioral",
        difficulty: "Core",
        priority: "Critical",
        frequency: "Every Round",
        visualType: "star-method",
        desc: "Customer Obsession, Ownership, Bias for Action.",
        explanation: `
### [cite_start]Customer Obsession [cite: 22, 151]
"Leaders start with the customer and work backwards."
*Prompt:* Tell me about a time you went above and beyond for a customer.

### [cite_start]Ownership [cite: 21, 114, 214]
"Leaders act on behalf of the entire company, not just their team."
*Prompt:* Tell me about a time you took on a task outside your scope.
        `,
        prompt: "Write STAR stories for Customer Obsession...",
        problems: [],
      },
      {
        id: "lp-group2",
        title: "Strategy & Depth",
        phase: "Behavioral",
        difficulty: "Core",
        priority: "Critical",
        frequency: "Bar Raiser",
        visualType: "star-method",
        desc: "Dive Deep, Invent & Simplify, Think Big.",
        explanation: `
### [cite_start]Dive Deep [cite: 31, 134]
"Operate at all levels, stay connected to the details."
*Prompt:* Tell me about a complex problem you debugged to the root cause.

### [cite_start]Invent & Simplify [cite: 88]
"Look for new ideas from everywhere."
*Prompt:* Tell me about a time you simplified a complex process.
        `,
        prompt: "Write STAR stories for Dive Deep...",
        problems: [],
      },
      {
        id: "lp-group3",
        title: "People & Results",
        phase: "Behavioral",
        difficulty: "Core",
        priority: "Critical",
        frequency: "Bar Raiser",
        visualType: "star-method",
        desc: "Deliver Results, Earn Trust, Disagree & Commit.",
        explanation: `
### [cite_start]Deliver Results [cite: 40, 180]
"Rise to the occasion and never settle."
*Prompt:* Tell me about a time you met a tight deadline under pressure.

### [cite_start]Disagree & Commit [cite: 123, 378]
"Respectfully challenge decisions, but commit wholly once decided."
*Prompt:* Tell me about a time you disagreed with a manager.
        `,
        prompt: "Write STAR stories for Deliver Results...",
        problems: [],
      },
    ],
  },
};
