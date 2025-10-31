import {
  useCallback,
  useEffect,
  useState,
  type MouseEventHandler,
  type ReactElement,
} from "react";
import type { Comment as CommentType } from "../types/Comment.type";
import useDataFetcher from "../hooks/useDataFetcher";
import getApiUrl from "../libs/getApiUrl";
import CommentEditor from "./CommentEditor";
import Tittle400 from "./titles/Title400";
import Comment from "./Comment";
import ButtonPrimary from "./buttons/ButtonPrimary";

interface CommentBoxProps {
  blogId: number;
  className?: string;
}

const apiUrl = getApiUrl();

const CommentBox = ({
  blogId,
  className = "",
}: Readonly<CommentBoxProps>): ReactElement => {
  const [comments, setComments] = useState<CommentType[]>([]);

  const {
    state: loaderState,
    data: loaderData,
    error: loaderError,
    fetcher: loader,
  } = useDataFetcher();

  const {
    state: loadMoreState,
    data: loadMoreData,
    error: loadMoreError,
    fetcher: loadMoreFetcher,
  } = useDataFetcher();

  const [limit, offset] = [10, comments.length];
  const loadMoreComments =
    loadMoreData && loadMoreData.comments
      ? (loadMoreData.comments as CommentType[])
      : [];
  const isLoadMoreAvailable =
    loaderState === "FINISHED" && loadMoreComments.length >= limit;

  // load first few comments on initial render
  useEffect(() => {
    const url = `${apiUrl}/blogs/${blogId}/comments/?limit=${limit}&offset=0`;
    loader(url, { mode: "cors", method: "GET" });
  }, [blogId, limit, loader]);

  // sync loader comments
  useEffect(() => {
    if (loaderData && loaderData.comments) {
      setComments(loaderData.comments as CommentType[]);
    }
  }, [loaderData]);

  // sync load more commets
  useEffect(() => {
    if (loadMoreData && loadMoreData.comments) {
      setComments((prevComments) =>
        prevComments.concat(loadMoreData.comments as CommentType[]),
      );
    }
  }, [loadMoreData]);

  const handleLoadMore: MouseEventHandler<HTMLButtonElement> = () => {
    if (loadMoreState === "LOADING") {
      return;
    }

    const url = `${apiUrl}/blogs/${blogId}/comments/?limit=${limit}&offset=${offset}`;
    loadMoreFetcher(url, { mode: "cors" });
  };

  const handleNewComment = useCallback((newComment: CommentType) => {
    setComments((prevComments) => [newComment, ...prevComments]); // place the new comment on top of the list
  }, []);

  const commentItemElms = comments.map((comment) => (
    <li key={comment.id} className="mt-8 first-of-type:mt-0">
      <Comment comment={comment} />
    </li>
  ));

  return (
    <div className={className}>
      <CommentEditor blogId={blogId} onNewComment={handleNewComment} />

      {/*comments*/}
      {loaderError && (
        <Tittle400 as="p" className="text-red-300">
          Failed to load comments.
        </Tittle400>
      )}

      {!loaderError && comments.length ? (
        <ul role="list">{commentItemElms}</ul>
      ) : (
        <Tittle400 as="p">No comments yet :(</Tittle400>
      )}

      {/*load more button*/}
      {isLoadMoreAvailable && (
        <>
          <ButtonPrimary
            disabled={loadMoreState === "LOADING"}
            onClick={handleLoadMore}
            className={
              loadMoreState === "LOADING"
                ? "cursor-not-allowed active:transform-none opacity-50"
                : ""
            }
          >
            {loadMoreState === "LOADING" ? "Loading ..." : "Load more ..."}
          </ButtonPrimary>

          {loadMoreError && (
            <p className="text-red-300">Failed to more comments...</p>
          )}
        </>
      )}
    </div>
  );
};

export default CommentBox;
