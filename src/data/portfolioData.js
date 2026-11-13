export const personal = {
  name: 'Kavirathna Velmurugan',
  shortName: 'Kavirathna',
  brandMark: 'KV',
  email: 'kavirathna125@gmail.com',
  phone: '+91 9952 428 528',
  github: 'https://github.com/Kavi612',
  linkedin: 'https://linkedin.com/in/kavirathna612',
  location: 'Dindigul, Tamil Nadu',
  college: 'SSM Institute of Engineering and Technology, Dindigul',
  degree: 'B.Tech AI & Data Science',
  year: '3rd year',
  graduation: 'May 2027',
  cgpa: 8.01,
  subtitle: 'I build AI products that solve real problems.',
  resumeUrl: '/KavirathnaResume.pdf',
  roles: [
    'AI/ML Engineer',
    'Full Stack Developer',
    'AWS Cloud Developer',
    'Product Builder',
  ],
}

export const about = {
  headline: 'From Dindigul to MNC — I build AI products that matter.',
  bio: "I'm a 3rd year AI & Data Science student at SSM Institute of Engineering and Technology, graduating May 2027 with CGPA 8.01. I specialize in Full Stack Development, Machine Learning, AWS Cloud — building real production-grade AI products. My goal is to join MNCs like Deloitte where I can solve real enterprise problems.",
}

/** Alias used by hero / about / contact consumers */
export const profile = {
  ...personal,
  name: personal.shortName,
  fullName: personal.name,
  bio: [
    "I'm a 3rd year AI & Data Science student at SSM Institute of Engineering and Technology, graduating May 2027 with CGPA 8.01.",
    'I specialize in Full Stack Development, Machine Learning, and AWS Cloud — building real production-grade AI products.',
    'My goal is to join MNCs like Deloitte where I can solve real enterprise problems.',
  ],
}

export const stats = [
  { label: 'Projects', value: 6, suffix: '', decimals: 0 },
  { label: 'Internships', value: 5, suffix: '', decimals: 0 },
  { label: 'CGPA', value: 8.01, suffix: '', decimals: 2 },
  { label: 'Industry Certs', value: 2, suffix: '', decimals: 0 },
]

export const projects = [
  {
    id: 'dockforge',
    name: 'DockForge',
    tagline: 'Self-Healing AI for Docker',
    description:
      'Multi-agent GraphRAG system that generates Dockerfiles, runs docker build, and patches its own failures in a retry loop. 65% success rate vs 24% for naive RAG.',
    tech: ['Python', 'LangGraph', 'Tree-sitter', 'NetworkX'],
    image: 'dockforge.jpg',
    inProgress: true,
  },
  {
    id: 'botstudio',
    name: 'BotStudio',
    tagline: 'RAG Chatbot Builder',
    description:
      'No-code RAG chatbot builder with vector search, custom knowledge bases, and OpenRouter-powered responses for production chat experiences.',
    tech: ['Next.js', 'Supabase', 'pgvector', 'OpenRouter'],
    liveUrl: 'https://bot-studiov1.vercel.app',
    githubUrl: 'https://github.com/Kavi612/Bot_STUDIO_',
    image: 'botstudio.png',
  },
  {
    id: 'farmcredit',
    name: 'FarmCredit AI',
    tagline: 'Crop Loan Risk Predictor',
    description:
      'Explainable crop-loan risk scoring with XGBoost + SHAP, plus a QLoRA/Mistral assistant layered on a FastAPI backend.',
    tech: ['XGBoost', 'SHAP', 'QLoRA', 'Mistral', 'FastAPI'],
    liveUrl: 'https://farmcredit-m3o9ke6y7zquszdbitqhe4.streamlit.app',
    githubUrl: 'https://github.com/Kavi612/Farmcredit',
    image: 'farmcredit.png',
  },
  {
    id: 'noticeportal',
    name: 'Department Notice Portal',
    tagline: 'AWS Academic Communication System',
    description:
      'Role-based notice portal for HOD, faculty, and students — AI-assisted drafting, scheduled publishing, poster uploads, and student unread tracking on a serverless AWS stack in Mumbai.',
    tech: [
      'React',
      'TypeScript',
      'AWS Cognito',
      'Lambda',
      'DynamoDB',
      'S3',
      'SES',
      'Groq',
    ],
    liveUrl: 'https://notice-portal-six.vercel.app/',
    githubUrl: 'https://github.com/Kavi612/notice',
    image: 'noticeportal.png',
  },
  {
    id: 'citycraft',
    name: 'City Craft',
    tagline: 'AI Startup Simulator Game',
    description:
      'Interactive AI startup simulator where players build companies, make strategy calls, and get Groq-powered narrative feedback.',
    tech: ['React', 'Node.js', 'Groq', 'Zustand', 'Framer Motion'],
    liveUrl: 'https://city-craft.vercel.app',
    githubUrl: 'https://github.com/Kavi612/CityCraft',
    image: 'citycraft.png',
  },
  {
    id: 'datapilot',
    name: 'DataPilot AI',
    tagline: 'Spreadsheet Analysis SaaS',
    description:
      'Spreadsheet analysis SaaS that turns messy CSV/Excel uploads into insights with Pandas pipelines and Groq-assisted summaries.',
    tech: ['React', 'FastAPI', 'Pandas', 'Groq', 'MongoDB'],
    liveUrl: 'https://datapilot-ej9z.vercel.app',
    githubUrl: 'https://github.com/Kavi612/datapilot',
    image: 'datapilot.png',
  },
]

