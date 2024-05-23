import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:9009/api/'}),
    tagTypes: ['Pizza'],
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => 'pizza/history',
            providesTags: ['Pizza'],
        }),
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: 'pizza/order',
                method: 'POST',
                body: newOrder,
            }),
            invalidatesTags: ['Pizza']
        })
    })
})

export const { useGetOrdersQuery, useCreateOrderMutation } = pizzaApi