import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Sparkles, 
  Camera, 
  Check, 
  Film, 
  Utensils, 
  GraduationCap, 
  Calendar, 
  Flame, 
  Wind,
  Gift,
  Key,
  ChevronDown,
  Volume2,
  VolumeX,
  HelpCircle,
  RotateCw,
  Trophy,
  Award,
  Eraser,
  RefreshCw,
  Smile
} from 'lucide-react';

const ParticleCanvas = ({ active, type = 'heart', triggerPos }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active && !triggerPos) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const startX = triggerPos ? triggerPos.x : width / 2;
    const startY = triggerPos ? triggerPos.y : height / 2;

    const count = type === 'confetti' ? 90 : type === 'sparks' ? 60 : 35;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * (type === 'confetti' ? 14 : 9),
        vy: (Math.random() - 0.7) * (type === 'confetti' ? 16 : 11),
        size: Math.random() * (type === 'confetti' ? 9 : 5) + 2,
        color: type === 'heart' 
          ? `hsl(${Math.random() * 20 + 340}, 90%, 65%)`
          : type === 'sparks' 
          ? `hsl(${Math.random() * 40 + 35}, 100%, 65%)`
          : `hsl(${Math.random() * 360}, 80%, 65%)`,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.008,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25;
        p.alpha -= p.decay;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.globalAlpha = Math.max(p.alpha, 0);
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (type === 'heart') {
          ctx.beginPath();
          const topCurveHeight = p.size * 0.3;
          ctx.moveTo(0, topCurveHeight);
          ctx.bezierCurveTo(0, 0, -p.size / 2, 0, -p.size / 2, topCurveHeight);
          ctx.bezierCurveTo(-p.size / 2, (p.size + topCurveHeight) / 2, 0, p.size, 0, p.size);
          ctx.bezierCurveTo(0, p.size, p.size / 2, (p.size + topCurveHeight) / 2, p.size / 2, topCurveHeight);
          ctx.bezierCurveTo(p.size / 2, 0, 0, 0, 0, topCurveHeight);
          ctx.fill();
        } else if (type === 'confetti') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        if (p.alpha <= 0) {
          particles.splice(index, 1);
        }
      });

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, triggerPos, type]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
};

const ScratchCard = ({ onScratchComplete }) => {
  const canvasRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchedPercent, setScratchedPercent] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.offsetWidth;
    const height = canvas.height = canvas.parentElement.offsetHeight;

    // Draw luxury metallic rose gold coating
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#f43f5e');
    grad.addColorStop(0.5, '#fda4af');
    grad.addColorStop(1, '#e11d48');
    
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative pattern/text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = '500 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Gratte doucement ici avec ton doigt ou curseur ✨', width / 2, height / 2);
  }, []);

  const scratch = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const clientX = x - rect.left;
    const clientY = y - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(clientX, clientY, 24, 0, Math.PI * 2);
    ctx.fill();

    // Check scratch ratio
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    for (let i = 3; i < imgData.data.length; i += 16) {
      if (imgData.data[i] === 0) transparentPixels++;
    }
    const percent = Math.round((transparentPixels / (imgData.data.length / 16)) * 100);
    setScratchedPercent(percent);
    if (percent > 45 && onScratchComplete) {
      onScratchComplete();
    }
  };

  const handleMouseDown = (e) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => setIsScratching(false);

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden shadow-inner cursor-pointer select-none border border-black/5">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        className="absolute inset-0 z-20 touch-none transition-opacity duration-500"
        style={{ opacity: scratchedPercent > 70 ? 0 : 1, pointerEvents: scratchedPercent > 70 ? 'none' : 'auto' }}
      />
      {/* Revealed Secret Gift Coupon Behind Coating */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-amber-50 via-rose-50 to-white flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-rose-200 rounded-2xl">
        <span className="text-xs uppercase font-mono tracking-widest text-rose-500 font-semibold mb-1">
          🎟️ Pass Anniversaire VIP
        </span>
        <h4 className="text-xl sm:text-2xl font-serif text-slate-900 font-semibold mb-2">
          Invitation Privée & Gastronomie
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 font-light max-w-sm">
          Bon valable pour : 1 Soirée Restaurant Gastronomique au choix + Séance Cinéma privée Octobre 2026.
        </p>
        <span className="mt-3 text-[11px] bg-rose-100 text-rose-700 px-3 py-1 rounded-full font-medium">
          Code Valide : 270125-SWAFI
        </span>
      </div>
    </div>
  );
};

