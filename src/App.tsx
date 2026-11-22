import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Mail,
  ShieldCheck,
  GraduationCap,
  Trophy,
  Download,
  Search,
  X,
  Layers,
  Atom,
  Cloud,
  Code2,
  Coffee,
  Database,
  Flame,
  Smartphone,
  Terminal,
  Server,
  Workflow,
  Play,
  ChevronRight,
  MessageCircle,
  Send,
} from 'lucide-react';
import portrait from './assets/me.jpg';
import { DEFAULT_THEME, PROJECTS } from './data/portfolioData';
import type { Project } from './data/portfolioData';
import type { PortfolioGameStage } from './components/PortfolioGameScene';
import { answerNaviQuestion } from './data/naviKnowledge';
import type { NaviReply } from './data/naviKnowledge';

const CyberCoreScene = lazy(() => import('./components/CyberCoreScene'));
const PortfolioGameScene = lazy(() => import('./components/PortfolioGameScene'));
const PROJECT_CATEGORIES = ['All', ...new Set(PROJECTS.map((project) => project.category))];
const SKILL_GROUPS = [
  {
    label: 'Backend & architecture',
    detail: 'Reliable services and clean design',
    icon: Server,
    skills: [
      { name: 'C#', icon: Code2 },
      { name: 'ASP.NET Core', icon: Server },
      { name: 'Entity Framework', icon: Database },
      { name: 'REST APIs', icon: Workflow },
      { name: 'SOLID', icon: Terminal },
    ],
  },
  {
    label: 'Web & mobile',
    detail: 'Interfaces for browser and pocket',
    icon: Atom,
    skills: [
      { name: 'React', icon: Atom },
      { name: 'TypeScript', icon: Code2 },
      { name: 'React Native', icon: Smartphone },
      { name: 'Expo', icon: Workflow },
      { name: 'Java', icon: Coffee },
      { name: 'Android', icon: Smartphone },
    ],
  },
  {
    label: 'Data & platforms',
    detail: 'Persistent data and connected apps',
    icon: Database,
    skills: [
      { name: 'SQL Server', icon: Database },
      { name: 'PostgreSQL', icon: Database },
      { name: 'MySQL', icon: Database },
      { name: 'Firebase', icon: Flame },
      { name: 'Supabase', icon: Database },
      { name: 'AWS', icon: Cloud },
    ],
  },
  {
    label: 'Security & networks',
    detail: 'Safer systems, considered end to end',
    icon: ShieldCheck,
    skills: [
      { name: 'JWT auth', icon: ShieldCheck },
      { name: 'Network security', icon: Workflow },
      { name: 'Threat analysis', icon: ShieldCheck },
      { name: 'Cybersecurity & IoT', icon: Terminal },
    ],
  },
];

const GUIDE_STOPS = [
  { id: 'about', title: 'The overview', detail: 'Meet the engineer behind the work.' },
  { id: 'projects', title: 'Selected builds', detail: 'Open case studies or visit the public repositories.' },
  { id: 'journey', title: 'The journey', detail: 'See the study, engineering, and recognition milestones.' },
  { id: 'skills', title: 'The toolkit', detail: 'Explore the technologies and engineering disciplines.' },
  { id: 'contact', title: 'Get in touch', detail: 'Find the best way to connect or download the CV.' },
];
const JOURNEY_STEPS = [
  {
    phase: '01 / LEARNING',
    title: 'A strong academic foundation',
    detail: 'Final-year Bachelor of Information Technology student at Nelson Mandela University in Gqeberha.',
    evidence: ['85.6% S1 average', 'Final-year BIT'],
    icon: GraduationCap,
    section: 'skills',
    action: 'Explore the toolkit',
  },
  {
    phase: '02 / BUILDING',
    title: 'Software for real workflows',
    detail: 'Project work spans campus transport and support, healthcare, automobile production, and Python tools.',
    evidence: [`${PROJECTS.length} featured builds`, 'Backend · Mobile · Full-stack'],
    icon: Code2,
    section: 'projects',
    action: 'See selected builds',
  },
  {
    phase: '03 / EXPLORING',
    title: 'Security & cloud foundations',
    detail: 'The CV lists a Digital Ubuntu Cybersecurity & AI internship, Cisco Cybersecurity & IoT learning, and AWS Cloud Engineering.',
    evidence: ['Cybersecurity', 'Cloud engineering'],
    icon: ShieldCheck,
    section: 'skills',
    action: 'View technical skills',
  },
  {
    phase: '04 / CONTRIBUTING',
    title: 'Recognition and community',
    detail: 'School of IT Hackathon second place, Golden Key membership, Top BIT Second-Year Student, and BIT Academic Mentor.',
    evidence: ['Hackathon · 2nd place', 'Golden Key · Mentor'],
    icon: Trophy,
    section: 'contact',
    action: 'Connect with Sibusiso',
  },
];
const GUIDE_SECTION_LABELS = {
  about: 'View overview',
  projects: 'Explore projects',
  journey: 'View journey',
  skills: 'Explore skills',
  contact: 'Open contact',
} as const;
type NaviView = 'tour' | 'ask';
type NaviChatMessage = NaviReply & { id: number; role: 'user' | 'assistant' };

