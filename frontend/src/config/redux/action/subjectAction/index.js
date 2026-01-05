import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientServer } from '../../../';

// --- Get Subjects by Semester ---
export const getSubjects = createAsyncThunk(
  'subjects/getBySem',
  async (semId, { rejectWithValue }) => {
    try {
      const response = await clientServer.get(`/subjects/${semId}`);
      return response.data.subjects || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch subjects');
    }
  }
);

// --- Create Subject ---
export const createSubject = createAsyncThunk(
  'subjects/create',
  async (subjectData, { rejectWithValue }) => {
    try {
      const response = await clientServer.post('/subject', subjectData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create subject');
    }
  }
);

// --- Delete Subject ---
export const deleteSubject = createAsyncThunk(
  'subjects/delete',
  async (id, { rejectWithValue }) => {
    try {
      await clientServer.delete(`/subject/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete subject');
    }
  }
);
