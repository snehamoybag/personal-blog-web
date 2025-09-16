import type { ReactElement } from "react";
import type { User } from "../types/User";
import AuthorAndDate from "./AuthorAndDate";

interface CommentProps {
  author: User;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  className?: string;
}

export default function Comment({
  author,
  message,
  createdAt,
  updatedAt,
  className = "",
}: Readonly<CommentProps>): ReactElement {
  return (
    <article className={`border-1 border-neutral-700 rounded-xl ${className}`}>
      <header className="p-4 border-b-1 border-neutral-700">
        <AuthorAndDate author={author} date={{ createdAt, updatedAt }} />
      </header>

      <section className="p-6">
        <p>{message}</p>
      </section>
    </article>
  );
}
