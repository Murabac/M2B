import React, { useState, useEffect } from 'react';
import { Language, ThemeMode, PageId } from '../types';
import { M2BLogo } from './M2BLogo';
import { MapPin, Clock, Globe, ArrowUp } from 'lucide-react';

interface FooterProps {
  language: Language;
  theme: ThemeMode;
  onNavigate: (page: PageId, slug?: string) => void;
  onToggleLanguage: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  theme,
  onNavigate,
  onToggleLanguage,
}) => {
  const isDark = theme === 'dark';
  const [eatTime, setEatTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const eatOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Mogadishu',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setEatTime(now.toLocaleTimeString('en-US', eatOptions));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t transition-colors ${
      isDark ? 'bg-[#030914] text-white border-[#0B2F6B]/40' : 'bg-slate-900 text-slate-100 border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <M2BLogo variant="full" size="md" theme="dark" />

            <div className="pt-2">
              <span className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] block uppercase">
                {language === 'so' ? 'Tiknoolajiyad · Hal-abuur · Xalal' : 'Technology | Innovation | Solutions'}
              </span>
              <p className="text-sm font-display font-medium text-slate-400 mt-1">
                {language === 'so' ? 'Ku Xidh Maanta, Dhis Berrito' : 'Connecting Today, Building Tomorrow'}
              </p>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {language === 'so' ? (
                'M2B waa xarun software oo ku taalla Hargeysa, Somaliland, oo dhisaysa nidaamyada dawliga ah, kuwa ganacsiga, iyo barnaamijyada bulshada Geeska Afrika.'
              ) : (
                'Independent technology studio engineered in Hargeisa, Somaliland. Shipping sovereign systems, field operations, and consumer software for the Horn of Africa and the diaspora.'
              )}
            </p>

            {/* Coordinates & EAT Time Badge */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>09°33'42" N, 44°03'36" E</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{eatTime || '11:42 AM EAT'}</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37] block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#D4AF37] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('work')} className="hover:text-[#D4AF37] transition-colors">
                  Case Studies & Work (20+)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-[#D4AF37] transition-colors">
                  Product OS Pedestals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('capabilities')} className="hover:text-[#D4AF37] transition-colors">
                  Capabilities & Local Stack
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('studio')} className="hover:text-[#D4AF37] transition-colors">
                  Studio & Origins
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#D4AF37] transition-colors">
                  Start a Project Inquiry
                </button>
              </li>
            </ul>
          </div>

          {/* Flagship Systems Column */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37] block">
              Flagship Deployments
            </span>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('case-study', 'towerline')}
                  className="text-left group hover:text-[#D4AF37] transition-colors block"
                >
                  <span className="font-bold block">TowerLine</span>
                  <span className="text-slate-500 text-[11px]">MoCIT Somaliland National Tower Registry</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('case-study', 'qaari')}
                  className="text-left group hover:text-[#D4AF37] transition-colors block"
                >
                  <span className="font-bold block">Qaari SL</span>
                  <span className="text-slate-500 text-[11px]">Somali Quran Streaming & Cloudflare R2 Audio</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('case-study', 'aragsan-dugsi')}
                  className="text-left group hover:text-[#D4AF37] transition-colors block"
                >
                  <span className="font-bold block">Aragsan / NOVA Ops & Dugsi ERP</span>
                  <span className="text-slate-500 text-[11px]">Facility Inspection Rings & Secondary School ERP</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Language, Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} M2B Technology Innovation Solutions. Built for the Horn and beyond.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onToggleLanguage}
              className="px-3 py-1 rounded-lg border border-slate-700 hover:border-[#D4AF37] text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Language: {language === 'en' ? 'English (EN)' : 'Soomaali (SO)'}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg border border-slate-700 hover:border-[#D4AF37] text-slate-300 hover:text-white flex items-center justify-center transition-all"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
