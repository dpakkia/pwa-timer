// src/workout-main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import TimerApp from './TimerApp.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TimerApp />
  </React.StrictMode>
);
