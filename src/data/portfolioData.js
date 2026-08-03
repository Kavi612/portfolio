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
  cgpa: 7.97,
  subtitle: 'I build AI products that solve real problems.',
  resumeUrl: '/Kavirathna_Velmurugan_Resume.pdf',
  roles: [
    'AI/ML Engineer',
    'Full Stack Developer',
    'AWS Cloud Developer',
    'Product Builder',
  ],
}

export const about = {
  headline: 'From Dindigul to MNC — I build AI products that matter.',
  bio: "I'm a 3rd year AI & Data Science student at SSM Institute of Engineering and Technology, graduating May 2027 with CGPA 7.97. I specialize in Full Stack Development, Machine Learning, AWS Cloud — building real production-grade AI products. My goal is to join MNCs like Deloitte where I can solve real enterprise problems.",
}

/** Alias used by hero / about / contact consumers */
export const profile = {
  ...personal,
  name: personal.shortName,
  fullName: personal.name,
  bio: [
    "I'm a 3rd year AI & Data Science student at SSM Institute of Engineering and Technology, graduating May 2027 with CGPA 7.97.",
    'I specialize in Full Stack Development, Machine Learning, and AWS Cloud — building real production-grade AI products.',
    'My goal is to join MNCs like Deloitte where I can solve real enterprise problems.',
  ],
}

export const stats = [
  { label: 'Projects', value: 5, suffix: '', decimals: 0 },
  { label: 'Internships', value: 4, suffix: '', decimals: 0 },
  { label: 'CGPA', value: 7.97, suffix: '', decimals: 2 },
  { label: 'Industry Certs', value: 2, suffix: '', decimals: 0 },
]

export const projects = [
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
    id: 'pixelpen',
    name: 'PixelPen AI',
    tagline: 'AI Content Studio',
    description:
      'Multimodal content studio combining CLIP, BART, and Groq to generate, refine, and score creative assets end-to-end.',
    tech: ['React', 'FastAPI', 'CLIP', 'BART', 'PyTorch', 'Groq'],
    liveUrl: 'https://pixelpen-ai.vercel.app',
    githubUrl: 'https://github.com/Kavi612/pixelpen_ai',
    image: 'pixelpen.png',
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

export const work = [
  {
    id: 'codedescriber',
    company: 'Techpuram',
    org: 'Techpuram',
    role: 'AI/ML Engineer — Code Describer',
    duration: '2025 – 2026',
    period: '2025 – 2026',
    description:
      'Built Code Describer, an AI system that explains GitHub repositories end-to-end: multi-language code extraction, AST/symbol parsing, MiniLM embeddings + FAISS retrieval (~40% faster lookup), and FLAN-T5 / DeepSeek Coder generation of structured project explanations (trained and run on Google Colab GPU).',
    tech: [
      'Python',
      'FLAN-T5',
      'DeepSeek Coder',
      'Sentence Transformers',
      'FAISS',
      'AST Parsing',
      'Google Colab',
    ],
    githubUrl: 'https://github.com/Kavi612/codeDescriber',
    type: 'work',
  },
  {
    id: 'ssmskipq',
    company: 'SSM SkipQ',
    org: 'SSM SkipQ',
    role: 'Full Stack Developer',
    duration: '2026',
    period: '2026',
    description:
      'Built a real-time full stack queue management product with React, TypeScript, Node.js, MongoDB, and Socket.io.',
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io'],
    liveUrl: 'https://ssmskip-q.vercel.app',
    type: 'work',
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
    type: 'work',
  },
]

/** Alias for Experience section consumers */
export const workExperience = work

export const internships = [
  {
    id: 'techpuram',
    company: 'Techpuram, Madurai',
    org: 'Techpuram',
    role: 'AI/ML Developer Intern',
    duration: 'Nov 2025 – May 2026',
    period: 'Nov 2025 – May 2026',
    location: 'Madurai',
    description:
      'Built AST parsing pipelines and FAISS vector embeddings that improved retrieval speed by ~40%.',
    image: 'Innovate.png',
    certificate: null,
    certificateUrl: null,
    type: 'internship',
  },
  {
    id: 'skillhive',
    company: 'Skill Hive Innovations',
    org: 'Skill Hive Innovations',
    role: 'Full Stack MERN Intern',
    duration: 'May 2026 – Present',
    period: 'May 2026 – Present',
    location: 'Coimbatore',
    description:
      'Delivering real-world client projects as a Full Stack MERN intern based in Coimbatore.',
    image: 'Smart bridge.png',
    certificate: null,
    certificateUrl: null,
    type: 'internship',
  },
  {
    id: 'awseducate',
    company: 'AWS Educate',
    org: 'AWS Educate',
    role: 'AI Cloud Engineer Virtual Intern',
    duration: 'Jan–Mar 2026',
    period: 'Jan–Mar 2026',
    location: 'Virtual',
    description:
      'Completed the virtual internship with Grade O Outstanding — highest performance tier.',
    image: 'AWS.png',
    certificate: null,
    certificateUrl: null,
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
      'Worked with an HP Enterprise delivery partner (ISO 9001:2015) on AI & ML solutions.',
    image: 'Gateway.jpg',
    certificate: null,
    certificateUrl: null,
    type: 'internship',
  },
]

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
