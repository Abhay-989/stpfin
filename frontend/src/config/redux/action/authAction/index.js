import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientServer } from '../../../';

// --- Login User ---
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await clientServer.post('/login', userData);
      // Save token in localStorage
      localStorage.setItem('token', response.data.token);
      return response.data; // { token }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);
