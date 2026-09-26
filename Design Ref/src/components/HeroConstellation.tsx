import React, { useState } from 'react';
import { Language, ThemeMode, PageId } from '../types';
import { 
  Radio, 
  MapPin, 
  QrCode, 
  Flame, 
  ArrowRight, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface HeroConstellationProps {
  language: Language;
  theme: ThemeMode;
  onNavigate: (page: PageId, slug?: string) => void;
}

export const HeroConstellation: React.FC<HeroConstellationProps> = ({
  language,
  theme,
  onNavigate,
}) => {
  const isDark = theme === 'dark';
  const [activeCard, setActiveCard] = useState<string>('towerline');

  // Mini Constellation Cards
  const constellationNodes = [
    {
      id: 'towerline',
      title: 'TowerLine GIS',
      client: 'MoCIT Somaliland',
      category: 'Gov Registry',
      icon: MapPin,
      preview: 'Tower #1420 · 6 Regions · Spectrum Active',
      color: '#0B2F6B',
      accent: '#D4AF37',
      slug: 'towerline',
    },
    {
      id: 'qaari',
      title: 'Qaari SL Audio',
      client: '85k+ Listeners',
      category: 'Sacred Audio',
      icon: Radio,
      preview: 'Surah Al-Mulk · Ayah 14 Sync · 3G Edge',
      color: '#D4AF37',
      accent: '#0A3A7A',
      slug: 'qaari',
    },
    {
      id: 'aragsan',
      title: 'NOVA / Dugsi ERP',
      client: '120 Facilities',
      category: 'Daily Ops',
      icon: ShieldCheck,
      preview: 'Form 1-4 · 99.4% Audit Ring · ZAAD Auto',
      color: '#0A3A7A',
      accent: '#10B981',
      slug: 'aragsan-dugsi',
    },
    {
      id: 'ekaadh',
      title: 'Ekaadh Ticketing',
      client: 'Horn Events',
      category: 'Mobile Money',
      icon: QrCode,
      preview: 'QR Gate 0.8s · Offline Auth · ZAAD Pass',
      color: '#0B2F6B',
      accent: '#D4AF37',
      slug: undefined,
    },
    {
      id: 'jimicso',
      title: 'Jimicso Community',
      client: '14k Streaks',
      category: 'Somali Fitness',
      icon: Flame,
      preview: 'Level 18 · Hargeisa Friends Board · XP +450',
      color: '#D4AF37',
      accent: '#F59E0B',
      slug: undefined,
    },
  ];

  return (
    <section className={`relative min-h-[92vh] flex items-center overflow-hidden border-b transition-colors duration-500 ${
      isDark 
        ? 'bg-[#051329] text-white border-[#0B2F6B]/60' 
        : 'bg-[#FAFCFF] text-[#0A1E3B] border-slate-200'
    }`}>
      {/* Background Architectural Grid & Subtle Logo Echo */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dot pattern */}
        <div className={`absolute inset-0 ${isDark ? 'bg-dot-pattern-dark' : 'bg-dot-pattern'} opacity-60`} />

        {/* Massive Orbital Brand Arc (matching M2B logo crescent) */}
        <div className="absolute -top-40 right-1/2 translate-x-1/2 md:translate-x-1/3 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full border-[1.5px] border-[#0B2F6B]/10 dark:border-[#D4AF37]/15 pointer-events-none" />
        <div className="absolute -top-32 right-1/2 translate-x-1/2 md:translate-x-1/3 w-[560px] sm:w-[840px] h-[560px] sm:h-[840px] rounded-full border-t-[2px] border-r-[2px] border-[#D4AF37]/30 dark:border-[#D4AF37]/40 pointer-events-none animate-spin" style={{ animationDuration: '120s' }} />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0B2F6B]/10 dark:bg-[#0B2F6B]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Positioning Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Studio Badge */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 border transition-all ${
              isDark 
                ? 'bg-[#081B38] border-[#D4AF37]/40 text-[#D4AF37]' 
                : 'bg-white border-[#0B2F6B]/15 text-[#0B2F6B] shadow-sm'
            }`}>
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span className="font-mono uppercase tracking-wider text-[11px]">
                {language === 'so' ? 'M2B · Xarunta Tiknoolajiyadda Hargeysa' : 'M2B · Software Studio Hargeisa'}
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-500 dark:text-slate-300 text-[10px]">
                {language === 'so' ? 'Geeska & Qurbaha' : 'Horn & Diaspora'}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-6xl tracking-tight leading-[1.08] mb-6">
              {language === 'so' ? (
                <>
                  Isku-xidhka maanta. <br />
                  <span className="gold-gradient-text">Dhismaha berri.</span>
                </>
              ) : (
                <>
                  Connecting today. <br />
                  <span className="gold-gradient-text">Building tomorrow.</span>
                </>
              )}
            </h1>

            {/* Subhead */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-8">
              {language === 'so' ? (
                <>
                  M2B waxay naqshadaysaa oo dhistay nidaamyada dhabta ah ee hay’adaha iyo shirkadaha Geeska Afrika maalin kasta ku shaqeeyaan — laga bilaabo diiwaannada dawladda iyo ERP-yada dugsiyada, ilaa kormeerka goobaha iyo ganacsiga mobile money — Hargeysa ilaa qurbaha.
                </>
              ) : (
                <>
                  M2B designs and ships the systems Horn of Africa organisations actually run on — government registries, school ERPs, field operations, mobile money commerce, and community apps — from Hargeisa to the diaspora.
                </>
              )}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('work')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-display font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#E5BE4A] to-[#C9A227] text-slate-950 hover:shadow-lg hover:shadow-[#D4AF37]/30 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <span>{language === 'so' ? 'Eeg Mashaariicda' : 'See the Work'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className={`w-full sm:w-auto px-7 py-3.5 rounded-xl font-display font-bold text-sm uppercase tracking-wider border transition-all flex items-center justify-center gap-2 ${
                  isDark
                    ? 'border-[#0B2F6B] text-slate-200 hover:border-[#D4AF37] hover:text-white bg-[#06152F]'
                    : 'border-[#0B2F6B]/30 text-[#0B2F6B] hover:border-[#0B2F6B] hover:bg-[#0B2F6B]/5 bg-white'
                }`}
              >
                <span>{language === 'so' ? 'Bilow Mashruuc' : 'Start a Project'}</span>
                <ChevronRight className="w-4 h-4 opacity-60" />
              </button>
            </div>

            {/* Tiny Proof Line */}
            <div className="flex items-center flex-wrap gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-4 w-full">
              <span className="text-[#D4AF37] font-bold">●</span>
              <span>Web</span>
              <span className="opacity-40">·</span>
              <span>Mobile (Flutter)</span>
              <span className="opacity-40">·</span>
              <span>Ops Platforms & ERPs</span>
              <span className="opacity-40">·</span>
              <span className="text-slate-700 dark:text-slate-300 font-semibold">Bilingual EN / SO / AR</span>
            </div>
          </div>

          {/* Right Column: Living Product Constellation Showcase */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* Interactive Orbit Frame */}
            <div className={`w-full rounded-2xl p-5 sm:p-6 transition-all relative ${
              isDark 
                ? 'bg-[#081B38]/90 border border-[#D4AF37]/25 shadow-2xl shadow-black/60' 
                : 'bg-white/95 border border-[#0B2F6B]/15 shadow-xl shadow-[#0B2F6B]/5'
            }`}>
              
              {/* Header inside console card */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="font-mono font-bold text-[11px] ml-2 text-slate-500 dark:text-slate-400">
                    M2B SYSTEMS LIVE MESH
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#D4AF37]">
                  <Sparkles className="w-3 h-3" />
                  <span>5 ACTIVE ENGINES</span>
                </div>
              </div>

              {/* Constellation Nodes Interactive Selector */}
              <div className="space-y-3">
                {constellationNodes.map((node) => {
                  const isSelected = activeCard === node.id;
                  const Icon = node.icon;

                  return (
                    <div
                      key={node.id}
                      onClick={() => {
                        setActiveCard(node.id);
                        if (node.slug) {
                          // Allow clicking through to flagship study
                        }
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                        isSelected
                          ? isDark 
                            ? 'bg-[#06152F] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10 scale-[1.02]' 
                            : 'bg-[#EEF3F9]/80 border-[#0B2F6B] shadow-md scale-[1.02]'
                          : isDark
                            ? 'bg-white/5 border-white/10 hover:border-[#D4AF37]/40'
                            : 'bg-slate-50/70 border-slate-200 hover:border-[#0B2F6B]/30'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm"
                            style={{ backgroundColor: node.color }}
                          >
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-display font-bold text-sm tracking-tight">
                                {node.title}
                              </h4>
                              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-medium bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                {node.category}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                              {node.client}
                            </p>
                          </div>
                        </div>

                        {node.slug && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate('case-study', node.slug);
                            }}
                            className="text-[11px] font-bold text-[#D4AF37] hover:underline flex items-center gap-1 self-center"
                          >
                            <span>Case</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {/* Expanded Preview on Active State */}
                      {isSelected && (
                        <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                          <span className="font-mono text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{node.preview}</span>
                          </span>
                          {node.slug && (
                            <button
                              onClick={() => onNavigate('case-study', node.slug)}
                              className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#D4AF37] hover:text-[#E5BE4A] flex items-center gap-1"
                            >
                              Deep Dive →
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Console Footnote */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-center">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  Engineered with Laravel · Filament · Flutter · .NET · Next.js · PostGIS
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
