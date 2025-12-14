import React from 'react';
import { Persona } from '../types';
import { PersonaIcon } from './PersonaIcon';

interface PersonaDetailsProps {
  persona: Persona;
  isFavorite: boolean;
  isPremium: boolean;
  onToggleFavorite: (id: string) => void;
  onStartChat: () => void;
  onUnlock: () => void;
  onBack: () => void;
}

export const PersonaDetails: React.FC<PersonaDetailsProps> = ({ 
  persona, 
  isFavorite, 
  isPremium,
  onToggleFavorite, 
  onStartChat, 
  onUnlock,
  onBack 
}) => {
  const isLocked = persona.locked && !isPremium;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden">
      {/* Subtle Background */}
      <div className={`absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b ${persona.gradient} opacity-10 pointer-events-none`} />

      {/* Header */}
      <header className="p-6 absolute top-0 left-0 right-0 z-20 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="p-3 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/80 transition-colors border border-white/5 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-white"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <button 
          onClick={() => onToggleFavorite(persona.id)}
          className={`p-3 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/80 transition-colors border border-white/5 ${isFavorite ? 'text-neonPurple' : 'text-gray-400'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.28 3.6-2.33 3.66-5.22C22.67 5.1 19.56 3 16.69 3 14.92 3 13.26 3.86 12 5.06 10.74 3.86 9.08 3 7.31 3 4.43 3 1.33 5.1 1.39 8.8c.06 2.89 2.16 3.94 3.66 5.22"/><path d="M12 5.06C12 8.5 1 12.35 1 13c0 5 11 10 11 10s11-5 11-10c0-.65-11-4.5-11-7.94"/></svg>
        </button>
      </header>

      {/* Hero Icon */}
      <div className="h-[45vh] flex items-center justify-center relative z-10">
        <div className={`text-neonCyan drop-shadow-[0_0_30px_rgba(0,255,255,0.2)] ${isLocked ? 'grayscale opacity-30' : ''}`}>
          <PersonaIcon id={persona.id} size="xl" />
        </div>
      </div>

      {/* Details Card */}
      <div className="flex-1 bg-[#0a0a0a] rounded-t-[32px] px-8 py-10 flex flex-col items-center -mt-8 relative z-10 border-t border-gray-900 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
        <div className="w-12 h-1 bg-gray-800 rounded-full mb-8 opacity-50" />
        
        <div className="flex gap-2 mb-6">
          {persona.tags.map((tag, i) => (
             <span key={i} className="text-[10px] font-bold tracking-widest text-neonCyan border border-neonCyan/30 px-3 py-1 rounded-sm uppercase">{tag}</span>
          ))}
        </div>

        <h1 className="text-3xl font-bold mb-4 text-center text-white tracking-wide">{persona.name}</h1>
        <p className="text-sm text-gray-400 text-center mb-12 max-w-xs leading-relaxed font-light">
          {persona.description}
        </p>

        <div className="mt-auto w-full max-w-xs space-y-4">
          {isLocked ? (
             <button 
              onClick={onUnlock}
              className="w-full py-4 rounded-xl font-bold text-sm text-white border border-neonPurple/50 bg-neonPurple/10 hover:bg-neonPurple/20 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span>Unlock Access</span>
            </button>
          ) : (
            <button 
              onClick={onStartChat}
              className="w-full py-4 rounded-xl font-bold text-sm text-black bg-neonCyan hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <span>Initialize Chat</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};