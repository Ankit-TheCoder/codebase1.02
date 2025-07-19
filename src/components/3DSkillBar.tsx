
import React, { useState, useEffect } from 'react';

interface Skill3DBarProps {
  skill: {
    name: string;
    level: number;
    color: string;
  };
  delay?: number;
  isVisible: boolean;
}

const Skill3DBar: React.FC<Skill3DBarProps> = ({ skill, delay = 0, isVisible }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div className="mb-6 relative">
      <div className="flex justify-between mb-2">
        <span className="text-white font-medium">{skill.name}</span>
        <span className="text-white/70">{skill.level}%</span>
      </div>
      
      <div 
        className="relative w-full h-6 bg-white/20 rounded-lg overflow-hidden cursor-pointer transform-gpu"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(200px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* 3D Base */}
        <div 
          className="absolute inset-0 bg-white/10 rounded-lg"
          style={{
            transform: 'translateZ(-4px)',
            filter: 'blur(0.5px)'
          }}
        />
        
        {/* Main progress bar */}
        <div
          className={`h-full rounded-lg bg-gradient-to-r ${skill.color} relative overflow-hidden`}
          style={{
            width: isVisible ? `${skill.level}%` : '0%',
            transition: `width 1s ease-out ${delay}ms, transform 0.3s ease-out`,
            transform: 'translateZ(2px)',
            boxShadow: isHovered ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.2)'
          }}
        >
          {/* Shine effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{
              transform: `translateX(${isHovered ? '100%' : '-100%'})`,
              transition: 'transform 0.6s ease-out',
              width: '50%'
            }}
          />
          
          {/* 3D highlight */}
          <div 
            className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-lg"
            style={{ transform: 'translateZ(1px)' }}
          />
        </div>
        
        {/* Glow effect */}
        {isHovered && (
          <div 
            className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-50 blur-sm rounded-lg`}
            style={{
              width: `${skill.level}%`,
              transform: 'translateZ(-2px)',
              animation: 'pulse 2s infinite'
            }}
          />
        )}
      </div>
      
      {/* Reflection */}
      <div 
        className="absolute top-full mt-1 w-full h-3 rounded-lg opacity-20"
        style={{
          background: `linear-gradient(to bottom, ${skill.color.includes('from-') ? 'rgba(147, 51, 234, 0.3)' : 'rgba(147, 51, 234, 0.3)'}, transparent)`,
          transform: 'scaleY(-0.3) perspective(20px) rotateX(45deg)',
          transformOrigin: 'top',
          filter: 'blur(1px)'
        }}
      />
    </div>
  );
};

export default Skill3DBar;
