import React, { useState } from 'react';
import { Brain, Sparkles } from 'lucide-react';
import MonacoEditor from './components/CodeEditor/MonacoEditor';
import ExampleSnippets from './components/CodeEditor/ExampleSnippets';
import TabContainer from './components/TabSystem/TabContainer';
import { useCodeAnalysis } from './hooks/useCodeAnalysis';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [code, setCode] = useState(`// Welcome to JavaScript Learning Companion!
// Try this example or write your own code

function greetUser(name) {
  const greeting = "Hello, " + name + "!";
  console.log(greeting);
  return greeting;
}

const userName = "JavaScript Learner";
const message = greetUser(userName);`);

  const { analysis, isLoading, error, analyzeCode, clearAnalysis } = useCodeAnalysis();
  const { value: codeHistory, setValue: setCodeHistory } = useLocalStorage<string[]>('js-visualizer-code-history', []);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleSubmit = async () => {
    if (!code.trim()) return;
    
    // Add to history
    const newHistory = [code, ...codeHistory.filter(c => c !== code)].slice(0, 10);
    setCodeHistory(newHistory);
    
    // Analyze code
    await analyzeCode(code);
  };

  const handleExampleSelect = (exampleCode: string) => {
    setCode(exampleCode);
    clearAnalysis();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  JavaScript Learning Companion
                </h1>
                <p className="text-sm text-gray-600">
                  Understand your code at every level
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-primary-500" />
              <span className="text-sm text-gray-600">
                Powered by AI
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Code Editor */}
          <div className="xl:col-span-1 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Your JavaScript Code
              </h2>
              <MonacoEditor
                value={code}
                onChange={handleCodeChange}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>
            
            <ExampleSnippets onSelectExample={handleExampleSelect} />
          </div>

          {/* Right Column - Analysis Results */}
          <div className="xl:col-span-2">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Code Analysis & Explanations
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Explore how your JavaScript code works from different perspectives
              </p>
            </div>
            
            <TabContainer
              analysis={analysis}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-500 text-sm">
            <p className="mb-2">
              JavaScript Learning Companion - Making code understanding accessible for everyone
            </p>
            <p className="text-xs">
              Built with React, TypeScript, Monaco Editor, and OpenAI • 
              <span className="ml-1">
                {!import.meta.env.VITE_OPENAI_API_KEY ? 
                  'Demo mode - Add your OpenAI API key for full functionality' : 
                  'AI-powered explanations active'
                }
              </span>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
