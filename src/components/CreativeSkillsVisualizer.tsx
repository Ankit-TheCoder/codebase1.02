
import React, { useState, useEffect } from 'react';
import { Zap, Code, Palette, Rocket } from 'lucide-react';

const CreativeSkillsVisualizer = () => {
  const [activeSkill, setActiveSkill] = useState(0);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  const skills = [
    {
      name: "React & JavaScript",
      icon: <Code className="w-8 h-8" />,
      level: 90,
      color: "from-blue-400 to-cyan-400",
      description: "Building interactive UIs"
    },
    {
      name: "Python & AI",
      icon: <Zap className="w-8 h-8" />,
      level: 85,
      color: "from-green-400 to-emerald-400",
      description: "Machine learning magic"
    },
    {
      name: "Creative Design",
      icon: <Palette className="w-8 h-8" />,
      level: 88,
      color: "from-purple-400 to-pink-400",
      description: "UI/UX artistry"
    },
    {
      name: "Innovation",
      icon: <Rocket className="w-8 h-8" />,
      level: 95,
      color: "from-orange-400 to-red-400",
      description: "Turning ideas into reality"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSkill(prev => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const createParticles = () => {
    const newParticles = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 300,
      y: Math.random() * 200
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  };

  return (
    <div className="relative bg-gray-900/30 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
      <h3 className="text-2xl font-bold text-white mb-8 text-center">
        Skills in Action ⚡
      </h3>
      
      <div className="grid grid-cols-2 gap-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`relative p-6 rounded-xl border transition-all duration-500 cursor-pointer ${
              index === activeSkill 
                ? 'border-white/40 bg-white/10 scale-105' 
                : 'border-white/20 bg-white/5 hover:scale-102'
            }`}
            onClick={() => {
              setActiveSkill(index);
              createParticles();
            }}
          >
            <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${skill.color} mb-4`}>
              {skill.icon}
            </div>
            
            <h4 className="text-white font-semibold mb-2">{skill.name}</h4>
            <p className="text-gray-300 text-sm mb-4">{skill.description}</p>
            
            <div className="relative">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ${
                    index === activeSkill ? 'animate-pulse' : ''
                  }`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <span className="text-white text-sm font-bold absolute -top-6 right-0">
                {skill.level}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Particle explosion effect */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );
};

export default CreativeSkillsVisualizer;
