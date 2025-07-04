import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw } from 'lucide-react';
import Button from '../UI/Button';
import type { CodeEditorProps } from '../../types';

// Monaco editor types
declare global {
  const monaco: any;
}

const MonacoEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading,
  language = 'javascript'
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    
    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      lineHeight: 20,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
      renderLineHighlight: 'line',
      selectionHighlight: false,
      occurrencesHighlight: false,
      renderWhitespace: 'none',
      folding: true,
      lineNumbers: 'on',
      glyphMargin: false,
      lineDecorationsWidth: 10,
      lineNumbersMinChars: 3,
    });

    // Add keyboard shortcut for running code
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      if (!isLoading) {
        onSubmit();
      }
    });
  };

  const handleClear = () => {
    onChange('');
    editorRef.current?.focus();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <span className="text-sm font-medium text-gray-600 ml-3">
            JavaScript Code Editor
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            disabled={isLoading}
            className="text-gray-600 hover:text-gray-800"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Clear
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onSubmit}
            isLoading={isLoading}
            disabled={!value.trim() || isLoading}
          >
            <Play className="w-4 h-4 mr-1" />
            Explain Code
          </Button>
        </div>
      </div>
      
      <div className="relative">
        <Editor
          height="400px"
          language={language}
          value={value}
          onChange={(newValue) => onChange(newValue || '')}
          onMount={handleEditorDidMount}
          theme="vs"
          options={{
            padding: { top: 16, bottom: 16 },
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
          }}
        />
        
        {!value.trim() && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-gray-400">
              <p className="text-lg font-medium mb-2">Start typing your JavaScript code...</p>
              <p className="text-sm">
                Or try one of the examples below
              </p>
              <p className="text-xs mt-2 opacity-75">
                Press Cmd/Ctrl + Enter to analyze
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonacoEditor;
