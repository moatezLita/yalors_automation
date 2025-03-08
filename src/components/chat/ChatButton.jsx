// src/components/chat/ChatButton.js
'use client'; // This marks it as a client component

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ChatBubbleIcon, XIcon } from '@/components/icons/ChatIcons';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  
  const buttonRef = useRef(null);
  const chatWindowRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Setup GSAP animation for button pulse effect
  useEffect(() => {
    if (buttonRef.current && hasUnreadMessages && !isOpen) {
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(buttonRef.current, { scale: 1.1, duration: 0.5 })
        .to(buttonRef.current, { scale: 1, duration: 0.5 });

      return () => {
        tl.kill();
      };
    }
  }, [hasUnreadMessages, isOpen]);

  // Welcome message on first load
  useEffect(() => {
    const hasShownWelcome = sessionStorage.getItem('welcomeMessageShown');
    
    if (!hasShownWelcome) {
      // Add a slight delay for the welcome message
      const timer = setTimeout(() => {
        setMessages([{
          text: "👋 Bienvenue chez Yalors! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui avec vos besoins en développement web?",
          sender: 'bot'
        }]);
        setHasUnreadMessages(true);
        sessionStorage.setItem('welcomeMessageShown', 'true');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      setHasUnreadMessages(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
  
    // Add user message
    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);
  
    try {
      // N8n webhook URL - adjust URL as needed for production vs development
    //   const webhookUrl = process.env.NODE_ENV === 'production' 
    //     ? 'https://yalors.app.n8n.cloud/webhook/a889d2ae-2159-402f-b326-5f61e90f602e/chat'
    //     : 'http://localhost:5678/webhook/a889d2ae-2159-402f-b326-5f61e90f602e/chat';
        
      const response = await fetch('http://54.38.189.103:5678/webhook/a889d2ae-2159-402f-b326-5f61e90f602e/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          chatInput: input, // Changed from message to chatInput as expected by the AI node
          sessionId: getOrCreateSessionId()
        }),
      });
      
      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      
      // Extract the response from either output or response field
      const aiMessage = data.output || data.response || "Merci pour votre message. Notre équipe vous contactera prochainement.";
      
      // Add AI response
      setMessages(prev => [...prev, { 
        text: aiMessage, 
        sender: 'bot' 
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        text: "Désolé, nous avons rencontré un problème technique. Veuillez réessayer plus tard ou nous contacter directement à contact@yalors.tn.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get or create session ID for conversation persistence
  const getOrCreateSessionId = () => {
    let sessionId = localStorage.getItem('chatSessionId');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('chatSessionId', sessionId);
    }
    return sessionId;
  };
  
  // Close chat when escape key is pressed
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* Chat button */}
      <motion.button
        ref={buttonRef}
        aria-label="Open chat support"
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full text-white shadow-lg flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
          hasUnreadMessages && !isOpen ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ChatBubbleIcon />
        {hasUnreadMessages && !isOpen && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            !
          </span>
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', bounce: 0.3 }}
          >
            {/* Chat header */}
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-medium">Yalors Support</h3>
              <button 
                aria-label="Close chat"
                onClick={toggleChat}
                className="text-white p-1 rounded-full hover:bg-blue-700 transition-colors"
              >
                <XIcon />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p>Ask us anything! We're here to help.</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none max-w-xs">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatButton;