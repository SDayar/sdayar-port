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
      const pointsEarned = 10 + (combo * 5)
      setScore((s) => {
        const newScore = s + pointsEarned
        if (newScore > highScore) setHighScore(newScore)
        return newScore
      })
      setCombo((c) => c + 1)
      setStatus("success")

      if (score > 0 && score % 100 === 0) {
        setLevel((l) => Math.min(l + 1, 10))
      }
    } else if (line.type === "warning") {
      setScore((s) => Math.max(0, s - 5))
      setCombo(0)
      setStatus("warning")
    } else {
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

  const nextLevelScore = Math.ceil((Math.floor(score / 100) + 1) * 100)
  const progress = (score % 100) / 100 * 100

  return (
    <div className="boot-box">
      <div className="boot-header">
        <h3>BOOTLOADER CHALLENGE</h3>
        <div className="boot-badge">v{level}.0</div>
        <div className="boot-leds">
          <span className="led red"></span>
          <span className="led yellow"></span>
          <span className="led green"></span>
        </div>
      </div>

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
              <span key={i} className={`boot-heart ${i < lives ? 'active' : 'lost'}`}>
                {i < lives ? '◉' : '○'}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="boot-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">NIVEAU {level} • PROCHAIN: {nextLevelScore - score} PTS</span>
      </div>

      <div className="boot-screen">
        {lines.length === 0 ? (
          <div className="boot-placeholder">
            <span className="blink">SYSTEM BOOT • INITIALIZATION • _</span>
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
              <span className="boot-indicator">
                {line.type === 'error' ? '⚡' : 
                 line.type === 'warning' ? '⚠' : '✓'}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="boot-status-area">
        <div className={`boot-status ${status}`}>
          <div className={`status-led ${status}`}></div>
          {status === "idle" && <span>EN ATTENTE D'ERREUR...</span>}
          {status === "success" && <span>✓ ERREUR CORRIGÉE +{10 + (combo * 5)} PTS</span>}
          {status === "warning" && <span>⚠ WARNING -5 PTS</span>}
          {status === "fail" && <span>✗ ERREUR -1 VIE</span>}
          {status === "gameover" && <span>💀 SYSTEM HALTED</span>}
        </div>
      </div>

      {gameOver && (
        <div className="boot-gameover">
          <div className="gameover-message">
            <span>💀 BOOT FAILURE</span>
            <span className="final-score">SCORE: {score}</span>
            <span className="high-score">RECORD: {highScore}</span>
          </div>
          <button className="boot-restart" onClick={resetGame}>
            ↻ SYSTEM RESET
          </button>
        </div>
      )}

      <div className="boot-instructions">
        <div className="instruction-item">
          <span className="instruction-dot error"></span>
          <span>CLICK: ERRORS</span>
        </div>
        <div className="instruction-item">
          <span className="instruction-dot warning"></span>
          <span>AVOID: WARN</span>
        </div>
        <div className="instruction-item">
          <span className="instruction-dot success"></span>
          <span>IGNORE: OK</span>
        </div>
      </div>
    </div>
  )
}