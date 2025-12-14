import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

const STEPS = [
  {
    title: "Specialized AI Agents",
    desc: "Don't just chat. Act. Unlock specialized agents designed to help you create, game, code, and learn better.",
    icon: "🚀"
  },
  {
    title: "Private & Secure",
    desc: "Your conversations are stored locally on your device. No data is sent to our servers.",
    icon: "🔒"
  }
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative overflow-hidden font-sans">
      {/* Abstract Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-neonCyan opacity-10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-neonPurple opacity-10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none" />

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center z-10">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="mb-10 text-8xl drop-shadow-[0_0_25px_rgba(0,255,255,0.3)] animate-bounce-slow">
            {STEPS[currentStep].icon}
          </div>
          <h2 className="text-4xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 tracking-tight">
            {STEPS[currentStep].title}
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            {STEPS[currentStep].desc}
          </p>
        </div>
      </div>

      <div className="p-8 w-full max-w-md mx-auto z-10">
        <div className="flex justify-center gap-3 mb-8">
          {STEPS.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-8 bg-neonCyan shadow-[0_0_10px_rgba(0,255,255,0.5)]' : 'w-2 bg-gray-800'}`} 
            />
          ))}
        </div>
        
        <button 
          onClick={handleNext}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all active:scale-95 tracking-wide uppercase"
        >
          {currentStep === STEPS.length - 1 ? "Get Started" : "Next"}
        </button>
      </div>
    </div>
  );
};