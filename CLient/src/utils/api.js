// API Configuration
import { getAuthToken } from '../Helper/authHelper';

export const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  GOOGLE_AUTH: '/api/auth/google',
  UPDATE_PROFILE: '/api/auth/update-profile',
  GET_ALL_ORDERS: '/api/auth/getAllOrders',
  GET_ALL_ADDRESS: '/api/auth/getAllAddress',
  ADD_ADDRESS: '/api/auth/addAddress',
  DELETE_ADDRESS: (index) => `/api/auth/deleteAddress/${index}`,
  UPDATE_ADDRESS: (index) => `/api/auth/updateAddress/${index}`,
  VERIFY_COUPON: (userId) => `/api/auth/verifyCoupon/${userId}`,
  
  // Restaurant
  GET_ALL_RESTAURANTS: '/api/restaurant/getallRestaurants',
  GET_ALL_FOOD_ITEMS: '/api/restaurant/getAllFoodItems',
  
  // Order
  GENERATE_PAYMENT: '/api/order/generatePayment',
};

// Cache for API responses
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Utility to create fetch requests with caching
export const fetchWithCache = async (url, options = {}, cacheKey = null) => {
  const key = cacheKey || url;
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const response = await fetch(url, options);
  const data = await response.json();
  
  if (response.ok && (options.method === 'GET' || !options.method)) {
    cache.set(key, { data, timestamp: Date.now() });
  }
  
  return data;
};

// Clear specific cache or all cache
export const clearCache = (key = null) => {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
};

// Generic API call function
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };
  
  const token = getAuthToken();
  if (token) {
    defaultOptions.headers['auth-token'] = token;
  }
  
  const finalOptions = { ...defaultOptions, ...options };
  
  try {
    const response = await fetch(url, finalOptions);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API call failed');
    }
    
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// API call with caching for GET requests
export const apiCallWithCache = async (endpoint, options = {}) => {
  if (options.method && options.method !== 'GET') {
    return apiCall(endpoint, options);
  }
  
  const url = `${API_BASE_URL}${endpoint}`;
  const cacheKey = url + JSON.stringify(options);
  
  try {
    const data = await fetchWithCache(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }, cacheKey);
    
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
