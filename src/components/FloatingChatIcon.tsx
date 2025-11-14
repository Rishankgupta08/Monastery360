import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatbot } from '../contexts/chatbot-context';
import { Button } from './ui/button';

export function FloatingChatIcon() {
  const { isOpen, setIsOpen, messages } = useChatbot();
  const [isHovered, setIsHovered] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [hasNewMessage, setHasNewMessage] = useState(false);


  // Check for new bot messages to show notification
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === 'bot' && !isOpen) {
      setHasNewMessage(true);
    }
  }, [messages, isOpen]);

  // Clear new message indicator when chat opens
  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
    }
  }, [isOpen]);

  // Hide pulse after initial display
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setHasNewMessage(false);
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-[9999]" 
      style={{ 
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 99999,
        pointerEvents: 'auto'
      }}
    >
      <AnimatePresence>
        {/* Floating helper text */}
        {(isHovered || showPulse) && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="absolute bottom-20 right-0 mb-2"
            style={{ bottom: '80px', right: '0px' }}
          >
            <div className="bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium whitespace-nowrap">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Ask me about monasteries!</span>
              </div>
              {/* Speech bubble arrow */}
              <div className="absolute bottom-[-6px] right-4 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-[var(--monastery-gold)]"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Icon Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative"
      >
        <Button
          onClick={handleToggle}
          className={`
            w-16 h-16 rounded-full shadow-2xl border-2 border-white/20
            bg-gradient-to-br from-[var(--monastery-saffron)] via-[var(--monastery-gold)] to-[var(--monastery-maroon)]
            hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]
            hover:scale-105 active:scale-95
            transition-all duration-300 ease-in-out
            relative overflow-hidden group
            ${isOpen ? 'rotate-45' : 'rotate-0'}
          `}
          style={{ 
            position: 'relative', 
            zIndex: 10000,
            cursor: 'pointer',
            pointerEvents: 'auto'
          }}
          type="button"
          role="button"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Icon */}
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 text-white"
          >
            {isOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <MessageCircle className="w-7 h-7" />
            )}
          </motion.div>

          {/* Pulse effect */}
          {(showPulse || hasNewMessage) && !isOpen && (
            <div className="absolute inset-0 rounded-full border-2 border-white/60 animate-ping"></div>
          )}
        </Button>

        {/* New message indicator */}
        {hasNewMessage && !isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-3 h-3 bg-white rounded-full"
            ></motion.div>
          </motion.div>
        )}

        {/* AI Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute -bottom-1 -right-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg border border-white/30"
        >
          AI
        </motion.div>
      </motion.div>

      {/* Decorative floating particles */}
      <AnimatePresence>
        {isHovered && !isOpen && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, (i - 1) * 20],
                  y: [0, -30 - i * 10]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="absolute top-2 left-2 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}