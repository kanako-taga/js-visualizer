import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUp } from 'lucide-react';
import type { ExecutionStep, VariableInfo } from '../../types';

interface StackVisualizationProps {
  step: ExecutionStep;
  allVariables: VariableInfo[];
  callStack: string[];
}

interface StackFrame {
  name: string;
  variables: VariableInfo[];
  isActive: boolean;
}

const StackVisualization: React.FC<StackVisualizationProps> = ({ 
  step, 
  allVariables, 
  callStack 
}) => {
  // Create stack frames based on call stack and variables
  const createStackFrames = (): StackFrame[] => {
    const frames: StackFrame[] = [];
    
    // Global frame
    const globalVars = allVariables.filter(v => v.scope === 'global');
    frames.push({
      name: 'Global',
      variables: globalVars,
      isActive: step.callStack.length === 0
    });

    // Function frames
    step.callStack.forEach((funcName, index) => {
      const funcVars = allVariables.filter(v => 
        v.scope === 'local' || v.scope === funcName
      );
      frames.push({
        name: funcName,
        variables: funcVars,
        isActive: index === step.callStack.length - 1
      });
    });

    return frames.reverse(); // Stack grows upward, so reverse for visual representation
  };

  const stackFrames = createStackFrames();
  const activeVariables = step.variables.map(v => v.name);

  const getVariableColor = (variable: VariableInfo) => {
    if (activeVariables.includes(variable.name)) {
      return 'border-green-400 bg-green-50';
    }
    switch (variable.type.toLowerCase()) {
      case 'string':
        return 'border-blue-400 bg-blue-50';
      case 'number':
        return 'border-purple-400 bg-purple-50';
      case 'boolean':
        return 'border-orange-400 bg-orange-50';
      case 'function':
        return 'border-red-400 bg-red-50';
      case 'object':
        return 'border-yellow-400 bg-yellow-50';
      case 'array':
        return 'border-indigo-400 bg-indigo-50';
      default:
        return 'border-gray-400 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'string':
        return '"abc"';
      case 'number':
        return '123';
      case 'boolean':
        return 'T/F';
      case 'function':
        return 'f()';
      case 'object':
        return '{}';
      case 'array':
        return '[]';
      default:
        return '?';
    }
  };

  return (
    <div className="space-y-4">
      {/* Stack Direction Indicator */}
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
        <ArrowUp className="w-4 h-4" />
        <span>Stack grows upward</span>
        <ArrowUp className="w-4 h-4" />
      </div>

      {/* Stack Frames */}
      <div className="space-y-2">
        {stackFrames.map((frame, frameIndex) => (
          <motion.div
            key={`${frame.name}-${frameIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: frameIndex * 0.1 }}
            className={`border-2 rounded-lg p-4 ${
              frame.isActive 
                ? 'border-primary-400 bg-primary-50' 
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            {/* Frame Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  frame.isActive ? 'bg-primary-500' : 'bg-gray-400'
                }`} />
                <h4 className="font-medium text-gray-900">
                  {frame.name} Frame
                </h4>
              </div>
              {frame.isActive && (
                <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                  Active
                </span>
              )}
            </div>

            {/* Variables in Frame */}
            {frame.variables.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {frame.variables.map((variable, varIndex) => (
                  <motion.div
                    key={`${variable.name}-${varIndex}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: activeVariables.includes(variable.name) ? 1.05 : 1,
                      opacity: 1 
                    }}
                    transition={{ 
                      delay: (frameIndex * 0.1) + (varIndex * 0.05),
                      type: "spring",
                      stiffness: 300
                    }}
                    className={`border-2 rounded-lg p-3 transition-all duration-200 ${getVariableColor(variable)}`}
                  >
                    {/* Variable Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-medium text-gray-800">
                        {variable.name}
                      </span>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs bg-white px-1 py-0.5 rounded border">
                          {getTypeIcon(variable.type)}
                        </span>
                        {activeVariables.includes(variable.name) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-green-500 rounded-full"
                          />
                        )}
                      </div>
                    </div>

                    {/* Variable Details */}
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{variable.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Value:</span>
                        <code className="bg-white px-1 rounded text-gray-800 max-w-20 truncate">
                          {variable.value}
                        </code>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Line:</span>
                        <span className="font-medium">{variable.line}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500 text-sm">
                No variables in this frame
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Stack Pointer Indicator */}
      {stackFrames.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center space-x-2 text-sm text-gray-600"
        >
          <ArrowDown className="w-4 h-4" />
          <span>Stack Pointer (SP)</span>
        </motion.div>
      )}

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h5 className="text-sm font-medium text-gray-900 mb-3">Legend</h5>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Active Variable</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
            <span>Active Frame</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 border-2 border-blue-400 bg-blue-50 rounded"></div>
            <span>String</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 border-2 border-purple-400 bg-purple-50 rounded"></div>
            <span>Number</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackVisualization;
