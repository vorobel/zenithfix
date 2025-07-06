import React from "react";

const ContentSkeleton: React.FC = () => {
    const skeletonItems = Array.from({ length: 10 }); // show 5 placeholders

    return (
        <div className="flex overflow-x-scroll gap-4 pt-5">
            {skeletonItems.map((_, index) => (
                <div
                    key={index}
                    className="min-w-[200px] h-[238px] border rounded-lg p-3 bg-gray-100 animate-pulse"
                >
                    <div className="w-full h-[120px] bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
            ))}
        </div>
    );
};

export default ContentSkeleton;
