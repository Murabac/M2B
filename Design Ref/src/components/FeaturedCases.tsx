import React from 'react';
import { Language, ThemeMode, PageId } from '../types';
import { 
  Radio, 
  MapPin, 
  Layers, 
  ExternalLink, 
  ArrowRight, 
  ShieldCheck, 
  Play, 
  Volume2, 
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';

interface FeaturedCasesProps {
  language: Language;
  theme: ThemeMode;
  onNavigate: (page: PageId, slug?: string) => void;
}

export const FeaturedCases: React.FC<FeaturedCasesProps> = ({
  language,
  theme,
  onNavigate,
}) => {
  const isDark = theme === 'dark';

  return (
    <section className={`py-20 sm:py-28 border-b transition-colors relative ${
      isDark ? 'bg-[#051329] text-white border-[#0B2F6B]/50' : 'bg-[#FAFBFD] text-[#0A1E3B] border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'so' ? 'MASHAARIICDA HORYAALKA AH' : 'FLAGSHIP SYSTEMS'}</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
              {language === 'so' ? (
                <>
                  Nidaamyo dhab ah oo <span className="gold-gradient-text">Geeska Afrika ku shaqeeyo.</span>
                </>
              ) : (
                <>
                  The operational backbones <br className="hidden sm:inline" />
                  <span className="gold-gradient-text">the region actually runs on.</span>
                </>
              )}
            </h2>
          </div>

          <button
            onClick={() => onNavigate('work')}
            className={`self-start md:self-auto px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider border transition-all flex items-center gap-2 ${
              isDark 
                ? 'border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10' 
                : 'border-[#0B2F6B]/30 text-[#0B2F6B] hover:bg-[#0B2F6B]/5'
            }`}
          >
            <span>{language === 'so' ? 'Dhammaan Mashaariicda (20+)' : 'Explore All Cases (20+)'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Large Cinematic Cards */}
        <div className="space-y-16">

          {/* CARD 1: TowerLine (MoCIT Somaliland) */}
          <div className={`rounded-3xl border overflow-hidden transition-all duration-300 shadow-xl ${
            isDark 
              ? 'bg-[#081B38] border-[#D4AF37]/30 shadow-black/60' 
              : 'bg-white border-[#0B2F6B]/15 shadow-[#0B2F6B]/5'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Left Details */}
              <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0B2F6B] text-white">
                      Government GIS Registry
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      Wasaaradda Isgaadhsiinta & Tiknoolajiyadda
                    </span>
                  </div>

                  <h3 className="font-display font-black text-3xl sm:text-4xl tracking-tight mb-4">
                    TowerLine
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
                    {language === 'so' ? (
                      'Nidaamka qaran ee khariidadeynta iyo diiwaangelinta dhammaan daaraadka isgaadhsiinta (GSM/4G/5G) iyo mowjadaha TV-yada iyo idaacadaha Somaliland oo dhan. Waxaa ku jira nidaamka kormeerka goobaha, bixinta shatiyada heerarka A/B/C, iyo hubinta badbaadada.'
                    ) : (
                      'National telecom tower and broadcast registry for MoCIT Somaliland. Features a live geospatial GIS map, spectrum allocation audits, field inspector tablet queues, and Tier A/B/C licensing with ministerial reporting.'
                    )}
                  </p>

                  {/* Impact metrics */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-200 dark:border-slate-800 mb-6">
                    <div>
                      <div className="font-display font-extrabold text-2xl text-[#D4AF37]">1,420+</div>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Towers Audited</div>
                    </div>
                    <div>
                      <div className="font-display font-extrabold text-2xl text-[#D4AF37]">6 Regions</div>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">National GIS Map</div>
                    </div>
                    <div>
                      <div className="font-display font-extrabold text-2xl text-[#D4AF37]">-65%</div>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Inspection Time</div>
                    </div>
                  </div>

                  {/* Stack badges */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {['Laravel Filament', 'PostGIS GIS', 'Leaflet', 'Flutter Tablet App', 'Bilingual EN/SO'].map((t, i) => (
                      <span key={i} className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={() => onNavigate('case-study', 'towerline')}
                    className="px-6 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-[#0B2F6B] text-white hover:bg-[#0A3A7A] transition-all flex items-center gap-2 group"
                  >
                    <span>{language === 'so' ? 'Daawo Qorshaha TowerLine' : 'View TowerLine Deep Dive'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <span className="text-xs font-mono text-emerald-500 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Production Sovereign System
                  </span>
                </div>
              </div>

              {/* Right Visual: Dark Map Command Console */}
              <div className="lg:col-span-6 bg-[#040E1E] p-6 sm:p-8 flex items-center justify-center relative overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-800">
                <div className="w-full max-w-lg rounded-2xl bg-[#07172E] border border-blue-900/60 p-5 shadow-2xl relative">
                  
                  {/* Console Topbar */}
                  <div className="flex items-center justify-between pb-3 border-b border-blue-900/40 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-mono text-blue-200 font-bold tracking-wider text-[11px]">
                        MoCIT GIS RADAR · HARGEISA REGIONAL SECTOR
                      </span>
                    </div>
                    <span className="font-mono text-[#D4AF37] text-[10px]">FREQ 900/1800/2100 MHz</span>
                  </div>

                  {/* Simulated Map Visual */}
                  <div className="relative h-64 my-4 rounded-xl bg-[#030B17] border border-blue-900/30 overflow-hidden flex items-center justify-center">
                    {/* Radar Circles */}
                    <div className="absolute w-56 h-56 rounded-full border border-blue-500/20 animate-pulse" />
                    <div className="absolute w-40 h-40 rounded-full border border-[#D4AF37]/30" />
                    <div className="absolute w-24 h-24 rounded-full border border-blue-500/40" />

                    {/* Regional Grid Coordinates */}
                    <div className="absolute top-3 left-3 text-[10px] font-mono text-blue-400/80">
                      N 09°33'42" · E 44°03'36"
                    </div>
                    <div className="absolute bottom-3 right-3 text-[10px] font-mono text-emerald-400">
                      TELECOM MAST #1420 (TELESOM/SOMTEL CO-LOC)
                    </div>

                    {/* Tower Pins */}
                    <div className="absolute top-1/3 left-1/3 flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-emerald-400/90 shadow-lg shadow-emerald-400/50 flex items-center justify-center text-[8px] font-bold text-slate-950">
                        A
                      </div>
                      <span className="text-[9px] font-mono text-white mt-1 bg-black/60 px-1 rounded">Hargeisa Central</span>
                    </div>

                    <div className="absolute bottom-1/3 right-1/4 flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/50 flex items-center justify-center text-[8px] font-bold text-slate-950">
                        B
                      </div>
                      <span className="text-[9px] font-mono text-white mt-1 bg-black/60 px-1 rounded">Berbera Port Relay</span>
                    </div>

                    <div className="absolute top-1/2 right-1/3 flex flex-col items-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-blue-400 shadow-md flex items-center justify-center text-[8px] font-bold text-slate-950">
                        A
                      </div>
                    </div>
                  </div>

                  {/* Inspector Metric Feed */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="p-2.5 rounded-lg bg-[#040D1D] border border-blue-900/40">
                      <span className="text-slate-400 block text-[9px]">INSPECTION STATUS</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" /> VERIFIED COMPLIANT
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#040D1D] border border-blue-900/40">
                      <span className="text-slate-400 block text-[9px]">LICENSE STATUS</span>
                      <span className="text-[#D4AF37] font-bold mt-0.5 block">TIER A · VALID 2026</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* CARD 2: Qaari SL (Somali Quran Reciters Platform) */}
          <div className={`rounded-3xl border overflow-hidden transition-all duration-300 shadow-xl ${
            isDark 
              ? 'bg-[#081B38] border-[#D4AF37]/30 shadow-black/60' 
              : 'bg-white border-[#0B2F6B]/15 shadow-[#0B2F6B]/5'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Left Details */}
              <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D4AF37] text-slate-950">
                      Live Audio Platform
                    </span>
                    <a 
                      href="https://qaari.mahaysaa.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-[#D4AF37] hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>qaari.mahaysaa.com</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <h3 className="font-display font-black text-3xl sm:text-4xl tracking-tight mb-4">
                    Qaari SL
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
                    {language === 'so' ? (
                      'Madasha qulqulka codadka culimada iyo quraanka Soomaaliyeed oo leh qoraalka aayadaha carabiga ah oo codka la socda daqiiqad kasta, app-ka gacanta ee Flutter (macaamiisha iyo shaqaalaha), iyo kaydka Cloudflare R2 oo xitaa 3G ku shaqeeya si degdeg ah.'
                    ) : (
                      'The premier Somali Quran reciters streaming platform. Features high-fidelity edge audio delivery over Cloudflare R2, follow-along Arabic verse synchronization, consumer + staff Flutter mobile apps, and offline playlists.'
                    )}
                  </p>

                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-200 dark:border-slate-800 mb-6">
                    <div>
                      <div className="font-display font-extrabold text-2xl text-[#D4AF37]">85k+</div>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Monthly Listeners</div>
                    </div>
                    <div>
                      <div className="font-display font-extrabold text-2xl text-[#D4AF37]">140+</div>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Reciters Catalog</div>
                    </div>
                    <div>
                      <div className="font-display font-extrabold text-2xl text-[#D4AF37]">&lt;250ms</div>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Audio Latency</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {['Flutter iOS & Android', 'Laravel Filament', 'Cloudflare R2', 'Arabic Ayah Sync', 'Edge CDN'].map((t, i) => (
                      <span key={i} className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={() => onNavigate('case-study', 'qaari')}
                    className="px-6 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#E5BE4A] to-[#C9A227] text-slate-950 hover:shadow-lg transition-all flex items-center gap-2 group"
                  >
                    <span>{language === 'so' ? 'Daawo Qaari SL' : 'View Qaari SL Architecture'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <a
                    href="https://qaari.mahaysaa.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-slate-500 hover:text-[#D4AF37] flex items-center gap-1"
                  >
                    <span>Live Service</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Right Visual: Forest-Gold-Cream Synchronized Audio Player Chrome */}
              <div className="lg:col-span-6 bg-[#0B1E19] p-6 sm:p-8 flex items-center justify-center relative overflow-hidden border-t lg:border-t-0 lg:border-l border-emerald-950/60">
                <div className="w-full max-w-lg rounded-2xl bg-[#0F2922] border border-[#D4AF37]/30 p-6 shadow-2xl relative text-[#F6F4E8]">
                  
                  {/* Surah Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-800/50 text-xs">
                    <div>
                      <span className="font-mono text-[#D4AF37] text-[10px] tracking-wider uppercase block">
                        NOW STREAMING · HARGEISA AUDIO EDGE
                      </span>
                      <h4 className="font-display font-bold text-base text-white mt-0.5">
                        Surah Al-Mulk (سُورَة الْمُلْك)
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] font-bold">
                      FLUTTER LIVE
                    </span>
                  </div>

                  {/* Follow-along Arabic Ayah (sync preview) */}
                  <div className="my-5 p-4 rounded-xl bg-[#081713] border border-emerald-900/60 text-center">
                    <p className="font-serif text-xl sm:text-2xl leading-loose text-[#F8E7A2] tracking-wide" dir="rtl">
                      الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ
                    </p>
                    <p className="text-xs text-emerald-200/70 mt-2 font-mono">
                      Ayah 2 · Synced Verse Highlight active (01:42 / 07:18)
                    </p>
                  </div>

                  {/* Audio Waveform visualization */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-emerald-300/80">
                      <span>01:42</span>
                      <div className="flex items-center gap-1">
                        <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Cloudflare R2 Lossless</span>
                      </div>
                      <span>07:18</span>
                    </div>

                    {/* Waveform Bars */}
                    <div className="h-8 flex items-center justify-between gap-1 px-1">
                      {[30, 60, 45, 80, 95, 40, 70, 85, 100, 65, 45, 80, 90, 100, 75, 55, 30, 65, 90, 50, 40, 70, 85, 95, 60, 40, 20].map((h, idx) => (
                        <div
                          key={idx}
                          className={`w-full rounded-full transition-all ${
                            idx < 14 ? 'bg-[#D4AF37]' : 'bg-emerald-800/60'
                          }`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Player Controls */}
                  <div className="mt-5 pt-3 border-t border-emerald-800/40 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-slate-950 font-bold">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                      <span className="text-xs font-mono text-white font-medium">Sh. Cabdirashiid Cali Suufi</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#D4AF37] tracking-wider uppercase">
                      OFFLINE CACHE READY
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* CARD 3: Aragsan / NOVA Cleaning Ops & Dugsi ERP */}
          <div className={`rounded-3xl border overflow-hidden transition-all duration-300 shadow-xl ${
            isDark 
              ? 'bg-[#081B38] border-[#D4AF37]/30 shadow-black/60' 
              : 'bg-white border-[#0B2F6B]/15 shadow-[#0B2F6B]/5'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Left Details */}
              <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0B2F6B] text-white">
                      Field Ops & School ERP
                    </span>
                    <a 
                      href="https://novacleaning.net" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-[#D4AF37] hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>novacleaning.net</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <h3 className="font-display font-black text-3xl sm:text-4xl tracking-tight mb-4">
                    Aragsan Ops & Dugsi ERP
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
                    {language === 'so' ? (
                      'Nidaamka kormeerka nadaafadda iyo hawlaha xarumaha ganacsiga ee NOVA (aragti midabada cagaar/jaalle/cas leh, xisaabinta ZAAD/eDahab), iyo ERP-ga dugsiyada sare (Dugsi) ee fasallada 1–4, xaadirinta SMS-ka tooska ah ee waalidka, iyo kaadhadhka imtixaanaadka.'
                    ) : (
                      'Dual operational powerhouses: NOVA cleaning facility ops with live health status rings and mobile ZAAD/eDahab billing, paired with Dugsi secondary school ERP handling Form 1–4 classes-first enrollments, SMS parent alerts, and term grade compile.'
                    )}
                  </p>

                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-200 dark:border-slate-800 mb-6">
                    <div>
                      <div className="font-display font-extrabold text-2xl text-[#D4AF37]">120+</div>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Client Sites</div>
                    </div>
                    <div>
                      <div className="font-display font-extrabold text-2xl text-[#D4AF37]">6,200+</div>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Students Tracked</div>
                    </div>
                    <div>
                      <div className="font-display font-extrabold text-2xl text-[#D4AF37]">99.4%</div>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Audit Compliance</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {['Laravel Filament v3', 'ZAAD API', 'eDahab Merchant API', 'SMS Gateway', 'Live Status Rings'].map((t, i) => (
                      <span key={i} className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={() => onNavigate('case-study', 'aragsan-dugsi')}
                    className="px-6 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-[#0B2F6B] text-white hover:bg-[#0A3A7A] transition-all flex items-center gap-2 group"
                  >
                    <span>{language === 'so' ? 'Daawo Ops & Dugsi ERP' : 'View Operations Deep Dive'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <span className="text-xs font-mono text-slate-500">Live at novacleaning.net</span>
                </div>
              </div>

              {/* Right Visual: Operations Rings & Class Matrix Console */}
              <div className="lg:col-span-6 bg-[#06162E] p-6 sm:p-8 flex items-center justify-center relative overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-800">
                <div className="w-full max-w-lg rounded-2xl bg-[#092040] border border-blue-800/40 p-5 shadow-2xl relative text-slate-100">
                  
                  {/* Console Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-blue-800/40 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-white font-bold tracking-wider text-[11px]">
                        ARAGSAN FACILITY & DUGSI ATTENDANCE MATRIX
                      </span>
                    </div>
                    <span className="font-mono text-emerald-400 text-[10px]">ALL LOGS SYNCED</span>
                  </div>

                  {/* Status Rings Row */}
                  <div className="grid grid-cols-3 gap-3 my-4">
                    <div className="p-3 rounded-xl bg-[#06162E] border border-emerald-500/30 text-center">
                      <div className="w-10 h-10 mx-auto rounded-full border-4 border-emerald-500 flex items-center justify-center text-xs font-bold text-emerald-400 mb-1">
                        94%
                      </div>
                      <span className="text-[10px] font-mono text-slate-300 block">Dahabshiil Center</span>
                      <span className="text-[9px] font-mono text-emerald-400 font-bold">VERIFIED CLEAN</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#06162E] border border-amber-500/30 text-center">
                      <div className="w-10 h-10 mx-auto rounded-full border-4 border-amber-400 flex items-center justify-center text-xs font-bold text-amber-300 mb-1">
                        78%
                      </div>
                      <span className="text-[10px] font-mono text-slate-300 block">Telesom Tower B</span>
                      <span className="text-[9px] font-mono text-amber-300 font-bold">INSPECTION DUE</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#06162E] border border-blue-500/30 text-center">
                      <div className="w-10 h-10 mx-auto rounded-full border-4 border-blue-400 flex items-center justify-center text-xs font-bold text-blue-300 mb-1">
                        Form 3
                      </div>
                      <span className="text-[10px] font-mono text-slate-300 block">Dugsi Academy</span>
                      <span className="text-[9px] font-mono text-blue-300 font-bold">SMS SENT (08:15)</span>
                    </div>
                  </div>

                  {/* Dual Panel Snippet: Billing & Checklist */}
                  <div className="p-3 rounded-xl bg-[#040E1E] border border-blue-900/50 space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>ZAAD Settlement ID #89240</span>
                      <span className="text-emerald-400 font-bold">$1,250.00 USD</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>Supervisor: Khadar J. (Photo verified)</span>
                      <span className="text-[#D4AF37]">9/9 Tasks Pass</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
