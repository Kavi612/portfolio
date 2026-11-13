import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/animations'

const skillCategories = [
  {
    id: 'ai-ml',
    title: 'AI/ML & GenAI',
    tagline: 'Deep learning models, RAG pipelines & agentic architectures',
    skills: [
      'Machine Learning',
      'Deep Learning',
      'PyTorch',
      'Scikit-learn',
      'XGBoost',
      'SHAP',
      'RAG',
      'LangGraph',
      'LangChain',
      'FAISS',
      'QLoRA',
      'Mistral',
      'Groq / OpenRouter',
      'pgvector',
    ],
  },
  {
    id: 'fullstack',
    title: 'Full Stack',
    tagline: 'Modern frontend frameworks & performant backend microservices',
    skills: [
      'React',
      'Next.js 16',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'FastAPI',
      'Express',
      'Tailwind CSS v4',
      'Zustand',
      'Framer Motion',
      'Socket.io',
      'Python',
    ],
  },
  {
    id: 'cloud-db',
    title: 'Cloud & Databases',
    tagline: 'Serverless cloud infrastructure, relational & vector data stores',
    skills: [
      'AWS Lambda',
      'AWS Cognito',
      'AWS S3',
      'AWS DynamoDB',
      'AWS SES',
      'MongoDB Atlas',
      'PostgreSQL',
      'Supabase',
      'Vercel',
      'Docker',
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Systems',
    tagline: 'Developer toolchains, AST analyzers & production utilities',
    skills: [
      'Git',
      'GitHub',
      'Docker',
      'Tree-sitter',
      'NetworkX',
      'Postman',
      'VS Code',
      'Figma',
      'Linux / Bash',
    ],
  },
]

export default function Skills() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
  const activeCategory = skillCategories[activeCategoryIndex]

  return (
    <div className="bg-navy-900 py-16 sm:py-24 lg:py-28 overflow-hidden">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 sm:mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-text-muted"
          >
            03 — Skills
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold text-text-main sm:text-4xl lg:text-5xl"
          >
            Stack I ship with{' '}
            <span className="gradient-text animate-gradient bg-300%">every week</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-base text-text-muted sm:text-lg"
          >
            Hover or tap any domain to reveal the production technologies behind it.
          </motion.p>
        </motion.div>

        {/* Hover-to-Reveal Interactive Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Massive Bold List */}
          <div className="flex flex-col space-y-4 sm:space-y-6 lg:col-span-7">
            {skillCategories.map((cat, idx) => {
              const isActive = activeCategoryIndex === idx
              return (
                <div
                  key={cat.id}
                  onMouseEnter={() => setActiveCategoryIndex(idx)}
                  onClick={() => setActiveCategoryIndex(idx)}
                  className="group relative cursor-pointer select-none py-2 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span
                      className={`font-mono text-xs sm:text-sm font-bold tracking-widest transition-colors duration-300 ${
                        isActive ? 'text-blue-light' : 'text-white/20'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <h3
                      className={`text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl transition-all duration-300 ${
                        isActive
                          ? 'text-white drop-shadow-[0_0_28px_rgba(59,130,246,0.65)] translate-x-2'
                          : 'text-white/35 group-hover:text-white/70'
                      }`}
                    >
                      {cat.title}
                    </h3>
                  </div>

                  {/* Active Indicator & Micro-tagline */}
                  <div
                    className={`overflow-hidden transition-all duration-300 pl-8 sm:pl-12 ${
                      isActive ? 'max-h-16 pt-2 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-xs sm:text-sm text-text-muted font-medium">
                      {cat.tagline}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column: Top-Notch Glassmorphism Detail Card */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Outer Ambient Glow */}
              <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/20 to-blue-accent/20 blur-xl opacity-60" />

              {/* Glassmorphism Card */}
              <div className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] p-6 sm:p-8 min-h-[340px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory.id}
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="space-y-6"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-blue-light">
                          Domain Stack ({activeCategory.skills.length})
                        </span>
                        <h4 className="mt-1 text-xl sm:text-2xl font-bold text-white">
                          {activeCategory.title}
                        </h4>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-light border border-blue-400/30 shadow-[0_0_12px_rgba(59,130,246,0.3)]">
                        Production
                      </span>
                    </div>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-2.5">
                      {activeCategory.skills.map((skill, i) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.02, duration: 0.2 }}
                          className="inline-flex items-center rounded-xl bg-white/5 backdrop-blur-md border border-white/15 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-blue-400 hover:text-blue-200 hover:shadow-[0_0_16px_rgba(59,130,246,0.4)] transition-all duration-200 cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between text-xs text-text-muted">
                  <span>Production verified</span>
                  <span className="text-blue-light/80 font-mono">0{activeCategoryIndex + 1} / 04</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
