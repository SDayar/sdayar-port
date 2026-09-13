import React, { useState, useEffect } from 'react'

export default function Temp() {
  // --- ÉTATS ANIMATION INITIALE ---
  const [step, setStep] = useState('countdown') // 'countdown' | 'surprise' | 'content'
  const [count, setCount] = useState(3)

  // --- ÉTATS JEU 1 : 3 REPAS PARMI 9 ---
  const [selectedMeals, setSelectedMeals] = useState([])

  // --- ÉTATS JEU 2 : FILMS EN OCTOBRE ---
  const [selectedMovies, setSelectedMovies] = useState([])

  // --- ÉTAT GÂTEAU & BOUGIES ---
  const [candlesBlown, setCandlesBlown] = useState(false)

  // --- IMAGES PAR DÉFAUT (Tu peux les changer en cliquant sur les boutons) ---
  const [photos, setPhotos] = useState({
    before: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80',
    after: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80',
    date: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500&q=80',
    couple: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&q=80'
  })

  // Gestionnaire de changement de photo
  const handlePhotoUpload = (key, file) => {
    if (file) {
      const url = URL.createObjectURL(file)
      setPhotos(prev => ({ ...prev, [key]: url }))
    }
  }

  // Animation de démarrage robuste (Evite les blocages)
  useEffect(() => {
    if (step === 'countdown') {
      if (count > 0) {
        const timer = setTimeout(() => setCount(count - 1), 900)
        return () => clearTimeout(timer)
      } else {
        setStep('surprise')
      }
    } else if (step === 'surprise') {
      const timer = setTimeout(() => {
        setStep('content')
      }, 1800)
      return () => clearTimeout(timer)
    }
  }, [count, step])

  // Données des 9 repas
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

  // Données des 9 films en octobre (Clayface inclus)
  const moviesList = [
    { id: 1, title: 'Clayface', genre: 'Horreur / DC Universe', date: 'Sortie Octobre', icon: '🎭' },
    { id: 2, title: 'Klara et le Soleil', genre: 'Sci-Fi / Drame', date: 'Sortie Octobre', icon: '☀️' },
    { id: 3, title: 'Ducobu & le Fantôme', genre: 'Comédie Halloween', date: 'Sortie Octobre', icon: '👻' },
    { id: 4, title: 'Les Misérables', genre: 'Drame Historique', date: 'Sortie Octobre', icon: '🎬' },
    { id: 5, title: 'Karma (Guillaume Canet)', genre: 'Thriller', date: 'Sortie Octobre', icon: '🔮' },
    { id: 6, title: 'Street Fighter', genre: 'Action / Adapt.', date: 'Sortie Octobre', icon: '🥊' },
    { id: 7, title: 'Wife And Dog', genre: 'Comédie Thriller', date: 'Sortie Octobre', icon: '🐕' },
    { id: 8, title: 'The Social Reckoning', genre: 'Drame', date: 'Sortie Octobre', icon: '📱' },
    { id: 9, title: 'Shaun le Mouton : Halloween', genre: 'Animation', date: 'Sortie Octobre', icon: '🎃' },
  ]

  const toggleMeal = (meal) => {
    if (selectedMeals.some(m => m.id === meal.id)) {
      setSelectedMeals(selectedMeals.filter(m => m.id !== meal.id))
    } else if (selectedMeals.length < 3) {
      setSelectedMeals([...selectedMeals, meal])
    }
  }

  const toggleMovie = (movie) => {
    if (selectedMovies.some(m => m.id === movie.id)) {
      setSelectedMovies(selectedMovies.filter(m => m.id !== movie.id))
    } else {
      setSelectedMovies([...selectedMovies, movie])
    }
  }

  // --- ECRAINS D'ANIMATION DE DEPART ---
  if (step !== 'content') {
    return (
      <div style={styles.introOverlay}>
        {step === 'countdown' ? (
          <div style={styles.centerBox}>
            <span style={styles.bigCount}>{count}</span>
            <p style={styles.subLabel}>Chargement de la surprise pour Swafi...</p>
          </div>
        ) : (
          <div style={styles.centerBox}>
            <h1 style={styles.surpriseTitle}>🎉 SURPRISE SWAFWATA ! ❤️</h1>
            <p style={styles.subLabel}>Bienvenue dans ton espace réservé ✨</p>
          </div>
        )}
      </div>
    )
  }

  // --- CONTENU DE LA PAGE ---
  return (
    <div style={styles.container}>

      {/* 1. BRAVO CODE */}
      <section style={styles.card}>
        <div style={styles.tag}>Bravo Swafwata ! 🔓</div>
        <h1 style={styles.h1}>Félicitations ma Swafi ❤️</h1>
        <p style={styles.p}>
          Tu as réussi à déchiffrer le code secret (270125) ! C'est une petite surprise préparée juste pour toi 
          en attendant toutes les belles choses qu'on va fêter ensemble très bientôt.
        </p>
      </section>

      {/* 2. AVANT / APRÈS */}
      <section style={styles.card}>
        <h2 style={styles.h2}>📸 Photo Avant / Après</h2>
        <p style={styles.p}>Regarde le chemin parcouru depuis nos débuts...</p>
        
        <div style={styles.grid2}>
          {/* PHOTO AVANT */}
          <div style={styles.photoCard}>
            <h3 style={styles.photoTitle}>PHOTO 1 : Avant</h3>
            <img src={photos.before} alt="Avant" style={styles.img} />
            <label style={styles.fileBtn}>
              📷 Uploader Photo "Avant"
              <input type="file" accept="image/*" hidden onChange={(e) => handlePhotoUpload('before', e.target.files[0])} />
            </label>
          </div>

          {/* PHOTO APRÈS */}
          <div style={styles.photoCard}>
            <h3 style={styles.photoTitle}>PHOTO 2 : Après</h3>
            <img src={photos.after} alt="Après" style={styles.img} />
            <label style={styles.fileBtn}>
              📷 Uploader Photo "Après"
              <input type="file" accept="image/*" hidden onChange={(e) => handlePhotoUpload('after', e.target.files[0])} />
            </label>
          </div>
        </div>
      </section>

      {/* 3. FÉLICITATIONS MASTER */}
      <section style={{ ...styles.card, borderLeft: '6px solid #a855f7' }}>
        <h2 style={styles.h2}>🎓 Félicitations pour ton Master Swafwata !</h2>
        <p style={styles.p}>
          Je suis tellement fier de toi, de ton parcours et de ton diplôme de Master ! 
          Tu as travaillé dur et ton effort a payé. Je te souhaite que du bonheur, de la réussite et le meilleur pour la suite ! 🌟
        </p>
      </section>

      {/* 4. JEU 1 : 3 REPAS PARMI 9 */}
      <section style={styles.card}>
        <h2 style={styles.h2}>🍽️ Menu de nos prochaines retrouvailles</h2>
        <p style={styles.p}>
          Choisis 3 repas parmi ces 9 propositions pour notre prochain repas ensemble ! <br />
          <strong>Sélection : ({selectedMeals.length}/3)</strong>
        </p>

        <div style={styles.grid3}>
          {mealsList.map((meal) => {
            const isSelected = selectedMeals.some(m => m.id === meal.id)
            return (
              <div
                key={meal.id}
                onClick={() => toggleMeal(meal)}
                style={{
                  ...styles.selectableCard,
                  borderColor: isSelected ? '#ff4757' : '#30363d',
                  backgroundColor: isSelected ? 'rgba(255, 71, 87, 0.15)' : '#0d1117'
                }}
              >
                <span style={{ fontSize: '2.5rem' }}>{meal.icon}</span>
                <span style={{ color: '#fff', fontWeight: 'bold' }}>{meal.name}</span>
                {isSelected && <span style={styles.selectedBadge}>✓ Choisi</span>}
              </div>
            )
          })}
        </div>
      </section>

      {/* 5. LE CODE 270125 + PHOTO RENCONTRE */}
      <section style={styles.card}>
        <h2 style={styles.h2}>🔑 Le secret du code "270125"</h2>
        <p style={styles.p}>
          Le code correspond au <strong>27 Janvier 2025</strong> : le jour de notre rencontre, pile 3 ans après le bac !
        </p>
        <div style={{ ...styles.photoCard, maxWidth: '420px', margin: '20px auto 0 auto' }}>
          <h3 style={styles.photoTitle}>PHOTO 3 : Jour de notre rencontre</h3>
          <img src={photos.date} alt="Rencontre" style={styles.img} />
          <label style={styles.fileBtn}>
            📷 Uploader Photo Rencontre
            <input type="file" accept="image/*" hidden onChange={(e) => handlePhotoUpload('date', e.target.files[0])} />
          </label>
        </div>
      </section>

      {/* 6. ICONIQUE : SAC À DOS */}
      <section style={styles.iconicSection}>
        <div style={{ fontSize: '4rem', marginBottom: '10px' }}>🎒</div>
        <h1 style={styles.iconicTitle}>SAC À DOS</h1>
        <p style={{ color: '#aaa', fontStyle: 'italic' }}>Le mot magique & iconique ✨</p>
      </section>

      {/* 7. JEU 2 : CINÉMA OCTOBRE */}
      <section style={styles.card}>
        <h2 style={styles.h2}>🍿 Programme Cinéma d'Octobre</h2>
        <p style={styles.p}>
          Sélectionne les films qu'on va aller voir en Octobre (avec le très attendu <strong>Clayface</strong>) :
        </p>

        <div style={styles.grid3}>
          {moviesList.map((movie) => {
            const isSelected = selectedMovies.some(m => m.id === movie.id)
            return (
              <div
                key={movie.id}
                onClick={() => toggleMovie(movie)}
                style={{
                  ...styles.selectableCard,
                  borderColor: isSelected ? '#a855f7' : '#30363d',
                  backgroundColor: isSelected ? 'rgba(168, 85, 247, 0.15)' : '#0d1117'
                }}
              >
                <span style={{ fontSize: '2.5rem' }}>{movie.icon}</span>
                <span style={{ color: '#fff', fontWeight: 'bold' }}>{movie.title}</span>
                <span style={{ color: '#8b949e', fontSize: '0.85rem' }}>{movie.genre}</span>
                {isSelected && <span style={{ ...styles.selectedBadge, backgroundColor: '#a855f7' }}>✓ Réservé</span>}
              </div>
            )
          })}
        </div>
      </section>

      {/* 8. MOT D'AMOUR + PHOTO ENSEMBLE */}
      <section style={styles.card}>
        <h2 style={styles.h2}>💌 Je t'aime Swafi</h2>
        <p style={{ ...styles.p, fontSize: '1.2rem', textAlign: 'center', fontStyle: 'italic' }}>
          "Chaque moment à tes côtés est unique. Merci d'être la personne exceptionnelle que tu es au quotidien."
        </p>
        <div style={{ ...styles.photoCard, maxWidth: '450px', margin: '20px auto 0 auto' }}>
          <h3 style={styles.photoTitle}>PHOTO 4 : Notre Photo de Couple</h3>
          <img src={photos.couple} alt="Nous deux" style={styles.img} />
          <label style={styles.fileBtn}>
            📷 Uploader Photo de Nous
            <input type="file" accept="image/*" hidden onChange={(e) => handlePhotoUpload('couple', e.target.files[0])} />
          </label>
        </div>
      </section>

      {/* 9. GÂTEAU D'ANNIVERSAIRE */}
      <section style={{ ...styles.card, textAlign: 'center' }}>
        <h2 style={styles.h2}>🎂 Joyeux Anniversaire Swafwata !</h2>
        <p style={styles.p}>Fais un vœu puis souffle tes bougies :</p>

        <div style={{ margin: '30px 0', fontSize: '5rem' }}>
          {!candlesBlown ? '🔥 🎂 🔥' : '💨 🍰 💨'}
        </div>

        <button
          onClick={() => setCandlesBlown(!candlesBlown)}
          style={{
            padding: '12px 28px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: '25px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: candlesBlown ? '#30363d' : '#ff4757',
            color: '#fff',
            transition: 'all 0.3s'
          }}
        >
          {candlesBlown ? '🕯️ Rallumer les bougies' : '💨 Souffler les bougies !'}
        </button>

        {candlesBlown && (
          <h3 style={{ color: '#00ff66', marginTop: '20px', fontSize: '1.4rem' }}>
            ✨ Que tous tes vœux les plus chers se réalisent Swafi ! ❤️
          </h3>
        )}
      </section>

    </div>
  )
}

