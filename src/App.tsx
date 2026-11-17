import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Mail,
  RotateCcw,
  Terminal,
  ShieldCheck,
  Layers,
  GraduationCap,
  Trophy,
  BriefcaseBusiness,
  Download,
  Search,
  X,
} from 'lucide-react';
import { DEFAULT_THEME, PROJECTS } from './data/portfolioData';
import type { Project, ProjectTheme } from './data/portfolioData';

const CyberCoreScene = lazy(() => import('./components/CyberCoreScene'));
const PROJECT_CATEGORIES = ['All', ...new Set(PROJECTS.map((project) => project.category))];

function CyberCoreScenePlaceholder({
  loading,
  onActivate,
}: {
  loading: boolean;
  onActivate?: () => void;
}) {
  return (
    <div
      role={loading ? 'status' : undefined}
      aria-live={loading ? 'polite' : undefined}
      className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-[2rem] border border-sky-500/10 bg-[radial-gradient(ellipse_at_center,rgba(20,50,12,0.34),rgba(9,11,9,0.05)_58%,transparent_78%)] lg:h-[580px]"
    >
      <div className="pointer-events-none absolute inset-6 rounded-[1.5rem] border border-white/[0.04]" />
      <div className="pointer-events-none absolute left-7 top-7 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
        Interactive system model
      </div>
      <div className="pointer-events-none absolute right-7 top-7 font-mono text-[10px] tracking-[0.18em] text-slate-600">
        3D / LIVE
      </div>
      {loading ? (
        <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
          <span className="h-4 w-4 animate-spin rounded-full border border-sky-400/30 border-t-sky-400 motion-reduce:animate-none" />
          Loading interactive model…
        </div>
      ) : (
        <button
          type="button"
          onClick={onActivate}
          className="rounded-xl border border-sky-500/30 bg-slate-950/70 px-4 py-2.5 font-mono text-xs text-sky-300 transition hover:border-sky-400/60 hover:bg-sky-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          Load interactive 3D core
        </button>
      )}
    </div>
  );
}

