
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PoetrySection = () => {
  const [currentPoem, setCurrentPoem] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const poems = [
    {
      title: "Digital Dreams",
      english: "Lines of code dance on my screen,\nEach function a verse in silicon dreams.\nBetween the semicolons and the loops,\nI find poetry in programming's groups.",
      hindi: "स्क्रीन पर कोड की लाइनें नाचती हैं,\nहर फंक्शन सिलिकॉन सपनों की कविता।\nसेमीकोलन और लूप्स के बीच,\nप्रोग्रामिंग में मुझे कविता मिलती है।"
    },
    {
      title: "Logic & Love",
      english: "If love were a function,\nIt would return infinite loops.\nNo syntax errors in the heart,\nJust beautiful, endless truths.",
      hindi: "अगर प्रेम एक फंक्शन होता,\nतो अनंत लूप्स रिटर्न करता।\nदिल में कोई syntax error नहीं,\nबस खूबसूरत, अनंत सच्चाइयां।"
    },
    {
      title: "Binary Thoughts",
      english: "Zero and one, false and true,\nIn binary language, I think of you.\nBetween the bits and bytes of time,\nOur connection transcends every rhyme.",
      hindi: "शून्य और एक, झूठ और सच,\nबाइनरी भाषा में, मैं तुम्हें सोचता हूं।\nसमय के बिट्स और बाइट्स के बीच,\nहमारा कनेक्शन हर कविता से परे है।"
    }
  ];

  return (
    <section id="poetry" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Soul Scripts: Poetry Corner</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          <p className="text-white/80 mt-4">Where code meets creativity, and logic meets love</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="backdrop-blur-lg bg-white/10 border-white/20 p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-4">{poems[currentPoem].title}</h3>
              <div className="flex justify-center gap-2 mb-4">
                {poems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPoem(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentPoem ? 'bg-purple-400' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                <div className="mb-6">
                  <pre className="text-white text-lg leading-relaxed font-serif whitespace-pre-wrap">
                    {showTranslation ? poems[currentPoem].hindi : poems[currentPoem].english}
                  </pre>
                </div>
                
                <Button
                  onClick={() => setShowTranslation(!showTranslation)}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  {showTranslation ? 'Show English' : 'Show Hindi'}
                </Button>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              See More on Instagram
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoetrySection;
