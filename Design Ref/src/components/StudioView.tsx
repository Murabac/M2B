import React from 'react';
import { Language, ThemeMode, PageId } from '../types';
import { M2BLogo } from './M2BLogo';
import { 
  Sparkles, 
  MapPin, 
  Award, 
  Briefcase, 
  Terminal, 
  Globe, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface StudioViewProps {
  language: Language;
  theme: ThemeMode;
  onNavigate: (page: PageId) => void;
}

export const StudioView: React.FC<StudioViewProps> = ({
  language,
  theme,
  onNavigate,
}) => {
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen py-16 sm:py-24 transition-colors ${
      isDark ? 'bg-[#051329] text-white' : 'bg-[#FAFBFD] text-[#0A1E3B]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'so' ? 'M2B STUDIO · HARGEISA' : 'M2B STUDIO · HARGEISA'}</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight mb-5">
            {language === 'so' ? (
              <>
                Laga dhisay Hargeysa. <br />
                <span className="gold-gradient-text">Wax loogu adeego Geeska & Qurbaha.</span>
              </>
            ) : (
              <>
                Built in Hargeisa. <br />
                <span className="gold-gradient-text">Shipping for the Horn & Diaspora.</span>
              </>
            )}
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
            {language === 'so' ? (
              'M2B waa xarun injineernimo oo ku takhasustay dhisidda barnaamijyada hawlgalka adag leh ee hay’adaha dawladda, dugsiyada, iyo shirkadaha ganacsigu ku shaqeeyaan.'
            ) : (
              'M2B is an independent technology innovation studio based in Hargeisa, Somaliland. We operate at the intersection of sovereign infrastructure, enterprise operations, and community culture.'
            )}
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#081B38] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="font-display font-black text-4xl text-[#D4AF37] mb-1">9+ Years</div>
            <div className="font-display font-bold text-sm">Craftsmanship</div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">Continuous production software</div>
          </div>

          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#081B38] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="font-display font-black text-4xl text-[#D4AF37] mb-1">Gov to Grassroots</div>
            <div className="font-display font-bold text-sm">Full Spectrum</div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">Ministries, NGOs, and commerce</div>
          </div>

          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#081B38] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="font-display font-black text-4xl text-[#D4AF37] mb-1">Web + Mobile</div>
            <div className="font-display font-bold text-sm">Ops & ERPs</div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">Unified multi-platform suites</div>
          </div>

          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#081B38] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="font-display font-black text-4xl text-[#D4AF37] mb-1">EN · SO · AR</div>
            <div className="font-display font-bold text-sm">Bilingual Ready</div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">Engineered for regional typography</div>
          </div>
        </div>

        {/* Studio Philosophy & Culture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display font-extrabold text-3xl tracking-tight">
              A studio built on rigor, not buzzwords.
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              In developing markets, software often breaks at the seams: when a field inspector enters a mountain valley with no cellular reception, when parents wait for critical student SMS transcripts, or when a telecommunications ministry needs an auditable record of spectrum rights.
            </p>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              M2B was founded to establish a gold standard of local craftsmanship. We don’t rebrand cookie-cutter WordPress templates. We architect tailored solutions using industry-proven stacks — Laravel, Filament, Flutter, .NET, Next.js, and PostGIS — built to withstand decades of operational expansion.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Zero offshore subcontracting — 100% in-house engineering and oversight.</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Deep local partnerships with Somaliland ministries, telecos, and enterprises.</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Bridging Hargeisa engineering talent with Somali diaspora networks globally.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex items-center justify-center">
            <div className={`w-full max-w-md p-8 rounded-3xl border text-center relative ${
              isDark 
                ? 'bg-[#081B38] border-[#D4AF37]/30 shadow-2xl' 
                : 'bg-white border-[#0B2F6B]/15 shadow-xl'
            }`}>
              <M2BLogo variant="full" size="lg" theme={theme} className="my-4" />
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500">
                HEADQUARTERED IN HARGEISA, SOMALILAND
              </div>
            </div>
          </div>

        </div>

        {/* Leadership Section (Short, Company-first moment for Founder Abdirahmaan Mire) */}
        <div className={`rounded-3xl border p-8 sm:p-12 transition-all ${
          isDark ? 'bg-[#081B38] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-lg'
        }`}>
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
              STUDIO LEADERSHIP
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight mb-8">
              Engineering Leadership at the Helm
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Monogram / Profile badge */}
              <div className="md:col-span-4 flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#0B2F6B] via-[#0A3A7A] to-[#071C40] p-1 border-2 border-[#D4AF37] shadow-xl flex items-center justify-center text-white mb-4">
                  <div className="w-full h-full rounded-2xl bg-[#081B38] flex flex-col items-center justify-center">
                    <span className="font-display font-black text-4xl text-[#D4AF37]">AM</span>
                    <span className="text-[10px] font-mono text-blue-200 uppercase tracking-widest mt-1">Lead Architect</span>
                  </div>
                </div>

                <h3 className="font-display font-extrabold text-xl tracking-tight">
                  Abdirahmaan Mire
                </h3>
                <span className="text-xs font-mono text-[#D4AF37] mt-0.5">
                  Senior Software Developer & Project Manager
                </span>
                <span className="text-[11px] font-mono text-slate-400 mt-1">
                  9+ Years Production Craftsmanship
                </span>
              </div>

              {/* Bio Details */}
              <div className="md:col-span-8 space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 pt-6 md:pt-0 md:pl-8">
                <p>
                  With over nine years of software development and technical project leadership, Abdirahmaan directs M2B’s system architecture, technical discovery, and delivery milestones.
                </p>
                <p>
                  Having engineered national government registries, education ERPs, and high-load consumer apps across Somaliland and international engagements, his focus remains strictly on durable operational impact: reliable data models, zero-lag offline caching, and responsive local mobile money transactions.
                </p>

                <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono text-slate-500">
                  <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800/80">Software Architecture</span>
                  <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800/80">Laravel & Filament</span>
                  <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800/80">Flutter Systems</span>
                  <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800/80">Technical Project Management</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
