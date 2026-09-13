import React, { useState, useEffect, useRef } from 'react'

export default function Temp() {
  // --- ÉTATS ANIMATIONS ET JEUX ---
  const [phase, setPhase] = useState('countdown')
  const [count, setCount] = useState(3)
  const [hearts, setHearts] = useState([])
  const [backpackSecret, setBackpackSecret] = useState(false)
  const [candlesBlown, setCandlesBlown] = useState(false)
  
  // Repas & Films
  const [selectedMeals, setSelectedMeals] = useState([])
  const [selectedMovies, setSelectedMovies] = useState([])

  // Quiz
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizScore, setQuizScore] = useState(null)

  // Roue des attentions
  const [isSpinning, setIsSpinning] = useState(false)
  const [wheelRotation, setWheelRotation] = useState(0)
  const [wheelResult, setWheelResult] = useState(null)

  // Carte à gratter (Boisson Surprise)
  const canvasRef = useRef(null)
  const [isScratched, setIsScratched] = useState(false)

  // Photos téléversables
  const [photos, setPhotos] = useState({
    before: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
    date: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',
    couple: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80'
  })

  // --- DÉCOMPTE INITIAL ---
  useEffect(() => {
    if (phase === 'countdown') {
      if (count > 0) {
        const timer = setTimeout(() => setCount(count - 1), 750)
        return () => clearTimeout(timer)
      } else {
        setPhase('surprise')
      }
    } else if (phase === 'surprise') {
      const timer = setTimeout(() => setPhase('main'), 1400)
      return () => clearTimeout(timer)
    }
  }, [count, phase])

  // --- CARTE À GRATTER (CANVAS BOISSON SURPRISE) ---
  useEffect(() => {
    if (phase !== 'main') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    canvas.width = 340
    canvas.height = 140

    // Couche argentée épurée
    ctx.fillStyle = '#e2e8f0'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Motif élégant par-dessus
    ctx.fillStyle = '#94a3b8'
    ctx.font = '600 14px system-ui'
    ctx.textAlign = 'center'
    ctx.fillText('✨ Gratte ici avec ta souris ou ton doigt ✨', canvas.width / 2, canvas.height / 2 + 5)

    let isDrawing = false

    const scratch = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.arc(x, y, 22, 0, Math.PI * 2)
      ctx.fill()

      // Calcul du pourcentage gratté
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      let transparentPixels = 0
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) transparentPixels++
      }
      if (transparentPixels / (canvas.width * canvas.height) > 0.45) {
        setIsScratched(true)
      }
    }

    const handleMouseDown = (e) => {
      isDrawing = true
      const rect = canvas.getBoundingClientRect()
      scratch(e.clientX - rect.left, e.clientY - rect.top)
    }
    const handleMouseMove = (e) => {
      if (!isDrawing) return
      const rect = canvas.getBoundingClientRect()
      scratch(e.clientX - rect.left, e.clientY - rect.top)
    }
    const handleMouseUp = () => { isDrawing = false }

    const handleTouchStart = (e) => {
      isDrawing = true
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      scratch(touch.clientX - rect.left, touch.clientY - rect.top)
    }
    const handleTouchMove = (e) => {
      if (!isDrawing) return
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      scratch(touch.clientX - rect.left, touch.clientY - rect.top)
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    canvas.addEventListener('touchstart', handleTouchStart)
    canvas.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleMouseUp)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [phase])

  // Changement de photo
  const handlePhotoUpload = (key, file) => {
    if (file) {
      setPhotos(prev => ({ ...prev, [key]: URL.createObjectURL(file) }))
    }
  }

  // Easter egg cœurs
  const triggerHearts = (e) => {
    const newHearts = Array.from({ length: 7 }).map((_, i) => ({
      id: Date.now() + i,
      x: e.clientX + (Math.random() * 50 - 25),
      y: e.clientY + (Math.random() * 50 - 25),
    }))
    setHearts(prev => [...prev, ...newHearts])
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.includes(h)))
    }, 1200)
  }

  // Quiz
  const questions = [
    {
      id: 1,
      question: "Quelle était la météo lors de notre rendez-vous du 27 Janvier ?",
      options: ["Un soleil éclatant d'hiver", "Une douce fraîcheur", "Un ciel dégagé & romantique"],
      correct: 1
    },
    {
      id: 2,
      question: "Qui mentionne 'Sac à dos' en premier lors des sorties ?",
      options: ["Toi (Swafi), c'est ton expression !", "Moi, pour ne rien oublier", "On le dit en même temps !"],
      correct: 0
    },
    {
      id: 3,
      question: "Quel film en programmation est en haut de notre liste de rendez-vous ?",
      options: ["Klara et le Soleil", "Clayface", "Wife and Dog"],
      correct: 1
    }
  ]

  const handleQuizSelect = (qId, optionIdx) => {
    setQuizAnswers({ ...quizAnswers, [qId]: optionIdx })
  }

  const validateQuiz = () => {
    let score = 0
    questions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) score++
    })
    setQuizScore(score)
  }

  // Roue des attentions
  const wheelAttentions = [
    "Un petit-déjeuner surprise au lit 🥐",
    "Un massage des épaules 💆‍♀️",
    "Ton dessert préféré commandé 🍰",
    "Une soirée cinéma avec ton choix de film 🍿",
    "Une promenade romantique à deux 🌹",
    "Un câlin géant réconfortant ✨"
  ]

  const spinWheel = () => {
    if (isSpinning) return
    setIsSpinning(true)
    setWheelResult(null)
    const randomDegrees = 1440 + Math.floor(Math.random() * 360)
    setWheelRotation(randomDegrees)

    setTimeout(() => {
      setIsSpinning(false)
      const actualDegree = randomDegrees % 360
      const segmentAngle = 360 / wheelAttentions.length
      const index = Math.floor((360 - (actualDegree % 360)) / segmentAngle) % wheelAttentions.length
      setWheelResult(wheelAttentions[index])
    }, 3500)
  }

  // Listes des 9 repas et 9 films
  const mealsList = [
    { id: 1, name: 'Sushis préparés minute', desc: 'Frais, légers et gourmands' },
    { id: 2, name: 'Pizza au feu de bois', desc: 'Croûte alvéolée & burrata' },
    { id: 3, name: 'Tacos street-food', desc: 'Épicés juste comme tu aimes' },
    { id: 4, name: 'Burger artisan gourmet', desc: 'Pain brioché & frites maison' },
    { id: 5, name: 'Brunch sucré-salé', desc: 'Pancakes, avocado toast et jus' },
    { id: 6, name: 'Ramen traditionnel', desc: 'Bouillon mijoté et réconfortant' },
    { id: 7, name: 'Grillades au feu', desc: 'Saveurs fumées et conviviales' },
    { id: 8, name: 'Cuisine du monde', desc: 'Une nouvelle saveur à découvrir' },
    { id: 9, name: 'Dîner gastronomique', desc: 'Table tamisée et chandelles' },
  ]

  const moviesList = [
    { id: 1, title: 'Clayface', date: 'Sortie Cinéma', detail: 'Le thriller horrifique événement DC' },
    { id: 2, title: 'Klara et le soleil', date: 'Sortie Cinéma', detail: 'Adaptation poétique & émouvante' },
    { id: 3, title: 'The Social Reckoning', date: 'Sortie Cinéma', detail: 'Le drame captivant d’Aaron Sorkin' },
    { id: 4, title: 'Ducobu et le fantôme', date: 'Sortie Cinéma', detail: 'Pour une soirée rigolade légère' },
    { id: 5, title: 'Les Misérables', date: 'Sortie Cinéma', detail: 'Grande fresque historique' },
    { id: 6, title: 'Karma', date: 'Sortie Cinéma', detail: 'Le nouveau film de Guillaume Canet' },
    { id: 7, title: 'Street Fighter', date: 'Sortie Cinéma', detail: 'Grosse séance d’action déjantée' },
    { id: 8, title: 'Wife And Dog', date: 'Sortie Cinéma', detail: 'Comédie noire & thriller' },
    { id: 9, title: 'Shaun le Mouton : Halloween', date: 'Sortie Cinéma', detail: 'Petit moment cocooning' },
  ]

  const toggleMeal = (id) => {
    if (selectedMeals.includes(id)) {
      setSelectedMeals(selectedMeals.filter(m => m !== id))
    } else if (selectedMeals.length < 3) {
      setSelectedMeals([...selectedMeals, id])
    }
  }

  const toggleMovie = (id) => {
    if (selectedMovies.includes(id)) {
      setSelectedMovies(selectedMovies.filter(m => m !== id))
    } else {
      setSelectedMovies([...selectedMovies, id])
    }
  }

  // ÉCRANS D'INTRO
  if (phase !== 'main') {
    return (
      <div className="temp-intro-wrapper">
        {phase === 'countdown' ? (
          <div className="temp-intro-content">
            <span className="temp-countdown-value">{count}</span>
            <p className="temp-intro-caption">Préparation de ton coin secret...</p>
          </div>
        ) : (
          <div className="temp-intro-content">
            <h1 className="temp-surprise-heading">Joyeux Anniversaire Swafi ! ❤️</h1>
            <p className="temp-intro-caption">Déverrouillage de ton espace dédié...</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="temp-page">

      {/* Cœurs volants au clic */}
      {hearts.map(h => (
        <span key={h.id} className="temp-heart-anim" style={{ left: h.x, top: h.y }}>❤️</span>
      ))}

      {/* INJECTION DIRECTE DU CSS NATIVE */}
      <style>{`
        .temp-page {
          background-color: #fbfbfd;
          color: #1d1d1f;
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          width: 100%;
          min-height: 100vh;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        .temp-intro-wrapper {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
        }

        .temp-intro-content { text-align: center; }
        .temp-countdown-value { font-size: 7rem; font-weight: 800; color: #e11d48; }
        .temp-surprise-heading { font-size: 3rem; font-weight: 700; color: #1d1d1f; }
        .temp-intro-caption { font-size: 1.1rem; color: #86868b; margin-top: 10px; }

        .temp-section {
          min-height: 85vh;
          max-width: 1000px;
          margin: 0 auto;
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .temp-hero-card { text-align: center; max-width: 750px; margin: 0 auto; }
        .temp-pill {
          display: inline-block;
          padding: 6px 16px;
          background-color: #ffe4e6;
          color: #e11d48;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .temp-main-title {
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 20px;
          cursor: pointer;
        }

        .temp-highlight {
          color: #e11d48;
          border-bottom: 3px solid #fecdd3;
        }

        .temp-body-text {
          font-size: 1.2rem;
          line-height: 1.7;
          color: #48484a;
        }

        .temp-hint { font-size: 0.85rem; color: #a1a1a6; margin-top: 16px; cursor: pointer; display: block; }

        .temp-section-header { text-align: center; margin-bottom: 40px; }
        .temp-section-title { font-size: 2.3rem; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 10px; }
        .temp-section-sub { font-size: 1.1rem; color: #6e6e73; max-width: 600px; margin: 0 auto; }

        /* GRID PHOTOS */
        .temp-grid-2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .temp-photo-card {
          background-color: #ffffff;
          border-radius: 20px;
          padding: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          border: 1px solid #f1f5f9;
        }

        .temp-photo-frame {
          width: 100%;
          height: 320px;
          border-radius: 14px;
          overflow: hidden;
          background-color: #f8fafc;
        }

        .temp-photo-img { width: 100%; height: 100%; object-fit: cover; }
        .temp-photo-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
          padding: 0 4px;
        }
        .temp-photo-label { font-weight: 600; font-size: 1rem; color: #1e293b; }
        .temp-upload-btn { font-size: 0.8rem; color: #6366f1; font-weight: 500; cursor: pointer; }

        /* BANNIÈRE MASTER */
        .temp-banner {
          background-color: #ffffff;
          border-top: 1px solid #f1f5f9;
          border-bottom: 1px solid #f1f5f9;
          padding: 70px 20px;
          text-align: center;
        }
        .temp-banner-inner { max-width: 700px; margin: 0 auto; }
        .temp-badge-purple { color: #9333ea; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }

        /* GRIDS INTERACTIFS (JEUX, MEALS, MOVIES) */
        .temp-grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px;
        }

        .temp-card-item {
          background-color: #ffffff;
          border-radius: 16px;
          padding: 20px;
          border: 1px solid #e2e8f0;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        .temp-card-item:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.04); }
        .temp-card-title { font-size: 1.1rem; font-weight: 700; margin: 0 0 6px 0; color: #1e293b; }
        .temp-card-desc { font-size: 0.9rem; color: #64748b; margin: 0; line-height: 1.4; }

        .temp-tag-selected {
          display: inline-block;
          margin-top: 10px;
          padding: 4px 10px;
          background-color: #e11d48;
          color: #fff;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        /* BOISSON SURPRISE (GRATTER) */
        .temp-scratch-box {
          background-color: #ffffff;
          border-radius: 24px;
          padding: 40px 20px;
          text-align: center;
          border: 1px solid #f1f5f9;
          box-shadow: 0 15px 35px rgba(0,0,0,0.03);
          max-width: 500px;
          margin: 0 auto;
        }
        .temp-scratch-container {
          position: relative;
          width: 340px;
          height: 140px;
          margin: 20px auto;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
        }
        .temp-scratch-reveal {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #fff1f2, #ffe4e6);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .temp-scratch-canvas {
          position: absolute;
          inset: 0;
          cursor: pointer;
          touch-action: none;
        }

        /* QUIZ */
        .temp-quiz-card {
          background-color: #ffffff;
          border-radius: 20px;
          padding: 24px;
          border: 1px solid #e2e8f0;
          margin-bottom: 20px;
        }
        .temp-quiz-option {
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid #cbd5e1;
          margin-top: 10px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }
        .temp-quiz-btn {
          background-color: #1e293b;
          color: #fff;
          border: none;
          padding: 14px 28px;
          border-radius: 25px;
          font-weight: 700;
          cursor: pointer;
          font-size: 1rem;
          display: block;
          margin: 20px auto 0 auto;
        }

        /* ROUE DES ATTENTIONS */
        .temp-wheel-container {
          text-align: center;
          max-width: 450px;
          margin: 0 auto;
        }
        .temp-wheel-wrapper {
          position: relative;
          width: 280px;
          height: 280px;
          margin: 20px auto;
        }
        .temp-wheel {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 6px solid #ffffff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          transition: transform 3.5s cubic-bezier(0.15, 0.99, 0.18, 0.99);
          background: conic-gradient(
            #fecdd3 0deg 60deg,
            #e0e7ff 60deg 120deg,
            #fef08a 120deg 180deg,
            #dcfce7 180deg 240deg,
            #f3e8ff 240deg 300deg,
            #ffe4e6 300deg 360deg
          );
        }
        .temp-wheel-pointer {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.8rem;
          z-index: 10;
        }

        /* SAC À DOS */
        .temp-backpack-box {
          background-color: #ffffff;
          border-radius: 28px;
          border: 2px dashed #f43f5e;
          padding: 50px 20px;
          text-align: center;
          cursor: pointer;
          max-width: 500px;
          margin: 0 auto;
        }
        .temp-backpack-title { font-size: 3rem; font-weight: 900; letter-spacing: 4px; color: #f43f5e; margin: 0; }

        /* BOUGIES */
        .temp-cake-box { text-align: center; max-width: 500px; margin: 0 auto; }
        .temp-btn-pink {
          background-color: #e11d48;
          color: #ffffff;
          border: none;
          padding: 16px 36px;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .temp-heart-anim {
          position: fixed;
          font-size: 1.5rem;
          pointer-events: none;
          animation: tempFloatUp 1.2s forwards;
          z-index: 9999;
        }

        @keyframes tempFloatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-80px) scale(1.3); opacity: 0; }
        }
      `}</style>

      {/* --- HERO / ACCUEIL --- */}
      <section className="temp-section">
        <div className="temp-hero-card">
          <span className="temp-pill">Accès réservé • Code 270125 Validé</span>
          <h1 className="temp-main-title" onClick={triggerHearts}>
            Félicitations, <span className="temp-highlight">Swafwata</span>
          </h1>
          <p className="temp-body-text">
            Tu as déverrouillé ton espace secret. Un havre de douceur pensé dans les moindres détails pour marquer ton anniversaire et nos moments précieux.
          </p>
          <span className="temp-hint" onClick={triggerHearts}>
            ♡ Clique sur ton prénom pour une petite attention
          </span>
        </div>
      </section>

      {/* --- AVANT / APRÈS --- */}
      <section className="temp-section">
        <div className="temp-section-header">
          <h2 className="temp-section-title">Le temps passe, les mémoires restent</h2>
          <p className="temp-section-sub">Regarde un peu ce beau chemin parcouru ensemble.</p>
        </div>

        <div className="temp-grid-2">
          {/* PHOTO 1 */}
          <div className="temp-photo-card">
            <div className="temp-photo-frame">
              <img src={photos.before} alt="Avant" className="temp-photo-img" />
            </div>
            <div className="temp-photo-footer">
              <span className="temp-photo-label">Avant</span>
              <label className="temp-upload-btn">
                Changer la photo
                <input type="file" accept="image/*" hidden onChange={(e) => handlePhotoUpload('before', e.target.files[0])} />
              </label>
            </div>
          </div>

          {/* PHOTO 2 */}
          <div className="temp-photo-card">
            <div className="temp-photo-frame">
              <img src={photos.after} alt="Aujourd'hui" className="temp-photo-img" />
            </div>
            <div className="temp-photo-footer">
              <span className="temp-photo-label">Aujourd’hui</span>
              <label className="temp-upload-btn">
                Changer la photo
                <input type="file" accept="image/*" hidden onChange={(e) => handlePhotoUpload('after', e.target.files[0])} />
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* --- FÉLICITATIONS MASTER --- */}
      <section className="temp-banner">
        <div className="temp-banner-inner">
          <span className="temp-badge-purple">Une étape majeure</span>
          <h2 className="temp-section-title" style={{ marginTop: '10px' }}>Bravo pour ton Master Swafi ! 🎓</h2>
          <p className="temp-body-text">
            Tes efforts et ta persévérance ont payé. Je suis tellement fier de te voir franchir ce cap. Que la suite de ton parcours ne te réserve que du bonheur et des réussites éclatantes !
          </p>
        </div>
      </section>

      {/* --- MINI-JEU 1 : QUIZ DE NOTRE HISTOIRE --- */}
      <section className="temp-section">
        <div className="temp-section-header">
          <span className="temp-pill">Mini-Jeu 1</span>
          <h2 className="temp-section-title">Quiz de Notre Histoire 🧠</h2>
          <p className="temp-section-sub">Teste tes souvenirs avec ces quelques questions douces.</p>
        </div>

        <div style={{ maxWidth: '650px', margin: '0 auto', width: '100%' }}>
          {questions.map((q) => (
            <div key={q.id} className="temp-quiz-card">
              <h3 style={{ fontSize: '1.1rem', margin: '0 0 12px 0', color: '#1e293b' }}>{q.id}. {q.question}</h3>
              {q.options.map((opt, idx) => {
                const isSelected = quizAnswers[q.id] === idx
                return (
                  <div
                    key={idx}
                    className="temp-quiz-option"
                    onClick={() => handleQuizSelect(q.id, idx)}
                    style={{
                      borderColor: isSelected ? '#e11d48' : '#cbd5e1',
                      backgroundColor: isSelected ? '#fff1f2' : '#ffffff',
                      color: isSelected ? '#e11d48' : '#334155'
                    }}
                  >
                    {opt} {isSelected && '✓'}
                  </div>
                )
              })}
            </div>
          ))}

          <button className="temp-quiz-btn" onClick={validateQuiz}>
            Valider mes réponses ✨
          </button>

          {quizScore !== null && (
            <div style={{ textAlign: 'center', marginTop: '20px', padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '16px', color: '#166534', fontWeight: '600' }}>
              🎉 Ton score : {quizScore} / {questions.length} ! {quizScore === 3 ? "Sans faute ! Tu es incroyable ❤️" : "Presque parfait ! 😊"}
            </div>
          )}
        </div>
      </section>

      {/* --- MINI-JEU 2 : BOISSON SURPRISE A GRATTER --- */}
      <section className="temp-section">
        <div className="temp-section-header">
          <span className="temp-pill">Mini-Jeu 2</span>
          <h2 className="temp-section-title">Boisson Surprise à Gratter 🍹</h2>
          <p className="temp-section-sub">Gratte la carte ci-dessous pour découvrir ton cadeau surprise !</p>
        </div>

        <div className="temp-scratch-box">
          <h3 style={{ margin: '0 0 6px 0', fontSize: '1.2rem', color: '#1e293b' }}>Ticket Cadeau Privilège</h3>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>Utilisable lors de notre prochaine sortie</p>

          <div className="temp-scratch-container">
            <div className="temp-scratch-reveal">
              <span style={{ fontSize: '1.8rem' }}>🍹✨</span>
              <strong style={{ color: '#e11d48', fontSize: '1.1rem', marginTop: '4px' }}>PASS BOISSON SURPRISE</strong>
              <span style={{ fontSize: '0.85rem', color: '#475569', marginTop: '2px' }}>
                Un cocktail / mocktail surprise de ton choix offert !
              </span>
            </div>
            <canvas ref={canvasRef} className="temp-scratch-canvas" />
          </div>

          {isScratched && (
            <p style={{ color: '#16a34a', fontWeight: '600', margin: '10px 0 0 0', fontSize: '0.95rem' }}>
              ✨ Ticket débloqué ! À consommer ensemble très vite ❤️
            </p>
          )}
        </div>
      </section>

      {/* --- MINI-JEU 3 : ROUE DES ATTENTIONS --- */}
      <section className="temp-section">
        <div className="temp-section-header">
          <span className="temp-pill">Mini-Jeu 3</span>
          <h2 className="temp-section-title">La Roue des Attentions 🎡</h2>
          <p className="temp-section-sub">Tourne la roue pour tirer au sort une petite attention de ma part !</p>
        </div>

        <div className="temp-wheel-container">
          <div className="temp-wheel-wrapper">
            <div className="temp-wheel-pointer">👇</div>
            <div className="temp-wheel" style={{ transform: `rotate(${wheelRotation}deg)` }} />
          </div>

          <button className="temp-quiz-btn" onClick={spinWheel} disabled={isSpinning}>
            {isSpinning ? 'La roue tourne...' : 'Tourner la roue 🎲'}
          </button>

          {wheelResult && (
            <div style={{ marginTop: '24px', padding: '20px', backgroundColor: '#fff1f2', borderRadius: '20px', border: '1px solid #fecdd3' }}>
              <span style={{ fontSize: '0.85rem', color: '#e11d48', fontWeight: '700', textTransform: 'uppercase' }}>Résultat du tirage</span>
              <h3 style={{ color: '#9f1239', margin: '6px 0 0 0', fontSize: '1.2rem' }}>{wheelResult}</h3>
            </div>
          )}
        </div>
      </section>

      {/* --- MENU RETROUVAILLES (3 SELECTIONS) --- */}
      <section className="temp-section">
        <div className="temp-section-header">
          <h2 className="temp-section-title">Ce qu’on mangera à nos retrouvailles 🍽️</h2>
          <p className="temp-section-sub">
            Sélectionne 3 repas parmi les 9 propositions ({selectedMeals.length}/3) :
          </p>
        </div>

        <div className="temp-grid-3">
          {mealsList.map((meal) => {
            const isSelected = selectedMeals.includes(meal.id)
            return (
              <div
                key={meal.id}
                className="temp-card-item"
                onClick={() => toggleMeal(meal.id)}
                style={{
                  borderColor: isSelected ? '#e11d48' : '#e2e8f0',
                  backgroundColor: isSelected ? '#fff1f2' : '#ffffff'
                }}
              >
                <h3 className="temp-card-title">{meal.name}</h3>
                <p className="temp-card-desc">{meal.desc}</p>
                {isSelected && <span className="temp-tag-selected">Sélectionné</span>}
              </div>
            )
          })}
        </div>
      </section>

      {/* --- EXPLICATION CODE 270125 + PHOTO --- */}
      <section className="temp-section">
        <div className="temp-grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="temp-pill">Origine du code</span>
            <h2 className="temp-section-title">Le secret du 27.01.25</h2>
            <p className="temp-body-text">
              Ce code correspond au <strong>27 Janvier 2025</strong> : le jour de notre rencontre, pile 3 ans après le bac. Une date gravée pour toujours.
            </p>
          </div>
          <div className="temp-photo-card">
            <div className="temp-photo-frame">
              <img src={photos.date} alt="Rencontre" className="temp-photo-img" />
            </div>
            <div className="temp-photo-footer">
              <span className="temp-photo-label">Jour de notre rencontre</span>
              <label className="temp-upload-btn">
                Changer la photo
                <input type="file" accept="image/*" hidden onChange={(e) => handlePhotoUpload('date', e.target.files[0])} />
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* --- EASTER EGG : SAC À DOS --- */}
      <section className="temp-section" style={{ minHeight: 'auto', padding: '40px 20px' }}>
        <div className="temp-backpack-box" onClick={() => setBackpackSecret(!backpackSecret)}>
          <h2 className="temp-backpack-title">SAC À DOS</h2>
          <span className="temp-hint" style={{ marginTop: '10px' }}>
            {backpackSecret ? "🔒 Mot secret déverrouillé !" : "(Clique ici si tu te souviens)"}
          </span>
          {backpackSecret && (
            <p style={{ marginTop: '16px', fontSize: '1.1rem', color: '#1e293b', lineHeight: '1.6' }}>
              Peu importe la destination, du moment qu'on a notre sac à dos et tous nos beaux souvenirs ! ❤️
            </p>
          )}
        </div>
      </section>

      {/* --- PROGRAMME CINÉMA OCTOBRE --- */}
      <section className="temp-section">
        <div className="temp-section-header">
          <h2 className="temp-section-title">Nos prochaines séances Cinéma 🍿</h2>
          <p className="temp-section-sub">
            Sélectionne les films qu'on va aller voir en Octobre (dont le très attendu <strong>Clayface</strong> !) :
          </p>
        </div>

        <div className="temp-grid-3">
          {moviesList.map((movie) => {
            const isSelected = selectedMovies.includes(movie.id)
            return (
              <div
                key={movie.id}
                className="temp-card-item"
                onClick={() => toggleMovie(movie.id)}
                style={{
                  borderColor: isSelected ? '#6366f1' : '#e2e8f0',
                  backgroundColor: isSelected ? '#eeef2ff' : '#ffffff'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 className="temp-card-title">{movie.title}</h3>
                </div>
                <p className="temp-card-desc">{movie.detail}</p>
                {isSelected && <span className="temp-tag-selected" style={{ backgroundColor: '#6366f1' }}>Au programme</span>}
              </div>
            )
          })}
        </div>
      </section>

      {/* --- MOT D'AMOUR + PHOTO COUPLE --- */}
      <section className="temp-section">
        <div style={{ backgroundColor: '#ffffff', borderRadius: '28px', padding: '40px 24px', textAlign: 'center', border: '1px solid #f1f5f9', boxShadow: '0 15px 35px rgba(0,0,0,0.03)' }}>
          <h2 className="temp-section-title">Un mot du cœur 💌</h2>
          <p className="temp-body-text" style={{ fontStyle: 'italic', maxWidth: '650px', margin: '0 auto 30px auto' }}>
            "Swafwata, chaque moment passé à tes côtés est précieux. Merci d'être la personne exceptionnelle que tu es au quotidien. Je t'aime."
          </p>

          <div className="temp-photo-card" style={{ maxWidth: '480px', margin: '0 auto' }}>
            <div className="temp-photo-frame">
              <img src={photos.couple} alt="Nous deux" className="temp-photo-img" />
            </div>
            <div className="temp-photo-footer">
              <span className="temp-photo-label">Nous deux ❤️</span>
              <label className="temp-upload-btn">
                Changer notre photo
                <input type="file" accept="image/*" hidden onChange={(e) => handlePhotoUpload('couple', e.target.files[0])} />
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* --- BOUGIES D'ANNIVERSAIRE --- */}
      <section className="temp-section">
        <div className="temp-cake-box">
          <h2 className="temp-section-title">Fais un vœu Swafi ! 🎂</h2>
          <p className="temp-section-sub">Souffle ta bougie d'anniversaire virtuelle :</p>

          <div style={{ margin: '40px 0', fontSize: '5rem' }}>
            {!candlesBlown ? '🕯️✨' : '💨🍰'}
          </div>

          <button className="temp-btn-pink" onClick={() => setCandlesBlown(!candlesBlown)}>
            {candlesBlown ? '🕯️ Rallumer la bougie' : '💨 Souffler la bougie !'}
          </button>

          {candlesBlown && (
            <div style={{ marginTop: '24px', padding: '20px', backgroundColor: '#ecfdf5', borderRadius: '20px', color: '#065f46' }}>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '1.2rem' }}>✨ Joyeux Anniversaire Swafwata ! ✨</h3>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>Que tous tes vœux et tes rêves les plus chers se réalisent ! ❤️</p>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
