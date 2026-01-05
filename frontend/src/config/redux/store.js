import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import semesterReducer from "./reducer/semesterReducer";
import subjectReducer from "./reducer/subjectReducer";
import resourceReducer from "./reducer/resourceReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    semester: semesterReducer,
    subject: subjectReducer,
    resource: resourceReducer,
  },
  // Optional: For Redux DevTools and better serializability checks
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed because FormData is not serializable
    }),
});

export default store;
