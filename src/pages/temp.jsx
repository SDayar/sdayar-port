import React, { useState, useEffect, useRef } from 'react'
import html2pdf from 'html2pdf.js'

export default function App() {
  // --- ÉTATS COMPTE À REBOURS ANIMÉ & ANECDOTES ---
  const [phase, setPhase] = useState('countdown')
  const [count, setCount] = useState(10)
  const [isPaused, setIsPaused] = useState(false)
  const [hearts, setHearts] = useState([])

  const animalFacts = [
    { text: "Les loutres de mer se tiennent la patte en dormant pour ne pas se perdre à la dérive, exactement comme je veux rester près de toi.", emoji: "🦦" },
    { text: "Les pingouins offrent un galet parfait à leur partenaire pour la vie. Si j'étais un pingouin, je t'offrirais le plus beau galet du monde.", emoji: "🐧" },
    { text: "Les hippocampes nagent en se tenant par la queue et dansent ensemble chaque matin au réveil.", emoji: "🐴" },
    { text: "Les cygnes forment un cœur parfait avec leurs coux lorsqu'ils se regardent. C'est l'un des rares animaux fidèles toute leur vie.", emoji: "🦢" },
    { text: "Les loups hurlent à la lune pour retrouver l'élu(e) de leur cœur lorsqu'ils sont séparés.", emoji: "🐺" },
    { text: "Les albatros parcourent des kilomètres mais reviennent toujours retrouver la même personne toute leur vie.", emoji: "🕊️" },
    { text: "Les éléphants s'enlacent avec leurs trompes pour se saluer et se réconforter en cas de chagrin.", emoji: "🐘" },
    { text: "Les perroquets se donnent des petits noms doux avec des gazouillements uniques réservés uniquement à leur partenaire.", emoji: "🦜" },
    { text: "Les girafes se frottent doucement le cou pendant des heures pour se montrer leur tendresse.", emoji: "🦒" },
    { text: "Et moi, je t'aime encore plus fort que tous ces animaux réunis ! Prête pour ta surprise ?", emoji: "🎁" }
  ]

  // --- ÉTATS ANIMATIONS, JEUX ET CHOIX ENREGISTRÉS ---
  const [selectedMeals, setSelectedMeals] = useState([])
  const [selectedMovies, setSelectedMovies] = useState([])

  // Quiz
  const [quizScore, setQuizScore] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizFinished, setQuizFinished] = useState(false)

  // Cap ou pas Cap
  const [capIndex, setCapIndex] = useState(0)
  const [capDone, setCapDone] = useState(false)

  // Carte à gratter
  const [isScratched, setIsScratched] = useState(false)

  // Roue des attentions
  const [isSpinning, setIsSpinning] = useState(false)
  const [wheelRotation, setWheelRotation] = useState(0)
  const [wheelResult, setWheelResult] = useState(null)

  // Boîte à vœu secret
  const [secretWish, setSecretWish] = useState('')
  const [wishSaved, setWishSaved] = useState(false)

  // Compteur de bisous
  const [kissCount, setKissCount] = useState(0)

  // Surnom & Contrat
  const [generatedNickname, setGeneratedNickname] = useState(null)
  const [contractSigned, setContractSigned] = useState(false)

  // Sac à dos secret (Easter Egg)
  const [backpackOpen, setBackpackOpen] = useState(false)

  // Jeux pour la Facture
  const [tipPercentage, setTipPercentage] = useState(100)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [invoiceStamped, setInvoiceStamped] = useState(false)

  // Ref pour la facture PDF et les canvas
  const pdfRef = useRef(null)
  const backgroundCanvasRef = useRef(null)
  const mangoCanvasRef = useRef(null)
  const pigeonCanvasRef = useRef(null)

  // Photos
  const [photos, setPhotos] = useState({
    before: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80'
  })

  // --- 1. ARRIÈRE-PLAN DYNAMIQUE GÉNÉRAL ---
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

    const items = ['🤍', '🌸', '✨', '🎓', '⭐']
    const particles = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 12 + 10,
      symbol: items[Math.floor(Math.random() * items.length)],
      speedY: Math.random() * 0.6 + 0.3,
      opacity: Math.random() * 0.35 + 0.15,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 0.4
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      particles.forEach((p) => {
        p.y += p.speedY
        p.x += Math.sin(p.y * 0.01) * 0.3
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

  // --- 2. ANIMATION PARTIE 2 : PLUIE DE MANGUES 🥭 ---
  useEffect(() => {
    if (phase !== 'main') return
    const canvas = mangoCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = canvas.parentElement.clientWidth)
    let height = (canvas.height = canvas.parentElement.clientHeight)

    const mangos = Array.from({ length: 15 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 20 + 20,
      speedY: Math.random() * 1.5 + 1,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 2
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      mangos.forEach((m) => {
        m.y += m.speedY
        m.rotation += m.rotSpeed
        if (m.y > height + 40) {
          m.y = -40
          m.x = Math.random() * width
        }
        ctx.save()
        ctx.translate(m.x, m.y)
        ctx.rotate((m.rotation * Math.PI) / 180)
        ctx.font = `${m.size}px sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('🥭', 0, 0)
        ctx.restore()
      })
      animationFrameId = requestAnimationFrame(render)
    }
    render()
    return () => cancelAnimationFrame(animationFrameId)
  }, [phase])

  // --- 3. ANIMATION PARTIE 4 : VOL DE PIGEONS 🕊️ ---
  useEffect(() => {
    if (phase !== 'main') return
    const canvas = pigeonCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = canvas.parentElement.clientWidth)
    let height = (canvas.height = canvas.parentElement.clientHeight)

    const pigeons = Array.from({ length: 8 }, () => ({
      x: Math.random() * width - width,
      y: Math.random() * (height - 50),
      size: Math.random() * 18 + 22,
      speedX: Math.random() * 2 + 1.5,
      speedY: (Math.random() - 0.5) * 0.8,
      wing: 0
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      pigeons.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        p.wing += 0.15
        if (p.x > width + 50) {
          p.x = -50
          p.y = Math.random() * (height - 50)
        }
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.font = `${p.size}px sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(Math.sin(p.wing) > 0 ? '🕊️' : '🐦', 0, 0)
        ctx.restore()
      })
      animationFrameId = requestAnimationFrame(render)
    }
    render()
    return () => cancelAnimationFrame(animationFrameId)
  }, [phase])

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

  const handlePhotoUpload = (key, file) => {
    if (file) {
      setPhotos(prev => ({ ...prev, [key]: URL.createObjectURL(file) }))
    }
  }

  const triggerHearts = (e) => {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || window.innerWidth / 2
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || window.innerHeight / 2

    const newHearts = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x: clientX + (Math.random() * 40 - 20),
      y: clientY + (Math.random() * 40 - 20),
      symbol: ['🤍', '🥭', '✨', '🎓', '🎉'][Math.floor(Math.random() * 5)]
    }))
    setHearts(prev => [...prev, ...newHearts])
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.includes(h)))
    }, 1200)
  }

  // --- DONNÉES DU QUIZ ---
  const quizQuestions = [
    { q: "Quelle est notre destination de rêve ?", options: ["Les Comores 🇰🇲", "Le Japon 🗾", "Les Maldives 🏝️"], correct: 0 },
    { q: "Quel est ton fruit préféré ?", options: ["La Mangue 🥭", "La Fraise 🍓", "La Ananas 🍍"], correct: 0 },
    { q: "Quelle est ta plus grande réussite cette année ?", options: ["Avoir ton Master 1 🎓", "M'avoir supporté 😂", "Les deux ! 🏆"], correct: 2 }
  ]

  const handleQuizAnswer = (qIdx, oIdx) => {
    const newAnswers = { ...quizAnswers, [qIdx]: oIdx }
    setQuizAnswers(newAnswers)
    if (Object.keys(newAnswers).length === quizQuestions.length) {
      let score = 0
      Object.keys(newAnswers).forEach(key => {
        if (newAnswers[key] === quizQuestions[key].correct) score++
      })
      setQuizScore(score)
      setQuizFinished(true)
    }
  }

  // --- CAP OU PAS CAP ---
  const capList = [
    "M'envoyer ton plus beau selfie grimace immédiatement !",
    "Me faire un câlin de 10 secondes sans lâcher !",
    "Cuisiner un plat ensemble ce week-end !",
    "Mimer une mangue joyeuse pendant 5 secondes !"
  ]

  const wheelAttentions = [
    "Un dessert trompe l'œil.",
    "Une balade le soir en hiver.",
    "Une mangue avec des épices.",
    "Une journée cinéma avec ton choix de film.",
    "Une promenade romantique à deux.",
    "Un câlin géant réconfortant."
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
    "Coco ☁️",
    "Sac à Dos 🎒",
    "Lève tôt 🎓",
    "Couche tôt (sauf aujourd'hui apparemment) 🦦",
    "Princesse des mangues 🥭",
    "Diplômée d'Amour 🏅"
  ]
  const generateNickname = () => setGeneratedNickname(nicknames[Math.floor(Math.random() * nicknames.length)])

  const mealsList = [
    { id: 1, name: 'Sushis', desc: 'Frais, légers et gourmands' },
    { id: 2, name: 'Pizza', desc: 'Croûte alvéolée & burrata' },
    { id: 3, name: 'Tacos street-food', desc: 'Épicés juste comme tu aimes' },
    { id: 4, name: 'Burgers', desc: 'Pain brioché & frites maison' },
    { id: 5, name: 'Brunch sucré-salé', desc: 'Pancakes, avocado toast et jus' },
    { id: 6, name: 'Ramen traditionnel', desc: 'Bouillon mijoté et réconfortant' },
    { id: 7, name: 'Grillades (en privée)', desc: 'Saveurs fumées et conviviales' },
    { id: 8, name: 'Resto comorien', desc: 'Retour aux Comores' },
    { id: 9, name: 'Resto indien', desc: 'Épicé & savoureux' },
  ]

  const moviesList = [
    { id: 1, title: 'Kal el', detail: 'Le grand retour épique' },
    { id: 2, title: 'Clayface', detail: 'Le thriller horrifique DC' },
    { id: 3, title: 'Klara et le soleil', detail: 'Adaptation poétique' },
    { id: 4, title: 'The Social Reckoning', detail: 'Le drame captivant' },
    { id: 5, title: 'Ducobu et le fantôme', detail: 'Pour une soirée légère' },
    { id: 6, title: 'Les Misérables', detail: 'Grande fresque historique' },
    { id: 7, title: 'Karma', detail: 'Nouveau film de Guillaume Canet' },
    { id: 8, title: 'Street Fighter', detail: 'Action déjantée' },
    { id: 9, title: 'Shaun le Mouton', detail: 'Petit moment cocooning' },
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

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SWAFI2026' || promoCode.trim().toUpperCase() === 'AMOUR') {
      setPromoApplied(true)
    } else {
      alert("Code invalide ! Essaie 'SWAFI2026' ou 'AMOUR' 😉")
    }
  }

  // --- GENERATION DU PDF OPTIMISEE ---
  const downloadPDF = () => {
    const element = pdfRef.current
    if (!element) return

    const originalWidth = element.style.width
    element.style.width = '700px'

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `Facture_Bonheur_Swafwata_${new Date().toLocaleDateString('fr-FR')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }

    html2pdf().set(opt).from(element).save().then(() => {
      element.style.width = originalWidth
    }).catch(() => {
      element.style.width = originalWidth
    })
  }

  const customStyles = `
    .temp-page { position: relative; background-color: #fcfbfd; color: #1d1d1f; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; min-height: 100vh; padding-bottom: 60px; overflow-x: hidden; }
    
    .temp-bg-canvas { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none !important; z-index: 0; }
    .section-canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none !important; z-index: 0; }

    .temp-intro-wrapper { width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #fafafa 0%, #fff1f2 100%); position: relative; z-index: 1; padding: 16px; box-sizing: border-box; }
    .temp-intro-content { text-align: center; max-width: 600px; width: 100%; }
    .temp-timer-circle { width: 120px; height: 120px; border-radius: 50%; background: #ffffff; box-shadow: 0 10px 30px rgba(225, 29, 72, 0.08); border: 1.5px solid #fecdd3; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto; }
    .temp-countdown-value { font-size: 3.8rem; font-weight: 800; color: #e11d48; }
    .temp-fact-card { background-color: #ffffff; border-radius: 20px; padding: 20px; box-shadow: 0 8px 25px rgba(0,0,0,0.02); border: 1px solid #ffe4e6; }
    .temp-fact-text { font-size: 1rem; color: #334155; line-height: 1.5; margin: 0; }
    .temp-controls { margin-top: 20px; display: flex; gap: 10px; justify-content: center; }
    .temp-btn-subtle { background-color: #f1f5f9; color: #64748b; border: none; padding: 8px 16px; border-radius: 20px; font-size: 0.85rem; cursor: pointer; }

    .temp-section { position: relative; z-index: 1; max-width: 1000px; margin: 0 auto; padding: 40px 16px; box-sizing: border-box; }
    .temp-hero-card { text-align: center; max-width: 750px; margin: 0 auto; }
    .temp-pill { display: inline-block; padding: 6px 14px; background-color: #ffe4e6; color: #e11d48; border-radius: 20px; font-size: 0.8rem; font-weight: 600; margin-bottom: 16px; }
    .temp-main-title { font-size: 2.4rem; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 16px; cursor: pointer; line-height: 1.2; }
    .temp-highlight { color: #e11d48; border-bottom: 3px solid #fecdd3; }
    .temp-body-text { font-size: 1.05rem; line-height: 1.6; color: #48484a; margin: 0; }

    .temp-section-header { text-align: center; margin-bottom: 30px; position: relative; z-index: 1; }
    .temp-section-title { font-size: 1.8rem; font-weight: 700; margin-bottom: 8px; line-height: 1.3; }
    .temp-section-sub { font-size: 0.95rem; color: #6e6e73; max-width: 600px; margin: 0 auto; }

    .temp-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; position: relative; z-index: 1; }
    .temp-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; position: relative; z-index: 1; }

    .temp-photo-card { background-color: #ffffff; border-radius: 18px; padding: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.02); border: 1px solid #f1f5f9; }
    .temp-photo-frame { width: 100%; height: 260px; border-radius: 12px; overflow: hidden; background-color: #f8fafc; }
    .temp-photo-img { width: 100%; height: 100%; object-fit: cover; }
    .temp-photo-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; padding: 0 4px; }
    .temp-photo-label { font-weight: 600; font-size: 0.95rem; color: #1e293b; }
    .temp-upload-btn { font-size: 0.8rem; color: #6366f1; font-weight: 500; cursor: pointer; }

    .temp-card-item { background-color: #ffffff; border-radius: 16px; padding: 16px; border: 1px solid #e2e8f0; cursor: pointer; transition: all 0.2s ease; position: relative; z-index: 1; }
    .temp-card-title { font-size: 1rem; font-weight: 700; margin: 0 0 4px 0; color: #1e293b; }
    .temp-card-desc { font-size: 0.85rem; color: #64748b; margin: 0; line-height: 1.3; }
    .temp-tag-selected { display: inline-block; margin-top: 8px; padding: 3px 8px; background-color: #e11d48; color: #fff; border-radius: 8px; font-size: 0.7rem; font-weight: 600; }

    .temp-quiz-btn { background-color: #1e293b; color: #fff; border: none; padding: 12px 24px; border-radius: 20px; font-weight: 700; cursor: pointer; font-size: 0.95rem; display: block; margin: 16px auto 0 auto; width: 100%; max-width: 220px; }

    .temp-btn-pink { background-color: #e11d48; color: #ffffff; border: none; padding: 14px 28px; border-radius: 25px; font-size: 1rem; font-weight: 700; cursor: pointer; width: 100%; max-width: 320px; display: block; margin: 20px auto 0 auto; text-align: center; box-shadow: 0 8px 20px rgba(225, 29, 72, 0.2); }

    .temp-pdf-wrapper { width: 100%; overflow-x: auto; padding-bottom: 10px; }
    .temp-pdf-container { background-color: #ffffff; border-radius: 20px; padding: 24px; border: 1.5px solid #fecdd3; min-width: 280px; max-width: 700px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.02); box-sizing: border-box; position: relative; }
    .temp-pdf-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px dashed #ffe4e6; padding-bottom: 16px; margin-bottom: 16px; gap: 10px; }
    .temp-pdf-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    .temp-pdf-table th { text-align: left; padding: 8px; background-color: #fff1f2; color: #e11d48; font-size: 0.8rem; }
    .temp-pdf-table td { padding: 10px 8px; border-bottom: 1px solid #f1f5f9; font-size: 0.85rem; color: #334155; }

    .temp-heart-anim { position: fixed; font-size: 1.3rem; pointer-events: none; animation: tempFloatUp 1.2s forwards; z-index: 9999; }

    .invoice-stamp { position: absolute; bottom: 40px; right: 40px; border: 3px solid #16a34a; color: #16a34a; font-weight: 900; padding: 8px 16px; border-radius: 8px; transform: rotate(-12deg); font-size: 1.1rem; text-transform: uppercase; letter-spacing: 2px; animation: stampAnim 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }

    @keyframes stampAnim { 0% { transform: scale(3) rotate(0deg); opacity: 0; } 100% { transform: scale(1) rotate(-12deg); opacity: 1; } }
    @keyframes tempFloatUp { 0% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(-70px) scale(1.2); opacity: 0; } }

    @media (min-width: 768px) {
      .temp-main-title { font-size: 3.5rem; }
      .temp-section-title { font-size: 2.3rem; }
      .temp-body-text { font-size: 1.2rem; }
      .temp-section { padding: 60px 20px; }
      .temp-photo-frame { height: 320px; }
      .temp-pdf-container { padding: 40px; }
      .temp-pdf-table th { font-size: 0.9rem; }
      .temp-pdf-table td { font-size: 0.95rem; }
    }
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
              <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '6px' }}>{currentFact.emoji}</span>
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
            <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#e11d48', margin: '0 0 10px 0' }}>Joyeux Anniversaire Swafi ! ❤️</h1>
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

      {/* --- PARTIE 1 : HERO & CÉLÉBRATION MASTER 1 --- */}
      <section className="temp-section">
        <div className="temp-hero-card">
          <span className="temp-pill">Accès réservé • Code 270825 Validé</span>
          <h1 className="temp-main-title" onClick={triggerHearts}>
            Félicitations, <span className="temp-highlight">Swafwata</span> 🎓
          </h1>
          <p className="temp-body-text" style={{ marginBottom: '20px' }}>
            Bravo pour la validation de ton <strong>Master 1</strong> ! Une étape majeure franchie avec succès, qui prouve toute ta détermination.
          </p>
          <p className="temp-body-text">
            Tu as déverrouillé ton espace secret. Fais tes choix sur la page, tes décisions généreront ta "Facture officielle du bonheur" à la fin !
          </p>
        </div>
      </section>

      {/* --- SECTION NOTRE PREMIÈRE RENCONTRE --- */}
      <section className="temp-section">
        <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '24px', border: '1px solid #ffe4e6', boxShadow: '0 10px 30px rgba(225, 29, 72, 0.04)', position: 'relative', z-index: 1 }}>
          <div className="temp-section-header" style={{ marginBottom: '20px' }}>
            <span className="temp-pill" style={{ backgroundColor: '#fff1f2' }}>Souvenir gravé 💫</span>
            <h2 className="temp-section-title" style={{ color: '#e11d48' }}>Notre toute première rencontre 👩‍❤️‍👨</h2>
          </div>
          <p className="temp-body-text" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto', color: '#334155' }}>
            Se souvenir du tout premier regard, du premier sourire et de ce moment précis où tout a commencé. Un instant simple en apparence, mais qui restera pour toujours le début de notre belle histoire.
          </p>
        </div>
      </section>

      {/* --- AVANT / APRÈS --- */}
      <section className="temp-section">
        <div className="temp-section-header">
          <h2 className="temp-section-title">Le temps passe, les mémoires restent 📸</h2>
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

      {/* --- PARTIE 2 : REPAS (AVEC PLUIE DE MANGUES 🥭) --- */}
      <section className="temp-section" style={{ position: 'relative', overflow: 'hidden' }}>
        <canvas ref={mangoCanvasRef} className="section-canvas" />
        <div className="temp-section-header">
          <h2 className="temp-section-title">Ce qu’on mangera à nos retrouvailles 🍽️</h2>
          <p className="temp-section-sub">Sélectionne 3 repas parmi les propositions ({selectedMeals.length}/3) :</p>
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

      {/* --- PARTIE 3 : QUIZ & JEUX COMPLÉMENTAIRES --- */}
      <section className="temp-section">
        <div className="temp-section-header">
          <h2 className="temp-section-title">Le Quiz & Challenge 🧠</h2>
          <p className="temp-section-sub">Testons tes connaissances et ton audace !</p>
        </div>

        <div className="temp-grid-2">
          {/* Quiz */}
          <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ marginTop: 0, color: '#e11d48' }}>Quiz spécial Swafi 🎯</h3>
            {!quizFinished ? (
              quizQuestions.map((q, qIdx) => (
                <div key={qIdx} style={{ marginBottom: '16px', textAlign: 'left' }}>
                  <p style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '8px' }}>{q.q}</p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {q.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleQuizAnswer(qIdx, oIdx)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: quizAnswers[qIdx] === oIdx ? '#e11d48' : '#f8fafc',
                          color: quizAnswers[qIdx] === oIdx ? '#ffffff' : '#334155',
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <p style={{ fontSize: '1.2rem', fontWeight: '800', color: '#16a34a' }}>Score : {quizScore} / {quizQuestions.length} 🎉</p>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Tu me connais sur le bout des doigts !</p>
              </div>
            )}
          </div>

          {/* Cap ou Pas Cap */}
          <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <h3 style={{ marginTop: 0, color: '#e11d48' }}>Cap ou Pas Cap ? ⚡</h3>
            <p style={{ fontStyle: 'italic', fontSize: '0.95rem', minHeight: '48px', display: 'flex', alignItems: 'center', justify: 'center' }}>
              "{capList[capIndex]}"
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px' }}>
              <button
                onClick={() => { setCapDone(true); triggerHearts({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }); }}
                style={{ padding: '8px 16px', borderRadius: '12px', backgroundColor: '#16a34a', color: '#fff', border: 'none', fontWeight: '700', cursor: 'pointer' }}
              >
                Cap ! ✅
              </button>
              <button
                onClick={() => setCapIndex((capIndex + 1) % capList.length)}
                style={{ padding: '8px 16px', borderRadius: '12px', backgroundColor: '#f1f5f9', color: '#64748b', border: 'none', cursor: 'pointer' }}
              >
                Suivant 🔄
              </button>
            </div>
            {capDone && <p style={{ color: '#16a34a', fontSize: '0.8rem', marginTop: '8px', fontWeight: '600' }}>Relevé avec succès ! 🔥</p>}
          </div>

          {/* Carte à gratter */}
          <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <h3 style={{ marginTop: 0, color: '#e11d48' }}>Carte à gratter magique 🎟️</h3>
            {!isScratched ? (
              <div
                onClick={() => setIsScratched(true)}
                style={{ backgroundColor: '#cbd5e1', padding: '30px', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', color: '#475569' }}
              >
                👆 Clique pour gratter et découvrir le lot
              </div>
            ) : (
              <div style={{ backgroundColor: '#fff1f2', padding: '20px', borderRadius: '12px', border: '1px dashed #e11d48', color: '#e11d48', fontWeight: '800' }}>
                🎁 GAGNÉ : Un massage des épaules illimité sur demande !
              </div>
            )}
          </div>

          {/* Sac à dos secret (Easter Egg) */}
          <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <h3 style={{ marginTop: 0, color: '#e11d48' }}>Le Sac à dos secret 🎒</h3>
            <button className="temp-quiz-btn" onClick={() => setBackpackOpen(!backpackOpen)}>
              {backpackOpen ? 'Fermer le sac' : 'Fouiller le sac 🔍'}
            </button>
            {backpackOpen && (
              <div style={{ marginTop: '12px', fontSize: '0.85rem', color: '#334155', textAlign: 'left', backgroundColor: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                <p style={{ margin: '4px 0' }}>🎒 <strong>Contenu du sac :</strong></p>
                <ul style={{ paddingLeft: '20px', margin: '4px 0' }}>
                  <li>Une boîte de chocolats ultra secrets</li>
                  <li>Le diplôme de la meilleure personne 🏆</li>
                  <li>Une mangue de secours 🥭</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- PARTIE 4 : CINÉMA & SORTIES (AVEC VOL DE PIGEONS 🕊️) --- */}
      <section className="temp-section" style={{ position: 'relative', overflow: 'hidden' }}>
        <canvas ref={pigeonCanvasRef} className="section-canvas" />
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

      {/* --- PARTIE 5 : AUTRES MINI-JEUX --- */}
      <section className="temp-section">
        <div className="temp-section-header">
          <h2 className="temp-section-title">Petites Intentions & Douceurs ✨</h2>
        </div>

        <div className="temp-grid-2">
          {/* Surnom secret */}
          <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>Générateur de Surnom ✨</h3>
            <button className="temp-quiz-btn" onClick={generateNickname}>Découvrir mon surnom</button>
            {generatedNickname && <p style={{ marginTop: '12px', fontSize: '1rem', color: '#e11d48', fontWeight: '700' }}>{generatedNickname}</p>}
          </div>

          {/* Bisous */}
          <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>Envoyer des bisous 💋</h3>
            <button onClick={(e) => { setKissCount(kissCount + 1); triggerHearts(e); }} style={{ fontSize: '2.2rem', background: 'none', border: 'none', cursor: 'pointer' }}>💋</button>
            <p style={{ marginTop: '6px', fontWeight: '700', color: '#e11d48' }}>{kissCount} bisous comptabilisés !</p>
          </div>

          {/* Roue */}
          <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>Roue des attentions 🎡</h3>
            <button className="temp-quiz-btn" onClick={spinWheel} disabled={isSpinning}>{isSpinning ? '...' : 'Tourner'}</button>
            {wheelResult && <p style={{ marginTop: '12px', color: '#9f1239', fontWeight: '700', fontSize: '0.95rem' }}>{wheelResult}</p>}
          </div>

          {/* Vœu */}
          <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>Boîte à vœu secret 💌</h3>
            {!wishSaved ? (
              <>
                <input type="text" value={secretWish} onChange={(e) => setSecretWish(e.target.value)} placeholder="Ton vœu..." style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                <button className="temp-quiz-btn" onClick={() => secretWish.trim() && setWishSaved(true)} style={{ marginTop: '10px' }}>Sceller</button>
              </>
            ) : <p style={{ color: '#16a34a', fontWeight: '600', marginTop: '12px' }}>🔒 Vœu enregistré !</p>}
          </div>
        </div>
      </section>

      {/* --- CONTRAT D'AMOUR --- */}
      <section className="temp-section">
        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '20px', border: '1.5px solid #fecdd3', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ color: '#e11d48', marginTop: 0, fontSize: '1.4rem' }}>📜 Contrat Officiel d'Anniversaire</h2>
          <p style={{ color: '#475569', lineHeight: '1.5', fontSize: '0.95rem' }}>
            En cochant cette case, je soussignée Swafwata, accepte de passer des moments inoubliables et de profiter pleinement de toutes ces surprises.
          </p>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '0.95rem', color: '#1e293b', marginTop: '10px' }}>
            <input type="checkbox" checked={contractSigned} onChange={(e) => setContractSigned(e.target.checked)} style={{ width: '18px', height: '18px' }} />
            Je valide et signe le contrat ✍️
          </label>
        </div>
      </section>

      {/* --- FACTURE DYNAMIQUE AVEC JEUX INTERACTIFS --- */}
      <section className="temp-section">
        <div className="temp-section-header">
          <span className="temp-pill">Récapitulatif</span>
          <h2 className="temp-section-title">Ta Facture officielle du bonheur 🧾</h2>
          <p className="temp-section-sub">Personnalise ta facture grâce aux mini-jeux ci-dessous !</p>
        </div>

        {/* JEUX POUR LA FACTURE */}
        <div className="temp-grid-2" style={{ marginBottom: '24px' }}>
          {/* Jeu 1 : Curseur Pourboire d'Amour */}
          <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <label style={{ fontWeight: '700', fontSize: '0.9rem', color: '#1e293b', display: 'block', marginBottom: '8px' }}>
              🎚️ Pourboire d'Amour : {tipPercentage}%
            </label>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={tipPercentage}
              onChange={(e) => setTipPercentage(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#e11d48' }}
            />
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Ajuste la quantité d'amour attribuée !</span>
          </div>

          {/* Jeu 2 : Code Promo Secret */}
          <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <label style={{ fontWeight: '700', fontSize: '0.9rem', color: '#1e293b', display: 'block', marginBottom: '8px' }}>
              🏷️ Code Promo Secret
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <input
                type="text"
                placeholder="Ex: SWAFI2026"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{ flex: 1, padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
              <button onClick={applyPromo} style={{ backgroundColor: '#e11d48', color: '#fff', border: 'none', borderRadius: '8px', padding: '6px 12px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                Appliquer
              </button>
            </div>
            {promoApplied && <p style={{ color: '#16a34a', fontSize: '0.75rem', margin: '4px 0 0 0', fontWeight: '600' }}>✅ Code validé : -100% sur le stress !</p>}
          </div>
        </div>

        <div className="temp-pdf-wrapper">
          <div ref={pdfRef} className="temp-pdf-container">
            <div className="temp-pdf-header">
              <div>
                <h2 style={{ margin: 0, color: '#e11d48', fontSize: '1.2rem' }}>FACTURE DU BONHEUR #270825</h2>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Émise pour : Swafwata • Cliente Privilégiée 🎓</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Date : {new Date().toLocaleDateString('fr-FR')}</span>
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
                  <td><strong>Repas</strong></td>
                  <td>{selectedMeals.length > 0 ? selectedMeals.map(mId => mealsList.find(m => m.id === mId)?.name).join(', ') : 'Aucun repas choisi'}</td>
                  <td style={{ textAlign: 'right', color: '#e11d48', fontWeight: '600' }}>Offert ❤️</td>
                </tr>
                <tr>
                  <td><strong>Films</strong></td>
                  <td>{selectedMovies.length > 0 ? selectedMovies.map(mId => moviesList.find(m => m.id === mId)?.title).join(', ') : 'Aucun film choisi'}</td>
                  <td style={{ textAlign: 'right', color: '#e11d48', fontWeight: '600' }}>Offert ❤️</td>
                </tr>
                <tr>
                  <td><strong>Bisous</strong></td>
                  <td>{kissCount} bisous enregistrés</td>
                  <td style={{ textAlign: 'right', color: '#e11d48', fontWeight: '600' }}>Inestimable</td>
                </tr>
                <tr>
                  <td><strong>Attention</strong></td>
                  <td>{wheelResult || 'Pas encore tourné'}</td>
                  <td style={{ textAlign: 'right', color: '#e11d48', fontWeight: '600' }}>Garanti</td>
                </tr>
                <tr>
                  <td><strong>Surnom</strong></td>
                  <td>{generatedNickname || 'Pas encore généré'}</td>
                  <td style={{ textAlign: 'right', color: '#e11d48', fontWeight: '600' }}>Pour la vie</td>
                </tr>
                <tr>
                  <td><strong>Contrat</strong></td>
                  <td>{contractSigned ? '✅ Signé avec amour' : '⏳ En attente de signature'}</td>
                  <td style={{ textAlign: 'right', color: '#e11d48', fontWeight: '600' }}>Validé</td>
                </tr>
                {promoApplied && (
                  <tr>
                    <td><strong>Code Promo</strong></td>
                    <td>Remise spéciale "SWAFI2026"</td>
                    <td style={{ textAlign: 'right', color: '#16a34a', fontWeight: '600' }}>-100% Stress</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div style={{ marginTop: '20px', borderTop: '2px dashed #ffe4e6', paddingTop: '16px', textAlign: 'right' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>TOTAL À PAYER : </span>
              <strong style={{ fontSize: '1.1rem', color: '#e11d48', marginLeft: '6px' }}>
                0,00 € + {tipPercentage}% d'Amour
              </strong>
            </div>

            {/* Tampon de validation interactif */}
            {invoiceStamped && <div className="invoice-stamp">PAYÉ AVEC AMOUR</div>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '16px' }}>
          <button
            className="temp-btn-subtle"
            onClick={() => setInvoiceStamped(!invoiceStamped)}
            style={{ padding: '12px 20px', borderRadius: '20px', fontWeight: '700' }}
          >
            {invoiceStamped ? 'Retirer le tampon ✍️' : 'Tamponner la facture 💮'}
          </button>
          <button className="temp-btn-pink" onClick={downloadPDF} style={{ margin: 0 }}>
            Télécharger la Facture en PDF 📄
          </button>
        </div>
      </section>
    </div>
  )
}
