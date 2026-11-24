import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FieldBackground } from './components/FieldBackground';
import { ClinometerCompass } from './components/ClinometerCompass';
import { JoinModal } from './components/JoinModal';
import { SearchModal } from './components/SearchModal';
import { VideoModal } from './components/VideoModal';
import { SpecimenLightboxModal } from './components/SpecimenLightboxModal';
import { ArticleModal } from './components/ArticleModal';

import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { CommunityView } from './views/CommunityView';
import { EventsView } from './views/EventsView';
import { LearnView } from './views/LearnView';
import { PartnerView } from './views/PartnerView';

import type { VideoShowcase, GeoSpecimen, Article, GssEvent } from './data/gssData';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'community' | 'events' | 'learn' | 'partner'>('home');
  const [selectedDetailId, setSelectedDetailId] = useState<string | undefined>(undefined);

  // Global Modals
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<VideoShowcase | null>(null);
  const [activeSpecimen, setActiveSpecimen] = useState<GeoSpecimen | null>(null);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  // Lenis Smooth Scroll Synced with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (view: string, detailId?: string) => {
    const validViews = ['home', 'about', 'community', 'events', 'learn', 'partner'] as const;
    if (validViews.includes(view as any)) {
      setCurrentView(view as any);
      setSelectedDetailId(detailId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRegisterEvent = (_event: GssEvent) => {
    setIsJoinOpen(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#141E15] selection:bg-[#5B8A22] selection:text-[#FFFFFF] overflow-x-hidden font-sans">
      {/* 1. Professional Ivory/White Background with Strata Waves & Contours */}
      <FieldBackground />

      {/* 2. Global Sticky Header */}
      <Navbar
        currentView={currentView}
        onNavigate={(v) => handleNavigate(v)}
        onOpenJoin={() => setIsJoinOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 3. Main Dynamic Content View */}
      <main className="relative z-10 min-h-[calc(100vh-200px)]">
        {currentView === 'home' && (
          <HomeView
            onNavigate={(v, id) => handleNavigate(v, id)}
            onOpenJoin={() => setIsJoinOpen(true)}
            onOpenVideo={(v) => setActiveVideo(v)}
            onRegisterEvent={handleRegisterEvent}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onOpenJoin={() => setIsJoinOpen(true)}
            onNavigate={(v) => handleNavigate(v)}
          />
        )}

        {currentView === 'community' && (
          <CommunityView
            onOpenJoin={() => setIsJoinOpen(true)}
            selectedCollegeId={selectedDetailId}
          />
        )}

        {currentView === 'events' && (
          <EventsView
            onOpenJoin={() => setIsJoinOpen(true)}
            onOpenVideo={(v) => setActiveVideo(v)}
            selectedEventId={selectedDetailId}
          />
        )}

        {currentView === 'learn' && (
          <LearnView
            onOpenSpecimen={(s) => setActiveSpecimen(s)}
            onOpenArticle={(a) => setActiveArticle(a)}
            selectedItemId={selectedDetailId}
          />
        )}

        {currentView === 'partner' && <PartnerView />}
      </main>

      {/* 4. Global Grounding Footer */}
      <Footer
        onNavigate={(v) => handleNavigate(v)}
        onOpenJoin={() => setIsJoinOpen(true)}
      />

      {/* 5. Interactive Geological Clinometer Compass (With Integrated GPS & Strata Telemetry) */}
      <ClinometerCompass onNavigateSection={handleNavigateSection} />

      {/* 7. Global Modals & Lightboxes */}
      <JoinModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(v, id) => handleNavigate(v, id)}
      />

      <VideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

      <SpecimenLightboxModal
        specimen={activeSpecimen}
        onClose={() => setActiveSpecimen(null)}
      />

      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />
    </div>
  );
}

export default App;
