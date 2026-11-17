export interface ProjectTheme {
  id: 'default' | 'transit' | 'campus' | 'medical' | 'pharmacy';
  primaryColor: string;
  emissiveColor: string;
  ringColor: string;
  distort: number;
  speed: number;
  cameraPos: [number, number, number];
}

export interface Project {
  title: string;
  category: 'Transport' | 'Campus' | 'Healthcare';
  badge: string;
  description: string;
  tech: string[];
  highlights: string[];
  theme: ProjectTheme;
  repositoryUrl?: string;
  demoUrl?: string;
}

export const DEFAULT_THEME: ProjectTheme = {
  id: 'default',
  primaryColor: '#a3e635',
  emissiveColor: '#4d7c0f',
  ringColor: '#d9f99d',
  distort: 0.25,
  speed: 2,
  cameraPos: [0, 0, 5.5],
};

export const PROJECTS: Project[] = [
  {
    title: 'Madibaz Transit — Fleet & Shuttle Platform',
    category: 'Transport',
    badge: 'Final-Year Capstone',
    description:
      'Intelligent campus shuttle queue and fleet management system digitising reservations, boarding, and real-time trip workflows.',
    tech: ['C#', 'ASP.NET Core Web API', 'Entity Framework Core', 'SQL Server', 'JWT'],
    highlights: [
      'Own the Driver module: profiles, shift management, route assignments, incident and delay reporting.',
      'Engineered a structured trip lifecycle (boarding, departure, in-transit, arrival, completion) with operational timestamps.',
    ],
    theme: {
      id: 'transit',
      primaryColor: '#38bdf8', // Electric Cyan — Real-time routing
      emissiveColor: '#0284c7',
      ringColor: '#22d3ee',
      distort: 0.15,
      speed: 3.5,
      cameraPos: [1.8, 0.8, 4.8],
    },
  },
  {
    title: 'Campus Companion',
    category: 'Campus',
    badge: '2nd Place — School of IT Hackathon',
    description:
      'Mobile-first orientation and support platform built for incoming first-year students at Nelson Mandela University.',
    tech: ['React Native', 'TypeScript', 'Expo', 'Supabase', 'PostgreSQL'],
    highlights: [
      'Led student-facing UX with adjustable text sizing and accessibility-first navigation.',
      'Built schedules, support pathways, navigation, and real-time announcements.',
    ],
    theme: {
      id: 'campus',
      primaryColor: '#a855f7', // Violet — Mobile & Student UX
      emissiveColor: '#6b21a8',
      ringColor: '#f472b6',
      distort: 0.45,
      speed: 2.5,
      cameraPos: [-1.8, 1.0, 5.0],
    },
  },
  {
    title: 'Medical Practice Management System',
    category: 'Healthcare',
    badge: 'Full-Stack Web Application',
    description:
      'Centralised system replacing manual patient record management across patients, medical records, and appointments.',
    tech: ['ASP.NET Core Web API', 'Entity Framework', 'React', 'SQL Server'],
    highlights: [
      'Designed the relational database schema and React frontend.',
      'Streamlined clinical scheduling and centralised patient record tracking.',
    ],
    theme: {
      id: 'medical',
      primaryColor: '#10b981', // Emerald — Healthcare & Data Integrity
      emissiveColor: '#047857',
      ringColor: '#34d399',
      distort: 0.08,
      speed: 1.4,
      cameraPos: [0, -1.2, 4.9],
    },
  },
  {
    title: 'Prescription Management Web App',
    category: 'Healthcare',
    badge: 'Healthcare & Inventory',
    description:
      'Web-based system digitising pharmacy workflows, including prescription management, medication dispensing, and stock tracking.',
    tech: ['ASP.NET Core', 'React', 'SQL Server'],
    highlights: [
      'Digitised prescription verification, dispensing workflows, and stock level tracking.',
    ],
    theme: {
      id: 'pharmacy',
      primaryColor: '#f59e0b', // Amber — Precision & Inventory
      emissiveColor: '#b45309',
      ringColor: '#fbbf24',
      distort: 0.12,
      speed: 1.8,
      cameraPos: [1.4, -0.9, 5.2],
    },
  },
];