import React, { useState } from 'react';
import { GssEmblem } from './GssEmblem';
import {
  YoutubeIcon,
  LinkedinIcon,
  InstagramIcon,
  WhatsappIcon,
  TelegramIcon,
  GSS_SOCIAL_LINKS,
} from './SocialIcons';
import { Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenJoin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenJoin }) => {
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'conduct' | null>(null);

  const handleNav = (view: string) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0B140C] border-t border-[#F2EFE6]/15 pt-16 pb-12 overflow-hidden z-20">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#82AC38]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#F2EFE6]/10">
          {/* Col 1 & 2: GSS Mission & Emblem */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <GssEmblem size="sm" />
              <div>
                <span className="font-space font-extrabold text-lg text-[#F2EFE6] tracking-wider">
                  GEO-SCIENCE SOCIETY
                </span>
                <p className="text-[10px] font-mono text-[#82AC38] tracking-widest uppercase">
                  Est. 2021 · Registered Student Federation
                </p>
              </div>
            </div>

            <p className="text-sm text-[#F2EFE6]/75 font-sans leading-relaxed max-w-sm">
              The national student-led society connecting 100+ geology, geophysics, and Earth science departments across India. Committed to democratized field sciences, open research access, and student mentorship.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href={GSS_SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="YouTube (@geo-sciencesociety)"
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-[#FF0000]/25 border border-[#F2EFE6]/15 text-[#F2EFE6]/80 hover:text-[#FF4444] transition-all transform hover:-translate-y-0.5"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href={GSS_SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram (@geoscience_society)"
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-[#E1306C]/25 border border-[#F2EFE6]/15 text-[#F2EFE6]/80 hover:text-[#FD1D1D] transition-all transform hover:-translate-y-0.5"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={GSS_SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn (Geo-Science Society)"
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-[#0A66C2]/25 border border-[#F2EFE6]/15 text-[#F2EFE6]/80 hover:text-[#3898D8] transition-all transform hover:-translate-y-0.5"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={GSS_SOCIAL_LINKS.whatsappCommunity}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Community"
                title="GSS Official WhatsApp Community"
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-[#25D366]/25 border border-[#F2EFE6]/15 text-[#F2EFE6]/80 hover:text-[#25D366] transition-all transform hover:-translate-y-0.5"
              >
                <WhatsappIcon className="w-4 h-4" />
              </a>
              <a
                href={GSS_SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                title="GSS Telegram Channel (@geosciencesociety)"
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-[#0088CC]/25 border border-[#F2EFE6]/15 text-[#F2EFE6]/80 hover:text-[#0088CC] transition-all transform hover:-translate-y-0.5"
              >
                <TelegramIcon className="w-4 h-4" />
              </a>
              <a
                href={GSS_SOCIAL_LINKS.whatsappChannel}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Channel"
                title="GSS WhatsApp News & Alerts Channel"
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-[#128C7E]/25 border border-[#F2EFE6]/15 text-[#F2EFE6]/80 hover:text-[#128C7E] transition-all transform hover:-translate-y-0.5"
              >
                <WhatsappIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs font-mono text-[#82AC38] tracking-widest uppercase mb-4 font-bold">
              PLATFORM
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F2EFE6]/75">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#82AC38] transition-colors cursor-pointer"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#82AC38] transition-colors cursor-pointer"
                >
                  About GSS & Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('community')}
                  className="hover:text-[#82AC38] transition-colors cursor-pointer"
                >
                  Pan-India Chapters (100+)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('events')}
                  className="hover:text-[#82AC38] transition-colors cursor-pointer"
                >
                  Geogenesis & Conclaves
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('learn')}
                  className="hover:text-[#82AC38] transition-colors cursor-pointer"
                >
                  Geo Gallery & Thin Sections
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('partner')}
                  className="hover:text-[#82AC38] transition-colors cursor-pointer"
                >
                  Sponsor & Speaker Portals
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources & Learning */}
          <div>
            <h4 className="text-xs font-mono text-[#3898D8] tracking-widest uppercase mb-4 font-bold">
              LEARNING WING
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F2EFE6]/75">
              <li>
                <button
                  onClick={() => handleNav('learn')}
                  className="hover:text-[#3898D8] transition-colors cursor-pointer"
                >
                  Petrographic Thin Sections
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('learn')}
                  className="hover:text-[#3898D8] transition-colors cursor-pointer"
                >
                  Field Methodology Notes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('events')}
                  className="hover:text-[#3898D8] transition-colors cursor-pointer"
                >
                  Talk Show Video Archive
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('learn')}
                  className="hover:text-[#3898D8] transition-colors cursor-pointer"
                >
                  UPSC Geoscientist Roadmap
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenJoin}
                  className="hover:text-[#3898D8] transition-colors cursor-pointer font-medium text-[#82AC38]"
                >
                  Apply for Chapter Lead
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Fieldwork Secretariat */}
          <div>
            <h4 className="text-xs font-mono text-[#F2EFE6]/80 tracking-widest uppercase mb-4 font-bold">
              SECRETARIAT
            </h4>
            <div className="space-y-3 text-xs font-mono text-[#F2EFE6]/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#82AC38] flex-shrink-0 mt-0.5" />
                <span>Dept. of Geology, Presidency University, College Street, Kolkata, WB 700073</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#3898D8] flex-shrink-0" />
                <a href="mailto:contact@geosciencesociety.org" className="hover:underline">
                  contact@geosciencesociety.org
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenJoin}
                  className="w-full py-2 px-3 rounded-xl bg-[#82AC38]/20 hover:bg-[#82AC38] text-[#82AC38] hover:text-[#141614] border border-[#82AC38]/40 font-space font-bold transition-all text-center block cursor-pointer"
                >
                  Claim Student ID Card
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#F2EFE6]/50">
          <div>
            © {new Date().getFullYear()} Geo-Science Society (GSS). All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-[#82AC38] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveLegalModal('conduct')}
              className="hover:text-[#82AC38] transition-colors cursor-pointer"
            >
              Code of Conduct
            </button>
            <span className="hidden md:inline text-[#82AC38]">
              LAT 22.57° N · LON 88.36° E
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Modal for Privacy Policy & Code of Conduct */}
      {activeLegalModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeLegalModal === 'privacy' ? 'Privacy Policy' : 'Code of Conduct'}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveLegalModal(null)}
        >
          <div
            className="w-full max-w-xl bg-[#111E13] border border-[#F2EFE6]/20 rounded-2xl p-6 glass-panel-elevated max-h-[75vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#F2EFE6]/15 pb-3 mb-4">
              <h3 className="text-xl font-bold font-space text-[#F2EFE6]">
                {activeLegalModal === 'privacy' ? 'GSS Privacy Policy' : 'Geological Code of Conduct'}
              </h3>
              <button
                onClick={() => setActiveLegalModal(null)}
                className="text-xs font-mono text-[#82AC38] hover:underline"
              >
                Close
              </button>
            </div>

            {activeLegalModal === 'privacy' ? (
              <div className="space-y-3 text-xs sm:text-sm text-[#F2EFE6]/80 leading-relaxed font-sans">
                <p>
                  <strong>1. Student Data Protection:</strong> The Geo-Science Society collects personal registration details solely for issuing digital membership credentials, organizing events, and distributing student grants. We do not sell student data to any third-party marketing entities.
                </p>
                <p>
                  <strong>2. Geo Gallery Intellectual Property:</strong> Contributors retain full moral and economic copyright over all uploaded micro-photographs, outcrop imagery, and field diagrams.
                </p>
                <p>
                  <strong>3. Communications:</strong> Members can unsubscribe from newsletter or webinar alerts at any time via a single click.
                </p>
              </div>
            ) : (
              <div className="space-y-3 text-xs sm:text-sm text-[#F2EFE6]/80 leading-relaxed font-sans">
                <p>
                  <strong>1. Geological Conservation:</strong> Do not deface key type-sections, delicate fossil beds, or national geo-monuments with hammer strikes. Take only photographs; leave only footprints.
                </p>
                <p>
                  <strong>2. Field Safety First:</strong> Always carry safety eyewear, helmet, adequate water, and first aid during field excursions. Respect local community customs and private property lines.
                </p>
                <p>
                  <strong>3. Academic Integrity:</strong> Plagiarism in Geogenesis abstract submissions or student paper competitions will result in immediate disqualification and notification of college chapter leads.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
