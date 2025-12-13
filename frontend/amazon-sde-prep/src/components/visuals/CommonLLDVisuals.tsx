import { useState, useEffect } from "react";
import {
  Shield,
  Link,
  Bell,
  Search,
  Mail,
  MessageSquare,
  Smartphone,
  Database,
  Server,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export const RateLimiterVisual = () => {
  const [tokens, setTokens] = useState(5);
  const maxTokens = 10;
  const [logs, setLogs] = useState<
    { id: number; status: "success" | "blocked"; time: string }[]
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTokens((prev) => Math.min(prev + 1, maxTokens));
    }, 2000); // Refill 1 token every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const handleRequest = () => {
    const now = new Date().toLocaleTimeString();
    if (tokens > 0) {
      setTokens((prev) => prev - 1);
      setLogs((prev) =>
        // Fix: Added 'as const' to ensure type matches "success" | "blocked"
        [
          { id: Date.now(), status: "success" as const, time: now },
          ...prev,
        ].slice(0, 3)
      );
    } else {
      setLogs((prev) =>
        // Fix: Added 'as const' to ensure type matches "success" | "blocked"
        [
          { id: Date.now(), status: "blocked" as const, time: now },
          ...prev,
        ].slice(0, 3)
      );
    }
  };

  return (
    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 my-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-blue-500" />
        Token Bucket Rate Limiter
      </h3>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Bucket */}
        <div className="relative w-32 h-40 border-b-4 border-x-4 border-slate-400 rounded-b-xl bg-white flex flex-col-reverse items-center overflow-hidden shadow-inner">
          <div
            className="w-full bg-blue-400 transition-all duration-500 opacity-80"
            style={{ height: `${(tokens / maxTokens) * 100}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-700 z-10">
            {tokens} / {maxTokens}
          </div>
          <div className="absolute top-2 text-[10px] text-slate-400 font-mono">
            Refilling...
          </div>
        </div>

        {/* Controls & Logs */}
        <div className="flex flex-col gap-4 w-full md:w-64">
          <button
            onClick={handleRequest}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Send Request
          </button>

          <div className="bg-white rounded-lg border border-slate-200 p-2 h-32 overflow-hidden">
            <div className="text-xs font-bold text-slate-500 mb-2 uppercase">
              Request Log
            </div>
            <div className="flex flex-col gap-2">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className={`flex items-center justify-between text-xs p-1.5 rounded ${
                    log.status === "success"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  <span className="font-mono">{log.time}</span>
                  <span className="flex items-center gap-1 font-bold">
                    {log.status === "success" ? (
                      <CheckCircle2 size={12} />
                    ) : (
                      <XCircle size={12} />
                    )}
                    {log.status === "success" ? "200 OK" : "429 Too Many"}
                  </span>
                </div>
              ))}
              {logs.length === 0 && (
                <div className="text-xs text-slate-400 italic text-center mt-4">
                  No requests yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TinyURLVisual = () => {
  const [dbId, setDbId] = useState(1000);
  const [shortUrl, setShortUrl] = useState("");

  const base62Encode = (num: number) => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let str = "";
    let n = num;
    if (n === 0) return "0";
    while (n > 0) {
      str = chars[n % 62] + str;
      n = Math.floor(n / 62);
    }
    return str;
  };

  const handleShorten = () => {
    const newId = dbId + 1;
    setDbId(newId);
    setShortUrl(base62Encode(newId));
  };

  return (
    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 my-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Link className="w-5 h-5 text-orange-500" />
        Base62 Encoding (TinyURL)
      </h3>

      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4 w-full justify-center">
          {/* Database ID */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-16 bg-slate-800 rounded-lg flex items-center justify-center text-white font-mono text-xl shadow-lg border-b-4 border-slate-950">
              {dbId}
            </div>
            <span className="text-xs font-bold mt-2 text-slate-500">
              Database ID (Int)
            </span>
          </div>

          <ArrowRight className="text-slate-400" />

          {/* Encoder Machine */}
          <div className="w-32 h-24 bg-orange-100 border-2 border-orange-300 rounded-lg flex flex-col items-center justify-center p-2">
            <div className="text-[10px] font-bold text-orange-600 uppercase mb-1">
              Base62 Encoder
            </div>
            <div className="text-xs text-center text-orange-800 leading-tight">
              ID % 62 &rarr; Char
              <br />
              ID / 62 &rarr; Next
            </div>
          </div>

          <ArrowRight className="text-slate-400" />

          {/* Short URL */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-16 bg-green-100 border-2 border-green-400 rounded-lg flex items-center justify-center text-green-800 font-mono text-xl shadow-sm">
              {shortUrl || "..."}
            </div>
            <span className="text-xs font-bold mt-2 text-slate-500">
              Short Alias
            </span>
          </div>
        </div>

        <button
          onClick={handleShorten}
          className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold shadow-md transition-all active:scale-95"
        >
          Generate Next URL
        </button>
      </div>
    </div>
  );
};

export const NotificationVisual = () => {
  const [notifying, setNotifying] = useState(false);

  const handleNotify = () => {
    setNotifying(true);
    setTimeout(() => setNotifying(false), 2000);
  };

  return (
    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 my-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Bell className="w-5 h-5 text-red-500" />
        Notification System (Observer)
      </h3>

      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-md h-48 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-center">
          {/* Subject */}
          <div className="absolute left-4 flex flex-col items-center z-10">
            <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center text-white shadow-lg">
              <Server size={32} />
            </div>
            <span className="text-xs font-bold mt-2 text-slate-600">
              Order Service
            </span>
          </div>

          {/* Channels */}
          <div className="flex flex-col gap-4 ml-20">
            {[
              {
                icon: <Mail size={16} />,
                label: "EmailChannel",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: <MessageSquare size={16} />,
                label: "SMSChannel",
                color: "bg-green-100 text-green-600",
              },
              {
                icon: <Smartphone size={16} />,
                label: "PushChannel",
                color: "bg-purple-100 text-purple-600",
              },
            ].map((channel, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-2 rounded-lg border transition-all duration-500 ${
                  notifying
                    ? "border-green-400 bg-green-50 translate-x-4"
                    : "border-slate-100 bg-slate-50"
                }`}
              >
                <div className={`p-2 rounded-full ${channel.color}`}>
                  {channel.icon}
                </div>
                <span className="text-xs font-bold text-slate-700">
                  {channel.label}
                </span>
                {notifying && (
                  <CheckCircle2
                    size={16}
                    className="text-green-500 animate-in zoom-in"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Connection Lines */}
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <path
              d="M 80 96 L 140 50"
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="4"
            />
            <path
              d="M 80 96 L 140 96"
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="4"
            />
            <path
              d="M 80 96 L 140 142"
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="4"
            />
          </svg>
        </div>

        <button
          onClick={handleNotify}
          disabled={notifying}
          className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold shadow-md transition-all disabled:opacity-50 flex items-center gap-2"
        >
          <Bell size={16} /> Trigger Notification
        </button>
      </div>
    </div>
  );
};

export const SearchVisual = () => {
  const [query, setQuery] = useState("");

  const index = {
    harry: [1, 2],
    potter: [1, 2, 3],
    stone: [1],
    chamber: [2],
    azkaban: [3],
  };

  const books = {
    1: "Harry Potter and the Sorcerer's Stone",
    2: "Harry Potter and the Chamber of Secrets",
    3: "Harry Potter and the Prisoner of Azkaban",
  };

  const results = query.toLowerCase()
    ? index[query.toLowerCase() as keyof typeof index] || []
    : [];

  return (
    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 my-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Search className="w-5 h-5 text-purple-500" />
        Inverted Index Search
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* The Index */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 mb-2 uppercase flex items-center gap-2">
            <Database size={14} /> Inverted Index (Map)
          </div>
          <div className="space-y-2">
            {Object.entries(index).map(([word, ids]) => (
              <div
                key={word}
                className={`flex justify-between text-xs p-2 rounded border ${
                  query.toLowerCase() === word
                    ? "bg-purple-100 border-purple-300 ring-2 ring-purple-200"
                    : "bg-slate-50 border-slate-100"
                }`}
              >
                <span className="font-mono font-bold text-slate-700">
                  "{word}"
                </span>
                <span className="font-mono text-slate-500">
                  IDs: [{ids.join(", ")}]
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Search Box & Results */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-slate-500 mb-1 block">
              Search Query
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try 'harry', 'stone', 'azkaban'..."
              className="w-full p-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex-1">
            <div className="text-xs font-bold text-slate-500 mb-2 uppercase">
              Results (O(1) Lookup)
            </div>
            {results.length > 0 ? (
              <ul className="space-y-2">
                {results.map((id) => (
                  <li
                    key={id}
                    className="text-sm p-2 bg-green-50 text-green-800 rounded border border-green-200 flex items-center gap-2 animate-in slide-in-from-left"
                  >
                    <CheckCircle2 size={14} />
                    {books[id as keyof typeof books]}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-slate-400 italic text-center mt-4">
                {query
                  ? "No matches found in index."
                  : "Type a word to search."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
