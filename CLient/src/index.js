import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './Context/AppContext.js';
import { UserProvider } from './Context/UserContext.js';
import { FilterProvider } from './Context/FilterContext.js';
import { OrderProvider } from './Context/OrderContext.js';
import { RestaurantProvider } from './Context/RestaurantContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AppProvider>
      <UserProvider>
        <OrderProvider>
          <RestaurantProvider>
            <FilterProvider>
              <App />
            </FilterProvider>
          </RestaurantProvider>
        </OrderProvider>
      </UserProvider>
    </AppProvider>
  </BrowserRouter>
  // </React.StrictMode>
);