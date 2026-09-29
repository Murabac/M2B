import { ProjectItem, WorkCategory } from '../types';

export type CmsTab = 
  | 'dashboard' 
  | 'projects' 
  | 'inquiries' 
  | 'products' 
  | 'studio' 
  | 'settings';

export type InquiryStatus = 
  | 'new' 
  | 'reviewing' 
  | 'contacted' 
  | 'proposal_sent' 
  | 'won' 
  | 'archived';

export interface Inquiry {
  id: string;
  clientName: string;
  organization: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  status: InquiryStatus;
  priority: 'high' | 'medium' | 'normal';
  createdAt: string;
  notes?: string;
  internalAssignee?: string;
}

export interface CmsProjectItem extends ProjectItem {
  published: boolean;
  featuredOrder?: number;
  lastUpdated: string;
  completionYear?: string;
  somaliLeadDev?: string;
}

export interface StudioConfig {
  studioName: string;
  companyLegalName: string;
  pillars: string;
  tagline: string;
  taglineSo: string;
  founderName: string;
  founderRole: string;
  founderBio: string;
  founderExperienceYears: number;
  city: string;
  country: string;
  officeAddress: string;
  coordinates: string;
  email: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsApp: string;
  businessHoursWeekdays: string;
  businessHoursThursday: string;
  timezone: string;
  statsTowersInspected: string;
  statsListenersCount: string;
  statsSchoolsManaged: string;
  statsMobileMoneyProcessed: string;
}

export interface AnnouncementConfig {
  enabled: boolean;
  textEn: string;
  textSo: string;
  actionTextEn: string;
  actionTextSo: string;
  actionUrl: string;
  tone: 'gold' | 'navy' | 'emerald';
}

export interface ActivityLogItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'project' | 'inquiry' | 'system' | 'setting';
  actor?: string;
}

export interface CmsContextType {
  activeTab: CmsTab;
  setActiveTab: (tab: CmsTab) => void;
  projects: CmsProjectItem[];
  inquiries: Inquiry[];
  studioConfig: StudioConfig;
  announcement: AnnouncementConfig;
  activityLog: ActivityLogItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  // Project operations
  addProject: (project: Omit<CmsProjectItem, 'id' | 'lastUpdated'>) => void;
  updateProject: (id: string, project: Partial<CmsProjectItem>) => void;
  deleteProject: (id: string) => void;
  toggleProjectFlagship: (id: string) => void;
  toggleProjectPublished: (id: string) => void;
  // Inquiry operations
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: InquiryStatus) => void;
  updateInquiryNotes: (id: string, notes: string) => void;
  deleteInquiry: (id: string) => void;
  // Studio & Settings
  updateStudioConfig: (config: Partial<StudioConfig>) => void;
  updateAnnouncement: (announcement: Partial<AnnouncementConfig>) => void;
  resetToDefaults: () => void;
  exportDataJson: () => void;
  exportInquiriesCsv: () => void;
}
