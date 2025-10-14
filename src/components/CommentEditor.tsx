import type { ReactElement } from "react";
import type { User } from "../types/User";
import FieldWrapper from "./form-elemets/FieldWrapper";
import Textarea from "./form-elemets/Textarea";
import AvatarIcon from "./AvatarIcon";
import { Link } from "react-router";
import ButtonPrimary from "./buttons/ButtonPrimary";

interface CommentEditorProps {
  author: User;
  className?: string;
}

export default function CommentEditor({
  author,
  className = "",
}: Readonly<CommentEditorProps>): ReactElement {
  if (!author) {
    return <p>Login to comment.</p>;
  }

  return (
    <div className={`flex items-start gap-4 ${className}`}>
      <Link to={`/user/${author.id}`} className="no-underline">
        <AvatarIcon
          firstName={author.profile.firstName}
          lastName={author.profile.lastName}
          avatarUrl={author.profile.avatarUrl || undefined}
          className="size-12"
        />
      </Link>
      <form action="/comments" method="post" className="basis-full">
        <FieldWrapper>
          <label htmlFor="comment" className="sr-only">
            comment:
          </label>
          <Textarea
            id="comment"
            name="comment"
            rows={3}
            placeholder="Write a comment..."
            required
          />
        </FieldWrapper>
        <ButtonPrimary className="mt-4">Comment</ButtonPrimary>
      </form>
    </div>
  );
}
