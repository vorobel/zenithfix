import React from "react";

interface LoadingSpinnerProps {
    message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Loading..." }) => {
    return (
        <div className="flex flex-col justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white-900 mb-4"></div>
            <p className="text-white-700 text-sm">{message}</p>
        </div>
    );
};

export default LoadingSpinner;
