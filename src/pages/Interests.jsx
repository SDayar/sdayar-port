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

  const interests = [
    {
      category: "programming",
      icon: "</>",
      title: "Programmation",
      description: "Développement bas niveau, systèmes embarqués, découverte de nouveaux langages et architectures.",
      tags: ["C/C++", "Python", "Assembleur"],
      type: "professional"
    },
    {
      category: "electronics",
      icon: "⚡",
      title: "Électronique",
      description: "Conception de circuits, programmation de microcontrôleurs, soudure et prototypage.",
      tags: ["Arduino", "STM32", "KiCad"],
      type: "professional"
    },
    {
      category: "tech",
      icon: "📡",
      title: "Veille techno",
      description: "Suivi des nouvelles technologies, processeurs, actualités embedded et IoT.",
      tags: ["IoT", "RISC-V", "Edge AI"],
      type: "professional"
    },
    {
      category: "manga",
      icon: "📚",
      title: "Mangas & Comics",
      description: "Passionné de mangas (Naruto, Jujutsu Kaisen) et de comics (Batman).",
      tags: ["Naruto", "Batman", "JJK"],
      type: "hobby"
    },
    {
      category: "cycling",
      icon: "🚲",
      title: "Cyclisme",
      description: "Balades à vélo, découverte de nouveaux paysages et mécanique.",
      tags: ["VTT", "Route", "Mécanique"],
      type: "hobby"
    },
    {
      category: "gaming",
      icon: "🎮",
      title: "Jeux vidéo",
      description: "Fan de la licence Batman: Arkham et des jeux à univers immersif.",
      tags: ["Arkham", "RPG", "Indie"],
      type: "hobby"
    }
  ]

  return (
    <div className="interests-section" ref={sectionRef}>
      <div className="section-header">
        <div className="terminal-command">
          <span className="terminal-prompt">$</span>
          <span className="terminal-command-text">top -u dayar</span>
          <span className="terminal-cursor"></span>
        </div>
      </div>

      <div className="interests-grid">
        {interests.map((interest, index) => (
          <div key={index} className={`interest-card ${interest.type}`}>
            <div className="card-leds">
              <span className="led red"></span>
              <span className="led yellow"></span>
              <span className="led green"></span>
            </div>
            <div className="card-header">
              <span className="card-icon">{interest.icon}</span>
              <h3>{interest.title}</h3>
            </div>
            <p className="card-description">{interest.description}</p>
            <div className="card-tags">
              {interest.tags.map((tag, i) => (
                <span key={i} className={`tag ${interest.type}`}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}