import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './Context/AppContext.js';
import { UserProvider } from './Context/UserContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AppProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AppProvider>
    </React.StrictMode>
  </BrowserRouter>
);