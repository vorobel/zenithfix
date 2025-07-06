import React from "react";
import { ContentItem as ContentItemType } from "@/types/content";

interface Props {
    item: ContentItemType;
    onClick?: () => void;
}

const ContentItem = React.memo(({ item, onClick }: Props) => (
    <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onClick?.()}
        className="block min-w-[200px] border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        aria-label={`Open details for ${item.title}`}
    >
        <img
            src={item.thumbnail}
            alt={`Poster for ${item.title}`}
            className="w-full h-[120px] object-cover rounded"
        />
        <h3 className="font-semibold mt-2 text-gray-600">{item.title}</h3>
        <p className="text-gray-600 text-sm">
            {item.year} • {item.rating}/10
        </p>

        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${item.watchProgress}%` }}
                aria-label={`Watch progress: ${item.watchProgress}%`}
            ></div>
        </div>
    </div>
));

export default ContentItem;
