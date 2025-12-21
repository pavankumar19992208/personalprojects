export interface Problem {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  url: string;
  section?: string;
}

export interface SubTopic {
  id: string;
  title: string;
  difficulty:
    | "Core"
    | "Medium"
    | "Hard"
    | "Easy"
    | "Theory"
    | "Critical"
    | "Mandatory"
    | "High";
  priority: "Critical" | "High" | "Medium" | "Low" | "Mandatory";
  desc: string;
}

export interface Topic {
  id: string;
  title: string;
  phase: "DSA" | "LLD" | "CS_Fund" | "Behavioral";
  difficulty:
    | "Core"
    | "Easy"
    | "Medium"
    | "Hard"
    | "Design"
    | "Easy/Med"
    | "Medium/Hard"
    | "Theory";
  priority: "Critical" | "High" | "Medium" | "Mandatory";
  frequency: string;
  desc: string;
  explanation: string;
  visualType:
    | "window"
    | "array"
    | "tree"
    | "graph"
    | "lld-parking"
    | "star-method"
    | "heap"
    | "db"
    | "network"
    | "os"
    | "oop-pillars"
    | "scale-balance"
    | "pillars"
    | "factory-belt"
    | "adapter-plug"
    | "observer-signal"
    | "parking-grid"
    | "none";
  codeSnippet?: string;
  prompt: string;
  problems: Problem[];
  subTopics?: SubTopic[];
}

export interface CurriculumPhase {
  id: string;
  title: string;
  desc: string;
  topics: Topic[];
}

export interface UserSettings {
  name: string;
  targetDate: string;
  experienceLevel: "Intern" | "New Grad" | "Experienced";
}

export interface ProgressState {
  [topicId: string]: boolean;
}
