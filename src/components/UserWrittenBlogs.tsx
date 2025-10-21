import { useEffect, type ReactElement } from "react";
import useDataFetcher from "../hooks/useDataFetcher";
import InlineLoadingSpinner from "./InlineLoadingSpinner";
import type { Blog } from "../types/Blog";
import getApiUrl from "../libs/getApiUrl";
import Tittle400 from "./titles/Title400";
import Post from "./Post";

interface UserWrittenBlogsProps {
  userId: number;
  className?: string;
}

export default function UserWrittenBlogs({
  userId,
  className = "",
}: Readonly<UserWrittenBlogsProps>): ReactElement {
  const { state, data, error, fetcher } = useDataFetcher();
  const blogs = data && data.blogs ? (data.blogs as Blog[]) : [];

  // fetch on load
  useEffect(() => {
    const url = `${getApiUrl()}/users/${userId}/blogs`;
    fetcher(url, { mode: "cors", method: "GET" });
  }, [userId, fetcher]);

  return (
    <div className={`${className}`}>
      {error && <Tittle400 as="p">{error.message}</Tittle400>}

      {state === "LOADING" && (
        <InlineLoadingSpinner message="Loading blogs..." />
      )}

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
    </div>
  );
}
