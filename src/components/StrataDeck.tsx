import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Layers,
} from 'lucide-react';
import {
  YoutubeIcon,
  YoutubeLogoBadge,
  LinkedinIcon,
  InstagramIcon,
  WhatsappIcon,
  TelegramIcon,
  GSS_SOCIAL_LINKS,
} from './SocialIcons';
import {
  GSS_EVENTS,
  YOUTUBE_VIDEOS,
} from '../data/gssData';
import type { GssEvent, VideoShowcase } from '../data/gssData';
import { MindatGallery } from './MindatGallery';

interface StrataDeckProps {
  onOpenJoin: () => void;
  onOpenVideo: (video: VideoShowcase) => void;
  onRegisterEvent?: (event: GssEvent) => void;
  onActiveLayerChange?: (index: number) => void;
}

const STRATA_LAYERS = [
  {
    id: 'strata-02',
    anchorId: 'activities-strata',
    number: 'STRATA 02',
    name: 'Field Activities & Calendar',
    shortLabel: '02 · ACTIVITIES',
    depth: '-120m',
    dip: '22° SE',
    color: '#7b9e29',
    accentColor: '#adcd60',
    badgeText: 'Field Expeditions & Conclaves',
  },
  {
    id: 'strata-03',
    anchorId: 'youtube-strata',
    number: 'STRATA 03',
    name: 'YouTube Broadcast & Socials',
    shortLabel: '03 · YOUTUBE MEDIA',
    depth: '-260m',
    dip: '45° S',
    color: '#FF0000',
    accentColor: '#FF4444',
    badgeText: 'Live Broadcast Network',
  },
  {
    id: 'strata-04',
    anchorId: 'mineral-strata',
    number: 'STRATA 04',
    name: 'Mindat Mineral Gallery',
    shortLabel: '04 · MINDAT MINERALS',
    depth: '-420m',
    dip: '60° SW',
    color: '#00D2C4',
    accentColor: '#00E5D5',
    badgeText: 'Mindat.org Open Repository',
  },
];

const AUTO_SWIPE_DURATION_MS = 8000;
const TICK_INTERVAL_MS = 50;

