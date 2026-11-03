export interface ExperienceCard {
  title: string;
  description: string;
}

export interface ExperienceStep {
  title: string;
  description: string;
}

export interface ExperienceSection {
  id: string;
  number: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  cards?: ExperienceCard[];
  steps?: ExperienceStep[];
}

export interface ExperiencePractice {
  eyebrow: string;
  title: string;
  description: string;
  technologies: string[];
}

export interface CompanyExperienceContent {
  brandId: string;
  company: string;
  role: string;
  dates: string;
  focus: string;
  heroTitle: string;
  heroAccent: string;
  summary: string;
  sections: ExperienceSection[];
  practice?: ExperiencePractice;
  contactText: string;
}

export const usheruExperience: CompanyExperienceContent = {
  brandId: 'usheru',
  company: 'usheru',
  role: 'Lead Frontend Engineer',
  dates: 'October 2024 — Present',
  focus: 'Angular · Nx · SSR · AI workflows',
  heroTitle: 'Shared foundations',
  heroAccent: 'for 100+ branded apps.',
  summary:
    'I build Angular applications and shared libraries in an Nx monorepo supporting more than 100 branded entertainment applications.',
  sections: [
    {
      id: 'platform',
      number: '01',
      label: 'PLATFORM',
      eyebrow: 'SHARED BY DESIGN',
      title: 'One foundation, configured for each brand.',
      description:
        'I develop reusable UI components and shared libraries, alongside configurable features for catalogues, showtimes, and custom pages, in an Angular and Nx foundation for branded applications.',
      cards: [
        {
          title: 'Reusable UI',
          description:
            'Shared components and libraries for branded entertainment apps.',
        },
        {
          title: 'Configurable features',
          description: 'Catalogue, showtime, and custom-page experiences.',
        },
        {
          title: 'Rendering and upgrades',
          description:
            'Framework upgrades and improvements to SSR and hydration.',
        },
      ],
    },
    {
      id: 'ai-workflow',
      number: '02',
      label: 'ENGINEERING WORKFLOW',
      eyebrow: 'AI-ASSISTED, HUMAN-REVIEWED',
      title: 'A bug-fixing workflow grounded in the application.',
      description:
        'I designed and built a workflow that gathers project context, uses Playwright to reproduce an issue, validates a targeted fix, and prepares a pull request for human review.',
      steps: [
        {
          title: 'Gather context',
          description: 'Collect the application details needed to investigate.',
        },
        {
          title: 'Reproduce',
          description: 'Use Playwright and the browser to observe the issue.',
        },
        {
          title: 'Validate',
          description: 'Check the targeted change against the reproduction.',
        },
        {
          title: 'Prepare for review',
          description: 'Summarise the fix in a pull request for a person to review.',
        },
      ],
    },
  ],
  practice: {
    eyebrow: 'HOW I CONTRIBUTE',
    title: 'Hands-on engineering with a team view.',
    description:
      'Alongside implementation, I contribute to architectural decisions and code reviews. I also create reusable agent skills and workflows that capture project conventions and guide consistent verification.',
    technologies: [
      'Angular',
      'TypeScript',
      'RxJS',
      'NgRx',
      'Nx',
      'SSR',
      'Hydration',
      'Playwright',
      'Codex',
    ],
  },
  contactText: 'Want to talk about frontend platforms or AI-assisted engineering?',
};

export const suprnationExperience: CompanyExperienceContent = {
  brandId: 'suprnation',
  company: 'SuprNation',
  role: 'Senior Frontend Engineer',
  dates: 'September 2020 — October 2024',
  focus: 'Nx · Design systems · Web Vitals · WebSockets',
  heroTitle: 'Three brands, one',
  heroAccent: 'shared frontend platform.',
  summary:
    'I introduced Nx to bring three gaming brands onto a shared frontend platform, with reusable libraries and a design system. I also improved Web Vitals, supporting high-demand 24/7 websites with WebSocket features and on-shift operations.',
  sections: [
    {
      id: 'frontend-foundations',
      number: '01',
      label: 'SHARED FRONTEND PLATFORM',
      eyebrow: 'THREE BRANDS, SHARED LIBRARIES',
      title: 'One Nx workspace for three brands.',
      description:
        'I introduced Nx to build three brand frontends with shared libraries. Local Nx caching helped speed up builds and delivery, while shared components provided a reusable design system.',
      cards: [
        {
          title: 'Nx workspace',
          description:
            'Built three brand frontends in Nx with shared libraries and local caching.',
        },
        {
          title: 'Reusable design system',
          description:
            'Created a design system from reusable shared components.',
        },
        {
          title: '24/7 product operations',
          description:
            'Supported high-demand websites through on-shift engineering roles.',
        },
      ],
    },
    {
      id: 'performance-and-realtime',
      number: '02',
      label: 'PERFORMANCE & REAL-TIME',
      eyebrow: 'WEB VITALS · WEBSOCKETS',
      title: 'Fast pages and live communication.',
      description:
        'I worked on frontend performance with Web Vitals in mind, reducing load by 20–30%. The products also used WebSocket communication for real-time features.',
      cards: [
        {
          title: 'Web Vitals',
          description:
            'Performance improvements cut load by 20–30%.',
        },
        {
          title: 'WebSocket communication',
          description:
            'Worked on real-time communication across the websites.',
        },
      ],
    },
  ],
  contactText: 'Want to talk about frontend platforms, performance, or real-time products?',
};
