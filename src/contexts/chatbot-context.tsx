import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'location' | 'hotel' | 'virtual_tour' | 'guide_contact' | 'visiting_info' | 'etiquette' | 'itinerary';
  metadata?: any;
}

export interface ChatbotContextType {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setIsOpen: (open: boolean) => void;
  setIsTyping: (typing: boolean) => void;
  clearMessages: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: '🙏 **Namaste! Welcome to Monastery360**\n\nI\'m your personal AI monastery guide, powered by advanced machine learning to provide you with authentic, context-aware assistance.\n\n🎯 **My Expertise:**\n🏛️ **Sacred Sites** - Detailed monastery information\n🗺️ **Smart Navigation** - AI-powered location services\n🏨 **Accommodation** - Curated hotel recommendations\n🎥 **Virtual Reality** - Immersive 360° experiences\n👨‍🏫 **Local Experts** - Connect with verified guides\n📅 **Travel Planning** - Personalized itineraries\n\n✨ **Ask me anything** - I learn and adapt to provide better responses!\n\nWhat spiritual journey can I help you plan today?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([
      {
        id: '1',
        text: '🙏 Welcome back! How can I help you explore the world of monasteries today?',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      }
    ]);
  };

  return (
    <ChatbotContext.Provider value={{
      messages,
      isOpen,
      isTyping,
      addMessage,
      setIsOpen,
      setIsTyping,
      clearMessages
    }}>
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
}