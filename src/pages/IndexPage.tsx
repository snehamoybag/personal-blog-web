import {
  useEffect,
  useState,
  type MouseEventHandler,
  type ReactElement,
} from "react";
import Main from "../components/landmarks/Main";
import Post from "../components/Post";
import useDataFetcher from "../hooks/useDataFetcher";
import getApiUrl from "../libs/getApiUrl";
import type { Blog } from "../types/Blog";
import LoadingModal from "../components/LoadingModal";
import Tittle700 from "../components/titles/Tittle700";
import InlineLoadingSpinner from "../components/InlineLoadingSpinner";
import ButtonPrimary from "../components/buttons/ButtonPrimary";

const apiUrl = getApiUrl();

export default function IndexPage(): ReactElement {
  const {
    state: loaderState,
    data: loaderData,
    error: loaderError,
    fetcher: loader,
  } = useDataFetcher();

  const {
    state: loadMoreState,
    data: loadeMoreData,
    error: loadMoreError,
    fetcher: loadMoreFetcher,
  } = useDataFetcher();

  const [blogs, setBlogs] = useState<Blog[]>([]);

  const limit = 10;
  const offset = blogs.length;
  const isLoadMoreAvailable =
    loaderState === "FINISHED" && blogs.length >= limit;

  const handleLoadMore: MouseEventHandler<HTMLButtonElement> = () => {
    if (loadMoreState === "LOADING") {
      return;
    }

    const url = `${apiUrl}/blogs/?limit=${limit}&offset=${offset}`;
    loadMoreFetcher(url, { mode: "cors" });
  };

  // fetch blogs on page load
  useEffect(() => {
    const url = `${apiUrl}/blogs/?limit=${limit}&offset=0`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    loader(url, {
      mode: "cors",
      method: "GET",
      headers,
    });
  }, [loader]);

  if (loaderError) {
    throw loaderError;
  }

  // sync loader blogs
  useEffect(() => {
    if (loaderData && loaderData.blogs) {
      setBlogs(loaderData.blogs as Blog[]);
    }
  }, [loaderData]);

  // sync load more blogs
  useEffect(() => {
    if (loadeMoreData && loadeMoreData.blogs) {
      setBlogs((prevBlogs) => prevBlogs.concat(loadeMoreData.blogs as Blog[]));
    }
  }, [loadeMoreData]);

  return (
    <Main>
      <section className="container-primary">
        {/* if no blog is written yet */}
        {loaderState === "FINISHED" && !blogs.length && (
          <Tittle700 as="p" className="text-center mt-16">
            No blogs yet. (°ー°〃)
          </Tittle700>
        )}

        {/* blogs if available */}
        {blogs.length && (
          <ul className="grid gap-y-12">
            {blogs.map((blog) => (
              <li key={blog.id}>
                <Post blog={blog} />
              </li>
            ))}
          </ul>
        )}

        {/* loadmore button */}
        <div className="grid justify-center text-center mt-12">
          {loadMoreState === "LOADING" && (
            <InlineLoadingSpinner message="Loading..." />
          )}
          {loadMoreError && (
            <p className="text-red-300">Failed to load blogs. (´･ω･`)?</p>
          )}
          {isLoadMoreAvailable && (
            <ButtonPrimary onClick={handleLoadMore}>Load more ?</ButtonPrimary>
          )}
        </div>
      </section>

      <LoadingModal
        isLoading={loaderState === "LOADING"}
        message="Loading..."
      />
    </Main>
  );
}
