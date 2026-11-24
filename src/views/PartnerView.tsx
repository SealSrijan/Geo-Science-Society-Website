import React, { useState } from 'react';
import { SPONSOR_TIERS } from '../data/gssData';
import { StrataDivider } from '../components/StrataDivider';
import {
  Handshake,
  CheckCircle2,
  Mic,
  Building2,
  Send,
} from 'lucide-react';

export const PartnerView: React.FC = () => {
  const [sponsorCompany, setSponsorCompany] = useState('');
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorEmail, setSponsorEmail] = useState('');
  const [selectedTier, setSelectedTier] = useState('Platinum Bedrock');
  const [sponsorMessage, setSponsorMessage] = useState('');
  const [sponsorSubmitted, setSponsorSubmitted] = useState(false);

  const [speakerName, setSpeakerName] = useState('');
  const [speakerDesignation, setSpeakerDesignation] = useState('');
  const [speakerAffiliation, setSpeakerAffiliation] = useState('');
  const [speakerEmail, setSpeakerEmail] = useState('');
  const [talkTopic, setTalkTopic] = useState('');
  const [talkAbstract, setTalkAbstract] = useState('');
  const [speakerSubmitted, setSpeakerSubmitted] = useState(false);

  const handleSponsorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sponsorCompany || !sponsorEmail) return;
    setSponsorSubmitted(true);
    setTimeout(() => {
      setSponsorSubmitted(false);
      setSponsorCompany('');
      setSponsorName('');
      setSponsorEmail('');
      setSponsorMessage('');
    }, 6000);
  };

  const handleSpeakerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!speakerName || !speakerEmail || !talkTopic) return;
    setSpeakerSubmitted(true);
    setTimeout(() => {
      setSpeakerSubmitted(false);
      setSpeakerName('');
      setSpeakerDesignation('');
      setSpeakerAffiliation('');
      setSpeakerEmail('');
      setTalkTopic('');
      setTalkAbstract('');
    }, 6000);
  };

  return (
    <div className="relative pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3E7] border border-[#5B8A22]/30 text-[#3D6314] text-xs font-mono mb-3 font-semibold">
          <Handshake className="w-3.5 h-3.5" />
          <span>COLLABORATION & INDUSTRY SPONSORSHIPS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-space text-[#111E13] tracking-tight leading-tight">
          Partner with India’s Largest Geoscience Student Federation
        </h1>
        <p className="text-base sm:text-lg text-[#334437] mt-3 font-sans leading-relaxed">
          Connect your organization directly with ambitious undergraduate and postgraduate geologists, geophysicists, and exploration researchers across 100+ colleges.
        </p>
      </div>

      {/* Media Kit & Reach Metrics Strip */}
      <div className="glass-panel-elevated p-6 sm:p-8 rounded-3xl mb-16 border border-[#233A1F]/15">
        <div className="text-center mb-6">
          <span className="text-xs font-mono text-[#3D6314] font-bold uppercase tracking-wider">
            2026 AUDIENCE & OUTREACH METRICS
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-space text-[#111E13] mt-1">
            Unrivalled Reach Across Indian Geology Departments
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-[#233A1F]/10 text-center shadow-xs">
            <div className="text-3xl sm:text-4xl font-extrabold font-space text-[#3D6314]">
              100+
            </div>
            <div className="text-xs font-mono text-[#526556] mt-1 font-medium">
              Affiliated College Chapters
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#233A1F]/10 text-center shadow-xs">
            <div className="text-3xl sm:text-4xl font-extrabold font-space text-[#1D6FB8]">
              1,500+
            </div>
            <div className="text-xs font-mono text-[#526556] mt-1 font-medium">
              Active Student Members
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#233A1F]/10 text-center shadow-xs">
            <div className="text-3xl sm:text-4xl font-extrabold font-space text-[#3D6314]">
              180K+
            </div>
            <div className="text-xs font-mono text-[#526556] mt-1 font-medium">
              Talk Show Broadcast Views
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#233A1F]/10 text-center shadow-xs">
            <div className="text-3xl sm:text-4xl font-extrabold font-space text-[#111E13]">
              19
            </div>
            <div className="text-xs font-mono text-[#526556] mt-1 font-medium">
              Active States & UTs
            </div>
          </div>
        </div>
      </div>

      <StrataDivider label="SPONSORSHIP PACKAGES" depth="TIERS" />

      {/* 3 Sponsor Tiers */}
      <div className="my-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono text-[#1D6FB8] font-bold uppercase tracking-wider">
            CORPORATE TIERS & DELIVERABLES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-space text-[#111E13] mt-1">
            Choose Your Partnership Tier
          </h2>
          <p className="text-sm text-[#405244] mt-1">
            Tailored packages for mining corporations, geophysical software suites, and academic societies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPONSOR_TIERS.map((tier) => (
            <div
              key={tier.tier}
              className={`glass-panel-elevated rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 transition-all ${
                selectedTier === tier.tier ? 'border-[#4E761C] shadow-xl' : 'border-[#233A1F]/15'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-mono px-3 py-1 rounded-full border font-bold ${tier.badgeColor}`}>
                    {tier.tier}
                  </span>
                </div>

                <div className="text-3xl font-extrabold font-space text-[#111E13] mb-4">
                  {tier.contribution}
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-[#334437] font-sans mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5B8A22] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedTier(tier.tier);
                  const el = document.getElementById('sponsor-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full py-3 rounded-xl font-space font-bold text-xs tracking-wide transition-all cursor-pointer ${
                  selectedTier === tier.tier
                    ? 'bg-[#5B8A22] text-white shadow-md'
                    : 'bg-white text-[#111E13] hover:bg-[#FAF8F5] border border-[#233A1F]/20'
                }`}
              >
                {selectedTier === tier.tier ? 'Selected Tier' : 'Select This Tier'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <StrataDivider label="ACTION PORTALS" depth="DISPATCH" />

      {/* Side-by-Side Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-16 items-start">
        {/* FORM 1: SPONSOR GSS */}
        <div id="sponsor-form" className="glass-panel-elevated p-6 sm:p-8 rounded-3xl">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-5 h-5 text-[#5B8A22]" />
            <h3 className="text-xl sm:text-2xl font-bold font-space text-[#111E13]">
              Sponsor GSS & Conclaves
            </h3>
          </div>
          <p className="text-xs text-[#405244] mb-6 font-sans">
            Support undergraduate research, thin-section digitization, and student travel grants.
          </p>

          {sponsorSubmitted ? (
            <div className="py-12 text-center space-y-4 animate-fade-in">
              <CheckCircle2 className="w-12 h-12 text-[#5B8A22] mx-auto" />
              <h4 className="text-xl font-bold font-space text-[#111E13]">
                Partnership Proposal Logged!
              </h4>
              <p className="text-xs sm:text-sm text-[#334437] font-sans max-w-sm mx-auto">
                Thank you, <strong className="text-[#3D6314]">{sponsorName}</strong>. Our Industry Relations Convener (Rohan Kulkarni) will send you the custom memorandum of understanding for <strong className="text-[#1D6FB8]">{selectedTier}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSponsorSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1">
                  COMPANY / ENTITY NAME *
                </label>
                <input
                  type="text"
                  required
                  value={sponsorCompany}
                  onChange={(e) => setSponsorCompany(e.target.value)}
                  placeholder="e.g. SLB Digital Earth / Geological Society of India"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#233A1F]/20 text-sm text-[#111E13] focus:border-[#4E761C] focus:outline-none shadow-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1">
                    POINT OF CONTACT NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={sponsorName}
                    onChange={(e) => setSponsorName(e.target.value)}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#233A1F]/20 text-sm text-[#111E13] focus:border-[#4E761C] focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1">
                    OFFICIAL WORK EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={sponsorEmail}
                    onChange={(e) => setSponsorEmail(e.target.value)}
                    placeholder="e.g. vikram@slb.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#233A1F]/20 text-sm text-[#111E13] focus:border-[#4E761C] focus:outline-none shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1">
                  PREFERRED SPONSORSHIP TIER
                </label>
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#233A1F]/20 text-sm text-[#111E13] focus:border-[#4E761C] focus:outline-none cursor-pointer shadow-xs"
                >
                  <option value="Platinum Bedrock">Platinum Bedrock (₹1,50,000+)</option>
                  <option value="Gold Stratum">Gold Stratum (₹75,000)</option>
                  <option value="Silver Outcrop">Silver Outcrop (₹30,000)</option>
                  <option value="Custom In-Kind">Custom Software Licenses / Equipment Grant</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1">
                  COLLABORATION GOALS / MESSAGE
                </label>
                <textarea
                  rows={3}
                  value={sponsorMessage}
                  onChange={(e) => setSponsorMessage(e.target.value)}
                  placeholder="Tell us about your campus recruitment, tech demo, or grant objectives..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#233A1F]/20 text-sm text-[#111E13] focus:border-[#4E761C] focus:outline-none font-sans shadow-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#5B8A22] hover:bg-[#4E761C] text-white font-bold font-space text-sm shadow-md hover:shadow-xl cursor-pointer transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>SUBMIT SPONSORSHIP INQUIRY</span>
              </button>
            </form>
          )}
        </div>

        {/* FORM 2: SPEAK FOR GSS */}
        <div className="glass-panel-elevated p-6 sm:p-8 rounded-3xl">
          <div className="flex items-center gap-2 mb-2">
            <Mic className="w-5 h-5 text-[#1D6FB8]" />
            <h3 className="text-xl sm:text-2xl font-bold font-space text-[#111E13]">
              Speak for GSS / Propose Talk
            </h3>
          </div>
          <p className="text-xs text-[#405244] mb-6 font-sans">
            Deliver a distinguished talk or hands-on workshop for young Indian earth science researchers.
          </p>

          {speakerSubmitted ? (
            <div className="py-12 text-center space-y-4 animate-fade-in">
              <CheckCircle2 className="w-12 h-12 text-[#1D6FB8] mx-auto" />
              <h4 className="text-xl font-bold font-space text-[#111E13]">
                Talk Topic Proposed!
              </h4>
              <p className="text-xs sm:text-sm text-[#334437] font-sans max-w-sm mx-auto">
                Thank you, <strong className="text-[#1D6FB8]">{speakerName}</strong>. Our Academic Secretary (Priyanshu Tripathi) will review your proposed topic <strong className="text-[#3D6314]">"{talkTopic}"</strong> and coordinate the broadcast schedule.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSpeakerSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1">
                    SPEAKER FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={speakerName}
                    onChange={(e) => setSpeakerName(e.target.value)}
                    placeholder="e.g. Dr. Meenakshi Ramanathan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#233A1F]/20 text-sm text-[#111E13] focus:border-[#1D6FB8] focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1">
                    OFFICIAL EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={speakerEmail}
                    onChange={(e) => setSpeakerEmail(e.target.value)}
                    placeholder="e.g. meenakshi@wadia.gov.in"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#233A1F]/20 text-sm text-[#111E13] focus:border-[#1D6FB8] focus:outline-none shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1">
                    TITLE / DESIGNATION *
                  </label>
                  <input
                    type="text"
                    required
                    value={speakerDesignation}
                    onChange={(e) => setSpeakerDesignation(e.target.value)}
                    placeholder="e.g. Associate Professor / Principal Scientist"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#233A1F]/20 text-sm text-[#111E13] focus:border-[#1D6FB8] focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1">
                    INSTITUTION / AFFILIATION *
                  </label>
                  <input
                    type="text"
                    required
                    value={speakerAffiliation}
                    onChange={(e) => setSpeakerAffiliation(e.target.value)}
                    placeholder="e.g. NGRI Hyderabad / Wadia Institute"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#233A1F]/20 text-sm text-[#111E13] focus:border-[#1D6FB8] focus:outline-none shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1">
                  PROPOSED TALK TITLE / TOPIC *
                </label>
                <input
                  type="text"
                  required
                  value={talkTopic}
                  onChange={(e) => setTalkTopic(e.target.value)}
                  placeholder="e.g. Subduction Dynamics & Isotope Geochemistry of the Andaman Arc"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#233A1F]/20 text-sm text-[#111E13] focus:border-[#1D6FB8] focus:outline-none shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1">
                  BRIEF ABSTRACT / KEY STUDENT TAKEAWAYS
                </label>
                <textarea
                  rows={3}
                  value={talkAbstract}
                  onChange={(e) => setTalkAbstract(e.target.value)}
                  placeholder="Provide a 3-4 sentence summary of your lecture and suggested student prerequisites..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#233A1F]/20 text-sm text-[#111E13] focus:border-[#1D6FB8] focus:outline-none font-sans shadow-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#1D6FB8] hover:bg-[#165a96] text-white font-bold font-space text-sm shadow-md hover:shadow-xl cursor-pointer transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <Mic className="w-4 h-4" />
                <span>SUBMIT LECTURE PROPOSAL</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
