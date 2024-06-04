import styles from "./styles.module.css";
import Image from "../Image/Image.jsx";
import withSkeleton from "../../helpers/hocs/withSkeleton.jsx";

const NewsBanner = ({ item }) => {
    return (
        <div className={styles.banner}>
            <Image image={item.image} />
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.extra}>{item.published} by {item.author}</p>
        </div>
    );
};

const NewsBannerWithSkeleton = withSkeleton(NewsBanner, 'banner', 1);

export default NewsBannerWithSkeleton;