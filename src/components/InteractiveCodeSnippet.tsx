
import React, { useState, useEffect } from 'react';
import { Play, RefreshCw } from 'lucide-react';

const InteractiveCodeSnippet = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');

  const codeLines = [
    "const passion = 'coding';",
    "const creativity = 'unlimited';",
    "const developer = new Ankit();",
    "developer.skills.push('React', 'Python');",
    "developer.dreams = 'change the world';",
    "return developer.create(magic);"
  ];

  const outputs = [
    "✨ Initializing passion...",
    "🚀 Creativity level: MAXIMUM",
    "👨‍💻 Developer instance created",
    "📚 Skills updated successfully",
    "💫 Dreams loaded",
    "🎯 Magic created! ✨"
  ];

  const runCode = () => {
    setIsRunning(true);
    setCurrentLine(0);
    setOutput('');
    
    const interval = setInterval(() => {
      setCurrentLine(prev => {
        if (prev < codeLines.length - 1) {
          setOutput(outputs[prev + 1]);
          return prev + 1;
        } else {
          setIsRunning(false);
          clearInterval(interval);
          return prev;
        }
      });
    }, 800);
  };

  const reset = () => {
    setCurrentLine(0);
    setOutput('');
    setIsRunning(false);
  };

  return (
    <div className="bg-gray-900/90 backdrop-blur-lg rounded-lg p-6 border border-gray-700/50 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-colors"
          >
            <Play size={16} />
            <span>Run</span>
          </button>
          <button
            onClick={reset}
            className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <RefreshCw size={16} />
            <span>Reset</span>
          </button>
        </div>
      </div>
      
      <div className="font-mono text-sm">
        {codeLines.map((line, index) => (
          <div
            key={index}
            className={`py-1 transition-all duration-500 ${
              index <= currentLine 
                ? 'text-white opacity-100' 
                : 'text-gray-500 opacity-50'
            } ${index === currentLine && isRunning ? 'bg-blue-500/20' : ''}`}
          >
            <span className="text-gray-400 mr-4">{index + 1}</span>
            <span className="text-purple-300">const </span>
            <span className="text-blue-300">{line.split(' ').slice(1).join(' ')}</span>
          </div>
        ))}
      </div>
      
      {output && (
        <div className="mt-4 p-3 bg-green-900/30 border border-green-400/30 rounded text-green-300 font-mono text-sm">
          <span className="text-green-400">Output:</span> {output}
        </div>
      )}
    </div>
  );
};

export default InteractiveCodeSnippet;
