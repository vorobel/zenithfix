interface Props {
    page: number;
    onPageChange: (newPage: number) => void;
}

const PaginationControls = ({ page, onPageChange }: Props) => (
    <div className="mt-5 text-center">
        <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
            className="mr-2 px-4 py-2 border rounded bg-gray-100 text-black hover:bg-gray-200 disabled:opacity-50"
        >
            Previous
        </button>
        <span className="mx-2">Page {page}</span>
        <button
            onClick={() => onPageChange(page + 1)}
            aria-label="Next page"
            className="ml-2 px-4 py-2 border rounded bg-gray-100 text-black hover:bg-gray-200"
        >
            Next
        </button>
    </div>
);

export default PaginationControls;
