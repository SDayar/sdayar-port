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
              <h2>Cycle d'Ingénieur - Spécialité Electronique et Informatique pour l'Embarqué</h2>
              <span className="edu-year">2026 – 2029</span>
            </div>
            <div className="edu-school">
              <p>Université Paris-Saclay / Polytech Paris-Saclay</p>
            </div>
            <div className="edu-details">
              <p> Conception matérielle (FPGA, SoC, cartes électroniques), systèmes embarqués temps réel et OS, IoT et télécommunications sans fil, IA embarquée et Edge AI, robotique et mécatronique, traitement du signal et vision industrielle, électronique de puissance et gestion d'énergie, génie logiciel embarqué et cybersécurité, instrumentation et capteurs MEMS, ainsi que sûreté de fonctionnement et gestion de projets critiques.</p>
            </div>
          </div>
        </div>

        <div className="edu-item" ref={addToRefs}>
          <div className="edu-dot">
            <span className="dot-led"></span>
          </div>
          <div className="edu-content">
            <div className="edu-header">
              <h2>Licence Informatique et Applications</h2>
              <span className="edu-year">2023 – 2026</span>
            </div>
             <div className="edu-school">
              <p>Université Paris-Cité</p>
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
              <h2>Baccalauréat scientifique - série C</h2>
              <span className="edu-year">2021 – 2022</span>
            </div>
             <div className="edu-school">
              <p>Ecole privée Muigni Baraka</p>
            </div>
            <div className="edu-details">
              <p>Bac scientifique, spécialité mathématiques et sciences appliquées.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
