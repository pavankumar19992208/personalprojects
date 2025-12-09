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
import { ThemeProvider } from "./context/ThemeContext";

function AppContent() {
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
        color: "text-green-600 dark:text-green-400",
      };

    const today = new Date();
    const target = new Date(user.targetDate);
    const diffTime = Math.abs(target.getTime() - today.getTime());
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const totalUnits = 60;
    const unitsPerDay = totalUnits / (daysLeft || 1);

    let status = "Comfortable";
    let color = "text-green-600 dark:text-green-400";
    if (unitsPerDay > 3) {
      status = "SUICIDE MISSION";
      color = "text-red-600 dark:text-red-500";
    } else if (unitsPerDay > 1.5) {
      status = "AGGRESSIVE";
      color = "text-orange-600 dark:text-orange-400";
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans flex overflow-hidden transition-colors duration-300">
      <Sidebar
        user={user}
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          setSelectedTopic(null);
        }}
        percentage={percentage}
      />

      <main className="flex-1 relative overflow-hidden flex flex-col">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {selectedTopic ? (
          selectedTopic.subTopics && selectedTopic.subTopics.length > 0 ? (
            <SubjectDetail
              topic={selectedTopic}
              onBack={() => setSelectedTopic(null)}
            />
          ) : (
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
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 relative z-10">
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

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
