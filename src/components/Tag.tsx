import type { ReactElement } from "react";
import { Link } from "react-router";

interface TagProps {
  name: string;
  className?: string;
}

export default function Tag({
  name,
  className = "",
}: Readonly<TagProps>): ReactElement {
  return (
    <Link
      to={`/tags/${name}`}
      className={`block text-base text-neutral-200 lowercase no-underline px-2 pb-0.5 border-1 border-current rounded-full opacity-50 hover:opacity-100 ${className}`}
    >
      <span className="opacity-50">#</span> {name}
    </Link>
  );
}
