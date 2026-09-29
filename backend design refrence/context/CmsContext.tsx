import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CmsTab, 
  CmsProjectItem, 
  Inquiry, 
  StudioConfig, 
  AnnouncementConfig, 
  ActivityLogItem, 
  CmsContextType,
  InquiryStatus
} from '../types';
import { ALL_PROJECTS } from '../../data/projectsData';

const STORAGE_KEYS = {
  PROJECTS: 'm2b_cms_projects_v2',
  INQUIRIES: 'm2b_cms_inquiries_v2',
  STUDIO: 'm2b_cms_studio_config_v2',
  ANNOUNCEMENT: 'm2b_cms_announcement_v2',
  LOGS: 'm2b_cms_activity_log_v2',
};

const DEFAULT_STUDIO_CONFIG: StudioConfig = {
  studioName: 'M2B',
  companyLegalName: 'M2B Technology Innovation Solutions',
  pillars: 'Technology | Innovation | Solutions',
  tagline: 'Connecting Today, Building Tomorrow',
  taglineSo: 'Isku Xidhka Maanta, Dhismaha Berri',
  founderName: 'Abdirahmaan Mire',
  founderRole: 'Senior Software Developer & Project Manager',
  founderBio: '9+ years leading enterprise systems, GIS registries, telecommunications platforms, and high-load web/mobile architecture across Somaliland and the Horn.',
  founderExperienceYears: 9,
  city: 'Hargeisa',
  country: 'Somaliland',
  officeAddress: 'Downtown Innovation District, Hargeisa, Somaliland',
  coordinates: '09°33\'42" N, 44°03\'36" E',
  email: 'abdirahmaan.mirre@gmail.com',
  phonePrimary: '+252 63 4400000',
  phoneSecondary: '+252 65 9900000',
  whatsApp: '+252634400000',
  businessHoursWeekdays: 'Saturday – Wednesday · 08:00 – 17:00 EAT',
  businessHoursThursday: 'Thursday · 08:00 – 13:00 EAT',
  timezone: 'Africa/Mogadishu (UTC+3)',
  statsTowersInspected: '1,420+',
  statsListenersCount: '85,000+',
  statsSchoolsManaged: '14+',
  statsMobileMoneyProcessed: '$4.2M+',
};

const DEFAULT_ANNOUNCEMENT: AnnouncementConfig = {
  enabled: true,
  textEn: 'Now accepting Q4 2026/2027 enterprise systems & ministry GIS tenders in Hargeisa.',
  textSo: 'Waxaan qaadaneynaa mashaariicda nidaamyada dawladda iyo shirkadaha ee Q4 Hargeysa.',
  actionTextEn: 'Schedule briefing',
  actionTextSo: 'Ballan qaado',
  actionUrl: '#contact',
  tone: 'gold',
};

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-101',
    clientName: 'Mustafa Jama',
    organization: 'Ministry of Transport & Civil Aviation',
    email: 'm.jama@mot.govsml.net',
    phone: '+252 63 4118920',
    projectType: 'Ministry / Gov system',
    budget: '$25k+',
    message: 'We require a national vehicle inspection & fleet verification registry with handheld scanner support for regional checkpoint police and ZAAD toll receipts.',
    status: 'new',
    priority: 'high',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    notes: 'Urgent ministry priority. Schedule discovery session with Abdirahmaan on Tuesday.',
    internalAssignee: 'Abdirahmaan Mire',
  },
  {
    id: 'inq-102',
    clientName: 'Dr. Hibaq Warsame',
    organization: 'Amoud Health & University Sciences',
    email: 'hwarsame@amoud.edu',
    phone: '+252 63 4882103',
    projectType: 'School / University',
    budget: '$10k–$25k',
    message: 'Inquiring about Dugsi ERP customized for 4,200 medical and engineering undergrads, including biometric attendance gates and semester transcript verifier.',
    status: 'reviewing',
    priority: 'high',
    createdAt: new Date(Date.now() - 3600000 * 22).toISOString(),
    notes: 'Requested architectural breakdown of Saturday-Wednesday weekly attendance matrix.',
    internalAssignee: 'Abdirahmaan Mire',
  },
  {
    id: 'inq-103',
    clientName: 'Abdiqani Hassan',
    organization: 'Dhaqan Media & Diaspora Sound',
    email: 'abdiqani@dhaqanmedia.co.uk',
    phone: '+44 7700 900142',
    projectType: 'Mobile app (Flutter)',
    budget: '$10k–$25k',
    message: 'Looking for a dedicated Flutter audio pipeline inspired by Qaari SL for our historical Somali oral poetry archive and live stream channels.',
    status: 'proposal_sent',
    priority: 'medium',
    createdAt: new Date(Date.now() - 3600000 * 54).toISOString(),
    notes: 'Proposal sent with Cloudflare R2 audio streaming estimate.',
    internalAssignee: 'Abdirahmaan Mire',
  },
  {
    id: 'inq-104',
    clientName: 'Khadar Ahmed',
    organization: 'Dalmar Logistics & Port Clearing',
    email: 'operations@dalmarlogistics.com',
    phone: '+252 65 7712390',
    projectType: 'ERP / Business operations',
    budget: '$5k–$10k',
    message: 'Need container tracking dispatch system linking Berbera Port container manifest to Hargeisa warehouse drop-offs with customer SMS notification.',
    status: 'contacted',
    priority: 'normal',
    createdAt: new Date(Date.now() - 3600000 * 96).toISOString(),
    notes: 'Initial WhatsApp outreach completed.',
  },
];

const INITIAL_LOGS: ActivityLogItem[] = [
  {
    id: 'log-1',
    title: 'TowerLine GIS Map Updated',
    description: 'Added 48 new regional broadcast mast coordinates in Sahil and Togdheer.',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    type: 'project',
    actor: 'Abdirahmaan Mire',
  },
  {
    id: 'log-2',
    title: 'New High Priority Lead',
    description: 'Ministry of Transport submitted RFP for vehicle inspection registry.',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    type: 'inquiry',
    actor: 'System Desk',
  },
  {
    id: 'log-3',
    title: 'Qaari SL Audio Sync',
    description: 'Surah Al-Baqarah ayah synchronization verified across Flutter test builds.',
    timestamp: new Date(Date.now() - 3600000 * 28).toISOString(),
    type: 'project',
    actor: 'Abdirahmaan Mire',
  },
];

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<CmsTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Projects State
  const [projects, setProjects] = useState<CmsProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load projects from storage', e);
    }
    return ALL_PROJECTS.map((p, idx) => ({
      ...p,
      published: true,
      featuredOrder: idx + 1,
      lastUpdated: new Date().toISOString(),
      completionYear: '2024-2026',
      somaliLeadDev: 'Abdirahmaan Mire',
    }));
  });

  // 2. Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load inquiries from storage', e);
    }
    return INITIAL_INQUIRIES;
  });

  // 3. Studio Config State
  const [studioConfig, setStudioConfig] = useState<StudioConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDIO);
      if (saved) return { ...DEFAULT_STUDIO_CONFIG, ...JSON.parse(saved) };
    } catch (e) {
      console.warn('Failed to load studio config', e);
    }
    return DEFAULT_STUDIO_CONFIG;
  });

  // 4. Announcement Config State
  const [announcement, setAnnouncement] = useState<AnnouncementConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENT);
      if (saved) return { ...DEFAULT_ANNOUNCEMENT, ...JSON.parse(saved) };
    } catch (e) {
      console.warn('Failed to load announcement config', e);
    }
    return DEFAULT_ANNOUNCEMENT;
  });

  // 5. Activity Log
  const [activityLog, setActivityLog] = useState<ActivityLogItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load logs', e);
    }
    return INITIAL_LOGS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.warn('Failed to save projects to storage', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.warn('Failed to save inquiries to storage', e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDIO, JSON.stringify(studioConfig));
    } catch (e) {
      console.warn('Failed to save studio config', e);
    }
  }, [studioConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(announcement));
    } catch (e) {
      console.warn('Failed to save announcement config', e);
    }
  }, [announcement]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(activityLog));
    } catch (e) {
      console.warn('Failed to save activity log', e);
    }
  }, [activityLog]);

  const addLog = (title: string, description: string, type: ActivityLogItem['type']) => {
    const newLog: ActivityLogItem = {
      id: `log-${Date.now()}`,
      title,
      description,
      timestamp: new Date().toISOString(),
      type,
      actor: studioConfig.founderName,
    };
    setActivityLog((prev) => [newLog, ...prev.slice(0, 40)]);
  };

  // Project operations
  const addProject = (projectData: Omit<CmsProjectItem, 'id' | 'lastUpdated'>) => {
    const id = (projectData.slug || projectData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')) + '-' + Date.now().toString().slice(-4);
    const newProject: CmsProjectItem = {
      ...projectData,
      id,
      lastUpdated: new Date().toISOString(),
    };
    setProjects((prev) => [newProject, ...prev]);
    addLog(`Created project: ${newProject.title}`, `Added to ${newProject.sector} sector`, 'project');
  };

  const updateProject = (id: string, updatedFields: Partial<CmsProjectItem>) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = {
            ...p,
            ...updatedFields,
            lastUpdated: new Date().toISOString(),
          };
          return updated;
        }
        return p;
      })
    );
    const target = projects.find((p) => p.id === id);
    addLog(`Updated project: ${target?.title || id}`, `Modified attributes and settings`, 'project');
  };

  const deleteProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    addLog(`Deleted project: ${target?.title || id}`, `Removed from website catalog`, 'project');
  };

  const toggleProjectFlagship = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return { ...p, isFlagship: !p.isFlagship, lastUpdated: new Date().toISOString() };
        }
        return p;
      })
    );
  };

  const toggleProjectPublished = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return { ...p, published: !p.published, lastUpdated: new Date().toISOString() };
        }
        return p;
      })
    );
  };

  // Inquiry operations
  const addInquiry = (inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInq: Inquiry = {
      ...inquiryData,
      id: `inq-${Date.now().toString().slice(-5)}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setInquiries((prev) => [newInq, ...prev]);
    addLog(`New Inquiry: ${newInq.organization || newInq.clientName}`, `${newInq.projectType} (${newInq.budget})`, 'inquiry');
  };

  const updateInquiryStatus = (id: string, status: InquiryStatus) => {
    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === id) {
          return { ...inq, status };
        }
        return inq;
      })
    );
    addLog(`Inquiry Status Updated`, `Lead #${id} marked as ${status}`, 'inquiry');
  };

  const updateInquiryNotes = (id: string, notes: string) => {
    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === id) {
          return { ...inq, notes };
        }
        return inq;
      })
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    addLog(`Deleted Lead`, `Removed record #${id}`, 'inquiry');
  };

  // Studio & Settings
  const updateStudioConfig = (config: Partial<StudioConfig>) => {
    setStudioConfig((prev) => ({ ...prev, ...config }));
    addLog('Studio Settings Updated', 'Modified company contact & leadership coordinates', 'setting');
  };

  const updateAnnouncement = (ann: Partial<AnnouncementConfig>) => {
    setAnnouncement((prev) => ({ ...prev, ...ann }));
    addLog('Announcement Updated', `Status banner: ${ann.enabled ? 'Enabled' : 'Disabled'}`, 'setting');
  };

  const resetToDefaults = () => {
    if (window.confirm('Reset all CMS content to default data? Any custom edits will be reverted.')) {
      setProjects(ALL_PROJECTS.map((p, idx) => ({
        ...p,
        published: true,
        featuredOrder: idx + 1,
        lastUpdated: new Date().toISOString(),
        completionYear: '2024-2026',
        somaliLeadDev: 'Abdirahmaan Mire',
      })));
      setInquiries(INITIAL_INQUIRIES);
      setStudioConfig(DEFAULT_STUDIO_CONFIG);
      setAnnouncement(DEFAULT_ANNOUNCEMENT);
      setActivityLog(INITIAL_LOGS);
      addLog('System Reset', 'All CMS records restored to initial production defaults', 'system');
    }
  };

  const exportDataJson = () => {
    const data = {
      exportDate: new Date().toISOString(),
      studio: studioConfig,
      announcement,
      projects,
      inquiries,
      activityLog,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `m2b_cms_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addLog('Backup Exported', 'Full CMS database exported to JSON', 'system');
  };

  const exportInquiriesCsv = () => {
    const headers = ['ID', 'Date', 'Client Name', 'Organization', 'Email', 'Phone', 'Project Type', 'Budget', 'Status', 'Message', 'Notes'];
    const rows = inquiries.map((inq) => [
      `"${inq.id}"`,
      `"${new Date(inq.createdAt).toLocaleDateString()}"`,
      `"${(inq.clientName || '').replace(/"/g, '""')}"`,
      `"${(inq.organization || '').replace(/"/g, '""')}"`,
      `"${(inq.email || '').replace(/"/g, '""')}"`,
      `"${(inq.phone || '').replace(/"/g, '""')}"`,
      `"${(inq.projectType || '').replace(/"/g, '""')}"`,
      `"${(inq.budget || '').replace(/"/g, '""')}"`,
      `"${inq.status}"`,
      `"${(inq.message || '').replace(/"/g, '""')}"`,
      `"${(inq.notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `m2b_inquiries_leads_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addLog('Leads Exported', 'Inbound CRM leads exported to CSV', 'system');
  };

  return (
    <CmsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        projects,
        inquiries,
        studioConfig,
        announcement,
        activityLog,
        searchQuery,
        setSearchQuery,
        addProject,
        updateProject,
        deleteProject,
        toggleProjectFlagship,
        toggleProjectPublished,
        addInquiry,
        updateInquiryStatus,
        updateInquiryNotes,
        deleteInquiry,
        updateStudioConfig,
        updateAnnouncement,
        resetToDefaults,
        exportDataJson,
        exportInquiriesCsv,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = (): CmsContextType => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
