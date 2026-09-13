import React, { useState, useEffect, useRef } from 'react'
import html2pdf from 'html2pdf.js'

export default function Temp() {
  // --- ÉTATS COMPTE À REBOURS ANIMÉ & ANECDOTES ---
  const [phase, setPhase] = useState('countdown')
  const [count, setCount] = useState(10)
  const [isPaused, setIsPaused] = useState(false)
  const [hearts, setHearts] = useState([])

  const animalFacts = [
    { text: "Les loutres de mer se tiennent la patte en dormant pour ne pas se perdre à la dérive, exactement comme je veux rester près de toi. 🦦💖", emoji: "🦦" },
    { text: "Les pingouins offrent un galet parfait à leur partenaire pour la vie. Si j'étais un pingouin, je t'offrirais le plus beau galet du monde. 🐧💎", emoji: "🐧" },
    { text: "Les hippocampes nagent en se tenant par la queue et dansent ensemble chaque matin au réveil. 🐴🌊", emoji: "🐴" },
    { text: "Les cygnes forment un cœur parfait avec leurs coux lorsqu'ils se regardent. C'est l'un des rares animaux fidèles toute leur vie. 🦢✨", emoji: "🦢" },
    { text: "Les loups hurlent à la lune pour retrouver l'élu(e) de leur cœur lorsqu'ils sont séparés. 🐺🌕", emoji: "🐺" },
    { text: "Les albatros parcourent des milliers de kilomètres mais reviennent toujours retrouver la même personne toute leur vie. 🕊️🌍", emoji: "🕊️" },
    { text: "Les éléphants s'enlacent avec leurs trompes pour se saluer et se réconforter en cas de chagrin. 🐘🤍", emoji: "🐘" },
    { text: "Les perroquets se donnent des petits noms doux avec des gazouillements uniques réservés uniquement à leur partenaire. 🦜💬", emoji: "🦜" },
    { text: "Les girafes se frottent doucement le cou pendant des heures pour se montrer leur tendresse. 🦒🌿", emoji: "🦒" },
    { text: "Et moi, je t'aime encore plus fort que tous ces animaux réunis ! Prête pour ta surprise ? ❤️", emoji: "🎁" }
  ]

  // --- ÉTATS ANIMATIONS, JEUX ET CHOIX ENREGISTRÉS ---
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
  const backgroundCanvasRef = useRef(null)
  const [isScratched, setIsScratched] = useState(false)

  // Cap ou pas cap
  const [currentDare, setCurrentDare] = useState(null)

  // Boîte à vœu secret
  const [secretWish, setSecretWish] = useState('')
  const [wishSaved, setWishSaved] = useState(false)

  // Compteur de bisous
  const [kissCount, setKissCount] = useState(0)

  // Nouvelles fonctionnalités
  const [generatedNickname, setGeneratedNickname] = useState(null)
  const [contractSigned, setContractSigned] = useState(false)

  // Ref pour la facture PDF
  const pdfRef = useRef(null)

  // Photos
  const [photos, setPhotos] = useState({
    before: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
    date: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',
    couple: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80'
  })

  // --- ANIMATION D'ARRIÈRE-PLAN : PLUIE SOBRE DE CŒURS, MANGUES ET SOURIRES ---
  useEffect(() => {
    const canvas = backgroundCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Symboles sobres : cœurs, mangues et sourires
    const items = ['🤍', '🥭', '😊', '🌸', '✨']
    const particles = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 14 + 12,
      symbol: items[Math.floor(Math.random() * items.length)],
      speedY: Math.random() * 0.7 + 0.3,
      speedX: Math.sin(Math.random() * Math.PI) * 0.3,
      opacity: Math.random() * 0.4 + 0.2,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 0.5
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        p.y += p.speedY
        p.x += Math.sin(p.y * 0.01) * 0.4
        p.rotation += p.rotSpeed

        if (p.y > height + 30) {
          p.y = -30
          p.x = Math.random() * width
        }

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = p.opacity
        ctx.font = `${p.size}px sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(p.symbol, 0, 0)
        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // --- LOGIQUE DÉCOMPTE ---
  useEffect(() => {
    if (phase === 'countdown' && !isPaused) {
      if (count > 1) {
        const timer = setTimeout(() => setCount(count - 1), 1200)
        return () => clearTimeout(timer)
      } else if (count === 1) {
        const timer = setTimeout(() => setCount(0), 1200)
        return () => clearTimeout(timer)
      } else {
        setPhase('surprise')
      }
    } else if (phase === 'surprise') {
      const timer = setTimeout(() => setPhase('main'), 1500)
      return () => clearTimeout(timer)
    }
  }, [count, phase, isPaused])

  // --- CARTE À GRATTER ---
  useEffect(() => {
    if (phase !== 'main') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    canvas.width = 340
    canvas.height = 140

    ctx.fillStyle = '#e2e8f0'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

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

  const handlePhotoUpload = (key, file) => {
    if (file) {
      setPhotos(prev => ({ ...prev, [key]: URL.createObjectURL(file) }))
    }
  }

  const triggerHearts = (e) => {
    const newHearts = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: e.clientX + (Math.random() * 40 - 20),
      y: e.clientY + (Math.random() * 40 - 20),
      symbol: ['🤍', '🥭', '✨'][Math.floor(Math.random() * 3)]
    }))
    setHearts(prev => [...prev, ...newHearts])
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.includes(h)))
    }, 1200)
  }

  const questions = [
    { id: 1, question: "Première rencontre (3 ans après le bac) ?", options: ["27 Janvier 2025", "27 Août 2025", "14 Février 2025"], correct: 1 },
    { id: 2, question: "Qui mentionne 'Sac à dos' en premier ?", options: ["Toi (Swafi)", "Moi", "En même temps !"], correct: 0 },
    { id: 3, question: "Premier film prévu ensemble ?", options: ["Superman (2025)", "Clayface", "Klara et le soleil"], correct: 0 }
  ]

  const handleQuizSelect = (qId, optionIdx) => setQuizAnswers({ ...quizAnswers, [qId]: optionIdx })
  const validateQuiz = () => {
    let score = 0
    questions.forEach(q => { if (quizAnswers[q.id] === q.correct) score++ })
    setQuizScore(score)
  }

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

  const nicknames = [
    "Mon Petit Nuage de Douceur ☁️",
    "La Reine du Sac à Dos 🎒",
    "Ma Star du Master 🎓",
    "Loutre d'Amour 🦦",
    "Princesse des Mangues 🥭"
  ]
  const generateNickname = () => setGeneratedNickname(nicknames[Math.floor(Math.random() * nicknames.length)])

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
    { id: 1, title: 'Superman (2025)', detail: 'Le grand retour épique de l’homme d’acier' },
    { id: 2, title: 'Clayface', detail: 'Le thriller horrifique événement DC' },
    { id: 3, title: 'Klara et le soleil', detail: 'Adaptation poétique & émouvante' },
    { id: 4, title: 'The Social Reckoning', detail: 'Le drame captivant d’Aaron Sorkin' },
    { id: 5, title: 'Ducobu et le fantôme', detail: 'Pour une soirée rigolade légère' },
    { id: 6, title: 'Les Misérables', detail: 'Grande fresque historique' },
    { id: 7, title: 'Karma', detail: 'Le nouveau film de Guillaume Canet' },
    { id: 8, title: 'Street Fighter', detail: 'Grosse séance d’action déjantée' },
    { id: 9, title: 'Shaun le Mouton : Halloween', detail: 'Petit moment cocooning' },
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

  const downloadPDF = () => {
    const element = pdfRef.current
    const opt = {
      margin: 10,
      filename: `Facture_Bonheur_Swafwata_${new Date().toLocaleDateString('fr-FR')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    html2pdf().set(opt).from(element).save()
  }

  const customStyles = `
    .temp-page { position: relative; background-color: #fcfbfd; color: #1d1d1f; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; min-height: 100vh; padding-bottom: 60px; overflow-x: hidden; }
    
    .temp-bg-canvas { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 0; }

    .temp-intro-wrapper { width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #fafafa 0%, #fff1f2 100%); position: relative; z-index: 1; }
    .temp-intro-content { text-align: center; max-width: 600px; padding: 20px; }
    .temp-timer-circle { width: 140px; height: 140px; border-radius: 50%; background: #ffffff; box-shadow: 0 10px 30px rgba(225, 29, 72, 0.08); border: 1.5px solid #fecdd3; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px auto; animation: tempSoftPulse 1.4s infinite ease-in-out; }
    .temp-countdown-value { font-size: 4.5rem; font-weight: 800; color: #e11d48; animation: tempNumberPop 0.4s ease-out; }
    .temp-fact-card { background-color: #ffffff; border-radius: 20px; padding: 24px; box-shadow: 0 8px 25px rgba(0,0,0,0.02); border: 1px solid #ffe4e6; animation: tempFadeUp 0.5s ease-out; }
    .temp-fact-text { font-size: 1.15rem; color: #334155; line-height: 1.6; margin: 0; }
    .temp-controls { margin-top: 20px; display: flex; gap: 10px; justify-content: center; }
    .temp-btn-subtle { background-color: #f1f5f9; color: #64748b; border: none; padding: 8px 16px; border-radius: 20px; font-size: 0.85rem; cursor: pointer; }

    .temp-section { position: relative; z-index: 1; min-height: 80vh; max-width: 1000px; margin: 0 auto; padding: 50px 20px; display: flex; flex-direction: column; justify-content: center; }
    .temp-hero-card { text-align: center; max-width: 750px; margin: 0 auto; }
    .temp-pill { display: inline-block; padding: 6px 16px; background-color: #ffe4e6; color: #e11d48; border-radius: 20px; font-size: 0.85rem; font-weight: 600; margin-bottom: 20px; }
    .temp-main-title { font-size: 3.5rem; font-weight: 800; letter-spacing: -1px; margin-bottom: 20px; cursor: pointer; }
    .temp-highlight { color: #e11d48; border-bottom: 3px solid #fecdd3; }
    .temp-body-text { font-size: 1.2rem; line-height: 1.7; color: #48484a; }

    .temp-section-header { text-align: center; margin-bottom: 40px; }
    .temp-section-title { font-size: 2.3rem; font-weight: 700; margin-bottom: 10px; }
    .temp-section-sub { font-size: 1.1rem; color: #6e6e73; max-width: 600px; margin: 0 auto; }

    .temp-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
    .temp-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }

    .temp-photo-card { background-color: #ffffff; border-radius: 20px; padding: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.02); border: 1px solid #f1f5f9; }
    .temp-photo-frame { width: 100%; height: 320px; border-radius: 14px; overflow: hidden; background-color: #f8fafc; }
    .temp-photo-img { width: 100%; height: 100%; object-fit: cover; }
    .temp-photo-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; padding: 0 4px; }
    .temp-photo-label { font-weight: 600; font-size: 1rem; color: #1e293b; }
    .temp-upload-btn { font-size: 0.8rem; color: #6366f1; font-weight: 500; cursor: pointer; }

    .temp-card-item { background-color: #ffffff; border-radius: 16px; padding: 20px; border: 1px solid #e2e8f0; cursor: pointer; transition: all 0.25s ease; position: relative; }
    .temp-card-item:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(225, 29, 72, 0.05); }
    .temp-card-title { font-size: 1.1rem; font-weight: 700; margin: 0 0 6px 0; color: #1e293b; }
    .temp-card-desc { font-size: 0.9rem; color: #64748b; margin: 0; line-height: 1.4; }
    .temp-tag-selected { display: inline-block; margin-top: 10px; padding: 4px 10px; background-color: #e11d48; color: #fff; border-radius: 10px; font-size: 0.75rem; font-weight: 600; }

    .temp-quiz-card { background-color: #ffffff; border-radius: 20px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 20px; }
    .temp-quiz-option { padding: 12px 16px; border-radius: 12px; border: 1px solid #cbd5e1; margin-top: 10px; cursor: pointer; font-weight: 500; }
    .temp-quiz-btn { background-color: #1e293b; color: #fff; border: none; padding: 14px 28px; border-radius: 25px; font-weight: 700; cursor: pointer; font-size: 1rem; display: block; margin: 20px auto 0 auto; transition: transform 0.2s; }
    .temp-quiz-btn:hover { transform: scale(1.02); }

    .temp-wheel-container { text-align: center; max-width: 450px; margin: 0 auto; }
    .temp-wheel-wrapper { position: relative; width: 280px; height: 280px; margin: 20px auto; }
    .temp-wheel { width: 100%; height: 100%; border-radius: 50%; border: 6px solid #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.06); transition: transform 3.5s cubic-bezier(0.15, 0.99, 0.18, 0.99); background: conic-gradient(#fecdd3 0deg 60deg, #e0e7ff 60deg 120deg, #fef08a 120deg 180deg, #dcfce7 180deg 240deg, #f3e8ff 240deg 300deg, #ffe4e6 300deg 360deg); }
    .temp-wheel-pointer { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); font-size: 1.8rem; z-index: 10; }

    .temp-btn-pink { background-color: #e11d48; color: #ffffff; border: none; padding: 16px 36px; border-radius: 30px; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: transform 0.2s; }
    .temp-btn-pink:hover { transform: scale(1.03); }

    .temp-pdf-container { background-color: #ffffff; border-radius: 24px; padding: 40px; border: 1.5px solid #fecdd3; max-width: 700px; margin: 40px auto; box-shadow: 0 15px 35px rgba(0,0,0,0.03); }
    .temp-pdf-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #ffe4e6; padding-bottom: 20px; margin-bottom: 20px; }
    .temp-pdf-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    .temp-pdf-table th { text-align: left; padding: 10px; background-color: #fff1f2; color: #e11d48; font-size: 0.9rem; }
    .temp-pdf-table td { padding: 12px 10px; border-bottom: 1px solid #f1f5f9; font-size: 0.95rem; color: #334155; }

    .temp-heart-anim { position: fixed; font-size: 1.4rem; pointer-events: none; animation: tempFloatUp 1.2s forwards; z-index: 9999; }

    @keyframes tempSoftPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
    @keyframes tempNumberPop { 0% { transform: scale(0.85); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
    @keyframes tempFadeUp { 0% { transform: translateY(10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
    @keyframes tempFloatUp { 0% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(-70px) scale(1.2); opacity: 0; } }
  `

  if (phase !== 'main') {
    const currentFactIndex = 10 - count
    const currentFact = animalFacts[Math.min(Math.max(0, currentFactIndex), animalFacts.length - 1)]

    return (
      <div className="temp-intro-wrapper">
        <style>{customStyles}</style>
        {phase === 'countdown' ? (
          <div className="temp-intro-content">
            <div className="temp-timer-circle">
              <span key={count} className="temp-countdown-value">{count}</span>
            </div>
            <div key={currentFactIndex} className="temp-fact-card">
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>{currentFact.emoji}</span>
              <p className="temp-fact-text">{currentFact.text}</p>
            </div>
            <div className="temp-controls">
              <button className="temp-btn-subtle" onClick={() => setIsPaused(!isPaused)}>
                {isPaused ? '▶️ Reprendre' : '⏸️ Pause'}
              </button>
              <button className="temp-btn-subtle" onClick={() => setCount(10)}>
                🔄 Réinitialiser
              </button>
            </div>
          </div>
        ) : (
          <div className="temp-intro-content">
            <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#e11d48', margin: '0 0 10px 0' }}>Joyeux Anniversaire Swafi ! ❤️</h1>
            <p className="temp-body-text">Ouverture de ton espace personnalisé...</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="temp-page">
      <style>{customStyles}</style>

      {/* Canvas arrière-plan dynamique */}
      <canvas ref={backgroundCanvasRef} className="temp-bg-canvas" />

      {/* Particules cliquables */}
      {hearts.map(h => (
        <span key={h.id} className="temp-heart-anim" style={{ left: h.x, top: h.y }}>{h.symbol}</span>
      ))}

      {/* --- HERO / ACCUEIL --- */}
      <section className="temp-section">
        <div className="temp-hero-card">
          <span className="temp-pill">Accès réservé • Code 270825 Validé</span>
          <h1 className="temp-main-title" onClick={triggerHearts}>
            Félicitations, <span className="temp-highlight">Swafwata</span>
          </h1>
          <p className="temp-body-text">
            Tu as déverrouillé ton espace secret. Fais tes choix sur la page, tes décisions généreront ta Facture Officielle du Bonheur à la fin !
          </p>
        </div>
      </section>

      {/* --- AVANT / APRÈS --- */}
      <section className="temp-section">
        <div className="temp-section-header">
          <h2 className="temp-section-title">Le temps passe, les mémoires restent</h2>
        </div>
        <div className="temp-grid-2">
          <div className="temp-photo-card">
            <div className="temp-photo-frame"><img src={photos.before} alt="Avant" className="temp-photo-img" /></div>
            <div className="temp-photo-footer">
              <span className="temp-photo-label">Avant</span>
              <label className="temp-upload-btn">Changer la photo<input type="file" accept="image/*" hidden onChange={(e) => handlePhotoUpload('before', e.target.files[0])} /></label>
            </div>
          </div>
          <div className="temp-photo-card">
            <div className="temp-photo-frame"><img src={photos.after} alt="Aujourd'hui" className="temp-photo-img" /></div>
            <div className="temp-photo-footer">
              <span className="temp-photo-label">Aujourd’hui</span>
              <label className="temp-upload-btn">Changer la photo<input type="file" accept="image/*" hidden onChange={(e) => handlePhotoUpload('after', e.target.files[0])} /></label>
            </div>
          </div>
        </div>
      </section>

      {/* --- REPAS --- */}
      <section className="temp-section">
        <div className="temp-section-header">
          <h2 className="temp-section-title">Ce qu’on mangera à nos retrouvailles 🍽️</h2>
          <p className="temp-section-sub">Sélectionne 3 repas parmi les 9 propositions ({selectedMeals.length}/3) :</p>
        </div>
        <div className="temp-grid-3">
          {mealsList.map((meal) => {
            const isSelected = selectedMeals.includes(meal.id)
            return (
              <div key={meal.id} className="temp-card-item" onClick={() => toggleMeal(meal.id)} style={{ borderColor: isSelected ? '#e11d48' : '#e2e8f0', backgroundColor: isSelected ? '#fff1f2' : '#ffffff' }}>
                <h3 className="temp-card-title">{meal.name}</h3>
                <p className="temp-card-desc">{meal.desc}</p>
                {isSelected && <span className="temp-tag-selected">Sélectionné</span>}
              </div>
            )
          })}
        </div>
      </section>

      {/* --- CINÉMA --- */}
      <section className="temp-section">
        <div className="temp-section-header">
          <h2 className="temp-section-title">Nos prochaines séances Cinéma 🍿</h2>
          <p className="temp-section-sub">Sélectionne tes films coup de cœur :</p>
        </div>
        <div className="temp-grid-3">
          {moviesList.map((movie) => {
            const isSelected = selectedMovies.includes(movie.id)
            return (
              <div key={movie.id} className="temp-card-item" onClick={() => toggleMovie(movie.id)} style={{ borderColor: isSelected ? '#6366f1' : '#e2e8f0', backgroundColor: isSelected ? '#f5f3ff' : '#ffffff' }}>
                <h3 className="temp-card-title">{movie.title}</h3>
                <p className="temp-card-desc">{movie.detail}</p>
                {isSelected && <span className="temp-tag-selected" style={{ backgroundColor: '#6366f1' }}>Au programme</span>}
              </div>
            )
          })}
        </div>
      </section>

      {/* --- MINI-JEUX --- */}
      <section className="temp-section">
        <div className="temp-section-header">
          <h2 className="temp-section-title">Jeux & Petites Intentions ✨</h2>
        </div>

        <div className="temp-grid-2">
          {/* Surnom secret */}
          <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Générateur de Surnom ✨</h3>
            <button className="temp-quiz-btn" onClick={generateNickname}>Découvrir mon surnom</button>
            {generatedNickname && <p style={{ marginTop: '16px', fontSize: '1.15rem', color: '#e11d48', fontWeight: '700' }}>{generatedNickname}</p>}
          </div>

          {/* Bisous */}
          <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Envoyer des Bisous 💋</h3>
            <button onClick={(e) => { setKissCount(kissCount + 1); triggerHearts(e); }} style={{ fontSize: '2.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>💋</button>
            <p style={{ marginTop: '8px', fontWeight: '700', color: '#e11d48' }}>{kissCount} bisous comptabilisés !</p>
          </div>

          {/* Roue */}
          <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Roue des Attentions 🎡</h3>
            <button className="temp-quiz-btn" onClick={spinWheel} disabled={isSpinning}>{isSpinning ? '...' : 'Tourner'}</button>
            {wheelResult && <p style={{ marginTop: '16px', color: '#9f1239', fontWeight: '700' }}>{wheelResult}</p>}
          </div>

          {/* Vœu */}
          <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Boîte à Vœu Secret 💌</h3>
            {!wishSaved ? (
              <>
                <input type="text" value={secretWish} onChange={(e) => setSecretWish(e.target.value)} placeholder="Ton vœu..." style={{ width: '80%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                <button className="temp-quiz-btn" onClick={() => secretWish.trim() && setWishSaved(true)} style={{ marginTop: '10px' }}>Sceller</button>
              </>
            ) : <p style={{ color: '#16a34a', fontWeight: '600', marginTop: '16px' }}>🔒 Vœu enregistré !</p>}
          </div>
        </div>
      </section>

      {/* --- CONTRAT D'AMOUR --- */}
      <section className="temp-section">
        <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '24px', border: '1.5px solid #fecdd3', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ color: '#e11d48', marginTop: 0 }}>📜 Contrat Officiel d'Anniversaire</h2>
          <p style={{ color: '#475569', lineHeight: '1.6' }}>
            En cochant cette case, je soussignée Swafwata, accepte de passer des moments inoubliables et de profiter pleinement de toutes ces surprises.
          </p>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '1.05rem', color: '#1e293b', marginTop: '10px' }}>
            <input type="checkbox" checked={contractSigned} onChange={(e) => setContractSigned(e.target.checked)} style={{ width: '18px', height: '18px' }} />
            Je valide et signe le contrat ✍️
          </label>
        </div>
      </section>

      {/* --- FACTURE GENEREE --- */}
      <section className="temp-section">
        <div className="temp-section-header">
          <span className="temp-pill">Récapitulatif</span>
          <h2 className="temp-section-title">Ta Facture Officielle du Bonheur 🧾</h2>
          <p className="temp-section-sub">Voici le résumé de tous tes choix enregistrés aujourd'hui.</p>
        </div>

        <div ref={pdfRef} className="temp-pdf-container">
          <div className="temp-pdf-header">
            <div>
              <h2 style={{ margin: 0, color: '#e11d48', fontSize: '1.4rem' }}>FACTURE DU BONHEUR #270825</h2>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Émise pour : Swafwata • Client Privilégié</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Date : {new Date().toLocaleDateString('fr-FR')}</span>
            </div>
          </div>

          <table className="temp-pdf-table">
            <thead>
              <tr>
                <th>Article / Choix</th>
                <th>Détails de la sélection</th>
                <th style={{ textAlign: 'right' }}>Prix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Repas sélectionnés</strong></td>
                <td>{selectedMeals.length > 0 ? selectedMeals.map(mId => mealsList.find(m => m.id === mId)?.name).join(', ') : 'Aucun repas choisi'}</td>
                <td style={{ textAlign: 'right', color: '#e11d48', fontWeight: '600' }}>Offert ❤️</td>
              </tr>
              <tr>
                <td><strong>Films au programme</strong></td>
                <td>{selectedMovies.length > 0 ? selectedMovies.map(mId => moviesList.find(m => m.id === mId)?.title).join(', ') : 'Aucun film choisi'}</td>
                <td style={{ textAlign: 'right', color: '#e11d48', fontWeight: '600' }}>Offert ❤️</td>
              </tr>
              <tr>
                <td><strong>Total Bisous envoyés</strong></td>
                <td>{kissCount} bisous virtuels enregistrés</td>
                <td style={{ textAlign: 'right', color: '#e11d48', fontWeight: '600' }}>Inestimable</td>
              </tr>
              <tr>
                <td><strong>Attention de la Roue</strong></td>
                <td>{wheelResult || 'Pas encore tourné'}</td>
                <td style={{ textAlign: 'right', color: '#e11d48', fontWeight: '600' }}>Garanti</td>
              </tr>
              <tr>
                <td><strong>Surnom officiel</strong></td>
                <td>{generatedNickname || 'Pas encore généré'}</td>
                <td style={{ textAlign: 'right', color: '#e11d48', fontWeight: '600' }}>Pour la vie</td>
              </tr>
              <tr>
                <td><strong>Statut du contrat</strong></td>
                <td>{contractSigned ? '✅ Signé avec amour' : '⏳ En attente de signature'}</td>
                <td style={{ textAlign: 'right', color: '#e11d48', fontWeight: '600' }}>Validé</td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: '30px', borderTop: '2px dashed #ffe4e6', paddingTop: '20px', textAlign: 'right' }}>
            <span style={{ fontSize: '0.95rem', color: '#64748b' }}>TOTAL À PAYER : </span>
            <strong style={{ fontSize: '1.3rem', color: '#e11d48', marginLeft: '10px' }}>0,00 € + Tout mon Amour</strong>
          </div>
        </div>

        <button className="temp-btn-pink" onClick={downloadPDF} style={{ display: 'block', margin: '20px auto 0 auto' }}>
          Télécharger la Facture en PDF 📄
        </button>
      </section>
    </div>
  )
}
