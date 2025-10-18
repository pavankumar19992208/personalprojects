import { Link } from "react-router-dom";
import {
  Rocket,
  DollarSign,
  Users,
  TrendingUp,
  Code,
  Briefcase,
  ArrowRight,
  Star,
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Build & Publish",
      description:
        "Create AI agents in any category and publish them on our platform instantly.",
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Monetize Early",
      description:
        "Earn revenue from day one through AdSense integration on your agents.",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Scale to Startup",
      description:
        "High-traction agents attract investors. We incubate and hold equity in your venture.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Get Discovered",
      description:
        "Recruiters and HRs can find you through your live, proven AI projects.",
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "B2B Solutions",
      description:
        "Businesses get custom AI agents built for their specific automation needs.",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Learn & Grow",
      description:
        "Access documentation, tutorials, and community support to master Agentic AI.",
    },
  ];

  const stats = [
    { label: "Active Agents", value: "150+" },
    { label: "Developers", value: "500+" },
    { label: "Total Revenue", value: "$50K+" },
    { label: "Business Clients", value: "25+" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              The World's First
              <span className="text-primary-600"> Agentic AI Marketplace</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Empowering students, developers, and businesses to build, publish,
              and monetize AI Agents. Transform your academic projects into
              revenue-generating products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/marketplace"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center justify-center"
              >
                Explore Marketplace
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/submit"
                className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center justify-center"
              >
                Submit Your Agent
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose NeuraLife?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A complete ecosystem for AI innovation, entrepreneurship, and
              career growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-primary-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Launch Your AI Agent?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join hundreds of developers already monetizing their AI innovations
          </p>
          <Link
            to="/submit"
            className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            <Rocket className="mr-2 h-5 w-5" />
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
