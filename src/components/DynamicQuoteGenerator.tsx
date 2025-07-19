
import React, { useState, useEffect } from 'react';
import { RefreshCw, Quote } from 'lucide-react';

const DynamicQuoteGenerator = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const quotes = [
    {
      text: "Code is poetry written in logic",
      author: "~ Ankit The Coder",
      emoji: "💻"
    },
    {
      text: "Every bug is a feature waiting to be discovered",
      author: "~ Digital Poet",
      emoji: "🐛"
    },
    {
      text: "Dreams in code, reality in pixels",
      author: "~ Creative Developer",
      emoji: "✨"
    },
    {
      text: "I debug, therefore I am",
      author: "~ Tech Philosopher",
      emoji: "🤔"
    },
    {
      text: "Coffee + Code = Magic",
      author: "~ Caffeinated Coder",
      emoji: "☕"
    }
  ];

  const nextQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(nextQuote, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-lg rounded-2xl p-8 border border-white/20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 animate-gradient-x" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Quote className="text-purple-400" size={24} />
            <h3 className="text-xl font-bold text-white">Daily Inspiration</h3>
          </div>
          <button
            onClick={nextQuote}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:rotate-180"
          >
            <RefreshCw size={18} className="text-white" />
          </button>
        </div>
        
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
          <div className="text-center">
            <div className="text-4xl mb-4">{quotes[currentQuote].emoji}</div>
            <blockquote className="text-xl text-white/90 italic mb-4 leading-relaxed">
              "{quotes[currentQuote].text}"
            </blockquote>
            <cite className="text-purple-300 font-semibold">
              {quotes[currentQuote].author}
            </cite>
          </div>
        </div>
        
        {/* Progress indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {quotes.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentQuote ? 'bg-purple-400 w-6' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicQuoteGenerator;
