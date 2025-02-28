import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://116.202.210.102:3091/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }),
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: "/contacts",
        method: "GET",

      }),
      providesTags: ["Contacts"],
    }),
    getSingleContact: builder.query({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "GET",
      }),
    }),
    createContact: builder.mutation({
      query: (newContact) => ({
        url: "/contacts",
        method: "POST",
        body: newContact,
      }),
      invalidatesTags: ["Contacts"],
    }),
    updateContact: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        body: updatedData,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Contacts"],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const { useGetContactsQuery, useGetSingleContactQuery, useCreateContactMutation, useUpdateContactMutation, useDeleteContactMutation, } = contactApi;
