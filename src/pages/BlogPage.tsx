import type { ReactElement } from "react";
import Main from "../components/landmarks/Main";
import blogs from "../libs/blogsData";
import ErrorPage from "./ErrorPage";
import Tittle700 from "../components/titles/Tittle700";
import AuthorAndDate from "../components/AuthorAndDate";
import Tag from "../components/Tag";
import Tittle400 from "../components/titles/Title400";
import CommentEditor from "../components/CommentEditor";
import Comment from "../components/Comment";

export default function BlogPage(): ReactElement {
  // const params = useParams();

  // const blogId = Number(params.blogId);
  const blog = blogs[0];

  if (!blog) {
    return <ErrorPage statusCode={404} message="Blog not found." />;
  }

  const { title, content, tags, createdAt, updatedAt, author } = blog;

  return (
    <Main className="px-8">
      <article className="pt-8">
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

        <ol className="mt-12 grid gap-8">
          <li>
            <Comment
              author={author}
              message="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis vel consequatur eius optio eaque doloremque voluptatum nulla omnis, quasi sunt ipsum aliquid! Distinctio laboriosam deleniti natus, earum doloribus rem, sint nulla tempora adipisci totam sapiente cumque iusto suscipit? Iusto cumque cum unde eveniet ipsum molestiae neque ut excepturi saepe ratione!"
              createdAt={new Date("05-10-2025")}
              updatedAt={new Date("06-10-2025")}
            />
          </li>
          <li>
            <Comment
              author={author}
              message="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis vel consequatur eius optio eaque doloremque voluptatum nulla omnis, quasi sunt ipsum aliquid! Distinctio laboriosam deleniti natus, earum doloribus rem, sint nulla tempora adipisci totam sapiente cumque iusto suscipit? Iusto cumque cum unde eveniet ipsum molestiae neque ut excepturi saepe ratione!"
              createdAt={new Date("05-10-2025")}
              updatedAt={new Date("06-10-2025")}
            />
          </li>
        </ol>
      </section>
    </Main>
  );
}
