// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error('User creation failed');
  }
};

// Add this function for login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Assuming the response contains a token
  } catch (error) {
    throw new Error('Login failed');
  }
};