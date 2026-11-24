import React from 'react';
import { X, MapPin, Camera, Layers, ShieldCheck } from 'lucide-react';
import type { GeoSpecimen } from '../data/gssData';

interface SpecimenLightboxModalProps {
  specimen: GeoSpecimen | null;
  onClose: () => void;
}

export const SpecimenLightboxModal: React.FC<SpecimenLightboxModalProps> = ({ specimen, onClose }) => {
  if (!specimen) return null;

  const copyCitation = () => {
    const citation = `Specimen: ${specimen.name}. Formation: ${specimen.formation}. Photographed by ${specimen.photographer} (${specimen.photographerAffiliation}). Curated by Geo-Science Society (GSS) National Petrographic Archive.`;
    navigator.clipboard.writeText(citation);
    alert('Academic citation copied to clipboard!');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={specimen.name}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl my-auto bg-white border border-[#2B4624]/20 rounded-3xl shadow-2xl glass-panel-elevated overflow-hidden text-[#111E13]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#2B4624]/15 bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase bg-[#82AC38]/20 text-[#2B4624] border border-[#82AC38]/40">
              {specimen.rockType}
            </span>
            <span className="text-xs font-mono text-[#3898D8] font-semibold">
              {specimen.imagingMethod}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyCitation}
              className="text-xs font-mono text-[#334437] hover:text-[#2B4624] px-3 py-1 rounded-lg border border-[#2B4624]/20 hover:border-[#82AC38] transition-colors hidden sm:block bg-white"
            >
              Cite Specimen
            </button>
            <button
              onClick={onClose}
              aria-label="Close lightbox"
              className="p-1.5 rounded-full bg-[#111E13]/5 hover:bg-[#82AC38]/20 text-[#111E13]/70 hover:text-[#111E13] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[80vh] overflow-y-auto">
          {/* Specimen Visual Left Panel */}
          <div className="lg:col-span-7 bg-[#141614] flex flex-col justify-center items-center relative p-4 group">
            <div className="relative w-full h-[320px] sm:h-[420px] rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
              <img
                src={specimen.image}
                alt={specimen.name}
                className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white flex items-center gap-2">
                <Camera className="w-3.5 h-3.5 text-[#82AC38]" />
                <span>Photo: {specimen.photographer} ({specimen.photographerAffiliation})</span>
              </div>
            </div>
            {specimen.specimenDimensions && (
              <div className="mt-2 text-[11px] font-mono text-white/60">
                DIMENSIONS: {specimen.specimenDimensions}
              </div>
            )}
          </div>

          {/* Scientific Metadata Right Panel */}
          <div className="lg:col-span-5 p-6 space-y-4 bg-[#FAF8F5]">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-space text-[#111E13] leading-tight">
                {specimen.name}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-[#2B4624] font-mono font-medium mt-1">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#82AC38]" />
                <span>{specimen.location}</span>
              </div>
            </div>

            {/* Geological Formation & Age */}
            <div className="p-3.5 rounded-xl bg-white border border-[#2B4624]/15 space-y-2 text-xs shadow-sm">
              <div>
                <div className="font-mono text-[10px] text-[#334437]/70 uppercase">Stratigraphic Unit</div>
                <div className="font-medium text-[#111E13]">{specimen.formation}</div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-[#2B4624]/10">
                <div>
                  <div className="font-mono text-[10px] text-[#334437]/70 uppercase">Geological Age</div>
                  <div className="text-[#3898D8] font-mono font-semibold">{specimen.stratigraphicAge}</div>
                </div>
              </div>
            </div>

            {/* Petrographic & Structural Texture */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#2B4624] font-bold uppercase mb-1">
                <Layers className="w-3.5 h-3.5 text-[#82AC38]" />
                <span>Structural & Petrographic Analysis</span>
              </div>
              <p className="text-xs text-[#334437] leading-relaxed font-sans">
                {specimen.petrographicNotes}
              </p>
            </div>

            {/* Modal Mineral Composition */}
            <div>
              <div className="text-xs font-mono text-[#334437]/70 uppercase mb-1.5 font-bold">
                Constituent Modal Mineralogy
              </div>
              <div className="flex flex-wrap gap-1.5">
                {specimen.mineralComposition.map((mineral) => (
                  <span
                    key={mineral}
                    className="px-2.5 py-1 rounded-md bg-[#F4F1EA] border border-[#2B4624]/20 text-xs font-mono text-[#2B4624] font-medium"
                  >
                    {mineral}
                  </span>
                ))}
              </div>
            </div>

            {/* Academic Copyright Retention Notice */}
            <div className="pt-3 border-t border-[#2B4624]/15">
              <div className="p-3 rounded-xl bg-white border border-[#2B4624]/15 text-[11px] text-[#334437] space-y-1 shadow-sm">
                <div className="flex items-center gap-1.5 font-mono text-[#2B4624] font-bold text-[10px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#82AC38]" />
                  <span>INTELLECTUAL PROPERTY & CITATION</span>
                </div>
                <p className="leading-snug">
                  © {specimen.photographer}. Retained under CC BY-NC 4.0. Preserved for collegiate teaching & academic reference in the Geo-Science Society National Specimen Archive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
