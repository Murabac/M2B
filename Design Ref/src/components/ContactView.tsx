import React, { useState, useEffect } from 'react';
import { Language, ThemeMode, PageId } from '../types';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ContactViewProps {
  language: Language;
  theme: ThemeMode;
  onNavigate: (page: PageId) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  language,
  theme,
  onNavigate,
}) => {
  const isDark = theme === 'dark';

  // Form State
  const [selectedType, setSelectedType] = useState<string>('Ministry / Gov system');
  const [selectedBudget, setSelectedBudget] = useState<string>('$10k–$25k');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [phoneOrWhatsApp, setPhoneOrWhatsApp] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Live Hargeisa / EAT Clock (UTC+3)
  const [eatTime, setEatTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // EAT is UTC+3
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

  const projectTypes = [
    { id: 'Ministry / Gov system', labelEn: 'Ministry / Gov System', labelSo: 'Nidaam Dawladeed' },
    { id: 'ERP / Business operations', labelEn: 'ERP / Operations', labelSo: 'ERP & Hawlaha Ganacsiga' },
    { id: 'School / University', labelEn: 'School / University', labelSo: 'Dugsi / Jaamacad' },
    { id: 'Mobile app (Flutter)', labelEn: 'Mobile App (Flutter)', labelSo: 'App-ka Gacanta' },
    { id: 'Commerce / Mobile money', labelEn: 'Commerce & ZAAD', labelSo: 'Ganacsi & Mobile Money' },
    { id: 'Website / Brand', labelEn: 'Website & Digital Brand', labelSo: 'Mareeg & Astaan' },
  ];

  const budgetRanges = [
    '$3k–$5k',
    '$5k–$10k',
    '$10k–$25k',
    '$25k+',
    'Monthly Retainer',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className={`min-h-screen py-16 sm:py-24 transition-colors ${
      isDark ? 'bg-[#051329] text-white' : 'bg-[#FAFBFD] text-[#0A1E3B]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'so' ? 'NALA SOO XIDHIIDH · HARGEISA' : 'START A CONVERSATION · HARGEISA'}</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight mb-5">
            {language === 'so' ? (
              <>
                Aan bilowno <br />
                <span className="gold-gradient-text">dhismaha mashruucaaga xiga.</span>
              </>
            ) : (
              <>
                Let’s engineer <br />
                <span className="gold-gradient-text">your next sovereign system.</span>
              </>
            )}
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
            {language === 'so' ? (
              'Haddii aad tahay wasaarad qaran, shirkad ganacsi, ama aasaase doonaya xal farsamo oo sugan, waxaan diyaar u nahay inaan falanqayno nidaamkaaga.'
            ) : (
              'Direct access to senior software engineering leadership in Hargeisa. We evaluate feasibility, data schemas, and architecture before committing to code.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <div className={`p-8 sm:p-10 rounded-3xl border ${
              isDark ? 'bg-[#081B38] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-md'
            }`}>
              
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-display font-bold text-2xl">
                    {language === 'so' ? 'Farriintaada waanu helnay!' : 'Inquiry Received'}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    {language === 'so'
                      ? 'Waad ku mahadsan tahay nala soo xidhiidhkaaga. Kooxda injineerada ee M2B waxay kuugu soo jawaabi doonaan 24 saac gudahood.'
                      : 'Thank you for reaching out. Senior engineering leadership at M2B will review your project requirements and respond within 24 hours.'}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl text-xs font-mono font-bold bg-[#D4AF37] text-slate-950 mt-4"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Step 1: Project Type Selection */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                      1. Select Project Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {projectTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setSelectedType(type.id)}
                          className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border ${
                            selectedType === type.id
                              ? 'bg-[#0B2F6B] text-[#D4AF37] border-[#D4AF37] font-bold shadow-sm'
                              : isDark
                                ? 'bg-white/5 border-white/10 text-slate-300 hover:border-[#D4AF37]/40'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-[#0B2F6B]/30'
                          }`}
                        >
                          {language === 'so' ? type.labelSo : type.labelEn}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Budget Range (USD) */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                      2. Estimated Investment Range (USD)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgetRanges.map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setSelectedBudget(range)}
                          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                            selectedBudget === range
                              ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]'
                              : isDark
                                ? 'bg-white/5 border-white/10 text-slate-300 hover:border-white/30'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Mustafe Jamac"
                        className={`w-full p-3 rounded-xl text-xs border focus:outline-none transition-all ${
                          isDark 
                            ? 'bg-[#051329] border-white/10 text-white focus:border-[#D4AF37]' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#0B2F6B]'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@organization.com"
                        className={`w-full p-3 rounded-xl text-xs border focus:outline-none transition-all ${
                          isDark 
                            ? 'bg-[#051329] border-white/10 text-white focus:border-[#D4AF37]' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#0B2F6B]'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">
                        Organization / Ministry
                      </label>
                      <input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="e.g. MoCIT / Dahabshiil / Academy"
                        className={`w-full p-3 rounded-xl text-xs border focus:outline-none transition-all ${
                          isDark 
                            ? 'bg-[#051329] border-white/10 text-white focus:border-[#D4AF37]' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#0B2F6B]'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">
                        WhatsApp / Phone *
                      </label>
                      <input
                        type="text"
                        required
                        value={phoneOrWhatsApp}
                        onChange={(e) => setPhoneOrWhatsApp(e.target.value)}
                        placeholder="+252 63 XXXXXXX"
                        className={`w-full p-3 rounded-xl text-xs border focus:outline-none transition-all ${
                          isDark 
                            ? 'bg-[#051329] border-white/10 text-white focus:border-[#D4AF37]' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#0B2F6B]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Step 4: Brief Description */}
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">
                      Project Goals & Key Workflows
                    </label>
                    <textarea
                      rows={4}
                      value={projectBrief}
                      onChange={(e) => setProjectBrief(e.target.value)}
                      placeholder="Describe what your organization is trying to accomplish, current field challenges, or target timeline..."
                      className={`w-full p-3 rounded-xl text-xs border focus:outline-none transition-all ${
                        isDark 
                          ? 'bg-[#051329] border-white/10 text-white focus:border-[#D4AF37]' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#0B2F6B]'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#E5BE4A] to-[#C9A227] text-slate-950 hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>{language === 'so' ? 'Dir Codsigaaga Mashruuca' : 'Submit Project Inquiry'}</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                </form>
              )}

            </div>
          </div>

          {/* Right Column: Location, Clock, Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Hargeisa Headquarters Badge */}
            <div className={`p-8 rounded-3xl border ${
              isDark ? 'bg-[#081B38] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] font-bold mb-3">
                <MapPin className="w-4 h-4" />
                <span>STUDIO HEADQUARTERS</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl tracking-tight mb-2">
                Hargeisa, Somaliland
              </h3>

              <div className="text-xs font-mono text-slate-400 mb-4">
                GPS: 09°33'42" N, 44°03'36" E
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Operating directly from the capital of Somaliland, minutes from ministerial headquarters and commercial telecom hubs.
              </p>

              {/* Live EAT Clock */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#051329] border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    HARGEISA LOCAL TIME (EAT · UTC+3)
                  </span>
                  <span className="font-mono font-bold text-lg text-[#D4AF37]">
                    {eatTime || '11:42:18 AM EAT'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-500 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Studio Active
                  </span>
                </div>
              </div>

              {/* Working Hours */}
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1 text-slate-500">
                <div className="flex justify-between">
                  <span>Saturday – Thursday:</span>
                  <span className="text-slate-700 dark:text-slate-300 font-bold">08:00 – 17:00 EAT</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday (Jummah):</span>
                  <span>Closed for prayer</span>
                </div>
              </div>
            </div>

            {/* Direct Instant Channels: WhatsApp & Email */}
            <div className={`p-8 rounded-3xl border space-y-4 ${
              isDark ? 'bg-[#081B38] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37] block">
                Direct Engineering Channels
              </span>

              {/* WhatsApp direct */}
              <a
                href="https://wa.me/252634400000?text=Hello%20M2B%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20software%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-sm block text-inherit">WhatsApp Direct</span>
                    <span className="text-xs font-mono opacity-80">+252 63 (Inquiry Desk)</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              {/* Email direct */}
              <a
                href="mailto:contact@m2b.so?subject=New%20Project%20Inquiry%20via%20M2B%20Website"
                className="flex items-center justify-between p-4 rounded-2xl bg-[#0B2F6B]/10 border border-[#0B2F6B]/30 text-[#0B2F6B] dark:text-blue-300 hover:bg-[#0B2F6B]/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0B2F6B] text-[#D4AF37] flex items-center justify-center font-bold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-sm block text-inherit">Official Email</span>
                    <span className="text-xs font-mono opacity-80">contact@m2b.so</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
