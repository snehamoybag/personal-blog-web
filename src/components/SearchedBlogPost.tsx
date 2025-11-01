import type { MouseEventHandler, ReactElement } from "react";
import type { Blog } from "../types/Blog";
import removeMarkdwonChars from "../libs/removeMarkdownChars";
import { Link } from "react-router";
import Tittle400 from "./titles/Title400";

interface SearchedBlogPostProps {
  blog: Blog;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  className?: string;
}

export default function SearchedBlogPost({
  blog,
  onClick = () => {},
  className = "",
}: Readonly<SearchedBlogPostProps>): ReactElement {
  const { id, title, content, coverImgUrl } = blog;

  const TITLE_MAX_LENGTH = 35;
  const CONTENT_MAX_LENGTH = 65;

  const formatedTitle =
    title.length > TITLE_MAX_LENGTH
      ? title.slice(0, TITLE_MAX_LENGTH) + "..."
      : title;

  const formatedContent =
    removeMarkdwonChars(content, 200).slice(0, CONTENT_MAX_LENGTH) + "...";

  return (
    <article className={`flex gap-4 ${className}`}>
      <Link to={`/blogs/${id}`} onClick={onClick}>
        <img
          src={coverImgUrl}
          alt="cover image"
          className="max-w-[10rem] aspect-video object-cover object-center rounded-lg"
        />
      </Link>

      <div>
        <Link to={`/blogs/${id}`} onClick={onClick}>
          <Tittle400 as="h2">{formatedTitle}</Tittle400>
        </Link>

        <Link
          to={`/blogs/${id}`}
          onClick={onClick}
          className="text-neutral-300 no-underline mt-2"
        >
          <p>{formatedContent}</p>
        </Link>
      </div>
    </article>
  );
}
