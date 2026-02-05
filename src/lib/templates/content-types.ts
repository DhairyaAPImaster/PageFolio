export interface WebsiteContent {
  personalInfo: {
    name: string;
    tagline: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    avatarUrl: string;
  };
  socialLinks: {
    twitter: string;
    linkedin: string;
    github: string;
    instagram: string;
    website: string;
    youtube?: string;
    tiktok?: string;
    dribbble?: string;
    behance?: string;
  };
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startYear: string;
    endYear: string;
    description?: string;
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    description: string;
    startDate: string;
    endDate: string;
    logo?: string;
  }>;
  skills: string[];
  projects: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    tags?: string[];
    featured?: boolean;
  }>;
  gallery?: Array<{
    id: string;
    imageUrl: string;
    title: string;
    category?: string;
  }>;
  testimonials?: Array<{
    id: string;
    name: string;
    role: string;
    content: string;
    avatarUrl?: string;
  }>;
  stats?: Array<{
    id: string;
    value: string;
    label: string;
  }>;
}

export const defaultContent: WebsiteContent = {
  personalInfo: {
    name: '',
    tagline: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    avatarUrl: '',
  },
  socialLinks: {
    twitter: '',
    linkedin: '',
    github: '',
    instagram: '',
    website: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  gallery: [],
  testimonials: [],
  stats: [],
};

// Rich sample content for template previews
export const sampleContent: WebsiteContent = {
  personalInfo: {
    name: 'Alex Morgan',
    tagline: 'Senior Product Designer & Creative Director',
    bio: 'I craft digital experiences that delight users and drive business growth. With over 8 years of experience in product design, I\'ve helped startups and Fortune 500 companies transform their ideas into beautiful, functional products.',
    email: 'hello@alexmorgan.design',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  },
  socialLinks: {
    twitter: 'https://twitter.com/alexmorgan',
    linkedin: 'https://linkedin.com/in/alexmorgan',
    github: 'https://github.com/alexmorgan',
    instagram: 'https://instagram.com/alexmorgan',
    website: 'https://alexmorgan.design',
    dribbble: 'https://dribbble.com/alexmorgan',
  },
  education: [
    {
      id: '1',
      institution: 'Stanford University',
      degree: 'Master of Science',
      field: 'Human-Computer Interaction',
      startYear: '2014',
      endYear: '2016',
      description: 'Focused on user experience research and interaction design principles.',
    },
    {
      id: '2',
      institution: 'Rhode Island School of Design',
      degree: 'Bachelor of Fine Arts',
      field: 'Graphic Design',
      startYear: '2010',
      endYear: '2014',
      description: 'Graduated with honors, specializing in digital media and typography.',
    },
  ],
  experience: [
    {
      id: '1',
      company: 'Stripe',
      position: 'Senior Product Designer',
      description: 'Led design for the Stripe Dashboard, improving user experience for millions of businesses worldwide. Shipped features that increased user engagement by 40%.',
      startDate: '2021',
      endDate: 'Present',
      logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
    },
    {
      id: '2',
      company: 'Airbnb',
      position: 'Product Designer',
      description: 'Designed the new host onboarding experience, reducing drop-off by 25%. Collaborated with engineering and data teams to implement data-driven design decisions.',
      startDate: '2018',
      endDate: '2021',
      logo: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=100&h=100&fit=crop',
    },
    {
      id: '3',
      company: 'Google',
      position: 'UX Designer',
      description: 'Worked on Material Design system, contributing to component libraries used by thousands of developers. Conducted user research and usability testing.',
      startDate: '2016',
      endDate: '2018',
      logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop',
    },
  ],
  skills: [
    'Product Design',
    'User Research',
    'Figma',
    'Prototyping',
    'Design Systems',
    'React',
    'Framer',
    'Motion Design',
    'User Testing',
    'Accessibility',
    'Design Thinking',
    'Wireframing',
  ],
  projects: [
    {
      id: '1',
      title: 'Fintech Dashboard',
      description: 'A comprehensive financial analytics platform with real-time data visualization and AI-powered insights.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      link: 'https://example.com/fintech',
      tags: ['Fintech', 'Dashboard', 'Data Viz'],
      featured: true,
    },
    {
      id: '2',
      title: 'E-commerce Redesign',
      description: 'Complete redesign of a major retail platform, increasing conversion rates by 35%.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      link: 'https://example.com/ecommerce',
      tags: ['E-commerce', 'Retail', 'UX'],
      featured: true,
    },
    {
      id: '3',
      title: 'Health App',
      description: 'A wellness tracking app focused on mental health with personalized recommendations.',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
      link: 'https://example.com/health',
      tags: ['Health', 'Mobile', 'Wellness'],
      featured: false,
    },
    {
      id: '4',
      title: 'SaaS Platform',
      description: 'B2B software platform for team collaboration with advanced workflow automation.',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
      link: 'https://example.com/saas',
      tags: ['SaaS', 'B2B', 'Productivity'],
      featured: false,
    },
  ],
  gallery: [
    { id: '1', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop', title: 'Abstract Art', category: 'Digital' },
    { id: '2', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600&fit=crop', title: 'Gallery Exhibit', category: 'Photography' },
    { id: '3', imageUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=600&fit=crop', title: 'Neon Lights', category: 'Digital' },
    { id: '4', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', title: 'Portrait', category: 'Photography' },
  ],
  testimonials: [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'VP of Product at Stripe',
      content: 'Alex is an exceptional designer who brings both creativity and strategic thinking to every project. Their work on our dashboard transformed the user experience.',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: '2',
      name: 'Michael Torres',
      role: 'CEO at TechStartup',
      content: 'Working with Alex was a game-changer for our company. They not only delivered stunning designs but also helped us think differently about our product.',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    },
  ],
  stats: [
    { id: '1', value: '8+', label: 'Years Experience' },
    { id: '2', value: '50+', label: 'Projects Completed' },
    { id: '3', value: '30M+', label: 'Users Impacted' },
    { id: '4', value: '15', label: 'Design Awards' },
  ],
};
