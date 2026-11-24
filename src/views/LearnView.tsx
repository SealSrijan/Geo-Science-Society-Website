import React, { useState } from 'react';
import { GEO_SPECIMENS, ARTICLES } from '../data/gssData';
import type { GeoSpecimen, Article } from '../data/gssData';
import {
  Gem,
  Camera,
  MapPin,
  Layers,
  FileText,
  Clock,
  ArrowRight,
  Sparkles,
  Upload,
  CheckCircle2,
  Search,
} from 'lucide-react';

interface LearnViewProps {
  onOpenSpecimen: (specimen: GeoSpecimen) => void;
  onOpenArticle: (article: Article) => void;
  selectedItemId?: string;
}

export const LearnView: React.FC<LearnViewProps> = ({
  onOpenSpecimen,
  onOpenArticle,
  selectedItemId,
}) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'articles'>('gallery');
  const [selectedRockType, setSelectedRockType] = useState<string>('All');
  const [selectedMethod, setSelectedMethod] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [specimenSubmitted, setSpecimenSubmitted] = useState(false);

  const photoOfMonth = GEO_SPECIMENS.find((s) => s.isPhotoOfMonth) || GEO_SPECIMENS[0];

  const filteredSpecimens = GEO_SPECIMENS.filter((spec) => {
    const matchesType = selectedRockType === 'All' || spec.rockType === selectedRockType;
    const matchesMethod = selectedMethod === 'All' || spec.imagingMethod.includes(selectedMethod);
    const matchesSearch =
      spec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spec.formation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spec.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spec.structure.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesMethod && matchesSearch;
  });

  return (
    <div className="relative pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* View Switcher Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3E7] border border-[#5B8A22]/30 text-[#3D6314] text-xs font-mono mb-3 font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>NATIONAL ARCHIVES & STUDENT SCHOLARSHIP</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-space text-[#111E13] tracking-tight leading-tight">
          Geo Gallery & Field Research Library
        </h1>
        <p className="text-base sm:text-lg text-[#334437] mt-3 font-sans leading-relaxed">
          High-resolution petrographic thin-sections, field outcrops, and student-authored technical field notes.
        </p>

        {/* Tab Toggle */}
        <div className="mt-8 inline-flex p-1 rounded-2xl bg-white border border-[#233A1F]/15 shadow-sm">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-space font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'gallery'
                ? 'bg-[#5B8A22] text-white shadow-xs'
                : 'text-[#2D3E30] hover:text-[#111E13]'
            }`}
          >
            <Gem className="w-4 h-4" />
            <span>Geo Gallery (FocalPlane)</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-space font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'articles'
                ? 'bg-[#5B8A22] text-white shadow-xs'
                : 'text-[#2D3E30] hover:text-[#111E13]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Articles & Field Notes ({ARTICLES.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'gallery' ? (
        <div>
          {/* FEATURED PHOTO OF THE MONTH */}
          <div className="relative rounded-3xl overflow-hidden glass-panel-elevated border-2 border-[#5B8A22]/35 mb-14 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div
                className="lg:col-span-7 h-[300px] sm:h-[400px] lg:h-[450px] relative overflow-hidden bg-black group cursor-pointer"
                onClick={() => onOpenSpecimen(photoOfMonth)}
              >
                <img
                  src={photoOfMonth.image}
                  alt={photoOfMonth.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#5B8A22] text-white font-bold font-mono text-xs flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>PHOTO OF THE MONTH · CURATED</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
                  <span className="flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-[#82AC38]" />
                    {photoOfMonth.photographer} ({photoOfMonth.photographerAffiliation})
                  </span>
                  <span className="text-[#82AC38] bg-black/60 px-2 py-0.5 rounded font-bold">Click to Zoom Lightbox</span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#EBF3E7] text-[#3D6314] border border-[#5B8A22]/30 font-bold">
                  {photoOfMonth.rockType} · {photoOfMonth.imagingMethod}
                </span>

                <h2 className="text-2xl sm:text-3xl font-bold font-space text-[#111E13] leading-tight">
                  {photoOfMonth.name}
                </h2>

                <div className="text-xs font-mono text-[#3D6314] flex items-center gap-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{photoOfMonth.location}</span>
                </div>

                <div className="text-xs text-[#1D6FB8] font-mono font-semibold">
                  {photoOfMonth.formation} · {photoOfMonth.stratigraphicAge}
                </div>

                <p className="text-xs sm:text-sm text-[#405244] font-sans leading-relaxed">
                  {photoOfMonth.petrographicNotes}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => onOpenSpecimen(photoOfMonth)}
                    className="px-5 py-2.5 rounded-xl bg-[#5B8A22] hover:bg-[#4E761C] text-white font-bold font-space text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span>View Petrographic Lightbox</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="glass-panel p-4 sm:p-6 rounded-3xl mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
                {['All', 'Igneous', 'Metamorphic', 'Sedimentary', 'Mineral', 'Fossil'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedRockType(type)}
                    className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                      selectedRockType === type
                        ? 'bg-[#5B8A22] text-white font-bold border-[#5B8A22] shadow-xs'
                        : 'bg-white text-[#2D3E30] border-[#233A1F]/15 hover:text-[#111E13]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {['All', 'Thin Section (XPL)', 'Macro', 'Outcrop'].map((method) => (
                  <button
                    key={method}
                    onClick={() => setSelectedMethod(method)}
                    className={`text-xs font-mono px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                      selectedMethod === method
                        ? 'bg-[#1D6FB8] text-white font-bold border-[#1D6FB8] shadow-xs'
                        : 'bg-white text-[#526556] border-[#233A1F]/15 hover:text-[#111E13]'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-64">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#526556]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter specimens..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-[#233A1F]/20 text-xs text-[#111E13] focus:border-[#4E761C] focus:outline-none shadow-xs"
                />
              </div>

              <button
                onClick={() => setShowSubmitModal(true)}
                className="w-full lg:w-auto px-4 py-2 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#5B8A22]/40 text-xs font-mono text-[#3D6314] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Submit Thin-Section</span>
              </button>
            </div>
          </div>

          {/* Specimens Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {filteredSpecimens.map((specimen) => (
              <div
                key={specimen.id}
                onClick={() => onOpenSpecimen(specimen)}
                className={`glass-card-interactive rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between ${
                  selectedItemId === specimen.id ? 'border-[#4E761C] bg-[#EBF3E7]/50' : ''
                }`}
              >
                <div className="relative aspect-[4/3] w-full bg-black overflow-hidden">
                  <img
                    src={specimen.image}
                    alt={specimen.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 border border-white/20 text-[#82AC38] font-bold">
                    {specimen.rockType}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 text-[10px] font-mono text-white/90 truncate">
                    {specimen.imagingMethod}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold font-space text-[#111E13] group-hover:text-[#4E761C] transition-colors leading-snug line-clamp-2 mb-1">
                      {specimen.name}
                    </h3>
                    <div className="text-[11px] font-mono text-[#526556] line-clamp-1 mb-2 font-medium">
                      {specimen.formation}
                    </div>
                    <div className="text-xs text-[#405244] line-clamp-2 font-sans">
                      {specimen.structure}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#233A1F]/10 flex items-center justify-between text-[11px] font-mono text-[#526556] mt-3">
                    <span className="truncate">{specimen.photographer}</span>
                    <span className="text-[#1D6FB8] font-bold">Inspect →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ARTICLES & FIELD NOTES WING */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {ARTICLES.map((article) => (
              <div
                key={article.id}
                onClick={() => onOpenArticle(article)}
                className="glass-card-interactive rounded-3xl overflow-hidden cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative h-48 sm:h-56 w-full bg-black overflow-hidden">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#EBF3E7] text-[#3D6314] border border-[#5B8A22]/30">
                      {article.category}
                    </span>
                    <span className="text-xs font-mono text-white/90 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#1D6FB8]" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-space text-[#111E13] group-hover:text-[#4E761C] transition-colors leading-snug mb-2">
                      {article.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#405244] font-sans leading-relaxed mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#233A1F]/10 flex items-center justify-between text-xs font-mono text-[#526556]">
                    <span className="truncate">By {article.author} ({article.authorInstitution})</span>
                    <span className="text-[#3D6314] font-bold">Read Field Note →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Submit Your Specimen */}
      {showSubmitModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Submit Specimen to National Archive"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
          onClick={() => setShowSubmitModal(false)}
        >
          <div
            className="w-full max-w-lg bg-white border border-[#233A1F]/20 rounded-3xl p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold font-space text-[#111E13] mb-1">
              Submit Specimen to National Archive
            </h3>
            <p className="text-xs text-[#526556] mb-4 font-sans">
              Share your petrographic thin-section micrographs or geological outcrop shots with collegiate scholars across India. Full attribution guaranteed.
            </p>

            {specimenSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#5B8A22] mx-auto" />
                <h4 className="text-lg font-bold font-space text-[#111E13]">
                  Specimen Transmission Received!
                </h4>
                <p className="text-xs text-[#405244] font-sans">
                  The GSS Petrology Curation Board will review your micrograph and notify you within 48 hours.
                </p>
                <button
                  onClick={() => {
                    setSpecimenSubmitted(false);
                    setShowSubmitModal(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#5B8A22] text-white font-bold text-xs font-space shadow-xs"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSpecimenSubmitted(true);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1">
                    SPECIMEN / ROCK FORMATION NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sillimanite-Garnet Gneiss (Khondalite)"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#233A1F]/20 text-sm text-[#111E13] focus:border-[#4E761C] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1">
                      ROCK TYPE *
                    </label>
                    <select className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#233A1F]/20 text-xs text-[#111E13] focus:border-[#4E761C] focus:outline-none">
                      <option>Metamorphic</option>
                      <option>Igneous</option>
                      <option>Sedimentary</option>
                      <option>Mineral</option>
                      <option>Fossil</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1">
                      IMAGING METHOD *
                    </label>
                    <select className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#233A1F]/20 text-xs text-[#111E13] focus:border-[#4E761C] focus:outline-none">
                      <option>Petrographic Thin Section (XPL)</option>
                      <option>Petrographic Thin Section (PPL)</option>
                      <option>Hand Specimen Macro</option>
                      <option>Field Outcrop</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1">
                    PHOTOGRAPHER NAME & COLLEGE *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Debasish Sen, Presidency University"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#233A1F]/20 text-sm text-[#111E13] focus:border-[#4E761C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1">
                    PETROGRAPHIC / FIELD NOTES
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe mineral textures, pleochroic halos, twinning, or outcrop scale..."
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#233A1F]/20 text-xs text-[#111E13] focus:border-[#4E761C] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-mono text-[#526556] hover:text-[#111E13]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#5B8A22] hover:bg-[#4E761C] text-white font-bold text-xs font-space shadow-md"
                  >
                    Submit Specimen Dossier
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
