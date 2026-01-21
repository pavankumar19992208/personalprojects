import { useState } from "react";
import SidebarNav from "./SidebarNav";
import DocContent from "./DocContent";
import { Menu, X } from "lucide-react";

export default function DocumentationLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    // [!code highlight:2] CHANGE: h-screen locks the height, overflow-hidden prevents body scroll
    <div className="flex flex-col md:flex-row h-screen bg-white overflow-hidden">
      {/* Mobile Header / Toggle */}
      <div className="md:hidden bg-gray-50 border-b p-4 flex justify-between items-center shrink-0">
        <span className="font-semibold text-gray-700">Documentation</span>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white border rounded shadow-sm"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-10 w-64 bg-gray-50 border-r transform transition-transform duration-200 ease-in-out
          md:relative md:translate-x-0 
          ${isMobileMenuOpen ? "translate-x-0 mt-[73px]" : "-translate-x-full md:mt-0"}
          /* [!code highlight:2] CHANGE: Sidebar handles its own scrolling */
          h-full overflow-y-auto
        `}
      >
        <div className="p-4">
           <div onClick={() => setIsMobileMenuOpen(false)}>
             <SidebarNav />
           </div>
        </div>
      </aside>

      {/* Main Content */}
      {/* [!code highlight:2] CHANGE: flex-1 and overflow-y-auto makes ONLY this part scroll */}
      <main className="flex-1 overflow-y-auto relative z-0 scroll-smooth">
        <DocContent />
      </main>
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-0 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}