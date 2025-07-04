import { useState, useCallback } from 'react';
import { analyzeCode } from '../services/openai';
import type { AnalysisResponse, UseCodeAnalysisReturn } from '../types';

export function useCodeAnalysis(): UseCodeAnalysisReturn {
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeCodeCallback = useCallback(async (code: string) => {
    if (!code.trim()) {
      setError('Please enter some code to analyze');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeCode(code);
      setAnalysis(result);
      
      if (!result.success && result.error) {
        setError(result.error);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze code';
      setError(errorMessage);
      console.error('Code analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearAnalysis = useCallback(() => {
    setAnalysis(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    analysis,
    isLoading,
    error,
    analyzeCode: analyzeCodeCallback,
    clearAnalysis
  };
}
