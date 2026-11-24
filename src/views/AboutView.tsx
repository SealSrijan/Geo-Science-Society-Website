import React from 'react';
import { LEADERSHIP } from '../data/gssData';
import { GssEmblem } from '../components/GssEmblem';
import { StrataDivider } from '../components/StrataDivider';
import { LinkedinIcon } from '../components/SocialIcons';
import {
  Compass,
  Shield,
  Layers,
  Users,
  Award,
  Globe2,
  Sparkles,
} from 'lucide-react';

interface AboutViewProps {
  onOpenJoin: () => void;
  onNavigate: (view: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenJoin, onNavigate }) => {
  return (
    <div className="relative pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3E7] border border-[#5B8A22]/30 text-[#3D6314] text-xs font-mono mb-3 font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>ORIGINS & VISION</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-space text-[#111E13] tracking-tight leading-tight">
          Uniting India’s Next Generation of Earth Scientists
        </h1>
        <p className="text-base sm:text-lg text-[#334437] mt-3 font-sans leading-relaxed">
          Founded in 2021 by undergraduate geologists, Geo-Science Society has grown into India’s premier student federation connecting over 100 university departments.
        </p>
      </div>

      {/* Story & Genesis Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
        <div className="lg:col-span-5 flex justify-center">
          <GssEmblem size="lg" showPhotoToggle={true} />
        </div>

        <div className="lg:col-span-7 glass-panel-elevated p-6 sm:p-8 rounded-3xl space-y-4">
          <span className="text-xs font-mono text-[#3D6314] font-bold uppercase tracking-wider">
            CHAPTER ONE: THE GENESIS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-space text-[#111E13]">
            Why We Founded GSS
          </h2>
          <p className="text-sm sm:text-base text-[#334437] font-sans leading-relaxed">
            For generations, student geology chapters in India operated in silos. A student analyzing Archean greenstone belts at Presidency University had virtually no pipeline to share sample data, petrographic slides, or field observations with peers at IIT Bombay, Banaras Hindu University, or Gauhati University.
          </p>
          <p className="text-sm sm:text-base text-[#334437] font-sans leading-relaxed">
            In Autumn 2021, representatives from five pioneering departments came together to establish the <strong>Geo-Science Society</strong>. Our charter was simple: eliminate all financial barriers to scientific learning, foster inter-collegiate fieldwork expeditions, and give every young Indian geologist an open national stage.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onOpenJoin}
              className="px-5 py-2.5 rounded-xl bg-[#5B8A22] hover:bg-[#4E761C] text-white font-bold font-space text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Join as Student Member</span>
            </button>
            <button
              onClick={() => onNavigate('community')}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#233A1F]/20 text-[#141E15] text-xs font-mono font-medium transition-colors shadow-xs"
            >
              Explore 100+ Chapters →
            </button>
          </div>
        </div>
      </div>

      <StrataDivider label="STRATIGRAPHIC PILLARS" depth="FOUNDATION" />

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-20">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#233A1F]/15 hover:border-[#5B8A22]/40 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF3E7] text-[#3D6314] flex items-center justify-center mb-5">
            <Globe2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-space text-[#111E13] mb-2">
            Democratized Knowledge
          </h3>
          <p className="text-xs sm:text-sm text-[#405244] leading-relaxed font-sans">
            Every webinar, thin-section micrograph, and competitive olympiad is offered 100% free of charge to any student regardless of their institution’s tier.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#233A1F]/15 hover:border-[#1D6FB8]/40 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-[#E7F2FA] text-[#1D6FB8] flex items-center justify-center mb-5">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-space text-[#111E13] mb-2">
            Fieldwork Heritage
          </h3>
          <p className="text-xs sm:text-sm text-[#405244] leading-relaxed font-sans">
            Geology cannot be mastered solely behind a computer monitor. We champion rigorous outcrop mapping, Brunton compass literacy, and micro-grants for field campaigns.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#233A1F]/15 hover:border-[#5B8A22]/40 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF3E7] text-[#3D6314] flex items-center justify-center mb-5">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-space text-[#111E13] mb-2">
            Pan-India Peer Guild
          </h3>
          <p className="text-xs sm:text-sm text-[#405244] leading-relaxed font-sans">
            Connecting students from Kashmir to Kanyakumari. Peer paper reviews, competitive exam strategy sessions, and mutual research collaborations.
          </p>
        </div>
      </div>

      <StrataDivider label="STEERING COMMITTEE" depth="LEADERSHIP" />

      {/* Leadership Section */}
      <div className="my-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3E7] border border-[#5B8A22]/30 text-[#3D6314] text-xs font-mono mb-2 font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>NATIONAL STEERING BOARD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-space text-[#111E13]">
            Core Leadership & Directorate
          </h2>
          <p className="text-sm text-[#405244] mt-1">
            Elected student representatives and researchers governing the pan-India society operations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEADERSHIP.map((leader) => (
            <div
              key={leader.id}
              className="glass-card-interactive rounded-3xl p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-5 bg-black">
                  <img
                    src={leader.avatar}
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/70 text-white border border-white/20">
                      {leader.tenure}
                    </span>
                    <span className="text-[10px] font-mono text-white/90">
                      {leader.location}
                    </span>
                  </div>
                </div>

                <div className="text-xs font-mono text-[#1D6FB8] font-bold mb-1">
                  {leader.role}
                </div>
                <h3 className="text-xl font-bold font-space text-[#111E13] group-hover:text-[#4E761C] transition-colors">
                  {leader.name}
                </h3>
                <div className="text-xs text-[#526556] font-mono mt-0.5 mb-3">
                  {leader.institution}
                </div>

                <p className="text-xs text-[#405244] font-sans leading-relaxed mb-4">
                  {leader.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-[#233A1F]/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#3D6314] font-semibold truncate">{leader.specialization}</span>
                {leader.social.linkedin && (
                  <a
                    href={leader.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#526556] hover:text-[#1D6FB8]"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <StrataDivider label="ETHICAL CHARTER" depth="BY-LAWS" />

      {/* Code of Conduct Card */}
      <div className="glass-panel-elevated p-8 rounded-3xl mt-16 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-[#5B8A22]" />
          <h3 className="text-2xl font-bold font-space text-[#111E13]">
            The Geological Field Code & Academic Ethics
          </h3>
        </div>
        <div className="space-y-3 text-xs sm:text-sm text-[#334437] leading-relaxed font-sans">
          <p>
            1. <strong>Outcrop Conservation:</strong> Sampling must always be minimal, purposeful, and conducted only where legally permitted. Delicate fossils and rare structural features should be documented via photography rather than destructive hammer extraction.
          </p>
          <p>
            2. <strong>Equitable Opportunity:</strong> GSS is dedicated to fostering a safe, harassment-free, and encouraging environment regardless of gender, regional origin, or economic background.
          </p>
          <p>
            3. <strong>Academic Honesty:</strong> All research presented at Geogenesis must be student-contributed with complete citation of previous geological literature and mentors.
          </p>
        </div>
      </div>
    </div>
  );
};
