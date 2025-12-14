import React, { useState, useEffect, useRef } from 'react';
import { Persona, Message } from '../types';
import { createChatSession, sendMessageStream } from '../services/geminiService';
import { Chat } from "@google/genai";
import { PersonaIcon } from './PersonaIcon';

interface ChatInterfaceProps {
  persona: Persona;
  onBack: () => void;
  onClose: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ persona, onBack, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`chat_history_${persona.id}`);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse chat history", e);
      }
    } else {
      setMessages([
        {
          id: 'init',
          role: 'model',
          text: `System online. Connected to ${persona.name}.`,
          timestamp: Date.now()
        }
      ]);
    }
  }, [persona.id]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`chat_history_${persona.id}`, JSON.stringify(messages));
    }
  }, [messages, persona.id]);

  useEffect(() => {
    chatSessionRef.current = createChatSession(persona.systemInstruction);
  }, [persona.systemInstruction]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || !chatSessionRef.current || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);

    const aiMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: aiMsgId,
      role: 'model',
      text: '',
      timestamp: Date.now()
    }]);

    let fullResponse = '';

    await sendMessageStream(chatSessionRef.current, userText, (chunk) => {
      fullResponse += chunk;
      setMessages(prev => prev.map(msg => 
        msg.id === aiMsgId ? { ...msg, text: fullResponse } : msg
      ));
    });

    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    if (window.confirm("Purge session data?")) {
      setMessages([{
        id: Date.now().toString(),
        role: 'model',
        text: `Session purged. Re-initializing... Ready.`,
        timestamp: Date.now()
      }]);
      localStorage.removeItem(`chat_history_${persona.id}`);
      chatSessionRef.current = createChatSession(persona.systemInstruction);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white max-w-4xl mx-auto border-x border-gray-900 shadow-2xl relative overflow-hidden font-sans">
      
      {/* Abstract Dark Mode Background */}
      <div className="absolute inset-0 pointer-events-none">
         {/* Base */}
         <div className="absolute inset-0 bg-black"></div>
         {/* Soft Neon Gradients */}
         <div className="absolute top-0 left-0 w-[80%] h-[50%] bg-[radial-gradient(circle_at_0%_0%,rgba(0,255,255,0.08),transparent_60%)]"></div>
         <div className="absolute bottom-0 right-0 w-[80%] h-[50%] bg-[radial-gradient(circle_at_100%_100%,rgba(160,0,255,0.08),transparent_60%)]"></div>
         {/* Geometric Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
         {/* Scanline Effect */}
         <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-10 pointer-events-none"></div>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-xl border-b border-white/5 z-20 sticky top-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="text-gray-400 hover:text-neonCyan transition-colors p-2 hover:bg-white/5 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <div className="flex items-center gap-3">
             <div className="text-neonCyan drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
                <PersonaIcon id={persona.id} size="md" />
             </div>
             <div>
               <h1 className="text-sm font-bold tracking-[0.2em] uppercase text-white drop-shadow-md">{persona.name}</h1>
               <div className="flex items-center gap-1.5 opacity-60">
                  <div className="w-1.5 h-1.5 bg-neonCyan rounded-full animate-pulse shadow-[0_0_5px_rgba(0,255,255,0.8)]"></div>
                  <span className="text-[10px] font-mono text-neonCyan tracking-widest">ONLINE</span>
               </div>
             </div>
          </div>
        </div>

        <button 
           onClick={handleReset}
           className="text-gray-600 hover:text-red-500 transition-colors p-2"
           title="Reset"
        >
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 relative z-10 scroll-smooth">
        {messages.map((msg, index) => {
           const isUser = msg.role === 'user';
           return (
            <div 
              key={msg.id} 
              className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
            >
              <div className={`max-w-[85%] flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`
                   flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border backdrop-blur-sm
                   ${isUser 
                     ? 'bg-gray-800/80 border-gray-600 text-gray-300' 
                     : 'bg-black/50 border-neonPurple/50 text-neonPurple shadow-[0_0_10px_rgba(160,0,255,0.3)]'
                   }
                `}>
                   {isUser 
                     ? <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                     : <PersonaIcon id={persona.id} size="sm" />
                   }
                </div>

                {/* Bubble */}
                <div className={`
                  relative px-5 py-3 text-[15px] leading-relaxed shadow-lg backdrop-blur-md
                  ${isUser 
                    ? 'rounded-2xl rounded-tr-sm bg-cyan-900/20 border border-neonCyan/40 text-cyan-50 shadow-[0_0_15px_rgba(0,255,255,0.1)]' 
                    : 'rounded-2xl rounded-tl-sm bg-[#111]/80 border border-neonPurple/20 text-gray-200 shadow-[0_0_15px_rgba(160,0,255,0.05)]'
                  }
                `}>
                   {msg.text || (
                      <div className="flex gap-1 items-center h-6">
                         <span className="w-1.5 h-1.5 bg-neonPurple rounded-full animate-bounce"></span>
                         <span className="w-1.5 h-1.5 bg-neonPurple rounded-full animate-bounce delay-100"></span>
                         <span className="w-1.5 h-1.5 bg-neonPurple rounded-full animate-bounce delay-200"></span>
                      </div>
                   )}
                </div>

              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gradient-to-t from-black via-black/90 to-transparent sticky bottom-0 z-20">
        <form 
          onSubmit={handleSendMessage} 
          className="relative flex items-center gap-3"
        >
          <div className="flex-1 relative group">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter command..."
                className="w-full bg-[#111]/80 border border-gray-800 rounded-2xl px-5 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neonCyan/50 focus:bg-[#151515] focus:shadow-[0_0_20px_rgba(0,255,255,0.1)] transition-all font-mono text-sm backdrop-blur-md"
                disabled={isLoading}
                autoComplete="off"
            />
          </div>
          
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className={`
               h-11 px-6 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center shadow-lg
               ${!inputValue.trim() || isLoading 
                 ? 'bg-gray-900 text-gray-600 cursor-not-allowed border border-gray-800' 
                 : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border border-cyan-400/30 shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)] active:scale-95'
               }
            `}
          >
            {isLoading ? (
               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
               <span>SEND</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};