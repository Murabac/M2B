import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { Inquiry, InquiryStatus } from '../types';
import { 
  Inbox, 
  Search, 
  Filter, 
  Send, 
  Mail, 
  Phone, 
  Download, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowUpRight, 
  Trash2 
} from 'lucide-react';

interface InquiriesManagerViewProps {
  onSelectInquiry: (inquiry: Inquiry) => void;
}

export const InquiriesManagerView: React.FC<InquiriesManagerViewProps> = ({
  onSelectInquiry,
}) => {
  const { inquiries, updateInquiryStatus, deleteInquiry, exportInquiriesCsv } = useCms();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [inquirySearch, setInquirySearch] = useState('');

  const statusFilters: { id: string; label: string; count?: number }[] = [
    { id: 'all', label: 'All Leads', count: inquiries.length },
    { id: 'new', label: 'New Unread', count: inquiries.filter((i) => i.status === 'new').length },
    { id: 'reviewing', label: 'In Review', count: inquiries.filter((i) => i.status === 'reviewing').length },
    { id: 'contacted', label: 'Contacted', count: inquiries.filter((i) => i.status === 'contacted').length },
    { id: 'proposal_sent', label: 'Proposal Sent', count: inquiries.filter((i) => i.status === 'proposal_sent').length },
    { id: 'won', label: 'Contracts Won', count: inquiries.filter((i) => i.status === 'won').length },
    { id: 'archived', label: 'Archived', count: inquiries.filter((i) => i.status === 'archived').length },
  ];

  const filteredInquiries = inquiries.filter((inq) => {
    // Search
    if (inquirySearch.trim()) {
      const q = inquirySearch.toLowerCase();
      const matchName = inq.clientName.toLowerCase().includes(q);
      const matchOrg = inq.organization.toLowerCase().includes(q);
      const matchEmail = inq.email.toLowerCase().includes(q);
      const matchMsg = inq.message.toLowerCase().includes(q);
      const matchType = inq.projectType.toLowerCase().includes(q);
      if (!matchName && !matchOrg && !matchEmail && !matchMsg && !matchType) return false;
    }

    // Status
    if (selectedStatus !== 'all' && inq.status !== selectedStatus) {
      return false;
    }

    return true;
  });

  const getCleanPhone = (phone: string) => {
    return phone.replace(/[^0-9]/g, '');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-xl text-white">
            Inbound Client Leads Desk & RFPs
          </h2>
          <p className="text-xs text-blue-200/70 mt-0.5">
            Client inquiries submitted through the public website, ministry briefings, & WhatsApp
          </p>
        </div>

        <button
          onClick={exportInquiriesCsv}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#081E44] border border-[#0B2F6B] hover:border-[#D4AF37] text-white transition-all shadow-md"
        >
          <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Export All Leads (CSV)</span>
        </button>
      </div>

      {/* Search and Status Pills */}
      <div className="p-4 rounded-2xl bg-[#06152F] border border-[#0B2F6B] space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={inquirySearch}
            onChange={(e) => setInquirySearch(e.target.value)}
            placeholder="Search leads by organization, client name, email, or requirements..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {statusFilters.map((st) => (
            <button
              key={st.id}
              onClick={() => setSelectedStatus(st.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all flex items-center gap-1.5 ${
                selectedStatus === st.id
                  ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md shadow-[#D4AF37]/15'
                  : 'bg-[#081B38] text-slate-300 hover:text-white border border-[#0B2F6B]'
              }`}
            >
              <span>{st.label}</span>
              {st.count !== undefined && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  selectedStatus === st.id ? 'bg-slate-950 text-[#D4AF37]' : 'bg-[#06152F] text-slate-400'
                }`}>
                  {st.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Leads List */}
      {filteredInquiries.length === 0 ? (
        <div className="text-center py-16 bg-[#06152F] border border-[#0B2F6B] rounded-3xl p-8">
          <Inbox className="w-10 h-10 text-slate-500 mx-auto mb-2" />
          <h3 className="text-base font-bold text-white mb-1">No leads found</h3>
          <p className="text-xs text-slate-400">Try adjusting your status filter or search keywords.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredInquiries.map((inq) => {
            const isNew = inq.status === 'new';
            const cleanPhone = getCleanPhone(inq.phone);
            const whatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
              `Hello ${inq.clientName}, this is Abdirahmaan Mire from M2B Technology Innovation Solutions in Hargeisa. Regarding your inquiry on ${inq.projectType}:`
            )}`;

            return (
              <div
                key={inq.id}
                className={`p-5 rounded-3xl border transition-all ${
                  isNew
                    ? 'bg-[#081B38] border-[#D4AF37]/60 shadow-lg shadow-[#D4AF37]/5'
                    : 'bg-[#06152F] border-[#0B2F6B]'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 
                        onClick={() => onSelectInquiry(inq)}
                        className="font-display font-extrabold text-base text-white hover:text-[#D4AF37] cursor-pointer transition-colors"
                      >
                        {inq.organization || inq.clientName}
                      </h3>

                      {isNew && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#D4AF37] text-slate-950">
                          NEW INQUIRY
                        </span>
                      )}

                      <span className="px-2 py-0.5 rounded-lg bg-[#081E44] text-blue-200 border border-[#0B2F6B] text-[11px] font-mono">
                        {inq.projectType}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span>Contact: <strong className="text-slate-200">{inq.clientName}</strong></span>
                      <span>·</span>
                      <a href={`mailto:${inq.email}`} className="hover:text-[#D4AF37]">{inq.email}</a>
                      <span>·</span>
                      <span className="font-mono">{inq.phone}</span>
                    </div>
                  </div>

                  {/* Budget & Status Selector */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-[#040D1D] text-[#D4AF37] border border-[#0B2F6B] font-mono font-bold text-xs">
                      Budget: {inq.budget}
                    </span>

                    <select
                      value={inq.status}
                      onChange={(e) => updateInquiryStatus(inq.id, e.target.value as InquiryStatus)}
                      className="px-3 py-1 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="new">NEW</option>
                      <option value="reviewing">IN REVIEW</option>
                      <option value="contacted">CONTACTED</option>
                      <option value="proposal_sent">PROPOSAL SENT</option>
                      <option value="won">WON CONTRACT</option>
                      <option value="archived">ARCHIVED</option>
                    </select>
                  </div>
                </div>

                {/* Brief Message Quote */}
                <div 
                  onClick={() => onSelectInquiry(inq)}
                  className="p-3.5 rounded-2xl bg-[#040D1D] border border-[#0B2F6B]/60 text-xs text-slate-300 leading-relaxed mb-3 cursor-pointer hover:border-[#D4AF37]/30 transition-colors"
                >
                  <p className="line-clamp-2">{inq.message}</p>
                </div>

                {/* Bottom Row Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Received {new Date(inq.createdAt).toLocaleDateString()} at{' '}
                    {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>

                  <div className="flex items-center gap-2">
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-slate-950 font-bold border border-[#25D366]/40 transition-colors text-xs"
                      title="Launch WhatsApp Chat"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <button
                      onClick={() => onSelectInquiry(inq)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#081E44] hover:bg-[#0B2F6B] text-[#D4AF37] font-semibold border border-[#0B2F6B] transition-colors"
                    >
                      Inspect Lead & Notes
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm('Delete this inquiry?')) {
                          deleteInquiry(inq.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
