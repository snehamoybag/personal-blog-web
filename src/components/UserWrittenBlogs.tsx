import {
  useEffect,
  useState,
  type MouseEventHandler,
  type ReactElement,
} from "react";
import useDataFetcher from "../hooks/useDataFetcher";
import InlineLoadingSpinner from "./InlineLoadingSpinner";
import type { Blog } from "../types/Blog";
import getApiUrl from "../libs/getApiUrl";
import Tittle400 from "./titles/Title400";
import Post from "./Post";
import ButtonPrimary from "./buttons/ButtonPrimary";

interface UserWrittenBlogsProps {
  userId: number;
  className?: string;
}

export default function UserWrittenBlogs({
  userId,
  className = "",
}: Readonly<UserWrittenBlogsProps>): ReactElement {
  const { state, data, error, fetcher } = useDataFetcher(); // loader
  const {
    state: loadMoreState,
    data: loadMoreData,
    error: loadMoreError,
    fetcher: loadMoreFetcher,
  } = useDataFetcher();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoadMoreAvailable, setIsLoadMoreAvailable] = useState(true);

  const fetchLimit = 10;

  // fetch on load
  useEffect(() => {
    const url = `${getApiUrl()}/users/${userId}/blogs/?limit=${fetchLimit}`;
    fetcher(url, { mode: "cors", method: "GET" });
  }, [userId, fetcher]);

  // fetch on load more button click
  const handleLoadMore: MouseEventHandler<HTMLButtonElement> = () => {
    if (loadMoreState === "LOADING") {
      return;
    }

    const url = `${getApiUrl()}/users/${userId}/blogs/?limit=${fetchLimit}&offset=${blogs.length}`;
    loadMoreFetcher(url, {
      mode: "cors",
      method: "GET",
    });
  };

  // sync blogs on load
  useEffect(() => {
    if (!data || !data.blogs) {
      return;
    }

    const blogs = data.blogs as Blog[];
    if (blogs.length) {
      setBlogs(blogs);
    }

    setIsLoadMoreAvailable(blogs.length >= fetchLimit);
  }, [data]);

  // sync blogs on loadmore click
  useEffect(() => {
    if (!loadMoreData || !loadMoreData.blogs) {
      return;
    }

    const blogs = loadMoreData.blogs as Blog[];
    if (blogs.length) {
      setBlogs((prevBlogs) => prevBlogs.concat(blogs));
    }

    setIsLoadMoreAvailable(blogs.length >= fetchLimit);
  }, [loadMoreData]);

  if (error) {
    return (
      <Tittle400 as="p" className="text-center">
        {error.message}
      </Tittle400>
    );
  }

  if (state === "LOADING") {
    return (
      <InlineLoadingSpinner
        message="Loading blogs..."
        className="max-w-fit mx-auto"
      />
    );
  }

  return (
    <div className={`grid justify-items-center gap-y-8 ${className}`}>
      {/* blogs */}
      {blogs.length ? (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Post blog={blog} />
            </li>
          ))}
        </ul>
      ) : (
        <Tittle400>No blogs yet (˘･_･˘)</Tittle400>
      )}

      {/* load more loading spinner */}
      {loadMoreState === "LOADING" && (
        <InlineLoadingSpinner message="Loading more blogs..." />
      )}

      {/* load more button */}
      {isLoadMoreAvailable && loadMoreState !== "LOADING" && (
        <ButtonPrimary onClick={handleLoadMore}>Load more...</ButtonPrimary>
      )}

      {loadMoreError && (
        <p className="text-red-300 mt-4">{loadMoreError.message}</p>
      )}
    </div>
  );
}
