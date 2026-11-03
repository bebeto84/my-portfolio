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
  focus: 'Nx · UX · Performance · Jenkins',
  heroTitle: 'Modernising multi-brand',
  heroAccent: 'gaming frontends.',
  summary:
    'I worked on modernising multi-brand gaming frontends through an Nx migration, UX and performance improvements, shared design foundations, and optimised Jenkins delivery pipelines.',
  sections: [
    {
      id: 'frontend-foundations',
      number: '01',
      label: 'FRONTEND FOUNDATIONS',
      eyebrow: 'MULTI-BRAND FRONTENDS',
      title: 'Modernising the product foundations.',
      description:
        'The work combined an Nx migration with UX and performance improvements and shared design foundations across multi-brand gaming frontends.',
      cards: [
        {
          title: 'Nx migration',
          description: 'Modernised the frontend through a migration to Nx.',
        },
        {
          title: 'Shared design foundations',
          description:
            'Contributed shared foundations for multi-brand experiences.',
        },
        {
          title: 'UX and performance',
          description:
            'Worked on improvements to user experience and frontend performance.',
        },
      ],
    },
    {
      id: 'delivery-pipelines',
      number: '02',
      label: 'DELIVERY',
      eyebrow: 'JENKINS PIPELINES',
      title: 'Jenkins delivery pipelines.',
      description:
        'I optimised Jenkins delivery pipelines as part of the frontend modernisation work.',
      cards: [
        {
          title: 'Jenkins',
          description: 'Optimised delivery pipelines for frontend projects.',
        },
        {
          title: 'Frontend modernisation',
          description: 'Modernised multi-brand gaming frontends.',
        },
      ],
    },
  ],
  contactText: 'Want to talk about frontend architecture and product engineering?',
};