export const skills = {
  Languages: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML', 'CSS'],
  'AI/ML & DL': [
    'Machine Learning',
    'Deep Learning',
    'XGBoost',
    'PyTorch',
    'Scikit-learn',
    'SHAP',
    'CLIP',
    'BART',
  ],
  'LLM & GenAI': [
    'RAG',
    'LangChain',
    'OpenRouter',
    'Groq',
    'QLoRA',
    'Mistral',
    'pgvector',
    'FAISS',
  ],
  'Web Dev': [
    'React',
    'Next.js',
    'Node.js',
    'FastAPI',
    'Express',
    'Tailwind CSS',
    'Framer Motion',
    'Socket.io',
  ],
  'Cloud & DB': [
    'AWS',
    'Supabase',
    'MongoDB',
    'PostgreSQL',
    'Vercel',
    'Streamlit',
  ],
  Tools: ['Git', 'GitHub', 'Docker', 'Postman', 'VS Code', 'Figma'],
}

export const clientProjects = [
  {
    id: 'mselegant',
    company: 'MS Elegant Collection',
    org: 'MS Elegant Collection',
    role: 'Web Developer',
    duration: '2026',
    period: '2026',
    description:
      'Designed and shipped the production website for a Dindigul jewellery startup — collection showcase, services, WhatsApp-first ordering flow, and brand storytelling.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://mselegentcollection.vercel.app/',
    githubUrl: 'https://github.com/Kavi612/zeo_jellwary',
    type: 'client work',
  },
  {
    id: 'jaimagilan',
    company: 'JAI Magilan Crackers',
    org: 'JAI Magilan Crackers',
    role: 'Web Developer',
    duration: '2025',
    period: '2025',
    description:
      'Designed and shipped a responsive business website with React and Tailwind CSS.',
    tech: ['React', 'Tailwind'],
    liveUrl: 'https://eclectic-pony-a01cd3.netlify.app',
    githubUrl: 'https://github.com/Kavi612',
    type: 'client work',
  },
]

export const work = clientProjects

/** Alias for Experience section consumers */
export const workExperience = clientProjects

export const pairedInternships = [
  {
    id: 'row-skillhive',
    left: {
      company: 'Skill Hive Innovations',
      role: 'Full Stack MERN Intern',
      dates: 'May 2026 – Oct 2026',
      location: 'Coimbatore (Remote)',
    },
    right: {
      title: 'Invita',
      subtitle: 'Live Client Platform · Excellent Engineering Enterprises',
      body: 'Built the Next.js 16 / TypeScript frontend for a community and family management platform. Central role-based permission matrix across four roles, a public no-login RSVP flow with headcount and calendar export, and a single-setting data-source switch for fixtures or a real REST client.',
      tags: ['Next.js 16', 'TypeScript', 'Tailwind v4', 'Zustand'],
      buttons: [
        {
          label: 'Live Demo',
          href: 'https://skillhiveinnovations.com',
          isPrimary: true,
          icon: 'external',
        },
        {
          label: 'View GitHub',
          href: 'https://github.com/Kavi612/invita',
          isPrimary: false,
          icon: 'github',
        },
        {
          label: 'View Offer Letter',
          href: 'skillhive.png',
          isOfferLetter: true,
          isPrimary: false,
          icon: 'file',
        },
      ],
    },
  },
  {
    id: 'row-techpuram',
    left: {
      company: 'Techpuram',
      role: 'AI/ML Developer Intern',
      dates: 'Nov 2025 – Mar 2026',
      location: 'Madurai (Remote)',
    },
    right: {
      title: 'Code Describer',
      subtitle: 'AI GitHub Repository Explainer',
      body: 'Explains any GitHub repository end-to-end with multi-language code extraction, AST and symbol parsing, MiniLM embeddings with FAISS retrieval for ~40% faster lookup, and FLAN-T5 or DeepSeek Coder generation of structured project explanations.',
      tags: ['Python', 'FAISS', 'MiniLM', 'FLAN-T5'],
      buttons: [
        {
          label: 'View GitHub',
          href: 'https://github.com/Kavi612/codeDescriber',
          isPrimary: true,
          icon: 'github',
        },
        {
          label: 'View Offer Letter',
          href: 'techpuram.png',
          isOfferLetter: true,
          isPrimary: false,
          icon: 'file',
        },
      ],
    },
  },
  {
    id: 'row-ambattur',
    left: {
      company: 'Ambattur Fashion India Pvt Ltd',
      role: 'App Development Intern',
      dates: 'Aug 2026 – Sep 2026',
      location: 'Chennai (On-site)',
    },
    right: {
      title: 'SkipQ Mobile',
      subtitle: 'Three-Portal Flutter App',
      body: 'Converted the SkipQ web app into a three-portal Flutter mobile app for Student, Manager and Super Admin, running on the shared Node.js/Express and MongoDB backend. Integrated Razorpay checkout end-to-end in test mode.',
      tags: ['Flutter', 'Node.js', 'Express', 'MongoDB'],
      buttons: [
        {
          label: 'View Live',
          href: 'https://ssmskip-q.vercel.app',
          isPrimary: true,
          icon: 'external',
        },
        {
          label: 'View GitHub',
          href: 'https://github.com/Kavi612/SsmskipQ',
          isPrimary: false,
          icon: 'github',
        },
        {
          label: 'View Certificate',
          href: 'ambattur.jpg',
          isOfferLetter: true,
          isPrimary: false,
          icon: 'file',
        },
      ],
    },
  },
]

