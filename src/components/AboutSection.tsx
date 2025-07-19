
import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { use3DTilt } from '@/hooks/use3DTilt';
import { Code, Heart, Star, Trophy, Zap, Sparkles } from 'lucide-react';
import CreativeSkillsVisualizer from './CreativeSkillsVisualizer';
import DynamicQuoteGenerator from './DynamicQuoteGenerator';
import MorphingShape from './MorphingShape';

const AboutSection = () => {
  const imageTiltRef = use3DTilt({ max: 25, scale: 1.08, glare: true });
  const contentTiltRef = use3DTilt({ max: 12, scale: 1.03, glare: true });
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const tabs = ['Journey', 'Skills', 'Inspiration'];

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const achievements = [
    {
      icon: <Star className="w-5 h-5" />,
      text: "🌐 5-star rated on HackerRank in Python, C++, and C",
      color: "from-yellow-400 to-orange-400"
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      text: "🏆 TensorFlow, Infosys, Johns Hopkins certified",
      color: "from-green-400 to-emerald-400"
    },
    {
      icon: <Code className="w-5 h-5" />,
      text: "🛠️ Creator of MindSync AI, FreeChat, and Aircool HVAC Services",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: <Heart className="w-5 h-5" />,
      text: "📖 Published poet with a passion for digital storytelling",
      color: "from-pink-400 to-rose-400"
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="space-y-6">
            <p className="text-lg text-white/95 leading-relaxed hover:text-white transition-colors duration-300">
              I'm a <span className="text-purple-300 font-semibold glow-text">BCA 1st-year student</span> at{' '}
              <span className="text-blue-300 font-semibold">PSIT CHE</span>, passionate about turning ideas into{' '}
              <span className="text-pink-300 font-semibold">interactive digital experiences</span>. 
              With certifications in Python, C++, and Web Development, I bring both creativity and logic to every line of code.
            </p>
            
            <p className="text-lg text-white/95 leading-relaxed hover:text-white transition-colors duration-300">
              I'm also a <span className="text-yellow-300 font-semibold">published poet</span> who finds beauty in simplicity—whether it's in design or verses. ✨
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-4 hover:scale-105 transition-all duration-300 group cursor-pointer p-3 rounded-xl hover:bg-white/10" 
                  style={{ 
                    transform: 'translateZ(15px)',
                    animationDelay: `${index * 200}ms`
                  }}
                >
                  <div className={`w-10 h-10 bg-gradient-to-r ${achievement.color} rounded-full shadow-lg flex items-center justify-center group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`} 
                       style={{ transform: 'translateZ(8px)' }}>
                    {achievement.icon}
                  </div>
                  <span className="text-white/90 group-hover:text-white transition-colors duration-300 flex-1">
                    {achievement.text}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 1:
        return <CreativeSkillsVisualizer />;
      case 2:
        return <DynamicQuoteGenerator />;
      default:
        return null;
    }
  };

  return (
    <section id="about" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Morphing background shapes */}
      <MorphingShape className="w-80 h-80 top-20 right-10 opacity-30" />
      <MorphingShape className="w-60 h-60 bottom-40 left-20 opacity-40" />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 4 + 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 relative inline-block">
              The Story Behind the Code
              <Sparkles className="absolute -top-2 -right-8 text-yellow-400 animate-pulse" size={24} />
              <Zap className="absolute -bottom-2 -left-8 text-blue-400 animate-bounce" size={20} />
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mx-auto animate-gradient-x"></div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Enhanced Image Section */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div 
              ref={imageTiltRef}
              className="backdrop-blur-lg bg-gradient-to-br from-white/20 to-white/5 rounded-3xl p-8 border border-white/30 relative transform-gpu hover-lift overflow-hidden group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-50 group-hover:opacity-75 transition-all duration-500" />
              
              <div className="glare absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 rounded-3xl" />
              
              <div 
                className="relative w-72 h-72 mx-auto rounded-full overflow-hidden mb-8 transition-all duration-700 hover:scale-110 group"
                style={{ transform: 'translateZ(40px)' }}
              >
                {/* Multiple rotating rings */}
                <div className="absolute inset-0 rounded-full border-4 border-purple-400/50 animate-spin-slow" />
                <div className="absolute inset-2 rounded-full border-2 border-pink-400/50 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                <div className="absolute inset-4 rounded-full border border-blue-400/50 animate-pulse" />
                
                <img 
                  src="/lovable-uploads/8dd45701-b3bf-4c17-a144-4b6d95fde861.png" 
                  alt="Ankit - The Coder" 
                  className="w-full h-full object-cover rounded-full transition-all duration-700 group-hover:brightness-110 group-hover:contrast-110"
                />
                
                {/* Floating decorative elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce shadow-2xl">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Creative stats */}
              <div className="grid grid-cols-3 gap-4 text-center" style={{ transform: 'translateZ(20px)' }}>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-purple-400">50+</div>
                  <div className="text-sm text-white/70">Projects</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-400">5</div>
                  <div className="text-sm text-white/70">Languages</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-pink-400">∞</div>
                  <div className="text-sm text-white/70">Ideas</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Content Section with Tabs */}
          <div className={`space-y-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Creative Tab Navigation */}
            <div className="flex space-x-2 mb-8">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === index
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div 
              className="backdrop-blur-lg bg-gradient-to-br from-white/15 to-white/5 rounded-3xl p-8 border border-white/30 relative transform-gpu hover-lift overflow-hidden group min-h-[500px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-75 transition-all duration-500" />
              
              <div className="glare absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 rounded-3xl" />
              
              <div style={{ transform: 'translateZ(25px)' }} className="relative z-10 h-full">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
