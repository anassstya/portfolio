import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChosenMovieDetails } from "./store/MovieSlice.js";
export const DETAILED_MOVIE_URL = import.meta.env.VITE_DETAILED_MOVIE_URL;


function MovieInfo({movie}){
    return(
        <div className="movieDetailedInfo">
            <img src={movie.Poster} alt={movie.Title}/>
            <div>
                <p>{movie.Title}</p>
                <p>{movie.Year}</p>
                <p>{movie.Genre}</p>
                <p>{movie.RunTime}</p>
                <p>{movie.Director}</p>
                <p>{movie.Actors}</p>
                <p>{movie.imdbRating}</p>
            </div>
        </div>
    )
}

export default function MovieDetailed() {
    const dispatch = useDispatch();
    const chosenMovie = useSelector(state => state.movies.chosenMovie);
    const chosenMovieDetails = useSelector(state => state.movies.chosenMovieDetails);

    useEffect(() => {

        if (!chosenMovie) {
            console.log("No chosen movie selected.");
            return;
        }

        fetch(`${DETAILED_MOVIE_URL}&i=${chosenMovie}`)
            .then(response => response.json())
            .then(data => {
                if(data.Response === 'True'){
                    dispatch(setChosenMovieDetails(data));
                    console.log(data.Title);
                } else {
                    dispatch(setChosenMovieDetails(null));
                }
            })
            .catch(error => {
                dispatch(setChosenMovieDetails(null));
            })
    }, [chosenMovie, dispatch]);

    return(
        <div className="movieDetailed">
            {chosenMovieDetails && true ? (
                <p>Loading...</p>
            ) : chosenMovieDetails ? (
                <MovieInfo movie={chosenMovieDetails} />
            ) : (
                <p>No movie details available.</p>
            )}
        </div>
    )
}

