
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { use3DTilt } from '@/hooks/use3DTilt';
import Skill3DBar from './3DSkillBar';

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const languagesTiltRef = use3DTilt({ max: 10, scale: 1.02 });
  const frameworksTiltRef = use3DTilt({ max: 10, scale: 1.02 });
  const toolsTiltRef = use3DTilt({ max: 10, scale: 1.02 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('skills');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const skills = {
    languages: [
      { name: 'Python', level: 90, color: 'from-green-400 to-blue-500' },
      { name: 'C++', level: 85, color: 'from-blue-400 to-purple-500' },
      { name: 'JavaScript', level: 80, color: 'from-yellow-400 to-orange-500' },
      { name: 'HTML/CSS', level: 95, color: 'from-red-400 to-pink-500' },
      { name: 'C', level: 75, color: 'from-gray-400 to-gray-600' },
      { name: 'Java', level: 60, color: 'from-orange-400 to-red-500' }
    ],
    frameworks: [
      { name: 'React', level: 70, color: 'from-cyan-400 to-blue-500' },
      { name: 'TailwindCSS', level: 90, color: 'from-teal-400 to-cyan-500' },
      { name: 'Bootstrap', level: 85, color: 'from-purple-400 to-pink-500' }
    ],
    tools: [
      { name: 'GitHub', level: 85, color: 'from-gray-600 to-gray-800' },
      { name: 'Figma', level: 75, color: 'from-purple-400 to-pink-500' },
      { name: 'Canva', level: 80, color: 'from-blue-400 to-purple-500' },
      { name: 'Vercel', level: 70, color: 'from-black to-gray-600' }
    ]
  };

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card 
            ref={languagesTiltRef}
            className="backdrop-blur-lg bg-white/10 border-white/20 p-8 relative transform-gpu"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="glare absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 rounded-lg" />
            <h3 className="text-2xl font-bold text-white mb-6 text-center" style={{ transform: 'translateZ(20px)' }}>Languages</h3>
            <div style={{ transform: 'translateZ(10px)' }}>
              {skills.languages.map((skill, index) => (
                <Skill3DBar key={skill.name} skill={skill} delay={index * 100} isVisible={isVisible} />
              ))}
            </div>
          </Card>

          <Card 
            ref={frameworksTiltRef}
            className="backdrop-blur-lg bg-white/10 border-white/20 p-8 relative transform-gpu"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="glare absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 rounded-lg" />
            <h3 className="text-2xl font-bold text-white mb-6 text-center" style={{ transform: 'translateZ(20px)' }}>Frameworks</h3>
            <div style={{ transform: 'translateZ(10px)' }}>
              {skills.frameworks.map((skill, index) => (
                <Skill3DBar key={skill.name} skill={skill} delay={index * 100} isVisible={isVisible} />
              ))}
            </div>
            <div className="mt-8" style={{ transform: 'translateZ(15px)' }}>
              <h4 className="text-lg font-semibold text-white mb-4">Soft Skills</h4>
              <div className="flex flex-wrap gap-2">
                {['Creativity', 'Problem-Solving', 'Communication'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm hover:scale-105 transition-transform duration-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          <Card 
            ref={toolsTiltRef}
            className="backdrop-blur-lg bg-white/10 border-white/20 p-8 relative transform-gpu"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="glare absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 rounded-lg" />
            <h3 className="text-2xl font-bold text-white mb-6 text-center" style={{ transform: 'translateZ(20px)' }}>Tools</h3>
            <div style={{ transform: 'translateZ(10px)' }}>
              {skills.tools.map((skill, index) => (
                <Skill3DBar key={skill.name} skill={skill} delay={index * 100} isVisible={isVisible} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
