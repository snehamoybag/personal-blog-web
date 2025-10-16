import type { ReactElement } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface InlineSpinnerProps {
  message?: string;
  className?: string;
}

export default function InlineLoadingSpinner({
  message = "Loading...",
  className = "",
}: Readonly<InlineSpinnerProps>): ReactElement {
  return (
    <div className={`flex items-center gap-2 font-bold ${className}`}>
      <LoadingSpinner />
      <p>{message}</p>
    </div>
  );
}
