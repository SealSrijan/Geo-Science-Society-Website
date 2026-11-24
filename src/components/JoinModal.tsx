import React, { useState } from 'react';
import { X, CheckCircle2, Copy, Sparkles, Shield, User, Mail, School } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COLLEGE_CHAPTERS } from '../data/gssData';
import { WhatsappIcon, TelegramIcon, GSS_SOCIAL_LINKS } from './SocialIcons';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState(COLLEGE_CHAPTERS[0].name);
  const [customCollege, setCustomCollege] = useState('');
  const [degree, setDegree] = useState('B.Sc Geology (Hons.)');
  const [yearOfStudy, setYearOfStudy] = useState('2nd Year');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Structural Geology',
    'Optical Mineralogy & Petrology',
  ]);
  const [role, setRole] = useState('General Member');
  const [membershipId, setMembershipId] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    // Generate authentic GSS member ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const code = `GSS-2026-IN-${randomNum}`;
    setMembershipId(code);
    setStep('success');

    // Launch celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#82AC38', '#3898D8', '#F2EFE6', '#2B4624'],
    });
  };

  const copyId = () => {
    navigator.clipboard.writeText(membershipId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setStep('form');
    setFullName('');
    setEmail('');
    onClose();
  };

  const availableInterests = [
    'Structural Geology',
    'Optical Mineralogy & Petrology',
    'Sedimentology & Basin Analysis',
    'Exploration Geophysics',
    'Remote Sensing & GIS',
    'Economic Geology & Critical Minerals',
    'Micropalaeontology',
    'Hydrogeology & Environmental Earth Science',
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Join Geo-Science Society"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl my-8 bg-white/95 border border-[#2B4624]/20 rounded-3xl shadow-2xl glass-panel-elevated overflow-hidden text-[#111E13]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Gradient Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#2B4624] via-[#82AC38] to-[#3898D8]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full bg-[#111E13]/5 hover:bg-[#82AC38]/20 border border-[#2B4624]/15 text-[#111E13]/70 hover:text-[#111E13] transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#82AC38]/15 border border-[#82AC38]/30 text-[#44631B] text-xs font-mono mb-2 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#82AC38]" />
                <span>OFFICIAL STUDENT REGISTRATION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-space text-[#111E13] tracking-tight">
                Join the Geo-Science Society
              </h2>
              <p className="text-sm text-[#334437] mt-1 font-sans">
                Unite with 1,500+ Earth science scholars across 100+ Indian university departments. Free membership for life.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#111E13] font-bold mb-1.5">
                    FULL NAME *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-[#334437]/60" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sagnik Bhattacharya"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F4F1EA] border border-[#2B4624]/20 text-sm text-[#111E13] placeholder-[#334437]/50 focus:border-[#82AC38] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#111E13] font-bold mb-1.5">
                    STUDENT EMAIL *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-[#334437]/60" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. sagnik@presiuniv.ac.in"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F4F1EA] border border-[#2B4624]/20 text-sm text-[#111E13] placeholder-[#334437]/50 focus:border-[#82AC38] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* College Selector */}
              <div>
                <label className="block text-xs font-mono text-[#111E13] font-bold mb-1.5">
                  UNIVERSITY / COLLEGE CHAPTER *
                </label>
                <div className="relative">
                  <School className="absolute left-3 top-3 w-4 h-4 text-[#334437]/60" />
                  <select
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-[#F4F1EA] border border-[#2B4624]/20 text-sm text-[#111E13] focus:border-[#82AC38] focus:bg-white focus:outline-none appearance-none cursor-pointer"
                  >
                    {COLLEGE_CHAPTERS.map((col) => (
                      <option key={col.id} value={col.name}>
                        {col.name} ({col.city}, {col.state})
                      </option>
                    ))}
                    <option value="Other">Other (Type your university below)</option>
                  </select>
                </div>
                {college === 'Other' && (
                  <input
                    type="text"
                    required
                    value={customCollege}
                    onChange={(e) => setCustomCollege(e.target.value)}
                    placeholder="Enter your college or university name"
                    className="mt-2 w-full px-3 py-2 rounded-xl bg-[#F4F1EA] border border-[#2B4624]/20 text-sm text-[#111E13] focus:border-[#82AC38] focus:bg-white focus:outline-none"
                  />
                )}
              </div>

              {/* Program & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#111E13] font-bold mb-1.5">
                    DEGREE PROGRAM
                  </label>
                  <select
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F4F1EA] border border-[#2B4624]/20 text-sm text-[#111E13] focus:border-[#82AC38] focus:bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="B.Sc Geology (Hons.)">B.Sc Geology (Hons.)</option>
                    <option value="M.Sc Applied Geology">M.Sc Applied Geology</option>
                    <option value="Integrated M.Sc / BS-MS">Integrated M.Sc / BS-MS</option>
                    <option value="B.Tech Mining / Earth Engineering">B.Tech Mining / Geophysics</option>
                    <option value="Ph.D / Research Scholar">Ph.D / Research Scholar</option>
                    <option value="Alum / Industry Geologist">Alum / Industry Geologist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#111E13] font-bold mb-1.5">
                    YEAR OF STUDY
                  </label>
                  <select
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F4F1EA] border border-[#2B4624]/20 text-sm text-[#111E13] focus:border-[#82AC38] focus:bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year / Final">4th Year / Final</option>
                    <option value="Postgraduate 1st Year">Postgraduate 1st Year</option>
                    <option value="Postgraduate 2nd Year">Postgraduate 2nd Year</option>
                    <option value="Doctoral Scholar">Doctoral Scholar</option>
                  </select>
                </div>
              </div>

              {/* Geological Interests Checkboxes */}
              <div>
                <label className="block text-xs font-mono text-[#111E13] font-bold mb-2">
                  GEOLOGICAL INTERESTS (SELECT ALL THAT APPLY)
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                  {availableInterests.map((interest) => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <button
                        type="button"
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#2B4624] border-[#2B4624] text-[#FAF8F5] font-semibold shadow-sm'
                            : 'bg-[#F4F1EA] border-[#2B4624]/20 text-[#334437] hover:text-[#111E13] hover:border-[#2B4624]/40'
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Society Role Selection */}
              <div>
                <label className="block text-xs font-mono text-[#111E13] font-bold mb-1.5">
                  I WOULD LIKE TO CONTRIBUTE AS:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {['General Member', 'Campus Ambassador', 'Field Volunteer', 'Event Organizer'].map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setRole(r)}
                      className={`py-2 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                        role === r
                          ? 'bg-[#2B4624] border-[#2B4624] text-white font-bold shadow-sm'
                          : 'bg-[#F4F1EA] border-[#2B4624]/15 text-[#334437] hover:border-[#2B4624]/30'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#2B4624] hover:bg-[#1E3319] text-[#FAF8F5] font-bold text-sm tracking-wide font-space flex items-center justify-center gap-2 shadow-xl hover:shadow-[#2B4624]/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4 text-[#82AC38]" />
                  <span>CLAIM FREE GSS MEMBERSHIP CARD</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-[#334437] flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#2B4624]" />
                <span>Zero fees · Verified pan-India student network · No spam guarantee</span>
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen & Digital Membership Card */
          <div className="p-6 sm:p-8 text-center animate-fade-in">
            <div className="inline-flex p-3 rounded-full bg-[#82AC38]/20 text-[#2B4624] mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-space text-[#111E13] mb-1">
              Welcome to the Society!
            </h2>
            <p className="text-sm text-[#334437] max-w-md mx-auto mb-6">
              You are now an officially registered member of the Geo-Science Society. Your digital credentials have been minted.
            </p>

            {/* Glassmorphic Digital Membership Card */}
            <div className="max-w-md mx-auto rounded-2xl p-5 bg-gradient-to-br from-[#1E3319] via-[#2B4624] to-[#141F15] border-2 border-[#82AC38]/50 shadow-2xl relative overflow-hidden text-left mb-6 text-white">
              <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-[#3898D8]/20 blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/images/gss-logo.jpg"
                    alt="GSS Logo"
                    className="w-10 h-10 rounded-full border border-[#82AC38]"
                  />
                  <div>
                    <div className="text-xs font-mono text-[#82AC38] font-bold tracking-wider">
                      GEO-SCIENCE SOCIETY
                    </div>
                    <div className="text-[10px] text-white/70">PAN-INDIA STUDENT FEDERATION</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#82AC38]/30 text-[#82AC38] border border-[#82AC38]/50 font-bold">
                    ACTIVE
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-[10px] font-mono text-white/60">MEMBER NAME</div>
                  <div className="text-lg font-bold font-space text-white">{fullName}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[10px] font-mono text-white/60">CHAPTER / COLLEGE</div>
                    <div className="text-white/95 font-medium truncate">
                      {college === 'Other' ? customCollege : college}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-white/60">PROGRAM</div>
                    <div className="text-white/95 font-medium truncate">{degree}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/15">
                  <div>
                    <div className="text-[10px] font-mono text-white/60">MEMBER ID</div>
                    <div className="font-mono text-xs font-bold text-[#82AC38] tracking-wider">
                      {membershipId}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-white/60">ROLE</div>
                    <div className="text-xs font-mono text-[#82AC38] font-semibold">{role}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Connect to Official Communities */}
            <div className="max-w-md mx-auto mb-6 p-3 rounded-2xl bg-[#F4F1EA] border border-[#2B4624]/15 text-left">
              <div className="text-[11px] font-mono text-[#2B4624] font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>CONNECT WITH CHAPTER STUDENTS:</span>
                <span className="text-[#82AC38]">100% FREE</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={GSS_SOCIAL_LINKS.whatsappCommunity}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-[#0A2612] text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <WhatsappIcon className="w-4 h-4 fill-current" />
                  <span>WhatsApp Community</span>
                </a>
                <a
                  href={GSS_SOCIAL_LINKS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-[#0088CC] hover:bg-[#0077B5] text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <TelegramIcon className="w-4 h-4 fill-current" />
                  <span>Telegram Channel</span>
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <button
                onClick={copyId}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#F4F1EA] hover:bg-[#EAE5DA] border border-[#2B4624]/20 text-[#111E13] text-xs font-mono font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-[#2B4624]" />
                <span>{copied ? 'COPIED TO CLIPBOARD!' : 'COPY MEMBER ID'}</span>
              </button>

              <button
                onClick={handleReset}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#2B4624] hover:bg-[#1E3319] text-[#FAF8F5] text-xs font-space font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#82AC38]" />
                <span>DONE / RETURN TO SITE</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
