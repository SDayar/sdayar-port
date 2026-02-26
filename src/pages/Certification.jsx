import { useEffect, useRef, useState } from "react"

import certElectronics from "../assets/certificats/electronics.png"
import certC from "../assets/certificats/c-programming.png"
import certJava from "../assets/certificats/java.png"
import certPython from "../assets/certificats/python.png"

export default function Certification() {
  const cardsRef = useRef([])
  const [selectedCert, setSelectedCert] = useState(null)

  const certificates = [
    {
      title: "Introduction to Basic Electronics",
      date: "Janvier 2025",
      platform: "Alison",
      image: certElectronics,
      id: "2228 - 38508148"
    },
    {
      title: "Diploma in C Programming",
      date: "Janvier 2025",
      platform: "Alison",
      image: certC,
      id: "1258 - 38508148"
    },
    {
      title: "Diploma in Python Programming",
      date: "Juillet 2024",
      platform: "Alison",
      image: certPython,
      id: "1535 - 38508148"
    },
    {
      title: "Understanding Java for Oracle Certification",
      date: "Janvier 2026",
      platform: "Alison",
      image: certJava,
      id: "4150 - 38508148"
    }
    
  ]

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

    cardsRef.current.forEach(el => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const addToRefs = el => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  return (
    <div className="certification-section">
       {/* En-tête */}
      <div className="interests-header">
        <h2 className="interests-title">
          <span className="title-prompt">$</span>
          <span className="title-command">more certifications.md</span>
        </h2>
        <div className="header-line"></div>
      </div>

      

      <div className="cert-scroll">
        {certificates.map((cert, index) => (
          <div 
            className="cert-card" 
            ref={addToRefs}
            key={index}
            onClick={() => setSelectedCert(cert)}
          >
            <div className="cert-led"></div>
            
            {/* Image du diplôme */}
            <div className="cert-image-container">
              <img 
                src={cert.image} 
                alt={cert.title}
                className="cert-image"
              />
              <div className="cert-image-overlay">
                <span>Cliquer pour agrandir</span>
              </div>
            </div>

            <h3>{cert.title}</h3>
            <p>{cert.platform} — {cert.date}</p>
            
            <div className="cert-id">
              <span className="id-label">ID:</span>
              <span className="id-value">{cert.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'agrandissement */}
      {selectedCert && (
        <div className="cert-modal" onClick={() => setSelectedCert(null)}>
          <div className="cert-modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCert(null)}>✕</button>
            
            <h3>{selectedCert.title}</h3>
            <p className="modal-platform">{selectedCert.platform} — {selectedCert.date}</p>
            
            {/* Image agrandie du diplôme */}
            <div className="cert-modal-image">
              <img 
                src={selectedCert.image} 
                alt={selectedCert.title}
              />
            </div>

            <div className="cert-id large">
              <span className="id-label">ID du certificat:</span>
              <span className="id-value">{selectedCert.id}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}