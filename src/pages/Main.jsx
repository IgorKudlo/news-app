import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { getNews } from "../api/apiNews.js";
import NewsBanner from "../components/NewsBanner/NewsBanner.jsx";
import NewsList from "../components/NewsList/NewsList.jsx";

const Main = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const response = await getNews();
            setNews(response.news);
        }
        fetchNews();
    }, [])

    return (
        <main className={styles.main}>
            {news.length > 0 && <NewsBanner item={news[0]} />}
            <NewsList news={news} />
        </main>
    );
};

export default Main;