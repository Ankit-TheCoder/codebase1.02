
import { useRef, useEffect } from 'react';

export const use3DTilt = <T extends HTMLElement = HTMLDivElement>(options = {}) => {
  const ref = useRef<T>(null);
  
  const defaultOptions = {
    max: 25,
    perspective: 1000,
    scale: 1.05,
    speed: 300,
    glare: true,
    maxGlare: 0.5,
    ...options
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -defaultOptions.max;
      const rotateY = ((x - centerX) / centerX) * defaultOptions.max;
      
      element.style.transform = `
        perspective(${defaultOptions.perspective}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(${defaultOptions.scale})
      `;
      
      if (defaultOptions.glare) {
        const glareElement = element.querySelector('.glare') as HTMLElement;
        if (glareElement) {
          const intensity = Math.min(Math.abs(rotateX) + Math.abs(rotateY), defaultOptions.maxGlare * 100) / 100;
          glareElement.style.opacity = intensity.toString();
          glareElement.style.background = `linear-gradient(${rotateY + rotateX}deg, rgba(255,255,255,${intensity * 0.3}) 0%, transparent 50%)`;
        }
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = `
        perspective(${defaultOptions.perspective}px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `;
      
      const glareElement = element.querySelector('.glare') as HTMLElement;
      if (glareElement) {
        glareElement.style.opacity = '0';
      }
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    // Add transition for smooth animation
    element.style.transition = `transform ${defaultOptions.speed}ms ease-out`;

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return ref;
};