const WheelOfFortune = ({ onWin }) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState(null);

  const prizes = [
    { label: "Massage Relaxant 💆‍♀️", color: "bg-rose-100 text-rose-900" },
    { label: "Plat Préféré Maison 🍳", color: "bg-amber-100 text-amber-900" },
    { label: "Soirée Plateau Ciné 🎬", color: "bg-slate-100 text-slate-900" },
    { label: "Week-end Surprise 🧳", color: "bg-rose-200 text-rose-950" },
    { label: "Dessert Gourmand 🍓", color: "bg-amber-200 text-amber-950" },
    { label: "Journée 100% Cocooning ☕", color: "bg-slate-200 text-slate-950" },
  ];

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setWinner(null);

    const extraSpins = 5 + Math.floor(Math.random() * 5);
    const randomSegment = Math.floor(Math.random() * prizes.length);
    const degreesPerSegment = 360 / prizes.length;
    const targetDegree = rotation + (extraSpins * 360) + (randomSegment * degreesPerSegment) + degreesPerSegment / 2;

    setRotation(targetDegree);

    setTimeout(() => {
      setSpinning(false);
      const actualWinnerIndex = prizes.length - 1 - (randomSegment % prizes.length);
      const winResult = prizes[actualWinnerIndex].label;
      setWinner(winResult);
      if (onWin) onWin(winResult);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
        {/* Wheel Indicator Pointer */}
        <div className="absolute -top-3 z-30 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-rose-500 drop-shadow-md" />

        {/* Rotating SVG Wheel */}
        <div 
          className="w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden transition-transform duration-[4000ms] ease-[cubic-bezier(0.15,0.9,0.2,1)] relative"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {prizes.map((p, idx) => {
            const angle = (360 / prizes.length) * idx;
            return (
              <div
                key={idx}
                className="absolute w-1/2 h-1/2 top-0 right-0 origin-bottom-left flex items-center justify-center pt-4"
                style={{
                  transform: `rotate(${angle}deg)`,
                  clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                  backgroundColor: idx % 2 === 0 ? '#FFE4E6' : '#FEF3C7'
                }}
              >
                <span className="text-[10px] sm:text-xs font-medium text-slate-800 -rotate-45 translate-x-3 -translate-y-2 text-center max-w-[80px]">
                  {p.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Center Button */}
        <button
          onClick={spin}
          disabled={spinning}
          className="absolute z-20 w-16 h-16 rounded-full bg-white border border-rose-200 shadow-lg flex items-center justify-center text-rose-500 font-semibold text-xs tracking-wider uppercase hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          {spinning ? '...' : 'TOURNER'}
        </button>
      </div>

      {winner && (
        <div className="p-4 bg-white border border-rose-200 rounded-2xl shadow-sm text-center animate-scale-up max-w-sm">
          <p className="text-xs text-rose-500 uppercase font-semibold tracking-wider">Résultat du tirage 🎉</p>
          <h4 className="text-lg font-serif text-slate-900 font-medium mt-1">{winner}</h4>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [phase, setPhase] = useState('countdown');
  const [countdownNum, setCountdownNum] = useState(3);
  
  const [isMuted, setIsMuted] = useState(true);

  // FX States
  const [clickPos, setClickPos] = useState(null);
  const [fxTrigger, setFxTrigger] = useState(0);
  const [fxType, setFxType] = useState('heart');

  // Interactive Game States
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [backpackUnlocked, setBackpackUnlocked] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);

  // Quiz Game State
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});

  // Photos State
  const [photos, setPhotos] = useState({
    before: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1000&auto=format&fit=crop&q=80',
    today: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&auto=format&fit=crop&q=80',
    encounter: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1000&auto=format&fit=crop&q=80',
    couple: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1000&auto=format&fit=crop&q=80',
  });

  useEffect(() => {
    if (phase === 'countdown') {
      if (countdownNum > 0) {
        const timer = setTimeout(() => setCountdownNum(prev => prev - 1), 900);
        return () => clearTimeout(timer);
      } else {
        setPhase('reveal');
      }
    } else if (phase === 'reveal') {
      const timer = setTimeout(() => {
        setPhase('main');
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [countdownNum, phase]);

  const handleImageUpload = (key, event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotos(prev => ({ ...prev, [key]: url }));
    }
  };

  const triggerBurst = (e, type = 'heart') => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;
    setClickPos({ x, y });
    setFxType(type);
    setFxTrigger(prev => prev + 1);
  };

  const toggleMeal = (id) => {
    if (selectedMeals.includes(id)) {
      setSelectedMeals(selectedMeals.filter(m => m !== id));
    } else if (selectedMeals.length < 3) {
      setSelectedMeals([...selectedMeals, id]);
    }
  };

  const toggleMovie = (id) => {
    if (selectedMovies.includes(id)) {
      setSelectedMovies(selectedMovies.filter(m => m !== id));
    } else {
      setSelectedMovies([...selectedMovies, id]);
    }
  };

  const handleBlowCandle = (e) => {
    triggerBurst(e, 'sparks');
    setCandlesBlown(!candlesBlown);
  };

  const quizQuestions = [
    {
      id: 1,
      question: "Quelle était la météo lors de notre premier rendez-vous le 27 Janvier ?",
      options: [
        { text: "Un soleil éclatant d'hiver ☀️", isCorrect: false },
        { text: "Une pluie douce & romantique 🌧️", isCorrect: true },
        { text: "Un ciel dégagé & frais ☁️", isCorrect: false }
      ]
    },
    {
      id: 2,
      question: "Qui dit ou mentionne 'Sac à dos' en premier lors des sorties ?",
      options: [
        { text: "Toi (Swafi), c'est ton expression culte ! 🎒", isCorrect: true },
        { text: "Moi, toujours à anticiper 🧭", isCorrect: false },
        { text: "On le crie en même temps ! 🗣️", isCorrect: false }
      ]
    },
    {
      id: 3,
      question: "Quel film programmation 2026 est en tête de notre liste ?",
      options: [
        { text: "Klara et le Soleil ☀️", isCorrect: false },
        { text: "Clayface 🎬", isCorrect: true },
        { text: "Wife and Dog 🐾", isCorrect: false }
      ]
    }
  ];

  const handleQuizSelect = (qId, optionIdx, isCorrect, e) => {
    if (quizAnswers[qId] !== undefined) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      triggerBurst(e, 'heart');
    }
  };

  const mealsList = [
    { id: 1, name: 'Sushis préparés minute', sub: 'Frais, purs, équilibre parfait' },
    { id: 2, name: 'Pizza au feu de bois', sub: 'Pâte alvéolée & burrata fondante' },
    { id: 3, name: 'Tacos street-food', sub: 'Épicés juste comme tu aimes' },
    { id: 4, name: 'Burger artisan gourmet', sub: 'Pain brioché & frites maison' },
    { id: 5, name: 'Brunch sucré-salé', sub: 'Pancakes moelleux & avocado toast' },
    { id: 6, name: 'Ramen traditionnel', sub: 'Bouillon miroitant mijoté 12h' },
    { id: 7, name: 'Grillades au feu de bois', sub: 'Saveurs fumées délicates' },
    { id: 8, name: 'Plat traditionnel raffiné', sub: 'La chaleur des recettes d’autrefois' },
    { id: 9, name: 'Dîner gastronomique', sub: 'Accord mets & ambiance tamisée' },
  ];

  const moviesList = [
    { id: 1, title: 'Clayface', date: '21 Octobre 2026', desc: 'Le thriller sombre & immersif très attendu' },
    { id: 2, title: 'Klara et le Soleil', date: '21 Octobre 2026', desc: 'Poésie visuelle & drame futuriste' },
    { id: 3, title: 'The Social Reckoning', date: '7 Octobre 2026', desc: 'Histoire captivante signée Aaron Sorkin' },
    { id: 4, title: 'Ducobu et le fantôme', date: '7 Octobre 2026', desc: 'Moment de détente & rigolade garantie' },
    { id: 5, title: 'Les Misérables', date: '14 Octobre 2026', desc: 'Grande fresque émotionnelle' },
    { id: 6, title: 'Karma', date: '21 Octobre 2026', desc: 'Nouveau film poignant de Guillaume Canet' },
    { id: 7, title: 'Street Fighter', date: '14 Octobre 2026', desc: 'Séance d’action effrénée & rétro' },
    { id: 8, title: 'Wife And Dog', date: '28 Octobre 2026', desc: 'Comédie noire signée Guy Ritchie' },
    { id: 9, title: 'Shaun le Mouton : Halloween', date: '21 Octobre 2026', desc: 'Cocooning & animation réconfortante' },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans selection:bg-rose-100 selection:text-rose-900 relative overflow-x-hidden">
      
      {/* Particle Effects Canvas */}
      <ParticleCanvas active={fxTrigger > 0} type={fxType} triggerPos={clickPos} />

      {/* Subtle Background Glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-rose-200/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[700px] h-[700px] bg-amber-100/30 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Header Bar */}
      <header className="fixed top-6 right-6 z-40 flex items-center gap-3">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-3 bg-white/70 hover:bg-white border border-black/5 shadow-sm rounded-full backdrop-blur-md transition-all duration-300 text-slate-600 hover:scale-105 active:scale-95"
          title={isMuted ? "Activer l'ambiance sonore" : "Couper le son"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-rose-500 animate-pulse" />}
        </button>
      </header>

      {}
      {phase !== 'main' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FBFBFD] transition-opacity duration-1000">
          {phase === 'countdown' ? (
            <div className="text-center space-y-6 animate-fade-in">
              <span className="text-8xl sm:text-9xl font-serif font-light text-rose-500 tracking-tighter transition-all duration-300">
                {countdownNum}
              </span>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400 font-medium">
                Préparation de ton espace secret...
              </p>
            </div>
          ) : (
            <div className="text-center space-y-4 px-6 animate-scale-up">
              <span className="inline-block px-4 py-1.5 bg-rose-50 border border-rose-200/60 text-rose-600 text-xs tracking-widest uppercase rounded-full mb-2">
                27 Janvier &bull; Code 270125
              </span>
              <h1 className="text-4xl sm:text-6xl font-serif font-normal text-slate-900 tracking-tight">
                Joyeux Anniversaire, <span className="italic text-rose-500">Swafwata</span>
              </h1>
              <p className="text-slate-500 text-base font-light max-w-md mx-auto">
                Tout ce qui suit a été créé sur-mesure pour célébrer ta journée.
              </p>
            </div>
          )}
        </div>
      )}

      {}
      <main className="w-full">

        {/* ---------------- SECTION 1: HERO ---------------- */}
        <section className="min-h-screen w-full flex flex-col justify-between items-center px-6 py-12 relative">
          <div />

          <div className="max-w-4xl mx-auto text-center space-y-8 my-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 border border-black/5 text-xs text-slate-600 font-medium tracking-wide">
              <Key size={14} className="text-amber-500" />
              <span>Accès réservé &bull; Code 270125 Validé</span>
            </div>

            <h1 
              onClick={(e) => triggerBurst(e, 'heart')}
              className="text-5xl sm:text-7xl lg:text-8xl font-serif font-light tracking-tight text-slate-900 leading-[1.08] cursor-pointer select-none group"
            >
              Félicitations, <br />
              <span className="italic text-rose-500 font-normal relative inline-block group-hover:scale-105 transition-transform duration-300">
                Swafwata
                <span className="absolute left-0 bottom-1 w-full h-[3px] bg-rose-200 rounded-full -z-10" />
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
              Tu as déverrouillé ton espace. Un havre de douceur pensé dans les moindres détails pour marquer ton anniversaire et nos moments précieux.
            </p>

            <div className="pt-4">
              <button 
                onClick={(e) => triggerBurst(e, 'heart')}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors duration-300 cursor-pointer"
              >
                <Heart size={14} className="text-rose-400 fill-rose-100" />
                <span>Clique sur ton prénom pour une attention</span>
              </button>
            </div>
          </div>

          <div className="animate-bounce text-slate-300 pb-4">
            <ChevronDown size={24} />
          </div>
        </section>

        {}
        <section className="min-h-screen w-full flex items-center justify-center px-6 py-20 bg-rose-50/40 backdrop-blur-sm border-y border-black/5">
          <div className="max-w-4xl w-full mx-auto space-y-12">
            
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <div className="inline-flex items-center gap-2 text-rose-500 text-xs uppercase tracking-widest font-semibold">
                <HelpCircle size={14} />
                <span>Mini-Jeu 1</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-slate-900">
                Quiz de Notre Histoire
              </h2>
              <p className="text-slate-500 font-light text-sm sm:text-base">
                Teste tes souvenirs avec ces quelques questions douces et complices.
              </p>
            </div>

            <div className="space-y-8">
              {quizQuestions.map((q) => (
                <div key={q.id} className="p-6 sm:p-8 bg-white rounded-3xl border border-black/5 shadow-sm space-y-4">
                  <h3 className="font-serif text-lg sm:text-xl text-slate-800 font-medium">
                    {q.id}. {q.question}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {q.options.map((opt, idx) => {
                      const isSelected = quizAnswers[q.id] === idx;
                      return (
                        <button
                          key={idx}
                          onClick={(e) => handleQuizSelect(q.id, idx, opt.isCorrect, e)}
                          className={`p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all ${
                            isSelected
                              ? opt.isCorrect 
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium'
                                : 'bg-rose-50 border-rose-300 text-rose-900 font-medium'
                              : 'bg-[#FBFBFD] border-black/5 hover:border-rose-200 hover:bg-white text-slate-700'
                          }`}
                        >
                          {opt.text}
                          {isSelected && (
                            <span className="block mt-2 font-mono text-[10px] uppercase">
                              {opt.isCorrect ? '✓ Exact !' : '✨ Doux souvenir'}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {Object.keys(quizAnswers).length === quizQuestions.length && (
              <div className="p-6 bg-white border border-rose-200 rounded-3xl text-center space-y-2 animate-scale-up">
                <span className="text-2xl">🏆</span>
                <h4 className="font-serif text-xl text-slate-900 font-medium">
                  Score : {quizScore} / {quizQuestions.length} !
                </h4>
                <p className="text-xs text-slate-500">
                  Merci d'écrire ces si beaux souvenirs jour après jour.
                </p>
              </div>
            )}

          </div>
        </section>

        {/* ---------------- SECTION 2: AVANT / APRÈS (GALLERY) ---------------- */}
        <section className="min-h-screen w-full flex items-center justify-center px-6 py-20 bg-white/60 backdrop-blur-sm border-b border-black/5">
          <div className="max-w-6xl w-full mx-auto space-y-16">
            
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <span className="text-xs uppercase tracking-[0.25em] text-rose-500 font-semibold">
                Mémoires & Évolution
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-slate-900">
                Le fil de nos souvenirs
              </h2>
              <p className="text-slate-500 font-light text-sm sm:text-base">
                Chaque étape a sa beauté. Tu peux importer tes photos préférées directement ci-dessous.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
              
              {/* PHOTO 1: AVANT */}
              <div className="group relative bg-[#FBFBFD] border border-black/5 rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden relative bg-slate-100">
                  <img 
                    src={photos.before} 
                    alt="Photo Avant" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <label className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-slate-800 p-3 rounded-full shadow-lg backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-110">
                    <Camera size={18} />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleImageUpload('before', e)} 
                    />
                  </label>
                </div>
                <div className="pt-4 px-2 flex justify-between items-center">
                  <div>
                    <h3 className="font-serif text-lg text-slate-800">Avant</h3>
                    <p className="text-xs text-slate-400">Les tout premiers instants</p>
                  </div>
                  <span className="text-xs font-mono text-slate-300">01 / 02</span>
                </div>
              </div>

              {/* PHOTO 2: AUJOURD'HUI */}
              <div className="group relative bg-[#FBFBFD] border border-black/5 rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden relative bg-slate-100">
                  <img 
                    src={photos.today} 
                    alt="Photo Aujourd'hui" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <label className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-slate-800 p-3 rounded-full shadow-lg backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-110">
                    <Camera size={18} />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleImageUpload('today', e)} 
                    />
                  </label>
                </div>
                <div className="pt-4 px-2 flex justify-between items-center">
                  <div>
                    <h3 className="font-serif text-lg text-slate-800">Aujourd'hui</h3>
                    <p className="text-xs text-rose-500 font-medium">Rayonnante & accomplie</p>
                  </div>
                  <span className="text-xs font-mono text-slate-300">02 / 02</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {}
        <section className="min-h-screen w-full flex items-center justify-center px-6 py-20">
          <div className="max-w-3xl w-full mx-auto space-y-10 text-center">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-rose-500 text-xs uppercase tracking-widest font-semibold">
                <Eraser size={14} />
                <span>Mini-Jeu 2</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-slate-900">
                La Boîte à Souvenirs Secret
              </h2>
              <p className="text-slate-500 font-light text-sm sm:text-base max-w-md mx-auto">
                Gratte délicatement la surface ci-dessous pour découvrir la surprise personnalisée réservée pour toi.
              </p>
            </div>

            <ScratchCard onScratchComplete={() => setFxTrigger(prev => prev + 1)} />

          </div>
        </section>

        {/* ---------------- SECTION 3: MASTER CONGRATULATIONS ---------------- */}
        <section className="min-h-[80vh] w-full flex items-center justify-center px-6 py-20 relative overflow-hidden bg-white/40">
          <div className="max-w-4xl w-full mx-auto text-center space-y-8 relative z-10">
            
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 border border-rose-200/60 flex items-center justify-center text-rose-500 shadow-sm">
              <GraduationCap size={28} />
            </div>

            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400 font-medium">
                Accomplissement
              </span>
              <h2 className="text-4xl sm:text-6xl font-serif font-light text-slate-900">
                Bravo pour ton <span className="italic font-normal text-rose-500">Master</span>
              </h2>
            </div>

            <p className="text-base sm:text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
              Ton travail, ta persévérance et ton intelligence ont porté leurs fruits. Obtenir ton diplôme de Master est une étape immense. Je suis profondément fier de te voir franchir ce sommet avec autant de grâce et de brillance.
            </p>

            <div className="pt-4 inline-block">
              <div className="px-6 py-3 rounded-full bg-white border border-black/5 shadow-sm text-xs font-medium text-slate-600 tracking-wide">
                🎓 Diplômée &bull; Fierté Absolue
              </div>
            </div>

          </div>
        </section>

        {}
        <section className="min-h-screen w-full flex items-center justify-center px-6 py-20 bg-amber-50/30 border-y border-black/5">
          <div className="max-w-4xl w-full mx-auto space-y-12">
            
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <div className="inline-flex items-center gap-2 text-rose-500 text-xs uppercase tracking-widest font-semibold">
                <RefreshCw size={14} />
                <span>Mini-Jeu 3</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-slate-900">
                La Roue des Attentions
              </h2>
              <p className="text-slate-500 font-light text-sm sm:text-base">
                Fais tourner la roue pour découvrir l'attention spéciale à concrétiser !
              </p>
            </div>

            <WheelOfFortune onWin={(prize) => triggerBurst({ currentTarget: { getBoundingClientRect: () => ({ left: window.innerWidth/2, top: window.innerHeight/2, width: 0, height: 0 }) } }, 'confetti')} />

          </div>
        </section>

        {/* ---------------- SECTION 4: MENU DE RETROUVAILLES ---------------- */}
        <section className="min-h-screen w-full flex items-center justify-center px-6 py-20 bg-white/60 backdrop-blur-sm border-b border-black/5">
          <div className="max-w-5xl w-full mx-auto space-y-12">
            
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <div className="inline-flex items-center gap-2 text-rose-500 text-xs uppercase tracking-widest font-semibold">
                <Utensils size={14} />
                <span>Prochaine Retrouvaille</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-slate-900">
                Le Menu Gourmand
              </h2>
              <p className="text-slate-500 font-light text-sm sm:text-base">
                Choisis 3 repas parmi les 9 propositions ci-dessous pour notre prochain rendez-vous. ({selectedMeals.length}/3 sélectionnés)
              </p>
            </div>

            {/* 9 Meals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mealsList.map((meal) => {
                const isSelected = selectedMeals.includes(meal.id);
                return (
                  <div
                    key={meal.id}
                    onClick={() => toggleMeal(meal.id)}
                    className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer select-none flex flex-col justify-between h-36 ${
                      isSelected 
                        ? 'bg-rose-50/80 border-rose-300 shadow-sm scale-[1.02]' 
                        : 'bg-[#FBFBFD] border-black/5 hover:border-black/15 hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className={`font-serif text-base ${isSelected ? 'text-rose-900 font-medium' : 'text-slate-800'}`}>
                        {meal.name}
                      </h3>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-rose-500 border-rose-500 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check size={12} />}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 font-light">
                      {meal.sub}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ---------------- SECTION 5: SIGNIFICATION CODE 270125 + PHOTO ---------------- */}
        <section className="min-h-screen w-full flex items-center justify-center px-6 py-20">
          <div className="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-rose-500 font-semibold">
                La Date Clé &bull; 270125
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-slate-900 leading-tight">
                Le secret du code <br />
                <span className="italic font-normal text-rose-500">27 Janvier 2025</span>
              </h2>
              <p className="text-slate-600 font-light leading-relaxed text-base sm:text-lg">
                Ce code représente le 27 Janvier 2025 : le jour de notre rencontre, exactement 3 ans après l'obtention du baccalauréat. Une coïncidence magique gravée pour toujours.
              </p>
              
              <div className="pt-2">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-black/5 shadow-sm text-xs text-slate-500">
                  <Calendar size={16} className="text-rose-400" />
                  <span>27.01.2025 — Jour mémorable</span>
                </div>
              </div>
            </div>

            {/* Photo Rencontre */}
            <div className="bg-white border border-black/5 rounded-3xl p-4 shadow-sm">
              <div className="aspect-square w-full rounded-2xl overflow-hidden relative bg-slate-100">
                <img 
                  src={photos.encounter} 
                  alt="Photo Rencontre" 
                  className="w-full h-full object-cover"
                />
                <label className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-slate-800 p-3 rounded-full shadow-lg backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-110">
                  <Camera size={18} />
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleImageUpload('encounter', e)} 
                  />
                </label>
              </div>
              <p className="text-center text-xs text-slate-400 pt-3">
                Photo du jour de notre rencontre
              </p>
            </div>

          </div>
        </section>

        {/* ---------------- SECTION 6: EASTER EGG SAC À DOS ---------------- */}
        <section className="min-h-[70vh] w-full flex items-center justify-center px-6 py-20 bg-slate-900 text-white relative overflow-hidden">
          <div 
            onClick={() => setBackpackUnlocked(!backpackUnlocked)}
            className="max-w-2xl w-full mx-auto text-center space-y-6 cursor-pointer p-10 rounded-3xl border border-white/10 hover:border-rose-500/50 transition-all duration-500 bg-slate-950/40 backdrop-blur-md group"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-rose-400 font-medium">
              Easter Egg Indémodable
            </span>

            <h2 className="text-5xl sm:text-7xl font-serif font-light tracking-widest text-white group-hover:text-rose-300 transition-colors">
              SAC À DOS
            </h2>

            <p className="text-xs text-slate-400 tracking-widest font-mono">
              {backpackUnlocked ? "🔒 Souvenir déverrouillé" : "(Clique sur le titre si tu te souviens)"}
            </p>

            {backpackUnlocked && (
              <p className="text-base sm:text-lg font-serif italic text-rose-200 pt-4 animate-fade-in leading-relaxed">
                "Peu importe la destination ou le chemin, du moment qu'on a notre sac à dos et tous nos beaux souvenirs gravés ensemble."
              </p>
            )}
          </div>
        </section>

        {/* ---------------- SECTION 7: CINÉMA OCTOBRE 2026 ---------------- */}
        <section className="min-h-screen w-full flex items-center justify-center px-6 py-20 bg-white/60 backdrop-blur-sm border-b border-black/5">
          <div className="max-w-5xl w-full mx-auto space-y-12">
            
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <div className="inline-flex items-center gap-2 text-rose-500 text-xs uppercase tracking-widest font-semibold">
                <Film size={14} />
                <span>Programmation Octobre 2026</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-slate-900">
                Nos Séances Cinéma
              </h2>
              <p className="text-slate-500 font-light text-sm sm:text-base">
                Inclus le très attendu <em>Clayface</em> ! Sélectionne les films que tu veux qu'on aille voir ensemble.
              </p>
            </div>

            {/* 9 Movies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {moviesList.map((movie) => {
                const isSelected = selectedMovies.includes(movie.id);
                return (
                  <div
                    key={movie.id}
                    onClick={() => toggleMovie(movie.id)}
                    className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer select-none flex flex-col justify-between h-40 ${
                      isSelected 
                        ? 'bg-rose-50/80 border-rose-300 shadow-sm scale-[1.02]' 
                        : 'bg-[#FBFBFD] border-black/5 hover:border-black/15 hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className={`font-serif text-base ${isSelected ? 'text-rose-900 font-medium' : 'text-slate-800'}`}>
                          {movie.title}
                        </h3>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                          {movie.date}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-light mt-1">
                        {movie.desc}
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        isSelected ? 'bg-rose-500 text-white' : 'text-slate-400 bg-slate-100'
                      }`}>
                        {isSelected ? 'Réservé ✓' : 'Sélectionner'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ---------------- SECTION 8: MOT D'AMOUR & PHOTO COUPLE ---------------- */}
        <section className="min-h-screen w-full flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl w-full mx-auto text-center space-y-12">
            
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] text-rose-500 font-semibold">
                Sincèrement
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-slate-900">
                Un mot du cœur
              </h2>
            </div>

            <p className="text-xl sm:text-2xl font-serif italic text-slate-700 leading-relaxed max-w-2xl mx-auto">
              "Swafwata, ta présence illumine les journées. Ta gentillesse, ton sourire et ton élégance font de toi une personne profondément unique. Merci d'être toi."
            </p>

            {/* Photo Couple */}
            <div className="max-w-md mx-auto bg-white border border-black/5 rounded-3xl p-4 shadow-sm">
              <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden relative bg-slate-100">
                <img 
                  src={photos.couple} 
                  alt="Photo de Couple" 
                  className="w-full h-full object-cover"
                />
                <label className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-slate-800 p-3 rounded-full shadow-lg backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-110">
                  <Camera size={18} />
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleImageUpload('couple', e)} 
                  />
                </label>
              </div>
              <p className="text-center text-xs text-slate-400 pt-3">
                Notre souvenir ensemble
              </p>
            </div>

          </div>
        </section>

        {/* ---------------- SECTION 9: GÂTEAU D'ANNIVERSAIRE INTERACTIF ---------------- */}
        <section className="min-h-screen w-full flex items-center justify-center px-6 py-20 bg-white/60 backdrop-blur-sm border-t border-black/5">
          <div className="max-w-2xl w-full mx-auto text-center space-y-8">
            
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-rose-500 font-semibold">
                Fais un vœu
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-slate-900">
                Joyeux Anniversaire Swafi
              </h2>
            </div>

            {/* Candle Graphic */}
            <div className="py-8 flex flex-col items-center justify-center">
              <div className="relative">
                {!candlesBlown ? (
                  <div className="animate-bounce mb-2 text-amber-500 flex justify-center">
                    <Flame size={48} className="fill-amber-400 animate-pulse" />
                  </div>
                ) : (
                  <div className="mb-2 text-slate-300 flex justify-center animate-fade-in">
                    <Wind size={48} />
                  </div>
                )}
                <div className="w-12 h-32 bg-slate-100 border border-black/5 rounded-t-lg mx-auto shadow-inner" />
                <div className="w-48 h-12 bg-rose-100 border border-rose-200 rounded-lg mx-auto -mt-2 shadow-sm flex items-center justify-center text-rose-400">
                  <Gift size={20} />
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={handleBlowCandle}
                className={`px-8 py-4 rounded-full font-medium text-sm tracking-wide transition-all duration-300 shadow-sm ${
                  candlesBlown 
                    ? 'bg-slate-900 text-white hover:bg-slate-800' 
                    : 'bg-rose-500 text-white hover:bg-rose-600 hover:scale-105'
                }`}
              >
                {candlesBlown ? 'Rallumer la bougie 🕯️' : 'Souffler la bougie 💨'}
              </button>
            </div>

            {candlesBlown && (
              <div className="p-8 bg-rose-50/60 border border-rose-200/60 rounded-3xl animate-scale-up space-y-2">
                <h3 className="font-serif text-xl text-rose-900">
                  ✨ Vœu exaucé !
                </h3>
                <p className="text-sm text-slate-600 font-light max-w-md mx-auto">
                  Que cette année t'apporte de la joie, de belles surprises, du bonheur et la réussite dans chacun de tes projets.
                </p>
              </div>
            )}

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-black/5 text-center text-xs text-slate-400 font-light tracking-widest uppercase">
        Pour Swafwata &bull; Joyeux Anniversaire
      </footer>

    </div>
  );
}
