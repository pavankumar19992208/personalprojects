import { useState } from "react";
import { Code, Briefcase, TrendingUp, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type UserRole = "developer" | "employer" | "investor";

const themes = {
  developer: {
    primary: "primary",
    icon: <Code className="h-8 w-8" />,
    title: "Developer Login",
    subtitle: "Access your dashboard and manage your agents.",
  },
  employer: {
    primary: "accent",
    icon: <Briefcase className="h-8 w-8" />,
    title: "Employer Login",
    subtitle: "Discover top AI talent and post opportunities.",
  },
  investor: {
    primary: "green",
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Investor Login",
    subtitle: "Track high-traction agents and opportunities.",
  },
};

const mockUsers = {
  developer: {
    email: "dev@example.com",
    password: "password123",
    name: "Alex",
  },
  employer: { email: "hr@example.com", password: "password123", name: "Sarah" },
  investor: {
    email: "invest@example.com",
    password: "password123",
    name: "Chris",
  },
};

const Login = () => {
  const [activeRole, setActiveRole] = useState<UserRole>("developer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //   const navigate = useNavigate();
  const { login } = useAuth();
  const currentTheme = themes[activeRole];
  const primaryColor = currentTheme.primary;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = mockUsers[activeRole];

      if (email === user.email && password === user.password) {
        console.log("Login Successful for:", activeRole.toUpperCase());
        const { password, ...userData } = user; // Don't store password
        login(userData, activeRole);
      } else {
        setError("Invalid email or password.");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div
            className={cn("p-8 text-white transition-colors duration-300", {
              "bg-primary-600": primaryColor === "primary",
              "bg-accent-600": primaryColor === "accent",
              "bg-green-600": primaryColor === "green",
            })}
          >
            <div className="flex items-center gap-4 mb-2">
              {currentTheme.icon}
              <h1 className="text-2xl font-bold">{currentTheme.title}</h1>
            </div>
            <p className="text-sm opacity-90">{currentTheme.subtitle}</p>
          </div>

          <div className="p-8">
            <div className="flex border-b mb-6">
              {(Object.keys(themes) as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setActiveRole(role);
                    setError("");
                  }}
                  className={cn(
                    "flex-1 py-2 text-sm font-semibold capitalize transition-colors duration-300",
                    activeRole === role
                      ? `border-b-2 ${
                          themes[role].primary === "primary"
                            ? "border-primary-500 text-primary-600"
                            : themes[role].primary === "accent"
                            ? "border-accent-500 text-accent-600"
                            : "border-green-500 text-green-600"
                        }`
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {role}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-300 disabled:bg-gray-400",
                    {
                      "bg-primary-600 hover:bg-primary-700 focus:ring-primary-500":
                        primaryColor === "primary",
                      "bg-accent-600 hover:bg-accent-700 focus:ring-accent-500":
                        primaryColor === "accent",
                      "bg-green-600 hover:bg-green-700 focus:ring-green-500":
                        primaryColor === "green",
                    }
                  )}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
