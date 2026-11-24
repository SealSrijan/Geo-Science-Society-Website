import React from 'react';
import { X, Clock, Eye, ExternalLink } from 'lucide-react';
import type { VideoShowcase } from '../data/gssData';

interface VideoModalProps {
  video: VideoShowcase | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white border border-[#2B4624]/20 rounded-3xl shadow-2xl glass-panel-elevated overflow-hidden text-[#111E13]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2B4624]/15 bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#82AC38] animate-pulse" />
            <span className="text-xs font-mono text-[#2B4624] font-bold tracking-wider uppercase">
              GSS TALK SHOW ARCHIVE · {video.topic}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close video player"
            className="p-1.5 rounded-full bg-[#111E13]/5 hover:bg-[#82AC38]/20 text-[#111E13]/70 hover:text-[#111E13] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Embed / Frame */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Video Details */}
        <div className="p-6 bg-[#FAF8F5]">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-space text-[#111E13]">
                {video.title}
              </h3>
              <p className="text-sm text-[#2B4624] font-medium mt-1">
                {video.speaker} · <span className="text-[#334437]">{video.affiliation}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F4F1EA] border border-[#2B4624]/20 text-xs font-mono text-[#111E13] font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#3898D8]" />
              </a>
            </div>
          </div>

          <p className="text-sm text-[#334437] leading-relaxed mb-4">
            {video.summary}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#2B4624]/15 text-xs font-mono text-[#334437]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#2B4624]" />
                {video.duration}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-[#3898D8]" />
                {video.views}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {video.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded bg-[#F4F1EA] border border-[#2B4624]/15 text-[11px] text-[#2B4624] font-medium"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
