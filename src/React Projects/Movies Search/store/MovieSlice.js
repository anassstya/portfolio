import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    likedMovies: [],
    chosenMovie: null,
    chosenMovieDetails: null,
}

const movieSlice =  createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload;
        },
        setChosenMovie: (state, action) => {
            state.chosenMovie = action.payload;
        },
        setChosenMovieDetails: (state, action) => {
            state.chosenMovieDetails = action.payload;
        }
    }
})

export const { setMovies, setChosenMovie, setChosenMovieDetails } = movieSlice.actions;
export default movieSlice.reducer;