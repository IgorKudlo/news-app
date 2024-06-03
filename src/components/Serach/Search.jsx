import styles from './styles.module.css';

const Search = ({ keywword, setKeywords }) => {
    return (
        <div className={styles.search}>
            <input
                type="text"
                value={keywword}
                onChange={(e) => setKeywords(e.target.value)}
                className={styles.input}
                placeholder="JavaScript"
            />
        </div>
    );
};

export default Search;