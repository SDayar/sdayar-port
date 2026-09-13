/*import { useState, useEffect } from 'react'
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
import Loader from './components/Loader'





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
*/
import { useState, useEffect, lazy, Suspense } from 'react'
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
import Loader from './components/Loader'

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

// Chargement différé (Code Splitting) : n'est pas inclus dans le bundle initial
const Temp = lazy(() => import('./pages/temp'))

function App() {
  const [loading, setLoading] = useState(true)
  const [inputCode, setInputCode] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [loading])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Validation du code
    if (inputCode.trim() === '270125') {
      setIsUnlocked(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
    <>
      {loading && <Loader onLoaded={() => setLoading(false)} />}
      <div className="app" style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s' }}>
        
        {/* Terminal en haut de page */}
        <div style={{
          backgroundColor: '#0d1117',
          color: '#58a6ff',
          fontFamily: 'monospace',
          padding: '8px 16px',
          borderBottom: '1px solid #30363d',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 1000,
          position: 'relative'
        }}>
          <span>&gt;_ terminal:</span>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="password"
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value)
                if (error) setError(false)
              }}
              placeholder="Saisir le code..."
              aria-label="Code d'accès"
              style={{
                backgroundColor: '#161b22',
                color: '#c9d1d9',
                border: error ? '1px solid #f85149' : '1px solid #30363d',
                borderRadius: '4px',
                padding: '4px 8px',
                fontFamily: 'monospace',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#238636',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 12px',
                fontFamily: 'monospace',
                cursor: 'pointer'
              }}
            >
              Exécuter
            </button>
          </form>
          {error && <span style={{ color: '#f85149', fontSize: '13px' }}>Code incorrect</span>}
        </div>

        {/* Condition d'affichage : si déverrouillé, on affiche uniquement pages/temp.jsx */}
        {isUnlocked ? (
          <Suspense fallback={<Loader onLoaded={() => {}} />}>
            <Temp />
          </Suspense>
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  )
}

export default App
