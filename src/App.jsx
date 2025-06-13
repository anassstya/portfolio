import React from "react";
import { Routes, Route } from "react-router-dom";
import MovieMainPage from "./React Projects/Movies Search/MovieMainPage.jsx";
import MovieDetailed from "./React Projects/Movies Search/MovieDateiled.jsx";
import LikedMovies from "./React Projects/Movies Search/LikedMovies.jsx";


export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MovieMainPage />} />
            <Route path="/movie/:id" element={<MovieDetailed />} />
            <Route path="/movies/liked" element={<LikedMovies />} />
        </Routes>
    );
}