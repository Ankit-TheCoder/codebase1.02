import React, { useState, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Instagram, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import CertificationsSection from '@/components/CertificationsSection';
import PoetrySection from '@/components/PoetrySection';
import ContactSection from '@/components/ContactSection';
import { useAnalytics } from '@/hooks/useAnalytics';
const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Track page views
  useAnalytics();
  useEffect(() => {
    setIsVisible(true);
  }, []);
  const handleAdminLogin = () => {
    navigate('/admin/login');
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-white font-bold text-xl">CodeBase</div>
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex space-x-8">
                <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
                <a href="#skills" className="text-white/80 hover:text-white transition-colors">Skills</a>
                <a href="#projects" className="text-white/80 hover:text-white transition-colors">Projects</a>
                <a href="#poetry" className="text-white/80 hover:text-white transition-colors">Poetry</a>
                <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
              </div>
              <Button size="sm" variant="ghost" onClick={handleAdminLogin} className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Certifications Section */}
      <CertificationsSection />

      {/* Poetry Section */}
      <PoetrySection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://github.com/Ankit-TheCoder" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/ankit%7Ethecoder/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="https://www.instagram.com/krishn_skha.a/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              <Instagram size={24} />
            </a>
          </div>
          <p className="text-stone-300 font-thin">Made with ❤️ and lots of ☕</p>
          <div className="flex justify-center space-x-4 mt-2 text-sm text-white/40">
            <span>React</span>
            <span>•</span>
            <span>TailwindCSS</span>
            <span>•</span>
            <span>TypeScript</span>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;