import {
  useEffect,
  useState,
  type ChangeEventHandler,
  type FormEventHandler,
  type ReactElement,
} from "react";
import FieldWrapper from "./form-elemets/FieldWrapper";
import Textarea from "./form-elemets/Textarea";
import AvatarIcon from "./AvatarIcon";
import { Link } from "react-router";
import ButtonPrimary from "./buttons/ButtonPrimary";
import useUser from "../hooks/useUser";
import type { Comment } from "../types/Comment.type";
import useDataFetcher from "../hooks/useDataFetcher";
import getApiUrl from "../libs/getApiUrl";
import useAuthToken from "../hooks/useAuthToken";
import ErrorLabel from "./form-elemets/ErrorLabel";
import type { FieldErrors } from "../types/FieldErrors";

interface CommentEditorProps {
  blogId: number;
  // this trigger a re-render of the parent forcing the comments list to update
  onSuccess: (postedComment: Comment) => void;
  className?: string;
}

export default function CommentEditor({
  blogId,
  onSuccess,
  className = "",
}: Readonly<CommentEditorProps>): ReactElement {
  const { user: author } = useUser();
  const { authToken } = useAuthToken();
  const { state, data, error, fetcher } = useDataFetcher();
  const [formData, setFormData] = useState({
    message: "",
  });

  const formErrors = data && data.errors ? (data.errors as FieldErrors) : null;
  const postedComment = data && data.comment ? (data.comment as Comment) : null;

  const handleFormDataChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const elem = e.currentTarget;

    setFormData((prevData) => ({
      ...prevData,
      [elem.name]: elem.value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!author || !authToken) {
      return;
    }

    const url = `${getApiUrl()}/blogs/${blogId}/comments`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    fetcher(url, {
      mode: "cors",
      method: "POST",
      headers,
      body: JSON.stringify(formData),
    });
  };

  // call success everytime new comment is posted
  useEffect(() => {
    if (postedComment) {
      onSuccess(postedComment);
      setFormData({ message: "" });
    }
  }, [postedComment, onSuccess]);

  if (!author || !authToken) {
    return (
      <p>
        <Link to="/login">Login</Link> to comment.
      </p>
    );
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
      <form
        action="/comments"
        method="post"
        className="basis-full"
        onSubmit={handleSubmit}
      >
        <FieldWrapper>
          <label htmlFor="message" className="sr-only">
            comment:
          </label>
          <Textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Write a comment..."
            value={formData.message}
            required
            onChange={handleFormDataChange}
            isInvalid={Boolean(error || (formErrors && formErrors.message))}
          />

          {/* fetch error */}
          {error && <ErrorLabel htmlFor="message">{error.message}</ErrorLabel>}

          {/* possible validation error */}
          {formErrors && formErrors.message && (
            <ErrorLabel htmlFor="message">{formErrors.message.msg}</ErrorLabel>
          )}
        </FieldWrapper>
        <ButtonPrimary
          type="submit"
          className={`mt-4 ${state === "LOADING" ? "cursor-not-allowed active:transform-none" : ""}`}
          disabled={state === "LOADING"}
        >
          {state === "LOADING" ? "Posting..." : "Comment"}
        </ButtonPrimary>
      </form>
    </div>
  );
}
