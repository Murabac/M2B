export type PageId = 'home' | 'work' | 'products' | 'capabilities' | 'studio' | 'contact' | 'case-study';

export type Language = 'en' | 'so';
export type ThemeMode = 'light' | 'dark';
export type ViewportMode = 'responsive' | 'mobile' | 'desktop';

export type WorkCategory = 
  | 'all' 
  | 'government' 
  | 'operations' 
  | 'education' 
  | 'faith' 
  | 'commerce' 
  | 'mobile' 
  | 'websites';

export interface ProjectItem {
  id: string;
  slug?: string;
  title: string;
  client: string;
  clientSo?: string;
  sector: string;
  category: WorkCategory;
  tagline: string;
  taglineSo?: string;
  description: string;
  descriptionSo?: string;
  outcome: string;
  outcomeSo?: string;
  stack: string[];
  isFlagship?: boolean;
  status: 'Live' | 'In Production' | 'Studio Product' | 'Coming Soon';
  liveUrl?: string;
  metrics?: { label: string; value: string }[];
  visualType: 'map' | 'audio' | 'dashboard' | 'mobile' | 'ticket' | 'shopping' | 'invoice' | 'web';
  accentColor?: string;
}

export interface FlagshipCaseStudy {
  slug: string;
  title: string;
  client: string;
  sector: string;
  heroHeadline: string;
  heroSubhead: string;
  problem: string;
  problemSo?: string;
  approach: string;
  approachSo?: string;
  whatWeShipped: string[];
  whatWeShippedSo?: string[];
  stack: { category: string; technologies: string[] }[];
  outcome: string;
  outcomeSo?: string;
  stats: { label: string; value: string; desc: string }[];
  liveUrl?: string;
  hasBilingualSupport: boolean;
  mockupType: 'towerline-map' | 'qaari-audio' | 'aragsan-ops';
}

export interface CapabilityItem {
  id: string;
  title: string;
  titleSo?: string;
  shortDesc: string;
  shortDescSo?: string;
  icon: string;
  bullets: string[];
  bulletsSo?: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  titleSo: string;
  description: string;
  descriptionSo: string;
  deliverables: string[];
}
