import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              NeuraLife AI Market
            </h3>
            <p className="text-sm">
              The world's first Agentic AI Marketplace empowering students and
              businesses to build, publish, and monetize AI Agents.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/marketplace"
                  className="hover:text-white transition-colors"
                >
                  Browse Agents
                </Link>
              </li>
              <li>
                <Link
                  to="/submit"
                  className="hover:text-white transition-colors"
                >
                  Submit Agent
                </Link>
              </li>
              <li>
                <Link
                  to="/business"
                  className="hover:text-white transition-colors"
                >
                  For Business
                </Link>
              </li>
              <li>
                <Link
                  to="/documentation"
                  className="hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/getting-started"
                  className="hover:text-white transition-colors"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  to="/developer-guide"
                  className="hover:text-white transition-colors"
                >
                  Developer Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="hover:text-white transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} NeuraLife AI Market. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
