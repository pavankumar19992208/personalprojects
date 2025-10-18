import { Link } from "react-router-dom";
import { Eye, Star, ExternalLink, Smartphone, Globe } from "lucide-react";
import type { Agent } from "../../../types";

interface AgentCardProps {
  agent: Agent;
}

const AgentCard = ({ agent }: AgentCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-accent-100">
        <img
          src={agent.thumbnail}
          alt={agent.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          {agent.type === "web" ? (
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
              <Globe className="h-4 w-4 text-primary-600" />
              <span className="text-xs font-medium">Web</span>
            </div>
          ) : (
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
              <Smartphone className="h-4 w-4 text-accent-600" />
              <span className="text-xs font-medium">Mobile</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <Link to={`/agent/${agent.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
            {agent.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {agent.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {agent.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Developer Info */}
        <div className="flex items-center mb-4">
          <img
            src={agent.developer.avatar || "https://via.placeholder.com/40"}
            alt={agent.developer.name}
            className="h-8 w-8 rounded-full mr-2"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {agent.developer.name}
            </p>
            <p className="text-xs text-gray-500">
              {agent.developer.totalAgents} agents
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {agent.views}
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
              {agent.rating}
            </div>
          </div>

          <Link
            to={`/agent/${agent.id}`}
            className="text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
