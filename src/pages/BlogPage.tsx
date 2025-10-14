import { useEffect, useState, type ReactElement } from "react";
import Main from "../components/landmarks/Main";
import Tittle700 from "../components/titles/Tittle700";
import AuthorAndDate from "../components/AuthorAndDate";
import Tag from "../components/Tag";
import Tittle400 from "../components/titles/Title400";
import CommentEditor from "../components/CommentEditor";
import Comment from "../components/Comment";
import { useParams } from "react-router";
import useDataFetcher from "../hooks/useDataFetcher";
import type { Blog } from "../types/Blog";
import LoadingModal from "../components/LoadingModal";
import getApiUrl from "../libs/getApiUrl";
import ButtonPrimary from "../components/buttons/ButtonPrimary";

export default function BlogPage(): ReactElement {
  const { state, data, error, fetcher } = useDataFetcher();
  const [loadComments, setLoadComments] = useState(false);

  const params = useParams();
  const blogId = Number(params.blogId);
  const blog = data ? (data.blog as Blog) : null;

  if (!blogId) {
    throw new Error("404 Blog not found.");
  }

  if (error) {
    throw error;
  }

  if (state === "FINISHED" && !blog) {
    throw new Error("404 Blog not found.");
  }

  // fetch blog data on page load
  useEffect(() => {
    const url = `${getApiUrl()}/blogs/${blogId}`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetcher(url, {
      mode: "cors",
      method: "GET",
      headers,
    });
  }, [fetcher, blogId]);

  // the initial state before the fetch happens
  if (!blog) {
    return <p className="sr-only">Loading blog data please wait...</p>;
  }

  const { author, title, coverImgUrl, content, tags, createdAt, updatedAt } =
    blog;

  return (
    <Main>
      <div className="max-w-5xl mx-auto">
        <article className="grid gap-y-8 pb-12 border-b-1 border-neutral-700">
          <header className="grid gap-y-4">
            <Tittle700 as="h1">{title}</Tittle700>

            <AuthorAndDate author={author} date={{ createdAt, updatedAt }} />

            <img src={coverImgUrl} alt="cover image" />
          </header>

          <section>{content}</section>

          <footer>
            <div className="flex gap-2">
              <Tittle400>Tags: </Tittle400>

              <ol className="flex flex-wrap items-center gap-2">
                {tags.map((tagName) => (
                  <li key={tagName}>
                    <Tag name={tagName} />
                  </li>
                ))}
              </ol>
            </div>
          </footer>
        </article>

        {!loadComments ? (
          <ButtonPrimary
            onClick={() => setLoadComments(true)}
            className="block mx-auto mt-12"
          >
            Load Comments ?
          </ButtonPrimary>
        ) : (
          <section className="max-w-xl mt-16 mx-auto">
            <CommentEditor author={author} />

            <ol className="grid gap-8 mt-8">
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
        )}
      </div>

      <LoadingModal isLoading={state === "LOADING"} message="Loading blog..." />
    </Main>
  );
}
