// External imports
import { createRoot } from 'react-dom/client';
// Internal imports
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
