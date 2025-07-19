
import React from 'react';
import { Card } from '@/components/ui/card';

const CertificationsSection = () => {
  const certifications = [
    {
      title: 'Problem Solving (Basic + Intermediate)',
      issuer: 'HackerRank',
      icon: '🎖️',
      color: 'from-green-400 to-blue-500'
    },
    {
      title: 'Python (Basic)',
      issuer: 'HackerRank',
      icon: '🐍',
      color: 'from-yellow-400 to-green-500'
    },
    {
      title: 'CSS (Basic)',
      issuer: 'HackerRank',
      icon: '🎨',
      color: 'from-blue-400 to-purple-500'
    },
    {
      title: 'TensorFlow - Zero to Mastery',
      issuer: 'Zero to Mastery',
      icon: '🤖',
      color: 'from-orange-400 to-red-500'
    },
    {
      title: 'Infosys Python Training',
      issuer: 'Infosys',
      icon: '🏢',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Web Dev with HTML/CSS/JS',
      issuer: 'Johns Hopkins',
      icon: '🌐',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Certifications</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <Card key={index} className="backdrop-blur-lg bg-white/10 border-white/20 p-6 text-center hover:scale-105 transition-all duration-300 group">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${cert.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                {cert.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{cert.title}</h3>
              <p className="text-purple-300 font-medium">{cert.issuer}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
