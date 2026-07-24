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
    secondary: "bg-white text-[#111111] dark:bg-[#141417] dark:text-white dark:border-white/10 border border-gray-200 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5",
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
        
      <div className="relative z-10 w-[280px] h-[580px] bg-white dark:bg-[#141417] rounded-[3rem] border-[12px] border-gray-100 dark:border-[#1e1e21] shadow-2xl overflow-hidden flex flex-col animate-float">
        
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
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-500/30">
                  Buscando en Catálogo...
                </span>
              </div>

              <div className="w-full h-11 bg-white dark:bg-[#141417] rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 flex items-center px-3 gap-2 overflow-hidden transition-colors duration-300">
                 <Search size={15} className="text-gray-400 shrink-0" />
                 <div className="h-5 flex-1 relative flex items-center overflow-hidden">
                   <span className={`text-xs font-semibold truncate transition-colors duration-300 ${text.length > 0 ? currentItem.textColor : 'text-gray-400'}`}>
                     {text}
                   </span>
                   <span className="inline-block h-3.5 w-[2px] ml-[2px] shrink-0 bg-blue-500"></span>
                 </div>
                 {currentItem.imgSrc ? (
                   <img src={currentItem.imgSrc} alt={currentItem.name} className="w-5 h-5 rounded-full object-cover shrink-0" />
                 ) : (
                   <CurrentIcon size={14} className={`shrink-0 ${currentItem.textColor}`} />
                 )}
              </div>

              <div className="flex flex-col gap-2.5">
                {games.map((g) => {
                  const GameListIcon = g.icon;
                  return (
                    <div key={g.id} className="w-full bg-white dark:bg-[#141417] rounded-2xl shadow-sm border border-gray-50 dark:border-white/5 p-3.5 flex items-center gap-4 transition-colors">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                        {g.imgSrc ? (
                           <img src={g.imgSrc} alt={g.name} className="w-full h-full object-cover" loading="lazy" />
                        ) : (
                           <GameListIcon size={22} className={g.textColor} strokeWidth={1.5} />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#111111] dark:text-white">{g.name}</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400">{g.currency}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-3 flex items-center gap-3 mt-1">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold text-[#111111] dark:text-white">Proceso seguro</span>
                  <span className="text-[9px] text-gray-500 dark:text-gray-400">Entrega garantizada</span>
                </div>
              </div>
            </div>
          ) : (
            <div key="steps-phase" className="animate-slide-left flex flex-col gap-2.5 pt-1">
              <div className="text-center">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/30">
                  Pasos para comprar
                </span>
              </div>

              <div className="w-full bg-white dark:bg-[#141417] rounded-3xl shadow-soft border border-blue-100 dark:border-blue-500/30 p-3 flex flex-col items-center text-center animate-step-card transition-all">
                <div className={`w-9 h-9 rounded-xl ${currentStep.color} flex items-center justify-center mb-1 shadow-inner`}>
                  <StepIcon size={18} />
                </div>
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center mb-1 shadow-md">
                  {currentStep.num}
                </div>
                <h4 className="font-bold text-xs text-[#111111] dark:text-white mb-0.5">{currentStep.title}</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed px-1">{currentStep.desc}</p>
              </div>

              <div className="flex justify-center items-center gap-1.5">
                {stepsData.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all duration-500 ${activeStep === idx ? 'w-6 bg-blue-600' : 'w-1.5 bg-gray-300 dark:bg-white/15'}`}
                  ></span>
                ))}
              </div>

              <div className="flex flex-col gap-1.5 mt-0.5">
                <div className="text-[9px] font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500 px-1">Preguntas Frecuentes</div>
                {compactFaqs.map((faq, i) => (
                  <div key={i} className="bg-white dark:bg-[#141417] border border-gray-100 dark:border-white/5 rounded-xl p-2 flex flex-col gap-0.5 shadow-sm">
                    <span className="text-[10px] font-bold text-[#111111] dark:text-white flex items-center gap-1">
                      <HelpCircle size={10} className="text-blue-500 shrink-0" /> {faq.q}
                    </span>
                    <span className="text-[9px] text-gray-500 dark:text-gray-400 pl-3.5">{faq.a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      <div className="absolute top-8 right-6 lg:right-12 animate-float-delay bg-white dark:bg-[#141417] p-3.5 rounded-[1.5rem] shadow-soft border border-gray-100 dark:border-white/10 text-2xl rotate-[15deg] z-5">
        🎮
      </div>
      
      <div className="absolute top-32 left-2 lg:left-8 animate-float-fast bg-white dark:bg-[#141417] p-3.5 rounded-3xl shadow-soft border border-gray-100 dark:border-white/10 text-2xl rotate-[-12deg] z-4">
        💎
      </div>

      <div className="absolute bottom-32 right-2 lg:right-8 animate-float-delay bg-white dark:bg-[#141417] p-3.5 rounded-[1.2rem] shadow-soft border border-gray-100 dark:border-white/10 text-2xl rotate-[8deg] z-3">
        ⚡
      </div>
      
      <div className="absolute bottom-16 left-6 lg:left-14 animate-float bg-white dark:bg-[#141417] p-3.5 rounded-3xl shadow-soft border border-gray-100 dark:border-white/10 text-2xl rotate-[-8deg] z-2">
        🏆
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  const scrollToCatalog = () => {
    const element = document.getElementById('recargas');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById('como-funciona');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFaq = () => {
    const element = document.getElementById('faq');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-20">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-50 dark:bg-blue-600/10 blur-[80px] transition-colors duration-500"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-50/50 dark:bg-indigo-600/10 blur-[100px] transition-colors duration-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <ScrollReveal animation="fade-right" className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 font-medium text-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-blue-400"></span>
              </span>
              Recargas de Videojuegos 24/7
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-[#111111] dark:text-white leading-[1.1] tracking-tight mb-6 transition-colors">
              Recarga en tus juegos favoritos <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                al mejor precio.
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-500 dark:text-gray-400 mb-10 leading-relaxed max-w-lg transition-colors">
              la web para comprar tus recargas al mejor precio y en unos minutos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <Button onClick={scrollToCatalog} variant="primary" icon={ArrowRight} className="py-4 text-base">Ver Juegos</Button>
              <Button onClick={scrollToHowItWorks} variant="secondary" icon={Gamepad2} className="py-4 text-base">Cómo comprar</Button>
              <Button onClick={scrollToFaq} variant="secondary" icon={HelpCircle} className="py-4 text-base">Preguntas frecuentes</Button>
            </div>
            
            <div className="mt-12 flex items-center justify-center sm:justify-start gap-4 sm:gap-8 border-t border-gray-100 dark:border-white/10 pt-8 transition-colors">
              <div className="text-center sm:text-left">
                <div className="text-3xl font-extrabold text-[#111111] dark:text-white tracking-tight transition-colors">
                  2,500<span className="text-blue-600 dark:text-blue-400 ml-0.5">+</span>
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 transition-colors">Clientes atendidos</div>
              </div>
              
              <div className="w-px h-10 sm:h-12 bg-gray-200 dark:bg-white/10 transition-colors"></div>
              
              <div className="text-center sm:text-left">
                <div className="text-3xl font-extrabold text-[#111111] dark:text-white tracking-tight transition-colors">
                  5,800<span className="text-blue-600 dark:text-blue-400 ml-0.5">+</span>
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 transition-colors">Recargas exitosas</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay={200} className="relative mt-10 lg:mt-0">
            <HeroIllustration />
          </ScrollReveal>
          
        </div>
      </div>
    </section>
  );
};

interface GamesSectionProps {
  onGameSelect: (game: GameItem) => void;
}

const GamesSection: React.FC<GamesSectionProps> = ({ onGameSelect }) => {
  return (
    <section id="recargas" className="py-24 bg-white dark:bg-[#09090b] relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#111111] dark:text-white mb-4 tracking-tight">Catálogo Disponible</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Selecciona el juego que deseas recargar</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => {
            const GameIcon = game.icon;
            return (
              <ScrollReveal key={game.id} delay={index * 100} animation="fade-up" className="group bg-white dark:bg-[#141417] rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-soft hover:shadow-lg transition-all">
                <div className={`w-24 h-24 rounded-2xl ${game.color} ${game.textColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 overflow-hidden`}>
                  {game.imgSrc ? (
                    <img src={game.imgSrc} alt={game.name} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <GameIcon size={40} strokeWidth={1.5} />
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-[#111111] dark:text-white mb-3 transition-colors">{game.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{game.description}</p>
                
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-500/30 mb-4">
                  <Star size={14} className="animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-wide">Popular: {game.popular}</span>
                </div>
                
                <button 
                  onClick={() => onGameSelect(game)}
                  className="mt-auto w-full py-3 rounded-xl font-semibold text-sm bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-200 group-hover:bg-blue-600 dark:group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                >
                  Ver Opciones
                </button>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface HowItWorksSectionProps {}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = () => {
  const steps = [
    { 
      number: '01', 
      title: 'Elegí tu producto', 
      desc: 'Selecciona entre nuestro catálogo de videojuegos.',
      icon: Gamepad2,
      color: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
    },
    { 
      number: '02', 
      title: 'Ingresá tus datos', 
      desc: 'Escribe tus datos de jugador de manera correcta para recibir tu recarga.',
      icon: Monitor,
      color: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
    },
    { 
      number: '03', 
      title: 'Disfruta al instante', 
      desc: 'Completa tu pago y recibe tus recargas en minutos.',
      icon: Zap,
      color: 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400'
    }
  ];

  return (
    <section id="como-funciona" className="py-24 bg-gray-50/50 dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] dark:text-white mb-4 transition-colors">Pasos para comprar</h2>
          <p className="text-gray-500 dark:text-gray-400 transition-colors">Recargas en 3 simples pasos, sin complicaciones.</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gray-200 dark:bg-white/10 border-dashed border-t-2 dark:border-white/10 transition-colors"></div>
          
          {steps.map((step, idx) => {
            const StepIcon = step.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 150} animation="zoom-in" className="relative flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-3xl ${step.color} flex items-center justify-center mb-8 relative z-10 shadow-sm bg-white dark:bg-[#141417] border-2 border-white dark:border-[#141417]`}>
                  <StepIcon size={32} />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#111111] dark:bg-white text-white dark:text-[#111111] flex items-center justify-center font-bold text-sm transition-all">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#111111] dark:text-white mb-3 transition-colors">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs transition-colors">{step.desc}</p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="border border-gray-100 dark:border-white/10 rounded-2xl bg-white dark:bg-[#141417] shadow-sm mb-4 overflow-hidden transition-all duration-300">
      <button 
        type="button"
        className="w-full px-6 py-5 flex justify-between items-center focus:outline-none cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-left text-[#111111] dark:text-white pr-4 transition-colors">{question}</span>
        <div className={`w-8 h-8 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-180 bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      <div 
        className={`px-6 text-gray-500 dark:text-gray-400 leading-relaxed transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
      >
        {answer}
      </div>
    </div>
  );
};

const FaqSection: React.FC = () => {
  const faqs = [
    { q: "¿Cuánto tiempo tarda en llegar mi recarga?", a: "El 95% de nuestras entregas llegan en menos de 5 minutos a tu cuenta." },
    { q: "¿Es seguro proporcionar mis datos?", a: "Totalmente. El ID jugador y ID servidor es público y no compromete la seguridad de tu cuenta." },
    { q: "¿Qué métodos de pago aceptan?", a: "Por el momento solo aceptamos Transferencia Bancarias." },
    { q: "¿Qué hago si tuve un problema con mi pedido?", a: "Si tuviste un problema comunícate con nosotros por Whatsapp para resolver tu caso." }
  ];

  return (
    <section id="faq" className="py-24 bg-gray-50 dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] dark:text-white mb-4 transition-colors">Preguntas Frecuentes</h2>
          <p className="text-gray-500 dark:text-gray-400 transition-colors">Todo lo que necesitas saber sobre DLCshops.</p>
        </ScrollReveal>
        <div>
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 100} animation="fade-up">
              <FaqItem question={faq.q} answer={faq.a} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#09090b] border-t border-gray-100 dark:border-white/5 pt-20 pb-10 transition-colors duration-500">
      <ScrollReveal animation="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
                <Zap className="text-white w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent animate-gradient-text">
                  DLCshops
                </span>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6 leading-relaxed transition-colors">
              la única web con los mejores precios en tus recargas favoritas
            </p>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/5493518029621" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
                aria-label="Contacto de WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-[#111111] dark:text-white mb-6 transition-colors">Navegación</h4>
            <ul className="space-y-4">
              <li><a href="#inicio" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Inicio</a></li>
              <li><a href="#recargas" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Catálogo</a></li>
              <li><a href="#como-funciona" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cómo funciona</a></li>
              <li><a href="#faq" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 dark:border-white/5 flex justify-center items-center transition-colors">
          <p className="text-gray-400 dark:text-gray-500 text-sm text-center">© 2026 DLCshops</p>
        </div>
      </ScrollReveal>
    </footer>
  );
};

interface TopUpViewProps {
  game: GameItem;
  onBack: () => void;
}

const TopUpView: React.FC<TopUpViewProps> = ({ game, onBack }) => {
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [serverId, setServerId] = useState<string>('');
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<'select' | 'bank_details'>('select'); 

  if (!game) return null;

  const isMobileLegends = game.name === 'Mobile Legends';
  const GameMainIcon = game.icon;

  const handlePaymentClick = () => {
    const noPlayerId = !inputValue.trim();
    const noServerId = isMobileLegends && !serverId.trim();
    const noPackage = !selectedPackage;

    if (noPlayerId && noServerId && noPackage) {
      showWarning('Falta ingresar tu Player ID, ID Servidor y seleccionar un paquete.');
    } else if (noPlayerId && noServerId) {
      showWarning('Falta ingresar tu Player ID e ID Servidor.');
    } else if (noPlayerId && noPackage) {
      showWarning('Falta ingresar tu Player ID y seleccionar un paquete.');
    } else if (noServerId && noPackage) {
      showWarning('Falta ingresar tu ID Servidor y seleccionar un paquete.');
    } else if (noPlayerId) {
      showWarning('Por favor, ingresa tu Player ID para continuar.');
    } else if (noServerId) {
      showWarning('Por favor, ingresa tu ID Servidor para continuar.');
    } else if (noPackage) {
      showWarning('Por favor, selecciona un paquete de la lista para continuar.');
    } else {
      setShowPaymentModal(true);
    }
  };

  const showWarning = (msg: string) => {
    setWarningMessage(msg);
    setTimeout(() => setWarningMessage(null), 3500);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setTimeout(() => setPaymentStep('select'), 300);
  };

  const handleCopy = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showWarning('¡Copiado al portapapeles!');
    } catch (err) {
      console.error('Error al copiar', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#FAFAFA] dark:bg-[#09090b] transition-colors duration-500 relative">
      {warningMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm">
          <div className="animate-slide-down-toast bg-emerald-500 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 font-medium text-sm border border-emerald-400/30">
            <MessageCircle size={20} className="shrink-0" />
            <span>{warningMessage}</span>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 mb-8 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-[#141417] rounded-3xl p-8 shadow-soft border border-gray-100 dark:border-white/10">
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 rounded-2xl ${game.color} ${game.textColor} flex items-center justify-center overflow-hidden`}>
                  {game.imgSrc ? (
                    <img src={game.imgSrc} alt={game.name} className="w-full h-full object-cover" />
                  ) : (
                    <GameMainIcon size={32} strokeWidth={1.5} />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#111111] dark:text-white">{game.name}</h2>
                  <p className="text-gray-500 dark:text-gray-400">{game.description}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#111111] dark:text-white mb-2">
                    Player ID
                  </label>
                  <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ingresa tu Player ID"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors text-[#111111] dark:text-white placeholder-gray-400"
                  />
                </div>

                {isMobileLegends && (
                  <div>
                    <label className="block text-sm font-semibold text-[#111111] dark:text-white mb-2">
                      ID Servidor
                    </label>
                    <input 
                      type="text"
                      value={serverId}
                      onChange={(e) => setServerId(e.target.value)}
                      placeholder="Ingresa tu ID Servidor"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors text-[#111111] dark:text-white placeholder-gray-400"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-[#111111] dark:text-white mb-3">
                    Selecciona un paquete
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {game.packages.map((pkg) => (
                      <button
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          selectedPackage?.id === pkg.id
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-500/10'
                            : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-bold text-[#111111] dark:text-white">{pkg.amount} {game.currency}</span>
                          {pkg.popular && (
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400">Popular</span>
                          )}
                        </div>
                        <span className={`text-sm font-semibold ${selectedPackage?.id === pkg.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                          ${pkg.price.toLocaleString('es-AR')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[#141417] rounded-3xl p-6 shadow-soft border border-gray-100 dark:border-white/10 sticky top-32">
              <h3 className="text-lg font-bold text-[#111111] dark:text-white mb-4">Resumen</h3>
              
              {selectedPackage && (
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-white/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Cantidad:</span>
                    <span className="font-semibold text-[#111111] dark:text-white">{selectedPackage.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Precio unitario:</span>
                    <span className="font-semibold text-[#111111] dark:text-white">${selectedPackage.price.toLocaleString('es-AR')}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-[#111111] dark:text-white">Total:</span>
                    <span className="text-blue-600 dark:text-blue-400">${selectedPackage.price.toLocaleString('es-AR')}</span>
                  </div>
                </div>
              )}

              <Button 
                onClick={handlePaymentClick}
                variant="primary" 
                className="w-full py-3"
              >
                Proceder al Pago
              </Button>

              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-xl text-xs text-blue-700 dark:text-blue-300">
                <p className="font-semibold mb-1">Información importante:</p>
                <ul className="space-y-1 text-[11px]">
                  <li>• Verifica bien tu Player ID</li>
                  <li>• Envíos en menos de 10 minutos</li>
                  <li>• Sin cambios ni reembolsos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AppState {
  isDark: boolean;
  selectedGame: GameItem | null;
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    isDark: false,
    selectedGame: null,
  });

  const toggleTheme = () => {
    setState(prev => ({ ...prev, isDark: !prev.isDark }));
    if (state.isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const handleGoHome = () => {
    setState(prev => ({ ...prev, selectedGame: null }));
  };

  const handleGameSelect = (game: GameItem) => {
    setState(prev => ({ ...prev, selectedGame: game }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromTopUp = () => {
    handleGoHome();
  };

  if (state.selectedGame) {
    return (
      <div className={state.isDark ? 'dark' : ''}>
        <GlobalStyles />
        <Navbar isDark={state.isDark} toggleTheme={toggleTheme} onGoHome={handleGoHome} />
        <TopUpView game={state.selectedGame} onBack={handleBackFromTopUp} />
      </div>
    );
  }

  return (
    <div className={state.isDark ? 'dark' : ''}>
      <GlobalStyles />
      <Navbar isDark={state.isDark} toggleTheme={toggleTheme} onGoHome={handleGoHome} />
      <Hero />
      <GamesSection onGameSelect={handleGameSelect} />
      <HowItWorksSection />
      <FaqSection />
      <Footer />
    </div>
  );
};

export default App;
