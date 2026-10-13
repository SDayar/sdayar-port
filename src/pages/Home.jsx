import { useState } from "react"
import Hero3D from "../components/Hero3D"
//import BootloaderChallenge from "../components/BootloaderChallenge"
import RetroGame from '../components/JetFight'


function Home() {
  const [showGame, setShowGame] = useState(false)

  return (
    <div className="home">
      <div className="home-text">
        <h1>Dayar SAIFIDINE</h1>
        <p>
          Etudiant ingénieur en Electronique et Informatique pour l'Embarqué
        </p>
        <div className="home-buttons">
          <div className="home-button-left">
            <a href="fichiers/CV___Apprenti_Ingénieur_en_Electronique_et_Informatique_Embarquée.pdf" className="primary-button" target="_blank">
            <span className="dollar">$ </span><span className="command">wget CV_RESUME</span> 
            </a>
          </div>

          <div className="home-button-right">
            <button className="play-button" onClick={() => setShowGame(true)}>
           <span className="dollar">$ </span><span className="command">./Game.sh</span> 
            </button>  
          
          </div>
        </div>
      </div>
      <div className="home-3d">
        <Hero3D />
      </div>

      {/* POP-UP */}
      {showGame && <RetroGame onClose={() => setShowGame(false)} />}
    </div>
  )
}

export default Home

