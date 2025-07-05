import React from 'react';
import { motion } from 'framer-motion';
import { Package, ArrowRight, Link } from 'lucide-react';
import type { ExecutionStep, VariableInfo } from '../../types';

interface HeapVisualizationProps {
  step: ExecutionStep;
  allVariables: VariableInfo[];
}

interface HeapObject {
  id: string;
  type: 'object' | 'array' | 'function';
  name: string;
  value: string;
  properties?: { key: string; value: string; type: string }[];
  referencedBy: string[];
  isActive: boolean;
}

const HeapVisualization: React.FC<HeapVisualizationProps> = ({ 
  step, 
  allVariables 
}) => {
  const activeVariables = step.variables.map(v => v.name);

  // Extract heap objects (objects, arrays, functions)
  const createHeapObjects = (): HeapObject[] => {
    const heapObjects: HeapObject[] = [];
    
    allVariables.forEach(variable => {
      const type = variable.type.toLowerCase();
      
      if (type === 'object' || type === 'array' || type === 'function') {
        // Parse object/array properties from value string
        let properties: { key: string; value: string; type: string }[] = [];
        
        try {
          if (type === 'object' && variable.value.startsWith('{')) {
            // Simple object parsing - in real implementation, this would be more sophisticated
            const content = variable.value.slice(1, -1);
            if (content.trim()) {
              const pairs = content.split(',');
              properties = pairs.map((pair, index) => {
                const [key, value] = pair.split(':').map(s => s.trim());
                return {
                  key: key?.replace(/['"]/g, '') || `prop${index}`,
                  value: value?.replace(/['"]/g, '') || 'undefined',
                  type: isNaN(Number(value)) ? 'string' : 'number'
                };
              });
            }
          } else if (type === 'array' && variable.value.startsWith('[')) {
            const content = variable.value.slice(1, -1);
            if (content.trim()) {
              const items = content.split(',');
              properties = items.map((item, index) => ({
                key: index.toString(),
                value: item.trim().replace(/['"]/g, ''),
                type: isNaN(Number(item)) ? 'string' : 'number'
              }));
            }
          }
        } catch (e) {
          // Fallback for complex objects
          properties = [{ key: 'value', value: variable.value, type: 'unknown' }];
        }

        heapObjects.push({
          id: `${variable.name}-${variable.line}`,
          type: type as 'object' | 'array' | 'function',
          name: variable.name,
          value: variable.value,
          properties,
          referencedBy: [variable.name],
          isActive: activeVariables.includes(variable.name)
        });
      }
    });

    return heapObjects;
  };

  const heapObjects = createHeapObjects();
  const primitiveVariables = allVariables.filter(v => 
    !['object', 'array', 'function'].includes(v.type.toLowerCase())
  );

  const getObjectColor = (obj: HeapObject) => {
    if (obj.isActive) {
      return 'border-green-400 bg-green-50';
    }
    switch (obj.type) {
      case 'object':
        return 'border-yellow-400 bg-yellow-50';
      case 'array':
        return 'border-indigo-400 bg-indigo-50';
      case 'function':
        return 'border-red-400 bg-red-50';
      default:
        return 'border-gray-400 bg-gray-50';
    }
  };

  const getObjectIcon = (type: string) => {
    switch (type) {
      case 'object':
        return '{}';
      case 'array':
        return '[]';
      case 'function':
        return 'f()';
      default:
        return '?';
    }
  };

  const getPrimitiveColor = (variable: VariableInfo) => {
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
      default:
        return 'border-gray-400 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Heap Objects Section */}
      {heapObjects.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Package className="w-5 h-5 text-gray-600" />
            <h4 className="text-lg font-semibold text-gray-900">Heap Memory</h4>
            <span className="text-sm text-gray-500">
              (Objects, Arrays, Functions)
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {heapObjects.map((obj, index) => (
              <motion.div
                key={obj.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: obj.isActive ? 1.02 : 1,
                }}
                transition={{ delay: index * 0.1 }}
                className={`border-2 rounded-lg p-4 ${getObjectColor(obj)}`}
              >
                {/* Object Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-mono">
                      {getObjectIcon(obj.type)}
                    </span>
                    <span className="font-mono text-sm font-medium">
                      {obj.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs bg-white px-2 py-1 rounded border">
                      {obj.type}
                    </span>
                    {obj.isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-green-500 rounded-full"
                      />
                    )}
                  </div>
                </div>

                {/* Object Properties */}
                {obj.properties && obj.properties.length > 0 ? (
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-gray-600 mb-2">
                      Properties:
                    </div>
                    {obj.properties.map((prop, propIndex) => (
                      <motion.div
                        key={`${prop.key}-${propIndex}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.1) + (propIndex * 0.05) }}
                        className="bg-white rounded p-2 border text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-gray-700">
                            {obj.type === 'array' ? `[${prop.key}]` : prop.key}
                          </span>
                          <ArrowRight className="w-3 h-3 text-gray-400" />
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <code className="text-gray-800 bg-gray-100 px-1 rounded">
                            {prop.value}
                          </code>
                          <span className="text-gray-500">
                            {prop.type}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-2 text-gray-500 text-xs">
                    Empty {obj.type}
                  </div>
                )}

                {/* References */}
                <div className="mt-3 pt-2 border-t border-gray-200">
                  <div className="flex items-center space-x-1 text-xs text-gray-600">
                    <Link className="w-3 h-3" />
                    <span>Referenced by: {obj.referencedBy.join(', ')}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Stack Variables Section (Primitives) */}
      {primitiveVariables.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
            <h4 className="text-lg font-semibold text-gray-900">Stack Memory</h4>
            <span className="text-sm text-gray-500">
              (Primitive Values)
            </span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {primitiveVariables.map((variable, index) => (
              <motion.div
                key={`${variable.name}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: activeVariables.includes(variable.name) ? 1.05 : 1
                }}
                transition={{ delay: index * 0.05 }}
                className={`border-2 rounded-lg p-3 ${getPrimitiveColor(variable)}`}
              >
                <div className="text-center">
                  <div className="font-mono text-sm font-medium mb-1">
                    {variable.name}
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    {variable.type}
                  </div>
                  <code className="text-xs bg-white px-2 py-1 rounded border block truncate">
                    {variable.value}
                  </code>
                  {activeVariables.includes(variable.name) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-2"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {heapObjects.length === 0 && primitiveVariables.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-sm">No memory allocations detected in this step</p>
        </div>
      )}

      {/* Memory Layout Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h5 className="text-sm font-medium text-gray-900 mb-3">Memory Layout</h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <div className="font-medium mb-2">Heap Memory:</div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 border-2 border-yellow-400 bg-yellow-50 rounded"></div>
                <span>Objects {}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 border-2 border-indigo-400 bg-indigo-50 rounded"></div>
                <span>Arrays []</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 border-2 border-red-400 bg-red-50 rounded"></div>
                <span>Functions f()</span>
              </div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-2">Stack Memory:</div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 border-2 border-blue-400 bg-blue-50 rounded"></div>
                <span>Strings</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 border-2 border-purple-400 bg-purple-50 rounded"></div>
                <span>Numbers</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Currently Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeapVisualization;
