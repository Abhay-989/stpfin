import { createSlice } from "@reduxjs/toolkit";
import { createResource, deleteResource, getResources } from "../../action/resourceAction";

const initialState = {
  files: [],
  loading: false,
  error: null,
  uploadSuccess: false,
};

const resourceSlice = createSlice({
  name: 'resource',
  initialState,
  reducers: {
    resetUploadStatus: (state) => { state.uploadSuccess = false; },
  },
  extraReducers: (builder) => {
    builder
      // --- GET ---
      .addCase(getResources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getResources.fulfilled, (state, action) => {
        state.loading = false;
        state.files = action.payload;
      })
      .addCase(getResources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- CREATE ---
      .addCase(createResource.pending, (state) => {
        state.uploadSuccess = false;
        state.loading = true;
      })
      .addCase(createResource.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadSuccess = true;
        state.files.unshift(action.payload);
      })
      .addCase(createResource.rejected, (state, action) => {
        state.loading = false;
        state.uploadSuccess = false;
        state.error = action.payload;
      })

      // --- DELETE ---
      .addCase(deleteResource.fulfilled, (state, action) => {
        state.files = state.files.filter(file => file._id !== action.payload);
      });
  },
});

export const { resetUploadStatus } = resourceSlice.actions;
export default resourceSlice.reducer;
