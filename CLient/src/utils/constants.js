// App-wide constants

// Image URLs
export const EMPTY_CART_IMAGE = 'https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png?f=webp';

export const VEG_ICON = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1024px-Veg_symbol.svg.png';
export const NON_VEG_ICON = 'https://packagingguruji.com/wp-content/uploads/2022/09/Old-Non-Veg-Logo.png';

export const DEFAULT_RESTAURANT_IMAGE = 'https://img.freepik.com/free-photo/textured-background-white-tone_53876-128610.jpg';

// Local storage keys
export const STORAGE_KEYS = {
  MODE: 'mode',
  USER_DATA: 'userData',
  CART_ITEMS: 'cartItems',
  TOKEN: 'token',
  DISCOUNT: 'discount',
  ADDRESS: 'address',
  TOTAL_CART_ITEM_PRICE: 'totalCartItemPrice',
};

// Default values
export const DEFAULT_VALUES = {
  DELIVERY_CHARGE: 50,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
};

// Sort options
export const SORT_OPTIONS = {
  NEWEST: 'newest',
  PRICE_LOW_HIGH: 'price-low-high',
  PRICE_HIGH_LOW: 'price-high-low',
  RATING: 'rating',
};

// Filter options
export const FILTER_CATEGORIES = {
  ALL: 'All',
  VEG: 'Veg',
  NON_VEG: 'Non-Veg',
};

export const SEARCH_BY_OPTIONS = {
  RESTAURANTS: 'Restaurants',
  DISHES: 'Dishes',
};

// Address types
export const ADDRESS_TYPES = {
  HOME: 'Home',
  WORK: 'Work',
  OTHER: 'Other',
};

// Order status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  OUT_FOR_DELIVERY: 'out-for-delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Payment status
export const PAYMENT_STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed',
  PENDING: 'pending',
};

// User roles
export const USER_ROLES = {
  USER: 'user',
  RESTAURANT: 'restaurant',
  ADMIN: 'admin',
};

// Routes
export const ROUTES = {
  HOME: '/',
  SEARCH: '/search',
  CART: '/cart',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROFILE: '/profile',
  CONTACT: '/contact',
  HELP: '/help',
  ABOUT: '/about',
  SUCCESS: '/success',
  CANCEL: '/cancel',
  TRACK_ORDER: (orderId) => `/track-order/${orderId}`,
  RESTAURANT: (restaurantId) => `/restaurant/${restaurantId}`,
  RESTAURANT_LOGIN: '/restaurant-login',
  RESTAURANT_DASHBOARD: '/restaurant-dashboard',
  PARTNER_WITH_US: '/partner-with-us',
  ADMIN_LOGIN: '/Adminlogin',
  ADMIN_DASHBOARD: '/AdminDashboard',
};

// Validation regex
export const VALIDATION = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{10}$/,
  PASSWORD_MIN_LENGTH: 6,
};

// Toast messages
export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  SIGNUP_SUCCESS: 'Signup successful',
  PROFILE_UPDATE_SUCCESS: 'Profile updated successfully',
  ADDRESS_ADDED: 'Address added successfully',
  ADDRESS_UPDATED: 'Address updated successfully',
  ADDRESS_DELETED: 'Address deleted successfully',
  CART_CLEARED: 'Cart cleared successfully',
  ITEM_ADDED_TO_CART: 'Item added to cart',
  ITEM_REMOVED_FROM_CART: 'Item removed from cart',
  ORDER_PLACED: 'Order placed successfully',
  ERROR: 'Something went wrong',
};
