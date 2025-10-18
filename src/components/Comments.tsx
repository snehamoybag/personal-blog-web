import {
  useEffect,
  useState,
  type MouseEventHandler,
  type ReactElement,
} from "react";
import getApiUrl from "../libs/getApiUrl";
import useDataFetcher from "../hooks/useDataFetcher";
import type { Comment as CommentType } from "../types/Comment.type";
import Tittle400 from "./titles/Title400";
import InlineLoadingSpinner from "./InlineLoadingSpinner";
import Comment from "./Comment";
import ButtonPrimary from "./buttons/ButtonPrimary";

const apiUrl = getApiUrl();

interface CommentsProps {
  blogId: number;
  newComment?: CommentType | null;
  className?: string;
}

export default function Comments({
  blogId,
  newComment = null,
  className = "",
}: Readonly<CommentsProps>): ReactElement {
  const [comments, setComments] = useState<CommentType[]>([]);
  const {
    state: loaderState,
    data: loaderData,
    error: loaderError,
    fetcher: loader,
  } = useDataFetcher();

  const {
    state: loadMoreSate,
    data: loadMoreData,
    error: loadMoreError,
    fetcher: loadMoreFetcher,
  } = useDataFetcher();

  const [isLoadMoreAvailable, setIsLoadMoreAvailable] = useState(true);

  const limit = 10;
  const offset = comments.length;

  const baseUrl = `${apiUrl}/blogs/${blogId}/comments`;

  const handleLoadMore: MouseEventHandler<HTMLButtonElement> = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    loadMoreFetcher(`${baseUrl}/?limit=${limit}&offset=${offset}`, {
      mode: "cors",
      method: "GET",
      headers,
    });
  };

  // fetch comments on laod and on new comment post
  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    loader(`${baseUrl}/?limit=${limit}&offset=0`, {
      mode: "cors",
      method: "GET",
      headers,
    });
  }, [loader, baseUrl, newComment]);

  // sync comments with loader data
  useEffect(() => {
    if (loaderData && loaderData.comments) {
      setComments(loaderData.comments as CommentType[]);
    }
  }, [loaderData]);

  // sync comments with load more data
  useEffect(() => {
    if (!loadMoreData || !loadMoreData.comments) {
      return;
    }

    const loadMoreComments = loadMoreData.comments as CommentType[];
    setComments((prevComments) => prevComments.concat(loadMoreComments));

    // update the loadmore button state
    if (loadMoreComments.length < limit) {
      setIsLoadMoreAvailable(false);
    }
  }, [loadMoreData]);

  return (
    <div className={`grid gap-y-8 ${className}`}>
      {/* list of comments */}
      {comments.length > 0 && (
        <ul className="grid gap-y-8">
          {comments.map((comment) => (
            <li key={comment.id}>
              <Comment
                author={comment.author}
                message={comment.message}
                createdAt={comment.createdAt}
                updatedAt={comment.updatedAt}
              />
            </li>
          ))}
        </ul>
      )}

      <div className="grid justify-center">
        {/* loadmore button */}
        {loadMoreSate !== "LOADING" && isLoadMoreAvailable && (
          <ButtonPrimary
            type="button"
            className="max-w-fit"
            onClick={handleLoadMore}
          >
            Load more...
          </ButtonPrimary>
        )}

        {/* loading */}
        {(loaderState === "LOADING" || loadMoreSate === "LOADING") && (
          <InlineLoadingSpinner message="Loading comments..." />
        )}

        {/* erorr */}
        {(loaderError || loadMoreError) && (
          <Tittle400 as="p">Error loading comments... (x_x)</Tittle400>
        )}
      </div>
    </div>
  );
}
