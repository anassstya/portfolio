import { createRoot } from 'react-dom/client'
import './index.css'
import MovieMainPage from "./React Projects/Movies Search/MovieMainPage.jsx";
import {Provider} from "react-redux";
import store from "./React Projects/Movies Search/store/store.js";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <MovieMainPage/>
    </Provider>
)
