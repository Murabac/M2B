import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { CmsProjectItem } from '../types';
import { WorkCategory } from '../../types';
import { 
  Plus, 
  Search, 
  Filter, 
  Star, 
  Eye, 
  EyeOff, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Layers, 
  CheckCircle2, 
  LayoutGrid, 
  List, 
  Radio, 
  Sparkles 
} from 'lucide-react';

interface ProjectsManagerViewProps {
  onOpenNewProject: () => void;
  onEditProject: (project: CmsProjectItem) => void;
}

export const ProjectsManagerView: React.FC<ProjectsManagerViewProps> = ({
  onOpenNewProject,
  onEditProject,
}) => {
  const { 
    projects, 
    deleteProject, 
    toggleProjectFlagship, 
    toggleProjectPublished, 
    searchQuery, 
    setSearchQuery 
  } = useCms();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Sectors' },
    { id: 'government', label: 'Government' },
    { id: 'operations', label: 'Operations & ERP' },
    { id: 'education', label: 'Education' },
    { id: 'faith', label: 'Faith & Culture' },
    { id: 'commerce', label: 'Commerce & Mobile Money' },
    { id: 'mobile', label: 'Mobile (Flutter)' },
    { id: 'websites', label: 'Websites' },
  ];

  const filteredProjects = projects.filter((p) => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchClient = p.client.toLowerCase().includes(q);
      const matchSector = p.sector.toLowerCase().includes(q);
      const matchStack = p.stack.some((s) => s.toLowerCase().includes(q));
      if (!matchTitle && !matchClient && !matchSector && !matchStack) return false;
    }

    // 2. Category Filter
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }

    // 3. Status Filter
    if (selectedStatus !== 'all' && p.status !== selectedStatus) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-xl text-white">
            Projects & Platform Catalog
          </h2>
          <p className="text-xs text-blue-200/70 mt-0.5">
            Manage deployed registries, dual Flutter apps, school ERPs, and flagship case studies
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View mode toggle */}
          <div className="hidden sm:flex items-center bg-[#081B38] p-1 rounded-xl border border-[#0B2F6B]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-[#D4AF37] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-[#D4AF37] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenNewProject}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-display font-bold bg-gradient-to-r from-[#D4AF37] to-[#B38D1C] text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#D4AF37]/20"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Platform</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#06152F] border border-[#0B2F6B] space-y-3">
        {/* Search Input on Mobile/Tablet */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by system title, client, or technology (e.g. TowerLine, PostGIS, Flutter)..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Category Pills (horizontally scrollable on mobile) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md shadow-[#D4AF37]/15'
                  : 'bg-[#081B38] text-slate-300 hover:text-white border border-[#0B2F6B]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid / Table */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-[#06152F] border border-[#0B2F6B] rounded-3xl p-8">
          <div className="w-12 h-12 rounded-full bg-[#081E44] text-[#D4AF37] flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">No platforms match your criteria</h3>
          <p className="text-xs text-slate-400 mb-4">Try clearing your search query or selecting a different sector.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {filteredProjects.map((p) => {
            return (
              <div
                key={p.id}
                className="flex flex-col justify-between p-5 rounded-3xl bg-[#06152F] border border-[#0B2F6B] hover:border-[#D4AF37]/50 transition-all group relative overflow-hidden"
              >
                {/* Top Row: Client & Status Badges */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-lg border border-[#D4AF37]/30 font-semibold truncate max-w-[190px]">
                      {p.sector}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {p.isFlagship && (
                        <button
                          onClick={() => toggleProjectFlagship(p.id)}
                          title="Flagship Case Study (Click to toggle)"
                          className="p-1 rounded-lg bg-amber-500/20 text-amber-400 hover:scale-110 transition-transform"
                        >
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                        </button>
                      )}

                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                        p.status === 'Live'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : p.status === 'In Production'
                          ? 'bg-blue-950 text-blue-300 border border-blue-500/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                  </div>

                  {/* Title & Client */}
                  <h3 className="font-display font-extrabold text-lg text-white group-hover:text-[#D4AF37] transition-colors mb-0.5">
                    {p.title}
                  </h3>
                  <p className="text-xs text-blue-200/80 font-medium mb-3">
                    {p.client} {p.clientSo ? `· ${p.clientSo}` : ''}
                  </p>

                  {/* Tagline */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                    {p.tagline}
                  </p>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-[#081B38] text-slate-300 border border-[#0B2F6B] text-[10px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {p.stack.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] text-slate-400 font-mono">
                        +{p.stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Metrics & Actions */}
                <div className="pt-3 border-t border-[#0B2F6B]/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleProjectPublished(p.id)}
                      title={p.published ? "Published (click to unpublish)" : "Draft (click to publish)"}
                      className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg border transition-colors ${
                        p.published 
                          ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30' 
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {p.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">{p.published ? 'Live' : 'Draft'}</span>
                    </button>

                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                        title="Open Live Deployment"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEditProject(p)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#081E44] hover:bg-[#0B2F6B] text-[#D4AF37] text-xs font-semibold border border-[#0B2F6B] transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Delete ${p.title} from CMS catalog?`)) {
                          deleteProject(p.id);
                        }
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-[#06152F] border border-[#0B2F6B] rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#040D1D] text-slate-400 text-[10px] uppercase font-mono border-b border-[#0B2F6B]">
                <tr>
                  <th className="p-4">Platform Title</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Sector</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Stack</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0B2F6B]/40">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-white flex items-center gap-2">
                      <span>{p.title}</span>
                      {p.isFlagship && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
                    </td>
                    <td className="p-4">{p.client}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-[#081B38] text-[#D4AF37] font-mono text-[10px]">
                        {p.sector}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        p.status === 'Live' ? 'bg-emerald-950 text-emerald-300' : 'bg-blue-950 text-blue-300'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-[10px] text-slate-400">
                      {p.stack.slice(0, 3).join(', ')}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEditProject(p)}
                          className="px-2.5 py-1 rounded bg-[#081E44] text-[#D4AF37] font-semibold hover:bg-[#0B2F6B]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${p.title}?`)) {
                              deleteProject(p.id);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
