import styles from "./styles.module.css";
import { useState } from "react";
import { getCategories, getNews } from "../api/apiNews.js";
import { useFetch } from "../helpers/hooks/useFetch.jsx";
import { useDebounce } from "../helpers/hooks/useDebounce.jsx";
import { PAGE_SIZE, TOTAL_PAGES } from "../constant/constant.js";
import NewsBanner from "../components/NewsBanner/NewsBanner.jsx";
import NewsList from "../components/NewsList/NewsList.jsx";
import Pagination from "../components/Pagination/Pagination.jsx";
import Categories from "../components/Categories/Categories.jsx";
import Search from "../components/Serach/Search.jsx";

const Main = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [keywords, setKeywords] = useState('');

    const { data: dataCategories } = useFetch(getCategories);

    const [debouncedValue] = useDebounce(keywords, 1500);

    const {data: dataNews, isLoading: isLoadingNews} = useFetch(getNews, {
        page_number: currentPage,
        page_size: PAGE_SIZE,
        category: selectedCategory === 'All' ? null : selectedCategory,
        keywords: debouncedValue
    });

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
            {
                dataCategories &&
                <Categories
                    categories={['All', ...dataCategories.categories]}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            }

            <Search keywword={keywords} setKeywords={setKeywords} />

            <NewsBanner isLoading={isLoadingNews} item={dataNews && dataNews.news && dataNews.news[0]} />

            <Pagination
                currentPage={currentPage}
                totalPages={TOTAL_PAGES}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                handlePageClick={handlePageClick}
            />

            <NewsList isLoading={isLoadingNews} news={dataNews?.news} />

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