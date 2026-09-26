import React, { useState, useEffect } from 'react';
import { PageId, Language, ThemeMode, ProjectItem, ViewportMode } from './types';
import { Navbar } from './components/Navbar';
import { HeroConstellation } from './components/HeroConstellation';
import { TrustStrip } from './components/TrustStrip';
import { FeaturedCases } from './components/FeaturedCases';
import { CapabilitiesBand } from './components/CapabilitiesBand';
import { ProductsBento } from './components/ProductsBento';
import { ProcessOrbit } from './components/ProcessOrbit';
import { WorkView } from './components/WorkView';
import { FlagshipCaseView } from './components/FlagshipCaseView';
import { ProductsView } from './components/ProductsView';
import { CapabilitiesView } from './components/CapabilitiesView';
import { StudioView } from './components/StudioView';
import { ContactView } from './components/ContactView';
import { ProjectModal } from './components/ProjectModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [activeSlug, setActiveSlug] = useState<string>('towerline');
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Sync theme class to document body
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleNavigate = (page: PageId, slug?: string) => {
    setCurrentPage(page);
    if (slug) {
      setActiveSlug(slug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'so' : 'en'));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#020710]' : 'bg-slate-200'
    } ${viewportMode === 'mobile' ? 'py-8 flex justify-center' : ''}`}>
      
      {/* Viewport Frame Container */}
      <div className={`flex flex-col font-sans selection:bg-[#D4AF37] selection:text-slate-950 transition-all duration-300 ${
        viewportMode === 'mobile'
          ? 'w-[390px] min-h-[844px] rounded-[48px] border-8 border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden relative'
          : 'w-full min-h-screen'
      } ${
        theme === 'dark' ? 'bg-[#030B17] text-white' : 'bg-[#FAFBFD] text-[#0A1E3B]'
      }`}>
        {/* Top Fixed Navigation */}
        <Navbar
          currentPage={currentPage}
          language={language}
          theme={theme}
          onNavigate={handleNavigate}
          onToggleTheme={handleToggleTheme}
          onToggleLanguage={handleToggleLanguage}
          viewportMode={viewportMode}
          onChangeViewport={setViewportMode}
        />

        {/* Main Page Routing Views */}
        <main className="flex-1">
          {currentPage === 'home' && (
            <>
              <HeroConstellation
                language={language}
                theme={theme}
                onNavigate={handleNavigate}
              />
              <TrustStrip language={language} theme={theme} />
              <FeaturedCases
                language={language}
                theme={theme}
                onNavigate={handleNavigate}
              />
              <CapabilitiesBand
                language={language}
                theme={theme}
                onNavigate={handleNavigate}
              />
              <ProductsBento
                language={language}
                theme={theme}
                onNavigate={handleNavigate}
                onSelectProject={(project) => setSelectedProject(project)}
              />
              <ProcessOrbit
                language={language}
                theme={theme}
                onNavigate={handleNavigate}
              />
            </>
          )}

          {currentPage === 'work' && (
            <WorkView
              language={language}
              theme={theme}
              onNavigate={handleNavigate}
              onSelectProject={(project) => setSelectedProject(project)}
            />
          )}

          {currentPage === 'case-study' && (
            <FlagshipCaseView
              slug={activeSlug}
              language={language}
              theme={theme}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'products' && (
            <ProductsView
              language={language}
              theme={theme}
              onNavigate={handleNavigate}
              onSelectProject={(project) => setSelectedProject(project)}
            />
          )}

          {currentPage === 'capabilities' && (
            <CapabilitiesView
              language={language}
              theme={theme}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'studio' && (
            <StudioView
              language={language}
              theme={theme}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'contact' && (
            <ContactView
              language={language}
              theme={theme}
              onNavigate={handleNavigate}
            />
          )}
        </main>

        {/* Quick Project Inspect Modal */}
        <ProjectModal
          project={selectedProject}
          language={language}
          theme={theme}
          onClose={() => setSelectedProject(null)}
          onNavigate={handleNavigate}
        />

        {/* Global Footer */}
        <Footer
          language={language}
          theme={theme}
          onNavigate={handleNavigate}
          onToggleLanguage={handleToggleLanguage}
        />
      </div>
    </div>
  );
}


