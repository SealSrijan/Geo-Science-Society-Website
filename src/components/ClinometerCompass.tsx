import React, { useState, useEffect } from 'react';
import { Compass, ChevronUp, ChevronDown, Crosshair } from 'lucide-react';

interface ClinometerCompassProps {
  activeStrata?: string;
  onNavigateSection?: (sectionId: string) => void;
}

export const ClinometerCompass: React.FC<ClinometerCompassProps> = ({
  onNavigateSection,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [azimuth, setAzimuth] = useState(0);
  const [dipAngle, setDipAngle] = useState(0);
  const [strikeText, setStrikeText] = useState('N 00° E');
  const [currentStrataName, setCurrentStrataName] = useState('Strata 01: Surface Hero');

  const strataWaypoints = [
    { id: 'hero-strata', name: 'Strata 01: Surface & Welcome', angle: 0, dip: 0, strike: 'N 00° E', color: '#82AC38' },
    { id: 'activities-strata', name: 'Strata 02: Green Activities', angle: 45, dip: 22, strike: 'N 45° E · 22° SE', color: '#adcd60' },
    { id: 'youtube-strata', name: 'Strata 03: YouTube Broadcast', angle: 90, dip: 45, strike: 'N 90° E · 45° S', color: '#FF0000' },
    { id: 'mineral-strata', name: 'Strata 04: Mindat Mineral Gallery', angle: 135, dip: 60, strike: 'S 45° E · 60° SW', color: '#00D2C4' },
    { id: 'faq-strata', name: 'Strata 05: Frequently Asked Questions', angle: 180, dip: 78, strike: 'S 00° W · 78° W', color: '#2B4624' },
    { id: 'contact-strata', name: 'Strata 06: Field Dispatch Base', angle: 225, dip: 90, strike: 'S 45° W · 90° VERT', color: '#D97706' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

      // Azimuth rotates as you descend deeper into the Earth
      const calculatedAzimuth = Math.round(progress * 225);
      const calculatedDip = Math.round(progress * 90);
      setAzimuth(calculatedAzimuth);
      setDipAngle(calculatedDip);

      // Determine active strata
      if (progress < 0.16) {
        setStrikeText('N 00° E · 0° DIP');
        setCurrentStrataName('Strata 01: Surface & Welcome');
      } else if (progress < 0.35) {
        setStrikeText('N 45° E · 22° SE');
        setCurrentStrataName('Strata 02: Green Activities');
      } else if (progress < 0.52) {
        setStrikeText('N 90° E · 45° S');
        setCurrentStrataName('Strata 03: YouTube Broadcast');
      } else if (progress < 0.70) {
        setStrikeText('S 45° E · 60° SW');
        setCurrentStrataName('Strata 04: Mindat Mineral Gallery');
      } else if (progress < 0.88) {
        setStrikeText('S 00° W · 78° W');
        setCurrentStrataName('Strata 05: Frequently Asked Questions');
      } else {
        setStrikeText('S 45° W · 90° VERT');
        setCurrentStrataName('Strata 06: Dispatch Base');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const jumpToSection = (id: string) => {
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 select-none">
      {/* Expanded Brunton Clinometer HUD Modal / Drawer */}
      {isExpanded && (
        <div className="mb-3 w-72 sm:w-80 rounded-3xl p-4 bg-[#111A13]/95 border-2 border-[#82AC38]/40 shadow-2xl backdrop-blur-xl text-[#FAF8F5] animate-fade-in">
          {/* Clinometer Bezel Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/15">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#82AC38] animate-ping" />
              <div className="text-xs font-mono font-bold tracking-wider text-[#82AC38]">
                BRUNTON CLINOMETER
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Collapse Clinometer"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Geological Telemetry Display */}
          <div className="grid grid-cols-2 gap-2 my-3 text-center">
            <div className="p-2 rounded-xl bg-black/40 border border-white/10">
              <div className="text-[10px] font-mono text-white/50">AZIMUTH / BEARING</div>
              <div className="text-sm font-mono font-bold text-[#3898D8]">{azimuth}°</div>
              <div className="text-[10px] font-mono text-white/70 truncate">{strikeText}</div>
            </div>
            <div className="p-2 rounded-xl bg-black/40 border border-white/10">
              <div className="text-[10px] font-mono text-white/50">STRATA DIP ANGLE</div>
              <div className="text-sm font-mono font-bold text-[#82AC38]">{dipAngle}°</div>
              <div className="text-[10px] font-mono text-white/70">{dipAngle > 80 ? 'SUB-VERTICAL' : dipAngle > 45 ? 'MODERATE DIP' : 'GENTLE DIP'}</div>
            </div>
          </div>

          {/* Interactive Strata Waypoint Jumper */}
          <div className="space-y-1.5 mt-2">
            <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1">
              Field Waypoints (Click to Navigate)
            </div>
            {strataWaypoints.map((wp) => (
              <button
                key={wp.id}
                onClick={() => jumpToSection(wp.id)}
                className="w-full px-2.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-[#82AC38]/20 border border-white/10 hover:border-[#82AC38]/50 flex items-center justify-between text-left text-xs transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: wp.color }}
                  />
                  <span className="font-space text-white/90 group-hover:text-white truncate">
                    {wp.name}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-white/40 group-hover:text-[#82AC38]">
                  {wp.dip}° DIP
                </span>
              </button>
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-white/10 text-[10px] font-mono text-white/40 text-center flex items-center justify-center gap-1.5">
            <Crosshair className="w-3 h-3 text-[#82AC38]" />
            <span>Interactive Geological Field Compass</span>
          </div>
        </div>
      )}

      {/* Floating Clinometer Trigger Badge */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group relative flex items-center gap-3 px-3.5 py-2.5 rounded-full bg-[#18281B] hover:bg-[#203624] border-2 border-[#82AC38]/50 shadow-2xl text-white backdrop-blur-md transition-all transform hover:scale-105 cursor-pointer"
        title="Open Geological Clinometer Navigation"
      >
        {/* Animated Compass Dial with Rotating Needle */}
        <div className="relative w-8 h-8 rounded-full bg-[#0E1710] border border-[#82AC38] flex items-center justify-center overflow-hidden shadow-inner flex-shrink-0">
          {/* Compass Bezel Tick Ring */}
          <svg
            className="absolute inset-0 w-full h-full text-white/30"
            viewBox="0 0 40 40"
          >
            <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,3" />
            <text x="20" y="8" fill="#FF4444" fontSize="5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">N</text>
            <text x="34" y="22" fill="#82AC38" fontSize="5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">E</text>
            <text x="20" y="36" fill="#82AC38" fontSize="5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">S</text>
            <text x="6" y="22" fill="#82AC38" fontSize="5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">W</text>
          </svg>

          {/* Magnetic Needle Rotated by Scroll Bearing */}
          <div
            className="absolute w-1 h-6 transition-transform duration-300 ease-out flex flex-col items-center justify-between"
            style={{ transform: `rotate(${azimuth}deg)` }}
          >
            {/* North Red Arrow */}
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[8px] border-b-[#FF3B30]" />
            {/* Center Pivot Point */}
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm my-auto" />
            {/* South White Arrow */}
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[8px] border-t-white" />
          </div>

          {/* Clinometer Bubble Level representation */}
          <div
            className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-[#82AC38] border border-black/50"
            title="Clinometer Vial"
          />
        </div>

        {/* Monospace Telemetry Strip */}
        <div className="text-left font-mono">
          <div className="flex items-center gap-1.5 text-[10px] text-[#82AC38] font-bold">
            <Compass className="w-3 h-3" />
            <span>CLINOMETER</span>
            <span className="text-white/60">·</span>
            <span className="text-[#3898D8]">{dipAngle}° DIP</span>
          </div>
          <div className="text-xs text-white/90 font-medium truncate max-w-[140px] sm:max-w-[170px]">
            {currentStrataName}
          </div>
        </div>

        {/* Up/Down Expand Chevron */}
        <div className="pl-1 text-white/50 group-hover:text-white">
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>
      </button>
    </div>
  );
};
