import React from 'react';
import { Language, ThemeMode, PageId, ProjectItem } from '../types';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  language: Language;
  theme: ThemeMode;
  onClose: () => void;
  onNavigate: (page: PageId, slug?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  language,
  theme,
  onClose,
  onNavigate,
}) => {
  if (!project) return null;

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />

      <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl transition-all z-10 ${
        isDark 
          ? 'bg-[#081B38] border-[#D4AF37]/40 text-white' 
          : 'bg-white border-slate-200 text-[#0A1E3B]'
      }`}>
        
        {/* Modal Header Bar */}
        <div className="relative h-44 sm:h-52 bg-gradient-to-br from-[#071C40] to-[#0A3A7A] p-6 flex flex-col justify-between overflow-hidden text-white">
          <div className="flex items-center justify-between relative z-10">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
              project.status === 'Live'
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-[#D4AF37] text-slate-950'
            }`}>
              {project.status}
            </span>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative z-10">
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block">
              {project.sector}
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight mt-1">
              {project.title}
            </h2>
            <span className="text-xs font-mono text-blue-200/80">
              {language === 'so' && project.clientSo ? project.clientSo : project.client}
            </span>
          </div>

          <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full border border-white/10 pointer-events-none" />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
              SYSTEM OVERVIEW
            </span>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {language === 'so' && project.taglineSo ? project.taglineSo : project.tagline}
            </p>
          </div>

          {/* Outcome highlight */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#051329] border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono uppercase text-[#D4AF37] font-bold block mb-1">
              OPERATIONAL IMPACT
            </span>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {language === 'so' && project.outcomeSo ? project.outcomeSo : project.outcome}
            </p>
          </div>

          {/* Metrics if present */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {project.metrics.map((m, i) => (
                <div key={i} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <div className="font-display font-black text-2xl text-[#D4AF37]">{m.value}</div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Technologies */}
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
              STACK & INTEGRATIONS
            </span>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-[#0B2F6B] text-white hover:bg-[#0A3A7A] transition-all flex items-center justify-center gap-2"
              >
                <span>Launch Live System</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-xs font-mono text-slate-400">Internal Sovereign System</span>
            )}

            <button
              onClick={() => {
                onClose();
                onNavigate('contact');
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#E5BE4A] text-slate-950 hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Commission Similar System</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
