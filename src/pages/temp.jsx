import React, { useState, useEffect } from 'react'

export default function Temp() {
  // --- ÉTATS ANIMATION D'ENTRÉE ---
  const [countdown, setCountdown] = useState(3)
  const [showSurprise, setShowSurprise] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // --- ÉTATS JEU 1 : 3 REPAS PARMI 9 ---
  const [selectedMeals, setSelectedMeals] = useState([])

  // --- ÉTATS JEU 2 : FILMS EN OCTOBRE PARMI 9 ---
  const [selectedMovies, setSelectedMovies] = useState([])

  // --- ÉTAT GÂTEAU & BOUGIES ---
  const [candlesBlown, setCandlesBlown] = useState(false)

  // --- IMAGES PAR DÉFAUT (Remplaçables facilement) ---
  const [beforeImage, setBeforeImage] = useState('https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80')
  const [afterImage, setAfterImage] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80')
  const [dateImage, setDateImage] = useState('https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500&q=80')
  const [coupleImage, setCoupleImage] = useState('https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&q=80')

  // Animation de démarrage (Compte à rebours 3, 2, 1 -> Surprise !)
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && !showSurprise) {
      setShowSurprise(true)
      const timer = setTimeout(() => {
        setShowSurprise(false)
        setIsReady(true)
      }, 1800)
      return () => clearTimeout(timer)
    }
  }, [countdown, showSurprise])

  // Liste des 9 repas
  const mealsList = [
    { id: 1, name: 'Sushi & Makis', icon: '🍣' },
    { id: 2, name: 'Pizza Artisanale', icon: '🍕' },
    { id: 3, name: 'Tacos / Burritos', icon: '🌮' },
    { id: 4, name: 'Burger Gourmet', icon: '🍔' },
    { id: 5, name: 'Pâtisserie & Brunch', icon: '🥐' },
    { id: 6, name: 'Noodles & Ramen', icon: '🍜' },
    { id: 7, name: 'Barbecue / Grillades', icon: '🍖' },
    { id: 8, name: 'Plat Traditionnel', icon: '🍲' },
    { id: 9, name: 'Restaurant Gastronomique', icon: '🍷' },
  ]

  // Liste des 9 films en octobre (Incluant Clayface)
  const moviesList = [
    { id: 1, title: 'Clayface', genre: 'Horreur / DC Universe', date: '21 Octobre', icon: '🎭' },
    { id: 2, title: 'Klara et le soleil', genre: 'Sci-Fi / Drame', date: '21 Octobre', icon: '☀️' },
    { id: 3, title: 'Ducobu & le fantôme', genre: 'Comédie / Halloween', date: '7 Octobre', icon: '👻' },
    { id: 4, title: 'Les Misérables', genre: 'Drame Historique', date: '14 Octobre', icon: '🎬' },
    { id: 5, title: 'Karma (Guillaume Canet)', genre: 'Thriller', date: '21 Octobre', icon: '🔮' },
    { id: 6, title: 'Street Fighter', genre: 'Action / Adapt.', date: '14 Octobre', icon: '🥊' },
    { id: 7, title: 'Wife And Dog', genre: 'Comédie / Thriller', date: '28 Octobre', icon: '🐕' },
    { id: 8, title: 'The Social Reckoning', genre: 'Drame', date: '7 Octobre', icon: '📱' },
    { id: 9, title: 'Shaun le Mouton : Halloween', genre: 'Animation', date: '21 Octobre', icon: '🎃' },
  ]

  const handleMealToggle = (meal) => {
    if (selectedMeals.find(m => m.id === meal.id)) {
      setSelectedMeals(selectedMeals.filter(m => m.id !== meal.id))
    } else if (selectedMeals.length < 3) {
      setSelectedMeals([...selectedMeals, meal])
    }
  }

  const handleMovieToggle = (movie) => {
    if (selectedMovies.find(m => m.id === movie.id)) {
      setSelectedMovies(selectedMovies.filter(m => m.id !== movie.id))
    } else {
      setSelectedMovies([...selectedMovies, movie])
    }
  }

  // --- ANIMATION INITIALE ---
  if (!isReady) {
    return (
      <div style={styles.introOverlay}>
        {!showSurprise ? (
          <div style={styles.countdownContainer}>
            <span style={styles.countdownNumber}>{countdown}</span>
            <p style={styles.introSubText}>Chargement de ton espace secret...</p>
          </div>
        ) : (
          <div style={styles.surpriseContainer}>
            <h1 style={styles.surpriseTitle}>✨ SURPRISE SWAFWATA ! 🎉</h1>
            <p style={styles.surpriseSub}>Bienvenue dans ton coin secret ❤️</p>
          </div>
        )}
      </div>
    )
  }

  // --- RENDU DE LA PAGE TEMPORAIRE ---
  return (
    <div style={styles.container}>
      
      {/* 1. SECTION FÉLICITATIONS CODE */}
      <section style={styles.card}>
        <div style={styles.badge}>Bravo Swafi ! 🎉</div>
        <h1 style={styles.title}>Félicitations ma Swafwata ❤️</h1>
        <p style={styles.text}>
          Tu as réussi à déchiffrer le code secret ! C'est une petite surprise spécialement conçue pour toi, 
          en attendant tout ce qu'on va prévoir et fêter ensemble très bientôt. Prends le temps d'explorer cette page !
        </p>
      </section>

      {/* 2. SECTION AVANT / APRÈS */}
      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>📸 Avant vs Après</h2>
        <p style={styles.text}>Regarde un peu le chemin parcouru depuis le début...</p>
        
        <div style={styles.gridTwo}>
          {/* PHOTO AVANT */}
          <div style={styles.photoBox}>
            <h3 style={styles.photoLabel}>Avant</h3>
            <img src={beforeImage} alt="Avant" style={styles.image} />
            <label style={styles.uploadBtn}>
              Changer photo avant
              <input 
                type="file" 
                accept="image/*" 
                hidden 
                onChange={(e) => e.target.files[0] && setBeforeImage(URL.createObjectURL(e.target.files[0]))} 
              />
            </label>
          </div>

          {/* PHOTO APRÈS */}
          <div style={styles.photoBox}>
            <h3 style={styles.photoLabel}>Après</h3>
            <img src={afterImage} alt="Après" style={styles.image} />
            <label style={styles.uploadBtn}>
              Changer photo après
              <input 
                type="file" 
                accept="image/*" 
                hidden 
                onChange={(e) => e.target.files[0] && setAfterImage(URL.target.files[0]))} 
              />
            </label>
          </div>
        </div>
      </section>

      {/* 3. SECTION FÉLICITATIONS MASTER */}
      <section style={{ ...styles.card, borderLeft: '6px solid #a855f7' }}>
        <h2 style={styles.sectionTitle}>🎓 Félicitations pour ton Master !</h2>
        <p style={styles.text}>
          Swafi, je suis tellement fier de toi et de tout le travail acharné que tu as fourni pour tes études en Master. 
          Tu as montré une détermination incroyable. Je te souhaite que du bonheur, de la réussite et plein de belles choses pour la suite de ton parcours ! 🌟
        </p>
      </section>

      {/* 4. JEU : CHOIX DES REPAS (3 PARMI 9) */}
      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>🍽️ Le Menu de Retrouvailles (Choisis 3 repas)</h2>
        <p style={styles.text}>
          Choisis 3 repas parmi les 9 propositions ci-dessous pour notre prochain rendez-vous ! <br />
          <strong>Sélectionnés : ({selectedMeals.length}/3)</strong>
        </p>

        <div style={styles.gridThree}>
          {mealsList.map((meal) => {
            const isSelected = selectedMeals.some(m => m.id === meal.id)
            return (
              <button
                key={meal.id}
                onClick={() => handleMealToggle(meal)}
                style={{
                  ...styles.choiceCard,
                  borderColor: isSelected ? '#ff4757' : '#333',
                  backgroundColor: isSelected ? 'rgba(255, 71, 87, 0.15)' : '#1a1a1a',
                }}
              >
                <span style={{ fontSize: '2rem' }}>{meal.icon}</span>
                <span style={{ color: '#fff', fontWeight: 'bold' }}>{meal.name}</span>
                {isSelected && <span style={styles.checkBadge}>✓ Choisis</span>}
              </button>
            )
          })}
        </div>

        {selectedMeals.length === 3 && (
          <div style={styles.recapBox}>
            <h3>✨ Ton menu idéal :</h3>
            <ul>
              {selectedMeals.map(m => <li key={m.id}>{m.icon} {m.name}</li>)}
            </ul>
            <p style={{ color: '#ff4757', fontWeight: 'bold' }}>C'est noté ! On mangera ça quand on se revoit ! 🔥</p>
          </div>
        )}
      </section>

      {/* 5. EXPLICATION DU CODE 270125 */}
      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>🔑 Pourquoi le code "270125" ?</h2>
        <p style={styles.text}>
          Le code correspond au <strong>27 Janvier 2025</strong> : le jour où on s'est rencontré, exactement 3 ans après le bac ! Un moment inoubliable. ❤️
        </p>
        
        <div style={{ ...styles.photoBox, maxWidth: '400px', margin: '20px auto 0 auto' }}>
          <img src={dateImage} alt="Notre rencontre" style={styles.image} />
          <label style={styles.uploadBtn}>
            Changer la photo du souvenir
            <input 
              type="file" 
              accept="image/*" 
              hidden 
              onChange={(e) => e.target.files[0] && setDateImage(URL.createObjectURL(e.target.files[0]))} 
            />
          </label>
        </div>
      </section>

      {/* 6. MENTION ICONIQUE "SAC À DOS" */}
      <section style={styles.backpackSection}>
        <div style={styles.backpackGlow}>🎒</div>
        <h1 style={styles.iconicText}>SAC À DOS</h1>
        <p style={{ color: '#888', fontStyle: 'italic', marginTop: '10px' }}>Si tu sais, tu sais... 😉</p>
      </section>

      {/* 7. JEU : FILMS D'OCTOBRE */}
      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>🍿 Soirées Cinéma d'Octobre</h2>
        <p style={styles.text}>
          Sélectionne les films qui te tentent pour nos séances ciné en Octobre (notamment le fameux <strong>Clayface</strong> !) :
        </p>

        <div style={styles.gridThree}>
          {moviesList.map((movie) => {
            const isSelected = selectedMovies.some(m => m.id === movie.id)
            return (
              <button
                key={movie.id}
                onClick={() => handleMovieToggle(movie)}
                style={{
                  ...styles.choiceCard,
                  borderColor: isSelected ? '#a855f7' : '#333',
                  backgroundColor: isSelected ? 'rgba(168, 85, 247, 0.15)' : '#1a1a1a',
                }}
              >
                <span style={{ fontSize: '2.2rem' }}>{movie.icon}</span>
                <span style={{ color: '#fff', fontWeight: 'bold' }}>{movie.title}</span>
                <span style={{ color: '#aaa', fontSize: '0.85rem' }}>{movie.genre}</span>
                <span style={{ color: '#a855f7', fontSize: '0.8rem', marginTop: '4px' }}>Sortie : {movie.date}</span>
                {isSelected && <span style={{ ...styles.checkBadge, backgroundColor: '#a855f7' }}>✓ Sélectionné</span>}
              </button>
            )
          })}
        </div>

        {selectedMovies.length > 0 && (
          <div style={{ ...styles.recapBox, borderColor: '#a855f7' }}>
            <h3>📽️ Ta liste de films retenus :</h3>
            <ul>
              {selectedMovies.map(m => <li key={m.id}>{m.icon} <strong>{m.title}</strong> ({m.date})</li>)}
            </ul>
          </div>
        )}
      </section>

      {/* 8. MOT D'AMOUR & PHOTO DE COUPLE */}
      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>💌 Un mot pour toi Swafi</h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <p style={{ ...styles.text, fontSize: '1.2rem', textAlign: 'center', fontStyle: 'italic', lineHeight: '1.8' }}>
            "Swafwata, je voulais te rappeler à quel point tu es précieuse pour moi et à quel point je t'aime. 
            Chaque jour à tes côtés est un bonheur, et j'ai tellement hâte de partager encore d'innombrables moments extraordinaires avec toi."
          </p>
          
          <div style={{ ...styles.photoBox, maxWidth: '450px', width: '100%' }}>
            <img src={coupleImage} alt="Nous deux" style={styles.image} />
            <label style={styles.uploadBtn}>
              Mettre notre photo
              <input 
                type="file" 
                accept="image/*" 
                hidden 
                onChange={(e) => e.target.files[0] && setCoupleImage(URL.createObjectURL(e.target.files[0]))} 
              />
            </label>
          </div>
        </div>
      </section>

      {/* 9. GÂTEAU D'ANNIVERSAIRE INTERACTIF */}
      <section style={{ ...styles.card, textAlign: 'center' }}>
        <h2 style={styles.sectionTitle}>🎂 Joyeux Anniversaire Swafwata !</h2>
        <p style={styles.text}>Fais un vœu et souffle tes bougies !</p>

        <div style={styles.cakeContainer}>
          <div style={styles.candlesBox}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={styles.candle}>
                {!candlesBlown ? (
                  <div style={styles.flame}>🔥</div>
                ) : (
                  <div style={styles.smoke}>💨</div>
                )}
                <div style={styles.stick}></div>
              </div>
            ))}
          </div>
          <div style={styles.cakeBody}>🎂</div>
        </div>

        <button
          onClick={() => setCandlesBlown(!candlesBlown)}
          style={{
            ...styles.actionBtn,
            backgroundColor: candlesBlown ? '#333' : '#ff4757',
            color: '#fff',
          }}
        >
          {candlesBlown ? '🕯️ Rallumer les bougies' : '💨 Souffler les bougies !'}
        </button>

        {candlesBlown && (
          <div style={{ marginTop: '20px', animation: 'fadeIn 1s' }}>
            <h3 style={{ color: '#00ff66', fontSize: '1.5rem' }}>🎉 Que tous tes vœux se réalisent Swafi ! ❤️</h3>
          </div>
        )}
      </section>

    </div>
  )
}

