import React, { useState } from 'react';
import { Language, ThemeMode, PageId, FlagshipCaseStudy } from '../types';
import { FLAGSHIP_CASES } from '../data/projectsData';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Radio, 
  Layers, 
  ArrowRight,
  Play,
  Volume2,
  Calendar,
  Sparkles
} from 'lucide-react';

interface FlagshipCaseViewProps {
  slug: string;
  language: Language;
  theme: ThemeMode;
  onNavigate: (page: PageId, slug?: string) => void;
}

export const FlagshipCaseView: React.FC<FlagshipCaseViewProps> = ({
  slug,
  language,
  theme,
  onNavigate,
}) => {
  const isDark = theme === 'dark';
  const caseData: FlagshipCaseStudy = FLAGSHIP_CASES[slug] || FLAGSHIP_CASES['towerline'];

  // Interactive mockups state
  const [selectedRegion, setSelectedRegion] = useState<string>('Maroodi Jeex');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(true);
  const [activeChecklistFilter, setActiveChecklistFilter] = useState<'all' | 'compliant' | 'due'>('all');

  return (
    <div className={`min-h-screen pb-24 transition-colors ${
      isDark ? 'bg-[#051329] text-white' : 'bg-[#FAFBFD] text-[#0A1E3B]'
    }`}>
      
      {/* Top Back Navigation Bar */}
      <div className={`py-4 px-4 sm:px-8 border-b transition-colors ${
        isDark ? 'bg-[#040D1D] border-[#0B2F6B]/40' : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('work')}
            className="flex items-center gap-2 text-xs font-mono font-bold text-[#D4AF37] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'so' ? 'Ku Noqo Mashaariicda' : 'Back to Case Studies'}</span>
          </button>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
            <span>FLAGSHIP STUDY:</span>
            <span className="font-bold text-inherit">{caseData.title}</span>
          </div>
        </div>
      </div>

      {/* Full-bleed Product Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-[#071C40] to-[#0A3A7A] text-white">
        <div className="absolute inset-0 bg-dot-pattern-dark opacity-30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{caseData.sector}</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6">
              {caseData.heroHeadline}
            </h1>

            <p className="text-blue-100 text-lg sm:text-xl leading-relaxed mb-8">
              {caseData.heroSubhead}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              {caseData.liveUrl && (
                <a
                  href={caseData.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#E5BE4A] text-slate-950 hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md text-xs font-mono text-blue-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Client: {caseData.client}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className={`py-8 border-b transition-colors ${
        isDark ? 'bg-[#040D1D] border-[#0B2F6B]/40' : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {caseData.stats.map((stat, sIdx) => (
              <div key={sIdx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="font-display font-black text-3xl sm:text-4xl text-[#D4AF37] mb-1">
                  {stat.value}
                </div>
                <div className="font-display font-bold text-sm tracking-tight mb-0.5 text-inherit">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content: Problem → Approach → Shipped → Stack */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* The Problem */}
            <div className={`p-8 rounded-3xl border ${
              isDark ? 'bg-[#081B38] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 mb-3">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span>THE ARCHITECTURAL CHALLENGE</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-4">
                The Problem
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                {language === 'so' && caseData.problemSo ? caseData.problemSo : caseData.problem}
              </p>
            </div>

            {/* The Approach */}
            <div className={`p-8 rounded-3xl border ${
              isDark ? 'bg-[#081B38] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D4AF37] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span>M2B ENGINEERING STRATEGY</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-4">
                The Approach
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                {language === 'so' && caseData.approachSo ? caseData.approachSo : caseData.approach}
              </p>
            </div>

            {/* What We Shipped */}
            <div className={`p-8 rounded-3xl border ${
              isDark ? 'bg-[#081B38] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>DELIVERED PLATFORMS</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-6">
                What We Shipped
              </h2>
              <div className="space-y-3.5">
                {(language === 'so' && caseData.whatWeShippedSo ? caseData.whatWeShippedSo : caseData.whatWeShipped).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#051329] border border-slate-200 dark:border-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcome & Impact */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#071C40] to-[#0A3A7A] text-white border border-[#D4AF37]/30 shadow-xl">
              <span className="text-xs font-mono font-bold text-[#D4AF37] block mb-2">
                VERIFIED OPERATIONAL OUTCOME
              </span>
              <h2 className="font-display font-extrabold text-2xl mb-4">
                Long-Term Impact
              </h2>
              <p className="text-blue-100 text-base leading-relaxed">
                {language === 'so' && caseData.outcomeSo ? caseData.outcomeSo : caseData.outcome}
              </p>
            </div>

          </div>

          {/* Right Column: Interactive System Simulator & Tech Matrix */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* System Visual Simulator Chrome */}
            <div className={`rounded-3xl border p-6 sticky top-24 ${
              isDark ? 'bg-[#081B38] border-[#D4AF37]/30 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
            }`}>
              
              {/* Simulator Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold text-[#D4AF37]">SYSTEM CONSOLE SIMULATOR</span>
                </div>
                <span className="text-slate-400">HARGEISA NODE</span>
              </div>

              {/* TOWERLINE MAP SIMULATOR */}
              {caseData.mockupType === 'towerline-map' && (
                <div className="space-y-4">
                  <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px] font-mono">
                    {['Maroodi Jeex', 'Togdheer', 'Sahil', 'Awdal', 'Sanaag', 'Sool'].map((reg) => (
                      <button
                        key={reg}
                        onClick={() => setSelectedRegion(reg)}
                        className={`px-2.5 py-1 rounded-lg transition-all ${
                          selectedRegion === reg
                            ? 'bg-[#0B2F6B] text-[#D4AF37] font-bold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}
                      >
                        {reg}
                      </button>
                    ))}
                  </div>

                  <div className="h-64 rounded-2xl bg-[#030A14] border border-blue-900/60 relative overflow-hidden flex items-center justify-center p-4">
                    {/* Simulated Radar Circles */}
                    <div className="absolute w-48 h-48 rounded-full border border-blue-500/20 animate-pulse" />
                    <div className="absolute w-32 h-32 rounded-full border border-[#D4AF37]/30" />
                    
                    <div className="text-center z-10">
                      <span className="text-xs font-mono text-blue-300 font-bold block">
                        REGION: {selectedRegion.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-mono text-[#D4AF37] block mt-1">
                        430 ACTIVE FREQUENCY MASTS
                      </span>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-mono mt-3">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>SPECTRUM COMPLIANCE 99.8%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-[#051329] border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Tier A Carrier License:</span>
                      <span className="text-emerald-500 font-bold">Approved</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Field Tablet Sync:</span>
                      <span className="text-[#D4AF37]">Queued Offline (0.0s latency)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* QAARI AUDIO SIMULATOR */}
              {caseData.mockupType === 'qaari-audio' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#081813] text-[#F4F1E8] border border-emerald-900/60">
                    <div className="flex justify-between items-center text-xs font-mono text-[#D4AF37] mb-2">
                      <span>LIVE SURAH STREAM</span>
                      <span>3G OPTIMIZED</span>
                    </div>
                    <h4 className="font-display font-bold text-lg text-white">Surah Ar-Rahman</h4>
                    <p className="text-xs text-emerald-300/80 font-mono mb-3">Sh. Cabdirashiid Cali Suufi</p>

                    {/* Arabic Verse Highlight */}
                    <div className="p-3 rounded-xl bg-[#040C0A] text-center border border-emerald-950 my-3">
                      <p className="font-serif text-xl text-[#F9E8A2]" dir="rtl">
                        فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ
                      </p>
                      <span className="text-[10px] font-mono text-emerald-400 mt-1 block">Ayah 13 Synchronized</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="w-10 h-10 rounded-full bg-[#D4AF37] text-slate-950 flex items-center justify-center font-bold"
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </button>
                      <span className="text-xs font-mono text-slate-400">03:12 / 12:45</span>
                    </div>
                  </div>

                  <a
                    href="https://qaari.mahaysaa.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl font-mono text-xs font-bold bg-[#0B2F6B] text-white flex items-center justify-center gap-1.5 hover:bg-[#0A3A7A]"
                  >
                    <span>Open Live Player on qaari.mahaysaa.com</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* ARAGSAN / NOVA OPS SIMULATOR */}
              {caseData.mockupType === 'aragsan-ops' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                    <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30">
                      <span className="text-emerald-400 font-bold text-xl block">99.4%</span>
                      <span className="text-slate-400 text-[10px]">Supervisor Score</span>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-500/15 border border-blue-500/30">
                      <span className="text-blue-400 font-bold text-xl block">120+</span>
                      <span className="text-slate-400 text-[10px]">Client Sites</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-[#051329] border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-2">
                    <div className="font-bold text-slate-700 dark:text-slate-200">Facility Status Audit:</div>
                    <div className="flex justify-between items-center">
                      <span>Dahabshiil HQ</span>
                      <span className="text-emerald-500 font-bold">● GREEN (Verified)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Telesom Tech Hub</span>
                      <span className="text-amber-400 font-bold">● AMBER (Reviewing)</span>
                    </div>
                  </div>

                  <a
                    href="https://novacleaning.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl font-mono text-xs font-bold bg-[#0B2F6B] text-white flex items-center justify-center gap-1.5 hover:bg-[#0A3A7A]"
                  >
                    <span>Visit novacleaning.net</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Tech Stack Breakdown */}
              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  Architecture & Technologies
                </span>
                <div className="space-y-3">
                  {caseData.stack.map((group, gIdx) => (
                    <div key={gIdx} className="text-xs">
                      <span className="font-display font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        {group.category}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {group.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* "More Work" Row */}
        <div className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display font-bold text-2xl">
              {language === 'so' ? 'Mashaariicda Kale ee Horyaalka Ah' : 'Explore More Flagship Systems'}
            </h3>
            <button
              onClick={() => onNavigate('work')}
              className="text-xs font-mono text-[#D4AF37] font-bold hover:underline flex items-center gap-1"
            >
              <span>See All 20+ Systems</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(FLAGSHIP_CASES)
              .filter((k) => k !== slug)
              .map((otherKey) => {
                const other = FLAGSHIP_CASES[otherKey];
                return (
                  <div
                    key={otherKey}
                    onClick={() => onNavigate('case-study', otherKey)}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer group hover:-translate-y-1 ${
                      isDark 
                        ? 'bg-[#081B38] border-white/10 hover:border-[#D4AF37]' 
                        : 'bg-white border-slate-200 hover:border-[#0B2F6B]'
                    }`}
                  >
                    <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider block mb-1">
                      {other.sector}
                    </span>
                    <h4 className="font-display font-bold text-xl group-hover:text-[#D4AF37] transition-colors mb-2">
                      {other.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                      {other.heroSubhead}
                    </p>
                    <span className="text-xs font-mono font-bold text-[#0B2F6B] dark:text-[#D4AF37] flex items-center gap-1">
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

      </div>

    </div>
  );
};
