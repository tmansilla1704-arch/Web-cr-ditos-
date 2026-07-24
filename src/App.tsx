import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, 
  Diamond, 
  Zap, 
  Shield, 
  MessageCircle, 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight,
  Monitor,
  Smartphone,
  Moon,
  Sun,
  Search,
  ArrowLeft,
  Check,
  Star,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

const GlobalStyles: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: #FAFAFA;
      color: #111111;
      overflow-x: hidden;
    }

    .dark body {
      background-color: #09090b; 
      color: #fafafa; 
    }

    .glass-nav {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    .dark .glass-nav {
      background: rgba(9, 9, 11, 0.8);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    @keyframes float {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(2deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    
    .animate-float {
      animation: float 4s ease-in-out infinite;
    }

    @keyframes gradient-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .animate-gradient-text {
      background-size: 200% auto;
      animation: gradient-shift 4s ease infinite;
    }

    @keyframes slide-right {
      0% { opacity: 0; transform: translateX(-50px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    .animate-slide-right {
      animation: slide-right 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes slide-left {
      0% { opacity: 0; transform: translateX(50px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    .animate-slide-left {
      animation: slide-left 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes slide-up-fade {
      0% { opacity: 0; transform: translateY(20px) scale(0.97); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    .animate-slide-up-fade {
      animation: slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes slide-down-toast {
      0% { opacity: 0; transform: translateY(-20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-down-toast {
      animation: slide-down-toast 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes step-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.03); }
    }
    .animate-step-card {
      animation: step-pulse 2.5s ease-in-out infinite;
    }

    @keyframes scale-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.25); text-shadow: 0 0 12px currentColor; }
    }
    .animate-scale-pulse {
      animation: scale-pulse 2s ease-in-out infinite;
      display: inline-block;
    }

    .shadow-soft {
      box-shadow: 0 10px 30px -10px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02);
    }
    .dark .shadow-soft {
      box-shadow: 0 10px 30px -10px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2);
    }
  `}</style>
);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = domRef.current;
    if (typeof IntersectionObserver !== 'undefined' && currentRef) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
      
      observer.observe(currentRef);
      return () => { if (currentRef) observer.unobserve(currentRef); }
    } else {
      setIsVisible(true);
    }
  }, []);

  return (
    <div 
      ref={domRef} 
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  icon?: React.ElementType;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', icon: Icon, onClick, disabled, type = 'button' }) => {
  const baseStyle = "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 px-6 py-3 text-sm md:text-base cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-[#2563EB] text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5",
    secondary: "bg-white text-[#111111] dark:bg-[#141417] dark:text-white dark:border-white/10 border border-gray-200 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5 shadow-sm hover:-translate-y-0.5",
    ghost: "text-gray-600 hover:text-[#111111] hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5"
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
      {Icon && <Icon className="ml-2 w-4 h-4" />}
    </button>
  );
};

interface NavLinkProps {
  href: string;
  target: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, target: string) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, target, children, onClick }) => (
  <a 
    href={href} 
    onClick={(e) => onClick(e, target)} 
    className="relative text-sm font-medium text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 group cursor-pointer"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 dark:bg-blue-400 transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
  </a>
);

interface PackageItem {
  id: number;
  amount: number;
  price: number;
  popular?: boolean;
}

interface GameItem {
  id: number;
  name: string;
  icon: React.ElementType;
  imgSrc?: string;
  color: string;
  textColor: string;
  currency: string;
  description: string;
  popular: string;
  packages: PackageItem[];
}

const games: GameItem[] = [
  { 
    id: 1, 
    name: 'Free Fire', 
    icon: Zap, 
    imgSrc: 'https://i.postimg.cc/cJKmnHg8/file-000000005dd0820e8f651d9783e77230.png',
    color: 'bg-orange-100 dark:bg-orange-900/30', 
    textColor: 'text-orange-600 dark:text-orange-400', 
    currency: 'Diamantes', 
    description: 'Diamantes', 
    popular: '572 Diamantes',
    packages: [
      { id: 1, amount: 110, price: 1649.99 },
      { id: 2, amount: 341, price: 4699.99 },
      { id: 3, amount: 572, price: 7999.99, popular: true },
      { id: 4, amount: 1160, price: 14599.99 },
      { id: 5, amount: 2398, price: 28499.99 },
      { id: 6, amount: 6160, price: 71499.99 },
    ]
  },
  { 
    id: 2, 
    name: 'Mobile Legends', 
    icon: Diamond, 
    imgSrc: 'https://i.postimg.cc/VLbH3KLC/file-000000001784820ebba693a2ceb167de.png',
    color: 'bg-blue-100 dark:bg-blue-900/30', 
    textColor: 'text-blue-600 dark:text-blue-400', 
    currency: 'Diamantes', 
    description: 'Diamantes MLBB', 
    popular: '706 Diamantes',
    packages: [
      { id: 1, amount: 86, price: 2249.99 },
      { id: 2, amount: 172, price: 4449.99 },
      { id: 3, amount: 257, price: 6499.99 },
      { id: 4, amount: 706, price: 17499.99, popular: true },
      { id: 5, amount: 2195, price: 52999.99 },
      { id: 6, amount: 3688, price: 87999.99 },
      { id: 7, amount: 5532, price: 132999.99 },
      { id: 8, amount: 9288, price: 219999.99 },
    ]
  },
  { 
    id: 3, 
    name: 'Blood Strike', 
    icon: Shield, 
    imgSrc: 'https://i.postimg.cc/zBxGYJpB/file-000000005394820e8c3ac4d1c6d25e6b.png',
    color: 'bg-red-100 dark:bg-red-900/30', 
    textColor: 'text-red-600 dark:text-red-400', 
    currency: 'Oro', 
    description: 'Oro BS', 
    popular: '540 Oro',
    packages: [
      { id: 1, amount: 105, price: 1428 },
      { id: 2, amount: 320, price: 4248 },
      { id: 3, amount: 540, price: 7048, popular: true },
      { id: 4, amount: 1100, price: 13898 },
      { id: 5, amount: 2260, price: 27698 },
      { id: 6, amount: 5800, price: 69298 },
    ]
  }
];

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  onGoHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme, onGoHome }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    onGoHome();
    setIsOpen(false);
    
    setTimeout(() => {
      const element = document.getElementById(target);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  return (
    <nav className="fixed w-full z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => { onGoHome(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-md shadow-blue-500/20">
              <Zap className="text-white w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent animate-gradient-text">
                DLCshops
              </span>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#inicio" target="inicio" onClick={handleNavClick}>Inicio</NavLink>
            <NavLink href="#recargas" target="recargas" onClick={handleNavClick}>Juegos</NavLink>
            <NavLink href="#como-funciona" target="como-funciona" onClick={handleNavClick}>Cómo funciona</NavLink>
            <NavLink href="#faq" target="faq" onClick={handleNavClick}>Preguntas</NavLink>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Alternar tema"
            >
              <Sun className={`absolute w-5 h-5 transition-all duration-500 ease-out ${isDark ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`} />
              <Moon className={`absolute w-5 h-5 transition-all duration-500 ease-out ${isDark ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`} />
            </button>
            <Button variant="primary" onClick={() => {
              const el = document.getElementById('recargas');
              if(el) el.scrollIntoView({ behavior: 'smooth' });
            }}>Comenzar</Button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={toggleTheme} 
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Alternar tema"
            >
              <Sun className={`absolute w-5 h-5 transition-all duration-500 ease-out ${isDark ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`} />
              <Moon className={`absolute w-5 h-5 transition-all duration-500 ease-out ${isDark ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`} />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 dark:text-white focus:outline-none p-2 bg-gray-100 dark:bg-white/5 rounded-lg cursor-pointer">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-24 left-4 right-4 bg-white dark:bg-[#141417] border border-gray-100 dark:border-white/10 shadow-2xl rounded-2xl py-4 px-4 flex flex-col space-y-4 z-50">
          <a href="#inicio" onClick={(e) => handleNavClick(e, 'inicio')} className="text-base font-medium text-gray-900 dark:text-white p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">Inicio</a>
          <a href="#recargas" onClick={(e) => handleNavClick(e, 'recargas')} className="text-base font-medium text-gray-500 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">Juegos</a>
          <a href="#como-funciona" onClick={(e) => handleNavClick(e, 'como-funciona')} className="text-base font-medium text-gray-500 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">Cómo funciona</a>
          <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="text-base font-medium text-gray-500 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">Preguntas</a>
        </div>
      )}
    </nav>
  );
};

const HeroIllustration: React.FC = () => {
  const [animationPhase, setAnimationPhase] = useState<'games' | 'steps'>('games');
  const [text, setText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [loopNum, setLoopNum] = useState<number>(0);

  const [activeStep, setActiveStep] = useState<number>(0);
  const stepsData = [
    { num: '01', title: 'Elegí tu producto', desc: 'Selecciona tu juego favorito', icon: Gamepad2, color: 'text-blue-500 bg-blue-500/10' },
    { num: '02', title: 'Ingresá tus datos', desc: 'Escribe tu Player ID de jugador', icon: Monitor, color: 'text-indigo-500 bg-indigo-500/10' },
    { num: '03', title: 'Disfruta al instante', desc: 'Completá tu pago y recibilo', icon: Zap, color: 'text-emerald-500 bg-emerald-500/10' },
  ];

  const compactFaqs = [
    { q: '¿Qué métodos de pago aceptan?', a: 'Solo aceptamos transferencia bancaria.' },
    { q: '¿Cuánto tarda en llegar mi recarga?', a: 'El 95% llegan en 5-10 minutos.' },
    { q: '¿Es seguro proporcionar mis datos?', a: 'Totalmente, el ID de jugador es público.' },
    { q: '¿Qué hago si tengo un problema?', a: 'Comunícate con soporte vía WhatsApp.' }
  ];

  const currentItemIndex = loopNum % games.length;
  const currentItem = games[currentItemIndex];

  useEffect(() => {
    if (animationPhase !== 'games') return;

    const timer = setTimeout(() => {
      const fullText = currentItem.name;

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
      } else {
        setText(fullText.substring(0, text.length + 1));
      }

      if (!isDeleting && text === fullText) {
        if (currentItemIndex === games.length - 1) {
          setTimeout(() => {
            setIsDeleting(false);
            setAnimationPhase('steps');
            setLoopNum(0);
          }, 1500);
        } else {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    }, 110);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, currentItemIndex, currentItem.name, animationPhase]);

  useEffect(() => {
    if (animationPhase !== 'steps') return;

    const stepInterval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev + 1 >= stepsData.length) {
          clearInterval(stepInterval);
          setTimeout(() => {
            setActiveStep(0);
            setAnimationPhase('games');
          }, 1500);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(stepInterval);
  }, [animationPhase]);

  const CurrentIcon = currentItem.icon;
  const currentStep = stepsData[activeStep];
  const StepIcon = currentStep.icon;

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px] flex items-center justify-center animate-slide-right perspective-1000">
      <div className="absolute w-[120%] h-[120%] bg-blue-50/50 dark:bg-blue-600/10 rounded-full blur-3xl -z-10 transition-colors duration-500"></div>
        
      <div className="relative z-10 w-[280px] h-[580px] bg-white dark:bg-[#141417] rounded-[3rem] border-[12px] border-gray-100 dark:border-[#1e1e21] shadow-2xl overflow-hidden flex flex-col animate-float transition-colors duration-500">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-100 dark:bg-[#1e1e21] rounded-b-3xl z-20 transition-colors duration-500"></div>

        <div className="flex-1 w-full bg-[#F8FAFC] dark:bg-[#09090b] pt-10 px-5 pb-6 flex flex-col gap-3 relative overflow-y-auto transition-colors duration-500">
          
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                <Zap size={14} fill="currentColor" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent animate-gradient-text">
                  DLCshops
                </span>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>
            </div>
            <div className="w-8 h-8 bg-white dark:bg-[#141417] rounded-full shadow-sm flex items-center justify-center border border-gray-100 dark:border-white/10 transition-colors">
               <Menu size={16} className="text-[#111111] dark:text-white" />
            </div>
          </div>

          {animationPhase === 'games' ? (
            <div key="games-phase" className="animate-slide-right flex flex-col gap-3">
              <div className="text-center pt-1">
                <span className="text-[10px] font-extrabold uppercase trackin
                <Button 
                  variant="primary" 
                  className="w-full py-3.5 text-base bg-[#25D366] hover:bg-[#20bd5a] hover:shadow-[#25D366]/30 text-white border-none"
                  onClick={() => {
                    if(!selectedPackage) return;
                    const waText = isMobileLegends
                      ? `Hola, ¡quiero confirmar mi recarga!\n\n🎮 *Juego:* ${game.name}\n💎 *Paquete:* ${selectedPackage.amount} ${game.currency}\n💰 *Total:* $${selectedPackage.price.toLocaleString('es-AR')} ARS\n👤 *Player ID:* ${inputValue}\n server:* ${serverId}\n\nAdjunto mi comprobante de pago.`
                      : `Hola, ¡quiero confirmar mi recarga!\n\n🎮 *Juego:* ${game.name}\n💎 *Paquete:* ${selectedPackage.amount} ${game.currency}\n💰 *Total:* $${selectedPackage.price.toLocaleString('es-AR')} ARS\n👤 *Player ID:* ${inputValue}\n\nAdjunto mi comprobante de pago.`;
                    
                    window.open(`https://wa.me/543518029621?text=${encodeURIComponent(waText)}`, '_blank');
                  }}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Enviar comprobante
                </Button>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4 leading-relaxed transition-colors">
                  Realiza la transferencia del monto de tu paquete y envía el comprobante por WhatsApp para confirmar tu pedido y recibir la recarga.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'home' | 'topup'>('home');
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);

  useEffect(() => {
    games.forEach(game => {
      if (game.imgSrc) {
        const img = new Image();
        img.src = game.imgSrc;
      }
    });
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleGameSelect = (game: GameItem) => {
    setSelectedGame(game);
    setCurrentView('topup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setCurrentView('home');
    setSelectedGame(null);
  };

  const handleBackToCatalog = () => {
    setCurrentView('home');
    setSelectedGame(null);
    setTimeout(() => {
      const element = document.getElementById('recargas');
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-200 selection:text-blue-900 transition-colors duration-500 ${isDark ? 'bg-[#09090b]' : 'bg-[#FAFAFA]'}`}>
      <GlobalStyles />
      <Navbar isDark={isDark} toggleTheme={toggleTheme} onGoHome={handleGoHome} />
      
      <main>
        {currentView === 'home' ? (
          <>
            <Hero />
            <GamesSection onGameSelect={handleGameSelect} />
            <HowItWorksSection />
            <FaqSection />
          </>
        ) : (
          <TopUpView game={selectedGame!} onBack={handleBackToCatalog} />
        )}
      </main>

      {currentView === 'home' && <Footer />}
    </div>
  );
}
