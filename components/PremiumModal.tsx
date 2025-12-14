import React, { useState, useEffect } from 'react';

interface PremiumModalProps {
  onUnlock: () => void;
  onClose: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ onUnlock, onClose }) => {
  const [viewState, setViewState] = useState<'modal' | 'ad'>('modal');
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (viewState === 'ad') {
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      } else {
        // Ad finished, wait a moment then unlock
        timer = setTimeout(() => {
          onUnlock();
        }, 500);
      }
    }
    
    return () => clearTimeout(timer);
  }, [viewState, timeLeft, onUnlock]);

  const handleWatchAd = () => {
    setViewState('ad');
    setTimeLeft(5);
  };

  if (viewState === 'ad') {
    return (
      <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black text-white animate-fade-in-down">
        {/* Ad Header */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gray-900/50 backdrop-blur-sm">
           <span className="text-xs font-mono text-gray-400 border border-gray-700 px-2 py-1 rounded">ADVERTISEMENT</span>
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
             <span className="text-xs font-bold text-gray-300">Reward in {timeLeft}s</span>
           </div>
        </div>

        {/* Ad Content Simulation */}
        <div className="w-full max-w-2xl aspect-video bg-[#111] rounded-2xl border border-gray-800 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl mx-4">
            {/* Background Animation */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-80"></div>
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:20px_20px]"></div>
            
            <div className="relative z-10 text-center p-8">
              {timeLeft > 0 ? (
                <>
                   <div className="text-7xl mb-6 animate-bounce" style={{ animationDuration: '2s' }}>🎁</div>
                   <h2 className="text-3xl font-black text-white mb-2 tracking-tight">GHOST PREMIUM</h2>
                   <p className="text-neonCyan font-bold text-lg animate-pulse">UNLOCKING...</p>
                </>
              ) : (
                <>
                   <div className="text-7xl mb-6 scale-110 transition-transform text-green-500">✨</div>
                   <h2 className="text-3xl font-black text-white mb-2">REWARD GRANTED</h2>
                </>
              )}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1.5 bg-gray-800 w-full">
               <div 
                 className="h-full bg-gradient-to-r from-neonCyan to-neonPurple transition-all duration-1000 ease-linear" 
                 style={{ width: `${((5 - timeLeft) / 5) * 100}%` }}
               ></div>
            </div>
        </div>

        <p className="mt-8 text-gray-500 text-sm">Please do not close this window.</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content - Transparent Dark Background with Purple Border */}
      <div className="relative bg-black/60 border border-neonPurple text-white rounded-2xl p-8 max-w-sm w-full shadow-[0_0_30px_rgba(160,0,255,0.25)] animate-pop-in overflow-hidden backdrop-blur-xl">
        
        {/* Glow effect on hover/press simulation (static for modal) */}
        <div className="absolute inset-0 pointer-events-none bg-neonPurple/5"></div>

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-black rounded-full flex items-center justify-center border border-neonPurple shadow-[0_0_15px_rgba(160,0,255,0.5)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a0f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">Unlock Premium</h2>
          <p className="text-gray-300 mb-8 leading-relaxed text-sm font-light">
            Remove limits. Unlock specialized agents. No ads.
          </p>
          
          <div className="space-y-4">
            {/* Primary Action - Cyan Gradient */}
            <button 
              onClick={onUnlock}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <span>Unlock ($4.99)</span>
            </button>
            
            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-gray-800"></div>
              <span className="flex-shrink-0 mx-4 text-gray-500 text-[10px] uppercase font-bold tracking-widest">OR</span>
              <div className="flex-grow border-t border-gray-800"></div>
            </div>

            {/* Secondary Action - Transparent with Border */}
            <button 
              onClick={handleWatchAd}
              className="w-full py-3.5 rounded-2xl bg-transparent border border-gray-700 text-gray-300 font-bold hover:border-white hover:text-white hover:bg-white/5 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span>Watch Ad (Free)</span>
            </button>

            <button 
              onClick={onClose}
              className="w-full py-2 rounded-xl text-gray-500 hover:text-white transition-colors text-xs font-medium tracking-wide"
            >
              NO THANKS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};