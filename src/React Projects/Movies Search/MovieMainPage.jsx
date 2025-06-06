import React, {useRef, useState} from "react";
import MovieData from "./MovieData.jsx";
import './Movie.css';
export default function MovieMainPage() {
    const [input, setInput] = useState();
    const inputRef = useRef();

    const click = (event => {
        event.preventDefault();
        setInput(inputRef.current.value)
    })

    return(
        <div className="movieMainPage">
            <div className="movieSearchContainer">
                <input
                    type="text"
                    className="movieSearch"
                    placeholder="Type to search a movie"
                    ref={inputRef}
                />
                <button className="movieSearchBtn" onClick={click}>Search</button>
            </div>
            <MovieData name={input}/>
        </div>
    )
}