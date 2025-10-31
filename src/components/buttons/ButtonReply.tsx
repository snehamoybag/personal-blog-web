import type { ReactElement } from "react";

interface ButtonReplyProps {
  className?: string;
}

const ButtonReply = ({
  className = "",
}: Readonly<ButtonReplyProps>): ReactElement => {
  return (
    <button type="button" title="Reply" className={`clickable ${className}`}>
      <span className="sr-only">reply</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#000000"
        aria-hidden="true"
        className="fill-current"
      >
        <path d="M760-200v-160q0-50-35-85t-85-35H273l144 144-57 56-240-240 240-240 57 56-144 144h367q83 0 141.5 58.5T840-360v160h-80Z" />
      </svg>
    </button>
  );
};

export default ButtonReply;
