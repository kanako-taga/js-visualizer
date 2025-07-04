import React, { useState } from 'react';
import { Brain, Code2, Globe } from 'lucide-react';
import MemoryTab from './MemoryTab';
import SyntaxTab from './SyntaxTab';
import ExamplesTab from './ExamplesTab';
import LoadingSpinner from '../UI/LoadingSpinner';
import type { AnalysisResponse } from '../../types';

interface TabContainerProps {
  analysis: AnalysisResponse | null;
  isLoading: boolean;
  error: string | null;
}

type TabType = 'memory' | 'syntax' | 'examples';

const TabContainer: React.FC<TabContainerProps> = ({
  analysis,
  isLoading,
  error
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('memory');

  const tabs = [
    {
      id: 'memory' as const,
      label: 'How It Works Inside',
      icon: <Brain className="w-5 h-5" />,
      description: 'Memory & execution flow'
    },
    {
      id: 'syntax' as const,
      label: 'Syntax Explained',
      icon: <Code2 className="w-5 h-5" />,
      description: 'Line-by-line breakdown'
    },
    {
      id: 'examples' as const,
      label: 'Real Examples',
      icon: <Globe className="w-5 h-5" />,
      description: 'Used in real applications'
    }
  ];

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-600 text-center">
            Analyzing your code...
            <br />
            <span className="text-sm text-gray-500">This may take a few seconds</span>
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-red-600 text-sm">!</span>
              </div>
              <h3 className="text-red-800 font-medium">Analysis Error</h3>
            </div>
            <p className="text-red-700 text-sm mb-4">{error}</p>
            <p className="text-red-600 text-xs">
              Don't worry! The app is working with fallback explanations. 
              Check your OpenAI API key configuration for full functionality.
            </p>
          </div>
        </div>
      );
    }

    if (!analysis) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-center text-gray-500">
            <Code2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Ready to analyze your code!</h3>
            <p className="text-sm">
              Enter some JavaScript code above and click "Explain Code" to see detailed explanations.
            </p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'memory':
        return <MemoryTab analysis={analysis.memoryExplanation} />;
      case 'syntax':
        return <SyntaxTab analysis={analysis.syntaxBreakdown} />;
      case 'examples':
        return <ExamplesTab analysis={analysis.realWorldExamples} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-4 text-sm font-medium transition-all relative ${
                activeTab === tab.id
                  ? 'text-primary-700 bg-primary-50 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span className={activeTab === tab.id ? 'text-primary-600' : 'text-gray-400'}>
                  {tab.icon}
                </span>
                <div className="text-left">
                  <div className="font-medium">{tab.label}</div>
                  <div className="text-xs opacity-75">{tab.description}</div>
                </div>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TabContainer;
