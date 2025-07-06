import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
    if (typeof window === "undefined") return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
        >
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={onClose}
                aria-label="Close modal"
            ></div>

            <div
                className="relative z-10 bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
                role="document"
            >
                {children}
                <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ✖
                </button>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
