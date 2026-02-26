import { useEffect, useRef } from "react"

export default function Interests() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="interests-section" ref={sectionRef}>
      {/* En-tête */}
      <div className="interests-header">
        <h2 className="interests-title">
          <span className="title-prompt">$</span>
          <span className="title-command">cat interests.log</span>
        </h2>
        <div className="header-line"></div>
      </div>

      {/* Grille des intérêts */}
      <div className="interests-grid">
        {/* Carte - Programmation */}
        <div className="interest-card">
          <div className="card-led"></div>
          <div className="card-header">
            <span className="card-icon">{'</>'}</span>
            <h3>Programmation</h3>
          </div>
          <p className="card-description">
            Développement bas niveau, systèmes embarqués, découverte de nouveaux langages et architectures.
          </p>
          <div className="card-tags">
            <span className="tag">C/C++</span>
            <span className="tag">Python</span>
            <span className="tag">Assembleur</span>
          </div>
        </div>

        {/* Carte - Électronique */}
        <div className="interest-card">
          <div className="card-led"></div>
          <div className="card-header">
            <span className="card-icon">⚡</span>
            <h3>Electronique</h3>
          </div>
          <p className="card-description">
            Conception de circuits basiques, 
          </p>
          <div className="card-tags">
            <span className="tag">Arduino</span>
            <span className="tag">STM32</span>
            <span className="tag">BreadBoard</span>
          </div>
        </div>

        {/* Carte - Veille techno */}
        <div className="interest-card">
          <div className="card-led"></div>
          <div className="card-header">
            <span className="card-icon">📡</span>
            <h3>Veille techno</h3>
          </div>
          <p className="card-description">
            Suivi des nouvelles technologies, processeurs, actualités embedded et innovation hardware.
          </p>
          <div className="card-tags">
            <span className="tag">IoT</span>
            <span className="tag">Edge AI</span>
          </div>
        </div>

        {/* Carte - Mangas & Comics */}
        <div className="interest-card hobby">
          <div className="card-led hobby"></div>
          <div className="card-header">
            <span className="card-icon">📚</span>
            <h3>Mangas & Comics</h3>
          </div>
          <p className="card-description">
            Passionné de mangas (Naruto et Jujutsu Kaisen) et de comics(Batman : Year One et Superman legacy).
          </p>
          <div className="card-tags">
            <span className="tag hobby">Batman : Year One</span>
            <span className="tag hobby">Naruto</span>
          </div>
        </div>

        {/* Carte - Vélo */}
        <div className="interest-card hobby">
          <div className="card-led hobby"></div>
          <div className="card-header">
            <span className="card-icon">🚲</span>
            <h3>Cyclisme</h3>
          </div>
          <p className="card-description">
            Balades à vélo, découverte de nouveaux paysages et entretien mécanique.
          </p>
          <div className="card-tags">
            <span className="tag hobby">Balade</span>
            <span className="tag hobby">Évasion</span>
          </div>
        </div>

        {/* Carte - Jeux vidéo */}
        <div className="interest-card hobby">
          <div className="card-led hobby"></div>
          <div className="card-header">
            <span className="card-icon">🎮</span>
            <h3>Jeux vidéo</h3>
          </div>
          <p className="card-description">
            Fan de la licence Batman: Arkham, immersion dans l'univers du chevalier noir.
          </p>
          <div className="card-tags">
            <span className="tag hobby">Arkham Batman</span>
          </div>
        </div>
      </div>

      {/* Légende discrète */}
      <div className="interests-legend">
        <div className="legend-item">
          <span className="legend-led"></span>
          <span className="legend-text">Intérêts professionnels</span>
        </div>
        <div className="legend-item">
          <span className="legend-led hobby"></span>
          <span className="legend-text">Loisirs personnels</span>
        </div>
      </div>
    </div>
  )
}