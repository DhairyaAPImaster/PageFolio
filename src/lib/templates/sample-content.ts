import { WebsiteContent } from './content-types';

// ========== DEVELOPER SAMPLE CONTENT ==========
export const developerSampleContent: WebsiteContent = {
  personalInfo: {
    name: 'Jordan Chen',
    tagline: 'Full-Stack Developer & Open Source Contributor',
    bio: 'Building the future of web one commit at a time. I specialize in React, Node.js, and cloud architecture. When I\'m not coding, I\'m probably contributing to open source or writing technical blog posts.',
    email: 'jordan@dev.io',
    phone: '',
    location: 'Seattle, WA',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
  },
  socialLinks: {
    twitter: 'https://twitter.com/jordandev',
    linkedin: 'https://linkedin.com/in/jordanchen',
    github: 'https://github.com/jordanchen',
    instagram: '',
    website: 'https://jordanchen.dev',
  },
  education: [
    {
      id: '1',
      institution: 'MIT',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startYear: '2015',
      endYear: '2019',
    },
  ],
  experience: [
    {
      id: '1',
      company: 'Vercel',
      position: 'Senior Software Engineer',
      description: 'Building the future of frontend development. Working on Next.js and Edge Functions. Improved deployment times by 40%.',
      startDate: '2022',
      endDate: 'Present',
    },
    {
      id: '2',
      company: 'GitHub',
      position: 'Software Engineer',
      description: 'Contributed to GitHub Actions and Codespaces. Shipped features used by millions of developers daily.',
      startDate: '2019',
      endDate: '2022',
    },
  ],
  skills: [
    'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Go',
    'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'GraphQL',
    'Rust', 'WebAssembly', 'System Design', 'CI/CD'
  ],
  projects: [
    {
      id: '1',
      title: 'OpenAPI Generator',
      description: 'A CLI tool that generates type-safe API clients from OpenAPI specs. 5k+ stars on GitHub.',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      link: 'https://github.com/jordanchen/openapi-gen',
      tags: ['TypeScript', 'CLI', 'Open Source'],
    },
    {
      id: '2',
      title: 'Real-time Collaboration Engine',
      description: 'A WebSocket-based real-time collaboration library for building Google Docs-like experiences.',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
      link: 'https://github.com/jordanchen/collab-engine',
      tags: ['WebSocket', 'CRDT', 'Real-time'],
    },
    {
      id: '3',
      title: 'DevOps Dashboard',
      description: 'A unified dashboard for monitoring CI/CD pipelines, deployments, and infrastructure health.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      link: 'https://github.com/jordanchen/devops-dash',
      tags: ['React', 'Kubernetes', 'Monitoring'],
    },
    {
      id: '4',
      title: 'Neural Code Review',
      description: 'AI-powered code review tool that catches bugs and suggests improvements automatically.',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
      link: 'https://github.com/jordanchen/neural-review',
      tags: ['AI/ML', 'Python', 'Developer Tools'],
    },
  ],
  stats: [
    { id: '1', value: '50K+', label: 'GitHub Stars' },
    { id: '2', value: '200+', label: 'Contributions' },
    { id: '3', value: '15', label: 'Open Source Projects' },
    { id: '4', value: '10M+', label: 'NPM Downloads' },
  ],
};

