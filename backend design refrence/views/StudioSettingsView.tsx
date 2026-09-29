import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { 
  Building2, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Save, 
  CheckCircle2, 
  Sparkles, 
  Compass, 
  Award,
  Globe
} from 'lucide-react';

export const StudioSettingsView: React.FC = () => {
  const { studioConfig, updateStudioConfig } = useCms();

  const [founderName, setFounderName] = useState(studioConfig.founderName);
  const [founderRole, setFounderRole] = useState(studioConfig.founderRole);
  const [founderBio, setFounderBio] = useState(studioConfig.founderBio);
  const [experienceYears, setExperienceYears] = useState(studioConfig.founderExperienceYears);
  
  const [city, setCity] = useState(studioConfig.city);
  const [country, setCountry] = useState(studioConfig.country);
  const [officeAddress, setOfficeAddress] = useState(studioConfig.officeAddress);
  const [coordinates, setCoordinates] = useState(studioConfig.coordinates);
  
  const [email, setEmail] = useState(studioConfig.email);
  const [phonePrimary, setPhonePrimary] = useState(studioConfig.phonePrimary);
  const [phoneSecondary, setPhoneSecondary] = useState(studioConfig.phoneSecondary);
  const [whatsApp, setWhatsApp] = useState(studioConfig.whatsApp);
  
  const [businessHoursWeekdays, setBusinessHoursWeekdays] = useState(studioConfig.businessHoursWeekdays);
  const [businessHoursThursday, setBusinessHoursThursday] = useState(studioConfig.businessHoursThursday);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudioConfig({
      founderName,
      founderRole,
      founderBio,
      founderExperienceYears: Number(experienceYears),
      city,
      country,
      officeAddress,
      coordinates,
      email,
      phonePrimary,
      phoneSecondary,
      whatsApp,
      businessHoursWeekdays,
      businessHoursThursday,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-xl text-white">
            Studio Headquarters & Leadership Config
          </h2>
          <p className="text-xs text-blue-200/70 mt-0.5">
            Manage Hargeisa office coordinates, official contacts, and Lead Architect credentials
          </p>
        </div>

        {savedSuccess && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Updated successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Lead Architect & Project Manager */}
        <div className="p-6 rounded-3xl bg-[#06152F] border border-[#0B2F6B] space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#0B2F6B]/60">
            <User className="w-5 h-5 text-[#D4AF37]" />
            <span className="font-bold text-sm text-white uppercase tracking-wider">
              Studio Leadership (Abdirahmaan Mire)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={founderName}
                onChange={(e) => setFounderName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Official Title / Role
              </label>
              <input
                type="text"
                value={founderRole}
                onChange={(e) => setFounderRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Years of Software Experience
              </label>
              <input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-[#D4AF37] font-mono font-bold focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Leadership Bio Summary (Public Studio Section)
            </label>
            <textarea
              rows={3}
              value={founderBio}
              onChange={(e) => setFounderBio(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37] text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* Section 2: Hargeisa Coordinates & Office Address */}
        <div className="p-6 rounded-3xl bg-[#06152F] border border-[#0B2F6B] space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#0B2F6B]/60">
            <Compass className="w-5 h-5 text-[#D4AF37]" />
            <span className="font-bold text-sm text-white uppercase tracking-wider">
              Physical Location & GPS Coordinates
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Country / Region
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                GPS Coordinates (Shown in Footer & Contact)
              </label>
              <input
                type="text"
                value={coordinates}
                onChange={(e) => setCoordinates(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-[#D4AF37] font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Office Address
            </label>
            <input
              type="text"
              value={officeAddress}
              onChange={(e) => setOfficeAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* Section 3: Contact Channels & Business Hours */}
        <div className="p-6 rounded-3xl bg-[#06152F] border border-[#0B2F6B] space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#0B2F6B]/60">
            <Phone className="w-5 h-5 text-[#D4AF37]" />
            <span className="font-bold text-sm text-white uppercase tracking-wider">
              Official Communication Channels & EAT Schedule
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Official Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Primary Phone (Telesom)
              </label>
              <input
                type="text"
                value={phonePrimary}
                onChange={(e) => setPhonePrimary(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Secondary Phone (Dahabshiil)
              </label>
              <input
                type="text"
                value={phoneSecondary}
                onChange={(e) => setPhoneSecondary(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                WhatsApp Channel Number
              </label>
              <input
                type="text"
                value={whatsApp}
                onChange={(e) => setWhatsApp(e.target.value)}
                placeholder="+252634400000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-[#D4AF37] font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Saturday – Wednesday Hours
              </label>
              <input
                type="text"
                value={businessHoursWeekdays}
                onChange={(e) => setBusinessHoursWeekdays(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Thursday Hours
              </label>
              <input
                type="text"
                value={businessHoursThursday}
                onChange={(e) => setBusinessHoursThursday(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-display font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#B38D1C] text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#D4AF37]/20"
          >
            <Save className="w-4 h-4" />
            <span>Save Studio Configurations</span>
          </button>
        </div>
      </form>
    </div>
  );
};
