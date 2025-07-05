import React from 'react';
import MemoryDiagram from './MemoryDiagram';
import type { MemoryExplanation } from '../../types';

// Mock data for demonstration
const mockMemoryAnalysis: MemoryExplanation = {
  description: "This code demonstrates function calls, variable declarations, and string concatenation. The execution creates variables in different scopes and shows how memory is allocated for primitive values and function calls.",
  callStack: ["greetUser"],
  variables: [
    {
      name: "userName",
      type: "string",
      value: "JavaScript Learner",
      scope: "global",
      line: 10
    },
    {
      name: "message",
      type: "string", 
      value: "Hello, JavaScript Learner!",
      scope: "global",
      line: 11
    },
    {
      name: "name",
      type: "string",
      value: "JavaScript Learner",
      scope: "greetUser",
      line: 4
    },
    {
      name: "greeting",
      type: "string",
      value: "Hello, JavaScript Learner!",
      scope: "greetUser", 
      line: 5
    }
  ],
  executionSteps: [
    {
      step: 1,
      description: "Declare function greetUser - function is hoisted and available in memory",
      line: 4,
      variables: [],
      callStack: []
    },
    {
      step: 2,
      description: "Declare and initialize userName variable with string value",
      line: 10,
      variables: [
        {
          name: "userName",
          type: "string",
          value: "JavaScript Learner",
          scope: "global",
          line: 10
        }
      ],
      callStack: []
    },
    {
      step: 3,
      description: "Call greetUser function with userName as argument",
      line: 11,
      variables: [
        {
          name: "userName",
          type: "string",
          value: "JavaScript Learner",
          scope: "global",
          line: 10
        },
        {
          name: "name",
          type: "string",
          value: "JavaScript Learner",
          scope: "greetUser",
          line: 4
        }
      ],
      callStack: ["greetUser"]
    },
    {
      step: 4,
      description: "Inside greetUser: create greeting variable by concatenating strings",
      line: 5,
      variables: [
        {
          name: "userName",
          type: "string",
          value: "JavaScript Learner",
          scope: "global",
          line: 10
        },
        {
          name: "name",
          type: "string",
          value: "JavaScript Learner",
          scope: "greetUser",
          line: 4
        },
        {
          name: "greeting",
          type: "string",
          value: "Hello, JavaScript Learner!",
          scope: "greetUser",
          line: 5
        }
      ],
      callStack: ["greetUser"]
    },
    {
      step: 5,
      description: "Log the greeting to console",
      line: 6,
      variables: [
        {
          name: "userName",
          type: "string",
          value: "JavaScript Learner",
          scope: "global",
          line: 10
        },
        {
          name: "name",
          type: "string",
          value: "JavaScript Learner",
          scope: "greetUser",
          line: 4
        },
        {
          name: "greeting",
          type: "string",
          value: "Hello, JavaScript Learner!",
          scope: "greetUser",
          line: 5
        }
      ],
      callStack: ["greetUser"]
    },
    {
      step: 6,
      description: "Return greeting value from function",
      line: 7,
      variables: [
        {
          name: "userName",
          type: "string",
          value: "JavaScript Learner",
          scope: "global",
          line: 10
        },
        {
          name: "name",
          type: "string",
          value: "JavaScript Learner",
          scope: "greetUser",
          line: 4
        },
        {
          name: "greeting",
          type: "string",
          value: "Hello, JavaScript Learner!",
          scope: "greetUser",
          line: 5
        }
      ],
      callStack: ["greetUser"]
    },
    {
      step: 7,
      description: "Function returns, assign result to message variable",
      line: 11,
      variables: [
        {
          name: "userName",
          type: "string",
          value: "JavaScript Learner",
          scope: "global",
          line: 10
        },
        {
          name: "message",
          type: "string",
          value: "Hello, JavaScript Learner!",
          scope: "global",
          line: 11
        }
      ],
      callStack: []
    }
  ]
};

const DemoMemoryDiagram: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Visual Memory Diagram Demo
        </h2>
        <p className="text-gray-600">
          This demonstrates the interactive memory visualization for the sample JavaScript code.
        </p>
      </div>
      
      <MemoryDiagram analysis={mockMemoryAnalysis} />
    </div>
  );
};

export default DemoMemoryDiagram;
