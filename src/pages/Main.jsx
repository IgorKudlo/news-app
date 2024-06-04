import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import {getCategories, getNews} from "../api/apiNews.js";
import NewsBanner from "../components/NewsBanner/NewsBanner.jsx";
import NewsList from "../components/NewsList/NewsList.jsx";
import Pagination from "../components/Pagination/Pagination.jsx";
import Categories from "../components/Categories/Categories.jsx";
import Search from "../components/Serach/Search.jsx";
import { useDebounce } from "../helpers/hooks/useDebounce.jsx";
import { PAGE_SIZE, TOTAL_PAGES } from "../constant/constant.js";

const Main = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [keywords, setKeywords] = useState('');

    const fetchNews = async (currentPage) => {
        const response = await getNews({
            page_number: currentPage,
            page_size: PAGE_SIZE,
            category: selectedCategory === 'All' ? null : selectedCategory,
            keywords
        });
        setNews(response.news);
        setIsLoading(false);
    }

    const fetchCategories = async () => {
        const response = await getCategories();
        setCategories(['All', ...response.categories])
    }

    const [debouncedValue] = useDebounce(keywords, 1500)

    useEffect(() => {
        fetchCategories();
    }, [])

    useEffect(() => {
        fetchNews(currentPage);
    }, [currentPage, selectedCategory, debouncedValue]);

    const handleNextPage = () => {
        if (currentPage < TOTAL_PAGES) {
            setCurrentPage(prev => prev + 1)
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }

    const handlePageClick = (page) => {
        setCurrentPage(page);
    }

    return (
        <main className={styles.main}>
            <Categories categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

            <Search keywword={keywords} setKeywords={setKeywords} />

            <NewsBanner isLoading={isLoading} item={news.length > 0 && news[0]} />

            <Pagination
                currentPage={currentPage}
                totalPages={TOTAL_PAGES}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                handlePageClick={handlePageClick}
            />

            <NewsList isLoading={isLoading} news={news} />

            <Pagination
                currentPage={currentPage}
                totalPages={TOTAL_PAGES}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                handlePageClick={handlePageClick}
            />
        </main>
    );
};

export default Main;