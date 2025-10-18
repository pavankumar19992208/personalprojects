// filepath: p:\personalspace\projects\frontend\neuralife-ai-market\src\pages\AgentDetail.tsx
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Eye,
  //   Code,
  Download,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import type { Agent } from "../types";

// Using the same mock data for now. This would be a single API call in a real app.
const mockAgents: Agent[] = [
  {
    id: "1",
    name: "StudyBuddy AI",
    description:
      "An intelligent study assistant that helps students create personalized learning plans, generate summaries from lecture notes, and quiz themselves on key concepts to improve retention.",
    category: "education",
    type: "web",
    developer: {
      id: "dev1",
      name: "Priya Sharma",
      email: "priya@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
      totalAgents: 3,
      totalEarnings: 1200,
      joinedAt: "2025-01-15",
      skills: ["Python", "React", "AI/ML", "NLP"],
    },
    thumbnail:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800",
    demoUrl: "https://example.com/studybuddy",
    views: 1234,
    rating: 4.5,
    createdAt: "2025-02-01",
    tags: ["Education", "AI Tutor", "Study Help", "Productivity"],
    status: "active",
  },
  // Add other agents here to allow navigation between them
];

const AgentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const agent = mockAgents.find((a) => a.id === id);

  if (!agent) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Agent not found</h2>
        <Link to="/marketplace" className="text-primary-600 hover:underline">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {agent.name}
            </h1>
            <p className="text-gray-600 text-lg mb-6">{agent.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {agent.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Agent Demo
            </h3>
            <div className="aspect-video bg-gray-200 rounded-lg mb-8">
              {/* Placeholder for a demo video or interactive element */}
              <img
                src={agent.thumbnail}
                alt="Agent Thumbnail"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < Math.round(agent.rating)
                          ? "fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-700 font-semibold">
                    {agent.rating.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Eye className="h-5 w-5 mr-2" />
                  <span>{agent.views.toLocaleString()} views</span>
                </div>
              </div>
              <a
                href={agent.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center bg-primary-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Live Demo
              </a>
              {agent.downloadUrl && (
                <a
                  href={agent.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full inline-flex items-center justify-center bg-accent-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-accent-700 transition-colors"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download
                </a>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h4 className="text-lg font-semibold mb-4">Developer</h4>
              <div className="flex items-center">
                <img
                  src={agent.developer.avatar}
                  alt={agent.developer.name}
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-bold text-gray-900">
                    {agent.developer.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Joined {agent.developer.joinedAt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
