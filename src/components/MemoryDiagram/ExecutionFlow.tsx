import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowDown, CheckCircle, Circle } from 'lucide-react';
import type { ExecutionStep } from '../../types';

interface ExecutionFlowProps {
  steps: ExecutionStep[];
  currentStep: number;
}

const ExecutionFlow: React.FC<ExecutionFlowProps> = ({ steps, currentStep }) => {
  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-400 bg-green-50 text-green-800';
      case 'active':
        return 'border-blue-400 bg-blue-50 text-blue-800';
      case 'pending':
        return 'border-gray-300 bg-gray-50 text-gray-600';
      default:
        return 'border-gray-300 bg-gray-50 text-gray-600';
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'active':
        return <Play className="w-5 h-5 text-blue-600" />;
      case 'pending':
        return <Circle className="w-5 h-5 text-gray-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  if (steps.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Play className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p className="text-sm">No execution steps available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Flow Header */}
      <div className="flex items-center space-x-2 mb-6">
        <Play className="w-5 h-5 text-gray-600" />
        <h4 className="text-lg font-semibold text-gray-900">Execution Flow</h4>
        <span className="text-sm text-gray-500">
          Step-by-step code execution
        </span>
      </div>

      {/* Execution Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        {/* Active Progress Line */}
        <motion.div
          className="absolute left-6 top-0 w-0.5 bg-blue-500"
          initial={{ height: 0 }}
          animate={{ 
            height: currentStep > 0 ? `${(currentStep / Math.max(steps.length - 1, 1)) * 100}%` : '0%'
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const isActive = index === currentStep;
            
            return (
              <motion.div
                key={`step-${step.step}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start space-x-4"
              >
                {/* Step Icon */}
                <motion.div
                  className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${getStepColor(status)}`}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    boxShadow: isActive ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : '0 0 0 0px transparent'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {getStepIcon(status)}
                </motion.div>

                {/* Step Content */}
                <motion.div
                  className={`flex-1 min-w-0 p-4 rounded-lg border-2 ${getStepColor(status)}`}
                  animate={{
                    scale: isActive ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">
                        Step {step.step}
                      </span>
                      <span className="text-xs bg-white px-2 py-1 rounded border">
                        Line {step.line}
                      </span>
                    </div>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium"
                      >
                        Current
                      </motion.span>
                    )}
                  </div>

                  {/* Step Description */}
                  <p className="text-sm mb-3">
                    {step.description}
                  </p>

                  {/* Variables at this step */}
                  {step.variables.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs font-medium mb-2">
                        Variables at this step:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {step.variables.map((variable, varIndex) => (
                          <motion.div
                            key={`${variable.name}-${varIndex}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: (index * 0.1) + (varIndex * 0.05) }}
                            className="bg-white border rounded px-2 py-1 text-xs"
                          >
                            <span className="font-mono font-medium">
                              {variable.name}
                            </span>
                            <span className="text-gray-500 ml-1">
                              = {variable.value}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Call Stack at this step */}
                  {step.callStack.length > 0 && (
                    <div>
                      <div className="text-xs font-medium mb-2">
                        Call stack:
                      </div>
                      <div className="flex items-center space-x-1 text-xs">
                        {step.callStack.map((func, funcIndex) => (
                          <React.Fragment key={`${func}-${funcIndex}`}>
                            <span className="bg-white border rounded px-2 py-1 font-mono">
                              {func}
                            </span>
                            {funcIndex < step.callStack.length - 1 && (
                              <ArrowDown className="w-3 h-3 text-gray-400" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Flow Summary */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h5 className="text-sm font-medium text-gray-900 mb-3">Execution Summary</h5>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {steps.filter((_, i) => i < currentStep).length}
            </div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {currentStep < steps.length ? 1 : 0}
            </div>
            <div className="text-gray-600">Active</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-600">
              {Math.max(0, steps.length - currentStep - 1)}
            </div>
            <div className="text-gray-600">Remaining</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionFlow;
