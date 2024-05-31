import { useEffect, useState } from "react";
import { formatDate } from "../formatDate.js";

export const useCurrentDate = () => {
    const initialDate = formatDate(new Date());
    const [now, setNow] = useState(initialDate);
    const [prevDate, setPrevDate] = useState(initialDate);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDate = formatDate(new Date());
            if (currentDate !== prevDate) {
                setNow(currentDate);
                setPrevDate(currentDate);
            }
        }, 1000);
        return () => clearInterval(interval)
    }, [prevDate]);

    return [ now ];
}