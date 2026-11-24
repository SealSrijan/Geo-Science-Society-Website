import React, { useEffect, useState } from 'react';

export const FieldBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#FAF8F5]">
      {/* 1. Underlying Crisp Professional Ivory Canvas Texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FCFBF9] via-[#FAF8F5] to-[#F5F2EC]" />

      {/* 2. Top-Left Organic Layered Sage Strata Waves (Matched with example image) */}
      <svg
        className="absolute -top-12 -left-12 w-[480px] sm:w-[650px] lg:w-[800px] h-[340px] sm:h-[450px] opacity-75 will-change-transform"
        style={{ transform: `translateY(${-scrollY * 0.03}px)` }}
        viewBox="0 0 800 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-50,0 L0,220 C140,260 260,190 380,120 C500,50 620,60 720,0 Z"
          fill="#E5EDE3"
          opacity="0.8"
        />
        <path
          d="M-50,0 L0,160 C120,200 220,150 320,90 C420,30 520,35 600,0 Z"
          fill="#D6E4D3"
          opacity="0.85"
        />
        <path
          d="M-50,0 L0,100 C100,130 180,90 260,50 C330,15 420,20 480,0 Z"
          fill="#C4D7BF"
          opacity="0.9"
        />
      </svg>

      {/* 3. Bottom-Right Organic Layered Sage Strata Waves (Matched with example image) */}
      <svg
        className="absolute -bottom-10 -right-10 w-[520px] sm:w-[700px] lg:w-[850px] h-[360px] sm:h-[480px] opacity-75 will-change-transform"
        style={{ transform: `translateY(${-scrollY * 0.04}px)` }}
        viewBox="0 0 850 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M850,480 L180,480 C260,390 380,360 490,410 C600,460 710,380 850,260 Z"
          fill="#E4ECE2"
          opacity="0.75"
        />
        <path
          d="M850,480 L280,480 C360,400 460,380 560,430 C660,470 750,420 850,330 Z"
          fill="#D4E3D1"
          opacity="0.85"
        />
        <path
          d="M850,480 L420,480 C490,420 570,410 650,450 C730,480 790,450 850,390 Z"
          fill="#C2D6BE"
          opacity="0.9"
        />
      </svg>

      {/* 4. Top-Right Delicate Topographic Contour Waves */}
      <svg
        className="absolute top-0 right-0 w-[380px] sm:w-[500px] h-[320px] opacity-35"
        viewBox="0 0 500 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#3A5335" strokeWidth="1" strokeLinecap="round">
          <path d="M500,20 C420,20 360,60 300,40 C240,20 180,40 120,10 C80,-10 40,5 0,0" />
          <path d="M500,45 C430,45 370,85 310,65 C250,45 190,65 130,35 C90,15 50,30 0,25" />
          <path d="M500,75 C440,75 380,115 320,95 C260,75 200,95 140,65 C100,45 60,60 0,55" />
          <path d="M500,110 C445,110 390,150 330,130 C270,110 210,130 150,100 C110,80 70,95 0,90" />
          <path d="M500,150 C450,150 400,190 340,170 C280,150 220,170 160,140 C120,120 80,135 0,130" strokeDasharray="3 3" />
        </g>
      </svg>

      {/* 5. Bottom-Left Delicate Topographic Contour Waves */}
      <svg
        className="absolute bottom-6 left-0 w-[360px] sm:w-[460px] h-[280px] opacity-30"
        viewBox="0 0 460 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#3A5335" strokeWidth="1" strokeLinecap="round">
          <path d="M0,240 C70,240 120,200 180,220 C240,240 300,210 360,250 C400,270 440,250 480,260" />
          <path d="M0,210 C70,210 130,170 190,190 C250,210 310,180 370,220 C410,240 450,220 480,230" />
          <path d="M0,175 C80,175 140,135 200,155 C260,175 320,145 380,185 C420,205 450,190 480,195" />
          <path d="M0,140 C85,140 150,100 210,120 C270,140 330,110 390,150" strokeDasharray="3 3" />
        </g>
      </svg>

      {/* 6. Subtle Light Topographic Grid Parallax */}
      <svg
        className="absolute inset-0 w-full h-[130vh] opacity-[0.05] will-change-transform"
        style={{ transform: `translateY(${-scrollY * 0.05}px)` }}
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="lightCoordGrid" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#233A1F" strokeWidth="0.8" />
            <circle cx="120" cy="120" r="1.5" fill="#5B8A22" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="1440" height="900" fill="url(#lightCoordGrid)" />
      </svg>

      {/* 7. Soft Cursor Hover Glow for Desktop (Light Cerulean / Sage Tint) */}
      <div
        className="hidden md:block absolute w-[400px] h-[400px] rounded-full pointer-events-none transition-transform duration-100 ease-out will-change-transform"
        style={{
          transform: `translate(${mousePos.x - 200}px, ${mousePos.y - 200}px)`,
          background: 'radial-gradient(circle, rgba(91, 138, 34, 0.08) 0%, rgba(29, 111, 184, 0.04) 50%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* 8. Bottom Grounding Accent Bar (Exact feature from user's example image) */}
      <div className="fixed bottom-0 inset-x-0 h-1.5 z-50 flex pointer-events-none">
        <div className="flex-1 bg-[#182B1B]" />
        <div className="w-24 sm:w-48 bg-[#D97706]" />
      </div>
    </div>
  );
};
