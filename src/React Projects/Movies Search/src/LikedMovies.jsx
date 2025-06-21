import React from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import "./Liked.css";
import {DeleteLikedMovie} from "../store/MovieSlice.js";

export default function LikedMovies() {
    const likedMovies = useSelector(state => state.movies.likedMovies);
    const dispatch = useDispatch()
    const deleteMovie = (imdbID) => {
        dispatch(DeleteLikedMovie(imdbID));
    }
    return (
        <div className="likedMoviesContainer">
            <Link to={'/movies'} className={'backBtn'}>⇦</Link>
            {likedMovies.length > 0 ? (
                <div className="likedMoviesList">
                    {likedMovies.map(movie => (
                        <div  className="likedMovieCard">
                            <Link
                                to={`/movie/${movie.imdbID}`}
                                key={movie.imdbID}
                                className="likedMovieInfo"
                            >
                                <img src={movie.Poster} alt={movie.Title} className="movieImg" />
                                <p className="movieTitle">{movie.Title}</p>
                            </Link>
                            <button onClick={() => deleteMovie(movie.imdbID)} className={'likedMovieBtn'}>Remove from favourites</button>
                        </div>

                    ))}

                </div>
            ) : (
                <div>No movies added now!</div>
            )}
        </div>
    );
}
