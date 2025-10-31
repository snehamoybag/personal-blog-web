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
import type { Comment as CommentType } from "../types/Comment.type";
import useDataFetcher from "../hooks/useDataFetcher";
import getApiUrl from "../libs/getApiUrl";
import useAuthToken from "../hooks/useAuthToken";
import ErrorLabel from "./form-elemets/ErrorLabel";
import type { FieldErrors } from "../types/FieldErrors";
import Tittle400 from "./titles/Title400";

interface CommentEditorProps {
  blogId: number;
  onNewComment: (newComment: CommentType) => void;
  className?: string;
}

export default function CommentEditor({
  blogId,
  onNewComment,
  className = "",
}: Readonly<CommentEditorProps>): ReactElement {
  const { user } = useUser();
  const { authToken } = useAuthToken();
  const { state, data, error, fetcher } = useDataFetcher();
  const [formData, setFormData] = useState({
    message: "",
  });

  const formErrors = data && data.errors ? (data.errors as FieldErrors) : null;

  // call the onNewComment on successful new comment
  useEffect(() => {
    if (data && data.comment) {
      onNewComment(data.comment as CommentType);
    }
  }, [data, onNewComment]);

  const handleFormDataChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const elem = e.currentTarget;

    setFormData((prevData) => ({
      ...prevData,
      [elem.name]: elem.value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!user || !authToken) {
      throw new Error("Please login to post comment.");
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

    // clear the text area after comment posted
    setFormData({ message: "" });
  };

  if (!user || !authToken) {
    return (
      <Tittle400 as="p" className={className}>
        <Link to="/login">Log in</Link> or <Link to="/signup">sign up</Link> to
        comment.
      </Tittle400>
    );
  }

  return (
    <div className={`flex items-start gap-4 ${className}`}>
      <Link to={`/user/${user.id}`} className="no-underline">
        <AvatarIcon
          firstName={user.profile.firstName}
          lastName={user.profile.lastName}
          avatarUrl={user.profile.avatarUrl || undefined}
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
        <div className="flex wrap items-center gap-4">
          <ButtonPrimary
            type="submit"
            className={`mt-4 ${state === "LOADING" ? "cursor-not-allowed active:transform-none" : ""}`}
            disabled={state === "LOADING"}
          >
            {state === "LOADING" ? "Posting..." : "Comment"}
          </ButtonPrimary>

          {data && (data.comment as CommentType) && (
            <p className="text-sm text-green-300 sm:text-base">
              &bull; Comment added successfully.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
