import { useEffect, useRef, useState } from "react"

export default function References() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const references = [
    {
      name: "David Bouchet",
      role: "Responsable de l'UE Architecture des ordinateurs et conception de sites web dynamiques",
      company: "Université Paris Descartes",
      message: "En ma qualité de responsable de l'unité d'enseignement d'architecture des ordinateurs et de conceptionn de sites web dynamiques de l'UFR de Mathématiques et Informatique de l'université Paris Cité, j'atteste que Monsieur Dayar Saifidine a étét mon étudiant durant l'année universitaire 2024-2025 lors de sa deuxième année de Licence de Mathématiques et Informatique. \nMonsieur Saifidine fut un étudiant motivé et interessé. Il a fait preuve de curiosité et a montré de l'intérêt pour les matoères que j'enseigne. Son travail, son assiduité et son attitude irréprochable lui ont permis d'obtenir d'excellents résultats.\nPour toutes ses raisons, il mérite assurément d'intégrer votre programme et je suis convaincu qu'il dispose de tous les moyens pour en tirer le meilleur part. Je le recommande donc très chaleureusement. "
      ,

      contact: "david.bouchet.paris5@gmail.com"
    }
   
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          sectionRef.current.classList.add("visible")
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Rotation automatique des références
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % references.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [references.length])

  return (
    <div className="references-section" ref={sectionRef}>
     

      {/* Affichage style oscilloscope / carte à puce */}
      <div className="references-display">
        {/* Petit indicateur de confiance */}
        <div className="trust-badge">
          <span className="badge-led"></span>
          <span className="badge-text">VÉRIFIÉ</span>
        </div>

        {/* Carte de référence active */}
        <div className="reference-card">
          <div className="card-chip">
            <div className="chip-lines"></div>
          </div>

          <div className="card-content">
            <div className="reference-quote">"</div>
            <p className="reference-message">{references[activeIndex].message}</p>
            
            <div className="reference-author">
              <strong>{references[activeIndex].name}</strong>
            </div>
            
            <div className="reference-role">
              {references[activeIndex].role} — {references[activeIndex].company}
            </div>

            <div className="reference-contact">
              <span className="contact-icon">📧</span>
              <span>{references[activeIndex].contact}</span>
            </div>
          </div>

          {/* Piste de données (décorative) */}
          <div className="data-trace">
            <div className="trace-line"></div>
            <div className="trace-line"></div>
            <div className="trace-line"></div>
          </div>
        </div>

        {/* Indicateurs de position (style points de test) */}
        <div className="reference-dots">
          {references.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Voir référence ${index + 1}`}
            />
          ))}
        </div>
          
        {/* Timestamp discret */}
        <div className="reference-timestamp">
          <span>DERNIÈRE MISE À JOUR: 2026-02-21</span>
        </div>
      </div>

      {/* Note discrète */}
      <p className="references-note">
        Ces personnes ont accepté d'être contactées pour attester de mes compétences.
      </p>
    </div>
  )
}