import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';  // Importez le Provider de react-redux
import './index.css';
import App from '../src/components/App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 
      <App />

  </React.StrictMode>
);

reportWebVitals();
