import type { ReactElement } from "react";

interface LogoProps {
  className?: string;
}

export default function Logo({
  className = "",
}: Readonly<LogoProps>): ReactElement {
  return (
    <div className={className}>
      <p className="text-3xl font-title font-black">
        <a href="/">SB.</a>
      </p>
    </div>
  );
}
