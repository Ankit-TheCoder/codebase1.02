
import React, { useState, useEffect } from 'react';
import { Code2, Heart, Zap, Star, Rocket, Brain, Coffee, Music } from 'lucide-react';

const FloatingElements = () => {
  const [elements, setElements] = useState<Array<{
    id: number;
    x: number;
    y: number;
    icon: React.ReactNode;
    color: string;
    size: number;
    speed: number;
    rotation: number;
  }>>([]);

  const icons = [
    <Code2 />, <Heart />, <Zap />, <Star />, <Rocket />, <Brain />, <Coffee />, <Music />
  ];

  const colors = [
    'text-purple-400', 'text-pink-400', 'text-blue-400', 'text-green-400',
    'text-yellow-400', 'text-red-400', 'text-cyan-400', 'text-orange-400'
  ];

  useEffect(() => {
    const newElements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      icon: icons[Math.floor(Math.random() * icons.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 20 + 15,
      speed: Math.random() * 2 + 1,
      rotation: 0
    }));
    setElements(newElements);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setElements(prev => prev.map(el => ({
        ...el,
        y: el.y <= -10 ? 110 : el.y - el.speed * 0.1,
        rotation: el.rotation + el.speed
      })));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map(element => (
        <div
          key={element.id}
          className={`absolute ${element.color} opacity-30 hover:opacity-70 transition-all duration-300`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}px`,
            transform: `rotate(${element.rotation}deg)`,
            filter: 'drop-shadow(0 0 10px currentColor)'
          }}
        >
          {element.icon}
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;