// --- STYLES CSS-IN-JS (SANS DÉPENDANCES D'ICÔNES OU EXTERNES) ---
const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    color: '#f1f1f1',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  introOverlay: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d1117',
    color: '#fff',
    textAlign: 'center',
  },
  countdownContainer: {
    fontSize: '2rem',
  },
  countdownNumber: {
    fontSize: '7rem',
    fontWeight: 'bold',
    color: '#ff4757',
    display: 'block',
  },
  introSubText: {
    color: '#aaa',
    marginTop: '10px',
  },
  surpriseContainer: {
    animation: 'pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  surpriseTitle: {
    fontSize: '3rem',
    color: '#ff4757',
    marginBottom: '10px',
  },
  surpriseSub: {
    fontSize: '1.5rem',
    color: '#fff',
  },
  card: {
    backgroundColor: '#161b22',
    borderRadius: '16px',
    padding: '28px',
    border: '1px solid #30363d',
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
    position: 'relative',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: 'rgba(255, 71, 87, 0.2)',
    color: '#ff4757',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  title: {
    fontSize: '2.2rem',
    color: '#ffffff',
    margin: '0 0 12px 0',
  },
  sectionTitle: {
    fontSize: '1.6rem',
    color: '#ffffff',
    marginBottom: '12px',
  },
  text: {
    color: '#c9d1d9',
    lineHeight: '1.6',
    fontSize: '1.05rem',
  },
  gridTwo: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  gridThree: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '15px',
    marginTop: '20px',
  },
  photoBox: {
    backgroundColor: '#0d1117',
    borderRadius: '12px',
    padding: '12px',
    border: '1px solid #30363d',
    textAlign: 'center',
  },
  photoLabel: {
    color: '#ff4757',
    marginBottom: '8px',
  },
  image: {
    width: '100%',
    height: '240px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  uploadBtn: {
    display: 'inline-block',
    backgroundColor: '#21262d',
    color: '#58a6ff',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '0.85rem',
    cursor: 'pointer',
    border: '1px solid #30363d',
  },
  choiceCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderRadius: '12px',
    border: '2px solid #333',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    gap: '8px',
    position: 'relative',
  },
  checkBadge: {
    backgroundColor: '#ff4757',
    color: '#fff',
    fontSize: '0.75rem',
    padding: '2px 8px',
    borderRadius: '10px',
    marginTop: '4px',
  },
  recapBox: {
    marginTop: '20px',
    padding: '16px',
    backgroundColor: '#0d1117',
    borderRadius: '10px',
    border: '1px solid #ff4757',
  },
  backpackSection: {
    textAlign: 'center',
    padding: '40px 20px',
    backgroundColor: '#111',
    borderRadius: '20px',
    border: '2px dashed #e17055',
  },
  backpackGlow: {
    fontSize: '4rem',
    animation: 'bounce 2s infinite',
  },
  iconicText: {
    fontSize: '3.5rem',
    fontWeight: '900',
    letterSpacing: '8px',
    background: 'linear-gradient(45deg, #ff7675, #fdcb6e, #6c5ce7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '10px 0 0 0',
  },
  cakeContainer: {
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  candlesBox: {
    display: 'flex',
    gap: '20px',
    marginBottom: '-10px',
    zIndex: 2,
  },
  candle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  flame: {
    fontSize: '1.5rem',
    animation: 'pulse 0.5s infinite alternate',
  },
  smoke: {
    fontSize: '1.2rem',
    opacity: 0.6,
  },
  stick: {
    width: '8px',
    height: '35px',
    backgroundColor: '#ff7675',
    borderRadius: '4px',
  },
  cakeBody: {
    fontSize: '6rem',
    marginTop: '-20px',
  },
  actionBtn: {
    padding: '12px 24px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
}
