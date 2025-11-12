import SidebarNav from "./SidebarNav";
import DocContent from "./DocContent";

export default function DocumentationLayout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <SidebarNav />
      <main className="flex-1">
        <DocContent />
      </main>
    </div>
  );
}
