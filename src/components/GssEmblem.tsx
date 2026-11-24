import React from 'react';

interface GssEmblemProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showAura?: boolean;
  showPhotoToggle?: boolean;
}

export const GssEmblem: React.FC<GssEmblemProps> = ({
  size = 'md',
  className = '',
  showAura = true,
}) => {
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72',
    xl: 'w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96',
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none group ${className}`}>
      {/* Subtle Geological Radial Aura */}
      {showAura && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#82AC38]/30 via-[#3898D8]/20 to-[#2B4624]/20 blur-xl transform group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
      )}

      {/* Primary Emblem Container with Original Provided Logo */}
      <div
        className={`relative rounded-full overflow-hidden border-2 border-[#2B4624]/30 shadow-xl bg-[#FAF8F5] transition-transform duration-500 group-hover:scale-102 ${sizeClasses[size]}`}
      >
        <img
          src="/images/gss-logo.jpg"
          alt="Geo-Science Society (GSS) Official Crest"
          className="w-full h-full object-cover"
          loading="eager"
        />

        {/* Subtle glass reflection sheen overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/25 pointer-events-none" />
      </div>
    </div>
  );
};
