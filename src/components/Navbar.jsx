import { useState, useEffect } from "react"

function Navbar() {
  const [theme, setTheme] = useState("light")
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"))
  }

  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }

  return (
    <header className="navbar">
      <div className="navbar-logo">Dayar</div>

      {/* Desktop links */}
      <nav className="navbar-links">
        <a href="#home">Home</a>
        <a href="#about">A propos</a>
        <a href="#education">Formations</a>
        <a href="#projects">Projets en SE</a>
        <a href="#certification">Certifications</a>
        <a href="#references">Références</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* Theme toggle */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      {/* Hamburger icon */}
      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* Mobile menu */}
      <nav className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a onClick={toggleMenu} href="#home">Home</a>
        <a onClick={toggleMenu} href="#about">A propos</a>
        <a onClick={toggleMenu} href="#education">Formations</a>
        <a onClick={toggleMenu} href="#projects">Projets</a>
        <a onClick={toggleMenu} href="#certification">Certifications</a>
        <a onClick={toggleMenu} href="#references">Références</a>
        <a onClick={toggleMenu} href="#contact">Contact</a>
      </nav>
    </header>
  )
}

export default Navbar


