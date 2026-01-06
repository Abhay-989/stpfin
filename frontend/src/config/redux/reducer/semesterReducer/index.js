import { createSlice } from "@reduxjs/toolkit";
import { getSemesters, createSemester, deleteSemester } from "../../action/semesterAction";

const semesterSlice = createSlice({
  name: 'semester',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSemesters.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getSemesters.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getSemesters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSemester.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteSemester.fulfilled, (state, action) => {
        state.list = state.list.filter(sem => sem._id !== action.payload);
      });
  },
});

export default semesterSlice.reducer;
