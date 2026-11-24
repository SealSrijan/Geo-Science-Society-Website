import React, { useState } from 'react';
import { COLLEGE_CHAPTERS, MEMBER_STORIES } from '../data/gssData';
import { StrataDivider } from '../components/StrataDivider';
import {
  School,
  Search,
  MapPin,
  Users,
  Sparkles,
  Award,
  CheckCircle2,
} from 'lucide-react';

interface CommunityViewProps {
  onOpenJoin: () => void;
  selectedCollegeId?: string;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ onOpenJoin, selectedCollegeId }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCollege, setActiveCollege] = useState<string | null>(selectedCollegeId || null);

  // Chapter application form state
  const [chapterCollege, setChapterCollege] = useState('');
  const [chapterCity, setChapterCity] = useState('');
  const [facultyAdvisor, setFacultyAdvisor] = useState('');
  const [leadStudent, setLeadStudent] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [appSubmitted, setAppSubmitted] = useState(false);

  const filteredColleges = COLLEGE_CHAPTERS.filter((college) => {
    const matchesRegion = selectedRegion === 'All' || college.region === selectedRegion;
    const matchesSearch =
      college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const handleChapterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chapterCollege || !leadStudent || !leadEmail) return;
    setAppSubmitted(true);
    setTimeout(() => {
      setAppSubmitted(false);
      setChapterCollege('');
      setChapterCity('');
      setFacultyAdvisor('');
      setLeadStudent('');
      setLeadEmail('');
    }, 5000);
  };

  return (
    <div className="relative pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3E7] border border-[#5B8A22]/30 text-[#3D6314] text-xs font-mono mb-3 font-semibold">
          <School className="w-3.5 h-3.5" />
          <span>PAN-INDIA COLLEGIATE DIRECTORY</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-space text-[#111E13] tracking-tight leading-tight">
          100+ Geological Departments, One Federation
        </h1>
        <p className="text-base sm:text-lg text-[#334437] mt-3 font-sans leading-relaxed">
          Explore recognized student chapters, campus ambassadors, and regional petrology study circles across India.
        </p>
      </div>

      {/* Directory Search & Filter Controls */}
      <div className="glass-panel p-4 sm:p-6 rounded-3xl mb-10 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#526556]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search college, city, state, or research focus..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#233A1F]/20 text-sm text-[#111E13] placeholder-[#526556]/60 focus:border-[#4E761C] focus:outline-none shadow-xs"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {['All', 'North', 'South', 'East', 'West', 'North-East'].map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  selectedRegion === region
                    ? 'bg-[#5B8A22] text-white font-bold border-[#5B8A22] shadow-xs'
                    : 'bg-white text-[#2D3E30] border-[#233A1F]/15 hover:text-[#111E13]'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs font-mono text-[#526556] flex items-center justify-between pt-1">
          <span>Showing {filteredColleges.length} recognized departmental chapters</span>
          <span className="text-[#3D6314] font-bold">Status: All Active & Verified</span>
        </div>
      </div>

      {/* College Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {filteredColleges.map((col) => (
          <div
            key={col.id}
            onClick={() => setActiveCollege(col.id)}
            className={`glass-card-interactive rounded-3xl p-6 flex flex-col justify-between group cursor-pointer ${
              activeCollege === col.id ? 'border-[#4E761C] bg-[#EBF3E7]/60' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#1D6FB8]/10 text-[#1D6FB8] border border-[#1D6FB8]/25 font-bold">
                  {col.region} Zone
                </span>
                <span className="text-[11px] font-mono text-[#526556]">
                  Est. {col.establishedYear}
                </span>
              </div>

              <h3 className="text-xl font-bold font-space text-[#111E13] group-hover:text-[#4E761C] transition-colors leading-snug">
                {col.name}
              </h3>
              <div className="text-xs font-mono text-[#526556] mt-0.5 mb-3">
                {col.university}
              </div>

              <div className="space-y-1 text-xs font-mono text-[#334437] mb-4 p-2.5 rounded-xl bg-[#FAF8F5] border border-[#233A1F]/10">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#5B8A22]" />
                  <span>{col.city}, {col.state}</span>
                </div>
                <div className="text-[10px] text-[#1D6FB8] pl-5 font-semibold">
                  {col.coordinates}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-[10px] font-mono text-[#526556] uppercase font-bold mb-1">
                  Departmental Research Focus
                </div>
                <div className="text-xs text-[#405244] font-sans leading-relaxed">
                  {col.specialization}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#233A1F]/10 flex items-center justify-between text-xs font-mono">
              <div className="truncate pr-2">
                <span className="text-[#3D6314] font-bold">Lead: </span>
                <span className="text-[#141E15] font-semibold">{col.chapterLead}</span>
              </div>
              <div className="flex items-center gap-1 text-[#1D6FB8] font-bold flex-shrink-0">
                <Users className="w-3.5 h-3.5" />
                <span>{col.membersCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <StrataDivider label="STUDENT VOICES" depth="TESTIMONIALS" />

      {/* Member Stories & Testimonials */}
      <div className="my-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3E7] border border-[#5B8A22]/30 text-[#3D6314] text-xs font-mono mb-2 font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>MEMBER IMPACT STORIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-space text-[#111E13]">
            From Students to Geoscientists
          </h2>
          <p className="text-sm text-[#405244] mt-1">
            How the GSS federation propels research careers, GATE ranks, and field expeditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MEMBER_STORIES.map((story) => (
            <div
              key={story.id}
              className="glass-panel-elevated p-6 sm:p-8 rounded-3xl flex flex-col justify-between border border-[#233A1F]/15 hover:border-[#5B8A22]/40 transition-colors"
            >
              <div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#EBF3E7] text-[#3D6314] border border-[#5B8A22]/30 font-bold mb-4 inline-block">
                  {story.badge}
                </span>
                <p className="text-sm text-[#233A1F] italic font-sans leading-relaxed mb-6">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#233A1F]/15 flex items-center gap-3">
                <img
                  src={story.avatar}
                  alt={story.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#5B8A22]"
                />
                <div>
                  <div className="font-space font-bold text-sm text-[#111E13]">
                    {story.name}
                  </div>
                  <div className="text-xs font-mono text-[#526556]">
                    {story.college}
                  </div>
                  <div className="text-[11px] text-[#1D6FB8] font-mono mt-0.5 font-bold">
                    {story.outcome}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <StrataDivider label="CHAPTER FOUNDING FORM" depth="APPLICATION" />

      {/* Embedded "Start a GSS Chapter at Your College" Form */}
      <div className="glass-panel-elevated p-6 sm:p-10 rounded-3xl max-w-3xl mx-auto my-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3E7] border border-[#5B8A22]/30 text-[#3D6314] text-xs font-mono mb-2 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INSTITUTIONAL ACCREDITATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-space text-[#111E13]">
            Start a GSS Student Chapter at Your College
          </h2>
          <p className="text-xs sm:text-sm text-[#405244] mt-1 max-w-lg mx-auto">
            Receive official GSS charter banners, free webinar broadcasting kits, travel grants for Geogenesis, and access to national specimen databases.
          </p>
        </div>

        {appSubmitted ? (
          <div className="py-12 text-center space-y-4 animate-fade-in">
            <div className="inline-flex p-3 rounded-full bg-[#EBF3E7] text-[#3D6314]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold font-space text-[#111E13]">
              Chapter Application Dispatched!
            </h3>
            <p className="text-sm text-[#334437] max-w-md mx-auto font-sans">
              Thank you, <strong className="text-[#3D6314]">{leadStudent}</strong>. The GSS National Steering Committee has received your charter request for <strong className="text-[#1D6FB8]">{chapterCollege}</strong>. We will contact your faculty advisor within 3 business days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleChapterSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1.5">
                  COLLEGE / UNIVERSITY NAME *
                </label>
                <input
                  type="text"
                  required
                  value={chapterCollege}
                  onChange={(e) => setChapterCollege(e.target.value)}
                  placeholder="e.g. Aligarh Muslim University"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#233A1F]/20 text-sm text-[#111E13] focus:border-[#4E761C] focus:outline-none shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1.5">
                  CITY & STATE *
                </label>
                <input
                  type="text"
                  required
                  value={chapterCity}
                  onChange={(e) => setChapterCity(e.target.value)}
                  placeholder="e.g. Aligarh, Uttar Pradesh"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#233A1F]/20 text-sm text-[#111E13] focus:border-[#4E761C] focus:outline-none shadow-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1.5">
                  STUDENT CHAPTER LEAD NAME *
                </label>
                <input
                  type="text"
                  required
                  value={leadStudent}
                  onChange={(e) => setLeadStudent(e.target.value)}
                  placeholder="e.g. Farhan Akhtar"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#233A1F]/20 text-sm text-[#111E13] focus:border-[#4E761C] focus:outline-none shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1.5">
                  STUDENT LEAD EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder="e.g. farhan@amu.ac.in"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#233A1F]/20 text-sm text-[#111E13] focus:border-[#4E761C] focus:outline-none shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#2D3E30] font-semibold mb-1.5">
                FACULTY ADVISOR NAME & DESIGNATION
              </label>
              <input
                type="text"
                value={facultyAdvisor}
                onChange={(e) => setFacultyAdvisor(e.target.value)}
                placeholder="e.g. Prof. M. K. Hashmi, Professor of Sedimentology"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#233A1F]/20 text-sm text-[#111E13] focus:border-[#4E761C] focus:outline-none shadow-xs"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 py-3.5 px-6 rounded-2xl bg-[#5B8A22] hover:bg-[#4E761C] text-white font-bold font-space text-sm tracking-wide shadow-md cursor-pointer transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <School className="w-4 h-4" />
                <span>SUBMIT CHAPTER AFFILIATION DOSSIER</span>
              </button>

              <button
                type="button"
                onClick={onOpenJoin}
                className="py-3.5 px-6 rounded-2xl bg-white hover:bg-[#FAF8F5] text-[#141E15] font-space text-sm border border-[#233A1F]/20 cursor-pointer shadow-xs"
              >
                Join as Individual Student
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
