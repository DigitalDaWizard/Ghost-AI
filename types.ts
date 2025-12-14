export type ScreenType = 'splash' | 'onboarding' | 'home' | 'details' | 'chat' | 'settings';

export type PersonaCategory = 'All' | 'Creative' | 'Gaming' | 'Tech' | 'Social' | 'Learning';

export interface Persona {
  id: string;
  name: string;
  icon: string; // Emoji or URL
  description: string;
  systemInstruction: string;
  gradient: string;
  category: PersonaCategory;
  tags: string[];
  locked?: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface ChatSession {
  personaId: string;
  messages: Message[];
}