export default function App() {
  const [activeTheme, setActiveTheme] = useState<ProjectTheme>(DEFAULT_THEME);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [projectSearch, setProjectSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [caseStudyProject, setCaseStudyProject] = useState<Project | null>(null);
  const [sceneIsNearViewport, setSceneIsNearViewport] = useState(
    () => typeof IntersectionObserver === 'undefined'
  );
  const sceneContainerRef = useRef<HTMLDivElement>(null);
  const caseStudyDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const sceneContainer = sceneContainerRef.current;
    if (!sceneContainer) return;

    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setSceneIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '180px' }
    );

    observer.observe(sceneContainer);
    return () => observer.disconnect();
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

  const handleSelectProject = (title: string, theme: ProjectTheme) => {
    if (selectedTitle === title) {
      setSelectedTitle(null);
      setActiveTheme(DEFAULT_THEME);
    } else {
      setSelectedTitle(title);
      setActiveTheme(theme);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen overflow-hidden bg-[#090b09] text-slate-100 selection:bg-sky-500/30">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-8%] h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute right-[-8%] top-[15%] h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-lime-500/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#090b09]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="rounded-full border border-sky-500/30 bg-slate-900/80 px-3 py-1.5 font-mono text-xs font-semibold tracking-[0.28em] text-sky-400 shadow-[0_0_30px_rgba(14,165,233,0.12)]">
            SIBUSISO.NXUMALO // DEV
          </span>
          <div className="flex items-center gap-4 text-sm">
            <a href="#projects" className="hidden text-slate-400 transition hover:text-sky-300 sm:inline">
              Work
            </a>
            <a href="#journey" className="hidden text-slate-400 transition hover:text-sky-300 sm:inline">
              Journey
            </a>
            <a
              href="https://github.com/Sibucode"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-300 transition hover:text-sky-400"
            >
              <ArrowUpRight className="h-4 w-4" /> GitHub
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-3.5 py-1.5 text-sky-300 transition hover:bg-sky-500/20"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="grid items-center gap-10 lg:grid-cols-12"
        >
          <div className="space-y-7 lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1.5 text-xs font-medium text-sky-300 shadow-[0_0_30px_rgba(14,165,233,0.12)]">
              <Terminal className="h-3.5 w-3.5" />
              Final-Year BIT Student • 85.6% S1 Average • NMU
            </div>

            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-black tracking-tight sm:text-5xl lg:text-[4rem] lg:leading-[1.02]">
                Building resilient{' '}
                <span className="bg-gradient-to-r from-sky-400 via-lime-300 to-emerald-300 bg-clip-text text-transparent">
                  backend, mobile & full-stack
                </span>{' '}
                systems.
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-slate-400">
                I'm <strong className="text-slate-200">Sibusiso Nxumalo</strong>, a software engineer
                specialising in C#, ASP.NET Core, SQL Server, React, and React Native with hands-on
                experience in cybersecurity and cloud fundamentals. Click any project below to inspect
                its interactive 3D architecture node.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#projects"
                className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_10px_30px_rgba(14,165,233,0.35)] transition hover:bg-sky-400"
              >
                Explore Projects
              </a>
              <a
                href="mailto:stachmaro@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
              >
                <Mail className="h-4 w-4" /> stachmaro@gmail.com
              </a>
            </div>

            <div className="grid max-w-md grid-cols-3 gap-3 pt-4 text-left text-slate-300">
              {[
                ['C# / .NET', 'Backend'],
                ['React Native', 'Mobile'],
                ['SQL Server', 'Data'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-3">
                  <div className="text-xl font-bold text-sky-300">{value}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div ref={sceneContainerRef} className="lg:col-span-6">
            {sceneIsNearViewport ? (
              <Suspense fallback={<CyberCoreScenePlaceholder loading />}>
                <CyberCoreScene activeTheme={activeTheme} />
              </Suspense>
            ) : (
              <CyberCoreScenePlaceholder
                loading={false}
                onActivate={() => setSceneIsNearViewport(true)}
              />
            )}
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
                Search by project or technology, preview the 3D core, or open a case study.
              </p>
            </div>

            {selectedTitle && (
              <button
                onClick={() => {
                  setSelectedTitle(null);
                  setActiveTheme(DEFAULT_THEME);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-300 transition hover:border-sky-500/50 hover:text-sky-300"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset 3D Core
              </button>
            )}
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
              const isSelected = selectedTitle === project.title;
              return (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.45, delay: (index % 2) * 0.1 }}
                  className={`group rounded-2xl border p-6 transition-all duration-300 ${
                    isSelected
                      ? 'border-sky-400 bg-slate-900/90 shadow-[0_0_30px_rgba(163,230,53,0.12)]'
                      : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
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
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => handleSelectProject(project.title, project.theme)}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-sky-500/50 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      <Layers className="h-3.5 w-3.5" />
                      {isSelected ? 'Selected for 3D preview' : 'Preview in 3D'}
                    </button>
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
          <div className="mb-8">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.24em] text-sky-400">The path so far</p>
            <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">Learning by building</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
              A snapshot of my studies, hands-on engineering work, and community recognition.
            </p>
          </div>

          <div className="relative ml-3 space-y-4 border-l border-slate-800 pl-7 sm:ml-5 sm:pl-9">
            {[
              {
                icon: GraduationCap,
                label: 'CURRENT FOCUS',
                title: 'Final-year BIT student at NMU',
                description:
                  'Building on a strong academic foundation while focusing on backend, mobile, and full-stack software engineering.',
                color: 'text-sky-300',
              },
              {
                icon: BriefcaseBusiness,
                label: 'HANDS-ON ENGINEERING',
                title: 'Turning real workflows into software',
                description:
                  'Working on projects across campus transport, student support, clinical records, and pharmacy inventory.',
                color: 'text-emerald-300',
              },
              {
                icon: Trophy,
                label: 'RECOGNITION & COMMUNITY',
                title: 'Learning alongside others',
                description:
                  'Second place at the School of IT Hackathon, Golden Key member, and BIT academic mentor.',
                color: 'text-amber-300',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.label}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                  className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-slate-700 sm:p-6"
                >
                  <span className="absolute -left-[2.38rem] top-6 flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-[#111510] shadow-[0_0_20px_rgba(163,230,53,0.12)] sm:-left-[3.13rem]">
                    <Icon className={`h-4 w-4 ${item.color}`} />
                  </span>
                  <p className={`font-mono text-[10px] tracking-[0.2em] ${item.color}`}>{item.label}</p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-100">{item.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">{item.description}</p>
                </motion.article>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-24 grid gap-6 md:grid-cols-2"
        >
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-[0_0_25px_rgba(15,23,42,0.7)]">
            <div className="flex items-center gap-2 text-sky-400">
              <Layers className="h-5 w-5" />
              <h3 className="font-semibold text-slate-100">Core Engineering Stack</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              <strong className="text-slate-200">Backend & Databases:</strong> C#, ASP.NET Core Web
              API, Entity Framework Core, SQL Server, PostgreSQL, Supabase, MySQL, REST APIs,
              SOLID & Design Patterns.
              <br />
              <strong className="text-slate-200">Frontend & Mobile:</strong> React, React Native,
              Expo, TypeScript, JavaScript, Android Studio, Java, Firebase/Firestore.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-[0_0_25px_rgba(15,23,42,0.7)]">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="font-semibold text-slate-100">Security, Cloud & Recognition</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              <strong className="text-slate-200">Security & Cloud:</strong> JWT Authentication,
              Network Security, Threat Analysis, Cisco Intro to Cybersecurity & IoT, AWS Cloud
              Engineering, Digital Ubuntu Cybersecurity & AI Intern.
              <br />
              <strong className="text-slate-200">Honours:</strong> Golden Key International Honour
              Society, Top BIT Second-Year Student, BIT Academic Mentor.
            </p>
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
                  <p className="text-sm text-slate-400">Public source and demo links will be added when available.</p>
                )}
              </div>
            </section>
          </div>
        )}
      </dialog>

      <footer className="relative mt-20 border-t border-slate-800/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono tracking-wider">SIBUSISO.NXUMALO // DEV</span>
          <span>Designed and built with care.</span>
        </div>
      </footer>
    </div>
    </MotionConfig>
  );
}