import type { ReactElement } from "react";
import type { User } from "../types/User";

interface UserBadgeProps {
  role: User["role"];
  className?: string;
}

export default function UserBadge({
  role = "NORMAL",
  className = "",
}: Readonly<UserBadgeProps>): ReactElement {
  // in tailwind classes
  let roleStyles = "";

  switch (role) {
    case "ADMIN":
      roleStyles = "text-red-300";
      break;

    case "MODERATOR":
      roleStyles = "border-neutral-400";
      break;

    default:
      roleStyles = "";
  }

  if (role === "NORMAL") {
    return <></>;
  }

  return (
    <p
      className={`text-xs font-semibold px-2 py-1 border-1 border-solid border-current rounded-lg ${roleStyles} ${className}`}
    >
      <span className="sr-only">role: </span>
      {role}
    </p>
  );
}
