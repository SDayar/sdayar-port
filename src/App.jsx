import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
import Education from './pages/Education'
import Certification from './pages/Certification'
import References from './pages/References'
import Interests from './pages/Interests'
import Experiences from './pages/Experiences'
import Loader from './components/loader'




// Styles
import './styles/globals.css'
import './styles/components/navbar.css'
import './styles/components/footer.css'
import './styles/components/loader.css'

import './styles/pages/home.css'
import './styles/pages/about.css'
import './styles/pages/experiences.css'
import './styles/pages/education.css'
import './styles/pages/projects.css'
import './styles/pages/certification.css'
import './styles/pages/references.css'
import './styles/pages/interests.css'
import './styles/pages/contact.css'
import './styles/responsive.css'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [loading])

  return (
    <>
      {loading && <Loader onLoaded={() => setLoading(false)} />}
      <div className="app" style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s' }}>
        <Navbar />
        <main>
          <section id="home">
            <Home />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="education">
            <Education />
          </section>
          <section id="experiences">
            <Experiences />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="certification">
            <Certification />
          </section>
          <section id="references">
            <References />
          </section>
          <section id="interests">
            <Interests />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App