function GuideCharacter() {
  return (
    <span aria-hidden="true" className="guide-character">
      <span className="guide-character-antenna" />
      <span className="guide-character-face">
        <span />
        <span />
      </span>
      <span className="guide-character-base" />
    </span>
  );
}

function PortfolioGameIntro({
  stage,
  onStart,
  onPlay,
  onSkip,
}: {
  stage: PortfolioGameStage;
  onStart: () => void;
  onPlay: () => void;
  onSkip: () => void;
}) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.025, filter: 'blur(10px)' }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="portfolio-gate fixed inset-0 z-[100] overflow-hidden"
      onKeyDown={(event) => {
        if (event.key === 'Escape') onSkip();
        if (event.key === 'Tab') {
          const buttons = Array.from(
            event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not([disabled])')
          );
          const firstButton = buttons[0];
          const lastButton = buttons[buttons.length - 1];
          if (event.shiftKey && document.activeElement === firstButton) {
            event.preventDefault();
            lastButton?.focus();
          } else if (!event.shiftKey && document.activeElement === lastButton) {
            event.preventDefault();
            firstButton?.focus();
          }
        }
      }}
    >
      <div aria-hidden="true" className="game-scene">
        <Suspense fallback={<div className="game-scene-fallback" />}>
          <PortfolioGameScene stage={stage} />
        </Suspense>
      </div>
      <div aria-hidden="true" className="game-vignette" />
      <div className="game-hud">
        <span className="game-brand"><span>&lt;/&gt;</span> SIBUSISO.NXUMALO</span>
        <span className="game-hud-status"><span /> INTERACTIVE PORTFOLIO // 01</span>
      </div>

      <AnimatePresence mode="wait">
        {stage === 'title' && (
          <motion.section
            key="title"
            className="game-copy game-copy--title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45 }}
          >
            <p className="game-eyebrow"><span /> THE PORTFOLIO QUEST</p>
            <h1 id="game-title">
              A world of ideas,
              <br />
              <span>built to solve.</span>
            </h1>
            <p className="game-intro-description">
              Step into my workspace. Find the projects, skills, and story tucked inside.
            </p>
            <button type="button" autoFocus onClick={onStart} className="game-primary-button">
              <Play aria-hidden="true" fill="currentColor" /> Start game
            </button>
            <p className="game-control-hint">No controller needed · just explore</p>
          </motion.section>
        )}
        {stage === 'treasure' && (
          <motion.section
            key="treasure"
            className="game-copy game-copy--treasure"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45 }}
          >
            <p className="game-eyebrow"><span /> ARTIFACT DISCOVERED</p>
            <h1 id="game-title">
              The work is
              <br />
              <span>inside.</span>
            </h1>
            <p className="game-intro-description">
              Navi found the portfolio chest. Open it to explore the builds behind the ideas.
            </p>
            <button type="button" autoFocus onClick={onPlay} className="game-primary-button">
              <Play aria-hidden="true" fill="currentColor" /> Play
              <span className="game-button-caption">OPEN PORTFOLIO</span>
            </button>
            <p className="game-control-hint">Your projects, toolkit, and journey await</p>
          </motion.section>
        )}
        {stage === 'opening' && (
          <motion.section
            key="opening"
            className="game-copy game-copy--opening"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="game-eyebrow"><span /> ARTIFACT UNLOCKED</p>
            <h1 id="game-title">The chest is opening...</h1>
            <p className="game-intro-description mx-auto">Navi is revealing the work inside.</p>
          </motion.section>
        )}
        {stage === 'loading' && (
          <motion.section
            key="loading"
            className="game-copy game-copy--opening"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="game-eyebrow"><span /> PORTFOLIO UNLOCKED</p>
            <h1 id="game-title">Loading your portfolio...</h1>
            <p className="game-intro-description mx-auto">Preparing the projects, skills, and story.</p>
            <div className="game-loading-track"><span /></div>
          </motion.section>
        )}
      </AnimatePresence>

      {stage !== 'title' && (
        <motion.aside
          className="game-agent-message"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          aria-live="polite"
        >
          <GuideCharacter />
          <div>
            <p className="game-agent-name">NAVI <span>// YOUR GUIDE</span></p>
            <p>
              {stage === 'opening'
                ? 'The chest is opening. Your portfolio is inside!'
                : stage === 'loading'
                  ? 'Loading your workspace now.'
                  : 'I found something worth opening. Ready?'}
            </p>
          </div>
        </motion.aside>
      )}

      <button key={stage} type="button" autoFocus={stage === 'opening'} onClick={onSkip} className="game-skip-button">
        Skip intro <ArrowUpRight aria-hidden="true" />
      </button>
      {stage === 'loading' && <div aria-hidden="true" className="game-portal-flash" />}
    </motion.div>
  );
}

