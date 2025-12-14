import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 500); // Allow fade out
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-darkBg transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-neonCyan/20 blur-[80px] rounded-full animate-pulse" />
        {/* Cartoon Ghost Logo */}
        <div className="w-32 h-32 relative z-10 animate-bounce-slow">
           <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                 <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ff" />
                    <stop offset="100%" stopColor="#a0f" />
                 </linearGradient>
              </defs>
              {/* Ghost Body Shadow/Glow */}
              <path d="M20 50C20 25 35 15 50 15C65 15 80 25 80 50V90L70 82L60 90L50 82L40 90L30 82L20 90V50Z" fill="url(#logoGrad)" fillOpacity="0.3" transform="translate(0, 5) scale(0.95)"/>
              
              {/* Main Ghost Body */}
              <path d="M20 50C20 25 35 15 50 15C65 15 80 25 80 50V90L70 82L60 90L50 82L40 90L30 82L20 90V50Z" fill="url(#logoGrad)"/>
              
              {/* Eyes */}
              <ellipse cx="38" cy="45" rx="6" ry="8" fill="#050505" />
              <ellipse cx="62" cy="45" rx="6" ry="8" fill="#050505" />
           </svg>
        </div>
      </div>
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-neonPurple tracking-[0.2em] animate-pulse drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
        GHOST AI
      </h1>
      <p className="mt-4 text-gray-500 text-xs tracking-[0.3em] uppercase">Choose a role. Unlock AI.</p>
    </div>
  );
};