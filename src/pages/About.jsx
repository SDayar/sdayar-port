import { useEffect, useRef } from "react"

function About() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

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

    if (sectionRef.current) observer.observe(sectionRef.current)
    if (contentRef.current) observer.observe(contentRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="about-section" ref={sectionRef}>
      {/* En-tête style oscillo */}
     

      <div className="about-grid" ref={contentRef}>
        {/* Colonne gauche - Avatar / Carte d'identité électronique */}
        <div className="about-card">
          <div className="card-chip">
            <div className="chip-lines"></div>
            <span className="chip-id">ID: 0x7B5F</span>
          </div>

          <div className="avatar-container">
            <div className="avatar-glitch">
              <div className="avatar-circle">DS</div>
              <div className="avatar-scanline"></div>
            </div>
          </div>

          <div className="card-pins">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="pin"></div>
            ))}
          </div>

          <div className="card-specs">
            <div className="spec-row">
              <span className="spec-label">NOM</span>
              <span className="spec-value"> Dayar SAIFIDINE</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">STATUS</span>
              <span className="spec-value status">
                <span className="status-led"></span>
                Actif
              </span>
            </div>
            <div className="spec-row">
              <span className="spec-label">ARCH</span>
              <span className="spec-value">x86_64 / ARM</span>
            </div>
          </div>
        </div>

        {/* Colonne droite - Description technique */}
        <div className="about-description">
          <div className="terminal-window">
            <div className="terminal-header">
              <span className="terminal-title">about.sh</span>
              <div className="terminal-controls">
                <span className="control"></span>
                <span className="control"></span>
                <span className="control"></span>
              </div>
            </div>

            <div className="terminal-content">
              <p className="terminal-line">
                <span className="prompt">$</span>
                <span className="command">whoami</span>
              </p>
              <p className="terminal-output">
                Dayar SAIFIDINE — "Etudiant en licence mathématiques et informatique, parcours informatique et applications."
              </p>

              <p className="terminal-line">
                <span className="prompt">$</span>
                <span className="command">cat profile.txt</span>
              </p>
              <p className="terminal-output">
                Titulaire d'un baccalauréat scientifique, j'ai poursuivi mes
                études en informatique avec un parcours en licence Mathématiques et informatique parcours informatique et applications.
              </p>

              <p className="terminal-line">
                <span className="prompt">$</span>
                <span className="command">echo $SPECIALITE</span>
              </p>
              <p className="terminal-output highlight">
                systèmes embarqués / électronique / bas niveau
              </p>

              <p className="terminal-line">
                <span className="prompt">$</span>
                <span className="command">tail -f objectif.log</span>
              </p>
              <p className="terminal-output">
                Recherche une alternance en systèmes embarqués pour continuer
                à apprendre en construisant des projets concrets.
                <span className="cursor">_</span>
              </p>
            </div>

            <div className="terminal-footer">
              <span className="footer-info">[EOF]</span>
              <span className="footer-info">Lignes: 12</span>
            </div>
          </div>

          {/* Tags compétences */}
          <div className="skills-section">
            <div className="skills-header">
              <span className="skills-led"></span>
              <span className="skills-title">COMPÉTENCES CLÉS</span>
            </div>
            <div className="skills-grid">
              {[
                "C / C++",
                "Assembleur",
                "Arduino",
                "Python",
                "Linux",
                "Électronique",
                "Java",
                "Système d'exploitation"
              ].map((skill) => (
                <div key={skill} className="skill-chip">
                  <span className="skill-led"></span>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About