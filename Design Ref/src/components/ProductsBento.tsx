import React, { useState } from 'react';
import { Language, ThemeMode, PageId, ProjectItem } from '../types';
import { ALL_PROJECTS } from '../data/projectsData';
import { 
  ArrowRight, 
  ExternalLink, 
  Smartphone, 
  Monitor, 
  QrCode, 
  ShoppingBag, 
  FileText, 
  Flame, 
  Radio, 
  Layers,
  Sparkles,
  MapPin
} from 'lucide-react';

interface ProductsBentoProps {
  language: Language;
  theme: ThemeMode;
  onNavigate: (page: PageId, slug?: string) => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const ProductsBento: React.FC<ProductsBentoProps> = ({
  language,
  theme,
  onNavigate,
  onSelectProject,
}) => {
  const isDark = theme === 'dark';

  // Selected top featured bento products
  const bentoItems = ALL_PROJECTS.slice(0, 8);

  return (
    <section className={`py-20 sm:py-28 border-b transition-colors relative ${
      isDark ? 'bg-[#051329] text-white border-[#0B2F6B]/50' : 'bg-[#FAFBFD] text-[#0A1E3B] border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'so' ? 'NIDAAMYADA AAN HIRGELINNO' : 'PRODUCTS WE SHIP'}</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight">
              {language === 'so' ? (
                <>
                  Dugsiyada, dawladda, iyo <br className="hidden sm:inline" />
                  <span className="gold-gradient-text">barnaamijyada bulshada.</span>
                </>
              ) : (
                <>
                  Tools, dashboards, <br className="hidden sm:inline" />
                  <span className="gold-gradient-text">and consumer mobile engines.</span>
                </>
              )}
            </h2>
          </div>

          <button
            onClick={() => onNavigate('products')}
            className={`self-start md:self-auto px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider border transition-all flex items-center gap-2 ${
              isDark 
                ? 'border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10' 
                : 'border-[#0B2F6B]/30 text-[#0B2F6B] hover:bg-[#0B2F6B]/5'
            }`}
          >
            <span>{language === 'so' ? 'Eeg Dhammaan Alaabaha (Product OS)' : 'Open Product OS Index'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* BENTO 1: Ekaadh Event Ticketing (Tall Card with Phone Frame & QR code) */}
          <div 
            onClick={() => onSelectProject(ALL_PROJECTS.find(p => p.id === 'ekaadh')!)}
            className={`md:row-span-2 rounded-3xl p-7 border transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 hover:border-[#D4AF37] ${
              isDark 
                ? 'bg-[#081B38] border-white/10 shadow-xl' 
                : 'bg-white border-slate-200/80 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#D4AF37]/20 text-[#D4AF37]">
                  MOBILE TICKETING
                </span>
                <span className="text-xs font-mono text-emerald-500 font-bold">● LIVE</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl tracking-tight mb-2 group-hover:text-[#D4AF37] transition-colors">
                Ekaadh Tickets
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Frictionless Horn of Africa event marketplace with ZAAD/eDahab instant checkout and cryptographically signed offline QR pass verification.
              </p>

              {/* Realistic Mobile Ticket Mockup */}
              <div className="w-full max-w-[240px] mx-auto rounded-3xl p-4 bg-[#051329] text-white border border-[#D4AF37]/40 shadow-2xl relative my-4">
                {/* Phone Notch */}
                <div className="w-16 h-3 bg-black rounded-full mx-auto mb-3" />
                
                <div className="border-b border-dashed border-slate-700 pb-3 text-center">
                  <span className="text-[9px] font-mono text-[#D4AF37] block">HARGEISA TECH SUMMIT</span>
                  <span className="font-display font-bold text-xs">VIP ALL-ACCESS PASS</span>
                </div>

                {/* QR Code Simulation */}
                <div className="my-4 p-3 bg-white rounded-xl flex items-center justify-center">
                  <div className="w-24 h-24 bg-slate-900 rounded-lg p-2 flex flex-wrap gap-1 items-center justify-center">
                    <QrCode className="w-16 h-16 text-white" />
                  </div>
                </div>

                <div className="text-center font-mono text-[9px] text-slate-400">
                  <span>SCAN SPEED: 0.8s (OFFLINE OK)</span>
                  <div className="text-emerald-400 font-bold mt-1">ZAAD CONFIRMED $45.00</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-[#D4AF37]">
              <span>Flutter · Laravel · QR Crypto</span>
              <span className="group-hover:translate-x-1 transition-transform">View Case →</span>
            </div>
          </div>

          {/* BENTO 2: Suuqsade Proxy Shopping (Wide Dashboard Card) */}
          <div 
            onClick={() => onSelectProject(ALL_PROJECTS.find(p => p.id === 'suuqsade')!)}
            className={`lg:col-span-2 rounded-3xl p-7 border transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 hover:border-[#D4AF37] ${
              isDark 
                ? 'bg-[#081B38] border-white/10 shadow-xl' 
                : 'bg-white border-slate-200/80 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0B2F6B] text-white">
                  CROSS-BORDER COMMERCE
                </span>
                <span className="text-xs font-mono text-slate-500">12,000+ Packages Shipped</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl tracking-tight mb-2 group-hover:text-[#D4AF37] transition-colors">
                Suuqsade Global Proxy Engine
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Automated quote extraction for Amazon, Shein & AliExpress URLs into local Horn currency, calculating customs duties, air freight by weight, and ZAAD checkout.
              </p>

              {/* Interactive URL calculation preview */}
              <div className="rounded-xl p-3.5 bg-slate-100 dark:bg-[#051329] border border-slate-200 dark:border-blue-900/50 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="truncate">shein.com/item/linen-suit-mens-89240</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block">ITEM USD</span>
                    <span className="font-bold text-inherit">$38.50</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">FREIGHT + CUSTOMS</span>
                    <span className="font-bold text-[#D4AF37]">+$14.20</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">TOTAL ZAAD</span>
                    <span className="font-bold text-emerald-500">$52.70</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-[#D4AF37]">
              <span>Flutter · Laravel API · Freight SMS</span>
              <span className="group-hover:translate-x-1 transition-transform">View Case →</span>
            </div>
          </div>

          {/* BENTO 3: Biloop Invoice (SaaS Tool Preview) */}
          <div 
            onClick={() => onSelectProject(ALL_PROJECTS.find(p => p.id === 'biloop')!)}
            className={`rounded-3xl p-7 border transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 hover:border-[#D4AF37] ${
              isDark 
                ? 'bg-[#081B38] border-white/10 shadow-xl' 
                : 'bg-white border-slate-200/80 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0B2F6B] text-white">
                  SAAS PRODUCT
                </span>
                <span className="text-xs font-mono text-[#D4AF37]">Official Stamps</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl tracking-tight mb-2 group-hover:text-[#D4AF37] transition-colors">
                Biloop Invoice
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Live A4 quotation-to-invoice engine with digital corporate rubber stamps, dual USD / SL Shillings, and direct WhatsApp invoice dispatch.
              </p>

              {/* Mini A4 Sheet Chrome */}
              <div className="rounded-xl p-3 bg-white text-slate-900 border border-slate-300 shadow-md font-mono text-[10px] relative overflow-hidden">
                <div className="flex justify-between border-b pb-1 mb-1 font-bold">
                  <span>INVOICE #M2B-891</span>
                  <span>$2,450.00</span>
                </div>
                <div className="text-slate-500">Ministry IT Support · Q3</div>
                {/* Stamp graphic */}
                <div className="absolute bottom-1 right-2 w-12 h-12 rounded-full border-2 border-red-600/70 text-red-600/80 flex items-center justify-center font-bold text-[7px] rotate-[-15deg]">
                  VERIFIED
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-[#D4AF37]">
              <span>Next.js · React-PDF · PostgreSQL</span>
              <span className="group-hover:translate-x-1 transition-transform">View Case →</span>
            </div>
          </div>

          {/* BENTO 4: Jimicso Fitness App (Phone Card with streaks) */}
          <div 
            onClick={() => onSelectProject(ALL_PROJECTS.find(p => p.id === 'jimicso')!)}
            className={`rounded-3xl p-7 border transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 hover:border-[#D4AF37] ${
              isDark 
                ? 'bg-[#081B38] border-white/10 shadow-xl' 
                : 'bg-white border-slate-200/80 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-500">
                  MOBILE HEALTH
                </span>
                <span className="text-xs font-mono text-slate-500">14k Streaks</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl tracking-tight mb-2 group-hover:text-[#D4AF37] transition-colors">
                Jimicso
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Playful Somali community fitness companion with habit streaks, XP rewards, and weekly friends leaderboards in Hargeisa and London.
              </p>

              {/* Streak Pill */}
              <div className="rounded-xl p-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
                  <span className="font-display font-bold text-sm">28 Day Streak</span>
                </div>
                <span className="font-mono text-xs font-bold text-amber-400">+450 XP</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-[#D4AF37]">
              <span>Flutter · Firebase · Community</span>
              <span className="group-hover:translate-x-1 transition-transform">View Case →</span>
            </div>
          </div>

          {/* BENTO 5: KobNeti / Support Hub */}
          <div 
            onClick={() => onSelectProject(ALL_PROJECTS.find(p => p.id === 'kobneti')!)}
            className={`rounded-3xl p-7 border transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 hover:border-[#D4AF37] ${
              isDark 
                ? 'bg-[#081B38] border-white/10 shadow-xl' 
                : 'bg-white border-slate-200/80 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0B2F6B] text-white">
                  ENTERPRISE OPS
                </span>
                <span className="text-xs font-mono text-emerald-500">WebSocket Mesh</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl tracking-tight mb-2 group-hover:text-[#D4AF37] transition-colors">
                KobNeti Support Hub
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Multi-tenant support desk bridging WhatsApp, live website chat, ticket queues, and telecom API uptime monitors.
              </p>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-[#051329] border border-slate-200 dark:border-slate-800 text-xs font-mono flex items-center justify-between">
                <span className="text-slate-500">Mean Resolution Time:</span>
                <span className="text-emerald-500 font-bold">-52% vs manual</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-[#D4AF37]">
              <span>Node.js · WebSockets · Filament</span>
              <span className="group-hover:translate-x-1 transition-transform">View Case →</span>
            </div>
          </div>

          {/* BENTO 6: Reer Sh Yoonis (Lineage Archive & Mutual Aid) */}
          <div 
            onClick={() => onSelectProject(ALL_PROJECTS.find(p => p.id === 'reer-sh-yoonis')!)}
            className={`rounded-3xl p-7 border transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 hover:border-[#D4AF37] ${
              isDark 
                ? 'bg-[#081B38] border-white/10 shadow-xl' 
                : 'bg-white border-slate-200/80 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#D4AF37]/20 text-[#D4AF37]">
                  HERITAGE & TREASURY
                </span>
                <span className="text-xs font-mono text-slate-500">8 Generations</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl tracking-tight mb-2 group-hover:text-[#D4AF37] transition-colors">
                Reer Sh Yoonis Lineage
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Family genealogy archive, digital patronymic tree, care ratings, and transparent diaspora mutual-aid treasury.
              </p>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-[#051329] border border-slate-200 dark:border-slate-800 text-xs font-mono flex items-center justify-between">
                <span className="text-slate-500">Verified Lineage:</span>
                <span className="text-[#D4AF37] font-bold">1,850+ Family Members</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-[#D4AF37]">
              <span>Next.js · D3.js · PostgreSQL</span>
              <span className="group-hover:translate-x-1 transition-transform">View Case →</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
