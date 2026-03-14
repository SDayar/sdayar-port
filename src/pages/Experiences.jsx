import { useEffect, useRef } from "react"

export default function Experiences() {
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

  const experiences = [
    {
      title: "Cours de soutien",
      company: "Université Paris Cité",
      location: "Paris",
      period: "2024 - Présent",
      description: "Aide aux devoirs en mathématiques et algorithmique.",
      tags: ["Pédagogie", "Mathématiques", "Algorithmique"],
      type: "academic"
    },
    {
      title: "Développeur d'intégration de données",
      company: "WHY NOT",
      location: "À distance",
      period: "Juin 2023 - Juillet 2023",
      description: "Extraction d'articles de ventes via AWS, nettoyage et structuration de données e-commerce. Développement d'un script d'automatisation réduisant les tâches manuelles jusqu'à 90%.",
      tags: ["Python", "AWS", "Automatisation", "Data"],
      type: "professional"
    },
    {
      title: "Employé commercial",
      company: "LIDL",
      location: "Cormeilles sur Seine",
      period: "Octobre 2024 - Janvier 2025",
      description: "Mise en rayon, gestion des stocks, service client et travail d'équipe dans un environnement dynamique.",
      tags: ["Service client", "Gestion stocks", "Travail d'équipe"],
      type: "professional"
    }
  ]

  return (
    <div className="experiences-section" ref={sectionRef}>
      <div className="section-header">
        <div className="terminal-command">
          <span className="terminal-prompt">$</span>
          <span className="terminal-command-text">more experiences.txt</span>
        </div>
      </div>

      <div className="experiences-timeline">
        <div className="exp-line"></div>
        
        {experiences.map((exp, index) => (
          <div key={index} className="exp-item">
            <div className={`exp-dot ${exp.type}`}></div>
            <div className="exp-content">
              <div className="exp-header">
                <h3>{exp.title}</h3>
                <span className="exp-period">{exp.period}</span>
              </div>
              
              <div className="exp-company">
                <span className="company-name">{exp.company}</span>
                <span className="exp-location">{exp.location}</span>
              </div>
              
              <p className="exp-description">{exp.description}</p>
              
              <div className="exp-tags">
                {exp.tags.map((tag, i) => (
                  <span key={i} className="exp-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="exp-status">
        <div className="status-led"></div>
        <span className="status-text">3 expériences enregistrées</span>
      </div>
    </div>
  )
}