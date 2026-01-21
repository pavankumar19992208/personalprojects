import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import AgentCard from "../components/layout/features/AgentCard";
import type { Agent, AgentCategory } from "../types";

// Mock data - replace with API calls later
const mockAgents: Agent[] = [
  {
    id: "1",
    name: "StudyBuddy AI",
    description:
      "An intelligent study assistant that helps students create personalized learning plans and quiz themselves.",
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
      skills: ["Python", "React", "AI/ML"],
    },
    thumbnail:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400",
    demoUrl: "https://example.com/studybuddy",
    views: 1234,
    rating: 4.5,
    createdAt: "2025-02-01",
    tags: ["Education", "AI Tutor", "Study Help"],
    status: "active",
  },
  // Add more mock agents as neede
];

const categories: AgentCategory[] = [
  "productivity",
  "education",
  "healthcare",
  "finance",
  "entertainment",
  "business",
  "development",
  "other",
];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    AgentCategory | "all"
  >("all");
  const [selectedType, setSelectedType] = useState<"all" | "web" | "mobile">(
    "all"
  );

  const filteredAgents = useMemo(() => {
    return mockAgents.filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || agent.category === selectedCategory;
      const matchesType = selectedType === "all" || agent.type === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchQuery, selectedCategory, selectedType]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Agent Marketplace
          </h1>
          <p className="text-gray-600 text-lg">
            Discover and deploy cutting-edge AI agents built by talented
            developers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Find Ai Agents.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value as AgentCategory | "all")
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={selectedType}
                onChange={(e) =>
                  setSelectedType(e.target.value as "all" | "web" | "mobile")
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="web">Web Agents</option>
                <option value="mobile">Mobile Apps</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold">{filteredAgents.length}</span>{" "}
            agents
          </p>
        </div>

        {/* Agent Grid */}
        {filteredAgents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No agents found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
