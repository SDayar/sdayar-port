import { useState, useEffect } from "react"

export default function BootloaderChallenge() {
  const [lines, setLines] = useState([])
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState("idle")

  const bootMessages = [
    "[OK] Flash memory check",
    "[OK] Clock calibration",
    "[ERR] UART sync lost",
    "[OK] GPIO init",
    "[ERR] SPI timeout",
    "[OK] DMA channels ready",
    "[ERR] I2C bus collision",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const msg = bootMessages[Math.floor(Math.random() * bootMessages.length)]
      setLines((prev) => [...prev.slice(-6), msg])
    }, 700)

    return () => clearInterval(interval)
  }, [])

  const handleClick = (line) => {
    if (line.includes("[ERR]")) {
      setScore((s) => s + 1)
      setStatus("success")
    } else {
      setStatus("fail")
    }

    setTimeout(() => setStatus("idle"), 1000)
  }

  return (
    <div className="boot-box">
      <h3>Bootloader Challenge</h3>

      <div className="boot-screen"> 
        {lines.map((line, i) => (
          <div
            key={i}
            className={line.includes("[ERR]") ? "boot-line err" : "boot-line"}
            onClick={() => handleClick(line)}
          >
            {line}
          </div>
        ))}
      </div>

      <div className="boot-status">
        <div className={`led ${status}`}></div>
        {status === "idle" && <span>En attente…</span>}
        {status === "success" && <span>Erreur corrigée ✔</span>}
        {status === "fail" && <span>Mauvais clic ✖</span>}
      </div>

      <div className="boot-score">Score : {score}</div>
    </div>
  )
}

