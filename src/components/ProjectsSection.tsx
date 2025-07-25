import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { use3DTilt } from '@/hooks/use3DTilt';

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const tiltRef = use3DTilt({ max: 15, scale: 1.02, glare: true });

  return (
    <Card 
      ref={tiltRef}
      className="backdrop-blur-lg bg-white/10 border-white/20 overflow-hidden group relative transform-gpu"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Glare effect */}
      <div className="glare absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 z-10" />
      
      <div className="relative overflow-hidden" style={{ transform: 'translateZ(20px)' }}>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500 group-hover:opacity-80"></div>
      </div>
      
      <div className="p-6" style={{ transform: 'translateZ(40px)' }}>
        <h3 className="text-xl font-bold mb-3 text-zinc-50 group-hover:text-purple-200 transition-colors duration-300">{project.title}</h3>
        <p className="text-white/80 mb-4 text-sm leading-relaxed transition-colors duration-300 group-hover:text-white/90">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech: string, techIndex: number) => (
            <span 
              key={tech} 
              className="px-3 py-1 bg-gradient-to-r from-purple-500/50 to-pink-500/50 text-white rounded-full text-xs transition-all duration-300 hover:scale-105 hover:from-purple-500/70 hover:to-pink-500/70"
              style={{ 
                animationDelay: `${techIndex * 0.05}s`,
                transform: 'translateZ(10px)'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3" style={{ transform: 'translateZ(30px)' }}>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-lg text-white border-0"
            onClick={() => window.open(project.liveUrl, '_blank')}
          >
            <ArrowUpRight size={16} className="mr-1" />
            Live Demo
          </Button>
        </div>
      </div>
    </Card>
  );
};

const ProjectsSection = () => {
  const projects = [
    {
      title: 'AIS Security',
      description: 'Corporate website with a professional, responsive design for seamless business representation.',
      tech: ['Python', 'AI/ML', 'Flask', 'TensorFlow'],
      image: 'public/lovable-uploads/b40e631d-638d-45fe-a08d-fa521d30492b.png',
      liveUrl: 'https://www.aisprivatelimited.in/',
      codeUrl: '#'
    },
    {
      title: 'AIRCOOl HVAC',
      description: 'Modern HVAC service landing page with intuitive UI and smooth animations.',
      tech: ['JavaScript', 'Node.js', 'Socket.io', 'CSS'],
      image: 'public/lovable-uploads/3cb650f4-f6d6-44fd-b0b4-7fe143c99a7d.png',
      liveUrl: 'https://air-cool.vercel.app/',
      codeUrl: '#'
    },
    {
      title: 'HR-GPT AI',
      description: 'Modern HVAC service landing page with intuitive UI and smooth animations.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Canvas API'],
      image: 'public/lovable-uploads/28a83223-a915-41a7-9c7a-ab63118d1442.png',
      liveUrl: 'https://hrgptai.vercel.app/',
      codeUrl: '#'
    },
    {
      title: 'Farm Food',
      description: 'Vibrant food delivery website designed to enhance user engagement.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      image: 'public/lovable-uploads/21471452-c07a-40d9-8284-312b468baa12.png',
      liveUrl: 'https://foodie-ten-self.vercel.app/',
      codeUrl: '#'
    },
    {
      title: 'Blank-Filler',
      description: 'Productivity tool for quick blank space management in text content.',
      tech: ['HTML', 'CSS', 'Flexbox', 'Grid'],
      image: 'public/lovable-uploads/11f8fc70-6ecc-4c00-9e48-ef0c8c056ed0.png',
      liveUrl: 'https://blank-filler.vercel.app/',
      codeUrl: '#'
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto transition-all duration-500 hover:w-32"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
