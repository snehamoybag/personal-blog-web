import type { MouseEventHandler, ReactElement, RefObject } from "react";
import Tittle700 from "./titles/Tittle700";
import FieldWrapper from "./form-elemets/FieldWrapper";
import Input from "./form-elemets/Input";
import ButtonClose from "./buttons/ButtonClose";
import ButtonPrimary from "./buttons/ButtonPrimary";

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
      className={`w-[90%] max-w-lg bg-neutral-800 text-neutral-200 font-base border-1 border-solid border-neutral-700 rounded-lg shadow-md mx-auto top-1/8 backdrop:backdrop-blur-xs ${className}`}
    >
      <div className="flex justify-between items-center gap-4 p-4 border-b-1 border-b-solid border-neutral-700">
        <Tittle700>Search:</Tittle700>
        <ButtonClose text="close search" onClick={closeModal} />
      </div>
      <form action="/search" className="p-4">
        <FieldWrapper>
          <label htmlFor="search">
            <span className="sr-only">search blogs</span>
          </label>
          <Input id="search" name="search" placeholder="Search blogs here..." />
        </FieldWrapper>
        <ButtonPrimary type="submit" className="block uppercase mt-2">
          Go
        </ButtonPrimary>
      </form>
    </dialog>
  );
}
