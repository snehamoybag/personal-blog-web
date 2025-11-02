import {
  useEffect,
  useRef,
  type MouseEventHandler,
  type ReactElement,
} from "react";
import useUser from "../hooks/useUser";
import useAuthToken from "../hooks/useAuthToken";
import useDataFetcher from "../hooks/useDataFetcher";
import getEditorUrl from "../libs/getEdiorUrl";
import getApiUrl from "../libs/getApiUrl";
import { useNavigate } from "react-router";
import ConfirmationModal from "./ConfirmationModal";

interface BlogActionsProps {
  blogId: number;
  className?: string;
}

const editorUrl = getEditorUrl();
const apiUrl = getApiUrl();

export default function BlogActions({
  blogId,
  className = "",
}: Readonly<BlogActionsProps>): ReactElement {
  const { user } = useUser();
  const { authToken } = useAuthToken();
  const { state, data, error, fetcher } = useDataFetcher();
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const redirectTo = useNavigate();

  const toggleConfirmationModel: MouseEventHandler<HTMLButtonElement> = () => {
    if (!modalRef || !modalRef.current) {
      return;
    }

    const modalElm = modalRef.current;

    if (modalElm.hasAttribute("open")) {
      modalElm.close();
    } else {
      modalElm.showModal();
    }
  };

  const confirmationPromptMsg =
    "Are you sure you want to delete this blog? This action cannot be undone. Press the 'CONFIRM' button to delete. You'll be redirected to homepage upon successful deletion.";

  // redirect user to homepage after delete
  useEffect(() => {
    if (data) {
      void redirectTo("/");
    }
  }, [data, redirectTo]);

  const handleDelete = () => {
    if (state === "LOADING") {
      return;
    }

    if (!user || !authToken) {
      throw new Error("Please log in to delete.");
    }

    if (user.role !== "ADMIN") {
      throw new Error("Only an admin can delete a blog.");
    }

    const url = `${apiUrl}/blogs/${blogId}`;

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${authToken}`);

    fetcher(url, { mode: "cors", method: "DELETE", headers });
  };

  return (
    <div className={className}>
      <div className="flex gap-4">
        <a
          href={`${editorUrl}/edit/${blogId}`}
          target="_blank"
          className={`${state === "LOADING" ? "pointer-events-none cursor-not-allowed opacity-50" : "clickable"} flex items-center gap-2 px-4 py-1 no-underline border-1 border-current hover:scale-105`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
            aria-hidden="true"
            className="fill-current"
          >
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
          </svg>
          <span>Edit</span>
        </a>

        <button
          type="button"
          onClick={toggleConfirmationModel}
          disabled={state === "LOADING"}
          className={`${state === "LOADING" ? "cursor-not-allowed opacity-50" : "clickable"} flex items-center gap-2 px-4 py-1 text-red-300 border-1 border-current hover:scale-105`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
            aria-hidden="true"
            className="fill-current"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
          <span>{state === "LOADING" ? "Deleting..." : "Delete"}</span>
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-300 mt-4 sm:text-base">
          {error.message}
        </p>
      )}

      <ConfirmationModal
        ref={modalRef}
        onConfirm={handleDelete}
        message={confirmationPromptMsg}
      />
    </div>
  );
}
