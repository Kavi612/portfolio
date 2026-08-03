import CustomCursor from '@/components/layout/CustomCursor'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/layout/PageLoader'
import ScrollProgress from '@/components/layout/ScrollProgress'
import Hero from '@/components/hero/Hero'
import About from '@/components/about/About'
import Projects from '@/components/projects/Projects'
import Skills from '@/components/skills/Skills'
import Experience from '@/components/experience/Experience'
import Certifications from '@/components/certifications/Certifications'
import Contact from '@/components/contact/Contact'

function App() {
  return (
    <div className="min-h-screen bg-navy-950 text-text-main">
      <PageLoader />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />

        <section id="about">
          <About />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="certifications">
          <Certifications />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
