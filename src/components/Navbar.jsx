import { useState, useEffect } from "react"

function Navbar() {
  const [theme, setTheme] = useState("dark")
  const [menuOpen, setMenuOpen] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 3000)
    
    return () => clearInterval(glitchInterval)
  }, [])
  
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"))
  }

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <span className="logo-dayar">DAYAR</span>
        <span className="logo-os">OS</span>
      </div>

      <nav className="navbar-links">
        <a href="#home">~/home</a>
        <a href="#about">~/about</a>
        <a href="#education">~/education</a>
        <a href="#experiences">~/experiences</a>
        <a href="#projects">~/projects</a>
        <a href="#certification">~/certs</a>
        <a href="#references">~/references</a>
        <a href="#contact">~/contact</a>
      </nav>

      <button className="theme-switch" onClick={toggleTheme} data-theme={theme}>
        <div className="theme-switch-track">
          <div className="theme-switch-thumb"></div>
          <div className="theme-switch-labels">
            <span>Off</span>
            <span>On</span>
          </div>
        </div>
        <div className="theme-switch-leds">
          <span className="led red"></span>
          <span className="led yellow"></span>
          <span className="led green"></span>
        </div>
      </button>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </button>

      <nav className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a onClick={() => setMenuOpen(false)} href="#home">~/home</a>
        <a onClick={() => setMenuOpen(false)} href="#about">~/about</a>
        <a onClick={() => setMenuOpen(false)} href="#education">~/education</a>
        <a onClick={() => setMenuOpen(false)} href="#experiences">~/experiences</a>
        <a onClick={() => setMenuOpen(false)} href="#projects">~/projects</a>
        <a onClick={() => setMenuOpen(false)} href="#certification">~/certs</a>
        <a onClick={() => setMenuOpen(false)} href="#references">~/references</a>
        <a onClick={() => setMenuOpen(false)} href="#contact">~/contact</a>
      </nav>
    </header>
  )
}

export default Navbar