import { useEffect, useState } from 'react'

function Loader({ onLoaded }) {
  const [fadeOut, setFadeOut] = useState(false)
  const [bootStep, setBootStep] = useState(0)
  const [bootMessages, setBootMessages] = useState([])

  const messages = [
    "Initialisation du kernel...[OK]",
    "Chargement du module mémoire...[OK]",
    "Détection des périphériques...[OK]",
    "Montage du système de fichiers...[OK]",
    "Lancement du programme DayarOS...[OK] ",
    "......"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (bootStep < messages.length) {
        setBootMessages(prev => [...prev, messages[bootStep]])
        setBootStep(prev => prev + 1)
      }
    }, 400)

    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(onLoaded, 800)
    }, messages.length * 400 + 500)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [bootStep, onLoaded])

  return (
    <div className={`loader-container ${fadeOut ? 'fade-out' : ''}`}>
      <div className="boot-terminal">
        <div className="boot-terminal-header">
          <span className="boot-terminal-title">SYSTEM BOOT v1.0</span>
          <div className="boot-terminal-leds">
            <span className="led red"></span>
            <span className="led yellow"></span>
            <span className="led green"></span>
          </div>
        </div>
        <div className="boot-terminal-content">
          {bootMessages.map((msg, index) => (
            <div key={index} className="boot-line">
              <span className="boot-prompt">$</span>
              <span className="boot-message">{msg}</span>
            </div>
          ))}
          {bootStep < messages.length && (
            <div className="boot-line">
              <span className="boot-prompt">$</span>
              <span className="boot-message blinking">_</span>
            </div>
          )}
        </div>
        <div className="boot-terminal-footer">
          <span className="boot-status-led"></span>
          <span className="boot-status-text">
            {bootStep === messages.length ? "SYSTEM READY" : "BOOTING..."}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Loader

