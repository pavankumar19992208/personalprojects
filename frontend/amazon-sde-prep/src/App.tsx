import { useState, useEffect } from "react";
import type { UserSettings, Topic, ProgressState } from "../types";
import { CURRICULUM } from "../data/curriculum";
import { LoginScreen } from "../src/components/auth/LoginScreen";
import { Sidebar } from "./components/layout/Sidebar";
import { Dashboard } from "./components/dashboard/Dashboard";
import { CurriculumBoard } from "./components/curriclum/CurriculumBoard";
import { TopicDetail } from "./components/curriclum/TopicDetail";
import { Resources } from "./components/resources/Resources";
import { SubjectDetail } from "./components/curriclum/SubjectDetail";
export default function App() {
  const [user, setUser] = useState<UserSettings | null>(null);
  const [activeView, setActiveView] = useState<
    "dashboard" | "curriculum" | "resources"
  >("dashboard");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [progress, setProgress] = useState<ProgressState>({});

  // LOAD DATA
  useEffect(() => {
    const savedUser = localStorage.getItem("amazon_sde_user");
    const savedProgress = localStorage.getItem("amazon_sde_progress");
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedProgress) setProgress(JSON.parse(savedProgress));
  }, []);

  // LOGIN HANDLER
  const handleLogin = (settings: UserSettings) => {
    setUser(settings);
    localStorage.setItem("amazon_sde_user", JSON.stringify(settings));
  };

  // PACE CALCULATOR LOGIC
  const getPaceStats = () => {
    if (!user)
      return {
        daysLeft: 0,
        unitsPerDay: "0",
        status: "Normal",
        color: "text-green-400",
      };

    const today = new Date();
    const target = new Date(user.targetDate);
    const diffTime = Math.abs(target.getTime() - today.getTime());
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Approx 60 learning units in the full system
    const totalUnits = 60;
    const unitsPerDay = totalUnits / (daysLeft || 1);

    let status = "Comfortable";
    let color = "text-green-400";
    if (unitsPerDay > 3) {
      status = "SUICIDE MISSION";
      color = "text-red-500";
    } else if (unitsPerDay > 1.5) {
      status = "AGGRESSIVE";
      color = "text-orange-400";
    }

    return { daysLeft, unitsPerDay: unitsPerDay.toFixed(1), status, color };
  };

  // RENDER IF NOT LOGGED IN
  if (!user) return <LoginScreen onLogin={handleLogin} />;

  const pace = getPaceStats();
  const totalTopics = Object.values(CURRICULUM).reduce(
    (acc, phase) => acc + phase.topics.length,
    0
  );
  const completedCount = Object.values(progress).filter(Boolean).length;
  const percentage = Math.round((completedCount / totalTopics) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex overflow-hidden">
      <Sidebar
        user={user}
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          setSelectedTopic(null);
        }}
        percentage={percentage}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {/* Background Grid */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {selectedTopic ? (
          // CHECK IF IT HAS SUB-TOPICS (Like OS, DBMS)
          selectedTopic.subTopics && selectedTopic.subTopics.length > 0 ? (
            <SubjectDetail
              topic={selectedTopic}
              onBack={() => setSelectedTopic(null)}
            />
          ) : (
            // STANDARD TOPIC DETAIL (Like Sliding Window)
            <TopicDetail
              topic={selectedTopic}
              isCompleted={!!progress[selectedTopic.id]}
              onToggleComplete={() => {
                const newProg = {
                  ...progress,
                  [selectedTopic.id]: !progress[selectedTopic.id],
                };
                setProgress(newProg);
                localStorage.setItem(
                  "amazon_sde_progress",
                  JSON.stringify(newProg)
                );
              }}
            />
          )
        ) : (
          <div className="flex-1 overflow-y-auto p-8 relative z-10">
            {activeView === "dashboard" && (
              <Dashboard
                user={user}
                progress={progress}
                pace={pace}
                completedCount={completedCount}
              />
            )}

            {activeView === "curriculum" && (
              <CurriculumBoard
                progress={progress}
                onSelectTopic={setSelectedTopic}
              />
            )}

            {activeView === "resources" && <Resources />}
          </div>
        )}
      </main>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import {
//   Terminal,
//   Code2,
//   Cpu,
//   Shield,
//   Target,
//   BookOpen,
//   ChevronRight,
//   CheckCircle2,
//   Circle,
//   Copy,
//   Save,
//   BarChart3,
//   BrainCircuit,
//   Database,
//   ExternalLink,
//   Sparkles,
//   Bot,
//   RefreshCw,
// } from "lucide-react";

// // -----------------------------------------------------------------------------
// // CONFIGURATION
// // -----------------------------------------------------------------------------
// const apiKey = ""; // 🔴 ENTER YOUR GEMINI API KEY HERE

// /**
//  * DATA STRUCTURE: THE CURRICULUM
//  * Derived from the comprehensive audit provided.
//  */
// const CURRICULUM: Record<string, any[]> = {
//   "Phase 1: Algorithmic Core": [
//     {
//       id: "p1-1",
//       title: "Sliding Window",
//       type: "Pattern",
//       difficulty: "Medium",
//       desc: "The #1 most asked pattern. Essential for stream processing and log analysis.",
//       prompt:
//         "Explain the Sliding Window pattern in the context of Amazon's log processing. 1. Explain the difference between fixed and dynamic windows. 2. Solve 'Longest Substring Without Repeating Characters' and 'Max Consecutive Ones III'. 3. Explain the Time Complexity trade-off vs Brute Force.",
//     },
//     {
//       id: "p1-2",
//       title: "Two Pointers",
//       type: "Pattern",
//       difficulty: "Medium",
//       desc: "Crucial for array manipulation and 'Sum' problems.",
//       prompt:
//         "Teach me the Two Pointers technique. Focus on: 1. 'Trapping Rain Water' (explain the space optimization). 2. 'Container With Most Water'. 3. How to combine Two Pointers with Sorting for '3Sum'.",
//     },
//     {
//       id: "p1-3",
//       title: "Merge Intervals",
//       type: "Pattern",
//       difficulty: "Medium",
//       desc: "Mandatory for logistics and scheduling logic.",
//       prompt:
//         "I need to master Merge Intervals for Amazon Logistics questions. 1. Walk through 'Merge Intervals' and 'Meeting Rooms II'. 2. Explain how to handle edge cases where intervals touch but don't overlap. 3. Differentiate this from Topological Sort.",
//     },
//     {
//       id: "p1-4",
//       title: "Top 'K' Elements (Heap)",
//       type: "Pattern",
//       difficulty: "Hard",
//       desc: "Used for ranking items (Best Selling, Nearest).",
//       prompt:
//         "Explain the Heap/Priority Queue pattern. 1. Solve 'Top K Frequent Elements' and 'K Closest Points to Origin'. 2. Compare the Time Complexity of a Heap approach (NlogK) vs QuickSelect (N).",
//     },
//     {
//       id: "p1-5",
//       title: "Tree BFS & DFS",
//       type: "Pattern",
//       difficulty: "Medium",
//       desc: "Foundational for organizational hierarchies.",
//       prompt:
//         "Deep dive into Tree Traversal. 1. Explain 'Zigzag Level Order Traversal' specifically. 2. Solve 'Lowest Common Ancestor' and 'Serialize/Deserialize Binary Tree'. 3. When should I use Iterative vs Recursive approaches?",
//     },
//   ],
//   "Phase 2: The Hidden Curriculum": [
//     {
//       id: "p2-1",
//       title: "Advanced Graphs (Topo Sort)",
//       type: "Gap",
//       difficulty: "Hard",
//       desc: "The 'Sufficiency Gap'. Essential for dependency resolution.",
//       prompt:
//         "I need to learn Kahn's Algorithm (Topological Sort) for dependency problems. 1. Walk through the 'Alien Dictionary' problem step-by-step. 2. Explain how to detect cycles in a directed graph. 3. Solve 'Course Schedule II'.",
//     },
//     {
//       id: "p2-2",
//       title: "Multi-Source BFS",
//       type: "Gap",
//       difficulty: "Hard",
//       desc: "Parallel processing simulation (Rotten Oranges).",
//       prompt:
//         "Explain Multi-Source BFS. 1. How does it differ from standard BFS? 2. Solve 'Rotten Oranges' and explain the queue initialization state. 3. Why is this O(N*M)?",
//     },
//     {
//       id: "p2-3",
//       title: "Dijkstra's Algorithm",
//       type: "Gap",
//       difficulty: "Hard",
//       desc: "Shortest path in weighted graphs (Network Delay).",
//       prompt:
//         "Teach me Dijkstra's Algorithm using a Priority Queue. 1. Solve 'Network Delay Time'. 2. Explain the relaxation step. 3. How does this differ from BFS?",
//     },
//     {
//       id: "p2-4",
//       title: "LLD: Parking Lot",
//       type: "Design",
//       difficulty: "Design",
//       desc: "Object-Oriented Design. Define classes, interfaces, and patterns.",
//       prompt:
//         "Conduct a mock Low-Level Design (LLD) interview for 'Design a Parking Lot'. 1. Define the Classes (Vehicle, Spot, Ticket, Gate). 2. Use Enums for types. 3. Apply the Singleton pattern for the ParkingSystem. 4. Write the Java/Python skeleton code.",
//     },
//     {
//       id: "p2-5",
//       title: "LLD: Design a Bookstore",
//       type: "Design",
//       difficulty: "Design",
//       desc: "Class hierarchy and search functionality.",
//       prompt:
//         "Walk me through the LLD for 'Design a Bookstore' (Amazon context). 1. Define classes for Book, Member, Librarian. 2. Explain how to handle Search functionality (Interfaces vs Implementation). 3. Discuss the 'Open/Closed' principle in this context.",
//     },
//   ],
//   "Phase 3: The Bar Raiser (LP)": [
//     {
//       id: "p3-1",
//       title: "Customer Obsession",
//       type: "Behavioral",
//       difficulty: "Core",
//       desc: "Start with the customer and work backward.",
//       prompt:
//         "Help me prepare a STAR method story for Amazon's 'Customer Obsession'. Scenario: 'Tell me about a time you went above and beyond for a customer.' Critique my structure: Situation, Task, Action, Result.",
//     },
//     {
//       id: "p3-2",
//       title: "Dive Deep",
//       type: "Behavioral",
//       difficulty: "Core",
//       desc: "Operate at all levels, stay connected to details.",
//       prompt:
//         "Prepare a STAR story for 'Dive Deep'. Question: 'Tell me about a time you debugged a complex issue where the root cause was elusive.' Focus on the technical depth and the specific data I analyzed.",
//     },
//     {
//       id: "p3-3",
//       title: "Ownership",
//       type: "Behavioral",
//       difficulty: "Core",
//       desc: "Never say 'that's not my job'.",
//       prompt:
//         "Prepare a STAR story for 'Ownership'. Question: 'Tell me about a time you took on a task outside your responsibility to ensure the team succeeded.' Emphasize the long-term value.",
//     },
//     {
//       id: "p3-4",
//       title: "Have Backbone",
//       type: "Behavioral",
//       difficulty: "Core",
//       desc: "Disagree and Commit.",
//       prompt:
//         "Prepare a STAR story for 'Have Backbone; Disagree and Commit'. Question: 'Tell me about a time you disagreed with a manager or peer.' Show how I presented data, debated, but then fully supported the final decision.",
//     },
//   ],
// };

// // Helper for Tailwind dynamic colors
// const COLOR_STYLES: Record<string, any> = {
//   cyan: {
//     bg: "bg-cyan-500",
//     bgSoft: "bg-cyan-500/10",
//     text: "text-cyan-400",
//     border: "border-cyan-500",
//   },
//   red: {
//     bg: "bg-red-500",
//     bgSoft: "bg-red-500/10",
//     text: "text-red-400",
//     border: "border-red-500",
//   },
//   orange: {
//     bg: "bg-orange-500",
//     bgSoft: "bg-orange-500/10",
//     text: "text-orange-400",
//     border: "border-orange-500",
//   },
//   green: {
//     bg: "bg-green-500",
//     bgSoft: "bg-green-500/10",
//     text: "text-green-400",
//     border: "border-green-500",
//   },
// };

// /**
//  * OPTIMIZED CARD COMPONENT
//  * CSS-only hover effects for performance
//  */
// const TiltCard = ({ children, className, onClick }: any) => {
//   return (
//     <div
//       className={`${className} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 hover:scale-[1.02] cursor-pointer`}
//       onClick={onClick}
//     >
//       {children}
//     </div>
//   );
// };

// export default function AmazonPrepApp() {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [selectedTopic, setSelectedTopic] = useState<any>(null);
//   const [progress, setProgress] = useState<Record<string, boolean>>({});
//   const [notes, setNotes] = useState<Record<string, string>>({});
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [copySuccess, setCopySuccess] = useState(false);

//   // AI State
//   const [aiResponse, setAiResponse] = useState("");
//   const [isAiLoading, setIsAiLoading] = useState(false);
//   const [starDraft, setStarDraft] = useState("");

//   // Load from LocalStorage
//   useEffect(() => {
//     try {
//       const savedProgress = localStorage.getItem("amazon_sde_progress");
//       const savedNotes = localStorage.getItem("amazon_sde_notes");

//       if (savedProgress) setProgress(JSON.parse(savedProgress));
//       if (savedNotes) setNotes(JSON.parse(savedNotes));
//     } catch (e) {
//       console.error("Failed to load progress from local storage", e);
//     }
//   }, []);

//   // Save to LocalStorage
//   const updateProgress = (id: string, status: boolean) => {
//     const newProgress = { ...progress, [id]: status };
//     setProgress(newProgress);
//     localStorage.setItem("amazon_sde_progress", JSON.stringify(newProgress));
//   };

//   const saveNote = (id: string, text: string) => {
//     const newNotes = { ...notes, [id]: text };
//     setNotes(newNotes);
//     localStorage.setItem("amazon_sde_notes", JSON.stringify(newNotes));
//   };

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text);
//     setCopySuccess(true);
//     setTimeout(() => setCopySuccess(false), 2000);
//   };

//   // ---------------------------------------------------------------------------
//   // GEMINI API INTEGRATION
//   // ---------------------------------------------------------------------------
//   const callGemini = async (mode: string) => {
//     if (!apiKey) {
//       setAiResponse(
//         "⚠️ API Key missing. Please add your Gemini API Key in the code to use AI features."
//       );
//       return;
//     }

//     setIsAiLoading(true);
//     setAiResponse(""); // Clear previous response

//     // Construct Context-Aware Prompt
//     let finalPrompt = "";

//     if (mode === "explain") {
//       // Technical Explainer Prompt
//       finalPrompt = `You are a Senior Principal Engineer at Amazon (Bar Raiser). The candidate is asking about '${selectedTopic.title}'.

//         Using the following context: "${selectedTopic.prompt}", provide a structured lesson plan.
//         1. **The Amazon Context**: Why Amazon uses this (e.g. scale, logistics).
//         2. **The Algorithm**: Step-by-step logic.
//         3. **Complexity Analysis**: Time & Space.

//         Keep it concise, use markdown, and be encouraging but rigorous.`;
//     } else if (mode === "refine") {
//       // Behavioral STAR Refiner Prompt
//       finalPrompt = `You are an Amazon Bar Raiser specializing in behavioral interviews. The candidate has drafted a story for the Leadership Principle: '${selectedTopic.title}'.

//         Candidate's Draft: "${starDraft}"

//         Task: Rewrite this story using the STAR format (Situation, Task, Action, Result).
//         - Ensure "Action" focuses on "I" not "We".
//         - Ensure "Result" includes specific metrics (%, $, time saved) if possible or placeholders for them.
//         - Point out 1 weakness in their original draft.`;
//     }

//     try {
//       const response = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             contents: [{ parts: [{ text: finalPrompt }] }],
//           }),
//         }
//       );

//       const data = await response.json();

//       if (data.error) {
//         throw new Error(data.error.message);
//       }

//       const text =
//         data.candidates?.[0]?.content?.parts?.[0]?.text ||
//         "Error: No response generated.";
//       setAiResponse(text);
//     } catch (error: any) {
//       setAiResponse(`Error connecting to AI Sensei: ${error.message}`);
//     } finally {
//       setIsAiLoading(false);
//     }
//   };

//   const calculateOverallProgress = () => {
//     const total = Object.keys(CURRICULUM).reduce(
//       (acc, key) => acc + CURRICULUM[key].length,
//       0
//     );
//     const completed = Object.values(progress).filter((p) => p).length;
//     if (total === 0) return 0;
//     return Math.round((completed / total) * 100);
//   };

//   // Clear AI state when switching topics
//   useEffect(() => {
//     setAiResponse("");
//     setStarDraft("");
//   }, [selectedTopic]);

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-orange-500 selection:text-white overflow-hidden flex flex-col md:flex-row">
//       {/* BACKGROUND GRID EFFECT (Static) */}
//       <div
//         className="fixed inset-0 z-0 opacity-10 pointer-events-none"
//         style={{
//           backgroundImage:
//             "linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)",
//           backgroundSize: "40px 40px",
//           transform: "perspective(500px) rotateX(20deg) scale(1.2)",
//         }}
//       />

//       {/* SIDEBAR */}
//       <nav className="md:w-64 bg-slate-900/80 backdrop-blur-md border-r border-slate-800 z-10 flex flex-col h-auto md:h-screen">
//         <div className="p-6 border-b border-slate-800">
//           <div className="flex items-center gap-2 text-orange-500 font-bold text-xl tracking-wider">
//             <Terminal size={24} />
//             <span>SDE:PREP</span>
//           </div>
//           <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">
//             Amazon Protocol v2025
//           </p>
//         </div>

//         <div className="flex-1 overflow-y-auto py-4">
//           <NavButton
//             active={activeTab === "dashboard"}
//             onClick={() => setActiveTab("dashboard")}
//             icon={<BarChart3 size={18} />}
//             label="Dashboard"
//           />
//           <NavButton
//             active={activeTab === "curriculum"}
//             onClick={() => setActiveTab("curriculum")}
//             icon={<BrainCircuit size={18} />}
//             label="Quest Board"
//           />
//           <NavButton
//             active={activeTab === "intel"}
//             onClick={() => setActiveTab("intel")}
//             icon={<Database size={18} />}
//             label="Intel Database"
//           />
//         </div>

//         <div className="p-6 border-t border-slate-800">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-xs font-mono text-slate-400">
//               SYS.READINESS
//             </span>
//             <span className="text-xs font-mono text-orange-400">
//               {calculateOverallProgress()}%
//             </span>
//           </div>
//           <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
//             <div
//               className="h-full bg-gradient-to-r from-orange-600 to-yellow-400 transition-all duration-500"
//               style={{ width: `${calculateOverallProgress()}%` }}
//             />
//           </div>
//         </div>
//       </nav>

//       {/* MAIN CONTENT AREA */}
//       <main className="flex-1 relative z-10 overflow-y-auto overflow-x-hidden h-screen">
//         {/* VIEW: DASHBOARD */}
//         {activeTab === "dashboard" && (
//           <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
//             <header className="mb-8">
//               <h1 className="text-3xl font-bold text-white mb-2">
//                 Command Center
//               </h1>
//               <p className="text-slate-400">
//                 Current Objective: Master the 2025 Competency Evaluation.
//               </p>
//             </header>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <StatCard
//                 title="Patterns Mastered"
//                 value={`${Object.values(progress).filter(Boolean).length}`}
//                 icon={<Target className="text-cyan-400" />}
//                 color="cyan"
//               />
//               <StatCard
//                 title="Gap Analysis"
//                 value="Critical"
//                 icon={<Shield className="text-red-400" />}
//                 color="red"
//                 desc="Focus on Graph Theory"
//               />
//               <StatCard
//                 title="Behavioral Sync"
//                 value="Pending"
//                 icon={<Cpu className="text-orange-400" />}
//                 color="orange"
//                 desc="Bar Raiser Prep"
//               />
//             </div>

//             <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
//               <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//                 <Code2 size={18} className="text-orange-500" />
//                 Active Missions
//               </h3>
//               <div className="space-y-3">
//                 {Object.keys(CURRICULUM).map((phase, idx) => {
//                   const items = CURRICULUM[phase];
//                   const phaseCompleted = items.filter(
//                     (i) => progress[i.id]
//                   ).length;
//                   const total = items.length;
//                   return (
//                     <div
//                       key={idx}
//                       className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
//                       onClick={() => setActiveTab("curriculum")}
//                     >
//                       <div className="flex items-center gap-4">
//                         <div
//                           className={`w-2 h-2 rounded-full ${
//                             phaseCompleted === total
//                               ? "bg-green-500"
//                               : "bg-orange-500 animate-pulse"
//                           }`}
//                         />
//                         <div>
//                           <p className="text-sm font-medium text-slate-200">
//                             {phase}
//                           </p>
//                           <p className="text-xs text-slate-500">
//                             {phaseCompleted}/{total} modules complete
//                           </p>
//                         </div>
//                       </div>
//                       <ChevronRight size={16} className="text-slate-600" />
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* VIEW: CURRICULUM / QUEST BOARD */}
//         {activeTab === "curriculum" && !selectedTopic && (
//           <div className="p-8 max-w-6xl mx-auto space-y-12 animate-in zoom-in-95 duration-300">
//             <header>
//               <h1 className="text-3xl font-bold text-white mb-2">
//                 Quest Board
//               </h1>
//               <p className="text-slate-400">
//                 Select a mission module to initiate training simulation.
//               </p>
//             </header>

