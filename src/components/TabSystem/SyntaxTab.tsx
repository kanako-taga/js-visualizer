import React from 'react';
import { Code2, BookOpen, AlertTriangle, CheckCircle } from 'lucide-react';
import Card from '../UI/Card';
import type { SyntaxBreakdown } from '../../types';

interface SyntaxTabProps {
  analysis: SyntaxBreakdown;
}

const SyntaxTab: React.FC<SyntaxTabProps> = ({ analysis }) => {
  return (
    <div className="p-6 space-y-6">
      {/* Line by Line Breakdown */}
      <Card title="Line-by-Line Explanation" icon={<Code2 className="w-5 h-5" />}>
        {analysis.lineByLine.length > 0 ? (
          <div className="space-y-4">
            {analysis.lineByLine.map((line, index) => (
              <div key={index} className="border-l-4 border-primary-200 pl-4 py-2">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded font-medium">
                    Line {line.line}
                  </span>
                  {line.concepts.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {line.concepts.map((concept, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {concept}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm mb-2 overflow-x-auto">
                  {line.code}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {line.explanation}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No line-by-line breakdown available.</p>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Concepts */}
        <Card title="Key Concepts" icon={<BookOpen className="w-5 h-5" />}>
          {analysis.concepts.length > 0 ? (
            <div className="space-y-4">
              {analysis.concepts.map((concept, index) => (
                <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">
                    {concept.concept}
                  </h4>
                  <p className="text-blue-800 text-sm mb-3">
                    {concept.description}
                  </p>
                  {concept.examples.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-blue-700 mb-2">Examples:</p>
                      <div className="space-y-1">
                        {concept.examples.map((example, idx) => (
                          <code key={idx} className="block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">
                            {example}
                          </code>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No key concepts identified.</p>
          )}
        </Card>

        {/* Common Mistakes */}
        <Card title="Common Mistakes to Avoid" icon={<AlertTriangle className="w-5 h-5" />}>
          {analysis.commonMistakes.length > 0 ? (
            <div className="space-y-3">
              {analysis.commonMistakes.map((mistake, index) => (
                <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-red-800 text-sm">
                      {mistake}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No common mistakes identified for this code.</p>
          )}
        </Card>
      </div>

      {/* Best Practices */}
      <Card title="Best Practices" icon={<CheckCircle className="w-5 h-5" />}>
        {analysis.bestPractices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.bestPractices.map((practice, index) => (
              <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-green-800 text-sm">
                    {practice}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-green-800 text-sm">
              Great! Your code follows good JavaScript practices.
            </p>
          </div>
        )}
      </Card>

      {/* Interactive Syntax Highlighting Placeholder */}
      <Card title="Interactive Syntax Explorer" icon={<Code2 className="w-5 h-5" />}>
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <Code2 className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Code Explorer</h3>
          <p className="text-gray-600 text-sm mb-4">
            Click on different parts of your code to see detailed explanations and related concepts
          </p>
          <div className="text-xs text-gray-500 bg-white/50 rounded px-3 py-2 inline-block">
            Coming in future updates: Interactive syntax highlighting with hover explanations
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SyntaxTab;
