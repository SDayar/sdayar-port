import React, { useState, useEffect } from 'react'

export default function Temp() {
  // Animation d'entrée
  const [phase, setPhase] = useState('countdown') // 'countdown' | 'surprise' | 'main'
  const [count, setCount] = useState(3)

  // Easter eggs & interactions
  const [hearts, setHearts] = useState([])
  const [backpackSecret, setBackpackSecret] = useState(false)
  const [candlesBlown, setCandlesBlown] = useState(false)
  const [selectedMeals, setSelectedMeals] = useState([])
  const [selectedMovies, setSelectedMovies] = useState([])

  // Images avec prévisualisation et téléversement élégant
  const [photos, setPhotos] = useState({
    before: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
    date: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',
    couple: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80'
  })

  // Gestion des photos uploadées
  const handlePhotoChange = (key, file) => {
    if (file) {
      setPhotos(prev => ({ ...prev, [key]: URL.createObjectURL(file) }))
    }
  }

  // Animation de démarrage fluide
  useEffect(() => {
    if (phase === 'countdown') {
      if (count > 0) {
        const timer = setTimeout(() => setCount(count - 1), 800)
        return () => clearTimeout(timer)
      } else {
        setPhase('surprise')
      }
    } else if (phase === 'surprise') {
      const timer = setTimeout(() => setPhase('main'), 1600)
      return () => clearTimeout(timer)
    }
  }, [count, phase])

  // Easter egg : pluie de cœurs quand on clique sur le prénom
  const triggerHearts = (e) => {
    const newHearts = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: e.clientX + (Math.random() * 60 - 30),
      y: e.clientY + (Math.random() * 60 - 30),
    }))
    setHearts(prev => [...prev, ...newHearts])
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.includes(h)))
    }, 1200)
  }

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

  const mealsList = [
    { id: 1, name: 'Sushis préparés minute', desc: 'Frais, légers et gourmands' },
    { id: 2, name: 'Pizza au feu de bois', desc: 'Croûte alvéolée & burrata' },
    { id: 3, name: 'Tacos street-food', desc: 'Épicés juste comme tu aimes' },
    { id: 4, name: 'Burger artisan gourmet', desc: 'Pain brioché & frites maison' },
    { id: 5, name: 'Brunch sucré-salé', desc: 'Pancakes, avocado toast et jus' },
    { id: 6, name: 'Ramen traditionnel', desc: 'Bouillon mijoté et réconfortant' },
    { id: 7, name: 'Grillades au feu', desc: 'Saveurs fumées et conviviaux' },
    { id: 8, name: 'Cuisine du monde', desc: 'Une nouvelle saveur à découvrir' },
    { id: 9, name: 'Dîner gastronomique', desc: 'Table tamisée et chandelles' },
  ]

  const moviesList = [
    { id: 1, title: 'Clayface', date: '21 Octobre', detail: 'Le thriller horrifique événement DC' },
    { id: 2, title: 'Klara et le soleil', date: '21 Octobre', detail: 'Adaptation poétique & émouvante' },
    { id: 3, title: 'The Social Reckoning', date: '7 Octobre', detail: 'Le drame captivant d’Aaron Sorkin' },
    { id: 4, title: 'Ducobu et le fantôme', date: '7 Octobre', detail: 'Pour une soirée rigolade légère' },
    { id: 5, title: 'Les Misérables', date: '14 Octobre', detail: 'Grande fresque historique' },
    { id: 6, title: 'Karma', date: '21 Octobre', detail: 'Le nouveau film de Guillaume Canet' },
    { id: 7, title: 'Street Fighter', date: '14 Octobre', detail: 'Grosse séance d’action déjantée' },
    { id: 8, title: 'Wife And Dog', date: '28 Octobre', detail: 'Comédie noire & thriller de Guy Ritchie' },
    { id: 9, title: 'Shaun le Mouton : Halloween', date: '21 Octobre', detail: 'Petit moment cocooning d’animation' },
  ]

  // --- ÉCRANS DE DÉMARRAGE ---
  if (phase !== 'main') {
    return (
      <div style={styles.introWrapper}>
        {phase === 'countdown' ? (
          <div style={styles.introContent}>
            <span style={styles.countdownValue}>{count}</span>
            <p style={styles.introCaption}>Préparation de ton coin secret...</p>
          </div>
        ) : (
          <div style={styles.introContent}>
            <h1 style={styles.surpriseHeading}>Joyeux Anniversaire Swafi !</h1>
            <p style={styles.introCaption}>Tout ceci est fait rien que pour toi ✨</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={styles.page}>
      
      {/* Cœurs volants (Easter Egg) */}
      {hearts.map(h => (
        <span key={h.id} style={{ ...styles.heartAnim, left: h.x, top: h.y }}>❤️</span>
      ))}

      {/* --- HERO / ACCUEIL --- */}
      <section style={styles.heroSection}>
        <div style={styles.heroCard}>
          <span style={styles.pillTag}>Code secret déverrouillé</span>
          <h1 styles={styles.mainTitle} style={styles.mainTitle} onClick={triggerHearts}>
            Félicitations, <span style={styles.nameHighlight}>Swafwata</span>
          </h1>
          <p style={styles.heroSubtext}>
            Tu as trouvé le code ! Voici ton espace dédié, fait sur mesure pour fêter ton anniversaire et marquer ce moment tout doux en attendant ce qu’on a prévu ensemble.
          </p>
          <span style={styles.clickHint} onClick={triggerHearts}>
            (Clique sur ton prénom pour une petite surprise)
          </span>
        </div>
      </section>

      {/* --- AVANT / APRÈS --- */}
      <section style={styles.sectionFullscreen}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Le temps passe, les mémoires restent</h2>
          <p style={styles.sectionSubtitle}>Regarde un peu ce beau chemin parcouru ensemble.</p>
        </div>

        <div style={styles.dualPhotoGrid}>
          {/* PHOTO AVANT */}
          <div style={styles.photoContainer}>
            <div style={styles.photoFrame}>
              <img src={photos.before} alt="Photo Avant" style={styles.photoImg} />
            </div>
            <div style={styles.photoFooter}>
              <span style={styles.photoLabel}>Avant</span>
              <label style={styles.uploadLabel}>
                Changer la photo
                <input type="file" accept="image/*" hidden onChange={(e) => handlePhotoChange('before', e.target.files[0])} />
              </label>
            </div>
          </div>

          {/* PHOTO APRÈS */}
          <div style={styles.photoContainer}>
            <div style={styles.photoFrame}>
              <img src={photos.after} alt="Photo Après" style={styles.photoImg} />
            </div>
            <div style={styles.photoFooter}>
              <span style={styles.photoLabel}>Aujourd’hui</span>
              <label style={styles.uploadLabel}>
                Changer la photo
                <input type="file" accept="image/*" hidden onChange={(e) => handlePhotoChange('after', e.target.files[0])} />
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* --- FÉLICITATIONS MASTER --- */}
      <section style={styles.bannerSection}>
        <div style={styles.bannerContent}>
          <span style={styles.bannerBadge}>Une grande étape</span>
          <h2 style={styles.bannerTitle}>Bravo pour ton Master Swafi !</h2>
          <p style={styles.bannerBody}>
            Tes efforts, ton sérieux et ta détermination ont payé. Je suis tellement fier de te voir franchir ce cap avec autant de grâce. Que la suite de ton parcours ne te réserve que du bonheur, des accomplissements majeurs et de magnifiques réussites.
          </p>
        </div>
      </section>

      {/* --- JEU 1 : MENU DE RETROUVAILLES --- */}
      <section style={styles.sectionFullscreen}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Ce qu’on mangera à nos retrouvailles</h2>
          <p style={styles.sectionSubtitle}>
            Sélectionne 3 repas parmi les 9 possibilités. C'est toi qui choisis le programme gourmand ! ({selectedMeals.length}/3)
          </p>
        </div>

        <div style={styles.grid9}>
          {mealsList.map((meal) => {
            const isSelected = selectedMeals.includes(meal.id)
            return (
              <div
                key={meal.id}
                onClick={() => toggleMeal(meal.id)}
                style={{
                  ...styles.interactiveCard,
                  border: isSelected ? '2px solid #e11d48' : '1px solid #e2e8f0',
                  backgroundColor: isSelected ? '#fff1f2' : '#ffffff',
                }}
              >
                <h3 style={styles.cardHeading}>{meal.name}</h3>
                <p style={styles.cardSub}>{meal.desc}</p>
                {isSelected && <span style={styles.activeCheck}>Sélectionné</span>}
              </div>
            )
          })}
        </div>
      </section>

      {/* --- SIGNIFICATION DU CODE 270125 + PHOTO --- */}
      <section style={styles.sectionFullscreen}>
        <div style={styles.splitContent}>
          <div style={styles.splitText}>
            <span style={styles.pillTag}>L'explication</span>
            <h2 style={styles.sectionTitle}>La magie du 27.01.25</h2>
            <p style={styles.sectionSubtitle}>
              Ce code n’a pas été choisi au hasard. Le 27 Janvier 2025 marque le jour de notre rencontre, exactement 3 ans après le bac. Une date unique gravée pour toujours.
            </p>
          </div>
          <div style={styles.splitPhoto}>
            <div style={styles.photoFrame}>
              <img src={photos.date} alt="Jour de la rencontre" style={styles.photoImg} />
            </div>
            <label style={{ ...styles.uploadLabel, marginTop: '12px', display: 'inline-block' }}>
              Mettre notre photo du souvenir
              <input type="file" accept="image/*" hidden onChange={(e) => handlePhotoChange('date', e.target.files[0])} />
            </label>
          </div>
        </div>
      </section>

      {/* --- EASTER EGG : SAC À DOS --- */}
      <section style={styles.iconicContainer}>
        <div 
          style={styles.iconicBox}
          onClick={() => setBackpackSecret(!backpackSecret)}
        >
          <h2 style={styles.iconicText}>SAC À DOS</h2>
          <span style={styles.iconicHint}>
            {backpackSecret ? "🔒 Petit souvenir confidentiel déverrouillé !" : "(Clique ici si tu te souviens)"}
          </span>
          {backpackSecret && (
            <p style={styles.iconicSecretMsg}>
              Peu importe où l'on va, du moment qu'on a notre sac à dos et nos souvenirs ensemble ! ❤️
            </p>
          )}
        </div>
      </section>

      {/* --- JEU 2 : CINÉMA OCTOBRE --- */}
      <section style={styles.sectionFullscreen}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Nos soirées Ciné en Octobre</h2>
          <p style={styles.sectionSubtitle}>
            De superbes sorties sont prévues au cinéma (dont le très attendu <em>Clayface</em> !). Choisis les films que tu veux qu’on aille voir :
          </p>
        </div>

        <div style={styles.grid9}>
          {moviesList.map((movie) => {
            const isSelected = selectedMovies.includes(movie.id)
            return (
              <div
                key={movie.id}
                onClick={() => toggleMovie(movie.id)}
                style={{
                  ...styles.interactiveCard,
                  border: isSelected ? '2px solid #6366f1' : '1px solid #e2e8f0',
                  backgroundColor: isSelected ? '#eeef2ff' : '#ffffff',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={styles.cardHeading}>{movie.title}</h3>
                  <span style={styles.dateTag}>{movie.date}</span>
                </div>
                <p style={styles.cardSub}>{movie.detail}</p>
                {isSelected && <span style={{ ...styles.activeCheck, backgroundColor: '#6366f1' }}>Au programme</span>}
              </div>
            )
          })}
        </div>
      </section>

      {/* --- MOT D'AMOUR + PHOTO DE COUPLE --- */}
      <section style={styles.sectionFullscreen}>
        <div style={styles.loveCard}>
          <h2 style={styles.loveTitle}>Un petit mot du cœur</h2>
          <p style={styles.loveText}>
            "Swafwata, je voulais te dire à quel point tu comptes pour moi. Ton sourire, ta gentillesse et ta force m'inspirent chaque jour. Merci d'être la personne extraordinaire que tu es. Je t'aime plus que tout."
          </p>

          <div style={{ ...styles.photoContainer, maxWidth: '520px', margin: '30px auto 0 auto' }}>
            <div style={styles.photoFrame}>
              <img src={photos.couple} alt="Notre couple" style={styles.photoImg} />
            </div>
            <div style={styles.photoFooter}>
              <span style={styles.photoLabel}>Nous deux ❤️</span>
              <label style={styles.uploadLabel}>
                Changer notre photo
                <input type="file" accept="image/*" hidden onChange={(e) => handlePhotoChange('couple', e.target.files[0])} />
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* --- GÂTEAU & BOUGIES INTERACTIFS --- */}
      <section style={styles.sectionFullscreen}>
        <div style={styles.cakeBox}>
          <h2 style={styles.sectionTitle}>Temps de faire un vœu Swafi !</h2>
          <p style={styles.sectionSubtitle}>Clique sur le bouton ci-dessous pour souffler tes bougies d'anniversaire.</p>

          <div style={styles.cakeIllustration}>
            {!candlesBlown ? (
              <div style={styles.flameGlow}>🕯️✨</div>
            ) : (
              <div style={styles.blownGlow}>💨🎉</div>
            )}
            <div style={styles.cakeBase}>🍰</div>
          </div>

          <button
            onClick={() => setCandlesBlown(!candlesBlown)}
            style={{
              ...styles.primaryBtn,
              backgroundColor: candlesBlown ? '#1e293b' : '#e11d48',
            }}
          >
            {candlesBlown ? 'Rallumer la bougie' : 'Souffler la bougie 💨'}
          </button>

          {candlesBlown && (
            <div style={styles.wishRevealed}>
              <h3>Joyeux Anniversaire Swafwata ! ✨</h3>
              <p>Que cette année t'apporte autant de joie et de bonheur que tu en donnes autour de toi.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}

// STYLES MODERNES, CLAIRS ET ÉLÉGANTS (PLEIN ÉCRAN ET SANS ÉLÉMENTS DE TERMINAL SOBRES)
const styles = {
  page: {
    backgroundColor: '#fbfbfd',
    color: '#1d1d1f',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    width: '100%',
    minHeight: '100vh',
    overflowX: 'hidden',
    boxSizing: 'border-box',
  },
  introWrapper: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  introContent: {
    textAlign: 'center',
  },
  countdownValue: {
    fontSize: '8rem',
    fontWeight: '800',
    color: '#e11d48',
    letterSpacing: '-2px',
  },
  surpriseHeading: {
    fontSize: '3.5rem',
    fontWeight: '700',
    color: '#1d1d1f',
  },
  introCaption: {
    fontSize: '1.2rem',
    color: '#86868b',
    marginTop: '12px',
  },
  heroSection: {
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  heroCard: {
    maxWidth: '750px',
    textAlign: 'center',
  },
  pillTag: {
    display: 'inline-block',
    padding: '6px 16px',
    backgroundColor: '#ffe4e6',
    color: '#e11d48',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    marginBottom: '20px',
  },
  mainTitle: {
    fontSize: '3.8rem',
    fontWeight: '800',
    lineHeight: '1.1',
    letterSpacing: '-1px',
    marginBottom: '20px',
    cursor: 'pointer',
  },
  nameHighlight: {
    color: '#e11d48',
    borderBottom: '4px solid #fecdd3',
  },
  heroSubtext: {
    fontSize: '1.3rem',
    lineHeight: '1.6',
    color: '#515154',
    fontWeight: '400',
  },
  clickHint: {
    display: 'block',
    marginTop: '16px',
    fontSize: '0.85rem',
    color: '#a1a1a6',
    cursor: 'pointer',
  },
  sectionFullscreen: {
    minHeight: '90vh',
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '60px 24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    letterSpacing: '-0.5px',
    marginBottom: '10px',
  },
  sectionSubtitle: {
    fontSize: '1.15rem',
    color: '#6e6e73',
    maxWidth: '600px',
    margin: '0 auto',
  },
  dualPhotoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
  },
  photoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '16px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
    border: '1px solid #f1f5f9',
  },
  photoFrame: {
    width: '100%',
    height: '340px',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: '#f8fafc',
  },
  photoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  photoFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '14px',
    padding: '0 6px',
  },
  photoLabel: {
    fontWeight: '600',
    fontSize: '1.1rem',
    color: '#1e293b',
  },
  uploadLabel: {
    fontSize: '0.85rem',
    color: '#6366f1',
    fontWeight: '500',
    cursor: 'pointer',
  },
  bannerSection: {
    backgroundColor: '#ffffff',
    borderTop: '1px solid #f1f5f9',
    borderBottom: '1px solid #f1f5f9',
    padding: '80px 24px',
    textAlign: 'center',
  },
  bannerContent: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  bannerBadge: {
    color: '#9333ea',
    fontWeight: '600',
    fontSize: '0.9rem',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  bannerTitle: {
    fontSize: '2.8rem',
    fontWeight: '800',
    margin: '12px 0 20px 0',
  },
  bannerBody: {
    fontSize: '1.2rem',
    lineHeight: '1.7',
    color: '#475569',
  },
  grid9: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '18px',
  },
  interactiveCard: {
    borderRadius: '20px',
    padding: '24px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
    position: 'relative',
  },
  cardHeading: {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '6px',
  },
  cardSub: {
    fontSize: '0.95rem',
    color: '#64748b',
    lineHeight: '1.4',
  },
  activeCheck: {
    display: 'inline-block',
    marginTop: '12px',
    padding: '4px 10px',
    backgroundColor: '#e11d48',
    color: '#fff',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  dateTag: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#6366f1',
    backgroundColor: '#e0e7ff',
    padding: '3px 8px',
    borderRadius: '8px',
  },
  splitContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '40px',
    alignItems: 'center',
  },
  splitText: {
    textAlign: 'left',
  },
  splitPhoto: {
    textAlign: 'center',
  },
  iconicContainer: {
    padding: '80px 24px',
    display: 'flex',
    justifyContent: 'center',
  },
  iconicBox: {
    textAlign: 'center',
    padding: '60px 40px',
    backgroundColor: '#ffffff',
    borderRadius: '32px',
    border: '2px dashed #f43f5e',
    cursor: 'pointer',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 10px 30px rgba(244, 63, 94, 0.05)',
  },
  iconicText: {
    fontSize: '3.5rem',
    fontWeight: '900',
    letterSpacing: '6px',
    color: '#f43f5e',
    margin: 0,
  },
  iconicHint: {
    display: 'block',
    marginTop: '10px',
    color: '#94a3b8',
    fontSize: '0.9rem',
  },
  iconicSecretMsg: {
    marginTop: '20px',
    fontSize: '1.1rem',
    color: '#1e293b',
    fontWeight: '500',
    lineHeight: '1.5',
  },
  loveCard: {
    backgroundColor: '#ffffff',
    borderRadius: '32px',
    padding: '50px 30px',
    textAlign: 'center',
    boxShadow: '0 20px 50px rgba(0,0,0,0.03)',
    border: '1px solid #f1f5f9',
  },
  loveTitle: {
    fontSize: '2.4rem',
    fontWeight: '800',
    marginBottom: '20px',
  },
  loveText: {
    fontSize: '1.35rem',
    lineHeight: '1.8',
    color: '#334155',
    maxWidth: '700px',
    margin: '0 auto',
    fontStyle: 'italic',
  },
  cakeBox: {
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto',
  },
  cakeIllustration: {
    margin: '30px 0',
  },
  flameGlow: {
    fontSize: '4rem',
  },
  blownGlow: {
    fontSize: '4rem',
  },
  cakeBase: {
    fontSize: '6rem',
    marginTop: '-10px',
  },
  primaryBtn: {
    padding: '16px 36px',
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#ffffff',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  wishRevealed: {
    marginTop: '30px',
    padding: '24px',
    backgroundColor: '#ecfdf5',
    borderRadius: '20px',
    color: '#065f46',
  },
  heartAnim: {
    position: 'fixed',
    fontSize: '1.5rem',
    pointerEvents: 'none',
    animation: 'floatUp 1.2s forwards',
    zIndex: 9999,
  },
}
