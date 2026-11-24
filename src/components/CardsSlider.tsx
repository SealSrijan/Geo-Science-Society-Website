import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CardsSliderProps<T> {
  items: T[];
  renderCard: (item: T, index: number) => React.ReactNode;
  autoSwipeIntervalMs?: number;
  accentColor?: string;
  theme?: 'light' | 'dark';
  emptyMessage?: string;
  showControls?: boolean;
  itemsPerView?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

export function CardsSlider<T>({
  items,
  renderCard,
  autoSwipeIntervalMs = 4500,
  accentColor = '#82AC38',
  theme = 'light',
  emptyMessage = 'No items found in this category.',
  showControls = true,
  itemsPerView,
}: CardsSliderProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse & Touch tracking refs
  const isMouseDownRef = useRef(false);
  const mouseStartXRef = useRef<number | null>(null);
  const hasDraggedRef = useRef(false);

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isTouchSwipingHorizRef = useRef<boolean | null>(null);

  // Trackpad wheel cooldown ref
  const wheelCooldownRef = useRef(false);
  const wheelAccumulatorRef = useRef(0);

  // Responsive items-per-view
  const mobileCount = itemsPerView?.mobile ?? 1;
  const tabletCount = itemsPerView?.tablet ?? 2;
  const desktopCount = itemsPerView?.desktop ?? 3;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(mobileCount);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(tabletCount);
      } else {
        setVisibleCount(desktopCount);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileCount, tabletCount, desktopCount]);

  const maxIndex = Math.max(0, items.length - visibleCount);

  // Reset index if items list changes
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

  // Auto-swipe timer with pause-on-hover / drag
  useEffect(() => {
    if (isHovered || isDragging || maxIndex <= 0 || autoSwipeIntervalMs <= 0) return;

    const timer = setInterval(() => {
      next();
    }, autoSwipeIntervalMs);

    return () => clearInterval(timer);
  }, [isHovered, isDragging, maxIndex, autoSwipeIntervalMs, next]);

  // 1. Laptop Trackpad Two-Finger Horizontal Swipe (Wheel event)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // If horizontal movement dominates
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 12) {
        // Prevent accidental page bounce / horizontal navigation
        e.preventDefault();

        if (wheelCooldownRef.current) return;

        wheelAccumulatorRef.current += e.deltaX;

        if (Math.abs(wheelAccumulatorRef.current) > 35) {
          if (wheelAccumulatorRef.current > 0) {
            next();
          } else {
            prev();
          }
          wheelAccumulatorRef.current = 0;
          wheelCooldownRef.current = true;
          setTimeout(() => {
            wheelCooldownRef.current = false;
          }, 380);
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [next, prev]);

  // 2. Laptop Mouse Click & Drag Swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't drag when clicking links or buttons
    if (target.closest('button') || target.closest('a') || target.closest('input')) return;

    isMouseDownRef.current = true;
    mouseStartXRef.current = e.clientX;
    hasDraggedRef.current = false;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDownRef.current || mouseStartXRef.current === null) return;

      const deltaX = e.clientX - mouseStartXRef.current;
      if (Math.abs(deltaX) > 6) {
        hasDraggedRef.current = true;
        setIsDragging(true);
        // Add resistance factor
        setDragOffset(deltaX * 0.75);
      }
    };

    const handleMouseUp = () => {
      if (!isMouseDownRef.current) return;

      if (hasDraggedRef.current) {
        if (dragOffset < -40) {
          next();
        } else if (dragOffset > 40) {
          prev();
        }
      }

      isMouseDownRef.current = false;
      mouseStartXRef.current = null;
      setDragOffset(0);
      setIsDragging(false);

      // Delay resetting hasDragged so click handlers don't fire
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragOffset, next, prev]);

  // 3. Mobile Touch Swipe (with live drag tracking)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    isTouchSwipingHorizRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;

    const deltaX = e.touches[0].clientX - touchStartXRef.current;
    const deltaY = e.touches[0].clientY - touchStartYRef.current;

    if (isTouchSwipingHorizRef.current === null) {
      if (Math.abs(deltaX) > Math.abs(deltaY) + 4) {
        isTouchSwipingHorizRef.current = true;
      } else if (Math.abs(deltaY) > Math.abs(deltaX) + 4) {
        isTouchSwipingHorizRef.current = false;
      }
    }

    if (isTouchSwipingHorizRef.current) {
      setIsDragging(true);
      setDragOffset(deltaX * 0.85);
    }
  };

  const handleTouchEnd = () => {
    if (isTouchSwipingHorizRef.current) {
      if (dragOffset < -35) {
        next();
      } else if (dragOffset > 35) {
        prev();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
    isTouchSwipingHorizRef.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  const handleCardClickCapture = (e: React.MouseEvent) => {
    // If the user was dragging to swipe on laptop/desktop, prevent triggering internal clicks
    if (hasDraggedRef.current) {
      e.stopPropagation();
      e.preventDefault();
    }
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
      ref={containerRef}
      className="relative w-full select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onClickCapture={handleCardClickCapture}
    >
      {/* Top Slider Navigation Strip (Arrows & Telemetry Counter) */}
      {showControls && maxIndex > 0 && (
        <div className="flex items-center justify-end mb-4">
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
              title="Previous Card (or swipe right)"
              aria-label="Previous Card"
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
              title="Next Card (or swipe left)"
              aria-label="Next Card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SINGLE ROW HORIZONTAL MOVING TRACK */}
      <div className="overflow-hidden w-full relative py-2">
        <div
          className={`flex -mx-3 items-stretch ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            transform: `translateX(calc(-${currentIndex * (100 / visibleCount)}% + ${dragOffset}px))`,
            transition: isDragging ? 'none' : 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
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
              aria-label={`Jump to position ${i + 1}`}
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
