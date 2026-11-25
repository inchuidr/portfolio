export interface ProjectItem {
  id: string;
  index: string;
  name: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  technologies: string[];
  liveUrl: string;
  imageUrl: string;
  imageAlt: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  iconKey:
    | 'code'
    | 'layout'
    | 'server'
    | 'brain'
    | 'cpu'
    | 'database'
    | 'wrench';
  items: string[];
}

export interface JourneyMilestone {
  id: string;
  period: string;
  title: string;
  context: string;
  description: string;
}

export interface PortfolioProfile {
  initials: string;
  fullName: string;
  heroHeading: string;
  heroSubheading: string;
  heroIntro: string;
  aboutHeadline: string;
  aboutParagraphs: string[];
  aboutFocusAreas: string[];
  profileImageUrl: string;
  email: string;
  githubUrl: string;
  githubLabel: string;
  linkedinUrl: string;
  linkedinLabel: string;
  locationLabel: string;
}

export interface PortfolioData {
  profile: PortfolioProfile;
  projects: ProjectItem[];
  skills: SkillCategory[];
  journey: JourneyMilestone[];
}

/**
 * Editable portfolio configuration.
 * Update your initials, contact links, skills, journey milestones, or project
 * technology tags here, or use the interactive editor directly on the site.
 */
