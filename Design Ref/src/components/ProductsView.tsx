import React, { useState } from 'react';
import { Language, ThemeMode, PageId, ProjectItem } from '../types';
import { ALL_PROJECTS } from '../data/projectsData';
import { 
  Sparkles, 
  ExternalLink, 
  ArrowRight, 
  Smartphone, 
  Monitor, 
  Layers, 
  Terminal, 
  CheckCircle2, 
  Server,
  Zap
} from 'lucide-react';

interface ProductsViewProps {
  language: Language;
  theme: ThemeMode;
  onNavigate: (page: PageId, slug?: string) => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  language,
  theme,
  onNavigate,
  onSelectProject,
}) => {
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<string>('all');

  // Filter products
  const products = ALL_PROJECTS.filter(p => {
    if (activeTab === 'live') return p.status === 'Live';
    if (activeTab === 'mobile') return p.category === 'mobile' || p.stack.some(s => s.includes('Flutter'));
    if (activeTab === 'ops') return p.category === 'operations' || p.category === 'government';
    return true;
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
            <span>{language === 'so' ? 'M2B PRODUCT OS · KAYDKA ALAAABTA' : 'M2B PRODUCT OS · SHIPPED ENGINES'}</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight mb-5">
            {language === 'so' ? (
              <>
                Alaabaha iyo nidaamyada <br />
                <span className="gold-gradient-text">ku fadhiya goobta qaran.</span>
              </>
            ) : (
              <>
                Each M2B system <br />
                <span className="gold-gradient-text">engineered on a pedestal.</span>
              </>
            )}
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
            {language === 'so' ? (
              'Baro alaabaha dhisan ee tooska u shaqaynaya, kuwa hadda dhismaha ku jira, iyo kuwa M2B Studio u gaarka ah.'
            ) : (
              'Every system is treated as a high-durability operational engine: cloud APIs, field offline databases, mobile money checkout, and localized typography.'
            )}
          </p>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-2 mb-12 pb-4 border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'All Products (' + ALL_PROJECTS.length + ')' },
            { id: 'live', label: 'Live Deployments (Qaari, NOVA, Ekaadh...)' },
            { id: 'mobile', label: 'Mobile & Flutter First' },
            { id: 'ops', label: 'Operations & Government' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                  : isDark
                    ? 'text-slate-300 hover:text-white bg-white/5'
                    : 'text-slate-600 hover:text-[#0B2F6B] bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pedestal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.slug) {
                  onNavigate('case-study', item.slug);
                } else {
                  onSelectProject(item);
                }
              }}
              className={`rounded-3xl border p-7 transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-2 relative overflow-hidden ${
                isDark 
                  ? 'bg-[#081B38] border-[#0B2F6B]/60 hover:border-[#D4AF37] shadow-2xl shadow-black/50' 
                  : 'bg-white border-slate-200 hover:border-[#0B2F6B] shadow-lg shadow-[#0B2F6B]/5'
              }`}
            >
              {/* Pedestal Top Light Sheen */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Status & Category Bar */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                    item.status === 'Live'
                      ? 'bg-emerald-500 text-slate-950 animate-pulse'
                      : item.status === 'In Production'
                        ? 'bg-[#D4AF37] text-slate-950'
                        : 'bg-[#0B2F6B] text-white'
                  }`}>
                    {item.status}
                  </span>

                  <span className="text-[11px] font-mono text-slate-400">
                    {item.sector}
                  </span>
                </div>

                {/* Pedestal 3D Device Base Frame */}
                <div className="my-4 p-5 rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200 dark:from-[#06152F] dark:to-[#040D1D] border border-slate-200 dark:border-blue-950 text-center relative group-hover:shadow-inner transition-shadow">
                  {/* Glowing Pedestal Ring */}
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0B2F6B] text-[#D4AF37] flex items-center justify-center shadow-lg mb-3">
                    {item.category === 'mobile' ? (
                      <Smartphone className="w-8 h-8" />
                    ) : item.category === 'government' ? (
                      <Server className="w-8 h-8" />
                    ) : (
                      <Monitor className="w-8 h-8" />
                    )}
                  </div>

                  <h3 className="font-display font-extrabold text-2xl tracking-tight text-inherit">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mt-0.5">
                    {item.client}
                  </span>

                  {item.metrics && (
                    <div className="mt-3 pt-2 border-t border-slate-300 dark:border-slate-800 flex justify-around text-[10px] font-mono text-[#D4AF37]">
                      {item.metrics.slice(0, 2).map((m, mi) => (
                        <span key={mi}>
                          {m.label}: <strong className="text-inherit font-bold">{m.value}</strong>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {item.tagline}
                </p>

                {/* Tech Stack Matrix */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.stack.map((t, ti) => (
                    <span
                      key={ti}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                {item.liveUrl ? (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#D4AF37] hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>Live Service</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-slate-400">Production Console</span>
                )}

                <span className="font-bold text-[#0B2F6B] dark:text-[#D4AF37] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>{item.slug ? 'Case Deep Dive' : 'Inspect Details'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
