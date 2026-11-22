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
  category: 'Transport' | 'Campus' | 'Healthcare' | 'Manufacturing' | 'Mobile' | 'Python';
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
    badge: 'Final-Year Project · In Progress',
    description:
      'Five-member final-year team developing an intelligent shuttle queue and fleet platform for campus transport, reservations, boarding, and fleet workflows across Student, Marshal, Shuttle Manager, Admin, and Driver modules.',
    tech: ['C#', 'ASP.NET Core Web API', 'Entity Framework Core', 'SQL Server', 'JWT'],
    highlights: [
      'Own the Driver module: profiles, shifts, shuttle and route assignments, trip progression, incident reporting, and delay reporting.',
      'Built its backend with ASP.NET Core Web API, Entity Framework Core, SQL Server, JWT authentication, and role-aware driver workflows.',
      'Implemented a trip lifecycle from boarding through completion, with operational timestamps and status transitions.',
    ],
    repositoryUrl: 'https://github.com/D3vSyndicate/Madibaz_Transit',
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
    badge: '2nd Place · School of IT Hackathon · 2026',
    description:
      'Five-member hackathon team project: a mobile-first orientation and support platform for incoming first-year students at Nelson Mandela University.',
    tech: ['React Native', 'TypeScript', 'Expo', 'Supabase', 'PostgreSQL'],
    highlights: [
      'Focused on the student-facing experience: accessible UI, adjustable text sizing, and supportive messaging.',
      'Built schedules, support pathways, navigation, and real-time announcements.',
    ],
    repositoryUrl: 'https://github.com/D3vSyndicate/Campus-Companion',
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
    title: 'Cool Rides — Automobile Production Simulation',
    category: 'Manufacturing',
    badge: 'C# Manufacturing Simulation · 2025',
    description:
      'Multithreaded C# Windows Forms simulation of automobile production, built around vehicle orders, assembly lines, and shared production resources.',
    tech: ['C#', 'Windows Forms', '.NET Framework 4.7.2', 'Multithreading', 'Design Patterns'],
    highlights: [
      'Applied Abstract Factory, Factory Method, Singleton, and Command patterns to model production workflows.',
      'Implemented thread-safe UI updates for the live production simulation.',
    ],
    repositoryUrl: 'https://github.com/D3vSyndicate/Automobile-Production',
    theme: {
      id: 'default',
      primaryColor: '#f97316',
      emissiveColor: '#c2410c',
      ringColor: '#fb923c',
      distort: 0.2,
      speed: 2,
      cameraPos: [1.4, 0.7, 5.1],
    },
  },
  {
    title: 'Gym Mobile Application',
    category: 'Mobile',
    badge: 'Group Project · Android / Java / Firebase',
    description:
      'Android gym-management app supporting trainers, members, workout programmes, and scheduled training sessions.',
    tech: ['Java', 'Android', 'Firebase', 'Firestore'],
    highlights: [
      'Built the trainer-facing module for creating workout programmes and scheduling sessions.',
      'Added member views and session status updates with real-time Firestore synchronization.',
    ],
    repositoryUrl: 'https://github.com/D3vSyndicate/Gym_Mobile_Application',
    theme: {
      id: 'default',
      primaryColor: '#22c55e',
      emissiveColor: '#15803d',
      ringColor: '#4ade80',
      distort: 0.28,
      speed: 2.2,
      cameraPos: [-1.3, 0.6, 5.1],
    },
  },
  {
    title: 'Medical Practice Management System',
    category: 'Healthcare',
    badge: 'Full-Stack Web Application · In Progress',
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
    badge: 'Healthcare Web App · 2025–2026',
    description:
      'Web-based system digitising pharmacy workflows, including prescription management, medication dispensing, and stock tracking.',
    tech: ['ASP.NET Core', 'React', 'SQL Server'],
    highlights: [
      'Digitised prescription verification, dispensing workflows, and stock level tracking.',
    ],
    repositoryUrl: 'https://github.com/D3vSyndicate/Prescription_Management_System',
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
  {
    title: 'IP Geolocation Tracker',
    category: 'Python',
    badge: 'Interactive Mapping',
    description:
      'Python tool that looks up location details for an IP address and displays the result on an interactive map.',
    tech: ['Python', 'Requests', 'Folium'],
    highlights: [
      'Accepts an IP address or retrieves the current public IP.',
      'Maps location details and reports proxy status.',
    ],
    repositoryUrl: 'https://github.com/Sibucode/HexSoftwares-GeolocationTracker',
    theme: {
      id: 'default',
      primaryColor: '#38bdf8',
      emissiveColor: '#0284c7',
      ringColor: '#22d3ee',
      distort: 0.18,
      speed: 2.4,
      cameraPos: [1.2, 0.6, 5.1],
    },
  },
  {
    title: 'Python Voice Assistant',
    category: 'Python',
    badge: 'Voice-Controlled Automation',
    description:
      'Voice-controlled assistant that responds to spoken commands with information, media playback, and common actions.',
    tech: ['Python', 'SpeechRecognition', 'pyttsx3', 'pywhatkit', 'Wikipedia'],
    highlights: [
      'Recognises voice commands and responds with text-to-speech.',
      'Supports tasks such as web searches, music playback, Wikipedia summaries, and date and time queries.',
    ],
    repositoryUrl: 'https://github.com/Sibucode/HexSoftwares_Python_Voice-Assistant',
    theme: {
      id: 'default',
      primaryColor: '#a855f7',
      emissiveColor: '#6b21a8',
      ringColor: '#f472b6',
      distort: 0.35,
      speed: 2.1,
      cameraPos: [-1.2, 0.8, 5.1],
    },
  },
  {
    title: 'Rent & Expenses Calculator',
    category: 'Python',
    badge: 'Desktop GUI',
    description:
      'Tkinter application for adding up shared household expenses and calculating each roommate’s share.',
    tech: ['Python', 'Tkinter'],
    highlights: [
      'Combines rent, food, and electricity costs.',
      'Validates inputs and displays the total and per-person amount.',
    ],
    repositoryUrl: 'https://github.com/Sibucode/HexSoftwares_Rent_Calculator',
    theme: {
      id: 'default',
      primaryColor: '#f59e0b',
      emissiveColor: '#b45309',
      ringColor: '#fbbf24',
      distort: 0.12,
      speed: 1.7,
      cameraPos: [1.1, -0.7, 5.1],
    },
  },
];