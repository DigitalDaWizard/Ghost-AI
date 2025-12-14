import React from 'react';

interface SettingsProps {
  onBack: () => void;
  onClearData: () => void;
  isPremium: boolean;
  onUnlock: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onBack, onClearData, isPremium, onUnlock }) => {
  return (
    <div className="min-h-screen bg-darkBg text-white flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-gray-800 flex items-center gap-4 bg-cardBg sticky top-0 z-10">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h1 className="text-lg font-bold">Settings</h1>
      </header>

      <div className="p-6 space-y-8 max-w-2xl mx-auto w-full">
        
        {/* Premium Section */}
        <section className="animate-fade-in-down">
          {isPremium ? (
             <div className="bg-gradient-to-r from-gray-900 to-black border border-green-500/30 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                   </div>
                   <div>
                      <h2 className="text-xl font-bold text-white">Premium Unlocked</h2>
                      <p className="text-gray-400 text-sm">Ad-free experience & exclusive agents enabled.</p>
                   </div>
                </div>
             </div>
          ) : (
            <div className="bg-gradient-to-r from-gray-900 to-black border border-neonPurple/50 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_20px_rgba(160,0,255,0.15)]">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="currentColor" className="text-neonPurple"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
              <h2 className="text-xl font-bold text-neonPurple mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                GHOST Premium
              </h2>
              <p className="text-gray-300 text-sm mb-6 max-w-xs">
                Remove ads, unlock exclusive personas, and get unlimited access.
              </p>
              <button 
                onClick={onUnlock}
                className="w-full py-3 bg-gradient-to-r from-neonCyan to-neonPurple text-white font-bold rounded-2xl transition-colors shadow-neon hover:shadow-neonHover active:scale-95 transform duration-200"
              >
                Unlock Now - $4.99
              </button>
            </div>
          )}
        </section>

        {/* Appearance */}
        <section>
          <h2 className="text-neonCyan text-sm font-bold uppercase tracking-wider mb-4">Appearance</h2>
          <div className="bg-cardBg rounded-2xl overflow-hidden border border-gray-800">
             <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-gray-800 rounded-lg text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                   </div>
                   <span>Dark Mode</span>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer translate-x-6 border-neonCyan" checked readOnly/>
                    <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-neonCyan cursor-pointer"></label>
                </div>
             </div>
             <p className="p-4 text-xs text-gray-500 bg-gray-900/50">
               Theme is currently locked to Dark Mode for the best neon experience.
             </p>
          </div>
        </section>

        {/* About Section */}
        <section>
          <h2 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-4">System</h2>
          <div className="bg-cardBg rounded-2xl p-4 border border-gray-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-300">Version</span>
              <span className="text-gray-500 font-mono text-xs bg-gray-900 px-2 py-1 rounded">v2.1.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-300">Model</span>
              <span className="text-neonPurple font-bold text-sm">Gemini 2.5 Flash</span>
            </div>
            <div className="pt-4 border-t border-gray-800">
              <button 
                onClick={() => {
                  if(window.confirm("Are you sure? This will delete all local chat history and favorites.")) {
                    onClearData();
                  }
                }}
                className="w-full py-3 text-red-500 border border-red-500/20 hover:bg-red-500/10 rounded-2xl transition-colors text-sm font-bold flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                Reset All App Data
              </button>
            </div>
          </div>
        </section>

        <div className="text-center text-gray-600 text-xs mt-12 pb-8">
          GHOST AI &copy; {new Date().getFullYear()} <br/>
          Powered by Google Gemini
        </div>
      </div>
    </div>
  );
};