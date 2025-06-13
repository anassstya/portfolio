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
        },
        setLikedMovie: (state, action) => {
            const movie = action.payload;
            const exists = state.likedMovies.some(m => m.imdbID === movie.imdbID);

            if (!exists) {
                state.likedMovies.push(movie);
            }
        },
        DeleteLikedMovie: (state, action) => {
            const movieId = action.payload;
            state.likedMovies = state.likedMovies.filter(movie => movie.imdbID !== movieId);
        }
    }
})

export const { setMovies, setChosenMovie, setChosenMovieDetails, setLikedMovie, DeleteLikedMovie } = movieSlice.actions;
export default movieSlice.reducer;