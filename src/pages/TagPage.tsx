import {
  useEffect,
  useState,
  type MouseEventHandler,
  type ReactElement,
} from "react";
import useDataFetcher from "../hooks/useDataFetcher";
import getApiUrl from "../libs/getApiUrl";
import { useParams } from "react-router";
import type { Blog } from "../types/Blog";
import Main from "../components/landmarks/Main";
import Post from "../components/Post";
import Tittle700 from "../components/titles/Tittle700";
import LoadingModal from "../components/LoadingModal";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import InlineLoadingSpinner from "../components/InlineLoadingSpinner";

const apiUrl = getApiUrl();

export default function TagPage(): ReactElement {
  const {
    state: loaderState,
    data: loaderData,
    error: loaderError,
    fetcher: loader,
  } = useDataFetcher();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { tagName } = useParams();
  const {
    state: loadMoreState,
    data: loadeMoreData,
    error: loadMoreError,
    fetcher: loadMoreFetcher,
  } = useDataFetcher();

  if (!tagName) {
    throw new Error("Invalid tag name.");
  }

  if (loaderError) {
    throw loaderError;
  }

  const [limit, offset] = [10, blogs.length];
  const isLoadMoreAvailable =
    loaderState === "FINISHED" && blogs.length >= limit;

  // fetch initial few blogs on render
  useEffect(() => {
    const url = `${apiUrl}/tags/${tagName}/?limit=${limit}&offset=0`;
    loader(url, { mode: "cors", method: "GET" });
  }, [tagName, limit, loader]);

  // sync with blogs on fetch
  useEffect(() => {
    if (loaderData && loaderData.blogs) {
      setBlogs(loaderData.blogs as Blog[]);
    }
  }, [loaderData]);

  const handleLoadMore: MouseEventHandler<HTMLButtonElement> = () => {
    if (loadMoreState === "LOADING") {
      return;
    }

    const url = `${apiUrl}/blogs/?limit=${limit}&offset=${offset}`;
    loadMoreFetcher(url, { mode: "cors" });
  };

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
        {blogs.length > 0 && (
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
