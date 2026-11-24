import React from 'react';

interface StrataDividerProps {
  label?: string;
  depth?: string;
  className?: string;
}

export const StrataDivider: React.FC<StrataDividerProps> = ({
  label = 'STRATA BOUNDARY',
  depth = '-150m',
  className = '',
}) => {
  return (
    <div className={`relative w-full py-6 flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Background Geological Strata Line */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#5B8A22]/35 to-transparent" />

      {/* SVG Strata Undulation */}
      <svg
        className="w-full h-8 opacity-45 max-w-7xl mx-auto"
        viewBox="0 0 1200 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 16 Q 150 4, 300 16 T 600 16 T 900 16 T 1200 16"
          stroke="#1D6FB8"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
        <path
          d="M0 22 Q 200 12, 450 22 T 800 22 T 1200 22"
          stroke="#5B8A22"
          strokeWidth="1"
        />
      </svg>

      {/* Monospace Geological Label Pill */}
      <div className="absolute z-10 px-3 py-1 rounded-full bg-white/95 border border-[#233A1F]/15 backdrop-blur-md text-[10px] font-mono tracking-widest text-[#233A1F] flex items-center gap-2 shadow-sm font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-[#5B8A22]" />
        <span>{label}</span>
        <span className="text-[#1D6FB8] font-bold">{depth}</span>
      </div>
    </div>
  );
};
