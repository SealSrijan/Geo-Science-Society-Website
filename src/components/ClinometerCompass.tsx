import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Compass, ChevronUp, ChevronDown, ArrowUp, X } from 'lucide-react';

interface ClinometerCompassProps {
  activeStrata?: string;
  onNavigateSection?: (sectionId: string) => void;
}

export const ClinometerCompass: React.FC<ClinometerCompassProps> = ({
  onNavigateSection,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [azimuth, setAzimuth] = useState(0);
  const [dipAngle, setDipAngle] = useState(0);
  const [currentStrataName, setCurrentStrataName] = useState('Strata 01: Surface Hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Real device coordinates
  const [coords, setCoords] = useState<{
    lat: number;
    lon: number;
  }>({
    lat: 22.4785,
    lon: 88.3387,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const strataWaypoints = [
    { id: 'hero-strata', name: 'Strata 01: Surface & Welcome', dip: 0, color: '#82AC38' },
    { id: 'activities-strata', name: 'Strata 02: Green Activities', dip: 22, color: '#adcd60' },
    { id: 'youtube-strata', name: 'Strata 03: YouTube Broadcast', dip: 45, color: '#FF0000' },
    { id: 'mineral-strata', name: 'Strata 04: Mindat Mineral Gallery', dip: 60, color: '#00D2C4' },
    { id: 'faq-strata', name: 'Strata 05: FAQs', dip: 78, color: '#2B4624' },
    { id: 'contact-strata', name: 'Strata 06: Field Dispatch Base', dip: 90, color: '#D97706' },
  ];

  // Request actual device location
  const requestDeviceLocation = useCallback(() => {
    if (!('geolocation' in navigator)) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: parseFloat(position.coords.latitude.toFixed(4)),
          lon: parseFloat(position.coords.longitude.toFixed(4)),
        });
      },
      () => {},
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 15000,
      }
    );
  }, []);

  useEffect(() => {
    requestDeviceLocation();

    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCoords({
            lat: parseFloat(position.coords.latitude.toFixed(4)),
            lon: parseFloat(position.coords.longitude.toFixed(4)),
          });
        },
        () => {},
        { enableHighAccuracy: true, maximumAge: 30000 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [requestDeviceLocation]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
      setScrollProgress(progress * 100);

      // Azimuth rotates as you descend deeper into the Earth
      const calculatedAzimuth = Math.round(progress * 225);
      const calculatedDip = Math.round(progress * 90);
      setAzimuth(calculatedAzimuth);
      setDipAngle(calculatedDip);

      // Determine active strata
      if (progress < 0.16) {
        setCurrentStrataName('Strata 01: Surface & Welcome');
      } else if (progress < 0.35) {
        setCurrentStrataName('Strata 02: Green Activities');
      } else if (progress < 0.52) {
        setCurrentStrataName('Strata 03: YouTube Broadcast');
      } else if (progress < 0.70) {
        setCurrentStrataName('Strata 04: Mindat Mineral Gallery');
      } else if (progress < 0.88) {
        setCurrentStrataName('Strata 05: FAQs');
      } else {
        setCurrentStrataName('Strata 06: Dispatch Base');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const jumpToSection = (id: string) => {
    setIsExpanded(false);
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const latDirection = coords.lat >= 0 ? 'N' : 'S';
  const lonDirection = coords.lon >= 0 ? 'E' : 'W';
  const formattedLat = Math.abs(coords.lat).toFixed(4);
  const formattedLon = Math.abs(coords.lon).toFixed(4);

  // Whether full options drawer or hover details should be visible
  const isOpen = isExpanded || isHovered;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-40 select-none flex flex-col items-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Expanded Clinometer Compass Dialog Box */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 rounded-3xl p-4 bg-[#111A13]/98 border-2 border-[#82AC38]/50 shadow-2xl backdrop-blur-2xl text-[#FAF8F5] animate-fade-in transition-all">
          {/* Clinometer Header: No green dot, Title is "Clinometer Compass" */}
          <div className="flex items-center justify-between pb-3 border-b border-white/15">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#82AC38]" />
              <div className="text-xs font-mono font-bold tracking-wider text-[#82AC38]">
                Clinometer Compass
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
                setIsHovered(false);
              }}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Close"
              aria-label="Close Clinometer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Telemetry Display: Lat & Long (Replaces Azimuth & Strata Dip Angle) */}
          <div className="grid grid-cols-2 gap-2.5 my-3 text-center">
            <div className="p-2.5 rounded-xl bg-black/50 border border-white/10">
              <div className="text-[10px] font-mono text-white/60 font-bold uppercase tracking-wider mb-0.5">
                Lat
              </div>
              <div className="text-sm sm:text-base font-mono font-bold text-[#3898D8]">
                {formattedLat}° {latDirection}
              </div>
              <div className="text-[9px] font-mono text-white/40 mt-0.5">Device Latitude</div>
            </div>

            <div className="p-2.5 rounded-xl bg-black/50 border border-white/10">
              <div className="text-[10px] font-mono text-white/60 font-bold uppercase tracking-wider mb-0.5">
                Long
              </div>
              <div className="text-sm sm:text-base font-mono font-bold text-[#82AC38]">
                {formattedLon}° {lonDirection}
              </div>
              <div className="text-[9px] font-mono text-white/40 mt-0.5">Device Longitude</div>
            </div>
          </div>

          {/* Interactive Strata Waypoint Jumper (Strata 05 is renamed to "Strata 05: FAQs") */}
          <div className="space-y-1.5 mt-2">
            <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1">
              Field Waypoints (Tap to Navigate)
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
        </div>
      )}

      {/* Floating Trigger Bar: Back-to-Top (if scrolled) + Clinometer Compass */}
      <div className="flex items-center gap-2">
        {/* Back-to-Top Button */}
        {scrollProgress > 15 && (
          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            title="Back to Top"
            className="p-3 rounded-full bg-white/95 border border-[#233A1F]/20 text-[#141E15] hover:bg-[#5B8A22] hover:text-white transition-all transform hover:scale-105 shadow-xl cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Retractable Floating Clinometer Compass Dial with Increased Size */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group relative flex items-center rounded-full bg-[#18281B] hover:bg-[#203624] border-2 border-[#82AC38]/70 shadow-2xl text-white backdrop-blur-md transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden p-1 sm:p-1.5"
          title="Clinometer Compass (Hover or tap to open)"
          aria-label="Clinometer Compass"
        >
          {/* Animated Compass Dial with Increased Size (w-12 h-12 to w-14 h-14) */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0E1710] border-2 border-[#82AC38] flex items-center justify-center overflow-hidden shadow-inner flex-shrink-0">
            {/* Compass Bezel Tick Ring */}
            <svg
              className="absolute inset-0 w-full h-full text-white/35"
              viewBox="0 0 50 50"
            >
              <circle cx="25" cy="25" r="23" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,3" />
              <text x="25" y="10" fill="#FF4444" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">N</text>
              <text x="42" y="27" fill="#82AC38" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">E</text>
              <text x="25" y="44" fill="#82AC38" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">S</text>
              <text x="8" y="27" fill="#82AC38" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">W</text>
            </svg>

            {/* Magnetic Needle Rotated by Scroll Bearing */}
            <div
              className="absolute w-1.5 h-8 sm:h-9 transition-transform duration-300 ease-out flex flex-col items-center justify-between"
              style={{ transform: `rotate(${azimuth}deg)` }}
            >
              {/* North Red Arrow */}
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[11px] border-b-[#FF3B30]" />
              {/* Center Pivot Point */}
              <div className="w-2 h-2 rounded-full bg-white shadow-sm my-auto" />
              {/* South White Arrow */}
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[11px] border-t-white" />
            </div>

            {/* Clinometer Bubble Level representation */}
            <div
              className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-[#82AC38] border border-black/60 shadow-xs"
              title="Clinometer Vial"
            />
          </div>

          {/* Retractable Text Strip: Keeps the Dip Angle & Strata Name in the small part of the compass */}
          <div
            className={`overflow-hidden transition-all duration-300 flex items-center ${
              isOpen ? 'max-w-[260px] px-3 opacity-100' : 'max-w-0 px-0 opacity-0'
            }`}
          >
            <div className="text-left font-mono whitespace-nowrap pr-1.5">
              <div className="flex items-center gap-1.5 text-[10px] text-[#82AC38] font-bold">
                <Compass className="w-3.5 h-3.5" />
                <span>CLINOMETER</span>
                <span className="text-white/60">·</span>
                <span className="text-[#3898D8] font-extrabold">{dipAngle}° DIP</span>
              </div>
              <div className="text-xs text-white/90 font-medium truncate max-w-[155px]">
                {currentStrataName}
              </div>
            </div>

            <div className="pl-1 text-white/60 group-hover:text-white">
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
