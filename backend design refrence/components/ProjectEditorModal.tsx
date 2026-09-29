import React, { useState, useEffect } from 'react';
import { CmsProjectItem } from '../types';
import { WorkCategory } from '../../types';
import { X, Save, Plus, Trash2, Sparkles, Check, Globe } from 'lucide-react';

interface ProjectEditorModalProps {
  project?: CmsProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (projectData: any) => void;
}

const COMMON_STACK_TAGS = [
  'Laravel', 'Filament v3', 'Flutter', 'Next.js', 'PostGIS', 
  'Leaflet GIS', 'Cloudflare R2', 'ZAAD API', 'eDahab API', 
  'PostgreSQL', 'MySQL', 'Tailwind', 'Livewire', 'SMS Gateway', 'WebSockets'
];

export const ProjectEditorModal: React.FC<ProjectEditorModalProps> = ({
  project,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const isEdit = Boolean(project);

  const [title, setTitle] = useState(project?.title || '');
  const [slug, setSlug] = useState(project?.slug || '');
  const [client, setClient] = useState(project?.client || '');
  const [clientSo, setClientSo] = useState(project?.clientSo || '');
  const [sector, setSector] = useState(project?.sector || 'Enterprise Systems');
  const [category, setCategory] = useState<WorkCategory>(project?.category || 'government');
  const [tagline, setTagline] = useState(project?.tagline || '');
  const [taglineSo, setTaglineSo] = useState(project?.taglineSo || '');
  const [description, setDescription] = useState(project?.description || '');
  const [descriptionSo, setDescriptionSo] = useState(project?.descriptionSo || '');
  const [outcome, setOutcome] = useState(project?.outcome || '');
  const [outcomeSo, setOutcomeSo] = useState(project?.outcomeSo || '');
  const [liveUrl, setLiveUrl] = useState(project?.liveUrl || '');
  const [status, setStatus] = useState<CmsProjectItem['status']>(project?.status || 'In Production');
  const [visualType, setVisualType] = useState<CmsProjectItem['visualType']>(project?.visualType || 'dashboard');
  const [isFlagship, setIsFlagship] = useState(project?.isFlagship ?? false);
  const [published, setPublished] = useState(project?.published ?? true);

  // Stack tags
  const [stackTags, setStackTags] = useState<string[]>(project?.stack || ['Laravel', 'Filament', 'Flutter']);
  const [newTagInput, setNewTagInput] = useState('');

  // Metrics
  const [metrics, setMetrics] = useState<{ label: string; value: string }[]>(
    project?.metrics || [
      { label: 'Deploys', value: '100%' },
      { label: 'Audits', value: '500+' },
    ]
  );

  // Active language tab in editor
  const [editLang, setEditLang] = useState<'en' | 'so'>('en');

  const handleAddTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !stackTags.includes(trimmed)) {
      setStackTags([...stackTags, trimmed]);
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setStackTags(stackTags.filter((t) => t !== tagToRemove));
  };

  const handleUpdateMetric = (index: number, field: 'label' | 'value', val: string) => {
    const updated = [...metrics];
    updated[index][field] = val;
    setMetrics(updated);
  };

  const handleAddMetric = () => {
    if (metrics.length < 4) {
      setMetrics([...metrics, { label: 'New Metric', value: '0' }]);
    }
  };

  const handleRemoveMetric = (index: number) => {
    setMetrics(metrics.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !client.trim()) {
      alert('Please provide project title and client name.');
      return;
    }

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      client,
      clientSo: clientSo || client,
      sector,
      category,
      tagline,
      taglineSo: taglineSo || tagline,
      description,
      descriptionSo: descriptionSo || description,
      outcome,
      outcomeSo: outcomeSo || outcome,
      liveUrl: liveUrl.trim() || undefined,
      status,
      visualType,
      isFlagship,
      published,
      stack: stackTags,
      metrics,
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#06152F] border border-[#0B2F6B] rounded-3xl shadow-2xl text-white my-8 z-10 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#0B2F6B]/80 bg-[#040D1D]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#081E44] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-lg sm:text-xl text-white">
                {isEdit ? `Edit: ${project?.title}` : 'Register New System / Project'}
              </h2>
              <p className="text-xs text-blue-200/70">
                Configure M2B public deployment catalog & technical specifications
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Tabs switcher for bilingual data entry */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-[#081B38]/60 border-b border-[#0B2F6B]/50 text-xs">
          <span className="text-slate-400 font-mono text-[11px]">Bilingual Data Fields:</span>
          <div className="flex items-center gap-1 bg-[#040D1D] p-1 rounded-lg border border-[#0B2F6B]">
            <button
              type="button"
              onClick={() => setEditLang('en')}
              className={`px-3 py-1 rounded font-semibold transition-all ${
                editLang === 'en' ? 'bg-[#D4AF37] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              English (EN)
            </button>
            <button
              type="button"
              onClick={() => setEditLang('so')}
              className={`px-3 py-1 rounded font-semibold transition-all ${
                editLang === 'so' ? 'bg-[#D4AF37] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Somali (SO)
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Row 1: Title, Slug, Sector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. TowerLine"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. towerline"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Sector / Industry
              </label>
              <input
                type="text"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                placeholder="e.g. Government Infrastructure"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Row 2: Client Name (EN & SO) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Client (English) *
              </label>
              <input
                type="text"
                required
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. MoCIT Somaliland"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5">
                Macaamiilka (Somali)
              </label>
              <input
                type="text"
                value={clientSo}
                onChange={(e) => setClientSo(e.target.value)}
                placeholder="e.g. Wasaaradda Isgaadhsiinta & Tiknoolajiyadda"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as WorkCategory)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="government">Government</option>
                <option value="operations">Operations & ERP</option>
                <option value="education">Education</option>
                <option value="faith">Faith & Culture</option>
                <option value="commerce">Commerce & Mobile Money</option>
                <option value="mobile">Mobile Apps (Flutter)</option>
                <option value="websites">Websites</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Production Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Live">Live</option>
                <option value="In Production">In Production</option>
                <option value="Studio Product">Studio Product</option>
                <option value="Coming Soon">Coming Soon</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Visual Type Preview
              </label>
              <select
                value={visualType}
                onChange={(e) => setVisualType(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="dashboard">Command Dashboard</option>
                <option value="map">GIS Interactive Map</option>
                <option value="audio">Audio Reciter Player</option>
                <option value="mobile">Flutter Mobile App</option>
                <option value="shopping">Commerce & Mobile Money</option>
                <option value="ticket">QR Inspection / Tickets</option>
                <option value="web">Web Platform</option>
              </select>
            </div>
          </div>

          {/* Tagline according to active language tab */}
          {editLang === 'en' ? (
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Tagline (English)
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="One-line punchy proposition"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          ) : (
            <div>
              <label className="block text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5">
                Hadafka Guud / Tagline (Somali)
              </label>
              <input
                type="text"
                value={taglineSo}
                onChange={(e) => setTaglineSo(e.target.value)}
                placeholder="Faahfaahin kooban oo af-soomaali ah"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          )}

          {/* Description & Outcome */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {editLang === 'en' ? (
              <>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Description (English)
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Full overview of the system architecture and purpose..."
                    className="w-full p-3 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Measured Outcome (English)
                  </label>
                  <textarea
                    rows={3}
                    value={outcome}
                    onChange={(e) => setOutcome(e.target.value)}
                    placeholder="Measurable real-world impact (e.g. 1,400+ towers audited)..."
                    className="w-full p-3 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5">
                    Sharaxaada Nidaamka (Somali)
                  </label>
                  <textarea
                    rows={3}
                    value={descriptionSo}
                    onChange={(e) => setDescriptionSo(e.target.value)}
                    placeholder="Faahfaahin buuxda oo ku saabsan nidaamka..."
                    className="w-full p-3 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5">
                    Natiijada La Gaadhay (Somali)
                  </label>
                  <textarea
                    rows={3}
                    value={outcomeSo}
                    onChange={(e) => setOutcomeSo(e.target.value)}
                    placeholder="Natiijooyinka la taaban karo..."
                    className="w-full p-3 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </>
            )}
          </div>

          {/* Tech Stack Chips */}
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Technology Stack
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {stackTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0B2F6B] text-white border border-[#4882DB]/40 font-mono text-[11px]"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-slate-300 hover:text-red-400 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Quick add chips */}
            <div className="flex flex-wrap gap-1 mb-2 text-[10px]">
              <span className="text-slate-400 py-0.5">Quick add:</span>
              {COMMON_STACK_TAGS.filter((t) => !stackTags.includes(t)).slice(0, 8).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleAddTag(t)}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-slate-300 transition-colors"
                >
                  + {t}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag(newTagInput);
                  }
                }}
                placeholder="Type custom tech and press enter (e.g. Flutter 3.19)"
                className="flex-1 px-3 py-2 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="button"
                onClick={() => handleAddTag(newTagInput)}
                className="px-3.5 py-2 rounded-xl bg-[#081E44] border border-[#0B2F6B] text-[#D4AF37] font-bold"
              >
                Add
              </button>
            </div>
          </div>

          {/* Key Impact Metrics */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Proof Metrics (Max 4)
              </label>
              {metrics.length < 4 && (
                <button
                  type="button"
                  onClick={handleAddMetric}
                  className="text-[#D4AF37] hover:underline text-[11px] font-semibold"
                >
                  + Add Metric
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {metrics.map((m, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#081B38] p-2 rounded-xl border border-[#0B2F6B]">
                  <input
                    type="text"
                    value={m.label}
                    onChange={(e) => handleUpdateMetric(idx, 'label', e.target.value)}
                    placeholder="Metric Label (e.g. Towers)"
                    className="flex-1 px-2 py-1 rounded bg-[#06152F] border border-[#0B2F6B] text-white text-xs"
                  />
                  <input
                    type="text"
                    value={m.value}
                    onChange={(e) => handleUpdateMetric(idx, 'value', e.target.value)}
                    placeholder="Value (e.g. 1,420+)"
                    className="w-24 px-2 py-1 rounded bg-[#06152F] border border-[#0B2F6B] text-[#D4AF37] font-mono font-bold text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMetric(idx)}
                    className="text-slate-400 hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Live Link & Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#0B2F6B]/60">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Live URL (Optional)
              </label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://qaari.mahaysaa.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex items-center gap-6 pt-5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isFlagship}
                  onChange={(e) => setIsFlagship(e.target.checked)}
                  className="w-4 h-4 rounded text-[#D4AF37] focus:ring-0 border-[#0B2F6B] bg-[#081B38]"
                />
                <span className="font-semibold text-white">Flagship Case Study</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-0 border-[#0B2F6B] bg-[#081B38]"
                />
                <span className="font-semibold text-white">Published on Site</span>
              </label>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 px-6 border-t border-[#0B2F6B]/80 bg-[#040D1D]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-semibold"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#B38D1C] text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#D4AF37]/20"
          >
            <Save className="w-4 h-4" />
            <span>{isEdit ? 'Save Changes' : 'Publish Project'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
