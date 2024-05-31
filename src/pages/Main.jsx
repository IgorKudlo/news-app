import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { getNews } from "../api/apiNews.js";
import NewsBanner from "../components/NewsBanner/NewsBanner.jsx";
import NewsList from "../components/NewsList/NewsList.jsx";
import Skeleton from "../components/Skeleton/Skeleton.jsx";

const Main = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            const response = await getNews();
            setNews(response.news);
            setIsLoading(false);
        }
        fetchNews();
    }, [])

    return (
        <main className={styles.main}>
            {news.length > 0 && !isLoading ? <NewsBanner item={news[0]} /> : <Skeleton />}
            {!isLoading ? <NewsList news={news} /> : <Skeleton count={10} type="item" />}
        </main>
    );
};

export default Main;