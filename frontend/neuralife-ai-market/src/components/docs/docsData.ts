// src/components/docs/docsData.ts

export interface DocSection {
  id: string;
  title: string;
  file: string;
}

export const DOCS_SECTIONS: DocSection[] = [
  {
    id: "introduction",
    title: "Introduction to Agentic AI",
    file: "01_introduction.md",
  },
  { id: "setup", title: "Setup Environment", file: "02_setup_environment.md" },
  {
    id: "first-agent",
    title: "Build Your First AI Agent",
    file: "03_first_agent.md",
  },
  {
    id: "multi-agent",
    title: "Multi-Agent Systems",
    file: "04_multi_agent_systems.md",
  },
  { id: "tools", title: "ADK Tools Overview", file: "05_tools_overview.md" },
  {
    id: "memory",
    title: "Memory & Sessions",
    file: "06_memory_and_sessions.md",
  },
  {
    id: "observability",
    title: "Observability & Evaluation",
    file: "07_observability.md",
  },
  {
    id: "capstone",
    title: "Capstone – Agent Evaluator AI",
    file: "08_agent_evaluator_ai.md",
  },
  {
    id: "integration",
    title: "Integration with NeuraLife",
    file: "09_integration_neuralife.md",
  },
  {
    id: "publish",
    title: "Build, Publish & Earn",
    file: "10_build_and_earn.md",
  },
];
