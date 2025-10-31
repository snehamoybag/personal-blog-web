import { useRef, type ReactElement, type ReactNode } from "react";

interface CommentOptionsProps {
  children?: ReactNode;
  className?: string;
}

const CommentOptions = ({
  children,
  className = "",
}: Readonly<CommentOptionsProps>): ReactElement => {
  const optionsRef = useRef<HTMLDialogElement | null>(null);

  const toggleOptions = () => {
    if (!optionsRef || !optionsRef.current) {
      return;
    }

    const elem = optionsRef.current;

    if (elem.hasAttribute("open")) {
      elem.close();
    } else {
      elem.show();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        title="more"
        onClick={toggleOptions}
        className="clickable opacity-75 hover:opacity-100"
      >
        <span className="sr-only">more</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
          aria-hidden="true"
          className="fill-current"
        >
          <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
        </svg>
      </button>

      <dialog
        ref={optionsRef}
        className="bg-neutral-800 border-1 border-neutral-700 rounded-lg shadow-sm ml-auto"
      >
        {children}
      </dialog>
    </div>
  );
};

export default CommentOptions;
