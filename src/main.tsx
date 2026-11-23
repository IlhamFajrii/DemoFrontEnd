import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// The default template's font ships with the first load; the other templates' fonts load on demand
import '@fontsource-variable/inter';
import { App } from './App';
import './styles/theme.css';
import './styles/base.css';
import './styles/templates.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
