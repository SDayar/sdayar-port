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
        <a href="#about">About</a>
        <a href="#education">Education</a>
        <a href="#projects">Projects</a>
        <a href="#certification">Certification</a>
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
        <a onClick={toggleMenu} href="#about">About</a>
        <a onClick={toggleMenu} href="#education">Education</a>
        <a onClick={toggleMenu} href="#projects">Projects</a>
        <a onClick={toggleMenu} href="#certification">Certification</a>
        <a onClick={toggleMenu} href="#contact">Contact</a>
      </nav>
    </header>
  )
}

export default Navbar


