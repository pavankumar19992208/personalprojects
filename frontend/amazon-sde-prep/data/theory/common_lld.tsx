import { Shield, Link, Bell, Search } from "lucide-react";

export const COMMON_LLD_THEORY = `
 The Big 4: Common LLD Interview Questions
## 📊 At a Glance
  * **Frequency:** **High** (These are "screeners" or warm-up questions).
  * **Focus:** **Algorithmic Logic + Class Design**.
  * **Key Trap:** Treating these as System Design (HLD) problems. In LLD, the interviewer wants to see *Classes*, *Interfaces*, and *Functions*, not just boxes and arrows.
---
## 1. Design a Rate Limiter 🛡️
### The Core Problem
You need to prevent a user from sending too many requests (e.g., Max 10 requests per second).
### The Algorithm: Token Bucket
While there are many algorithms (Leaky Bucket, Fixed Window), the **Token Bucket** is the standard LLD solution because it handles "bursts" of traffic well and is easy to implement with objects.

**How it works:**

<<<RateLimiterVisual>>>

1.  Imagine a bucket that holds \`N\` tokens.
2.  A "Refiller" adds tokens at a fixed rate (e.g., 1 token every second).
3.  When a Request comes in, it must "pay" 1 token.
4.  If the bucket is empty, the request is rejected (\`429 Too Many Requests\`).
### 🏗️ LLD Structure

  * **\`RateLimiter\` (Interface):** Defines \`allowRequest(clientId)\`.
  * **\`TokenBucket\` (Class):** Holds current \`tokens\` and \`lastRefillTimestamp\`.
  * **\`ClientManager\` (Class):** Maps \`User_ID\` -> \`TokenBucket\`.
### 🐍 Code Snippet (Logic)

\`\`\`python
class TokenBucket:
    def __init__(self, max_tokens, refill_rate):
        self.capacity = max_tokens
        self.tokens = max_tokens
        self.last_refill = time.time()
        self.refill_rate = refill_rate # tokens per second

    def _refill(self):
        now = time.time()
        delta = now - self.last_refill
        # Add tokens based on time passed
        tokens_to_add = delta * self.refill_rate
        self.tokens = min(self.capacity, self.tokens + tokens_to_add)
        self.last_refill = now

    def allow_request(self):
        self._refill()
        if self.tokens >= 1:
            self.tokens -= 1
            return True # 200 OK
        return False # 429 Too Many Requests
\`\`\`

---
## 2. Design a URL Shortener (TinyURL) 🔗
### The Core Problem

Convert a long URL (e.g., \`amazon.com/product/12345\`) into a short, unique alias (e.g., \`tiny.url/x7Z\`).
### The Algorithm: Base62 Encoding

<<<TinyURLVisual>>>

Do not use a random hash (like MD5) because it produces long strings. Use **Base62 Encoding**.

  * **Base:** 62 characters (\`0-9\`, \`a-z\`, \`A-Z\`).
  * **Logic:** Treat the Database ID (Integer) as a number and convert it to Base62.
  * **Math:** \`ID 125\` -> \`cb\` (in Base62).
### 🏗️ LLD Structure

  * **\`URLService\` (Class):** The facade handling requests.
  * **\`IDGenerator\` (Singleton):** Ensures we get a unique Integer ID (e.g., a counter or Snowflake ID).
  * **\`Encoder\` (Utility):** Converts Int <-> Base62 String.
---
## 3. Design a Notification System 🔔
### The Core Problem
You need to send alerts to users via different channels (Email, SMS, Push) without tightly coupling the code. If you add "Slack" notifications later, you shouldn't have to rewrite the Order Service.
### The Pattern: Observer (Pub/Sub)
<<<NotificationVisual>>>

This is the classic use case for the **Observer Pattern**. The "Subject" (Order Service) notifies generic "Observers" (Notification Workers).
### 🏗️ LLD Structure

  * **\`NotificationChannel\` (Interface):** Defines \`send(message, user)\`.
  * **\`EmailChannel\`, \`SMSChannel\` (Concrete Classes):** Implement the specific logic (SMTP, Twilio, etc.).
  * **\`NotificationManager\` (Class):** Maintains a list of active channels and iterates through them.
### 🐍 Code Snippet (Interface)
\`\`\`python
from abc import ABC, abstractmethod

# The Interface
class NotificationChannel(ABC):
    @abstractmethod
    def send(self, user_id, message):
        pass

# Concrete Implementation
class EmailChannel(NotificationChannel):
    def send(self, user_id, message):
        print(f"Sending Email to {user_id}: {message}")

# The Context
class NotificationService:
    def __init__(self):
        self.channels = []

    def add_channel(self, channel):
        self.channels.append(channel)

    def notify(self, user_id, message):
        for channel in self.channels:
            channel.send(user_id, message)
\`\`\`
---
## 4. Design Bookstore Search (Amazon Fresh) 🔎
### The Core Problem
How do you search for "Harry Potter" efficiently?

  * **Naive approach:** \`SELECT * FROM books WHERE title LIKE '%Harry%'\`.
  * **Why it fails:** This requires scanning every row (O(N)). It is too slow for large datasets.
### The Solution: Inverted Index
<<<SearchVisual>>>

This is the data structure behind generic search engines (like Elasticsearch/Lucene). Instead of mapping \`Book -> Words\`, we map \`Word -> Books\`.
### 🏗️ LLD Structure

  * **\`Book\` (Model):** Contains metadata (Title, Author).
  * **\`InvertedIndex\` (Class):** A Hash Map: \`{ "Harry": [Book1_ID, Book2_ID] }\`.
  * **\`SearchService\` (Class):** Tokenizes the user query ("Harry", "Potter") and intersects the lists found in the index.
---
## 📝 Summary Cheat Sheet
| Problem | Key Pattern/Algo | Why? |
| :--- | :--- | :--- |
| **Rate Limiter** | **Token Bucket** | Handles traffic bursts; easy to model as a class. |
| **TinyURL** | **Base62 Encoding** | Mathematically guarantees unique short strings from DB IDs. |
| **Notifications** | **Observer (Pub/Sub)** | Adheres to Open/Closed Principle (Add new channels without breaking code). |
| **Search** | **Inverted Index** | Optimizes search speed from O(N) to O(1) or O(K). |
`;

export const COMMON_LLD_TIPS = [
  {
    title: "Rate Limiter",
    icon: Shield,
    color: "bg-blue-500",
    dont: "Use Fixed Window (it has edge cases).",
    do: "Use Token Bucket for LLD interviews. It's cleaner to code.",
  },
  {
    title: "TinyURL",
    icon: Link,
    color: "bg-orange-500",
    dont: "Use MD5/SHA256 (too long).",
    do: "Use Base62 Encoding on a unique Database ID.",
  },
  {
    title: "Notifications",
    icon: Bell,
    color: "bg-red-500",
    dont: "Hardcode 'sendEmail()' calls.",
    do: "Use the Observer pattern with a common Interface.",
  },
  {
    title: "Search",
    icon: Search,
    color: "bg-purple-500",
    dont: "Suggest SQL 'LIKE' queries.",
    do: "Propose an Inverted Index (HashMap of Word -> IDs).",
  },
];
