import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Sparkles, Lock, Unlock, Volume2, VolumeX, Gift, Flame, 
  ArrowLeft, Code, User, Briefcase, Mail, Terminal, ChevronRight, 
  Star, Award, CheckCircle, FlameKindling, RefreshCw, Send, Check
} from 'lucide-react';

// Preloader component with progress animation
function Loader({ onLoaded }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoaded, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080811] text-white font-mono">
      <div className="w-64 space-y-4 text-center">
        <div className="flex items-center justify-center gap-2 text-rose-500 font-bold text-lg">
          <Terminal className="w-5 h-5 animate-pulse" />
          <span>dayar.saifidine</span>
        </div>
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-rose-900/40">
          <div 
            className="h-full bg-gradient-to-r from-rose-500 to-purple-600 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>INITIALIZING...</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}

// Easter Egg Birthday Surprise Component
function TempPage({ onClose }) {
  const [unlocked, setUnlocked] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [audioMuted, setAudioMuted] = useState(true);
  const [candleStates, setCandleStates] = useState([true, true, true]);
  const [flippedCards, setFlippedCards] = useState({});
  const [redeemedCoupons, setRedeemedCoupons] = useState({});
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [currentCompliment, setCurrentCompliment] = useState('');

  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const particlesRef = useRef([]);

  const letterText = "Joyeux anniversaire Swafi ! J'ai voulu créer cet easter egg secret sur mon portfolio parce que tu occupes une place unique dans ma vie. Que cette nouvelle année t'apporte autant de joie et de bonheur que tu m'en donnes chaque jour. Merci d'être à mes côtés ! ❤️";

  const compliments = [
    "Tu es le plus beau bug de ma vie, celui que je ne voudrais jamais corriger ! ❤️",
    "Ton sourire illumine chacune de mes journées.",
    "Merci d'être cette personne exceptionnelle (et bizarre) remplie de douceur.",
    "Avec toi, chaque moment devient un précieux souvenir. Voilà pourquoi une année de proximité avec toi nous paresse comme des années.",
  ];

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  };

  const playSynthSound = (type) => {
    if (audioMuted) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'unlock') {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(0.15, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.3);
        });
      } else if (type === 'heart') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(349.23, now);
        osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.2);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  const toggleAudio = () => {
    if (audioMuted) {
      initAudio();
      setAudioMuted(false);
      playSynthSound('unlock');
    } else {
      setAudioMuted(true);
    }
  };

  const unlockSecretQuest = () => {
    playSynthSound('unlock');
    setUnlocked(true);
    triggerHeartBurst();
  };

  useEffect(() => {
    if (unlocked && typewriterIndex < letterText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + letterText.charAt(typewriterIndex));
        setTypewriterIndex((prev) => prev + 1);
      }, 35);
      return () => clearTimeout(timeout);
    }
  }, [unlocked, typewriterIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor(x, y, isHeart = true) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || canvas.height + 20;
        this.isHeart = isHeart;
        this.size = Math.random() * 12 + 8;
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = isHeart ? -(Math.random() * 2 + 1) : (Math.random() - 0.5) * 8;
        this.alpha = 1;
        this.decay = Math.random() * 0.01 + 0.005;
        this.color = ['#f43f5e', '#ec4899', '#a855f7', '#fb7185', '#f59e0b'][Math.floor(Math.random() * 5)];
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;

        if (this.isHeart) {
          ctx.beginPath();
          const topCurveHeight = this.size * 0.3;
          ctx.moveTo(this.x, this.y + topCurveHeight);
          ctx.bezierCurveTo(this.x, this.y, this.x - this.size / 2, this.y, this.x - this.size / 2, this.y + topCurveHeight);
          ctx.bezierCurveTo(this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, this.x, this.y + this.size, this.x, this.y + this.size);
          ctx.bezierCurveTo(this.x, this.y + this.size, this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, this.x + this.size / 2, this.y + topCurveHeight);
          ctx.bezierCurveTo(this.x + this.size / 2, this.y, this.x, this.y, this.x, this.y + topCurveHeight);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size / 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.alpha <= 0 || p.y < -20) {
          particlesRef.current.splice(index, 1);
        }
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const interval = setInterval(() => {
      if (unlocked && particlesRef.current.length < 35) {
        particlesRef.current.push(new Particle(Math.random() * canvas.width, canvas.height + 10, true));
      }
    }, 600);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, [unlocked]);

  const triggerHeartBurst = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    for (let i = 0; i < 40; i++) {
      particlesRef.current.push(new (class {
        constructor() {
          this.x = canvas.width / 2 + (Math.random() - 0.5) * 300;
          this.y = canvas.height / 2 + (Math.random() - 0.5) * 200;
          this.isHeart = true;
          this.size = Math.random() * 12 + 8;
          this.vx = (Math.random() - 0.5) * 3;
          this.vy = -(Math.random() * 2 + 1);
          this.alpha = 1;
          this.decay = Math.random() * 0.01 + 0.005;
          this.color = ['#f43f5e', '#ec4899', '#a855f7', '#fb7185', '#f59e0b'][Math.floor(Math.random() * 5)];
        }
        draw() {
          const ctx = canvas.getContext('2d');
          ctx.save();
          ctx.globalAlpha = this.alpha;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          const topCurveHeight = this.size * 0.3;
          ctx.moveTo(this.x, this.y + topCurveHeight);
          ctx.bezierCurveTo(this.x, this.y, this.x - this.size / 2, this.y, this.x - this.size / 2, this.y + topCurveHeight);
          ctx.bezierCurveTo(this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, this.x, this.y + this.size, this.x, this.y + this.size);
          ctx.bezierCurveTo(this.x, this.y + this.size, this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, this.x + this.size / 2, this.y + topCurveHeight);
          ctx.bezierCurveTo(this.x + this.size / 2, this.y, this.x, this.y, this.x, this.y + topCurveHeight);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
        update() {
          this.x += this.vx;
          this.y += this.vy;
          this.alpha -= this.decay;
        }
      })());
    }
  };

  const toggleCard = (id) => {
    playSynthSound('click');
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCandle = (index) => {
    playSynthSound('click');
    setCandleStates((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const lightAllCandles = () => {
    playSynthSound('unlock');
    setCandleStates([true, true, true]);
  };

  const blowOutCandles = () => {
    playSynthSound('heart');
    setCandleStates([false, false, false]);
    triggerHeartBurst();
  };

  const generateRandomCompliment = () => {
    playSynthSound('heart');
    const random = compliments[Math.floor(Math.random() * compliments.length)];
    setCurrentCompliment(random);
    triggerHeartBurst();
  };

  const redeemCoupon = (id) => {
    playSynthSound('unlock');
    setRedeemedCoupons((prev) => ({ ...prev, [id]: true }));
    triggerHeartBurst();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080811] text-gray-100 font-sans selection:bg-rose-500 selection:text-white">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#12121e]/80 backdrop-blur-md border-b border-rose-900/30 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 group transition-all text-xs sm:text-sm font-mono text-gray-300 hover:text-rose-400"
        >
          <span className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </span>
          <span>
            dayar.saifidine.portfolio<span className="text-rose-500 font-bold">/secret/love.sh</span>
          </span>
        </button>

        <div className="flex items-center gap-3">
          {unlocked && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/40 text-xs text-rose-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span>PROTOCOL: EASTER_EGG_270825</span>
            </div>
          )}

          <button
            onClick={toggleAudio}
            className={`p-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-2 ${
              audioMuted
                ? 'bg-gray-900 border-gray-700 text-gray-400'
                : 'bg-rose-950/80 border-rose-500 text-rose-400'
            }`}
          >
            {audioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{audioMuted ? 'Audio Off' : 'Audio On'}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8 space-y-10">
        {!unlocked ? (
          <div className="my-12 p-6 sm:p-10 rounded-3xl bg-[#12121e]/90 border border-rose-500/40 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                <span className="ml-2 font-mono text-xs text-rose-400">dayar@portfolio: ~/secret-easter-egg</span>
              </div>
              <span className="font-mono text-xs text-rose-400 flex items-center gap-1">
                <Lock className="w-3 h-3" /> ENCRYPTED SESSION
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs sm:text-sm">
              <p className="text-rose-400 font-bold">[PORTFOLIO SECURITY] Zone Confidentielle Détectée.</p>
              <p className="text-gray-300">
                Vous avez exécuté le code secret <strong className="text-rose-400">270825</strong> sur le site de Dayar Saifidine !
              </p>
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/40 text-rose-200">
                <p className="font-bold">🔑 Mot de passe requis pour continuer :</p>
                <p className="text-gray-400 italic">Tapez "love" ou cliquez sur le bouton ci-dessous.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="password"
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && unlockSecretQuest()}
                  placeholder="Mot de passe..."
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-900 border border-rose-500/40 text-rose-200 focus:outline-none focus:border-rose-400 font-mono"
                />
                <button
                  onClick={unlockSecretQuest}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-rose-600/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
                  <span>Ouvrir la Surprise</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-12 animate-fade-in">
            {/* Romantic Banner */}
            <section className="text-center space-y-4 pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-medium">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" /> Easter Egg Anniversaire Spécial
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300">
                Joyeux Anniversaire Mon sac à dos ! ❤️
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                Tu as déverrouillé la page cachée de mon portfolio avec notre code magique (Devine ce qu'il signifie) !
              </p>
            </section>

            {/* Chapter 1: Memory Cards */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold font-mono">01</div>
                <h2 className="text-xl sm:text-2xl font-bold">Nos Souvenirs & Stats</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 1, tag: '[COMMIT #001]', title: 'Trois ans plus tard...', desc: '"Depuis ce jour là, tu illumines mon quotidien. Rien n\'est plus précieux que le son de ton rire."' },
                  { id: 2, tag: '[METRIC: INFINITY]', title: 'Stats de notre Couple', desc: '"Tu es la seule personne qui sait apaiser mes journées. Jours Aimés: ∞, Bugs: 0."' },
                  { id: 3, tag: '[FUTURE_RELEASE]', title: 'Avenir', desc: '"Que cette nouvelle année de ta vie soit remplie de rires avec ton neveu (Et le nouveau), de voyages et de bonheur avec tes proches!"' }
                ].map((card) => (
                  <div
                    key={card.id}
                    onClick={() => toggleCard(card.id)}
                    className="cursor-pointer h-56 p-6 rounded-2xl bg-[#12121e]/80 border border-rose-900/40 hover:border-rose-500/60 transition-all flex flex-col justify-between shadow-xl relative overflow-hidden"
                  >
                    {flippedCards[card.id] ? (
                      <div className="my-auto text-center space-y-3">
                        <p className="text-sm italic text-rose-200">{card.desc}</p>
                        <span className="text-[10px] font-mono text-rose-400 uppercase">★ Clic pour retourner</span>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <span className="text-xs font-mono text-rose-400 font-bold">{card.tag}</span>
                          <h3 className="text-lg font-bold text-white">{card.title}</h3>
                        </div>
                        <div className="text-xs font-mono text-rose-300 flex justify-between items-center border-t border-gray-800 pt-3">
                          <span>Cliquez pour révéler</span>
                          <RefreshCw className="w-3.5 h-3.5" />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Chapter 2: Love Syntax & Typewriter */}
            <section className="p-6 sm:p-8 rounded-3xl bg-[#12121e]/80 border border-rose-500/30 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold font-mono">02</div>
                  <h2 className="text-xl sm:text-2xl font-bold">Love Syntax : Ma lettre pour toi</h2>
                </div>
                <button
                  onClick={generateRandomCompliment}
                  className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  <span>Clique pour voir...</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-gray-950/80 border border-rose-900/40 font-mono text-xs sm:text-sm space-y-4">
                <div className="flex justify-between text-gray-500 text-xs border-b border-gray-900 pb-2">
                  <span>letter_of_love.txt</span>
                  <span className="text-rose-400">&lt;dayar:love&gt;</span>
                </div>
                <p className="text-gray-200 leading-relaxed min-h-[80px]">{displayedText}</p>

                {currentCompliment && (
                  <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-sm flex items-center gap-3">
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-400 flex-shrink-0" />
                    <span>{currentCompliment}</span>
                  </div>
                )}
              </div>
            </section>

            {/* Chapter 3: Birthday Cake */}
            <section className="p-6 sm:p-10 rounded-3xl bg-[#12121e]/90 border border-rose-500/40 space-y-8 text-center">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold font-mono">03</div>
                  <h2 className="text-xl sm:text-2xl font-bold">Gâteau de célébration (Le vrai arrive...)</h2>
                </div>
                <div className="flex gap-2">
                  <button onClick={lightAllCandles} className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" /> Rallumer
                  </button>
                  <button onClick={blowOutCandles} className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-lg shadow-rose-600/30 flex items-center gap-1">
                    🌬️ Souffler !
                  </button>
                </div>
              </div>

              {/* Interactive Cake Visual */}
              <div className="flex justify-center py-6">
                <div className="flex flex-col items-center">
                  <div className="flex gap-6 mb-2">
                    {[0, 1, 2].map((idx) => (
                      <div key={idx} onClick={() => toggleCandle(idx)} className="cursor-pointer relative flex flex-col items-center">
                        {candleStates[idx] ? (
                          <div className="w-3 h-5 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full animate-pulse shadow-lg shadow-amber-500" />
                        ) : (
                          <div className="w-1.5 h-3 bg-gray-500 rounded-full" />
                        )}
                        <div className="w-3 h-12 bg-gradient-to-b from-rose-300 to-rose-600 rounded-t-sm" />
                      </div>
                    ))}
                  </div>
                  <div className="w-48 h-16 bg-gradient-to-r from-rose-600 via-pink-500 to-purple-600 rounded-t-2xl flex items-center justify-center font-bold text-white shadow-xl">
                    Happy Birthday
                  </div>
                  <div className="w-60 h-20 bg-gradient-to-r from-purple-900 via-rose-900 to-purple-900 rounded-t-xl flex items-center justify-center text-xs text-rose-300 border-t border-rose-500/30 shadow-2xl">
                    ❤️ Dayar & Mon Amour ❤️
                  </div>
                </div>
              </div>
            </section>

            {/* Chapter 4: Redeemable Coupons */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold font-mono">04</div>
                <h2 className="text-xl sm:text-2xl font-bold">Bons Cadeaux Romantiques</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { id: 1, title: 'Dîner Fait Maison', desc: 'Entrée, plat, dessert préparés par Dayar.' },
                  { id: 2, title: 'Soirée Cinéma & Câlins', desc: 'Choix du film, pop-corn et câlins illimités.' },
                  { id: 3, title: 'Massage Relaxant', desc: 'Moment de détente sur-mesure.' },
                  { id: 4, title: 'Week-end Évasion', desc: 'Escapade surprise en amoureux.' }
                ].map((coupon) => (
                  <div key={coupon.id} className="p-5 rounded-2xl bg-[#12121e]/80 border border-rose-900/40 relative flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono bg-rose-950 px-2 py-0.5 rounded border border-rose-800 text-rose-400">COUPON #{coupon.id}</span>
                      <h3 className="font-bold text-white text-base">{coupon.title}</h3>
                      <p className="text-xs text-gray-400">{coupon.desc}</p>
                    </div>

                    {redeemedCoupons[coupon.id] ? (
                      <div className="w-full py-2 bg-rose-950/80 border border-rose-500 text-rose-400 text-xs font-bold text-center rounded-xl flex items-center justify-center gap-1">
                        <Check className="w-3.5 h-3.5" /> VALIDÉ ❤️
                      </div>
                    ) : (
                      <button
                        onClick={() => redeemCoupon(coupon.id)}
                        className="w-full py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/40 text-xs font-semibold"
                      >
                        Utiliser le Bon
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

function Navbar({ onOpenSecret }) {
  return (
    <nav className="sticky top-0 z-40 bg-[#080811]/80 backdrop-blur-md border-b border-gray-800 px-4 lg:px-8 py-3.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono font-bold text-rose-400 text-sm sm:text-base">
          <Code className="w-5 h-5 text-rose-500" />
          <span>dayar.saifidine</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm text-gray-300 font-medium">
          <a href="#home" className="hover:text-rose-400 transition-colors">Accueil</a>
          <a href="#experiences" className="hover:text-rose-400 transition-colors">Expériences</a>
          <a href="#interests" className="hover:text-rose-400 transition-colors">Passions</a>
          <a href="#references" className="hover:text-rose-400 transition-colors">Références</a>
          <a href="#contact" className="hover:text-rose-400 transition-colors">Contact</a>
        </div>

        <button
          onClick={onOpenSecret}
          className="px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono hover:bg-rose-900/60 transition-all flex items-center gap-1.5"
          title="Secret Code Trigger (270825)"
        >
          <Lock className="w-3 h-3 text-rose-400" />
          <span>Code: 270825</span>
        </button>
      </div>
    </nav>
  );
}

function Home({ onTriggerSecret }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 sm:py-24 text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
        <Sparkles className="w-3.5 h-3.5" /> Développeur Full-Stack & Passionné
      </div>
      <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
        Bonjour, je suis <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400">Dayar Saifidine</span>
      </h1>
      <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed">
        Bienvenue sur mon portfolio interactif. Je conçois et développe des applications web modernes, performantes et élégantes.
      </p>

      {/* Secret Easter Egg Hint */}
      <div className="pt-4 flex justify-center">
        <button
          onClick={onTriggerSecret}
          className="p-4 rounded-2xl bg-[#12121e] border border-rose-500/30 hover:border-rose-500/60 transition-all text-xs font-mono text-rose-300 flex items-center gap-3 shadow-lg group"
        >
          <Lock className="w-4 h-4 text-rose-400 group-hover:rotate-12 transition-transform" />
          <span>Tapez le code <strong className="text-rose-400">270825</strong> au clavier pour déverrouiller la surprise cachée !</span>
        </button>
      </div>
    </section>
  );
}

function Experiences() {
  const experiences = [
    { title: "Développeur Full-Stack Senior", company: "Tech Innovations", period: "2023 - Présent", desc: "Développement d'applications cloud et architectures microservices." },
    { title: "Ingénieur Logiciel React & Node.js", company: "Digital Studio", period: "2021 - 2023", desc: "Création d'interfaces utilisateurs haute performance et intégration d'APIs." }
  ];

  return (
    <section id="experiences" className="max-w-6xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center gap-3">
        <Briefcase className="w-6 h-6 text-rose-400" />
        <h2 className="text-2xl font-bold text-white">Expériences Professionnelles</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {experiences.map((exp, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-[#12121e] border border-gray-800 space-y-3">
            <span className="text-xs font-mono text-rose-400">{exp.period}</span>
            <h3 className="text-lg font-bold text-white">{exp.title}</h3>
            <p className="text-xs font-medium text-gray-400">{exp.company}</p>
            <p className="text-sm text-gray-300">{exp.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Interests() {
  return (
    <section id="interests" className="max-w-6xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center gap-3">
        <Star className="w-6 h-6 text-rose-400" />
        <h2 className="text-2xl font-bold text-white">Centres d'Intérêt</h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {['Développement Web', 'Design UI/UX', 'Nouvelles Technologies'].map((item, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-[#12121e] border border-gray-800 text-center font-semibold text-rose-200">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function References() {
  return (
    <section id="references" className="max-w-6xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center gap-3">
        <Award className="w-6 h-6 text-rose-400" />
        <h2 className="text-2xl font-bold text-white">Références</h2>
      </div>

      <div className="p-6 rounded-2xl bg-[#12121e] border border-gray-800 italic text-gray-300 text-sm">
        "Dayar est un développeur très passionné, rigoureux et attentif aux détails. Travailler avec lui est une véritable opportunité !"
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center gap-3">
        <Mail className="w-6 h-6 text-rose-400" />
        <h2 className="text-2xl font-bold text-white">Me Contacter</h2>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-[#12121e] border border-gray-800 max-w-xl mx-auto space-y-4">
        <input type="email" placeholder="Votre Email" className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white text-sm focus:outline-none focus:border-rose-400" />
        <textarea placeholder="Votre Message" rows="4" className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white text-sm focus:outline-none focus:border-rose-400" />
        <button className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2">
          <Send className="w-4 h-4" /> Envoyer le Message
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-800 py-8 px-4 text-center text-xs text-gray-500 font-mono space-y-2">
      <p>Dayar Saifidine Portfolio &copy; {new Date().getFullYear()} — Tous droits réservés.</p>
      <p className="text-rose-400/80">Code secret d'anniversaire : 270825 ❤️</p>
    </footer>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  // Global keydown listener for secret code 270825
  useEffect(() => {
    const targetCode = '270825';
    let inputBuffer = '';

    const handleKeyDown = (e) => {
      if (/^[0-9]$/.test(e.key)) {
        inputBuffer += e.key;
        if (inputBuffer.length > targetCode.length) {
          inputBuffer = inputBuffer.slice(-targetCode.length);
        }
        if (inputBuffer === targetCode) {
          setShowSecret(true);
          inputBuffer = '';
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-[#080811] text-gray-100 min-h-screen font-sans">
      {loading && <Loader onLoaded={() => setLoading(false)} />}
      
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s' }}>
        <Navbar onOpenSecret={() => setShowSecret(true)} />
        <main>
          <section id="home">
            <Home onTriggerSecret={() => setShowSecret(true)} />
          </section>
          <Experiences />
          <Interests />
          <References />
          <section id="contact">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>

      {/* Secret Birthday Quest Modal Overlay */}
      {showSecret && <TempPage onClose={() => setShowSecret(false)} />}
    </div>
  );
}
