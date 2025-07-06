export interface ContentItem {
    id: number;
    title: string;
    year: number;
    genre: string[];
    rating: number;
    thumbnail: string;
    duration: number;
    description: string;
    cast: string[];
    watchProgress: number;
}

export interface Pagination {
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    totalItems: number;
}

export interface Categories {
    trending: ContentItem[];
    forYou: ContentItem[];
    newReleases: ContentItem[];
}

export interface ApiResponse {
    content: ContentItem[];
    pagination: Pagination;
    categories: Categories;
}
