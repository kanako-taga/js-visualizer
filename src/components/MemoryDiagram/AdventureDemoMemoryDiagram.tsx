import React from 'react';
import AdventureMemoryDiagram from './AdventureMemoryDiagram';
import type { MemoryExplanation } from '../../types';

// Mock data for the adventure demonstration
const mockAdventureAnalysis: MemoryExplanation = {
  description: "Join our wise coding mentor on an exciting JavaScript adventure! Watch as he discovers magical variables and casts powerful function spells to create amazing programs.",
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
      description: "Our wise mentor learns a new magic trick called 'greetUser'! This special ability will help create friendly messages for everyone.",
      line: 4,
      variables: [],
      callStack: []
    },
    {
      step: 2,
      description: "The mentor writes down a special name 'JavaScript Learner' on a magical scroll and puts it in the treasure chest labeled 'userName'.",
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
      description: "Time for magic! The mentor casts the 'greetUser' spell and passes the name from the treasure chest as a magical ingredient.",
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
      description: "Inside the magic spell, the mentor creates a warm greeting by mixing 'Hello, ' with the special name, storing it in a new treasure chest called 'greeting'.",
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
      description: "The mentor shares the magical greeting with the world by announcing it loudly for everyone to hear!",
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
      description: "The magic spell is complete! The mentor sends the beautiful greeting back as a gift.",
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
      description: "Mission accomplished! The mentor places the final greeting in the 'message' treasure chest. What an amazing adventure!",
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

const AdventureDemoMemoryDiagram: React.FC = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
              <div className="text-white text-3xl font-bold">👨‍🏫</div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                JavaScript Adventure Story
              </h1>
              <p className="text-xl text-gray-600">
                Learn coding with our friendly mentor! 🌟
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8 border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 The Code We're Exploring</h2>
            <div className="bg-gray-900 rounded-lg p-4 text-left">
              <pre className="text-green-400 font-mono text-sm">
{`function greetUser(name) {
  const greeting = "Hello, " + name + "!";
  console.log(greeting);
  return greeting;
}

const userName = "JavaScript Learner";
const message = greetUser(userName);`}
              </pre>
            </div>
            <p className="text-gray-600 mt-4">
              Watch our mentor work through this code step by step, discovering treasures and casting magic spells! 🎭✨
            </p>
          </div>
        </div>
        
        <AdventureMemoryDiagram analysis={mockAdventureAnalysis} />
        
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">🎯 What You'll Learn</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">💎</div>
              <h4 className="font-bold text-lg text-gray-800 mb-2">Variables as Treasures</h4>
              <p className="text-gray-600">See how JavaScript stores information in special treasure chests called variables!</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🪄</div>
              <h4 className="font-bold text-lg text-gray-800 mb-2">Functions as Magic</h4>
              <p className="text-gray-600">Discover how functions work like magic spells that can transform and create new things!</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📖</div>
              <h4 className="font-bold text-lg text-gray-800 mb-2">Step-by-Step Story</h4>
              <p className="text-gray-600">Follow along as each line of code becomes part of an exciting adventure story!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdventureDemoMemoryDiagram;
