import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Sparkles, Compass } from 'lucide-react';
import { GssEmblem } from './GssEmblem';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenJoin: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenJoin,
  onOpenSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'community', label: 'Community' },
    { id: 'events', label: 'Events' },
    { id: 'learn', label: 'Learn' },
    { id: 'partner', label: 'Partner' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-[#233A1F]/12 shadow-sm py-2.5'
          : 'bg-[#FAF8F5]/80 backdrop-blur-md border-b border-[#233A1F]/08 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Brand Emblem + Wordmark */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="relative">
              <GssEmblem size="sm" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-space font-extrabold text-base sm:text-lg tracking-wider text-[#111E13] group-hover:text-[#5B8A22] transition-colors">
                  GEO-SCIENCE SOCIETY
                </span>
                <span className="hidden sm:inline-flex px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#5B8A22]/15 text-[#3D6314] border border-[#5B8A22]/30 font-bold">
                  GSS
                </span>
              </div>
              <div className="text-[10px] font-mono text-[#526556] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1D6FB8] inline-block" />
                <span className="tracking-widest uppercase font-medium">Pan-India Earth Sciences Federation</span>
              </div>
            </div>
          </button>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-black/[0.03] border border-[#233A1F]/10 shadow-xs">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white font-bold bg-[#4E761C] shadow-sm'
                      : 'text-[#2D3E30] hover:text-[#111E13] hover:bg-black/[0.04]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Search + Glowing Join GSS Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenSearch}
              aria-label="Search site"
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white hover:bg-[#F2EFE9] border border-[#233A1F]/15 text-[#141E15] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Search className="w-4 h-4 text-[#5B8A22]" />
              <span className="hidden lg:inline text-xs font-mono text-[#526556]">
                Search <kbd className="text-[10px] bg-black/[0.05] px-1 py-0.5 rounded border border-[#233A1F]/15 font-mono">⌘K</kbd>
              </span>
            </button>

            <button
              onClick={onOpenJoin}
              className="relative group overflow-hidden px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#5B8A22] hover:bg-[#4E761C] text-white font-bold font-space text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join GSS</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-xl bg-white border border-[#233A1F]/15 text-[#141E15] cursor-pointer shadow-xs"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Over Glass Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-white/98 backdrop-blur-2xl border-b border-[#233A1F]/15 shadow-2xl p-6 animate-fade-in z-50">
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => handleLinkClick('home')}
              className={`p-3 rounded-xl text-left font-space font-semibold text-base flex items-center justify-between ${
                currentView === 'home'
                  ? 'bg-[#4E761C] text-white'
                  : 'text-[#141E15] hover:bg-black/[0.04]'
              }`}
            >
              <span>Home</span>
              <Compass className="w-4 h-4 opacity-50" />
            </button>

            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`p-3 rounded-xl text-left font-space font-semibold text-base flex items-center justify-between ${
                    isActive
                      ? 'bg-[#4E761C] text-white'
                      : 'text-[#141E15] hover:bg-black/[0.04]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono opacity-50 uppercase">{link.id}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-6 pt-6 border-t border-[#233A1F]/15 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#FAF8F5] border border-[#233A1F]/15 text-sm font-mono text-[#141E15] flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-[#5B8A22]" />
              <span>Search Database</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoin();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#5B8A22] text-white font-bold font-space text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Join Geo-Science Society</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
