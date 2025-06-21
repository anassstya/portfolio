import { createRoot } from 'react-dom/client'
import './index.css'
import React from "react";
import {Provider} from "react-redux";
import store from "./store.js";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";


createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)
