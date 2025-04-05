export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    ME: '/auth/me',
  },
  
  // User endpoints
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    ADDRESSES: '/users/addresses',
    ORDERS: '/users/orders',
    WISHLIST: '/users/wishlist',
  },
  
  // Product endpoints
  PRODUCTS: {
    BASE: '/products',
    FEATURED: '/products/featured',
    NEW_ARRIVALS: '/products/new-arrivals',
    SEARCH: '/products/search',
    CATEGORIES: '/categories',
  },
  
  // Cart endpoints
  CART: {
    BASE: '/cart',
    ADD: '/cart/add',
    UPDATE: '/cart/update',
    REMOVE: '/cart/remove',
    CLEAR: '/cart/clear',
  },
  
  // Checkout endpoints
  CHECKOUT: {
    BASE: '/checkout',
    SHIPPING_METHODS: '/checkout/shipping-methods',
    PAYMENT_METHODS: '/checkout/payment-methods',
    CALCULATE: '/checkout/calculate',
    PLACE_ORDER: '/checkout/place-order',
  },
  
  // Order endpoints
  ORDERS: {
    BASE: '/orders',
  },
  
  // Content endpoints
  CONTENT: {
    PAGES: '/content/pages',
    NAVIGATION: '/content/navigation',
  },
};
