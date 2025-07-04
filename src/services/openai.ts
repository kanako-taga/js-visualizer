import OpenAI from 'openai';
import type { AnalysisResponse } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const ANALYSIS_PROMPT = `
You are a JavaScript learning assistant. Analyze the provided JavaScript code and return a detailed explanation in JSON format.

The response must be valid JSON with this exact structure:
{
  "memoryExplanation": {
    "description": "Clear explanation of how this code works in computer memory",
    "callStack": ["function calls in order"],
    "variables": [
      {
        "name": "variable name",
        "type": "data type",
        "value": "current value",
        "scope": "global/function/block",
        "line": 1
      }
    ],
    "executionSteps": [
      {
        "step": 1,
        "description": "What happens in this step",
        "line": 1,
        "variables": [],
        "callStack": []
      }
    ]
  },
  "syntaxBreakdown": {
    "lineByLine": [
      {
        "line": 1,
        "code": "actual code line",
        "explanation": "what this line does",
        "concepts": ["array of concepts used"]
      }
    ],
    "concepts": [
      {
        "concept": "concept name",
        "description": "simple explanation",
        "examples": ["example usage"]
      }
    ],
    "commonMistakes": ["common errors beginners make"],
    "bestPractices": ["recommended practices"]
  },
  "realWorldExamples": {
    "patterns": [
      {
        "pattern": "pattern name",
        "description": "what it does",
        "code": "example code",
        "usedIn": ["where you see this"]
      }
    ],
    "usedIn": ["popular websites/apps that use this"],
    "progressiveExamples": [
      {
        "title": "example title",
        "description": "what it demonstrates",
        "code": "example code",
        "difficulty": "beginner"
      }
    ],
    "relatedConcepts": ["related topics to learn next"]
  }
}

Guidelines:
- Use simple, beginner-friendly language
- Avoid technical jargon
- Include practical analogies
- Focus on understanding, not memorization
- Provide concrete examples
- Keep explanations encouraging and positive

Code to analyze:
`;

export async function analyzeCode(code: string): Promise<AnalysisResponse> {
  try {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your .env.local file.');
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: ANALYSIS_PROMPT
        },
        {
          role: 'user',
          content: code
        }
      ],
      temperature: 0.7,
      max_tokens: 3000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const analysisData = JSON.parse(content);
    
    return {
      ...analysisData,
      success: true
    };

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Return a fallback response for development/demo purposes
    return {
      memoryExplanation: {
        description: `This code creates and manipulates data in your computer's memory. ${getBasicMemoryExplanation(code)}`,
        callStack: extractFunctionCalls(code),
        variables: extractVariables(code),
        executionSteps: generateBasicSteps(code)
      },
      syntaxBreakdown: {
        lineByLine: generateLineByLine(code),
        concepts: extractConcepts(code),
        commonMistakes: getCommonMistakes(code),
        bestPractices: getBestPractices(code)
      },
      realWorldExamples: {
        patterns: getPatterns(code),
        usedIn: ['Modern web applications', 'Node.js servers', 'React components'],
        progressiveExamples: getProgressiveExamples(code),
        relatedConcepts: getRelatedConcepts(code)
      },
      success: false,
      error: error instanceof Error ? error.message : 'Failed to analyze code'
    };
  }
}

// Fallback functions for when OpenAI is not available
function getBasicMemoryExplanation(code: string): string {
  if (code.includes('function')) {
    return 'Functions are stored in memory and can be called multiple times. Variables inside functions have their own memory space.';
  }
  if (code.includes('let') || code.includes('const') || code.includes('var')) {
    return 'Variables are stored in memory locations. Each variable has a name and holds a value.';
  }
  return 'This code creates data structures in memory that the computer can work with.';
}

function extractFunctionCalls(code: string): string[] {
  const functionPattern = /(\w+)\s*\(/g;
  const matches = code.match(functionPattern);
  return matches ? matches.map(match => match.replace('(', '')) : [];
}

function extractVariables(code: string): any[] {
  const varPattern = /(let|const|var)\s+(\w+)/g;
  const variables = [];
  let match;
  let lineNumber = 1;
  
  while ((match = varPattern.exec(code)) !== null) {
    variables.push({
      name: match[2],
      type: 'unknown',
      value: 'assigned value',
      scope: match[1] === 'var' ? 'function' : 'block',
      line: lineNumber
    });
  }
  
  return variables;
}

function generateBasicSteps(code: string): any[] {
  const lines = code.split('\n').filter(line => line.trim());
  return lines.map((line, index) => ({
    step: index + 1,
    description: `Execute: ${line.trim()}`,
    line: index + 1,
    variables: [],
    callStack: []
  }));
}

function generateLineByLine(code: string): any[] {
  const lines = code.split('\n');
  return lines.map((line, index) => ({
    line: index + 1,
    code: line,
    explanation: `This line ${getLineExplanation(line)}`,
    concepts: getLineConcepts(line)
  }));
}

function getLineExplanation(line: string): string {
  if (line.includes('function')) return 'declares a function';
  if (line.includes('let') || line.includes('const')) return 'declares a variable';
  if (line.includes('console.log')) return 'prints output to the console';
  if (line.includes('return')) return 'returns a value from the function';
  return 'executes JavaScript code';
}

function getLineConcepts(line: string): string[] {
  const concepts = [];
  if (line.includes('function')) concepts.push('functions');
  if (line.includes('let') || line.includes('const')) concepts.push('variables');
  if (line.includes('=')) concepts.push('assignment');
  if (line.includes('console.log')) concepts.push('output');
  return concepts;
}

function extractConcepts(code: string): any[] {
  const concepts = [];
  if (code.includes('function')) {
    concepts.push({
      concept: 'Functions',
      description: 'Reusable blocks of code that perform specific tasks',
      examples: ['function greet() { }', 'const add = (a, b) => a + b']
    });
  }
  if (code.includes('let') || code.includes('const')) {
    concepts.push({
      concept: 'Variables',
      description: 'Containers that store data values',
      examples: ['let name = "John"', 'const age = 25']
    });
  }
  return concepts;
}

function getCommonMistakes(code: string): string[] {
  const mistakes = ['Forgetting semicolons', 'Using var instead of let/const'];
  if (code.includes('function')) {
    mistakes.push('Forgetting to return values from functions');
  }
  return mistakes;
}

function getBestPractices(code: string): string[] {
  const practices = ['Use meaningful variable names', 'Keep functions small and focused'];
  if (code.includes('const')) {
    practices.push('Use const for values that don\'t change');
  }
  return practices;
}

function getPatterns(code: string): any[] {
  const patterns = [];
  if (code.includes('function')) {
    patterns.push({
      pattern: 'Function Declaration',
      description: 'Creating reusable code blocks',
      code: 'function myFunction() { /* code */ }',
      usedIn: ['React components', 'Node.js modules', 'Web APIs']
    });
  }
  return patterns;
}

function getProgressiveExamples(code: string): any[] {
  return [
    {
      title: 'Basic Example',
      description: 'A simple version of this concept',
      code: 'let message = "Hello World";\nconsole.log(message);',
      difficulty: 'beginner' as const
    }
  ];
}

function getRelatedConcepts(code: string): string[] {
  const concepts = ['JavaScript basics', 'Programming fundamentals'];
  if (code.includes('function')) {
    concepts.push('Arrow functions', 'Function parameters', 'Return values');
  }
  return concepts;
}
