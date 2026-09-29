import React, { useState } from 'react';
import { useCms } from './context/CmsContext';
import { CmsHeader } from './components/CmsHeader';
import { CmsSidebar } from './components/CmsSidebar';
import { CmsMobileNav } from './components/CmsMobileNav';
import { ProjectEditorModal } from './components/ProjectEditorModal';
import { InquiryDetailModal } from './components/InquiryDetailModal';
import { DashboardView } from './views/DashboardView';
import { ProjectsManagerView } from './views/ProjectsManagerView';
import { InquiriesManagerView } from './views/InquiriesManagerView';
import { ProductsManagerView } from './views/ProductsManagerView';
import { StudioSettingsView } from './views/StudioSettingsView';
import { SiteSettingsView } from './views/SiteSettingsView';
import { CmsProjectItem, Inquiry } from './types';

interface CmsAppProps {
  onReturnToPublic: () => void;
}

export const CmsApp: React.FC<CmsAppProps> = ({ onReturnToPublic }) => {
  const { 
    activeTab, 
    addProject, 
    updateProject, 
    deleteInquiry, 
    updateInquiryStatus, 
    updateInquiryNotes 
  } = useCms();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectEditorOpen, setProjectEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<CmsProjectItem | null>(null);
  const [inspectingInquiry, setInspectingInquiry] = useState<Inquiry | null>(null);

  const handleOpenNewProject = () => {
    setEditingProject(null);
    setProjectEditorOpen(true);
  };

  const handleEditProject = (proj: CmsProjectItem) => {
    setEditingProject(proj);
    setProjectEditorOpen(true);
  };

  const handleSaveProject = (formData: any) => {
    if (editingProject) {
      updateProject(editingProject.id, formData);
    } else {
      addProject(formData);
    }
  };

  return (
    <div className="min-h-screen bg-[#030914] text-white flex flex-col font-sans selection:bg-[#D4AF37] selection:text-slate-950">
      <div className="flex flex-1">
        {/* Desktop Sidebar (hidden on mobile, lg:flex) */}
        <CmsSidebar
          onReturnToPublic={onReturnToPublic}
          onOpenNewProject={handleOpenNewProject}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top CMS Header */}
          <CmsHeader
            onReturnToPublic={onReturnToPublic}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
            onOpenNewProjectModal={handleOpenNewProject}
          />

          {/* Active View Container with mobile bottom padding to clear nav bar */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-28 lg:pb-12">
            {activeTab === 'dashboard' && (
              <DashboardView
                onOpenNewProject={handleOpenNewProject}
                onSelectInquiry={(inq) => setInspectingInquiry(inq)}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsManagerView
                onOpenNewProject={handleOpenNewProject}
                onEditProject={handleEditProject}
              />
            )}

            {activeTab === 'inquiries' && (
              <InquiriesManagerView
                onSelectInquiry={(inq) => setInspectingInquiry(inq)}
              />
            )}

            {activeTab === 'products' && (
              <ProductsManagerView />
            )}

            {activeTab === 'studio' && (
              <StudioSettingsView />
            )}

            {activeTab === 'settings' && (
              <SiteSettingsView />
            )}
          </main>
        </div>
      </div>

      {/* Mobile Navigation & Slide-up Drawer */}
      <CmsMobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onReturnToPublic={onReturnToPublic}
        onOpenNewProject={handleOpenNewProject}
      />

      {/* Project Editor Modal */}
      <ProjectEditorModal
        isOpen={projectEditorOpen}
        project={editingProject}
        onClose={() => {
          setProjectEditorOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
      />

      {/* Inquiry Detail Modal */}
      <InquiryDetailModal
        isOpen={Boolean(inspectingInquiry)}
        inquiry={inspectingInquiry}
        onClose={() => setInspectingInquiry(null)}
        onUpdateStatus={updateInquiryStatus}
        onUpdateNotes={updateInquiryNotes}
        onDelete={deleteInquiry}
      />
    </div>
  );
};
