import { apiUrl, originUrl } from "@root/utils/fetch";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import omit from "lodash/fp/omit";

const PATH = apiUrl("/projects");
const ORIGIN = originUrl();

const milestonesApi = createApi({
  reducerPath: "milestonesApi",
  baseQuery: fetchBaseQuery({ baseUrl: PATH }),
  endpoints: (builder) => ({
    milestoneList: builder.query({
      query: (projectId) => ({
        url: `/${projectId}/milestones`,
        mode: "cors",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": ORIGIN,
          Origin: ORIGIN,
          Authorization: JSON.parse(localStorage.getItem("user")),
        },
      }),
      // providesTags: (result) => {
      //   if (result) {
      //     return [
      //       ...result.map(({ id }) => ({ type: "milestones", id })),
      //       { type: "milestones", id: "list" },
      //     ];
      //   }
      //   return [{ type: "milestones", id: "list" }];
      // },
    }),
    createMilestone: builder.mutation({
      query: (body) => ({
        url: `/${localStorage.getItem("id")}/milestones`,
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": ORIGIN,
          Origin: ORIGIN,
          Authorization: JSON.parse(localStorage.getItem("user")),
        },
        body,
      }),
      providesTags: (result) => {
        if (result) {
          const { id } = result;
          return [{ type: "milestones", id }];
        }
      },
      invalidatesTags: [{ type: "milestones", id: "list" }],
    }),
    readMilestone: builder.query({
      query: (id) => ({
        url: `/${id}`,
        mode: "cors",
        method: "GET",
      }),
      providesTags: (result) => {
        if (result) {
          const { id } = result;
          return [{ type: "projects", id }];
        }
        return [];
      },
      invalidatesTags: (result, error, { id }) => [{ type: "projects", id }],
    }),
    updateMilestone: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        mode: "cors",
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": ORIGIN,
          Origin: ORIGIN,
          Authorization: JSON.parse(localStorage.getItem("user")),
        },
        body: omit(["id", "created_at", "updated_at"], data),
      }),
      providesTags: (result) => {
        if (result) {
          const { id } = result;
          return [{ type: "projects", id }];
        }
        return [];
      },
      invalidatesTags: (result, error, { id }) => [{ type: "projects", id }],
    }),

    deleteMilestone: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        mode: "cors",
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": ORIGIN,
          Origin: ORIGIN,
          Authorization: JSON.parse(localStorage.getItem("user")),
        },
      }),
      invalidatesTags: (result, error, id) => [
        { type: "projects", id: "list" },
      ],
    }),
  }),
});

export default milestonesApi;
