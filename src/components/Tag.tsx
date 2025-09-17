import type { ReactElement } from "react";

interface TagProps {
  name: string;
  className?: string;
}

export default function Tag({
  name,
  className = "",
}: Readonly<TagProps>): ReactElement {
  return (
    <a
      href={`/tags/${name}`}
      className={`block text-base text-neutral-200 capitalize no-underline px-2 pb-0.5 border-1 border-current rounded-full opacity-50 hover:opacity-100 ${className}`}
    >
      <span className="opacity-50">#</span> {name}
    </a>
  );
}
