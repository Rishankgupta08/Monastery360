import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  MapPin, 
  Hotel, 
  Camera, 
  Phone, 
  Sparkles, 
  Clock, 
  Trash2,
  ExternalLink,
  Bot
} from 'lucide-react';
import { useChatbot } from '../contexts/chatbot-context';
import { generateAIResponse } from '../services/chatbot-ai';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

export function AIChatbot() {
  const { messages, isOpen, isTyping, addMessage, setIsTyping, clearMessages } = useChatbot();
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    // Add user message
    addMessage({
      text: userMessage,
      sender: 'user',
      type: 'text'
    });

    try {
      // Generate AI response with conversation context
      const botResponse = await generateAIResponse(userMessage, messages);
      addMessage(botResponse);
    } catch (error) {
      console.error('Error generating AI response:', error);
      addMessage({
        text: '😔 Sorry, I encountered an error. Please try again or ask me something else about monasteries!',
        sender: 'bot',
        type: 'text'
      });
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (action: string, data?: any) => {
    switch (action) {
      case 'virtual_tour':
        navigate('/virtual-tour');
        break;
      case 'map_location':
        navigate('/map');
        break;
      case 'contact_guide':
        if (data?.phone) {
          window.open(`tel:${data.phone}`, '_blank');
        }
        break;
      case 'hotel_booking':
        // Open hotel booking in new tab (you can integrate with booking APIs)
        window.open('https://www.booking.com/searchresults.html?ss=' + encodeURIComponent(data?.location || 'monastery'), '_blank');
        break;
    }
  };

  const QuickActionButtons = ({ message }: { message: any }) => {
    if (!message.metadata) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {message.type === 'location' && (
          <Button
            size="sm"
            onClick={() => handleQuickAction('map_location', message.metadata)}
            className="px-3 py-1 text-xs text-white bg-blue-500 rounded-full hover:bg-blue-600"
          >
            <MapPin className="w-3 h-3 mr-1" />
            View on Map
          </Button>
        )}
        
        {message.type === 'hotel' && (
          <Button
            size="sm"
            onClick={() => handleQuickAction('hotel_booking', message.metadata)}
            className="px-3 py-1 text-xs text-white bg-green-500 rounded-full hover:bg-green-600"
          >
            <Hotel className="w-3 h-3 mr-1" />
            Book Hotels
          </Button>
        )}
        
        {message.type === 'virtual_tour' && (
          <Button
            size="sm"
            onClick={() => handleQuickAction('virtual_tour')}
            className="px-3 py-1 text-xs text-white bg-purple-500 rounded-full hover:bg-purple-600"
          >
            <Camera className="w-3 h-3 mr-1" />
            Start Tour
          </Button>
        )}
        
        {message.type === 'guide_contact' && message.metadata?.guides && (
          message.metadata.guides.map((guide: any, index: number) => (
            <Button
              key={index}
              size="sm"
              onClick={() => handleQuickAction('contact_guide', { phone: guide.phone })}
              className="px-3 py-1 text-xs text-white bg-orange-500 rounded-full hover:bg-orange-600"
            >
              <Phone className="w-3 h-3 mr-1" />
              Call {guide.name.split(' ')[0]}
            </Button>
          ))
        )}
      </div>
    );
  };

  const QuickStartOptions = () => (
    <div className="p-3 border-t bg-gray-50 dark:bg-gray-800">
      <p className="mb-2 text-xs font-medium text-gray-600 dark:text-gray-400">Quick actions:</p>
      <div className="grid grid-cols-2 gap-1.5">
        <Button
          size="sm"
          onClick={() => setInputMessage('Where is Rumtek Monastery?')}
          className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 hover:bg-gray-50 text-xs py-1.5 px-2 rounded-lg"
        >
          <MapPin className="w-3 h-3 mr-1" />
          Find Location
        </Button>
        <Button
          size="sm"
          onClick={() => setInputMessage('Show me virtual tour')}
          className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 hover:bg-gray-50 text-xs py-1.5 px-2 rounded-lg"
        >
          <Camera className="w-3 h-3 mr-1" />
          Virtual Tour
        </Button>
        <Button
          size="sm"
          onClick={() => setInputMessage('Hotels near Tawang?')}
          className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 hover:bg-gray-50 text-xs py-1.5 px-2 rounded-lg"
        >
          <Hotel className="w-3 h-3 mr-1" />
          Find Hotels
        </Button>
        <Button
          size="sm"
          onClick={() => setInputMessage('Connect me with a guide')}
          className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 hover:bg-gray-50 text-xs py-1.5 px-2 rounded-lg"
        >
          <Phone className="w-3 h-3 mr-1" />
          Local Guides
        </Button>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Chatbot Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="overflow-hidden bg-white border border-gray-200 dark:bg-gray-900 rounded-xl dark:border-gray-700"
        style={{ 
          position: 'fixed',
          bottom: '100px',
          right: '24px',
          width: '320px',
          height: '480px',
          zIndex: 9998,
          pointerEvents: 'auto',
          maxWidth: '90vw',
          maxHeight: '70vh',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)'
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] p-3 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-base font-semibold">Monastery AI Guide</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs opacity-90">Online & Ready</span>
                </div>
              </div>
            </div>
            <Button
              size="sm"
              onClick={clearMessages}
              className="bg-white/20 hover:bg-white/30 text-white border-none p-1.5 rounded-full"
              title="Clear Chat"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 space-y-3 overflow-y-auto" style={{ height: '300px' }}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
                <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                {message.sender === 'bot' && (
                  <div className="flex items-center space-x-1.5 mb-1">
                    <div className="w-5 h-5 bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] rounded-full flex items-center justify-center">
                      <Sparkles className="w-2.5 h-2.5 text-white" />
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5">
                      AI
                    </Badge>
                  </div>
                )}
                
                <div
                  className={`p-2.5 rounded-xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white ml-auto'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.text}
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                    <span>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    {message.type && message.type !== 'text' && (
                      <Badge className="px-2 py-0 ml-2 text-xs">
                        {message.type.replace('_', ' ')}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <QuickActionButtons message={message} />
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-center space-x-1.5">
                <div className="w-5 h-5 bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] rounded-full flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Start Options */}
        {messages.length <= 1 && <QuickStartOptions />}

        {/* Input */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about monasteries..."
              className="flex-1 rounded-full border-gray-300 focus:border-[var(--monastery-gold)] focus:ring-[var(--monastery-gold)] text-sm h-8"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] hover:opacity-90 text-white rounded-full px-3 h-8 shadow-lg"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-3 h-3 border-2 border-white rounded-full border-t-transparent"
                />
              ) : (
                <Send className="w-3 h-3" />
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1.5 text-center">
            AI monastery assistant 🏛️
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}