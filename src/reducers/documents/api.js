import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const documentsAPI = createApi({

  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/document/' }),

  endpoints: (builder) => ({
    documentsGetAPI: builder.mutation({
      query: ({ token, limit, offset }) => ({
        url: `documents/?limit=${limit}&offset=${offset}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }),
    }),

    documentsSearchAPI: builder.mutation({
      query: ({ token, limit, offset, searchQuery }) => ({
        url: `search/?limit=${limit}&offset=${offset}&search=${searchQuery}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }),
    }),

    documentsDeleteAPI: builder.mutation({
      query: ({ token, documentIds }) => ({
        url: `delete/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          documentIds: documentIds
        }
      }),
    }),

    documentsUpdateAPI: builder.mutation({
      query: ({ token, documentId, name, document }) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('document', document);
        return {
          url: `update/${documentId}/`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData
        }
      },
    }),

    documentsInsertAPI: builder.mutation({
      query: ({ token, name, document }) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('document', document);
        return {
          url: `create/`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData
        }
      },
    }),
    documentsDeleteAllAPI: builder.mutation({
      query: ({ token }) => {
        return {
          url: `delete-all/`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
    }),

  }),
});

export const { useDocumentsGetAPIMutation, 
  useDocumentsSearchAPIMutation, 
  useDocumentsDeleteAPIMutation, 
  useDocumentsUpdateAPIMutation, 
  useDocumentsInsertAPIMutation, 
  useDocumentsDeleteAllAPIMutation } = documentsAPI;