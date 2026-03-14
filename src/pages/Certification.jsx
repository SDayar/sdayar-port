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
      date: "2025-01-15",
      platform: "Alison",
      image: certElectronics,
      id: "CERT-2228-38508148",
      hash: "a3f5c8d2e1b4"
    },
    {
      title: "Diploma in C Programming",
      date: "2025-01-20",
      platform: "Alison",
      image: certC,
      id: "CERT-1258-38508148",
      hash: "b7e2d9f4a1c6"
    },
    {
      title: "Diploma in Python Programming",
      date: "2024-07-10",
      platform: "Alison",
      image: certPython,
      id: "CERT-1535-38508148",
      hash: "f9c3a7b2e5d8"
    },
    {
      title: "Understanding Java",
      date: "2026-01-05",
      platform: "Alison",
      image: certJava,
      id: "CERT-4150-38508148",
      hash: "d4e1f8a3c2b7"
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
      <div className="section-header">
        <div className="terminal-command">
          <span className="terminal-prompt">$</span>
          <span className="terminal-command-text">openssl verify certificates/*.crt</span>
          <span className="terminal-cursor"></span>
        </div>
      </div>

      <div className="cert-scroll">
        {certificates.map((cert, index) => (
          <div 
            className="cert-card" 
            ref={addToRefs}
            key={index}
            onClick={() => setSelectedCert(cert)}
          >
           
            
            <div className="cert-image-container">
              <img 
                src={cert.image} 
                alt={cert.title}
                className="cert-image"
              />
            </div>

            <h3>{cert.title}</h3>
            <p className="cert-date">{cert.date}</p>
            
          </div>
        ))}
      </div>

      {selectedCert && (
        <div className="cert-modal" onClick={() => setSelectedCert(null)}>
          <div className="cert-modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCert(null)}>✕</button>
            
            <div className="modal-cert-header">
              <h3>{selectedCert.title}</h3>
              <div className="modal-cert-leds">
                <span className="led red"></span>
                <span className="led yellow"></span>
                <span className="led green"></span>
              </div>
            </div>
            
            <p className="modal-platform">{selectedCert.platform} — {selectedCert.date}</p>
            
            <div className="cert-modal-image">
              <img 
                src={selectedCert.image} 
                alt={selectedCert.title}
              />
            </div>

            <div className="modal-cert-footer">
              <div className="cert-id">
                <span className="id-label">Certificate ID:</span>
                <span className="id-value">{selectedCert.id}</span>
              </div>
              <div className="cert_link">
                <a href="fichier/Certifications et Learning Record Alison.pdf" target="_blank" className="modal-link">
                <span className="dollar">$</span>
                <span className="command"> wget LEARNING_RECORD
                </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}