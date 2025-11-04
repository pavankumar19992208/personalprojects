import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: Omit<User, "role">, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("neuralifeUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: Omit<User, "role">, role: string) => {
    const fullUserData = { ...userData, role };
    localStorage.setItem("neuralifeUser", JSON.stringify(fullUserData));
    setUser(fullUserData);
    if (role === "developer") {
      navigate("/dashboard/developer");
    } else {
      navigate("/marketplace");
    }
  };

  const logout = () => {
    localStorage.removeItem("neuralifeUser");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
