import { useEffect, useState } from "react";
import { formatDate } from "../formatDate.js";

export const useCurrentDate = () => {
    const initialDate = formatDate(new Date());
    const [now, setNow] = useState(initialDate);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDate = formatDate(new Date());
            if (currentDate !== now) {
                setNow(currentDate);
            }
        }, 1000);
        return () => clearInterval(interval)
    });

    return { now };
}