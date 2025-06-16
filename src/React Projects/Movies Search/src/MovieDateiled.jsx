import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useParams} from "react-router-dom";
import {DeleteLikedMovie, setChosenMovieDetails, setLikedMovie} from "../store/MovieSlice.js";
import './MovieDetailed.css';

export const DETAILED_MOVIE_URL = import.meta.env.VITE_DETAILED_MOVIE_DATA_URL;
export const DETAILED_MOVIE_KEY = import.meta.env.VITE_DETAILED_DATA_KEY;

function MovieInfo({ movie }) {
    const dispatch = useDispatch();
    const likedMovies = useSelector(state => state.movies.likedMovies);

    const isLiked = likedMovies.some(m => m.imdbID === movie.imdbID);


    const addToFavourites = () => {
        dispatch(setLikedMovie(movie));
    }
    const deleteMovie = (imdbID) => {
        dispatch(DeleteLikedMovie(imdbID));
    }

    return (
        <div className={'movieDetailedContainer'}>
            <Link to={-1} className={'backBtn'}>⇦</Link>
            <div className="movieDetailedInfo">
                <img src={movie.Poster} alt={movie.Title} />
                <div className={'movieDetails'}>
                    <p className={'movieName'}>{movie.Title}</p>
                    <p className={'movieOption'}>{movie.Plot}</p>
                    <div className={'movieOptions'}>
                        <p className={'movieOption'}><span>Year:</span> {movie.Year}</p>
                        <p className={'movieOption'}><span>Genre:</span> {movie.Genre}</p>
                        <p className={'movieOption'}><span>Runtime:</span> {movie.Runtime}</p>
                        <p className={'movieOption'}><span>Director:</span> {movie.Director}</p>
                        <p className={'movieOption'}><span>Actors:</span> {movie.Actors}</p>
                        <p className={'movieOption'}><span>Rating:</span> {movie.imdbRating}</p>
                    </div>
                </div>
                {isLiked ? (
                    <button onClick={() => deleteMovie(movie.imdbID)} className={'likedMovieBtn'}>Remove from favourites</button>
                ) : (
                    <button onClick={addToFavourites} className="addBtn">Add to favourites</button>
                )}
            </div>
        </div>
    );
}


export default function MovieDetailed() {
    const { id } = useParams(); // получаем id из URL
    const dispatch = useDispatch();
    const chosenMovieDetails = useSelector(state => state.movies.chosenMovieDetails);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);

        fetch(`${DETAILED_MOVIE_URL}?apikey=${DETAILED_MOVIE_KEY}&i=${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.Response === "True") {
                    dispatch(setChosenMovieDetails(data));
                } else {
                    dispatch(setChosenMovieDetails(null));
                }
            })
            .catch(() => {
                dispatch(setChosenMovieDetails(null));
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, dispatch]);

    return (
        <div className="movieDetailed">
            {loading ? (
                <p>Loading...</p>
            ) : chosenMovieDetails ? (
                <MovieInfo movie={chosenMovieDetails} />
            ) : id ? (
                <p>No movie details available.</p>
            ) : null}
        </div>
    );
}
