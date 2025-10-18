export interface Agent {
  id: string;
  name: string;
  description: string;
  category: AgentCategory;
  type: 'web' | 'mobile';
  developer: Developer;
  thumbnail: string;
  demoUrl?: string;
  downloadUrl?: string;
  views: number;
  rating: number;
  createdAt: string;
  tags: string[];
  status: 'active' | 'pending' | 'rejected';
}

export type AgentCategory = 
  | 'productivity'
  | 'education'
  | 'healthcare'
  | 'finance'
  | 'entertainment'
  | 'business'
  | 'development'
  | 'other';

export interface Developer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  totalAgents: number;
  totalEarnings: number;
  joinedAt: string;
  skills: string[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface EarningStats {
  totalEarnings: number;
  thisMonthEarnings: number;
  lastMonthEarnings: number;
  pendingPayout: number;
  adImpressions: number;
  adClicks: number;
}

export interface AgentSubmission {
  name: string;
  description: string;
  category: AgentCategory;
  type: 'web' | 'mobile';
  tags: string[];
  demoUrl?: string;
  repositoryUrl?: string;
  screenshots: File[];
  apkFile?: File;
  demoVideo?: File;
  playStoreMetadata?: {
    shortDescription: string;
    fullDescription: string;
    keywords: string[];
  };
}

export interface BusinessInquiry {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  description: string;
}
