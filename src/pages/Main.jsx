import styles from "./styles.module.css";
import { getCategories, getNews } from "../api/apiNews.js";
import { useFetch } from "../helpers/hooks/useFetch.jsx";
import { useDebounce } from "../helpers/hooks/useDebounce.jsx";
import { useFilters } from "../helpers/hooks/useFilters.jsx";
import { PAGE_SIZE, TOTAL_PAGES } from "../constant/constant.js";
import NewsBanner from "../components/NewsBanner/NewsBanner.jsx";
import NewsList from "../components/NewsList/NewsList.jsx";
import Pagination from "../components/Pagination/Pagination.jsx";
import Categories from "../components/Categories/Categories.jsx";
import Search from "../components/Serach/Search.jsx";

const Main = () => {
    const { filters, changeFilter } = useFilters({
        page_number: 1,
        page_size: PAGE_SIZE,
        category: null,
        keywords: ''
    });

    const { data: dataCategories } = useFetch(getCategories);

    const [debouncedValue] = useDebounce(filters.keywords, 1500);

    const {data: dataNews, isLoading: isLoadingNews} = useFetch(getNews, {
        ...filters,
        keywords: debouncedValue
    });

    const handleFilterCategory  = (category) => changeFilter('category', category);

    const handleFilterKeywords  = (keywords) => changeFilter('keywords', keywords);

    const handleNextPage = () => {
        if (filters.page_number < TOTAL_PAGES) {
            changeFilter('page_number', filters.page_number + 1)
        }
    }

    const handlePreviousPage = () => {
        if (filters.page_number > 1) {
            changeFilter('page_number', filters.page_number - 1)
        }
    }

    const handlePageClick = (page) => {
        changeFilter('page_number', page);
    }

    return (
        <main className={styles.main}>
            {
                dataCategories &&
                <Categories
                    categories={dataCategories.categories}
                    selectedCategory={filters.category}
                    setSelectedCategory={handleFilterCategory}
                />
            }

            <Search
                keywword={filters.keywords}
                setKeywords={handleFilterKeywords}
            />

            <NewsBanner
                isLoading={isLoadingNews}
                item={dataNews && dataNews.news && dataNews.news[0]}
            />

            <Pagination
                currentPage={filters.page_number}
                totalPages={TOTAL_PAGES}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                handlePageClick={handlePageClick}
            />

            <NewsList
                isLoading={isLoadingNews}
                news={dataNews?.news}
            />

            <Pagination
                currentPage={filters.page_number}
                totalPages={TOTAL_PAGES}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                handlePageClick={handlePageClick}
            />
        </main>
    );
};

export default Main;