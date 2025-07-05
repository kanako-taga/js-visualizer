import React from 'react';
import ReactDOM from 'react-dom/client';
import DemoMemoryDiagram from './components/MemoryDiagram/DemoMemoryDiagram';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">JS</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Visual Memory Diagram Demo
                </h1>
                <p className="text-sm text-gray-600">
                  Interactive JavaScript memory visualization
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DemoMemoryDiagram />
      </main>
    </div>
  </React.StrictMode>,
);
