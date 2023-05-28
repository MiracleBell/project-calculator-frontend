import { apiUrl, originUrl } from "@root/utils/fetch";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import omit from "lodash/fp/omit";

const PATH = apiUrl("projects");
const ORIGIN = originUrl();

export const LIST = async (projectId) => {
  console.log("ENTER INTO TEAM API!!!!");
  const res = await fetch(PATH, {
    mode: "cors",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": ORIGIN,
      Origin: ORIGIN,
      Authorization: JSON.parse(localStorage.getItem("user")),
    },
  });

  let parse = await res.json();
  if (parse.errors !== undefined) {
    return await parse.errors;
  }
  const arr = [];
  parse.map((elem) => {
    arr.push(elem);
  });

  return arr;
};

const teamsApi = createApi({
  reducerPath: "teamsApi",
  baseQuery: fetchBaseQuery({ baseUrl: PATH }),
  endpoints: (builder) => ({
    teamList: builder.query({
      query: (projectId) => ({
        url: `/${projectId}/team-members`,
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
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map(({ id }) => ({ type: "teamMember", id })),
            { type: "team", id: "list" },
          ];
        }
        return [{ type: "teamMember", id: "list" }];
      },
    }),
    create: builder.mutation({
      query: (projectId, body) => ({
        url: `/${projectId}/team-members`,
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
          return [{ type: "teamMember", id }];
        }
      },
      invalidatesTags: [{ type: "teamMember", id: "list" }],
    }),
    update: builder.mutation({
      query: ({ projectId, memberId, ...data }) => ({
        url: `/${projectId}/team-members/${memberId}`,
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
          return [{ type: "teamMember", id }];
        }
        return [];
      },
      invalidatesTags: (result, error, { id }) => [{ type: "teamMember", id }],
    }),

    delete: builder.mutation({
      query: (projectId, memberId) => ({
        url: `/${projectId}/team-members/${memberId}`,
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
        { type: "teamMember", id: "list" },
      ],
    }),
  }),
});

export default teamsApi;
export const {
  useListTeamQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamsApi;
