import { useState, type ReactElement } from "react";
import AuthorAndDate from "./AuthorAndDate";
import UserBadge from "./UserBadge";
import CommentOptions from "./CommentOptions";
import useUser from "../hooks/useUser";
import ButtonReply from "./buttons/ButtonReply";
import CommentUpdateEditor from "./CommentUpdateEditor";
import type { Comment as CommentType } from "../types/Comment.type";
import type { ParsedResponseShape } from "../types/ResponseShape";

interface CommentProps {
  comment: CommentType;
  className?: string;
}

export default function Comment({
  comment,
  className = "",
}: Readonly<CommentProps>): ReactElement {
  const { id: commentId, author, message, createdAt, updatedAt } = comment;
  const { user } = useUser();
  const [isEditMode, setIsEditMode] = useState(false);

  const handleUpdateSuccess = (data: ParsedResponseShape["data"]) => {
    if (data) {
      setIsEditMode(false);
    }
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
                    <button type="button" className="clickable text-red-300">
                      Delete
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
          <CommentUpdateEditor
            commentId={commentId}
            message={message}
            onSuccess={handleUpdateSuccess}
          />
        ) : (
          <p>{message}</p>
        )}
      </section>
    </article>
  );
}
