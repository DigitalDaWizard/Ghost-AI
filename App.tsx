import React, { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { ChatInterface } from './components/ChatInterface';
import { SplashScreen } from './components/SplashScreen';
import { Onboarding } from './components/Onboarding';
import { PersonaDetails } from './components/PersonaDetails';
import { Settings } from './components/Settings';
import { PremiumModal } from './components/PremiumModal';
import { Persona, ScreenType } from './types';

const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenType>('splash');
  const [currentPersona, setCurrentPersona] = useState<Persona | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isPremium, setIsPremium] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  // Initialize persistence
  useEffect(() => {
    const savedFavs = localStorage.getItem('actas_favorites');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));

    const premiumStatus = localStorage.getItem('actas_premium_unlocked') === 'true';
    setIsPremium(premiumStatus);
  }, []);

  const handleSplashFinish = () => {
    const hasOnboarded = localStorage.getItem('actas_onboarding_complete');
    if (hasOnboarded) {
      setScreen('home');
    } else {
      setScreen('onboarding');
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('actas_onboarding_complete', 'true');
    setScreen('home');
  };

  const handleSelectPersona = (persona: Persona) => {
    // If locked and not premium, show modal directly instead of going to details
    // OR go to details but keep chat locked. Let's go to details to show what they are missing.
    setCurrentPersona(persona);
    setScreen('details');
  };

  const handleStartChat = () => {
    setScreen('chat');
  };

  const handleBackToHome = () => {
    setScreen('home');
    setCurrentPersona(null);
  };

  const handleBackToDetails = () => {
    setScreen('details');
  };

  const handleGoSettings = () => {
    setScreen('settings');
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavs = prev.includes(id) 
        ? prev.filter(f => f !== id) 
        : [...prev, id];
      localStorage.setItem('actas_favorites', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const handleClearData = () => {
    localStorage.clear();
    setFavorites([]);
    setIsPremium(false);
    setScreen('splash'); // Reset app
  };

  const handleUnlockPremium = () => {
    localStorage.setItem('actas_premium_unlocked', 'true');
    setIsPremium(true);
    setShowPremiumModal(false);
  };

  const triggerPremiumModal = () => {
    setShowPremiumModal(true);
  };

  return (
    <div className="antialiased text-gray-100 font-sans">
      {screen === 'splash' && (
        <SplashScreen onFinish={handleSplashFinish} />
      )}
      
      {screen === 'onboarding' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}

      {screen === 'home' && (
        <Home 
          onSelectPersona={handleSelectPersona}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onGoSettings={handleGoSettings}
          isPremium={isPremium}
        />
      )}

      {screen === 'details' && currentPersona && (
        <PersonaDetails 
          persona={currentPersona}
          isFavorite={favorites.includes(currentPersona.id)}
          isPremium={isPremium}
          onToggleFavorite={handleToggleFavorite}
          onStartChat={handleStartChat}
          onUnlock={triggerPremiumModal}
          onBack={handleBackToHome}
        />
      )}

      {screen === 'chat' && currentPersona && (
        <ChatInterface 
          persona={currentPersona} 
          onBack={handleBackToDetails} 
          onClose={handleBackToHome}
        />
      )}

      {screen === 'settings' && (
        <Settings 
          onBack={() => setScreen('home')} 
          onClearData={handleClearData}
          isPremium={isPremium}
          onUnlock={triggerPremiumModal}
        />
      )}

      {showPremiumModal && (
        <PremiumModal 
          onUnlock={handleUnlockPremium} 
          onClose={() => setShowPremiumModal(false)} 
        />
      )}
    </div>
  );
};

export default App;