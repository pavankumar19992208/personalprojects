import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import AgentDetail from "./pages/AgentDetail";
import SubmitAgent from "./pages/SubmitAgent";
import Login from "./pages/Login";
import DeveloperDashboard from "./pages/dashboards/DeveloperDashboard";
// Import other pages as we build them

function App() {
  return (
    <Router basename="/personalprojects/neuralife-ai-market">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            {/* Add other routes as we build them */}
            <Route path="/agent/:id" element={<AgentDetail />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/submit" element={<SubmitAgent />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard/developer"
              element={<DeveloperDashboard />}
            />
            {/* <Route path="/business" element={<BusinessSolutions />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
