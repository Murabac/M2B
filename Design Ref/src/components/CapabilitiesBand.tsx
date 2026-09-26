import React from 'react';
import { Language, ThemeMode, PageId } from '../types';
import { CAPABILITIES } from '../data/projectsData';
import { 
  Layers, 
  Smartphone, 
  MapPin, 
  CreditCard, 
  Radio, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface CapabilitiesBandProps {
  language: Language;
  theme: ThemeMode;
  onNavigate: (page: PageId) => void;
}

export const CapabilitiesBand: React.FC<CapabilitiesBandProps> = ({
  language,
  theme,
  onNavigate,
}) => {
  const isDark = theme === 'dark';

  const iconMap: Record<string, any> = {
    Layers,
    Smartphone,
    MapPin,
    CreditCard,
    Radio,
    ShieldCheck
  };

  return (
    <section className={`py-20 sm:py-28 border-b transition-colors relative ${
      isDark ? 'bg-[#040D1D] text-white border-[#0B2F6B]/50' : 'bg-white text-[#0A1E3B] border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'so' ? 'KHARASHYADA & AWOODAHA INJINEERNIMO' : 'WHAT MAKES M2B DIFFERENT'}</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight mb-5">
            {language === 'so' ? (
              <>
                Ma samayno uun mareegaha xayeysiiska. <br className="hidden sm:inline" />
                <span className="gold-gradient-text">Waxaan dhisnaa lafdhabarta hawlgalka.</span>
              </>
            ) : (
              <>
                We don’t just build marketing sites. <br className="hidden sm:inline" />
                <span className="gold-gradient-text">We engineer operational backbones.</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            {language === 'so' ? (
              'Laga bilaabo kormeerka goobaha, khariidadaha GIS, xisaabinta mushahaarka iyo mobile money, ilaa qulqulka codadka iyo tikidhada QR koodhka ah.'
            ) : (
              'From geospatial maps, field inspections, payroll, and attendance to mobile money checkout, audio distribution pipelines, and staff companion apps.'
            )}
          </p>
        </div>

        {/* 6 Capabilities Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap) => {
            const Icon = iconMap[cap.icon] || Layers;

            return (
              <div
                key={cap.id}
                className={`p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                  isDark 
                    ? 'bg-[#081B38]/80 border-[#0B2F6B]/60 hover:border-[#D4AF37]/50 shadow-lg shadow-black/40' 
                    : 'bg-slate-50/80 border-slate-200/80 hover:border-[#0B2F6B]/30 hover:bg-white shadow-sm'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center bg-[#0B2F6B] text-[#D4AF37] shadow-md group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display font-bold text-xl tracking-tight mb-2.5 text-inherit">
                    {language === 'so' && cap.titleSo ? cap.titleSo : cap.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                    {language === 'so' && cap.shortDescSo ? cap.shortDescSo : cap.shortDesc}
                  </p>

                  <ul className="space-y-2 mb-6 border-t border-slate-200 dark:border-slate-800/80 pt-4">
                    {(language === 'so' && cap.bulletsSo ? cap.bulletsSo : cap.bullets).map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onNavigate('capabilities')}
                  className="text-xs font-mono font-bold tracking-wider text-[#0B2F6B] dark:text-[#D4AF37] flex items-center gap-1.5 group-hover:gap-2 transition-all mt-2"
                >
                  <span>{language === 'so' ? 'Faahfaahin' : 'Explore Capability'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Local Stack Callout Banner */}
        <div className={`mt-12 rounded-2xl p-6 sm:p-8 border transition-all ${
          isDark 
            ? 'bg-[#06162E] border-[#D4AF37]/30 text-white' 
            : 'bg-[#EEF3F9] border-[#0B2F6B]/15 text-[#0B2F6B]'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-1">
                {language === 'so' ? 'FURSADDA MAXALLIGA AH' : 'BUILT FOR THE REGION'}
              </span>
              <h4 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight">
                {language === 'so' 
                  ? 'Waxaan ku hadalnaa afka teknoolajiyadda maxalliga ah.'
                  : 'We speak the local stack fluently.'}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                ZAAD Telesom, eDahab Somtel, Somali typography (longer labels requiring ergonomic text wrapping), RTL Arabic, USD dual currency pricing, Saturday–Wednesday school weeks, and satellite or intermittent cellular resilience.
              </p>
            </div>

            <button
              onClick={() => onNavigate('capabilities')}
              className="px-6 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#E5BE4A] to-[#C9A227] text-slate-950 hover:shadow-lg transition-all self-start lg:self-center shrink-0"
            >
              {language === 'so' ? 'Eeg Dhammaan Farsamooyinka' : 'Inspect Full Tech Matrix'}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
