import { NavLink } from "react-router-dom";
import { DOCS_SECTIONS } from "./docsData";

export default function SidebarNav() {
  return (
    // [!code highlight:2] CHANGE: Removed h-screen and sticky. It is just a list now.
    <nav className="w-full">
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
              {/* Optional: Add a visual badge for WIP items */}
              {!section.available && (
                <span className="ml-2 text-[10px] uppercase bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded-full">
                  WIP
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}