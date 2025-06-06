import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setMovies, setChosenMovie} from "./store/MovieSlice.js";
import './Movie.css';
import MovieDetailed from "./MovieDateiled.jsx";

export const MOVIE_DATA_URL = import.meta.env.VITE_MOVIE_DATA_URL;

export default function MovieData({ name }) {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies.movies);
    const chosenMovie = useSelector(state => state.movies.chosenMovie);
    const chosenMovieDetails = useSelector(state => state.movies.chosenMovieDetails);

    useEffect(() => {
        if(!name) return;

        fetch(`${MOVIE_DATA_URL}&s=${encodeURIComponent(name)}`)
            .then(response => response.json())
            .then(data => {
                if(data.Response === 'True'){
                    dispatch(setMovies(data.Search));
                }
                if(data.Response === 'False'){
                    dispatch(setMovies([]));
                }
            })
            .catch(error => {
                dispatch(setMovies([]));
            })
    }, [name, dispatch]);


    useEffect(() => {
        if (chosenMovieDetails) {
            console.log("🎬 Детальные данные о фильме:", chosenMovieDetails);
        }
    }, [chosenMovieDetails]);

    const click = (event, movie) => {
        event.preventDefault();
        dispatch(setChosenMovie(movie.imdbID));
    }


    return(
        <div className="moviesContainer">
            {movies.length > 0 ? (
                <div className="moviesFound">
                    {movies.map(movie => (
                        <div
                            className="movie"
                            key={movie.imdbID}
                            onClick={(event) => click(event, movie)} >
                            <img src={movie.Poster} alt={movie.Title} className="movieImg"/>
                            <h2 className="movieTitle">{movie.Title}</h2>
                            <p className="movieYear">{movie.Year}</p>
                            <p className="movieDescr">Click to see detailed description</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <p className="movieError">Movies are not found!</p>
                </div>
            )}

            {chosenMovie && <MovieDetailed />}
        </div>
    )
}
