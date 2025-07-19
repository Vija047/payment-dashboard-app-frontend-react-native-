import * as SecureStore from 'expo-secure-store';
import { authAPI } from '../services/api';

// Core token management functions
export async function saveToken(token: string) {
  await SecureStore.setItemAsync('jwt', token);
}

export async function removeToken() {
  await SecureStore.deleteItemAsync('jwt');
}

export async function getToken() {
  return SecureStore.getItemAsync('jwt');
}

// Authentication functions
export async function login(email: string, password: string) {
  try {
    const response = await authAPI.login(email, password);
    return response;
  } catch (error) {
    console.error('Auth login error:', error);
    throw error;
  }
}

export async function register(email: string, password: string, name: string) {
  try {
    const response = await authAPI.register(email, password, name);
    return response;
  } catch (error) {
    console.error('Auth register error:', error);
    throw error;
  }
}

export async function logout() {
  try {
    await authAPI.logout();
    await removeToken();
  } catch (error) {
    console.error('Auth logout error:', error);
    // Still remove token even if API call fails
    await removeToken();
    throw error;
  }
}

export async function isAuthenticated() {
  const token = await getToken();
  return !!token;
}

// Utility function to check if token is expired (basic check)
export async function isTokenValid() {
  const token = await getToken();
  if (!token) return false;

  try {
    // Try to decode JWT token to check expiration
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Date.now() / 1000;
    return payload.exp > now;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}

// Default export
const auth = {
  saveToken,
  removeToken,
  getToken,
  login,
  logout,
  isAuthenticated,
};

export default auth;