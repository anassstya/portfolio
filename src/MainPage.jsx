import React from "react";
import {Link} from "react-router-dom";

export default function MainPage() {
    return(
        <div className='mainPageContainer'>
            <h1 className='mainHeader'>Проекты</h1>
            <Link to={'/movies'} className={'mainBtn'}>Movie Search</Link>
            <Link to={'/news-loader'} className={'mainBtn'}>News loader</Link>
        </div>
    )
}