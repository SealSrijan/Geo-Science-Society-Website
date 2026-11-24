import React, { useState, useEffect } from 'react';
import { Search, X, Calendar, School, Gem, FileText, ArrowRight } from 'lucide-react';
import { GSS_EVENTS, COLLEGE_CHAPTERS, GEO_SPECIMENS, ARTICLES } from '../data/gssData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, detailId?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredEvents = q
    ? GSS_EVENTS.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q))
      ).slice(0, 3)
    : [];

  const filteredColleges = q
    ? COLLEGE_CHAPTERS.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.specialization.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const filteredSpecimens = q
    ? GEO_SPECIMENS.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.rockType.toLowerCase().includes(q) ||
          s.formation.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const filteredArticles = q
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const hasResults =
    filteredEvents.length > 0 ||
    filteredColleges.length > 0 ||
    filteredSpecimens.length > 0 ||
    filteredArticles.length > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Geo-Science Society"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white/95 border border-[#2B4624]/20 rounded-2xl shadow-2xl overflow-hidden glass-panel-elevated text-[#111E13]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[#2B4624]/15 px-4 py-3.5 bg-[#FAF8F5]">
          <Search className="w-5 h-5 text-[#2B4624] mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, colleges, rock specimens, articles, or topics..."
            className="w-full bg-transparent text-[#111E13] text-base placeholder-[#334437]/50 focus:outline-none font-sans"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#334437]/60 hover:text-[#111E13] p-1 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono text-[#334437]/60 border border-[#2B4624]/15 rounded bg-[#F4F1EA]">
            ESC
          </span>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="py-8 text-center text-sm text-[#334437]">
              <p className="font-mono text-xs text-[#2B4624] font-bold mb-1 tracking-wider">DISCOVER GSS ECOSYSTEM</p>
              <p>Try searching for <span className="text-[#3898D8] font-medium">"Geogenesis"</span>, <span className="text-[#3898D8] font-medium">"Basalt"</span>, <span className="text-[#3898D8] font-medium">"Presidency"</span>, or <span className="text-[#3898D8] font-medium">"Thin Section"</span></p>
            </div>
          )}

          {query && !hasResults && (
            <div className="py-10 text-center text-sm text-[#334437]">
              No results found for "{query}". Try checking your spelling or search by rock type or city.
            </div>
          )}

          {/* Events */}
          {filteredEvents.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#2B4624] font-bold uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5 text-[#2B4624]" />
                <span>Events & Conclaves</span>
              </div>
              <div className="space-y-1.5">
                {filteredEvents.map((evt) => (
                  <button
                    key={evt.id}
                    onClick={() => {
                      onNavigate('events', evt.id);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl bg-[#F4F1EA] hover:bg-white border border-[#2B4624]/15 hover:border-[#82AC38] flex items-center justify-between group transition-colors shadow-sm"
                  >
                    <div>
                      <div className="text-sm font-semibold text-[#111E13] group-hover:text-[#2B4624]">
                        {evt.title}
                      </div>
                      <div className="text-xs text-[#334437] font-mono mt-0.5">
                        {evt.displayDate} · {evt.location}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#334437]/40 group-hover:text-[#2B4624] group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colleges */}
          {filteredColleges.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#3898D8] font-bold uppercase tracking-wider mb-2">
                <School className="w-3.5 h-3.5" />
                <span>Pan-India Chapters</span>
              </div>
              <div className="space-y-1.5">
                {filteredColleges.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => {
                      onNavigate('community', col.id);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl bg-[#F4F1EA] hover:bg-white border border-[#2B4624]/15 hover:border-[#3898D8] flex items-center justify-between group transition-colors shadow-sm"
                  >
                    <div>
                      <div className="text-sm font-semibold text-[#111E13] group-hover:text-[#3898D8]">
                        {col.name}
                      </div>
                      <div className="text-xs text-[#334437] font-mono mt-0.5">
                        {col.city}, {col.state} · {col.membersCount} Members
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#334437]/40 group-hover:text-[#3898D8] group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Specimens */}
          {filteredSpecimens.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#2B4624] font-bold uppercase tracking-wider mb-2">
                <Gem className="w-3.5 h-3.5 text-[#2B4624]" />
                <span>Geo Gallery Specimens</span>
              </div>
              <div className="space-y-1.5">
                {filteredSpecimens.map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => {
                      onNavigate('learn', spec.id);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl bg-[#F4F1EA] hover:bg-white border border-[#2B4624]/15 hover:border-[#82AC38] flex items-center justify-between group transition-colors shadow-sm"
                  >
                    <div>
                      <div className="text-sm font-semibold text-[#111E13] group-hover:text-[#2B4624]">
                        {spec.name}
                      </div>
                      <div className="text-xs text-[#334437] font-mono mt-0.5">
                        {spec.rockType} · {spec.formation}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#334437]/40 group-hover:text-[#2B4624] group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Articles */}
          {filteredArticles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#2B4624] font-bold uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5" />
                <span>Articles & Field Notes</span>
              </div>
              <div className="space-y-1.5">
                {filteredArticles.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => {
                      onNavigate('learn', art.id);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl bg-[#F4F1EA] hover:bg-white border border-[#2B4624]/15 hover:border-[#82AC38] flex items-center justify-between group transition-colors shadow-sm"
                  >
                    <div>
                      <div className="text-sm font-semibold text-[#111E13] group-hover:text-[#2B4624]">
                        {art.title}
                      </div>
                      <div className="text-xs text-[#334437] font-mono mt-0.5">
                        By {art.author} · {art.readTime}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#334437]/40 group-hover:text-[#2B4624] group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
