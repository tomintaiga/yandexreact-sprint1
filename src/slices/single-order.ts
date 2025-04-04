import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orderApi } from '../api/order';
import { TOrder } from '../../declarations/order';

interface ISingleOrderState {
    order: TOrder | null;
    showOrder: boolean;
};

const initialState: ISingleOrderState = {
    order: null,
    showOrder: false,
};

const singleOrderSlice = createSlice({
    name: 'singleOrder',
    initialState,
    reducers: {
        showOrder: (state, action: PayloadAction<boolean>) => {
            state.showOrder = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(orderApi.endpoints.createOrder.matchFulfilled, (state, action) => {
                state.order = action.payload.order;
            });
    },
});

export const { showOrder } = singleOrderSlice.actions;
export default singleOrderSlice.reducer;