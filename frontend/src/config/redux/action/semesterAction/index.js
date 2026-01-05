import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientServer } from '../../../';

export const getSemesters = createAsyncThunk(
  'semesters/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await clientServer.get('/semesters');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch semesters');
    }
  }
);

export const createSemester = createAsyncThunk(
  'semesters/create',
  async (semesterData, { rejectWithValue }) => {
    try {
      const response = await clientServer.post('/semester', semesterData);
      return response.data.semester;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create semester');
    }
  }
);

export const deleteSemester = createAsyncThunk(
  'semesters/delete',
  async (id, { rejectWithValue }) => {
    try {
      await clientServer.delete(`/semester/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete semester');
    }
  }
);
