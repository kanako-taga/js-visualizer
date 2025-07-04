import React, { useState } from 'react';
import { Code, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../UI/Button';
import { exampleSnippets, getExamplesByCategory } from '../../data/examples';
import type { ExampleSnippet } from '../../types';

interface ExampleSnippetsProps {
  onSelectExample: (code: string) => void;
}

const ExampleSnippets: React.FC<ExampleSnippetsProps> = ({ onSelectExample }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ExampleSnippet['category']>('variables');

  const categories = [
    { key: 'variables' as const, label: 'Variables', color: 'bg-blue-100 text-blue-800' },
    { key: 'functions' as const, label: 'Functions', color: 'bg-green-100 text-green-800' },
    { key: 'loops' as const, label: 'Loops', color: 'bg-purple-100 text-purple-800' },
    { key: 'objects' as const, label: 'Objects', color: 'bg-orange-100 text-orange-800' },
    { key: 'arrays' as const, label: 'Arrays', color: 'bg-pink-100 text-pink-800' },
    { key: 'async' as const, label: 'Async', color: 'bg-indigo-100 text-indigo-800' },
  ];

  const currentExamples = getExamplesByCategory(selectedCategory);

  const getDifficultyColor = (difficulty: ExampleSnippet['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div 
        className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <Code className="w-5 h-5 text-primary-600" />
          <span className="text-sm font-medium text-gray-700">
            Example Code Snippets
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </div>

      {isExpanded && (
        <div className="p-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === category.key
                    ? category.color
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Examples Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentExamples.map((example) => (
              <div
                key={example.id}
                className="border border-gray-200 rounded-lg p-3 hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer group"
                onClick={() => onSelectExample(example.code)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-700">
                    {example.title}
                  </h4>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(example.difficulty)}`}>
                    {example.difficulty}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-3">
                  {example.description}
                </p>
                <div className="bg-gray-50 rounded p-2 font-mono text-xs text-gray-700 overflow-hidden">
                  <div className="line-clamp-3">
                    {example.code.split('\n').slice(0, 3).join('\n')}
                    {example.code.split('\n').length > 3 && '...'}
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onSelectExample(example.code)}
                  >
                    Use This Example
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {currentExamples.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Code className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No examples available for this category</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExampleSnippets;
