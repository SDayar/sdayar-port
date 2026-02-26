import { useState } from "react"
import Hero3D from "../components/Hero3D"
import BootloaderChallenge from "../components/BootloaderChallenge"

function Home() {
  const [openGame, setOpenGame] = useState(false)

  return (
    <div className="home">
      <div className="home-text">
        <h1>Dayar SAIFIDINE</h1>
        <p>
          Étudiant en licence de mathématique et informatique, passionné par les systèmes embarqués et le développement moderne.
        </p>
        <div className="home-buttons">
          <div className="home-button-left">
            <a href="#projects" className="primary-button">
            Voir mes projets
            </a>
          </div>
          <div className="home-button-right">
            <button className="play-button" onClick={() => setOpenGame(true)}>
            Jouer à un jeu
            </button>  
            <div className="boot-preview">
              [OK] Flash memory check  
              <br />
              [ERR]<div style={{color:'red'}}>UART sync lost</div>  
              <br />
              [OK] GPIO init
            </div>
          </div>
        </div>
      </div>
      <div className="home-3d">
        <Hero3D />
      </div>

      {/* POP-UP */}
      {openGame && (
        <div className="game-modal">
          <div className="game-content">
            <button className="close-btn" onClick={() => setOpenGame(false)}>
              ✖
            </button>

            <BootloaderChallenge />
          </div>
        </div>
      )}
    </div>
  )
}

export default Home