// ========== CREATOR SAMPLE CONTENT ==========
export const creatorSampleContent: WebsiteContent = {
  personalInfo: {
    name: 'Maya Rodriguez',
    tagline: 'Content Creator & Digital Artist',
    bio: '2M+ followers across platforms. I create content that inspires and entertains. From gaming streams to creative tutorials, I help people unlock their creative potential.',
    email: 'hello@mayacreates.com',
    phone: '',
    location: 'Los Angeles, CA',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
  },
  socialLinks: {
    twitter: 'https://twitter.com/mayacreates',
    linkedin: '',
    github: '',
    instagram: 'https://instagram.com/mayacreates',
    website: 'https://mayacreates.com',
    youtube: 'https://youtube.com/mayacreates',
    tiktok: 'https://tiktok.com/@mayacreates',
  },
  education: [],
  experience: [
    {
      id: '1',
      company: 'Self-Employed',
      position: 'Content Creator & Streamer',
      description: 'Built a community of 2M+ followers. Partner with major brands like Adobe, Logitech, and Samsung.',
      startDate: '2020',
      endDate: 'Present',
    },
    {
      id: '2',
      company: 'Twitch',
      position: 'Partner Streamer',
      description: 'Top 1% of streamers globally. Average 10K concurrent viewers with peak of 50K.',
      startDate: '2019',
      endDate: 'Present',
    },
  ],
  skills: [
    'Video Editing', 'Live Streaming', 'Graphic Design', 'Photography',
    'Social Media', 'Brand Partnerships', 'Community Building', 'Storytelling'
  ],
  projects: [
    {
      id: '1',
      title: 'Creative Bootcamp',
      description: 'Online course teaching content creation. 10,000+ students enrolled.',
      imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
      link: 'https://mayacreates.com/bootcamp',
      tags: ['Course', 'Education'],
    },
    {
      id: '2',
      title: 'Merch Collection',
      description: 'Limited edition streetwear collection. Sold out in 24 hours.',
      imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=600&fit=crop',
      link: 'https://mayacreates.com/merch',
      tags: ['Fashion', 'Merch'],
    },
    {
      id: '3',
      title: 'Documentary Series',
      description: 'Behind-the-scenes look at content creation. Featured on YouTube Originals.',
      imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop',
      link: 'https://youtube.com/watch?v=example',
      tags: ['Documentary', 'YouTube'],
    },
    {
      id: '4',
      title: 'Charity Stream',
      description: 'Annual charity event raising $500K+ for mental health awareness.',
      imageUrl: 'https://images.unsplash.com/photo-1560439513-74b037a25d84?w=800&h=600&fit=crop',
      link: 'https://mayacreates.com/charity',
      tags: ['Charity', 'Community'],
    },
  ],
  stats: [
    { id: '1', value: '2M+', label: 'Followers' },
    { id: '2', value: '500M+', label: 'Total Views' },
    { id: '3', value: '50+', label: 'Brand Collabs' },
    { id: '4', value: '$1M+', label: 'Charity Raised' },
  ],
  testimonials: [
    {
      id: '1',
      name: 'Adobe Creative Cloud',
      role: 'Brand Partner',
      content: 'Maya is one of the most creative and authentic influencers we\'ve worked with.',
      avatarUrl: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=100&h=100&fit=crop',
    },
  ],
};

