import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Zap, LogIn, LayoutDashboard } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Submit Agent", path: "/submit" },
    // { name: "For Business", path: "/business" }, // Removed for simplicity, can be re-added
  ];

  const isActive = (path: string) => location.pathname === path;

  const AuthButton = ({ isMobile = false }: { isMobile?: boolean }) => {
    const baseClasses =
      "transition-colors inline-flex items-center justify-center gap-2";
    const mobileClasses = isMobile
      ? "block w-full text-center px-3 py-2 rounded-md text-base font-medium"
      : "px-4 py-2 rounded-lg text-sm font-medium";

    if (user) {
      return (
        <Link
          to="/dashboard/developer"
          onClick={() => isMobile && setIsOpen(false)}
          className={`${baseClasses} ${mobileClasses} bg-primary-100 text-primary-700 hover:bg-primary-200`}
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>
      );
    }
    return (
      <Link
        to="/login"
        onClick={() => isMobile && setIsOpen(false)}
        className={`${baseClasses} ${mobileClasses} bg-primary-600 text-white hover:bg-primary-700`}
      >
        <LogIn className="h-4 w-4" />
        Login
      </Link>
    );
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">NeuraLife</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors px-2 py-2 text-sm font-medium ${
                  isActive(item.path)
                    ? "text-primary-600"
                    : "text-gray-700 hover:text-primary-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <AuthButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <AuthButton isMobile={true} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
