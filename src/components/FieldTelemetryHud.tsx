import React, { useEffect, useState } from 'react';
import { Compass, ArrowUp } from 'lucide-react';

interface TelemetryProps {
  currentView: string;
}

export const FieldTelemetryHud: React.FC<TelemetryProps> = ({ currentView }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [elevation, setElevation] = useState(420);
  const [activeStrata, setActiveStrata] = useState('01/06');
  const [latLon, setLatLon] = useState({ lat: 22.57, lon: 88.36 });

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(progress);

      const dynamicElev = Math.round(420 + (progress * 14.5));
      setElevation(dynamicElev);

      const strataIndex = Math.min(6, Math.max(1, Math.ceil((progress / 100) * 6)));
      setActiveStrata(`0${strataIndex}/06`);

      setLatLon({
        lat: parseFloat((22.57 + (progress * 0.04)).toFixed(2)),
        lon: parseFloat((88.36 + (progress * 0.03)).toFixed(2)),
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside
      aria-label="Field Telemetry HUD"
      className="fixed bottom-6 right-4 z-40 hidden sm:flex items-center gap-2 select-none"
    >
      <div className="flex items-center gap-3 px-3.5 py-2 rounded-full bg-white/92 backdrop-blur-xl border border-[#233A1F]/15 shadow-xl text-[11px] font-mono text-[#141E15] hover:border-[#5B8A22]/50 transition-colors">
        {/* Pulsing Signal Beacon */}
        <div className="flex items-center gap-1.5 text-[#4E761C]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5B8A22] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5B8A22]"></span>
          </span>
          <span className="text-[10px] tracking-wider uppercase font-bold text-[#4E761C]">GSS-NET</span>
        </div>

        <span className="text-[#233A1F]/20">|</span>

        {/* GPS Coordinates */}
        <div className="flex items-center gap-1 text-[#1D6FB8] font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>LAT {latLon.lat}° N · LON {latLon.lon}° E</span>
        </div>

        <span className="text-[#233A1F]/20 hidden lg:inline">|</span>

        {/* Elevation */}
        <div className="hidden lg:flex items-center gap-1 text-[#2D3E30]">
          <span className="text-[#4E761C] font-semibold">ELEV</span>
          <span>{elevation}m</span>
        </div>

        <span className="text-[#233A1F]/20">|</span>

        {/* Strata Depth */}
        <div className="flex items-center gap-1 font-bold text-[#141E15]">
          <span className="text-[#1D6FB8]">STRATA</span>
          <span>{activeStrata}</span>
        </div>

        <span className="text-[#233A1F]/20 hidden xl:inline">|</span>
        <span className="hidden xl:inline text-[#526556] uppercase tracking-widest text-[10px] font-semibold">
          {currentView}
        </span>
      </div>

      {scrollProgress > 15 && (
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="p-2 rounded-full bg-white border border-[#233A1F]/20 text-[#141E15] hover:bg-[#5B8A22] hover:text-white transition-all transform hover:scale-105 shadow-xl cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </aside>
  );
};
