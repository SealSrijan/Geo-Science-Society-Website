import React from 'react';
import { X, Clock, Calendar, User } from 'lucide-react';
import type { Article } from '../data/gssData';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-8 bg-white/95 border border-[#2B4624]/20 rounded-3xl shadow-2xl glass-panel-elevated overflow-hidden text-[#111E13]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close article"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-[#82AC38]/80 text-white transition-colors cursor-pointer border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#82AC38] text-[#141614] shadow">
              {article.category}
            </span>
            <h2 className="text-xl sm:text-3xl font-bold font-space text-white mt-2 drop-shadow-md">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Article Meta Bar */}
        <div className="px-6 py-3.5 bg-[#FAF8F5] border-y border-[#2B4624]/15 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#334437]">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-[#2B4624]" />
            <span className="font-medium text-[#111E13]">{article.author}</span> · <span>{article.authorRole} ({article.authorInstitution})</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#2B4624]" />
              Updated {article.lastUpdated}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#3898D8]" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Article Content */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[50vh] overflow-y-auto">
          {article.content.map((paragraph, index) => (
            <p
              key={index}
              className="text-sm sm:text-base text-[#111E13] leading-relaxed font-sans"
            >
              {paragraph}
            </p>
          ))}

          <div className="pt-6 border-t border-[#2B4624]/10 flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-md bg-[#F4F1EA] border border-[#2B4624]/15 text-xs font-mono text-[#2B4624] font-medium"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
