import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setMovies, setChosenMovie} from "../store/MovieSlice.js";
import './Movie.css';
import MovieDetailed from "./MovieDateiled.jsx";
import {Link} from "react-router-dom";

export const MOVIE_DATA_URL = import.meta.env.VITE_MOVIE_DATA_URL;
export const MOVIE_DATA_KEY = import.meta.env.VITE_DATA_KEY;

export default function MovieData({ name }) {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies.movies);
    const chosenMovie = useSelector(state => state.movies.chosenMovie);

    const chosenMovieDetails = useSelector(state => state.movies.chosenMovieDetails);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!name) return;
        setLoading(true);

        fetch(`${MOVIE_DATA_URL}?apikey=${MOVIE_DATA_KEY}&s=${encodeURIComponent(name)}`)
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
            .finally(() => {
                    setLoading(false)
            })
    }, [name, dispatch]);


    const click = (event, movie) => {
        event.preventDefault();
        dispatch(setChosenMovie(movie.imdbID));
    }

    return(
        <div className="moviesContainer">
            {loading ? (
                <p>Loading...</p>
            ) : movies.length > 0 ? (
                    <div className="moviesFound">
                        {movies.map(movie => (
                            <Link
                                to={`/movie/${movie.imdbID}`}
                                key={movie.imdbID}
                                className="movie"
                            >
                                <img src={movie.Poster} alt={movie.Title} className="movieImg" />
                                <h2 className="movieTitle">{movie.Title}</h2>
                                <p className="movieYear">{movie.Year}</p>
                                <p className="movieDescr">Click to see detailed description</p>
                            </Link>
                        ))}
                    </div>
                ) : name ? (
                <p className="movieError">Movies are not found!</p>
            ) : null}
        </div>
    )
}
