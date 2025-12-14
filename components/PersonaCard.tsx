import React from 'react';
import { Persona } from '../types';
import { PersonaIcon } from './PersonaIcon';

interface PersonaCardProps {
  persona: Persona;
  isFavorite: boolean;
  isPremium: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: (persona: Persona) => void;
}

export const PersonaCard: React.FC<PersonaCardProps> = ({ 
  persona, 
  isFavorite,
  isPremium,
  onToggleFavorite,
  onClick 
}) => {
  const isLocked = persona.locked && !isPremium;

  return (
    <div 
      onClick={() => onClick(persona)}
      className={`
        group relative flex items-center p-4 rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden
        ${isLocked 
          ? 'bg-black/40 border-neonPurple/40 hover:border-neonPurple hover:shadow-[0_0_15px_rgba(160,0,255,0.2)]' 
          : 'bg-[#121212]/80 border-gray-800 hover:border-neonCyan/50 hover:bg-[#161616] hover:shadow-[0_0_15px_rgba(0,255,255,0.15)]'
        }
      `}
    >
      {/* Abstract background shine for unlocked cards */}
      {!isLocked && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
      )}

      {/* Lock Overlay Icon - Top Right */}
      {isLocked && (
        <div className="absolute top-2 right-2 text-neonPurple drop-shadow-[0_0_8px_rgba(160,0,255,0.8)] z-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
      )}

      {/* Icon */}
      <div className={`
        flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-all duration-300 border
        ${isLocked 
           ? 'bg-black border-gray-800 text-gray-600 grayscale' 
           : `bg-gray-900 border-gray-700 text-gray-200 group-hover:text-neonCyan group-hover:border-neonCyan/50 group-hover:shadow-[0_0_10px_rgba(0,255,255,0.2)]`
        }
      `}>
        <PersonaIcon id={persona.id} size="md" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 z-10">
        <div className="flex items-center justify-between mb-0.5 pr-4">
           <h3 className={`text-sm font-bold truncate tracking-wide ${isLocked ? 'text-gray-400' : 'text-white group-hover:text-neonCyan transition-colors'}`}>
             {persona.name}
           </h3>
        </div>
        <p className="text-[11px] text-gray-500 truncate font-light tracking-wide">{persona.description}</p>
      </div>

      {/* Favorite Button */}
      {!isLocked && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(persona.id);
          }}
          className={`
            ml-2 p-2 rounded-full transition-all z-10
            ${isFavorite 
                ? 'text-neonPurple drop-shadow-[0_0_5px_rgba(160,0,255,0.8)] scale-110' 
                : 'text-gray-600 hover:text-white hover:bg-white/10'
            }
          `}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.28 3.6-2.33 3.66-5.22C22.67 5.1 19.56 3 16.69 3 14.92 3 13.26 3.86 12 5.06 10.74 3.86 9.08 3 7.31 3 4.43 3 1.33 5.1 1.39 8.8c.06 2.89 2.16 3.94 3.66 5.22"/><path d="M12 5.06C12 8.5 1 12.35 1 13c0 5 11 10 11 10s11-5 11-10c0-.65-11-4.5-11-7.94"/></svg>
        </button>
      )}
    </div>
  );
};