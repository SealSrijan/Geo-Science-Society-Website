import React, { useEffect, useState, useCallback } from 'react';
import { Compass, ArrowUp } from 'lucide-react';

interface TelemetryProps {
  currentView?: string;
}

export const FieldTelemetryHud: React.FC<TelemetryProps> = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [coords, setCoords] = useState<{
    lat: number;
    lon: number;
  }>({
    lat: 22.5735,
    lon: 88.3639,
  });

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

  // Attempt initial device location on mount and listen to updates
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

  // Scroll listener for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const latDirection = coords.lat >= 0 ? 'N' : 'S';
  const lonDirection = coords.lon >= 0 ? 'E' : 'W';
  const formattedLat = Math.abs(coords.lat).toFixed(4);
  const formattedLon = Math.abs(coords.lon).toFixed(4);

  return (
    <aside
      aria-label="Field Telemetry HUD"
      className="fixed bottom-6 right-4 z-40 flex items-center gap-2 select-none"
    >
      <div
        onClick={requestDeviceLocation}
        title="Click to refresh device location"
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/95 backdrop-blur-xl border border-[#233A1F]/15 hover:border-[#1D6FB8]/50 shadow-xl text-[11px] font-mono text-[#141E15] transition-all cursor-pointer"
      >
        <Compass className="w-3.5 h-3.5 text-[#1D6FB8] flex-shrink-0" />

        {/* Real Device Coordinates */}
        <span className="text-[#1D6FB8] font-bold tracking-tight whitespace-nowrap">
          LAT {formattedLat}° {latDirection} · LON {formattedLon}° {lonDirection}
        </span>
      </div>

      {/* Back-to-Top Button */}
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
