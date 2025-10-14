import type { ReactElement, ReactNode } from "react";

interface MainProps {
  className?: string;
  children?: ReactNode;
}

export default function Main({
  className = "",
  children,
}: Readonly<MainProps>): ReactElement {
  return (
    <main className={`min-h-[100vh] px-4 py-12 ${className}`}>{children}</main>
  );
}
