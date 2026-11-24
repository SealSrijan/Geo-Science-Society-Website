export interface CollegeChapter {
  id: string;
  name: string;
  university: string;
  city: string;
  state: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'North-East';
  establishedYear: number;
  membersCount: number;
  chapterLead: string;
  leadRole: string;
  specialization: string;
  coordinates: string;
  verified: boolean;
}

export interface GssEvent {
  id: string;
  title: string;
  tagline: string;
  date: string;
  displayDate: string;
  time: string;
  mode: 'Hybrid' | 'Virtual' | 'Field Expedition' | 'On-Campus';
  location: string;
  category: 'Annual Flagship' | 'Talk Show' | 'Field Workshop' | 'Competition' | 'Masterclass';
  description: string;
  tags: string[];
  seatsLeft?: number;
  status: 'Open' | 'Filling Fast' | 'Few Seats Left' | 'Completed';
  speaker?: {
    name: string;
    designation: string;
    organization: string;
    avatar: string;
  };
  googleCalendarUrl: string;
}

export interface VideoShowcase {
  id: string;
  title: string;
  speaker: string;
  affiliation: string;
  duration: string;
  views: string;
  topic: string;
  youtubeId: string;
  thumbnail: string;
  tags: string[];
  summary: string;
}

export interface PortfolioAchievement {
  id: string;
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
  category: string;
  image: string;
  highlightStats: { label: string; value: string }[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Membership' | 'Chapters' | 'Events & Workshops' | 'Submissions & Research' | 'Partnerships';
  rockName: string;
  mineralInside: string;
  mohsHardness: string;
  chemicalFormula: string;
  crystalSystem: string;
  gemColor: string;
  quarryDepth: string;
}

export interface GeoSpecimen {
  id: string;
  name: string;
  rockType: 'Igneous' | 'Metamorphic' | 'Sedimentary' | 'Mineral' | 'Fossil';
  structure: string;
  formation: string;
  location: string;
  stratigraphicAge: string;
  imagingMethod: 'Petrographic Thin Section (XPL)' | 'Hand Specimen Macro' | 'Field Outcrop' | 'PPL Micrograph';
  image: string;
  photographer: string;
  photographerAffiliation: string;
  petrographicNotes: string;
  mineralComposition: string[];
  specimenDimensions?: string;
  isPhotoOfMonth?: boolean;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  author: string;
  authorRole: string;
  authorInstitution: string;
  readTime: string;
  lastUpdated: string;
  category: 'Field Methodology' | 'Petrology' | 'Tectonics' | 'Career Guide';
  tags: string[];
  coverImage: string;
}

export interface LeaderBio {
  id: string;
  name: string;
  role: string;
  tenure: string;
  institution: string;
  location: string;
  bio: string;
  avatar: string;
  specialization: string;
  social: {
    linkedin?: string;
    email?: string;
    researchgate?: string;
  };
}

export interface MemberStory {
  id: string;
  name: string;
  college: string;
  batch: string;
  quote: string;
  outcome: string;
  avatar: string;
  badge: string;
}

/* -------------------------------------------------------------
   1. COLLEGES & CHAPTERS (14 Indian Institutions)
------------------------------------------------------------- */
export const COLLEGE_CHAPTERS: CollegeChapter[] = [
  {
    id: 'presidency-kolkata',
    name: 'Presidency University',
    university: 'Department of Geology',
    city: 'Kolkata',
    state: 'West Bengal',
    region: 'East',
    establishedYear: 2021,
    membersCount: 142,
    chapterLead: 'Arpan Mukherjee',
    leadRole: 'President, GSS Chapter',
    specialization: 'Precambrian Tectonics & Structural Petrology',
    coordinates: '22.5739° N, 88.3639° E',
    verified: true,
  },
  {
    id: 'iit-kharagpur',
    name: 'IIT Kharagpur',
    university: 'Dept. of Geology & Geophysics',
    city: 'Kharagpur',
    state: 'West Bengal',
    region: 'East',
    establishedYear: 2022,
    membersCount: 185,
    chapterLead: 'Debolina Sengupta',
    leadRole: 'Campus Ambassador',
    specialization: 'Seismic Inversion & Exploration Geophysics',
    coordinates: '22.3149° N, 87.3105° E',
    verified: true,
  },
  {
    id: 'bhu-varanasi',
    name: 'Banaras Hindu University (BHU)',
    university: 'Centre of Advanced Study in Geology',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    region: 'North',
    establishedYear: 2021,
    membersCount: 160,
    chapterLead: 'Priyanshu Tripathi',
    leadRole: 'Chapter Coordinator',
    specialization: 'Sedimentology & Stratigraphic Correlation',
    coordinates: '25.2677° N, 82.9913° E',
    verified: true,
  },
  {
    id: 'du-hansraj',
    name: 'Hansraj College, University of Delhi',
    university: 'Department of Geology',
    city: 'New Delhi',
    state: 'Delhi',
    region: 'North',
    establishedYear: 2022,
    membersCount: 118,
    chapterLead: 'Ananya Sharma',
    leadRole: 'Chapter Lead',
    specialization: 'Himalayan Orogeny & Hydrogeology',
    coordinates: '28.6872° N, 77.2104° E',
    verified: true,
  },
  {
    id: 'iit-bombay',
    name: 'IIT Bombay',
    university: 'Department of Earth Sciences',
    city: 'Mumbai',
    state: 'Maharashtra',
    region: 'West',
    establishedYear: 2022,
    membersCount: 135,
    chapterLead: 'Rohan Kulkarni',
    leadRole: 'Geophysics Lead',
    specialization: 'Deccan Volcanology & Igneous Petrogenesis',
    coordinates: '19.1334° N, 72.9133° E',
    verified: true,
  },
  {
    id: 'jadavpur-univ',
    name: 'Jadavpur University',
    university: 'Department of Geological Sciences',
    city: 'Kolkata',
    state: 'West Bengal',
    region: 'East',
    establishedYear: 2021,
    membersCount: 154,
    chapterLead: 'Souvik Bhattacharya',
    leadRole: 'Field Rep',
    specialization: 'Metamorphic Facies & Geochemistry',
    coordinates: '22.4996° N, 88.3716° E',
    verified: true,
  },
  {
    id: 'anna-univ',
    name: 'Anna University',
    university: 'Division of Applied Geology',
    city: 'Chennai',
    state: 'Tamil Nadu',
    region: 'South',
    establishedYear: 2023,
    membersCount: 95,
    chapterLead: 'M. Vigneshwaran',
    leadRole: 'Southern Regional Rep',
    specialization: 'Remote Sensing, GIS & Marine Coastal Geomorphology',
    coordinates: '13.0109° N, 80.2354° E',
    verified: true,
  },
  {
    id: 'osmania-univ',
    name: 'Osmania University',
    university: 'Department of Applied Geochemistry & Geology',
    city: 'Hyderabad',
    state: 'Telangana',
    region: 'South',
    establishedYear: 2022,
    membersCount: 110,
    chapterLead: 'K. Sravan Kumar',
    leadRole: 'Chapter Convener',
    specialization: 'Economic Mineral Deposits & Dharwar Craton Studies',
    coordinates: '17.4138° N, 78.5284° E',
    verified: true,
  },
  {
    id: 'fergusson-pune',
    name: 'Fergusson College (SPPU)',
    university: 'Department of Geology',
    city: 'Pune',
    state: 'Maharashtra',
    region: 'West',
    establishedYear: 2021,
    membersCount: 125,
    chapterLead: 'Tanvi Deshmukh',
    leadRole: 'Outreach Lead',
    specialization: 'Basaltic Flow Morphology & Micropalaeontology',
    coordinates: '18.5222° N, 73.8398° E',
    verified: true,
  },
  {
    id: 'gauhati-univ',
    name: 'Gauhati University',
    university: 'Department of Geological Sciences',
    city: 'Guwahati',
    state: 'Assam',
    region: 'North-East',
    establishedYear: 2023,
    membersCount: 88,
    chapterLead: 'Bidisha Saikia',
    leadRole: 'NE Zone Coordinator',
    specialization: 'Shillong Plateau Tectonics & Assam Basin Stratigraphy',
    coordinates: '26.1557° N, 91.6627° E',
    verified: true,
  },
  {
    id: 'st-xaviers-mumbai',
    name: "St. Xavier's College",
    university: 'Department of Geology',
    city: 'Mumbai',
    state: 'Maharashtra',
    region: 'West',
    establishedYear: 2022,
    membersCount: 98,
    chapterLead: 'Aarav Merchant',
    leadRole: 'Curation Head',
    specialization: 'Gemology, Mineralogy & Paleoclimatology',
    coordinates: '18.9431° N, 72.8315° E',
    verified: true,
  },
  {
    id: 'panjab-univ',
    name: 'Panjab University',
    university: 'Centre of Advanced Study in Geology',
    city: 'Chandigarh',
    state: 'Chandigarh',
    region: 'North',
    establishedYear: 2023,
    membersCount: 82,
    chapterLead: 'Harjot Singh',
    leadRole: 'Workshop Coordinator',
    specialization: 'Siwalik Vertebrate Palaeontology & Glaciology',
    coordinates: '30.7601° N, 76.7681° E',
    verified: true,
  },
  {
    id: 'iiser-kolkata',
    name: 'IISER Kolkata',
    university: 'Dept. of Earth Sciences (DES)',
    city: 'Mohanpur',
    state: 'West Bengal',
    region: 'East',
    establishedYear: 2022,
    membersCount: 115,
    chapterLead: 'Rituparna Ghosh',
    leadRole: 'Academic Liaison',
    specialization: 'Biogeochemistry & Deep Mantle Dynamics',
    coordinates: '22.9622° N, 88.5276° E',
    verified: true,
  },
  {
    id: 'mlsu-udaipur',
    name: 'Mohanlal Sukhadia University',
    university: 'Department of Geology',
    city: 'Udaipur',
    state: 'Rajasthan',
    region: 'West',
    establishedYear: 2023,
    membersCount: 92,
    chapterLead: 'Vikramaditya Rathore',
    leadRole: 'Field Coordinator',
    specialization: 'Aravalli Supergroup Structural Geology & Base Metals',
    coordinates: '24.5854° N, 73.7125° E',
    verified: true,
  },
];

/* -------------------------------------------------------------
   2. UPCOMING & ONGOING ACTIVITIES
------------------------------------------------------------- */
export const GSS_EVENTS: GssEvent[] = [
  {
    id: 'geogenesis-2026',
    title: 'Geogenesis 2026: Pan-India Annual Earth Science Conclave',
    tagline: 'The premier national gathering of students, professors, and field geoscientists.',
    date: '2026-12-14',
    displayDate: 'DEC 14 - 16, 2026',
    time: '09:00 AM - 06:30 PM IST',
    mode: 'Hybrid',
    location: 'Presidency University Auditorium, Kolkata & Live Broadcast',
    category: 'Annual Flagship',
    description:
      '3 days of paper presentations, National Geo-Olympiad, rock-section thin slice challenge, industry panel discussions with ONGC & Geological Survey of India, and young researcher awards.',
    tags: ['#Flagship', '#Geogenesis2026', '#PaperPresentation', '#PanIndia'],
    seatsLeft: 64,
    status: 'Filling Fast',
    speaker: {
      name: 'Dr. Alok K. Bandyopadhyay',
      designation: 'Former Deputy Director General',
      organization: 'Geological Survey of India (GSI)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Geogenesis+2026+-+Geo-Science+Society&details=Pan-India+Earth+Science+Conclave&dates=20261214T033000Z/20261216T130000Z',
  },
  {
    id: 'talkshow-ep14',
    title: 'GSS Talk Show Ep. 14: Decoding Deccan Traps & Mass Extinction Triggers',
    tagline: 'High-resolution argon-argon dating and the Cretaceous-Paleogene (K-Pg) boundary.',
    date: '2026-11-28',
    displayDate: 'NOV 28, 2026',
    time: '06:00 PM - 07:30 PM IST',
    mode: 'Virtual',
    location: 'GSS YouTube Live & Google Meet',
    category: 'Talk Show',
    description:
      'Join Dr. Ravindra Nath as he unpacks flood basalt eruptive pulses in Western India, paleomagnetic reversals, and atmospheric sulphur injections across the K-Pg boundary.',
    tags: ['#TalkShow', '#Volcanology', '#KPgBoundary', '#DeccanTraps'],
    seatsLeft: 120,
    status: 'Open',
    speaker: {
      name: 'Dr. Ravindra Nath',
      designation: 'Chair of Igneous Petrology',
      organization: 'IIT Bombay & Deccan Research Consortium',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=GSS+Talk+Show+Ep+14:+Deccan+Traps&dates=20261128T123000Z/20261128T140000Z',
  },
  {
    id: 'field-excursion-singhbhum',
    title: 'Winter Field Workshop: Structural Mapping across the Singhbhum Shear Zone',
    tagline: 'Hands-on Brunton compass surveying, mylonite fabric analysis, and uranium belt exploration.',
    date: '2026-12-22',
    displayDate: 'DEC 22 - 25, 2026',
    time: '07:00 AM IST (Departure)',
    mode: 'Field Expedition',
    location: 'Ghatsila & Jaduguda Base Camp, Jharkhand',
    category: 'Field Workshop',
    description:
      '4-day rigorous field camp led by veteran field professors. Students will map shear fabric, measure planar and linear penetrative structures, and prepare geological cross-sections.',
    tags: ['#Fieldwork', '#Singhbhum', '#StructuralGeology', '#Mapping'],
    seatsLeft: 6,
    status: 'Few Seats Left',
    speaker: {
      name: 'Prof. S. K. Mahapatra',
      designation: 'Professor Emeritus (Field Petrology)',
      organization: 'Presidency & CAS in Geology',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Singhbhum+Shear+Zone+Field+Workshop&dates=20261222T013000Z/20261225T113000Z',
  },
  {
    id: 'python-geoscience-masterclass',
    title: 'Masterclass: Python for Seismic Inversion & Well-Log Interpretation',
    tagline: 'Practical data science workflow with NumPy, Lasio, and Matplotlib for Earth Sciences.',
    date: '2026-12-05',
    displayDate: 'DEC 05, 2026',
    time: '04:00 PM - 07:00 PM IST',
    mode: 'Virtual',
    location: 'Interactive Jupyter Lab & Discord Live Room',
    category: 'Masterclass',
    description:
      'Learn how to load LAS format petrophysical logs, compute shale volume, calculate sonic porosity, and build lithology classification models from scratch in Python.',
    tags: ['#Geocomputation', '#Python', '#PetroleumGeosciences', '#WellLogs'],
    seatsLeft: 85,
    status: 'Open',
    speaker: {
      name: 'Dr. Siddharth Ray',
      designation: 'Senior Geoscientist & Petrophysicist',
      organization: 'Schlumberger / SLB Digital Earth',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    },
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Python+for+Geoscience+Masterclass&dates=20261205T103000Z/20261205T133000Z',
  },
  {
    id: 'talkshow-ep15',
    title: 'GSS Talk Show Ep. 15: Critical Minerals, REE Deposits & India\'s Energy Transition',
    tagline: 'Exploration vectors for Lithium, Cobalt, and Neodymium in Indian shield terrains.',
    date: '2026-12-10',
    displayDate: 'DEC 10, 2026',
    time: '06:30 PM - 08:00 PM IST',
    mode: 'Virtual',
    location: 'YouTube Live & GSS Virtual Stage',
    category: 'Talk Show',
    description:
      'A deep dive into hard-rock pegmatites, carbonatite complexes, and sea-floor polymetallic nodules powering next-generation battery chemistries and strategic minerals.',
    tags: ['#CriticalMinerals', '#Lithium', '#EconomicGeology', '#EnergyTransition'],
    seatsLeft: 190,
    status: 'Open',
    speaker: {
      name: 'Dr. Meenakshi Ramanathan',
      designation: 'Lead Exploration Geologist',
      organization: 'Khanij Bidesh India Ltd. (KABIL)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Critical+Minerals+Talk+Show&dates=20261210T130000Z/20261210T143000Z',
  },
  {
    id: 'geo-olympiad-prelims',
    title: 'All-India Earth Sciences Collegiate Olympiad (Prelims)',
    tagline: 'Compete against 1,000+ geology undergraduates in mineral identification, stratigraphy & crystallography.',
    date: '2026-12-18',
    displayDate: 'DEC 18, 2026',
    time: '02:00 PM - 04:00 PM IST',
    mode: 'Virtual',
    location: 'GSS Proctored Testing Portal',
    category: 'Competition',
    description:
      'National online prelims featuring 75 questions covering Crystallography, Optical Mineralogy, Sedimentology, Remote Sensing, and Structural Problems. Top 20 teams qualify for finals at Geogenesis.',
    tags: ['#Olympiad', '#Competition', '#Prizes', '#AllIndia'],
    seatsLeft: 310,
    status: 'Open',
    speaker: {
      name: 'GSS Academic Steering Board',
      designation: 'Jury Panel',
      organization: 'Geo-Science Society Academic Wing',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
    },
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=GSS+Collegiate+Olympiad+Prelims&dates=20261218T083000Z/20261218T103000Z',
  },
];

/* -------------------------------------------------------------
   3. YOUTUBE SHOWCASE (Real Videos from @geosciencesociety)
------------------------------------------------------------- */
export const YOUTUBE_VIDEOS: VideoShowcase[] = [
  {
    id: 'vid-1',
    title: 'Urban Mining: A Perspective to New Era | Talkshow',
    speaker: 'Mr. Asit Saha',
    affiliation: 'Resource Geologist & Circular Metals Specialist',
    duration: '48m',
    views: '1.8K views',
    topic: 'Urban Mining & Critical Minerals',
    youtubeId: 'OEPI9DGxgzA',
    thumbnail: 'https://img.youtube.com/vi/OEPI9DGxgzA/hqdefault.jpg',
    tags: ['#UrbanMining', '#CriticalMinerals', '#CircularEconomy'],
    summary: 'A landmark talk show exploring secondary metal recovery from e-waste, strategic mineral supply chains, and circular mining in modern economic geology.',
  },
  {
    id: 'vid-2',
    title: 'Borehole to Basin: Petrophysical Fundamentals for Geologists (Day 1)',
    speaker: 'Dr. Parama Mukhopadhyay',
    affiliation: 'Principal Petrophysicist, Vedanta Oil & Gas (Ex-Shell/Halliburton)',
    duration: '1h 22m',
    views: '3.4K views',
    topic: 'Petrophysics & Well Logging',
    youtubeId: '95_yMHaK85E',
    thumbnail: 'https://img.youtube.com/vi/95_yMHaK85E/hqdefault.jpg',
    tags: ['#BoreholeToBasin', '#WellLogging', '#Petrophysics'],
    summary: 'Masterclass covering drilling mud functions, downhole pressure stability, gamma-ray lithology identification, and petrophysical shale volume calculations.',
  },
  {
    id: 'vid-3',
    title: 'Borehole to Basin: Petrophysical Fundamentals for Geologists (Day 2)',
    speaker: 'Dr. Parama Mukhopadhyay',
    affiliation: 'Principal Petrophysicist, Vedanta Oil & Gas',
    duration: '1h 35m',
    views: '2.9K views',
    topic: 'Basin Correlation & Sequence Stratigraphy',
    youtubeId: '4w12O9VNfbQ',
    thumbnail: 'https://img.youtube.com/vi/4w12O9VNfbQ/hqdefault.jpg',
    tags: ['#SequenceStratigraphy', '#BasinAnalysis', '#OilAndGas'],
    summary: 'Deep dive into well-to-well correlation across sedimentary basins, identifying transgressive and regressive systems tracts, and subsurface reservoir mapping.',
  },
  {
    id: 'vid-4',
    title: 'Role of Geology in Mining: From Exploration to Extraction',
    speaker: 'Sulagna Banerjee',
    affiliation: 'M.Sc. Tech, MAusIMM | Mining Geologist',
    duration: '54m',
    views: '2.1K views',
    topic: 'Mining Geology & Mine Planning',
    youtubeId: 'IfZRaZBd-Dc',
    thumbnail: 'https://img.youtube.com/vi/IfZRaZBd-Dc/hqdefault.jpg',
    tags: ['#MiningGeology', '#GradeControl', '#MineralExploration'],
    summary: 'Practical discussion on core logging, ore body wireframing, grade control, and the daily responsibilities of production geologists in modern open-pit and underground operations.',
  },
  {
    id: 'vid-5',
    title: 'Discovery of the Tanga Graphite Deposit: Exploration Case Study',
    speaker: 'Supriya Das',
    affiliation: 'CEO, Sakariya Mines & Minerals',
    duration: '1h 05m',
    views: '2.6K views',
    topic: 'Economic Geology & Mineral Discovery',
    youtubeId: 'Nkuziw3l61A',
    thumbnail: 'https://img.youtube.com/vi/Nkuziw3l61A/hqdefault.jpg',
    tags: ['#Graphite', '#CriticalMinerals', '#MineralDiscovery'],
    summary: 'A firsthand account of discovering and defining a world-class crystalline graphite deposit, from preliminary geological mapping and trenching to resource estimation.',
  },
  {
    id: 'vid-6',
    title: 'Why Geology? Careers in Mineral Resources & Earth Sciences (Ep. 2)',
    speaker: 'Partha Pratim Paul',
    affiliation: 'Senior Geoscientist & Industry Consultant',
    duration: '42m',
    views: '3.8K views',
    topic: 'Geology Careers & Mentorship',
    youtubeId: 'EscpjO62E-Y',
    thumbnail: 'https://img.youtube.com/vi/EscpjO62E-Y/hqdefault.jpg',
    tags: ['#WhyGeology', '#GeologyCareers', '#StudentMentorship'],
    summary: 'Invaluable career navigation for geology students: comparing government surveys (GSI/ONGC) vs multinational mining consultancies vs academic research trajectories.',
  },
];

/* -------------------------------------------------------------
   4. PORTFOLIO & PREVIOUS ACHIEVEMENTS (Bento Grid)
------------------------------------------------------------- */
export const PORTFOLIO_ACHIEVEMENTS: PortfolioAchievement[] = [
  {
    id: 'ach-1',
    title: 'Geogenesis Flagship Conclave',
    metric: '1,400+',
    metricLabel: 'Delegates Across 3 Editions',
    description:
      'India’s largest independent collegiate Earth Science conclave uniting undergraduate researchers, postgraduates, and industry veterans for academic discourse, technical symposia, and live fieldwork exhibitions.',
    category: 'National Conclave',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    highlightStats: [
      { label: 'Colleges Represented', value: '84' },
      { label: 'Research Abstracts', value: '165' },
      { label: 'Corporate Sponsors', value: '12' },
    ],
  },
  {
    id: 'ach-2',
    title: 'Pan-India Chapter Network',
    metric: '100+',
    metricLabel: 'College Geological Departments',
    description:
      'Spanning 19 states and union territories, the GSS Chapter Network democratizes cutting-edge geological learning, peer research exchanges, and sample sharing across tier-1, tier-2, and regional universities.',
    category: 'Student Federation',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    highlightStats: [
      { label: 'Active States', value: '19' },
      { label: 'Campus Leads', value: '120+' },
      { label: 'Shared Library Books', value: '1,800+' },
    ],
  },
  {
    id: 'ach-3',
    title: 'National Talk Show Series',
    metric: '50+',
    metricLabel: 'Distinguished Lectures & Broadcasts',
    description:
      'Over 75 hours of high-calibre Earth Science lectures available freely to any student in India, featuring directors from GSI, NGRI, Wadia Institute, ONGC, and leading international universities.',
    category: 'Open Education',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    highlightStats: [
      { label: 'Total YouTube Views', value: '180K+' },
      { label: 'Average Watch Time', value: '38m' },
      { label: 'Guest Scientists', value: '52' },
    ],
  },
  {
    id: 'ach-4',
    title: 'Fieldwork Grant & Expedition Support',
    metric: '₹2.8L',
    metricLabel: 'Micro-Grants Disbursed to Undergraduates',
    description:
      'Empowering student-led mapping expeditions in remote and geologically crucial terrains including Cuddapah Basin, Zanskar Range, Barakar Formations, and the Malani Igneous Suite.',
    category: 'Field Research',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    highlightStats: [
      { label: 'Expeditions Funded', value: '14' },
      { label: 'Thin Sections Sponsored', value: '450+' },
      { label: 'Published Papers', value: '9' },
    ],
  },
];

/* -------------------------------------------------------------
   5. FAQS
------------------------------------------------------------- */
export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Membership',
    question: 'What is the Geo-Science Society (GSS) and who can become a member?',
    answer:
      'Geo-Science Society is India’s foremost student-led Earth Sciences federation. Any student enrolled in Geology, Applied Geology, Geophysics, Mining Engineering, Environmental Earth Science, or Planetary Sciences at an Indian or international university is welcome to join. Early-career researchers and amateur rockhounds can also join as Associate Members.',
    rockName: 'Granitic Pegmatite Vug',
    mineralInside: 'Radiant Imperial Topaz',
    mohsHardness: '8.0 Mohs (High Toughness)',
    chemicalFormula: 'Al₂SiO₄(F,OH)₂',
    crystalSystem: 'Orthorhombic Dipyramidal',
    gemColor: '#FFB03B',
    quarryDepth: 'Stratum Level: -12m',
  },
  {
    id: 'faq-2',
    category: 'Membership',
    question: 'Are there any registration or membership fees to join GSS?',
    answer:
      'No! General membership in Geo-Science Society is 100% free. We believe in unrestricted, democratic access to geological knowledge, webinar recordings, and peer mentorship. Certain specialized multi-day field expeditions or hands-on laboratory workshops may charge nominal at-cost fees to cover transport, food, and safety gear.',
    rockName: 'Hydrothermal Quartz Geode',
    mineralInside: 'Deep Violet Amethyst Cluster',
    mohsHardness: '7.0 Mohs (Conchoidal Fracture)',
    chemicalFormula: 'SiO₂ with Fe³⁺ Center',
    crystalSystem: 'Trigonal Trapezohedral',
    gemColor: '#9B51E0',
    quarryDepth: 'Stratum Level: -28m',
  },
  {
    id: 'faq-3',
    category: 'Chapters',
    question: 'How can our department establish an official GSS Student Chapter on campus?',
    answer:
      'To start a recognized GSS Chapter, you need at least 5 active student members and the endorsement of one faculty advisor from your department. You can apply directly through our "Partner & Chapters" portal. Our Secretariat will provide official chapter bylaws, digital banners, event hosting kits, and grant eligibility.',
    rockName: 'Mantle Kimberlite Xenolith',
    mineralInside: 'Crystalline Octahedral Diamond',
    mohsHardness: '10.0 Mohs (Maximum Mohs Hardness)',
    chemicalFormula: 'C (Pure Covalent Carbon)',
    crystalSystem: 'Isometric Hexoctahedral',
    gemColor: '#3898D8',
    quarryDepth: 'Pipe Stratum: -180m',
  },
  {
    id: 'faq-4',
    category: 'Submissions & Research',
    question: 'How does the Geo Gallery specimen submission process work?',
    answer:
      'Students and researchers can submit high-resolution micro-photographs (thin sections under PPL/XPL) or field macro shots along with thin-section dimensions, optical properties, rock formation, and GPS coordinates. Every submission is reviewed by our editorial petrology board. Once accepted, you retain full copyright with CC-BY-NC attribution.',
    rockName: 'Oxidized Supergene Gossan',
    mineralInside: 'Banded Botryoidal Malachite',
    mohsHardness: '3.5 - 4.0 Mohs (Silky Luster)',
    chemicalFormula: 'Cu₂CO₃(OH)₂ (Basic Carbonate)',
    crystalSystem: 'Monoclinic Prismatic',
    gemColor: '#82AC38',
    quarryDepth: 'Gossan Horizon: -08m',
  },
  {
    id: 'faq-5',
    category: 'Events & Workshops',
    question: 'Can undergraduate (B.Sc / B.Tech) students present papers at Geogenesis?',
    answer:
      'Yes, absolutely! Geogenesis dedicates an entire track exclusively to Undergraduate Research Showcases and B.Sc. dissertation posters. Top presentations receive cash prizes, commemorative hammer plaques, and publication recommendation letters.',
    rockName: 'Auriferous Quartz Saddle Reef',
    mineralInside: 'Native Crystallized Gold Nugget',
    mohsHardness: '2.5 - 3.0 Mohs (Malleable Sector)',
    chemicalFormula: 'Au (Native Element)',
    crystalSystem: 'Isometric Hexoctahedral',
    gemColor: '#FFD700',
    quarryDepth: 'Hydrothermal Lode: -85m',
  },
  {
    id: 'faq-6',
    category: 'Partnerships',
    question: 'How can professors, mining companies, or software providers partner with GSS?',
    answer:
      'We collaborate actively with academic societies, GIS/petrophysical software vendors, mining corporations, and research labs. We offer speaking slots on our Talk Show series, student hackathon sponsorships, and recruitment showcases. Please submit the form in our "Partner" section.',
    rockName: 'Felsic Volcanic Spherulite',
    mineralInside: 'Iridescent Fire Obsidian',
    mohsHardness: '5.5 Mohs (Vitreous Sheen)',
    chemicalFormula: '70–75% SiO₂ Amorphous Glass',
    crystalSystem: 'Amorphous Solid Body',
    gemColor: '#FF5722',
    quarryDepth: 'Extrusive Flow: -04m',
  },
  {
    id: 'faq-7',
    category: 'Events & Workshops',
    question: 'What safety protocols are followed during GSS Field Expeditions?',
    answer:
      'Safety is paramount. All field excursions adhere to strict SOPs: compulsory hard-hat and safety eyewear rules in active quarries, first-aid trained leads with satellite communication devices in remote sectors, and mandatory baseline emergency medical insurance for all student attendees.',
    rockName: 'High-Grade Metapelitic Granulite',
    mineralInside: 'Royal Blue Corundum (Sapphire)',
    mohsHardness: '9.0 Mohs (Adamantine Luster)',
    chemicalFormula: 'Al₂O₃ with Ti⁴⁺-Fe²⁺ Interval',
    crystalSystem: 'Trigonal Scalenohedral',
    gemColor: '#1E88E5',
    quarryDepth: 'Granulite Facies: -120m',
  },
];

/* -------------------------------------------------------------
   6. GEO GALLERY SPECIMENS (8+ Comprehensive Petrographic Samples)
------------------------------------------------------------- */
export const GEO_SPECIMENS: GeoSpecimen[] = [
  {
    id: 'specimen-1',
    name: 'Banded Iron Formation (BIF) with Jasper Intercalations',
    rockType: 'Sedimentary',
    structure: 'Alternating micro-laminations of specular hematite and cryptocrystalline jasper',
    formation: 'Iron Ore Group (IOG), Singhbhum Craton',
    location: 'Joda East Iron Mine, Keonjhar, Odisha',
    stratigraphicAge: 'Neoarchean to Paleoproterozoic (~2.9 - 3.1 Ga)',
    imagingMethod: 'Hand Specimen Macro',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    photographer: 'Siddhant Mahapatra',
    photographerAffiliation: 'Jadavpur University',
    petrographicNotes:
      'Sub-millimetric cyclical banding indicative of seasonal hydrothermal iron upwelling into oxygen-depleted ocean waters prior to the Great Oxidation Event (GOE). High magnetic susceptibility with alternating chert micro-bands.',
    mineralComposition: ['Hematite (42%)', 'Microcrystalline Quartz/Jasper (38%)', 'Magnetite (14%)', 'Siderite (6%)'],
    specimenDimensions: '14.2 cm × 8.5 cm × 4.8 cm',
    isPhotoOfMonth: true,
  },
  {
    id: 'specimen-2',
    name: 'Olivine Basalt Thin Section with Subophitic Texture',
    rockType: 'Igneous',
    structure: 'Subophitic plagioclase laths partially enclosing augite and euhedral olivine phenocrysts',
    formation: 'Mahabaleshwar Formation, Deccan Volcanic Province',
    location: 'Mahabaleshwar Ghat Section, Maharashtra',
    stratigraphicAge: 'Late Cretaceous (~66 Ma)',
    imagingMethod: 'Petrographic Thin Section (XPL)',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1000&q=80',
    photographer: 'Prateek Sawant',
    photographerAffiliation: 'IIT Bombay',
    petrographicNotes:
      'Vivid second- and third-order interference colours shown by cumulus olivine crystals undergoing peripheral serpentinization (iddingsite alteration). Plagioclase displays sharp albite and Carlsbad polysynthetic twinning.',
    mineralComposition: ['Labradorite Plagioclase (48%)', 'Augite (30%)', 'Forsteritic Olivine (14%)', 'Titanomagnetite (8%)'],
    specimenDimensions: 'Standard 30µm petrographic slide',
  },
  {
    id: 'specimen-3',
    name: 'Garnet-Staurolite-Mica Schist with Porphyroblasts',
    rockType: 'Metamorphic',
    structure: 'Nematoblastic to porphyroblastic fabric with sigmoidal quartz inclusion trails',
    formation: 'Vaikrita Group, Higher Himalayan Crystalline (HHC)',
    location: 'Joshimath-Badrinath Transect, Chamoli, Uttarakhand',
    stratigraphicAge: 'Mesoproterozoic protolith; Tertiary metamorphism (~24 Ma)',
    imagingMethod: 'Petrographic Thin Section (XPL)',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    photographer: 'Kavita Rawat',
    photographerAffiliation: 'Panjab University',
    petrographicNotes:
      'Almandine garnet porphyroblasts exhibiting "snowball" (spiral-inclusion) rotational geometry indicative of syn-tectonic growth during shearing along the Main Central Thrust (MCT). Pleochroic staurolite twins prominent.',
    mineralComposition: ['Almandine Garnet (22%)', 'Staurolite (18%)', 'Biotite (26%)', 'Muscovite (19%)', 'Quartz (15%)'],
    specimenDimensions: 'Standard 30µm petrographic slide',
  },
  {
    id: 'specimen-4',
    name: 'Columnar Jointed Rhyolite-Dacite Prisms',
    rockType: 'Igneous',
    structure: 'Sub-vertical hexagonal and pentagonal cooling columns with basaltic substrate',
    formation: 'St. Mary\'s Islands Volcanic Suite',
    location: 'Coconut Island, Malpe, Udupi, Karnataka',
    stratigraphicAge: 'Late Cretaceous (~88 Ma - Madagascar rifting)',
    imagingMethod: 'Field Outcrop',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    photographer: 'Dr. Rameshwar Rao',
    photographerAffiliation: 'Anna University',
    petrographicNotes:
      'Formed by sub-aerial thermal contraction of felsic lavas erupted during the separation of greater India and Madagascar. Designated a National Geological Monument by the Geological Survey of India.',
    mineralComposition: ['Sanidine (35%)', 'Quartz (30%)', 'Oligoclase (20%)', 'Hornblende (10%)', 'Zircon (5%)'],
    specimenDimensions: 'Columns measure 4.5m in height, ~40cm facet width',
  },
  {
    id: 'specimen-5',
    name: 'Perisphinctes Ammonite Fossil in Concretionary Nodule',
    rockType: 'Fossil',
    structure: 'Involute planispiral shell with bifurcating ribbing and preserved suture septa',
    formation: 'Spiti Shale Formation (Chidamu Beds)',
    location: 'Langza Village, Spiti Valley, Himachal Pradesh',
    stratigraphicAge: 'Upper Jurassic (Oxfordian - Tithonian, ~150 Ma)',
    imagingMethod: 'Hand Specimen Macro',
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1000&q=80',
    photographer: 'Tenzin Choden',
    photographerAffiliation: 'Hansraj College, University of Delhi',
    petrographicNotes:
      'Locally known as "Saligram" stone nodules. The specimen shows pristine calcitic replacement of the aragonitic cephalopod phragmocone with clear ammonitic complex sutures exposed by differential weathering.',
    mineralComposition: ['Calcite (75%)', 'Pyrite micro-crystals (12%)', 'Silica/Clay matrix (13%)'],
    specimenDimensions: '8.4 cm diameter whorl',
  },
  {
    id: 'specimen-6',
    name: 'Dolosparite Stromatolite Bioherm (Conophyton)',
    rockType: 'Sedimentary',
    structure: 'Conical upward-convex laminated organo-sedimentary biogenic structure',
    formation: 'Bhander Limestone, Vindhyan Supergroup',
    location: 'Maihar, Satna District, Madhya Pradesh',
    stratigraphicAge: 'Neoproterozoic (~750 Ma)',
    imagingMethod: 'Hand Specimen Macro',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    photographer: 'Anurag Tiwari',
    photographerAffiliation: 'BHU Varanasi',
    petrographicNotes:
      'Formed through the sediment-trapping, binding, and precipitative metabolic activity of ancient photosynthetic cyanobacterial microbial mats in an intertidal, warm shallow epicontinental sea.',
    mineralComposition: ['Dolomite (82%)', 'Micro-crystalline Calcite (12%)', 'Authigenic Quartz (6%)'],
    specimenDimensions: '18 cm × 12 cm specimen slab',
  },
  {
    id: 'specimen-7',
    name: 'Bladed Blue Kyanite in Quartz-Muscovite Matrix',
    rockType: 'Mineral',
    structure: 'Subparallel elongated bladed crystals with characteristic cleavage planes',
    formation: 'Singhbhum Copper-Uranium Belt Metasediments',
    location: 'Lapsa Buru, Kharsawan, Jharkhand',
    stratigraphicAge: 'Paleoproterozoic (~2.1 Ga)',
    imagingMethod: 'Hand Specimen Macro',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
    photographer: 'Swarnali Sen',
    photographerAffiliation: 'Presidency University',
    petrographicNotes:
      'High-pressure polymorph of Al2SiO5 indicating barrovian medium-to-high pressure metamorphism (>4 kbar). Demonstrates exceptional directional anisotropy in hardness (4.5 along crystal length vs 7 across).',
    mineralComposition: ['Kyanite (62%)', 'Quartz (28%)', 'Muscovite/Sericite (10%)'],
    specimenDimensions: '11 cm crystal length',
  },
  {
    id: 'specimen-8',
    name: 'Orbicular Granite with Concentric Mafic Rims',
    rockType: 'Igneous',
    structure: 'Spheroidal rhythmic multi-layered shells of plagioclase and biotite around core',
    formation: 'Closepet Granite Suite, Dharwar Craton',
    location: 'Magadi Outcrops, Ramanagara, Karnataka',
    stratigraphicAge: 'Neoarchean (~2.52 Ga)',
    imagingMethod: 'Field Outcrop',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=80',
    photographer: 'V. S. Murthy',
    photographerAffiliation: 'Osmania University',
    petrographicNotes:
      'Ultra-rare plutonic fabric developed via rhythmic supercooling and crystallization under water-rich magmatic conditions around xenolithic or early-crystallized nuclei.',
    mineralComposition: ['Microcline (40%)', 'Oligoclase (30%)', 'Quartz (18%)', 'Biotite/Hornblende (12%)'],
    specimenDimensions: 'Each orbicule measures ~9cm in diameter',
  },
];

/* -------------------------------------------------------------
   7. ARTICLES & FIELD NOTES
------------------------------------------------------------- */
export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'The Art of the Field Notebook: How to Sketch Outcrops, Measure Strike, and Record Strata',
    slug: 'art-of-the-field-notebook',
    excerpt:
      'Why the geological notebook remains the field scientist’s ultimate scientific instrument in the era of satellite remote sensing and LiDAR.',
    content: [
      'In an age dominated by high-resolution digital elevation models, satellite-borne multispectral sensors, and automated drone photogrammetry, it is tempting for young geology students to view the paper field notebook as an obsolete relic of 19th-century exploration.',
      'Yet, in the words of pioneering geologist H.H. Read, "The best geologist is the one who has seen the most rocks." More importantly, the best field geologist is the one who understands how to synthesize 3D spatial geometry into crisp, annotated field sketches right in front of the outcrop.',
      'A true geological field sketch is not an artistic portrait—it is an intellectual filter. When you draw an outcrop, your brain is compelled to identify boundaries: Which contact is conformable? Where is the truncation surface? What is the vergence of the parasitic folds? Where does the fault gouge pinch out?',
      'Always follow the Golden Rules of Field Note-Taking: (1) Date, weather, and GPS coordinate header; (2) Always include an object of scale (coin, hammer, or teammate); (3) Explicitly indicate looking direction (e.g., "Outcrop facing North-East"); (4) Distinguish observation from interpretation with separate ink styles.',
    ],
    author: 'Debabrata Mukherjee',
    authorRole: 'Fieldwork Director',
    authorInstitution: 'Presidency University',
    readTime: '6 min read',
    lastUpdated: 'Nov 18, 2026',
    category: 'Field Methodology',
    tags: ['#Fieldwork', '#Brunton', '#Mapping', '#OutcropSketches'],
    coverImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'art-2',
    title: 'Unravelling the Deccan Plume: Flood Basalts, Mantle Upwelling, and Dinosaur Extinction',
    slug: 'unravelling-the-deccan-plume',
    excerpt:
      'Did the massive volcanic pulses of Western India deliver the mortal blow to non-avian dinosaurs before the Chicxulub bolide impact?',
    content: [
      'Covering an astounding area of over 500,000 square kilometres across west-central India, the Deccan Large Igneous Province (LIP) represents one of the most violent magmatic episodes in Earth history.',
      'For decades, academic orthodoxy held that the Chicxulub asteroid impact in the Yucatán peninsula was the sole cause of the Cretaceous-Paleogene (K-Pg) mass extinction 66 million years ago.',
      'However, modern high-precision U-Pb zircon geochronology and 40Ar/39Ar step-heating dating conducted across the Western Ghats (specifically the Poladpur, Ambenali, and Mahabaleshwar Formations) reveal that the bulk of the Deccan lavas erupted in pulses lasting just tens of thousands of years immediately preceding the K-Pg boundary.',
      'These immense basaltic floods pumped tens of thousands of gigatonnes of sulfur dioxide and carbon dioxide into the upper atmosphere, causing severe short-term acid rain and global volcanic winter followed by prolonged greenhouse warming.',
    ],
    author: 'Tanvi Deshmukh & Dr. R. Kulkarni',
    authorRole: 'Petrology Research Fellows',
    authorInstitution: 'IIT Bombay & Fergusson College',
    readTime: '8 min read',
    lastUpdated: 'Nov 12, 2026',
    category: 'Petrology',
    tags: ['#Volcanology', '#DeccanTraps', '#KPgBoundary', '#Extinction'],
    coverImage: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'art-3',
    title: 'The Inverted Metamorphism Paradox of the Higher Himalayas',
    slug: 'inverted-metamorphism-higher-himalayas',
    excerpt:
      'Why do higher-grade metamorphic minerals sit atop lower-grade rocks along the Main Central Thrust?',
    content: [
      'In typical crustal geology, metamorphic grade increases with depth: chlorite-grade rocks lie at the surface, grading downward through biotite, garnet, staurolite, kyanite, and finally sillimanite as temperature and pressure rise.',
      'In the Higher Himalayas, this sequence is mysteriously inverted. Traveling up-section toward the Higher Himalayan Crystalline (HHC), one encounters sillimanite and migmatites sitting topographically above garnet-mica schists and phyllites.',
      'Over the past two decades, structural geologists have proposed competing hypotheses to explain this phenomenon: thermal shear heating along the Main Central Thrust (MCT), ductile channel flow of mid-crustal melt, and tectonic overthrusting of hot crystalline sheets.',
      'Understanding this inversion provides direct insight into how continental crust deforms, melts, and flows under mega-collisional stress regimes.',
    ],
    author: 'Kavita Rawat',
    authorRole: 'Doctoral Scholar',
    authorInstitution: 'Panjab University',
    readTime: '7 min read',
    lastUpdated: 'Oct 29, 2026',
    category: 'Tectonics',
    tags: ['#Himalayas', '#Metamorphism', '#ChannelFlow', '#StructuralGeology'],
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'art-4',
    title: 'From B.Sc. to GSI Geologist: Complete Roadmap for UPSC Combined Geo-Scientist Exam',
    slug: 'upsc-geoscientist-exam-roadmap',
    excerpt:
      'A candid, realistic strategic guide on mastering Paper 1, Paper 2, and the technical interview for India’s top government geological post.',
    content: [
      'The Union Public Service Commission (UPSC) Combined Geo-Scientist Examination (CGSE) is the golden gateway for geology graduates aiming to serve in the Geological Survey of India (GSI) and Central Ground Water Board (CGWB).',
      'The examination consists of three competitive tiers: Prelims (Objective), Mains (Descriptive), and the Personality Test (Interview). Preparation must be systematic and literature-grounded.',
      'Key recommendations from past rankers include: (1) Build unshakeable foundations in Physical Geology, Structural Geology, and Mineralogy before attempting descriptive papers; (2) Practice drawing freehand crystal sketches (Miller indices, stereographic projections); (3) Study GSI Indian stratigraphy memoirs.',
    ],
    author: 'Priyanshu Tripathi',
    authorRole: 'GSS Academic Secretary',
    authorInstitution: 'Banaras Hindu University (BHU)',
    readTime: '10 min read',
    lastUpdated: 'Nov 02, 2026',
    category: 'Career Guide',
    tags: ['#UPSC', '#Geoscientist', '#GSI', '#CareerRoadmap'],
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
  },
];

/* -------------------------------------------------------------
   8. LEADERSHIP BIOS
------------------------------------------------------------- */
export const LEADERSHIP: LeaderBio[] = [
  {
    id: 'lead-1',
    name: 'Sayan Chatterjee',
    role: 'National President & Founder',
    tenure: '2024 - Present',
    institution: 'Presidency University, Kolkata',
    location: 'Kolkata, India',
    bio: 'Pursuing M.Sc. in Applied Geology with research interest in Precambrian basement tectonics and structural analysis. Founded GSS in 2021 to bridge the gap between student chapters across Indian universities.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    specialization: 'Structural Geology & Tectonics',
    social: {
      linkedin: 'https://lnkd.in/dJMKPJU7',
      email: 'president@geosciencesociety.org',
    },
  },
  {
    id: 'lead-2',
    name: 'Debolina Sengupta',
    role: 'Vice President & Head of Chapters',
    tenure: '2024 - Present',
    institution: 'IIT Kharagpur',
    location: 'Kharagpur, India',
    bio: 'Geophysics scholar specializing in seismic attenuation, machine learning in well-log correlation, and regional outreach across South & West Zone colleges.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    specialization: 'Seismic Inversion & Computational Geoscience',
    social: {
      linkedin: 'https://lnkd.in/dJMKPJU7',
      email: 'chapters@geosciencesociety.org',
    },
  },
  {
    id: 'lead-3',
    name: 'Priyanshu Tripathi',
    role: 'General Secretary (Academic)',
    tenure: '2025 - Present',
    institution: 'Banaras Hindu University (BHU)',
    location: 'Varanasi, India',
    bio: 'Leading the GSS Webinar & Talk Show curriculum. Avid sedimentologist focused on Vindhyan basin architecture and paleogeographic reconstructions.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    specialization: 'Basin Analysis & Sequence Stratigraphy',
    social: {
      linkedin: 'https://lnkd.in/dJMKPJU7',
      email: 'academic@geosciencesociety.org',
    },
  },
  {
    id: 'lead-4',
    name: 'Tanvi Deshmukh',
    role: 'Curator & Geo Gallery Lead',
    tenure: '2024 - Present',
    institution: 'Fergusson College, Pune',
    location: 'Pune, India',
    bio: 'Passionate optical mineralogist and micro-photographer. Spearheading the national digitization of university thin-section collections and petrographic archives.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    specialization: 'Optical Mineralogy & Petrology',
    social: {
      linkedin: 'https://lnkd.in/dJMKPJU7',
      email: 'gallery@geosciencesociety.org',
    },
  },
  {
    id: 'lead-5',
    name: 'Rohan Kulkarni',
    role: 'Treasurer & Industry Liaison',
    tenure: '2024 - Present',
    institution: 'IIT Bombay',
    location: 'Mumbai, India',
    bio: 'Coordinates sponsorship agreements with exploration corporations, manages undergraduate fieldwork grants, and directs annual Geogenesis budgeting.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    specialization: 'Economic Geology & Mining Valuation',
    social: {
      linkedin: 'https://lnkd.in/dJMKPJU7',
      email: 'treasurer@geosciencesociety.org',
    },
  },
  {
    id: 'lead-6',
    name: 'Bidisha Saikia',
    role: 'Zonal Director (North-East & East)',
    tenure: '2025 - Present',
    institution: 'Gauhati University',
    location: 'Guwahati, India',
    bio: 'Directs chapter expansions across Assam, Meghalaya, and Nagaland. Works on Shillong Plateau geodynamics and environmental landslides mitigation.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    specialization: 'Geomorphology & Neotectonics',
    social: {
      linkedin: 'https://lnkd.in/dJMKPJU7',
      email: 'northeast@geosciencesociety.org',
    },
  },
];

/* -------------------------------------------------------------
   9. MEMBER STORIES & TESTIMONIALS
------------------------------------------------------------- */
export const MEMBER_STORIES: MemberStory[] = [
  {
    id: 'story-1',
    name: 'Anwesh Roy',
    college: 'Presidency University (Class of 2024)',
    batch: 'B.Sc Geology',
    quote:
      'GSS connected me with mentors from Wadia Institute who reviewed my B.Sc. thesis on fold geometries. The feedback directly helped me secure an M.Sc. admission at IIT Bombay with AIR 8.',
    outcome: 'Currently M.Sc. Earth Sciences, IIT Bombay',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    badge: 'AIR 8 GATE Ranker',
  },
  {
    id: 'story-2',
    name: 'Shruti Nandini',
    college: 'Hansraj College, Delhi University',
    batch: 'M.Sc Geology',
    quote:
      'Presenting at Geogenesis 2025 gave me my very first conference experience without the intimidating barrier of expensive registration fees. GSS truly works for young students.',
    outcome: 'Best Paper Awardee - Geogenesis 2025',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    badge: 'Young Researcher',
  },
  {
    id: 'story-3',
    name: 'Karthik Subramanian',
    college: 'Anna University, Chennai',
    batch: 'M.Tech Applied Geology',
    quote:
      'The Python for Geoscience workshop run by GSS was what sparked my transition into GIS and computational seismic modelling. I now work in offshore geophysical surveying.',
    outcome: 'Junior Geophysicist, Fugro Marine Survey',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    badge: 'Industry Professional',
  },
];

/* -------------------------------------------------------------
   11. MINDAT.ORG MINERAL GALLERY & LOCALITY DATABASE
   Curated Indian & Global Mineral Specimens with Mindat IDs,
   chemical formulas, crystallographic systems, and localities.
------------------------------------------------------------- */
export interface MindatMineral {
  id: string;
  name: string;
  varietyOrSubtype?: string;
  mindatId: number;
  mindatUrl: string;
  formula: string;
  crystalSystem: 'Orthorhombic' | 'Tetragonal' | 'Hexagonal' | 'Trigonal' | 'Monoclinic' | 'Triclinic' | 'Isometric';
  classification: 'Zeolite & Silicate' | 'Gemstone' | 'Sulfide & Ore' | 'Oxide & Hydroxide';
  locality: string;
  region: 'Maharashtra (Deccan)' | 'Karnataka (Dharwar)' | 'Madhya Pradesh' | 'Rajasthan';
  hardness: string;
  specificGravity: string;
  luster: string;
  color: string;
  streak: string;
  spaceGroup: string;
  cleavage: string;
  paragenesis: string[];
  image: string;
  description: string;
}

export const MINDAT_MINERALS: MindatMineral[] = [
  {
    id: 'min-1',
    name: 'Cavansite on Stilbite',
    varietyOrSubtype: 'Vanado-silicate Rosettes',
    mindatId: 937,
    mindatUrl: 'https://www.mindat.org/min-937.html',
    formula: 'Ca(V⁴⁺O)Si₄O₁₀ · 4H₂O',
    crystalSystem: 'Orthorhombic',
    classification: 'Zeolite & Silicate',
    locality: 'Wagholi Quarries, Pune District, Maharashtra, India',
    region: 'Maharashtra (Deccan)',
    hardness: '3.0 - 4.0',
    specificGravity: '2.21 - 2.31',
    luster: 'Vitreous to Pearly',
    color: 'Electric Turquoise Blue to Brilliant Azure',
    streak: 'Pale Blue',
    spaceGroup: 'Pcmn',
    cleavage: '{010} Good',
    paragenesis: ['Stilbite-Ca', 'Heulandite-Ca', 'Apophyllite-(KF)', 'Calcite'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Cavansite-121680.jpg',
    description: 'First discovered in Oregon but India’s Deccan basalt cavities at Wagholi produced the world’s most breathtaking royal-blue radiating crystal rosettes resting on pearly white stilbite matrix.',
  },
  {
    id: 'min-2',
    name: 'Fluorapophyllite-(K)',
    varietyOrSubtype: 'Gemmy Bipyramidal Clusters with Stilbite',
    mindatId: 283,
    mindatUrl: 'https://www.mindat.org/min-283.html',
    formula: 'KCa₄(Si₈O₂₀)(F,OH) · 8H₂O',
    crystalSystem: 'Tetragonal',
    classification: 'Zeolite & Silicate',
    locality: 'Pashan Quarries, Pune District, Maharashtra, India',
    region: 'Maharashtra (Deccan)',
    hardness: '4.5 - 5.0',
    specificGravity: '2.33 - 2.37',
    luster: 'Vitreous, Pearly on {001}',
    color: 'Sea-Foam Mint Green to Colorless Ice',
    streak: 'White',
    spaceGroup: 'P4/mnc',
    cleavage: '{001} Perfect basal',
    paragenesis: ['Stilbite', 'Scolecite', 'Heulandite', 'Chalcedony'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Apophyllite-65547.jpg',
    description: 'India is world-renowned on Mindat for producing the absolute pinnacle of fluorapophyllite specimens: razor-sharp pseudocubic tetragonal bipyramids perched elegantly over lustrous peach stilbite blades.',
  },
  {
    id: 'min-3',
    name: 'Corundum var. Ruby in Fuchsite',
    varietyOrSubtype: 'Archean Hexagonal Prisms',
    mindatId: 1105,
    mindatUrl: 'https://www.mindat.org/min-1105.html',
    formula: 'Al₂O₃ : Cr',
    crystalSystem: 'Trigonal',
    classification: 'Gemstone',
    locality: 'Mysore District, Karnataka, India',
    region: 'Karnataka (Dharwar)',
    hardness: '9.0 (Mohs Reference)',
    specificGravity: '3.98 - 4.10',
    luster: 'Adamantine to Vitreous',
    color: 'Crimson Pigeon-Blood Red in Emerald-Green Matrix',
    streak: 'Colorless / White',
    spaceGroup: 'R3̄c',
    cleavage: 'None (Parting on {0001})',
    paragenesis: ['Fuchsite Mica', 'Kyanite', 'Rutile', 'Quartz'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Several_corundum_crystals.jpg',
    description: 'Hexagonal tabular corundum crystals displaying diagnostic crimson UV fluorescence, embedded in brilliant chromian mica (fuchsite) from ancient Archean greenstone terrains of the Dharwar Craton.',
  },
  {
    id: 'min-4',
    name: 'Pyrite Striated Cubes',
    varietyOrSubtype: 'Porphyry Copper "Fool\'s Gold"',
    mindatId: 3314,
    mindatUrl: 'https://www.mindat.org/min-3314.html',
    formula: 'FeS₂',
    crystalSystem: 'Isometric',
    classification: 'Sulfide & Ore',
    locality: 'Malanjkhand Copper Mine, Balaghat, Madhya Pradesh, India',
    region: 'Madhya Pradesh',
    hardness: '6.0 - 6.5',
    specificGravity: '4.95 - 5.10',
    luster: 'Splendent Mirror Metallic',
    color: 'Brilliant Brass-Yellow',
    streak: 'Greenish-Black',
    spaceGroup: 'Pa3̄',
    cleavage: '{001} Imperfect',
    paragenesis: ['Chalcopyrite', 'Molybdenite', 'Quartz', 'Magnetite'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Pyrite_-_Huanzala_mine%2C_Huallanca%2C_Bolognesi%2C_Ancash%2C_Peru.jpg',
    description: 'Sharp, mirror-lustered cubic crystals with distinct striations from India’s premier Proterozoic granite-hosted porphyry copper belt, yielding essential sulfide paragenesis data on Mindat.',
  },
  {
    id: 'min-5',
    name: 'Spessartine Garnet in Matrix',
    varietyOrSubtype: 'Mandarin Dodecahedral Crystals',
    mindatId: 3725,
    mindatUrl: 'https://www.mindat.org/min-3725.html',
    formula: 'Mn²⁺₃Al₂(SiO₄)₃',
    crystalSystem: 'Isometric',
    classification: 'Gemstone',
    locality: 'Kodal, Nagpur District, Maharashtra, India',
    region: 'Maharashtra (Deccan)',
    hardness: '7.0 - 7.5',
    specificGravity: '4.12 - 4.18',
    luster: 'Vitreous to Resinous',
    color: 'Mandarin Orange to Deep Cognac Red',
    streak: 'White',
    spaceGroup: 'Ia3̄d',
    cleavage: 'None (Conchoidal Fracture)',
    paragenesis: ['Quartz', 'Braunite', 'Apatite', 'Rhodonite'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Garnet%2C_quartz%2C_feldspar_5.jpg',
    description: 'Exquisite dodecahedral manganese garnet crystals from the legendary Sausar Group gonditic formations, celebrated on Mindat worldwide for their vibrant orange fire and crystal clarity.',
  },
  {
    id: 'min-6',
    name: 'Amethyst Geode Pyramid Clusters',
    varietyOrSubtype: 'Ferric Irradiated Quartz Crystals',
    mindatId: 198,
    mindatUrl: 'https://www.mindat.org/min-198.html',
    formula: 'SiO₂ : Fe³⁺',
    crystalSystem: 'Trigonal',
    classification: 'Gemstone',
    locality: 'Jalgaon District, Maharashtra, India',
    region: 'Maharashtra (Deccan)',
    hardness: '7.0 (Mohs Reference)',
    specificGravity: '2.65',
    luster: 'Vitreous',
    color: 'Royal Purple to Vivid Lavender Violet',
    streak: 'White',
    spaceGroup: 'P3₁21',
    cleavage: 'None',
    paragenesis: ['Calcite', 'Chalcedony', 'Mordenite', 'Heulandite'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Amethyst_by_alexfurr.jpg',
    description: 'Macro-crystalline quartz crystals colored by natural ionizing radiation interacting with traces of interstitial iron within massive Deccan continental flood basalt cavities.',
  },
  {
    id: 'min-7',
    name: 'Scolecite Radiating Spray',
    varietyOrSubtype: 'Acicular "Hedgehog" Zeolite',
    mindatId: 3594,
    mindatUrl: 'https://www.mindat.org/min-3594.html',
    formula: 'Ca(Al₂Si₃O₁₀) · 3H₂O',
    crystalSystem: 'Monoclinic',
    classification: 'Zeolite & Silicate',
    locality: 'Nashik District, Maharashtra, India',
    region: 'Maharashtra (Deccan)',
    hardness: '5.0 - 5.5',
    specificGravity: '2.25 - 2.31',
    luster: 'Silky to Vitreous',
    color: 'Pristine Snow-White',
    streak: 'White',
    spaceGroup: 'Cc',
    cleavage: '{110} Perfect',
    paragenesis: ['Apophyllite', 'Stilbite', 'Mesolite', 'Calcite'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Scolecite%2C_Apophyllite%2C_Stilbite-450733.jpg',
    description: 'Astonishing 360-degree radiating acicular "hedgehog" crystal sprays extending up to 12cm inside basalt gas bubbles, exhibiting diagnostic pyroelectric and piezoelectric behavior.',
  },
  {
    id: 'min-8',
    name: 'Beryl var. Emerald in Biotite Schist',
    varietyOrSubtype: 'Metasomatic Pegmatite Hexagonal Prisms',
    mindatId: 1375,
    mindatUrl: 'https://www.mindat.org/min-1375.html',
    formula: 'Be₃Al₂Si₆O₁₈ : Cr,V',
    crystalSystem: 'Hexagonal',
    classification: 'Gemstone',
    locality: 'Rajgarh - Bubani Emerald Belt, Ajmer, Rajasthan, India',
    region: 'Rajasthan',
    hardness: '7.5 - 8.0',
    specificGravity: '2.67 - 2.78',
    luster: 'Vitreous',
    color: 'Intense Deep Grass Green',
    streak: 'White',
    spaceGroup: 'P6/mcc',
    cleavage: '{0001} Imperfect',
    paragenesis: ['Biotite', 'Actinolite', 'Talc', 'Tourmaline'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/B%C3%A9ryl_var._%C3%A9meraude_sur_gangue_%28Muzo_Mine_Boyaca_-_Colombie%29_2.jpg',
    description: 'Hexagonal prismatic emerald crystals formed along metasomatic shear contact zones between beryllium-bearing pegmatites and ultramafic chromium-rich talc-actinolite schists of Rajasthan.',
  },
  {
    id: 'min-9',
    name: 'Okenite Velvety "Cotton Ball"',
    varietyOrSubtype: 'Fibrous Basalt Amygdule Puffs',
    mindatId: 2967,
    mindatUrl: 'https://www.mindat.org/min-2967.html',
    formula: 'Ca₁₀Si₁₈O₄₆ · 18H₂O',
    crystalSystem: 'Triclinic',
    classification: 'Zeolite & Silicate',
    locality: 'Malad Quarry, Mumbai Suburbs, Maharashtra, India',
    region: 'Maharashtra (Deccan)',
    hardness: '4.5 - 5.0',
    specificGravity: '2.28 - 2.33',
    luster: 'Silky to Pearly',
    color: 'Snow-White to Soft Ivory',
    streak: 'White',
    spaceGroup: 'P1̄',
    cleavage: '{001} Perfect',
    paragenesis: ['Prehnite', 'Gyrolite', 'Laumontite', 'Apophyllite'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Okenit%2C_Gyrolith%2C_Prehnit._Indien...2H1A6998OB.jpg',
    description: 'Famous worldwide on Mindat as velvety "cotton ball" spheres made of microscopic flexible fibrous crystals nestled inside basaltic geodes from Mumbai’s coastal quarries.',
  },
];
export const SPONSOR_TIERS = [
  {
    tier: 'Platinum Bedrock',
    contribution: '₹1,50,000+',
    badgeColor: 'border-[#82AC38] text-[#82AC38]',
    features: [
      'Naming rights for Geogenesis 2026 Keynote Stage',
      'Exclusive 30-minute campus recruitment & talk slot',
      'Prominent logo on all field kits, notebooks & stream overlays',
      'Direct access to national student resume database (1,500+ students)',
      'Dedicated sponsor booth at the Annual Conclave',
    ],
  },
  {
    tier: 'Gold Stratum',
    contribution: '₹75,000',
    badgeColor: 'border-[#3898D8] text-[#3898D8]',
    features: [
      'Co-sponsor status for 4 Talk Show episodes',
      'Branded Olympiad trophy and awards partner',
      'Logo on GSS website header & YouTube live descriptions',
      'Full-page feature in the annual Geogenesis Memoir',
      'Promotional flyer inclusion in all attendee kits',
    ],
  },
  {
    tier: 'Silver Outcrop',
    contribution: '₹30,000',
    badgeColor: 'border-[#F2EFE6]/40 text-[#F2EFE6]',
    features: [
      'Logo on GSS official website Partner Wall',
      'Social media shoutouts across LinkedIn & Instagram (15k+ impressions)',
      'Sponsor acknowledgment during opening ceremony',
      '1 complimentary exhibitor pass to Geogenesis',
    ],
  },
];
