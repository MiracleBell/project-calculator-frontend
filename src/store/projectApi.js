import { apiUrl, originUrl } from "@root/utils/fetch";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import omit from "lodash/fp/omit";

const PATH = apiUrl("projects");
const ORIGIN = originUrl();

export const getProjects = async () => {
  const res = await fetch(PATH, {
    mode: "cors",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": ORIGIN,
      Origin: ORIGIN,
      Authorization: "Basic " + btoa("frog:qwertyu"),
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

const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({ baseUrl: PATH }),
  endpoints: (builder) => ({
    list: builder.query({
      query: (auth) => ({
        url: "",
        mode: "cors",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": ORIGIN,
          Origin: ORIGIN,
          Authorization: auth,
        },
      }),
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map(({ id }) => ({ type: "projects", id })),
            { type: "projects", id: "list" },
          ];
        }
        return [{ type: "projects", id: "list" }];
      },
    }),
    create: builder.mutation({
      query: (body) => ({
        url: "",
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
          return [{ type: "projects", id }];
        }
      },
      invalidatesTags: [{ type: "projects", id: "list" }],
    }),
    read: builder.query({
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
    update: builder.mutation({
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

    delete: builder.mutation({
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

export default projectsApi;
