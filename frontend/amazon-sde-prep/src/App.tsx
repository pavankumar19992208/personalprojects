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
import { api } from "./api/client";
import { Sun, X, Palette, Settings } from "lucide-react";

function AppContent() {
  const [user, setUser] = useState<UserSettings | null>(null);
  const [activeView, setActiveView] = useState<
    "dashboard" | "curriculum" | "resources"
  >("dashboard");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [progress, setProgress] = useState<ProgressState>({});
  const [targetPhase, setTargetPhase] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Record<string, number>>({}); // <--- New State
  const [showThemeGuide, setShowThemeGuide] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // LOAD DATA

  useEffect(() => {
    const savedUser = localStorage.getItem("amazon_sde_user");
    const savedProgress = localStorage.getItem("amazon_sde_progress");
    const savedBookmarks = localStorage.getItem("amazon_sde_bookmarks");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedProgress) setProgress(JSON.parse(savedProgress));
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

    // Check mobile state
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // ALWAYS SHOW GUIDE ON LOAD (Removed localStorage check)
    const timer = setTimeout(() => setShowThemeGuide(true), 1000);

    // Auto-dismiss after 5 seconds
    const dismissTimer = setTimeout(() => {
      setShowThemeGuide(false);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(dismissTimer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const dismissGuide = () => {
    setShowThemeGuide(false);
  };

  const handleLogin = (data: any) => {
    const userSettings = {
      name: data.user.name,
      targetDate: data.user.target_date,
      experienceLevel: data.user.experience_level,
    };
    setUser(userSettings);
    setProgress(data.progress || {});
    setBookmarks(data.bookmarks || {});

    localStorage.setItem("amazon_sde_user", JSON.stringify(userSettings));
    localStorage.setItem(
      "amazon_sde_progress",
      JSON.stringify(data.progress || {})
    );
    localStorage.setItem(
      "amazon_sde_bookmarks",
      JSON.stringify(data.bookmarks || {})
    );
  };

  // LOGOUT HANDLER
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("amazon_sde_user");
    localStorage.removeItem("token");
  };
  const handleToggleComplete = async (topicId: string) => {
    const newStatus = !progress[topicId];
    const newProg = { ...progress, [topicId]: newStatus };

    setProgress(newProg);
    localStorage.setItem("amazon_sde_progress", JSON.stringify(newProg));

    // Sync with backend
    try {
      await api.syncProgress(topicId, newStatus);
    } catch (e) {
      console.error("Failed to sync progress", e);
    }
  };
  const handleBookmarkUpdate = async (topicId: string, pageIndex: number) => {
    const newBookmarks = { ...bookmarks, [topicId]: pageIndex };
    setBookmarks(newBookmarks);
    localStorage.setItem("amazon_sde_bookmarks", JSON.stringify(newBookmarks));

    // Sync with backend
    try {
      await api.syncBookmark(topicId, pageIndex);
    } catch (e) {
      console.error("Failed to sync bookmark", e);
    }
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
  const handlePhaseClick = (phaseId: string) => {
    setActiveView("curriculum");
    setTargetPhase(phaseId);
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
    <div className="h-[100dvh] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans flex overflow-hidden transition-colors duration-300 relative">
      {/* Theme Guide Toast */}
      {showThemeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4 border border-slate-200 dark:border-slate-800 transform transition-all animate-in zoom-in-95 duration-300 relative overflow-hidden">
            {/* Decorative Background Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-purple-600"></div>

            <button
              onClick={dismissGuide}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center space-y-4 pt-2">
              <div className="p-3 bg-orange-50 dark:bg-slate-800 rounded-full ring-4 ring-orange-50/50 dark:ring-slate-800/50 animate-pulse">
                <Palette
                  size={32}
                  className="text-orange-600 dark:text-orange-400"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Customize Your Experience
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Prefer Dark Mode? You can switch themes anytime!
                </p>
              </div>

              <div className="bg-slate-100 dark:bg-slate-800/50 rounded-lg p-3 text-xs font-medium text-slate-600 dark:text-slate-400 w-full">
                {isMobile ? (
                  <span className="flex items-center justify-center gap-2">
                    <Settings size={14} /> Check <strong>System</strong> in
                    bottom nav
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sun size={14} /> Use the toggle in the{" "}
                    <strong>Sidebar</strong>
                  </span>
                )}
              </div>

              <button
                onClick={dismissGuide}
                className="w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
      <Sidebar
        user={user}
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          setSelectedTopic(null);
        }}
        percentage={percentage}
        shouldCollapse={!!selectedTopic}
        onLogout={handleLogout}
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
          selectedTopic.phase !== "DSA" ? (
            <SubjectDetail
              topic={selectedTopic}
              isCompleted={!!progress[selectedTopic.id]}
              onToggleComplete={() => handleToggleComplete(selectedTopic.id)}
              initialPage={bookmarks[selectedTopic.id] || 0}
              onPageChange={(page) => {
                handleBookmarkUpdate(selectedTopic.id, page);
              }}
              onBack={() => setSelectedTopic(null)}
            />
          ) : (
            <TopicDetail
              topic={selectedTopic}
              isCompleted={!!progress[selectedTopic.id]}
              onToggleComplete={() => handleToggleComplete(selectedTopic.id)}
              initialPage={bookmarks[selectedTopic.id] || 0} // <--- Pass initial page
              onPageChange={(page) =>
                handleBookmarkUpdate(selectedTopic.id, page)
              }
              onBack={() => setSelectedTopic(null)} // <--- Pass handler
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
                onPhaseClick={handlePhaseClick}
              />
            )}

            {activeView === "curriculum" && (
              <CurriculumBoard
                progress={progress}
                onSelectTopic={setSelectedTopic}
                scrollToPhase={targetPhase}
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
