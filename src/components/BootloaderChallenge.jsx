import { useState, useEffect, useCallback } from "react"

export default function BootloaderChallenge() {
  const [lines, setLines] = useState([])
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [status, setStatus] = useState("idle")
  const [gameOver, setGameOver] = useState(false)
  const [level, setLevel] = useState(1)
  const [combo, setCombo] = useState(0)
  const [highScore, setHighScore] = useState(0)

  // Messages plus variés et réalistes pour un bootloader
  const bootMessages = [
    { text: "[OK] Flash memory check", type: "success" },
    { text: "[OK] Clock calibration", type: "success" },
    { text: "[ERR] UART sync lost", type: "error" },
    { text: "[OK] GPIO init", type: "success" },
    { text: "[ERR] SPI timeout", type: "error" },
    { text: "[OK] DMA channels ready", type: "success" },
    { text: "[ERR] I2C bus collision", type: "error" },
    { text: "[OK] CPU frequency set", type: "success" },
    { text: "[OK] Stack pointer init", type: "success" },
    { text: "[ERR] Watchdog timeout", type: "error" },
    { text: "[OK] Interrupt vector table", type: "success" },
    { text: "[ERR] ADC calibration failed", type: "error" },
    { text: "[OK] Power management init", type: "success" },
    { text: "[WRN] Brown-out detection", type: "warning" },
    { text: "[ERR] CAN bus error", type: "error" },
    { text: "[OK] USB device enumerated", type: "success" },
    { text: "[ERR] Flash write protected", type: "error" },
  ]

  // Vitesse d'apparition des messages (diminue avec le niveau)
  const getIntervalTime = useCallback(() => {
    return Math.max(300, 700 - level * 50)
  }, [level])

  useEffect(() => {
    if (gameOver) return

    const interval = setInterval(() => {
      const randomMsg = bootMessages[Math.floor(Math.random() * bootMessages.length)]
      setLines((prev) => [...prev.slice(-5), randomMsg])
    }, getIntervalTime())

    return () => clearInterval(interval)
  }, [gameOver, level, getIntervalTime])

  const handleClick = (line) => {
    if (gameOver) return

    if (line.type === "error") {
      // Bonus basé sur le combo
      const pointsEarned = 10 + (combo * 5)
      setScore((s) => {
        const newScore = s + pointsEarned
        if (newScore > highScore) setHighScore(newScore)
        return newScore
      })
      setCombo((c) => c + 1)
      setStatus("success")

      // Augmentation du niveau tous les 100 points
      if (score > 0 && score % 100 === 0) {
        setLevel((l) => Math.min(l + 1, 10))
      }
    } else if (line.type === "warning") {
      // Les warnings font perdre des points mais pas de vie
      setScore((s) => Math.max(0, s - 5))
      setCombo(0)
      setStatus("warning")
    } else {
      // Mauvaise clique sur un OK
      setLives((l) => {
        const newLives = l - 1
        if (newLives <= 0) {
          setGameOver(true)
          setStatus("gameover")
        }
        return newLives
      })
      setCombo(0)
      setStatus("fail")
    }

    setTimeout(() => setStatus("idle"), 800)
  }

  const resetGame = () => {
    setLines([])
    setScore(0)
    setLives(3)
    setGameOver(false)
    setLevel(1)
    setCombo(0)
    setStatus("idle")
  }

  // Calcul de la barre de progression
  const nextLevelScore = Math.ceil((Math.floor(score / 100) + 1) * 100)
  const progress = (score % 100) / 100 * 100

  return (
    <div className="boot-box">
      <div className="boot-header">
        <h3>🔧 Bootloader Challenge</h3>
        <div className="boot-badge">v{level}.0</div>
      </div>

      {/* Interface de score */}
      <div className="boot-stats">
        <div className="boot-stat">
          <span className="stat-label">SCORE</span>
          <span className="stat-value">{score}</span>
        </div>
        <div className="boot-stat">
          <span className="stat-label">COMBO</span>
          <span className="stat-value">x{combo}</span>
        </div>
        <div className="boot-stat">
          <span className="stat-label">LIVES</span>
          <div className="boot-lives">
            {[...Array(3)].map((_, i) => (
              <span key={i} className={`boot-heart ${i < lives ? 'active' : 'lost'}`}>❤️</span>
            ))}
          </div>
        </div>
      </div>

      {/* Barre de progression niveau */}
      <div className="boot-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">Niveau {level} • Prochain niveau: {nextLevelScore - score} pts</span>
      </div>

      {/* Écran du bootloader */}
      <div className="boot-screen">
        {lines.length === 0 ? (
          <div className="boot-placeholder">
            <span className="blink">▌ Initialisation du système... ▌</span>
          </div>
        ) : (
          lines.map((line, i) => (
            <div
              key={i}
              className={`boot-line ${line.type}`}
              onClick={() => handleClick(line)}
            >
              <span className="boot-timestamp">[{String(Date.now()).slice(-6)}]</span>
              <span className="boot-message">{line.text}</span>
              <span className="boot-indicator">{line.type === 'error' ? '⚠️' : '✓'}</span>
            </div>
          ))
        )}
      </div>

      {/* Zone de statut */}
      <div className="boot-status-area">
        <div className={`boot-status ${status}`}>
          <div className={`status-led ${status}`}></div>
          {status === "idle" && <span>En attente d'une erreur système...</span>}
          {status === "success" && <span>✅ Erreur corrigée ! +{10 + (combo * 5)} pts</span>}
          {status === "warning" && <span>⚠️ Attention ! -5 pts</span>}
          {status === "fail" && <span>❌ Mauvaise manipulation ! -1 vie</span>}
          {status === "gameover" && <span>💥 SYSTÈME HORS SERVICE</span>}
        </div>
      </div>

      {/* Game Over */}
      {gameOver && (
        <div className="boot-gameover">
          <div className="gameover-message">
            <span>⚡ BOOT FAILURE ⚡</span>
            <span className="final-score">Score final: {score}</span>
            <span className="high-score">Record: {highScore}</span>
          </div>
          <button className="boot-restart" onClick={resetGame}>
            🔄 RÉINITIALISER LE SYSTÈME
          </button>
        </div>
      )}

      {/* Instructions */}
      <div className="boot-instructions">
        <div className="instruction-item">
          <span className="instruction-dot error"></span>
          <span>Cliquer sur les erreurs</span>
        </div>
        <div className="instruction-item">
          <span className="instruction-dot warning"></span>
          <span>Éviter les warnings (-5 pts)</span>
        </div>
        <div className="instruction-item">
          <span className="instruction-dot success"></span>
          <span>Ignorer les OK (perte de vie)</span>
        </div>
      </div>
    </div>
  )
}