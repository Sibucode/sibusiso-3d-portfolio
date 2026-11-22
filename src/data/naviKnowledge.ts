import { PROJECTS } from './portfolioData';

export interface NaviReply {
  text: string;
  section?: 'about' | 'projects' | 'journey' | 'skills' | 'contact';
  repositoryUrl?: string;
  cvDownload?: boolean;
}

const PROJECT_ALIASES: Record<string, string[]> = {
  'Madibaz Transit — Fleet & Shuttle Platform': ['madibaz', 'shuttle', 'fleet management', 'transit platform'],
  'Campus Companion': ['campus companion', 'student orientation', 'first-year support'],
  'Cool Rides — Automobile Production Simulation': [
    'cool rides',
    'automobile production',
    'car production',
    'vehicle production',
  ],
  'Gym Mobile Application': ['gym app', 'gym mobile', 'gym application'],
  'Medical Practice Management System': ['medical practice', 'patient records', 'clinical records'],
  'Prescription Management Web App': ['prescription management', 'pharmacy inventory', 'prescription app'],
  'IP Geolocation Tracker': ['ip geolocation', 'geolocation tracker', 'ip tracker'],
  'Python Voice Assistant': ['voice assistant', 'python assistant'],
  'Rent & Expenses Calculator': ['rent calculator', 'expenses calculator', 'roommate calculator'],
};

