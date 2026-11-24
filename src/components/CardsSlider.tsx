import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface CardsSliderProps<T> {
  items: T[];
  renderCard: (item: T, index: number) => React.ReactNode;
  autoSwipeIntervalMs?: number;
  accentColor?: string;
  theme?: 'light' | 'dark';
  emptyMessage?: string;
  showControls?: boolean;
}

export function CardsSlider<T>({
  items,
  renderCard,
  autoSwipeIntervalMs = 4500,
  accentColor = '#82AC38',
  theme = 'light',
  emptyMessage = 'No items found in this category.',
  showControls = true,
}: CardsSliderProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Touch and mouse drag refs
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const mouseStartXRef = useRef<number | null>(null);
  const isMouseDownRef = useRef<boolean>(false);

  // Responsive items-per-view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCount);

  // Reset index if items list changes (e.g. category filter)
  useEffect(() => {
    setCurrentIndex(0);
  }, [items]);

  const next = useCallback(() => {
    if (maxIndex <= 0) return;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    if (maxIndex <= 0) return;
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-swipe timer with pause-on-hover
  useEffect(() => {
    if (isHovered || isPaused || maxIndex <= 0) return;

    const timer = setInterval(() => {
      next();
    }, autoSwipeIntervalMs);

    return () => clearInterval(timer);
  }, [isHovered, isPaused, maxIndex, autoSwipeIntervalMs, next]);

  // Touch swipe handling (swipe right to left -> next)
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

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        next();
      } else {
        prev();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Mouse drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('input')) return;

    mouseStartXRef.current = e.clientX;
    isMouseDownRef.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current || mouseStartXRef.current === null) return;
    const deltaX = e.clientX - mouseStartXRef.current;

    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        next();
      } else {
        prev();
      }
    }

    isMouseDownRef.current = false;
    mouseStartXRef.current = null;
  };

  if (!items || items.length === 0) {
    return (
      <div className="py-12 text-center text-sm font-mono opacity-70">
        {emptyMessage}
      </div>
    );
  }

  const isLight = theme === 'light';

  return (
    <div
      className="relative w-full select-none"
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
      {/* Top Slider Navigation Strip (Arrows & Telemetry) */}
      {showControls && maxIndex > 0 && (
        <div className="flex items-center justify-between mb-4">
          {/* Status info: Auto-swipe indicator & Pause toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`p-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                isLight
                  ? 'bg-black/20 hover:bg-black/30 border-white/20 text-white'
                  : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
              }`}
              title={isPaused ? 'Resume auto-swipe' : 'Pause auto-swipe'}
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 text-[#dcf48f]" />
                  <span className="text-[10px] font-bold">RESUME</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 opacity-70" />
                  <span className="text-[10px] opacity-80">
                    {isHovered ? 'PAUSED (HOVER)' : 'AUTO-SWIPING'}
                  </span>
                </>
              )}
            </button>

            <span className="text-[11px] font-mono opacity-70 hidden sm:inline">
              Swipe cards ⇄
            </span>
          </div>

          {/* Prev / Next tactile buttons & Counter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold opacity-80 mr-1">
              {currentIndex + 1} - {Math.min(currentIndex + visibleCount, items.length)} of {items.length}
            </span>

            <button
              onClick={prev}
              className={`p-2 rounded-xl border transition-all cursor-pointer transform hover:scale-105 active:scale-95 ${
                isLight
                  ? 'bg-black/25 hover:bg-black/40 border-white/25 text-white shadow-md'
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-white shadow-md'
              }`}
              title="Previous Card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={next}
              className={`p-2 rounded-xl border transition-all cursor-pointer transform hover:scale-105 active:scale-95 ${
                isLight
                  ? 'bg-black/25 hover:bg-black/40 border-white/25 text-white shadow-md'
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-white shadow-md'
              }`}
              title="Next Card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SINGLE ROW HORIZONTAL MOVING TRACK */}
      <div className="overflow-hidden w-full relative py-2">
        <div
          className="flex transition-transform duration-500 ease-out -mx-3 items-stretch cursor-grab active:cursor-grabbing"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{ width: `${100 / visibleCount}%` }}
              className="flex-shrink-0 px-3 flex flex-col"
            >
              <div className="h-full flex flex-col">{renderCard(item, idx)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Indicator Dots */}
      {maxIndex > 0 && (
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="py-1 cursor-pointer group"
              title={`Jump to position ${i + 1}`}
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === i ? 'w-6' : 'w-1.5 opacity-40 group-hover:opacity-80'
                }`}
                style={{
                  backgroundColor: currentIndex === i ? accentColor : isLight ? '#FFFFFF' : '#FFFFFF',
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
