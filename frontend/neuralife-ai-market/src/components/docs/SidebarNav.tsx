import { NavLink } from "react-router-dom";
import { DOCS_SECTIONS } from "./docsData";

export default function SidebarNav() {
  return (
    <nav className="w-full md:w-64 bg-gray-50 border-r border-gray-200 h-screen p-4 sticky top-0 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">
        Documentation
      </h2>
      <ul className="space-y-1">
        {DOCS_SECTIONS.map((section) => (
          <li key={section.id}>
            <NavLink
              to={`/documentation/${section.id}`}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-600 text-white"
                    : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                }`
              }
            >
              {section.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
