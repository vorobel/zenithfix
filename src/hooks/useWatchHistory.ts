import { useEffect, useState } from "react";
import { ContentItem } from "@/types/content";

import { WATCH_HISTORY_KEY } from "@/mocks/constants";

export const useWatchHistory = () => {
    const [history, setHistory] = useState<ContentItem[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem(WATCH_HISTORY_KEY);
        if (stored) {
            setHistory(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(history));
    }, [history]);

    const addToHistory = (item: ContentItem) => {
        setHistory((prev) => {
            const exists = prev.find((i) => i.id === item.id);
            if (exists) return prev; // Skip duplicates
            return [...prev, item];
        });
    };

    return { history, addToHistory };
};
