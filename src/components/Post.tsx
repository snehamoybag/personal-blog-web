import type { ReactElement } from "react";
import type { Blog } from "../types/Blog";
import Tittle700 from "./titles/Tittle700";
import AuthorAndDate from "./AuthorAndDate";
import Tag from "./Tag";
import { Link } from "react-router";

interface PostProps {
  blog: Blog;
  className?: string;
}

export default function Post({
  className = "",
  blog,
}: Readonly<PostProps>): ReactElement {
  const MAX_TITLE_LENGTH = 95;
  const MAX_CONTENT_LENGTH = 500;

  const blogTitle = blog.title;
  const blogContent = blog.content;

  const formattedTitle =
    blogTitle.length > MAX_TITLE_LENGTH
      ? blogTitle.slice(0, MAX_TITLE_LENGTH) + "..."
      : blogTitle;

  const formattedContent =
    blogContent.length > MAX_CONTENT_LENGTH
      ? blogContent.slice(0, MAX_CONTENT_LENGTH) + "..."
      : blogContent;

  const blogPageUrl = `/blogs/${blog.id}`;
  const coverImgUrl = blog.coverImgUrl;
  const blogDate = {
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
  };

  return (
    <article
      className={`grid gap-y-4 px-4 py-8 border-b-1 border-neutral-700 ${className}`}
    >
      <header>
        <Tittle700>
          <Link to={blogPageUrl} className="no-underline">
            {formattedTitle}
          </Link>
        </Tittle700>

        <AuthorAndDate author={blog.author} date={blogDate} className="mt-4" />
      </header>

      <section>
        <Link to={blogPageUrl}>
          <img
            src={coverImgUrl}
            alt="cover image"
            className="aspect-video object-cover object-top rounded-xl mx-auto"
          />
        </Link>

        <p className="mt-4">
          <Link to={blogPageUrl} className="text-current no-underline">
            {formattedContent}
          </Link>
        </p>
      </section>

      <footer>
        <ol className="flex flex-wrap items-center gap-2">
          {blog.tags.map((tagName) => (
            <li key={tagName}>
              <Tag name={tagName} className="text-sm" />
            </li>
          ))}
        </ol>
      </footer>
    </article>
  );
}
