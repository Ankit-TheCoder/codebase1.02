
import React, { useState, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { use3DTilt } from '@/hooks/use3DTilt';
import FloatingElements from './FloatingElements';
import MorphingShape from './MorphingShape';
import InteractiveCodeSnippet from './InteractiveCodeSnippet';

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showHindi, setShowHindi] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showCodeSnippet, setShowCodeSnippet] = useState(false);
  
  const heroTiltRef = use3DTilt({ max: 12, scale: 1.03, glare: true });

  const roles = [
    'Frontend Developer',
    'Digital Poet',
    'C++ & Python Wizard',
    'Creative Web Architect',
    'Code Artist'
  ];

  const buttonTexts = {
    viewWork: {
      english: 'View My Work',
      hindi: 'मेरा काम देखें'
    },
    downloadResume: {
      english: 'Download Resume',
      hindi: 'रिज्यूमे डाउनलोड करें'
    }
  };

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentRoleText = roles[currentRole];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRoleText.length) {
          setDisplayText(currentRoleText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole, roles]);

  const handleDownloadResume = () => {
    window.open('https://drive.google.com/file/d/1AAupR6wQi9iwbhHujZc6dBra3Yflq7xn/view?usp=sharing', '_blank');
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      {/* Floating creative elements */}
      <FloatingElements />

      {/* Morphing background shapes */}
      <MorphingShape className="w-96 h-96 top-10 left-10" />
      <MorphingShape className="w-64 h-64 bottom-20 right-20" />
      <MorphingShape className="w-48 h-48 top-1/2 left-1/4" />

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Parallax layers */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 transition-all duration-300"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
        }}
      />
      
      <div 
        className="absolute inset-0 bg-gradient-to-l from-blue-600/10 to-cyan-600/10 transition-all duration-500"
        style={{
          transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
        }}
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Main content */}
          <div 
            ref={heroTiltRef}
            className="backdrop-blur-lg bg-gradient-to-br from-white/15 to-white/5 rounded-3xl p-12 border border-white/30 shadow-2xl relative transform-gpu overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-50 animate-pulse" />
            
            <div className="glare absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 rounded-3xl" />
            
            {/* Profile image with enhanced effects */}
            <div 
              className="relative w-36 h-36 mx-auto mb-8 group"
              style={{ transform: 'translateZ(50px)' }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-spin-slow opacity-75" />
              <div className="absolute inset-2 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 p-1">
                <img 
                  src="/lovable-uploads/e27b73cc-6942-41b6-8c66-24ee0b89ba6b.png" 
                  alt="Ankit - The Coder" 
                  className="w-full h-full object-cover rounded-full hover:scale-110 transition-all duration-700 group-hover:brightness-110"
                />
              </div>
              {/* Floating icons around profile */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                ⚡
              </div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                🚀
              </div>
            </div>
            
            <div style={{ transform: 'translateZ(40px)' }}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 transition-all duration-500 hover:scale-105 relative">
                <span className="inline-block animate-pulse">Turning</span>{' '}
                <span className="inline-block animate-bounce">Code</span>{' '}
                <span className="inline-block animate-pulse">into</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 transition-all duration-500 hover:from-pink-400 hover:via-purple-400 hover:to-blue-400 animate-gradient-x">
                  Magic
                </span>
                {/* Floating emojis */}
                <span className="absolute -top-4 -right-4 text-2xl animate-bounce">✨</span>
                <span className="absolute -bottom-4 -left-4 text-2xl animate-pulse">🪄</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-4 transition-all duration-300 hover:text-white animate-fade-in">
                Where Creativity Meets Code ✨
              </p>
              
              {/* Enhanced typewriter effect */}
              <div className="text-2xl md:text-3xl text-purple-300 mb-8 h-12 flex items-center justify-center relative">
                <span className="border-r-2 border-purple-300 pr-1 animate-pulse transition-all duration-300 glow-text">
                  {displayText}
                </span>
                <span className="absolute -right-8 text-yellow-400 animate-bounce">🎯</span>
              </div>
            </div>
            
            {/* Enhanced buttons with more effects */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6" style={{ transform: 'translateZ(30px)' }}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 text-white px-8 py-3 transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-white/30 transform-gpu relative overflow-hidden group"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ transform: 'translateZ(10px)' }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  {showHindi ? buttonTexts.viewWork.hindi : buttonTexts.viewWork.english}
                  <span className="group-hover:animate-bounce">🚀</span>
                </span>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/60 text-white hover:bg-white/30 hover:border-white/80 px-8 py-3 transition-all duration-300 hover:scale-110 bg-white/15 backdrop-blur-sm transform-gpu relative overflow-hidden group"
                onClick={() => setShowCodeSnippet(!showCodeSnippet)}
                style={{ transform: 'translateZ(10px)' }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  {showCodeSnippet ? 'Hide Code' : 'Show Live Code'}
                  <span className="group-hover:animate-pulse">💻</span>
                </span>
              </Button>
            </div>

            {/* Social links with enhanced animations */}
            <div className="flex justify-center space-x-6 mb-6" style={{ transform: 'translateZ(25px)' }}>
              <a 
                href="https://github.com/Ankit-TheCoder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-300 hover:scale-125 hover:rotate-12 transform-gpu"
              >
                <Github size={28} className="drop-shadow-lg hover:drop-shadow-2xl" />
              </a>
              <a 
                href="https://www.linkedin.com/in/ankit%7Ethecoder/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-300 hover:scale-125 hover:-rotate-12 transform-gpu"
              >
                <Linkedin size={28} className="drop-shadow-lg hover:drop-shadow-2xl" />
              </a>
              <a 
                href="https://www.instagram.com/krishn_skha.a/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-300 hover:scale-125 hover:rotate-12 transform-gpu"
              >
                <Instagram size={28} className="drop-shadow-lg hover:drop-shadow-2xl" />
              </a>
            </div>

            {/* Language Toggle with enhanced styling */}
            <div className="mt-6" style={{ transform: 'translateZ(20px)' }}>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowHindi(!showHindi)}
                className="text-white/60 hover:text-white/90 hover:bg-white/20 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
              >
                <span className="flex items-center gap-2">
                  {showHindi ? 'Show English 🇺🇸' : 'हिंदी में देखें 🇮🇳'}
                </span>
              </Button>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white/20 rounded-full animate-spin-slow" style={{ transform: 'translateZ(5px)' }} />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-white/20 rounded-full animate-ping" style={{ transform: 'translateZ(5px)' }} />
          </div>

          {/* Interactive Code Snippet */}
          <div className={`transition-all duration-500 ${showCodeSnippet ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <InteractiveCodeSnippet />
          </div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-all duration-300 hover:scale-125 group cursor-pointer"
             onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/60 text-sm group-hover:text-white/90 transition-colors duration-300">Scroll to explore the magic</span>
            <ArrowDown className="text-white/60 group-hover:text-white/90 transition-all duration-300 drop-shadow-lg" size={32} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
