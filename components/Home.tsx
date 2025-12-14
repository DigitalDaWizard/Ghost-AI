import React, { useState, useMemo } from 'react';
import { Persona, PersonaCategory } from '../types';
import { PersonaCard } from './PersonaCard';
import { PERSONAS } from '../constants';
import { PersonaIcon } from './PersonaIcon';

interface HomeProps {
  onSelectPersona: (persona: Persona) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onGoSettings: () => void;
  isPremium: boolean;
}

const CATEGORIES: PersonaCategory[] = ['All', 'Creative', 'Gaming', 'Tech', 'Social', 'Learning'];

const AdBanner = () => (
  <div className="w-full mx-auto mb-6 relative group">
    <div className="bg-[#111]/80 backdrop-blur border border-gray-800 rounded-2xl p-4 flex items-center justify-between relative overflow-hidden shadow-lg">
      <div className="absolute top-0 left-0 bg-gray-800 text-[8px] px-1.5 py-0.5 text-gray-400 font-mono rounded-br-lg z-10">AD</div>
      <div className="flex items-center gap-4 relative z-10 pl-2">
        <div className="w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center text-neonPurple border border-gray-700">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-200">Unlock Full Access</h3>
          <p className="text-[11px] text-gray-500">Remove ads & get premium agents.</p>
        </div>
      </div>
      <button className="relative z-10 px-4 py-2 bg-gradient-to-r from-neonCyan to-blue-500 hover:shadow-[0_0_10px_rgba(0,255,255,0.4)] text-xs font-bold text-white rounded-xl transition-all border border-white/10">
        Upgrade
      </button>
    </div>
  </div>
);

export const Home: React.FC<HomeProps> = ({ 
  onSelectPersona, 
  favorites, 
  onToggleFavorite,
  onGoSettings,
  isPremium
}) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<PersonaCategory>('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredPersonas = useMemo(() => {
    return PERSONAS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                            p.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesFavorite = !showFavoritesOnly || favorites.includes(p.id);
      
      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [search, activeCategory, showFavoritesOnly, favorites]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans relative">
      
      {/* Abstract Dark Mode Background */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-black"></div>
         <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-neonCyan opacity-5 blur-[120px] rounded-full"></div>
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neonPurple opacity-5 blur-[120px] rounded-full"></div>
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-xl z-30 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="text-neonCyan w-8 h-8 drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]">
             <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 50C20 25 35 15 50 15C65 15 80 25 80 50V90L70 82L60 90L50 82L40 90L30 82L20 90V50Z" stroke="currentColor" strokeWidth="4" fill="none"/>
                <circle cx="38" cy="45" r="4" fill="currentColor" />
                <circle cx="62" cy="45" r="4" fill="currentColor" />
             </svg>
          </div>
          <h1 className="text-lg font-bold tracking-[0.15em] text-white uppercase drop-shadow-md">GHOST AI</h1>
        </div>
        <button 
          onClick={onGoSettings}
          className="p-2.5 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </header>

      <div className="flex-1 p-4 max-w-2xl mx-auto w-full z-10">
        {!isPremium && <AdBanner />}

        {/* Search & Filters */}
        <div className="sticky top-20 z-20 bg-black/90 backdrop-blur-lg py-3 -mx-4 px-4 mb-4 space-y-4 border-b border-white/5">
          <div className="relative">
            <input 
              type="text" 
              placeholder="SEARCH PROTOCOLS..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111] border border-gray-800 rounded-xl px-10 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neonCyan/50 focus:shadow-[0_0_15px_rgba(0,255,255,0.1)] transition-all font-mono"
            />
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
               onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
               className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${showFavoritesOnly ? 'bg-neonPurple/10 text-neonPurple border-neonPurple' : 'bg-[#111] text-gray-500 border-gray-800'}`}
             >
               ★ Favs
             </button>
             <div className="w-px h-6 bg-gray-800 my-auto mx-1"></div>
             {CATEGORIES.map(cat => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                   activeCategory === cat 
                     ? 'bg-white text-black border-white shadow-[0_0_10px_rgba(255,255,255,0.2)]' 
                     : 'bg-[#111] text-gray-500 border-gray-800 hover:text-gray-300'
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>

        {/* Compact List Grid */}
        {filteredPersonas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-20">
            {filteredPersonas.map(persona => (
              <PersonaCard 
                key={persona.id} 
                persona={persona} 
                isFavorite={favorites.includes(persona.id)}
                isPremium={isPremium}
                onToggleFavorite={onToggleFavorite}
                onClick={onSelectPersona} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-700 opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
            <p className="font-mono text-sm">NO AGENTS FOUND</p>
          </div>
        )}
      </div>
    </div>
  );
};