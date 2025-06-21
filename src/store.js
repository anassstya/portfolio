import {configureStore} from "@reduxjs/toolkit";
import newsSlice from "./React Projects/News Loader/store/newsSlice.js";
import movieSlice from "./React Projects/Movies Search/store/MovieSlice.js";


const store = configureStore({
    reducer: {
        news: newsSlice,
        movies: movieSlice
    },
    devTools: process.env.NODE_ENV !== 'production',
});
export default store;