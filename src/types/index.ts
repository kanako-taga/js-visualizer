// Analysis Types
export interface VariableInfo {
  name: string;
  type: string;
  value: string;
  scope: string;
  line: number;
}

export interface ExecutionStep {
  step: number;
  description: string;
  line: number;
  variables: VariableInfo[];
  callStack: string[];
}

export interface LineExplanation {
  line: number;
  code: string;
  explanation: string;
  concepts: string[];
}

export interface ConceptExplanation {
  concept: string;
  description: string;
  examples: string[];
}

export interface PatternExample {
  pattern: string;
  description: string;
  code: string;
  usedIn: string[];
}

export interface CodeExample {
  title: string;
  description: string;
  code: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface MemoryExplanation {
  description: string;
  callStack: string[];
  variables: VariableInfo[];
  executionSteps: ExecutionStep[];
  memoryDiagram?: string;
}

export interface SyntaxBreakdown {
  lineByLine: LineExplanation[];
  concepts: ConceptExplanation[];
  commonMistakes: string[];
  bestPractices: string[];
}

export interface RealWorldExamples {
  patterns: PatternExample[];
  usedIn: string[];
  progressiveExamples: CodeExample[];
  relatedConcepts: string[];
}

export interface AnalysisResponse {
  memoryExplanation: MemoryExplanation;
  syntaxBreakdown: SyntaxBreakdown;
  realWorldExamples: RealWorldExamples;
  success: boolean;
  error?: string;
}

// Component Types
export interface TabProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  language?: string;
}

export interface ExplanationCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

// API Types
export interface OpenAIRequest {
  code: string;
  language: string;
}

export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// Example Code Types
export interface ExampleSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
  category: 'variables' | 'functions' | 'loops' | 'objects' | 'arrays' | 'async';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Visualization Types
export interface MemoryVisualization {
  type: 'stack' | 'heap' | 'execution';
  data: any;
  step?: number;
}

export interface DiagramProps {
  data: any;
  width?: number;
  height?: number;
  animated?: boolean;
  className?: string;
}

// Hook Types
export interface UseCodeAnalysisReturn {
  analysis: AnalysisResponse | null;
  isLoading: boolean;
  error: string | null;
  analyzeCode: (code: string) => Promise<void>;
  clearAnalysis: () => void;
}

export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T) => void;
  removeValue: () => void;
}

// Error Types
export interface AppError {
  message: string;
  code?: string;
  details?: any;
}

// Theme Types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    warning: string;
    success: string;
  };
  fonts: {
    sans: string;
    mono: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}
