import React from "react";
import { ContentItem } from "@/types/content";
import Modal from "./Modal";

interface MovieModalProps {
    movie: ContentItem | null;
    onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
    if (!movie) return null;

    return (
        <Modal isOpen={!!movie} onClose={onClose}>
            <img
                src={movie.thumbnail}
                alt={`Poster for ${movie.title}`}
                className="w-full h-[200px] object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold mb-2">
                {movie.title} ({movie.year})
            </h2>
            <p className="text-gray-700 mb-2">{movie.description}</p>
            <p className="text-sm text-gray-500 mb-1">
                Genre: {movie.genre.join(", ")}
            </p>
            <p className="text-sm text-gray-500">
                Cast: {movie.cast.join(", ")}
            </p>
        </Modal>
    );
};

export default MovieModal;
