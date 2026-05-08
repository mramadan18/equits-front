import { ReactNode } from "react";
import { HiOutlineXCircle } from "react-icons/hi";

interface StatusStateProps {
  isLoading?: boolean;
  error?: any;
  loadingComponent?: ReactNode;
  onRetry?: () => void;
  errorTitle?: string;
  errorDescription?: string;
  retryText?: string;
  children: ReactNode;
}

export function StatusState({
  isLoading,
  error,
  loadingComponent,
  onRetry,
  errorTitle = "Something went wrong",
  errorDescription = "An error occurred while fetching data. Please try again.",
  retryText = "Retry",
  children,
}: StatusStateProps) {
  if (isLoading && loadingComponent) {
    return <>{loadingComponent}</>;
  }

  if (error) {
    return (
      <div className="container py-16 flex flex-col items-center gap-4 text-center">
        <HiOutlineXCircle className="w-14 h-14 text-danger/60" />
        <h2 className="text-xl font-semibold text-dark">{errorTitle}</h2>
        <p className="text-sm text-gray2 max-w-md">{errorDescription}</p>
        {onRetry && (
          <button
            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            onClick={onRetry}
          >
            {retryText}
          </button>
        )}
      </div>
    );
  }

  return <>{children}</>;
}
