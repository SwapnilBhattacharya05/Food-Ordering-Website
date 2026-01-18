// Helper function to safely get and validate auth token
export const getAuthToken = () => {
    const token = localStorage.getItem("token");
    
    // Check if token exists and is valid
    if (!token || token === "undefined" || token === "null" || token === "[object Object]") {
        return null;
    }
    
    return token;
};

// Helper function to check if user is authenticated
export const isAuthenticated = () => {
    return getAuthToken() !== null;
};

// Helper function to clear authentication
export const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("cartItems");
};

// Helper function to handle authentication errors (401)
export const handleAuthError = (response) => {
    if (response.status === 401) {
        clearAuth();
        window.location.href = "/login";
        return true;
    }
    return false;
};
