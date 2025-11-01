import {
  useEffect,
  useState,
  type MouseEventHandler,
  type ReactElement,
} from "react";
import AuthorAndDate from "./AuthorAndDate";
import UserBadge from "./UserBadge";
import CommentOptions from "./CommentOptions";
import useUser from "../hooks/useUser";
import ButtonReply from "./buttons/ButtonReply";
import CommentUpdateEditor from "./CommentUpdateEditor";
import type { Comment as CommentType } from "../types/Comment.type";
import useDataFetcher from "../hooks/useDataFetcher";
import getApiUrl from "../libs/getApiUrl";
import useAuthToken from "../hooks/useAuthToken";

interface CommentProps {
  comment: CommentType;
  onEdit: (updatedComment: CommentType) => void;
  onDelete: (deletedComment: CommentType) => void;
  className?: string;
}

export default function Comment({
  comment,
  onEdit,
  onDelete,
  className = "",
}: Readonly<CommentProps>): ReactElement {
  const { id: commentId, author, message, createdAt, updatedAt } = comment;
  const { user } = useUser();
  const { authToken } = useAuthToken();
  const [isEditMode, setIsEditMode] = useState(false);
  const {
    state: deleteState,
    data: deleteData,
    error: deleteError,
    fetcher: deleteFetcher,
  } = useDataFetcher();

  if (deleteError) {
    throw deleteError;
  }

  // on successful deletek
  useEffect(() => {
    if (deleteData && deleteData.comment) {
      onDelete(deleteData.comment as CommentType);
    }
  }, [deleteData, onDelete]);

  const onEditSuccess = (updatedComment: CommentType) => {
    onEdit(updatedComment);
    setIsEditMode(false);
  };

  const deleteComment: MouseEventHandler<HTMLButtonElement> = () => {
    if (deleteState === "LOADING") {
      return;
    }

    if (!user || !authToken) {
      throw new Error("Please log in to delet a comment.");
    }

    const isModmin = user.role === "ADMIN" || user.role === "MODERATOR";
    if (user.id !== comment.author.id && !isModmin) {
      throw new Error(
        "BadRequest: Only the author or an admin/moderator can delete this comment.",
      );
    }

    const url = `${getApiUrl()}/comments/${commentId}`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    deleteFetcher(url, { mode: "cors", method: "DELETE", headers });
  };

  return (
    <article className={`border-1 border-neutral-700 rounded-xl ${className}`}>
      <header className="p-4 border-b-1 border-neutral-700">
        <div className="flex justify-between gap-4">
          <AuthorAndDate author={author} date={{ createdAt, updatedAt }} />

          <div className="flex items-start gap-4">
            <ButtonReply />

            {user?.id === author.id && (
              <CommentOptions>
                <ul
                  role="list"
                  className="text-sm [&>li]:px-4 [&>li]:py-2 [&>li]:border-b-1 [&>li]:border-b-neutral-700 [&>li]:last-of-type:border-none"
                >
                  <li>
                    <button
                      type="button"
                      className="clickable"
                      onClick={() => setIsEditMode((prevMode) => !prevMode)}
                    >
                      {isEditMode ? "Cancel" : "Edit"}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={deleteComment}
                      className={`clickable text-red-300 ${deleteState === "LOADING" ? "cursor-not-allowed active:transform-none active:scale-none" : ""}`}
                    >
                      {deleteState === "LOADING" ? "Delete..." : "Delete"}
                    </button>
                  </li>
                </ul>
              </CommentOptions>
            )}
          </div>
        </div>

        <UserBadge role={author.role} className="ml-10 mt-2" />
      </header>

      <section className="p-6">
        {isEditMode ? (
          <CommentUpdateEditor comment={comment} onSuccess={onEditSuccess} />
        ) : (
          <p>{message}</p>
        )}
      </section>
    </article>
  );
}
