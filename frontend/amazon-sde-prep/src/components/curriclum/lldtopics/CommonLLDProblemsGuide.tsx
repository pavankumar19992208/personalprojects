import React, { useState } from "react";
import {
  Search,
  ShieldAlert,
  Bell,
  Link,
  ChevronLeft,
  CheckCircle2,
  //   Database,
  Server,
  Globe,
  Mail,
  MessageSquare,
  Smartphone,
  Clock,
  //   Filter,
  ArrowRight,
} from "lucide-react";

// --- Visual Components ---

const RateLimiterVisual = () => {
  const [tokens, setTokens] = useState(5);
  const [requests, setRequests] = useState<string[]>([]);

  const addRequest = () => {
    if (tokens > 0) {
      setTokens((prev) => prev - 1);
      setRequests((prev) => [...prev, "Allowed"].slice(-5));
    } else {
      setRequests((prev) => [...prev, "Blocked"].slice(-5));
    }
  };

  const refill = () => {
    setTokens(5);
    setRequests([]);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6 flex flex-col items-center">
      <div className="flex gap-8 items-center">
        {/* Bucket */}
        <div className="relative w-32 h-40 border-b-4 border-x-4 border-slate-400 rounded-b-xl bg-white dark:bg-slate-800 flex flex-col-reverse items-center p-2 gap-1 overflow-hidden">
          <span className="absolute top-2 text-[10px] text-slate-400 font-bold">
            Token Bucket
          </span>
          {[...Array(tokens)].map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-green-500 shadow-inner animate-in zoom-in"
            />
          ))}
        </div>

        {/* Server Gate */}
        <div className="flex flex-col gap-2">
          {requests.map((req, i) => (
            <div
              key={i}
              className={`px-3 py-1 rounded text-xs font-bold animate-in slide-in-from-left ${
                req === "Allowed"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              Request {req}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={addRequest}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all"
        >
          Send Request
        </button>
        <button
          onClick={refill}
          className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-300 rounded-lg font-bold transition-all flex items-center gap-2"
        >
          <Clock size={16} /> Refill Tokens
        </button>
      </div>
    </div>
  );
};

const URLShortenerVisual = () => {
  const [longUrl, setLongUrl] = useState(
    "https://www.amazon.com/dp/B08N5KWB9H"
  );
  const [shortUrl, setShortUrl] = useState("");

  const shorten = () => {
    // Simple mock hash
    const hash = Math.random().toString(36).substring(2, 8);
    setShortUrl(`amzn.to/${hash}`);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6 flex flex-col items-center">
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-3 rounded border border-slate-300 dark:border-slate-700">
          <Globe size={16} className="text-slate-400" />
          <input
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="bg-transparent border-none outline-none text-xs w-full text-slate-600 dark:text-slate-300 font-mono"
          />
        </div>

        <div className="flex justify-center">
          <ArrowRight className="text-slate-400 rotate-90 md:rotate-0" />
        </div>

        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
          <Link size={16} className="text-blue-500" />
          <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
            {shortUrl || "Waiting to shorten..."}
          </span>
        </div>
      </div>

      <button
        onClick={shorten}
        className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all"
      >
        Generate Short URL (Base62)
      </button>
    </div>
  );
};

const NotificationVisual = () => {
  const [sending, setSending] = useState(false);

  const send = () => {
    setSending(true);
    setTimeout(() => setSending(false), 2000);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6 flex flex-col items-center">
      <div className="flex items-center gap-8 relative">
        {/* Publisher */}
        <div className="flex flex-col items-center z-10">
          <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center text-white shadow-lg">
            <Server size={32} />
          </div>
          <span className="text-[10px] font-bold mt-2">Order Service</span>
        </div>

        {/* Topic / Queue */}
        <div className="w-32 h-2 bg-slate-300 dark:bg-slate-700 rounded-full relative overflow-hidden">
          {sending && (
            <div className="absolute inset-0 bg-blue-500 animate-[slide_1s_linear_infinite]" />
          )}
        </div>

        {/* Subscribers */}
        <div className="flex flex-col gap-4 z-10">
          <div
            className={`flex items-center gap-2 p-2 rounded border bg-white dark:bg-slate-800 transition-all ${
              sending
                ? "border-green-500 scale-105"
                : "border-slate-200 dark:border-slate-700"
            }`}
          >
            <Mail size={16} className="text-blue-500" />
            <span className="text-xs">Email</span>
          </div>
          <div
            className={`flex items-center gap-2 p-2 rounded border bg-white dark:bg-slate-800 transition-all ${
              sending
                ? "border-green-500 scale-105 delay-100"
                : "border-slate-200 dark:border-slate-700"
            }`}
          >
            <MessageSquare size={16} className="text-green-500" />
            <span className="text-xs">SMS</span>
          </div>
          <div
            className={`flex items-center gap-2 p-2 rounded border bg-white dark:bg-slate-800 transition-all ${
              sending
                ? "border-green-500 scale-105 delay-200"
                : "border-slate-200 dark:border-slate-700"
            }`}
          >
            <Smartphone size={16} className="text-purple-500" />
            <span className="text-xs">Push</span>
          </div>
        </div>
      </div>

      <button
        onClick={send}
        disabled={sending}
        className="mt-6 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold transition-all disabled:opacity-50"
      >
        Publish Event (SNS)
      </button>
    </div>
  );
};

// --- Main Component ---

interface CommonLLDProblemsGuideProps {
  initialPage?: number;
  onPageChange?: (page: number) => void;
  onComplete?: () => void;
}

type ProblemType =
  | "menu"
  | "ratelimiter"
  | "tinyurl"
  | "notification"
  | "bookstore";

export const CommonLLDProblemsGuide: React.FC<CommonLLDProblemsGuideProps> = ({
  onComplete,
}) => {
  const [activeProblem, setActiveProblem] = useState<ProblemType>("menu");

  const renderMenu = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        Common LLD Problems
      </h3>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        These 4 problems appear in ~60% of Amazon LLD interviews. Select one to
        explore.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setActiveProblem("ratelimiter")}
          className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 hover:shadow-md transition-all text-left group"
        >
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform">
            <ShieldAlert size={20} />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-1">
            Rate Limiter
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Design an API Rate Limiter using Token Bucket or Leaky Bucket.
          </p>
        </button>

        <button
          onClick={() => setActiveProblem("tinyurl")}
          className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-purple-500 hover:shadow-md transition-all text-left group"
        >
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 mb-3 group-hover:scale-110 transition-transform">
            <Link size={20} />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-1">
            URL Shortener
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Design TinyURL using Base62 encoding and ID generation.
          </p>
        </button>

        <button
          onClick={() => setActiveProblem("notification")}
          className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-orange-500 hover:shadow-md transition-all text-left group"
        >
          <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center text-orange-600 dark:text-orange-400 mb-3 group-hover:scale-110 transition-transform">
            <Bell size={20} />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-1">
            Notification System
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Design a scalable Pub/Sub system for Email, SMS, and Push.
          </p>
        </button>

        <button
          onClick={() => setActiveProblem("bookstore")}
          className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-green-500 hover:shadow-md transition-all text-left group"
        >
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 mb-3 group-hover:scale-110 transition-transform">
            <Search size={20} />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-1">
            Bookstore Search
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Design Amazon Fresh search with filtering and indexing.
          </p>
        </button>
      </div>

      <button
        onClick={onComplete}
        className="mt-8 w-full py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2"
      >
        <CheckCircle2 size={20} /> Mark Module Complete
      </button>
    </div>
  );

  const renderRateLimiter = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <button
        onClick={() => setActiveProblem("menu")}
        className="text-sm text-blue-500 hover:underline mb-4 flex items-center gap-1"
      >
        <ChevronLeft size={14} /> Back to Menu
      </button>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <ShieldAlert className="text-blue-500" /> Design a Rate Limiter
      </h3>

      <div className="prose dark:prose-invert max-w-none mb-6">
        <p>
          <strong>Goal:</strong> Prevent abuse by limiting requests (e.g., 10
          req/sec).
        </p>
        <p>
          <strong>Algorithm: Token Bucket</strong>
        </p>
        <ul className="list-disc pl-5 text-sm">
          <li>
            A bucket holds <code>N</code> tokens.
          </li>
          <li>Every request consumes 1 token.</li>
          <li>
            If bucket is empty, request is dropped (429 Too Many Requests).
          </li>
          <li>Refill tokens at a fixed rate.</li>
        </ul>
      </div>

      <RateLimiterVisual />

      <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs overflow-x-auto">
        <pre>{`class TokenBucket:
    def __init__(self, capacity, refill_rate):
        self.capacity = capacity
        self.tokens = capacity
        self.last_refill = time.time()
        self.refill_rate = refill_rate

    def allow_request(self):
        self._refill()
        if self.tokens >= 1:
            self.tokens -= 1
            return True
        return False`}</pre>
      </div>
    </div>
  );

  const renderTinyURL = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <button
        onClick={() => setActiveProblem("menu")}
        className="text-sm text-blue-500 hover:underline mb-4 flex items-center gap-1"
      >
        <ChevronLeft size={14} /> Back to Menu
      </button>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Link className="text-purple-500" /> Design URL Shortener
      </h3>

      <div className="prose dark:prose-invert max-w-none mb-6">
        <p>
          <strong>Goal:</strong> Convert long URLs to short aliases (e.g.,{" "}
          <code>bit.ly/3xYz</code>).
        </p>
        <p>
          <strong>Key Concept: Base62 Encoding</strong>
        </p>
        <ul className="list-disc pl-5 text-sm">
          <li>Use characters [a-z, A-Z, 0-9] = 62 chars.</li>
          <li>A 7-character string can store $62^7$ (~3.5 Trillion) URLs.</li>
          <li>Map Database ID (Integer) &rarr; Base62 String.</li>
        </ul>
      </div>

      <URLShortenerVisual />

      <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs overflow-x-auto">
        <pre>{`def encode(id):
    chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    base = 62
    short_url = []
    while id > 0:
        val = id % base
        short_url.append(chars[val])
        id //= base
    return "".join(short_url[::-1])`}</pre>
      </div>
    </div>
  );

  const renderNotification = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <button
        onClick={() => setActiveProblem("menu")}
        className="text-sm text-blue-500 hover:underline mb-4 flex items-center gap-1"
      >
        <ChevronLeft size={14} /> Back to Menu
      </button>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Bell className="text-orange-500" /> Design Notification System
      </h3>

      <div className="prose dark:prose-invert max-w-none mb-6">
        <p>
          <strong>Goal:</strong> Send alerts to millions of users via Email,
          SMS, Push.
        </p>
        <p>
          <strong>Pattern: Pub/Sub (Observer)</strong>
        </p>
        <ul className="list-disc pl-5 text-sm">
          <li>
            <strong>Publisher:</strong> Order Service sends "OrderPlaced" event.
          </li>
          <li>
            <strong>Topic:</strong> AWS SNS (Fan-out).
          </li>
          <li>
            <strong>Subscribers:</strong> SQS Queues for Email, SMS, Push
            workers.
          </li>
        </ul>
      </div>

      <NotificationVisual />
    </div>
  );

  const renderBookstore = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <button
        onClick={() => setActiveProblem("menu")}
        className="text-sm text-blue-500 hover:underline mb-4 flex items-center gap-1"
      >
        <ChevronLeft size={14} /> Back to Menu
      </button>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Search className="text-green-500" /> Design Bookstore Search
      </h3>

      <div className="prose dark:prose-invert max-w-none mb-6">
        <p>
          <strong>Goal:</strong> Search books by Title, Author, or Genre with
          filters.
        </p>
        <p>
          <strong>Key Concept: Inverted Index</strong>
        </p>
        <ul className="list-disc pl-5 text-sm">
          <li>
            Map words to document IDs (like the index at the back of a book).
          </li>
          <li>
            <strong>Example:</strong> "Harry" &rarr; [Book1, Book5, Book9].
          </li>
          <li>
            Use <strong>Elasticsearch</strong> for fuzzy search and ranking.
          </li>
        </ul>
      </div>

      <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-3 rounded border border-slate-300 dark:border-slate-700">
            <Search size={16} className="text-slate-400" />
            <span className="text-sm text-slate-500">"Harry Potter"</span>
          </div>
          <div className="flex gap-4 justify-center">
            <ArrowRight className="text-slate-400 rotate-90" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-center border border-green-300 text-xs font-bold text-green-700">
              Tokenize
              <br />
              ["harry", "potter"]
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded text-center border border-blue-300 text-xs font-bold text-blue-700">
              Index Lookup
              <br />
              IDs: [101, 205]
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded text-center border border-purple-300 text-xs font-bold text-purple-700">
              Retrieve
              <br />
              Book Objects
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto pr-2 custom-scrollbar">
      {activeProblem === "menu" && renderMenu()}
      {activeProblem === "ratelimiter" && renderRateLimiter()}
      {activeProblem === "tinyurl" && renderTinyURL()}
      {activeProblem === "notification" && renderNotification()}
      {activeProblem === "bookstore" && renderBookstore()}
    </div>
  );
};