// STYLES
const styles = {
  container: {
    maxWidth: '850px',
    margin: '0 auto',
    padding: '20px',
    color: '#c9d1d9',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  introOverlay: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d1117',
    color: '#fff',
  },
  centerBox: {
    textAlign: 'center',
  },
  bigCount: {
    fontSize: '7rem',
    fontWeight: 'bold',
    color: '#ff4757',
  },
  surpriseTitle: {
    fontSize: '2.8rem',
    color: '#ff4757',
  },
  subLabel: {
    color: '#8b949e',
    fontSize: '1.2rem',
    marginTop: '10px',
  },
  card: {
    backgroundColor: '#161b22',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #30363d',
  },
  tag: {
    display: 'inline-block',
    backgroundColor: 'rgba(255,71,87,0.2)',
    color: '#ff4757',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  h1: { fontSize: '2rem', color: '#fff', margin: '0 0 10px 0' },
  h2: { fontSize: '1.5rem', color: '#fff', margin: '0 0 10px 0' },
  p: { lineHeight: '1.6', fontSize: '1rem', color: '#8b949e' },
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '16px',
    marginTop: '16px',
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '14px',
    marginTop: '16px',
  },
  photoCard: {
    backgroundColor: '#0d1117',
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #30363d',
    textAlign: 'center',
  },
  photoTitle: {
    color: '#ff4757',
    fontSize: '0.9rem',
    marginBottom: '8px',
  },
  img: {
    width: '100%',
    height: '220px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  fileBtn: {
    display: 'inline-block',
    backgroundColor: '#21262d',
    color: '#58a6ff',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '0.8rem',
    cursor: 'pointer',
    border: '1px solid #30363d',
  },
  selectableCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    padding: '16px',
    borderRadius: '12px',
    border: '2px solid #30363d',
    cursor: 'pointer',
    textAlign: 'center',
  },
  selectedBadge: {
    backgroundColor: '#ff4757',
    color: '#fff',
    fontSize: '0.75rem',
    padding: '2px 8px',
    borderRadius: '8px',
    marginTop: '4px',
  },
  iconicSection: {
    textAlign: 'center',
    padding: '30px 16px',
    backgroundColor: '#0d1117',
    borderRadius: '16px',
    border: '2px dashed #ff7675',
  },
  iconicTitle: {
    fontSize: '3rem',
    fontWeight: '900',
    letterSpacing: '6px',
    color: '#ff7675',
    margin: '0',
  },
}
