import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    filterSize: 'All',
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setOrders(state, action){
            state.orders = action.payload
        },
        addOrder(state, action){
            state.orders.push(action.payload)
        },
        setFilterSize(state, action){
            state.filterSize = action.payload
        },
    }
})

export const { setOrders, addOrder, setFilterSize } = pizzaSlice.actions

export default pizzaSlice.reducer