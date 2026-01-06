import { createSlice } from "@reduxjs/toolkit";
import { getSubjects, createSubject, deleteSubject } from "../../action/subjectAction";

const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- GET ---
      .addCase(getSubjects.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- CREATE ---
      .addCase(createSubject.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // --- DELETE ---
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.list = state.list.filter(sub => sub._id !== action.payload);
      });
  },
});

export default subjectSlice.reducer;
