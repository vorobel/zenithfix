import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../Modal";

describe("Modal component", () => {
    const mockOnClose = vi.fn();

    beforeEach(() => {
        mockOnClose.mockClear();
    });

    it("renders modal children", () => {
        render(
            <Modal onClose={mockOnClose}>
                <p>Test Modal Content</p>
            </Modal>
        );

        expect(screen.getByText("Test Modal Content")).toBeInTheDocument();
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("calls onClose when overlay is clicked", () => {
        render(
            <Modal onClose={mockOnClose}>
                <p>Modal Body</p>
            </Modal>
        );

        // 🔥 Select the overlay div more precisely
        const overlay = screen.getByRole("dialog").querySelector(".opacity-50")!;
        fireEvent.click(overlay);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when close button is clicked", () => {
        render(
            <Modal onClose={mockOnClose}>
                <p>Modal Body</p>
            </Modal>
        );

        const closeButton = screen.getByRole("button", { name: /close modal/i });
        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});
