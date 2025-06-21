import React from "react";
import { Routes, Route } from "react-router-dom";
import MovieMainPage from "./React Projects/Movies Search/src/MovieMainPage.jsx";
import MovieDetailed from "./React Projects/Movies Search/src/MovieDateiled.jsx";
import LikedMovies from "./React Projects/Movies Search/src/LikedMovies.jsx";
import MainPage from "./MainPage.jsx";
import NewsLoaderMain from "./React Projects/News Loader/src/NewsLoaderMain.jsx";


export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/movies" element={<MovieMainPage />} />
            <Route path="/movie/:id" element={<MovieDetailed />} />
            <Route path="/movies/liked" element={<LikedMovies />} />
            <Route path="/news-loader" element={<NewsLoaderMain />} />
        </Routes>
    );
}