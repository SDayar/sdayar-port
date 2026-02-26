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
function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <section id="home">
          <Home />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="education">
          <Education/>
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="certification">
          <Certification />
        </section>
        <section id="references">
          <References/>
        </section>
        <section id="interests">
          <Interests/>
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

