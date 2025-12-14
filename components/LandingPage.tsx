import React from 'react';
import { PERSONAS } from '../constants';
import { PersonaCard } from './PersonaCard';
import { Persona } from '../types';

interface LandingPageProps {
  onSelectPersona: (persona: Persona) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectPersona }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between text-center px-4 bg-darkBg text-white overflow-hidden">
      
      {/* Decorative Background Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-neonCyan opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-neonPurple opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

      <main className="w-full max-w-5xl flex-1 flex flex-col justify-center py-12 z-10">
        
        {/* Hero Section */}
        <section id="hero" className="mb-16 animate-fade-in-down">
          <div className="mb-6 flex justify-center">
            {/* Logo Placeholder */}
            <div className="w-32 h-32 rounded-3xl flex items-center justify-center drop-shadow-[0_0_15px_rgba(160,0,255,0.5)]">
                 <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                   <defs>
                      <linearGradient id="landingLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                         <stop offset="0%" stopColor="#0ff" />
                         <stop offset="100%" stopColor="#a0f" />
                      </linearGradient>
                   </defs>
                   {/* Cartoon Ghost */}
                   <path d="M20 50C20 25 35 15 50 15C65 15 80 25 80 50V90L70 82L60 90L50 82L40 90L30 82L20 90V50Z" fill="url(#landingLogoGrad)"/>
                   <ellipse cx="38" cy="45" rx="6" ry="8" fill="#darkBg" style={{fill: '#050505'}} />
                   <ellipse cx="62" cy="45" rx="6" ry="8" fill="#darkBg" style={{fill: '#050505'}} />
                </svg>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-neonPurple drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">
            GHOST AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
            Choose a role. Unlock AI.
          </p>
          <div className="mt-8">
            <button className="px-8 py-3 rounded-2xl bg-gradient-to-r from-neonCyan to-neonPurple text-white font-bold text-lg shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:shadow-[0_0_30px_rgba(160,0,255,0.6)] hover:scale-105 transition-all duration-300">
               Get Started
            </button>
          </div>
        </section>

        {/* Personas Section */}
        <section id="personas" className="mb-20">
          <h2 className="text-3xl font-bold mb-10 border-b border-gray-800 pb-4 inline-block px-10">
            Select a Persona
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {PERSONAS.map((persona) => (
              <PersonaCard 
                key={persona.id} 
                persona={persona} 
                isFavorite={false}
                onToggleFavorite={() => {}}
                onClick={onSelectPersona} 
              />
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="max-w-2xl mx-auto text-left bg-cardBg/50 p-8 rounded-2xl border border-gray-800 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-neonCyan">How It Works</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-300 text-lg">
            <li className="pl-2">
              <span className="font-semibold text-white">Select a Persona:</span> Choose the specialized AI agent that fits your needs.
            </li>
            <li className="pl-2">
              <span className="font-semibold text-white">Start Chatting:</span> Interact instantly with the powered Gemini 2.5 Flash model.
            </li>
            <li className="pl-2">
              <span className="font-semibold text-white">Private:</span> Conversations are processed securely and not stored on our servers.
            </li>
          </ol>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-gray-500 text-sm border-t border-gray-900 z-10 bg-darkBg">
        <p>GHOST AI powered by Google Gemini.</p>
        <p className="mt-2">All rights reserved &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};