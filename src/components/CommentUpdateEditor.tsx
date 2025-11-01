import {
  useEffect,
  useState,
  type FocusEventHandler,
  type FormEventHandler,
  type ReactElement,
} from "react";
import Textarea from "./form-elemets/Textarea";
import FieldWrapper from "./form-elemets/FieldWrapper";
import ButtonPrimary from "./buttons/ButtonPrimary";
import ErrorLabel from "./form-elemets/ErrorLabel";
import useDataFetcher from "../hooks/useDataFetcher";
import getApiUrl from "../libs/getApiUrl";
import useAuthToken from "../hooks/useAuthToken";
import type { Comment as CommentType } from "../types/Comment.type";
import useUser from "../hooks/useUser";

interface CommentUpdateEditorProps {
  comment: CommentType;
  onSuccess: (updatedComment: CommentType) => void;
}

const apiUrl = getApiUrl();

const CommentUpdateEditor = ({
  comment,
  onSuccess,
}: Readonly<CommentUpdateEditorProps>): ReactElement => {
  const { id: commentId, message, author } = comment;
  const { user } = useUser();
  const { authToken } = useAuthToken();
  const { state, data, error, fetcher } = useDataFetcher();
  const [value, setValue] = useState(message);

  if (!user || !authToken) {
    throw new Error("Please log in to edit comment.");
  }

  // authority to edit a comment
  const hasAuthority =
    user.id === author.id || user.role === "ADMIN" || user.role === "MODERATOR";

  // call it on successful comment edit
  useEffect(() => {
    if (data && data.comment) {
      onSuccess(data.comment as CommentType);
    }
  }, [data, onSuccess]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (state === "LOADING" || !hasAuthority) {
      return;
    }

    const url = `${apiUrl}/comments/${commentId}`;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    fetcher(url, {
      mode: "cors",
      method: "PUT",
      headers,
      body: JSON.stringify({ message: value }),
    });
  };

  const moveCursorToEnd: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    const elem = e.currentTarget;
    const lastCharcter = elem.value.length;
    elem.setSelectionRange(lastCharcter, lastCharcter);
  };

  return (
    <form method="PUT" onSubmit={handleSubmit}>
      <FieldWrapper>
        <label htmlFor={`comment${commentId}`}></label>
        <Textarea
          id={`comment${commentId}`}
          name="comment"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          isInvalid={error !== null}
          autoFocus={true}
          onFocus={moveCursorToEnd}
        />

        {!hasAuthority && (
          <ErrorLabel htmlFor={`comment${commentId}`}>
            Bad request: Only the author or an admin/moderator can delete this
            comment.
          </ErrorLabel>
        )}

        {error && (
          <ErrorLabel htmlFor={`comment${commentId}`}>
            {error.message}
          </ErrorLabel>
        )}
      </FieldWrapper>

      <ButtonPrimary
        type="submit"
        className={`mt-4 ${state === "LOADING" ? "cursor-not-allowed active:scale-none" : ""}`}
        disabled={state === "LOADING"}
      >
        {state === "LOADING" ? "Updating..." : "Update"}
      </ButtonPrimary>
    </form>
  );
};

export default CommentUpdateEditor;
