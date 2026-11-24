import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
  Compass,
  ChevronDown,
  Mail,
  Send,
  User,
  School,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

import { GssEmblem } from '../components/GssEmblem';
import { StrataDivider } from '../components/StrataDivider';
import { CardsSlider } from '../components/CardsSlider';
import {
  YoutubeIcon,
  YoutubeLogoBadge,
  LinkedinIcon,
  InstagramIcon,
  WhatsappIcon,
  TelegramIcon,
  GSS_SOCIAL_LINKS,
} from '../components/SocialIcons';
import {
  GSS_EVENTS,
  YOUTUBE_VIDEOS,
  FAQS,
} from '../data/gssData';
import type { GssEvent, VideoShowcase } from '../data/gssData';
import { MindatGallery } from '../components/MindatGallery';

gsap.registerPlugin(ScrollTrigger);

interface HomeViewProps {
  onNavigate: (view: string, detailId?: string) => void;
  onOpenJoin: () => void;
  onOpenVideo: (video: VideoShowcase) => void;
  onRegisterEvent?: (event: GssEvent) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenJoin,
  onOpenVideo,
  onRegisterEvent,
}) => {
  // Category Filter for Ongoing & Upcoming Activities
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Standard FAQ Accordion State
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [faqCategory, setFaqCategory] = useState<string>('All');

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCollege, setContactCollege] = useState('');
  const [contactRole, setContactRole] = useState('Student');
  const [contactMessage, setContactMessage] = useState('');
  const [contactPrivacy, setContactPrivacy] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // GSAP References
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const heroPhase1Ref = useRef<HTMLDivElement>(null);
  const heroPhase2Ref = useRef<HTMLDivElement>(null);

  const activitiesRef = useRef<HTMLElement>(null);
  const youtubeRef = useRef<HTMLElement>(null);
  const mineralRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 1. Morphing Hero Section: Phase 1 -> Phase 2
    const p1El = heroPhase1Ref.current;
    const p2El = heroPhase2Ref.current;
    const wrapEl = heroWrapperRef.current;

    if (p1El && p2El && wrapEl) {
      gsap.set(p2El, { opacity: 0, y: 50, pointerEvents: 'none' });
      gsap.set(p1El, { opacity: 1, y: 0, pointerEvents: 'auto' });

      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: wrapEl,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      heroTimeline
        .to(p1El, {
          opacity: 0,
          y: -50,
          scale: 0.95,
          duration: 1,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (p1El) p1El.style.pointerEvents = 'none';
          },
        })
        .to(
          p2El,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            onStart: () => {
              if (p2El) p2El.style.pointerEvents = 'auto';
            },
          },
          '-=0.3'
        );
    }

    // 2. Left-sliding GSAP animations for all major glassmorphic sections
    const isMobile = window.innerWidth < 768;
    const slideOffset = isMobile ? -20 : -60;

    const sections = [activitiesRef, youtubeRef, mineralRef, faqRef, contactRef];

    const ctx = gsap.context(() => {
      sections.forEach((ref) => {
        if (ref.current) {
          const cards = ref.current.querySelectorAll('.slide-card');
          if (cards.length > 0) {
            gsap.fromTo(
              cards,
              { x: slideOffset, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.85,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: ref.current,
                  start: 'top 80%',
                  toggleActions: 'play none none none',
                },
              }
            );
          }
        }
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage || !contactPrivacy) return;

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactCollege('');
      setContactMessage('');
      setContactPrivacy(false);
    }, 4000);
  };

  // FAQ Category Filter
  const filteredFaqs =
    faqCategory === 'All'
      ? FAQS
      : FAQS.filter((f) => f.category === faqCategory);

  const filteredEvents =
    selectedCategory === 'All'
      ? GSS_EVENTS
      : GSS_EVENTS.filter((e) => e.category === selectedCategory);

  return (
    <div className="relative w-full">
      {/* -------------------------------------------------------------
          STRATA 01: HERO SECTION (Pinned Morphing Timeline)
          Palette: Warm Ivory/Cream `#FAF8F5` with Contours & Pine Text
      ------------------------------------------------------------- */}
      <section
        ref={heroWrapperRef}
        id="hero-strata"
        className="relative w-full h-screen overflow-hidden flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="relative w-full max-w-6xl mx-auto h-full flex items-center justify-center">
          {/* PHASE 1: Centered Welcome Headline */}
          <div
            ref={heroPhase1Ref}
            className="absolute inset-0 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF3E7] border border-[#5B8A22]/30 text-[#3D6314] text-xs font-mono mb-6 font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#82AC38] animate-ping" />
              <span>PAN-INDIA EARTH SCIENCES FEDERATION</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-space text-[#111E13] tracking-tight leading-[1.08] mb-6">
              Welcome to the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B4624] via-[#82AC38] to-[#1D6FB8]">
                Geo-Science Society
              </span>
            </h1>

            <p className="text-base sm:text-xl text-[#334437] font-sans max-w-2xl leading-relaxed mb-8">
              Uniting geology, geophysics, and Earth science students across{' '}
              <span className="text-[#2B4624] font-bold">100+ colleges</span> in India. Democratizing field expeditions, national conclaves, and open research mentorship.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenJoin}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#2B4624] hover:bg-[#1E3319] text-[#FAF8F5] font-bold font-space text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-[#82AC38]" />
                <span>Join GSS for Free</span>
              </button>

              <button
                onClick={() => {
                  if (activitiesRef.current) {
                    activitiesRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-[#F4F1EA] border border-[#2B4624]/20 text-[#111E13] font-space font-semibold text-base transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Explore Activities</span>
                <ArrowRight className="w-5 h-5 text-[#1D6FB8]" />
              </button>
            </div>

            <div className="mt-12 flex flex-col items-center gap-2 text-xs font-mono text-[#526556] animate-bounce font-medium">
              <span>SCROLL TO DISCOVER GSS</span>
              <ChevronDown className="w-4 h-4 text-[#82AC38]" />
            </div>
          </div>

          {/* PHASE 2: "What is Geo-Science Society?" with Original Logo */}
          <div
            ref={heroPhase2Ref}
            className="absolute inset-0 flex items-center justify-center w-full"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full max-w-6xl">
              {/* Left Column: Authentic Official Crest */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <GssEmblem size="lg" showAura={true} />
                <div className="mt-3 text-[11px] font-mono text-[#334437] text-center font-medium">
                  Official Society Emblem · Established 2021
                </div>
              </div>

              {/* Right Column: Mission Overview & Metrics */}
              <div className="lg:col-span-7 bg-white/90 border border-[#2B4624]/20 p-6 sm:p-8 rounded-3xl shadow-xl backdrop-blur-md">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3E7] border border-[#82AC38]/40 text-[#2B4624] text-xs font-mono mb-3 font-bold">
                  <Compass className="w-3.5 h-3.5 text-[#82AC38]" />
                  <span>FOUNDATION & PURPOSE</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold font-space text-[#111E13] tracking-tight leading-tight mb-4">
                  What is Geo-Science Society?
                </h2>

                <p className="text-sm sm:text-base text-[#334437] font-sans leading-relaxed mb-6">
                  Founded by student geologists, GSS is India’s non-profit, inter-collegiate Earth Sciences federation. We bridge the gap between classroom theory and real outcrop geology—hosting national conclaves like <strong className="text-[#2B4624]">Geogenesis</strong>, publishing open thin-section catalogs, and funding student field excursions.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#2B4624]/15">
                  <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#2B4624]/10 text-center">
                    <div className="text-xl sm:text-2xl font-extrabold font-space text-[#2B4624]">
                      100+
                    </div>
                    <div className="text-[11px] font-mono text-[#526556] mt-0.5 font-medium">
                      Colleges
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#2B4624]/10 text-center">
                    <div className="text-xl sm:text-2xl font-extrabold font-space text-[#1D6FB8]">
                      1,500+
                    </div>
                    <div className="text-[11px] font-mono text-[#526556] mt-0.5 font-medium">
                      Members
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#2B4624]/10 text-center">
                    <div className="text-xl sm:text-2xl font-extrabold font-space text-[#82AC38]">
                      50+
                    </div>
                    <div className="text-[11px] font-mono text-[#526556] mt-0.5 font-medium">
                      Talk Shows
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#2B4624]/10 text-center">
                    <div className="text-xl sm:text-2xl font-extrabold font-space text-[#111E13]">
                      19
                    </div>
                    <div className="text-[11px] font-mono text-[#526556] mt-0.5 font-medium">
                      States Active
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onNavigate('about')}
                    className="text-xs font-mono text-[#1D6FB8] hover:text-[#2B4624] font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read GSS Constitution & History</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StrataDivider label="STRATA HORIZON 01" depth="-120m" />

      {/* -------------------------------------------------------------
          STRATA 02: ONGOING & UPCOMING ACTIVITIES
          Clean Simple Strata Gradient: #7b9e29 to #adcd60
          Single Layer of Moving Cards (Horizontal Swipe & Auto-Swipe)
      ------------------------------------------------------------- */}
      <section
        ref={activitiesRef}
        id="activities-strata"
        style={{
          background: 'linear-gradient(125deg, #5a7a1b 0%, #7b9e29 35%, #9bbb49 70%, #adcd60 100%)',
        }}
        className="relative w-full border-y-2 border-[#5c7a1c]/40 shadow-xl py-20 px-4 sm:px-6 lg:px-8 text-[#111E13] overflow-hidden"
      >
        {/* Rich Ambient Depth */}
        <div className="absolute top-0 right-0 w-[650px] h-[500px] bg-[#adcd60]/35 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-[#425d10]/40 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
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

          {/* SINGLE LAYER OF MOVING CARDS (Horizontal Carousel with Auto-Swipe & Touch Swipe) */}
          <CardsSlider
            items={filteredEvents}
            accentColor="#ffffff"
            theme="light"
            autoSwipeIntervalMs={4500}
            renderCard={(evt) => (
              <div
                key={evt.id}
                className="bg-[#FAF8F5]/95 border border-[#16290E]/15 hover:border-[#16290E] rounded-2xl p-6 flex flex-col justify-between group transition-all duration-300 shadow-xl hover:shadow-2xl text-[#111E13] backdrop-blur-md h-full"
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

                  <h3 className="text-lg font-bold font-space text-[#111E13] group-hover:text-[#476612] transition-colors leading-snug mb-2 line-clamp-2">
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
                        <div className="text-[#111E13] font-semibold truncate">{evt.speaker.name}</div>
                        <div className="text-[10px] text-[#526556] truncate">{evt.speaker.organization}</div>
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
            )}
          />
        </div>
      </section>

      <StrataDivider label="STRATA HORIZON 02" depth="-260m" />

      {/* -------------------------------------------------------------
          STRATA 03: SOCIAL LINKS & YOUTUBE SHOWCASE
          Broadcast Studio Theme #0E1012 with YouTube Red
          Single Layer of Moving Video Cards (Horizontal Carousel)
      ------------------------------------------------------------- */}
      <section
        ref={youtubeRef}
        id="youtube-strata"
        className="relative w-full bg-[#0E1012] border-y-2 border-[#FF0000]/30 shadow-2xl py-20 px-4 sm:px-6 lg:px-8 text-white overflow-hidden"
      >
        {/* Red Broadcast Halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FF0000]/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
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

          {/* SINGLE LAYER OF MOVING YOUTUBE VIDEO CARDS */}
          <CardsSlider
            items={YOUTUBE_VIDEOS}
            accentColor="#FF0000"
            theme="dark"
            autoSwipeIntervalMs={5000}
            renderCard={(video) => (
              <div
                key={video.id}
                onClick={() => onOpenVideo(video)}
                className="bg-[#15181C] border border-white/12 hover:border-[#FF0000] rounded-2xl overflow-hidden group cursor-pointer flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-[#FF0000]/20 transform hover:-translate-y-1 h-full"
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
                    <h3 className="text-base font-bold font-space text-white group-hover:text-[#FF4444] transition-colors line-clamp-2 mb-2">
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
            )}
          />
        </div>
      </section>

      <StrataDivider label="STRATA HORIZON 03" depth="-420m" />

      {/* -------------------------------------------------------------
          STRATA 04: OPENMINDAT.ORG MINERAL LOCALITY DATABASE
          Interactive Mineral Explorer & Specimen Dossier Repository
      ------------------------------------------------------------- */}
      <MindatGallery sectionRef={mineralRef} />

      <StrataDivider label="STRATA HORIZON 04" depth="-580m" />

      {/* -------------------------------------------------------------
          STRATA 05: FREQUENTLY ASKED QUESTIONS (NORMAL Q&A)
          Clean Accordion on Website's Original Ivory Background (#FAF8F5)
      ------------------------------------------------------------- */}
      <section
        ref={faqRef}
        id="faq-strata"
        className="relative py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-[#111E13]"
      >
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2B4624]/10 border border-[#2B4624]/20 text-[#2B4624] text-xs font-mono mb-3 font-bold tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#4E761C]" />
            <span>KNOWLEDGE BASE // FAQ</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-space text-[#111E13] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#334437] mt-3 font-sans leading-relaxed">
            Everything you need to know about joining Geo-Science Society, establishing a student chapter, attending field workshops, and contributing to national Earth science initiatives.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 mt-6">
            {['All', 'Membership', 'Chapters', 'Events & Workshops', 'Submissions & Research', 'Partnerships'].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setFaqCategory(cat)}
                  className={`text-xs font-mono px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                    faqCategory === cat
                      ? 'bg-[#2B4624] text-white font-bold border-[#2B4624] shadow-xs'
                      : 'bg-white/80 text-[#2D3E30] border-[#2B4624]/15 hover:bg-white hover:border-[#2B4624]/30'
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>

        {/* Clean Standard FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-200 border overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#2B4624]/40 shadow-md ring-1 ring-[#2B4624]/10'
                    : 'bg-white/70 hover:bg-white border-[#2B4624]/15 hover:border-[#2B4624]/30 shadow-xs'
                }`}
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#2B4624]/10 text-[#2B4624] font-bold uppercase tracking-wider flex-shrink-0">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-space text-[#111E13] leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#2B4624] text-white rotate-180'
                        : 'bg-[#2B4624]/10 text-[#2B4624]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 text-sm text-[#334437] leading-relaxed font-sans border-t border-[#2B4624]/10">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Assistance Card */}
        <div className="mt-10 p-5 rounded-2xl bg-white/70 border border-[#2B4624]/15 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="text-left">
            <h4 className="text-sm font-bold font-space text-[#111E13]">Have another question?</h4>
            <p className="text-xs text-[#526556] font-sans">Reach out directly to our Academic and Chapters Secretariat.</p>
          </div>
          <button
            onClick={() => {
              if (contactRef.current) {
                contactRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-4 py-2 rounded-xl bg-[#2B4624] hover:bg-[#1C3017] text-white text-xs font-mono font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap"
          >
            Ask a Question →
          </button>
        </div>
      </section>

      <StrataDivider label="STRATA HORIZON 05" depth="-720m" />

      {/* -------------------------------------------------------------
          STRATA 06: CONTACT US BASECAMP (Dispatch Desk)
          Palette: Clean Ivory Base Grounding `#FAF8F5`
      ------------------------------------------------------------- */}
      <section
        ref={contactRef}
        id="contact-strata"
        className="relative py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-[#111E13]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Quick Routes */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3E7] border border-[#82AC38]/40 text-[#2B4624] text-xs font-mono mb-2 font-bold">
                <Mail className="w-3.5 h-3.5" />
                <span>STRATA 06 // FIELD DESK DISPATCH</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-space text-[#111E13] tracking-tight">
                Get in Touch with GSS
              </h2>
              <p className="text-sm text-[#334437] mt-2 font-sans">
                Choose your inquiry route or send a dispatch directly to our Central Secretariat in Kolkata.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              {[
                {
                  title: 'Student Membership & Chapters',
                  desc: 'Join 1,500+ peers or establish an official college branch.',
                  badge: 'STUDENTS',
                  route: 'community',
                },
                {
                  title: 'Distinguished Talk Show Speakers',
                  desc: 'Deliver a guest lecture on your Earth science research.',
                  badge: 'SPEAKERS',
                  route: 'partner',
                },
                {
                  title: 'Corporate & Mining Sponsors',
                  desc: 'Support student field kits and Geogenesis conclave tracks.',
                  badge: 'INDUSTRY',
                  route: 'partner',
                },
                {
                  title: 'Specimen Photo Submissions',
                  desc: 'Submit thin-section micrographs to the National Geo Gallery.',
                  badge: 'CURATION',
                  route: 'learn',
                },
              ].map((routeItem) => (
                <button
                  key={routeItem.title}
                  onClick={() => onNavigate(routeItem.route)}
                  className="w-full text-left p-4 rounded-2xl bg-white hover:bg-[#F4F1EA] border border-[#2B4624]/20 hover:border-[#82AC38] transition-all cursor-pointer shadow-sm group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold font-space text-[#111E13] group-hover:text-[#2B4624]">
                      {routeItem.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2B4624]/10 text-[#2B4624] font-bold">
                      {routeItem.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#334437]">{routeItem.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-7 bg-white/95 border border-[#2B4624]/20 rounded-3xl p-6 sm:p-8 shadow-xl">
            {formSubmitted ? (
              <div className="py-12 text-center animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-[#82AC38]/20 text-[#2B4624] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-space text-[#111E13] mb-2">
                  Dispatch Transmitted Successfully!
                </h3>
                <p className="text-sm text-[#334437] max-w-md mx-auto">
                  Thank you, <strong>{contactName}</strong>. Your field inquiry has been logged in the GSS Central Registry. A member of our executive committee will reply within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#111E13] font-bold mb-1">
                      FULL NAME *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-[#334437]/60" />
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Priyadarshini Roy"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F4F1EA] border border-[#2B4624]/20 text-sm text-[#111E13] focus:border-[#82AC38] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#111E13] font-bold mb-1">
                      EMAIL ADDRESS *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-[#334437]/60" />
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="e.g. roy@presiuniv.ac.in"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F4F1EA] border border-[#2B4624]/20 text-sm text-[#111E13] focus:border-[#82AC38] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#111E13] font-bold mb-1">
                      INSTITUTION / COMPANY
                    </label>
                    <div className="relative">
                      <School className="absolute left-3 top-3 w-4 h-4 text-[#334437]/60" />
                      <input
                        type="text"
                        value={contactCollege}
                        onChange={(e) => setContactCollege(e.target.value)}
                        placeholder="e.g. Presidency University"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F4F1EA] border border-[#2B4624]/20 text-sm text-[#111E13] focus:border-[#82AC38] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#111E13] font-bold mb-1">
                      PRIMARY ROLE
                    </label>
                    <select
                      value={contactRole}
                      onChange={(e) => setContactRole(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#F4F1EA] border border-[#2B4624]/20 text-sm text-[#111E13] focus:border-[#82AC38] focus:bg-white focus:outline-none cursor-pointer"
                    >
                      <option value="Student">Undergraduate Student</option>
                      <option value="Postgraduate">Postgraduate Scholar</option>
                      <option value="Faculty">Professor / Faculty</option>
                      <option value="Industry">Mining / Energy Geologist</option>
                      <option value="Media">Sponsor / Media Partner</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#111E13] font-bold mb-1">
                    MESSAGE OR DISPATCH DETAILS *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Describe your inquiry, chapter proposal, or talk show abstract..."
                    className="w-full p-3 rounded-xl bg-[#F4F1EA] border border-[#2B4624]/20 text-sm text-[#111E13] focus:border-[#82AC38] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="privacyCheck"
                    required
                    checked={contactPrivacy}
                    onChange={(e) => setContactPrivacy(e.target.checked)}
                    className="rounded border-[#2B4624]/30 text-[#2B4624] focus:ring-[#82AC38] cursor-pointer"
                  />
                  <label htmlFor="privacyCheck" className="text-xs text-[#334437] cursor-pointer">
                    I agree to the Geo-Science Society ethical code of conduct & privacy policy.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#2B4624] hover:bg-[#1E3319] text-[#FAF8F5] font-bold font-space text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl hover:shadow-[#2B4624]/30 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#82AC38]" />
                  <span>TRANSMIT FIELD DISPATCH</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
