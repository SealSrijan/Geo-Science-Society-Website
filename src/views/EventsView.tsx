import React, { useState } from 'react';
import { GSS_EVENTS, YOUTUBE_VIDEOS } from '../data/gssData';
import type { VideoShowcase } from '../data/gssData';
import { StrataDivider } from '../components/StrataDivider';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Play,
  ArrowRight,
} from 'lucide-react';

interface EventsViewProps {
  onOpenJoin: () => void;
  onOpenVideo: (video: VideoShowcase) => void;
  selectedEventId?: string;
}

export const EventsView: React.FC<EventsViewProps> = ({
  onOpenVideo,
  selectedEventId,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery] = useState('');
  const [registeredEventId, setRegisteredEventId] = useState<string | null>(null);

  const flagship = GSS_EVENTS.find((e) => e.category === 'Annual Flagship') || GSS_EVENTS[0];

  const filteredEvents = GSS_EVENTS.filter((evt) => {
    const matchesCategory = selectedFilter === 'All' || evt.category === selectedFilter;
    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRegister = (id: string) => {
    setRegisteredEventId(id);
    setTimeout(() => {
      setRegisteredEventId(null);
    }, 4000);
  };

  return (
    <div className="relative pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Geogenesis 2026 Spotlight Banner */}
      <div className="relative rounded-3xl overflow-hidden mb-16 glass-panel-elevated border-2 border-[#5B8A22]/35 shadow-xl p-6 sm:p-10 lg:p-12">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#5B8A22]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#1D6FB8]/08 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF3E7] border border-[#5B8A22]/40 text-[#3D6314] text-xs font-mono font-bold tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ANNUAL FLAGSHIP CONCLAVE · 4TH EDITION</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-space text-[#111E13] tracking-tight leading-tight">
              Geogenesis 2026: Pan-India Earth Science Conclave
            </h1>

            <p className="text-sm sm:text-base text-[#334437] font-sans leading-relaxed max-w-2xl">
              India's biggest gathering of student geologists, researchers, and field scientists. 3 days of undergraduate paper presentations, thin-section competitions, national geo-olympiad finals, and industry keynotes.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#334437] pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#233A1F]/15 shadow-xs">
                <Calendar className="w-4 h-4 text-[#5B8A22]" />
                <span className="font-bold text-[#3D6314]">DECEMBER 14 - 16, 2026</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#233A1F]/15 shadow-xs">
                <MapPin className="w-4 h-4 text-[#1D6FB8]" />
                <span>Presidency University Auditorium, Kolkata & Live Broadcast</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleRegister(flagship.id)}
                className="px-6 py-3 rounded-2xl bg-[#5B8A22] hover:bg-[#4E761C] text-white font-bold font-space text-sm transition-all shadow-md hover:shadow-xl cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{registeredEventId === flagship.id ? 'Seat Reserved!' : 'Register as Delegate'}</span>
              </button>

              <a
                href={flagship.googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl bg-white hover:bg-[#FAF8F5] border border-[#233A1F]/20 text-[#141E15] font-mono text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Calendar className="w-4 h-4 text-[#1D6FB8]" />
                <span>Add to Google Calendar</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <div className="p-4 rounded-2xl bg-white border border-[#233A1F]/15 shadow-xs space-y-2">
              <div className="text-xs font-mono text-[#3D6314] font-bold">CONCLAVE TRACKS</div>
              <ul className="text-xs text-[#405244] space-y-1.5 font-sans">
                <li>• B.Sc / M.Sc Research Paper Track</li>
                <li>• National Geo-Olympiad Finals (Top 20 Teams)</li>
                <li>• Rock Section Micro-Photography Challenge</li>
                <li>• ONGC & GSI Industry Career Panel</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-[#EBF3E7] border border-[#5B8A22]/30 text-center">
              <div className="text-2xl font-bold font-space text-[#3D6314]">₹50,000</div>
              <div className="text-[11px] font-mono text-[#526556] mt-0.5 font-semibold">
                Total Research Grants & Olympiad Prizes
              </div>
            </div>
          </div>
        </div>
      </div>

      <StrataDivider label="CALENDAR SCHEDULE" depth="EVENTS" />

      {/* Filterable Events Calendar */}
      <div className="my-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-space text-[#111E13]">
              Upcoming Events Calendar
            </h2>
            <p className="text-sm text-[#405244] mt-1">
              Filter by workshop, talk show, or technical competition.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {['All', 'Annual Flagship', 'Talk Show', 'Field Workshop', 'Competition', 'Masterclass'].map(
              (category) => (
                <button
                  key={category}
                  onClick={() => setSelectedFilter(category)}
                  className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    selectedFilter === category
                      ? 'bg-[#5B8A22] text-white font-bold border-[#5B8A22] shadow-xs'
                      : 'bg-white text-[#2D3E30] border-[#233A1F]/15 hover:text-[#111E13]'
                  }`}
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className={`glass-card-interactive rounded-3xl p-6 flex flex-col justify-between group ${
                selectedEventId === evt.id ? 'border-[#4E761C] bg-[#EBF3E7]/50' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-lg bg-[#FAF8F5] border border-[#5B8A22]/30 text-xs font-mono text-[#3D6314] font-bold">
                    {evt.displayDate}
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#1D6FB8]/10 text-[#1D6FB8] border border-[#1D6FB8]/25 font-bold">
                    {evt.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-space text-[#111E13] group-hover:text-[#4E761C] transition-colors leading-snug mb-2">
                  {evt.title}
                </h3>

                <p className="text-xs text-[#405244] font-sans leading-relaxed mb-4 line-clamp-3">
                  {evt.description}
                </p>

                <div className="space-y-1 text-xs font-mono text-[#526556] border-t border-[#233A1F]/10 pt-3 mb-4">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#5B8A22] flex-shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#1D6FB8] flex-shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                </div>

                {evt.speaker && (
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#FAF8F5] border border-[#233A1F]/10 mb-4">
                    <img
                      src={evt.speaker.avatar}
                      alt={evt.speaker.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#5B8A22]"
                    />
                    <div className="text-xs truncate">
                      <div className="text-[#111E13] font-semibold truncate">{evt.speaker.name}</div>
                      <div className="text-[10px] text-[#526556] truncate">{evt.speaker.organization}</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#233A1F]/10 flex items-center justify-between gap-2">
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
                  onClick={() => handleRegister(evt.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#5B8A22] hover:bg-[#4E761C] text-white text-xs font-space font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1"
                >
                  <span>{registeredEventId === evt.id ? 'Registered!' : 'Register'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <StrataDivider label="BROADCAST ARCHIVE" depth="TALK SHOWS" />

      {/* Talk Show Archive */}
      <div className="my-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1D6FB8]/10 border border-[#1D6FB8]/25 text-[#1D6FB8] text-xs font-mono mb-2 font-bold">
            <Play className="w-3.5 h-3.5" />
            <span>RECORDED TALK SHOW ARCHIVE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-space text-[#111E13]">
            Past Broadcasts & Lecture Recordings
          </h2>
          <p className="text-xs sm:text-sm text-[#405244] mt-1">
            Free high-definition webinars featuring India’s top researchers and professors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {YOUTUBE_VIDEOS.map((video) => (
            <div
              key={video.id}
              onClick={() => onOpenVideo(video)}
              className="glass-card-interactive rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full bg-black overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 border border-white/20 text-[11px] font-mono text-white">
                  {video.duration}
                </div>
                {/* Iconic YouTube Logo Rectangular Rounded Corner Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-8 sm:w-14 sm:h-10 rounded-[12px] bg-[#FF0000] text-white flex items-center justify-center shadow-xl shadow-black/50 group-hover:scale-110 group-hover:bg-[#E60000] transition-all">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-white ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#3D6314] font-bold uppercase mb-1">
                    {video.topic}
                  </div>
                  <h3 className="text-base font-bold font-space text-[#111E13] group-hover:text-[#4E761C] transition-colors leading-snug mb-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-[#405244] font-sans line-clamp-2 mb-3">
                    {video.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#233A1F]/10 flex items-center justify-between text-xs font-mono text-[#526556]">
                  <span className="truncate">{video.speaker}</span>
                  <span className="text-[#1D6FB8] font-bold">Watch Now →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
