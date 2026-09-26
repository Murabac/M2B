import React, { useState } from 'react';
import { Language, ThemeMode, PageId, WorkCategory, ProjectItem } from '../types';
import { ALL_PROJECTS } from '../data/projectsData';
import { 
  Filter, 
  Search, 
  ExternalLink, 
  ArrowRight, 
  Sparkles,
  MapPin,
  Radio,
  Layers,
  Smartphone,
  Globe,
  Tag
} from 'lucide-react';

interface WorkViewProps {
  language: Language;
  theme: ThemeMode;
  onNavigate: (page: PageId, slug?: string) => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const WorkView: React.FC<WorkViewProps> = ({
  language,
  theme,
  onNavigate,
  onSelectProject,
}) => {
  const isDark = theme === 'dark';
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs: { id: WorkCategory; labelEn: string; labelSo: string }[] = [
    { id: 'all', labelEn: 'All Work', labelSo: 'Dhammaan' },
    { id: 'government', labelEn: 'Government', labelSo: 'Dawladda' },
    { id: 'operations', labelEn: 'Operations & ERP', labelSo: 'Hawlaha & ERP' },
    { id: 'education', labelEn: 'Education', labelSo: 'Waxbarasho' },
    { id: 'faith', labelEn: 'Faith & Media', labelSo: 'Diinta & Suugaanta' },
    { id: 'commerce', labelEn: 'Commerce', labelSo: 'Ganacsiga' },
    { id: 'mobile', labelEn: 'Mobile Apps', labelSo: 'Barnaamijyada Gacanta' },
    { id: 'websites', labelEn: 'Websites & CMS', labelSo: 'Mareegaha & CMS' },
  ];

  const filteredProjects = ALL_PROJECTS.filter((project) => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesQuery = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className={`min-h-screen py-16 sm:py-24 transition-colors ${
      isDark ? 'bg-[#051329] text-white' : 'bg-[#FAFBFD] text-[#0A1E3B]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'so' ? 'KAYDKA MASHAARIICDA EE M2B' : 'PRODUCTION WORK & CASE STUDIES'}</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight mb-5">
            {language === 'so' ? (
              <>
                Nidaamyada aan dhisnay, <br />
                <span className="gold-gradient-text">oo maalin kasta shaqeeya.</span>
              </>
            ) : (
              <>
                Sovereign systems, ERPs, <br />
                <span className="gold-gradient-text">and consumer platforms.</span>
              </>
            )}
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
            {language === 'so' ? (
              'Kama shaqayno shirkado mala-awaal ah. Dhammaan mashaariicdani waa kuwo dhab ah oo loogu adeego wasaaradaha, jaamacadaha, shirkadaha, iyo bulshada Soomaaliyeed.'
            ) : (
              'Every case study here represents active, production codebases deployed for sovereign ministries, universities, local enterprises, and the diaspora.'
            )}
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === tab.id
                    ? isDark 
                      ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md shadow-[#D4AF37]/20' 
                      : 'bg-[#0B2F6B] text-white font-bold shadow-sm'
                    : isDark
                      ? 'text-slate-300 hover:text-white hover:bg-white/5 border border-white/5'
                      : 'text-slate-600 hover:text-[#0B2F6B] hover:bg-slate-200/60 border border-slate-200'
                }`}
              >
                {language === 'so' ? tab.labelSo : tab.labelEn}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'so' ? 'Raadi mashaariicda, stack-ga...' : 'Filter by client, stack, sector...'}
              className={`w-full pl-10 pr-4 py-2 text-xs rounded-xl border focus:outline-none transition-all ${
                isDark 
                  ? 'bg-[#081B38] border-white/10 text-white placeholder-slate-500 focus:border-[#D4AF37]' 
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#0B2F6B]'
              }`}
            />
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                if (project.slug) {
                  onNavigate('case-study', project.slug);
                } else {
                  onSelectProject(project);
                }
              }}
              className={`rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1.5 ${
                project.isFlagship
                  ? isDark
                    ? 'bg-[#081B38] border-[#D4AF37]/50 shadow-xl shadow-black/50 ring-1 ring-[#D4AF37]/30'
                    : 'bg-white border-[#0B2F6B]/30 shadow-lg shadow-[#0B2F6B]/5 ring-1 ring-[#0B2F6B]/10'
                  : isDark
                    ? 'bg-[#081B38]/70 border-white/10 hover:border-[#D4AF37]/40 shadow-md'
                    : 'bg-white border-slate-200 hover:border-[#0B2F6B]/30 shadow-sm'
              }`}
            >
              {/* Card Header Media Visual Preview */}
              <div className="relative h-48 sm:h-52 bg-gradient-to-br from-[#071C40] to-[#0A3A7A] p-5 flex flex-col justify-between overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-dot-pattern-dark opacity-30 pointer-events-none" />

                {/* Status Badges */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                    project.status === 'Live'
                      ? 'bg-emerald-500 text-slate-950'
                      : project.status === 'In Production'
                        ? 'bg-[#D4AF37] text-slate-950'
                        : 'bg-white/20 text-white'
                  }`}>
                    {project.status}
                  </span>

                  {project.isFlagship && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                      FLAGSHIP CASE
                    </span>
                  )}
                </div>

                {/* Visual Icon and Title in Header */}
                <div className="relative z-10">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37] block">
                    {project.sector}
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-white tracking-tight mt-1 group-hover:text-[#D4AF37] transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs text-blue-200/80 font-mono block mt-0.5">
                    {language === 'so' && project.clientSo ? project.clientSo : project.client}
                  </span>
                </div>

                {/* Corner Orbital Motif */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full border border-white/10 pointer-events-none" />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {language === 'so' && project.taglineSo ? project.taglineSo : project.tagline}
                  </p>

                  {/* One-line outcome */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#051329] border border-slate-200 dark:border-slate-800/80 mb-5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                      Outcome
                    </span>
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                      {language === 'so' && project.outcomeSo ? project.outcomeSo : project.outcome}
                    </p>
                  </div>

                  {/* Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.stack.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="text-[11px] font-mono px-1.5 py-0.5 rounded text-slate-400">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#D4AF37] hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>Visit Live</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-slate-400">Production Console</span>
                  )}

                  <span className="font-bold text-[#0B2F6B] dark:text-[#D4AF37] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>{project.slug ? 'Deep Dive' : 'Inspect'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 font-mono text-sm">
              No matching systems found for "{searchQuery}". Try selecting another category tab.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
