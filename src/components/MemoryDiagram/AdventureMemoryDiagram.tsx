import React, { useState, useEffect } from 'react';
import type { MemoryExplanation } from '../../types';

interface AdventureMemoryDiagramProps {
  analysis: MemoryExplanation;
}

const AdventureMemoryDiagram: React.FC<AdventureMemoryDiagramProps> = ({ analysis }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'story' | 'treasures' | 'magic'>('story');

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && currentStep < analysis.executionSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 2000); // 2 seconds per step
      return () => clearTimeout(timer);
    } else if (isPlaying && currentStep >= analysis.executionSteps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, analysis.executionSteps.length]);

  const currentStepData = analysis.executionSteps[currentStep];
  const progress = ((currentStep + 1) / analysis.executionSteps.length) * 100;

  const handlePlay = () => setIsPlaying(!isPlaying);
  const handleNext = () => {
    if (currentStep < analysis.executionSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  // Convert technical descriptions to adventure language
  const getAdventureDescription = (description: string, step: number): string => {
    const adventureDescriptions = [
      "🎭 Our wise mentor learns a new magic trick called 'greetUser'! This special ability will help create friendly messages for everyone.",
      "📝 The mentor writes down a special name 'JavaScript Learner' on a magical scroll and puts it in the treasure chest labeled 'userName'.",
      "✨ Time for magic! The mentor casts the 'greetUser' spell and passes the name from the treasure chest as a magical ingredient.",
      "🔮 Inside the magic spell, the mentor creates a warm greeting by mixing 'Hello, ' with the special name, storing it in a new treasure chest called 'greeting'.",
      "📢 The mentor shares the magical greeting with the world by announcing it loudly for everyone to hear!",
      "🎁 The magic spell is complete! The mentor sends the beautiful greeting back as a gift.",
      "🏆 Mission accomplished! The mentor places the final greeting in the 'message' treasure chest. What an amazing adventure!"
    ];
    
    return adventureDescriptions[step] || description;
  };

  const getMascotExpression = (step: number): string => {
    const expressions = [
      "🤔", // thinking
      "📝", // writing
      "✨", // casting magic
      "🔮", // creating
      "😊", // happy
      "🎁", // giving
      "🏆"  // celebrating
    ];
    return expressions[step] || "😊";
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 rounded-xl p-6 border-2 border-purple-200">
      {/* Header with Mascot */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
            <div className="text-white text-2xl font-bold">👨‍🏫</div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">JavaScript Adventure!</h2>
            <p className="text-gray-600">Follow our wise mentor on a coding journey</p>
          </div>
        </div>
        <div className="text-4xl">{getMascotExpression(currentStep)}</div>
      </div>

      {/* Adventure Tabs */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('story')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === 'story'
              ? 'bg-purple-500 text-white shadow-lg'
              : 'bg-white text-purple-500 hover:bg-purple-50'
          }`}
        >
          📖 The Story
        </button>
        <button
          onClick={() => setActiveTab('treasures')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === 'treasures'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white text-blue-500 hover:bg-blue-50'
          }`}
        >
          💎 Treasure Chests
        </button>
        <button
          onClick={() => setActiveTab('magic')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === 'magic'
              ? 'bg-green-500 text-white shadow-lg'
              : 'bg-white text-green-500 hover:bg-green-50'
          }`}
        >
          🪄 Magic Spells
        </button>
      </div>

      {/* Adventure Controls */}
      <div className="flex items-center justify-between mb-6 bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-xl"
          >
            ⏮️
          </button>
          <button
            onClick={handlePlay}
            className="w-12 h-12 rounded-full bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center text-xl"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep >= analysis.executionSteps.length - 1}
            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-xl"
          >
            ⏭️
          </button>
          <button
            onClick={handleReset}
            className="w-12 h-12 rounded-full bg-orange-100 hover:bg-orange-200 flex items-center justify-center text-xl"
          >
            🔄
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-600">
            Adventure Step {currentStep + 1} of {analysis.executionSteps.length}
          </span>
          <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Adventure Content */}
      <div className="bg-white rounded-lg p-6 shadow-sm min-h-[400px]">
        {activeTab === 'story' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                📍 Step {currentStep + 1}: Line {currentStepData.line}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {getAdventureDescription(currentStepData.description, currentStep)}
              </p>
            </div>
            
            {currentStepData.variables.length > 0 && (
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-3">🎒 What's in the mentor's bag:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentStepData.variables.map((variable, index) => (
                    <div key={index} className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                          💎
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{variable.name}</div>
                          <div className="text-sm text-gray-600">"{variable.value}"</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStepData.callStack.length > 0 && (
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-3">🪄 Active Magic Spells:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentStepData.callStack.map((func, index) => (
                    <div key={index} className="bg-green-100 border-2 border-green-300 rounded-full px-4 py-2">
                      <span className="text-green-800 font-medium">✨ {func}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'treasures' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">💎 Treasure Chest Collection</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentStepData.variables.map((variable, index) => (
                <div key={index} className="bg-gradient-to-br from-yellow-100 to-orange-100 border-3 border-yellow-300 rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🏆</div>
                    <h4 className="font-bold text-lg text-gray-800 mb-2">{variable.name}</h4>
                    <div className="bg-white rounded-lg p-3 mb-3">
                      <div className="text-sm text-gray-600 mb-1">Contains:</div>
                      <div className="font-semibold text-gray-800">"{variable.value}"</div>
                    </div>
                    <div className="text-xs text-gray-600">
                      Found on Line {variable.line} • Type: {variable.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {currentStepData.variables.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-lg">No treasures discovered yet! Keep exploring...</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'magic' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🪄 Magic Spell Book</h3>
            {currentStepData.callStack.length > 0 ? (
              <div className="space-y-4">
                {currentStepData.callStack.map((func, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-100 to-pink-100 border-3 border-purple-300 rounded-xl p-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">🔮</div>
                      <div>
                        <h4 className="text-xl font-bold text-purple-800">Spell: {func}</h4>
                        <p className="text-purple-600">This magical spell is currently active and working its magic!</p>
                        <div className="mt-2 flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-sm text-green-600 font-medium">Casting in progress...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-lg">No spells are being cast right now.</p>
                <p className="text-sm">The mentor is preparing for the next magical moment!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdventureMemoryDiagram;