function PortfolioGuide({
  prefersReducedMotion,
  isOpen,
  onOpenChange,
  view,
  onViewChange,
}: {
  prefersReducedMotion: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  view: NaviView;
  onViewChange: (view: NaviView) => void;
}) {
  const [stopIndex, setStopIndex] = useState(-1);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<NaviChatMessage[]>([]);
  const currentStop = stopIndex >= 0 ? GUIDE_STOPS[stopIndex] : null;

  const goToNextStop = () => {
    const nextIndex = (stopIndex + 1) % GUIDE_STOPS.length;
    setStopIndex(nextIndex);
    onViewChange('tour');
    onOpenChange(true);
    document.getElementById(GUIDE_STOPS[nextIndex].id)?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const askQuestion = (rawQuestion: string) => {
    const text = rawQuestion.trim();
    if (!text) return;

    const reply = answerNaviQuestion(text);
    setMessages((previous) => [
      ...previous,
      { id: previous.length, role: 'user', text },
      { id: previous.length + 1, role: 'assistant', ...reply },
    ]);
    setQuestion('');
    onViewChange('ask');
  };

  const handleQuestionSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    askQuestion(question);
  };

  return (
    <aside className="portfolio-guide" aria-label="Navi portfolio assistant">
      {isOpen && (
        <motion.div
          className="portfolio-guide-panel"
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <div className="portfolio-guide-header">
            <div className="flex items-center gap-2.5">
              <GuideCharacter />
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-lime-300">Navi // your guide</p>
                <p className="mt-1 text-[10px] text-slate-500">Local CV + portfolio knowledge</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close Navi"
              onClick={() => onOpenChange(false)}
              className="rounded-full p-1 text-slate-500 transition hover:text-white"
            >
              <X aria-hidden="true" className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="portfolio-guide-tabs" role="tablist" aria-label="Navi tools">
            <button
              type="button"
              role="tab"
              aria-selected={view === 'ask'}
              aria-controls="navi-panel-content"
              onClick={() => onViewChange('ask')}
            >
              Ask Navi
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === 'tour'}
              aria-controls="navi-panel-content"
              onClick={() => onViewChange('tour')}
            >
              Tour
            </button>
          </div>
          <div id="navi-panel-content" className="portfolio-guide-content" role="tabpanel">
            {view === 'tour' ? (
              <>
                <div className="portfolio-guide-tour">
                  <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-slate-500">
                    {currentStop ? `STOP ${String(stopIndex + 1).padStart(2, '0')} / 05` : 'THE QUICK TOUR'}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-100">
                    {currentStop ? currentStop.title : 'Explore the portfolio'}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    {currentStop ? currentStop.detail : 'I can take you through the work, journey, skills, and contact details.'}
                  </p>
                </div>
                <button type="button" onClick={goToNextStop} className="portfolio-guide-next">
                  {currentStop ? `Next: ${GUIDE_STOPS[(stopIndex + 1) % GUIDE_STOPS.length].title}` : 'Start the tour'}
                  <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              </>
            ) : (
              <>
                <div className="navi-chat-log" role="log" aria-live="polite" aria-label="Conversation with Navi">
                  {messages.length === 0 ? (
                    <p className="navi-chat-empty">
                      Ask about Sibusiso’s education, skills, achievements, internship, or a specific project.
                    </p>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} className={`navi-message navi-message--${message.role}`}>
                        <p>{message.text}</p>
                        {message.role === 'assistant' && (
                          <div className="navi-message-links">
                            {message.section && (
                              <a href={`#${message.section}`} onClick={() => onOpenChange(false)}>
                                {GUIDE_SECTION_LABELS[message.section]}
                              </a>
                            )}
                            {message.repositoryUrl && (
                              <a href={message.repositoryUrl} target="_blank" rel="noreferrer">
                                Open repository <ArrowUpRight aria-hidden="true" />
                              </a>
                            )}
                            {message.cvDownload && (
                              <a
                                href={`${import.meta.env.BASE_URL}Sibusiso_Nxumalo_CV.pdf`}
                                download="Sibusiso_Nxumalo_CV.pdf"
                              >
                                Download CV <Download aria-hidden="true" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
                {messages.length === 0 && (
                  <div className="navi-suggestions" aria-label="Suggested questions">
                    {[
                      'What am I studying?',
                      'Tell me about automobile production',
                      'What technologies do I use?',
                    ].map((suggestion) => (
                      <button key={suggestion} type="button" onClick={() => askQuestion(suggestion)}>
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
                <form className="navi-question-form" onSubmit={handleQuestionSubmit}>
                  <label className="sr-only" htmlFor="navi-question">Ask Navi about the CV or portfolio</label>
                  <input
                    id="navi-question"
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    maxLength={300}
                    placeholder="Ask about the CV or portfolio..."
                  />
                  <button type="submit" disabled={!question.trim()} aria-label="Send question to Navi">
                    <Send aria-hidden="true" />
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      )}
      <button
        type="button"
        aria-label={isOpen ? 'Close Navi panel' : 'Open Navi CV and portfolio assistant'}
        aria-expanded={isOpen}
        onClick={() => onOpenChange(!isOpen)}
        className="portfolio-guide-toggle"
      >
        <GuideCharacter />
        <span>{isOpen ? 'NAVI OPEN' : 'ASK NAVI'}</span>
      </button>
    </aside>
  );
}

export default function App() {
  const [gameStage, setGameStage] = useState<PortfolioGameStage>('title');
  const [showGameIntro, setShowGameIntro] = useState(true);
  const [isNaviOpen, setIsNaviOpen] = useState(false);
  const [naviView, setNaviView] = useState<NaviView>('ask');
  const [projectSearch, setProjectSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [caseStudyProject, setCaseStudyProject] = useState<Project | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const caseStudyDialogRef = useRef<HTMLDialogElement>(null);
  const gameTransitionTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (gameTransitionTimerRef.current !== null) {
        window.clearTimeout(gameTransitionTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const dialog = caseStudyDialogRef.current;
    if (!dialog) return;

    if (caseStudyProject && !dialog.open) {
      dialog.showModal();
    } else if (!caseStudyProject && dialog.open) {
      dialog.close();
    }
  }, [caseStudyProject]);

  const normalizedSearch = projectSearch.trim().toLowerCase();
  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const searchableText = [
      project.title,
      project.category,
      project.description,
      ...project.tech,
      ...project.highlights,
    ]
      .join(' ')
      .toLowerCase();

    return matchesCategory && searchableText.includes(normalizedSearch);
  });

  const startTreasureRoom = () => setGameStage('treasure');
  const skipGameIntro = () => {
    if (gameTransitionTimerRef.current !== null) {
      window.clearTimeout(gameTransitionTimerRef.current);
    }
    setShowGameIntro(false);
  };
  const openPortfolio = () => {
    setGameStage('opening');
    gameTransitionTimerRef.current = window.setTimeout(() => {
      setGameStage('loading');
      gameTransitionTimerRef.current = window.setTimeout(
        () => setShowGameIntro(false),
        prefersReducedMotion ? 1800 : 2100
      );
    }, prefersReducedMotion ? 350 : 2300);
  };

  return (
    <MotionConfig reducedMotion="user">
      <>
        <AnimatePresence onExitComplete={() => document.getElementById('about')?.focus()}>
          {showGameIntro && (
            <PortfolioGameIntro
              key="portfolio-game-intro"
              stage={gameStage}
              onStart={startTreasureRoom}
              onPlay={openPortfolio}
              onSkip={skipGameIntro}
            />
          )}
        </AnimatePresence>
        <div
          inert={showGameIntro}
          className="relative min-h-screen overflow-x-clip bg-[#070907] text-slate-100 selection:bg-lime-300/30"
        >
          <div aria-hidden="true" className="site-atmosphere pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {!showGameIntro && (
              <div className="site-3d-art">
                <Suspense fallback={null}>
                  <CyberCoreScene activeTheme={DEFAULT_THEME} isBackground />
                </Suspense>
              </div>
            )}
            <div className="site-vignette absolute inset-0" />
          </div>

      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-lime-300/15 bg-[#080b08]/85 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:px-6">
          <a href="#about" aria-label="Sibusiso Nxumalo home" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-lime-300/30 bg-lime-300/10 font-mono text-xs font-bold text-lime-300">
              &lt;/&gt;
            </span>
            <span className="hidden font-mono text-[11px] font-semibold tracking-[0.16em] text-slate-200 sm:inline">
              SIBUSISO<span className="text-lime-300">.NXUMALO</span>
            </span>
          </a>
          <nav aria-label="Main navigation" className="flex items-center gap-3 text-xs sm:gap-4 sm:text-sm">
            <a href="#about" className="hidden text-slate-400 transition hover:text-lime-300 md:inline">
              About
            </a>
            <a href="#projects" className="hidden text-slate-400 transition hover:text-lime-300 md:inline">
              Work
            </a>
            <a href="#skills" className="hidden text-slate-400 transition hover:text-lime-300 md:inline">
              Skills
            </a>
            <a href="#journey" className="hidden text-slate-400 transition hover:text-lime-300 md:inline">
              Journey
            </a>
            <a
              href="https://www.linkedin.com/in/sibusiso-nxumalo-033691278/"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 text-slate-300 transition hover:text-lime-300 lg:flex"
            >
              LinkedIn <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/Sibucode"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-300 transition hover:text-lime-300"
            >
              <ArrowUpRight className="h-4 w-4" /> GitHub
            </a>
            <a
              href="#contact"
              className="rounded-full border border-lime-300/35 bg-lime-300/10 px-3.5 py-2 font-medium text-lime-200 transition hover:bg-lime-300/20"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <motion.section
          id="about"
          tabIndex={-1}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="hero-section relative grid min-h-[calc(100svh-5rem)] scroll-mt-24 items-center gap-8 py-8 md:grid-cols-12 lg:gap-10"
        >
          <div aria-hidden="true" className="hero-grid-plane" />
          <div aria-hidden="true" className="hero-grid-glow" />
          <div className="relative z-10 space-y-7 md:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-lime-300/[0.07] px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-lime-200 shadow-[0_0_35px_rgba(132,204,22,0.08)] sm:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-50 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-300" />
              </span>
              NMU // Final-year BIT · Gqeberha
            </div>

            <div className="space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-slate-500 sm:text-xs">
                Software engineer <span className="text-lime-300">//</span> backend · mobile · full-stack
              </p>
              <h1 className="max-w-2xl text-5xl font-black leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                From real-world problems to{' '}
                <span className="bg-gradient-to-r from-lime-300 via-green-300 to-emerald-200 bg-clip-text text-transparent">
                  useful software.
                </span>
              </h1>

              <p className="max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                I’m <strong className="text-slate-200">Sibusiso Nxumalo</strong>, a final-year BIT
                student building backend, mobile, and full-stack applications for campus, healthcare,
                and production workflows.
              </p>
            </div>

            <div className="hero-domain-strip" aria-label="Project domains">
              <span>WORK ACROSS</span>
              <i aria-hidden="true" />
              <span>Campus</span>
              <i aria-hidden="true" />
              <span>Healthcare</span>
              <i aria-hidden="true" />
              <span>Production</span>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-5 py-3 text-sm font-bold text-[#10140b] shadow-[0_0_35px_rgba(163,230,53,0.2)] transition hover:-translate-y-0.5 hover:bg-lime-200"
              >
                Explore projects <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={`${import.meta.env.BASE_URL}Sibusiso_Nxumalo_CV.pdf`}
                download="Sibusiso_Nxumalo_CV.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-lime-300/50 hover:bg-lime-300/[0.07]"
              >
                <Download className="h-4 w-4 text-lime-300" /> Download CV
              </a>
              <button
                type="button"
                onClick={() => {
                  setNaviView('ask');
                  setIsNaviOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/[0.05] px-5 py-3 text-sm font-medium text-lime-100 transition hover:border-lime-300/45 hover:bg-lime-300/10"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" /> Ask Navi
              </button>
            </div>

            <div className="hero-stats-grid">
              {[
                {
                  value: String(PROJECTS.length).padStart(2, '0'),
                  label: 'Featured builds',
                  detail: 'Selected work',
                  icon: Layers,
                  className: 'hero-stat--builds',
                },
                {
                  value: '85.6%',
                  label: 'Final-year S1',
                  detail: 'Academic average',
                  icon: GraduationCap,
                  className: 'hero-stat--average',
                },
                {
                  value: '02',
                  label: 'SOIT Hackathon',
                  detail: '2nd place',
                  icon: Trophy,
                  className: 'hero-stat--award',
                },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <article key={stat.label} className={`hero-stat-card ${stat.className}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-600">
                        0{index + 1} / data
                      </span>
                      <Icon aria-hidden="true" className="h-3.5 w-3.5 text-lime-300/80" />
                    </div>
                    <div className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-300 sm:text-[10px]">
                      {stat.label}
                    </div>
                    <div className="mt-1 font-mono text-[8px] text-slate-500 sm:text-[9px]">{stat.detail}</div>
                    <div aria-hidden="true" className="hero-stat-leds mt-3">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 md:col-span-6">
            <div className="hero-portrait-stage">
              <div aria-hidden="true" className="portrait-halo" />
              <div aria-hidden="true" className="portrait-orbit portrait-orbit--outer" />
              <div aria-hidden="true" className="portrait-orbit portrait-orbit--inner" />
              <div className="portrait-frame">
                <img
                  src={portrait}
                  alt="Sibusiso Nxumalo at Nelson Mandela University"
                  className="h-full w-full rounded-full object-cover object-[center_30%]"
                />
              </div>
              <div className="portrait-tag portrait-tag--top">
                <span className="portrait-tag-dot" />
                <span>NMU · GQEBERHA</span>
              </div>
              <div className="portrait-tag portrait-tag--bottom">
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-slate-500">Current focus</span>
                <span className="mt-1 block text-xs font-semibold text-slate-100">Software engineering</span>
              </div>
              <div aria-hidden="true" className="portrait-coordinate portrait-coordinate--top">
                PROFILE / 001
              </div>
              <div aria-hidden="true" className="portrait-coordinate portrait-coordinate--bottom">
                SYSTEMS / 3D
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="projects"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-20 space-y-6 scroll-mt-24"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.24em] text-sky-400">Selected work</p>
              <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">Featured Engineering Projects</h2>
              <p className="mt-1 text-sm text-slate-400">
                Explore the builds, open a case study, or ask Navi for a guided tour.
              </p>
            </div>

          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/35 p-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="relative block w-full sm:max-w-sm">
              <span className="sr-only">Search projects and technologies</span>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              />
              <input
                type="search"
                value={projectSearch}
                onChange={(event) => setProjectSearch(event.target.value)}
                placeholder="Search projects or technologies"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 py-2.5 pl-10 pr-10 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
              />
              {projectSearch && (
                <button
                  type="button"
                  aria-label="Clear project search"
                  onClick={() => setProjectSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              )}
            </label>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
              {PROJECT_CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                      isActive
                        ? 'border-sky-400/60 bg-sky-500/15 text-sky-200'
                        : 'border-slate-700 bg-slate-950/50 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-slate-400" aria-live="polite">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
          </p>

          {filteredProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredProjects.map((project, index) => {
              return (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.45, delay: (index % 2) * 0.1 }}
                  className="project-card group relative isolate overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/60"
                >
                  <div
                    aria-hidden="true"
                    className="project-card-glow pointer-events-none"
                    style={{ backgroundColor: project.theme.primaryColor }}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-sky-300">
                      {project.badge}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-slate-500">{project.category}</span>
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 rounded-full shadow-[0_0_14px_rgba(255,255,255,0.35)]"
                        style={{ backgroundColor: project.theme.primaryColor }}
                      />
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-slate-100">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.description}</p>

                  <ul className="mt-4 space-y-2 text-xs text-slate-300">
                    {project.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1 text-sky-400">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-slate-800 bg-slate-950/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
                    {project.repositoryUrl && (
                      <a
                        href={project.repositoryUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium text-slate-300 transition hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                      >
                        Repository <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setCaseStudyProject(project)}
                      className="inline-flex items-center gap-1.5 px-2 py-2 text-xs font-medium text-sky-300 transition hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      Case study <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.article>
              );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-6 py-10 text-center">
              <p className="font-medium text-slate-200">No projects match that search.</p>
              <p className="mt-1 text-sm text-slate-400">Try another keyword or choose a different category.</p>
            </div>
          )}
        </motion.section>

        <motion.section
          id="journey"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-24 scroll-mt-24"
        >
          <div className="journey-heading">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.24em] text-sky-400">The journey // in progress</p>
              <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">Learning, building, giving back.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                A path shaped by study, real-world projects, security learning, and community.
              </p>
            </div>
            <span className="journey-counter"><span /> 04 FIELD NOTES</span>
          </div>

          <div className="journey-grid">
            {JOURNEY_STEPS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.phase}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="journey-card"
                >
                  <div className="journey-card-top">
                    <span className="journey-card-index">0{index + 1}</span>
                    <span className="journey-card-icon"><Icon aria-hidden="true" /></span>
                  </div>
                  <p className="journey-card-phase">{item.phase}</p>
                  <h3>{item.title}</h3>
                  <p className="journey-card-detail">{item.detail}</p>
                  <div className="journey-evidence">
                    {item.evidence.map((fact) => <span key={fact}>{fact}</span>)}
                  </div>
                  <a className="journey-card-link" href={`#${item.section}`}>
                    {item.action} <ArrowUpRight aria-hidden="true" />
                  </a>
                </motion.article>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          id="skills"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-24 scroll-mt-24"
        >
          <div className="mb-8 max-w-3xl">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.24em] text-sky-400">The engineering stack</p>
            <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">Tools in orbit. Systems in motion.</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              The technologies I use to turn real workflows into reliable software.
            </p>
          </div>
          <div className="skills-constellation">
            <div aria-hidden="true" className="skills-orbit skills-orbit--one" />
            <div aria-hidden="true" className="skills-orbit skills-orbit--two" />
            <div className="skills-center">
              <span className="skills-center-mark">&lt;/&gt;</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">engineering</span>
            </div>
            <div className="skills-groups">
              {SKILL_GROUPS.map((group, groupIndex) => {
                const GroupIcon = group.icon;
                return (
                  <article key={group.label} className={`skill-group skill-group--${groupIndex + 1}`}>
                    <div className="skill-group-heading">
                      <span className="skill-group-icon"><GroupIcon aria-hidden="true" /></span>
                      <div>
                        <h3>{group.label}</h3>
                        <p>{group.detail}</p>
                      </div>
                    </div>
                    <div className="skill-chip-list">
                      {group.skills.map((skill) => {
                        const SkillIcon = skill.icon;
                        return (
                          <span key={skill.name} className="skill-chip">
                            <SkillIcon aria-hidden="true" />
                            {skill.name}
                          </span>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <article className="skill-note-card">
              <div className="flex items-center gap-3">
                <span className="skill-note-icon"><ShieldCheck aria-hidden="true" /></span>
                <div>
                  <h3>Security & cloud foundations</h3>
                  <p>Cisco Intro to Cybersecurity & IoT · AWS Cloud Engineering · Digital Ubuntu Cybersecurity & AI Intern</p>
                </div>
              </div>
            </article>
            <article className="skill-note-card">
              <div className="flex items-center gap-3">
                <span className="skill-note-icon"><Trophy aria-hidden="true" /></span>
                <div>
                  <h3>Recognition & community</h3>
                  <p>Golden Key · Top BIT Second-Year Student · BIT Academic Mentor</p>
                </div>
              </div>
            </article>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-24 scroll-mt-24"
        >
          <div className="relative overflow-hidden rounded-3xl border border-sky-500/25 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-emerald-950/60 p-7 shadow-[0_0_60px_rgba(132,204,22,0.1)] sm:p-10">
            <div className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full bg-sky-500/15 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.24em] text-sky-400">Get in touch</p>
                <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">Let’s build something useful.</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Have a role, collaboration, or project in mind? I’d be glad to hear from you.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:stachmaro@gmail.com"
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_10px_30px_rgba(14,165,233,0.25)] transition hover:bg-sky-400"
                >
                  <Mail className="h-4 w-4" /> Email me
                </a>
                <a
                  href={`${import.meta.env.BASE_URL}Sibusiso_Nxumalo_CV.pdf`}
                  download="Sibusiso_Nxumalo_CV.pdf"
                  className="inline-flex items-center gap-2 rounded-xl border border-sky-500/30 bg-sky-500/10 px-5 py-3 text-sm font-medium text-sky-200 transition hover:bg-sky-500/20"
                >
                  <Download className="h-4 w-4" /> Download CV
                </a>
                <a
                  href="https://github.com/Sibucode"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/50 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500"
                >
                  GitHub <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sibusiso-nxumalo-033691278/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/50 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500"
                >
                  LinkedIn <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <dialog
        ref={caseStudyDialogRef}
        aria-labelledby="case-study-title"
        aria-describedby="case-study-description"
        className="case-study-dialog max-h-[85vh] overflow-y-auto rounded-3xl border border-sky-500/25 bg-[#111510] p-0 text-slate-100 shadow-[0_0_80px_rgba(132,204,22,0.16)]"
        onClose={() => setCaseStudyProject(null)}
        onCancel={(event) => {
          event.preventDefault();
          setCaseStudyProject(null);
          event.currentTarget.close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        {caseStudyProject && (
          <div className="p-6 sm:p-8">
            <header className="flex items-start justify-between gap-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sky-400">
                  {caseStudyProject.category} // CASE STUDY
                </p>
                <h2 id="case-study-title" className="mt-2 text-2xl font-bold text-slate-100 sm:text-3xl">
                  {caseStudyProject.title}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close case study"
                onClick={() => caseStudyDialogRef.current?.close()}
                className="rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-300 transition hover:border-slate-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </header>

            <section className="mt-7 rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">Project overview</h3>
              <p id="case-study-description" className="mt-3 text-sm leading-relaxed text-slate-200">
                {caseStudyProject.description}
              </p>
            </section>

            <section className="mt-6">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">Engineering notes</h3>
              <ul className="mt-3 space-y-3">
                {caseStudyProject.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm leading-relaxed text-slate-300">
                    <span aria-hidden="true" className="mt-1 text-sky-400">▹</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-6">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">Technology stack</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {caseStudyProject.tech.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-1.5 font-mono text-xs text-slate-200"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </section>

            <section className="mt-6 border-t border-slate-800 pt-5">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">Project links</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {caseStudyProject.repositoryUrl && (
                  <a
                    href={caseStudyProject.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200 transition hover:border-sky-500/50 hover:text-sky-200"
                  >
                    Source repository <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
                {caseStudyProject.demoUrl && (
                  <a
                    href={caseStudyProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200 transition hover:border-sky-500/50 hover:text-sky-200"
                  >
                    Live demo <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
                {!caseStudyProject.repositoryUrl && !caseStudyProject.demoUrl && (
                  <p className="text-sm text-slate-400">No public source or demo link is listed for this project.</p>
                )}
              </div>
            </section>
          </div>
        )}
      </dialog>

      {!showGameIntro && (
        <PortfolioGuide
          prefersReducedMotion={prefersReducedMotion}
          isOpen={isNaviOpen}
          onOpenChange={setIsNaviOpen}
          view={naviView}
          onViewChange={setNaviView}
        />
      )}

      <footer className="relative z-10 mt-20 border-t border-slate-800/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono tracking-wider">SIBUSISO.NXUMALO // DEV</span>
          <div className="flex items-center gap-4">
            <span>Designed and built with care.</span>
            <a
              href="https://github.com/Sibucode/sibusiso-3d-portfolio"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 transition hover:text-sky-300"
            >
              Portfolio source <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </footer>
        </div>
      </>
    </MotionConfig>
  );
}