//             {Object.keys(CURRICULUM).map((phase, idx) => (
//               <div key={idx} className="space-y-4">
//                 <h2 className="text-xl font-mono text-orange-400 uppercase tracking-widest flex items-center gap-2">
//                   <span className="w-2 h-2 bg-orange-500 inline-block" />
//                   {phase}
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {CURRICULUM[phase].map((item) => (
//                     <TiltCard
//                       key={item.id}
//                       className={`relative bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-orange-500/50 group`}
//                       onClick={() => setSelectedTopic(item)}
//                     >
//                       <div className="absolute top-4 right-4">
//                         {progress[item.id] ? (
//                           <CheckCircle2 className="text-green-500" size={20} />
//                         ) : (
//                           <Circle className="text-slate-700" size={20} />
//                         )}
//                       </div>
//                       <div className="mb-3">
//                         <span
//                           className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${
//                             item.difficulty === "Hard"
//                               ? "bg-red-500/20 text-red-400"
//                               : item.difficulty === "Design"
//                               ? "bg-purple-500/20 text-purple-400"
//                               : "bg-cyan-500/20 text-cyan-400"
//                           }`}
//                         >
//                           {item.difficulty}
//                         </span>
//                       </div>
//                       <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-orange-400 transition-colors">
//                         {item.title}
//                       </h3>
//                       <p className="text-xs text-slate-500 line-clamp-2">
//                         {item.desc}
//                       </p>
//                     </TiltCard>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* VIEW: TOPIC DETAIL (TRAINING DOJO) */}
//         {activeTab === "curriculum" && selectedTopic && (
//           <div className="h-full flex flex-col bg-slate-950 animate-in slide-in-from-right duration-300">
//             {/* Header */}
//             <div className="bg-slate-900/90 border-b border-slate-800 p-6 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
//               <button
//                 onClick={() => setSelectedTopic(null)}
//                 className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
//               >
//                 <ChevronRight className="rotate-180" size={20} />
//                 Back to Map
//               </button>
//               <div className="flex items-center gap-4">
//                 <span className="text-slate-500 text-sm font-mono uppercase">
//                   Status:
//                 </span>
//                 <button
//                   onClick={() =>
//                     updateProgress(
//                       selectedTopic.id,
//                       !progress[selectedTopic.id]
//                     )
//                   }
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-all ${
//                     progress[selectedTopic.id]
//                       ? "bg-green-500/20 border-green-500 text-green-400"
//                       : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
//                   }`}
//                 >
//                   {progress[selectedTopic.id]
//                     ? "Mission Complete"
//                     : "Mark Complete"}
//                 </button>
//               </div>
//             </div>

//             <div className="flex-1 overflow-y-auto p-6 md:p-8 max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
//               {/* LEFT COL: AI & COMMAND CENTER */}
//               <div className="space-y-6">
//                 <div>
//                   <h1 className="text-3xl font-bold text-white mb-2">
//                     {selectedTopic.title}
//                   </h1>
//                   <p className="text-slate-400 text-lg leading-relaxed">
//                     {selectedTopic.desc}
//                   </p>
//                 </div>

//                 {/* AI COMMAND CARD */}
//                 <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6 shadow-2xl relative overflow-hidden">
//                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-purple-500 to-cyan-500" />

//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-sm font-mono text-cyan-400 flex items-center gap-2">
//                       <Bot size={16} />
//                       AI_COMMAND_TERMINAL
//                     </h3>
//                   </div>

//                   {/* CONDITIONAL AI INTERFACE */}
//                   {selectedTopic.difficulty === "Core" ||
//                   selectedTopic.type === "Behavioral" ? (
//                     // BEHAVIORAL MODE: STAR REFINER
//                     <div className="space-y-4">
//                       <p className="text-sm text-slate-400">
//                         Paste your raw story below. Gemini will refine it into
//                         the STAR format tailored for Amazon.
//                       </p>
//                       <textarea
//                         value={starDraft}
//                         onChange={(e) => setStarDraft(e.target.value)}
//                         placeholder="Draft: I once had a project where..."
//                         className="w-full h-32 bg-black/40 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:border-orange-500 focus:outline-none transition-colors"
//                       />
//                       <button
//                         onClick={() => callGemini("refine")}
//                         disabled={isAiLoading || !starDraft}
//                         className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
//                       >
//                         {isAiLoading ? (
//                           <RefreshCw className="animate-spin" size={18} />
//                         ) : (
//                           <Sparkles size={18} />
//                         )}
//                         {isAiLoading
//                           ? "Refining Story..."
//                           : "Refine with STAR Method ✨"}
//                       </button>
//                     </div>
//                   ) : (
//                     // TECHNICAL MODE: EXPLAINER
//                     <div className="space-y-4">
//                       <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-slate-500 border border-slate-700/50">
//                         System Prompt: {selectedTopic.prompt.substring(0, 100)}
//                         ...
//                       </div>
//                       <div className="grid grid-cols-2 gap-3">
//                         <button
//                           onClick={() => copyToClipboard(selectedTopic.prompt)}
//                           className="bg-slate-700 hover:bg-slate-600 text-slate-200 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all"
//                         >
//                           <Copy size={16} />
//                           Copy Prompt
//                         </button>
//                         <button
//                           onClick={() => callGemini("explain")}
//                           disabled={isAiLoading}
//                           className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
//                         >
//                           {isAiLoading ? (
//                             <RefreshCw className="animate-spin" size={16} />
//                           ) : (
//                             <Sparkles size={16} />
//                           )}
//                           {isAiLoading ? "Analyzing..." : "Generate Lesson ✨"}
//                         </button>
//                       </div>
//                     </div>
//                   )}

//                   {/* AI OUTPUT DISPLAY */}
//                   {aiResponse && (
//                     <div className="mt-6 pt-4 border-t border-slate-700 animate-in fade-in slide-in-from-bottom-2">
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="text-xs text-orange-400 font-mono">
//                           INCOMING_TRANSMISSION...
//                         </span>
//                         <button
//                           onClick={() => copyToClipboard(aiResponse)}
//                           className="text-xs text-slate-500 hover:text-white flex items-center gap-1"
//                         >
//                           <Copy size={12} /> Copy
//                         </button>
//                       </div>
//                       <div className="bg-black/80 rounded-lg p-4 text-sm text-slate-300 font-mono max-h-96 overflow-y-auto whitespace-pre-wrap border border-slate-800 shadow-inner">
//                         {aiResponse}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Resource Links Mockup */}
//                 <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
//                   <h4 className="text-white font-medium mb-3 flex items-center gap-2">
//                     <BookOpen size={16} className="text-orange-500" />{" "}
//                     Recommended Resources
//                   </h4>
//                   <ul className="space-y-2 text-sm text-slate-400">
//                     <li className="flex items-center gap-2 hover:text-orange-400 cursor-pointer transition-colors">
//                       <ExternalLink size={12} /> Official Amazon Leadership
//                       Principles
//                     </li>
//                     <li className="flex items-center gap-2 hover:text-orange-400 cursor-pointer transition-colors">
//                       <ExternalLink size={12} /> LeetCode: {selectedTopic.title}{" "}
//                       Tag
//                     </li>
//                   </ul>
//                 </div>
//               </div>

//               {/* RIGHT COL: NOTES */}
//               <div className="flex flex-col h-full min-h-[500px] bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
//                 <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-800/30">
//                   <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
//                     <Save size={16} className="text-slate-500" />
//                     Field Notes
//                   </span>
//                   <span className="text-xs text-slate-600">
//                     Auto-saving enabled
//                   </span>
//                 </div>
//                 <textarea
//                   className="flex-1 w-full bg-transparent p-4 text-slate-300 font-mono text-sm focus:outline-none resize-none placeholder-slate-700"
//                   placeholder={`Log your learnings for ${selectedTopic.title} here...\n\nKey Takeaways:\n-\n-`}
//                   value={notes[selectedTopic.id] || ""}
//                   onChange={(e) => saveNote(selectedTopic.id, e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* VIEW: INTEL DATABASE (RESEARCH) */}
//         {activeTab === "intel" && (
//           <div className="p-8 max-w-5xl mx-auto animate-in fade-in duration-500 pb-20">
//             <header className="mb-10 border-b border-slate-800 pb-6">
//               <h1 className="text-3xl font-bold text-white flex items-center gap-3">
//                 <Database className="text-orange-500" />
//                 Intel Database: Audit Report 2025
//               </h1>
//               <p className="text-slate-400 mt-2">
//                 Source: Comprehensive Audit of Amazon SDE-1 Competency
//                 Evaluation
//               </p>
//             </header>

//             <div className="space-y-12">
//               <IntelSection title="1. Executive Summary" color="cyan">
//                 <p>
//                   The "18 Patterns" heuristic is{" "}
//                   <strong className="text-white">
//                     necessary but insufficient
//                   </strong>
//                   . The 2025 loop has introduced specific competencies that
//                   standard pattern matching fails to address: Advanced Graph
//                   Theory, Low-Level Design (LLD), and integrated Leadership
//                   Principles.
//                 </p>
//               </IntelSection>

//               <IntelSection
//                 title="2. Validated Patterns (Safe Zone)"
//                 color="green"
//               >
//                 <ul className="list-disc pl-5 space-y-2">
//                   <li>
//                     <strong className="text-green-400">Sliding Window:</strong>{" "}
//                     Confirmed #1 most asked. Critical for logs/streams.
//                   </li>
//                   <li>
//                     <strong className="text-green-400">Two Pointers:</strong>{" "}
//                     Valid for array/sum problems. Often mixed with Sorting.
//                   </li>
//                   <li>
//                     <strong className="text-green-400">Merge Intervals:</strong>{" "}
//                     Essential for logistics. Do not confuse with Topo Sort.
//                   </li>
//                   <li>
//                     <strong className="text-green-400">
//                       Top 'K' Elements:
//                     </strong>{" "}
//                     Amazon loves Heaps (Priority Queues).
//                   </li>
//                 </ul>
//               </IntelSection>

//               <IntelSection
//                 title="3. The Competency Gaps (Danger Zone)"
//                 color="red"
//               >
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="bg-red-950/20 border border-red-900/50 p-4 rounded-lg">
//                     <h4 className="font-bold text-red-400 mb-2">
//                       Gap 1: Advanced Graphs
//                     </h4>
//                     <p className="text-sm">
//                       BFS/DFS is not enough. You must know{" "}
//                       <strong>Dijkstra</strong> (weighted paths) and{" "}
//                       <strong>Kahn's Algorithm</strong> (Topo Sort for
//                       dependencies like 'Alien Dictionary').
//                     </p>
//                   </div>
//                   <div className="bg-red-950/20 border border-red-900/50 p-4 rounded-lg">
//                     <h4 className="font-bold text-red-400 mb-2">
//                       Gap 2: Low-Level Design (LLD)
//                     </h4>
//                     <p className="text-sm">
//                       Resurgence of OOD questions for SDE-1. "Design a Parking
//                       Lot" or "Bookstore". Requires knowledge of Classes,
//                       Interfaces, and SOLID principles.
//                     </p>
//                   </div>
//                 </div>
//               </IntelSection>

//               <IntelSection title="4. The Bar Raiser Protocol" color="orange">
//                 <p className="mb-4">
//                   Technical competency is only 50% of the score. The other 50%
//                   is Leadership Principles.
//                 </p>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {[
//                     "Customer Obsession",
//                     "Ownership",
//                     "Dive Deep",
//                     "Have Backbone",
//                   ].map((lp) => (
//                     <div
//                       key={lp}
//                       className="bg-orange-950/30 border border-orange-900/50 p-3 rounded text-center text-sm font-medium text-orange-200"
//                     >
//                       {lp}
//                     </div>
//                   ))}
//                 </div>
//               </IntelSection>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// /* SUB-COMPONENTS */

// function NavButton({ active, onClick, icon, label }: any) {
//   return (
//     <button
//       onClick={onClick}
//       className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-200 border-l-2
//         ${
//           active
//             ? "bg-slate-800/80 border-orange-500 text-white"
//             : "border-transparent text-slate-400 hover:text-white hover:bg-slate-800/30"
//         }`}
//     >
//       <span className={active ? "text-orange-500" : "text-slate-500"}>
//         {icon}
//       </span>
//       {label}
//     </button>
//   );
// }

// function StatCard({ title, value, icon, color, desc }: any) {
//   const styles = COLOR_STYLES[color] || COLOR_STYLES.cyan;

//   return (
//     <div
//       className={`bg-slate-900/80 border border-slate-800 p-6 rounded-xl backdrop-blur-sm relative overflow-hidden group`}
//     >
//       <div className={`absolute top-0 left-0 w-1 h-full ${styles.bg}`} />
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">
//             {title}
//           </p>
//           <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
//         </div>
//         <div className={`p-2 rounded-lg ${styles.bgSoft}`}>{icon}</div>
//       </div>
//       {desc && (
//         <p className="text-xs text-slate-500 border-t border-slate-800 pt-3 mt-2">
//           {desc}
//         </p>
//       )}
//     </div>
//   );
// }

// function IntelSection({ title, color, children }: any) {
//   const styles = COLOR_STYLES[color] || COLOR_STYLES.cyan;

//   return (
//     <section className="relative pl-6 border-l-2 border-slate-800">
//       <div
//         className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 ${styles.border}`}
//       />
//       <h2 className={`text-xl font-bold ${styles.text} mb-4`}>{title}</h2>
//       <div className="text-slate-300 leading-relaxed space-y-4">{children}</div>
//     </section>
//   );
// }
