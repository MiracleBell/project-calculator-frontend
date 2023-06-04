import { apiUrl, originUrl } from "@root/utils/fetch";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import omit from "lodash/fp/omit";

const PATH = apiUrl("projects");
const ORIGIN = originUrl();

const getFeatures = async (projectId) => {
  const res = await fetch(
    `http://localhost:8080/projects/${projectId}/features`,
    {
      mode: "cors",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": ORIGIN,
        Origin: ORIGIN,
        Authorization: JSON.parse(localStorage.getItem("user")),
      },
    }
  );
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

const featuresApi = createApi({
  reducerPath: "featureApi",
  baseQuery: fetchBaseQuery({ baseUrl: PATH }),
  endpoints: (builder) => ({
    list: builder.query({
      query: () => ({
        url: "",
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
            ...result.map(({ id }) => ({ type: "features", id })),
            { type: "features", id: "list" },
          ];
        }
        return [{ type: "features", id: "list" }];
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
          return [{ type: "features", id }];
        }
      },
      invalidatesTags: [{ type: "features", id: "list" }],
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
          return [{ type: "features", id }];
        }
        return [];
      },
      invalidatesTags: (result, error, { id }) => [{ type: "features", id }],
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
          return [{ type: "features", id }];
        }
        return [];
      },
      invalidatesTags: (result, error, { id }) => [{ type: "features", id }],
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
        { type: "features", id: "list" },
      ],
    }),
  }),
});

export default featuresApi;
export { getFeatures };
