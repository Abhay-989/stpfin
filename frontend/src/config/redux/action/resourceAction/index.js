import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientServer } from '../../../';

// --- Get Resources by Subject ---
export const getResources = createAsyncThunk(
  'resources/getBySubject',
  async (subId, { rejectWithValue }) => {
    try {
      const response = await clientServer.get(`/resources/${subId}`);
      return response.data.resources || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch resources');
    }
  }
);

// --- Upload Resource ---
export const createResource = createAsyncThunk(
  'resources/upload',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await clientServer.post('/resource', formData);
      return response.data.resource;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Upload failed');
    }
  }
);

// --- Delete Resource ---
export const deleteResource = createAsyncThunk(
  'resources/delete',
  async (id, { rejectWithValue }) => {
    try {
      await clientServer.delete(`/resource/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Delete failed');
    }
  }
);
