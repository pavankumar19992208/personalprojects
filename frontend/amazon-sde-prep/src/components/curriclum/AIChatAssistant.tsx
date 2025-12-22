import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Sparkles,
  Maximize2,
  Minimize2,
  Copy,
  ChevronDown,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  "Explain the time complexity",
  "Give me a hint for this problem",
  "Optimize my solution",
  "What is the edge case here?",
];

// Helper to generate a random session ID if user is not logged in
const generateSessionId = () => Math.random().toString(36).substring(7);

export const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm your Senior DSA Tutor. I can help you break down this problem, analyze complexity, or review your code. What's on your mind?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // WebSocket Reference
  const ws = useRef<WebSocket | null>(null);
  const sessionId = useRef(generateSessionId());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize WebSocket connection
  useEffect(() => {
    if (isOpen && !ws.current) {
      // Connect to the backend WebSocket
      // Note: In production, replace 'localhost:8000' with your actual domain
      //   const wsUrl = `ws://localhost:8000/api/v1/chat/ws/${sessionId.current}`;
      const wsUrl = `wss://3.81.28.220.nip.io/api/sde1prep/api/v1/chat/ws/${sessionId.current}`;

      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        console.log("Connected to AI Chat");
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "chunk") {
          setMessages((prev) => {
            const lastMsg = prev[prev.length - 1];
            // If the last message is from assistant and we are loading, append to it
            if (lastMsg.role === "assistant" && lastMsg.id === "streaming") {
              return [
                ...prev.slice(0, -1),
                { ...lastMsg, content: lastMsg.content + data.content },
              ];
            } else {
              // Start a new streaming message
              return [
                ...prev,
                {
                  id: "streaming",
                  role: "assistant",
                  content: data.content,
                  timestamp: new Date(),
                },
              ];
            }
          });
          setIsLoading(false); // We are receiving data, so stop "loading" spinner
        } else if (data.type === "done") {
          // Finalize the message ID
          setMessages((prev) => {
            const lastMsg = prev[prev.length - 1];
            return [
              ...prev.slice(0, -1),
              { ...lastMsg, id: Date.now().toString() }, // Finalize ID
            ];
          });
          setIsLoading(false);
        }
      };

      ws.current.onclose = () => {
        console.log("Disconnected from AI Chat");
        ws.current = null;
      };

      ws.current.onerror = (error) => {
        console.error("WebSocket Error:", error);
        setIsLoading(false);
      };
    }

    // Cleanup on unmount
    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, [isOpen]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Send message via WebSocket
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ message: text }));

      // Prepare a placeholder for the response if needed,
      // but our onmessage handler handles creating the new message bubble.
    } else {
      // Fallback or Reconnect logic could go here
      console.error("WebSocket is not connected");
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "Connection lost. Please close and reopen the chat.",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Simple parser to render code blocks
  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const match = part.match(/```(\w*)\n([\s\S]*?)```/);
        const lang = match ? match[1] : "";
        const code = match ? match[2] : part.slice(3, -3);
        return (
          <div
            key={idx}
            className="my-3 rounded-lg overflow-hidden border border-slate-700 bg-[#1e1e1e]"
          >
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#2d2d2d] border-b border-slate-700">
              <span className="text-xs text-slate-400 font-mono lowercase">
                {lang || "code"}
              </span>
              <button
                className="text-slate-400 hover:text-white transition-colors"
                onClick={() => navigator.clipboard.writeText(code)}
                title="Copy code"
              >
                <Copy size={12} />
              </button>
            </div>
            <pre className="p-3 overflow-x-auto text-sm font-mono text-blue-300 leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        );
      }
      // Basic bold parsing
      const boldParts = part.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={idx} className="whitespace-pre-wrap leading-relaxed">
          {boldParts.map((subPart, subIdx) =>
            subPart.startsWith("**") && subPart.endsWith("**") ? (
              <strong key={subIdx} className="font-bold text-indigo-400">
                {subPart.slice(2, -2)}
              </strong>
            ) : (
              subPart
            )
          )}
        </span>
      );
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
      >
        <Sparkles size={20} className="animate-pulse" />
        <span className="font-bold text-sm">Ask AI Tutor</span>
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-0 right-0 z-50 bg-white dark:bg-slate-900 shadow-2xl border-l border-t border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out flex flex-col ${
        isExpanded
          ? "w-full md:w-1/2 h-[90vh] rounded-tl-2xl"
          : "w-full md:w-[400px] h-[600px] md:rounded-tl-2xl"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-tl-2xl">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
            <Sparkles size={18} fill="currentColor" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Amazon SDE Tutor
            </h3>
            <p className="text-[10px] text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Gemini Pro • Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md transition-colors hidden md:block"
            title={isExpanded ? "Minimize width" : "Expand width"}
          >
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
          >
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-white dark:bg-[#0f1117]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === "user"
                  ? "bg-slate-200 dark:bg-slate-700"
                  : "bg-gradient-to-br from-indigo-500 to-purple-600"
              }`}
            >
              {msg.role === "user" ? (
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  YOU
                </span>
              ) : (
                <Bot size={16} className="text-white" />
              )}
            </div>
            <div
              className={`flex-1 max-w-[85%] text-sm ${
                msg.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-3 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tr-none"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {msg.role === "user" ? (
                  msg.content
                ) : (
                  <div className="prose prose-invert max-w-none">
                    {renderContent(msg.content)}
                  </div>
                )}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 px-1">
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Bot size={16} className="text-white" />
            </div>
            <div className="flex items-center gap-1 h-8">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
              <span
                className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
              <span
                className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        {messages.length === 1 && (
          <div className="flex gap-2 overflow-x-auto pb-3 mb-2 scrollbar-hide">
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 rounded-full text-xs text-slate-600 dark:text-slate-300 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about code, complexity, or logic..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
            rows={1}
            style={{ minHeight: "44px", maxHeight: "120px" }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 bottom-2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2">
          AI can make mistakes. Review generated code.
        </p>
      </div>
    </div>
  );
};
