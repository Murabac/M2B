import React, { useState } from 'react';
import { Inquiry, InquiryStatus } from '../types';
import { 
  X, 
  Mail, 
  Phone, 
  Building2, 
  Calendar, 
  MessageSquare, 
  Send, 
  Trash2, 
  CheckCircle2, 
  Save, 
  DollarSign, 
  ExternalLink 
} from 'lucide-react';

interface InquiryDetailModalProps {
  inquiry: Inquiry | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: InquiryStatus) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onDelete: (id: string) => void;
}

export const InquiryDetailModal: React.FC<InquiryDetailModalProps> = ({
  inquiry,
  isOpen,
  onClose,
  onUpdateStatus,
  onUpdateNotes,
  onDelete,
}) => {
  if (!isOpen || !inquiry) return null;

  const [notes, setNotes] = useState(inquiry.notes || '');
  const [status, setStatus] = useState<InquiryStatus>(inquiry.status);

  const handleSaveNotes = () => {
    onUpdateNotes(inquiry.id, notes);
    onUpdateStatus(inquiry.id, status);
  };

  const getCleanPhone = (phone: string) => {
    return phone.replace(/[^0-9]/g, '');
  };

  const whatsAppUrl = `https://wa.me/${getCleanPhone(inquiry.phone)}?text=${encodeURIComponent(
    `Hello ${inquiry.clientName}, this is Abdirahmaan Mire from M2B Technology Innovation Solutions in Hargeisa. Thank you for your inquiry regarding the ${inquiry.projectType}. We would love to discuss your requirements.`
  )}`;

  const mailtoUrl = `mailto:${inquiry.email}?subject=${encodeURIComponent(
    `M2B Solutions — Regarding your ${inquiry.projectType} inquiry`
  )}&body=${encodeURIComponent(
    `Dear ${inquiry.clientName},\n\nThank you for reaching out to M2B Technology Innovation Solutions in Hargeisa.\n\nBest regards,\nAbdirahmaan Mire\nSenior Software Developer & Project Manager\nM2B Technology Innovation Solutions`
  )}`;

  const statusColors: Record<InquiryStatus, string> = {
    new: 'bg-[#D4AF37] text-slate-950 font-bold',
    reviewing: 'bg-blue-600 text-white',
    contacted: 'bg-indigo-600 text-white',
    proposal_sent: 'bg-amber-600 text-white',
    won: 'bg-emerald-500 text-slate-950 font-bold',
    archived: 'bg-slate-700 text-slate-300',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#06152F] border border-[#0B2F6B] rounded-3xl shadow-2xl text-white my-8 z-10 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#0B2F6B]/80 bg-[#040D1D]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#081E44] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-extrabold text-lg text-white">
                  {inquiry.organization || inquiry.clientName}
                </h2>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${statusColors[status]}`}>
                  {status.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-blue-200/70">
                Lead ID: {inquiry.id} · Submitted {new Date(inquiry.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
          {/* Client Details Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#081B38] p-4 rounded-2xl border border-[#0B2F6B]">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                Client Contact
              </span>
              <p className="text-sm font-bold text-white mb-2">{inquiry.clientName}</p>
              
              <div className="space-y-1.5 text-slate-300">
                <a 
                  href={`mailto:${inquiry.email}`} 
                  className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{inquiry.email}</span>
                </a>
                <a 
                  href={`tel:${inquiry.phone}`} 
                  className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">{inquiry.phone}</span>
                </a>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                Project Scope & Budget
              </span>
              <p className="text-sm font-bold text-[#D4AF37] mb-2">{inquiry.projectType}</p>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#0B2F6B] text-blue-100 font-mono text-xs border border-[#4882DB]/30">
                  Budget: {inquiry.budget}
                </span>
                <span className="px-2 py-1 rounded-lg bg-white/5 text-slate-300 text-xs">
                  {inquiry.priority.toUpperCase()} PRIORITY
                </span>
              </div>
            </div>
          </div>

          {/* Project Brief Message */}
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
              Client Project Brief & Request
            </label>
            <div className="p-4 rounded-2xl bg-[#040D1D] border border-[#0B2F6B] text-slate-200 leading-relaxed text-sm whitespace-pre-wrap selection:bg-[#D4AF37] selection:text-slate-950">
              {inquiry.message}
            </div>
          </div>

          {/* Quick Direct Communication Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold text-xs transition-transform active:scale-95 shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Launch WhatsApp Chat (+252)</span>
            </a>

            <a
              href={mailtoUrl}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#081E44] border border-[#0B2F6B] hover:border-[#D4AF37] text-white font-bold text-xs transition-colors"
            >
              <Mail className="w-4 h-4 text-[#D4AF37]" />
              <span>Compose Official Email</span>
            </a>
          </div>

          {/* Workflow Status Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
              Update Lead Workflow Status
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {(['new', 'reviewing', 'contacted', 'proposal_sent', 'won', 'archived'] as InquiryStatus[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => {
                    setStatus(st);
                    onUpdateStatus(inquiry.id, st);
                  }}
                  className={`py-2 px-1 rounded-xl text-center text-[10px] font-mono uppercase tracking-wider border transition-all ${
                    status === st
                      ? 'border-[#D4AF37] bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                      : 'border-[#0B2F6B] bg-[#081B38] text-slate-300 hover:text-white'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Internal Team Notes */}
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
              Internal Studio Notes (Abdirahmaan Mire & Team)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add discovery meeting notes, tech stack feasibility, or pricing considerations..."
              className="w-full p-3 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
            />
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={handleSaveNotes}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B2F6B] text-blue-100 hover:bg-[#0A3A7A] text-xs font-semibold"
              >
                <Save className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Save Notes</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 px-6 border-t border-[#0B2F6B]/80 bg-[#040D1D]">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Delete this inquiry permanently?')) {
                onDelete(inquiry.id);
                onClose();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Lead</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
