import { useState, type ReactElement } from "react";
import CommentEditor from "./CommentEditor";
import Comments from "./Comments";
import type { Comment } from "../types/Comment.type";

interface CommentBoxProps {
  blogId: number;
  className?: string;
}

export default function CommentBox({
  blogId,
  className = "",
}: Readonly<CommentBoxProps>): ReactElement {
  const [newComment, setNewComment] = useState<Comment | null>(null);
  const handleNewCommentPost = (comment: Comment) => setNewComment(comment);

  return (
    <div className={`grid gap-y-8 ${className}`}>
      <CommentEditor blogId={blogId} onSuccess={handleNewCommentPost} />

      <Comments blogId={blogId} newComment={newComment} />
    </div>
  );
}
