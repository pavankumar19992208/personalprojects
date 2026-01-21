export interface DocSection {
  id: string;
  title: string;
  file: string;
  available: boolean; // [!code ++] Add this flag
}

export const DOCS_SECTIONS: DocSection[] = [
  {
    id: "introduction",
    title: "Introduction to Agentic AI",
    file: "01_introduction.md",
    available: true,
  },
  { 
    id: "setup", 
    title: "Setup Environment", 
    file: "02_setup_environment.md",
    available: true,
  },
  {
    id: "first-agent",
    title: "Build Your First AI Agent",
    file: "03_first_agent.md",
    available: true,
  },
  // [!code highlight:10] Mark the rest as False
  {
    id: "multi-agent",
    title: "Multi-Agent Systems",
    file: "04_multi_agent_systems.md",
    available: false,
  },
  { id: "tools", title: "ADK Tools Overview", file: "05_tools_overview.md", available: false },
  {
    id: "memory",
    title: "Memory & Sessions",
    file: "06_memory_and_sessions.md",
    available: false,
  },
  {
    id: "observability",
    title: "Observability & Evaluation",
    file: "07_observability.md",
    available: false,
  },
  {
    id: "capstone",
    title: "Capstone – Agent Evaluator AI",
    file: "08_agent_evaluator_ai.md",
    available: false,
  },
  {
    id: "integration",
    title: "Integration with NeuraLife",
    file: "09_integration_neuralife.md",
    available: false,
  },
  {
    id: "publish",
    title: "Build, Publish & Earn",
    file: "10_build_and_earn.md",
    available: false,
  },
];