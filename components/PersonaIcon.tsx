import React from 'react';

interface PersonaIconProps {
  id: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const PersonaIcon: React.FC<PersonaIconProps> = ({ id, size = 'md', className = '' }) => {
  const getSize = () => {
    switch (size) {
      case 'sm': return 16;
      case 'md': return 24;
      case 'lg': return 48;
      case 'xl': return 96;
      default: return 24;
    }
  };

  const px = getSize();

  const getIconContent = () => {
    switch (id) {
      case 'viral_creator': // Star/Sparkle
        return (
          <>
            <path d="M12 2L14.4 9.2H22L15.8 13.6L18.2 20.8L12 16.4L5.8 20.8L8.2 13.6L2 9.2H9.6L12 2Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
          </>
        );
      case 'gamer_coach': // D-Pad / Controller
        return (
          <>
            <rect x="2" y="6" width="20" height="12" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M6 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="15" cy="10" r="1.5" fill="currentColor"/>
            <circle cx="17" cy="13" r="1.5" fill="currentColor"/>
          </>
        );
      case 'developer': // Terminal / Code
        return (
          <>
            <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M7 10L9 12L7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 14H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </>
        );
      case 'fan_assistant': // Heart + Chat
        return (
          <>
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12 7.5C12 7.5 14 6 15.5 7.5C17 9 17 11 12 14C7 11 7 9 8.5 7.5C10 6 12 7.5 12 7.5Z" fill="currentColor" stroke="none"/>
          </>
        );
      case 'study_buddy': // Book / Knowledge
        return (
          <>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M12 7V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </>
        );
      case 'startup_mentor': // Graph / Rocket
        return (
          <>
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </>
        );
      case 'fitness_coach': // Dumbbell
        return (
          <>
            <path d="M6.5 7H17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M6.5 17H17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 7V17" stroke="currentColor" strokeWidth="2"/>
            <rect x="2" y="4" width="4.5" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="2" y="14" width="4.5" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="17.5" y="4" width="4.5" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="17.5" y="14" width="4.5" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </>
        );
      default:
        return <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>;
    }
  };

  return (
    <svg 
      width={px} 
      height={px} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {getIconContent()}
    </svg>
  );
};