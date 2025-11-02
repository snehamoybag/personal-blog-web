import {
  type MouseEventHandler,
  type ReactElement,
  type RefObject,
} from "react";

interface ConfirmationModalProps {
  ref: RefObject<HTMLDialogElement | null>;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  className?: string;
}

export default function ConfirmationModal({
  ref,
  message,
  onConfirm,
  onCancel,
  className = "",
}: Readonly<ConfirmationModalProps>): ReactElement {
  const closeModal = () => {
    if (!ref || !ref.current) {
      return;
    }

    const elem = ref.current;

    if (elem.hasAttribute("open")) {
      elem.close();
    }
  };

  const handleConfirmation: MouseEventHandler<HTMLButtonElement> = () => {
    onConfirm();
    closeModal();
  };

  const handleCancel: MouseEventHandler<HTMLButtonElement> = () => {
    if (onCancel) {
      onCancel();
    }

    closeModal();
  };

  return (
    <dialog
      ref={ref}
      className={`w-[75%] p-8 text-neutral-300 bg-neutral-800 border-1 border-neutral-700 rounded-lg shadow-md top-1/2 left-1/2 translate-[-50%] backdrop:backdrop-blur-xs ${className}`}
    >
      <p>{message}</p>

      <div className="flex gap-4 mt-8">
        <button
          type="button"
          onClick={handleConfirmation}
          className="clickable px-4 py-1 text-neutral-800 font-bold bg-red-300 capitalize shadow-sm hover:scale-105 active:shadow-none"
        >
          Confirm
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-1 capitalize border-1 border-neutral-700 shadow-sm hover:scale-105 hover:bg-neutral-700 active:shadow-none"
        >
          Cancel
        </button>
      </div>
    </dialog>
  );
}
