"use client";

import { useState } from "react";

import ContentGrid from "./ContentGrid";
import PaginationControls from "./PaginationControls";
import { useContentPagination } from "@/hooks/useContentPagination";
import ErrorMessage from "@/app/dashboard/error";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import MovieModal from "@/components/MovieModal";
import { ApiResponse, ContentItem } from "@/types/content";
import { useWatchHistory } from "@/hooks/useWatchHistory";

interface Props {
    category?: keyof ApiResponse["categories"];
}

const ContentBrowser = ({ category }: Props) => {
    const {
        page,
        content,
        loading,
        error,
        handlePageChange,
        retry,
    } = useContentPagination(category);
    const [selectedMovie, setSelectedMovie] = useState<ContentItem | null>(null);
    const { addToHistory } = useWatchHistory();

    if (loading) return <LoadingSkeleton />;
    if (error) return <ErrorMessage message={error} onRetry={retry} />;

    return (
        <>
            <ContentGrid
                items={content}
                onItemClick={(item) => {
                    addToHistory(item);
                    setSelectedMovie(item)
                }}
            />
            <PaginationControls page={page} onPageChange={handlePageChange} />

            <MovieModal
                movie={selectedMovie}
                onClose={() => setSelectedMovie(null)}
            />
        </>
    );
};

export default ContentBrowser;
