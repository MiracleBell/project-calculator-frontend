import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import auth from "./auth";
import projectsApi from "./projectApi";
import milestonesApi from "./milestoneApi";
import teamsApi from "./teamApi";

const store = configureStore({
  reducer: {
    auth,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [milestonesApi.reducerPath]: milestonesApi.reducer,
    [teamsApi.reducerPath]: teamsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      projectsApi.middleware,
      milestonesApi.middleware,
      teamsApi.middleware
    ),
});
setupListeners(store.dispatch);

export default store;
