import React from 'react';
import ReactDOM from 'react-dom/client';
import AdventureDemoMemoryDiagram from './components/MemoryDiagram/AdventureDemoMemoryDiagram';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AdventureDemoMemoryDiagram />
  </React.StrictMode>,
);
