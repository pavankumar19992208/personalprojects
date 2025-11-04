import {
  Github,
  ExternalLink,
  PlusCircle,
  Eye,
  DollarSign,
  Users,
  FolderKanban,
  Download, // Import the Download icon
  Power,
  AlertTriangle, // Add AlertTriangle
  //   X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react"; // Import useState
import developerProfileImage from "../../assets/profilepic.png"; // Import the local image

// Mock data for the developer's agents
const mockAgents = [
  {
    name: "Code Companion",
    type: "web",
    description:
      "An AI-powered assistant that provides real-time code suggestions, bug detection, and documentation lookups directly in your IDE.",
    domain: "Productivity",
    techStack: ["React", "TypeScript", "Node.js", "Python", "LLM API"],
    githubUrl: "https://github.com/user/code-companion",
    liveUrl: "https://user.github.io/code-companion",
    views: 12500,
    downloads: null,
    revenue: 450.75,
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=512&auto=format&fit=crop",
  },
  {
    name: "Study Buddy",
    type: "mobile",
    description:
      "An interactive learning agent that creates quizzes, summaries, and flashcards from any educational text or PDF.",
    domain: "Education",
    techStack: ["React Native", "Firebase", "PDF.js"],
    githubUrl: "https://github.com/user/study-buddy",
    liveUrl: null, // Mobile apps might not have a live URL
    views: 50000, // e.g., App Store page views
    downloads: 18000,
    revenue: 890.0,
    imageUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=512&auto=format&fit=crop",
  },
  {
    name: "Portfolio Architect",
    type: "web",
    description:
      "Generates stunning, responsive portfolio websites for developers and designers based on their GitHub and Behance profiles.",
    domain: "Development",
    techStack: ["Next.js", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/user/portfolio-architect",
    liveUrl: "https://user.github.io/portfolio-architect",
    views: 8200,
    downloads: null,
    revenue: 210.5,
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=512&auto=format&fit=crop",
  },
];

const DeveloperDashboard = () => {
  const { user, logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const totalViews = mockAgents.reduce((sum, agent) => sum + agent.views, 0);
  const totalRevenue = mockAgents.reduce(
    (sum, agent) => sum + agent.revenue,
    0
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <img
                src={developerProfileImage}
                alt="Developer profile"
                className="h-16 w-16 rounded-full object-cover ring-2 ring-white ring-offset-2 ring-offset-gray-100"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Developer Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Welcome back, {user?.name}! Here's an overview of your agents.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/submit"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors inline-flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                Submit New Agent
              </Link>
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="p-2 rounded-full transition-colors duration-300 hover:bg-red-100/50"
                title="Logout"
              >
                <Power className="h-5 w-5 text-red-600 stroke-[2.5] transition-all duration-300 filter drop-shadow-[0_0_2px_rgba(239,68,68,0.6)] group-hover:drop-shadow-[0_0_5px_rgba(239,68,68,1)]" />
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<FolderKanban className="text-primary-600" />}
              label="Total Agents"
              value={mockAgents.length}
            />
            <StatCard
              icon={<Eye className="text-primary-600" />}
              label="Total Views"
              value={totalViews.toLocaleString()}
            />
            <StatCard
              icon={<DollarSign className="text-primary-600" />}
              label="Total Revenue"
              value={`$${totalRevenue.toLocaleString()}`}
            />
            <StatCard
              icon={<Users className="text-primary-600" />}
              label="Subscribers"
              value="42"
            />
          </div>
        </header>

        {/* Agents Grid */}
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockAgents.map((agent, index) => (
              <AgentCard key={index} agent={agent} />
            ))}
          </div>
        </main>
        <LogoutConfirmationModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={logout}
        />
      </div>
    </div>
  );
};

// Sub-component for Stat Cards
const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
    <div className="bg-primary-100 p-3 rounded-lg">{icon}</div>
    <div>
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  </div>
);

// Sub-component for Agent Cards
const AgentCard = ({ agent }: { agent: (typeof mockAgents)[0] }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden">
    {/* Card Header */}
    <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center text-xs">
      <span className="font-semibold text-primary-700 bg-primary-100 px-2 py-1 rounded">
        {agent.domain}
      </span>
      <div className="flex items-center gap-3">
        <a
          href={agent.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-900"
          title="GitHub Repository"
        >
          <Github className="h-4 w-4" />
        </a>
        {agent.type === "web" && agent.liveUrl && (
          <a
            href={agent.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900"
            title="Live Demo"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
        {agent.type === "mobile" && (
          <a
            href="#" // Placeholder for an app store link
            className="text-gray-500 hover:text-gray-900"
            title="Download App"
          >
            <Download className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>

    {/* Card Body */}
    <div className="p-6 flex-grow">
      <div className="flex items-center mb-4">
        <img
          src={agent.imageUrl}
          alt={`${agent.name} logo`}
          className="h-12 w-12 rounded-full object-cover mr-4 flex-shrink-0"
        />
        <h3 className="text-2xl font-bold text-gray-900 leading-tight">
          {agent.name}
        </h3>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        {agent.description}
      </p>

      {/* Agent Stats Section */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          {agent.type === "web" ? (
            <Eye className="h-4 w-4 text-gray-400" />
          ) : (
            <Download className="h-4 w-4 text-gray-400" />
          )}
          <div>
            <span className="font-semibold text-gray-800">
              {agent.type === "web"
                ? agent.views.toLocaleString()
                : agent.downloads?.toLocaleString()}
            </span>
            <span className="ml-1">
              {agent.type === "web" ? "Views" : "Downloads"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <DollarSign className="h-4 w-4 text-gray-400" />
          <div>
            <span className="font-semibold text-gray-800">
              ${agent.revenue.toLocaleString()}
            </span>
            <span className="ml-1">Revenue</span>
          </div>
        </div>
      </div>
    </div>

    {/* Card Footer */}
    <div className="px-6 pt-6 pb-6 border-t mt-6">
      <h4 className="text-xs font-semibold text-gray-500 mb-3">TECH STACK</h4>
      <div className="flex flex-wrap gap-2">
        {agent.techStack.map((tech) => (
          <span
            key={tech}
            className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const LogoutConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center relative animate-in fade-in-0 zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
        </div>
        <div className="mt-3">
          <h3 className="text-lg font-semibold leading-6 text-gray-900">
            Logout Confirmation
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to sign out of your account?
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
            onClick={onConfirm}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;
