import React, { useEffect } from "react";
import './NewsLoading.css';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsFailure, fetchNewsStart, fetchNewsSuccess } from "../store/newsSlice.js";

export const DATA_URL = import.meta.env.VITE_NEWS_LOADING_URL;

function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
export default function NewsLoaderMain() {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.news?.items);
    const loading = useSelector((state) => state.news?.loading);
    const error = useSelector((state) => state.news?.error);
    const hasMore = useSelector((state) => state.news?.hasMore);


    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        dispatch(fetchNewsStart());

        try {
            const lastSeenId = items.length > 0 ? items[items.length - 1].id : null;
            const url = lastSeenId ? `${DATA_URL}?lastSeenId=${lastSeenId}` : DATA_URL;

            const { data } = await axios.get(url);

            const newItems = data.filter(
                newItem => !items.some(existing => existing.id === newItem.id)
            );
            dispatch(fetchNewsSuccess({
                items: newItems,
                hasMore: data.length === 5,
            }));
        } catch (error) {
            dispatch(fetchNewsFailure(error.message));
        }
    }


    return (
        <div className="mainContainerNews">
            <div className="newsContainer">
                <p className="newsTitle">Все новости</p>
                {loading && <p className="newsLoader">Загрузка...</p>}
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} className="newsItem">
                            <p className="itemText">{decodeHtml(item.text)}</p>
                            {item.attachments?.map((att, i) => {
                                if (att.type === 'video') {
                                    return <img key={i} src={att.video.image?.[0]?.url} alt={att.video.title} className="itemImage" />
                                }
                                if (att.type === 'link') {
                                    return (
                                        <a key={i} href={att.link.url} target="_blank" className="itemLink">
                                            {att.link.title}
                                        </a>
                                    );
                                }
                                return null;
                            })}

                            <p className="itemFeedBack">👍 {item.likes?.count}   👁 {item.views?.count}</p>
                        </div>
                    ))
                ) : (
                    <p>Нет новостей</p>
                )}
            </div>
            <button onClick={loadNews} className="newsBtn">load more</button>
        </div>

    );
}
