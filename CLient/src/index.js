import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './Context/AppContext.js';
import { UserProvider } from './Context/UserContext.js';
import { FilterProvider } from './Context/FilterContext.js';
import { OrderProvider } from './Context/OrderContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AppProvider>
      <UserProvider>
        <OrderProvider>
          <FilterProvider>
            <App />
          </FilterProvider>
        </OrderProvider>
      </UserProvider>
    </AppProvider>
  </BrowserRouter>
);