import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

const rootElement = document.getElementById('root'); // Get the root element
const root = ReactDOM.createRoot(rootElement); // Create a root

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
