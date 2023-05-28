import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import auth from "./auth";
import projectsApi from "./projectApi";
import milestonesApi from "./milestoneApi";

const store = configureStore({
  reducer: {
    auth,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [milestonesApi.reducerPath]: milestonesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(projectsApi.middleware)
      .concat(milestonesApi.middleware),
});

export default store;