export const otherInternships = [
  {
    id: 'awseducate',
    company: 'AWS Educate',
    org: 'AWS Educate',
    role: 'AI Cloud Engineer Virtual Intern',
    duration: 'Jan–Mar 2026',
    period: 'Jan–Mar 2026',
    location: 'Virtual',
    description:
      'Completed the virtual internship with Grade O Outstanding — highest performance tier, designing and deploying ML-integrated solutions across AWS compute, storage and inference services.',
    certificateUrl: 'AWS.png',
    type: 'internship',
  },
  {
    id: 'gateway',
    company: 'Gateway Software Solutions',
    org: 'Gateway Software Solutions',
    role: 'AI & ML Intern',
    duration: 'Jul 2025',
    period: 'Jul 2025',
    location: 'On-site',
    description:
      'Worked with an HP Enterprise delivery partner (ISO 9001:2015) on AI & ML solutions following enterprise delivery standards.',
    certificateUrl: 'Gateway.jpg',
    type: 'internship',
  },
]

export const internships = otherInternships

export const certifications = [
  // Industry
  {
    id: 'aws-aip',
    category: 'industry',
    issuer: 'Amazon Web Services',
    name: 'AWS Certified AI Practitioner',
    nameOnCert: 'Kavirathna V',
    detail: 'Valid Nov 2025 – Nov 2028',
    validationId: '2d635d620f564021a4edcf8c687e0418',
    color: 'aws',
  },
  {
    id: 'aws-ccp',
    category: 'industry',
    issuer: 'Amazon Web Services',
    name: 'AWS Certified Cloud Practitioner',
    nameOnCert: 'Kavirathna Velmurugan',
    detail: 'Valid Mar 2026 – Mar 2029',
    validationId: '4f0d5f3fd817407a89a11b10caec97a8',
    color: 'aws',
  },
  // Course
  {
    id: 'aws-academy-genai',
    category: 'course',
    issuer: 'AWS Academy · Chennai',
    name: 'Generative AI Foundations',
    nameOnCert: 'Kavirathna V',
    detail: 'Completed Oct 11, 2025',
    validationId: null,
    color: 'aws',
  },
  {
    id: 'nvidia-dl',
    category: 'course',
    issuer: 'NVIDIA',
    name: 'Fundamentals of Deep Learning',
    nameOnCert: 'Kavirathna Velmurugan',
    detail: 'Completed Mar 30, 2026',
    validationId: 'nYF_V9B8QgaBOdCUNtyF6A',
    color: 'nvidia',
  },
  {
    id: 'nasscom-daf',
    category: 'course',
    issuer: 'NASSCOM FutureSkills Prime',
    name: 'Digital Application Foundation — STEM',
    nameOnCert: 'Kavirathna Velmurugan',
    detail: 'Course certification',
    validationId: null,
    color: 'blue',
  },
  {
    id: 'workshop-ml-rv',
    category: 'course',
    issuer: 'RV Tech Learn',
    name: 'Machine Learning Industrial Training',
    nameOnCert: 'Kavirathna Velmurugan',
    detail: '6-day industrial workshop',
    validationId: null,
    color: 'blue',
  },
  {
    id: 'workshop-java-silicon',
    category: 'course',
    issuer: 'Silicon Software',
    name: 'Core Java Training',
    nameOnCert: 'Kavirathna Velmurugan',
    detail: '60-hour professional training',
    validationId: null,
    color: 'blue',
  },
]