const normalize = (text: string) => text.toLowerCase().replace(/[^a-z0-9+#.]+/g, ' ').trim();

const includesAny = (text: string, phrases: string[]) =>
  phrases.some((phrase) => text.includes(normalize(phrase)));

const projectReply = (project: (typeof PROJECTS)[number]): NaviReply => ({
  text: `${project.title}. ${project.description} ${project.highlights.join(' ')} Technologies: ${project.tech.join(', ')}.`,
  section: 'projects',
  repositoryUrl: project.repositoryUrl,
});

export function answerNaviQuestion(question: string): NaviReply {
  const query = normalize(question);
  if (!query) {
    return { text: 'Ask me about Sibusiso’s CV, education, skills, achievements, or any of the projects.' };
  }

  if (includesAny(query, ['who are you', 'what is navi', 'are you an ai', 'hello', 'hi navi'])) {
    return {
      text: 'I’m Navi, the portfolio guide. I answer from Sibusiso’s CV and portfolio using information stored on this site; I don’t send your questions to an external AI service.',
      section: 'about',
    };
  }

  const matchedProject = PROJECTS.find((project) =>
    [project.title, ...(PROJECT_ALIASES[project.title] ?? [])].some((alias) =>
      query.includes(normalize(alias))
    )
  );
  if (matchedProject) return projectReply(matchedProject);

  if (includesAny(query, ['automobile', 'manufacturing', 'factory', 'car production', 'vehicle production'])) {
    const project = PROJECTS.find((item) => item.category === 'Manufacturing');
    if (project) return projectReply(project);
  }

  if (includesAny(query, ['healthcare projects', 'health projects', 'medical projects', 'pharmacy projects'])) {
    const projects = PROJECTS.filter((project) => project.category === 'Healthcare');
    return {
      text: `The healthcare work includes ${projects.map((project) => project.title).join(' and ')}. Both focus on digitising clinical or pharmacy workflows.`,
      section: 'projects',
    };
  }

  if (includesAny(query, ['python projects', 'python work'])) {
    const projects = PROJECTS.filter((project) => project.category === 'Python');
    return {
      text: `The Python projects are ${projects.map((project) => project.title).join(', ')}.`,
      section: 'projects',
    };
  }

  const technologies = [...new Set(PROJECTS.flatMap((project) => project.tech))]
    .sort((left, right) => normalize(right).length - normalize(left).length);
  const mentionedTechnology = technologies.find((technology) => query.includes(normalize(technology)));
  if (mentionedTechnology && includesAny(query, ['project', 'use', 'used', 'built', 'work', 'where'])) {
    const projects = PROJECTS.filter((project) =>
      project.tech.some((technology) =>
        normalize(technology).includes(normalize(mentionedTechnology)) ||
        normalize(mentionedTechnology).includes(normalize(technology))
      )
    );
    return {
      text: `${mentionedTechnology} appears in ${projects.map((project) => project.title).join(', ')}.`,
      section: 'projects',
    };
  }

  if (includesAny(query, ['education', 'degree', 'studying', 'study', 'university', 'nmu', 'average', 'grades'])) {
    return {
      text: 'Sibusiso is a final-year Bachelor of Information Technology (BIT) student at Nelson Mandela University in Gqeberha. His portfolio lists an 85.6% first-semester average.',
      section: 'journey',
    };
  }

  if (includesAny(query, ['award', 'awards', 'achievement', 'achievements', 'hackathon', 'golden key', 'mentor', 'recognition'])) {
    return {
      text: 'His listed recognition includes second place at the School of IT Hackathon, Golden Key membership, Top BIT Second-Year Student, and BIT Academic Mentor.',
      section: 'journey',
    };
  }

  if (includesAny(query, ['cybersecurity', 'cyber security', 'security', 'cloud', 'cisco', 'aws', 'internship', 'intern'])) {
    return {
      text: 'The CV and portfolio highlight cybersecurity and cloud foundations, including a Digital Ubuntu Cybersecurity & AI internship, Cisco Introduction to Cybersecurity & IoT, AWS Cloud Engineering, network security, and threat analysis.',
      section: 'skills',
    };
  }

  if (includesAny(query, ['skill', 'skills', 'stack', 'technology', 'technologies', 'programming', 'framework', 'database', 'backend', 'mobile'])) {
    return {
      text: 'The portfolio highlights C#, ASP.NET Core, Entity Framework Core, REST APIs, SQL Server, PostgreSQL, MySQL, React, React Native, TypeScript, Expo, Java, Android, Python, Firebase, Supabase, and AWS.',
      section: 'skills',
    };
  }

  if (includesAny(query, ['email', 'contact', 'linkedin', 'github', 'reach', 'connect'])) {
    return {
      text: 'You can reach Sibusiso at stachmaro@gmail.com, or use the LinkedIn and GitHub links in the contact section.',
      section: 'contact',
    };
  }

  if (includesAny(query, ['cv', 'resume', 'résumé'])) {
    return {
      text: 'The CV covers his BIT studies, software projects, engineering stack, cybersecurity and cloud learning, internship, and achievements. You can download it from the hero or contact section.',
      section: 'about',
      cvDownload: true,
    };
  }

  if (includesAny(query, ['project', 'projects', 'build', 'built', 'work', 'repository', 'repositories'])) {
    return {
      text: `There are ${PROJECTS.length} featured projects, including Madibaz Transit, Campus Companion, the automobile-production simulation, healthcare systems, and Python tools. Ask me about a project by name for its details and repository link.`,
      section: 'projects',
    };
  }

  if (includesAny(query, ['where', 'location', 'located', 'live'])) {
    return { text: 'The portfolio places Sibusiso at Nelson Mandela University in Gqeberha, South Africa.', section: 'about' };
  }

  if (includesAny(query, ['experience', 'background', 'about sibusiso', 'who is sibusiso'])) {
    return {
      text: 'Sibusiso Nxumalo is a final-year BIT student and software engineer focused on backend, mobile, and full-stack development. His project work spans campus transport and support, healthcare, manufacturing simulation, and Python tools.',
      section: 'about',
    };
  }

  if (includesAny(query, ['download', 'see your cv', 'get your cv'])) {
    return { text: 'You can download Sibusiso’s CV here.', section: 'about', cvDownload: true };
  }

  return {
    text: 'I couldn’t find that detail in the CV or portfolio, so I don’t want to guess. Try asking about education, skills, achievements, the cybersecurity internship, a project, or contact details.',
  };
}
