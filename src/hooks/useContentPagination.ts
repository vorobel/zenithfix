import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchContent } from "@/api/content";
import { ContentItem, ApiResponse } from "@/types/content";

export const useContentPagination = (
    category: keyof ApiResponse["categories"] = "trending"
) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const pageParam = searchParams.get("page");
    const pageFromUrl = pageParam ? parseInt(pageParam, 10) : 1;

    const [page, setPage] = useState(pageFromUrl);
    const [content, setContent] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const updateUrl = useCallback(
        (newPage: number) => {
            const params = new URLSearchParams(searchParams);
            params.set("page", newPage.toString());
            router.push(`?${params.toString()}`, { scroll: false });
        },
        [router, searchParams]
    );

    const fetchPage = useCallback(
        (pageToFetch: number) => {
            setPage(pageToFetch);
            setLoading(true);
            fetchContent(pageToFetch, category)
                .then((data) => {
                    setContent(data.categories[category]);
                    setError("");
                })
                .catch((err) => {
                    console.error(err);
                    setError("Failed to load content");
                })
                .finally(() => setLoading(false));
        },
        [category]
    );

    const handlePageChange = useCallback(
        (newPage: number) => {
            updateUrl(newPage);
            fetchPage(newPage);
        },
        [updateUrl, fetchPage]
    );

    useEffect(() => {
        if (!pageParam) {
            router.replace("?page=1");
        } else {
            fetchPage(pageFromUrl);
        }
    }, [pageParam, pageFromUrl, router, fetchPage]);

    return {
        page,
        content,
        loading,
        error,
        handlePageChange,
        retry: () => fetchPage(page),
    };
};
