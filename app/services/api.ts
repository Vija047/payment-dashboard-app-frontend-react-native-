import * as SecureStore from 'expo-secure-store';

// API URL configuration with fallback options
const getApiUrl = () => {
  // Try environment variable first
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  // For development, fallback to localhost
  return 'http://localhost:3000/api';
};

const API_URL = getApiUrl();

export async function getToken() {
  return SecureStore.getItemAsync('jwt');
}

export async function setToken(token: string) {
  return SecureStore.setItemAsync('jwt', token);
}

export async function removeToken() {
  return SecureStore.deleteItemAsync('jwt');
}

export async function apiFetch(path: string, options: RequestInit = {}, noAuth = false) {
  const token = noAuth ? null : await getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const url = `${API_URL}${path}`;
  console.log(`API Request: ${url}`);
  console.log('API Headers:', headers);
  if (options.body) {
    console.log('API Body:', options.body);
  }

  try {
    const fetchOptions: RequestInit = {
      ...options,
      headers,
    };

    const res = await fetch(url, fetchOptions);

    console.log(`API Response: ${res.status} ${res.statusText}`);

    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error Response:', errorText);
      throw new Error(errorText || `HTTP Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('API Response Data:', data);
    return data;
  } catch (error) {
    console.error('API Fetch Error:', error);

    // Handle specific error types
    if (error instanceof TypeError && (
      error.message.includes('Network request failed') ||
      error.message.includes('Failed to fetch') ||
      error.message.includes('timeout')
    )) {
      console.error('Network error detected');
      throw new Error('Network connection failed. Please check your internet connection and ensure the server is running at ' + API_URL);
    }

    // Re-throw the original error if we can't handle it
    throw error;
  }
}

// Auth API functions
export const authAPI = {
  register: async (email: string, password: string, name: string) => {
    const response = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }, true);

    // Optionally auto-login after successful registration
    if (response.access_token) {
      await setToken(response.access_token);
    }

    return response;
  },

  login: async (email: string, password: string) => {
    const response = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }, true);

    if (response.access_token) {
      await setToken(response.access_token);
    }

    return response;
  },

  logout: async () => {
    await removeToken();
  },
};

// Payment API functions
export const paymentsAPI = {
  getPayments: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    method?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.method) queryParams.append('method', params.method);
    if (params?.startDate) queryParams.append('startDate', params.startDate);
    if (params?.endDate) queryParams.append('endDate', params.endDate);

    const queryString = queryParams.toString();
    return apiFetch(`/payments${queryString ? '?' + queryString : ''}`);
  },

  getPaymentStats: async () => {
    return apiFetch('/payments/stats');
  },

  getPayment: async (id: string) => {
    return apiFetch(`/payments/${id}`);
  },

  createPayment: async (paymentData: {
    amount: number;
    currency: string;
    method: string;
    description?: string;
    recipientEmail?: string;
  }) => {
    return apiFetch('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  },
};

// Default export
const api = {
  getToken,
  setToken,
  removeToken,
  apiFetch,
  authAPI,
  paymentsAPI,
};

export default api;