import {configureStore} from "@reduxjs/toolkit";
import moviesSlice from "./MovieSlice.js";


const store = configureStore({
    reducer: {
        movies: moviesSlice
    }
});
export default store;