export const StrataDeck: React.FC<StrataDeckProps> = ({
  onOpenJoin,
  onOpenVideo,
  onRegisterEvent,
  onActiveLayerChange,
}) => {
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Strata 02 category filter
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Swipe & Drag References
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const mouseStartXRef = useRef<number | null>(null);
  const isMouseDownRef = useRef<boolean>(false);
  const deckRef = useRef<HTMLDivElement>(null);

  // Filtered events for Strata 02
  const filteredEvents =
    selectedCategory === 'All'
      ? GSS_EVENTS
      : GSS_EVENTS.filter((e) => e.category === selectedCategory);

  const goToLayer = useCallback(
    (index: number) => {
      const targetIndex = (index + STRATA_LAYERS.length) % STRATA_LAYERS.length;
      setActiveLayer(targetIndex);
      setProgress(0);
      window.dispatchEvent(
        new CustomEvent('gss:strata-layer-changed', { detail: { layer: targetIndex } })
      );
      if (onActiveLayerChange) {
        onActiveLayerChange(targetIndex);
      }
    },
    [onActiveLayerChange]
  );

  const nextLayer = useCallback(() => {
    goToLayer(activeLayer + 1);
  }, [activeLayer, goToLayer]);

  const prevLayer = useCallback(() => {
    goToLayer(activeLayer - 1);
  }, [activeLayer, goToLayer]);

  // Auto-swipe interval logic
  useEffect(() => {
    if (isPaused || isHovered) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const increment = (TICK_INTERVAL_MS / AUTO_SWIPE_DURATION_MS) * 100;
        if (prev + increment >= 100) {
          goToLayer(activeLayer + 1);
          return 0;
        }
        return prev + increment;
      });
    }, TICK_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [activeLayer, isPaused, isHovered, goToLayer]);

  // Listen for external trigger from Clinometer Compass or links
  useEffect(() => {
    const handleSetLayer = (e: Event) => {
      const customEvent = e as CustomEvent<{ layer: number }>;
      if (customEvent.detail && typeof customEvent.detail.layer === 'number') {
        goToLayer(customEvent.detail.layer);
      }
    };

    window.addEventListener('gss:set-strata-layer', handleSetLayer);
    return () => window.removeEventListener('gss:set-strata-layer', handleSetLayer);
  }, [goToLayer]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const deltaX = endX - touchStartXRef.current;
    const deltaY = endY - touchStartYRef.current;

    // Only swipe if horizontal swipe is dominant and > 45px
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 45) {
      if (deltaX < 0) {
        // Swiped right-to-left -> Next stratum
        nextLayer();
      } else {
        // Swiped left-to-right -> Previous stratum
        prevLayer();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Mouse Drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    // Avoid dragging when clicking buttons, inputs, links
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('input')) return;

    mouseStartXRef.current = e.clientX;
    isMouseDownRef.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current || mouseStartXRef.current === null) return;
    const deltaX = e.clientX - mouseStartXRef.current;

    if (Math.abs(deltaX) > 60) {
      if (deltaX < 0) {
        nextLayer();
      } else {
        prevLayer();
      }
    }

    isMouseDownRef.current = false;
    mouseStartXRef.current = null;
  };

  const activeStratum = STRATA_LAYERS[activeLayer];

  return (
    <div
      ref={deckRef}
      id="strata-deck"
      className="relative w-full overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        isMouseDownRef.current = false;
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Anchor targets for Clinometer Compass jumps */}
      <div id="activities-strata" className="absolute -top-24 pointer-events-none" />
      <div id="youtube-strata" className="absolute -top-24 pointer-events-none" />
      <div id="mineral-strata" className="absolute -top-24 pointer-events-none" />

      {/* -------------------------------------------------------------
          TOP STRATA CONTROLLER & HUD TELEMETRY BAR
          Unified single-layer control center
      ------------------------------------------------------------- */}
      <div className="sticky top-16 sm:top-20 z-30 w-full bg-[#0E1510]/95 border-y border-white/15 backdrop-blur-xl py-3 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Left: 3 Strata Layer Selector Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <div className="hidden lg:flex items-center gap-1.5 pr-2 border-r border-white/15 text-white/50 text-[11px] font-mono font-bold">
              <Layers className="w-3.5 h-3.5 text-[#82AC38]" />
              <span>HORIZONS:</span>
            </div>

            {STRATA_LAYERS.map((stratum, idx) => {
              const isActive = activeLayer === idx;
              return (
                <button
                  key={stratum.id}
                  onClick={() => goToLayer(idx)}
                  className={`relative px-3 sm:px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer flex-shrink-0 ${
                    isActive
                      ? 'bg-white/15 text-white border shadow-lg scale-102 ring-1'
                      : 'bg-black/30 hover:bg-white/10 text-white/60 hover:text-white border-transparent'
                  }`}
                  style={{
                    borderColor: isActive ? stratum.color : 'transparent',
                    boxShadow: isActive ? `0 0 15px ${stratum.color}40` : undefined,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full transition-transform duration-300"
                    style={{
                      backgroundColor: stratum.color,
                      transform: isActive ? 'scale(1.3)' : 'scale(1)',
                    }}
                  />
                  <span>{stratum.shortLabel}</span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-sm font-mono font-medium"
                    style={{
                      backgroundColor: `${stratum.color}25`,
                      color: stratum.accentColor,
                    }}
                  >
                    {stratum.depth}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Auto-Swipe Telemetry, Progress Bar, Prev/Next & Pause Controls */}
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto pt-1 md:pt-0 border-t md:border-t-0 border-white/10">
            {/* Auto-Swipe Progress & Pause Indicator */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1 font-mono"
                title={isPaused ? 'Resume auto-swipe' : 'Pause auto-swipe'}
              >
                {isPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#adcd60]" />
                    <span className="hidden sm:inline text-[11px]">RESUME</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5 text-white/70" />
                    <span className="hidden sm:inline text-[11px] text-white/60">
                      {isHovered ? 'PAUSED (HOVER)' : 'AUTO-SWIPE'}
                    </span>
                  </>
                )}
              </button>

              {/* Progress Line */}
              <div className="w-20 sm:w-28 h-1.5 bg-white/15 rounded-full overflow-hidden relative">
                <div
                  className="h-full transition-all duration-75 rounded-full"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: activeStratum.color,
                  }}
                />
              </div>

              {/* Stratum Counter */}
              <div className="font-mono text-[11px] text-white/70 font-bold tracking-wider">
                0{activeLayer + 1} / 03
              </div>
            </div>

            {/* Prev / Next Chevrons */}
            <div className="flex items-center gap-1 border-l border-white/15 pl-3">
              <button
                onClick={prevLayer}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="Previous Stratum Layer (Swipe Left)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextLayer}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="Next Stratum Layer (Swipe Right)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          HORIZONTAL SLIDING TRACK (Holds Strata 02, 03, and 04)
          Smoothly translates horizontally via translateX
      ------------------------------------------------------------- */}
      <div
        className="flex w-full transition-transform duration-700 ease-in-out cursor-grab active:cursor-grabbing"
        style={{ transform: `translateX(-${activeLayer * 100}%)` }}
      >
        {/* =========================================================
            SLIDE 0: STRATA 02 (ONGOING & UPCOMING ACTIVITIES)
            Theme: #7b9e29 to #adcd60 green gradient
        ========================================================= */}
        <div className="w-full flex-shrink-0 min-w-full">
          <div
            style={{
              background:
                'linear-gradient(125deg, #5a7a1b 0%, #7b9e29 35%, #9bbb49 70%, #adcd60 100%)',
            }}
            className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-[#111E13] overflow-hidden"
          >
            {/* Luminous Glow Orbs */}
            <div className="absolute top-0 right-0 w-[650px] h-[500px] bg-[#adcd60]/35 rounded-full blur-[110px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-[#425d10]/40 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/25 border border-white/25 text-white text-xs font-mono mb-3 font-bold tracking-wider backdrop-blur-md shadow-xs">
                    <Calendar className="w-3.5 h-3.5 text-[#dcf48f]" />
                    <span>STRATA 02 // FIELD ACTIVITIES & CALENDAR</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-extrabold font-space text-white tracking-tight drop-shadow-sm">
                    Upcoming & Ongoing Activities
                  </h2>
                  <p className="text-sm sm:text-base text-white/90 font-medium max-w-xl mt-2 font-sans">
                    Join live talk shows, register for field mapping camps, or compete in collegiate geo-olympiads.
                  </p>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5 mt-4 md:mt-0">
                  {['All', 'Annual Flagship', 'Talk Show', 'Field Workshop', 'Competition'].map(
                    (category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                          selectedCategory === category
                            ? 'bg-white text-[#476612] font-bold border-white shadow-lg scale-102'
                            : 'bg-black/25 text-white border-white/20 hover:bg-black/35 hover:border-white/45 font-semibold backdrop-blur-sm shadow-xs'
                        }`}
                      >
                        {category}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Activities Grid in Crisp Elevated Ivory Glass Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="slide-card bg-[#FAF8F5]/95 border border-[#16290E]/15 hover:border-[#16290E] rounded-2xl p-6 flex flex-col justify-between group transition-all duration-300 shadow-xl hover:shadow-2xl text-[#111E13] backdrop-blur-md"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="px-3 py-1 rounded-lg bg-[#7b9e29]/20 border border-[#7b9e29]/40 text-xs font-mono text-[#38500c] font-bold">
                          {evt.displayDate}
                        </div>
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#1D6FB8]/15 text-[#1D6FB8] border border-[#1D6FB8]/30 font-bold">
                          {evt.category}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold font-space text-[#111E13] group-hover:text-[#476612] transition-colors leading-snug mb-2">
                        {evt.title}
                      </h3>

                      <p className="text-xs text-[#334437] leading-relaxed font-sans mb-4 line-clamp-3">
                        {evt.description}
                      </p>

                      <div className="space-y-1.5 text-xs font-mono text-[#526556] border-t border-[#7b9e29]/20 pt-3 mb-4">
                        <div className="flex items-center gap-1.5 truncate">
                          <MapPin className="w-3.5 h-3.5 text-[#476612] flex-shrink-0" />
                          <span className="truncate">{evt.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#1D6FB8] flex-shrink-0" />
                          <span>{evt.time}</span>
                        </div>
                      </div>

                      {evt.speaker && (
                        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-[#7b9e29]/25 mb-4 shadow-2xs">
                          <img
                            src={evt.speaker.avatar}
                            alt={evt.speaker.name}
                            className="w-8 h-8 rounded-full object-cover border border-[#7b9e29]"
                          />
                          <div className="text-xs truncate">
                            <div className="text-[#111E13] font-semibold truncate">
                              {evt.speaker.name}
                            </div>
                            <div className="text-[10px] text-[#526556] truncate">
                              {evt.speaker.organization}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#7b9e29]/20 flex items-center justify-between gap-2">
                      <a
                        href={evt.googleCalendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-[#1D6FB8] hover:text-[#111E13] font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>+ Google Cal</span>
                      </a>

                      <button
                        onClick={() => {
                          if (onRegisterEvent) {
                            onRegisterEvent(evt);
                          } else {
                            onOpenJoin();
                          }
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-[#16290E] hover:bg-[#0E1C08] text-white text-xs font-space font-bold transition-all shadow-md cursor-pointer flex items-center gap-1"
                      >
                        <span>Register Free</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#adcd60]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            SLIDE 1: STRATA 03 (YOUTUBE SHOWCASE & SOCIAL STRIP)
            Theme: Broadcast Studio Carbon #0E1012 with YouTube Red
        ========================================================= */}
        <div className="w-full flex-shrink-0 min-w-full">
          <div className="relative w-full bg-[#0E1012] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-white overflow-hidden">
            {/* Red Broadcast Halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FF0000]/10 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <YoutubeLogoBadge />
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#FF0000]/20 text-[#FF4444] border border-[#FF0000]/40 font-bold uppercase tracking-wider">
                      STRATA 03 // LIVE BROADCAST NETWORK
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-extrabold font-space text-white tracking-tight">
                    GSS YouTube Talk Shows & Masterclasses
                  </h2>
                  <p className="text-sm text-white/70 max-w-xl mt-2 font-sans">
                    Stream recorded distinguished lectures, field tutorials, and GATE geology masterclasses freely on our official YouTube channel.
                  </p>
                </div>

                {/* Punchy Official Social & Community Strip */}
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={GSS_SOCIAL_LINKS.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-[#FF0000] hover:bg-[#D90000] text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg shadow-[#FF0000]/25 transition-all cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <YoutubeIcon className="w-4 h-4" />
                    <span>YouTube</span>
                  </a>

                  <a
                    href={GSS_SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:brightness-110 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md transform hover:-translate-y-0.5"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                  </a>

                  <a
                    href={GSS_SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md transform hover:-translate-y-0.5"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={GSS_SOCIAL_LINKS.whatsappCommunity}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-[#0A2612] text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md transform hover:-translate-y-0.5"
                  >
                    <WhatsappIcon className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp Community</span>
                  </a>

                  <a
                    href={GSS_SOCIAL_LINKS.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-[#0088CC] hover:bg-[#0077B5] text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md transform hover:-translate-y-0.5"
                  >
                    <TelegramIcon className="w-3.5 h-3.5 fill-current" />
                    <span>Telegram</span>
                  </a>

                  <a
                    href={GSS_SOCIAL_LINKS.whatsappChannel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-[#128C7E] hover:bg-[#0E7064] text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md transform hover:-translate-y-0.5"
                  >
                    <WhatsappIcon className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp Channel</span>
                  </a>
                </div>
              </div>

              {/* YouTube Video Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {YOUTUBE_VIDEOS.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => onOpenVideo(video)}
                    className="slide-card bg-[#15181C] border border-white/12 hover:border-[#FF0000] rounded-2xl overflow-hidden group cursor-pointer flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-[#FF0000]/20 transform hover:-translate-y-1"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-black">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                      {/* Iconic YouTube Logo Rectangular Rounded Corner Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-10 sm:w-16 sm:h-11 rounded-[14px] bg-[#FF0000] text-white flex items-center justify-center shadow-2xl shadow-black/70 transform group-hover:scale-115 group-hover:bg-[#E60000] group-hover:shadow-[0_0_25px_rgba(255,0,0,0.6)] transition-all duration-300">
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5 drop-shadow-xs"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 font-mono text-[11px] text-white border border-white/20 font-bold">
                        {video.duration}
                      </span>

                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#FF0000]/90 font-mono text-[10px] text-white font-bold flex items-center gap-1">
                        <YoutubeIcon className="w-3 h-3" />
                        <span>{video.topic}</span>
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold font-space text-white group-hover:text-[#FF4444] transition-colors line-clamp-2 mb-2">
                          {video.title}
                        </h3>
                        <p className="text-xs text-[#82AC38] font-mono font-medium mb-1">
                          {video.speaker}
                        </p>
                        <p className="text-[11px] text-white/50 truncate mb-3">
                          {video.affiliation}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60">
                        <span>{video.views}</span>
                        <span className="text-[#FF4444] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          <span>Watch Episode</span>
                          <span>→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            SLIDE 2: STRATA 04 (MINDAT.ORG MINERAL GALLERY)
            Theme: Crystalline Cyan & Dark Oceanic #081118
        ========================================================= */}
        <div className="w-full flex-shrink-0 min-w-full">
          <MindatGallery isEmbedded={true} />
        </div>
      </div>

      {/* -------------------------------------------------------------
          FLOATING LEFT & RIGHT EDGE QUICK NAVIGATORS
          Subtle tactile chevrons on edges for instant navigation
      ------------------------------------------------------------- */}
      <button
        onClick={prevLayer}
        className="hidden md:flex absolute top-1/2 left-4 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 hover:border-white/50 items-center justify-center backdrop-blur-md shadow-2xl transition-all duration-200 transform hover:scale-110 cursor-pointer group"
        title="Previous Stratum Layer"
      >
        <ChevronLeft className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
      </button>

      <button
        onClick={nextLayer}
        className="hidden md:flex absolute top-1/2 right-4 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 hover:border-white/50 items-center justify-center backdrop-blur-md shadow-2xl transition-all duration-200 transform hover:scale-110 cursor-pointer group"
        title="Next Stratum Layer"
      >
        <ChevronRight className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
      </button>

      {/* Bottom Stratum Navigation Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-xl">
        {STRATA_LAYERS.map((st, i) => (
          <button
            key={st.id}
            onClick={() => goToLayer(i)}
            className="group flex items-center gap-1.5 cursor-pointer py-1"
            title={`Go to ${st.name}`}
          >
            <span
              className={`h-2 rounded-full transition-all duration-300 ${
                activeLayer === i ? 'w-8' : 'w-2 bg-white/40 group-hover:bg-white/70'
              }`}
              style={{
                backgroundColor: activeLayer === i ? st.color : undefined,
              }}
            />
          </button>
        ))}
        <span className="text-[10px] font-mono text-white/50 pl-2 border-l border-white/20">
          SWIPE ⇄
        </span>
      </div>
    </div>
  );
};
