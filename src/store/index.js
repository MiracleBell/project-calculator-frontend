import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import auth from "./auth";
import projectsApi from "./projectApi";
import milestonesApi from "./milestoneApi";
import teamsApi from "./teamApi";
import featuresApi from "./featureApi";

const store = configureStore({
  reducer: {
    auth,
    [featuresApi.reducerPath]: featuresApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [milestonesApi.reducerPath]: milestonesApi.reducer,
    [teamsApi.reducerPath]: teamsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      featuresApi.middleware,
      projectsApi.middleware,
      milestonesApi.middleware,
      teamsApi.middleware
    ),
});
setupListeners(store.dispatch);

export default store;
