import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import StackVisualization from './StackVisualization';
import HeapVisualization from './HeapVisualization';
import ExecutionFlow from './ExecutionFlow';
import Button from '../UI/Button';
import type { MemoryExplanation, ExecutionStep } from '../../types';

interface MemoryDiagramProps {
  analysis: MemoryExplanation;
  className?: string;
}

const MemoryDiagram: React.FC<MemoryDiagramProps> = ({ analysis, className = '' }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000); // ms per step
  const [viewMode, setViewMode] = useState<'stack' | 'heap' | 'flow'>('stack');

  const maxSteps = Math.max(analysis.executionSteps.length - 1, 0);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || currentStep >= maxSteps) return;

    const timer = setTimeout(() => {
      setCurrentStep(prev => {
        const next = prev + 1;
        if (next >= maxSteps) {
          setIsPlaying(false);
          return maxSteps;
        }
        return next;
      });
    }, playbackSpeed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, maxSteps, playbackSpeed]);

  const handlePlay = () => {
    if (currentStep >= maxSteps) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    if (currentStep < maxSteps) {
      setCurrentStep(prev => prev + 1);
      setIsPlaying(false);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setIsPlaying(false);
    }
  };

  const currentStepData = analysis.executionSteps[currentStep] || analysis.executionSteps[0];

  if (!analysis.executionSteps.length) {
    return (
      <div className={`bg-gray-50 rounded-lg p-8 text-center ${className}`}>
        <div className="text-gray-500">
          <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <Play className="w-8 h-8" />
          </div>
          <p className="text-sm">No execution steps available for visualization</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      {/* Header with controls */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-gray-900">Memory Visualization</h3>
            <div className="flex items-center space-x-2">
              {/* View Mode Selector */}
              <div className="flex bg-white rounded-lg border border-gray-200 overflow-hidden">
                {[
                  { key: 'stack', label: 'Stack' },
                  { key: 'heap', label: 'Heap' },
                  { key: 'flow', label: 'Flow' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setViewMode(key as any)}
                    className={`px-3 py-1 text-xs font-medium transition-colors ${
                      viewMode === key
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleStepBackward}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handlePlay}
              disabled={maxSteps === 0}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleStepForward}
              disabled={currentStep >= maxSteps}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>

            {/* Speed Control */}
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              className="text-xs border border-gray-200 rounded px-2 py-1 bg-white"
            >
              <option value={2000}>0.5x</option>
              <option value={1000}>1x</option>
              <option value={500}>2x</option>
              <option value={250}>4x</option>
            </select>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>Step {currentStep + 1} of {maxSteps + 1}</span>
            <span>Line {currentStepData?.line || 'N/A'}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep) / Math.max(maxSteps, 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${currentStep}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'stack' && (
              <StackVisualization
                step={currentStepData}
                allVariables={analysis.variables}
                callStack={analysis.callStack}
              />
            )}
            {viewMode === 'heap' && (
              <HeapVisualization
                step={currentStepData}
                allVariables={analysis.variables}
              />
            )}
            {viewMode === 'flow' && (
              <ExecutionFlow
                steps={analysis.executionSteps}
                currentStep={currentStep}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Current Step Description */}
        {currentStepData && (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-medium">
                {currentStepData.step}
              </div>
              <div>
                <p className="text-sm text-gray-700 font-medium mb-1">
                  Line {currentStepData.line}
                </p>
                <p className="text-sm text-gray-600">
                  {currentStepData.description}
                </p>
                {currentStepData.variables.length > 0 && (
                  <div className="mt-2 text-xs text-gray-500">
                    <strong>Active variables:</strong>{' '}
                    {currentStepData.variables.map(v => v.name).join(', ')}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MemoryDiagram;
