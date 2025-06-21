import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    items: [],
    error: null,
    hasMore: true,

};

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        fetchNewsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchNewsSuccess: (state, action) => {
            state.loading = false;
            state.items = [...state.items, ...action.payload.items];
            state.hasMore = action.payload.hasMore;
        },
        fetchNewsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearNews: (state) => {
            state.items = [];
            state.hasMore = true;
        }
    }
})

export const {fetchNewsStart, fetchNewsSuccess, fetchNewsFailure, clearNews} = newsSlice.actions;
export default newsSlice.reducer;