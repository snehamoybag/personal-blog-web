import { useEffect, useState, type ReactElement } from "react";
import Main from "../components/landmarks/Main";
import Post from "../components/Post";
import useDataFetcher from "../hooks/useDataFetcher";
import getApiUrl from "../libs/getApiUrl";
import type { Blog } from "../types/Blog";
import LoadingModal from "../components/LoadingModal";
import Tittle700 from "../components/titles/Tittle700";

export default function IndexPage(): ReactElement {
  const { state, data, error, fetcher } = useDataFetcher();
  const [blogs, setBlogs] = useState<Blog[] | null>(null);

  // fetch blogs on page load
  useEffect(() => {
    const url = `${getApiUrl()}/blogs/?limit=10&offset=0`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetcher(url, {
      mode: "cors",
      method: "GET",
      headers,
    });
  }, [fetcher]);

  // sync blogs with fetched data
  useEffect(() => {
    if (!data || !data.blogs) {
      return;
    }

    setBlogs(data.blogs as Blog[]);
  }, [data]);

  if (error) {
    throw error;
  }

  return (
    <Main>
      <section className="container-primary">
        {/* if no blog is written yet */}
        {state === "FINISHED" && (!blogs || !blogs.length) && (
          <Tittle700 as="p" className="text-center mt-16">
            No blogs yet. (°ー°〃)
          </Tittle700>
        )}

        {/* blogs if available */}
        {blogs && blogs.length && (
          <ul className="grid gap-y-12">
            {blogs.map((blog) => (
              <li key={blog.id}>
                <Post blog={blog} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <LoadingModal isLoading={state === "LOADING"} message="Loading..." />
    </Main>
  );
}
