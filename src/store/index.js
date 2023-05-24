import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import projectsApi from "./projectApi";

const store = configureStore({
  reducer: {
    auth,
    [projectsApi.reducerPath]: projectsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(projectsApi.middleware),
});

export default store;
