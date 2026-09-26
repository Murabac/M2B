import React, { useState } from 'react';
import { Language, ThemeMode, PageId } from '../types';
import { PROCESS_STEPS } from '../data/projectsData';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

interface ProcessOrbitProps {
  language: Language;
  theme: ThemeMode;
  onNavigate: (page: PageId) => void;
}

export const ProcessOrbit: React.FC<ProcessOrbitProps> = ({
  language,
  theme,
  onNavigate,
}) => {
  const isDark = theme === 'dark';
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className={`py-20 sm:py-28 border-b transition-colors relative overflow-hidden ${
      isDark ? 'bg-[#040D1D] text-white border-[#0B2F6B]/50' : 'bg-white text-[#0A1E3B] border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'so' ? 'HABKA SHAQADA' : 'HOW WE SHIP'}</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight mb-5">
            {language === 'so' ? (
              <>
                Laga bilaabo fikirka hore ilaa <br />
                <span className="gold-gradient-text">maamulka joogtada ah ee goobta.</span>
              </>
            ) : (
              <>
                From discovery to <br />
                <span className="gold-gradient-text">daily production operations.</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            {language === 'so' ? (
              'Waxaan raacnaa 5 tallaabo oo qotodheer oo hubinaya in nidaamku u adkaysto caqabadaha dhabta ah ee gobolka.'
            ) : (
              'A structured 5-stage lifecycle engineered for high durability under harsh field conditions and bandwidth limits.'
            )}
          </p>
        </div>

        {/* Orbit Numbered Step Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {PROCESS_STEPS.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? isDark 
                      ? 'bg-[#081B38] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10 scale-[1.02]' 
                      : 'bg-[#EEF3F9] border-[#0B2F6B] shadow-md scale-[1.02]'
                    : isDark
                      ? 'bg-white/5 border-white/10 hover:border-[#D4AF37]/40'
                      : 'bg-slate-50 border-slate-200 hover:border-[#0B2F6B]/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono font-black text-lg ${isSelected ? 'text-[#D4AF37]' : 'text-slate-400'}`}>
                    {step.step}
                  </span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />}
                </div>
                <div className="font-display font-bold text-sm truncate">
                  {language === 'so' ? step.titleSo : step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Deep Dive Card */}
        <div className={`p-8 sm:p-10 rounded-3xl border transition-all ${
          isDark 
            ? 'bg-[#06152F] border-[#D4AF37]/30 shadow-2xl' 
            : 'bg-slate-50 border-slate-200 shadow-lg'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] mb-2 font-bold">
                <span>STAGE {PROCESS_STEPS[activeStep].step} OF 05</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl tracking-tight mb-4">
                {language === 'so' ? PROCESS_STEPS[activeStep].titleSo : PROCESS_STEPS[activeStep].title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
                {language === 'so' ? PROCESS_STEPS[activeStep].descriptionSo : PROCESS_STEPS[activeStep].description}
              </p>

              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Deliverables & Milestones:
                </span>
                <div className="flex flex-wrap gap-2">
                  {PROCESS_STEPS[activeStep].deliverables.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-white dark:bg-[#081B38] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0B2F6B] text-white text-center shadow-xl">
              <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-mono font-bold text-lg mb-3">
                {PROCESS_STEPS[activeStep].step}
              </div>
              <span className="font-display font-bold text-lg mb-1">
                {language === 'so' ? 'Ballan-qaad Sugan' : 'Guaranteed Delivery'}
              </span>
              <p className="text-xs text-blue-200/80 leading-relaxed mb-4">
                Led personally by senior engineering leadership with 9+ years in production.
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-2.5 rounded-xl text-xs font-bold font-display uppercase tracking-wider bg-[#D4AF37] text-slate-950 hover:bg-[#E5BE4A] transition-colors"
              >
                {language === 'so' ? 'Bilow Mashruucaaga' : 'Start Discovery Phase'}
              </button>
            </div>
          </div>
        </div>

        {/* CTA Banner: "Have a ministry system, school, or marketplace in mind?" */}
        <div className="mt-16 rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#071C40] via-[#0B2F6B] to-[#0A3A7A] text-white border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
          {/* Subtle gold orbital echo in background */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border border-[#D4AF37]/20 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
                {language === 'so' ? 'DIYAAR MA U TAHAY DHISMAHA?' : 'START A COLLABORATION'}
              </span>
              <h3 className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight leading-tight">
                {language === 'so'
                  ? 'Ma haysaa nidaam dawladeed, dugsi, ama suuq ganacsi oo aad rabto inaad dhistid?'
                  : 'Have a ministry system, school ERP, or marketplace in mind?'}
              </h3>
              <p className="text-blue-200/90 text-sm sm:text-base mt-3 leading-relaxed">
                {language === 'so'
                  ? 'Nala soo xidhiidh maanta si aan u falanqayno nidaamkaaga, una bilowno naqshadeynta iyo dhismaha.'
                  : 'Talk directly with M2B senior engineering leadership in Hargeisa. We turn complex regional operations into software that lasts.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('contact')}
                className="px-7 py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#E5BE4A] to-[#C9A227] text-slate-950 hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>{language === 'so' ? 'Bilow Mashruuc' : 'Start a Project'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('work')}
                className="px-6 py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider border border-white/30 hover:border-white text-white transition-all flex items-center justify-center"
              >
                <span>{language === 'so' ? 'Eeg Shaqooyinka' : 'See Case Studies'}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
