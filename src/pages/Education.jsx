import { useEffect, useRef } from "react"

export default function Education() {
  const sectionsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show")
          }
        })
      },
      { threshold: 0.2 }
    )

    sectionsRef.current.forEach(el => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const addToRefs = el => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

  return (
    <div className="education-page">
      <div className="section-header">
        <div className="terminal-command">
          <span className="terminal-prompt">$</span>
          <span className="terminal-command-text">cat /var/log/education</span>
          <span className="terminal-cursor"></span>
        </div>
      </div>

      <div className="edu-timeline">
        <div className="edu-line"></div>

        <div className="edu-item" ref={addToRefs}>
          <div className="edu-dot">
            <span className="dot-led"></span>
          </div>
          <div className="edu-content">
            <div className="edu-header">
              <h2>Licence Informatique et Applications</h2>
              <span className="edu-year">2023 – Présent</span>
            </div>
            <div className="edu-details">
              <p>Programmation avancée, Architecture des ordinateurs, Mathématiques et Calculs, Systèmes d'exploitation, C, Assembleur, Algorithmique avancée, Electronique, Réseaux, Programmation Unix, Projets de programmation et Génie logiciel.</p>
            </div>
          </div>
        </div>

        <div className="edu-item" ref={addToRefs}>
          <div className="edu-dot">
            <span className="dot-led"></span>
          </div>
          <div className="edu-content">
            <div className="edu-header">
              <h2>Baccalauréat scientifique</h2>
              <span className="edu-year">2021 – 2022</span>
            </div>
            <div className="edu-details">
              <p>Bac scientifique, spécialité mathématiques et sciences appliquées.</p>
              <div className="edu-stats">
                <span className="stat">Mention: Très Bien</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}