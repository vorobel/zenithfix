interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => (
    <div className="text-red-500 text-center p-4">
        <p>{message}</p>
        {onRetry && (
            <button
                onClick={onRetry}
                className="mt-2 underline text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            >
                Retry
            </button>
        )}
    </div>
);

export default ErrorMessage;