// ========== PHOTOGRAPHER SAMPLE CONTENT ==========
export const photographerSampleContent: WebsiteContent = {
  personalInfo: {
    name: 'Marcus Sterling',
    tagline: 'Visual Storyteller & Portrait Photographer',
    bio: 'Capturing moments that last forever. My work has been featured in Vogue, National Geographic, and Time Magazine. I believe every photo tells a story.',
    email: 'studio@marcussterling.com',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
  },
  socialLinks: {
    twitter: '',
    linkedin: '',
    github: '',
    instagram: 'https://instagram.com/marcussterling',
    website: 'https://marcussterling.com',
    behance: 'https://behance.net/marcussterling',
  },
  education: [
    {
      id: '1',
      institution: 'Parsons School of Design',
      degree: 'Bachelor of Fine Arts',
      field: 'Photography',
      startYear: '2008',
      endYear: '2012',
    },
  ],
  experience: [
    {
      id: '1',
      company: 'Sterling Studios',
      position: 'Founder & Lead Photographer',
      description: 'Award-winning photography studio specializing in editorial, commercial, and fine art photography.',
      startDate: '2015',
      endDate: 'Present',
    },
    {
      id: '2',
      company: 'Vogue Magazine',
      position: 'Contributing Photographer',
      description: 'Shot cover stories and fashion editorials for Vogue US and international editions.',
      startDate: '2018',
      endDate: 'Present',
    },
  ],
  skills: [
    'Portrait Photography', 'Editorial', 'Commercial', 'Fine Art',
    'Lighting', 'Post-Processing', 'Art Direction', 'Visual Storytelling'
  ],
  projects: [
    {
      id: '1',
      title: 'Urban Souls',
      description: 'A portrait series exploring the diverse faces and stories of New York City.',
      imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=1000&fit=crop',
      link: 'https://marcussterling.com/urban-souls',
      tags: ['Portrait', 'Documentary'],
    },
    {
      id: '2',
      title: 'Vogue Italia Cover',
      description: 'Award-winning cover shoot featuring emerging designers.',
      imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1000&fit=crop',
      link: 'https://marcussterling.com/vogue',
      tags: ['Fashion', 'Editorial'],
    },
    {
      id: '3',
      title: 'Natural Light Series',
      description: 'Intimate portraits captured using only natural light.',
      imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1000&fit=crop',
      link: 'https://marcussterling.com/natural-light',
      tags: ['Portrait', 'Fine Art'],
    },
    {
      id: '4',
      title: 'Tokyo Nights',
      description: 'Cinematic street photography from the neon-lit streets of Tokyo.',
      imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
      link: 'https://marcussterling.com/tokyo',
      tags: ['Street', 'Travel'],
    },
  ],
  gallery: [
    { id: '1', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1000&fit=crop', title: 'Portrait 1', category: 'Portrait' },
    { id: '2', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1000&fit=crop', title: 'Portrait 2', category: 'Portrait' },
    { id: '3', imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1000&fit=crop', title: 'Fashion 1', category: 'Fashion' },
    { id: '4', imageUrl: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&h=1000&fit=crop', title: 'Editorial 1', category: 'Editorial' },
    { id: '5', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1000&fit=crop', title: 'Portrait 3', category: 'Portrait' },
    { id: '6', imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop', title: 'Fashion 2', category: 'Fashion' },
  ],
  stats: [
    { id: '1', value: '15+', label: 'Years Experience' },
    { id: '2', value: '200+', label: 'Magazine Covers' },
    { id: '3', value: '50+', label: 'Awards Won' },
    { id: '4', value: '1000+', label: 'Clients Served' },
  ],
};

// ========== STUDENT SAMPLE CONTENT ==========
export const studentSampleContent: WebsiteContent = {
  personalInfo: {
    name: 'Emma Thompson',
    tagline: 'Computer Science Student & Aspiring ML Engineer',
    bio: 'Passionate about using technology to solve real-world problems. Currently researching machine learning applications in healthcare. Dean\'s List student with a love for hackathons.',
    email: 'emma.t@university.edu',
    phone: '',
    location: 'Boston, MA',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
  },
  socialLinks: {
    twitter: 'https://twitter.com/emmacodes',
    linkedin: 'https://linkedin.com/in/emmathompson',
    github: 'https://github.com/emmathompson',
    instagram: '',
    website: '',
  },
  education: [
    {
      id: '1',
      institution: 'Massachusetts Institute of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science & AI',
      startYear: '2022',
      endYear: '2026',
      description: 'GPA: 3.9/4.0. Dean\'s List. Member of AI Research Lab.',
    },
  ],
  experience: [
    {
      id: '1',
      company: 'Google',
      position: 'Software Engineering Intern',
      description: 'Worked on Google Cloud AI team. Built ML pipeline improvements that reduced training time by 30%.',
      startDate: 'Summer 2024',
      endDate: 'Summer 2024',
    },
    {
      id: '2',
      company: 'MIT AI Research Lab',
      position: 'Research Assistant',
      description: 'Researching applications of transformer models in medical image analysis.',
      startDate: '2023',
      endDate: 'Present',
    },
  ],
  skills: [
    'Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Data Science',
    'Java', 'C++', 'Research', 'Academic Writing', 'Public Speaking'
  ],
  projects: [
    {
      id: '1',
      title: 'MedScan AI',
      description: 'Deep learning model for early cancer detection from medical scans. Won 1st place at MIT Hackathon.',
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
      link: 'https://github.com/emmathompson/medscan',
      tags: ['AI', 'Healthcare', 'Research'],
    },
    {
      id: '2',
      title: 'StudyBuddy',
      description: 'AI-powered study assistant that creates personalized learning plans.',
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
      link: 'https://github.com/emmathompson/studybuddy',
      tags: ['EdTech', 'NLP', 'React'],
    },
    {
      id: '3',
      title: 'Climate Predictor',
      description: 'Machine learning model predicting local climate patterns. Published in undergraduate journal.',
      imageUrl: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&h=600&fit=crop',
      link: 'https://github.com/emmathompson/climate-ml',
      tags: ['Climate', 'ML', 'Research'],
    },
  ],
  stats: [
    { id: '1', value: '3.9', label: 'GPA' },
    { id: '2', value: '5', label: 'Hackathon Wins' },
    { id: '3', value: '2', label: 'Publications' },
    { id: '4', value: '3', label: 'Internships' },
  ],
};

// ========== PROFESSIONAL SAMPLE CONTENT ==========
export const professionalSampleContent: WebsiteContent = {
  personalInfo: {
    name: 'David Harrison',
    tagline: 'Chief Technology Officer & Digital Transformation Leader',
    bio: 'With 20+ years of experience leading technology teams at Fortune 500 companies, I specialize in driving digital transformation and building high-performing engineering organizations.',
    email: 'david@harrison-consulting.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  },
  socialLinks: {
    twitter: 'https://twitter.com/davidharrisonCTO',
    linkedin: 'https://linkedin.com/in/davidharrison',
    github: '',
    instagram: '',
    website: 'https://harrison-consulting.com',
  },
  education: [
    {
      id: '1',
      institution: 'Stanford Graduate School of Business',
      degree: 'MBA',
      field: 'Technology Management',
      startYear: '2005',
      endYear: '2007',
    },
    {
      id: '2',
      institution: 'Carnegie Mellon University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startYear: '1998',
      endYear: '2002',
    },
  ],
  experience: [
    {
      id: '1',
      company: 'TechCorp Global',
      position: 'Chief Technology Officer',
      description: 'Led 500+ person engineering organization. Drove $2B digital transformation initiative. Reduced infrastructure costs by 40%.',
      startDate: '2020',
      endDate: 'Present',
    },
    {
      id: '2',
      company: 'Innovation Labs',
      position: 'VP of Engineering',
      description: 'Scaled engineering team from 50 to 300. Launched products reaching 100M+ users.',
      startDate: '2015',
      endDate: '2020',
    },
    {
      id: '3',
      company: 'Microsoft',
      position: 'Senior Engineering Manager',
      description: 'Led Azure cloud platform development. Managed cross-functional teams of 50+ engineers.',
      startDate: '2010',
      endDate: '2015',
    },
  ],
  skills: [
    'Digital Transformation', 'Technology Strategy', 'Team Leadership', 'Cloud Architecture',
    'Agile/Scrum', 'Executive Communication', 'P&L Management', 'M&A Due Diligence'
  ],
  projects: [
    {
      id: '1',
      title: 'Enterprise Cloud Migration',
      description: 'Led $500M cloud migration project for Fortune 100 company. 99.99% uptime achieved.',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
      link: 'https://harrison-consulting.com/case-studies/cloud',
      tags: ['Cloud', 'Enterprise', 'Strategy'],
    },
    {
      id: '2',
      title: 'AI-Powered Customer Service',
      description: 'Implemented AI chatbot reducing customer service costs by 60% while improving satisfaction.',
      imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop',
      link: 'https://harrison-consulting.com/case-studies/ai',
      tags: ['AI', 'Customer Service', 'Automation'],
    },
  ],
  stats: [
    { id: '1', value: '20+', label: 'Years Experience' },
    { id: '2', value: '$2B+', label: 'Managed Budget' },
    { id: '3', value: '500+', label: 'Team Size' },
    { id: '4', value: '15', label: 'Board Positions' },
  ],
  testimonials: [
    {
      id: '1',
      name: 'Sarah Mitchell',
      role: 'CEO, TechCorp Global',
      content: 'David transformed our technology organization and positioned us for the next decade of growth.',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Board Member',
      content: 'One of the most strategic technology leaders I\'ve worked with. Exceptional at bridging business and technology.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
  ],
};

// ========== MINIMAL SAMPLE CONTENT ==========
export const minimalSampleContent: WebsiteContent = {
  personalInfo: {
    name: 'Sophia Laurent',
    tagline: 'Writer & Editor',
    bio: 'Words are my craft. I write essays, edit manuscripts, and help brands find their voice. Currently working on my second novel.',
    email: 'hello@sophialaurent.com',
    phone: '',
    location: 'Paris, France',
    avatarUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
  },
  socialLinks: {
    twitter: 'https://twitter.com/sophialaurent',
    linkedin: '',
    github: '',
    instagram: 'https://instagram.com/sophialaurent',
    website: 'https://sophialaurent.com',
  },
  education: [],
  experience: [
    {
      id: '1',
      company: 'Freelance',
      position: 'Writer & Editor',
      description: 'Published in The New Yorker, Paris Review, and The Atlantic.',
      startDate: '2018',
      endDate: 'Present',
    },
  ],
  skills: ['Creative Writing', 'Editing', 'Content Strategy', 'Copywriting'],
  projects: [
    {
      id: '1',
      title: 'The Silent Hours',
      description: 'My debut novel. A story about memory, loss, and the spaces between words.',
      imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop',
      link: 'https://sophialaurent.com/book',
      tags: ['Fiction', 'Novel'],
    },
    {
      id: '2',
      title: 'Essays Collection',
      description: 'Selected essays on modern life, art, and the creative process.',
      imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop',
      link: 'https://sophialaurent.com/essays',
      tags: ['Essays', 'Non-fiction'],
    },
  ],
  stats: [
    { id: '1', value: '2', label: 'Books Published' },
    { id: '2', value: '50+', label: 'Essays Written' },
  ],
};

// Export a function to get sample content by category
export function getSampleContentByCategory(category: string): WebsiteContent {
  switch (category) {
    case 'developer':
      return developerSampleContent;
    case 'creator':
      return creatorSampleContent;
    case 'photographer':
      return photographerSampleContent;
    case 'student':
      return studentSampleContent;
    case 'professional':
      return professionalSampleContent;
    case 'minimal':
      return minimalSampleContent;
    default:
      return minimalSampleContent;
  }
}
