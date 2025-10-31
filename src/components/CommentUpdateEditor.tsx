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
import type { ParsedResponseShape } from "../types/ResponseShape";
import getApiUrl from "../libs/getApiUrl";
import useAuthToken from "../hooks/useAuthToken";

interface CommentUpdateEditorProps {
  commentId: number;
  message: string;
  onSuccess: (data: ParsedResponseShape["data"]) => void;
}

const apiUrl = getApiUrl();

const CommentUpdateEditor = ({
  commentId,
  message,
  onSuccess,
}: Readonly<CommentUpdateEditorProps>): ReactElement => {
  const { authToken } = useAuthToken();
  const { state, data, error, fetcher } = useDataFetcher();
  const [value, setValue] = useState(message);

  useEffect(() => {
    if (data) {
      onSuccess(data);
    }
  }, [data, onSuccess]);

  if (!authToken) {
    throw new Error("Please login to update the comment.");
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
        className={
          state === "LOADING" ? "cursor-not-allowed active:scale-none" : ""
        }
        disabled={state === "LOADING"}
      >
        {state === "LOADING" ? "Updating..." : "Update"}
      </ButtonPrimary>
    </form>
  );
};

export default CommentUpdateEditor;
