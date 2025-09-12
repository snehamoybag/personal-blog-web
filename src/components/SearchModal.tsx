import type { MouseEventHandler, ReactElement, RefObject } from "react";
import Tittle700 from "./titles/Tittle700";
import FieldWrapper from "./form-elemets/FieldWrapper";
import { Input } from "./form-elemets/Input";

interface SearchModalProps {
  ref?: RefObject<HTMLDialogElement | null>;
  className?: string;
}

export default function SearchModal({
  ref,
  className,
}: Readonly<SearchModalProps>): ReactElement {
  const closeModal: MouseEventHandler<HTMLButtonElement> = () => {
    if (!ref || !ref.current) {
      return;
    }

    ref.current.close();
  };

  return (
    <dialog
      ref={ref}
      className={`w-[90%] max-w-lg bg-neutral-800 text-neutral-200 font-base border-1 border-solid border-neutral-700 rounded-lg top-1/8 mx-auto ${className}`}
    >
      <div className="flex justify-between items-center gap-4 p-4 border-1 border-solid border-neutral-700">
        <Tittle700>Search:</Tittle700>
        <button type="button" className="clickable" onClick={closeModal}>
          <span className="sr-only">close search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
            className="fill-current size-6"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </div>
      <form action="/search" className="p-4">
        <FieldWrapper>
          <label htmlFor="search">
            <span className="sr-only">search blogs</span>
          </label>
          <Input id="search" name="search" placeholder="Search blogs here..." />
        </FieldWrapper>
      </form>
    </dialog>
  );
}
