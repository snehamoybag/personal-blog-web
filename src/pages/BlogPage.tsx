import type { ReactElement } from "react";
import Main from "../components/landmarks/Main";
import blogs from "../libs/blogsData";
import ErrorPage from "./ErrorPage";
import Tittle700 from "../components/titles/Tittle700";
import AuthorAndDate from "../components/AuthorAndDate";
import Tag from "../components/Tag";
import Tittle400 from "../components/titles/Title400";
import CommentEditor from "../components/CommentEditor";

export default function BlogPage(): ReactElement {
  // const params = useParams();

  // const blogId = Number(params.blogId);
  const blog = blogs[0];

  if (!blog) {
    return <ErrorPage statusCode={404} message="Blog not found." />;
  }

  const { title, content, tags, createdAt, updatedAt, author } = blog;

  return (
    <Main>
      <article>
        <header>
          <Tittle700 as="h1">{title}</Tittle700>

          <AuthorAndDate
            author={author}
            date={{ createdAt, updatedAt }}
            className="mt-4"
          />
        </header>

        <section className="mt-8">{content}</section>

        <footer className="mt-8">
          <div className="flex gap-2">
            <Tittle400>Tags: </Tittle400>

            <ol className="flex flex-wrap items-center gap-2">
              {tags.map((tagName) => (
                <Tag name={tagName} />
              ))}
            </ol>
          </div>
        </footer>
      </article>

      <section className="mt-12">
        <CommentEditor author={author} />
      </section>
    </Main>
  );
}
