import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.from('contact_submissions').insert([{
        name: formData.name,
        email: formData.email,
        message: formData.message
      }]);
      if (error) {
        throw error;
      }
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon."
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly via social media.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">Let's Build Something Together!</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto transition-all duration-500 hover:w-32"></div>
          <p className="text-white/80 mt-4 transition-all duration-300 hover:text-white/90">Ready to bring your ideas to life? Drop me a message!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <Card className="backdrop-blur-lg bg-white/10 border-white/20 p-8 transition-all duration-500 hover:bg-white/15 hover:border-white/30 hover:scale-105">
              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 transition-all duration-300 hover:translate-x-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    📧
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-white/70">ankityaduwanshi851@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 transition-all duration-300 hover:translate-x-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    📍
                  </div>
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p className="text-white/70">PSIT CHE, India</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
                <div className="flex space-x-4">
                  <a href="https://github.com/Ankit-TheCoder" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:rotate-12">
                    <Github className="text-white" size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/ankit%7Ethecoder/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:rotate-12">
                    <Linkedin className="text-white" size={20} />
                  </a>
                  <a href="https://www.instagram.com/krishn_skha.a/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:rotate-12">
                    <Instagram className="text-white" size={20} />
                  </a>
                </div>
              </div>
            </Card>
          </div>

          <Card className="backdrop-blur-lg bg-white/10 border-white/20 p-8 transition-all duration-500 hover:bg-white/15 hover:border-white/30 hover:scale-105">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">Name</label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} className="bg-white/10 border-white/20 text-white placeholder-white/50 transition-all duration-300 focus:bg-white/15 focus:border-white/40" placeholder="Your Name" required disabled={isSubmitting} />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">Email</label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="bg-white/10 border-white/20 text-white placeholder-white/50 transition-all duration-300 focus:bg-white/15 focus:border-white/40" placeholder="your.email@example.com" required disabled={isSubmitting} />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">Message</label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} className="bg-white/10 border-white/20 text-white placeholder-white/50 min-h-[120px] transition-all duration-300 focus:bg-white/15 focus:border-white/40" placeholder="Tell me about your project or just say hello!" required disabled={isSubmitting} />
              </div>
              
              <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>;
};
export default ContactSection;