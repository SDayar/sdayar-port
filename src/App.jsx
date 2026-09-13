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
import Loader from './components/Loader'

// Import de la page temporaire / secrète
import Temp from './pages/temp'

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
  const [inputCode, setInputCode] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [loading])

  const handleCodeSubmit = (e) => {
    e.preventDefault()
    if (inputCode.trim() === '270125') {
      setIsUnlocked(true)
      setErrorMessage('')
    } else {
      setErrorMessage('Code incorrect ! Accès refusé.')
    }
  }

  return (
    <>
      {loading && <Loader onLoaded={() => setLoading(false)} />}
      <div className="app" style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s' }}>
        
        {/* Petit terminal en haut de page */}
        <div 
          style={{
            backgroundColor: '#1e1e1e',
            color: '#00ff66',
            fontFamily: 'monospace',
            padding: '8px 16px',
            borderBottom: '1px solid #333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            zIndex: 1000,
            position: 'absolute'
          }}
        >
          <form 
            onSubmit={handleCodeSubmit} 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}
          >
            <span style={{ color: '#888' }}>&gt;_ enter_code:</span>
            <input
              type="password"
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value)
                if (errorMessage) setErrorMessage('')
              }}
              placeholder="......"
              style={{
                backgroundColor: '#000',
                color: '#00ff66',
                border: '1px solid #00ff66',
                borderRadius: '4px',
                padding: '4px 8px',
                fontFamily: 'monospace',
                outline: 'none',
                fontSize: '14px'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#00ff66',
                color: '#000',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 12px',
                fontFamily: 'monospace',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Valider
            </button>
          </form>

          {/* Affichage des erreurs ou de l'état */}
          {errorMessage && (
            <span style={{ color: '#ff4d4d', fontSize: '13px', fontWeight: 'bold' }}>
              ❌ {errorMessage}
            </span>
          )}

          {isUnlocked && (
            <button
              onClick={() => {
                setIsUnlocked(false)
                setInputCode('')
              }}
              style={{
                backgroundColor: 'transparent',
                color: '#ff4d4d',
                border: '1px solid #ff4d4d',
                borderRadius: '4px',
                padding: '2px 8px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontSize: '12px'
              }}
            >
              Quitter la vue temp
            </button>
          )}
        </div>

        {/* SI LE CODE EST BON : Afficher uniquement pages/temp.jsx */}
        {isUnlocked ? (
          <main style={{ minHeight: '100vh' }}>
            <Temp />
          </main>
        ) : (
          /* SINON : Afficher le site normal */
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
