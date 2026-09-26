import React from 'react';
import { Language, ThemeMode } from '../types';
import { Landmark, GraduationCap, HeartPulse, ShoppingBag, Radio, Users } from 'lucide-react';

interface TrustStripProps {
  language: Language;
  theme: ThemeMode;
}

export const TrustStrip: React.FC<TrustStripProps> = ({ language, theme }) => {
  const isDark = theme === 'dark';

  const sectors = [
    {
      icon: Landmark,
      nameEn: 'Government',
      nameSo: 'Hay’adaha Dawladda',
      proof: 'MoCIT TowerLine GIS',
      metric: 'National Registry'
    },
    {
      icon: GraduationCap,
      nameEn: 'Education',
      nameSo: 'Waxbarashada',
      proof: 'Dugsi ERP & ACU Portal',
      metric: '6,200+ Students'
    },
    {
      icon: HeartPulse,
      nameEn: 'Health & NGO',
      nameSo: 'Caafimaadka & NGO',
      proof: 'ACFH & Liby Foundation',
      metric: '40 Health Posts'
    },
    {
      icon: ShoppingBag,
      nameEn: 'Commerce & Ops',
      nameSo: 'Ganacsiga & Hawlaha',
      proof: 'NOVA Cleaning & Ekaadh',
      metric: '120+ Facilities'
    },
    {
      icon: Radio,
      nameEn: 'Media & Culture',
      nameSo: 'Warbaahinta & Diinta',
      proof: 'Qaari SL & Maqal',
      metric: '85k+ Monthly Streams'
    },
    {
      icon: Users,
      nameEn: 'Community & Lineage',
      nameSo: 'Bulshada & Qoyska',
      proof: 'Jimicso & Reer Sh Yoonis',
      metric: 'Horn & Diaspora'
    },
  ];

  return (
    <section className={`py-12 border-b transition-colors ${
      isDark ? 'bg-[#040D1D] border-[#0B2F6B]/40' : 'bg-white border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
              {language === 'so' ? 'QAYBAHA AAN U ADEEGNO' : 'SECTORS OPERATING ON M2B'}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold mt-1 text-inherit">
              {language === 'so' 
                ? 'Nidaamyada lagu kalsoon yahay ee Dawladda ilaa Qoyska'
                : 'Proven Infrastructure from Sovereign Ministries to Grassroots'}
            </h3>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            <span>Production-verified systems across Somaliland & East Africa</span>
          </div>
        </div>

        {/* 6 Sectors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {sectors.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all duration-300 group hover:-translate-y-0.5 ${
                  isDark 
                    ? 'bg-[#06152F]/70 border-white/10 hover:border-[#D4AF37]/50' 
                    : 'bg-slate-50 border-slate-200/80 hover:border-[#0B2F6B]/30 hover:bg-white'
                }`}
              >
                <div className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center bg-[#0B2F6B]/10 dark:bg-[#D4AF37]/10 text-[#0B2F6B] dark:text-[#D4AF37]">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="font-display font-bold text-sm tracking-tight mb-1 text-inherit">
                  {language === 'so' ? sector.nameSo : sector.nameEn}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">
                  {sector.proof}
                </div>
                <div className="text-[10px] font-mono font-bold tracking-wider text-[#D4AF37]">
                  {sector.metric}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
