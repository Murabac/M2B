import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { 
  Layers, 
  Sparkles, 
  Save, 
  CheckCircle2, 
  Radio, 
  Headphones, 
  Building, 
  GraduationCap, 
  Scale, 
  Truck 
} from 'lucide-react';

export const ProductsManagerView: React.FC = () => {
  const { studioConfig, updateStudioConfig, projects } = useCms();

  const [towers, setTowers] = useState(studioConfig.statsTowersInspected);
  const [listeners, setListeners] = useState(studioConfig.statsListenersCount);
  const [schools, setSchools] = useState(studioConfig.statsSchoolsManaged);
  const [mobileMoney, setMobileMoney] = useState(studioConfig.statsMobileMoneyProcessed);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudioConfig({
      statsTowersInspected: towers,
      statsListenersCount: listeners,
      statsSchoolsManaged: schools,
      statsMobileMoneyProcessed: mobileMoney,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const showcaseProducts = [
    {
      id: 'towerline',
      title: 'TowerLine GIS Registry',
      sector: 'MoCIT Somaliland · Telecom Registry',
      visual: 'Dark GIS Map with coverage circles & A/B/C spectrum licenses',
      metric: `${towers} masts audited`,
      icon: Radio,
    },
    {
      id: 'qaari',
      title: 'Qaari SL Audio Platform',
      sector: 'Faith Media · Synchronized Quran Streaming',
      visual: 'Gold-cream waveform audio player with follow-along Arabic ayah',
      metric: `${listeners} active listeners`,
      icon: Headphones,
    },
    {
      id: 'aragsan',
      title: 'Aragsan / NOVA Ops Console',
      sector: 'Enterprise Operations · Facility Audits',
      visual: 'Health ring scorecards, supervisor checklists & ZAAD billing',
      metric: '120+ managed facilities',
      icon: Building,
    },
    {
      id: 'dugsi',
      title: 'Dugsi ERP',
      sector: 'Secondary Education Network',
      visual: 'Saturday–Wednesday calendar, grade compilations, parent SMS',
      metric: `${schools} institutions deployed`,
      icon: GraduationCap,
    },
    {
      id: 'raadkaab',
      title: 'Raad Kaab Fleet Tracking',
      sector: 'Logistics & Cargo Clearing',
      visual: 'Berbera Port to Hargeisa corridors, GPS speed alerts',
      metric: '350+ heavy trucks',
      icon: Truck,
    },
    {
      id: 'deegaan',
      title: 'Deegaan Law Legal Portal',
      sector: 'Legal & Judicial Practice',
      visual: 'Case file timeline, bilingual Somali court precedents, billing',
      metric: '480+ case filings',
      icon: Scale,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-display font-extrabold text-xl text-white">
          Products Bento Grid & Proof Statistics
        </h2>
        <p className="text-xs text-blue-200/70 mt-0.5">
          Tune the national scale metrics and showcased operational platforms displayed on the public landing page
        </p>
      </div>

      {/* Proof Metrics Editor Form */}
      <form onSubmit={handleSaveStats} className="p-6 rounded-3xl bg-[#06152F] border border-[#0B2F6B] space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#0B2F6B]/60">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-bold text-sm text-white uppercase tracking-wider">
              National Proof Counters (Public Trust Bar & Bento)
            </span>
          </div>
          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Saved to live site!</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Telecom Masts Audited
            </label>
            <input
              type="text"
              value={towers}
              onChange={(e) => setTowers(e.target.value)}
              placeholder="e.g. 1,420+"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-[#D4AF37] font-mono font-bold focus:outline-none focus:border-[#D4AF37]"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">TowerLine MoCIT Somaliland</span>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Monthly Quran Listeners
            </label>
            <input
              type="text"
              value={listeners}
              onChange={(e) => setListeners(e.target.value)}
              placeholder="e.g. 85,000+"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-[#D4AF37] font-mono font-bold focus:outline-none focus:border-[#D4AF37]"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">Qaari SL streaming catalog</span>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Secondary Schools Deployed
            </label>
            <input
              type="text"
              value={schools}
              onChange={(e) => setSchools(e.target.value)}
              placeholder="e.g. 14+"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-[#D4AF37] font-mono font-bold focus:outline-none focus:border-[#D4AF37]"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">Dugsi ERP institutions</span>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              ZAAD / eDahab Reconciled
            </label>
            <input
              type="text"
              value={mobileMoney}
              onChange={(e) => setMobileMoney(e.target.value)}
              placeholder="e.g. $4.2M+"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-[#D4AF37] font-mono font-bold focus:outline-none focus:border-[#D4AF37]"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">Operations & commerce volume</span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#B38D1C] text-slate-950 hover:brightness-110 active:scale-95 shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Update Live Counters</span>
          </button>
        </div>
      </form>

      {/* Public Bento Grid Tile Previews */}
      <div>
        <h3 className="font-display font-bold text-base text-white mb-3">
          Configured Bento Showcase Modules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {showcaseProducts.map((prod) => {
            const Icon = prod.icon;
            return (
              <div
                key={prod.id}
                className="p-5 rounded-3xl bg-[#06152F] border border-[#0B2F6B] hover:border-[#D4AF37]/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#081E44] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-sm">
                      {prod.title}
                    </h4>
                    <p className="text-[11px] text-blue-200/70 font-mono">
                      {prod.sector}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#040D1D] border border-[#0B2F6B]/60 text-xs text-slate-300 mb-3">
                  {prod.visual}
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="font-mono text-[#D4AF37] font-bold">
                    {prod.metric}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                    BENTO ACTIVE
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
