import React, { useState } from 'react';
import { HardDrive, Layers, Play, Variable, BookOpen, Sparkles } from 'lucide-react';
import Card from '../UI/Card';
import MemoryDiagram from '../MemoryDiagram/MemoryDiagram';
import AdventureMemoryDiagram from '../MemoryDiagram/AdventureMemoryDiagram';
import type { MemoryExplanation } from '../../types';

interface MemoryTabProps {
  analysis: MemoryExplanation;
}

const MemoryTab: React.FC<MemoryTabProps> = ({ analysis }) => {
  const [viewMode, setViewMode] = useState<'technical' | 'adventure'>('adventure');
  return (
    <div className="p-6 space-y-6">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Memory Visualization</h3>
          <p className="text-sm text-gray-600">Choose your learning style</p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('adventure')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              viewMode === 'adventure'
                ? 'bg-purple-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Adventure Story</span>
          </button>
          <button
            onClick={() => setViewMode('technical')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              viewMode === 'technical'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Technical View</span>
          </button>
        </div>
      </div>

      {viewMode === 'adventure' ? (
        /* Adventure Mode */
        <AdventureMemoryDiagram analysis={analysis} />
      ) : (
        /* Technical Mode */
        <>
          {/* Main Description */}
          <Card title="Memory Overview" icon={<HardDrive className="w-5 h-5" />}>
            <p className="text-gray-700 leading-relaxed">
              {analysis.description}
            </p>
          </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Variables */}
        <Card title="Variables in Memory" icon={<Variable className="w-5 h-5" />}>
          {analysis.variables.length > 0 ? (
            <div className="space-y-3">
              {analysis.variables.map((variable, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 border-l-4 border-primary-400">
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-mono text-sm font-medium text-primary-700">
                      {variable.name}
                    </span>
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                      Line {variable.line}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div><strong>Type:</strong> {variable.type}</div>
                    <div><strong>Value:</strong> <code className="bg-gray-200 px-1 rounded">{variable.value}</code></div>
                    <div><strong>Scope:</strong> {variable.scope}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No variables detected in this code.</p>
          )}
        </Card>

        {/* Call Stack */}
        <Card title="Function Call Stack" icon={<Layers className="w-5 h-5" />}>
          {analysis.callStack.length > 0 ? (
            <div className="space-y-2">
              {analysis.callStack.map((call, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                  <div className="w-6 h-6 bg-secondary-100 text-secondary-700 rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <span className="font-mono text-sm">{call}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No function calls detected in this code.</p>
          )}
        </Card>
      </div>

      {/* Execution Steps */}
      {analysis.executionSteps.length > 0 && (
        <Card title="Step-by-Step Execution" icon={<Play className="w-5 h-5" />}>
          <div className="space-y-4">
            {analysis.executionSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent-100 text-accent-700 rounded-full flex items-center justify-center text-sm font-medium">
                    {step.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        Line {step.line}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      {step.description}
                    </p>
                    {step.variables.length > 0 && (
                      <div className="text-xs text-gray-500">
                        <strong>Variables at this step:</strong>{' '}
                        {step.variables.map(v => v.name).join(', ')}
                      </div>
                    )}
                  </div>
                </div>
                {index < analysis.executionSteps.length - 1 && (
                  <div className="absolute left-4 top-8 w-px h-6 bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

          {/* Interactive Memory Visualization */}
          <MemoryDiagram analysis={analysis} />
        </>
      )}
    </div>
  );
};

export default MemoryTab;
