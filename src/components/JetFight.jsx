import { useState, useEffect, useRef, useCallback } from 'react'
import '../styles/components/JetFight.css'

const RetroGame = ({ onClose }) => {
  const canvasRef = useRef(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [level, setLevel] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  
  // État pour les contrôles tactiles
  const [touchControls, setTouchControls] = useState({
    left: false,
    right: false,
    up: false,
    down: false,
    fire: false
  })

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Charger le high score
  useEffect(() => {
    const saved = localStorage.getItem('retroGameHighScore')
    if (saved) setHighScore(parseInt(saved))
  }, [])

  // Références pour le game loop
  const gameStateRef = useRef({
    player: { x: 180, y: 220, width: 30, height: 20 },
    bullets: [],
    enemies: [],
    explosions: [],
    particles: [],
    keys: {},
    frame: 0,
    enemySpawnTimer: 0
  })

  // Gestion des touches tactiles
  const handleTouchStart = (direction) => {
    setTouchControls(prev => ({ ...prev, [direction]: true }))
  }

  const handleTouchEnd = (direction) => {
    setTouchControls(prev => ({ ...prev, [direction]: false }))
  }

  // Initialisation du jeu
  const startGame = useCallback(() => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setLives(3)
    setLevel(1)
    setTouchControls({ left: false, right: false, up: false, down: false, fire: false })
    
    gameStateRef.current = {
      player: { x: 180, y: 220, width: 30, height: 20 },
      bullets: [],
      enemies: [],
      explosions: [],
      particles: [],
      keys: {},
      frame: 0,
      enemySpawnTimer: 0
    }
  }, [])

  // Gestion des touches clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted || gameOver) return
      gameStateRef.current.keys[e.key.toLowerCase()] = true
    }
    
    const handleKeyUp = (e) => {
      gameStateRef.current.keys[e.key.toLowerCase()] = false
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameStarted, gameOver])

  // Game loop principal
  useEffect(() => {
    if (!gameStarted || gameOver) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    const gameLoop = setInterval(() => {
      const state = gameStateRef.current
      
      // Mouvement
      const speed = 4
      if (state.keys['arrowleft'] || state.keys['q'] || state.keys['a'] || touchControls.left) {
        state.player.x = Math.max(10, state.player.x - speed)
      }
      if (state.keys['arrowright'] || state.keys['d'] || touchControls.right) {
        state.player.x = Math.min(360, state.player.x + speed)
      }
      if (state.keys['arrowup'] || state.keys['z'] || state.keys['w'] || touchControls.up) {
        state.player.y = Math.max(10, state.player.y - speed)
      }
      if (state.keys['arrowdown'] || state.keys['s'] || touchControls.down) {
        state.player.y = Math.min(260, state.player.y + speed)
      }
      
      // Tir
      if ((state.keys[' '] || touchControls.fire) && state.frame % 12 === 0) {
        state.bullets.push({
          x: state.player.x + 12,
          y: state.player.y - 5,
          width: 4,
          height: 8,
          speed: 6
        })
      }
      
      // Mise à jour balles
      state.bullets = state.bullets.filter(bullet => {
        bullet.y -= bullet.speed
        return bullet.y > -10
      })
      
      // Apparition ennemis
      state.enemySpawnTimer++
      if (state.enemySpawnTimer > Math.max(35 - level * 2, 15)) {
        state.enemies.push({
          x: Math.random() * 340,
          y: -20,
          width: 24,
          height: 20,
          speed: 1.5 + level * 0.2,
          type: Math.random() > 0.8 ? 'fast' : 'normal'
        })
        state.enemySpawnTimer = 0
      }
      
      // Mise à jour ennemis
      state.enemies = state.enemies.filter(enemy => {
        enemy.y += enemy.type === 'fast' ? enemy.speed * 1.5 : enemy.speed
        return enemy.y < 300
      })
      
      // Collisions balles-ennemis
      state.bullets.forEach(bullet => {
        state.enemies.forEach((enemy, index) => {
          if (bullet.x < enemy.x + enemy.width &&
              bullet.x + bullet.width > enemy.x &&
              bullet.y < enemy.y + enemy.height &&
              bullet.y + bullet.height > enemy.y) {
            
            state.enemies.splice(index, 1)
            bullet.y = -100
            
            state.explosions.push({
              x: enemy.x + enemy.width/2,
              y: enemy.y + enemy.height/2,
              frames: 0
            })
            
            setScore(prev => {
              const newScore = prev + 10
              if (newScore > highScore) {
                setHighScore(newScore)
                localStorage.setItem('retroGameHighScore', newScore)
              }
              if (newScore % 80 === 0) {
                setLevel(l => l + 1)
              }
              return newScore
            })
          }
        })
      })
      
      state.bullets = state.bullets.filter(b => b.y > -10)
      
      // Collisions joueur-ennemis
      state.enemies.forEach(enemy => {
        if (state.player.x < enemy.x + enemy.width &&
            state.player.x + state.player.width > enemy.x &&
            state.player.y < enemy.y + enemy.height &&
            state.player.y + state.player.height > enemy.y) {
          
          state.enemies = state.enemies.filter(e => e !== enemy)
          
          setLives(prev => {
            const newLives = prev - 1
            if (newLives <= 0) {
              setGameOver(true)
            }
            return newLives
          })
        }
      })
      
      // Mise à jour explosions
      state.explosions = state.explosions.filter(exp => {
        exp.frames++
        return exp.frames < 8
      })
      
      // DESSIN
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, 400, 300)
      
      // Grille rétro
      ctx.strokeStyle = '#00ff00'
      ctx.lineWidth = 0.3
      for (let i = 0; i < 400; i += 20) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, 300)
        ctx.strokeStyle = '#003300'
        ctx.stroke()
      }
      for (let i = 0; i < 300; i += 20) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(400, i)
        ctx.strokeStyle = '#003300'
        ctx.stroke()
      }
      
      // Joueur
      ctx.fillStyle = '#00ff00'
      ctx.beginPath()
      ctx.moveTo(state.player.x, state.player.y - 10)
      ctx.lineTo(state.player.x + 20, state.player.y + 5)
      ctx.lineTo(state.player.x, state.player.y + 5)
      ctx.closePath()
      ctx.fill()
      
      ctx.fillStyle = '#00aa00'
      ctx.beginPath()
      ctx.moveTo(state.player.x, state.player.y - 8)
      ctx.lineTo(state.player.x + 15, state.player.y + 5)
      ctx.lineTo(state.player.x, state.player.y + 5)
      ctx.closePath()
      ctx.fill()
      
      // Balles
      ctx.fillStyle = '#ffff00'
      state.bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
      })
      
      // Ennemis
      state.enemies.forEach(enemy => {
        if (enemy.type === 'fast') {
          ctx.fillStyle = '#ff5500'
        } else {
          ctx.fillStyle = '#ff0000'
        }
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
        
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(enemy.x + 5, enemy.y + 4, 4, 4)
        ctx.fillRect(enemy.x + 15, enemy.y + 4, 4, 4)
      })
      
      // Explosions
      state.explosions.forEach(exp => {
        const size = 3 + exp.frames
        ctx.fillStyle = '#ffaa00'
        ctx.beginPath()
        ctx.arc(exp.x, exp.y, size, 0, Math.PI * 2)
        ctx.fill()
      })
      
      // Score et infos
      ctx.fillStyle = '#00ff00'
      ctx.font = '12px "Courier New", monospace'
      ctx.fillText(`SCORE:${score.toString().padStart(5, '0')}`, 10, 20)
      ctx.fillText(`HI:${highScore.toString().padStart(5, '0')}`, 10, 35)
      
      for (let i = 0; i < lives; i++) {
        ctx.fillStyle = '#00ff00'
        ctx.beginPath()
        ctx.moveTo(300 + i * 25, 15)
        ctx.lineTo(310 + i * 25, 25)
        ctx.lineTo(290 + i * 25, 25)
        ctx.closePath()
        ctx.fill()
      }
      
      ctx.fillStyle = '#00ff00'
      ctx.font = '10px "Courier New", monospace'
      ctx.fillText(`LVL ${level}`, 350, 25)
      
      state.frame++
    }, 1000/60)
    
    return () => clearInterval(gameLoop)
  }, [gameStarted, gameOver, level, highScore, touchControls])

  return (
    <div className="retro-modal">
      <div className="retro-container">
        <div className="retro-header">
          <span className="retro-title">_ JET RETRO v1.0</span>
          <button className="retro-close" onClick={onClose}>[FERMER]</button>
        </div>

        <div className="retro-canvas-wrapper">
          <canvas 
            ref={canvasRef} 
            width={400} 
            height={300} 
            className="retro-canvas"
          />
          
          {!gameStarted && !gameOver && (
            <div className="retro-overlay">
              <pre className="retro-ascii">
{`╔════════════════════╗
║    JET RETRO       ║
╠════════════════════╣
║ > NOUVELLE PARTIE  ║
╚════════════════════╝`}
              </pre>
              <p className="retro-info">{isMobile ? "TOUCHER LES BOUTONS" : "FLECHES / ZQSD"}</p>
              <p className="retro-info">ESPACE = TIRER</p>
              <button className="retro-start" onClick={startGame}>
                [DEMARRER]
              </button>
            </div>
          )}

          {gameOver && (
            <div className="retro-overlay">
              <pre className="retro-ascii">
{`╔════════════════════╗
║     GAME OVER      ║
╠════════════════════╣
║ SCORE: ${score.toString().padStart(5, '0')}        ║
╚════════════════════╝`}
              </pre>
              {score >= highScore && (
                <p className="retro-newrecord"> NOUVEAU RECORD </p>
              )}
              <button className="retro-start" onClick={startGame}>
                [REJOUER]
              </button>
            </div>
          )}
        </div>

        <div className="retro-footer">
          {isMobile ? (
            <div className="retro-controls">
              <div className="retro-move">
                <button 
                  className="retro-btn up"
                  onTouchStart={() => handleTouchStart('up')}
                  onTouchEnd={() => handleTouchEnd('up')}
                  onMouseDown={() => handleTouchStart('up')}
                  onMouseUp={() => handleTouchEnd('up')}
                  onMouseLeave={() => handleTouchEnd('up')}
                >^</button>
                <div className="retro-move-row">
                  <button 
                    className="retro-btn left"
                    onTouchStart={() => handleTouchStart('left')}
                    onTouchEnd={() => handleTouchEnd('left')}
                    onMouseDown={() => handleTouchStart('left')}
                    onMouseUp={() => handleTouchEnd('left')}
                    onMouseLeave={() => handleTouchEnd('left')}
                  >&lt;</button>
                  <button 
                    className="retro-btn down"
                    onTouchStart={() => handleTouchStart('down')}
                    onTouchEnd={() => handleTouchEnd('down')}
                    onMouseDown={() => handleTouchStart('down')}
                    onMouseUp={() => handleTouchEnd('down')}
                    onMouseLeave={() => handleTouchEnd('down')}
                  >v</button>
                  <button 
                    className="retro-btn right"
                    onTouchStart={() => handleTouchStart('right')}
                    onTouchEnd={() => handleTouchEnd('right')}
                    onMouseDown={() => handleTouchStart('right')}
                    onMouseUp={() => handleTouchEnd('right')}
                    onMouseLeave={() => handleTouchEnd('right')}
                  >&gt;</button>
                </div>
              </div>
              <button 
                className="retro-fire"
                onTouchStart={() => handleTouchStart('fire')}
                onTouchEnd={() => handleTouchEnd('fire')}
                onMouseDown={() => handleTouchStart('fire')}
                onMouseUp={() => handleTouchEnd('fire')}
                onMouseLeave={() => handleTouchEnd('fire')}
              >[ TIRER ]</button>
            </div>
          ) : (
            <div className="retro-keys">
              <span className="retro-key">←↑↓→</span>
              <span className="retro-key">ZQSD</span>
              <span className="retro-key">ESPACE</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RetroGame