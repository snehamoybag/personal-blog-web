import type { InputHTMLAttributes, ReactElement } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  className?: string;
}

export default function Input({
  type = "text",
  className = "",
  ...restProps
}: Readonly<InputProps>): ReactElement {
  return (
    <input
      type={type}
      {...restProps}
      className={`p-4 border-1 border-solid border-neutral-700 rounded-xl ${className}`}
    />
  );
}
