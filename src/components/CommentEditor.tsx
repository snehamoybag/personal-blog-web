import type { ReactElement } from "react";
import type { User } from "../types/User";
import FieldWrapper from "./form-elemets/FieldWrapper";
import Textarea from "./form-elemets/Textarea";
import AvatarIcon from "./AvatarIcon";

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
      <a href={`/user/${author.id}`} className="no-underline">
        <AvatarIcon
          firstName={author.profile.firstName}
          lastName={author.profile.lastName}
          avatarUrl={author.profile.avatarUrl || undefined}
          className="size-12"
        />
      </a>
      <form action="/comments" method="post" className="basis-full">
        <FieldWrapper>
          <label htmlFor="comment" className="sr-only">
            comment:
          </label>
          <Textarea
            id="comment"
            name="comment"
            placeholder="Press 'Enter' to post comment..."
            required
          ></Textarea>
        </FieldWrapper>
      </form>
    </div>
  );
}
