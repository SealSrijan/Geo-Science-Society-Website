import React, { useState, useMemo } from 'react';
import {
  Search,
  ExternalLink,
  MapPin,
  Compass,
  X,
  Globe2,
} from 'lucide-react';
import { MINDAT_MINERALS } from '../data/gssData';
import type { MindatMineral } from '../data/gssData';
import { CardsSlider } from './CardsSlider';

interface MindatGalleryProps {
  sectionRef?: React.RefObject<HTMLElement | null>;
  isEmbedded?: boolean;
}

export const MindatGallery: React.FC<MindatGalleryProps> = ({ sectionRef, isEmbedded = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedSystem, setSelectedSystem] = useState<string>('All');
  const [activeMineral, setActiveMineral] = useState<MindatMineral | null>(null);

  // Filtered minerals list
  const filteredMinerals = useMemo(() => {
    return MINDAT_MINERALS.filter((mineral) => {
      const matchesSearch =
        mineral.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mineral.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mineral.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mineral.region.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesClass =
        selectedClass === 'All' || mineral.classification === selectedClass;

      const matchesSystem =
        selectedSystem === 'All' || mineral.crystalSystem === selectedSystem;

      return matchesSearch && matchesClass && matchesSystem;
    });
  }, [searchQuery, selectedClass, selectedSystem]);

  // Crystal system color helper
  const getSystemColor = (system: string) => {
    switch (system) {
      case 'Isometric':
        return 'text-[#F5B700] bg-[#F5B700]/15 border-[#F5B700]/40';
      case 'Tetragonal':
        return 'text-[#A78BFA] bg-[#A78BFA]/15 border-[#A78BFA]/40';
      case 'Hexagonal':
      case 'Trigonal':
        return 'text-[#34D399] bg-[#34D399]/15 border-[#34D399]/40';
      case 'Orthorhombic':
        return 'text-[#38BDF8] bg-[#38BDF8]/15 border-[#38BDF8]/40';
      case 'Monoclinic':
        return 'text-[#F472B6] bg-[#F472B6]/15 border-[#F472B6]/40';
      case 'Triclinic':
        return 'text-[#FB923C] bg-[#FB923C]/15 border-[#FB923C]/40';
      default:
        return 'text-[#00D2C4] bg-[#00D2C4]/15 border-[#00D2C4]/40';
    }
  };

  const handleLaunchMindatSearch = () => {
    const q = searchQuery.trim() || 'India';
    window.open(`https://www.mindat.org/search.php?search=${encodeURIComponent(q)}`, '_blank');
  };

  return (
    <section
      ref={sectionRef as any}
      id="mineral-strata"
      className={`relative w-full bg-[#081118] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-white overflow-hidden ${
        isEmbedded ? '' : 'border-y-2 border-[#00D2C4]/30 shadow-2xl'
      }`}
    >
      {/* Crystalline Cyan & Bismuth Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00D2C4]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[450px] h-[450px] rounded-full bg-[#3898D8]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Official Mindat Partner Branding */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <a
                href="https://www.mindat.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D2C4]/20 border border-[#00D2C4]/40 text-[#00E5D5] text-xs font-mono font-bold hover:bg-[#00D2C4]/30 transition-all cursor-pointer shadow-xs"
              >
                <Globe2 className="w-3.5 h-3.5 text-[#00E5D5]" />
                <span>POWERED BY MINDAT.ORG OPEN DATA</span>
                <ExternalLink className="w-3 h-3 text-[#00E5D5]/70" />
              </a>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white/80 border border-white/20 font-bold uppercase tracking-wider">
                STRATA 04 // MINERALOGY REPOSITORY
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-space text-white tracking-tight">
              Indian & Global Mineral Gallery
            </h2>
            <p className="text-sm text-white/70 max-w-2xl mt-2 font-sans leading-relaxed">
              Explore authenticated mineral species, crystallographic systems, chemical formulas, and world-renowned type localities from Maharashtra, Karnataka, and Rajasthan.
            </p>
          </div>

          {/* Direct Mindat Portal Link Badge */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <button
              onClick={handleLaunchMindatSearch}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00D2C4] to-[#00A896] hover:brightness-110 text-[#041217] text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#00D2C4]/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Search className="w-4 h-4 text-[#041217]" />
              <span>Query Mindat Database</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#041217]/70" />
            </button>
          </div>
        </div>

        {/* Nested Web: Mindat Live Query & Filter Terminal */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#0D1C26]/90 border border-[#00D2C4]/25 shadow-xl mb-10 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#00D2C4]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mineral, formula (e.g. SiO₂), or locality (e.g. Pune)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#081118] border border-[#00D2C4]/30 text-sm text-white placeholder-white/40 focus:border-[#00D2C4] focus:outline-none shadow-xs font-mono"
              />
            </div>

            {/* Classification Filters */}
            <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
              {['All', 'Zeolite & Silicate', 'Gemstone', 'Sulfide & Ore'].map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`text-xs font-mono px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                    selectedClass === cls
                      ? 'bg-[#00D2C4] text-[#05141A] font-bold border-[#00D2C4] shadow-md'
                      : 'bg-white/5 text-white/80 border-white/15 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Crystal System Filter Strip & Indian Locality Shortcuts */}
          <div className="pt-3 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-white/50 text-[11px] font-bold uppercase mr-1">CRYSTAL SYSTEM:</span>
              {['All', 'Isometric', 'Tetragonal', 'Hexagonal', 'Trigonal', 'Orthorhombic', 'Monoclinic', 'Triclinic'].map(
                (sys) => (
                  <button
                    key={sys}
                    onClick={() => setSelectedSystem(sys)}
                    className={`px-2.5 py-1 rounded-md text-[11px] border transition-all cursor-pointer ${
                      selectedSystem === sys
                        ? 'bg-white text-black font-bold border-white'
                        : 'bg-black/30 text-white/70 border-white/10 hover:text-white'
                    }`}
                  >
                    {sys}
                  </button>
                )
              )}
            </div>

            {/* Quick Locality Preset Chips */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="text-[#00D2C4] font-bold">TYPE LOCALITIES:</span>
              <button
                onClick={() => setSearchQuery('Pune')}
                className="px-2 py-0.5 rounded bg-[#00D2C4]/15 text-[#00E5D5] hover:bg-[#00D2C4]/30 cursor-pointer transition-colors"
              >
                #Pune Zeolites
              </button>
              <button
                onClick={() => setSearchQuery('Malanjkhand')}
                className="px-2 py-0.5 rounded bg-[#F5B700]/15 text-[#F5B700] hover:bg-[#F5B700]/30 cursor-pointer transition-colors"
              >
                #Malanjkhand Cu
              </button>
              <button
                onClick={() => setSearchQuery('Mysore')}
                className="px-2 py-0.5 rounded bg-[#F472B6]/15 text-[#F472B6] hover:bg-[#F472B6]/30 cursor-pointer transition-colors"
              >
                #Mysore Ruby
              </button>
            </div>
          </div>
        </div>

        {/* Single Layer of Moving Mineral Specimen Cards */}
        {filteredMinerals.length > 0 && (
          <CardsSlider
            items={filteredMinerals}
            accentColor="#00D2C4"
            theme="dark"
            autoSwipeIntervalMs={5000}
            renderCard={(mineral) => (
              <div
                key={mineral.id}
                onClick={() => setActiveMineral(mineral)}
                className="slide-card bg-[#0D1C26]/85 border border-[#00D2C4]/20 hover:border-[#00D2C4] rounded-2xl overflow-hidden group cursor-pointer flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-[#00D2C4]/20 transform hover:-translate-y-1 backdrop-blur-md h-full"
              >
                {/* Mineral Specimen Image Frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  <img
                    src={mineral.image}
                    alt={mineral.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1C26] via-transparent to-transparent opacity-90" />

                  {/* Top Badges: Mindat Record & Crystal System */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <a
                      href={mineral.mindatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 hover:bg-[#00D2C4] hover:text-black border border-[#00D2C4]/50 text-xs font-mono font-bold text-[#00E5D5] transition-colors shadow-md"
                      title={`Open Mindat Record min-${mineral.mindatId}`}
                    >
                      <span>Mindat #{mineral.mindatId}</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>

                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border backdrop-blur-md ${getSystemColor(
                        mineral.crystalSystem
                      )}`}
                    >
                      {mineral.crystalSystem}
                    </span>
                  </div>

                  {/* Chemical Formula Overlay at bottom of photo */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-black/85 text-[#00E5D5] border border-[#00D2C4]/40 font-bold backdrop-blur-md truncate max-w-[220px]">
                      {mineral.formula}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/20 text-white font-bold">
                      H: {mineral.hardness}
                    </span>
                  </div>
                </div>

                {/* Specimen Description & Locality Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-[#00D2C4] font-semibold uppercase mb-1">
                      {mineral.classification}
                    </div>

                    <h3 className="text-xl font-bold font-space text-white group-hover:text-[#00E5D5] transition-colors mb-1">
                      {mineral.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-white/60 mb-3 truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#00D2C4] flex-shrink-0" />
                      <span className="truncate">{mineral.locality}</span>
                    </div>

                    <p className="text-xs text-white/75 font-sans leading-relaxed line-clamp-2 mb-4">
                      {mineral.description}
                    </p>

                    {/* Paragenesis Pill Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {mineral.paragenesis.map((p, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70"
                        >
                          +{p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#00E5D5] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Inspect Dossier</span>
                      <span>→</span>
                    </span>

                    <a
                      href={mineral.mindatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-white/60 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>Mindat min-{mineral.mindatId}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          />
        )}

        {/* Empty state when query matches nothing */}
        {filteredMinerals.length === 0 && (
          <div className="text-center py-16 bg-[#0D1C26]/50 rounded-3xl border border-white/10">
            <Compass className="w-10 h-10 text-[#00D2C4] mx-auto mb-3 opacity-60 animate-spin" />
            <h3 className="text-lg font-space font-bold text-white mb-1">No mineral specimens matched</h3>
            <p className="text-xs font-mono text-white/60 max-w-sm mx-auto mb-4">
              Try searching with another element, crystal system, or click below to search Mindat.org's complete 300,000+ mineral catalog.
            </p>
            <button
              onClick={handleLaunchMindatSearch}
              className="px-4 py-2 rounded-xl bg-[#00D2C4] text-black font-mono font-bold text-xs"
            >
              Search "{searchQuery}" on Mindat.org ↗
            </button>
          </div>
        )}
      </div>

      {/* Interactive Mineral Specimen Dossier Modal (Nested Web Experience) */}
      {activeMineral && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0A1620] border-2 border-[#00D2C4]/50 rounded-3xl shadow-2xl p-6 sm:p-8 text-white">
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveMineral(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#00D2C4]/20 text-[#00E5D5] border border-[#00D2C4]/40 font-bold">
                MINDAT SPECIMEN DOSSIER
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-white/10 text-white/70">
                IMA STATUS: APPROVED SPECIES
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-space text-white mb-1">
              {activeMineral.name}
            </h2>
            <div className="text-xs font-mono text-[#00D2C4] mb-4">
              {activeMineral.varietyOrSubtype}
            </div>

            {/* Specimen Media & Crystallographic Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-black border border-white/10 relative">
                <img
                  src={activeMineral.image}
                  alt={activeMineral.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/80 font-mono text-[10px] text-[#00D2C4] border border-[#00D2C4]/30">
                  {activeMineral.formula}
                </div>
              </div>

              {/* Crystallographic Properties Table */}
              <div className="space-y-2 text-xs font-mono bg-[#071017] p-4 rounded-2xl border border-white/10">
                <div className="text-[11px] font-bold text-[#00D2C4] uppercase border-b border-white/10 pb-1 mb-2">
                  CRYSTALLOGRAPHIC DATA:
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/60">Crystal System:</span>
                  <span className="text-white font-bold">{activeMineral.crystalSystem}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/60">Space Group:</span>
                  <span className="text-white font-bold">{activeMineral.spaceGroup}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/60">Mohs Hardness:</span>
                  <span className="text-white font-bold">{activeMineral.hardness}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/60">Specific Gravity:</span>
                  <span className="text-white font-bold">{activeMineral.specificGravity}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/60">Luster:</span>
                  <span className="text-white font-bold">{activeMineral.luster}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/60">Streak:</span>
                  <span className="text-white font-bold">{activeMineral.streak}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-white/60">Cleavage:</span>
                  <span className="text-white font-bold">{activeMineral.cleavage}</span>
                </div>
              </div>
            </div>

            {/* Geological Locality & Paragenesis */}
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-xs font-mono text-[#00D2C4] uppercase font-bold mb-1">
                  TYPE LOCALITY & GEOLOGICAL PROVINCE:
                </h4>
                <div className="flex items-center gap-2 text-sm font-sans text-white/90">
                  <MapPin className="w-4 h-4 text-[#00D2C4] flex-shrink-0" />
                  <span>{activeMineral.locality} ({activeMineral.region})</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono text-[#00D2C4] uppercase font-bold mb-1">
                  PARAGENETIC ASSOCIATES IN MATRIX:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeMineral.paragenesis.map((p, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/10 text-white border border-white/15"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono text-[#00D2C4] uppercase font-bold mb-1">
                  MINERALOGICAL MONOGRAPH:
                </h4>
                <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
                  {activeMineral.description}
                </p>
              </div>
            </div>

            {/* Direct Mindat Action Buttons */}
            <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row gap-3">
              <a
                href={activeMineral.mindatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#00D2C4] hover:bg-[#00BAAD] text-[#05141A] font-bold font-mono text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>OPEN OFFICIAL MINDAT.ORG RECORD (min-{activeMineral.mindatId})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setActiveMineral(null)}
                className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs cursor-pointer transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