export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    initials: 'YN',
    fullName: 'Your Name',
    heroHeading: 'Building Intelligent Solutions for Tomorrow.',
    heroSubheading:
      'Computer Science Engineering Student | AI & ML Enthusiast | Developer',
    heroIntro:
      'I am a passionate developer who enjoys building innovative applications, exploring artificial intelligence and transforming ideas into practical solutions.',
    aboutHeadline:
      'Engineering practical software grounded in artificial intelligence and clean design.',
    aboutParagraphs: [
      'I am a Computer Science and Engineering student focused on building thoughtful, reliable applications that bridge intelligent algorithms with intuitive user experiences.',
      'My technical interests center on Artificial Intelligence, Machine Learning, Web Development, and Automation—exploring how modern models and software architecture can streamline complex everyday workflows.',
      'I enjoy turning open-ended problems into working prototypes, learning continuously through hands-on engineering, and shipping practical solutions.',
    ],
    aboutFocusAreas: [
      'Computer Science & Engineering',
      'Artificial Intelligence & Machine Learning',
      'Full-Stack Web Development',
      'Intelligent Workflow Automation',
    ],
    profileImageUrl: '/src/assets/images/about_profile_placeholder_1795587330963.jpg',
    email: 'your.email@example.com',
    githubUrl: 'https://github.com/yourusername',
    githubLabel: 'github.com/yourusername',
    linkedinUrl: 'https://linkedin.com/in/yourusername',
    linkedinLabel: 'linkedin.com/in/yourusername',
    locationLabel: 'Open to Internships, Hackathons & Research Collaborations',
  },

  projects: [
    {
      id: 'systempulse',
      index: '01',
      name: 'SystemPulse',
      title: 'SystemPulse – Computer Health Analyzer',
      category: 'System Analysis',
      description:
        'An application designed to analyze computer health and provide useful system information and insights.',
      highlights: [
        'Inspects device diagnostics and system health metrics in a clear, structured view.',
        'Surfaces actionable hardware and performance insights to help users understand system behavior.',
        'Built for rapid evaluation with responsive visual feedback across desktop and mobile viewports.',
      ],
      technologies: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Web Diagnostics APIs',
        'AI Insights',
      ],
      liveUrl: 'https://systempulsekruthi.ai.studio/',
      imageUrl: '/src/assets/images/project_systempulse_1795587331888.jpg',
      imageAlt:
        'Isometric dark-mode visualization of SystemPulse computer health analyzer hardware and telemetry waveforms',
    },
    {
      id: 'flowgenius',
      index: '02',
      name: 'FlowGenius',
      title: 'FlowGenius – AI Workflow Automation Platform',
      category: 'AI & Automation',
      description:
        'An AI-powered workflow automation platform designed to simplify tasks, improve productivity and streamline workflows.',
      highlights: [
        'Connects multi-step tasks into streamlined, AI-assisted automation sequences.',
        'Reduces repetitive manual work by transforming intent into structured operational steps.',
        'Designed around clarity, speed, and practical productivity for everyday builders.',
      ],
      technologies: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Gemini AI',
        'Workflow Automation',
      ],
      liveUrl: 'https://flowgenius.ai.studio',
      imageUrl: '/src/assets/images/project_flowgenius_1795587332339.jpg',
      imageAlt:
        '3D technical illustration of FlowGenius modular AI workflow automation pipelines',
    },
    {
      id: 'mindvault',
      index: '03',
      name: 'MindVault',
      title: 'MindVault – Personal AI Memory Intelligence System',
      category: 'Artificial Intelligence',
      description:
        'An AI-powered personal knowledge and memory management application that allows users to upload documents and interact with their stored information.',
      highlights: [
        'Enables document uploads and structured personal knowledge organization.',
        'Lets users query, retrieve, and interact naturally with their stored information.',
        'Combines clean document workflows with intelligent context retrieval.',
      ],
      technologies: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Gemini AI',
        'Document Processing',
      ],
      liveUrl: 'https://mindvault-7878.ai.studio',
      imageUrl: '/src/assets/images/project_mindvault_1795587333646.jpg',
      imageAlt:
        'Dark-mode 3D illustration of MindVault crystal knowledge vault and neural document graph',
    },
  ],

  skills: [
    {
      id: 'programming-languages',
      category: 'Programming Languages',
      iconKey: 'code',
      items: ['Python', 'TypeScript', 'JavaScript', 'C / C++', 'Java'],
    },
    {
      id: 'frontend-development',
      category: 'Frontend Development',
      iconKey: 'layout',
      items: ['React', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive UI'],
    },
    {
      id: 'backend-development',
      category: 'Backend Development',
      iconKey: 'server',
      items: ['Node.js', 'Express', 'REST APIs', 'Serverless Endpoints'],
    },
    {
      id: 'artificial-intelligence',
      category: 'Artificial Intelligence',
      iconKey: 'brain',
      items: [
        'LLM Application Design',
        'Prompt Engineering',
        'AI Workflow Integration',
        'Document Q&A Systems',
      ],
    },
    {
      id: 'machine-learning',
      category: 'Machine Learning',
      iconKey: 'cpu',
      items: [
        'Supervised Learning',
        'Data Preprocessing',
        'Model Evaluation',
        'NumPy & Pandas',
      ],
    },
    {
      id: 'database-management',
      category: 'Database Management',
      iconKey: 'database',
      items: ['SQL', 'PostgreSQL', 'MongoDB', 'Data Modeling'],
    },
    {
      id: 'developer-tools',
      category: 'Developer Tools',
      iconKey: 'wrench',
      items: ['Git & GitHub', 'VS Code', 'Vite', 'Linux CLI'],
    },
  ],

  journey: [
    {
      id: 'cse-education',
      period: 'Foundation',
      title: 'Computer Science Engineering Education',
      context: 'Academic Track',
      description:
        'Pursuing undergraduate studies in Computer Science & Engineering, developing strong fundamentals in algorithms, data structures, operating systems, and software engineering principles.',
    },
    {
      id: 'software-exploration',
      period: 'Exploration',
      title: 'Started Exploring Software Development',
      context: 'Web & Systems',
      description:
        'Began building responsive web interfaces and practical software tools, learning modern frontend frameworks, API integration, and clean maintainable code architecture.',
    },
    {
      id: 'ai-applications',
      period: 'Creation',
      title: 'Built AI-Powered Applications',
      context: 'Applied AI Projects',
      description:
        'Designed and shipped SystemPulse, FlowGenius, and MindVault—combining artificial intelligence with user-focused design for system diagnostics, workflow automation, and personal knowledge retrieval.',
    },
    {
      id: 'real-world-focus',
      period: 'Forward Focus',
      title: 'Innovative Real-World Technology Solutions',
      context: 'Ongoing Mission',
      description:
        'Continuously exploring new developments in artificial intelligence, machine learning, and automation to engineer solutions with measurable real-world utility.',
    },
  ],
};
