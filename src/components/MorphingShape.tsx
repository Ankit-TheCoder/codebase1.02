
import React, { useState, useEffect } from 'react';

const MorphingShape = ({ className = "" }: { className?: string }) => {
  const [shapeIndex, setShapeIndex] = useState(0);
  
  const shapes = [
    "border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%",
    "border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%",
    "border-radius: 50% 50% 80% 20% / 25% 75% 25% 75%",
    "border-radius: 80% 20% 60% 40% / 40% 80% 20% 60%",
    "border-radius: 40% 60% 50% 50% / 60% 40% 80% 20%"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShapeIndex(prev => (prev + 1) % shapes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`absolute bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 transition-all duration-3000 ease-in-out ${className}`}
      style={{ 
        borderRadius: shapes[shapeIndex].split(': ')[1],
        animation: 'morph 6s ease-in-out infinite, float 4s ease-in-out infinite'
      }}
    />
  );
};

export default MorphingShape;
