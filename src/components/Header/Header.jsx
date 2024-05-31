import styles from "./styles.module.css";
import { useCurrentDate } from "../../helpers/hooks/useCurrentDate.jsx";

const Header = () => {
    const [ now] = useCurrentDate();

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>NEWS APP</h1>
            <p className={styles.date}>{now}</p>
        </header>
    );
};

export default Header;