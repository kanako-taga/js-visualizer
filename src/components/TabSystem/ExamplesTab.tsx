import React from 'react';
import { Globe, Code, TrendingUp, ExternalLink } from 'lucide-react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import type { RealWorldExamples } from '../../types';

interface ExamplesTabProps {
  analysis: RealWorldExamples;
}

const ExamplesTab: React.FC<ExamplesTabProps> = ({ analysis }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Where It's Used */}
      <Card title="Where You'll Find This Code" icon={<Globe className="w-5 h-5" />}>
        {analysis.usedIn.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analysis.usedIn.map((usage, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 text-center">
                <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-blue-800 font-medium text-sm">
                  {usage}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No specific usage examples available.</p>
        )}
      </Card>

      {/* Code Patterns */}
      <Card title="Common Patterns" icon={<Code className="w-5 h-5" />}>
        {analysis.patterns.length > 0 ? (
          <div className="space-y-6">
            {analysis.patterns.map((pattern, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      {pattern.pattern}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {pattern.description}
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3 overflow-x-auto">
                  <pre>{pattern.code}</pre>
                </div>
                
                {pattern.usedIn.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-2">Used in:</p>
                    <div className="flex flex-wrap gap-2">
                      {pattern.usedIn.map((usage, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {usage}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No common patterns identified.</p>
        )}
      </Card>

      {/* Progressive Examples */}
      <Card title="Learn More: Progressive Examples" icon={<TrendingUp className="w-5 h-5" />}>
        {analysis.progressiveExamples.length > 0 ? (
          <div className="space-y-4">
            {analysis.progressiveExamples.map((example, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">
                        {example.title}
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(example.difficulty)}`}>
                        {example.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {example.description}
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded p-3 font-mono text-sm text-gray-700 mb-3 overflow-x-auto">
                  <pre>{example.code}</pre>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Try This Example
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">
              No progressive examples available for this code pattern.
            </p>
          </div>
        )}
      </Card>

      {/* Related Concepts */}
      {analysis.relatedConcepts.length > 0 && (
        <Card title="What to Learn Next" icon={<TrendingUp className="w-5 h-5" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {analysis.relatedConcepts.map((concept, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3 text-center hover:shadow-sm transition-shadow cursor-pointer">
                <p className="text-purple-800 font-medium text-sm">
                  {concept}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Real-World Application Showcase */}
      <Card title="Real-World Application" icon={<Globe className="w-5 h-5" />}>
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <Globe className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">See It in Action</h3>
          <p className="text-gray-600 text-sm mb-4">
            Explore how this code pattern is used in popular websites and applications
          </p>
          <div className="text-xs text-gray-500 bg-white/50 rounded px-3 py-2 inline-block">
            Coming in future updates: Live examples from GitHub repositories and popular websites
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ExamplesTab;
