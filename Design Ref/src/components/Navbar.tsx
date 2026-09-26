import React, { useState } from 'react';
import { M2BLogo } from './M2BLogo';
import { PageId, Language, ThemeMode, ViewportMode } from '../types';
import { 
  Globe, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  ArrowRight,
  Monitor,
  Smartphone
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, slug?: string) => void;
  language: Language;
  onToggleLanguage: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  viewportMode: ViewportMode;
  onChangeViewport: (mode: ViewportMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  language,
  onToggleLanguage,
  theme,
  onToggleTheme,
  viewportMode,
  onChangeViewport,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  const navLinks: { id: PageId; labelEn: string; labelSo: string }[] = [
    { id: 'work', labelEn: 'Work', labelSo: 'Mashaariicda' },
    { id: 'products', labelEn: 'Products', labelSo: 'Alaabta' },
    { id: 'capabilities', labelEn: 'Capabilities', labelSo: 'Xirfadaha' },
    { id: 'studio', labelEn: 'Studio', labelSo: 'Xafiiska' },
    { id: 'contact', labelEn: 'Contact', labelSo: 'Xidhiidh' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-colors duration-300">
      {/* Top thin status banner */}
      <div className={`py-1 px-4 text-center text-[11px] font-medium tracking-wider border-b transition-colors ${
        isDark 
          ? 'bg-[#040D1D] text-slate-300 border-[#0B2F6B]/60' 
          : 'bg-[#0B2F6B] text-white/95 border-[#0B2F6B]'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline text-white/80 font-mono text-[10px]">
              HARGEISA STUDIO · HORN OF AFRICA & DIASPORA
            </span>
            <span className="sm:hidden text-white/80 font-mono text-[10px]">
              M2B HARGEISA
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Viewport switcher preview tool */}
            <div className="hidden md:flex items-center bg-black/20 rounded-md p-0.5 text-[10px]">
              <button
                onClick={() => onChangeViewport('desktop')}
                title="Desktop 1440 View"
                className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all ${
                  viewportMode === 'desktop' ? 'bg-[#D4AF37] text-slate-950 font-bold' : 'text-white/70 hover:text-white'
                }`}
              >
                <Monitor className="w-3 h-3" />
                <span>1440</span>
              </button>
              <button
                onClick={() => onChangeViewport('mobile')}
                title="Mobile 390 View"
                className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all ${
                  viewportMode === 'mobile' ? 'bg-[#D4AF37] text-slate-950 font-bold' : 'text-white/70 hover:text-white'
                }`}
              >
                <Smartphone className="w-3 h-3" />
                <span>390</span>
              </button>
              <button
                onClick={() => onChangeViewport('responsive')}
                title="Fluid Responsive"
                className={`px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider ${
                  viewportMode === 'responsive' ? 'bg-white/20 text-white font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                Fluid
              </button>
            </div>

            <span className="text-[#D4AF37] text-[10px] font-mono tracking-widest hidden sm:inline">
              EN · SO · AR
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`w-full backdrop-blur-xl border-b transition-all duration-300 ${
        isDark 
          ? 'bg-[#06152F]/90 border-[#D4AF37]/20 text-white shadow-xl shadow-black/40' 
          : 'bg-white/92 border-[#0B2F6B]/10 text-[#0B2F6B] shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div 
            onClick={() => onNavigate('home')} 
            className="cursor-pointer select-none"
          >
            <M2BLogo variant="compact" size="md" theme={theme} />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                    isActive
                      ? isDark 
                        ? 'text-[#D4AF37] bg-white/5' 
                        : 'text-[#0B2F6B] bg-[#0B2F6B]/5 font-bold'
                      : isDark
                        ? 'text-slate-300 hover:text-white hover:bg-white/5'
                        : 'text-slate-600 hover:text-[#0B2F6B] hover:bg-[#0B2F6B]/5'
                  }`}
                >
                  {language === 'so' ? link.labelSo : link.labelEn}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#D4AF37] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controls: Language, Dark Mode, and Primary Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={onToggleLanguage}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isDark 
                  ? 'border-[#D4AF37]/30 text-slate-200 hover:border-[#D4AF37] bg-[#081B38]' 
                  : 'border-[#0B2F6B]/15 text-[#0B2F6B] hover:border-[#0B2F6B]/40 bg-[#EEF3F9]'
              }`}
              title="Toggle English / Somali"
            >
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{language.toUpperCase()}</span>
              <span className="text-[10px] text-slate-400">({language === 'en' ? 'SO' : 'EN'})</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-lg border transition-all ${
                isDark 
                  ? 'border-[#D4AF37]/30 text-[#D4AF37] hover:bg-white/5 bg-[#081B38]' 
                  : 'border-[#0B2F6B]/15 text-[#0B2F6B] hover:bg-[#0B2F6B]/5 bg-[#EEF3F9]'
              }`}
              title={isDark ? "Switch to Gallery White" : "Switch to Dark Command Center"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* "Start a project" Gold Action Button */}
            <button
              onClick={() => onNavigate('contact')}
              className="relative group overflow-hidden rounded-xl font-display font-bold text-xs uppercase tracking-wider px-5 py-2.5 transition-all shadow-md active:scale-95 bg-gradient-to-r from-[#D4AF37] via-[#E5BE4A] to-[#C9A227] text-slate-950 hover:shadow-lg hover:shadow-[#D4AF37]/25"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>{language === 'so' ? 'Bilow Mashruuc' : 'Start a Project'}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onToggleLanguage}
              className="px-2 py-1 text-xs font-mono font-bold rounded border border-[#D4AF37]/40 text-[#D4AF37]"
            >
              {language.toUpperCase()}
            </button>
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg border border-slate-300 dark:border-slate-700"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4 text-[#0B2F6B]" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-inherit hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-6 py-6 transition-all ${
          isDark ? 'bg-[#06152F] text-white border-slate-800' : 'bg-white text-[#0B2F6B] border-slate-200'
        }`}>
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-base font-bold py-2.5 px-3 rounded-lg flex items-center justify-between ${
                  currentPage === link.id
                    ? 'bg-[#D4AF37]/15 text-[#D4AF37]'
                    : 'hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <span>{language === 'so' ? link.labelSo : link.labelEn}</span>
                <ArrowRight className="w-4 h-4 opacity-50" />
              </button>
            ))}

            <div className="pt-4 mt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  onNavigate('contact');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-3 rounded-xl font-bold bg-[#D4AF37] text-slate-950 shadow-md"
              >
                {language === 'so' ? 'Bilow Mashruuc' : 'Start a Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
