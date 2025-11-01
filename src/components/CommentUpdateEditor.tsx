import {
  useEffect,
  useState,
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
  const { user } = useUser();
  const { authToken } = useAuthToken();
  const { state, data, error, fetcher } = useDataFetcher();
  const [value, setValue] = useState(message);

  if (!user || !authToken) {
    throw new Error("Please log in to edit comment.");
  }

  // call it on successful comment edit
  useEffect(() => {
    if (data && data.comment) {
      onSuccess(data.comment as CommentType);
    }
  }, [data, onSuccess]);

  if (!authToken) {
    throw new Error("Please login to edit the comment.");
  }

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (state === "LOADING" || !authToken) {
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
        />

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
